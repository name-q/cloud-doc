

import React from 'react';

import './index.less'

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import overviewMain from './redux-item/reducers/main';
import { store2Props } from './redux-item/selectors';
import actions from './redux-item/actions';
import { reduxIProps } from './redux-item/types'
registerReducer({ overviewMain });

class OverView extends React.Component<reduxIProps,any> {

  componentDidMount() {
    this.props.actions.init()
  }

  componentWillUnmount() {
    this.props.actions.clean()
  }

  render() {
    return (
      <div className='container' >

      </div>
    );
  }


}


export default connect(store2Props, actions)(OverView)