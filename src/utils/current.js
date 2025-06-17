
/**
 * 并发请求，一次最多请求三个，
 * 请求一个结束后，下一个请求部位，保证同时请求3个;
 * @param {string[]} urls 待请求的url数组
 * @param {number} maxNum 最大并发数
 */
export function concurRequest(urls, maxNum) {
    if (urls.length === 0) {
        return Promise.resolve([])
    }
    return new Promise(resolve => {
        const result = [];//结果数组
        let nextIndex = 0;//下一个请求的索引
        let finishRequest = 0;//完成的请求数量
        // 拆分成先完成一个请求，把请求urls数组下标后移1位，
        async function _request() {
            if (nextIndex >= urls.length) {
                return
            }
            let i = nextIndex;//保证请求顺序和响应一致
            //拿到当前的url,在索引后移1位
            const url = urls[nextIndex++];
            const res = await fetch(url);
            result[i] = res;
            finishRequest++;
            //所以请求都结束,返回结果，停止
            if (finishRequest === url.length) {
                resolve(result);
                return;
            }
            _request();//在请求补位，即发送下一个请求；

        }
        //一次发几个请求，并发数
        for (let i = 0; i < Math.min(maxNum, urls.length); i++) {
            _request()
        }
    })

}

console.time();
const urlsArray = [];
for (let i = 0; i < 20; i++) {
    urlsArray.push(`https://jsonplaceholder.typicode.com/todos/${i}`)

}
console.timeEnd()
console.table(urlsArray)
concurRequest(urlsArray, 3).then(res => {
    console.log(res);
})