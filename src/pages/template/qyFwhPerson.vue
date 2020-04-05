<!--  -->
<template>
  <div class="qyFwhPerson">
    <div>
      <el-input style="width:300px" clearable   @keyup.enter.native="searchPerson()" v-model="ryfjData.ryName" placeholder="输入人员姓名"></el-input>
      <el-input style="width:300px" clearable   @keyup.enter.native="searchPerson()" v-model="ryfjData.ryZsh" placeholder="输入证书编号"></el-input>
      <el-button @click="addRyTable" type="success">直接添加</el-button>
      <el-button @click="searchPerson" type="primary">搜索</el-button>
    </div>
    <el-table
      style="margin-top:20px;width: 100%"
      v-loading="ryfjData.loading"
      :data="ryfjData.tableData"
    >
      <el-table-column type="index" label="序号" align="center" width="60">
        <template slot-scope="scope">{{scope.$index+(ryfjData.page-1)*10+1}}</template>
      </el-table-column>
      <el-table-column min-width="100" align="center" prop="name" label="人员名称">
        <template slot-scope="scope">
          <p v-if="scope.row.staff_base_id == 0">{{scope.row.name}}</p>
          <p
            v-else
            @click="openRenYuan(scope.row)"
            style="color:#409efe;cursor: pointer;"
          >{{scope.row.name}}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="执业或职业资格证明">
        <el-table-column min-width="100" align="center" prop="zjlx" label="证书名称"></el-table-column>
        <el-table-column min-width="100" align="center" prop="dj" label="证书级别/等级/岗位"></el-table-column>
        <el-table-column min-width="100" align="center" prop="zczsh" label="证书号"></el-table-column>
        <el-table-column min-width="100" align="center" prop="zczy" label="注册专业/专业/职称"></el-table-column>
      </el-table-column>
      <el-table-column min-width="100" align="center" prop="remind" label="提醒">
        <template slot-scope="scope">
          <p
            size="mini"
            @click="scope.row.remind != '未找到'?dialogVisiblezaijian = true:'',opDalatil(scope.row) ;"
            style=" cursor: pointer;"
            :class="scope.row.remind != '未找到'?tixiangColor:''"
          >{{scope.row.remind}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="100" align="center" prop="name" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.user_id == user_id &&scope.row.remind != '未找到'"
            size="mini"
            type="danger"
            @click="changeZs(scope.row,scope.$index);dialogVisibleHuanZhen=true"
          >换证</el-button>
          <el-button
            v-if="scope.row.user_id == user_id"
            size="mini"
            type="danger"
            @click="deleteReTable(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        @current-change="handleCurrentChangeyrfx"
        :current-page="ryfjData.page"
        layout="total, prev, pager, next"
        :total="ryfjData.count"
      ></el-pagination>
    </div>


    <!-- 换证 -->
    <el-dialog title="换证" :visible.sync="dialogVisibleHuanZhen" width="50%">
      <el-table :data="huanZhengList.data" border style="width: 100%;margin-top:-30px" >
        <el-table-column prop="name" label="姓名" align="center" width="100">
          <template slot-scope="scope">
            <span style="color:#409efe;cursor: pointer;" @click="openRenYuan(scope.row)">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="zjlx" label="证书名称" align="center" width="180"></el-table-column>
        <el-table-column prop="dj" label="等级" align="center"></el-table-column>
        <el-table-column prop="zczsh" label="证书号" align="center"></el-table-column>
        <el-table-column prop="zczy" label="注册专业" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.is_import == 1" disabled size="mini" type="primary" @click="chooseThis(scope.row)">选择</el-button>
            <el-button v-else size="mini" type="primary" @click="chooseThis(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleHuanZhen = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 在建 -->
    <el-dialog :title="remindName" :visible.sync="dialogVisiblezaijian" width="50%">
      <el-table :data="peopleBuild" border style="width: 100% ;margin-top:-30px">
        <el-table-column prop="xm" label="姓名" align="center" min-width="100">
          <template slot-scope="scope">
            <span style="color:#409efe;cursor: pointer;" @click="openRenYuan1(scope.row)">{{scope.row.xm}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="xmmc" label="项目名称" align="center" min-width="300">
          <template slot-scope="scope">
            <span style="color:#409efe;cursor: pointer;" @click="jupmOtherPage(scope.row)">{{scope.row.xmmc}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="qymc" align="center" label="企业名称" min-width="300"></el-table-column>
        <el-table-column prop="drjs" align="center" label="担任角色"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblezaijian = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog top='30px' title="人员搜索" :visible.sync="personSearchState" @close = 'closeDialog' width="80%">
        <personSearch v-if="personSearchState" ref="personSearch" @colsePensonDialog="colsePensonDialog" @getPersonList = 'getPersonList' :form = 'myForm' :personSearchData='personSearchData'></personSearch>
    </el-dialog>
  </div>
</template>

<script>
import personSearch from './personSearch.vue'
export default {
  name: "qyFwhPerson",
  components: {
    personSearch,
  },
  data() {
    return {
        addTableRowState: true,
        dialogVisiblezaijian: false,
        dialogVisibleHuanZhen: false,
         personSearchState:false,
        ryfjData: {
            loading: true,
            ryName: '',
            ryZsh: '',
            tableData: [],
            rows: 10,
            page: 1,
            count: 0
        },
        huanZhengList: {
            data: []
        },
        peopleBuild: [],
        remindName: '',
        user_id:'',
        tixiangColor:"link_color",
        personSearchData:{//搜索  子组件要的值
          ryName:'',
          ryZsh:""
        },
    };
  },
  props:['myForm'],
  created(){
        this.user_id = localStorage.getItem('user_id')
       this.getPersonList()
  },
  methods:{
    closeDialog(){
      this.ryfjData.ryName = ''
      this.ryfjData.ryZsh = ''
      this.personSearchData.ryName = ''
      this.personSearchData.ryZsh = ''
    },
    searchPerson(){
       this.personSearchData.ryName = this.ryfjData.ryName
      this.personSearchData.ryZsh = this.ryfjData.ryZsh
      this.personSearchState = true;
    },
      colsePensonDialog(){
          this.personSearchState = false
      },
    getPersonList() {
      let gs_id = localStorage.getItem('gs_id')
      let obj = {
        jbxx_id: this.myForm.jbxx_id,
        user_id: localStorage.getItem('user_id'),
        gs_id: this.myForm.gs_id,
        page: this.ryfjData.page,
        rows: this.ryfjData.rows,
        own_id: this.myForm.own_id
      }
      this.axios.post('/index/Laipi_Ry_Yj/PersonList', obj, data => {
        this.ryfjData.loading = false
        this.ryfjData.tableData = data.rows
        this.ryfjData.count = data.total || 0
        // console.log(data);
      })
    },
    openRenYuan(row) {
      // console.log(row);
      let { href } = this.$router.resolve({
        path: `/ryDet?login_service_id=${
          this.$route.query.login_service_id
        }&qymc=${this.$route.query.qymc}&gs_id=${row.gs_id}&name=${
          row.name
        }&staff_base_id=${row.staff_base_id ? row.staff_base_id : ''}`
      })
      window.open(href, '人员详情' + row.comp_base_id + row.name)
    },
    openRenYuan1(row) {
      // console.log(row);
      let { href } = this.$router.resolve({
        path: `/ryDet?login_service_id=${
          this.$route.query.login_service_id
        }&qymc=${this.$route.query.qymc}&gs_id=${row.gs_id}&name=${
          row.xm
        }&staff_base_id=${row.staff_base_id ? row.staff_base_id : ''}`
      })
      window.open(href, '人员详情' + row.comp_base_id + row.xm)
    },
    opDalatil(row) {
      // console.log(row.remind);
      this.remindName = row.remind
      // console.log(row)
      if (row.remind == '在建') {
        let obj = {
          gs_id: this.myForm.gs_id,
          staff_id: row.staff_id
        }
        this.axios.post('/firm/people/peopleBuild', obj, data => {
          this.peopleBuild = data.rows
          // console, log(data);
        })
      } else if (row.remind == '疑似在建') {
        let obj = {
          gs_id: this.myForm.gs_id,
          staff_id: row.staff_id
        }
        this.axios.post('/firm/people/peopleBuild', obj, data => {
          this.peopleBuild = data.rows
          // console, log(data);
        })
      }
    },
    changeZs(row, index) {
      // console.log(row);
      this.HuanZhengId = row.id
      let obj = {
        jbxx_id: this.myForm.jbxx_id,
        name: row.name,
        gs_id: this.myForm.gs_id,
        own_id: this.myForm.own_id
      }
      this.axios.post('/index/Laipi_Ry_Yj/replaceList', obj, data => {
        this.huanZhengList.data = data.rows
        // console, log(this.huanZhengList.data);
      })
    },
    chooseThis(row) {
      this.ryfjData.loading = true
      let obj = {
        id: this.HuanZhengId,
        zjlx: row.zjlx,
        zczy: row.zczy,
        zczsh: row.zczsh,
        dj: row.dj,
        zsyxq: row.zsyxq
      }
      this.axios.post('/index/Laipi_Ry_Yj/replacePerson', obj, data => {
        // console.log(data);
        this.dialogVisibleHuanZhen = false
        this.getPersonList()
      })
      this.HuanZhengId = ''
    },
    deleteReTable(row) {
      this.$confirm('此操作将删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.ryfjData.loading = true
          let obj = {
            id: row.id
          }
          this.axios.post('/index/Laipi_Ry_Yj/delPerson', obj, data => {
            if (this.ryfjData.tableData.length == 1) {
              if (this.ryfjData.page > 1) {
                this.ryfjData.page = this.ryfjData.page - 1
              } else {
                this.ryfjData.page = 1
              }
            }
            this.getPersonList()
          })
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    addRyTable() {
      if (this.ryfjData.ryName == '') {
        this.$message('请输入姓名')
      } else if (this.ryfjData.ryName.length < 2) {
        this.$message('姓名最少两个字')
      } else {
        this.ryfjData.loading = true
        let obj = {
          jbxx_id: this.myForm.jbxx_id,
          gs_id: this.myForm.gs_id,
          user_id: localStorage.getItem('user_id'),
          name: this.ryfjData.ryName,
          zczsh: this.ryfjData.ryZsh,
          own_id: this.myForm.own_id
        }
        this.axios.post('/index/Laipi_Ry_Yj/addPerson', obj, data => {
          if(data.status == 'success'){
             this.$message.success(data.message)
          } else{
             this.$message.error(data.message)
          }
          this.getPersonList()
          this.ryfjData.ryName = ''
          this.ryfjData.ryZsh = ''
        })
      }
    },
     jupmOtherPage(row) {
      window.open(
        `http://maohu.520coc.cn/#/yjDet?login_service_id=${
          this.$route.query.login_service_id
        }&qymc=${this.$route.query.qymc}&proj_id=${row.proj_id}&source=${
          row.source
        }`
      )
    },
    handleCurrentChangeyrfx(val) {
      this.ryfjData.loading = true
      this.ryfjData.page = val
      this.getPersonList()
    },
  }
};
</script>
<style lang='less' scoped>
.link_color {
  color: #409eff;
  cursor: pointer;
}
</style>