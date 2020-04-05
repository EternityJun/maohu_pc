<template>
  <div>
    <!-- 主列表 -->
    <div>
      <!--第一排 搜索框和添加按钮-->
      <el-row>
        <el-row style="line-height:30px;">
          <div>
            <span style="font-size: 20px">我的好友</span>
          </div>
        </el-row>
        <el-row style="margin-top:-15px;">
          <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
            <el-form-item label="人员名称">
              <el-input v-model="searchName" clearable placeholder="请输入人员名称" @keyup.enter.native="searchFriend" @clear="searchFriend"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchFriend">搜索</el-button>
              <el-button type @click="onreset">重置</el-button>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="success" @click="addVisible=true">好友添加</el-button>
              <el-badge v-if="count!=0" :value="count" class="item">
                <el-button type="primary" @click="openApply">好友申请</el-button>
              </el-badge>
              <el-button v-if="count==0" type="primary" @click="openApply">好友申请</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-row>
      <!--表格-->
      <div style="margin-top:-15px;">
        <el-table :data="dataList" style="width: 100%" v-loading="isloading" border :row-style="rowH">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(page-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="card_name" label="人员名称" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClickRyList(scope.row)">{{scope.row.card_name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="phone_one" label="电话号码" width="200" align="center"></el-table-column>
          <el-table-column prop="comp_name" label="公司名称" align="center"></el-table-column>
          <el-table-column prop="comp_duty" label="职位" width="200" align="center"></el-table-column>
          <el-table-column width="200" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination style="margin-top:20px" align="right" @current-change="servicehandleCurrentChange2" :current-page.sync="page" :page-size="10" background layout="total,prev, pager, next" :total="total"></el-pagination>
    </div>
    <!-- 添加窗口 -->
    <el-dialog title="添加" :visible.sync="addVisible" width="60%" top="2vh">
      <div style="padding:0 20px">
        <el-form :label-position="'right'" label-width="80px">
          <el-form-item label="人员名称">
            <el-input v-model="addName" clearable placeholder="请输入人员名称"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="addPhone" clearable placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="addService" style="margin-right:30px">立即添加</el-button>
            <el-button @click="addVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!--处理好友申请窗口-->
    <el-dialog title="好友申请" :visible.sync="applyVisible" width="60%" top="2vh">
      <div style="padding:0 20px">
        <!--第一排 搜索-->
        <div>
          <el-input v-model="applySearch" clearable placeholder="请输入人员名称" style="width:400px;" @keyup.enter.native="searchApply" @clear="searchApply"></el-input>
          <el-button type="primary" @click="searchApply">搜索</el-button>
        </div>
        <!--第二排的表格-->
        <el-table :data="applyList" v-loading="applyLoading" border style="margin-top:10px;">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(applyPage-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="card_name" label="人员名称" width="120" align="center"></el-table-column>
          <el-table-column prop="phone_one" label="电话号码" width="130" align="center"></el-table-column>
          <el-table-column prop="comp_name" label="公司名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center" style="display:flex" width="380">
            <template slot-scope="scope">
              <el-select v-if="scope.row.status=='待接受'" clearable style="width:150px;margin-left:20px" v-model="status[scope.$index]" placeholder="请选择" :disabled="statuDisabled[scope.$index]">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" @click.native="openRemark(scope.$index,scope.row,$event)">
                </el-option>
              </el-select>
              <el-select v-if="scope.row.status!='待接受'" style="width:150px;margin-left:20px" v-model="scope.row.status" disabled>
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-button size="mini" style="margin-left:30px" @click="delApply(scope.row)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="knowAllBtn" align="right" style="margin-top:10px" @current-change="applyCurrentChange" :current-page.sync="applyPage" :page-size="10" background layout="total,prev, pager, next" :total="count>100?100:count" :page-count="10"></el-pagination>
      </div>
    </el-dialog>

  </div>

</template>
 <script>
export default {
  name: "businessTrustMe",
  // props: ["data"],
  data() {
    return {
      isloading: false,
      searchName: "",
      dataList: [],
      total: 0,
      page: 1,
      addVisible: false, //添加窗口
      addName: "", //添加窗口 名称
      addPhone: "", //添加窗口 电话
      count: 0, //申请列表条数
      applyLoading: false, //申请loading
      applyPage: 1, //申请页数
      applyVisible: false, //申请窗口
      applySearch: "", //申请列表搜索值
      applyList: [],
      statusOptions: [
        {
          value: "1",
          label: "同意"
        },
        {
          value: "3",
          label: "不同意"
        }
      ],
      statuDisabled: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      status: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 列表数据
    getList() {
      this.isloading = true;
      this.axios.post(
        "/relation/User_Card/friendList",
        {
          user_id: this.$store.state.userInfo.user_id,
          name: this.searchName,
          cate: "my",
          page: this.page,
          status: 1,
          rows: 10
        },
        data => {
          this.count = data.count;
          if (data.status == "success") {
            this.dataList = data.rows;
            this.total = data.total;
          } else if (data.status == "failed" && this.page != 1) {
            this.page -= 1;
            this.getList();
          } else {
            if (this.page == 1) {
              this.dataList = [];
              this.total = 0;
            }
          }
          this.isloading = false;
        }
      );
    },
    // 搜索
    searchFriend(type) {
      this.page = 1;
      this.getList();
    },
    // 重置
    onreset() {
      this.page = 1;
      this.searchName = "";
      this.getList();
    },
    // 翻页
    servicehandleCurrentChange2(val) {
      this.page = val;
      this.getList();
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("是否确定删除该好友？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.post(
            "/relation/Person_Service/delUserUser",
            {
              user_id: this.$store.state.userInfo.user_id,
              id: row.con_id,
              type: "delete"
            },
            data => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加 提交添加数据
    addService() {
      if (!/^1[3456789]\d{9}$/.test(this.addPhone)) {
        this.$message.error("请输入正确的手机号码");
        return false;
      } else if (!this.addName) {
        this.$message.error("请填写人员名称");
        return false;
      } else {
        this.axios.post(
          "/relation/Person_Service/saveUserUserTemp",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            user_id: this.$store.state.userInfo.user_id,
            name: this.addName,
            tel: this.addPhone
          },
          data => {
            if (data.status == "success") {
              this.getList();
              this.addVisible = false;
              this.addName = "";
              this.addPhone = "";
              // if(data.message == "从回收站激活"){
              //   this.$message.success("手机号码与回收站号码重复，已从回收站恢复");
              // return false;
              // }
            } else {
              this.$message.error(data.message);
              return false;
              // if (data.message == "号码重复！") {
              //   this.$message.error("手机号码与已有号码重复，请重新输入");
              //   return false;
              // } else if (data.message == "不能添加自己！") {
              //   this.$message.error("不能添加自己，请重新输入");
              //   return false;
              // }
            }
          }
        );
      }
    },
    // 打开好友申请列表
    openApply() {
      this.applyVisible = true;
      this.applyStatus = [];
      this.getApply();
    },
    // 获取好友申请列表
    getApply() {
      this.applyLoading = true;
      //获取表格数据
      this.axios.post(
        "/relation/User_Card/friendList",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          user_id: this.$store.state.userInfo.user_id,
          page: this.applyPage,
          cate: "apply",
          name: this.applySearch,
          status: 1,
          rows: 10
        },
        data => {
          if (data.status == "success") {
            this.applyList = data.rows;
            this.count = data.count;
            // this.change.apply.remark = [];
          } else if (data.status == "failed" && this.applyPage != 1) {
            this.applyPage -= 1;
            this.getApply();
          } else {
            if (this.applyPage == 1) {
              this.count = 0;
              this.applyList = [];
            }
          }
          this.applyLoading = false;
        }
      );
    },
    // 搜索好友申请
    searchApply() {
      this.applyPage = 1;
      this.getApply();
    },
    // 好友申请翻页
    applyCurrentChange(val) {
      this.applyPage = val;
      // this.change.apply.savedRemark=[]
      this.getApply();
    },
    // 好友申请选择同意/拒绝
    openRemark(index, row, e) {
      // console.log(e.target.innerText);
      // 拒绝
      if (e.target.innerText == "不同意") {
        this.$confirm("是否拒绝该用户好友请求？", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.axios.post(
              "/relation/Person_Service/checkUserUser ",
              {
                login_user_id: this.$store.state.userInfo.user_id,
                source_id: this.$store.state.userInfo.user_id,
                temp_id: row.con_id,
                target_id: row.source_id,
                status: 3
              },
              data => {
                if (data.status == "success") {
                  this.$message.success("已拒绝");
                  this.getApply();
                  this.getList();
                }
              }
            );
          })
          .catch(() => {});
        // 同意
      } else if (e.target.innerText == "同意") {
        this.axios.post(
          "/relation/Person_Service/checkUserUser ",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            source_id: this.$store.state.userInfo.user_id,
            temp_id: row.con_id,
            target_id: row.source_id,
            target_name: row.card_name,
            status: 1
          },
          data => {
            if (data.status == "success") {
              this.$message.success("已同意");
              this.getApply();
              this.getList();
            }
          }
        );
      }
    },
    // 同意好友申请
    saveApply() {
      if (this.change.apply.thisRemark == "") {
        this.change.apply.thisRemark = this.change.apply.thisRemark2;
      }
      this.axios.post(
        "/relation/Person_Service/checkUserUser ",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          source_id: this.$store.state.userInfo.user_id,
          temp_id: this.change.apply.this_temp_id,
          target_id: this.change.apply.this_target_id,
          target_name: this.change.apply.this_target_name,
          remark: this.change.apply.thisRemark,
          status: 1
        },
        data => {
          if (data.status == "success") {
            this.$message.success("已保存");
            this.change.apply.remarkVisible = false;
            this.getApply();
            this.getList();
          }
          // this.change.apply.savedRemark[
          //   scope.$index
          // ] = this.change.apply.remark[scope.$index];
          // this.change.apply.remarkDisabled[index] = true;
          // this.change.apply.statuDisabled[index] = true;
          // this.getApply();
          // this.getData33();
        }
      );
    },
    // 删除好友申请列表
    delApply(row) {
      this.$confirm("是否确定删除该条申请？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.post(
            "/relation/Person_Service/delResUserTemp ",
            {
              id: row.con_id
            },
            data => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getApply();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击列表跳转至人员名片
    handleClickRyList(item) {
      let { href } = this.$router.resolve({
        path: "/personalCard",
        query: {
          target_id: item.target_id,
          card_name: item.card_name
        }
      });
      window.open(href, item.card_name + item.target_id);
    },
    // 个人服务号表格行高
    rowH() {
      return "height:65px;";
    }
  }
};
</script>
 <style lang="less" scoped>
</style>
 
 