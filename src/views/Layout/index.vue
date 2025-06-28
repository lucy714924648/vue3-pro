<script setup>
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import Permission from "../../components/Permission.vue"
import { ElButton } from "element-plus";
import {ref} from 'vue'
const width=ref(500)
const handleSize=(size)=>{
 width.value=size.width;
}
</script>
<template>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <RouterView />
  <div>
    <h1>尺寸变化指令</h1>
    <div class="box" v-size-ob="handleSize" style="width: 300px;height: 300px;background-color: yellow;"></div>
  </div>
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
  <!-- 双飞翼布局 -->
<div style="border: 1px solid;">
    <div class="main coloum">  
      <div class="main-wrapper">
        双飞翼布局
      </div>
    </div>
    <div class="coloum left1">left1</div>
    <div class="coloum right1">right2</div>
</div>
<!-- 圣杯布局 -->
<!-- <div class="main2">
  <div class="column center">圣杯布局</div>
  <div class="column left">left</div>
  <div class="column right">right</div>
</div> -->
  <LayoutFooter></LayoutFooter>
</template>
<style>
.main{
  width: 100%;
  border: 1px solid red;
}
.coloum{
  float: left;
}
.main .main-wrapper{
  margin-left: 200px;
  margin-right: 100px;
}
.left1{
  background-color: orange;
  width: 200px;
  margin-left: -100%;
}
.right1{
  background-color: pink;
  width: 100px;
  margin-left: -100px;
}

 /* .main2{
  border: 1px solid;
  padding-left: 200px;
  padding-right: 100px;
  width: 100%;

 }
 .column{
 float: left;
 }
 .center{
  width: 100%;
  border: 1px solid palegreen;
 }
 .left{
  background-color: aqua;
  width: 200px;
  margin-left: -100%;
  position: relative;
  left: -200px;
 }
 .right{
  background-color: yellow;
  width: 100px;
  margin-right: -100px;

 } */

</style>