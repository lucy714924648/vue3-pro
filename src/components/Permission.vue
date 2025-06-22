<template>
    <!-- 封装一个权限组件 -->
     <!-- v-bind作用yu插槽传参 -->
    <slot v-if="showSlot" :userPermission="permissions"></slot>
</template>
<script setup>
import { computed } from 'vue';

// 用户权限，真实场景是从后段返回
const permissions=['delete','view'];
//父组件传过来的权限
 const props=defineProps({
    permission:[String,Array],
 })
 const showSlot=computed(()=>{
    if(!props.permission){
        return true
    }
    if(!permissions){
        return false
    }
    if (Array.isArray(props.permission)) {
       return props.permission.every(item=>permissions.includes(item))
    }else{
        return permissions.includes(props.permission)
    }
 })
 

</script>