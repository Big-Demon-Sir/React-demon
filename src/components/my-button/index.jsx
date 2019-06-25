import React from 'react';

import './index.less';

export default function MyButton(props) {
    //组件内包含的内容会挂载到组件的props.children，通过props属性将MyButton有的属性会都传入到button上
    return <button className="my-button" {...props}/>
}