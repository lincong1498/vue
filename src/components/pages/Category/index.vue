<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/category/add')">添加</el-button>
    <el-table
      :data="categorys"
      style="width:100%"
      stripe
      border
      :tree-props="{children:'children'}"
      row-key="id"
    >
      <!-- row-key 展示数据结构时必须设置的属性，值为唯一标识数据的值 -->
      <!-- tree-props告知表格，自己数据的字段名 -->
      <el-table-column label="分类编号" prop="id"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column  label="分类图片" >
        <template slot-scope="item">
          <img :src="item.row.img" alt="" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" effect="dark">启用</el-tag>
          <el-tag type="danger" v-else effect="dark">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button type="primary" size="small" @click="edit(item.row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorys: []
    };
  },
  mounted() {
    this.http.get("/api/catelist",{istree:1}).then(res => {
      this.categorys = res.data.list;
    });
  },
  methods: {
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.http.post("/api/catedelete", {id}).then(res => {
            if (res.data.code == 200) {
              this.menus = res.data.list;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              alert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(id) {
      this.$router.push("/category/" + id);
    }
  }
};
</script>

<style>
</style>