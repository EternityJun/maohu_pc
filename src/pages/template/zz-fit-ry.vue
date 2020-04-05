<template>
    <!-- 资质搜索下满足的人员列表 -->
    <div class="ry-wrapper">
        <div class="ry-top">
            <div class="ry-top-content">
                <div class="ry-top-title">
                    人员条件 :
                </div>
                <div class="ry-top-boxs">
                    <div v-for="(item,index) in dataList" :key="index" :class="['ry-top-boxs-item',item.type ? 'ry-top-boxs-active' : '']" @click="handleSwitchTab(item)">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <!-- <div class="total">
                <text>共计：{{ryTotal}}条</text>
            </div> -->
        </div>
        <div class="c-content">
            <el-table :data="ryList" border v-loading="loading">
                <el-table-column type="index" width="60" align="center" label="序号">
                    <template slot-scope="scope">
                        <div>{{(scope.$index+1)+(page-1)*10}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="name" label="姓名">
                    <template slot-scope="scope">
                        <el-button type="text" @click="openRy(scope.row.name,scope.row.remark,scope.row)">{{scope.row.name}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="certificate_type" label="证件类型"></el-table-column>
                <el-table-column align="center" prop="certificate_number" label="证件号"></el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px" @current-change="pageSizeChange" align="right" background layout="total,prev, pager, next" :total="ryTotal"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loading: false,
      apt_id: '1126', //apt_id
      cate: '', //全部 四川 入川
      gs_id: '14411',
      staff_dict: '', //人员条件字典3_2_1
      page: 1,
      rows: 10,
      ryList: [],
      ryTotal: 0,
      isShowLoadMore: false,
      loadMoreStatus: 'more',
      can_ajax: false,
      ryContentPaddingTop: 200,
      dataList: []
    }
  },
  created() {
    // this.apt_id = uni.getStorageSync('apt_id') //资质接口返回的apt_id
    // console.log(options)
    // if (options) {
    // 	this.cate = options.prov_cate //
    // 	this.gs_id = options.gs_id
    // }
    // 请求人员条件
    this.getPeopleCond()
    // 请求人员列表
    this.getSearchPeople()
  },
  computed: {},
  methods: {
    // 筛选人员条件
    handleSwitchTab(item) {
      this.dataList.forEach(x => {
        if (x.name == item.name) {
          x.type = !x.type
        }
      })
      this.page = 1
      this.getSearchPeople()
    },
    // 请求人员列表
    getSearchPeople() {
      let params = {
        apt_id: this.apt_id,
        // cate: 'per_'+this.cate,
        gs_id: this.gs_id,
        staff_dict: '',
        page: this.page,
        rows: 10
      }
      let dataList = this.dataList
      let staff_dicts = []
      dataList.forEach(v => {
        if (v.type) {
          staff_dicts.push(v.staff_dict)
        }
      })
      params.staff_dict = staff_dicts.join(',')
      this.loading = true
      this.axios.post('/firm/Apt_Per_Pro_Search/peopleList', params, data => {
        this.loading = false
        this.ryList = data.rows || []
        this.ryTotal = data.total || 0
      })
    },
    // 请求人员条件
    getPeopleCond() {
      let params = {
        apt_id: this.apt_id
      }
      this.axios.post('/firm/Apt_Per_Pro_Search/peopleCond', params, data => {
        if (data.status === 'success') {
          let rows = data.rows
          rows.forEach(v => {
            v.type = false
          })
          this.dataList = rows
        } else {
        }
      })
    },
    pageSizeChange(page) {
      this.page = page
      this.getSearchPeople()
    },
    // 人员跳转
    openRy(name, source, row) {
      let { href } = this.$router.resolve({
        path: `/ryDet?login_service_id=&qymc=${this.qymc}&gs_id=${
          this.gs_id
        }&name=${name}&staff_base_id=${
          row.staff_base_id ? row.staff_base_id : ''
        }`
      })
      window.open(href, '人员详情' + this.gs_id + name)
    },
    // 业绩跳转
    open_yj(row) {
      console.log(row)
      let source = ''
      if (row.remark == '全国建筑市场') {
        source = 'jzsc'
      } else if (row.remark == '四川省建设厅') {
        source = 'jst'
      } else if (row.remark == '全国公路市场') {
        source = 'gl'
      } else if (row.remark == '全国水利市场') {
        source = 'sl'
      } else {
        let { href } = this.$router.resolve({
          path: `/enterpriseDetails?login_service_id=${
            this.$route.query.login_service_id
          }&gsmc=${this.$route.query.qymc}&zbxx_id=${row.zbxx_id ||
            ''}&zbgs_id=${row.proj_id || ''}&xmmc=${
            row.proj_name
          }&type=zbgs&source=${row.source}`
        })
        window.open(
          href,
          '中标公示' + row.proj_id + row.zbxx_id + row.proj_name
        )
        return
      }
      let { href } = this.$router.resolve({
        path: `/yjDet?login_service_id=${
          this.$route.query.login_service_id
        }&qymc=${this.$route.query.qymc}&proj_id=${
          row.proj_id
        }&source=${source}`
      })
      window.open(href, '业绩详情' + row.proj_name + row.proj_id + source)
    },
    // 加载更多数据
    loadMore() {
      if (!this.can_ajax) {
        // 防止上一次接口还没请求完 又再次请求接口
        return
      }

      if (this.ryTotal == 0) {
        return
      }
      if (this.page * 10 >= this.ryTotal) {
        this.isShowLoadMore = true
        this.loadMoreStatus = 'noMore'
        return
      }
      this.page = this.page + 1
      this.getSearchPeople()
    }
  }
}
</script>

<style lang="less" scoped>
.ry-wrapper {
  display: flex;
  flex-direction: column;

  .ry-top {
    &-content {
      padding: 10px 20px;
      display: flex;
    }

    &-title {
      width: 150px;
      line-height: 33px;
    }

    &-boxs {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      &-item {
        padding: 6px 10px;
        margin: 0 16px 16px 0;
        border-radius: 4px;
        border: 1px solid #ddd;
        cursor: pointer;
        &-text {
          margin-left: 4px;
          color: #049eff;
        }
      }

      &-active {
        color: #049eff;
        border-color: #049eff;
      }
    }
  }

  .total {
    height: 80px;
    line-height: 80px;
    background-color: #f2f2f2;
    color: #999;
    padding: 0 20px;
  }

  .c-content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
