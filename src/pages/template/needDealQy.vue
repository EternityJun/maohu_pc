<template>
  <div>
    <el-table align :data="qyList" border v-loading="loading" style="margin-top:10px;">
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">{{scope.$index+(qyPage-1)*10+1}}</template>
      </el-table-column>
      <el-table-column align="center" label="公司名称">
        <template slot-scope="scope">
          <el-button
            @click="handleClickCompanyName(scope.row)"
            size="middle"
            type="text"
          >{{scope.row.gsmc}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" width="250">
        <template slot-scope="scope">
          <!-- <el-button size="middle" type="text">{{scope.row.cate}}</el-button> -->
          <el-button
            v-for="(item,index) in scope.row.user_cate.split(',')"
            :key="index"
            @click="handleClickCate(scope.row, item)"
            size="middle"
            type="text"
          >{{item}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="modified" label="时间" width="250"></el-table-column>
      <!-- <el-table-column align="center" label="企业名称" width="200"></el-table-column>
            <el-table-column align="center" prop label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="small" v-if="scope.row.is_read === '未读'" type="primary">未读</el-button>
                    <el-button size="small" v-else type="text">已读</el-button>
                </template>
      </el-table-column>-->
    </el-table>
    <el-pagination
      align="right"
      style="margin-top:10px"
      :current-page="qyPage"
      background
      @current-change="pageChange"
      layout="total,prev, pager, next"
      :total="qyTotal"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: ['jbId', 'xmmc'],
  data () {
    return {
      user_id: this.$store.state.userInfo.user_id,
      qyList: [], // 企业列表
      qyTotal: 0, // 企业列表个数
      qyPage: 1,
      loading: false,
      role: {}
    }
  },
  created () {
    // 请求项目对应企业列表
    this.handleNeedDealCompany()
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
    // 请求项目对应企业列表
    handleNeedDealCompany (row) {
      this.axios.post(
        '/index/mine/needDealCompany',
        {
          jbxx_id: this.jbId,
          user_id: this.user_id,
          page: this.qyPage,
          rows: 10
        },
        data => {
          if (data.status == 'success') {
            this.qyList = data.rows
            this.qyTotal = data.total
          } else {
            this.qyList = []
            this.qyTotal = 0
          }
        }
      )
    },
    // 点击分页
    pageChange (val) {
      this.qyPage = val
      this.handleNeedDealCompany()
    },
    // 点击企业名称
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
    // 点击标题列 进行页面跳转
    handleClickCate (row, item) {
      // let { href } = "";
      if (row.cate == '筑标') {
        if (item == '分配') {
          window.open(`http://bid.520coc.cn/#/iteminfo?jbxx_id=${row.jbxx_id}&status=yd`, '筑标' + row.jbq)
        } else if (item === '标书') { // 标书
          window.open(`http://bid.520coc.cn/#/itemBsInfo?jbxx_id=${row.jbxx_id}&model=${item}&xmmc=${this.xmmc}`, '筑标' + row.jbxx_id + item)
        } else { // 审核
          window.open(`http://bid.520coc.cn/#/itemCheckInfo?jbxx_id=${row.jbxx_id}`, '筑标' + row.jbxx_id)
        }
      } else if (row.cate === '赖皮') {
        if (item == '预约') {
          window.open(
            'http://laipi.520coc.cn/#/project_process',
            '赖皮预约报名'
          )
        }
        if (item == '报名') {
          window.open(
            'http://laipi.520coc.cn/#/project_process',
            '赖皮预约报名'
          )
        }
        if (item == '标书') {
          let { href } = this.$router.resolve({
            // 标书详情页面
            path: `/ItemBsDet?jbxx_id=${row.jbxx_id}&gs_id=${
              row.gs_id
            }`
          })
          window.open(
            `http://laipi.520coc.cn/#/ItemBsDet?jbxx_id=${
              row.jbxx_id
            }&gs_id=${row.gs_id}`,
            '赖皮标书' + row.jbxx_id + row.gs_id
          )
        }
        if (item == '分配') {
          window.open(
            `http://laipi.520coc.cn/#/competitorAnalysis?jbxx_id=${
              row.jbxx_id
            }&page=1`,
            '赖皮分配' + row.jbxx_id
          )
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
