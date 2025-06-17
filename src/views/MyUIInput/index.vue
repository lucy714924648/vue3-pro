<script setup>
import { onMounted, ref } from "vue";
import MyInput from "@/components/MyInput.vue";
import { Search } from "@element-plus/icons-vue";
const data = ref("");
const MyInputRef = ref(null);
onMounted(() => {
  console.log(MyInputRef.value);
});
</script> 
<template>
  <div>
    <MyInput v-model="data" ref="MyInputRef">
      <template #prepend>
        <el-select placeholder="Select" style="width: 115px">
          <el-option label="Restaurant" value="1" />
          <el-option label="Order No." value="2" />
          <el-option label="Tel" value="3" />
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" />
      </template>
    </MyInput>
  </div>
</template>
