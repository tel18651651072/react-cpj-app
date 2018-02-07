/**
 * Created by mac on 2017/12/27.
 */
import React, {Component} from 'react';
import './Style.css'

class Header extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="header-wrapper">
                {this.props.children}
            </div>
        )
    }
}

export default Header