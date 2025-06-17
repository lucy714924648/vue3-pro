<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import useWatermarkBg from "./useWaterMarkBg";
const parentRef = ref(null);
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: "watermark",
  },
  fontSize: {
    type: String,
    default: "40",
  },
  gap: {
    type: Number,
    default: 20,
  },
});
const bg = useWatermarkBg(props);
let div;
const flag = ref(0); //加一个标识
watchEffect(() => {
  flag.value;
  if (!parentRef.value) {
    return;
  }
  if (div) {
    div.remove();
  }
  const { base64, styleSize } = bg.value;

  div = document.createElement("div");
  div.style.backgroundImage = `url(${base64})`;
  div.style.backgroundSize = `${styleSize}px ${styleSize}px`;
  div.style.backgroundRepeat = "repeat";
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.zIndex = 9999;
  div.style.position = "absolute";
  div.style.inset = 0;
  parentRef.value.appendChild(div);
});
let ob;
onMounted(() => {
  ob = new MutationObserver((records) => {
    for (const record of records) {
      for (const dom of record.removedNodes) {
        if (dom === div) {
          //删除
          flag.value++;
        }
      }
      if (record.target === div) {
        //修改样式
        flag.value++;
      }
    }
  });
  ob.observe(parentRef.value, {
    childList: true,
    subtree: true,
    attributes: true,
  });
});
onUnmounted(() => {
  ob && ob.disconnect();
  div = null;
});
</script>
<template>
  <div class="watermark-container" ref="parentRef">
    <slot></slot>
    <!-- //添加一个div，填充满整个区域，设置水印背景 -->
  </div>
</template>
<style scoped>
.watermark-container {
  position: relative;
  background: orange;
  border: 1px solid;
}
</style>