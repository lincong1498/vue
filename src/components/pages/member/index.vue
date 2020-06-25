<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/member/add')">添加</el-button>
    <el-table :data="members" border style="width: 100%">
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="nickname" label="会员名"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" effect="dark">启用</el-tag>
          <el-tag type="danger" v-else effect="dark">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button type="primary" @click="edit(item.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      @current-change="(n)=>pageChange(n)"
    ></el-pagination> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      members: [],
      total: 0,
      pagesize: 2,
      nowpage: 1
    };
  },
  mounted() {
    this.http
      .get("/api/memberlist", { page: this.nowpage, size: this.pagesize })
      .then(res => {
        this.members = res.data.list;
      });
  },
  methods: {
    edit(uid) {
      this.$router.push("/member/" + uid);
    }
  }
};
</script>

<style scoped>
</style>