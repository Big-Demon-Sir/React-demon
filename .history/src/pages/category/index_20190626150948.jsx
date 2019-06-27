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
    };

    //添加品类
    addCategory = () => {
        //1、 表单校验
        //2、收集表单数据
        const { form } = this.addCategoryForm.props;

        form.validateFields(async (err, values) => {
            if(!err) {
                //校验通过]
                const { parentId, categoryName } = values;
                //3、发送请求
                const result = await reqAddCategory(parentId, categoryName);

                if(result) {
                    //添加分类成功
                    message.success('添加分类成功', 2);
                    //清空表单数据
                    form.resetFields(['parentId', 'categoryName']);

                    //如果是一级分类：就在一级分类列表中展示
                    //如果是二级分类： 就在二级分类中展示，而一级分类是不需要的

                    const options = {
                        isShowAddCategory: false
                    };
                    if (result.parentId === '0') {
                        options.categories = [...this.state.reqCategories];

                    }

                    //统一更新
                    this.setState(options);
                }
            }
        })
    };

    //切换显示
    toggleDisplay = (stateName, stateValue) => {
        return () => {
            this.setState({
                [stateName]: stateValue
            })
        }
    };

    hideUpdateCategoryName = () => {
        //清空表单项的值
        this.UpdateCategoryNameForm.props.form.resetFields(['categoryName']);
        //隐藏对话框
        this.setState({
            isShowUpdateCategoryName: false
        })
    };

    saveCategory = (category) => {
        return () => {
            //保存要更新的分类数据
            this.category = category;
            this.setState({
                isShowUpdateCategoryName: true
            })
        }
    };

    updateCategoryName = () => {
        const { form } = this.UpdateCategoryNameForm.props;
        //检验表单，收集数据
        form.validateFields(async (err, values) => {
            if(!err) {
                const { categoryName } = values;
                const categoryId = this.category._id;
                //发送请求
                const result = await reqUpdateCategoryName(categoryId, categoryName);
                //判断结果
                if(result) {
                    //不想修改原数据,只是更新，不做修改
                    const categories = this.state.categories.map((category) => {
                        let {_id, name, parentId } = category;
                        if(_id === categoryId) {
                            name = categoryName;
                            return {
                                _id,
                                name,
                                parentId
                            }
                        }
                        // 没有修改的数据直接返回
                        return category
                    });
    
                    //清空表单项的值，隐藏对话框
                    form.resetFields(['categoryName']);
    
                    message.success('更新分类成功', 2);
    
                    this.setState({
                        isShowUpdateCategoryName: false,
                        categories
                    })
                }
            }
        })
    };

    render() {
        const { categories, isShowAddCategory, isShowUpdateCategoryName } = this.state;

        const columns = [
            {
                title: '品类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                // dataIndex: '_id',
                className: 'category-operation',
                // 改变当列的显示
                render: category => {
                    return <div>
                    <MyButton onClick={this.saveCategory(category)}>修改名称</MyButton>
                    <MyButton>查看其子品类</MyButton>
                    </div>
                },
            },
        ];

        return <Card title="一级分类列表" extra={<Button type="primary" onClick={this.toggleDisplay('isShowAddCategory', true)}><Icon type="plus" />添加品类</Button>}>
            <Table
                columns={columns}
                dataSource={categories}
                bordered
                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: ['3', '6', '9', '12'],
                    defaultPageSize: 3,
                    showQuickJumper: true
                }}
                rowKey="_id"
            />
    
            <Modal
                title="添加分类"
                visible={isShowAddCategory}
                onOk={this.addCategory}
                onCancel={this.toggleDisplay('isShowAddCategory', false)}
                okText="确认"
                cancelText="取消"
            >
                <AddCategoryForm categories={categories} wrappedComponentRef={(form) => this.addCategoryForm = form}/>
            </Modal>
    
            <Modal
                title="修改分类名称"
                visible={isShowUpdateCategoryName}
                onOk={this.updateCategoryName}
                onCancel={this.hideUpdateCategoryName}
                okText="确认"
                cancelText="取消"
                width={250}
            >
                <UpdateCategoryNameForm categoryName={this.category.name} wrappedComponentRef={(form) => this.updateCategoryNameForm = form}/>
            </Modal>
        </Card>;
    }  
}




