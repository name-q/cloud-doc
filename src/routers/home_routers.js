// 无需授权即可查看的菜单路由
const routes = [
  {path: '/login', asyncComponent: () => import('../pages/login')},
];
export default routes;
