import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';

import { reqCategories, reqAddCategory, reqUpdateCategoryName } from '../../api/ajax';
import MyButton from '../../components/my-button';
import AddCategoryForm from './add-category-form';
import UpdateCategoryNameForm from './update-category-name';
import './index.less';

export default class Category extends Component {
    state = {
        categories: [],//一级分类列表
        isShowAddCategory: false,//显示添加品类
        isShowUpdateCategoryName: false, //显示修改分类名称
    };

    category = {};

    async componentDidMount() {
        const result = await reqCategories('0');
        if(result) {
            this.setState({categories: result});
        }
    }
}




