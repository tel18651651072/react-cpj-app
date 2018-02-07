/**
 * Created by mac on 2017/12/27.
 */
import React, {Component} from 'react';
import './Style.css';
import {observer,inject} from 'mobx-react';
import Rinput from './../Rinput/Rinput'
import IdentifyInput from "./../IdentifyInput/IdentifyInput";
import {IdentifyGetCode, IdentifypostCode, emailTestPost,verifyEmail,verifyLogin} from './../../common/js/api'
import {isValidEmail,isValidPassword} from './../../common/js/validate'
import './../../common/css/style.css'
import Checkbox from './../Checkbox/Checkbox'
import Button from './../Button/Button'

@inject('store')
@observer
class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUserTips:'',
            registerUserTips:'',
            submitTip:'',
            loginUserPlaceholder:'请输入登录邮箱',
            registerUserPlaceholder:'请输入注册邮箱',
            loginPasswordPlaceholder:'请输入6-16位密码，区分大小写，不能有空格',
            loginPasswordTips:'',
            loginContent:'content loginContent active',
            registerContent:'content registerContent',
            IdentifyImg:'',
            InputValue:'',
            loginEmail:'',
            loginPassword:'',
            InputTypePass:'password',
            IdentifyInputTip:'',
            loginSubmitTip:'',
            loginTagClassname: ['loginTag','active'],
            registerTagClassname:['registerTag'],
            iconCross:'icon-cross',
            textAlign:'right'
        }
        this.store = this.props.store;
        this.changeLoginState = this.store.changeLoginState.bind(this.store)
        this.getEmail = this.store.getEmail.bind(this.store)
        props = {
            closeFn() {

            }
        }
    }

    componentWillMount() {
        this.IdentifyGetCodeFn()
    }

    componentDidMount() {

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

    // 验证码刷新
    refresh() {
        console.log('refresh b')
        this.IdentifyGetCodeFn()
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
                if (!response.data.flag) {
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

    // 提交发送邮件
    submitOkFn() {
        var self = this;
        var emailValue = this.state.InputValue;
        if(isValidEmail(emailValue)&&this.state.IdentifyInputTip==='') {
            let userdata = {
                email:emailValue,
                to:'register'
            }
            emailTestPost(userdata).then(function (response) {
                console.log(response)
                self.setState({
                    submitTip:'请到注册邮箱查收'
                })
                setTimeout(() => {
                    self.props.closeFn()
                },500)
            })
        } else {
            return
        }
    }

    // 登录 邮箱验证
    loginInputGetValue(e) {
        var target = e.target
        if(isValidEmail(target.value)) {
            this.setState({
                loginEmail: e.target.value,
                loginUserTips:''
            })
            verifyEmail(e.target.value).then(response => {
                console.log(response)
                if (response.data.flag) {
                    this.setState({
                        loginUserTips:response.data.message
                    })
                }
            })
        } else {
            this.setState({
                loginUserTips:'邮箱错误，请重新输入'
            })
        }
    }

    // 登录密码验证
    loginGetPassValue(e) {
        if (isValidPassword(e.target.value)) {
            this.setState({
                loginPassword:e.target.value,
                loginPasswordTips:''
            })
        } else {
            this.setState({
                loginPasswordTips:'请输入6-16位密码，区分大小写，不能有空格'
            })
        }
    }

    // 登录提交
    loginSubmit() {
        console.log('login')
        let userdata = [
            this.state.loginEmail,
            this.state.loginPassword
        ]
        if (this.state.loginUserTips!==''||this.state.loginPasswordTips!=='') {
            this.setState({
                loginSubmitTip:'确保信息正确再提交'
            })
        } else {
            verifyLogin(userdata).then(response => {
                console.log(response.data)
                var email = response.data.email,
                    token = response.data.token;
                this.getEmail(email)
                // sessionStorage.setItem('token',token);
                this.setState({
                    loginSubmitTip:'登录成功'
                })
                this.changeLoginState()
                setTimeout(() => {
                    this.props.closeFn()
                },500)
                // 退出状态改为非退出状态
                this.store.exitStatus = false
                // 触发检查关注状态
                this.store.ifFollow = 1
            })
        }
    }

    render() {
        let className = [
            "Modal-wrapper",
            this.props.className
        ].join(' ')

        // let loginTagClassname = ['loginTag','active'],
        //     registerTagClassname = ['registerTag'];

        return (
            <div className={className}>
                <header onClick={this.tapClick.bind(this)}>
                    <a className={this.state.loginTagClassname.join(' ')}><span>登录</span></a>
                    <a className={this.state.registerTagClassname.join(' ')}><span>注册</span></a>
                    <a className="closeBtn" onClick={this.props.closeFn.bind(this)}>
                        <i className={this.state.iconCross}></i>
                    </a>
                </header>
                <div className={this.state.loginContent}>
                    <Rinput BlurFn={this.loginInputGetValue.bind(this)} InputValue={this.state.loginEmail} placeholder={this.state.loginUserPlaceholder} tips={this.state.loginUserTips}/>
                    <Rinput BlurFn={this.loginGetPassValue.bind(this)} InputType={this.state.InputTypePass} InputValue={this.state.loginPassword} placeholder={this.state.loginPasswordPlaceholder} tips={this.state.loginPasswordTips}/>
                    <div className="addition" style={{textAlign:'right'}}>
                        <a href="./userForget">找回密码</a>
                    </div>
                    <Button submitOk={this.loginSubmit.bind(this)} tips={this.state.loginSubmitTip}/>
                </div>
                <div className={this.state.registerContent}>
                    <Rinput BlurFn={this.RinputGetValue.bind(this)} InputValue={this.state.InputValue} placeholder={this.state.registerUserPlaceholder} tips={this.state.registerUserTips}/>
                    <IdentifyInput tips={this.state.IdentifyInputTip} refresh={this.refresh.bind(this)} BlurFn={this.IdentifyBlur.bind(this)} IdentifyImg={this.state.IdentifyImg}/>
                    <Checkbox>
                        <label>同意</label>
                        <a>xx注册协议</a>
                    </Checkbox>
                    <Button submitOk={this.submitOkFn.bind(this)} tips={this.state.submitTip}/>
                </div>
            </div>
        )
    }

    // tab键点击
    tapClick(e) {
        console.log(e.target)
        console.log(e)
        var registerTagIndexActive = this.state.registerTagClassname.indexOf('active'),
            loginTagIndexActive = this.state.loginTagClassname.indexOf('active');
        var target = e.target;
        while(target.tagName.toLowerCase()!=='header') {
            if (target.className.split(' ').indexOf('loginTag')>-1) {
                this.setState({
                    loginContent:'content loginContent active',
                    registerContent:'content registerContent'
                })
                if (registerTagIndexActive>-1) {
                    this.state.registerTagClassname.pop()
                }
                if (loginTagIndexActive<0) {
                    this.state.loginTagClassname.push('active')
                }
            } else {
                this.setState({
                    loginContent:'content loginContent',
                    registerContent:'content registerContent active'
                })
                if (loginTagIndexActive>-1&&target.tagName.toLowerCase()==='a') {
                    this.state.loginTagClassname.pop()
                }
                if (registerTagIndexActive<0&&target.tagName.toLowerCase()==='a') {
                    this.state.registerTagClassname.push('active')
                }
            }
            target = target.parentNode;
        }

    }

}
Modal.defaultProps = {
    closeFn() {

    }
}
export default Modal
