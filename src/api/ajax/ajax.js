import axios from 'axios';
import { message } from 'antd';

export default function ajax(url, data = {}, method = 'get') {

    /* @returns 返回值一定是一个成功状态的promise对象（请求成功里面有数据，请求失败里面没有数据）*/

    //发送登录请求

    let reqParams = data;
    //转化为小写，再进行比较
    method = method.toLowerCase();
    if(method === 'get') {
        reqParams = {
            params: data
        }
    }

    //return将后面表达式整体结果返回，后面表达式看then或catch方法的返回值
    return axios[method](url, reqParams)
        .then((res) => {
            console.log(res)
            const { data } =res;
            if(data.status === 0) {
                //返回一个成功状态的Promise对象，里面有data数据
                return data.data;
                //请求成功，跳转到主页面Admin；
                //不需要返回登录页面的跳转，用replace
                //this.props.history.replace('/');
            } else {
                message.error(data.msg, 2);
                //弹出失败，重置密码项为空
                //this.props.form.resetFields(['password']);
            }
            
        })
        .catch((error) => {
            message.error('网络异常,请检查你的网络是否连接~', 2);
            //弹出失败，重置密码项为空
            // this.props.form.resetFields(['password']);
        })
}