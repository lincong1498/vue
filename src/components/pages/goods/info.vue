<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/goods">商品列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品分类{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="info" label-width="80px" style="width:400px" ref="goodsForm" :rules="rules">
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="info.first_cateid" placeholder="请选择" @change="cateChange">
          <el-option value>请选择</el-option>
          <el-option
            v-for="goodsitem of goods"
            :key="goodsitem.id"
            :label="goodsitem.catename"
            :value="goodsitem.id"
          >{{goodsitem.catename}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="info.second_cateid" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option
            v-for="seconditem of secondCates"
            :key="seconditem.id"
            :label="seconditem.catename"
            :value="seconditem.id"
          >{{seconditem.catename}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="info.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="info.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model.number="info.market_price" type="number"></el-input>
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
      <el-form-item label="商品规格" prop="specsid">
        <el-select placeholder="请选择" @change="specsChange" v-model="info.specsid">
          <el-option value>请选择</el-option>
          <el-option
            v-for="(specsitem,index) of specsarr"
            :key="index"
            :label="specsitem.specsname"
            :value="index"
          >{{specsitem.specsname}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性">
        <el-select v-model="info.specsattr" placeholder="请选择" multiple>
          <el-option value>请选择</el-option>
          <el-option
            v-for="(attritem,index) of specsattrs"
            :key="index"
            :label="attritem"
            :value="attritem"
          >{{attritem}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品">
        <el-radio v-model="info.isnew" :label="1">是</el-radio>
        <el-radio v-model="info.isnew" :label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖">
        <el-radio v-model="info.ishot" :label="1">是</el-radio>
        <el-radio v-model="info.ishot" :label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item label="商品描述">
        <div id="desc" v-model="info.description"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('goodsForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      info: {
        first_cateid: "",
        second_cateid: "",
        price: "",
        market_price: "",
        specsid: "",
        specsattr: "",
        description: "",
        isnew: 1,
        ishot: 1,
        goodsname: "",
        status: false
      },
      specsarr: [],
      specsattrs: [],
      img: "",
      tip: "添加",
      rules: {
        goodsname: [
          { required: true, message: "商品分类名称不能为空", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级商品分类" }]
      },
      secondCates: [],
      goods: [],
      editor: null
    };
  },
  mounted() {
    this.editor = new E("#desc");
    this.editor.create();
    this.http.get("/api/catelist", { pid: 0 }).then(res => {
      this.goods = res.data.list;
    });
    this.http.get("/api/specslist", { id: 0 }).then(res => {
      this.specsarr = res.data.list;
    });
    if (this.$route.params.goodsid) {
      this.tip = "修改";
      this.http
        .get("/api/goodsinfo", { id: this.$route.params.goodsid })
        .then(res => {
          this.info = res.data.list;
          if (this.info.first_cateid) {
            this.cateChange(this.info.first_cateid);
          }
          if (this.info.specsid) {
            this.specsChange(this.info.specsid);
          }
          this.fileList = [{ url: this.info.img }];
          this.info.status = this.info.status == 1 ? true : false;
          this.info.specsattr = this.info.specsattr
            ? this.info.specsattr.split(",")
            : [];
          this.editor.txt.html(this.info.description);
          console.log(this.info);
        });
    }
  },
  methods: {
    specsChange(e) {
      // if (e == "") {
      //   console.log(e);
      //   return;
      // } else {
      e++;
      this.http.get("/api/specsinfo", { id: e }).then(res => {
        if (res.data.code == 200) {
          // console.log(res)
          this.specsattrs = res.data.list[0].attrs
            ? res.data.list[0].attrs
            : [];
        }
      });
      // }
    },
    cateChange(e) {
      if (e == "") {
        return;
      } else {
        this.http.get("/api/catelist", { pid: e }).then(res => {
          if (res.data.code == 200) {
            this.secondCates = res.data.list[e-1].children ? res.data.list[e-1].children : "";
          }
        });
      }
    },
    fileChange(file) {
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
          let data = JSON.parse(JSON.stringify(this.info));
          data.description = this.editor.txt.html();
          // let data = this.info;
          // 如果现在访问的是动态路由，则修改，否则添加
          let url = "/api/goodsadd";
          console.log();
          if (this.$route.params.goodsid) {
            url = "/api/goodsedit";
            data.id = this.$route.params.goodsid;
          }
          data.status = data.status ? 1 : 2;
          data.specsattr = data.specsattr ? data.specsattr.join(",") : "";
          let form = new FormData();
          for (let i in data) {
            form.append(i, data[i]);
          }
          if (this.img) {
            form.append("img", this.img);
          }
          this.http.post(url, form).then(res => {
            if (res.data.code == 200) {
              this.$router.push("/goods");
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