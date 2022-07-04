import React, { memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { openRouters } from '../routers';
import { fromJS } from 'immutable';
import { isLogin } from './util';
import noop from './noop'
import { Spin } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';

export type Loader = () => Promise<any>;

export interface Props {
  path: string;
  exact?: boolean;
  strict?: boolean;
  load: Loader;
  handlePathMatched?: Function;
}

/**
 * 封装异步路由的解决方案
 * @param props 路由参数
 */
export default memo(function AsyncRoute(props: any) {
  console.log('路由跳转------>', props.path)
  const { load, handlePathMatched, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props: any) => {
        const unAuthRoutes = fromJS(openRouters);
        if (
          // @ts-ignore
          unAuthRoutes.some((route) => route.get('path') === props.match.path)
        ) {
          // 1.不需要登录权限,直接可以访问的页面
          return <AsyncLoader {...props} load={load} />;
        } else {
          if (isLogin()) {
            // 2.1.需要登录权限,已经登录,则跳转路由对应的页面
            return (
              <AsyncLoader
                {...props}
                load={load}
                handlePathMatched={handlePathMatched}
              />
            );
          } else {
            // 2.2.未登录,跳转登录页面
            return (
              <Redirect
                to={{ pathname: '/login', state: { from: props.location } }}
              />
            );
          }
        }
      }}
    />
  );
})

/**
 * 异步load模块组件
 */
class AsyncLoader extends React.Component<any, any> {
  props: {
    load: Loader;
    handlePathMatched?: Function;
    match: any;
  };

  state: {
    Component: any;
  };

  static defaultProps = {
    load: noop,
    handlePathMatched: noop
  };
  constructor(props) {
    super(props);
    this.state = {
      Component: null
    };
  }

  componentDidMount() {
    const { load } = this.props;

    const { handlePathMatched } = this.props;
    handlePathMatched(this.props.match.path);

    load().then((Component) =>
      this.setState({
        Component: Component.default || Component
      }, () => {
        // 去掉鼠标悬停时的title=[object object]属性
        const antdRows = document.getElementsByClassName('ant-row ant-form-item');
        if (antdRows.length > 0) {
          for (let i = 0; i < antdRows.length; i++) {
            // @ts-ignore
            antdRows[i].title = '';
          }
        }
      })
    );
  }

  render() {
    const { Component } = this.state;

    return Component ? (
      <Component {...this.props} key={Math.random()} />
    ) : (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Spin indicator={<Loading3QuartersOutlined style={{ fontSize: 80 }} spin />} />
      </div>
    );
  }
}
