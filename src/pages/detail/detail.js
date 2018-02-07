/**
 * Created by mac on 2018/1/17.
 */
import React, {Component} from 'react';
import './Style.css';
import {fetchDetail,getSkimnum,replySubmit,fetchReply,addFollow,getFollow} from './../../common/js/api'
import {escape} from './../../common/js/escape'
import {getCanvasCode} from './../../common/js/getCanvasCode'
import CommonReply from './../../components/commonReply/commonReply'
import E from 'wangeditor'
import QuickAlert from './../../components/quickAlert/quickAlert'
import Alert from './../../components/alert/alert'
import {observer,inject} from 'mobx-react'
import {Format} from './../../common/js/Format'

@inject('store')
@observer
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article:[],
            quickAlertShow:'',
            quickAlertContent:'',
            alertShow:'',
            btnList:['取消','确定'],
            replyList:[],
            replySubmitSuccess:false,
            followState:'关注问题',
            followClassName:"btn-item"
        }
        this.store = this.props.store;
        this.reviseStoreFn = this.store.reviseStoreFn.bind(this.store)
        this.reviseArticleFn = this.store.reviseArticleFn.bind(this.store)
    }

    componentWillMount() {
        console.log(document.location.href)
        var url = document.location.href;
        console.log(getCanvasCode(url))
        let ifAddSkimNum = false
        var uid = this.props.match.params.uid;
        var canvascode = getCanvasCode(url)
        var pageInfo = {
            uid:uid,
            canvascode:canvascode
        }
        getSkimnum(pageInfo).then(response => {
            console.log(response)
        })
        // 测试
        // getSkimnum().then(response => {
        //     console.log(response)
        // })
        fetchDetail(uid).then(response => {
            console.log(response.data)
            this.setState({
                article:response.data
            })
        })

        // 获取回复内容
        this.fetchReplyFn()
    }

    // 获取该用户在这个详情页的关注状态
    getFollowFn() {
        var replyer = this.store.email;
        var uid = this.props.match.params.uid;
        var followData = [replyer,uid]
        console.log(followData)
        getFollow(followData).then(response => {
            console.log(response.data)
            if (response.data.flag) {
                this.setState({
                    followState:response.data.message,
                    followClassName:'btn-item followed'
                })
                // 检查关注状态关闭
                this.store.ifFollow = 1;
            }
        })
    }

    fetchReplyFn() {
        var uid = this.props.match.params.uid;
        fetchReply(uid).then(response => {
            console.log(response.data)
            this.setState({
                replyList:response.data,
                replySubmitSuccess:false
            })
            this.store.getReplyListSuccess = 1
        })
    }

    componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html
            })
        }
        editor.customConfig.zIndex = 100;
        editor.create()
        // 关注状态
        setTimeout(() => {
            this.getFollowFn()
        },100)
    }
    componentWillUpdate() {
    }

    componentDidUpdate() {
        if (this.store.getReplyListSuccess===0) {
            this.fetchReplyFn()
        }
        // 如果是非退出状态 即登录状态，则
        if(!this.store.exitStatus&&this.store.ifFollow===0){
            this.getFollowFn()
        }
    }

    willReplyFn() {
        var replyer = this.store.email;
        if(!replyer) {
            this.setState({
                alertShow:'alertShow'
            })
        }
    }

    // 关注
     followFn() {
         var replyer = this.store.email;
         // var uid = this.props.match.params.uid;
         if(!replyer) {
             this.setState({
                 alertShow:'alertShow'
             })
             return
         }
         // var followData = [replyer,uid]
         // if (this.state.followState==='关注问题') {
         //     addFollow(followData).then(response => {
         //         console.log(response.data)
         //         if (response.data.flag) {
         //             this.setState({
         //                 followState:'已关注',
         //                 followClassName:'btn-item followed'
         //             })
         //         }
         //     })
         // }
         this.addFollowfn()
     }

     addFollowfn() {
         var replyer = this.store.email;
         var uid = this.props.match.params.uid;
         var headerline = this.state.article[0].headerline;
         var followData = [replyer,uid,headerline]
         console.log(followData)
         if (this.state.followState==='关注问题'&&replyer&&uid) {
             addFollow(followData).then(response => {
                 console.log(response.data)
                 if (!response.data.flag&&response.data.message==='字段缺省') {
                     return
                 }
                 this.setState({
                     followState:'已关注',
                     followClassName:'btn-item followed'
                 })
             })
         }
     }

    alertControl(e) {
        console.log(e.target)
        if (e.target.innerHTML==='取消') {
            this.setState({
                alertShow:''
            })
        } else if (e.target.innerHTML==='确定') {
            this.setState({
                alertShow:''
            })
        }
    }

    replySubmitFn() {
        var replyer = this.store.email;
        var content = this.state.editorContent;
        var uid = this.props.match.params.uid;
        var replydata = {
            replyer:replyer,
            content:content,
            uid:uid
        }
        console.log(replydata)
        var effective = true;
        if (!replyer) {
            console.log('用户名为空')
            this.setState({
                quickAlertShow:'quickAlertShow',
                quickAlertContent:'请先登录'
            })
            setTimeout(() => {
                this.setState({
                    quickAlertShow:'',
                    quickAlertContent:''
                })
            },1500)
            effective = false
        }
        if (!this.state.editorContent) {
            this.setState({
                quickAlertShow:'quickAlertShow',
                quickAlertContent:'内容不能为空'
            })
            setTimeout(() => {
                this.setState({
                    quickAlertShow:'',
                    quickAlertContent:''
                })
            },1500)
            effective = false
        }
        if (effective) {
            replySubmit(replydata).then(response => {
                console.log(response)
                if (response.data.flag===false) {
                    this.setState({
                        quickAlertShow:'quickAlertShow',
                        quickAlertContent:response.data.message
                    })
                    setTimeout(() => {
                        this.setState({
                            quickAlertShow:'',
                            quickAlertContent:''
                        })
                    },1500)
                }
                this.setState({
                    replySubmitSuccess:response.data
                })
                this.fetchReplyFn()
            })
        }
    }

    render() {
        let create_time = []
        for (let i=0;i<this.state.article.length;i++) {
            create_time[i] = Format(this.state.article[i].create_time)
            console.log(create_time[i])
        }
        console.log(this.store.reviseStatus)
        return (
            <div className="detail-wrapper">
                <div className="content-part">
                    <div className="detail-content">
                        {
                            this.state.article.length?this.state.article.map((item,index) =>
                                <li key={index} className="detailLi">
                                    <h3 className="articleTitle">{item.headerline}</h3>
                                    <div className="assistantPart">
                                        <span className="author">{item.author}</span>
                                        <span className="time">{create_time[index]}</span>
                                    </div>
                                    <div dangerouslySetInnerHTML={{__html: escape(item.content)}}></div>
                                    <div className="foot">
                                        <span className="skimnum">阅读量：{item.skimnum}</span>
                                        <span className="replynum">评论</span>
                                    </div>
                                </li>
                            ):'还没有相关数据，敬请期待'
                        }
                    </div>
                    <div className="function-part">
                        <span className={this.state.followClassName} onClick={this.followFn.bind(this)}>{this.state.followState}</span>
                        <a className="btn-item" href="#editorPart" onClick={this.willReplyFn.bind(this)}>我要回答</a>
                        <a className="btn-item" onClick={this.reviseFn.bind(this)}>在线编辑</a>
                    </div>
                </div>

                    <CommonReply replyList={this.state.replyList}/>
                    <div className="container">
                        <div className="editor-box" id="editorPart">
                            {/* 将生成编辑器 */}
                            <div ref="editorElem" style={{textAlign: 'left',zIndex:10}}>
                            </div>
                            <div className="foot">
                                <span className="submitBtn" onClick={this.replySubmitFn.bind(this)}>提交</span>
                            </div>
                        </div>
                    </div>
                <QuickAlert quickAlertShow={this.state.quickAlertShow} quickAlertContent={this.state.quickAlertContent}/>
                <Alert alertTitle="提示" alertShow={this.state.alertShow} alertContent="请登录获取权限" btnList={this.state.btnList} alertControl={this.alertControl.bind(this)}/>
            </div>
        )
    }

    // 在线编辑
    reviseFn() {
        let article = this.state.article
        this.reviseArticleFn(article)
        this.reviseStoreFn()
        // console.log(this.store.reviseStatus)
    }

}

// Detail.defaultProps = {
//     reviseFn() {
//         this.reviseStoreFn()
//     }
// }
export default Detail
