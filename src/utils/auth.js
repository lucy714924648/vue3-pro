// 设置 token
export const setToken = (token) => {
    try {
        localStorage.setItem('token', token)
    } catch (error) {
        console.error('设置 token 失败:', error)
    }
}

// 获取 token
export const getToken = () => {
    try {
        return localStorage.getItem('token')
    } catch (error) {
        console.error('获取 token 失败:', error)
        return null
    }
}

export const setRefreshToken = (token) => {
    try {
        localStorage.setItem('refreshtoken', token)
    } catch (error) {
        console.error('设置 token 失败:', error)
    }
}

// 获取 refreshtoken
export const getRefreshToken = () => {
    try {
        return localStorage.getItem('refreshtoken')
    } catch (error) {
        console.error('获取 token 失败:', error)
        return null
    }
}
//token：有效期10-20min;
//refreshToken有效期：一周或者一个月
//短token过期的时候用长token换短token
//在响应拦截器里面：调用刷新token的接口，
//在重新发送失败的请求，ins.request(res.config)  请求的配置信息;