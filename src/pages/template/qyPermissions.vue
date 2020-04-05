<!--  -->
<template>
  <div class="qyPermissions">
    <el-table border :data="roleData" style="width: 100%;margin-bottom:20px">
      <el-table-column align="center" type="index" label="序号" width="60">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column align="center" prop="user_name" label="人员名称"></el-table-column>
      <el-table-column align="center" prop="cellphone" label="电话号码"></el-table-column>
      <el-table-column align="center" prop="role" width="200" label="状态">
        <template slot-scope="scope">
          <el-radio-group size="mini" v-model="scope.row.role" @change="changeBtnState(scope.row)">
            <el-radio-button label="个人"></el-radio-button>
            <el-radio-button label="所有"></el-radio-button>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80" label="操作">
        <template slot-scope="scope">
            <el-button  size="mini" type="danger" @click="sureDetelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="total,prev, pager, next"   @current-change="handleCurrentChangeList"  :current-page="roleList.page"
          :page-size="roleList.rows"   :total="roleList.count||0"></el-pagination> -->
    <div id="add">
      <span
        style="color:#33cc33;font-size:60px;margin-bottom:20px"
        @click="openAdd"
        class="el-icon-circle-plus"
      ></span>
    </div>

    <el-dialog width="80%" title="选择人员" :visible.sync="dialogTableVisible">
      <el-radio-group v-model="rolePerson.btnState" style="margin-top:-30px;"  @change="getRolePersonData">
        <el-radio-button :label="btn1Txt"></el-radio-button>
        <el-radio-button :label="btn2Txt"></el-radio-button>
      </el-radio-group>
         <!-- @row-dblclick="chooseTable" -->
           <!-- @selection-change="handleSelectionChange" -->
           <!-- :selectable="disabledCheck" -->
      <el-table
        border
        ref="multipleTable"
        v-loading="rolePerson.rolePersonLoading"
        :data="rolePersonData"
        tooltip-effect="dark"
        style="width: 100%;margin-top:20px;"
        >
        <!-- <el-table-column type="selection" width="55" ></el-table-column> -->
        <el-table-column type="index" label="序号" align="center" width="60">
          <template slot-scope="scope">{{scope.$index+(rolePerson.page-1)*10+1}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center" prop="user_name" min-width="200">
          <template slot-scope="scope">
            <p
              style="color:#409efe;cursor: pointer;"
            >{{scope.row.user_name}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="cellphone" align="center" label="电话" min-width="120"></el-table-column>
        <el-table-column prop="name" align="center" label="操作" min-width="80">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-if="scope.row.role == '0'"
              @click="chooseTable(scope.row)"
            >选择</el-button>
            <el-button v-else disabled size="mini" type="primary">已选择</el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="rolePerson.page"
          :page-size="rolePerson.rows"
          layout="total, prev, pager, next"
          :total="rolePerson.count||0"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "qyPermissions",
  data() {
    return {
      dialogTableVisible:false,
      roleData: [],
      roleList:{
          page:1,
          rows:10,
          count:0,
        roleLoading: true,
      },
      rolePersonData:[],
      rolePerson:{
           page:1,
           btnState:"",
            rows:10,
          count:0,
       rolePersonLoading:true,
      },
    cate:"",
    btn1Txt:"",
    btn2Txt:""
    };
  },
  props: ["myForm"],
  created() {
    if(this.$route.name == 'qyztbDetails'){
      this.cate = '个人'
         this.btn1Txt = '信任'
      this.btn2Txt = '我的好友'
      this.rolePerson.btnState = '信任'
    }else{
       this.cate = '企业'
         this.btn1Txt = '内部'
      this.btn2Txt = '外部'
      this.rolePerson.btnState = '内部'
    
    }
    this.getRoleData();
  },
  methods: {
    sureDetelete(row){
      let  txt = ''
      if(row.analyst){
        txt = "此人员被选中,已选的分析人也会被删除, 是否继续?"
      }else{
        txt = '此操作将删除该人员, 是否继续?'
      }
      this.$confirm(txt, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.detelete(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    detelete(row){
      let obj = {
        jbxx_id: this.myForm.jbxx_id,
        service: this.myForm.service_id,
        friend_id: row.user_id,
        type: 3,
      };
      this.axios.post("/relation/pro_details/saveRole", obj, data => {
        if (data.status == "success") {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        } else {
          this.$message({
            type: "danger",
            message: data.message
          });
        }
        this.getRoleData();
      });
    },
    openAdd() {
        this.dialogTableVisible = true;
        this.getRolePersonData()
    },
    chooseTable(row){
        let obj = {
            jbxx_id:this.myForm.jbxx_id,
            service_id:this.myForm.service_id,
            friend_id:row.user_id,
            type:1,
        }
        this.axios.post('/relation/pro_details/saveRole',obj,data=>{
            if(data.status == 'success'){
                this.$message.success(data.message)
            }else{
                 this.$message.error(data.message)
            }
            this.getRolePersonData()
            this.getRoleData()
        })
    },
    getRolePersonData(){
       this.rolePerson.rolePersonLoading = true
         let obj = {
           jbxx_id:this.myForm.jbxx_id,
            service_id: this.myForm.service_id,
            cate: this.cate,
            page:this.rolePerson.page,
            type:  this.rolePerson.btnState,
            name:this.rolePerson.name,
            rows:this.rolePerson.rows
        };
        this.axios.post('/relation/pro_details/roleUser',obj,data=>{
            this.rolePersonData = data.rows
            this.rolePerson.count = data.total||0
            this.rolePerson.rolePersonLoading = false
        })
    },
    handleCurrentChange(val){
      this.rolePerson.page = val
      this.getRolePersonData()
    },
    handleCurrentChangeList(val){
      this.roleList.page = val
      this.getRoleData()
    },
    changeBtnState(row) {
      //权限
      let obj = {
        jbxx_id: this.myForm.jbxx_id,
        service: this.myForm.service_id,
        friend_id: row.user_id,
        type: row.role == "个人" ? "1" : "2"
      };
      this.axios.post("/relation/pro_details/saveRole", obj, data => {
        if (data.status == "success") {
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          this.$message({
            type: "danger",
            message: data.message
          });
        }
        this.getRoleData();
      });
    },
    getRoleData() {
      //权限
      let obj = {
        service_id: this.myForm.service_id,
        jbxx_id: this.myForm.jbxx_id,
          page:this.roleData.page,
        // user_id: this.user_id,
        // cate: "个人",
        // type: "权限"
      };
      this.axios.post("/relation/pro_details/roleList", obj, data => {
        this.roleData = data.rows||[];
        this.roleList.count = data.total||0
        this.roleData.forEach(item => {
          if (item.type == 1) {
            this.$set(item, "role", "个人");
          } else {
            this.$set(item, "role", "所有");
          }
        });
      });
    },
  
  }
};
</script>
<style lang='less' scoped>
#add {
  width: 100%;
  text-align: center;
  span {
    display: inline-block;
    margin: 0 auto;
  }
}
</style>