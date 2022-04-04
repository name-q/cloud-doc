

import React from 'react';

import { connect } from 'react-redux'
import { registerReducer } from '@/redux/store';
import loginMain from './redux-item/reducers/main';
import { store2Props } from './redux-item/selectors';
import actions from './redux-item/actions';
import { reduxIProps } from './redux-item/types'
registerReducer({ loginMain });

class Login extends React.Component<reduxIProps> {


  componentDidMount() {
    this.props.actions.init()
  }

  componentWillUnmount() {
    this.props.actions.clean()
  }

  render() {
    let {main:{testText},actions:{action:{commonChange}}} = this.props
    return (
      <div style={styles.container} onClick={()=>commonChange('main.testText','on click')}>
        {testText}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }
};

export default connect(store2Props, actions)(Login)