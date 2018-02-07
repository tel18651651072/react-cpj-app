/**
 * Created by mac on 2017/12/27.
 */

import React, {Component} from 'react';
import './Style.css'

class Tips extends Component {
    constructor(props) {
        super(props);
        props = {
            tips:''
        }
    }

    render() {
        return (
            <p className="Tips-wrapper">{this.props.tips}</p>
        )
    }
}
Tips.defaultProps = {
    tips:''
}
export default Tips
