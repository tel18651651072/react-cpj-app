/**
 * Created by mac on 2017/12/27.
 */
import React, {Component} from 'react';
import './Style.css';
import Tips from './../Tips/Tips'

class Rinput extends Component {
    constructor(props) {
        super(props);
        props = {
            placeholder:'',
            tips:'',
            BlurFn() {

            },
            InputValue:''
        }
    }

    render() {
        console.log(this.props.InputValue)
       return (
           <div className="Rinput-wrapper">
               {}
               <input type={this.props.InputType} defaultValue={this.props.InputValue} placeholder={this.props.placeholder} onBlur={this.props.BlurFn.bind(this)}/>
               <Tips tips={this.props.tips}/>
           </div>
       )
    }

}

Rinput.defaultProps = {
    placeholder:"请输入信息",
    BlurFn() {
        console.log('bbbbbbbbb')
    },
    InputType:'text'
}

export default Rinput