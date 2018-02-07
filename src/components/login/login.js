/**
 * Created by mac on 2017/12/24.
 */

import React, {Component} from 'react';
import './Style.css';
import PropTypes from 'prop-types';
import {observer,inject} from 'mobx-react';
import {removeSessionEmail} from './../../common/js/api';
import {withRouter} from "react-router-dom";

@inject('store')
@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            count:0
        }
        this.store = this.props.store;
    }

    render() {
        return (
            <div className="Login-wrapper" onClick={this.store.email?this.linkToMyCenter.bind(this):this.props.loginClick}>
                {this.store.email?this.store.email+"你好":"登录/注册"}
                <br/><span onClick={this.leaveClick.bind(this)}>{this.store.email?'退出':''}</span>
            </div>
        )
    }

    leaveClick(e) {
        console.log(e.target.nodeName.toLowerCase())
        if (e.target.nodeName.toLowerCase()==='span') {
            this.store.email = ''
            removeSessionEmail().then(response => {
                console.log(response.data)
                this.props.history.push('/')
            })
            e.stopPropagation();
            this.setState({
                count:1
            })
        } else {
            return
        }
    }

    linkToMyCenter() {
        this.props.history.push('/myCenter/trends')
    }
}

Login.propTypes = {
    loginClick:PropTypes.func
}

export default withRouter(Login)