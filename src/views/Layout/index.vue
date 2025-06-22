<script setup>
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
</script>
<template>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <RouterView />
  <div class="main">
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
  <LayoutFooter></LayoutFooter>
</template>
<style>
.main{
  border: 1px solid red;
  display: flex;
  /* overflow: hidden; */
  height: 200px;
}
.left{
/* float: left; */
width: 100px;
/* height: 200px; */
background-color: aqua;
}
.right{
  /* margin-left: 100px; */
  border: 1px solid golds;
  flex: 1;
  /* overflow: hidden; */
  /* width: auto; */
}
</style>