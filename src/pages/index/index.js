/**
 * Created by mac on 2017/12/24.
 */
import React, {Component} from 'react';
import './Style.css'
import CommonContent from './../../components/commonContent/commonContent'

class Index extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="Index-wrapper">
                <CommonContent/>
            </div>
        )
    }
}

export default Index