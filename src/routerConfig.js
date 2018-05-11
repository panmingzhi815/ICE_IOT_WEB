// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout';
import UserLogin from './pages/UserLogin';
import BlankLayout from './layouts/BlankLayout';
import Dashboard from './pages/Dashboard';
import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import DeviceManage from './pages/DeviceManage';

const routerConfig = [
  {
    path: '/UserLogin',
    layout: BlankLayout,
    component: UserLogin,
  },
  {
    path: '/DeviceManage',
    layout: HeaderAsideFooterResponsiveLayout,
    component: DeviceManage,
  },
  {
    path: '/',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Dashboard,
  }
];

export default routerConfig;
