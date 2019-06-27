import { removeFileItem } from "antd/lib/upload/utils";

const USER_KEY = 'USER_KEY';
const USER_TIME = 'USER_TIME';
//设置时间，多久后过期
const EXPIRES_IN = 1000 * 3600 * 24 * 7;

export const getItem = function () {
    const startTime = localStorage.getItem(USER_TIME);
    if(Date.now() - startTime > EXPIRES_IN) {
        //登录过期了，清除用户信息
        removeItem();

        return {};
    }
    return JSON.parse(localStorage.getItem(USER_TIME));

}