import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';

import LeftNav from '../../components/left-nav';
import { getItem } from '../../utils/storage-tools';
import { reqValidateUserInfo } from '../../api/ajax';


const { Header, Content, Footer, Sider } = Layout;


export default class Admin extends Component {
    state = {
        collapsed: false,
        isLoading: true,
        success: false
    };
    
    onCollapse = collapsed => {
        //console.log(collapsed);
        this.setState({ collapsed });
    };

    async componentWillMount() {
        //判断登录是否成功
        const user = getItem();

        //判断用户是刷新进来的还是登录进来的
        if(user && user._id) {
            //发送请求验证，看用户信息是否合法
            //如果用户是登录进来的，就不需要，如果用户是使用之前的缓存值-->刷新访问进来，就需要
            const result = await reqValidateUserInfo(user._id);

            if(result) {
                return this.setState({
                    isLoading: false,
                    success: true
                })
            }
        }

        this.setState({
            isLoading: false,
            success: false
        })
    }


    render() {

        const { collapsed } = this.state;

        if (isLoading) return null;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <LeftNav collapsed={collapsed}/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '10px 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}