/**
 * Created by mac on 2018/1/27.
 */
import React, {Component} from 'react';
import './Style.css'
import {NavLink} from 'react-router-dom';

class TabBar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="tabBar-wrapper">
                <ul onClick={this.props.tabClick}>
                    <li><NavLink exact activeClassName="active" to="/myCenter/trends">我的关注</NavLink></li>
                    <li><NavLink activeClassName="active" to="/myCenter/article">我的发布</NavLink></li>
                    <li><NavLink activeClassName="active" to="/myCenter/reply">我的回答</NavLink></li>
                    {/*<li><NavLink activeClassName="active" to="/myCenter/question">提问</NavLink></li>*/}
                </ul>
            </div>
        )
    }
}

TabBar.defaultProps = {
    tabClick() {

    }
}
export default TabBar
