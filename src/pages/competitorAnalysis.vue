<!--筑标成都对手分析-->
<template>
  <div>
    <p style="margin: 20px 0px 10px;text-align: center;font-size: 34px;">{{xm_info.xmmc}}</p>
    <!-- <carousel-card height="650px"> -->
    <!-- 全部公司 -->
    <!-- <carousel-item style="margin:50px auto;width:90%；height:600px"> -->
    <div class="diplay-flex-column" style="margin:0px auto;width:90%">
      <p class="table-title" style="color:red">全部公司集合</p>
      <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
        <el-form-item style="width:180px">
          <el-input
            clearable
            placeholder="公司名称"
            v-model="allGsData.formData.gsmc"
            @keydown.enter.native="onSearch('ajaxAllGsList','allGsData')"
          ></el-input>
        </el-form-item>
        <el-form-item style="width:110px">
          <el-select
            placeholder="不限制"
            v-model="allGsData.formData.areaTypeVal"
            @change="onSearch('ajaxAllGsList','allGsData')"
          >
            <el-option label="不限制" value="0"></el-option>
            <el-option label="川内企业" value="1"></el-option>
            <el-option label="入川企业" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch('ajaxAllGsList','allGsData')">查询</el-button>
          <el-button @click="onResetForm('ajaxAllGsList','allGsData')">重置</el-button>
        </el-form-item>
        <el-form-item style="width:100px" v-if="myPage==1">
          <el-select placeholder="选择" v-model="allGsData.formData.ryVal">
            <el-option label value></el-option>
            <el-option
              v-for="item in allUsers['分配']"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onDistribute('allGsData','ajaxAllGsList')">
            分配
            <i class="el-icon-caret-right el-icon--right"></i>
          </el-button>
        </el-form-item>
      </el-form>
      <div style="flex:1">
        <el-table
          width="100%"
          height="550px"
          border
          :data="allGsData.tableList"
          v-loading="allGsData.loading"
          :row-style="tableRowClassName"
          @select-all="onSelect_allGsRows"
          @select="onSelect_allGsRows"
        >
          <el-table-column type="selection" :selectable="disabledCheck" width="50px" align="center"></el-table-column>
          <el-table-column type="index" width="60px" label="序号" align="center">
            <template slot-scope="scope">{{scope.$index+(allGsData.page-1)*allGsData.row+1}}</template>
          </el-table-column>

          <el-table-column prop="gsmc" label="公司名称" align="center">
            <template slot-scope="scope">
              <span class="link_text" @click="openGs(scope.row)">{{scope.row.gsmc}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        style="margin-top:20px"
        :current-page.sync="allGsData.page"
        @current-change="allGsDataChangePage"
        @size-change="allGsDataChangeSize"
        align="right"
        background
        layout="sizes,total,prev, pager, next"
        :total="allGsData.total"
      ></el-pagination>
    </div>
    <!-- </carousel-item> -->
    <!-- 资质公司 -->
    <!-- <carousel-item>
        <div class="diplay-flex-column">
          <p class="table-title" style="color:red">资质公司集合</p>
          <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
            <el-form-item style="width:180px">
              <el-input clearable placeholder="公司名称" v-model="zzGsData.formData.gsmc" @keydown.enter.native="onSearch('ajaxZzGsList','zzGsData')"></el-input>
            </el-form-item>
            <el-form-item style="width:110px">
              <el-select placeholder="不限制" v-model="zzGsData.formData.areaTypeVal" @change="onSearch('ajaxZzGsList','zzGsData')">
                <el-option label="不限制" value="0"></el-option>
                <el-option label="川内企业" value="1"></el-option>
                <el-option label="入川企业" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch('ajaxZzGsList','zzGsData')">
                查询
              </el-button>
              <el-button @click="onResetForm('ajaxZzGsList','zzGsData')">
                重置
              </el-button>
            </el-form-item>
            <el-form-item style="width:100px">
              <el-select placeholder="选择" v-model="zzGsData.formData.ryVal">
                <el-option label value></el-option>
                <el-option v-for="item in allUsers['分配']" :key="item.id" :label="item.username" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onDistribute('zzGsData','ajaxZzGsList')">
                分配
                <i class="el-icon-caret-right el-icon--right"></i>
              </el-button>
            </el-form-item>
          </el-form>
          <div style="flex:1">
            <el-table width="100%" height="520px" border :data="zzGsData.tableList" v-loading="zzGsData.loading" :row-style="tableRowClassName" @select-all="onSelect_zzGsRows" @select="onSelect_zzGsRows">
              <el-table-column type="selection" :selectable="disabledCheck" width="50px" align="center"></el-table-column>
              <el-table-column type="index" width="60px" label="序号" align="center">
                <template slot-scope="scope">{{scope.$index+(zzGsData.page-1)*zzGsData.row+1}}</template>
              </el-table-column>

              <el-table-column prop="gsmc" label="公司名称" align="center">
                <template slot-scope="scope">
                  <div class="link_text" @click="openGs(scope.row)">{{scope.row.gsmc}}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination style="margin-top:20px" :current-page.sync="zzGsData.page" @current-change="zzGsDataChangePage" @size-change="zzGsDataChangeSize" align="right" background layout="sizes,total,prev, pager, next" :total="zzGsData.total"></el-pagination>
        </div>
      </carousel-item>
    </carousel-card>-->
    <!-- 已分配的公司 -->
    <div style="margin:50px auto;width:90%">
      <div class="diplay-flex-column">
        <p class="table-title" style="color:#2f80d1">已分配公司集合</p>
        <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
          <el-form-item style="width:180px">
            <el-input
              clearable
              placeholder="公司名称"
              v-model="readyGsData.formData.gsmc"
              @keydown.enter.native="onSearch('ajaxReadyGsList','readyGsData')"
            ></el-input>
          </el-form-item>
          <el-form-item style="width:110px">
            <el-select
              placeholder="不限制"
              v-model="readyGsData.formData.areaTypeVal"
              @change="onSearch('ajaxReadyGsList','readyGsData')"
            >
              <el-option label="不限制" value="0"></el-option>
              <el-option label="川内企业" value="1"></el-option>
              <el-option label="入川企业" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch('ajaxReadyGsList','readyGsData')">查询</el-button>
            <el-button @click="onResetForm('ajaxReadyGsList','readyGsData')">重置</el-button>
          </el-form-item>
        </el-form>
        <div style="flex:1">
          <el-table
            height="590px"
            border
            :data="readyGsData.tableList"
            v-loading="readyGsData.loading"
          >
            <!-- <el-table-column type="selection" width="50px" align="center"></el-table-column> -->
            <el-table-column type="index" width="60px" label="序号" align="center">
              <template slot-scope="scope">{{scope.$index+(readyGsData.page-1)*readyGsData.row+1}}</template>
            </el-table-column>
            <el-table-column prop="gsmc" label="公司名称" align="center">
              <template slot-scope="scope">
                <span class="link_text" @click="openGs(scope.row)">{{scope.row.gsmc}}</span>
                <!-- <div style="padding-left:2px">
                    <i v-if="scope.row.take_sign==1 || scope.row.take_sign==2" style="color:#54e20d" class="el-icon-check"></i>
                    <i v-if="scope.row.take_sign==2" style="color:#54e20d" class="el-icon-check"></i>
                </div>-->
              </template>
            </el-table-column>
            <!-- 字段名 -->
            <el-table-column
              v-if="myPage==1"
              prop="audit_user"
              label="人员"
              width="200px"
              align="center"
            >
              <!-- <template slot-scope="scope">

              </template>-->
            </el-table-column>
            <el-table-column label="操作" width="200px" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="onDeleteGs('one','ajaxYesGetedGsList',scope.row.gs_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          style="margin-top:20px"
          :current-page.sync="readyGsData.page"
          @current-change="readyGsChangePage"
          @size-change="readyGsChangeSize"
          align="right"
          background
          layout="sizes,total,prev, pager, next"
          :total="readyGsData.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 这是啥 -->
    <div v-if="zb_tb_count.dialogVisible">
      <el-dialog title="项目" :visible.sync="zb_tb_count.dialogVisible" width="70%" top="20px">
        <bid-xm :xm="zb_tb_count.data"></bid-xm>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import carouselCard from './sonPage/carouselCard.vue'
import carouselItem from './sonPage/carouselItem.vue'
import changeRy from './template/changeRy.vue'
import bidXm from './template/bidXm.vue'
import leaveWord from './template/leaveWord.vue'

export default {
  components: {
    carouselCard,
    carouselItem,
    changeRy,
    bidXm,
    leaveWord
  },
  data () {
    return {
      xm_info: {
        xmmc: ''
      },
      user_cate: '分配',
      myPage: this.$route.query.page,
      // 全部公司数据
      allGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0',
          ryVal: ''
        },
        selectRows: [],
        tableList: [],
        loading: false,
        page: 1,
        total: 0,
        row: 10
      },
      // 资质公司数据
      zzGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0',
          ryVal: ''
        },
        selectRows: [],
        tableList: [],
        loading: false,
        page: 1,
        total: 0,
        row: 10
      },
      // 已分配的公司集合
      readyGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0',
          ryVal: '',
          planVal: ''
        },
        selectRows: [],
        tableList: [],
        loading: false,
        page: 1,
        total: 0,
        row: 10
      },
      // 用户数据
      allUsers: {},

      // 方案列表
      planList: [],
      jbxx_id: this.$route.query.jbxx_id,
      id: '',
      last_treeId: '',
      human_id: '',
      node: {
        ry_node: '',
        yj_node: '',
        zz_node: ''
      },

      zb_tb_count: {
        dialogVisible: false,
        data: {
          thread_id: '',
          jbxx_id: ''
        }
      },
      role: {}
    }
  },

  created () {
    this.fn_role()
    this.ajaxAllGsList()
    this.ajaxZzGsList()
    this.ajaxReadyGsList()
    this.ajaxGetUser()
    this.ajaxXmInfo()
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
    // 全部公司集合
    ajaxAllGsList () {
      this.allGsData.loading = true
      let params = {
        user_cate: this.user_cate,
        jbxx_id: this.jbxx_id,
        gsmc: this.allGsData.formData.gsmc,
        scale: this.allGsData.formData.areaTypeVal,
        rows: this.allGsData.row,
        page: this.allGsData.page,
        known: this.myPage == 0 ? 'maohu' : 'laipi'
      }

      this.axios.post(
        '/index/element_set/getAllCompany',
        params,
        data => {
          this.allGsData.loading = false
          this.allGsData.tableList = data.rows || []
          this.allGsData.total =
            data.total > 400 ? 400 : data.total || 0
          this.allGsData.selectRows = []
        }
      )
    },
    // 资质公司集合
    ajaxZzGsList () {
      this.zzGsData.loading = true
      this.axios.post(
        '/firm/Firm_search/searchQuali',
        {
          gsmc: this.zzGsData.formData.gsmc,
          scale: this.zzGsData.formData.areaTypeVal,
          rows: this.zzGsData.row,
          page: this.zzGsData.page
        },
        data => {
          this.zzGsData.loading = false
          this.zzGsData.tableList = data.rows || []
          this.zzGsData.total = data.total || 0
          this.zzGsData.selectRows = []
        }
      )
    },
    // 已分配公司集合
    ajaxReadyGsList (ordername = '', order = 'desc') {
      this.readyGsData.loading = true
      this.axios.post(
        '/index/element_set/getAllotedCompany',
        {
          user_cate: '分配',
          valid: 1,
          jbxx_id: this.jbxx_id,
          gsmc: this.readyGsData.formData.gsmc,
          scale: this.readyGsData.formData.areaTypeVal,
          rows: this.readyGsData.row,
          page: this.readyGsData.page
        },
        data => {
          if (
            this.readyGsData.page > 1 &&
            data.rows.length == 0 &&
            data.status == 'success'
          ) {
            this.readyGsData.page -= 1
            this.ajaxReadyGsList()
            return
          }
          this.readyGsData.loading = false
          this.readyGsData.tableList = data.rows || []
          this.readyGsData.total = data.total || 0
          this.readyGsData.selectRows = []
        }
      )
    },
    // 获取人员列表
    ajaxGetUser () {
      this.axios.post(
        '/index/project/getUsers',
        {
          company_id: localStorage.getItem('company_id') //, 2的人员没有，可用1试，待改
        },
        data => {
          this.allUsers = data.rows
        }
      )
    },
    // 获取项目基本信息
    ajaxXmInfo () {
      this.axios.post(
        '/Index/project/edit',
        {
          jbxx_id: this.jbxx_id
        },
        data => {
          this.xm_info = data.res
          document.title = '对手分析-' + data.res.xmmc
        }
      )
    },
    // 搜索
    onSearch (ajaxObj, dataObj) {
      this[dataObj].page = 1
      this[dataObj].total = 0
      this[ajaxObj]()
    },
    // 同意重置事件
    onResetForm (ajaxObj, dataObj) {
      this[dataObj].formData.gsmc = ''
      this[dataObj].formData.areaTypeVal = '0'
      this[dataObj].page = 1
      this[dataObj].total = 0
      this[ajaxObj]()
    },
    // 派发人员
    onDistribute (dataObj, ajaxObj) {
      let gs_id = this[dataObj].selectRows.map(v => v.gs_id)
      if (gs_id.length == 0) {
        this.$message.error('请选择公司')
        return
      }
      if (this.myPage == 1) {
        let username = ''
        if (this[dataObj].formData.ryVal) {
          username = this.allUsers['分配'].filter(
            v => v.id == this[dataObj].formData.ryVal
          )[0].username
        }
        if (username == '') {
          this.$message.error('请选择人员')
          return
        }
        this.axios.post(
          '/index/element_set/addCompanyToProject',
          {
            company_id: localStorage.getItem('company_id'), // ，待改，先用1
            jbxx_id: this.jbxx_id,
            gs_ids: gs_id.join(','),
            user_id: this[dataObj].formData.ryVal || '',
            username: username || ''
          },
          data => {
            this[ajaxObj]()
            this.ajaxAllGsList()
            this.ajaxZzGsList()
            this.ajaxReadyGsList()
          }
        )
      } else {
        this.axios.post(
          '/index/element_set/addCompanyToProject',
          {
            company_id: localStorage.getItem('company_id'), // ，待改，先用1
            jbxx_id: this.jbxx_id,
            gs_ids: gs_id.join(','),
            user_id: this[dataObj].formData.ryVal || '',
            username: ''
          },
          data => {
            this[ajaxObj]()
            this.ajaxAllGsList()
            this.ajaxZzGsList()
            this.ajaxReadyGsList()
          }
        )
      }
      // let username = "";
      // if (this[dataObj].formData.ryVal) {
      //   username = this.allUsers["分配"].filter(
      //     v => v.id == this[dataObj].formData.ryVal
      //   )[0].username;
      // }
      // this.axios.post(
      //   "/index/element_set/addCompanyToProject",
      //   {
      //     company_id: localStorage.getItem("company_id"), //，待改，先用1
      //     jbxx_id: this.jbxx_id,
      //     gs_ids: gs_id.join(","),
      //     user_id: this[dataObj].formData.ryVal || "",
      //     username: username || ""
      //   },
      //   data => {
      //     this[ajaxObj]();
      //     this.ajaxReadyGsList();
      //   }
      // );
    },
    // 下部分列表分配公司
    onDistribute_button (
      type,
      ajaxObj,
      user_id,
      gs_id,
      ry_type,
      username = ''
    ) {
      if (type == 'all') {
        gs_id = gs_id.map(v => v.gs_id)
        if (gs_id.length == 0) {
          this.$message.error('请选择公司')
          return
        }
        gs_id = gs_id.join(',')
        if (user_id) {
          username = this.allUsers['分配'].filter(
            v => v.id == user_id
          )[0].username
        }
      }
      let queryObj = {
        company_id: localStorage.getItem('company_id'),
        jbxx_id: this.jbxx_id,
        gs_id: gs_id,
        type: 2,
        username
      }
      queryObj[ry_type] = user_id
      this.axios.post(
        '/index/element_set/editCompanyToProject',
        queryObj,
        data => {
          this[ajaxObj]()
          this.ajaxGetedRyList()
        }
      )
    },
    // 删除分配公司
    onDeleteGs (type, ajaxObj, gs_idOrDataObj) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (type == 'all') {
            gs_idOrDataObj = this[gs_idOrDataObj].selectRows.map(
              v => v.gs_id
            )
            if (gs_idOrDataObj.length == 0) {
              this.$message.error('请选择公司')
              return
            }
            gs_idOrDataObj = gs_idOrDataObj.join(',')
          }
          this.axios.post(
            '/index/element_set/editCompanyToProject',
            {
              company_id: localStorage.getItem('company_id'),
              gs_id: gs_idOrDataObj,
              type: 1,
              jbxx_id: this.jbxx_id,
              diff: '分配'
            },
            data => {
              if (data.status == 'success') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                // this[ajaxObj]();
                this.ajaxAllGsList()
                this.ajaxZzGsList()
                this.ajaxReadyGsList()
              }
            }
          )
        })
        .catch(() => { })
    },
    // 跳转到公司详情
    openGs (row) {
      if (this.role.company_role !== 'C') {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${
            row.gsmc
          }`
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
    // 列表被选颜色
    tableRowClassName ({ row, rowIndex }) {
      if (row.exit == 1) {
        return { backgroundColor: '#e5e5e5' }
      }
    },
    // 是否可选择列表多选框
    disabledCheck (row, index) {
      if (row.exit == 1) {
        return false
      } else {
        return true
      }
    },
    // 选中列表多选框
    onSelect_zzGsRows (rows) {
      this.yesGsData.selectRows = rows
    },
    onSelect_allGsRows (rows) {
      this.allGsData.selectRows = rows
    },
    onSelect_readyGsRows (rows) {
      this.readyGsData.selectRows = rows
    },

    // 跳转页数
    zzGsDataChangePage (val) {
      this.zzGsData.page = val
      this.ajaxZzGsList()
    },
    zzGsDataChangeSize (val) {
      this.zzGsData.row = val
      this.zzGsData.page = 1
      this.zzGsData.total = 0
      this.ajaxZzGsList()
    },
    allGsDataChangePage (val) {
      this.allGsData.page = val
      this.ajaxAllGsList()
    },
    allGsDataChangeSize (val) {
      this.allGsData.row = val
      this.allGsData.page = 1
      this.allGsData.total = 0
      this.ajaxAllGsList()
    },
    readyGsChangePage (val) {
      this.readyGsData.page = val
      this.ajaxReadyGsList()
    },
    readyGsChangeSize (val) {
      this.readyGsData.row = val
      this.readyGsData.page = 1
      this.readyGsData.total = 0
      this.ajaxReadyGsList()
    }
    // getedRyChangePage(val) {
    //   this.getedRyData.page = val;
    //   this.ajaxGetedRyList();
    // },
    // getedRyChangeSize(val) {
    //   this.getedRyData.row = val;
    //   this.getedRyData.page = 1;
    //   this.getedRyData.total = 0;
    //   this.ajaxGetedRyList();
    // },
  }
}
</script>

<style lang="less" scoped>
.table-title {
  margin: 20px auto;
  text-align: center;
  font-size: 28px;
}
.ys-ws-divs {
  height: 100%;
  display: flex;
  > div {
    flex: 1;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
  }
}
.tag-text {
  display: flex;
  align-items: center;
  > p {
    flex: 1;
    padding: 0 6px;
  }
}
.diplay-flex-column {
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>
