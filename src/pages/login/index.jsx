

import React from 'react';
import { history } from '@/kit';
export default class Login extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <div style={styles.container} onClick={()=>history.push('/')}>
        q11111
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
