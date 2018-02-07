/**
 * Created by mac on 2018/1/5.
 */

/**
 * http配置
 */

import axios from 'axios'

// axios 配置
axios.defaults.timeout = 12000
// axios.defaults.baseURL = 'http://localhost:8080'

// http request 拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios
