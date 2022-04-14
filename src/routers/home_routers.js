// 无需授权即可查看的菜单路由
const routes = [
  {path: '/login', asyncComponent: () => import('../pages/login')},
  {path: '/register', asyncComponent: () => import('../pages/register')},
];
export default routes;
