class SuperTask {
    constructor(parallelCount = 2) {
        this.parallelCount = parallelCount;//并发数量
        this.runningCount = 0;//当前正在运行的任务数量
        this.tasks = [];//任务列表队列
    }
    add(task) {
        return new Promise((resolve, reject) => {
            //用队列实现，入队
            this.tasks.push({
                task, resolve, reject
            })
            this._run()
        })
    }
    //依次运行队列里的所有任务
    _run() {
        while (this.runningCount < this.parallelCount && this.tasks.length) {
            //对列出队
            const { task, resolve, reject } = this.tasks.shift();
            this.runningCount++;
            task().then(resolve, reject).finally(() => {
                this.runningCount--;
                //开启下一个任务
                this._run();
            })
        }
    }

}
//并发面试题
//用对列实现并发
//同时只允许2个任务执行，最大并发数2
// 根据下面代码，实现并发请求类封装
const sp = new SuperTask();
function addTask(time, name) {
    sp.add(() => timeout(time))
        .then(() => {
            console.log(`任务${name}完成`);
        })
}
addTask(10000, 1);//10000ms后输出,任务1执行完成
addTask(5000, 2);//5000ms后输出,任务2执行完成
addTask(3000, 3);//8000ms后输出,任务3执行完成
addTask(4000, 4);//12000ms后输出,任务4执行完成