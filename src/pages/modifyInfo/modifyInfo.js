/**
 * Created by mac on 2018/1/11.
 */
import React, {Component} from 'react';
import './Style.css';
import Rinput from './../../components/Rinput/Rinput'
import Button from './../../components/Button/Button'
import {register,modifyInfo} from './../../common/js/api'
import {GetQueryString} from './../../common/js/params'
import {isValidPassword} from './../../common/js/validate'
class ModifyInfo extends Component {
    constructor() {
        super();
        this.state = {
            passPlaceholder:'请输入6-16位密码，区分大小写，不能有空格',
            reconfirmPlaceholder:'请再次确认密码',
            registerEmail:'',
            password:'',
            reconfirmpassword:'',
            registerEmailTips:'',
            registerEmailSecTips:'',
            InputTypePass:'password'
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        console.log(this.props.location)
        console.log(GetQueryString("token"))
        let token = GetQueryString("token")
        register(token).then(reponse => {
            console.log(1)
            console.log(reponse.data)
            this.setState({
                registerEmail:reponse.data
            })
        })
    }

    RinputGetValue(e) {
        if (isValidPassword(e.target.value)) {
            this.setState({
                password:e.target.value,
                registerEmailTips:''
            })
        } else {
            this.setState({
                registerEmailTips:'请输入6-16位密码，区分大小写，不能有空格'
            })
        }
    }

    RinputGetSecValue(e) {
        if (e.target.value!==this.state.password) {
            this.setState({
                registerEmailSecTips:'密码不一致，请重新输入'
            })
        } else {
            this.setState({
                registerEmailSecTips:'',
                reconfirmpassword:e.target.value
            })
        }
    }

    submitOk(e) {
        console.log(e.target)
        let userOpt = [
            this.state.password,
            this.state.registerEmail
        ]
        if (this.state.registerEmailSecTips===''&&this.state.registerEmailTips==='') {
            modifyInfo(userOpt).then(reponse => {
                console.log(reponse)
                var flag = reponse.flag
                if (!flag) {
                    this.setState({
                        registerEmailSecTips:'清不要重复提交数据'
                    })
                    return
                }
            })
        }
    }

    render() {
        return (
            <div className="register-wrapper">
                <div className="register-container">
                    <Rinput BlurFn={this.RinputGetValue.bind(this)} InputType={this.state.InputTypePass} placeholder={this.state.passPlaceholder} tips={this.state.registerEmailTips}/>
                    <Rinput BlurFn={this.RinputGetSecValue.bind(this)} InputType={this.state.InputTypePass} placeholder={this.state.reconfirmPlaceholder} tips={this.state.registerEmailSecTips}/>
                    <Button submitOk={this.submitOk.bind(this)}/>
                </div>
            </div>
        )
    }
}


export default ModifyInfo

