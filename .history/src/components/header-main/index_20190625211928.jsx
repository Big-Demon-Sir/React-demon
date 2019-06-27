import React, { Component } from 'react';
// import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import MyButton from '../my-button';

import './index.less';

class HeaderMain extends Component {
    //初始化天气
    state = {
        sysTime: Date.now(),
        weather: '晴',
        weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png'
    };
    componentWillMount() {
        //只要读取一次
        this.username = getItem().username;
        this.title = this.getTitle(this.props);
    }

    //异步更新每秒的时间状态
    async componentDidMount() {
        this.timeId = setInterval(() => {
            this.setState({
                sysTime: Date.now()
            })
        }, 1000)
    }
    render() {
        return <div>
            <div className="header-main-top">
                <span>欢迎, admin</span>
                <MyButton>退出</MyButton>
            </div>
            <div className="header-main-buttom">
                <span className="header-main-left">用户管理</span>
                <div className="header-main-right">
                    <span>{Date.now()}</span>
                    <img src={logo} alt="logo"/>
                    <span>晴</span>
                </div>
            </div>
        </div>
    }
}
export default withRouter(HeaderMain);