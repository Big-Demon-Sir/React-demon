//将不变的参数封装写死，再引入使用。 index.jsx文件中保留变化的参数数据，简化代码

import ajax from './ajax';
import { message } from 'antd';
import jsonp from 'jsonp';
import { resolve, reject } from 'q';

//请求登录函数
/* export const reqLogin = (data) => ajax('/login', data, 'POST');//不知道确切的数据 */
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');//能看到确切数据。适用于参数1~2个
/* export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST');//能看到确切数据。适用于参数3~4个 */

//请求验证用户信息
export const reqValidateUserInfo = (id) => ajax('/validate/user', {id}, 'POST');

//请求天气
export const reqWeather = function () {
    let cancel = null;
    const promise = new Promise((resolve, reject) => {
        cancel = jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`, {}, function (err, data) {
            try {
                if(!err) {
                    const { dayPictureUrl, weather } = data.result[0].weather_data[0];
                    resolve({
                        weatherImg: dayPictureUrl,
                        weather
                    });

                } else {
                    message.error('请求天气信息失败~请检查网络是否连接~');
                    resolve();
                }
            } catch (e) {
                message.error('请求天气信息失败~请检查网络是否连接~');
                resolve();
            }
        })
    })
}
