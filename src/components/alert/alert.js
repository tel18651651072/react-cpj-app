/**
 * Created by mac on 2018/1/15.
 */
import React, {Component} from 'react';
import './Style.css'

class Alert extends Component {
    constructor() {
        super();
    }

    render() {
        const className = [
            "alert-wrapper",
            this.props.alertShow
        ].join(' ')
        return (
            <div className={className}>
                <header>{this.props.alertTitle}</header>
                <div className="content">{this.props.alertContent}</div>
                <footer onClick={this.props.alertControl}>
                    {
                        this.props.btnList.map((item) => {
                            return <a key={item.toString()}>{item}</a>
                        })
                    }
                </footer>
            </div>
        )
    }
}

Alert.defaultProps = {
    alertTitle:'',
    alertContent:'',
    btnList:['确定'],
    alertControl() {

    },
    alertShow:''
}

export default Alert
