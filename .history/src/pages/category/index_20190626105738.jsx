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
        
    }
}




