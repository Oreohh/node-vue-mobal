<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <!-- <el-table-column prop="categories" label="所属分类"></el-table-column> -->
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" 
          @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="primary" size="small" 
          @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return{
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/articles')
      this.items = res.data
    },
    async remove(row) {
      this.$confirm(`是否删除"${row.name}"文章？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async() => { 
        const res = await this.$http.delete(`rest/articles/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetch()
      })
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style>

</style>
