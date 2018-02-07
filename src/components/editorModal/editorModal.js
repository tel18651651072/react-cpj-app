/**
 * Created by mac on 2018/1/14.
 */
import React, {Component} from 'react';
import './Style.css'
import E from 'wangeditor'
import Rinput from './../Rinput/Rinput'
import ClassificationBanner from './../classificationBanner/classificationBanner'
import Button from './../Button/Button'
import {submitContent} from './../../common/js/api'
import QuickAlert from './../quickAlert/quickAlert'
import {observer,inject} from 'mobx-react'

@inject('store')
@observer
class EditorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classificationList:['css','javascript','vue','react','angular','nodejs','app方案'],
            TitlePlaceholder:'请输入标题',
            selectArr:[],
            headerline:'',
            content:'',
            quickAlertShow:'',
            quickAlertContent:'',
            inputValue:''
        }
        this.store = this.props.store;
        this.changeEditorState = this.store.changeEditorState.bind(this.store)
    }

    getInitialState() {
        return {checked: false};
    }

    componentDidMount() {
        const elem = this.refs.editorElem
        this.editor = new E(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        this.editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html
            })
        }
        this.editor.create()
        if (this.reviseArticle.length) {
            this.setState({
                headerline:this.reviseArticle[0].headerline
            })
        }

    }

    clickHandle() {
        alert(this.state.editorContent)
    }

    // 选择类别
    selectList(e) {
        console.log(e.target.innerHTML)
        var target = e.target;
        var newArray = this.state.selectArr.slice()
        if(target.tagName.toLowerCase()==='li') {
            if (target.style.color==='dodgerblue') {
                target.style.color='darkgray'
                target.style.borderColor='darkgray'
                newArray.pop(target.innerHTML)
            } else {
                target.style.color='dodgerblue'
                target.style.borderColor='dodgerblue'
                newArray.push(target.innerHTML)
            }
            this.setState({
                selectArr:newArray
            })
            console.log(newArray)
        }
    }

    // 获取标题
    blurFn(e) {
        console.log(e.target.value)
        this.setState({
            headerline:e.target.value
        })
    }

    // editorClose() {
    //
    // }

    // 提交编辑内容
    editorSubmit() {
        var effective = true;
        if (this.state.headerline==='') {
            this.setState({
                quickAlertShow:'quickAlertShow',
                quickAlertContent:'标题不能为空'
            })
            effective = false
        }
        if (!this.state.editorContent) {
            this.setState({
                quickAlertShow:'quickAlertShow',
                quickAlertContent:'内容不能为空'
            })
            effective = false
        }
        if (this.state.selectArr.length===0) {
            this.setState({
                quickAlertShow:'quickAlertShow',
                quickAlertContent:'请选择至少一个类型'
            })
            effective = false
        }
        if (!effective) {
            return
        } else {
            var contentData = {
                headerline:this.state.headerline,
                content:this.state.editorContent,
                classify:this.state.selectArr
            }
            submitContent(contentData).then(response => {
                console.log(response)
                setTimeout(() => {
                    this.props.editorClose()
                },500)
                this.changeEditorState()
                console.log(this.store.editorSuccess)
            })
        }
    }

    render() {
        this.reviseArticle = this.store.reviseArticle.slice()
        if (this.reviseArticle.length) {
            this.editor.txt.html(this.reviseArticle[0].content)
        } 

        const className = [
            'editorModal-wrapper',
            this.props.className
        ].join(' ')

        const title = this.reviseArticle[0] ? this.reviseArticle[0].headerline : null
        console.log('issueStatus')
        console.log(this.props.store.issueStatus)
        console.log(title)
        return (
        <div className={className}>
            { this.props.store.issueStatus||title ?
            < Rinput InputValue={title} placeholder={this.state.TitlePlaceholder} BlurFn={this.blurFn.bind(this)}/>:null
            }
            <ClassificationBanner classificationList={this.state.classificationList} selectList={this.selectList.bind(this)}/>
            {/* 将生成编辑器 */}
            <div ref="editorElem" style={{textAlign: 'left'}}>
            </div>
            <div className="editorFoot">
                <Button buttonValue='关闭' submitOk={this.props.editorClose}/>
                <Button buttonValue="发布" submitOk={this.editorSubmit.bind(this)}/>
            </div>
            <QuickAlert quickAlertShow={this.state.quickAlertShow} quickAlertContent={this.state.quickAlertContent}/>
            {/*<button onClick={this.clickHandle.bind(this)}>获取内容</button>*/}
        </div>
        )
    }
}
EditorModal.defaultProps = {
    editorClose() {

    }
}
export default EditorModal
