<template>
    <!-- 资质搜索产生的公司列表 -->
    <div style="color:#333333">
        <div class="tittle">企业列表</div>
        <div class="content_div">
            <div class="search_result" v-if="zz_total_array.length != 0">
                <div class="right">
                    <div class="filter">
                        <el-row style="width:100%;">
                            <el-col :span="20">
                                <div class="text">
                                    <span style="padding-right:20px;" :class="[selected_area.type === '全部' ? 'selected_css' : 'nosel_css']" @click="onClickAll">全部&nbsp;{{all_total}}&nbsp;条</span>
                                    <el-dropdown style="padding-right:20px;text-align:left" trigger="click" @command="handleCommand">
                                        <span :class="['el-dropdown-link',selected_area.type==checked_area.prov?'selected_css':'']">
                                            {{selected_area.value_sc != '不限制'?selected_area.value_sc:checked_area.prov}}&nbsp;{{sc_zz_total}}&nbsp;条
                                            <i class="el-icon-arrow-down el-icon--right" style="margin-left:2px"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown" style="height:300px;overflow:auto">
                                            <el-dropdown-item v-for="item in sc_areaArray" :command="item.name" :key="item.name">{{item.name}}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    <el-dropdown style="padding-right:10px;min-width:100px;text-align:left" trigger="click" @command="handleCommand2">
                                        <span :class="['el-dropdown-link',selected_area.type==checked_area.r_prov?'selected_css':'']">
                                            {{selected_area.value_rc != '不限制'?selected_area.value_rc:checked_area.r_prov}}&nbsp;{{rc_zz_total}}&nbsp;条
                                            <i class="el-icon-arrow-down el-icon--right" style="margin-left:2px"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown" style="height:300px;overflow:auto">
                                            <el-dropdown-item v-for="item in rc_areaArray" :command="item.name" :key="item.name">{{item.name}}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <div class="sortBtn">
                                    <el-radio-group v-model="sortType" @change="changeSort">
                                        <el-radio-button label="默认排序"></el-radio-button>
                                        <el-radio-button label="关系排序"></el-radio-button>
                                    </el-radio-group>
                                </div>
                            </el-col>
                        </el-row>

                    </div>
                    <div class="list_table">
                        <div class="list_title">{{selected_item.all_name || '全部'}}</div>
                        <el-table :data="tableData" border v-loading="loading">
                            <el-table-column width="60" type="index" label="序号" align="center">
                                <template slot-scope="scope">{{(scope.$index+1)+(page-1)*row}}</template>
                            </el-table-column>
                            <el-table-column align="center" width="250" prop="company_name" label="公司名称">
                                <template slot-scope="scope">
                                    <div style="color:#3a8ee6;cursor:pointer;padding:8px 0" type="text" @click="openGs(scope.row)">{{scope.row.company_name}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="legal_person" label="法人代表" width="100"></el-table-column>
                            <el-table-column align="center" prop="area" label="所属地区" width="100"></el-table-column>
                            <el-table-column align="center" prop="social_code" label="统一社会信用代码"></el-table-column>
                            <el-table-column label="找到我" align="center">
                                <template slot-scope="scope">
                                    <lookMe :key="new Date().getTime()" :arr.sync="scope.row" :off="true" :tkShow='true' :showTxt='true' :refresh.sync="refresh"></lookMe>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" width="100" prop="company_name" label="满足人员">
                                <template slot-scope="scope">
                                    <div style="color:#3a8ee6;cursor:pointer;padding:8px 0" type="text" @click="openRyYj(scope.row,'ry')">11</div>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" width="100" prop="company_name" label="满足业绩">
                                <template slot-scope="scope">
                                    <div style="color:#3a8ee6;cursor:pointer;padding:8px 0" type="text" @click="openRyYj(scope.row,'yj')">22</div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="foot">
                            <el-pagination :page-size="row" :current-page="page" style="margin-top:20px" @current-change="zzPageSizeChange" align="right" background layout="total,prev, pager, next" :total="search_count"></el-pagination>
                            <p class="total">
                                共计找到符合条件的记录数：
                                <span style="color:#409eff">{{search_total}}</span>条,请输入更多信息进行查询
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div style="color:#999999;text-align:center" v-else>暂无数据</div>
        </div>
        <el-dialog title="选择资质" width="80%" :visible.sync="dialogVisible">
            <zz-search @onSearch="onSearch" v-if="dialogVisible"></zz-search>
        </el-dialog>
        <el-dialog title="满足的人员" width="70%" :visible.sync="ry.dialogVisible">
            <zz-fit-ry v-if="ry.dialogVisible"></zz-fit-ry>
            <el-form>
                <el-row>
                    <el-col :span="24" style="text-align:center">
                        <el-form-item size="middle">
                            <el-button type="" @click="ry.dialogVisible=false">关闭</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
        <el-dialog title="满足的业绩" width="70%" :visible.sync="yj.dialogVisible">
            <zz-fit-yj v-if="yj.dialogVisible"></zz-fit-yj>
            <el-form>
                <el-row>
                    <el-col :span="24" style="text-align:center">
                        <el-form-item size="middle">
                            <el-button type="" @click="yj.dialogVisible=false">关闭</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import zzSearch from './template/zzSearch'
import lookMe from './template/lookMe'
import zzFitRy from './template/zz-fit-ry'
import zzFitYj from './template/zz-fit-yj'

export default {
  components: {
    zzSearch,
    lookMe,
    zzFitRy,
    zzFitYj
  },
  data() {
    return {
      showTxt: true,
      value: null,
      refresh: false,
      page: 1,
      row: 20,
      selected_item: {}, // 选中的条数对象
      sc_areaArray: [], // 四川地区
      rc_areaArray: [], // 入川地区
      all_areaArray: [],
      dialogVisible: false,
      selected_area: {
        value_sc: '四川',
        value_rc: '入川',
        type: '全部'
      },
      tableData: [],
      loading: false,
      zz_total_array: [], // 左边资质统计结果
      sc_zz_total: 0,
      rc_zz_total: 0,
      search_total: 0,
      search_count: 0,
      all_total: 0,
      role: {},
      sortType: '默认排序', //默认排序/关系排序
      checked_area: {}, //选择的地区属地
      selectValAll: '',
      prov_cate: '',
      ry: {
        //满足的人员
        dialogVisible: false
      },
      yj: {
        //满足的业绩
        dialogVisible: true
      }
    }
  },
  created() {
    document.title = '资质搜索'
    this.checked_area = JSON.parse(localStorage.getItem('setzzSearchArea'))
    this.selected_area.value_sc = JSON.parse(
      localStorage.getItem('setzzSearchArea')
    ).prov
    this.selected_area.value_rc = JSON.parse(
      localStorage.getItem('setzzSearchArea')
    ).r_prov
    this.selectValAll = this.checked_area.full_prov
    // this.getArea('prov')
    // this.getArea('r_prov')
    this.onSearch()
    this.fn_role()
  },
  watch: {
    $route: function() {
      window.location.reload()
    },
    dialogVisible: function(val) {
      if (val === true) {
        // 当对话框打开时重置选择内容
        this.selected_item = {}
      }
    }
  },
  methods: {
    onChange_area() {
      console.log(this.selected_area)
      //选择全部地区
      let pass = this.all_areaArray.filter(v => {
        return v.full_prov == this.selectValAll
      })
      this.prov_cate = pass[0].prov + '_' + pass[0].r_prov + '_全部'
      this.checked_area = {
        prov: pass[0].prov,
        r_prov: pass[0].r_prov
      }
      this.selected_area = {
        type: '全部',
        value: '',
        value_sc: pass[0].prov,
        value_rc: pass[0].r_prov
      }
      this.selected_item = {}
      this.checked_area.id = pass[0].id
      this.checked_area.full_prov = this.selectValAll
      localStorage.setItem('setzzSearchArea', JSON.stringify(this.checked_area))
      this.onSearch('changeArea')
      // this.onGetList()
    },
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
    // 获取地区
    getArea(type) {
      // this.axios.post(
      //   "/firm/firm_search/getAreaType",
      //   { type: "企业地区" },
      //   backData => {
      //     this.sc_areaArray = backData[1].children;
      //     this.rc_areaArray = backData[2].children;
      //   }
      // );
      let params = {
        type,
        parent_id: this.checked_area.id
      }
      this.axios.post('/firm/Firm_Search_Nation/getProvCate', params, data => {
        if (type == 'all') {
          this.all_areaArray = data
        } else if (type == 'prov') {
          this.sc_areaArray = data
        } else {
          this.rc_areaArray = data
        }
      })
    },
    zzPageSizeChange(page) {
      this.page = page
      this.onGetList('page')
    },
    // 切换四川
    handleCommand(data) {
      this.selectValAll = this.checked_area.full_prov
      this.selected_area.type = this.checked_area.prov
      this.selected_area.value_sc = data
      this.selected_area.value = data
      this.onGetList()
    },
    // 切换入川
    handleCommand2(data) {
      this.selectValAll = this.checked_area.full_prov
      this.selected_area.type = this.checked_area.r_prov
      this.selected_area.value_rc = data
      this.selected_area.value = data
      this.onGetList()
    },
    // 打开弹框
    onOpentk() {
      this.dialogVisible = true
    },
    // 搜索
    onSearch(from) {
      this.refresh = !this.refresh
      if (from == 'changeArea') {
      } else {
        this.checked_area = JSON.parse(localStorage.getItem('setzzSearchArea'))
        this.selected_area.value_sc = JSON.parse(
          localStorage.getItem('setzzSearchArea')
        ).prov
        this.selected_area.value_rc = JSON.parse(
          localStorage.getItem('setzzSearchArea')
        ).r_prov
        this.selectValAll = this.checked_area.full_prov
      }

      let aptitude = localStorage.getItem('setzzSearchValue')
      if (!aptitude) {
        return
      }
      aptitude = JSON.parse(aptitude)
      this.dialogVisible = false
      this.axios.post(
        '/firm/Firm_Search_Nation/statsQuali',
        {
          aptitude,
          prov: this.checked_area.prov,
          r_prov: this.checked_area.r_prov.replace('部分', '')
        },
        backData => {
          this.zz_total_array = backData.rows || []
          this.sc_zz_total = backData.total.prov || 0
          this.sc_zz_total1 = backData.total.prov || 0
          this.rc_zz_total = backData.total.r_prov || 0
          this.rc_zz_total1 = backData.total.r_prov || 0
          this.all_total =
            (backData.total.prov || 0) + (backData.total.r_prov || 0)
        }
      )
      this.getArea('all')
      this.getArea('prov')
      this.getArea('r_prov')
      this.onGetList()
    },
    // 点击条数
    onSelectItem(item, type, allname) {
      this.selected_area.value = ''
      this.selectValAll = this.checked_area.full_prov
      this.selected_area.value_sc = this.checked_area.prov
      this.selected_area.value_rc = this.checked_area.r_prov
      this.sc_zz_total = item.prov
      this.rc_zz_total = item.r_prov
      item.dq = type // 追加一个四川或入川地区类型字段
      item.all_name = allname // 追加一个全名称字段
      this.selected_item = item
      this.selected_area.type = type
      this.onGetList()
    },
    // 搜索全部条数
    onClickAll() {
      this.selected_item = {}
      this.selected_area = {
        value_sc: this.checked_area.prov,
        value_rc: this.checked_area.r_prov,
        type: '全部'
      }
      this.onSearch()
    },
    // 改变排序方式
    changeSort() {
      // console.log(this.sortType);
      if (this.sortType == '默认排序') {
        this.order = 'score'
        this.onGetList()
      } else {
        this.order = 'weight'
        this.onGetList()
      }
    },
    // 获取列表
    onGetList(type) {
      if (type != 'page') {
        this.page = 1
      }
      this.loading = true
      let aptitude = JSON.parse(localStorage.getItem('setzzSearchValue'))
      let query = {
        aptitude,
        user_id: localStorage.getItem('user_id'),
        page: this.page,
        row: this.row,
        dict: this.selected_item.dict || '',
        // is_rc: this.selected_area.type,
        prov_cate: '',
        area:
          this.selected_area.value !== '不限制'
            ? this.selected_area.value || ''
            : '',
        order: this.order
      }

      if (this.selectValAll != this.checked_area.full_prov) {
        //选择属地
        query.prov_cate = this.prov_cate.replace('部分', '')
        query.area = ''
        this.selected_area.type = ''
        this.selected_area.value = ''
        this.selected_item = {}
      } else {
        if (this.selected_area.type != '全部') {
          query.prov_cate = this.selected_area.type.replace('部分', '')
        } else {
          query.prov_cate =
            this.checked_area.prov +
            '_' +
            this.checked_area.r_prov.replace('部分', '') +
            '_全部'
        }
      }

      this.axios.post(
        '/firm/Firm_Search_Nation/searchQuali',
        query,
        backData => {
          this.tableData = backData.rows || []
          this.loading = false
          if (this.selected_area.type == this.checked_area.r_prov) {
            this.rc_zz_total = backData.total || 0
          } else if (this.selected_area.type == this.checked_area.prov) {
            this.sc_zz_total = backData.total || 0
          }
          this.search_total = backData.total || 0
          this.search_count = backData.total > 400 ? 400 : backData.total || 0
        }
      )
    },
    // 满足的人员业绩
    openRyYj(row, type) {
      let that = this
      this[type].dialogVisible = true
    },
    // 跳转
    openGs(row) {
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
        // 获取跳转页面结果
        this.axios.post(
          '/index/mine/roleCompSource',
          { gs_id: row.id },
          res => {
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
    }
  }
}
</script>
<style>
.el-dropdown-menu::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8;
}
.el-dropdown-menu::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
.el-dropdown-menu::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  background-clip: padding-box;
  min-height: 28px;
}
.el-dropdown-menu::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
</style>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
}
.tittle {
  text-align: center;
  line-height: 70px;
  box-shadow: 0px 0px 5px #e0e0e0;
  font-size: 32px;
}
.content_div {
  max-width: 1200px;
  margin: 0 auto;
  //条件
  .top_tj {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 20px 0;
    > span {
      margin-right: 10px;
    }
  }
}
.search_result {
  display: flex;
  .text {
    margin-bottom: 10px;
    font-size: 14px;
    cursor: pointer;
  }
  .left {
    margin-right: 10px;
    color: #606266;
    .every_tj {
      margin-bottom: 10px;
      line-height: 1;
      font-size: 14px;
      padding: 8px 0;
      border: 1px solid #ebeef5;
      .every_name {
        text-align: center;
      }
      .every_th {
        display: flex;
        margin-top: 20px;
        > div:first-child {
          width: 120px;
          text-align: center;
        }
        > div {
          width: 60px;
          text-align: center;
        }
      }
      .every_tr {
        display: flex;
        align-items: center;
        margin-top: 20px;
        .tr_name {
          width: 120px;
          text-align: center;
        }
        .every_td {
          display: flex;
          align-items: center;
          > div {
            width: 60px;
            text-align: center;
          }
        }
        .every_td:first-child {
          margin-top: 0;
        }
        .every_td {
          margin-top: 20px;
          > div {
            padding: 4px 0;
          }
        }
      }
    }
  }
  .color_num {
    color: #049eff;
    cursor: pointer;
  }
  .selected_num {
    color: #ffffff;
    background-color: #049eff;
  }
  .right {
    width: 100%;
    .filter {
      //   width: 888px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .text {
        margin: 0;
      }
    }
    .list_table {
      .list_title {
        line-height: 42px;
        padding-left: 10px;
        border: 1px solid #ebeef5;
        border-bottom: none;
        color: #999999;
      }
    }
  }
}
.selected_css {
  color: #049eff;
}
.nosel_css {
  color: #606266;
}
.foot {
  position: relative;
  .total {
    position: absolute;
    top: 5px;
    color: gray;
    font-size: 14px;
  }
}
</style>
