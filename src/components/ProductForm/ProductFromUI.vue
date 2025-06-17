<script setup>
import { ref } from "vue";
import { FormProps, services } from "./ProductFrom";

const refForm = ref({});
const props = defineProps(FormProps);
const emit = defineEmits(["finish"]);

const handleSubmit = async (form) => {
  try {
    await form.validate();
    emit("finish");
  } catch (error) {}
};
</script>

<template>
  <!--   @submit.prevent="handleSubmit(refForm)"
    v-loading="loading" -->
  <el-form
    ref="refForm"
    :model="formData"
    :rules="rules"
    label-width="80px"
    status-icon
    @submit.prevent="handleSubmit(refForm)"
    v-loading="loading"
  >
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="formData.name" />
    </el-form-item>
    <el-form-item label="商品价格" prop="price">
      <el-input-number
        v-model="formData.price"
        :min="1"
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item label="商品服务" prop="services">
      <el-checkbox-group v-model="formData.services">
        <el-checkbox
          v-for="(item, index) in services"
          :key="index"
          :label="item"
          >{{ item }}</el-checkbox
        >
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <!-- <el-button type="primary" @click="onSubmit">Create</el-button> -->
      <el-button type="primary" native-type="submit">{{
        submitText
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

