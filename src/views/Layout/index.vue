<script setup>
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import Permission from "../../components/Permission.vue"
import { ElButton } from "element-plus";
</script>
<template>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <RouterView />
  <div>
    <h1>组件级按钮权限控制</h1>
    <Permission >
      <!-- 作用yu插槽接收子组件传过来的参数 -->
       <!-- 父组件可以自定义这部分 -->
      <template default #="{userPermission}">
        <ElButton :disabled="!userPermission.includes('add')" type="primary">新增用户</ElButton>
      </template>
    </Permission>
    <Permission permission="view">
        <ElButton type="primary">查询用户</ElButton>
    </Permission>
    <Permission permission="edit">
        <ElButton type="primary">修改用户</ElButton>
    </Permission>
    <!-- 数组形式 -->
    <Permission :permission="['view','delete']">
        <ElButton type="primary">删除用户</ElButton>
    </Permission>
   
  </div>
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