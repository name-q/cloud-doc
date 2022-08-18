import AsyncRoute, { Loader } from './async-router';
export interface IRoute {
  path: string;
  strict?: boolean;
  exact?: boolean;
  component?: Loader;
  routes?: Array<IRoute>;
}

/**
 * 异步路由
 * @param routes
 * @param handlePathMatched
 */
export default function routeWithSubRoutes(routes, handlePathMatched) {
  return routes.map((route, index) => {

    if (process.env.NODE_ENV !== 'production') {
      if (route.component === undefined) {
        // @ts-ignore
        // eslint-disable-next-line 
        throw `路由<${route.path}>找不到component参数`
      }
    }
    // 判断登入 -> 加载loading -> 渲染页面
    return (
      <AsyncRoute
        key={index}
        exact={route.exact}
        strict={route.strict}
        path={route.path}
        load={route.component}
        handlePathMatched={handlePathMatched}
      />
    );
  });
}
