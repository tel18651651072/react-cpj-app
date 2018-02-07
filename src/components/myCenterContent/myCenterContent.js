/**
 * Created by mac on 2018/1/27.
 */
import React, {Component} from 'react';
import './Style.css'
import TabBar from './../tabBar/tabBar'
import {Link} from 'react-router-dom';

class MyCenterContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="commonContent-wrapper">
                <div className="commonContent-container">
                    <div className="contentList">
                        <TabBar tabClick={this.props.tabClick}/>
                        <ul className="myCenterList">
                            {this.props.centerContentList.length?this.props.centerContentList.map((item,index) =>
                                <li key={index}><Link to={`/detail/${item.uid}`}>{item.headerline}</Link></li>
                            ):'没有相关内容'}
                        </ul>
                    </div>
                    <div className="relatedList">相关列表内容</div>
                </div>
            </div>
        )
    }
}

MyCenterContent.defaultProps =  {
    centerContentList:[],
    tabClick() {

    }
}
export default MyCenterContent
