<template>
  <div>
    <div class="title">企业信息</div>
    <div class="content">
      <div class="search-wrapper">
        <span>资质加人员</span>
        <el-button class="button-sel" type="primary" @click="handleSelectType">请选择资质加人员</el-button>
      </div>
      <div class="main-content">
        <!-- 页面左侧布局 -->
        <div class="main-left">
          <p class="result">
            为你找到全部相关结果
            <span class="total">{{total}}</span>条
          </p>
          <div class="conditions">
            <div class="cond-content">
              <div class="name">资质</div>
              <ul class="list">
                <li class="item" v-for="(item, index) in zzSelList" :key="index">
                  {{index + 1}}.{{item.label}}
                  <i
                    class="el-icon-close delete"
                    @click="handleDelZzItem(item, index)"
                  ></i>
                </li>
              </ul>
            </div>
            <div class="line"></div>
            <div class="cond-content">
              <div class="name">人员</div>
              <ul class="list">
                <li class="item" v-for="(item, index) in rySelList" :key="index">
                  {{index + 1}}.{{item.label}}
                  <i
                    class="el-icon-close delete"
                    @click="handleDelRyItem(item, index)"
                  ></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 页面右侧布局 -->
        <div class="main-right">
          <div class="search-top">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="是否入川">
                <el-select v-model="rcVal" placeholder="是否入川" @change="handleChangeRcVal">
                  <el-option
                    v-for="item in rcList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属地区">
                <el-select v-model="areaVal" placeholder="活动区域" @change="handleChangeAreaVal">
                  <el-option
                    v-for="item in areaList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="table">
            <el-table :data="tableData" border style="width: 100%" v-loading="loading">
              <el-table-column align="center" type="index" label="序号" width="60">
                <template slot-scope="scope">
                  <span>{{(page - 1) * pageSize + scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="date" label="公司名称">
                <template slot-scope="scope">
                  <!-- <el-button type="text" size="small" @click="handleClickCompanyName(scope.row)">
                                        {{scope.row.company_name}}
                  </el-button>-->
                  <span
                    style="color:#409eff;cursor:pointer;"
                    @click="handleClickCompanyName(scope.row)"
                  >{{scope.row.company_name}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="zzmc" label="资质"></el-table-column>
              <el-table-column align="center" prop="legal_person" label="法人代表" width="100"></el-table-column>
              <el-table-column align="center" prop="address" label="证件" width="80">
                <template slot-scope="scope">
                  <el-button
                    :disabled="!scope.row.zs_dict"
                    type="text"
                    size="middle"
                    @click="handleGetDocDetail(scope.row)"
                  >查看</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="area" label="所属地区" width="100"></el-table-column>
              <el-table-column align="center" prop="social_code" label="统一社会信用代码"></el-table-column>
            </el-table>
            <el-row type="flex" justify="space-between" class="bottom">
              <div class="des">
                共计找到符合条件的记录数：
                <span>{{total}}</span> 条,请输入更多信息进行查询
              </div>
              <el-pagination
                :current-page="page"
                :page-size="pageSize"
                @current-change="handleChangePage"
                background
                layout="total, prev, pager, next"
                :total="total"
              ></el-pagination>
            </el-row>
          </div>
        </div>
        <!-- 清除浮动 -->
        <div class="clearfix"></div>
      </div>
    </div>
    <!-- 资质人员选择弹窗 -->
    <div v-if="isShow">
      <el-dialog title="资质加人员" :visible.sync="isShow" width="900px">
        <zz-ry-select
          :type="2"
          :zzSel="zzSelList"
          :rySel="rySelList"
          @sendChildData="handleGetChildComponentData"
        />
      </el-dialog>
    </div>
    <!-- 点击表格行中查看按钮弹出窗 -->
    <div v-if="isShow1">
      <el-dialog title="人员证件" :visible.sync="isShow1" width="80%">
        <zz-ry-zj :gsId="curGsId" :dict="curStaff" :zsmc="curStaffName" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import zzRySelect from './template/zzRySelect1'
import zzRyZj from './template/zzRyZj'
export default {
  components: {
    zzRySelect,
    zzRyZj
  },
  data () {
    return {
      areaTypeList: [], // 返回的数据
      rcList: [
        // 是否入川下拉列表
        { label: '不限制', value: '0' },
        { label: '四川省', value: '1' },
        { label: '入川企业', value: '2' }
      ],
      rcVal: '0', // 是否入川选中值
      areaList: [
        // 所属地区下拉列表
        { label: '不限制', value: '不限制' }
      ],
      areaVal: '不限制', // 所属地区选中值
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 20,
      loading: false,
      isShow: false, // 资质人员选择弹窗
      zzSelList: [], // 资质选择条件
      rySelList: [], // 人员选择条件
      role: {}, // 角色权限字段
      isShow1: false, // 人员证件弹窗
      curGsId: '',
      curStaff: '',
      curStaffName: ''
    }
  },
  created () {
    document.title = '资质加人员搜索'
    // 从缓存取值 赋初始值
    let zzRyData = localStorage.getItem('zzRyData') ? JSON.parse(localStorage.getItem('zzRyData')) : ''
    localStorage.removeItem('zzRyData')
    if (zzRyData) {
      this.zzSelList = zzRyData.zzSelList
      this.rySelList = zzRyData.rySelList
    }
    // 请求公司列表
    this.handleSearchQualiStaff()
    // 权限控制
    this.fn_role()
    // 搜索公司的资质和证件——是否入川、所属地区
    this.handleGetAreaType()
  },
  watch: {
    $route: function (newVal) {
      window.location.reload()
    }
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
    // 搜索公司的资质和证件——是否入川、所属地区
    handleGetAreaType () {
      this.axios.post(
        '/firm/firm_search/getAreaType',
        {
          type: '企业地区'
        },
        data => {
          this.areaTypeList = data
        }
      )
    },
    // 点击选择资质类别 显示或隐藏弹窗
    handleSelectType () {
      this.isShow = true
    },
    // 子组件弹窗页面 点击搜索按钮时 调用该方法获取子页面数据
    handleGetChildComponentData (data) {
      if (data.zzSelList.length > 0 || data.rySelList.length > 0) {
        this.isShow = false
      }
      this.zzSelList = data.zzSelList
      this.rySelList = data.rySelList
      this.page = 1
      this.handleSearchQualiStaff()
    },
    // 点击资质条件每列的 x号，删除当前选中条件
    handleDelZzItem (item, index) {
      this.page = 1
      let zzSelList = this.zzSelList
      zzSelList.splice(index, 1)
      this.zzSelList = zzSelList
      this.handleSearchQualiStaff()
    },
    // 点击人员条件每列的 x号，删除当前选中条件
    handleDelRyItem (item, index) {
      this.page = 1
      let rySelList = this.rySelList
      rySelList.splice(index, 1)
      this.rySelList = rySelList
      this.handleSearchQualiStaff()
    },
    // 通过资质人员搜索公司列表
    handleSearchQualiStaff () {
      this.loading = true
      let quali = [] // 资质 value
      let quali_name = [] // 资质 name
      let staff = [] // 证件 value
      let staff_name = []
      this.zzSelList.map((item, index) => {
        quali.push(item.value)
        quali_name.push(item.label.split('/')[0])
      })
      this.rySelList.map((item, index) => {
        staff.push(item.value)
        staff_name.push(item.label.split('/')[0])
      })
      this.axios.post(
        '/firm/firm_search/searchQualiStaff',
        {
          quali: quali.join(','),
          quali_name: quali_name.join(','),
          staff: staff.join(','),
          staff_name: staff_name.join(','),
          is_rc: this.rcVal,
          area: this.areaVal,
          page: this.page,
          rows: this.pageSize
        },
        data => {
          if (data.status === 'success') {
            this.tableData = data.rows
            this.total = data.total
          } else {
            this.tableData = []
            this.total = 0
          }
          this.loading = false
        }
      )
    },
    // 点击分页
    handleChangePage (val) {
      this.page = val
      this.handleSearchQualiStaff()
    },
    // 改变是否入川字段
    handleChangeRcVal (val) {
      // 所属地区设置为默认值
      this.areaVal = '不限制'
      this.page = 1
      if (this.rcVal === '0') {
        // 不限制
        this.areaList = [{ label: '不限制', value: '不限制' }]
      } else if (this.rcVal === '1') {
        // 四川
        this.areaTypeList.map((item, index) => {
          if (item.label === '四川省') {
            this.areaList = item.children
          }
        })
        console.log(this.areaList, 'area')
      } else {
        // 入川
        this.areaTypeList.map((item, index) => {
          if (item.label === '入川企业') {
            this.areaList = item.children
          }
        })
      }
      this.handleSearchQualiStaff()
    },
    // 改变所属地区字段
    handleChangeAreaVal (val) {
      this.page = 1
      this.handleSearchQualiStaff()
    },
    // 点击列表 公司名称
    handleClickCompanyName (row) {
      if (this.role.company_role !== 'C') {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.id}&gsmc=${row.company_name}`
        })
        window.open(href, '公司详情' + row.id)
      } else {
        this.axios.post('/index/mine/roleCompSource', { gs_id: row.id }, res => {
          // 获取跳转页面结果
          //   console.log(res)
          if (res === '四川省建设厅') {
            let { href } = this.$router.resolve({
              path: `/gs_scjst?gs_id=${row.id}`
            })
            window.open(href, '/gs_scjst' + row.id)
          } else {
            let { href } = this.$router.resolve({
              path: `/gs_building?gs_id=${row.id}`
            })
            window.open(href, '/gs_building' + row.id)
          }
        })
      }
    },
    // 搜索公司的资质和证件—点击证件查看—证件列表
    handleGetDocDetail (row) {
      this.isShow1 = true
      this.curGsId = row.id
      this.curStaff = row.zs_dict
      this.curStaffName = row.zsmc
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  line-height: 70px;
  box-shadow: 0px 0px 5px #e0e0e0;
  font-size: 32px;
}
.content {
  width: 1200px;
  padding: 20px 0;
  box-sizing: border-box;
  margin: 0 auto;
  font-size: 14px;
  .search-wrapper {
    width: 100%;
    // border: 1px solid #409eff;
    border-bottom: 1px dashed #409eff;
    line-height: 70px;
    padding: 0 10px;
    box-sizing: border-box;
    .button-sel {
      // height: 30px;
      // width: 200px;
      margin-left: 10px;
    }
  }
  .main-content {
    width: 100%;

    box-sizing: border-box;
    .main-left {
      width: 300px;
      float: left;
      .result {
        width: 100%;

        height: 82px;
        line-height: 82px;
        .total {
          color: #409eff;
        }
      }
      .conditions {
        width: 100%;
        border: 1px solid #d5d5d5;
        border-radius: 4px;
        box-sizing: border-box;
        .line {
          width: 280px;
          margin: 0 auto;
          // padding: 0 10px;
          height: 1px;
          background-color: #d5d5d5;
          box-sizing: border-box;
        }
        .cond-content {
          width: 100%;
          height: 250px;
          // overflow: auto;

          .name {
            font-size: 16px;
            width: 100%;
            text-align: center;
            height: 30px;
            line-height: 30px;
          }
          .list {
            width: 100%;
            height: 220px;
            overflow: auto;
            list-style: none;
            padding: 0 20px;
            box-sizing: border-box;
            .item {
              width: 100%;
              // line-height: 1.4;
              line-height: 24px;
              .delete {
                padding-left: 10px;
                color: red;
              }
            }
          }
        }
      }
    }
    .main-right {
      width: calc(100% - 310px);
      float: right;
      padding-top: 22px;
      .search-top {
        width: 100%;
        height: 60px;
        // line-height: 60px;
      }
      .table {
        width: 100%;
        .bottom {
          .des {
            margin-top: 20px;
            height: 28px;
            line-height: 28px;
            span {
              color: #409eff;
            }
          }
        }
      }
    }
  }
}
</style>
