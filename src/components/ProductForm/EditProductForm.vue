<script setup>
import { reactive, ref } from "vue";
import ProductFromUI from "./ProductFromUI.vue";
import { ElMessage } from "element-plus";
const formData = reactive({
  name: "",
  price: 0,
  services: [],
});

// 编辑的初始化数据是从ajax里面获取的

const loading = ref(false);
// 数据上传给服务器,本处是模拟
const handleFinsh = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    ElMessage.success({
      message: "添加商品成功",
    });
  }, 1000);
};
</script>

<template>
  <ProductFromUI
    :formData="formData"
    submitText="提交修改"
    :loading="loading"
    @finish="handleFinsh"
  />
</template>