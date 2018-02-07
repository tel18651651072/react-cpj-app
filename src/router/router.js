
import React, {Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import UserForget from './../pages/userForget/userForget'
import Index from './../pages/index/index'
import Register from './../pages/Register/Register'
import ModifyInfo from './../pages/modifyInfo/modifyInfo'
import NewPart from './../pages/newPart/newPart'
import CssPart from './../pages/cssPart/cssPart'
import JsPart from './../pages/jsPart/JsPart'
import VuePart from './../pages/vuePart/vuePart'
import ReactPart from './../pages/reactPart/reactPart'
import AngularPart from './../pages/angular/angular'
import AppProject from './../pages/appProject/appProject'
import Node from './../pages/node/node'
import SearchPage from './../pages/searchPage/searchPage'
import Detail from './../pages/detail/detail'
import MyCenter from './../pages/myCenter/myCenter'
class Routes extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Route exact path="/" component={Index}/>
                <Route path="/userForget" component={UserForget}/>
                <Route path="/register" component={Register}/>
                <Route path="/modifyInfo" component={ModifyInfo}/>
                <Route path="/newPart" component={NewPart}/>
                <Route path="/cssPart" component={CssPart}/>
                <Route path="/jsPart" component={JsPart}/>
                <Route path="/vuePart" component={VuePart}/>
                <Route path="/reactPart" component={ReactPart}/>
                <Route path="/angularPart" component={AngularPart}/>
                <Route path="/appProject" component={AppProject}/>
                <Route path="/node" component={Node}/>
                <Route path="/searchpage" component={SearchPage}/>
                <Route path="/detail/:uid" component={Detail}/>
                <Route path="/myCenter/:type" component={MyCenter}/>
            </div>
        )
    }
}

export default Routes
