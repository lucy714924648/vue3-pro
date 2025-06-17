import http from './http'
import { getRefreshToken } from './auth'
export async function refreshtoken() {
    //刷新token
    await http.get('/refresh_token', {
        headers: {
            Authorization: `Bearer ${getRefreshToken()}`
        },
        __isRefreshToken: true
    })
}
/**
 * 是否是刷新token的接口
 * @param {*} config 
 * @returns 
 */

export function isRefreshToken(config) {
    return !!config.__isRefreshToken;
}
//备注:
// 1. 在请求配置中添加自定义属性
const config = {
    url: '/api/data',
    method: 'get',
    __isRefreshToken: true  // 自定义属性
}

// 2. 可以通过点语法或方括号语法访问
console.log(config.__isRefreshToken)  // true
console.log(config['__isRefreshToken'])  // true
