/**
 * Created by mac on 2018/1/3.
 */

import React, {Component} from 'react';
import './Style.css'

class Checkbox extends Component {
    constructor(props) {
        super(props);

        props = {
            optionItem:''
        }
    }

    render() {
        return (
            <div className="CheckBox">
                <input type="checkbox" defaultChecked={this.props.checked}/>
                {this.props.children}
            </div>
        )
    }
}

Checkbox.defaultProps = {
    checked:true
}

export default Checkbox
