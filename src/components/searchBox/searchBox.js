/**
 * Created by mac on 2018/1/17.
 */
import React, {Component} from 'react';
import './Style.css';
import './../../common/css/style.css'
import {withRouter} from "react-router-dom";
import {observer,inject} from 'mobx-react'

@inject('store')
@observer
class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData:''
        }
        this.store = this.props.store
        this.searchDataState = this.store.searchDataState.bind(this.store)
    }

    changehandle(e) {
        console.log(e.target.value)
        this.setState({
            searchData:e.target.value
        })
    }

    searchFn() {
        console.log(this.state.searchData)
        this.searchDataState(this.state.searchData)
        this.props.history.push("/searchPage");
    }
    render() {
        return (
            <div className="searchBox-wrapper">
                <input onChange={this.changehandle.bind(this)}/>
                <span className="searchBtn" onClick={this.searchFn.bind(this)}><i className="icon-search"></i></span>
            </div>
        )
    }
}

// SearchBox.defaultProps = {
//     searchFn() {
//         this.props.history.push("/searchPage");
//     }
// }
export default withRouter(SearchBox)