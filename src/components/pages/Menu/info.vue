<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/menu">菜单列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>菜单添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="info" label-width="80px" style="width:400px" ref="menuForm" :rules="rules">
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="info.pid" placeholder="请选择">
          <!-- 
            value
            label 设置选中的选项名称
          -->
          <el-option value>请选择</el-option>
          <el-option value="0" label="顶级菜单">顶级菜单</el-option>
          <el-option value="1" label="系统设置">系统设置</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="info.icon"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址">
        <el-input v-model="info.address"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item label="提交">
        <el-button type="primary" @click="submitForm('menuForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        title: "",
        pid: "",
        icon: "",
        address: "",
        status: false
      },
      rules: {
        title: [{ required: true, message: "此项必填", trigger: "blur" }],
        pid: [{ required: true, message: "请选择上级菜单" }]
      }
    };
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
};
</script>

<style scoped>
.el-form {
  margin: 20px;
}
</style>