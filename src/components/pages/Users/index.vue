<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/user/add')">添加</el-button>
    <el-table :data="users" border style="width: 100%">
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" effect="dark">启用</el-tag>
          <el-tag type="danger" v-else effect="dark">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button type="primary" @click="edit(item.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      @current-change="(n)=>pageChange(n)"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      total: 0,
      pagesize: 2,
      nowpage: 1
    };
  },
  mounted() {
    this.getCount();
    this.http
      .get("/api/userlist", { page: this.nowpage, size: this.pagesize })
      .then(res => {
        this.users = res.data.list;
      });
  },
  methods: {
    getCount() {
      this.http
        .get("/api/usercount")
        .then(res => (this.total = res.data.list[0].total));
    },
    getPage() {
      this.http
        .get("/api/userlist", { page: this.nowpage, size: this.pagesize })
        .then(res => {
          this.users = res.data.list;
        });
    },
    pageChange(n) {
      this.nowpage = n;
      this.getPage();
    },
    del(uid) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.http.post(
            "/api/userdelete", { id: uid }
          ).then(res => {
            if (res.data.code == 200) {
              this.getPage();
              // this.users = res.data.list;
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
    edit(uid) {
      this.$router.push("/user/" + uid);
    }
  }
};
</script>

<style scoped>
</style>