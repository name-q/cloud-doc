/***无需授权页面***/ 
// 登入
import LoginRouters from './home_routers';

/***需授权页面***/ 
// 首页
import MainRouters from './main_routers';


const authRouters = [
    ...MainRouters,
];

const openRouters = [...LoginRouters];

export { authRouters, openRouters };
