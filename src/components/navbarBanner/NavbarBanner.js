/**
 * Created by mac on 2018/1/17.
 */
import React, {Component} from 'react';
import './Style.css'
import {NavLink} from 'react-router-dom';

class NavbarBanner extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="navbarBanner-wrapper">
                <div className="banner">
                    <ul className="navbar">
                        <li><NavLink exact activeClassName="active" to="/">推荐</NavLink></li>
                        <li><NavLink activeClassName="active" to="/newPart">最新</NavLink></li>
                        <li><NavLink activeClassName="active" to="/cssPart">css</NavLink></li>
                        <li><NavLink activeClassName="active" to="/jsPart">javascript</NavLink></li>
                        <li><NavLink activeClassName="active" to="/vuePart">vue</NavLink></li>
                        <li><NavLink activeClassName="active" to="/reactPart">react</NavLink></li>
                        <li><NavLink activeClassName="active" to="/AngularPart">angular</NavLink></li>
                        <li><NavLink activeClassName="active" to="/appProject">app方案</NavLink></li>
                        <li><NavLink activeClassName="active" to="/node">nodejs</NavLink></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default NavbarBanner
