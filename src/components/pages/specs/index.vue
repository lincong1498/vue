<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/specs/add')">添加</el-button>
    <el-table
      :data="specs"
      style="width:100%"
      stripe
      border
      :tree-props="{children:'children'}"
      row-key="id"
    >
      <!-- row-key 展示数据结构时必须设置的属性，值为唯一标识数据的值 -->
      <!-- tree-props告知表格，自己数据的字段名 -->
      <el-table-column label="规格编号" prop="id"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column label="规格属性" width="400">
        <template slot-scope="scoped">
          <el-tag type="primary" v-for="(item,index) in scoped.row.attrs" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="60">
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
      specs: [],
      total: 0,
      pagesize: 2,
      nowpage: 1
    };
  },
  mounted() {
    this.getCount();
    this.getList();
  },
  methods: {
     getCount() {
      this.http.get( "/api/specscount" ).then( res =>{
        if(res.data.code==200){
          (this.total = res.data.list[0].total)
        }else{
           this.$message({
            type: "info",
            message: "已取消删除"
          });
        }
      }
      );
    },
    getList() {
      this.http.get("/api/specslist",
      { page: this.nowpage, size: this.pagesize } 
      ).then(res => {
        this.specs = res.data.list;
      });
    },
    pageChange(n) {
      this.nowpage = n;
      this.getList();
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.http.post(
             "/api/specsdelete",  { id }
          ).then(res => {
            if (res.data.code == 200) {
              this.menus = res.data.list;
              this.getList();
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
      this.$router.push("/specs/" + id);
    }
  }
};
</script>

<style>
</style>