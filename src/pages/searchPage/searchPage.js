/**
 * Created by mac on 2018/1/17.
 */
import React, {Component} from 'react';
import './Style.css'
import {observer,inject} from 'mobx-react'
import {searchResult} from './../../common/js/api'
import {Link} from 'react-router-dom';

@inject('store')
@observer
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResultList:[]
        }
        this.store = this.props.store
    }

    searchResultFn(searchData) {
        if(!searchData) {
            return
        }
        searchResult(searchData).then(response => {
            console.log(response)
            this.setState({
                searchResultList: response.data
            })
            this.store.searchSuccess = 0
        })
    }
    componentWillMount() {
        // console.log(this.store.searchData)
        // var searchData = this.store.searchData
        // this.searchResultFn(searchData)
    }

    componentDidMount() {
        var searchData = this.store.searchData
        this.searchResultFn(searchData)
    }

    componentWillUpdate() {
        var searchData = this.store.searchData
        if (this.store.searchSuccess ===1) {
            this.searchResultFn(searchData)
        }
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div className="searchPage-wrapper">
                <ul>
                    {this.state.searchResultList.length?this.state.searchResultList.map((item,index) =>
                        <li className="searchLi" key={index}>
                            <div><a className="headerline" href={`/detail/${item.uid}`}>{index+1}.{item.headerline}</a></div>
                            <ul><span className="tagSpan">相关类别：</span>{
                                item.classify.split(',').map((item,index) =>
                                    <li className="classifyList" key={index}>{item}</li>
                                )
                            }</ul>
                        </li>
                    ):'没有匹配结果'}
                </ul>
            </div>
        )
    }
}

export default SearchPage
