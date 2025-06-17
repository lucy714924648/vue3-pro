<script setup>
import { reactive, ref } from "vue";
import ProductFromUI from "../../components/ProductForm/ProductFromUI.vue";
import { ElMessage } from "element-plus";
const formData = reactive({
  name: "",
  price: 0,
  services: [],
});
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
    submitText="添加商品"
    :loading="loading"
    @finish="handleFinsh"
  />
</template>