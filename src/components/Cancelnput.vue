<script setup>
import { ref } from "vue";
const inputRef = ref(null);
let controller = ref(null);
inputRef.oninput = async () => {
  controller && controller.abort();
  controller = new AbortController();
  const list = await fetch("url?key=" + inputRef.value, {
    signal: controller.signal,
  }).then((resp) => resp.json());
  console.log(list);
};
</script>
<template>
  <div>
    <input type="text" placeholder="请输入" ref="inputRef" />
  </div>
</template>