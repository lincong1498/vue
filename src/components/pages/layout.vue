<template>
  <el-container>
    <el-header>
      <div class="left">
        <p>欢迎来到小U商城后台管理系统</p>
      </div>
      <div class="right">
        <p>{{userInfo.username}}</p>
        <el-link type="danger" @click="logout">退出</el-link>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width:200px">
        <v-Nav></v-Nav>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>footer</el-footer>
  </el-container>
</template>

<script>
import vNav from "../views/Nav";
import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
     
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['setAdminUserSync']),
    logout(){
      this.setAdminUserSync({})
      // localStorage.removeItem('htuser');
      this.$router.push('/login')
    }
  },
  // mounted() {
  //   let info = localStorage.getItem('htuser')?JSON.parse(localStorage.getItem('htuser')):null;
  //   this.userinfo = info;
  // },
  components: {
    vNav
  },
  // beforeRouteEnter(to, from, next) {
    
  // }
};
</script>

<style>
.el-container {
  width: 100vw;
  height: 100vh;
}
.el-header {
  background: skyblue;
  line-height: 60px;
  display: flex;
}
.right {
  position: absolute;
  right: 20px;
  display: flex;
}
.el-footer {
  background: slateblue;
}
.el-aside {
  background: #545c64;
}
.el-submenu .el-menu-item {
  min-width: 149px;
}
</style>