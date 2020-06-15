<template>
  <div class="root">
    <el-input v-model="user" placeholder="请输入用户名" class="user"></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password class="pwd"></el-input>
    <el-button type="primary" round class="btn" @click="submit">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
      submit(){
          window.localStorage.setItem('user',this.user)
          window.localStorage.setItem('password',this.password)
          this.$router.push({path:'/'})
      }
  }
};
</script>

<style scoped lang="stylus">
    .root
        display flex
        flex-direction column
        position absolute
        left 50%
        top 50%
        transform translate(-50%,-50%)
        .pwd,.user,.btn
            width 200px
            margin-top 20px
    
</style>