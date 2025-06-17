

<script setup>
import { ref, onMounted } from "vue";

// 模拟搜索数据源
// const searchData = [
//   { value: "vue3", label: "Vue3 教程" },
//   { value: "element-plus", label: "ElementPlus 文档" },
//   { value: "javascript", label: "JavaScript 高级编程" },
//   { value: "typescript", label: "TypeScript 入门" },
//   { value: "vue-router", label: "Vue Router 4.x" },
//   { value: "pinia", label: "Pinia 状态管理" },
//   { value: "vite", label: "Vite 构建工具" },
//   { value: "composition-api", label: "组合式API" },
// ];

const searchData = ref([]);
const fetchReuest = () => {
  for (let i = 0; i < 20; i++) {
    searchData.push({
      value: `vue${i}`,
      label: `Vue${i} 教程`,
    });
  }
};
onMounted(() => fetchReuest());
// 搜索值
const searchValue = ref("");

// 搜索建议处理函数
const querySearch = (queryString, callback) => {
  console.log("queryString", queryString);
  // 过滤搜索结果
  const results = queryString
    ? searchData.filter(
        (item) =>
          item.value.toLowerCase().includes(queryString.toLowerCase()) ||
          item.label.toLowerCase().includes(queryString.toLowerCase())
      )
    : searchData;

  // 模拟异步请求延迟
  setTimeout(() => {
    callback(results);
  }, 300);
};

// 选择建议项时的处理
const handleSelect = (item) => {
  console.log("选中项:", item);
  // 这里可以添加跳转到搜索结果页的逻辑
};

// 组件挂载后聚焦输入框
onMounted(() => {
  setTimeout(() => {
    const inputEl = document.querySelector(".el-autocomplete__input");
    inputEl?.focus();
  }, 100);
});
</script>
<template>
  <div class="search-container">
    <el-autocomplete
      v-model="searchValue"
      :fetch-suggestions="querySearch"
      placeholder="请输入关键词"
      @select="handleSelect"
      size="large"
      popper-class="search-suggestion"
    />
  </div>
</template>

<style scoped>
.search-container {
  max-width: 500px;
  margin: 20px auto;
}

/* 自定义建议列表样式 */
.search-suggestion {
  max-height: 250px;
  overflow-y: auto;
}
</style>    