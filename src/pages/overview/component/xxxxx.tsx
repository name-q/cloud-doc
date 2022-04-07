

import React from 'react';

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import overviewMain from '../redux-item/reducers/main';
import { store2Props } from '../redux-item/selectors';
import actions from '../redux-item/actions';
import { reduxIProps } from '../redux-item/types'
registerReducer({ overviewMain });

class XXXXX extends React.Component<reduxIProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <></>
    );
  }

}

export default connect(store2Props, actions)(XXXXX)