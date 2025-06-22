
/**
 * 手写instanceof
 * 构造函数的原型是否在对象的原型链上
 * @param {*} left 
 * @param {*} right 
 * @returns 
 */
function myInstance(left,right){
  let proto=Object.getPrototypeOf(left),
        prototype=right.prototype;
        while(true){
            if(!proto){
                return false
            }
            if (proto===prototype) {
                return true
            }
            proto=Object.getPrototypeOf(proto)
        }

}

 //防抖函数
 //事件在n秒后触发，如果n秒内重复触发，则会重新计时
 //场景：联想搜索框，表单提交按钮，窗口的resize事件
function debounce(fun,wait){
    let timer=null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
            timer=null;
        }
        timer=setTimeout(()=>{
           fun.apply(this,...args)
        },wait)
    }
}

//节流函数
// n秒内事件只触发一次，如果不断触发则只有等n秒后才会触发
//使用场景：
//鼠标拖拽：地图/图片放大或者缩小；
//浏览器scroll事件
function thrrottle(fun,delay) {
    let curTime=Date.now();
    return function(...args){
      nowTime=Date.now();
      if(nowTime-curTime>delay){
        curTime=Date.now();
      return fun.apply(this,...args)
      }
    }
}

//深copy
//可解决对象循环引用
//对象(键)---clone对象（值）；用weakmap缓存，下次用到直接从缓存中拿取；
//解决对象循环引用问题
function deepClone(obj) {
    let cache=new WeakMap();
    function _deepClone(obj) {
        //基本数据类型直接返回
        if(obj===null || typeof obj !=='object'){
            return obj
        }
        //从缓存中取
        if(cache.has(obj)){
            return cache.get(obj)
        }
        const result=Array.isArray(obj)?[]:{};
        //加入缓存,对象对应的clone结果
        cache.set(obj,result);
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
               result[key]=_deepClone(obj[key])
            }
        }
        return result
    }
    return _deepClone(obj)
}


const obj={
    arr:[1,2,3],
    a:4
}
obj.sub=obj;
obj.arr.push(obj);

const newObj=deepClone(obj);
console.log(newObj.arr!==obj.arr);
console.log(newObj.sub!==obj.sub);
console.log(newObj.arr[3]!==obj);//但不等于别人
console.log(newObj.arr[3]===newObj);//等于它本身

/**
 * 数组扁平化
 * 将多维数组变成一维数组
 * @param {Array} arr 
 */
function flatter(arr) {
    if (!arr.length) {
        return;
    }
    return arr.reduce((pre,cur)=>{
        Array.isArray(cur)?[...pre,...flatter(cur)]:[...pre,cur]
    },[])
}

/**
 * 冒泡排序
 * @param {Array} arr 
 */
function bubbleSort(arr) {
    const len=arr.length;
    for (let i = 0; i < len; i++) {
       for(let j=0;j<len-1;j++){
        if(arr[j]>arr[j+1]){
            [arr[j],arr[j+1]]=[arr[j+1],arr[j]]
        }
       }
        
    }
    
}

Promise.myAll=function(proms){
    let res,rej
 const p=new Promise((resolve,reject)=>{
    res=resolve;
    rej=reject;
 })
 //proms是一个可迭代对象，不一定是数组，map
 //判空
 let i=0;
 const result=[];
 for (const pro of proms) {
    let index=i;
    i++;
    Promise.resolve(pro).then((data)=>{
        //1.讲完成的数据加到最终的结果
        result[index]=data;
        //2.是否已完成
        i--;
        if (i===0) {
            res(result);
        }
    },rej)
 }
 if(i===0){
   res([])
 }
 return p
}


//最先的成功或者失败
Promise.myRace=function (proms) {
    return new Promise((resolve,reject)=>{
      for (const p of proms) {
        Promise.resolve(p).then(resolve,reject)
      }
    })
}

const p1=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject(333)
    },2000)
})
p1.catch(err=>{
    console.log(err);
    
})
const p2=new Promise((resolve,reject)=>{
    resolve(111)
})
// Promise.myRace([p1,p2]).then((data)=>{
//     console.log(data);
    
// },(error=>{
// console.log(error);

// }))
Promise.myAll([1,Promise.resolve(2),p1]).then((datas)=>{
console.log(datas);

},(error)=>{
console.log(error);

})
