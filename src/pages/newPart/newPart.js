/**
 * Created by mac on 2018/1/13.
 */
import React,{Component} from 'react';
import './Style.css'
import CommonContent from './../../components/commonContent/commonContent'

class NewPart extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="newPart-wrapper">
                <CommonContent/>
            </div>
        )
    }
}

export default NewPart
