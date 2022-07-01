import React from 'react';

import {
  routeWithSubRoutes,
} from '../kit';
import { authRouters } from '../routers';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 当前浏览器地址匹配的路由path
      matchedPath: '',
    };
  }
  handlePathMatched = (path) => {
    this.setState({
      matchedPath: path,
    });
  };

  render() {
    return (
      <>
        {routeWithSubRoutes(authRouters, this.handlePathMatched)}
      </>
    );
  }
}
