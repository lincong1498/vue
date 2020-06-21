<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/specs">规格列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>规格{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="info" label-width="80px" style="width:400px" ref="specsForm" :rules="rules">
      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model="info.specsname"></el-input>
      </el-form-item>
      <el-form-item v-for="(item, index) in specaAttrs" :key="index" label="规格属性">
        <el-input v-model="item.value"></el-input>
        <el-button @click="addAttr" v-if="index==0">新增规则属性</el-button>
        <el-button @click="removeAttr(index)" v-else>删除</el-button>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('specsForm')">{{tip}}</el-button>
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
        specsname: "",
        attrs: "",
        status: true
      },
      specaAttrs: [{ value: "" }],
      tip: "添加",
      rules: {
        specsname: [{ required: true, message: "此项必填", trigger: "blur" }]
        //   attrs: [{ required: true, message: "请选择上级菜单" }]
      },
      menus: [],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  mounted() {
    this.http.get("/api/specslist", { istree: 1 }).then(res => {
      this.menus = res.data.list; //把接口返回的数据赋值给页面中的变量，用于页面展示内容
      this.defaultKeys = this.info.menus ? this.info.menus.split(",") : [];
    });
    if (this.$route.params.specsid) {
      this.tip = "修改";
      this.http
        .get("/api/specsinfo", { id: this.$route.params.specsid })
        .then(res => {
          this.info = res.data.list[0];
          // 处理和数据库中不一样的数据类型
          this.info.status = this.info.status == 1 ? true : false;
          this.info.attrs.map((d, i) => {
            if (i == 0) {
              this.specaAttrs[0].value = d;
            } else {
              this.specaAttrs.push({ value: d });
            }
          });
          // this.info.type =this.info.type.toString();
        });
    }
  },
  methods: {
    addAttr() {
      if (this.specaAttrs.length <= 5) {
        this.specaAttrs.push({
          value: ""
        });
      }
    },
    removeAttr(i) {
      this.specaAttrs.splice(i, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          // 如果现在访问的是动态路由，则修改，否则添加
          let url = "/api/specsadd";
          if (this.$route.params.specsid) {
            url = "/api/specsedit";
            data.id = this.$route.params.specsid;
          }
          data.status = data.status ? 1 : 2;
          let arr = [];
          this.specaAttrs.map(item => {
            arr.push(item.value);
          });
          data.attrs = arr ? arr.join(",") : "";
          // console.log(data);return;
          //  getCheckedKey获取勾选的nodekey
          this.http.post(url, data).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/specs");
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