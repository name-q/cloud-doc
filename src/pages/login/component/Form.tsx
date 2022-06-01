

import React from 'react';

import { FormInstance } from 'antd/lib/form';
import { Form, Button, Input } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { asyncSend } from '@/kit/ipc'
import { validate, history } from '@/kit/index';
import config from '@/config/index';
import * as _ from 'lodash';

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import loginMain from '../redux-item/reducers/main';
import { store2Props } from '../redux-item/selectors';
import actions from '../redux-item/actions';
import { reduxIProps } from '../redux-item/types'
registerReducer({ loginMain });

const FormItem = Form.Item

class LoginForm extends React.Component<reduxIProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      timeStamp: new Date().getTime()
    }
    this.refreshVerificationCode = _.throttle(this.refreshVerificationCode, 1000);
    this.onFinish = _.debounce(this.onFinish, 500);
  }

  formRef = React.createRef<FormInstance>();

  render() {
    return (
      <Form
        name="normal_login"
        className="login-form"
        onFinish={this.onFinish}
        ref={this.formRef}
      >

        <FormItem
          name="mail"
          rules={[
            { required: true, message: '请输入邮箱地址' },
            {
              validator: async (rule, value) => {
                if (!validate.email.test(value)) return Promise.reject('请输入正确的邮箱地址')
                if (value.length > 30) return Promise.reject('邮箱地址超长')
                return Promise.resolve()
              }
            }
          ]}
        >
          <Input placeholder='邮箱' prefix={<MailOutlined className="site-form-item-icon" />} />
        </FormItem>

        <FormItem
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            {
              validator: async (rule, value) => {
                if (validate.password.test(value)) return Promise.resolve()
                return Promise.reject('请输入6-20位数字或字母')
              }
            }
          ]}
        >
          <Input
            placeholder='密码'
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
          />
        </FormItem>

        <FormItem
          name="verificationCode"
          rules={[
            { required: true, message: '请输入验证码' },
            {
              validator: (rule, value) => {
                if (validate.verificationCode.test(value)) return Promise.resolve()
                return Promise.reject('请输入正确的验证码格式')
              }
            }
          ]}
        >
          <Input
            className='verificationCode'
            suffix={
              <img
                src={`${config.HOST}/api/getVerificationCode?x=${this.state.timeStamp}`}
                alt='verificationCode'
                onClick={this.refreshVerificationCode}
              />
            }
          />
        </FormItem>

        <FormItem>
          <a className="login-form-forgot" href='!#' onClick={e => e.preventDefault()}>
            忘记密码
          </a>
          <a className="login-form-exit" href='!#' onClick={e => this.handleExit(e)}>
            退出
          </a>
        </FormItem>

        <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
              登入
            </Button>
            <Button className="login-form-button" block onClick={() => history.push('/register')}>
              注册
            </Button>
        </FormItem>

      </Form>
    );
  }

  refreshVerificationCode = () => {
    this.setState({ timeStamp: new Date().getTime() })
  }

  onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    let result = await this.props.actions.action.login(values)
    if (result === 'RefreshCode') {
      this.refreshVerificationCode()
      this.formRef.current.setFieldsValue({ verificationCode: '' })
    }
  };

  handleExit = (e: any) => {
    e.preventDefault()
    asyncSend('exit');
  }

}


export default connect(store2Props, actions)(LoginForm)