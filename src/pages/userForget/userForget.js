/**
 * Created by mac on 2018/1/11.
 */
import React, {Component} from 'react';
import './Style.css'
import Rinput from './../../components/Rinput/Rinput'
import IdentifyInput from './../../components/IdentifyInput/IdentifyInput'
import {verifyEmail,IdentifyGetCode,IdentifypostCode,emailTestPost} from './../../common/js/api'
import {isValidEmail} from './../../common/js/validate'
import Button from './../../components/Button/Button'

class UserForget extends Component {
    constructor() {
        super();
        this.state ={
            InputValue:'',
            registerUserPlaceholder:'清输入登录邮箱',
            registerUserTips:'',
            IdentifyInputTip:'',
            IdentifyImg:'',
            submitTip:''
        }
    }

    componentWillMount() {
        this.IdentifyGetCodeFn()
    }

    // 验证码图片接收
    IdentifyGetCodeFn() {
        var self = this;
        IdentifyGetCode().then(function (response) {
            console.log(response)
            self.setState({
                IdentifyImg:'data:image/png;base64,'+response.data.ccapUrl
            })
        })
    }

    // 获取输入框的值
    RinputGetValue(e) {
        console.log(e.target.value)
        var target = e.target;
        if(isValidEmail(target.value)) {
            this.setState({
                InputValue: e.target.value,
                registerUserTips:''
            })
            verifyEmail(e.target.value).then(response => {
                console.log(response)
                if (response.data.flag) {
                    this.setState({
                        registerUserTips:response.data.message
                    })
                }
            })
        } else {
            this.setState({
                registerUserTips:'邮箱错误，请重新输入'
            })
        }
    }

    refresh() {
        this.IdentifyGetCodeFn()
    }

    // 验证码验证
    IdentifyBlur(e) {
        console.log('blur')
        // console.log(this.state.InputValue)
        console.log(e.target.value)
        var code = e.target.value;
        var self = this;
        IdentifypostCode(code).then(function (response) {
            console.log(response.data)
            if (!response.data.feedback) {
                self.setState({
                    IdentifyInputTip:'验证码错误，清重新输入'
                })
            } else {
                self.setState({
                    IdentifyInputTip:''
                })
            }
        })
    }

    submitOkFn() {
        var userdata = {
            email:this.state.InputValue,
            to:'modifyInfo'
        }
        emailTestPost(userdata).then(response => {
            console.log(response)
        })
    }

    render() {
        return (
            <div className="userForget-wrapper">
                <h2>忘记密码</h2>
                <div className="remark">
                    <span>通过注册邮箱重设密码</span>
                    <a href="/">返回立即登录</a>
                </div>
                <Rinput BlurFn={this.RinputGetValue.bind(this)} InputValue={this.state.InputValue} placeholder={this.state.registerUserPlaceholder} tips={this.state.registerUserTips}/>
                <IdentifyInput tips={this.state.IdentifyInputTip} refresh={this.refresh.bind(this)} BlurFn={this.IdentifyBlur.bind(this)} IdentifyImg={this.state.IdentifyImg}/>
                <Button submitOk={this.submitOkFn.bind(this)} tips={this.state.submitTip}/>
            </div>
        )
    }
}

export default UserForget
