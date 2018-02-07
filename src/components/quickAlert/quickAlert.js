/**
 * Created by mac on 2018/1/16.
 */

import React, {Component} from 'react';
import './Style.css'

class QuickAlert extends Component {
    constructor() {
        super()
    }

    render() {
        const className = [
            "quickAlert-wrapper",
            this.props.quickAlertShow
        ].join(' ')
        return (
            <div className={className}>{this.props.quickAlertContent}</div>
        )
    }
}

QuickAlert.defaultProps = {
    quickAlertContent:'nihao'
}

export default QuickAlert
