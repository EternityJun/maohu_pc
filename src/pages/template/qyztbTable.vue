<!--  -->
<template>
  <div class="qyztbTable" v-loading='permissionsListLoading'>
    <div v-if="permissionsList.add_proj||permissionsList.check_wbyw">
      <header>
        <el-row>
          <el-col :span="10">
            <div>
              <div>
                <el-radio-group v-model="titleData" @change="titleChange">
                  <el-radio-button v-if="permissionsList.add_proj" label="自建项目"></el-radio-button>
                  <el-radio-button v-if="permissionsList.check_wbyw" label="外部项目"></el-radio-button>
                  <el-radio-button v-if="permissionsList.add_proj" label="回收站"></el-radio-button>
                </el-radio-group>
                <div v-if="titleData=='自建项目'&&permissionsList.add_proj" @click="addXm" :class="activeBtn">
                  <span>
                    <span class="el-icon-plus"></span>项目
                  </span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="14">
            <div id="seacherRow">
              <div>
                <el-input clearable style="width:300px;height:40px;margin-right:15px" @keyup.enter.native="searchTable()" @clear="searchTable()" v-model="proTableDta.search" placeholder="输入项目名称"></el-input>
              </div>
              <div>
                <el-button type="primary" @click="searchTable()">搜索</el-button>
                <el-button @click="clearInput()">重置</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </header>
      <el-table :data="tableData" v-loading="proTableDta.loading" border style="margin-top:10px;">
        <el-table-column type="index" label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+1+(proTableDta.page-1)*10}}</template>
        </el-table-column>
        <el-table-column prop="xmmc" label="项目名称" min-width="180" align="center">
          <template slot-scope="scope">
            <span @click="scope.row.zbxx_id?openGs(scope.row):''" :class="scope.row.zbxx_id?openColor:''">{{scope.row.xmmc}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="xmdq" label="项目地区" align="center"></el-table-column>
        <el-table-column prop="xmyz" label="项目业主" align="center"></el-table-column>

        <el-table-column prop="fw" label="请求服务项" align="center">
          <template slot-scope="scope">
            <span class="fwconcent" @click="openJzdsfx(scope.row)" style="  cursor: pointer;"> {{proTableDta.qqfwx}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="analyst_name" v-if="titleData == '外部项目'" label="请求人" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.analyst_name}}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="titleData == '自建项目'" label="权限" width="180" align="center">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.role" size="mini" @change="changeRowState(scope.row)">
              <el-radio-button label="圈内"></el-radio-button>
              <el-radio-button label="全域"></el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="titleData=='回收站'" type="primary" @click="deleteData(scope.row,'restore')" size="mini">恢复</el-button>
            <el-button type="danger" @click="deleteData(scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page="proTableDta.page" background layout="total,prev, pager, next" :total="proTableDta.count||0"></el-pagination>
      </div>
    </div>
    <div v-else>
      <div style="width:100%;height:300px;line-height:300px;text-align:center">
        您没有权限
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qyztbTable',
  data() {
    return {
      userRoleLoading: true, //权限  loading
      titleData: '自建项目', //自建项目和外部项目切换的状态
      clickArr: [], // 存取静态 圈内 ？ 全域
      activeBtn: 'changeBtnTxt active', //添加项目按钮的css
      proTableDta: {
        service_id: '',
        search: '',
        user_id: localStorage.getItem('user_id'),
        xmmc: '',
        loading: true,
        row: 10,
        page: 1,
        count: 0,
        qqfwx: '竞争对手分析',
        pageName: 'zj'
      }, //页面渲染的data
      // qyTableDta: {  //企业的data   渲染赋值给proTableDta
      //   service_id: "",
      //   search: "",
      //   user_id: localStorage.getItem("user_id"),
      //   xmmc: "",
      //   loading: true,
      //   row: 10,
      //   page: 1,
      //   count: 0,
      //   qqfwx: "竞争对手分析",
      //   pageName:"zj",
      // },
      // grTableDta: {//个人的data   渲染赋值给proTableDta
      //   search: "",
      //   user_id: localStorage.getItem("user_id"),
      //   pageName:"zj",
      //   loading: true,
      //   xmmc: "",
      //   row: 10,
      //   page: 1,
      //   count: 0,
      //   qqfwx: "竞争对手分析",
      //   role: ""
      // },
      tableData: [],
      openColor: 'link_color',
      thisPageName: '',
      nextPageName: '',
      permissionsListLoading: true,
      permissionsList: {}
    }
  },
  created() {
    this.userRoleLoading = true
    this.proTableDta.service_id = this.$route.query.login_service_id
    this.thisPageName = this.$route.name
    if (this.thisPageName == 'qyZtbPage') {
      // 根据 当前页面来判断 我的跳转页面
      // this.proTableDta = this.grTableDta;
      this.nextPageName = 'qyztbDetails'
    } else {
      // this.proTableDta = this.qyTableDta;
      if (this.titleData == '外部项目') {
        this.nextPageName = 'qyfwqWbDaletil'
      } else {
        this.nextPageName = 'qyfwqDaletil'
      }
    }
    this.getUserServiceRole()
    this.getProjectList()
  },
  methods: {
    changeRowState(row, name, index) {
      this.proTableDta.role = row.role
      this.proTableDta.jbxx_id = row.jbxx_id
      this.getiProjectSave(index)
    },
    getiProjectSave(index) {
      this.proTableDta.loading = true
      let obj = {
        service_id: this.proTableDta.service_id,
        jbxx_id: this.proTableDta.jbxx_id,
        user_id: this.proTableDta.user_id,
        role: this.proTableDta.role
      }
      this.axios.post('/index/project/projectSave', obj, data => {
        this.getProjectList()
        if (data.status === 'success') {
          this.$message.success(data.message)
          let arr = JSON.stringify(this.zzyqArr)
          localStorage.setItem('zzyqArr', arr)
          if (this.clickArr[index] === 0) {
            this.clickArr.splice(index, 1, 1)
          } else {
            this.clickArr.splice(index, 1, 0)
          }
          // this.getProjectList()
        } else {
          this.$message({
            message: data.message,
            type: 'danger'
          })
        }
      })
    },
    getUserServiceRole() {
      let obj = {
        service_id: this.proTableDta.service_id,
        user_id: localStorage.getItem('user_id')
      }
      this.axios.post('/relation/role/userServiceRole', obj, data => {
        this.permissionsListLoading = false
        this.permissionsList = data.message
        if (this.permissionsList.add_proj) {
          this.titleData = '自建项目'
          this.proTableDta.pageName = 'zj'
        } else {
          this.titleData = '外部项目'
          this.proTableDta.pageName = 'wb'
        }
        this.getProjectList()
        this.userRoleLoading = false
        // this.permissionsList.add_proj =true
        // console.log(data)
      })
    },
    addXm() {
      this.$emit('changeDialog')
    },
    deleteData(row,type) {
      let tips = '此操作将删除, 是否继续?'
      let del_status=1
      if (this.titleData == '自建项目') {
        tips = '此操作将删除该数据到回收站, 是否继续?'
        del_status=2
      } else if (this.titleData == '回收站') {
        tips = '此条数据将彻底删除, 是否继续?'
        del_status=0
      }
      if(type=='restore'){
        tips = '将数据恢复到自建项目，是否继续？'
        del_status=1
      }
      this.$confirm(tips, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.proTableDta.loading = true
          let obj = {
            jbxx_id: row.jbxx_id,
            user_id: this.$store.state.userInfo.user_id,
            // type: this.titleData,
            type: this.titleData == '回收站' ? '自建项目' : this.titleData,
            del_status: del_status
          }
          this.axios.post('/index/project/projectDelete', obj, data => {
            if (this.tableData.length == 1) {
              if (this.proTableDta.page > 1) {
                this.proTableDta.page = this.proTableDta.page - 1
              } else {
                this.proTableDta.page = 1
              }
            }
            this.getProjectList()
          })
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    titleChange(val) {
      if (val == '外部项目') {
        this.proTableDta.pageName = 'wb'
      } else {
        this.proTableDta.pageName = 'zj'
      }
      this.proTableDta.loading = true
      this.proTableDta.search = ''
      this.proTableDta.page = 1
      this.getProjectList()
    },
    getProjectList() {
      let obj = {
        service_id: this.proTableDta.service_id,
        user_id: this.proTableDta.user_id,
        xmmc: this.proTableDta.search,
        type: this.titleData == '回收站' ? '自建项目' : this.titleData,
        del_status: this.titleData != '回收站' ? 1 : 2,
        page: this.proTableDta.page
      }
      this.axios.post('/index/project/projectList', obj, data => {
        this.proTableDta.loading = false
        this.tableData = data.rows
        this.proTableDta.count = data.total || 0
        if (this.thisPageName == 'qyZtbPage') {
          // this.proTableDta = this.grTableDta;
          this.nextPageName = 'qyztbDetails'
        } else {
          // this.proTableDta = this.qyTableDta;
          if (this.titleData == '外部项目') {
            this.nextPageName = 'qyfwqWbDaletil'
          } else {
            this.nextPageName = 'qyfwqDaletil'
          }
        }
      })
    },
    clearInput() {
      this.proTableDta.loading = true
      this.proTableDta.search = ''
      this.proTableDta.page = 1
      this.getProjectList()
    },
    // 搜索
    searchTable() {
      this.proTableDta.loading = true
      this.proTableDta.page = 1 // 重置为第一页
      this.getProjectList()
    },
    handleCurrentChange(val) {
      this.proTableDta.loading = true
      this.proTableDta.page = val
      this.getProjectList()
    },
    openJzdsfx(val) {
      let obj = {
        name: this.proTableDta.pageName,
        xmmc: val.xmmc ? val.xmmc : '',
        company_id: val.company_id ? val.company_id : '',
        jbxx_id: val.jbxx_id ? val.jbxx_id : '',
        xmyz: val.xmyz ? val.xmyz : '',
        xmdq: val.xmdq ? val.xmdq : '',
        user_id: val.user_id ? val.user_id : '',
        login_user_id: localStorage.getItem('user_id'),
        service_id: val.service_id ? val.service_id : '',
        analyst_id: val.analyst_id ? val.analyst_id : ''
      }
      if (this.thisPageName == 'qyfwqPage') {
        obj.login_service_id = this.proTableDta.service_id
        obj.own_id = val.user_id
        obj.gsmc = localStorage.getItem('qymc')
        if (this.titleData == '外部项目') {
          obj.gs_id = val.gs_id
        }
      }
      let routeData = this.$router.resolve({
        name: this.nextPageName,
        query: obj
      })
      window.open(routeData.href, val.xmmc + this.titleData + this.thisPageName)
    },
    openGs(row) {
      let myPath
      if (this.thisPageName == 'qyfwqPage') {
        myPath = `/enterpriseDetails?zbxx_id=${
          row.id ? row.id : row.zbxx_id
        }&zbgs_id=&type=zbxx&xmmc=${
          row.bt ? row.bt : row.xmmc
        }&login_service_id=${this.$route.query.login_service_id}&gsmc=${
          this.$route.query.gsmc
        }&source=${row.source}`
      } else {
        myPath = `/enterpriseDetails?zbxx_id=${
          row.id ? row.id : row.zbxx_id
        }&zbgs_id=&type=zbxx&xmmc=${row.bt ? row.bt : row.xmmc}&source=${row.source}`
      }
      let { href } = this.$router.resolve({
        path: myPath
      })
      window.open(
        href,
        '招标信息' + row.id ? row.id : row.zbxx_id + row.bt ? row.bt : row.xmmc
      )
    }
  }
}
</script>
<style lang='less' scoped>
.qyztbTable {
  header {
    width: 100%;
  }
}
.changeBtnTxt {
  display: inline-block;
  text-align: center;
  height: 40px;
  width: 120px;
  line-height: 40px;
  cursor: pointer;
  vertical-align: middle;
}
.active {
  background-color: #4999ed;
  color: white;
  border-radius: 5px;
  height: 40px;
}
#seacherRow {
  display: flex;
  justify-content: flex-end;
}
.normal {
  background-color: white;
  color: black;
}
.fwconcent {
  color: #37b6eb;
}
</style>