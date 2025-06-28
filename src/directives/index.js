const ob=new ResizeObserver((entries)=>{
    for (const entry of entries) {
        console.log(entry);
        
       const handler= map.get(entry.target);
       if(handler){
        const box=entry.borderBoxSize[0];

        handler({
            with:box.inlineSize,
            height:box.blockSize
       })
       }
       
        
    }
})
const map=new WeakMap();

export default{
// 监听元素尺寸的变化ResizeObserver
    mounted(el,binding) {
        map.set(el,binding.value);
        ob.observe(el);
        
    },
    unmounted(el,binding) {
        ob.unobserve(el)
    },
}