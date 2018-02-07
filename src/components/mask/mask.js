/**
 * Created by mac on 2018/1/17.
 */
import React, {Component} from 'react';
import './Style.css'

class Mask extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const className = [
            "mask-wrapper",
            this.props.maskShow
        ].join(' ')
        return (
            <div className={className}></div>
        )
    }
}
Mask.defaultProps = {
    maskShow:''
}
export default Mask