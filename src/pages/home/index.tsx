import React from 'react';

import './index.less'
import Swiper from '@/compon/swiper';

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import homeMain from './redux-item/reducers/main';
import { store2Props } from './redux-item/selectors';
import actions from './redux-item/actions';
import { reduxIProps } from './redux-item/types'
registerReducer({ homeMain });



class Home extends React.Component<reduxIProps, any> {

  componentDidMount() {
    this.props.actions.init()
  }

  componentWillUnmount() {
    this.props.actions.clean()
  }

  render() {
    return (
      <div>
        <Swiper />
      </div>
    );
  }

}


export default connect(store2Props, actions)(Home)