<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/user'}">用户列表页</el-breadcrumb-item>
      <el-breadcrumb-item>{{tip}}用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="info" label-width="80px" style="width:400px" ref="userForm" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="info.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="info.password" type="password"></el-input>
        <span v-if="tip=='修改'">留空则不修改密码</span>
      </el-form-item>
      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="info.roleid" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option
            v-for="item of roles"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          >{{item.rolename}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        username: "",
        password: "",
        roleid: "",
        status: true
      },
      rules: {
        username: [
          { required: true, message: "姓名必填" },
          { min: 1, max: 20, message: "用户姓名长度不符合要求" }
        ],
        roleid: [{ required: true, message: "请选择所属角色" }]
      },
      users: [],
      roles: [],
      tip: "增加"
    };
  },
  mounted() {
    this.http.get("/api/rolelist").then(res => {
      this.roles = res.data.list; //把接口返回的数据赋值给页面中的变量，用于页面展示内容
    });
    if (this.$route.params.userid) {
      this.tip = "修改";
      this.http
        .get("/api/userinfo", { uid: this.$route.params.userid })
        .then(res => {
          this.info = res.data.list;
          // 处理和数据库中不一样的数据类型
          this.info.password = "";
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
          let url = "/api/useradd";
          if (this.$route.params.menuid) {
            url = "/api/useredit";
            data.id = this.$route.params.menuid;
          }
          data.status = data.status ? 1 : 2;
          this.http.post(url, data).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/user");
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

<style>
</style>