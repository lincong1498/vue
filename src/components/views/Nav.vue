<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/home">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>系统设置</span>
      </template>
      <el-menu-item index="/menu">菜单管理</el-menu-item>
      <el-menu-item index="/user">用户管理</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: ""
    };
  },
  mounted() {
    // 页面加载时，控制左侧菜单选中效果
    // 把当前路由中的path属性赋值给默认选中变量
    this.defaultActive = this.$route.meta.select;
  },
  watch: {
    $route(newVal) {
      console.log(newVal.meta.select);
      this.defaultActive = newVal.meta.select;
    }
  }
};
</script>

<style>
.el-aside {
  background-color: #545c64;
}
.el-submenu .el-menu-item{
    min-width: 148px;
}
.el-menu .is-active .active {
  color: #ffd04b;
}
</style>