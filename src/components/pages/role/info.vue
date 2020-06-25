<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/role">角色列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="info" label-width="80px" style="width:400px" ref="roleForm" :rules="rules">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="info.rolename"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          :data="menus"
          :props="defaultProps"
          show-checkbox
          ref="tree"
          node-key="id"
          :default-checked-keys="defaultKeys"
          default-expand-all
          check-strictly
        ></el-tree>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('roleForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultKeys: [],
      info: {
        rolename: "",
        menus: "",
        status: true
      },
      tip: "添加",
      rules: {
        rolename: [{ required: true, message: "此项必填", trigger: "blur" }]
        //   pid: [{ required: true, message: "请选择上级菜单" }]
      },
      menus: [],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  mounted() {
    this.http.get("/api/menulist", { istree: 1 }).then(res => {
      // console.log(res.data)
      this.menus = res.data.list; 
      
    });
    if (this.$route.params.roleid) {
      this.tip = "修改";
      this.http
        .get("/api/roleinfo", { id: this.$route.params.roleid })
        .then(res => {
          this.info = res.data.list;
          // 处理和数据库中不一样的数据类型
          this.info.status = this.info.status == 1 ? true : false;
          this.defaultKeys = this.info.menus ? this.info.menus.split(",") : [];
        });
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          // 如果现在访问的是动态路由，则修改，否则添加
          let url = "/api/roleadd";
          if (this.$route.params.roleid) {
            url = "/api/roleedit";
            data.id = this.$route.params.roleid;
          }
          data.status = data.status ? 1 : 2;
          //  getCheckedKey获取勾选的nodekey
          data.menus = this.$refs.tree.getCheckedKeys()
            ? this.$refs.tree.getCheckedKeys().join(",")
            : "";
          this.http.post(url, data).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/role");
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