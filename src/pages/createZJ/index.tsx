import React from 'react';


import Particles from '@/compon/particles/index'
import BgMusic from '@/compon/bgmusic/index'

import './index.less'

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import createZJMain from './redux-item/reducers/main';
import { store2Props } from './redux-item/selectors';
import actions from './redux-item/actions';
import { reduxIProps } from './redux-item/types'
registerReducer({ createZJMain });



class createZJ extends React.Component<reduxIProps, any> {

  componentDidMount() {
    this.props.actions.init()
  }

  componentWillUnmount() {
    this.props.actions.clean()
  }

  render() {
    return (
      <div className='createZJ'>
        
        <Particles />
        <BgMusic />
      </div>
    );
  }

}


export default connect(store2Props, actions)(createZJ)