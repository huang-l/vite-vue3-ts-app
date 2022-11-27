import axios from 'axios';

// 定义请求与响应拦截
const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-cache',
    Pragma: 'no-cache',
  },
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    /**
     * 响应回来的response中含有config、headers、request、status、statusText、data
     * config--配置 headers--响应头信息 request--原生ajax请求对象
     * 其中data是我们需要的返回数据
     */
    let res = response.data;
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default service;
