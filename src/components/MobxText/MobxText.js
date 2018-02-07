/**
 * Created by mac on 2017/12/26.
 */

import React, { Component } from "react";
// 引入观察者
import { observer, inject } from "mobx-react";
import { observable } from "mobx";

@inject("orderline",'timer')
@observer
export class MobxTest extends Component {
    @observable secondsPassed = 0;
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log(this.props);
        console.log(this.props.orderline.amount);
        return (
            <div>
                <p>{this.props.orderline.total}</p>
                <p>{this.props.timer.mytimer.timer}</p>
                <p>{this.props.timer.resetTime()}</p>
                <p>{this.secondsPassed}</p>
                <button onClick={this.onReset.bind(this)}>按钮</button>
            </div>
        );
    }
    componentWillReact() {
        console.log("componentWillReact方法");
    }
    componentWillMount() {
        console.log("componentWillMount方法");
    }
    onReset() {
        this.props.orderline.resize();
    }
}

export default MobxTest;
