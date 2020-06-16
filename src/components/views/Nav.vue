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
    <el-submenu index="1" v-for="menu of menus" :key="menu.id">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>{{menu.title}}</span>
      </template>
      <el-menu-item :index="list.url" v-for="list of lists" :key="list.id" v-if="list.pid==menu.id">{{list.title}}</el-menu-item>
      <!-- <el-menu-item index="/user">{{item.title}}</el-menu-item> -->
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: "",
      menus: [],
      lists: []
    };
  },
  mounted() {
    // 页面加载时，控制左侧菜单选中效果
    // 把当前路由中的path属性赋值给默认选中变量
    this.defaultActive = this.$route.meta.select;
    this.axios.get("/api/menulist").then(res => {
      console.log(res.data.list);
      res.data.list.find(item => {
        if (item.type == 1) {
          this.menus.push(item);
        } else {
          this.lists.push(item);
        }
      });
    });
  },
  watch: {
    $route(newVal) {
      this.defaultActive = newVal.meta.select;
    }
  }
};
</script>

<style>
.el-aside {
  background-color: #545c64;
}
.el-submenu .el-menu-item {
  min-width: 148px;
}
.el-menu .is-active .active {
  color: #ffd04b;
}
</style>