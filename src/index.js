import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';
import router from './router';
import axios from 'axios';

// axios.defaults.baseURL = 'http://127.0.0.1:8080';
axios.defaults.baseURL = 'http://119.23.45.198:8080';
axios.defaults.withCredentials = true
axios.defaults.timeout =  3000;

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(router, ICE_CONTAINER);
