/**
 * Created by mac on 2018/1/16.
 */
import React, {Component} from 'react';
import './Style.css';
import NavbarBanner from './../../components/navbarBanner/NavbarBanner'
import {Link} from 'react-router-dom';
import {Format} from './../../common/js/Format'

class CommonContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const create_time = [];
        for (let i=0;i<this.props.contentList.length;i++) {
            create_time[i] = Format(this.props.contentList[i].create_time)
            console.log(create_time[i])
        }
        return (
            <div className="commonContent-wrapper">
                <NavbarBanner/>
                <div className="commonContent-container">
                    <div className="contentList">
                        <ul>
                            {
                                this.props.contentList.length?this.props.contentList.map((item, index)=>
                                    <li className="contentLi" key={index}>
                                        <div className="author"><label>{item.author?item.author:'无名英雄'}</label>发表于：<label>{create_time[index]}</label></div>
                                        <div><Link to={`/detail/${item.uid}`}>{item.headerline}</Link></div>
                                        {/*<div dangerouslySetInnerHTML={{__html: escape(item.content)}}></div>*/}
                                        <ul><span>相关类别：</span>{
                                            item.classify.split(',').map((item,index) =>
                                                <li className="classifyList" key={index}>{item}</li>
                                            )
                                        }</ul>
                                    </li>
                                ):'还没有相关内容，敬请期待'
                            }
                        </ul>
                    </div>
                    <div className="relatedList">相关列表内容</div>
                </div>
            </div>
        )
    }
}
CommonContent.defaultProps = {
    contentList:[]
}
export default CommonContent
