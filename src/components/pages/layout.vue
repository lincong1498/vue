<template>
  <el-container>
    <el-header>header</el-header>
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
import vNav from '../views/Nav'
export default {
    components: {
        vNav
    }
};
</script>

<style>
.el-container {
  width: 100vw;
  height: 100vh;
}
.el-header {
  background: skyblue;
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