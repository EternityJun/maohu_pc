<template>
  <div>
    <el-row type="flex" style="margin-bottom: 10px;" justify="end">
      <span style="line-height: 40px;">公司名称</span>
      <el-input
        class="input"
        v-model="companyName"
        placeholder="请输入公司名称"
        @keyup.enter.native="handleClickSearch"
      />
      <el-button @click="handleClickSearch" type="primary">查询</el-button>
    </el-row>
    <el-table :data="companyList" border v-loading="loading">
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <p style="text-align:center;">{{scope.row.sort}}</p>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" align="center">
        <template slot-scope="scope">
          <p class="hide" @click="handleClickCompanyName(scope.row)">{{ scope.row.gsmc }}</p>
        </template>
      </el-table-column>
      <el-table-column label="公司性质" align="center">
        <template slot-scope="scope">
          <p class="hide black-color">{{ scope.row.business_type }}</p>
        </template>
      </el-table-column>
      <el-table-column property="legal_person" label="企业法人" width="200" align="center"></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <div style="margin-top: 10px;">
        <el-pagination
          background
          :page-size.sync="pageSize"
          :current-page.sync="currentPage"
          layout="total, prev, pager, next"
          :total="total"
          @current-change="handleChangePage"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      companyName: '',
      currentPage: 1,
      total: 0,
      companyList: [],
      loading: false,
      pageSize: 10,
      role: {}
    }
  },
  created () {
    this.loading = true
    this.handleCompanyList()
    this.fn_role()
  },
  methods: {
    // 权限控制 点击公司名称时
    fn_role () {
      let self = this
      self.axios.post(
        '/index/mine/role',
        {
          user_id: this.$store.state.userInfo.user_id,
          company_id: localStorage.getItem('company_id')
        },
        data => {
          this.role = data
        }
      )
    },
    // 查询公司列表
    handleCompanyList () {
      this.axios.post(
        '/index/element_set/getAllCompany',
        {
          gsmc: this.companyName,
          page: this.currentPage,
          rows: this.pageSize
        },
        data => {
          if (data.status === 'success') {
            this.companyList = data.rows.map((item, index) => {
              return {
                ...item,
                sort:
                  (this.currentPage - 1) * this.pageSize +
                  index +
                  1
              }
            })
            this.total = data.total
          }

          this.loading = false
        }
      )
    },
    // 点击公司名称
    handleClickCompanyName (row) {
      // 跳转页面
      if (this.role.company_role !== 'C') {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.gsmc}`
        })
        window.open(href, '公司详情' + row.gs_id)
      } else {
        this.axios.post('/index/mine/roleCompSource', { gs_id: row.gs_id }, res => {
          // 获取跳转页面结果
          //   console.log(res)
          if (res === '四川省建设厅') {
            let { href } = this.$router.resolve({
              path: `/gs_scjst?gs_id=${row.gs_id}`
            })
            window.open(href, '/gs_scjst' + row.gs_id)
          } else {
            let { href } = this.$router.resolve({
              path: `/gs_building?gs_id=${row.gs_id}`
            })
            window.open(href, '/gs_building' + row.gs_id)
          }
        })
      }
    },
    // 点击选择按钮
    handleClick (row) {
      this.$emit('handleGiveChildData', row)
    },
    // 点击搜索按钮
    handleClickSearch () {
      this.loading = true
      this.handleCompanyList()
    },
    // 点击分页 改变表格页码
    handleChangePage (val) {
      this.loading = true
      this.currentPage = val
      this.handleCompanyList()
    }
  }
}
</script>

<style scoped>
.hide {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #409eff;
}
.black-color {
  color: rgb(96, 98, 102);
}
.input {
  border-radius: 4px;
  /* height: 24px; */
  display: inline-block;
  padding: 0 6px;
  width: 300px;
  outline: none;
  /* border: 1px solid #95b8e7; */
}
.sel-button {
  height: 30px;
  line-height: 30rpx;
  margin-left: 5px;
}
.page {
  /* height: 100px;
    line-height: 100px; */
}
</style>
