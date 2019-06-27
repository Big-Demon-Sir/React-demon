import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';

import MyButton from '../my-button';
import { reqWeather } from '../../api/ajax';
import { getItem, removeItem } from '../../utils/storage-tools';
import menuList from '../../config/menu-config';

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
        }, 1000);

        //发送请求，请求天气
        const { promise, cancel } = reqWeather();

        this.cancel = cancel;

        const result = await promise;

        if(result) {
            this.setState(result);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.title = this.getTitle(nextProps);
    }

    componentWillUnmount() {
        //清除定时器
        clearInterval(this.timeId);
        //取消了ajax请求
        this.cancel();
    }
     
    //退出（登出）
    logout = () => {
        Modal.confirm({
            title: '您确认要退出登录吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                //清空本地数据
                removeItem();
                //退出登录
                this.props.history.replace('/login');
            }
        })
    };

    //获取title
    getTitle = (nextProps) => {
        const { pathname } = nextProps.location;
        for (let i = 0; i < menuList.length; i++) {
            const menu = menuList[i];
            if (menu.children) {
                for (let j = 0; j < menu.children.length; j++) {
                    const item = menu.children[j];
                    if(item.key === pathname) {
                        return item.title;
                    }
                }
            } else {
                if (menu.key === pathname) {
                    return menu.title;
                }
            }
        }
    };


    render() {

        const { sysTime, weather, weatherImg } = this.state;

        return <div>
            <div className="header-main-top">
                <span>欢迎, admin</span>
                <MyButton>退出</MyButton>
            </div>
            <div className="header-main-buttom">
                <span className="header-main-left">用户管理</span>
                <div className="header-main-right">
                    <span>{dayjs(sysTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                    <img src={weatherImg} alt="logo"/>
                    <span>{weather}</span>
                </div>
            </div>
        </div>
    }
}
export default withRouter(HeaderMain);