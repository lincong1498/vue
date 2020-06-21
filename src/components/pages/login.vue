<template class="app">
  <div class="bg">
    <div class="root">
      <el-form :model="info" ref="loginForm">
        <el-form-item label="用户名">
          <el-input v-model="info.username" placeholder="请输入用户名" class="user"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" v-model="info.password" show-password class="pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round class="btn" @click="submit(loginForm)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        username: "",
        password: ""
      },
      loginForm: ""
    };
  },
  methods: {
    submit(loginForm) {
      this.axios({
        url: "/api/userlogin",
        method: "post",
        data: this.info
      }).then(res => {
        if (res.data.code === 200) {
          localStorage.setItem("htuser", JSON.stringify(res.data.list));
          this.$router.push({ path: "/home" });
        } else {
          this.$message(res.data.msg);
        }
      });
      // window.localStorage.setItem("user", this.user);
      // window.localStorage.setItem("password", this.password);
      // this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped lang="stylus">
.bg {
  height: 100%;
  width: 100%;
  background: -webkit-linear-gradient(left, #563443, #413a53, #2f3d60);
}

.root {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .pwd, .user, .btn {
    width: 200px;
    margin-top: 20px;
  }
}
</style>