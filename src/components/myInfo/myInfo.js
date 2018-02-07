/**
 * Created by mac on 2018/1/27.
 */

import React, {Component} from 'react';
import './Style.css';

class MyInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let input;
        if(this.props.flag) {
            input = (<input type="file" name="imageUpLoad" accept="image/jpeg,image/png" onChange={this.props.imgFileFn}/>)
        }else{
            input = ''
        }
        return (
            <div className="myInfo-wrapper">
                <dl>
                    <div className="avatar">
                        <img src={this.props.Avatar}/>
                        {input}
                    </div>
                    <dt className="name">
                        {this.props.myInfo.nickname}
                    </dt>
                    <dd className="rank">
                        {this.props.myInfo.rank}级・{this.props.myInfo.designTitle}
                    </dd>
                    {/*<dd className="designTitle">*/}
                        {/*{this.props.myInfo.designTitle}*/}
                    {/*</dd>*/}
                    <dd className="illustration">
                        {this.props.myInfo.illustration}
                    </dd>
                </dl>
            </div>
        )
    }
}

MyInfo.defaultProps = {
    Avatar:require('./../../static/images/avatar.png'),
    flag:true,
    myInfo:{
        nickname:'小小臭皮匠',
        rank:1,
        designTitle:'小小臭皮匠',
        illustration:'一只无忧无虑的小菜鸟，然而梦想着成为大神的那一天',
    },
    imgFileFn() {

    }
}

export default MyInfo
