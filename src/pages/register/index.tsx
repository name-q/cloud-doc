

import React from 'react';

import Form from './component/Form'
import Particles from '@/compon/particles/index'
import './index.less'
import { isLogin, history } from '@/kit/index'

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import registerMain from './redux-item/reducers/main';
import { store2Props } from './redux-item/selectors';
import actions from './redux-item/actions';
import { reduxIProps } from './redux-item/types'
registerReducer({ registerMain });

class Register extends React.Component<reduxIProps, any> {

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
      <div className='register-container' >
        <div className='form-box'>
          <Form />
        </div>

        <Particles />
      </div>
    );
  }


}


export default connect(store2Props, actions)(Register)