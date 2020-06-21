<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/menu">菜单列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>菜单{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="info" label-width="80px" style="width:400px" ref="menuForm" :rules="rules">
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="info.pid" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option :value="0" label="顶级菜单">顶级菜单</el-option>
          <el-option
            v-for="menuitem of menus"
            :key="menuitem.id"
            :label="menuitem.title"
            :value="menuitem.id"
          >{{menuitem.title}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio v-model="info.type" :label="1">目录</el-radio>
        <el-radio v-model="info.type" :label="2">菜单</el-radio>
      </el-form-item>
      <el-form-item label="菜单图标" v-show="info.type==1">
        <el-input v-model="info.icon"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" v-show="info.type==2">
        <el-input v-model="info.url"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('menuForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      info: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: false
      },
      tip: "添加",
      rules: {
        title: [{ required: true, message: "此项必填", trigger: "blur" }],
        pid: [{ required: true, message: "请选择上级菜单" }]
      },
      menus: []
    };
  },
  mounted() {
    this.http.get( "/api/menulist").then(res => {
      this.menus = res.data.list; //把接口返回的数据赋值给页面中的变量，用于页面展示内容
    });
    if (this.$route.params.menuid) {
      this.tip = "修改";
      this.http.get( "/api/menuinfo", { id: this.$route.params.menuid }
      ).then(res => {
        this.info = res.data.list;
        // 处理和数据库中不一样的数据类型
        this.info.status = this.info.status == 1 ? true : false;
        // this.info.type =this.info.type.toString();
      });
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          // 如果现在访问的是动态路由，则修改，否则添加
          let url = "/api/menuadd";
          if (this.$route.params.menuid) {
            url = "/api/menuedit";
            data.id = this.$route.params.menuid;
          }
          data.status = data.status ? 1 : 2;
          this.http.post(url, data).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/menu");
            } else {
              alert(res.data.msg);
            }
          });
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