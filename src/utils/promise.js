Promise.myAll = function (proms) {
    let res, rej
    const p = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject
    });
    //成功的时候调用resolve,
    //失败的时候调用reject
    // res()
    //rej()
    //
    let i = 0;
    //迭代器对象,for of循环
    const result = [];
    for (const pro of proms) {
        const index = i;
        i++;
        Promise.resolve(pro).then((data) => {
            //输出结果,确保传入顺序即为输出顺序，用下标
            result[index] = data;
            //判断是否全部完成
            i--;
            if (i === 0) {
                res(result)
            }
        }, rej)
    }
    //proms是一个[]空数组
    if (i === 0) {
        res([])
    }
    return p;

}
Promise.myAll([1, Promise.reject(99999), 2, Promise.reject(88)]).then(data => {
    console.log(data);

}).catch(err => {
    console.log(err);
})
