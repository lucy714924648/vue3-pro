const btn=document.querySelector('.btn')
const datas=new Array(10000).fill(0).map((_,i)=>i)
btn.onclick=()=>{
    // for (const i of datas) {
    //     const div=document.createElement('div');
    //     div.innerHTML=i;
    //     document.body.appendChild(div)
    // }
    const taskHandler=(i)=>{
        const div=document.createElement('div');
        div.innerHTML=i;
        document.body.appendChild(div)
    }
    performChunk(datas,taskHandler);
}
// 高阶函数，此处参数是函数
//封装分时函数
function performChunk(datas,taskHandler) {
    if (datas.length===0) {
        return;
    }
    let i=0;
    //分片执行函数
    function _run() {
        //一个渲染帧中，空闲时开启分片执行
        requestIdleCallback((idle)=>{
            while(idle.timeRemaining()>0 && i<datas.length){
                //任务执行器函数
                taskHandler(datas[i],i)
                // const div=document.createElement('div');
                // div.innerHTML=i;
                // document.body.appendChild(div);
                i++;
            }
            //此次分片完成，执行下一个
            _run();
        })
    }
    // 开启分片执行
    _run();
}