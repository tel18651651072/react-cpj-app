/**
 * Created by mac on 2018/1/14.
 */
import React, {Component} from 'react';
import './Style.css';
import PropTypes from 'prop-types';

class Issue extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="issue-wrapper">
                <span className="issueBtn" onClick={this.props.issueClickFn}>发表</span>
            </div>
        )
    }
}
Issue.propTypes = {
    issueClickFn:PropTypes.func
}

export default Issue