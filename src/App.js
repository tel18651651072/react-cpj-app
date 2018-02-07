import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Link,NavLink} from 'react-router-dom';
import Header from './components/Header/Header'
import Login from './components/login/login'
import Modal from './components/modal/Modal'
import Issue from './components/issue/issue'
// import Index from './pages/index/index'
// import Register from './pages/Register/Register'
import ReactSVG from 'react-svg';
import {observer,inject} from 'mobx-react'
import Routes from './router/router'
import EditorModal from './components/editorModal/editorModal'
import Alert from './components/alert/alert'
import Mask from './components/mask/mask'
import SearchBox from './components/searchBox/searchBox'
import {PropTypes} from 'prop-types'
import {getSessionEmail} from './common/js/api'
import Logo from './components/logo/logo'

@inject('store')
@observer
class App extends Component {
  constructor(props, context) {
     super(props, context);
     this.state = {
         modalShow:'',
         editorModalShow:'',
         editorContent: '',   // 编辑器内容状态
         btnList:['取消','确定'],
         alertShow:'',
         maskShow:''
     }
     this.store = this.props.store;
     this.getEmail = this.store.getEmail.bind(this.store)
      this.issueStoreFn = this.store.issueStoreFn.bind(this.store)

   }

   closeFn() {
      this.setState({
          modalShow:'',
          maskShow:''
      })
   }

    componentWillMount() {
      getSessionEmail().then(response => {
          console.log(response)
          this.getEmail(response.data)

      })
    }
    componentDidMount() {

    }

    // componentWillReceiveProps(nextProps) {
    //   console.log(nextProps)
    //     console.log(this.store.reviseStatus)
    // }

    componentWillUpdate() {
         // console.log(this.props)

    }

    componentDidUpdate(){
        // if (this.store.reviseStatus) {
        //     this.issueClickFn()
        // }
    }

  render() {
      if (this.store.reviseStatus) {
          this.issueClickFn()
      }

    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <Header>
                        <div className="container">
                            <div className="logo">
                                <Logo/>
                            </div>
                            <div className="home">
                                <NavLink exact activeClassName="active" to="/">首页</NavLink>
                                <NavLink to="/">小书</NavLink>
                                <NavLink to="/">八卦</NavLink>
                                <NavLink to="/">招聘</NavLink>
                                <NavLink to="/">猿装备</NavLink>
                            </div>
                            <SearchBox/>
                            <Login loginClick={this.loginClick.bind(this)}/>
                            <Issue issueClickFn={this.issueClickFn.bind(this)}/>
                        </div>
                    </Header>
                    <Modal className={this.state.modalShow} closeFn={this.closeFn.bind(this)}/>
                    {/*<div className="banner">*/}
                        {/*<ul className="navbar">*/}
                            {/*<li><NavLink exact activeClassName="active" to="/">推荐</NavLink></li>*/}
                            {/*<li><NavLink activeClassName="active" to="/newPart">最新</NavLink></li>*/}
                            {/*<li><NavLink activeClassName="active" to="/cssPart">css</NavLink></li>*/}
                            {/*<li><NavLink activeClassName="active" to="/jsPart">javascript</NavLink></li>*/}
                            {/*<li><NavLink activeClassName="active" to="/vuePart">vue</NavLink></li>*/}
                            {/*<li><NavLink activeClassName="active" to="/reactPart">react</NavLink></li>*/}
                            {/*<li><NavLink activeClassName="active" to="/AngularPart">angular</NavLink></li>*/}
                            {/*<li><NavLink activeClassName="active" to="/appProject">app方案</NavLink></li>*/}
                            {/*<li><NavLink activeClassName="active" to="/node">nodejs</NavLink></li>*/}
                        {/*</ul>*/}
                    {/*</div>*/}
                    {/*<NavbarBanner/>*/}
                    <Routes/>
                    <EditorModal className={this.state.editorModalShow} editorClose={this.editorClose.bind(this)}/>
                    <Alert alertTitle="提示" alertShow={this.state.alertShow} alertContent="请登录获取发布权限" btnList={this.state.btnList} alertControl={this.alertControl.bind(this)}/>
                    <Mask maskShow={this.state.maskShow}/>
                </div>
            </BrowserRouter>
        </div>
    );
  }
  loginClick() {
      console.log('点击')
      this.setState({
          modalShow:'modalShow',
          maskShow:'maskShow'
      });
      setTimeout(() => {
          this.setState({
              modalShow:'modalShow enlarge'
          })
      },100)
      setTimeout(() => {
          this.setState({
              modalShow:'modalShow enlarge modelOpacity'
          })
      },300)
  }

  // 发布
  issueClickFn(e) {
      getSessionEmail().then(response => {
          console.log(response)
          this.getEmail(response.data)
          if(!this.store.email) {
              console.log('请登录后发布')
              this.setState({
                  alertShow:'alertShow'
              })
              this.store.reviseStatus = 0
              return
          }
          this.setState({
              editorModalShow:'editorModalShow',
              maskShow:'maskShow'
          });
          setTimeout(() => {
              this.setState({
                  editorModalShow:'editorModalShow enlarge'
              })
          },100)
          setTimeout(() => {
              this.setState({
                  editorModalShow:'editorModalShow enlarge modelOpacity'
              })
          },300)
          this.store.reviseStatus = 0
          this.issueStoreFn(1)
      })
  }
    editorClose() {
        this.setState({
            editorModalShow:'',
            maskShow:''
        })
    }

    alertControl(e) {
        console.log(e.target)
        if (e.target.innerHTML==='取消') {
            this.setState({
                alertShow:''
            })
        } else if (e.target.innerHTML==='确定') {
            this.setState({
                alertShow:''
            })
        }
    }
}

export default App;
