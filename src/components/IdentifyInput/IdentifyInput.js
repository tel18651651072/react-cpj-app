/**
 * Created by mac on 2018/1/1.
 */

import React, {Component} from 'react';
import './Style.css';
import Rinput from './../Rinput/Rinput'
import './../../common/css/style.css'

class IdentifyInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontIcon:'icon-loop2'
        }

        props = {
            IdentifyImg:'',
            BlurFn() {

            },
            InputValue:'',
            tips:''
        }
    }

    render() {
       return (
           <div className="IdentifyInput-wrapper">
               <Rinput tips={this.props.tips} InputValue={this.props.InputValue} placeholder="请输入验证码" BlurFn={this.props.BlurFn.bind(this)}/>
               <div className="IdentifyImg"><img src={this.props.IdentifyImg} /></div>
               <span className="iconBox" onClick={this.props.refresh.bind(this)}><i className={this.state.fontIcon}></i></span>
           </div>
       )
    }
}
IdentifyInput.defaultProps = {
    IdentifyImg:'',
    BlurFn() {
       console.log('aaaaa')
    },
    refresh() {
        console.log('refresh a')
    }
}
export default IdentifyInput
