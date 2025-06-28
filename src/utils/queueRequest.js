
class RequestQueue{
    constructor(maxCountCurrent){
        this.maxCountCurrent=maxCountCurrent;//最大请求并发数
        this.currentCount=0;//当前运行的数量
        this.queue=[];//请求对列
    }
    
    add(request){
        return new Promise((resolve,reject)=>{
            this.queue.push(request,resolve,reject);
            this._runQueue();
        })
    }
    _runQueue(){
        if (this.queue.length>0 && this.currentCount<this.maxCountCurrent) {
            const {request,resolve,reject}=this.queue.shift();
            this.currentCount++;
            request()
                .then(resolve)
                .catch(reject)
                .finally(()=>{
                    this.currentCount--;
                    this._runQueue()
                })
        } 
    }

}
/**
 * 请求函数
 * @param {Array} url 请求数组
 * @returns 
 */
function fetchData(url) {
   return fetch(url).then(res=>res.json)  
}


//使用请求对列
const queue=new resquestQueue(5);

//请求urls
const urls=new Array(20).fill(0).map((_,i)=>`https://api.example.com/data${i}`);

const requests=urls.map(url=>fetchData(url));


Promise.all(requests.map(request=>queue.add(request)))
    .then(resluts=>{
        console.log('所有请求完成',resluts)
        
    })
    .catch(error=>{
        console.log('请求失败',error);
        
    })