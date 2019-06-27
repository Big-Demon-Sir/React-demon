import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

import { reqLogin } from '../../api/ajax';
import logo from '../../assets/images/logo.png';
import './index.less';
import { setItem } from '../../utils/storage-tools';

const Item = Form.Item;

function Login(props) {
    //登入函数
    const login = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                const  { username, password } = values;
                //发送请求，请求登录
                const result = await reqLogin(username, password);
                
                if(result) {
                    result.isLogin = true;
                    //登录成功
                    setItem(result);

                    props.history.replace('/');

                } else {
                    //登录失败
                    props.form.resetFields(['password']);
                }

            } else {
                //校验失败
                console.log('登录表单校验失败: ', err);
            }
        });
    };


    const { getFieldDecorator } = props.form;
    return <div className="login">
        <header className="login-header">
            <img src={logo} alt="logo"/>
            <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
            <h2>用户登录</h2>
            <Form onSubmit={login} className="login-form">
                <Item>
                {getFieldDecorator('username', {
                    rules: [
                        { required: true, message: '请输入你的用户名!' },
                        { min: 4, message: '用户名必须大于4位' },
                        { max: 15, message: '用户名必须小于15位' },
                        { pattern: /^[a-zA-Z_0-9]+$/, message: '用户名只能包含英文字母、数字和下划线' },
                    ],
                })(
                    <Input prefix={<Icon type="user" style={ { color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />,
                )}
                </Item>
                <Item>
                {getFieldDecorator('password', {
                    rules: [
                        { required: true, message: '请输入你的密码!' },
                        { min: 4, message: '用户名必须大于4位' },
                        { max: 15, message: '用户名必须小于15位' },
                        { pattern: /^[a-zA-Z_0-9]+$/, message: '用户名只能包含英文字母、数字和下划线' },
                    ],
                })(
                    <Input prefix={<Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" type="password" />
                )}
                </Item>

                <Item>
                    <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                </Item>
            </Form>
        </section>
    </div>;
}

export default Form.create()(Login);