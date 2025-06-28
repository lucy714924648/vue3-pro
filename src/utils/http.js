import axios from "axios";
import { setToken, getToken, setRefreshToken } from '@/utils/auth'
import { refreshtoken, isRefreshToken } from './refreshToken'
const ins = axios.create({
    // baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    // process.env.NODE_ENV
    baseURL:process.env.VUE_APP_BASE_API,
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});
// 添加请求拦截器
ins.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
}); 
// 添加响应拦截器
ins.interceptors.response.use(async function (res) {
    if (res.headers.authorization) {
        // 假设响应头中的 Authorization 值为：'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        const token = res.headers.authorization.replace('Bearer ', '');
        // 结果：'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        setToken(token);
        //修改默认的请求头ins.defaults.headers
        ins.defaults.headers.Authorization = `Bearer ${getToken()}`
    }
    if (res.headers.refreshtoken) {
        const refreshtoken = res.headers.refreshtoken.replace('Bearer ', '');
        setRefreshToken(refreshtoken);
    }
    if (res.data.code === 401 && !isRefreshToken(res.config)) {
        //无感刷新
        // 1.长token换短token
        await refreshtoken();
        //2.重新请求
        if (true) {
            //更新头部信息，请求前
            res.config.headers.Authorization = `Bearer ${getToken()}`
            const r = ins.request(res.config);
            return r;
        } else {
            //跳转到登录页
        }

    }
    // res.config===`config` 是 `axios` 请求的配置信息
    return res;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default ins;