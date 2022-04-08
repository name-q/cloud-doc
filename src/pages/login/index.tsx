

import React from 'react';

import Form from './component/Form'
import Particles from '@/compon/particles/index'
import BgMusic from '@/compon/bgmusic/index'
import './index.less'
import Logo from '@/assets/logo.png'
import { isLogin, history } from '@/kit/index'

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import loginMain from './redux-item/reducers/main';
import { store2Props } from './redux-item/selectors';
import actions from './redux-item/actions';
import { reduxIProps } from './redux-item/types'
registerReducer({ loginMain });

class Login extends React.Component<reduxIProps, any> {

  componentDidMount() {
    // 登入过的就不用初始化
    if (isLogin()) history.push('/')

    this.props.actions.init()
  }

  componentWillUnmount() {
    this.props.actions.clean()
  }

  render() {
    return (
      <div className='container' >
        <div className='form-box'>
          <img src={Logo} alt="LOGO" className='logo' />
          <Form />
        </div>

        <Particles />
        <BgMusic />
      </div>
    );
  }


}


export default connect(store2Props, actions)(Login)