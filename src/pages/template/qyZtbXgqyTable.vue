<!--  -->
<template>
  <div class="qyZtbXgqyTable">
    <div style="margin-bottom:20px">
      <el-row>
        <el-col :span="19">
          <el-input clearable placeholder="请输入" @keyup.enter.native="searchXgqyTable" @clear="searchXgqyTable" style="width:300px" v-model="companyList.searchXgqy"></el-input>
          <el-select style="width:150px;" v-model="searchName" @change="chooseRyGs" placeholder="请搜索人员" v-if="from=='zj'" clearable>
            <el-option v-for="item in personListExist" :key="item.user_name" :label="item.user_name" :value="item.user_id"></el-option>
          </el-select>
          <el-button @click="searchXgqyTable" type="primary">搜索</el-button>
          <el-button @click="resetInput">重置</el-button>
          <el-select style="width:160px;margin-left:20px;" v-model="fxrName" v-if="ownOrOtherAddSta=='自己添加企业'&&share != 1 && from=='zj'" @change="batchChooseFxr" placeholder="请选择分配的人员">
            <el-option v-for="item in personList" :key="item.user_id" :label="item.user_name" :value="item.user_id"></el-option>
          </el-select>
          <el-button v-if="ownOrOtherAddSta=='自己添加企业'&&share != 1 && from=='zj'" type="success" @click="allChooseFxr">批量分配</el-button>

        </el-col>
        <el-col :span="5">
          <div v-if="myForm.name== 'zj'&&share != 1" style=" text-align: right;">
            <div>
              <el-radio-group v-model="ownOrOtherAddSta" @change="changeTableT">
                <el-radio-button label="自己添加企业"></el-radio-button>
                <el-radio-button label="外部添加企业"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table :data="companyList.data" v-loading="companyList.loading" @selection-change="selectionFxr" border style="width: 100%" @sort-change="fn_sortable">
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column label="序号" type="index" align="center" width="60">
        <template slot-scope="scope">{{scope.$index+(companyList.page-1)*10+1}}</template>
      </el-table-column>
      <el-table-column prop="qymc" label="企业名称" align="center" min-width="250">
        <template slot-scope="scope">
          <p style="color:#409efe;cursor: pointer;" @click="openGs(scope.row)">{{scope.row.qymc}}</p>
        </template>
      </el-table-column>
      <el-table-column label="找到我" align="center" min-width="400">
        <template slot-scope="scope">
          <lookMe :key="scope.$index+(companyList.page-1)*10+1" :arr="scope.row"></lookMe>
        </template>
      </el-table-column>
      <el-table-column v-if="myForm.name =='zj'&&share != 1&&ownOrOtherAddSta=='自己添加企业'" align="center" label="分析人" min-width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.status != 0">{{scope.row.analyst_name?scope.row.analyst_name:'/'}}</span>
          <span v-else-if="!scope.row.analyst_name || scope.row.analyst_name =='分析人'" class="link_color" @click="dialogVisibleFxrChoose= true;chooseAnalyst(scope.row)">选人</span>
          <span v-else-if="scope.row.analyst_name" class="link_color" @click="dialogVisibleFxrChoose= true;chooseAnalyst(scope.row)">{{scope.row.analyst_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加人" align="center" min-width="80" v-if="ownOrOtherAddSta=='外部添加企业'">
        <template slot-scope="scope">
          <span class="link_color">{{scope.row.add_user_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" min-width="90" sortable="custom">
        <template slot-scope="scope" v-if="myForm.name =='zj'&&share != 1">
          <span v-if="scope.row.status == 1" :class="throughYes1" @click="xgqyThrough(scope.row)"></span>
          <span v-if="scope.row.status == 2" :class="throughNo2" @click="xgqyThroughNo(scope.row)"></span>
          <span v-if="scope.row.status == 0">/</span>
        </template>
        <el-table-column v-if="myForm.name =='wb'||share == 1" label="通过" align="center" min-width="90">
          <template slot-scope="scope">
            <span :class="scope.row.status == 1?throughYes:throughNo" @click="xgqyThrough(scope.row)"></span>
          </template>
        </el-table-column>
        <el-table-column v-if="myForm.name =='wb' ||share == 1" label="不通过" align="center" min-width="90">
          <template slot-scope="scope">
            <span :class="scope.row.status == 2?throughNo2:throughNo1" @click="xgqyThroughNo(scope.row)"></span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="请求状态" v-if="share != 1" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{scope.row.coop_status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" align="center" min-width="80" v-if="searchName">
        <template slot-scope="scope">
          <span :class="scope.row.cate=='自己' ? 'cate_zj' : ''">{{scope.row.cate=='自己' ? '自建' :  scope.row.cate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openJzdsfxwb(scope.row)">查看</el-button>
          <el-button type="danger" @click="delateXgqy(scope.row)" size="mini" v-if="scope.row.edit==1">删除</el-button>
          <!-- <el-button type="danger" @click="delateXgqy(scope.row)" size="mini" disabled v-else-if="ownOrOtherAddSta=='外部添加企业'">删除</el-button> -->
          <!-- <el-button type="danger" @click="delateXgqy(scope.row)" size="mini" v-else>删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="handleCurrentChangeXgqy" :current-page.sync="companyList.page" layout="total, prev, pager, next" :total="companyList.count||0"></el-pagination>
    <div id="add" v-if="ownOrOtherAddSta == '自己添加企业'">
      <span style="color:#33cc33;font-size:60px;margin-bottom:20px" @click="openAdd" class="el-icon-circle-plus"></span>
    </div>
    <!-- 下拉 弹框  选择分析人 -->

    <el-dialog :title="analystTitle" :visible.sync="dialogVisibleFxrChoose" width="60%">
      <div v-if="companyList.selectRList != ''" style="margin-top:-30px">
        <h3>推荐人</h3>
        <div class="choosePerson" style="display:flex">
          <p>
            <span>姓名:</span>
          </p>
          <div style="width:20%;text-align: center;">{{companyList.selectRList[0].user_name}}</div>
          <div style="width:50%;margin:  0 30px">
            <span v-if="!companyList.selectRList[0].path">
              <img v-if="companyList.selectRList[0].avatar" :src="companyList.selectRList[0].avatar" style="height:30px;width:30px;border-radius:15px;margin-left: 10px;" alt />
              <span v-else>请提高你的圈成文化</span>
            </span>
            <span v-else>
              <lookMe :key="new Date().getTime()" v-if="companyList.selectRList[0].path" :arr="companyList.selectRList[0]" :off="true"></lookMe>
            </span>
          </div>
          <!-- <div style="width:10%;text-align: center;" @click="chooseFxr(companyList.selectRList[0])">
            <el-radio v-model="radio" label="0">选择</el-radio>
          </div>-->
          <el-button v-if="!companyList.selectRList[0].choice" type="primary" size="mini" @click="chooseFxr(companyList.selectRList[0])">选择</el-button>
          <el-button v-else type="primary" size="mini" disabled>已选</el-button>
        </div>
        <h3>可选人员</h3>
        <div v-for=" (item,index) in companyList.selectRList" :key="index">
          <div v-if="companyList.selectRList.length >1">
            <div v-if="index != 0" style="display:flex" class="choosePerson">
              <p>
                <span>姓名:</span>
              </p>
              <div style="width:20%;text-align: center;">{{item.user_name}}</div>
              <div style="width:50%;margin:  0 30px;">
                <span v-if="!item.path">
                  <img v-if="item.avatar" :src="item.avatar" style="height:30px;width:30px;border-radius:15px;margin-left:10px" alt />
                  <span v-else>请提高你的圈成文化</span>
                </span>
                <span v-else>
                  <lookMe :key="new Date().getTime()" v-if="item.path" :arr="item" :off="true"></lookMe>
                </span>
              </div>
              <el-button v-if="!item.choice" type="primary" size="mini" @click="chooseFxr(item)">选择</el-button>
              <el-button v-else type="primary" size="mini" disabled>已选</el-button>
            </div>

            <!-- <div style="width:10%;text-align: center;" @click="chooseFxr(item)">
              <el-radio v-model="radio" :label= "index">选择</el-radio>

            </div>-->
          </div>
          <div v-else>
            <p style="width:100%;text-align:center;height:200px;line-height:200px">没有人员可供选择</p>
          </div>
        </div>
      </div>
      <div v-else style="margin-top:-30px">
        <p class="fxrChoose link_color" @click="backFxr ">没有人员可供选择</p>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleFxrChoose = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleFxrChoose = false;chooseFxr()">确 定</el-button>
      </span>-->
    </el-dialog>

    <el-dialog :title="companyList.selectData.qymc" :visible.sync="dialogTableVisible1">
      <div v-if="companyList.selectData.status == 1" class="myTkHeader" style="margin-top:-30px">
        <!-- <div v-for="item in companyList.selectMsgData" :key="item.gs_id"> -->
        <div v-if="companyList.selectMsgData">
          <div style="height:100px">
            <div style="height:30px;line-height:30px;display:flex;margin-bottom:20px">
              <img style="height:30px;width:30px;border-radius:15px;" :src="companyList.selectMsgData.avatar" alt />
              <p style="height:30px;line-height:30px;color:#b79bd5;margin-left:10px">{{companyList.selectMsgData.user_name}}</p>
              <p style="height:30px;line-height:30px;color:#b79bd5">({{companyList.selectMsgData.modified}})</p>
            </div>
            <div>
              <p style="margin:0 0 20px 50px">{{companyList.selectMsgData.words}}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="height:100px">
            <div style="height:30px;line-height:30px;display:flex;margin-bottom:20px"></div>
            <div>
              <p style="margin:0 0 20px 50px">没有留言</p>
            </div>
          </div>
        </div>
        <!-- <div v-else style="height:100px;line-height:100px;text-aglin:center;">主人很懒！ 什么都没有留下</div> -->
      </div>
      <!-- </div> -->
      <div class="Tkfooter" v-if="myForm.name != 'zj'||share == 1">
        <el-input type="textarea" clearable v-model="companyList.words" placeholder="请输入"></el-input>
        <div style="text-align:center;margin-top:20px">
          <el-button type="danger" @click="cancelTg1">取消</el-button>
          <el-button @click="throughXm" type="success">通过</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog :title="companyList.selectData.qymc" :visible.sync="dialogTableVisible2">
      <div v-if="companyList.selectData.status == 2" class="myTkHeader" style="margin-top:-30px">
        <div v-if="companyList.selectMsgData">
          <div style="height:100px">
            <div style="height:30px;line-height:30px;display:flex;margin-bottom:20px">
              <img style="height:30px;width:30px;border-radius:15px;" :src="companyList.selectMsgData.avatar" alt />
              <p style="height:30px;line-height:30px;color:#b79bd5;margin-left:10px">{{companyList.selectMsgData.user_name}}</p>
              <p style="height:30px;line-height:30px;color:#b79bd5">({{companyList.selectMsgData.modified}})</p>
            </div>
            <div>
              <p style="margin:0 0 20px 50px">{{companyList.selectMsgData.words}}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="height:100px">
            <div style="height:30px;line-height:30px;display:flex;margin-bottom:20px"></div>
            <div>
              <p style="margin:0 0 20px 50px">没有留言</p>
            </div>
          </div>
        </div>
      </div>

      <!-- <div v-else style="height:100px;line-height:100px;text-aglin:center;">主人很懒！ 什么都没有留下</div> -->
      <div class="Tkfooter" v-if="myForm.name != 'zj'||share == 1">
        <el-input type="textarea" clearable v-model="companyList.words" placeholder="请输入"></el-input>
        <div style="text-align:center;margin-top:20px">
          <el-button @click="cancelTg2" type="danger">取消</el-button>
          <el-button @click="throughXmNo" type="primary">不通过</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import lookMe from './lookMe'
export default {
  name: 'qyZtbXgqyTable',
  components: {
    lookMe
  },
  data() {
    return {
      share: '',
      companyList: {
        loading: true,
        analyst_id: '',
        analyst_name: '',
        status: '',
        searchXgqy: '',
        words: '',
        cate: '个人',
        qymc: '',
        loading: true,
        type: 'own',
        page: 1,
        rows: 10,
        count: 0,
        pro_type: '',
        data: [],
        selectRList: [],
        activeColor: 'activeColor',
        normalColor: 'normalColor',
        tableData: [],
        selectData: {},
        selectMsgData: []
      },
      tableData: [],
      throughNo: 'el-icon-success pointer',
      throughNo1: 'el-icon-error pointer',
      throughNo2: 'el-icon-error pointer_finish2',
      throughYes: 'el-icon-success pointer_finish',
      throughYes1: 'el-icon-success pointer_finish',
      dialogVisibleFxrChoose: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      analystTitle: '',
      ownOrOtherAddSta: '自己添加企业',
      //批量选择分析人
      personList: [],
      personListExist: [], //已分配的人员
      fxrName: '',
      searchName: '',
      fxrGsList: [],
      batchFxr: {},
      role: {},
      from: ''
    }
  },
  props: ['myForm', 'my_pro_type'],
  watch: {
    my_pro_type(val) {
      this.companyList.pro_type = val
    }
  },
  created() {
    this.share = localStorage.getItem('share')
    this.companyList.pro_type = this.my_pro_type
    this.user_id = localStorage.getItem('user_id')
    this.from = this.$route.query.name
    this.thisPageName = this.$route.name
    if (this.thisPageName == 'qyztbDetails') {
      this.companyList.cate = '个人'
    } else {
      this.companyList.cate = '企业'
    }
    // console.log(this.companyList.cate)
    this.fn_role()
    this.searchRoleList()
    this.getCompanyList()
    this.chooseAllAnalyst()
  },
  methods: {
    fn_sortable(param) {
      //状态排序
      let order = ''
      if (param.order == 'ascending') {
        order = 'asc'
      } else if (param.order == 'descending') {
        order = 'desc'
      }
      this.companyList.orderBy = order
      this.companyList.page = 1
      this.searchXgqyTable()
    },
    searchRoleList() {
      //获取已分配的人员
      let obj = {
        service_id: this.myForm.service_id,
        jbxx_id: this.myForm.jbxx_id,
        cate: this.companyList.cate,
        type: this.companyList.type //自建 还是外部
      }
      this.axios.post('/relation/pro_details/searchRoleList', obj, data => {
        this.personListExist = data.rows || []
      })
    },
    chooseRyGs() {
      //通过人员筛选公司
      this.companyList.analyst_name = this.searchName
      this.searchXgqyTable()
    },
    xgqyThrough(row, num) {
      this.companyList.loading = true
      let obj = {
        id: row.id,
        jbxx_id: this.myForm.jbxx_id,
        gs_id: row.gs_id,
        status: 1
      }
      this.axios.post('/relation/pro_details/compWords', obj, data => {
        this.companyList.selectMsgData = data.rows
      })
      this.dialogTableVisible1 = true
      this.companyList.selectData = row
      this.companyList.selectData.num = num
      this.getCompanyList()
    },
    xgqyThroughNo(row, num) {
      this.companyList.loading = true
      let obj = {
        id: row.id,
        jbxx_id: this.myForm.jbxx_id,
        gs_id: row.gs_id,
        status: 2
      }
      this.axios.post('/relation/pro_details/compWords', obj, data => {
        this.companyList.selectMsgData = data.rows
      })
      this.dialogTableVisible2 = true

      this.companyList.selectData = row
      this.companyList.selectData.num = num
      this.getCompanyList()
    },
    cancelTg2() {
      this.companyList.words = ''
      this.dialogTableVisible2 = false
    },
    cancelTg1() {
      this.companyList.words = ''
      this.dialogTableVisible1 = false
    },
    throughXm(row) {
      this.companyList.loading = true
      let obj = {
        jbxx_id: this.myForm.jbxx_id,
        user_id: this.user_id,
        id: this.companyList.selectData.id,
        cate: this.companyList.cate,
        qymc: this.companyList.qymc,
        type: 2,
        status: 1,
        words: this.companyList.words
      }
      this.axios.post('/relation/pro_details/editComp', obj, data => {
        this.companyList.data = data.rows
        this.companyList.count = data.total || 0
        this.dialogTableVisible1 = false
        this.companyList.words = ''
        this.getCompanyList()
      })
    },
    throughXmNo() {
      this.companyList.loading = true
      let obj = {
        jbxx_id: this.myForm.jbxx_id,
        user_id: this.user_id,
        id: this.companyList.selectData.id,
        cate: this.companyList.cate,
        qymc: this.companyList.qymc,
        type: 2,
        status: 2,
        words: this.companyList.words
      }
      this.axios.post('/relation/pro_details/editComp', obj, data => {
        this.companyList.data = data.rows
        this.companyList.count = data.total || 0
        this.dialogTableVisible2 = false
        this.companyList.words = ''
        this.getCompanyList()
      })
    },
    backFxr() {
      //返回业务圈
      this.$router.push({
        path: '/personalCircle'
      })
    },
    batchChooseFxr() {
      this.personList.forEach(item => {
        if (item.user_id == this.fxrName) {
          this.batchFxr = item
        }
      })
    },
    allChooseFxr() {
      if (this.fxrGsList.length) {
        if (this.fxrName) {
          this.chooseFxr(1)
        } else {
          this.$message.error('请选择分析人')
        }
      } else {
        this.$message.error('请选择公司')
      }
    },
    selectionFxr(val) {
      this.fxrGsList = val
      if (this.fxrGsList.length >= 1) {
        let arr = []
        this.fxrGsList.forEach(item => {
          arr.push(item.id)
        })
        this.fxrGsList = arr.join(',')
      } else {
        this.fxrGsList = []
      }
    },
    searchXgqyTable() {
      this.path = [] // 重置 找到我 静态渲染效果
      this.companyList.loading = true
      let obj = {
        service_id: this.myForm.service_id,
        jbxx_id: this.myForm.jbxx_id,
        user_id: this.user_id,
        pro_type: this.companyList.pro_type,
        cate: this.companyList.cate,
        qymc: this.companyList.searchXgqy,
        type: this.companyList.type,
        name_id: this.companyList.analyst_name,
        order: this.companyList.orderBy ? 'status' : '',
        orderBy: this.companyList.orderBy,
        page: 1,
        rows: 10
      }
      this.axios.post('/relation/pro_details/companyList', obj, data => {
        this.companyList.loading = false
        this.companyList.data = data.rows
        this.companyList.count = data.total || 0
        for (let i = 0; i < this.companyList.data.length; i++) {
          this.$set(this.companyList.data[i], 'selectName', '')
        }
      })
    },
    resetInput() {
      // this.$confirm("此操作将重置搜索, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      this.companyList.searchXgqy = ''
      this.companyList.loading = true
      this.companyList.analyst_name = ''
      this.searchName = ''
      this.getCompanyList()
      // })
      // .catch(() => {
      //   this.$message.info("已取消");
      // });
    },
    changeTableT(val) {
      this.fxrName = ''
      this.batchFxr = ''
      this.searchName = ''
      this.companyList.analyst_name = ''
      this.companyList.searchXgqy = ''
      this.companyList.page = 1
      this.companyList.loading = true
      if (val == '自己添加企业') {
        this.companyList.type = 'own'
      } else {
        this.companyList.type = 'other'
      }
      this.getCompanyList()
      this.searchRoleList()
    },
    chooseAllAnalyst() {
      let obj = {
        all: '全部',
        user_id: this.user_id,
        // analyst_id: row.analyst_id,
        service_id: this.myForm.service_id,
        cate: this.companyList.cate
      }
      this.axios.post('/relation/pro_details/analyst', obj, data => {
        this.personList = data.rows || ''
      })
    },
    chooseAnalyst(row) {
      this.analystTitle = row.qymc
      this.chooseFxrId = row.id
      this.radio = ''
      let obj = {
        service_id: '', //this.myForm.service_id,
        gs_id: row.gs_id,
        user_id: this.user_id,
        // analyst_id: row.analyst_id,
        cate: '个人' //this.companyList.cate
      }
      this.axios.post('/relation/pro_details/analyst', obj, data => {
        this.companyList.selectRList = data.rows || ''
      })
    },
    delateXgqy(row) {
      this.$confirm('此操作将删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.companyList.loading = true
          let obj = {
            service_id: this.myForm.service_id,
            jbxx_id: this.myForm.jbxx_id,
            user_id: this.user_id,
            gs_id: row.gs_id,
            id: row.id,
            cate: this.companyList.cate,
            qymc: this.companyList.qymc,
            type: 3,
            page: this.companyList.page,
            rows: this.companyList.rows
          }

          this.axios.post('/relation/pro_details/editComp', obj, data => {
            if (this.companyList.data.length == 1) {
              if (this.companyList.page > 1) {
                this.companyList.page = this.companyList.page - 1
              } else {
                this.companyList.page = 1
              }
            }
            this.getCompanyList()
          })
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    chooseFxr(row) {
      this.companyList.loading = true
      let myID
      let analyst_id
      let analyst_name
      if (row == 1) {
        myID = this.fxrGsList
        analyst_id = this.batchFxr.user_id
        analyst_name = this.batchFxr.user_name
      } else {
        myID = this.chooseFxrId
        analyst_id = row.user_id
        analyst_name = row.user_name
      }
      let obj = {
        id: myID,
        jbxx_id: this.myForm.jbxx_id,
        user_id: localStorage.getItem('user_id'),
        analyst_id: analyst_id,
        analyst_name: analyst_name,
        cate: this.companyList.cate,
        type: '2'
      }
      this.axios.post('/relation/pro_details/editComp', obj, data => {
        this.dialogVisibleFxrChoose = false
        this.radio = ''
        this.searchRoleList()
        this.getCompanyList()
      })
    },
    getCompanyList() {
      this.companyList.loading = true
      let obj = {
        service_id: this.myForm.service_id,
        jbxx_id: this.myForm.jbxx_id,
        user_id: this.user_id,
        pro_type: this.companyList.pro_type,
        cate: this.companyList.cate,
        qymc: this.companyList.qymc,
        type: this.companyList.type,
        page: this.companyList.page,
        rows: this.companyList.rows,
        name_id: this.companyList.analyst_name,
        order: this.companyList.orderBy ? 'status' : '',
        orderBy: this.companyList.orderBy
      }
      this.axios.post('/relation/pro_details/companyList', obj, data => {
        this.companyList.loading = false
        this.companyList.data = data.rows
        // this.tableData =  data.rows
        this.companyList.count = data.total || 0

        for (let i = 0; i < this.companyList.data.length; i++) {
          this.$set(this.companyList.data[i], 'selectName', '')
        }
      })
    },
    handleCurrentChangeXgqy(val) {
      this.companyList.loading = true
      this.companyList.page = val
      this.getCompanyList()
    },
    openAdd() {
      this.$emit('addMyXm')
    },
    //  权限控制 点击公司名称时
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
    openGs(row, model) {
      if (model === 2) {
        row.gs_id = row.id
        row.qymc = row.company_name
      }
      if (this.role.company_role !== 'C') {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.qymc}`
        })
        window.open(href, '公司详情' + row.gs_id)
      } else {
        this.axios.post(
          '/index/mine/roleCompSource',
          { gs_id: row.gs_id },
          res => {
            // 获取跳转页面结果
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
          }
        )
      }
    },
    openJzdsfxwb(val) {
      let obj = {
        name: this.myForm.name,
        own_id: val.user_id,
        xmmc: val.qymc ? val.qymc : '',
        service_id: val.service_id ? val.service_id : '',
        jbxx_id: val.jbxx_id ? val.jbxx_id : '',
        xmyz: val.xmyz ? val.xmyz : '',
        xmdq: val.xmdq ? val.xmdq : '',
        gs_id: val.gs_id,
        cate: '公司',
        share: ''
      }
      let routeData = this.$router.resolve({
        name: 'qyfwqWbDaletil',
        query: obj
      })
      //   window.open(routeData.href, val.qymc);
      window.open(routeData.href)
    }
  }
}
</script>
<style lang='less' scoped>
#myTkHeader {
  height: 400px;
}

.qyztbDetails {
  header {
    height: 60px;
    font-size: 25px;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid black;
  }
}
.myherder {
  display: block;
  width: 80%;
  margin: 0 auto;
}
#myID {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  word-break: break-all;
  font-size: 25px;
  text-align: center;
  border-bottom: 1px solid black;
}
#section {
  width: 70%;
  margin: 0 auto;
}
#add {
  width: 100%;
  text-align: center;
  span {
    display: inline-block;
    margin: 0 auto;
  }
}
.headerBtn {
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin-top: 20px;
  border-radius: 10;
  text-align: center;
  color: black;
  border: solid 1px #d5d5d5;
  font-size: 14px;
  cursor: pointer;
}
.headerColor {
  background-color: #409eff;
  color: white;
}
.NoColor {
  font-size: 14px;
  color: #f44c30;
  cursor: pointer;
}
.yesColor {
  cursor: pointer;
  font-size: 14px;
  color: #409eff;
}
.activeColor {
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  background-color: #409eff;
  color: white;
  cursor: pointer;
}
.normalColor {
  background-color: white;
  color: black;
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  width: 120px;
  height: 40px;
  line-height: 40px;

  cursor: pointer;
}
.Tkfooter {
  text-align: right;
}
.trueBtn {
  color: #67c23a;
  cursor: pointer;
  font-size: 20px;
}
.falseBtn {
  color: #f56c6c;
  cursor: pointer;
  font-size: 20px;
}
.pointer {
  cursor: pointer;
  font-size: 18px;
}
.pointer_finish {
  font-size: 18px;
  cursor: pointer;
  color: #67c23a;
}
.pointer_finish2 {
  font-size: 18px;
  cursor: pointer;
  color: #f78989;
}
.pointer1 {
  cursor: pointer;
  font-size: 12px;
}
.pointer_finish1 {
  cursor: pointer;
  color: #67c23a;
  font-size: 12px;
}
.lookFor {
  cursor: pointer;
  color: #409eff;
  &:hover {
    color: #90c0f0;
  }
}
#share {
  display: flex;
  position: fixed;
  right: -210px;
  bottom: 50%;
  &:hover {
    transition: all 0.3s;
    right: 0;
  }
}
#share1 {
  position: fixed;
  right: 0px;
  bottom: calc(45%);
}
.choosePerson {
  margin: 20px 50px;
  height: 30px;
  line-height: 30px;
  background-color: #dfecec31;
  border-radius: 10px;
  div {
    p {
      margin-left: 10px;
    }
  }
}
.dialog-footer {
  text-align: center;
}
.lookForImg {
  vertical-align: middle;
  height: 30px;
  width: 30px;
  padding: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.cate_zj{
  color: #409eff;
}
.link_color {
  color: #409eff;
  cursor: pointer;
}
.fxrChoose {
  width: 100%;
  text-align: center;
  height: 400px;
  line-height: 400px;
  cursor: pointer;
}
.zzyqTj {
  color: #606266;
  font-size: 14px;
  margin-top: 10px;
  border: 1px solid #d5d5d5;
  padding: 5px;
}
.zzyqTjHeader {
  font-size: 12px;
  background-color: #ffffff;
}
.myPointer {
  cursor: pointer;
  font-size: 20px;
}
.roleNol {
  color: #f57272;
}
.roleAct {
  color: #409eff;
}
</style>