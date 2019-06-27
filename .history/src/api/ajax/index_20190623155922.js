//将不变的参数封装写死，再引入使用。 index.jsx文件中保留变化的参数数据，简化代码

import ajax from './ajax';

/* export const reqLogin = (data) => ajax('/login', data, 'POST');//不知道确切的数据 */
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'post');//能看到确切数据。适用于参数1~2个
/* export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST');//能看到确切数据。适用于参数3~4个 */