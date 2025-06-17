
<script setup>
import { ref } from "vue";
import WaterMark from "../../components/WaterMark.vue";
import SearchBar from "../../components/SearchBar.vue";
import CancelSearchInput from "../../components/CancelSearchInput.vue";
const searchData = ref({
  keyword: "",
  placeholder: "请输入你要查询的关键字",
  options: [
    { label: "视频", value: "video" },
    { label: "文章", value: "article" },
    { label: "用户", value: "user" },
  ],
  selectedValue: "video",
});
</script>



<template>
  <div>
    <div>home</div>
    <WaterMark text="版本控制">
      <div class="content">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae dicta
        consequatur illum obcaecati! Cumque quae quia tempora aut
        necessitatibus, ad saepe et! Quia fugiat aut dolorum hic quasi repellat
        rerum aspernatur ullam! Deleniti porro repellat commodi eaque qui.
        Facilis minus alias repellat dolores aspernatur architecto repudiandae
        perferendis nisi? Autem fugiat officia possimus rem optio expedita
        assumenda quidem ducimus deleniti, maiores amet modi repellat dolor
        facere aut nam, eos molestias, tempora tenetur voluptates nisi sint
        atque aliquid! Dolores deserunt tenetur ab, quo vitae ad placeat qui
        hic, non repudiandae, architecto ex quae quibusdam. Molestias unde
        provident quae dolores minima facere ex.
      </div>
    </WaterMark>
    <SearchBar v-model="searchData"></SearchBar>
    <CancelSearchInput></CancelSearchInput>
  </div>
</template>