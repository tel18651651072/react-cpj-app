/**
 * Created by mac on 2018/1/27.
 */
import React, {Component} from 'react';
import './Style.css'
import MyInfo from './../../components/myInfo/myInfo'
import MyCenterContent from './../../components/myCenterContent/myCenterContent'
import {dealImage} from './../../common/js/dealImage'
import {resaveImg,myInfo,getFollowList,fetchMyContent,fetchMyReply} from './../../common/js/api'
import {observer,inject} from 'mobx-react'
import {withRouter} from "react-router-dom";

const baseUrl = 'http://localhost:8124'

@inject('store')
@observer
class MyCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:true,
            avatarImg:require('./../../static/images/avatar.png'),
            myInfo:{
                nickname:'小小臭皮匠',
                rank:1,
                designTitle:'小小臭皮匠',
                illustration:'一只无忧无虑的小菜鸟，然而梦想着成为大神的那一天',
            },
            centerContentList:[]
        }
        this.store = this.props.store;
    }

    componentWillMount() {
        var email = this.store.email;
        if(!email) {
            this.props.history.push('/')
            return
        }
        getFollowList(email).then(response => {
            console.log(response.data.data)
            this.setState({
                centerContentList:response.data.data
            },function () {
                console.log(this.state.centerContentList)
            })
        })
    }

    componentDidMount() {
        var email = this.store.email;
        if(!email) {
            this.props.history.push('/')
            return
        }
        myInfo(email).then(response => {
            console.log(response.data)
            if(response.data.flag) {
                let transData = {}
                for (let item in response.data.myInfo) {
                    console.log(response.data.myInfo[item])
                    if (response.data.myInfo[item]&&item!=='id') {
                        if(item==='email') {
                            transData['nickname'] = response.data.myInfo[item]
                        } else {
                            transData[item] = response.data.myInfo[item]
                        }
                    } else {
                        if(this.state.myInfo.hasOwnProperty(item)) {
                            transData[item] = this.state.myInfo[item]
                        }
                    }
                }
                console.log(transData)
                var myInfo = Object.assign({},this.state.myInfo,transData)
                console.log(myInfo)
                this.setState({
                    myInfo,
                    avatarImg:baseUrl+response.data.myInfo.personalUrl
                })
            }
        })
    }

    // tab点击
    tabClick(e) {
        var email = this.store.email;
        var uidList = []
        if(!email) {
            this.props.history.push('/')
            return
        }
        console.log(e.target.href.split('/').pop())
        let item = e.target.href.split('/').pop()
        switch (item) {
            case 'article':
                fetchMyContent(email).then(response => {
                    console.log(response.data)
                    this.setState({
                        centerContentList:response.data
                    });
                })
                break;
            case 'reply':
                fetchMyReply(email).then(response => {
                    console.log(response.data)
                    uidList = response.data
                    console.log(uidList)
                    this.setState({
                        centerContentList:uidList
                    });
                })
                break;
            case 'trends':
                getFollowList(email).then(response => {
                    console.log(response.data.data)
                    this.setState({
                        centerContentList:response.data.data
                    },function () {
                        console.log(this.state.centerContentList)
                    })
                })
                break;
        }
    }

    componentDidUpdate() {
    }

    imgFileFn(e) {

        var files = e.target.files || e.dataTransfer.files;
        // if (!files.length) return;
        console.log(e.target)
        console.log(files)
        this.createImage(files, e);
    }

    createImage(file, e) {
        var leng = file.length;
        for (var i = 0; i < leng; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(file[i]);
            var vm = this;
            reader.onload = function(e) {
                // console.log(e.target.result)
                vm.setState({
                    flag:false
                })
                setTimeout(()=>{
                    vm.setState({
                        flag:true
                    })
                },0)

                dealImage(e.target.result, {
                    width: 60
                }, function(base) {
                    console.log('压缩后：' + base.length / 1024 + '' + base)
                    var email = vm.store.email;
                    resaveImg(base,email).then(response => {
                        console.log(response.data)
                        vm.setState({
                            avatarImg:baseUrl+response.data.avatarImg
                        })
                    })
                })
            };
        }
    }
    render() {
        return (
            <div className="myCenter-wrapper">
                <div className="container">
                    <MyInfo myInfo={this.state.myInfo} imgFileFn={this.imgFileFn.bind(this)} flag={this.state.flag} Avatar={this.state.avatarImg}/>
                </div>
                <MyCenterContent centerContentList={this.state.centerContentList} tabClick={this.tabClick.bind(this)}/>
            </div>
        )
    }
}


export default withRouter(MyCenter)
