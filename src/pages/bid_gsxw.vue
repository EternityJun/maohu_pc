<template>
  <div id="bid_gsxw">
    <h1>{{xmmc}}</h1>
    <el-row>
      <el-col :span="19">
        <el-row v-show="tj">
          <el-col :span="20" :offset="2">
            <div class>已设置的条件</div>
          </el-col>
          <el-col :span="20" :offset="2" v-show="form.xmyz_checked">
            <el-row>
              <el-col :span="2">
                <h5>业主：</h5>
              </el-col>
              <el-col :span="21">
                <span>{{form.xmyz}}</span>
              </el-col>
              <el-col :span="1" style="text-align:center;cursor:pointer">
                <span
                  style="display:inline-block;width:100%;height:100%"
                  @click="delCondition('xmyz')"
                >X</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="20" :offset="2" v-show="form.xmCondition_checked">
            <el-row>
              <el-col :span="1">
                <h5>项目：</h5>
              </el-col>
              <el-col :span="22">
                <div v-show="form.xmCondition.condition.keys.contain.length>0">
                  <span>关键字含有：</span>
                  <span>{{form.xmCondition.condition.keys.contain.join(',')}}</span>
                </div>
                <div v-show="form.xmCondition.condition.xmlx.contain.length>0">
                  <span>类型含有：</span>
                  <span>{{form.xmCondition.condition.xmlx.contain.join(',')}}</span>
                </div>
                <div v-show="form.xmCondition.minMoney || form.xmCondition.maxMoney">
                  <span>金额：</span>
                  <span>
                    {{form.xmCondition.minMoney}}万元
                    <span>—</span>
                    {{form.xmCondition.maxMoney}}万元
                  </span>
                </div>
              </el-col>
              <el-col :span="1" style="text-align:center;cursor:pointer">
                <span
                  style="display:inline-block;width:100%;height:100%"
                  @click="delCondition('xmCondition')"
                >X</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="20" :offset="2" v-show="form.area_checked">
            <el-row>
              <el-col :span="1">
                <h5>地区：</h5>
              </el-col>
              <el-col :span="22">
                <span>{{form.area.join(',')}}</span>
              </el-col>
              <el-col :span="1" style="text-align:center;cursor:pointer">
                <span
                  style="display:inline-block;width:100%;height:100%"
                  @click="delCondition('area')"
                >X</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="20" :offset="2" v-show="form.date_checked">
            <el-row>
              <el-col :span="1">
                <h5>日期：</h5>
              </el-col>
              <el-col :span="22">
                <span>{{form.minTime}}</span>
                <span>—</span>
                <span>{{form.maxTime}}</span>
              </el-col>
              <el-col :span="1" style="text-align:center;cursor:pointer">
                <span
                  style="display:inline-block;width:100%;height:100%"
                  @click="delCondition('date')"
                >X</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <div class="table" style="height:1000px;margin-top:20px;">
              <div class="table_footer">
                <el-row :gutter="20">
                  <div style="position:absolute;left:3%;">
                    <el-button
                      type="primary"
                      icon="el-icon-d-arrow-left"
                      @click="checkTableButton()"
                    ></el-button>
                  </div>
                  <div style="position:absolute;right:3%;">
                    <el-button
                      type="primary"
                      icon="el-icon-d-arrow-right"
                      @click="checkTableButton()"
                    ></el-button>
                  </div>
                  <div
                    :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'637px',zIndex:'9',display:tableIndex==1?'block':'none'}"
                    @click="checkTable(2)"
                  ></div>
                  <div
                    :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'0',zIndex:'9',display:tableIndex!=1?'block':'none'}"
                    @click="checkTable(1)"
                  ></div>
                  <div :style="tableStyleL" @click="checkTable(1)">
                    <p
                      :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==1?'center':'left',fontSize:'20px',color:'#67C23a'}"
                    >
                      已审核公司&nbsp;
                      <i class="el-icon-success"></i>
                    </p>
                    <el-row>
                      <el-col :span="17" :offset="4">
                        <el-form
                          :inline="true"
                          :model="formYsh"
                          class="demo-form-inline"
                          @submit.native.prevent
                        >
                          <el-form-item>
                            <el-input
                              v-model="formYsh.gsmc"
                              @keyup.enter.native="onSubmit('ysh',1)"
                              placeholder="公司名称"
                              style="width:485px"
                            ></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" @click="onSubmit('ysh',1)">查询</el-button>
                            <el-button type="primary" @click="onSubmit('ysh_reset',1)">重置</el-button>
                            <el-button type="primary" @click="auditing('all')">不通过</el-button>
                          </el-form-item>
                        </el-form>
                      </el-col>
                    </el-row>

                    <el-table
                      style="height:800px;overflow-y:auto;"
                      :data="tableDataFirst"
                      v-loading="yshLoading"
                      border
                      @sort-change="fn_sortable"
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column type="selection" width="40" align="center"></el-table-column>
                      <el-table-column label="序号" header-align="center" align="center" width="80">
                        <template slot-scope="scope">{{scope.$index+(pageL-1)*formYsh.rows+1}}</template>
                      </el-table-column>

                      <el-table-column prop="company" label="企业名称" min-width="40%" align="center">
                        <template slot-scope="scope">
                          <el-button @click="open_gs(scope.row)" type="text">{{scope.row.company}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="zbxxids"
                        label="中标次数"
                        min-width="40%"
                        align="center"
                        sortable="custom"
                      >
                        <template slot-scope="scope">
                          <el-button
                            @click="open_detail(scope.row,'zbxxids')"
                            type="text"
                          >{{scope.row.zbxxids}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="zbids"
                        label="投标次数"
                        min-width="40%"
                        align="center"
                        sortable="custom"
                      >
                        <template slot-scope="scope">
                          <el-button
                            @click="open_detail(scope.row,'zbids')"
                            type="text"
                          >{{scope.row.zbids}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column width="100" label="操作" align="center">
                        <template slot-scope="scope">
                          <el-button size="small" @click="auditing(scope.row)" type="primary">不通过</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-pagination
                      align="right"
                      :current-page.sync="pageL"
                      @size-change="sizeChange"
                      style="margin-top:10px"
                      @current-change="changePage"
                      background
                      layout="sizes,total,prev, pager, next"
                      :total="totalL"
                    ></el-pagination>
                  </div>
                  <div :style="tableStyleR" @click="checkTable(2)">
                    <p
                      :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==2?'center':'right',fontSize:'20px',color:'#f56c6c'}"
                    >
                      未审核公司
                      <i class="el-icon-error"></i>
                    </p>
                    <el-row>
                      <el-col :span="17" :offset="4">
                        <el-form
                          :inline="true"
                          :model="formWsh"
                          class="demo-form-inline"
                          @submit.native.prevent
                        >
                          <el-form-item>
                            <el-input
                              v-model="formWsh.gsmc"
                              @keyup.enter.native="onSubmit('wsh',2)"
                              placeholder="公司名称"
                              style="width:485px"
                            ></el-input>
                          </el-form-item>

                          <el-form-item>
                            <el-button type="primary" @click="onSubmit('wsh',2)">查询</el-button>
                            <el-button type="primary" @click="onSubmit('wsh_reset',2)">重置</el-button>
                            <el-button type="primary" @click="auditing('all')">通过</el-button>
                          </el-form-item>
                        </el-form>
                      </el-col>
                    </el-row>

                    <el-table
                      style="height:800px;overflow-y:auto;"
                      :data="noTableDataFirst"
                      v-loading="wshLoading"
                      border
                      @sort-change="fn_sortable"
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column type="selection" width="40" align="center"></el-table-column>
                      <el-table-column label="序号" header-align="center" align="center" width="80">
                        <template slot-scope="scope">{{scope.$index+(pageR-1)*formWsh.rows+1}}</template>
                      </el-table-column>

                      <el-table-column prop="company" label="企业名称" min-width="40%" align="center">
                        <template slot-scope="scope">
                          <el-button @click="open_gs(scope.row)" type="text">{{scope.row.company}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="zbxxids"
                        label="中标次数"
                        min-width="40%"
                        align="center"
                        sortable="custom"
                      >
                        <template slot-scope="scope">
                          <el-button
                            @click="open_detail(scope.row,'zbxxids')"
                            type="text"
                          >{{scope.row.zbxxids}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="zbids"
                        label="投标次数"
                        min-width="40%"
                        align="center"
                        sortable="custom"
                      >
                        <template slot-scope="scope">
                          <el-button
                            @click="open_detail(scope.row,'zbids')"
                            type="text"
                          >{{scope.row.zbids}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column width="100" label="操作" align="center">
                        <template slot-scope="scope">
                          <el-button size="small" @click="auditing(scope.row)" type="primary">通过</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-pagination
                      align="right"
                      :current-page.sync="pageR"
                      @size-change="sizeChange"
                      style="margin-top:10px"
                      @current-change="changePage"
                      background
                      layout="sizes,total,prev, pager, next"
                      :total="totalR"
                    ></el-pagination>
                  </div>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5" style="position:relative;z-index:999">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>条件设置</span>
          </div>
          <div class="card-div">
            <p class="card-p">
              <el-checkbox v-model="form.xmyz_checked">业主</el-checkbox>
            </p>
            <p>
              <el-input v-model="form.xmyz"></el-input>
            </p>
          </div>
          <div class="card-div">
            <p class="card-p">
              <el-checkbox v-model="form.xmCondition_checked">项目</el-checkbox>
            </p>
            <p>
              <el-button type="primary" size="small" @click="set_tj">{{form.text_setTj}}</el-button>
            </p>
          </div>
          <div class="card-div">
            <p class="card-p">
              <el-checkbox v-model="form.area_checked">地区</el-checkbox>
            </p>
            <p>
              <el-select v-model="form.area" multiple placeholder="不限制" style="width:100%">
                <el-option
                  v-for="item in cate.xmdq"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </p>
          </div>
          <div class="card-div">
            <p class="card-p">
              <el-checkbox v-model="form.date_checked">日期</el-checkbox>
            </p>
            <p>
              <el-date-picker
                :picker-options="pickerOptionsStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                v-model="form.minTime"
                style="width: 150px;"
              ></el-date-picker>
              <span class="line">-</span>
              <el-date-picker
                :picker-options="pickerOptionsEnd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                v-model="form.maxTime"
                style="width: 150px;"
              ></el-date-picker>
            </p>
          </div>
          <el-row style="text-align:center;position:absoute;">
            <el-button type="primary" @click="onSubmit('tj')">提交</el-button>
            <el-button type="primary" @click="close">关闭页面</el-button>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="条件设置" :visible.sync="yjCondition.dialogVisible" width="60%">
      <bid-yj-condition v-on:onYjCondition="onYjCondition"></bid-yj-condition>
    </el-dialog>
    <el-dialog title="项目" :visible.sync="zb_tb_count.dialogVisible" width="70%" top="20px">
      <bid-xm :xm="zb_tb_count.data"></bid-xm>
    </el-dialog>
  </div>
</template>
<script>
import bidYjCondition from './template/bid_yj_condition.vue'
import bidXm from './template/bidXm.vue'
export default {
  data () {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.form.maxTime
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.form.minTime
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() -
              1 * 24 * 60 * 60 * 1000
            )
          }
        }
      },
      multipleSelection: [],
      yjCondition: {
        dialogVisible: false,
        type: 'gsxw'
      },
      xmmc: '',
      jbxx_id: '',
      thread_id: '',
      cate: [],
      tj: false,
      formYsh: {
        gsmc: '',
        order: '',
        ordername: '',
        rows: 10
      },
      formWsh: {
        gsmc: '',
        order: '',
        ordername: '',
        rows: 10
      },
      form: {
        xmyz_checked: false,
        xmCondition_checked: false,
        area_checked: false,
        date_checked: false,
        gsmc: '',
        xmyz: '',
        xmCondition: {
          condition: {
            keys: {
              contain: []
            },
            xmlx: {
              contain: []
            }
          },
          minMoney: '',
          maxMoney: ''
        },
        area: [],
        minTime: '',
        maxTime: '',
        page: 1,
        order: 'desc',
        text_setTj: '设置条件'
      },
      yshLoading: false,
      wshLoading: false,
      totalL: 0,
      totalR: 0,
      pageL: 1,
      pageR: 1,
      // 公司切换
      tableIndex: 1,
      tableStyleL:
        'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);min-height:810px;position:absolute;width:80%;z-index:10;',
      tableStyleR:
        'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);min-height:810px;position:absolute;width:80%;z-index:8;',
      tableDataFirst: [],
      noTableDataFirst: [],
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
  components: {
    bidYjCondition,
    bidXm
  },
  created () {
    document.title = '公司行为数据分析：' + this.$route.query.xmmc
    this.fn_role()
  },
  mounted () {
    this.form.xmyz =
      this.$route.query.xmyzdw != 'null' ? this.$route.query.xmyzdw : ''
    this.form.area =
      this.$route.query.area != 'null' && this.$route.query.area
        ? [this.$route.query.area]
        : []
    this.xmmc = this.$route.query.xmmc
    this.jbxx_id = this.$route.query.jbxx_id
    this.thread_id = this.$route.query.thread_id
    this.fn_cate()
    this.companyBehaviorGet(this.thread_id)
    this.onSubmit('ysh_reset', 1)
    this.onSubmit('wsh_reset', 2)
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
    delCondition (key) {
      let self = this
      let condition = self.form
      console.log(condition)
      switch (key) {
        case 'xmyz':
          condition.xmyz = ''
          condition.xmyz_checked = false
          break
        case 'xmCondition':
          condition.xmCondition = {
            condition: {
              keys: {
                contain: []
              },
              xmlx: {
                contain: []
              }
            },
            minMoney: '',
            maxMoney: ''
          }
          condition.xmCondition_checked = false
          condition.text_setTj = '设置条件'
          break
        case 'area':
          condition.area = []
          condition.area_checked = false
          break
        case 'date':
          condition.minTime = ''
          condition.maxTime = ''
          condition.date_checked = false
          break
      }
      condition.page = 1
      this.form = condition
      this.saveCondition()
      this.onSubmit('', 1)
      this.onSubmit('', 2)
    },
    sizeChange (val) {
      if (this.tableIndex == 1) {
        this.formYsh.rows = val
        this.pageL = 1
      } else {
        this.formWsh.rows = val
        this.pageR = 1
      }
      this.onSubmit('', 1)
      this.onSubmit('', 2)
    },
    close () {
      window.close()
    },
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    open_detail (row, sortField) {
      this.zb_tb_count.dialogVisible = true
      this.zb_tb_count.data = {
        thread_id: this.thread_id,
        jbxx_id: this.jbxx_id,
        type: this.tableIndex,
        gs_id: row.gs_id,
        sortField: sortField
      }
    },
    auditing (row) {
      let gs_id = ''
      if (row == 'all') {
        let multipleSelection = this.multipleSelection
        multipleSelection.forEach(element => {
          gs_id += element.gs_id + ','
        })
        gs_id = gs_id.substring(0, gs_id.length - 1)
      } else {
        gs_id = row.gs_id
      }
      let params = {
        id: this.thread_id, // 点击的节点的id
        gs_id: gs_id,
        type: this.tableIndex == 1 ? 1 : 0 // 1:已审核到未审核
      }
      this.axios.post('/index/thread/Auditing', params, data => {
        this.onSubmit('', 1)
        this.onSubmit('', 2)
      })
    },
    open_gs (row) {
      if (this.role.company_role !== 'C') {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${
            row.company
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
    fn_sortable (param) {
      let order = ''
      if (param.order == 'ascending') {
        order = 'asc'
      } else if (param.order == 'descending') {
        order = 'desc'
      }
      if (this.tableIndex == 1) {
        this.formYsh.order = order
        this.formYsh.ordername = param.prop
      } else {
        this.formWsh.order = order
        this.formWsh.ordername = param.prop
      }
      this.onSubmit('', 1)
      this.onSubmit('', 2)
    },
    onYjCondition (data) {
      this.yjCondition.dialogVisible = false
      if (data != 'cancel') {
        this.form.xmCondition = data
        this.form.text_setTj = '已设置'
        // console.log(data);
      }
    },
    set_tj () {
      this.yjCondition.dialogVisible = true
    },
    companyBehaviorGet (thread_id) {
      let self = this
      this.axios.post(
        '/index/Analysis_report/companyBehaviorGet',
        { thread_id: thread_id },
        data => {
          if (data.status == 'success') {
            self.form.area = data.message.area
              ? data.message.area.split(',')
              : []
            self.form.minTime = data.message.minTime
            self.form.maxTime = data.message.maxTime
            self.form.xmyz = data.message.xmyz
            if (data.message.xmCondition) {
              let condition = JSON.parse(
                data.message.xmCondition
              )
              self.form.xmCondition.condition.keys.contain = condition
                .condition.keys
                ? condition.condition.keys.contain
                : []
              self.form.xmCondition.condition.xmlx.contain = condition
                .condition.xmlx
                ? condition.condition.xmlx.contain
                : []
              self.form.xmCondition.maxMoney = condition.maxMoney
                ? condition.maxMoney
                : ''
              self.form.xmCondition.minMoney = condition.minMoney
                ? condition.minMoney
                : ''
              self.form.xmCondition.maxZbgsTime = condition.maxZbgsTime
                ? condition.maxZbgsTime
                : ''
              self.form.xmCondition.minZbgsTime = condition.minZbgsTime
                ? condition.minZbgsTime
                : ''
              self.form.text_setTj = '已设置'
            }
            self.tj = true
            self.form.xmyz_checked = !!self.form.xmyz
            self.form.xmCondition_checked = !!data.message.xmCondition
            self.form.area_checked =
              self.form.area.length > 0
            self.form.date_checked =
              !!(self.form.minTime || self.form.maxTime)
          } else {
          }

          self.onSubmit('ysh', 1)
        }
      )
    },
    fn_cate () {
      this.axios.post('/index/project/cate', {}, data => {
        this.cate = data
      })
    },
    saveCondition () {
      let params = {
        thread_id: this.thread_id,
        jbxx_id: this.jbxx_id,
        xmyz: this.form.xmyz_checked ? this.form.xmyz : '',
        xmCondition: this.form.xmCondition_checked
          ? this.form.xmCondition
          : '',
        area: this.form.area_checked ? this.form.area.join(',') : '',
        minTime: this.form.date_checked ? this.form.minTime : '',
        maxTime: this.form.date_checked ? this.form.maxTime : ''
      }
      this.axios.post(
        '/index/Analysis_report/companyBehaviorSave',
        params,
        data => {
          this.onSubmit('', 1)
          this.onSubmit('', 2)
        }
      )
    },
    onSubmit (key, tabIndex) {
      let self = this
      let params = {
        thread_id: this.thread_id,
        jbxx_id: this.jbxx_id,
        xmyz: this.form.xmyz_checked ? this.form.xmyz : '',
        xmCondition: this.form.xmCondition_checked
          ? this.form.xmCondition
          : '',
        area: this.form.area_checked ? this.form.area : '',
        minTime: this.form.date_checked ? this.form.minTime : '',
        maxTime: this.form.date_checked ? this.form.maxTime : '',
        commit: 'save',
        order: this.form.order
      }
      if (tabIndex == 1) {
        params.rows = this.formYsh.rows
      } else {
        params.rows = this.formWsh.rows
      }
      switch (key) {
        case 'ysh_reset':
          this.formYsh.gsmc = ''
          break
        case 'wsh_reset':
          this.formWsh.gsmc = ''
          break
        case 'tj':
          this.tj = true
          this.saveCondition()
          break
      }

      if (tabIndex == 1) {
        params.type = 1
        params.page = this.pageL
        params.order = this.formYsh.order
        params.ordername = this.formYsh.ordername
        params.company = this.formYsh.gsmc
        this.yshLoading = true
      } else {
        params.type = 2
        params.page = this.pageR
        params.order = this.formWsh.order
        params.ordername = this.formWsh.ordername
        params.company = this.formWsh.gsmc
        this.wshLoading = true
      }

      this.axios.post(
        '/index/Analysis_report/companyBehavior',
        params,
        data => {
          if (tabIndex == 1) {
            self.yshLoading = false
          } else {
            self.wshLoading = false
          }
          if (data.status == 'success') {
            if (tabIndex == 1) {
              this.tableDataFirst = data.rows
              this.totalL = data.total
            } else {
              this.noTableDataFirst = data.rows
              this.totalR = data.total
            }
          } else {
            if (params.type == 1) {
              if (params.page > 1) {
                this.pageL = params.page - 1
                this.onSubmit('', 1)
              } else {
                this.tableDataFirst = []
                this.totalL = 0
                this.pageL = 1
              }
            } else {
              if (params.page > 1) {
                this.pageR = params.page - 1
                this.onSubmit('', 2)
              } else {
                this.noTableDataFirst = []
                this.totalR = 0
                this.pageR = 1
              }
            }
          }
        }
      )
    },
    formatter_tj () { },
    // 改变页面
    changePage (val) {
      if (this.tableIndex == 1) {
        this.pageL = val
      } else {
        this.pageR = val
      }
      this.onSubmit('', 1)
      this.onSubmit('', 2)
    },
    // 按钮无限切换
    checkTableButton () {
      if (this.tableIndex == 2) {
        this.checkTable(1)
      } else {
        this.checkTable(2)
      }
    },
    // 切换表格
    checkTable (type) {
      if (type == 2) {
        this.tableIndex = 2
        this.tableStyleL =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(-10%) scale(0.8);position:absolute;width:80%;z-index:8;min-height:810px;transition: .3s;'
        this.tableStyleR =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:80%;z-index:10;min-height:810px;transition: .3s;'
      } else {
        this.tableIndex = 1
        this.tableStyleL =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:80%;z-index:10;min-height:810px;transition: .3s;'
        this.tableStyleR =
          'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);position:absolute;width:80%;z-index:8;min-height:810px;transition: .3s;'
      }
      // this.onSubmit();
    }
  }
}
</script>
<style>
#bid_gsxw .el-card__header {
  padding: 7px 20px;
}
</style>

<style lang="less" scoped>
#bid_gsxw {
  min-width: 1200px;
  overflow: auto;
  padding: 20px;
  h1 {
    text-align-last: center;
  }
  h5 {
    font-size: 16px;
    font-weight: lighter;
  }
  .fontWeight {
    font-weight: bold;
    font-size: 13px;
  }
  .research_row {
    margin: 20px;
  }
  .box-card {
    height: 500px;
    .card-div {
      height: 70px;
      margin-bottom: 20px;
      .card-p {
        margin-bottom: 10px;
      }
      .line {
        text-align: center;
        line-height: 40px;
      }
    }
  }
}
</style>
