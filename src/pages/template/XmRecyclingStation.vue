<template>
    <div>
        <el-table :data="tableData" style="width: 100%;" v-loading="loading" border>
            <el-table-column label="序号" width="60" align="center">
                <template slot-scope="scope">{{scope.$index+(page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column align="center" prop="date1" label="项目名称">
                <template slot-scope="scope">
                    <div v-if="scope.row.zbxx_id>0" class="link_color" @click="openGs(scope.row)">{{scope.row.xmmc}}</div>
                    <span v-else>{{scope.row.xmmc}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="xmdq" label="项目地区" width="100"></el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="clickFn('恢复',scope.row)">恢复</el-button>
                    <el-button size="small" type="danger" @click="clickFn('删除',scope.row)">彻底删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-footer>
            <el-pagination @current-change="handleSizeChange" align="right" :current-page.sync="page" background layout="total,prev, pager, next" :total="total"></el-pagination>
        </el-footer>
    </div>
</template>
<script>
export default {
  props: ['params'],
  data() {
    return {
      page: 1,
      row: 10,
      total: 0,
      tableData: [],
      loading: false
    }
  },
  created() {
    this.getRecycling()
  },
  watch:{
      params(){
          this.getRecycling();
      }
  },
  methods: {
    clickFn(type, row) {
      let self = this
      let params = {
        jbxx_id: row.id,
        company_id: this.params.company_id,
        user_id: this.params.user_id,
        valid: ''
      }
      switch (type) {
        case '恢复':
          params.valid = 1
          self.axios.post('/index/project/delProject', params, data => {
            if (data.status == 'success') {
                self.getRecycling();
                self.$emit('refresh')
            } else {
              self.$message.success(data.message)
            }
          })
          break
        case '删除':
          params.valid = 0
          this.$confirm('将彻底删除该项目,确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              self.axios.post('/index/project/delProject', params, data => {
                if (data.status == 'success') {
                    this.getRecycling();
                } else {
                  self.$message.success(data.message)
                }
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          break
      }
    },
    getRecycling() {
      let params = this.params
      params.page=this.page
      this.axios.post('/index/project/re_lists', params, data => {
        if(data.total>0 && data.status=='failed' &&params.page>1){
          this.page-=1;
          this.getRecycling();
        }
        this.tableData = data.rows
        this.loading = false
        this.total = data.total || 0
      })
    },
    handleSizeChange(val) {
      this.page = val
      this.getRecycling()
    },
    openGs(row) {
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?zbxx_id=${
          row.zbxx_id
        }&zbgs_id=&type=zbxx&xmmc=${row.xmmc}&source=${row.source}`
      })
      window.open(href, '招标信息' + row.zbxx_id + row.xmmc)
    }
  }
}
</script>
<style lang="less" scoped>
</style>

