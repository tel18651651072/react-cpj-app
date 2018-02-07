/**
 * Created by mac on 2018/1/10.
 */

import React, {Component} from 'react';
import {Provider} from 'mobx-react';
import App from './../../App'
import SuccessState from './../../store/store'

class Wrapper extends Component {
    constructor(props) {
        super(props);
        props = {
            children:''
        }
    }

    render() {
        return (
            <Provider store={SuccessState}>
                <App/>
            </Provider>
        )
    }
}

export default Wrapper
