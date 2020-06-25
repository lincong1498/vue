<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/seck">商品列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品分类{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="info" label-width="80px" style="width:400px" ref="seckForm" :rules="rules">
      <el-form-item label="活动名称" prop="title">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <el-form-item label="活动期限" prop="title">
        <template>
          <div class="block">
            <el-date-picker
              v-model="value1"
              value-format="timestamp"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00']"
            ></el-date-picker>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="info.first_cateid" placeholder="请选择" @change="cateChange">
          <el-option value>请选择</el-option>
          <el-option
            v-for="secksitem of cates"
            :key="secksitem.id"
            :label="secksitem.catename"
            :value="secksitem.id"
          >{{secksitem.catename}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="info.second_cateid" placeholder="请选择" @change="goodChange">
          <el-option value>请选择</el-option>
          <el-option
            v-for="seconditem of secondCates"
            :key="seconditem.id"
            :label="seconditem.catename"
            :value="seconditem.id"
          >{{seconditem.catename}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品" prop="goodsid">
        <el-select v-model="info.goodsid" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option
            v-for="gooditem of goods"
            :key="gooditem.id"
            :label="gooditem.goodsname"
            :value="gooditem.id"
          >{{gooditem.goodsname}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('seckForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      info: {
        first_cateid: "",
        second_cateid: "",
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: false
      },
      tip: "添加",
      rules: {
        goodsname: [
          { required: true, message: "商品分类名称不能为空", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级商品分类" }]
      },
      secondCates: [],
      goods: [],
      seck: [],
      cates:[],
      value1:[],
      firstId:''
    };
  },
  mounted() {
    this.http.get("/api/catelist", { pid: 0 }).then(res => {
      this.cates = res.data.list;
    });
    if (this.$route.params.seckid) {
      this.tip = "修改";
      this.http
        .get("/api/seckinfo", { id: this.$route.params.seckid })
        .then(res => {
          this.info = res.data.list;
          if (this.info.first_cateid) {
            this.cateChange(this.info.first_cateid);
          }
          if (this.info.second_cateid) {
            this.goodChange(this.info.second_cateid);
          }
          this.info.status = this.info.status == 1 ? true : false;
          this.$set(this.value1,0,this.info.begintime);
          this.$set(this.value1,1,this.info.endtime);
        });
    }
  },
  methods: {
    cateChange(e) {
      if (e == "") {
        return;
      } else {
        this.http.get("/api/catelist", { id: e }).then(res => {
          if (res.data.code == 200) {
          this.firstId = e;
            this.secondCates = res.data.list[e-1].children? res.data.list[e-1].children : "";
          }
        });
      }
    },
    goodChange(e) {
      if (e == "") {
        return;
      } else {
        this.http.get("/api/goodslist",{fid:this.firstId,sid:e}).then(res => {
          if (res.data.code == 200) {
            this.goods = res.data.list ? res.data.list : "";
            // console.log(this.goods)
          }
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          let url = "/api/seckadd";
          if (this.$route.params.seckid) {
            url = "/api/seckedit";
            data.id = this.$route.params.seckid;
          }
          data.status = data.status ? 1 : 2;
          data.begintime = this.value1[0];
          data.endtime = this.value1[1];
          this.http.post(url, data).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/seck");
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
#desc {
  height: 300px;
  width: 800px;
}
.el-button--primary {
  margin-top: 50px;
  display: block;
}
</style>