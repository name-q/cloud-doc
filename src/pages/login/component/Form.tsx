

import React from 'react';

import { Form, Button, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import loginMain from '../redux-item/reducers/main';
import { store2Props } from '../redux-item/selectors';
import actions from '../redux-item/actions';
import { reduxIProps } from '../redux-item/types'
registerReducer({ loginMain });

const FormItem = Form.Item
class LoginForm extends React.Component<reduxIProps> {

  render() {
    return (
        <Form
          name="normal_login"
          className="login-form"
          onFinish={this.onFinish}
        >

          <FormItem
            name="mail"
            rules={[{ required: true, message: 'Please enter you motherfuck email' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} />
          </FormItem>

          <FormItem
            name="password"
            rules={[{ required: true, message: 'Please ...' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
            />
          </FormItem>

          <FormItem>
            <a className="login-form-forgot" href='!#' onClick={e => e.preventDefault()}>
              忘记密码
            </a>
            <a className="login-form-exit" href='!#' onClick={e => e.preventDefault()}>
              退出
            </a>
          </FormItem>

          <FormItem>
            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                登入
              </Button>
            </div>
          </FormItem>
          
          <FormItem>
            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
              <Button className="login-form-button" block>
                注册
              </Button>
            </div>
          </FormItem>

        </Form>
    );
  }

  onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

}


export default connect(store2Props, actions)(LoginForm)