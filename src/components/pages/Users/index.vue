<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/user/add')">添加</el-button>
    <el-table :data="users" border style="width: 100%">
      <el-table-column prop="username" label="用户名" ></el-table-column>
      <el-table-column prop="sex" label="性别" ></el-table-column>
      <el-table-column prop="age" label="年龄" ></el-table-column>
      <el-table-column  label="操作" >
        <template >
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users:[
        {
          username:'张三',
          sex:'男',
          age:18,
          password:123
        },
        {
          username:'李四',
          sex:'女',
          age:28,
          password:123
        },
        {
          username:'王五',
          sex:'女',
          age:38,
          password:123
        }
      ]
    }
  }
};
</script>

<style>
</style>