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
    <el-submenu index="1" v-for="navitem of navMenus" :key="navitem.id">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>{{navitem.title}}</span>
      </template>
      <el-menu-item
        :index="subitem.url"
        v-for="(subitem,index) of navitem.children"
        :key="index.toString()"
      >{{subitem.title}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: "",
      menus: [],
      lists: [],
      navMenus: [],
    };
  },
  mounted() {
    // 页面加载时，控制左侧菜单选中效果
    // 把当前路由中的path属性赋值给默认选中变量
    this.defaultActive = this.$route.meta.select;
    this.getNavMenu();
  },
  watch: {
    $route(newVal) {
      this.defaultActive = newVal.meta.select;
      this.getNavMenu();
    }
  },
  methods: {
    getNavMenu() {
    //   this.axios({ 
    //     url:'/api/menulist',
    //     params:{istree:1}
    //     }).then(res => {
    //     this.navMenus = res.data.list;
    // })
    if(localStorage.getItem('htuser')){
      let info = JSON.parse(localStorage.getItem('htuser'));
      this.navMenus = info.menus;
    }
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