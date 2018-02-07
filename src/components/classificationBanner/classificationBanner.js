/**
 * Created by mac on 2018/1/14.
 */

import React, {Component} from 'react';
import './Style.css'

class ClassificationBanner extends Component {
    constructor(props) {
        super(props);
        props = {
            classificationList:[]
        }
    }

    render() {
        return(
            <div className="classificationBanner-wrapper">
                <span>选择类别：</span>
                <ul onClick={this.props.selectList}>
                    {
                        this.props.classificationList.map((item,index) => {
                            return <li key={item.toString()}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
ClassificationBanner.defaultProps = {
    classificationList:[],
    selectLsit() {

    }
}

export default ClassificationBanner