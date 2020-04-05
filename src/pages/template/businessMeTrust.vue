<template>
  <div>
    <!-- 主列表 -->
    <div>
      <!--第一排 搜索框和添加按钮-->
      <el-row>
        <el-row style="line-height:30px;">
          <div>
            <span style="font-size: 20px">我信任的人</span>
          </div>
        </el-row>
        <el-row style="margin-top:-15px;">
          <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
            <el-form-item label="人员名称">
              <el-input v-model="searchName" clearable placeholder="请输入人员名称" @keyup.enter.native="searchTrustMe" @clear="searchTrustMe"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchTrustMe">搜索</el-button>
              <el-button type @click="onreset">重置</el-button>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="success" @click="addVisible=true">添加</el-button>
              <el-button type="info" @click="openRecovery">回收站</el-button>
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
    <!-- 回收站窗口 -->
    <!-- 我信任的-回收站窗口 -->
    <el-dialog title="回收站" :visible.sync="recVisible" width="90%" top="5vh">
      <div style="padding:0 20px">
        <el-table :data="recdataList" v-loading="recisShowLoad" border style="height:700px" @selection-change="handleSelectionChange" :row-style="rowH">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(recPage-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="card_name" label="人员名称" width="200" align="center">
            <!-- <template slot-scope="scope">
              <el-button type="text" @click="test(scope.row)">{{scope.row.card_name}}</el-button>
            </template> -->
          </el-table-column>
          <el-table-column prop="phone_one" label="电话号码" width="200" align="center"></el-table-column>
          <el-table-column prop="comp_name" label="公司名称" align="center"></el-table-column>
          <el-table-column prop="comp_duty" label="职位" width="200" align="center"></el-table-column>
          <el-table-column width="200" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="Edit('restore',scope)">恢复</el-button>
              <el-button type="danger" size="small" @click="Edit('delete',scope)">彻底删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-col :span="13">
            <transition name="el-zoom-in-top">
              <div style="margin-top:20px;" align="right" v-if="selections.length!==0">
                <el-button type="success" size="small" @click="Edit('restore')">批量恢复</el-button>
                <el-button type="danger" size="small" @click="Edit('delete')">批量删除</el-button>
              </div>
            </transition>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-pagination background :current-page.sync='recPage' @current-change="recoveryCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="recTotal"></el-pagination>
          </el-col>
        </el-row>
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
      recVisible: false, //回收站窗口
      recisShowLoad: false, //回收站loding
      recdataList: [], //回收站数据
      recTotal: 0,
      recPage: 1,
      selections: [], //回收站多选项
      inf_del: {} //回收站传递给后台的参数
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
        "/relation/User_Card/trustList",
        {
          user_id: this.$store.state.userInfo.user_id,
          name: this.searchName,
          cate: "my",
          page: this.page,
          status: 1,
          rows: 10
        },
        data => {
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
    searchTrustMe(type) {
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
      this.axios.post(
        "/relation/Person_Service/delUserUser",
        {
          user_id: this.$store.state.userInfo.user_id,
          id: row.con_id,
          type: "recover"
        },
        data => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getList();
        }
      );
    },
    //我信任的-添加 提交添加数据
    addService() {
      if (!/^1[3456789]\d{9}$/.test(this.addPhone)) {
        this.$message.error("请输入正确的手机号码");
        return false;
      } else if (!this.addName) {
        this.$message.error("请填写人员名称");
        return false;
      } else {
        this.axios.post(
          "/relation/Person_Service/saveUserUser",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            user_id: this.$store.state.userInfo.user_id,
            name: this.addName,
            tel: this.addPhone,
            add_type: "tel"
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
    //打开回收站
    openRecovery() {
      this.recPage = 1;
      this.getRecList();
      this.recVisible = true;
    },
    // 回收站数据
    getRecList() {
      this.recisShowLoad = true;
      this.axios.post(
        "/relation/User_Card/trustList",
        {
          user_id: this.$store.state.userInfo.user_id,
          cate: "my",
          page: this.recPage,
          status: 2,
          rows: 10
        },
        data => {
          if (data.status == "success") {
            this.recdataList = data.rows;
            this.recTotal = data.total;
          } else if (data.status == "failed" && this.recPage != 1) {
            this.recPage -= 1;
            this.getRecList();
          } else {
            if (this.recPage == 1) {
              this.recdataList = [];
              this.recTotal = 0;
            }
          }
          this.recisShowLoad = false;
        }
      );
    },
    //回收站分页按钮
    recoveryCurrentChange(val) {
      this.recPage = val;
      this.getRecList();
    },
    //批量选择
    handleSelectionChange(val) {
      this.selections = val; //保存所选内容
    },
    //回收站 点击恢复或彻底删除
    Edit(model, scope) {
      if (model == "delete") {
        this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.inf_del.type = model;
            // 单个操作
            if (scope) {
              this.inf_del = {
                id: scope.row.con_id,
                type: model
              };
            } else {
              // 批量操作
              let ids = "";
              this.selections.forEach((item, index) => {
                if (index === 0) {
                  ids += item.con_id;
                } else {
                  ids += "," + item.con_id;
                }
              });
              // ids = ids.split(",");
              this.inf_del = {
                id: ids,
                type: model,
                login_user_id: this.$store.state.userInfo.user_id
              };
            }
            this.axios.post(
              "/relation/Person_Service/delUserUser",
              this.inf_del,
              res => {
                this.getRecList();
                this.$message({
                  message: "已永久删除",
                  type: "info"
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
      } else {
        this.inf_del.type = model;
        // 单个操作
        if (scope) {
          this.inf_del = {
            id: scope.row.con_id,
            type: model
          };
        } else {
          // 批量操作
          let ids = "";
          this.selections.forEach((item, index) => {
            if (index === 0) {
              ids += item.con_id;
            } else {
              ids += "," + item.con_id;
            }
          });
          // ids = ids.split(",");
          this.inf_del = {
            id: ids,
            type: model,
            login_user_id: this.$store.state.userInfo.user_id
          };
        }
        this.axios.post(
          "/relation/Person_Service/delUserUser",
          this.inf_del,
          res => {
            this.getRecList(31);
            this.$message({
              message: "已恢复",
              type: "success"
            });
            this.getList();
          }
        );
      }
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
 
 