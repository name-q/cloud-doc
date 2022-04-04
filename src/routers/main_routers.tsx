// 首页菜单路由
const routes = [
  {path: '/', exact: true, asyncComponent: () => import('../pages/overview')},
];

export default routes;
