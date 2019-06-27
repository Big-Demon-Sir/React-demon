import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

class UpdateCategoryNameForm extends Component {
    static props = {
        categoryName: PropTypes.string.isRequired
    };

    validator = {rule, value, callback} => {
        if(!value) {
            callback('请输入分类名称');
        } else if (value === this.props.categoryName) {
            callback('该名称已存在');
        } else {
            callback();
        }
    };

    render() {

        const { getFieldDecorator } = this.props.form;

        return <Form>
            <Form.Item>
                {
                    getFieldDecorator(
                        'categoryName',
                        {
                            initialValue: this.props.categoryName,
                            rules: [{
                                validator: this.validator
                            }]
                        }
                    )(
                        <Input />
                    )
                }
            </Form.Item>
        </Form>;
    }
}

export default Form.create()(UpdateCategoryNameForm);