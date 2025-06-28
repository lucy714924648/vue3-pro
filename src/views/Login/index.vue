<template>
  <div>登录页</div>
  <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto">
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone"  clearable/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" show-password  clearable/>
    </el-form-item>
    <el-form-item prop="agree">
      <el-checkbox v-model="ruleForm.agree">用户平台使用协议</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="submitForm(ruleFormRef)" size="large">
        登陆
      </el-button>

    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref } from 'vue'
const ruleForm = ref({
  phone: '',
  password: '',
  agree: false
})
const ruleFormRef = ref(null)
const rules = ref({
  phone: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      min: 6, max: 16, trigger: '密码长度6-16位'
    }
  ],
  // required只会null/""/nudefined
  agree: [{
    validator: (rule, value, cb) => {
      console.log("value",value);
      
      value ? cb() : cb(new Error('您必须勾选是否同意'))
    }
  }]
})
// 提交表单
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    console.log('valid',valid);
    
    if (valid) {
      alert('校验通过')
    } else {
      alert('校验未通过')
    }
  })

}

</script>