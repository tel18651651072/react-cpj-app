/**
 * Created by mac on 2018/1/14.
 */
import React, {Component} from 'react'
import './Style.css'
import {fetchContent} from './../../common/js/api'
import {observer,inject} from 'mobx-react'
import CommonContent from './../../components/commonContent/commonContent'

@inject('store')
@observer
class AppProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classify: 'app方案',
            contentList:[]
        }
        this.store = this.props.store;
    }

    componentWillMount() {

        fetchContent(this.state.classify).then(response => {
            console.log(response)
            var arr = response.data
            console.log(arr)
            this.setState({
                contentList:arr
            })
        })
    }
    componentDidMount() {
        console.log(this.state.contentList)
    }

    componentWillUpdate() {
        console.log(this.store.editorSuccess)
        if (this.store.editorSuccess===1) {
            fetchContent(this.state.classify).then(response => {
                console.log(response)
                this.setState({
                    contentList:response.data
                })
                this.store.editorSuccess = 0
            })
        }
    }


    render() {
        return (
            <div className="appProject-wrapper">
                <CommonContent contentList = {this.state.contentList}/>
            </div>
        )
    }
}

export default AppProject