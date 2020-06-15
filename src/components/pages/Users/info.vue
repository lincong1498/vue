<template>
  <div>
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/user'}">用户列表页</el-breadcrumb-item>
      <el-breadcrumb-item>添加用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="info" label-width="80px" style="width:400px" ref="menuForm" :rules="rules">
      <el-form-item label="用户姓名" prop="username">
        <el-input v-model="info.username"></el-input>
      </el-form-item>
       <el-form-item label="性别" prop="sex">
        <el-select v-model="info.sex" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option value="0" label="男">男</el-option>
          <el-option value="1" label="女">女</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="info.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('menuForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info:{
        username: "",
        sex: "",
        age: "",
      },
      rules:{
        username:[{required:true,message:'姓名必填'}],
        sex:[{required:true,message:'性别必选',trigger: "blur" }],
        age:[{required:true,message:'年龄必填',trigger: "blur" }],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
}
</script>

<style>

</style>