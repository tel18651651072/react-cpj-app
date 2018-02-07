/**
 * Created by mac on 2018/1/3.
 */

import React, {Component} from 'react';
import './Style.css';
import Tips from './../Tips/Tips'

class Button extends Component {
    constructor(props) {
        super(props);
        props = {
            tips:''
        }
    }

    render() {
        return (
            <div className="Button" onClick={this.props.submitOk.bind(this)}>
                <button>{this.props.buttonValue}</button>
                <Tips tips={this.props.tips}/>
            </div>
        )
    }
}

Button.defaultProps = {
    buttonValue:'确定',
    submitOk:function () {
        console.log('submitOk')
    },
    tips:''
}

export default Button
