<!--筑标成都项目操作分配标书-->
<template>
  <div>
    <p style="line-height:90px;text-align:center;font-size:34px">{{xmmc}}</p>
    <div style="width:1250px;margin:0 auto;height:720px;">
      <leave-word :needData="leaveNeedData" @onChangeData="onChangeData"></leave-word>
    </div>
    <carousel-card height="800px">
      <carousel-item>
        <div style="height:800px;">
          <p class="title_car">已拿到公司集合</p>
          <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
            <el-form-item style="width:180px">
              <el-input
                clearable
                placeholder="公司名称"
                v-model="yesGetedGsData.formData.gsmc"
                @keydown.enter.native="ajaxYesGetedGsList"
              ></el-input>
            </el-form-item>
            <el-form-item style="width:110px">
              <el-select
                placeholder="不限制"
                v-model="yesGetedGsData.formData.areaTypeVal"
                @change="onChangeArea('ajaxYesGetedGsList')"
              >
                <el-option label="不限制" value="0"></el-option>
                <el-option label="川内企业" value="1"></el-option>
                <el-option label="入川企业" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="ajaxYesGetedGsList">查询</el-button>
              <el-button @click="onResetForm('ajaxYesGetedGsList','yesGetedGsData')">重置</el-button>
            </el-form-item>
            <el-form-item style="width:100px">
              <el-select placeholder="选择" v-model="yesGetedGsData.formData.ryVal">
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
              <el-button
                @click="onDistribute_button('all','ajaxYesGetedGsList',yesGetedGsData.formData.ryVal,yesGetedGsData.selectRows,'audit_user_id')"
              >
                拿公司
                <i class="el-icon-caret-right el-icon--right"></i>
              </el-button>
              <el-button @click="onDeleteGs('all','ajaxYesGetedGsList','yesGetedGsData')">批量删除</el-button>
            </el-form-item>
            <el-form-item>
              <el-select
                style="width:150px"
                filterable
                placeholder="方案"
                v-model="yesGetedGsData.formData.planVal"
              >
                <el-option label value></el-option>
                <el-option
                  v-for="item in planList"
                  :key="item.id"
                  :label="item.node_name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-button
                @click="onExecutePlan('yesGetedGsData','ajaxYesGetedGsList',yesGetedGsData.formData.planVal)"
              >执行方案</el-button>
              <el-button
                @click="onIsDisplay('yes','ajaxYesGetedGsList',yesGetedGsData.selectRows)"
              >开通展示</el-button>
              <el-button
                @click="onIsDisplay('no','ajaxYesGetedGsList',yesGetedGsData.selectRows)"
              >取消开通</el-button>
            </el-form-item>
          </el-form>
          <el-table
            border
            :data="yesGetedGsData.tableList"
            v-loading="yesGetedGsData.loading"
            @select-all="onSelect_yesGetedGsRows"
            @select="onSelect_yesGetedGsRows"
          >
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column width="50px" label="序号" align="center">
              <template slot-scope="scope">{{scope.$index+(yesGetedGsData.page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="gsmc" label="公司名称" align="center">
              <template slot-scope="scope">
                <div style="display:flex">
                  <div class="link_text" @click="openGs(scope.row)">{{scope.row.gsmc}}</div>
                  <div style="padding-left:2px">
                    <span
                      style="cursor:pointer;color:#2ecc40"
                      @click="leaveCompany(scope.row)"
                    >({{scope.row.count_words}}条)</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="audit_user" width="100px" label="已分配人员" align="center">
              <template slot-scope="scope">
                <change-ry
                  :ry_list="allUsers"
                  :extraObj="{type:'分配',ajaxFn:'ajaxNoGetedGsList',dataObj:'noGetedGsData',ry_type:'audit_user_id'}"
                  :row="scope.row"
                  :ry="scope.row.audit_user"
                  @onSelect="onListInSelect"
                ></change-ry>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="已选方案" align="center"></el-table-column>
            <el-table-column prop="sign" label="条件满足概况" align="center">
              <template slot-scope="scope">
                <div @click="onCheckResult(scope.row)">
                  <el-button
                    :style="{'color':item.status?'#5daf34':'red'}"
                    type="text"
                    size="medium"
                    v-for="item in scope.row.sign"
                    :key="item.c_phase"
                  >{{item.name}}{{item.count?'('+item.count+'个)':''}}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="display" width="150px" label="是否已开通展示" align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.display == 1"
                  size="mini"
                  type="success"
                  icon="el-icon-check"
                  circle
                  @click="onIsDisplay('no','ajaxYesGetedGsList',[scope.row],'one')"
                ></el-button>
                <el-button
                  v-else
                  size="mini"
                  type="danger"
                  icon="el-icon-close"
                  circle
                  @click="onIsDisplay('yes','ajaxYesGetedGsList',[scope.row],'one')"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100px" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="onDeleteGs('one','ajaxYesGetedGsList',scope.row.gs_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin-top:20px"
            @current-change="yesGetedGsChangePage"
            @size-change="yesGetedGsChangeSize"
            align="right"
            background
            layout="total,prev, pager, next"
            :total="yesGetedGsData.total"
          ></el-pagination>
        </div>
      </carousel-item>

      <carousel-item>
        <div>
          <p class="title_car">已分配人员集合</p>
          <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
            <el-form-item label="添加拿公司人员">
              <el-select placeholder="选择" v-model="getedRyData.formData.ryVal">
                <el-option
                  v-for="item in allUsers.分配"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onAddRyList">确定</el-button>
              <el-button @click="onDeleteRy('all')">批量取消人员</el-button>
            </el-form-item>
          </el-form>
          <div style="height:625px;">
            <el-table
              max-height="530"
              border
              :data="getedRyData.tableList"
              v-loading="getedRyData.loading"
              @select-all="onSelect_getedRyRows"
              @select="onSelect_getedRyRows"
            >
              <el-table-column type="selection" width="50px" align="center"></el-table-column>
              <el-table-column width="50px" label="序号" align="center">
                <template slot-scope="scope">{{(company.page-1)*10+scope.$index+1}}</template>
              </el-table-column>
              <el-table-column prop="username" label="人员" align="center"></el-table-column>
              <el-table-column prop="baseInfoComponent" label="基本信息" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.baseInfoComponent == 1"
                    size="mini"
                    type="success"
                    icon="el-icon-check"
                    circle
                    @click="onRySwitch(scope.row,'no',scope.row.baseInfoComponent_group_id)"
                  ></el-button>
                  <el-button
                    v-else
                    size="mini"
                    type="danger"
                    icon="el-icon-close"
                    circle
                    @click="onRySwitch(scope.row,'yes',scope.row.baseInfoComponent_group_id)"
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="companyExecPhase" label="相关企业" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.companyExecPhase == 1"
                    size="mini"
                    type="success"
                    icon="el-icon-check"
                    circle
                    @click="onRySwitch(scope.row,'no',scope.row.companyExecPhase_group_id)"
                  ></el-button>
                  <el-button
                    v-else
                    size="mini"
                    type="danger"
                    icon="el-icon-close"
                    circle
                    @click="onRySwitch(scope.row,'yes',scope.row.companyExecPhase_group_id)"
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="serviceTeam" label="项目服务团队" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.serviceTeam == 1"
                    size="mini"
                    type="success"
                    icon="el-icon-check"
                    circle
                    @click="onRySwitch(scope.row,'no',scope.row.serviceTeam_group_id)"
                  ></el-button>
                  <el-button
                    v-else
                    size="mini"
                    type="danger"
                    icon="el-icon-close"
                    circle
                    @click="onRySwitch(scope.row,'yes',scope.row.serviceTeam_group_id)"
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="proExecPhase" label="项目相关执行内容" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.proExecPhase == 1"
                    size="mini"
                    type="success"
                    icon="el-icon-check"
                    circle
                    @click="onRySwitch(scope.row,'no',scope.row.proExecPhase_group_id)"
                  ></el-button>
                  <el-button
                    v-else
                    size="mini"
                    type="danger"
                    icon="el-icon-close"
                    circle
                    @click="onRySwitch(scope.row,'yes',scope.row.proExecPhase_group_id)"
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="proEnclosure" label="项目相关附件" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.proEnclosure == 1"
                    size="mini"
                    type="success"
                    icon="el-icon-check"
                    circle
                    @click="onRySwitch(scope.row,'no',scope.row.proEnclosure_group_id)"
                  ></el-button>
                  <el-button
                    v-else
                    size="mini"
                    type="danger"
                    icon="el-icon-close"
                    circle
                    @click="onRySwitch(scope.row,'yes',scope.row.proEnclosure_group_id)"
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="proTimeRequire" label="项目要求" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.proTimeRequire == 1"
                    size="mini"
                    type="success"
                    icon="el-icon-check"
                    circle
                    @click="onRySwitch(scope.row,'no',scope.row.proTimeRequire_group_id)"
                  ></el-button>
                  <el-button
                    v-else
                    size="mini"
                    type="danger"
                    icon="el-icon-close"
                    circle
                    @click="onRySwitch(scope.row,'yes',scope.row.proTimeRequire_group_id)"
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="check" label="配置查看" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.check == 1"
                    size="mini"
                    type="success"
                    icon="el-icon-check"
                    circle
                    @click="onRySwitch(scope.row,'no',scope.row.check_group_id)"
                  ></el-button>
                  <el-button
                    v-else
                    size="mini"
                    type="danger"
                    icon="el-icon-close"
                    circle
                    @click="onRySwitch(scope.row,'yes',scope.row.check_group_id)"
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="file" label="配置文件" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.file == 1"
                    size="mini"
                    type="success"
                    icon="el-icon-check"
                    circle
                    @click="onRySwitch(scope.row,'no',scope.row.file_group_id)"
                  ></el-button>
                  <el-button
                    v-else
                    size="mini"
                    type="danger"
                    icon="el-icon-close"
                    circle
                    @click="onRySwitch(scope.row,'yes',scope.row.file_group_id)"
                  ></el-button>
                </template>
              </el-table-column>
              <el-table-column label="所负责公司" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="onGetUserGsList(scope.row)">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="300px" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="onOpenTemplate(scope.row)">编辑组件</el-button>
                  <el-button type="primary" size="mini" @click="sendMessage(scope.row)">短信提醒</el-button>
                  <el-button type="danger" size="mini" @click="onDeleteRy('one',scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-top:20px"
              @current-change="getedRyChangePage"
              @size-change="getedRyChangeSize"
              align="right"
              background
              layout="total,prev, pager, next"
              :total="getedRyData.total"
            ></el-pagination>
          </div>
        </div>
      </carousel-item>
    </carousel-card>
    <!-- 负责公司的弹框 -->
    <el-dialog title="负责公司" :visible.sync="userGslist.dialogVisible">
      <el-table :data="userGslist.tableList" style="width: 100%" border>
        <el-table-column type="index" width="60" label="序号" align="center"></el-table-column>
        <el-table-column prop="gsmc" label="公司名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="onDeleUserGs(scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 负责公司的弹框 -->
    <el-dialog title="编辑组件" :visible.sync="userGslist.templateData.dialogEditVisible">
      <el-select
        style="width:250px"
        multiple
        collapse-tags
        placeholder="选择组件"
        v-model="userGslist.templateData.val"
      >
        <el-option
          v-for="item in userGslist.templateData.list"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userGslist.templateData.dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTemplateSave">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import carouselCard from './sonPage/carouselCard.vue'
import carouselItem from './sonPage/carouselItem.vue'
import leaveWord from './template/leaveWordFP.vue'
import changeRy from './template/changeRy.vue'
export default {
  components: {
    carouselCard,
    carouselItem,
    leaveWord,
    changeRy
  },
  data () {
    return {
      // 方案列表
      planList: [],
      options: [
        {
          value: 1,
          label: '川内企业'
        },
        {
          value: 2,
          label: '入川企业'
        }
      ],
      input: '',
      value: '',
      company: {
        tableData: [],
        total: 10,
        page: 1,
        loading: false,
        c_phase: '',
        select_company: []
      },
      search: {
        gsmc: '',
        scale: '',
        username: ''
      },
      // 下拉框的人员列表
      userList: [],
      userData: [],
      // 人员集合
      getedRyData: {
        formData: {
          ryVal: ''
        },
        tableList: [],
        selectRows: [],
        loading: false,
        page: 1,
        row: 10,
        total: 0
      },
      // 用户数据
      allUsers: {},
      jbxx_id: this.$route.query.jbxx_id,
      userGslist: {
        tableList: [],
        dialogVisible: false,
        templateData: {
          list: [],
          val: [],
          dialogEditVisible: false
        }
      },
      // 留言需要的数据
      leaveNeedData: {
        user_id: localStorage.getItem('user_id'),
        gs_id: '',
        cate: '标书',
        type: 0
      },
      xmmc: '',
      optionsfa: [],
      // 已拿到的公司集合
      yesGetedGsData: {
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
      user_cate: '分配',
      role: {}
    }
  },
  created () {
    document.title = '已分配'
    this.getAllotedCompany()
    this.getAllUser()
    this.ajaxGetedRyList()
    this.ajaxGetUser()
    this.getXmmc()
    this.getPlans()
    this.ajaxYesGetedGsList()
    this.ajaxGetedRyList()
    this.ajaxGetTemplate()
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
    // 获取方案列表
    getPlans () {
      this.axios.post(
        '/Index/thread/getThread',
        {
          jbxx_id: this.jbxx_id,
          cate: 2
        },
        data => {
          if (data.status == 'success') {
            this.planList = data.rows
          } else {
            this.planList = []
          }
        }
      )
    },
    // 查看结果集
    onCheckResult (row) {
      var yj_id, ry_id
      row.sign.forEach(v => {
        if (v.name == '业绩') {
          yj_id = v.id
          let { href } = this.$router.resolve({
            path: `/ItemProj?jbxx_id=${this.jbxx_id}&gs_id=${
              row.gs_id
            }&yj_id=${yj_id}`
          })
          window.open(href, 'i' + row.id)
        } else if (v.name == '人员') {
          ry_id = v.id
          let { href } = this.$router.resolve({
            path: `/itemCheckInfoRy?jbxx_id=${this.jbxx_id}&gs_id=${
              row.gs_id
            }&ry_id=${ry_id}`
          })
          window.open(href, 'i' + row.id)
        }
      })
    },
    getAllotedCompany () {
      this.company.loading = true
      this.axios.post(
        '/index/element_set/getAllotedCompany',
        {
          jbxx_id: this.$route.query.jbxx_id,
          type: 1,
          rows: 10,
          scale: this.search.scale,
          page: this.company.page,
          order: 'desc',
          gsmc: this.search.gsmc
        },
        data => {
          this.company.tableData = data.rows
          this.company.total = data.total
          this.company.loading = false
        }
      )
    },
    // 拿公司人员集合
    ajaxGetedRyList () {
      this.getedRyData.loading = true
      this.axios.post(
        '/index/element_set/getUserBaseInfo',
        {
          jbxx_id: this.jbxx_id,
          type: '分配',
          rows: this.getedRyData.row,
          page: this.getedRyData.page
        },
        data => {
          this.getedRyData.loading = false
          this.getedRyData.tableList = data.rows || []
          this.getedRyData.total = data.total || 0
          this.getedRyData.selectRows = []
        }
      )
    },
    getAllUser () {
      this.axios.post(
        '/index/element_set/getUserBaseInfo',
        {
          jbxx_id: this.$route.query.jbxx_id,
          rows: 10,
          page: 1,
          order: 'asc'
        },
        data => {
          this.userData = data.rows
        }
      )
    },
    // 公司页面翻页
    companyPageChange (val) {
      this.company.page = val
      this.getAllotedCompany()
    },
    // 查询公司
    searchComp () {
      this.getAllotedCompany()
    },
    // 重置查询
    resetComp () {
      this.company.page = 1
      this.search.gsmc = ''
      this.search.scale = ''
      this.getAllotedCompany()
    },
    onSelect_yesGetedGsRows (rows) {
      this.yesGetedGsData.selectRows = rows
    },
    yesGetedGsChangePage (val) {
      this.yesGetedGsData.page = val
      this.ajaxYesGetedGsList()
    },
    // 已拿到公司集合
    ajaxYesGetedGsList () {
      this.yesGetedGsData.loading = true
      this.axios.post(
        '/index/element_set/getAllotedCompany',
        {
          user_cate: '分配',
          valid: 1,
          jbxx_id: this.jbxx_id,
          gsmc: this.yesGetedGsData.formData.gsmc,
          scale: this.yesGetedGsData.formData.areaTypeVal,
          rows: this.yesGetedGsData.row,
          page: this.yesGetedGsData.page
        },
        data => {
          this.yesGetedGsData.loading = false
          this.yesGetedGsData.tableList = data.rows || []
          this.yesGetedGsData.total = data.total || 0
          this.yesGetedGsData.selectRows = []
        }
      )
    },
    // 点击公司旁边的条数进行留言
    leaveCompany (row) {
      scroll(0, 0)
      this.leaveNeedData = { gs_id: row.gs_id, type: 1, gsmc: row.gsmc }
    },
    // 分配
    fenpei () {
      let user_id
      if (this.company.select_company.length == 0) {
        this.$message.error('请选择人员')
        return
      }
      user_id = this.company.select_company.map(v => v.c_phase)
      user_id = user_id.join(',')
      this.axios.post(
        '/index/element_set/editCompanyToProject',
        {
          company_id: localStorage.getItem('company_id'),
          c_phase: user_id,
          user_id: this.search.username,
          type: 2
        },
        data => {
          this.getAllotedCompany()
        }
      )
    },
    // 跳转 公司详情
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
    // 执行方案
    onExecutePlan (dataObj, ajaxFn, planid) {
      let gs_id = this[dataObj].selectRows.map(v => v.gs_id)
      if (gs_id.length == 0) {
        this.$message.error('请选择公司')
        return
      }
      gs_id = gs_id.join(',')
      this.$confirm(
        '该方案有多个同类型节点时，以最新节点为运算标准，并覆盖之前的结果，是否继续？'
      )
        .then(_ => {
          let nowPlan = this.planList.filter(v => v.id == planid)
          if (nowPlan.length == 0) {
            nowPlan.node_name = ''
            nowPlan.cate = ''
          } else {
            nowPlan = nowPlan[0]
          }
          this.axios.post(
            '/index/Human_Allot/executePlan',
            {
              jbxx_id: this.jbxx_id,
              thread_id: planid,
              gs_id,
              name: nowPlan.node_name,
              cate: nowPlan.cate,
              case: planid ? 0 : 1
            },
            data => {
              this[ajaxFn]()
            }
          )
        })
        .catch(_ => { })
    },
    // 是否开通展示
    onIsDisplay (type, ajaxFn, rows, typeAllOne) {
      if (rows.length == 0) {
        this.$message.error('请选择公司')
        return
      }
      let url, queryObj
      if (type == 'yes') {
        // 开通
        url = '/Index/Project/saveDisplay'
        rows = rows.map(v => {
          let obj = [v.gs_id, 0, 0, v.cate]
          if (v.sign) {
            v.sign.forEach(v2 => {
              if (v2.name == '业绩') {
                obj[1] = v2.id
              } else if (v2.name == '人员') {
                obj[2] = v2.id
              }
            })
          }
          return obj
        })
        rows = JSON.stringify(rows)
        queryObj = {
          data: rows,
          jbxx_id: this.jbxx_id
        }
      } else {
        // 关闭
        url = '/Index/Project/delDisplay'
        rows = rows.map(v => v.gs_id).join(',')
        queryObj = {
          gs_id: rows,
          jbxx_id: this.jbxx_id
        }
      }
      this.axios.post(url, queryObj, data => {
        this[ajaxFn]()
      })
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
          username = this.allUsers[this.user_cate].filter(
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
    // 同意重置事件
    onResetForm (ajaxObj, dataObj) {
      this[dataObj].formData.gsmc = ''
      this[dataObj].formData.areaTypeVal = '0'
      this[ajaxObj]()
    },
    // 删除分配公司
    onDeleteGs (type, ajaxObj, gs_idOrDataObj) {
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
            this[ajaxObj]()
            this.ajaxYesGsList()
            this.ajaxAllGsList()
            this.ajaxNoGsList()
          }
        }
      )
    },
    // 删除负责人公司
    onDeleUserGs (row) {
      this.axios.post(
        '/index/element_set/editCompanyToProject',
        {
          company_id: localStorage.getItem('company_id'),
          gs_id: row.gs_id,
          user_id: this.userGslist.selected_row.user_id,
          type: 1,
          c_phase: row.c_phase,
          jbxx_id: this.jbxx_id,
          diff: '分配'
        },
        data => {
          this.ajaxGetUseredGslist()
          this.ajaxYesGetedGsList()
          this.ajaxNoGetedGsList()
          this.ajaxYesGsList()
          this.ajaxNoGsList()
          this.ajaxAllGsList()
        }
      )
    },
    // 列表中的选择人员回调
    onListInSelect (obj) {
      this.onDistribute_button(
        'one',
        obj.ajaxFn,
        obj.ry_id,
        obj.gs_id,
        obj.ry_type,
        obj.username
      )
    },
    // 点击发送之后，刷新主表
    onChangeData () {
      this.ajaxYesGetedGsList()
    },
    // 获取组件列表
    ajaxGetTemplate () {
      this.axios.post(
        '/index/element_set/getComponent',
        {
          user_cate: this.user_cate
        },
        data => {
          this.userGslist.templateData.list = data.message
        }
      )
    },
    // 改变是否是否川内外
    onChangeArea (ajaxObj, dataobj) {
      this[ajaxObj]()
    },
    // 取消和批量取消公司
    quitCompany (type, row) {
      let user_id
      if (type == 'all') {
        if (this.company.select_company.length == 0) {
          this.$message.error('请选择人员')
          return
        }
        user_id = this.company.select_company.map(v => v.c_phase)
        user_id = user_id.join(',')
      } else {
        user_id = row.c_phase
      }
      this.axios.post(
        '/index/element_set/editCompanyToProject',
        {
          company_id: localStorage.getItem('company_id'),
          c_phase: user_id,
          jbxx_id: this.$route.query.jbxx_id,
          type: 1
        },
        data => {
          this.getAllotedCompany()
        }
      )
    },
    // 添加人员集合
    onAddRyList () {
      this.axios.post(
        '/index/element_set/personAllot',
        {
          jbxx_id: this.jbxx_id,
          user_id: this.getedRyData.formData.ryVal,
          level_id: '',
          group_id: '',
          type: 1,
          diff: '分配'
        },
        data => {
          this.ajaxGetedRyList()
        }
      )
    },
    onSelect_getedRyRows (rows) {
      this.getedRyData.selectRows = rows
    },
    select_company (rows) {
      this.company.select_company = rows
    },
    getedRyChangePage (val) {
      this.getedRyData.page = val
      this.ajaxGetedRyList()
    },
    yesGetedGsChangeSize (val) {
      this.yesGetedGsData.row = val
      this.yesGetedGsData.page = 1
      this.yesGetedGsData.total = 0
      this.ajaxYesGetedGsList()
    },
    getedRyChangeSize (val) {
      this.getedRyData.row = val
      this.getedRyData.page = 1
      this.getedRyData.total = 0
      this.ajaxGetedRyList()
    },
    // 负责人公司
    onGetUserGsList (row) {
      this.selected_row = row
      this.userGslist.tableList = []
      this.userGslist.dialogVisible = true
      this.ajaxGetUseredGslist()
    },
    // 获取人员负责公司列表
    ajaxGetUseredGslist () {
      this.userGslist.loading = true
      this.axios.post(
        '/index/element_set/getUserCompany',
        {
          user_id: this.selected_row.user_id,
          jbxx_id: this.jbxx_id,
          type: '分配',
          rows: 10000,
          page: 1
        },
        data => {
          this.userGslist.loading = false
          this.userGslist.tableList = data.rows || []
        }
      )
    },
    // 人员集合开通配置
    onRySwitch (row, type, id) {
      let group_id
      if (type == 'no') {
        let a = row.group_id.split(',')
        a.splice(a.indexOf(id + ''), 1)
        group_id = a.join(',')
      } else {
        if (row.group_id) {
          group_id = row.group_id.split(',')
          group_id.push(id)
          group_id = group_id.join(',')
        } else {
          group_id = id
        }
      }
      this.axios.post(
        '/index/element_set/personAllot',
        {
          jbxx_id: this.jbxx_id,
          user_id: row.user_id,
          level_id: row.level_id,
          group_id,
          type: 2,
          diff: '分配'
        },
        data => {
          this.ajaxGetedRyList()
        }
      )
    },
    // 打开组件弹框
    onOpenTemplate (row) {
      this.selected_row = row
      let arrays = row.group_id ? row.group_id.split(',') : []
      if (arrays.indexOf('12') >= 0) {
        arrays.splice(arrays.indexOf('12'), 1)
      }
      if (arrays.indexOf('13') >= 0) {
        arrays.splice(arrays.indexOf('13'), 1)
      }
      arrays = arrays.map(v => v - 0)
      this.userGslist.templateData.val = arrays
      this.userGslist.templateData.dialogEditVisible = true
    },
    // 保存修改组件
    onTemplateSave () {
      this.axios.post(
        '/index/element_set/personAllot',
        {
          jbxx_id: this.jbxx_id,
          user_id: this.selected_row.user_id,
          level_id: this.selected_row.level_id,
          group_id: this.userGslist.templateData.val.join(','),
          type: 2,
          diff: '分配'
        },
        data => {
          this.userGslist.templateData.dialogEditVisible = false
          this.ajaxGetedRyList()
          this.$message.success('修改成功')
        }
      )
    },
    // 发送短信
    sendMessage (row) {
      this.$confirm('向该用户发送消息提醒?', '提示', {
        type: 'warning'
      })
        .then(_ => {
          this.axios.post(
            '/index/element_set/sendMessage',
            {
              jbxx_id: this.jbxx_id,
              user_id: row.user_id
            },
            data => {
              this.$message.success('已发送')
            }
          )
        })
        .catch(_ => { })
    },
    getXmmc () {
      this.axios.post(
        '/Index/project/edit',
        {
          jbxx_id: this.jbxx_id
        },
        data => {
          this.xmmc = data.res.xmmc
        }
      )
    },
    // 删除人员集合type是否是多选或单个删除
    onDeleteRy (type, row) {
      let user_id
      if (type == 'all') {
        if (this.getedRyData.selectRows.length == 0) {
          this.$message.error('请选择人员')
          return
        }
        user_id = this.getedRyData.selectRows.map(v => v.user_id)
        user_id = user_id.join(',')
      } else {
        user_id = row.user_id
      }
      this.axios.post(
        '/element_set/personAllot',
        {
          jbxx_id: this.jbxx_id,
          user_id,
          type: 3,
          diff: '分配'
        },
        data => {
          this.ajaxGetedRyList()
          this.ajaxYesGsList()
          this.ajaxNoGsList()
          this.ajaxAllGsList()
          this.ajaxYesGetedGsList()
          this.ajaxNoGetedGsList()
        }
      )
    },
    // 获取人员列表
    ajaxGetUser () {
      this.axios.post(
        '/index/project/getUsers',
        { company_id: localStorage.getItem('company_id') },
        data => {
          this.allUsers = data.rows
        }
      )
    },
    // 是否开通展示
    kaitong (type, row) {
      var url = ''
      var data = {}
      var rows = [0, 0, 0, 0]
      var sign = []
      sign[2] = 0
      sign[0] = 0
      if (row.sign) {
        if (row.sign.length != 0) {
          sign[2] = row.sign[2]
          sign[0] = row.sign[0]
        }
      }
      if (type == 'open') {
        url = '/Index/Project/saveDisplay'
        data = {
          jbxx_id: this.$route.query.jbxx_id,
          data: JSON.stringify([
            [row.gs_id, sign[2], sign[0], row.cate]
          ])
        }
      } else {
        url = '/Index/Project/delDisplay'
        data = {
          jbxx_id: this.$route.query.jbxx_id,
          gs_id: row.gs_id
        }
      }
      this.axios.post(url, data, data => {
        this.getAllotedCompany()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title_car {
  text-align: center;
  font-size: 25px;
  color: #2f80d1;
  padding: 20px 0;
}
.button_group {
  height: 50px;
}
.font_click {
  cursor: pointer;
  color: #409eff;
  margin-left: 5px;
}
.font_click:hover {
  text-decoration: underline;
}
</style>
