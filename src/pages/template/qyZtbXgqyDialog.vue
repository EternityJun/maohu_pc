<!--  -->
<template>
  <div class="qyZtbXgqyDialog">
    <el-tabs v-model="activeName" @change="clearSelect" style="margin-top:-30px">
      <el-tab-pane label="企业列表" name="first">
        <div style="   margin-bottom: 20px;">
          <el-row>
            <el-col :span="5">
              <el-input
                v-model="CompanyList.qylbInput"
                placeholder="请输入"
                clearable
                @keyup.enter.native="qylbSearch"
                @clear="qylbSearch"
                style="width:300px"
              ></el-input>
            </el-col>
            <el-col :span="14">
              <div>
                <el-button @click="qylbSearch(1)" type="primary">搜索</el-button>
                <el-button @click="qylbClear">重置</el-button>
                <el-button @click="plChoose()" type="primary">批量操作</el-button>
              </div>
            </el-col>
            <el-col :span="5" style="text-align:right">
              <el-radio-group v-model="CompanyList.order" @change="qyListOrder">
                <el-radio-button label="默认排序"></el-radio-button>
                <el-radio-button label="关系排序"></el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
        <el-table
          border
          ref="multipleTable"
          v-loading="CompanyList.qylbLoading"
          :data="CompanyList.tableData"
          tooltip-effect="dark"
          @row-dblclick="chooseXgqyTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" :selectable="disabledCheck"></el-table-column>
          <el-table-column type="index" label="序号" align="center" width="60">
            <template slot-scope="scope">{{scope.$index+(CompanyList.qylPage-1)*10+1}}</template>
          </el-table-column>
          <el-table-column label="企业名称" align="center" prop="company_name" min-width="200">
            <template slot-scope="scope">
              <p
                style="color:#409efe;cursor: pointer;"
                @click="openGs(scope.row,2)"
              >{{scope.row.company_name}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="legal_person" align="center" label="法人代表" min-width="120"></el-table-column>

          <el-table-column
            prop="area"
            align="center"
            label="所属地区"
            min-width="80"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="social_code" align="center" label="统一社会信用代码" min-width="120"></el-table-column>
          <el-table-column label="找到我" align="center" min-width="180">
            <template slot-scope="scope">
              <lookMe
                :key="new Date().getTime()"
                :arr="scope.row"
                :off="true"
                :tkShow="true"
                :showTxt="showTxt"
              ></lookMe>
            </template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="操作" min-width="80">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                v-if="scope.row.status == '0'"
                @click="chooseXgqyTable(scope.row)"
              >选择</el-button>
              <el-button v-else disabled size="mini" type="primary">已选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            background
            @current-change="handleCurrentChangeQylb"
            :current-page="CompanyList.qylPage"
            :page-size="CompanyList.qylbRows"
            layout="total, prev, pager, next"
            :total="CompanyList.qylbCount||0"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="资质选择" name="second">
        <el-row>
          <el-col :span="6">
            <el-input @click.native="show_components()" placeholder="请选择" style="width:300px"></el-input>
          </el-col>
          <el-col :span="18">
            <div>
              <el-button @click="zzplChoose()" type="primary">批量操作</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row class="zzyqTj" v-if="1">
          <span class="zzyqTjHeader">条件</span>
          <div
            v-for="(item,index) in zzyqArr1"
            :key="index"
            style="color: #606266;font-size: 14px;margin-top:10px;"
          >
            <el-col :span="8">
              <p>{{index}}</p>
              <div style="margin:2px 0 0 10px;color: #888;" v-for="(tt,i) in item" :key="i">
                <div v-if="tt">
                  <p v-for="(it,ix) in tt" :key="ix">
                    {{ix}}
                    <span class="el-icon-close" @click="onClear(it,ix)"></span>
                  </p>
                </div>
              </div>
            </el-col>
          </div>
        </el-row>
        <div v-else>
          <p>还没有选择资质点击上方输入框选择</p>
        </div>
        <el-table
          :data="zzyqChooseListArray"
          v-loading="zzyqChooseLoading"
          @row-dblclick="chooseXgqyTable1"
          @selection-change="handleSelectionChange1"
          border
          style="width: 100%;margin-top:20px;"
        >
          <el-table-column type="selection" width="55" :selectable="disabledCheck"></el-table-column>
          <el-table-column type="index" align="center" label="序号" width="60">
            <template
              slot-scope="scope"
            >{{(scope.$index+1)+(zzyqChooseListPage-1)*zzyqChooseListRows}}</template>
          </el-table-column>
          <el-table-column prop="company_name" align="center" label="公司名称" min-width="220">
            <template slot-scope="scope">
              <p
                style="color:#409efe;cursor: pointer;"
                @click="openGs(scope.row,2)"
              >{{scope.row.company_name}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="legal_person" align="center" label="法人代表" min-width="100"></el-table-column>
          <el-table-column prop="area" align="center" label="所属地区" min-width="80"></el-table-column>
          <el-table-column prop="social_code" align="center" label="统一社会信用代码" min-width="180"></el-table-column>
          <el-table-column align="center" label="找到我" min-width="180">
            <template slot-scope="scope">
              <lookMe
                :key="new Date().getTime()"
                :arr="scope.row"
                :off="true"
                :tkShow="true"
                :showTxt="showTxt"
              ></lookMe>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="80">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="zzyqSave(scope.row)"
                v-if="scope.row.status == '0'"
              >选择</el-button>
              <el-button v-else disabled size="mini" type="primary">已选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handleCurrentChangezzyqList"
          :current-page="zzyqChooseListPage"
          layout="total,prev, pager, next"
          :page-size="zzyqChooseListRows"
          :total="zzyqChooseListCount||0"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-dialog
      title="资质选择"
      append-to-body
      width="900px"
      @close="hide_components()"
      :visible.sync="centerDialogVisible"
        >
      <zz-search  v-if="centerDialogVisible" @onSearch="onSearch"  ></zz-search>
    </el-dialog>-->
  </div>
</template>

<script>
import lookMe from "./lookMe";
import zzSearch from "./zzyqSearch";
export default {
  name: "qyZtbXgqyDialog",
  components: {
    lookMe,
    zzSearch
  },
  data() {
    return {
      centerDialogVisible: false,
      showTxt: true,
      activeName: "first",
      CompanyList: {
        idList: [],
        id: "",
        multipleSelection: [],
        qylbRows: 10,
        qylPage: 1,
        qylbLoading: true,
        qylbInput: "",
        pro_type: "",
        cate: "个人",
        order: "默认排序"
      },
      zzyqChooseLoading: true,
      zzyqChooseListArray: [],
      zzyqChooseListPage: 1,
      zzyqChooseListRows: 20,
      zzyqChooseListCount: 0,
      thisRowDataFile: {},
      zzyqArr: [],
      zzyqArr1: [],
      zzyqArr2: [],
      checked: false,
      role:{},
      share:""
    };
  },
  props: ["myForm", "my_pro_type",'basicInfo'],
  created() {
    this.share = localStorage.getItem('share')
    this.zzyqArr1 =
      localStorage.getItem("setzzSearchValue") != ""
        ? JSON.parse(localStorage.getItem("setzzSearchValue"))
        : [];
    this.zzyqArr2 = localStorage.getItem("setzzSearchValue_checked")
      ? JSON.parse(localStorage.getItem("setzzSearchValue_checked"))
      : [];
    this.user_id = localStorage.getItem("user_id");
    this.qylbSearch();
    this.searchQuali();
    this.fn_role();
  },
  methods: {
     zzyqSave (row) {
      this.zzyqChooseLoading = true;
      this.CompanyList.idList = row.id;
      this.CompanyList.id = row.id;
      this.$message({
        message: "选择成功",
        type: "success"
      });

      this.editComp();
    },
    onClear(value, value1) {
      this.zzyqChooseLoading = true;
      let nameArr = [];
      for (let item in this.zzyqArr1) {
        this.zzyqArr1[item].forEach((tt, ii) => {
          for (let item2 in tt) {
            if (tt[item2] == value) {
              this.zzyqArr2.forEach((ttt, iii) => {
                if (ttt == value) {
                  this.zzyqArr2.splice(iii, 1);
                }
                delete tt[item2];
                for (let tttt in tt) {
                  nameArr.push(tttt);
                }
                if (!nameArr.length) {
                  this.zzyqArr1[item].splice(ii, 1);
                }
              });
              if (this.zzyqArr1[item].length == 0) {
                delete this.zzyqArr1[item];
              }
              let obj = JSON.stringify(this.zzyqArr1);
              let obj1 = JSON.stringify(this.zzyqArr2);
              localStorage.setItem("setzzSearchValue", obj);
              localStorage.setItem("setzzSearchValue_checked", obj1);
              this.searchQuali();
            }
          }
        });
      }
    },
    show_components() {
      this.$emit("show_components");
    },
    onSearch(val) {
      this.zzyqArr1 = [];
      this.zzyqArr2 = [];
      this.zzyqArr1 =
        localStorage.getItem("setzzSearchValue") != ""
          ? JSON.parse(localStorage.getItem("setzzSearchValue"))
          : [];
      this.zzyqArr2 = localStorage.getItem("setzzSearchValue_checked")
        ? JSON.parse(localStorage.getItem("setzzSearchValue_checked"))
        : [];
      this.searchQuali();
    },
    //关闭zz组建弹框
    hide_components() {
      this.checked = false;
    },
    clearSelect() {
      this.CompanyList.idList = [];
      this.CompanyList.id = "";
      this.CompanyList.multipleSelection = [];
    },
    editComp(num) {
      let mycate;
      let myId;
      if (this.myForm.name == "zj") {
        mycate = "自己";
      }
      if (this.myForm.name == "zj" && this.share == 1) {
        if (this.basicInfo.user_id == localStorage.getItem("user_id")) {
          mycate = "自己";
          this.CompanyList.pro_type = "own";
        } else {
          mycate = "外部";
          this.CompanyList.pro_type = "other";
        }
      } else if (this.myForm.name == "wb" || this.share == 1) {
        mycate = "外部";
        this.CompanyList.pro_type = "other";
      }
      let obj = {
        id: this.CompanyList.id,
        service_id: this.myForm.service_id,
        jbxx_id: this.myForm.jbxx_id,
        user_id: localStorage.getItem('user_id'),
        pro_type: this.CompanyList.pro_type,
        gs_id: this.CompanyList.idList,
        analyst_id: this.CompanyList.analyst_id,
        analyst_name: this.CompanyList.analyst_name,
        status: this.CompanyList.status,
        words: this.CompanyList.words,
        cate: mycate,
        type: "1",
        source_id:this.$route.query.user_id,//项目所属人id

      };
      this.axios.post("/relation/pro_details/editComp", obj, data => {
        this.$emit("getXgqyList");
        this.qylbSearch();
        this.searchQuali();
      });
    },
    qyListOrder() {
      this.qylbSearch(1);
    },
    qylbSearch(num) {
      this.CompanyList.qylbLoading = true;
      if (num == 1) {
        this.CompanyList.qylbRows = 10;
        this.CompanyList.qylPage = 1;
      }
      let type;
      this.path2 = []; // 重置找到我静态渲染数据
      let obj = {
        service_id: this.myForm.service_id,
        pro_type: this.CompanyList.pro_type,
        company: this.CompanyList.qylbInput,
        page: this.CompanyList.qylPage,
        rows: this.CompanyList.qylbRows,
        jbxx_id: this.myForm.jbxx_id,
        user_id: this.user_id,
        cate: this.CompanyList.cate,
        order: this.CompanyList.order == "默认排序" ? "score" : "weight"
      };
      if (this.myForm.name == "wb") {
        obj.service_id = this.myForm.service_id;
      }
      this.axios.post("/firm/firm_search/searchComp", obj, data => {
        this.CompanyList.qylbLoading = false;
        this.CompanyList.tableData = data.rows;
        this.CompanyList.qylbCount = data.count;
        this.CompanyList.qylbTotal = data.total || 0;
      });
    },
    qylbClear() {
      this.CompanyList.qylbLoading = true;
      this.CompanyList.qylPage = 1;
      this.CompanyList.qylbInput = "";
      this.qylbSearch();
    },
    plChoose() {
      if (this.CompanyList.multipleSelection != "") {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.dialogTableVisible = false;
        this.qylbSearch();
        this.editComp();
      } else {
        this.$message({
          message: "请选择",
          type: "danger"
        });
      }
    },
    zzplChoose() {
      if (this.CompanyList.multipleSelection != "") {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.dialogTableVisible = false;
        this.qylbSearch();
        this.editComp();
      } else {
        this.$message({
          message: "请选择",
          type: "danger"
        });
      }
    },
    chooseXgqyTable1(row) {
      if (row.status == "0") {
        this.CompanyList.idList = row.id;
        this.CompanyList.id1 = row.id;
        this.$message({
          message: "选择成功",
          type: "success"
        });

        this.editComp();
      } else {
        this.$message({
          message: "选择失败!请重试",
          type: "danger"
        });
      }
    },
    chooseXgqyTable(row) {
      if (row.status == "0") {
        this.CompanyList.idList = row.id;
        this.CompanyList.id = row.id;
        this.$message({
          message: "选择成功",
          type: "success"
        });

        this.editComp();
      } else {
        this.$message({
          message: "选择失败!请重试",
          type: "danger"
        });
      }
    },
    handleSelectionChange(val) {
      this.CompanyList.multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        this.CompanyList.multipleSelection.push(val[i].id);
      }
      this.CompanyList.idList = this.CompanyList.multipleSelection.join(",");
      val.id = this.CompanyList.idList;
    },
    handleSelectionChange1(val) {
      this.CompanyList.multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        this.CompanyList.multipleSelection.push(val[i].id);
      }
      this.CompanyList.idList = this.CompanyList.multipleSelection.join(",");
      val.id = this.CompanyList.idList;
    },
    disabledCheck(row, index) {
      if (row.status == 0) {
        return true;
      } else {
        return false;
      }
    },
    fn_role() {
      let self = this;
      self.axios.post(
        "/index/mine/role",
        {
          user_id: this.$store.state.userInfo.user_id,
          company_id: localStorage.getItem("company_id")
        },
        data => {
          this.role = data;
          console.log(this.role);
        }
      );
    },
    openGs(row, model) {
      if (model === 2) {
        row.gs_id = row.id;
        row.qymc = row.company_name;
      }
      if (this.role.company_role !== "C") {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.qymc}`
        });
        window.open(href, "公司详情" + row.gs_id);
      } else {
        this.axios.post(
          "/index/mine/roleCompSource",
          { gs_id: row.gs_id },
          res => {
            // 获取跳转页面结果
            if (res === "四川省建设厅") {
              let { href } = this.$router.resolve({
                path: `/gs_scjst?gs_id=${row.gs_id}`
              });
              window.open(href, "/gs_scjst" + row.gs_id);
            } else {
              let { href } = this.$router.resolve({
                path: `/gs_building?gs_id=${row.gs_id}`
              });
              window.open(href, "/gs_building" + row.gs_id);
            }
          }
        );
      }
    },
    searchQuali() {
      let aptitude =
        localStorage.getItem("setzzSearchValue") != ""
          ? JSON.parse(localStorage.getItem("setzzSearchValue"))
          : [];
      let obj = {
        aptitude,
        service_id: this.myForm.service_id,
        pro_type: this.CompanyList.pro_type,
        jbxx_id: this.myForm.jbxx_id,
        cate: this.CompanyList.cate,
        user_id: localStorage.getItem("user_id"),
        page: this.zzyqChooseListPage,
        row: this.zzyqChooseListRows,
        dict: "",
        is_rc: "全部",
        area: ""
      };
      this.axios.post("/firm/Firm_search/searchQuali", obj, data => {
        this.zzyqChooseLoading = false;
        this.zzyqChooseListArray = data.rows;
        this.zzyqChooseListCount = data.total || 0;
      });
    },
    handleCurrentChangeQylb(val) {
      this.CompanyList.qylbLoading = true;
      this.CompanyList.qylPage = val;
      this.qylbSearch();
    },
    handleCurrentChangezzyqList(val) {
      this.zzyqChooseLoading = true;
      this.zzyqChooseListPage = val;
      this.searchQuali();
    }
  }
};
</script>
<style lang='less' scoped>
#myTkHeader {
  height: 400px;
  // line-height: 40px;
  // margin-left: 50px;
}
.txtColor1 {
  color: #1860a0;
  cursor: pointer;
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
  // overflow: visible;
  word-break: break-all;
  font-size: 25px;
  text-align: center;
  // line-height: 100px;
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
  background-color: #37b6ed;
  color: white;
}
.txtColor {
  color: #4999e0;
  cursor: pointer;
}
.NoColor {
  font-size: 14px;
  color: #f44c30;
  cursor: pointer;
}
.yesColor {
  cursor: pointer;
  font-size: 14px;
  color: #4999e0;
}
.activeColor {
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  background-color: #37b6eb;
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
  // position: relative;
}
.zzyqTjHeader {
  // position: absolute;
  // left:20px;
  // top:-10px;
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