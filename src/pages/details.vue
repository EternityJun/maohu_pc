<template>
  <div>
    <div class="box">
      <!--搜索框-->
      <div class="search">
        <div class="inp">
          <el-input v-model="search.xmmc" clearable placeholder="请输入项目名称" @keyup.enter.native='searchas'></el-input>
        </div>
        <div class="bot">
          <el-button type="success" @click="direct()">直接添加</el-button>
          <el-button type="primary" @click="searchas">搜索</el-button>
          <!--          <el-button  @click="reset()">重置</el-button>-->
          <!--          <div style="width: 740px;height: 100%"></div>-->
        </div>
        <div style="width: 100%;height: 10px;overflow: hidden"></div>
        <div>
          <el-table :data="bale.rows" style="width: 100%" v-loading="loading1" border>
            <el-table-column type="index" label="序号" width="70" align="center">
              <template slot-scope="scope">{{scope.$index+(page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="xmmc" label="项目名称" width="673" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 10px;color: #66B1FF;cursor: pointer" @click="open_yj(scope)" v-if="scope.row.proj_id != ''">{{scope.row.xmmc}}</span>
                <span style="margin-left: 10px;cursor: pointer" v-else>{{scope.row.xmmc}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="proj_type" label="项目类型" align="center"></el-table-column>
            <el-table-column prop="money" label="金额(万元)" align="center" width="120"></el-table-column>
            <el-table-column prop="source" label="数据来源" align="center" width="200"></el-table-column>
            <el-table-column prop="address" label="操作" align="center" width="100">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="open(scope)" v-if="scope.row.is_del===1">删除</el-button>
                <el-button type="info" size="mini" class="shu" v-else>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination background :current-page="page" @current-change="currents" layout="total ,prev, pager, next" :total="bale.total||0">
          </el-pagination>
        </div>
        <!---->
      </div>
    </div>
    <!--搜索大弹框-->
    <el-dialog title="项目信息" :visible.sync="dialogVisible" width="80%" :close-on-click-modal="false">
      <div class="da_box">
        <!-- 之前的弹框搜索栏 -->
        <!-- <div class="inp">
          <el-input v-model="input1" placeholder="请输入项目名称" @keyup.enter.native="beforesearch"></el-input>
        </div>
        <div class="bots">
          <el-button type="primary" @click="beforesearch">搜索</el-button>
          <el-button  @click="reset()">重置</el-button>
          <el-button type="primary" style="float: right" @click="direct()">直接添加</el-button>
        </div> -->
        <!-- 弹框搜索栏 -->
        <el-form :inline="true" @submit.native.prevent>
          <el-form-item label="项目名称">
            <el-input style="width:381px" v-model="search.xmmc" placeholder="请输入项目名称" clearable @keyup.enter.native="beforesearch" @clear="beforesearch"></el-input>
          </el-form-item>
          <el-form-item label="资金范围">
            <el-input style="width:232px" v-model="search.minMoney" placeholder="金额" clearable @keyup.enter.native="beforesearch" @clear="beforesearch">
              <template slot="append">万元</template>
            </el-input>
            <span>-</span>
            <el-input style="width:232px" v-model="search.maxMoney" placeholder="金额" clearable @keyup.enter.native="beforesearch" @clear="beforesearch">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="开工日期">
            <el-date-picker v-model="search.kgsjTime" @clear="kgChange" value-format="yyyy-MM-dd" @change="kgChange" style="width:382px;" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        <!-- </el-form>
        <el-form :inline="true" @submit.native.prevent> -->
          <el-form-item label="竣工日期">
            <el-date-picker v-model="search.jgsjTime" @clear="jgChange" value-format="yyyy-MM-dd" @change="jgChange" style="width:382px;" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="从业人员">
            <el-input style="width:197px" v-model="search.name" placeholder="人员名称" clearable @keyup.enter.native="beforesearch" @clear="beforesearch"></el-input>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select style="width:197px" v-model="search.projectType" placeholder="选择项目类型" @change="beforesearch" clearable @keyup.enter.native="beforesearch">
              <el-option v-for="item in search.xmlxOption" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="中标日期">
            <el-date-picker v-model="search.zbTime" @clear="zbChange" value-format="yyyy-MM-dd" @change="zbChange" style="width:382px;" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div style="text-align:center;padding:0 20px 10px 0">
          <el-button type="primary" @click="beforesearch">搜索</el-button>
          <el-button @click="reset()">重置</el-button>
          <!-- <el-button type="primary" @click="direct()">直接添加</el-button> -->
        </div>
      </div>
      <div class="table">
        <el-table :data="list.rows" border style="width: 100%" v-loading="loading">
          <el-table-column label="序号" width="100" type="index" align="center">
            <template slot-scope="scope">{{scope.$index+(page1-1)*10+1}}</template>
          </el-table-column>
          <el-table-column label="项目名称" width="380" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px;color: #66B1FF;cursor: pointer" @click="open_yjs(scope)" v-if="scope.row.proj_id != ''">{{scope.row.proj_name}}</span>
              <span style="margin-left: 10px;cursor: pointer" v-else>{{scope.row.proj_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目类型" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.proj_type}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="金额(万元)" align="center"></el-table-column>
          <el-table-column prop="remark" label="数据来源" align="center" width="120"></el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px;color: #00c0ff;cursor: pointer" @click="add(scope.row)" v-if="scope.row.import===0">添加</span>
              <span style="margin-left: 10px;color: #a9aab4;cursor: pointer" v-else>已添加</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="ruy">
          <el-pagination style="float: right" :current-page="page1" background @current-change="currents1" layout="total,prev, pager, next" :total="list.total||0">
          </el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="bont">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </span>
    </el-dialog>
    <!--直接添加小弹窗-->
    <el-dialog title="添加" :visible.sync="centerDialogVisible" width="30%" :close-on-click-modal="false" center>
      <el-form :model="addform" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="请输入项目名称" prop="name">
          <el-input v-model="addform.name"></el-input>
        </el-form-item>
        <el-form-item label="请输入项目类型">
          <el-select v-model="addform.proj_type" clearable placeholder="请选择" style="width: 406px">
            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入金额">
          <!--          <el-input-number controls="false" v-model="addform.money" :precision="2" :step="1" ></el-input-number>-->
          <!--          <el-input v-model="addform.money"  maxlength="10" oninput = "value=value.replace(/[^\d^\.]+/g,'')"></el-input>-->
          <el-input v-model="addform.money" maxlength="10" @input="zz()" placeholder="最多精确到小数两位 (万元)"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "mydetails",
  components: {},
  props: ["basicInfo"],
  data() {
    return {
      loading1: true,
      loading: true, // 加载效果
      dialogVisible: false,
      centerDialogVisible: false,
      list: [], // 可以添加的项目数据
      input: "", // 搜索框内容
      // input1: '', // 弹出层搜索框（之前的）
      // 弹出搜索框搜索字段
      search: {
        xmmc: "",
        name: "",
        minMoney: "",
        maxMoney: "",
        zbTime: [],
        minZbgsTime: "",
        maxZbgsTime: "",
        kgsjTime: [],
        minKgsjTime: "",
        maxKgsjTime: "",
        jgsjTime: [],
        minJgsjTime: "",
        maxJgsjTime: "",
        projectType: "",
        xmlxOption: [
          "全部",
          "建筑工程",
          "市政工程",
          "水利工程",
          "公路工程",
          "其他工程"
        ]
      },
      bale: [], // 初始数据,,
      projectList: [],
      page: 1, // 外部分页
      page1: 1, // 添加弹出分页
      addform: {
        // 直接添加表单
        name: "", // 项目名称
        proj_type: "", // 项目类型
        money: "" // 金额
      },
      options: [
        {
          //  直接添加时项目类型
          value: "建筑工程"
        },
        {
          value: "市政工程"
        },
        {
          value: "水利工程"
        },
        {
          value: "公路工程"
        },
        {
          value: "其他工程"
        }
      ],
      rows: 10,
      count: 0,
      gs_id: "", // url gs_id
      jbxx_id: "",
      own_id: "",
      rules: {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 2, message: "最少输入两个字符哦", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    zz() {
      // 匹配正则
      let patten = /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/;
      // 匹配金额，两位小数
      if (!patten.test(this.addform.money)) {
        this.addform.money = "";
      }
    },
    submitForm(formName) {
      // 直接添加
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.addform.money)
          this.addition();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    add(val) {
      // 点击添加
      // console.log(val);
      this.axios.post(
        "/index/Laipi_ry_yj/addPro",
        {
          id: val.id,
          gs_id: this.gs_id,
          own_id: this.own_id,
          jbxx_id: this.jbxx_id
        },
        data => {
          this.hom(); // 添加成功重新请求数据
          this.dialogVisible = false;
          if (data.status === "success") {
            this.$message({
              message: data.message,
              type: "success"
            });
          } else {
            this.$message.error("添加失败");
          }
          // console.log(data)
        }
      );
    },
    direct() {
      // 点击直接添加时项目名称获取外层搜索框的值
      this.addform.name = this.search.xmmc;
      this.centerDialogVisible = true;
    },
    addition() {
      // console.log(this.addform.name);
      // 直接添加
      this.axios.post(
        "/index/Laipi_ry_yj/addPro",
        {
          xmmc: this.addform.name,
          proj_type: this.addform.proj_type,
          money: this.addform.money,
          gs_id: this.gs_id,
          own_id: this.own_id,
          jbxx_id: this.jbxx_id
        },
        data => {
          this.hom(); // 添加成功重新请求数据
          this.dialogVisible = false;
          this.centerDialogVisible = false;
          if (data.status === "success") {
            this.$message({
              message: data.message,
              type: "success"
            });
          } else {
            this.$message.error("添加失败");
          }
          this.input = "";
          this.input1 = "";
          this.addform.name = ""; // 添加完成后清空输入框内容
          this.addform.proj_type = "";
          this.addform.money = "";
          // console.log(data)
        }
      );
    },
    open(val) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.telel(val);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    telel(val) {
      // 删除
      this.axios.post(
        "/index/Laipi_ry_yj/delPro",
        {
          id: val.row.id
        },
        data => {
          if (data.status === "success") {
            if (this.bale.rows.length === 1 && this.page > 1) {
              // 点击删除如果只有一条内容且不是第一页，删除后往前跳一页
              this.page -= 1;
            }
            this.hom(); // 删除成功重新请求数据
            this.$message({
              message: data.message,
              type: "success"
            });
          } else {
            this.$message.error("删除失败");
          }
          // console.log(data)
        }
      );
    },
    initial() {
      // 请求添加数据弹出层
      this.loading = true;
      this.dialogVisible = true;
      this.axios.post(
        "/firm/performance/projectLists",
        {
          gs_id: this.gs_id,
          xmmc: this.search.xmmc,
          name: this.search.name,
          minMoney: this.search.minMoney,
          maxMoney: this.search.maxMoney,
          minZbgsTime: this.search.minZbgsTime,
          maxZbgsTime: this.search.maxZbgsTime,
          minKgsjTime: this.search.minKgsjTime,
          maxKgsjTime: this.search.maxKgsjTime,
          minJgsjTime: this.search.minJgsjTime,
          maxJgsjTime: this.search.maxJgsjTime,
          projectType: this.search.projectType,
          source: "",
          page: this.page1,
          own_id: this.own_id,
          cate: 1,
          rows: 10,
          jbxx_id: this.jbxx_id
        },
        data => {
          this.loading = false;
          this.list = data;
          // console.log(data)
        }
      );
    },
    hom() {
      // 初始数据
      this.axios.post(
        // '/index/Laipi_ry_yj/projectList',
        "/index/Laipi_Ry_Yj/projectList",
        {
          page: this.page,
          gs_id: this.gs_id,
          own_id: this.own_id,
          jbxx_id: this.jbxx_id,
          rows: 10
        },
        data => {
          this.bale = data;
          this.loading1 = false;
          // console.log(data);
        }
      );
    },
    kgChange(val) {
      if (val) {
        this.search.minKgsjTime = this.search.kgsjTime[0];
        this.search.maxKgsjTime = this.search.kgsjTime[1];
      } else {
        this.search.minKgsjTime = "";
        this.search.maxKgsjTime = "";
      }
      this.beforesearch();
    },
    jgChange(val) {
      if (val) {
        this.search.minJgsjTime = this.search.jgsjTime[0];
        this.search.maxJgsjTime = this.search.jgsjTime[1];
      } else {
        this.search.minJgsjTime = "";
        this.search.maxJgsjTime = "";
      }
      this.beforesearch();
    },
    zbChange(val) {
      if (val) {
        this.search.minZbgsTime = this.search.zbTime[0];
        this.search.maxZbgsTime = this.search.zbTime[1];
      } else {
        this.search.minZbgsTime = "";
        this.search.maxZbgsTime = "";
      }
      this.beforesearch();
    },
    beforesearch() {
      this.page1 = 1;
      if (
        this.search.minMoney &&
        this.search.maxMoney &&
        this.search.minMoney > this.search.maxMoney
      ) {
        this.$message.warning("最低资金应低于最高资金");
      } else {
        this.initial();
      }
    },
    searcha() {
      // 弹出添加层搜索
      this.loading = true;
      this.axios.post(
        "/firm/performance/projectLists",
        {
          gs_id: this.gs_id,
          xmmc: this.input1,
          name: "",
          minMoney: "",
          maxMoney: "",
          minZbgsTime: "",
          maxZbgsTime: "",
          minKgsjTime: "",
          maxKgsjTime: "",
          minJgsjTime: "",
          maxJgsjTime: "",
          projectType: "",
          source: "",
          own_id: this.own_id,
          page: this.page1,
          cate: 1,
          rows: 10,
          jbxx_id: this.jbxx_id
        },
        data => {
          this.loading = false;
          if (data.status === "success") {
            this.list = data;
          }
          if (data.status === "failed") {
            this.list = [];
          }
          // console.log(data)
        }
      );
    },
    searchas() {
      // 外层搜索弹出添加框
      // this.input1 = this.input;
      this.dialogVisible = true;
      this.initial();
    },
    reset() {
      // 点击重置按钮
      this.page1 = 1;
      // this.input1 = "";
      this.search.xmmc = "";
      this.search.name = "";
      this.search.minMoney = "";
      this.search.maxMoney = "";
      this.search.zbTime = [];
      this.search.minZbgsTime = "";
      this.search.maxZbgsTime = "";
      this.search.kgsjTime = [];
      this.search.minKgsjTime = "";
      this.search.maxKgsjTime = "";
      this.search.jgsjTime = [];
      this.search.minJgsjTime = "";
      this.search.maxJgsjTime = "";
      this.search.projectType = "";
      this.input = "";
      this.loading = true;
      this.initial();
    },
    currents(val) {
      // 点击页数时触发
      this.page = val;
      this.hom();
    },
    currents1(val) {
      // 点击添加列表页数时触发
      // console.log(val)
      this.page1 = val;
      this.initial();
    },
    // 点击项目名字业绩跳转
    open_yj(row) {
      // console.log(row)
      if (row.row.proj_id != "") {
        // 当row.proj_id为空时，不能查看业绩详情
        let source = "";
        if (row.row.source === "全国建筑市场") {
          source = "jzsc";
        } else if (row.row.source === "四川省建设厅") {
          source = "jst";
        } else if (row.row.source === "全国公路市场") {
          source = "gl";
        } else if (row.row.source === "全国水利市场") {
          source = "sl";
        } else {
          // let zbxx = 0
          // alert(row.row.zbxx_id)
          let { href } = this.$router.resolve({
            path: `/enterpriseDetails?zbxx_id=${row.row.zbxx_id}&zbgs_id=${row
              .row.proj_id || ""}&xmmc=${row.row.xmmc}&type=zbgs&source=${row.source}`
          });
          window.open(href, "中标公示" + row.row.proj_id + 0 + row.row.xmmc);
          return;
        }
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.row.proj_id}&source=${source}`
        });
        window.open(href, "业绩详情" + row.proj_name + row.proj_id + source);
      }
    },
    // 点击弹出项目名字跳转详情
    open_yjs(row) {
      // console.log(row);
      if (row.row.proj_id != "") {
        let source = "";
        if (row.row.remark === "全国建筑市场") {
          source = "jzsc";
        } else if (row.row.remark === "四川省建设厅") {
          source = "jst";
        } else if (row.row.remark === "全国公路市场") {
          source = "gl";
        } else if (row.row.remark === "全国水利市场") {
          source = "sl";
        } else {
          // let zbxx = 0
          // alert(row.row.zbxx_id)
          let { href } = this.$router.resolve({
            path: `/enterpriseDetails?zbxx_id=${row.row.zbxx_id}&zbgs_id=${row
              .row.proj_id || ""}&xmmc=${row.row.xmmc}&type=zbgs&source=${row.source}`
          });
          window.open(href, "中标公示" + row.row.proj_id + 0 + row.row.xmmc);
          return;
        }
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.row.proj_id}&source=${source}`
        });
        window.open(href, "业绩详情" + row.proj_name + row.proj_id + source);
      }
    }
  },
  mounted() {
    // this.addform.name = this.basicInfo.xmmc
    // console.log(this.form)
    // console.log(this.form.xmmc)
    // console.log(this.$route.query.xmmc)
    this.hom();
    // this.initial()
  },
  created() {
    // this.getProjectList()
    let route = this.$route;
    // console.log(route)
    // console.log(window.location)
    this.gs_id = route.query.gs_id;
    this.jbxx_id = route.query.jbxx_id;
    this.own_id = route.query.own_id;
    // console.log(route)
  },
  filters: {},
  computed: {},
  watch: {
    // content: function (val) {
    //   this.addform.money = val.replace(/\D/g, '')
    // }
    "search.minMoney": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV) && newV != "") {
          this.$message.warning("请输入数字");
          this.search.minMoney = oldV;
        }
        // console.log(this.search.maxMoney)

        // if (
        //   this.search.maxMoney &&
        //   this.search.minMoney > this.search.maxMoney
        // ) {
        //   this.$message.warning("请输入数字");
        //   this.search.minMoney = oldV;
        // }
      }
    },
    "search.maxMoney": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV) && newV != "") {
          this.$message.warning("请输入数字");
          this.search.maxMoney = oldV;
        }
        // console.log(this.search.minMoney)
        // if (
        //   this.search.minMoney &&
        //   this.search.minMoney > this.search.maxMoney
        // ) {
        //   this.$message.warning("请输入数字");
        //   this.search.maxMoney = oldV;
        // }
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="less">
.box {
  /*width: 1344px;*/
  // margin: auto;
  width: 100%;
  overflow: hidden;
}
.search {
  width: 100%;
  overflow: hidden;
}
.inp {
  width: 25%;
  height: 40px;
  overflow: hidden;
  float: left;
}
.bot {
  padding-left: 14px;
  overflow: hidden;
  width: 73%;
  /*margin-left: 10px;*/
  float: left;
  /*display: flex;*/
}
.da_box {
  // display: flex;
  width: 100%;
  // margin: 0 auto;
  overflow: hidden;
}
.bots {
  /*background-color: #00c0ff;*/
  padding-left: 14px;
  width: 74%;
  float: left;
  overflow: hidden;
  margin-bottom: 10px;
}
.table {
}
.shu:hover {
  cursor: no-drop;
}
.bont {
  width: 100%;
  height: 100%;
  /*display: flex;*/
  text-align: center !important;
}
.ruy {
  line-height: 72px;
  height: 72px;
  text-align: left;
  /*display: flex;*/
  width: 100%;
  overflow: hidden;
}
</style>
