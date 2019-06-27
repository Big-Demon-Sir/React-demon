import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

class UpdateCategoryNameForm extends Component {
    render() {
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