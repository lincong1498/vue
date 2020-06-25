<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/member'}">用户列表页</el-breadcrumb-item>
      <el-breadcrumb-item>{{tip}}会员</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="info" label-width="80px" style="width:400px" ref="memberForm" :rules="rules">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="info.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="info.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="info.password" type="password"></el-input>
        <span v-if="tip=='修改'">留空则不修改密码</span>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('memberForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        nickname: "",
        password: "",
        phone: "",
        status: true
      },
      rules: {
        nickname: [
          { required: true, message: "姓名必填" },
          { min: 1, max: 20, message: "用户姓名长度不符合要求" }
        ],
        roleid: [{ required: true, message: "请选择所属角色" }]
      },
      users: [],
      members: [],
      tip: "增加"
    };
  },
  mounted() {
    // this.http.get("/api/memberinfo",{uid:this.$route.params.memberid}).then(res => {
    //   this.members = res.data.list; //把接口返回的数据赋值给页面中的变量，用于页面展示内容
    // });
    if (this.$route.params.memberid) {
      this.tip = "修改";
      this.http
        .get("/api/memberinfo", { uid: this.$route.params.memberid })
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
          // if (this.$route.params.memberid) {
            let url = "/api/memberedit";
            data.id = this.$route.params.memberid;
          // }
          data.status = data.status ? 1 : 2;
          this.http.post(url, data).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/member");
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