/**
 * Created by mac on 2018/1/14.
 */
import React, {Component} from 'react'
import './Style.css'
import {fetchContent} from './../../common/js/api'
import {observer,inject} from 'mobx-react'
import CommonContent from './../../components/commonContent/commonContent'

@inject('store')
@observer
class JsPart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classify: 'javascript',
            contentList:[]
        }
        this.store = this.props.store;
    }

    componentWillMount() {

        fetchContent(this.state.classify).then(response => {
            console.log(response)
            var arr = response.data
            console.log(arr)
            this.setState({
                contentList:arr
            },() => {
                // let create_time = []
                // for(let i=0;i<this.state.contentList.length; i++) {
                //     create_time[i] = new Date(this.state.contentList[i].create_time).Format("yyyy-MM-dd hh:mm")
                //     console.log(create_time[i])
                // }
            })
        })
    }
    componentDidMount() {
        console.log(this.state.contentList)
    }

    componentWillUpdate() {
        console.log(this.store.editorSuccess)
        if (this.store.editorSuccess===1) {
            fetchContent(this.state.classify).then(response => {
                console.log(response)
                this.setState({
                    contentList:response.data
                })
                this.store.editorSuccess = 0
            })
        }
    }
    componentDidUpdate() {
    }

    render() {
        return (
            <div className="jsPart-wrapper">
                <CommonContent contentList = {this.state.contentList}/>
            </div>
        )
    }
}

export default JsPart
