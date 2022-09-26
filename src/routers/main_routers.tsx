// 首页菜单路由
const routes = [
  { path: '/', exact: true, component: import('../pages/home') },
  // 创造极
  {
    path: '/pages/createZJ',
    exact: true,
    component: import('../pages/createZJ'),
    VisibleLeftMenu: false,
    VisibleFooter: false,
  },
];

export default routes;
