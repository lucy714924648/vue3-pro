<script setup>
import { computed, defineEmits, defineProps } from "vue";
import { Search } from "@element-plus/icons-vue";
const props = defineProps({
  modelValue: {
    type: Object,
    require: true,
  },
});
// const handleKeywordChange = (val) => {
//   emit("update:modelValue", {
//     ...props.modelValue,
//     keyword: val,
//   });
// };
// const keyword = computed({
//   get() {
//     return props.modelValue.keyword;
//   },
//   set(val) {
//     emit("update:modelValue", {
//       ...props.modelValue,
//       keyword: val,
//     });
//   },
// });
const model = computed({
  get() {
    //解决修改model.keyword;set不触发问题,
    //用proxy代理props.modelValue，修改props.modelValue.keyword就可以触发代理的set
    return new Proxy(props.modelValue, {
      set(obj, name, val) {
        console.log(obj, name, val);
        emit("update:modelValue", {
          ...obj,
          [name]: val,
        });
        return true;
      },
    });
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>
<template>
  <div>
    <!-- v-model="modelValue.keyword" -->
    <!-- :modelValue="modelValue.keyword"
      @update:modelValue="handleKeywordChange" -->
    <el-input
      v-model="model.keyword"
      style="max-width: 600px"
      :placeholder="model.placeholder"
      class="input-with-select"
    >
      <template #prepend>
        <el-select
          v-model="model.selectedValue"
          placeholder="Select"
          style="width: 115px"
        >
          <el-option
            v-for="item in model.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>
</template>