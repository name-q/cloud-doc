// 无需授权页面
import HomeRouters from './home_routers';

// 需授权访问页

// 首页
import MainRouters from './main_routers';


const routes = [
    ...MainRouters,
];

const homeRoutes = [...HomeRouters];

export {routes, homeRoutes};
