/**
 * 发出请求，返回一个promise
 * @param {string} url 请求地址
 * @param {number} maxCount 最大请求数量
 */
function request(url, maxCount = 5) {
    //成功的不需要处理，只需要失败的时候处理一下
    return fetch(url).catch(err => {
        //什么时候你失败我便失败，重试次数为0得时候，你失败我便失败
        //其他情况递归调用，然后减一
        maxCount <= 0 ? Promise.reject(err) : request(url, maxCount - 1)
    })

}
request('http://www.baidu.com', 6).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})

/**
 * 
 * @param {Function} fun 
 * @param {Number} duration 
 */
function debounce(fun, duration = 300) {
    let timeId = null;
    return function (...args) {
        if (timeId) {
            clearTimeout(timeId)
            timeId = null
        }
        timeId = setTimeout(() => {
            fun.apply(this, ...args)
        }, duration)
    }
}


(function () {
    // 闭包经典面试题
    // var声明的变量是全局作用域/函数作用域，此时是全局作用域
    //只有一个，所以打印出来3个3
    for (var i = 0; i < 3; i++) {
        setTimeout(function () {
            console.log("i", i);
        }, 1000)
    }
    // console.log("i", i);

    for (var i = 0; i < 3; i++) {
        (function () {
            setTimeout(function () {
                console.log("i", i);
            }, 1000)

        })(i)
    }
    // console.log("i", i);
    //let块级作用域
    for (let i = 0; i < 3; i++) {
        setTimeout(function () {
            console.log("i", i);
        }, 1000)
    }
    console.log("i", i);
})()


