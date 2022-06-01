

import React from 'react';

import { FormInstance } from 'antd/lib/form';
import { Form, Button, Input } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { validate, history } from '@/kit/index';
import config from '@/config/index';
import * as _ from 'lodash';

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import registerMain from '../redux-item/reducers/main';
import { store2Props } from '../redux-item/selectors';
import actions from '../redux-item/actions';
import { reduxIProps } from '../redux-item/types'
registerReducer({ registerMain });

const FormItem = Form.Item

class registerForm extends React.Component<reduxIProps, any> {
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
        className="register-form"
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
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder='邮箱' />
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
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder='密码'
          />
        </FormItem>

        <FormItem
          name="passwordRepeat"
          rules={[
            { required: true, message: '请重复输入密码' },
            {
              validator: async (rule, value) => {
                if (!value || this.formRef.current.getFieldValue('password') !== value) return Promise.reject('两次密码不一致')
                if (validate.password.test(value)) return Promise.resolve()
                return Promise.reject('请输入6-20位数字或字母')
              }
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder='重复密码'
          />
        </FormItem>


        <FormItem
          name="nick"
          rules={[
            { required: true, message: '请输入昵称' },
            {
              validator: async (rule, value) => {
                if (!validate.noChar.test(value)) return Promise.reject('昵称不能包含特殊符号')
                if (value.length > 10) return Promise.reject('昵称过长')
                return Promise.resolve()
              }
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder='昵称'
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
          <Button type="primary" htmlType="submit" className="register-form-button" block>
            注册
          </Button>
          <Button className="register-form-button" block onClick={() => { history.goBack() }}>
            返回
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
    let result = await this.props.actions.action.register(values)
    if (result === 'RefreshCode') {
      this.refreshVerificationCode()
      this.formRef.current.setFieldsValue({ verificationCode: '' })
    }
  };

}


export default connect(store2Props, actions)(registerForm)