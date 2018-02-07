/**
 * Created by mac on 2018/1/24.
 */
import React, {Component} from 'react';
import './Style.css';
// import {fetchReply} from './../../common/js/api'
import {escape} from './../../common/js/escape'
import {Format} from './../../common/js/Format'
// import NavbarBanner from './../../components/navbarBanner/NavbarBanner'
// import {Link} from 'react-router-dom';

class CommonReply extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    componentDidMount() {

    }

    render() {
        let time = []
        for (let i=0;i<this.props.replyList.length;i++) {
            time[i] = Format(this.props.replyList[i].time)
            console.log(time[i])
        }
        return (
            <div className="commonContent-wrapper">
                <div className="commonContent-container">
                    <div className="contentList">
                        <ul>
                            {
                                this.props.replyList.length?this.props.replyList.map((item, index)=>
                                    <li className="contentLi" key={index}>
                                        <div className="author"><label>{item.replyer?item.replyer:'无名英雄'}</label>发表于：<label>{time[index]}</label></div>
                                        <div dangerouslySetInnerHTML={{__html: escape(item.content)}}></div>
                                        {/*<ul><span>相关类别：</span>{*/}
                                            {/*item.classify.split(',').map((item,index) =>*/}
                                                {/*<li className="classifyList" key={index}>{item}</li>*/}
                                            {/*)*/}
                                        {/*}</ul>*/}
                                    </li>
                                ):'目前还没有回复哦～'
                            }
                        </ul>
                    </div>
                    <div className="relatedList">相关列表内容</div>
                </div>
            </div>
        )
    }
}
CommonReply.defaultProps = {
    replyList:[]
}
export default CommonReply
