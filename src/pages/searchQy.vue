<template>
  <div id="searchQy">
    <header>
      <div>
        <span class="gsmc">企业信息</span>
      </div>
    </header>
    <div class="searchBox">
      <search-qy @onSearch="onSearch" @onReset="onSearch" :options="options"></search-qy>
      <div>
        <template>
          <div class="sortBtn" style="float:right">
            <el-radio-group v-model="sortType" @change="changeSort" style="margin-bottom:10px">
              <el-radio-button label="默认排序"></el-radio-button>
              <el-radio-button label="关系排序"></el-radio-button>
            </el-radio-group>
          </div>
          <el-table :data="tableData" style="width: 100%" border v-loading="loading">
            <el-table-column width="60" type="index" label="序号" align="center">
              <template slot-scope="scope">{{scope.$index+(page-1)*row+1}}</template>
            </el-table-column>
            <el-table-column prop="company_name" label="公司名称" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="openGs(scope.row)">{{scope.row.company_name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="legal_person" label="法人代表" align="center" width="100"></el-table-column>
            <el-table-column prop="area" label="所属地区" align="center" width="150"></el-table-column>
            <el-table-column prop="social_code" label="统一社会信用代码" align="center"></el-table-column>
            <el-table-column label="找到我" align="center">
              <template slot-scope="scope">
                <lookMe :key="new Date().getTime()" :arr.sync="scope.row" :off="true" :tkShow='true' :showTxt='true' :refresh.sync="refresh"></lookMe>
              </template>
            </el-table-column>
          </el-table>
          <div class="foot">
            <el-pagination style="margin-top:20px" :current-page="page" :page-size="row" @current-change="qyPageSizeChange" align="right" background layout="total,prev, pager, next" :total="count"></el-pagination>
            <p class="total">
              共计找到符合条件的记录数：
              <span style="color:#409eff">{{total}}</span>条,请输入更多信息进行查询
            </p>
          </div>
        </template>
      </div>
    </div>
    <back-to-top></back-to-top>
  </div>
</template>
<script>
import searchQy from './template/searchQy'
import backToTop from './template/backToTop'
import lookMe from './template/lookMe'

export default {
  data() {
    return {
      showTxt: true,
      value: null,
      refresh: false,
      options: {
        size: 'medium',
        searchQy: {}
      },
      loading: true,
      tableData: [],
      total: 0,
      gsmc: '',
      page: 1,
      row: 20,
      count: 0,
      role: {},
      sortType: '关系排序' //默认排序/关系排序
    }
  },
  created() {
    document.title = '企业搜索'
    // this.gsmc = this.$route.query.gsmc;
    // this.options.searchQy.gsmc= this.gsmc
    // window.location.reload();
    this.fn_role()
    this.onSearch('created')
  },
  components: {
    searchQy,
    backToTop,
    lookMe
  },
  mounted() {},
  watch: {
    $route: function(newVal) {
      window.location.reload()
    }
  },
  methods: {
    // 权限控制 点击公司名称时
    fn_role() {
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
    onSearch(type) {
      this.refresh = !this.refresh
      if (type != 'page') {
        this.page = 1
      }
      let gs_data = localStorage.getItem('searchQy')
      gs_data = JSON.parse(gs_data)
      if (type == 'created') {
        let province=localStorage.getItem('local_province')
        gs_data.zcsd = [
          province, `${province}-全部`,`${province}-全部-不限制`
        ]
      }

      this.options.searchQy = gs_data
      let params
      if (!gs_data) {
        params = {
          page: this.page,
          rows: this.row
        }
      } else {
        let zcsd = ''
        if (gs_data.zcsd.length > 0 && gs_data.zcsd[0] === '全不限制') {
          zcsd = ''
        } else {
          zcsd = gs_data.zcsd[2]
        }
        params = {
          // company: gs_data.gsmc,
          company: gs_data.checked
            ? gs_data.gsKey instanceof Array ? gs_data.gsKey.join(',') : ''
            : gs_data.gsmc,
          code: gs_data.xydm,
          zsbh: gs_data.zsbh,
          legal: gs_data.fr,
          type: gs_data.qylx,
          area: zcsd,
          // area: '四川省-全部-不限制',
          // is_rc: gs_data.is_rc,
          // area: gs_data.area,
          page: this.page,
          rows: this.row,
          user_id: localStorage.getItem('user_id'),
          order: this.order,
          search_type: gs_data.checked ? 'high' : 'common'
        }
      }
      this.loading = true
      this.axios.post('/firm/firm_search_nation/searchComp', params, data => {
        if (data.status == 'success') {
          this.tableData = data.rows
          this.total = data.total
          this.count = data.count
        } else {
          this.tableData = []
          this.total = 0
          this.count = 0
        }
        // localStorage.removeItem('searchQy');
        this.loading = false
      })
    },
    // 跳转
    openGs(row) {
      // console.log(this.$route)
      //   console.log(row)
      if (this.role.company_role !== 'C') {
        let { href } = this.$router.resolve({
          path: `/gsDetail?login_service_id=${
            this.$route.query.login_service_id
          }&qymc=${this.$route.query.qymc}&gs_id=${row.id}&gsmc=${
            row.company_name
          }`
        })
        window.open(href, '公司详情' + row.id)
      } else {
        this.axios.post(
          '/index/mine/roleCompSource',
          { gs_id: row.id },
          res => {
            // 获取跳转页面结果
            //   console.log(res)
            if (res === '四川省建设厅') {
              let { href } = this.$router.resolve({
                path: `/gs_scjst?login_service_id=${
                  this.$route.query.login_service_id
                }&qymc=${this.$route.query.qymc}&gs_id=${row.id}`
              })
              window.open(href, '/gs_scjst' + row.id)
            } else {
              let { href } = this.$router.resolve({
                path: `/gs_building?login_service_id=${
                  this.$route.query.login_service_id
                }&qymc=${this.$route.query.qymc}&gs_id=${row.id}`
              })
              window.open(href, '/gs_building' + row.id)
            }
          }
        )
      }
    },
    // 点击分页
    qyPageSizeChange(val) {
      this.page = val
      this.onSearch('page')
    },
    // 改变排序方式
    changeSort() {
      // console.log(this.sortType);
      if (this.sortType == '默认排序') {
        this.order = 'score'
        this.onSearch()
      } else {
        this.order = 'weight'
        this.onSearch()
      }
    }
  }
}
</script>
 <style lang="less" scoped>
#searchQy {
  .gsmc {
    font-size: 32px;
  }
  header {
    box-shadow: 2px 2px 2px rgb(241, 240, 240);
    height: 70px;
    line-height: 70px;
    // margin-bottom: 2px;
    text-align: center;
    font-size: 30px;
  }
  .searchBox {
    width: 1200px;
    margin: 0 auto;
    .foot {
      position: relative;
    }
    .total {
      position: absolute;
      top: 5px;
      color: gray;
      font-size: 14px;
    }
  }
}
</style>
