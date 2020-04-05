<template>
  <div id="dataset">
    <el-row>
      <el-col :span="24">
        <div class="table" style="height:870px;margin-top:20px;">
          <div class="table_footer">
            <el-row :gutter="20">
              <div style="position:absolute;left:3%;">
                <el-button type="primary" icon="el-icon-d-arrow-left" @click="checkTableButton()"></el-button>
              </div>
              <div style="position:absolute;right:3%;">
                <el-button type="primary" icon="el-icon-d-arrow-right" @click="checkTableButton()"></el-button>
              </div>
              <div
                :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'637px',zIndex:'9',display:tableIndex==1?'block':'none'}"
                @click="checkTable(2)"
              ></div>
              <div
                :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'0',zIndex:'9',display:tableIndex!=1?'block':'none'}"
                @click="checkTable(1,'a')"
              ></div>
              <div :style="tableStyleL" @click="checkTable(1,'2')">
                <p
                  :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==1?'center':'left',fontSize:'20px',color:'#67C23a'}"
                >
                  已审核公司&nbsp;
                  <i class="el-icon-success"></i>
                </p>
                <el-row>
                  <el-col :span="24">
                    <el-form
                      :inline="true"
                      :model="formYsh"
                      class="demo-form-inline"
                      @submit.native.prevent
                    >
                      <el-form-item>
                        <el-input
                          v-model="formYsh.gsmc"
                          placeholder="公司名称"
                          style="width:440px"
                          @keyup.enter.native="audited(1)"
                        ></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-select
                          v-model="formYsh.scale"
                          placeholder="不限制"
                          @change="onChangeArea('audited','formYsh')"
                        >
                          <el-option label="不限制" value></el-option>
                          <el-option label="川内企业" value="1"></el-option>
                          <el-option label="入川企业" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <span @click="set_xypj('ysh')">
                          <el-input
                            readonly
                            v-model="formYsh.xypj"
                            placeholder="信用评价"
                            style="width:444px"
                          ></el-input>
                        </span>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit('ss')">查询</el-button>
                        <el-button type="primary" @click="onSubmit('reset')">重置</el-button>
                        <el-button type="primary" @click="auditing('all')">不通过</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>

                <el-table
                  :data="tableDataFirst"
                  v-loading="loading1"
                  border
                  @sort-change="fn_sortable"
                  align="center"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="40" align="center"></el-table-column>
                  <el-table-column label="序号" header-align="center" align="center" width="80">
                    <template slot-scope="scope">{{scope.$index+(pageL-1)*formYsh.rows+1}}</template>
                  </el-table-column>

                  <el-table-column prop="name" label="企业名称" min-width="40%" align="center">
                    <template slot-scope="scope">
                      <el-button @click="open_gs(scope.row)" type="text">{{scope.row.gsmc}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="zbxxids"
                    label="中标次数"
                    align="center"
                    min-width="12%"
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
                    align="center"
                    min-width="12%"
                    sortable="custom"
                  >
                    <template slot-scope="scope">
                      <el-button
                        @click="open_detail(scope.row,'zbids')"
                        type="text"
                      >{{scope.row.zbids}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column width="100" label="条件结果集" align="center" prop="difficult_txt">
                    <template slot-scope="scope">
                      <el-button size="small" @click="onOpen(scope.row)" type="primary">查看</el-button>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column width="80" label="标签" align="center">
                                        <template slot-scope="scope">
                                            <el-button size="small" @click="onOpen(scope.row)" type="primary">查看</el-button>
                                        </template>
                  </el-table-column>-->
                  <el-table-column width="100" label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button size="small" @click="auditing(scope.row)" type="primary">未审核</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :page-size="pageSize1"
                  align="right"
                  :current-page.sync="pageL"
                  style="margin-top:10px"
                  @size-change="sizeChange"
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
                  <el-col :span="24">
                    <el-form
                      :inline="true"
                      :model="formWsh"
                      class="demo-form-inline"
                      @submit.native.prevent
                    >
                      <el-form-item>
                        <el-input
                          v-model="formWsh.gsmc"
                          placeholder="公司名称"
                          style="width:440px"
                          @keyup.enter.native="audited(2)"
                        ></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-select
                          v-model="formWsh.scale"
                          placeholder="不限制"
                          @change="onChangeArea('audited','formWsh')"
                        >
                          <el-option label="不限制" value></el-option>
                          <el-option label="川内企业" value="1"></el-option>
                          <el-option label="入川企业" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <span @click="set_xypj('wsh')">
                          <el-input
                            readonly
                            v-model="formYsh.xypj"
                            placeholder="信用评价"
                            style="width:444px"
                          ></el-input>
                        </span>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit('ss')">查询</el-button>
                        <el-button type="primary" @click="onSubmit('reset')">重置</el-button>
                        <el-button type="primary" @click="auditing('all')">通过</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>

                <el-table
                  :data="noTableDataFirst"
                  v-loading="loading2"
                  border
                  @sort-change="fn_sortable"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="40" align="center"></el-table-column>
                  <el-table-column label="序号" header-align="center" align="center" width="80">
                    <template slot-scope="scope">{{scope.$index+(pageR-1)*formWsh.rows+1}}</template>
                  </el-table-column>

                  <el-table-column prop="name" label="企业名称" min-width="40%" align="center">
                    <template slot-scope="scope">
                      <el-button @click="open_gs(scope.row)" type="text">{{scope.row.gsmc}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="zbxxids"
                    label="中标次数"
                    align="center"
                    min-width="12%"
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
                    align="center"
                    min-width="12%"
                    sortable="custom"
                  >
                    <template slot-scope="scope">
                      <el-button
                        @click="open_detail(scope.row,'zbids')"
                        type="text"
                      >{{scope.row.zbids}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column width="100" label="条件结果集" align="center" prop="difficult_txt">
                    <template slot-scope="scope">
                      <el-button size="small" @click="onOpen(scope.row)" type="primary">查看</el-button>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column width="80" label="标签" align="center">
                                        <template slot-scope="scope">
                                            <el-button size="small" @click="onOpen(scope.row)" type="primary">查看</el-button>
                                        </template>
                  </el-table-column>-->
                  <el-table-column width="100" label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button size="small" @click="auditing(scope.row)" type="primary">审核</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :page-size="pageSize2"
                  align="right"
                  :current-page.sync="pageR"
                  style="margin-top:10px"
                  @size-change="sizeChange"
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
    <el-dialog width="40%" title="信用评价" :visible.sync="xypj.dialogVisible" append-to-body>
      <bid-xypj v-on:fnXypj="fn_xypj"></bid-xypj>
    </el-dialog>
    <el-dialog title="项目" :visible.sync="zb_tb_count.dialogVisible" width="70%" append-to-body>
      <bid-xm :xm="zb_tb_count.data"></bid-xm>
    </el-dialog>
  </div>
</template>

<script>
import bidXypj from './bid_xypj.vue'
import bidXm from './bidXm.vue'

export default {
  props: ['data'],
  data () {
    return {
      zb_tb_count: {
        dialogVisible: false,
        data: {
          thread_id: '',
          jbxx_id: ''
        }
      },
      formYsh: {
        rows: 10,
        type: 1,
        gsmc: '',
        scale: '',
        page: 1,
        xypj: '',
        order: 'desc',
        ordername: 'activity'
      },
      formWsh: {
        rows: 10,
        type: 0,
        gsmc: '',
        scale: '',
        page: 1,
        xypj: '',
        order: 'desc',
        ordername: 'activity'
      },

      tableDataFirst: [],
      noTableDataFirst: [],
      totalL: 0,
      totalR: 0,
      pageL: 1,
      pageR: 1,
      pageSize1: 10,
      pageSize2: 10,
      // 公司切换
      tableIndex: 1,
      tableStyleL:
        'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);min-height:810px;height:860px;overflow:auto;position:absolute;width:80%;z-index:10;',
      tableStyleR:
        'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);min-height:810px;height:860px;overflow:auto;position:absolute;width:80%;z-index:8;',
      xypj: {
        dialogVisible: false,
        form: {}
      },
      multipleSelection: [],
      loading1: true,
      loading2: true,
      update: true,
      role: {}
    }
  },
  components: {
    bidXypj,
    bidXm
  },
  watch: {
    data: function () {
      this.pageSize1 = 10
      this.pageSize2 = 10
      console.log(this.data)
      console.log(this.pageSize1)
      this.onSubmit('reset')
      this.isUpdate()
    }
  },
  mounted () {
    this.fn_role()
    this.audited(1)
    this.audited(2)
    this.isUpdate()
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
    // 改变是否是否川内外
    onChangeArea (ajaxObj, dataobj) {
      if (dataobj == 'formYsh') {
        this.pageL = 1
        this.audited(1)
      } else if (dataobj == 'formWsh') {
        this.pageR = 1
        this.audited(2)
      }
    },
    isUpdate () {
      //   console.log(this.data)
      let params = {
        thread_id: JSON.parse(this.data).thread_id2,
        node_id: JSON.parse(this.data).thread_id
      }
      this.axios.post('/index/thread/isUpdate', params, data => {
        this.update = data.update
      })
    },
    open_detail (row, sortField) {
      this.zb_tb_count.dialogVisible = true
      this.zb_tb_count.data = {
        thread_id: JSON.parse(this.data).thread_id,
        jbxx_id: JSON.parse(this.data).jbxx_id,
        type: this.tableIndex,
        gs_id: row.gs_id,
        sortField: sortField
      }
    },
    onOpen (row) {
      this.axios.post(
        '/index/thread/getNode',
        { node_id: JSON.parse(this.data).thread_id },
        data => {
          let { href } = this.$router.resolve({
            path: `/bidResultRyYJ?gs_id=${row.gs_id}&jbxx_id=${
              JSON.parse(this.data).jbxx_id
            }&gsmc=${row.gsmc}&yj_id=${data.yj_id}&ry_id=${
              data.ry_id
            }&flag=0`
          })
          window.open(href, ``)
        }
      )
    },
    fn_xypj (data) {
      this.xypj.dialogVisible = false
      if (data != 'cancel') {
        this.formYsh.xypj = data.item
        this.formWsh.xypj = data.item
        this.formYsh.orand = data.orand
        this.formWsh.orand = data.orand
        this.formYsh.sixty = data.sixty
        this.formWsh.sixty = data.sixty
        this.formYsh.today = data.today
        this.formWsh.today = data.today
        this.audited(1)
        this.audited(2)
      }
    },
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 已审核 未审核
    auditing (row) {
      if (!this.update) {
        this.$message.error('该节点已经运行完成，不能再修改条件')
        return
      }
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
        id: JSON.parse(this.data).thread_id, // 点击的节点的id
        gs_id: gs_id,
        type: this.tableIndex == 1 ? 1 : 0 // 1:已审核到未审核
      }
      this.axios.post('/index/thread/Auditing', params, data => {
        if (data.status == 'success') {
          this.audited(1, 'Auditing')
          this.audited(2, 'Auditing')
        } else {
          this.$message.error('操作失败，请稍后重试')
        }
      })
    },
    // 跳转
    open_gs (row) {
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
    fn_sortable (param) {
      // console.log(param);
      let order = ''
      if (param.order == 'ascending') {
        order = 'asc'
      } else if (param.order == 'descending') {
        order = 'desc'
      }
      if (this.tableIndex == 1) {
        this.formYsh.order = order
        this.formYsh.ordername = param.prop
        this.audited(1)
      } else {
        this.formWsh.order = order
        this.formWsh.ordername = param.prop
        this.audited(2)
      }
    },
    set_xypj (type) {
      this.xypj.dialogVisible = true
    },
    // 改变页面
    changePage (val) {
      if (this.tableIndex == 1) {
        this.pageL = val
        this.audited(1)
      } else {
        this.pageR = val
        this.audited(2)
      }
    },
    sizeChange (val) {
      if (this.tableIndex == 1) {
        this.formYsh.rows = val
        this.pageL = 1
        this.audited(1)
      } else {
        this.formWsh.rows = val
        this.pageR = 1
        this.audited(2)
      }
    },
    // 按钮无限切换
    checkTableButton (type) {
      if (this.tableIndex == 2) {
        this.checkTable(1)
      } else {
        this.checkTable(2)
      }
    },
    // 切换表格
    checkTable (type, a) {
      if (type == 2) {
        this.tableIndex = 2
        this.tableStyleL =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(-10%) scale(0.8);position:absolute;width:80%;z-index:8;min-height:810px;height:860px;overflow:auto;transition: .3s;';
        this.tableStyleR =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:80%;z-index:10;min-height:810px;height:860px;overflow:auto;transition: .3s;';
      } else {
        this.tableIndex = 1
        this.tableStyleL =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:80%;z-index:10;min-height:810px;height:860px;overflow:auto;transition: .3s;';
        this.tableStyleR =
          'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);position:absolute;width:80%;z-index:8;min-height:810px;height:860px;overflow:auto;transition: .3s;';
      }
      if (a == 2) {

      }
      // this.audited(1);
      // this.audited(2);
    },
    onSubmit (type) {
      let params = {
        jbxx_id: JSON.parse(this.data).jbxx_id,
        thread_id: JSON.parse(this.data).thread_id
      }
      if (this.tableIndex == 1) {
        this.pageL = 1
      } else {
        this.pageR = 1
      }
      switch (type) {
        case 'tj':
          params.xmdq = this.form.xmdq
          params.minDate = this.form.min_date
          params.maxDate = this.form.max_date
          params.money = this.form.money
          params.xmlx = this.form.xmlx
          this.newPlan(params)
          break
        case 'ss':
          this.audited(1)
          this.audited(2)
          break
        case 'reset':
          if (this.tableIndex == 1) {
            this.formYsh.gsmc = ''
            this.formYsh.scale = ''
            this.formYsh.xypj = ''
            this.pageL = 1
            this.audited(1)
          } else {
            this.formWsh.gsmc = ''
            this.formWsh.scale = ''
            this.formWsh.xypj = ''
            this.pageR = 1
            this.audited(2)
          }

          break
        default:
          break
      }
    },
    audited (index, type) {
      if (index == 1) {
        this.loading1 = true
      } else if (index == 2) {
        this.loading2 = true
      }
      let params = {
        jbxx_id: JSON.parse(this.data).jbxx_id,
        id: JSON.parse(this.data).thread_id, // 点击的节点的id
        ordername: '',
        order: ''
      }
      if (index == 1) {
        params.type = this.formYsh.type
        params.gsmc = this.formYsh.gsmc
        params.scale = this.formYsh.scale
        params.xypj = this.formYsh.xypj
        params.orand = this.formYsh.orand
        params.sixty = this.formYsh.sixty
        params.today = this.formYsh.today
        params.page = this.pageL
        params.rows = this.formYsh.rows
        params.order = this.formYsh.order
        params.ordername = this.formYsh.ordername
      } else {
        params.type = this.formWsh.type
        params.gsmc = this.formWsh.gsmc
        params.scale = this.formWsh.scale
        params.xypj = this.formWsh.xypj
        params.orand = this.formWsh.orand
        params.sixty = this.formWsh.sixty
        params.today = this.formWsh.today
        params.page = this.pageR
        params.rows = this.formWsh.rows
        params.order = this.formWsh.order
        params.ordername = this.formWsh.ordername
      }
      this.axios.post('/index/thread/audited', params, data => {
        if (index == 1) {
          this.loading1 = false
        } else if (index == 2) {
          this.loading2 = false
        }
        if (data.status == 'success') {
          if (params.type == 1) {
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
              this.audited(1)
            } else {
              this.tableDataFirst = []
              this.totalL = 0
              this.pageL = 1
            }
          } else {
            if (params.page > 1) {
              this.pageR = params.page - 1
              this.audited(2)
            } else {
              this.noTableDataFirst = []
              this.totalR = 0
              this.pageR = 1
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
