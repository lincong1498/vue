<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/banner">轮播列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>轮播图{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="info"
      label-width="80px"
      style="width:400px"
      ref="categorysForm"
      :rules="rules"
    >
      <el-form-item label="轮播图名" prop="title">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="fileChange"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('categorysForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList:[],
      dialogImageUrl: "",
      dialogVisible: false,
      info: {
        title: "",
        status: false
      },
      img: "",
      tip: "添加",
      rules: {
        catename: [
          { required: true, message: "商品分类名称不能为空", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级商品分类" }]
      },
      banners: []
    };
  },
  mounted() {
    this.http.get('/api/bannerlist').then(res => {
      this.banners = res.data.list; //把接口返回的数据赋值给页面中的变量，用于页面展示内容
    });

    if (this.$route.params.bannerid) {
      this.tip = "修改";
      this.http.get( "/api/bannerinfo", { id: this.$route.params.bannerid }
      ).then(res => {
        this.info = res.data.list;
        // 处理和数据库中不一样的数据类型
        this.fileList = [{url:this.info.img}];
        this.info.status = this.info.status == 1 ? true : false;
        // this.info.type =this.info.type.toString();
      });
    }
  },
  methods: {
    fileChange(file) {
      // console.log(file)
      this.img = file.raw;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let data = JSON.parse(JSON.stringify(this.info));
          let data = this.info;
          // let data = this.info;
          // 如果现在访问的是动态路由，则修改，否则添加
          let url = "/api/banneradd";
          if (this.$route.params.bannerid) {
            url = "/api/banneredit";
            data.id = this.$route.params.bannerid;
          }
          data.status = data.status ? 1 : 2;
          let form = new FormData();
          for (let i in data) {
            form.append(i, data[i]);
          }
          if (this.img) {
            form.append("img", this.img);
          }
          this.http.post(url, form).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/banner");
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