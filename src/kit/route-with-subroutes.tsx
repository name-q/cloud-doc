import React from 'react';
import { Route } from 'react-router-dom';
import AsyncRoute, { Loader } from './async-router';

type TFnComponent = (...params: Array<any>) => any;


export interface IRoute {
  path: string;
  strict?: boolean;
  exact?: boolean;
  component?: any | TFnComponent;
  asyncComponent?: Loader;
  routes?: Array<IRoute>;
}

/**
 * 路由相关
 * @param routes
 * @param handlePathMatched
 */
export default function routeWithSubRoutes(routes, handlePathMatched) {
  // console.log('routes------>', routes);
  return routes.map((route, index) => {
    //dev check
    if (process.env.NODE_ENV !== 'production') {
      if (route.component === undefined && route.asyncComponent === undefined) {
        // @ts-ignore
        // eslint-disable-next-line 
        throw `${route.path} can not find component or asyncComponent`
      }
    }
    if (route.component) {
      return (
        <Route
          key={index}
          exact={route.exact}
          path={route.path}
          strict={route.strict}
          render={(props:any) => (
            <route.component
              {...props}
              handlePathMatched={handlePathMatched}
            />
          )}
        />
      );
    } else {
      return (
        <AsyncRoute
          key={index}
          exact={route.exact}
          strict={route.strict}
          path={route.path}
          load={route.asyncComponent}
          handlePathMatched={handlePathMatched}
        />
      );
    }
  });
}
