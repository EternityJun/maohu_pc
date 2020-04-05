<!--  -->
<template>
  <div class="qyfwqDaletil">
    <div v-if="role||role1" v-loading="roleLoading">
      <header>
        <p id="myID">
          <span class="myherder">{{basicInfo.xmmc}}</span>
        </p>
      </header>
      <section id="section" style="padding-top:20px">
        <el-row>
          <el-col :span="20">
            <div>
              <span>项目名称：</span>
              <span style=" word-break:break-all;">{{basicInfo.xmmc}}</span>
            </div>
            <div style="padding-top:10px" v-if="basicInfo.xmdq">
              <span>项目地区：</span>
              <span>{{basicInfo.xmdq}}</span>
            </div>
            <div style="padding-top:10px" v-if="basicInfo.xmyzdw">
              <span>项目业主：</span>
              <span>{{basicInfo.xmyzdw}}</span>
            </div>
            <div style="padding-top:10px" v-if="basicInfo.zzyq||basicInfo.zzyq_str">
              <span>资质要求：</span>
              <span>{{basicInfo.zzyq_display?basicInfo.zzyq_display:basicInfo.zzyq_str}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div v-if="form.name == 'zj'&&share != 1" style="text-align:right">
              <el-radio-group v-model="quanNeiWaiSta" @change="changeQuan">
                <el-radio-button label="圈内"></el-radio-button>
                <el-radio-button label="全域"></el-radio-button>
              </el-radio-group>
            </div>
            <div v-else-if="form.name == 'wb'||share == 1" style="text-align:right">
              <img style="width:80px;height:80px;margin-top:20px" :src="basicInfo.ssr_avatar" alt />
            </div>
          </el-col>
        </el-row>
        <div style="margin-top:20px">
          <el-tabs v-model="activeName">
            <el-tab-pane label="项目信息" name="first">
              <el-form ref="form" v-if="share == '1'" :model="form" label-width="80px">
                <p v-if="basicInfo.xmmc" style="padding-top:20px">
                  项目名称： {{basicInfo.xmmc}}
                </p>
                <p v-if="basicInfo.xmdq" style="padding-top:20px">
                  项目地区： {{basicInfo.xmdq}}
                </p>
                <p v-if="basicInfo.xmyzdw" style="padding-top:20px">
                  项目业主： {{basicInfo.xmyzdw}}
                </p>
                <p v-if="basicInfo.zzyqText" style="padding-top:20px">
                  项目业主： {{basicInfo.zzyqText}}
                </p>
                <p v-if="basicInfo.ryyq" style="padding-top:20px">
                  人员要求： {{basicInfo.ryyq}}
                </p>
                <p v-if="basicInfo.yjyq" style="padding-top:20px">
                  业绩要求： {{basicInfo.yjyq}}
                </p>
                <p v-if="basicInfo.qtyq" style="padding-top:20px">
                  其他要求： {{basicInfo.qtyq}}
                </p>
              </el-form>
              <el-form ref="form" v-else :model="form" label-width="80px">
                <el-form-item label="项目名称">
                  <el-input v-model="upaData.xmmc" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目地区">
                  <el-cascader :options="xmdqList" @change="changeListData" style="width:100%" v-model="upaData.xmdqList" clearable></el-cascader>
                </el-form-item>
                <el-form-item label="项目业主">
                  <el-input v-model="upaData.xmyzdw"></el-input>
                </el-form-item>
                <div style="width:400px;margin:0 auto; padding-bottom:20px">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="资质要求"></el-checkbox>
                    <el-checkbox label="人员要求"></el-checkbox>
                    <el-checkbox label="业绩要求"></el-checkbox>
                    <el-checkbox label="其他"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <!-- <el-form-item v-if="zzyqState&&zzyqStrState" label="资质要求">
                  <el-input v-model="upaData.zzyq_str"></el-input>
                </el-form-item> -->
                <zzyqNewSearch v-if="zzyqState" @changeZZyq="changeZZyq" :zzyq="upaData.zzyq" :defaultZzyq="defaultZzyq"></zzyqNewSearch>
                <!-- <zzyqSearch
                  v-if="zzyqState"
                  :zzyqList="zzyqList"
                  :zzyq="upaData.zzyq"
                  @changeZZyq="changeZZyq"
                ></zzyqSearch> -->
                <el-form-item v-if="ryyqState" label="人员要求">
                  <el-input type="textarea" v-model="upaData.ryyq"></el-input>
                </el-form-item>
                <el-form-item v-if="yjyqState" label="业绩要求">
                  <el-input type="textarea" v-model="upaData.yjyq"></el-input>
                </el-form-item>
                <el-form-item v-if="qtyqState" label="其他">
                  <el-input type="textarea" v-model="upaData.qtyq"></el-input>
                </el-form-item>
                <div style="width:200px; margin:0 auto 20px;">
                  <el-button @click="ModifyData" type="primary">修改</el-button>
                  <el-button @click="resetData">重置</el-button>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="相关企业" name="second">
              <qyZtbXgqyTable ref="table" @addMyXm="addMyXm" :myForm="form" :my_pro_type="CompanyList.pro_type"></qyZtbXgqyTable>
            </el-tab-pane>
            <el-tab-pane label="公开信息" name="third">
              <qyGkxx :myForm="form" :basicInfo="basicInfo"></qyGkxx>
            </el-tab-pane>
            <el-tab-pane v-if="share != 1&&basicInfo.role == '圈内'" label="权限" name="fourth">
              <qyPermissions v-if='activeName=="fourth"' :myForm="form"></qyPermissions>
            </el-tab-pane>
            <el-tab-pane label="留言" name="five">
              <div>
                <div v-if="LeaveMessage.data !='暂无留言内容'">
                  <div>
                    共
                    <span style="color:#499efe">{{LeaveMessage.total}}</span>条评论
                  </div>
                  <div style="height:100px;margin:20px 0 0 20px" v-for="item in LeaveMessage.data" :key="item.id">
                    <div style="display:flex;margin-bottom:10px">
                      <div>
                        <img style="height:50px;width:50px;border-radius:25px;" :src="item.headimgurl" alt />
                      </div>
                      <div>
                        <div style="display:flex">
                          <p style="height:20px;line-height:20px;color:#969696;margin-left:10px">{{item.sender_name}}</p>
                          <p v-if="item.gsmc" style="height:20px;line-height:20px;color:#969696;margin-left:10px;font-size:12px;">{{item.gsmc}}</p>
                        </div>

                        <p style="height:20px;line-height:20px;color:#969696;margin-left:10px">{{item.modified}}</p>
                      </div>
                      <div>
                        <span v-if="item.sender == user_id" @click="deleteLeaveWords(item)" class="el-icon-delete" style="font-size:16px;cursor: pointer;color:#beb2b5;margin-left:10px;"></span>
                      </div>
                    </div>
                    <div>
                      <p style="margin:10px 10px 10px 60px">{{item.content}}</p>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div>没有留言哦</div>
                </div>
                <div style="margin-top:50px;  text-align: right;">
                  <el-input type="textarea" v-model="LeaveMessage.concent" placeholder="输入内容"></el-input>
                  <div style="width:100%;text-align:center;">
                    <el-button style="margin:20px 0" @click="submitMsg" type="primary">提交</el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
    </div>
    <div v-else>
      <p style="text-align:center;font-size:18px;height:500px;line-height:500px">你没有权限</p>
      <div style="text-align:center">
        <el-button type="primary" @click="backIndex">返回首页</el-button>
      </div>
    </div>

    <el-dialog class="search_tk" title="资质选择" width="900px" @close="hide_components()" :visible.sync="centerDialogVisible">
      <zz-search v-if="centerDialogVisible" @onSearch="onSearch" :key="new Date().getTime()"></zz-search>
    </el-dialog>

    <!-- 添加弹框 -->
    <el-dialog width="80%" :visible.sync="dialogTableVisible">
      <qyZtbXgqyDialog ref="gsDialog" :basicInfo="basicInfo" :myForm="form" @getXgqyList="getXgqyList" @show_components="show_components" :my_pro_type="CompanyList.pro_type"></qyZtbXgqyDialog>
    </el-dialog>

    <!-- 分析按钮 -->
    <div id="share">
      <el-button type="primary" icon="el-icon-share" size="mini">分享</el-button>
      <share v-if="getCutUrlKey" :config="config"></share>
    </div>
    <div id="share1">
      <el-button type="primary" style="font-size:12px;width:73px;" @click="backIndex">首页</el-button>
    </div>
  </div>
</template>

<script>
import Cookie from "../cookie/index.js";
import "social-share.js/dist/css/share.min.css";
import "social-share.js/dist/js/social-share.min.js";
import lookMe from "./template/lookMe";
import zzyqSearch from "./template/zzyqSearch";
import zzSearch from "./template/zzSearch";
import qyZtbXgqyTable from "./template/qyZtbXgqyTable";
import qyZtbXgqyDialog from "./template/qyZtbXgqyDialog";
import qyPermissions from "./template/qyPermissions"; //权限
import qyGkxx from "./template/qyGkxx"; //公开信息
import zzyqNewSearch from "./template/zzyqNewSearch";

export default {
  name: "qyfwqDaletil",
  components: {
    lookMe,
    zzyqSearch,
    zzyqNewSearch,
    zzSearch,
    //相关企业的table
    qyZtbXgqyTable,
    //相关企业的弹框
    qyZtbXgqyDialog,
    //权限
    qyPermissions,
    qyGkxx
  },
  data() {
    return {
      share: "",
      quanNeiWaiSta: "",
      getCutUrlKey: false,
      config: {
        url: window.location.href, // 网址，默认使用 window.location.href
        // url: url, // 网址，默认使用 window.location.href
        source: "标题", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: this.$route.query.xmmc, // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image:
          "https://wechat.cdzjkl.com/files/options/" +
          this.$store.state.userInfo.gs_logo, // 图片, 默认取网页中第一个img标签
        sites: ["qq", "wechat", "qzone", "weibo", "douban"], // 启用的站点
        // disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
      },
      ssdqList: [],
      xmdqList: [],
      zzyqList: [],
      zbxx_id: "",
      zbxx_bt: "",
      path: [],
      path2: [],
      activeName: "first",
      form: {},
      data: [],
      centerDialogVisible: false,
      dialogTableVisible: false,
      service_id: "",
      user_id: "",
      basicInfo: {},
      checkList: [],
      zzyqState: false,
      ryyqState: false,
      yjyqState: false,
      qtyqState: false,
      upaData: {
        qtyq: "",
        ryyq: "",
        xmdq: "",
        xmmc: "",
        xmyzdw: "",
        yjyq: "",
        zzyq: "",
        zzyq_str: "",
        zzyq_display: "",
        xmdqList: [],
        refreshSta: "" //如果数据更新了  页面不改变
      },
      CompanyList: {
        pro_type: "own"
      },
      LeaveMessage: {
        data: [],
        totle: 0,
        mas: "",
        concent: ""
      },
      zzyqStrState: false,
      tableXmForm: {},
      upDataFile: {},
      myFile: {},
      addTableRowState: true,
      zzyqChooseLoading: true,
      zzyqChooseListArray: [],
      zzyqChooseListPage: 1,
      zzyqChooseListRows: 20,
      zzyqChooseListCount: 0,
      zzyqArr: [],
      zzyqArr1: [],
      zzyqArr2: [],
      checked: false,
      role: true,
      role1: true,
      roleLoading: true
    };
  },
  watch: {
    checkList() {
      this.zzyqState = false;
      this.ryyqState = false;
      this.yjyqState = false;
      this.qtyqState = false;
      for (let i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i] == "资质要求") {
          this.zzyqState = true;
        }
        if (this.checkList[i] == "人员要求") {
          this.ryyqState = true;
        }
        if (this.checkList[i] == "业绩要求") {
          this.yjyqState = true;
        }
        if (this.checkList[i] == "其他") {
          this.qtyqState = true;
        }
      }
      let a = this.checkList.indexOf("资质要求");
    },
    zzyqArr1(val) {
      this.zzyqArr1 = val;
    },
    zzyqArr2(val) {
      this.zzyqArr2 = val;
    }
  },
  created() {
    this.share = localStorage.getItem("share");
    this.getZzyqData();
    // this.getProvinceCity();//放到项目信息获取后再调用，以免覆盖已选择的地区
    localStorage.setItem("setzzSearchValue", "");
    localStorage.setItem("setzzSearchValue_checked", "");
    let obj = this.$route.query;
    this.form = obj;
    this.service_id = this.login_service_id;
    this.user_id = localStorage.getItem("user_id");
    document.title = "项目详情";
    if (this.$route.query.name == "zj") {
      this.CompanyList.pro_type = "own";
    } else {
      this.CompanyList.pro_type = "other";
    }
    this.getRe_detail();
    if (this.share == "1") {
      // 判断是非是分享页面
      let url = window.location.href;
      url = url.replace(/&share=1/, "");
      localStorage.setItem("formUrl", url);
    }
    let url = window.location.href;
    let urls = `${url}&fromUrl=${url}`;
    this.axios.post(
      "/index/Common/buildurl",
      {
        url: urls
      },
      res => {
        this.config.url = res.url;
        this.getCutUrlKey = true;
      }
    );

    this.getLeaveWords();
    this.searchQuali();
    this.fn_role();
  },

  methods: {
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
        }
      );
    },
    resetData() {
      this.$confirm("此操作将重置已填写的项目基本信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getRe_detail(1);
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    addMyXm() {
      this.openAdd();
    },
    getXgqyList() {
      this.$refs.table.getCompanyList();
    },
    changeQuan(role) {
      let self = this;
      self.axios.post(
        "/index/project/projectSave",
        {
          jbxx_id: this.form.jbxx_id,
          role
        },
        data => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.role = data;
          this.getRe_detail();
        }
      );
    },
    getData(arr, num) {
      let obj = {};
      let allId = [];
      if (arr) {
        arr.forEach(item => {
          obj[item.dname] = [];
          let myArr = [];
          item.children.forEach(t => {
            let a = `${t.name[0]}_${t.name[1]}`;
            let obj1 = {};
            obj1[a] = `${t.values[1]}_${t.values[2]}_${t.values[3]}`;
            if (t.values[4]) {
              obj1[a] = `${t.values[1]}_${t.values[2]}_${t.values[3]}_${
                t.values[4]
              }`;
            }
            if (t.values[5]) {
              obj1[a] = `${t.values[1]}_${t.values[2]}_${t.values[3]}_${
                t.values[4]
              }_${t.values[5]}`;
            }
            allId.push(obj1[a]);
            myArr.push(obj1);
          });
          obj[item.dname] = myArr;
        });
      } else {
        this.zzyqArr1 = [];
        this.zzyqArr2 = [];
      }
      this.zzyqArr1 = obj;
      this.zzyqArr2 = allId;
      if (num == 1) {
        let setzzSearchValue = JSON.stringify(this.zzyqArr1);
        let setzzSearchValue_checked = JSON.stringify(this.zzyqArr2);
        localStorage.setItem("setzzSearchValue", setzzSearchValue);
        localStorage.setItem(
          "setzzSearchValue_checked",
          setzzSearchValue_checked
        );
      }
    },
    onSearch(val) {
      this.zzyqArr1 = [];
      this.zzyqArr2 = [];
      this.centerDialogVisible = false;
      this.zzyqArr1 =
        localStorage.getItem("setzzSearchValue") != ""
          ? JSON.parse(localStorage.getItem("setzzSearchValue"))
          : [];
      this.zzyqArr2 = localStorage.getItem("setzzSearchValue_checked")
        ? JSON.parse(localStorage.getItem("setzzSearchValue_checked"))
        : [];
      this.searchQuali();
    },
    show_components() {
      this.checked = true;
      this.centerDialogVisible = true;
    },
    hide_components() {
      this.checked = false;
    },
    changeZZyq(val, arr) {
      this.upaData.zzyq = val;
      this.zzyqArr = arr;
      this.getData(arr.zzList);
    },
    backIndex() {
      this.$router.push({
        path: `/browser?login_service_id=${
          this.$route.query.login_service_id
        }&gsmc=${this.$route.query.gsmc}`
      });
    },
    openGs(row, model) {
      // 对model=2的跳转做数据处理
      if (model === 2) {
        row.gs_id = row.id;
        row.qymc = row.company_name;
      }
      this.axios.post(
        "/index/mine/role",
        {
          user_id: this.$store.state.userInfo.user_id,
          company_id: localStorage.getItem("company_id")
        },
        data => {
          this.role = data;
          if (this.role.company_role !== "C") {
            let { href } = this.$router.resolve({
              path: `/gsDetail?login_service_id=${
                this.$route.query.login_service_id
              }&qymc=${this.$route.query.qymc}&gs_id=${row.gs_id}&gsmc=${
                row.qymc
              }`
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
                    path: `/gs_scjst?login_service_id=${
                      this.$route.query.login_service_id
                    }&qymc=${this.$route.query.qymc}&gs_id=${row.gs_id}`
                  });
                  window.open(href, "/gs_scjst" + row.gs_id);
                } else {
                  let { href } = this.$router.resolve({
                    path: `/gs_building?login_service_id=${
                      this.$route.query.login_service_id
                    }&qymc=${this.$route.query.qymc}&gs_id=${row.gs_id}`
                  });
                  window.open(href, "/gs_building" + row.gs_id);
                }
              }
            );
          }
        }
      );
    },
    searchQuali() {
      let aptitude =
        localStorage.getItem("setzzSearchValue") != ""
          ? JSON.parse(localStorage.getItem("setzzSearchValue"))
          : [];
      let obj = {
        aptitude,
        // service_id: this.form.service_id,
        service_id: this.login_service_id
          ? this.login_service_id
          : this.$route.query.login_service_id,
        pro_type: this.CompanyList.pro_type,
        jbxx_id: this.form.jbxx_id,
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
    deleteLeaveWords(item) {
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let obj = {
            id: item.id,
            cate: "对手分析",
            user_id: localStorage.getItem("user_id")
          };
          this.axios.post("/index/element_set/delLeaveWords", obj, data => {
            if (data.status == "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getLeaveWords();
            } else {
              this.$message({
                message: data.message,
                type: "danger"
              });
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    getUserServiceRole() {
      let obj = {
        jbxx_id: this.form.jbxx_id,
        service_id: this.login_service_id
          ? this.login_service_id
          : this.$route.query.login_service_id,
        user_id: localStorage.getItem("user_id"),
        friend_id: this.form.analyst_id
          ? this.form.analyst_id
          : this.$route.query.user_id
      };
      this.axios.post("/relation/role/userServiceRole", obj, data => {
        this.roleLoading = false;
        this.role = data.message.check_proj_detail;
        this.role1 = data.message.pro_detail;
      });
    },
    editComp() {
      let mycate;
      if (this.form.name == "zj") {
        mycate = "自己";
      } else {
        mycate = "外部";
      }
      let obj = {
        id: this.CompanyList.id,
        service_id: this.$route.query.login_service_id,
        pro_type: this.CompanyList.pro_type,
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id,
        gs_id: this.CompanyList.idList,
        analyst_id: this.CompanyList.analyst_id,
        analyst_name: this.CompanyList.analyst_name,
        status: this.CompanyList.status,
        words: this.CompanyList.words,
        cate: mycate,
        type: "1"
      };
      this.axios.post("/relation/pro_details/editComp", obj, data => {
        this.searchQuali();
        this.qylbSearch();
        this.getCompanyList();
      });
    },
    getPubList() {
      let obj = {
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id ? this.user_id : localStorage.getItem("user_id"),
        page: this.pubList.page,
        rows: this.pubList.rows
      };
      this.axios.post("/relation/pro_details/pubList", obj, data => {
        this.pubList.loading = false;
        this.pubList.data = data.rows ? data.rows : [];
        this.pubList.count = data.total ? data.total : 0;
        let NewArr = [];
        for (let i = 0; i < this.pubList.data.length; i++) {
          this.pubList.data[i].state = 0;
        }
      });
    },
    qylbSearch(num) {
      if (num == 1) {
        this.CompanyList.qylbRows = 10;
        this.CompanyList.qylPage = 1;
      }
      this.CompanyList.qylbLoading = true;

      let obj = {
        service_id: this.form.service_id,
        company: this.CompanyList.qylbInput,
        pro_type: "own",
        page: this.CompanyList.qylPage,
        rows: this.CompanyList.qylbRows,
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id,
        cate: this.CompanyList.cate
      };
      this.axios.post("/firm/firm_search/searchComp", obj, data => {
        this.CompanyList.qylbLoading = false;
        this.CompanyList.tableData = data.rows;
        this.CompanyList.qylbCount = data.count || 0;
        this.CompanyList.qylbTotal = data.total || 0;
      });
    },
    assignmentData() {
      this.upaData.qtyq = this.basicInfo.qtyq;
      this.upaData.ryyq = this.basicInfo.ryyq;
      this.upaData.xmmc = this.basicInfo.xmmc;
      this.upaData.xmyzdw = this.basicInfo.xmyzdw;
      this.upaData.yjyq = this.basicInfo.yjyq;
      this.upaData.zzyq = this.basicInfo.zzyq;
      this.upaData.zzyq_str = this.basicInfo.zzyq_str;
      this.upaData.zzyq_display = this.basicInfo.zzyq_display;
      this.zzyqArr = JSON.parse(this.basicInfo.zzyq_txt);
    },
    getZzyqData() {
      this.axios.post("/firm/Firm_search/getQualiDict", {}, data => {
        this.zzyqList = data.rows;
      });
    },
    getProvinceCity() {
      this.axios.post("/index/common/getProvinceCity", {}, data => {
        this.xmdqList = data;
      });
    },
    openAdd() {
      this.CompanyList.qylbInput = "";
      this.CompanyList.idList = "";
      this.CompanyList.id = "";
      this.dialogTableVisible = true;
      this.zzyqChooseList1 = [];
      this.zzyqChooseList = [];
      this.zzyqChooseList2 = [];
      this.zzyqChooseList3 = [];
      this.zzyqChooseList4 = [];
      this.zzyqChooseText1 = "";
      this.zzyqChooseText = "";
      this.zzyqChooseText2 = "";
      this.zzyqChooseText3 = "";
      this.zzyqChooseText4 = "";
      this.daleiName = "";
      this.daleiName1 = "";
      this.daleiName2 = "";
      this.daleiName3 = "";
      this.daleiName4 = "";
      this.zzyqChooseListPage = 1;
      this.CompanyList.qylPage = 1;
      this.CompanyList.qylbCount = 0;
      if (this.basicInfo.zzyq_txt) {
        let obj = JSON.parse(this.basicInfo.zzyq_txt);
        this.getData(obj.zzList, 1);
      }
      this.qylbSearch();
      this.searchQuali();
    },
    getRe_detail() {
      let obj = {
        service_id: this.login_service_id
          ? this.login_service_id
          : this.$route.query.login_service_id,
        jbxx_id: this.form.jbxx_id,
        gs_id: this.form.gs_id,
        analyst_id: this.form.analyst_id,
        cate: this.CompanyList.cate
      };
      if (this.share == 1 && this.form.name != "wb") {
        obj.analyst_id = this.user_id;
      }
      this.axios.post("/relation/pro_details/re_detail", obj, data => {
        this.basicInfo = data.rows;
        if (data.rows.zzyq_txt) {
          this.defaultZzyq = JSON.parse(data.rows.zzyq_txt);
          this.defaultZzyq = this.defaultZzyq.selected_all_data;
        }
        if (this.share == "1") {
          if (this.basicInfo.role == "圈内") {
            this.getUserServiceRole();
          }
        }
        this.quanNeiWaiSta = this.basicInfo.role;
        this.$set(this.basicInfo, "zzyqText", this.basicInfo.zzyq);
        this.checkList = [];
        this.roleLoading = false;
        if (this.basicInfo.zzyq) {
          this.checkList.push("资质要求");
          this.zzyqState = true;
        }
        if (this.basicInfo.zzyq_str) {
          this.checkList.push("资质要求");
          this.zzyqState = true;
          this.zzyqStrState = true;
        }
        // console.log(this.zzyqState)
        if (this.basicInfo.ryyq) {
          this.checkList.push("人员要求");
          this.ryyqState = true;
        }
        if (this.basicInfo.yjyq) {
          this.checkList.push("业绩要求");
          this.yjyqState = true;
        }
        if (this.basicInfo.qtyq) {
          this.checkList.push("其他");
          this.qtyqState = true;
        }
        if (this.basicInfo.zzyq) {
          let NewArr = [];
          let arr = this.basicInfo.zzyq.split(",");
          for (let i = 0; i < arr.length; i++) {
            let b = arr[i].split("_");
            NewArr.push(b);
          }
          this.basicInfo.zzyq = NewArr;
        }
        if (this.basicInfo.xmdq) {
          this.upaData.xmdq = this.basicInfo.xmdq;
          this.upaData.xmdqList = [];
          let arr = this.basicInfo.xmdq.split("/");
          for (let i = 0; i < arr.length; i++) {
            this.upaData.xmdqList.push(arr[i]);
          }
        }
        this.getProvinceCity(); //获取地区options
        // this.upaData = JSON.stringify(this.upaData);
        // this.upaData = JSON.parse(this.upaData);
        this.assignmentData();
        this.getData(this.basicInfo.zzyq_txt);
      });
    },

    ModifyData() {
      this.$confirm("此操作将修改项目基本信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.upaData.xmmc == "") {
            this.$message("请填写项目名称");
          }
          if (this.upaData.xmmc.length < 2) {
            this.$message("项目名称最少两个字");
          } else {
            let obj = {
              jbxx_id: this.form.jbxx_id,
              xmmc: this.upaData.xmmc,
              xmyzdw: this.upaData.xmyzdw,
              xmdq: this.upaData.xmdq,
              zzyq: this.zzyqState ? this.upaData.zzyq : "",
              zzyq_str: this.upaData.zzyq_str,
              ryyq: this.ryyqState ? this.upaData.ryyq : "",
              yjyq: this.yjyqState ? this.upaData.yjyq : "",
              qtyq: this.qtyqState ? this.upaData.qtyq : "",
              // zzyq: this.upaData.zzyq,
              // ryyq: this.upaData.ryyq,
              // yjyq: this.upaData.yjyq,
              // qtyq: this.upaData.qtyq,
              role: this.basicInfo.role,
              zzyq_txt: JSON.stringify(this.zzyqArr)
            };
            this.axios.post("/relation/pro_details/editPro", obj, data => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              localStorage.setItem("zzyqArr", "");
              localStorage.setItem("setzzSearchValue", "");
              localStorage.setItem("setzzSearchValue_checked", "");
              let arr = JSON.stringify(this.zzyqArr);
              let arr1 = JSON.stringify(this.zzyqArr1);
              let arr2 = JSON.stringify(this.zzyqArr2);
              localStorage.setItem("zzyqArr", arr);
              localStorage.setItem("setzzSearchValue", arr1);
              localStorage.setItem("setzzSearchValue_checked", arr2);
              this.getRe_detail();
            });
          }
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    getLeaveWords() {
      let obj = {
        jbxx_id: this.form.jbxx_id,
        type: 0,
        type_id: this.user_id,
        cate: "对手分析"
      };
      this.axios.post("/Index/element_set/getLeaveWords", obj, data => {
        this.LeaveMessage.data = data.message;
        this.LeaveMessage.total = data.total || 0;
      });
    },
    submitMsg() {
      if (this.LeaveMessage.concent != "") {
        let obj = {
          jbxx_id: this.form.jbxx_id,
          user_id: this.user_id,
          pid: "",
          type: 0,

          content: this.LeaveMessage.concent,
          reply_id: "",
          sender: this.user_id,
          receiver: "",
          cate: "对手分析"
        };
        this.axios.post("/Index/element_set/addLeaveWords", obj, daya => {
          this.getLeaveWords();
          this.LeaveMessage.concent = "";
          this.$message({
            message: "留言成功",
            type: "success"
          });
        });
      } else {
        this.$message({
          message: "请填写内容",
          type: "danger"
        });
      }
    },
    // 点击搜索
    onReset() {
      this.searchData.page = 1;
      this.total = 0;
      this.$refs.form1.resetFields();
      this.$refs.form2.resetFields();
      this.ajax_list();
    },
    changeListData(val) {
      for (let i = 0; i < val.length; i++) {
        if (val[1]) {
          this.upaData.xmdq = `${val[0]}/${val[1]}`;
        } else {
          this.upaData.xmdq = `${val[0]}`;
        }
      }
    },
    getAreaType() {
      let obj = {
        type: "招中标"
      };
      this.axios.post("/firm/Firm_Search/getAreaType", obj, data => {
        this.ssdqList = data;
      });
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
  // border-bottom: 1px solid black;
  box-shadow: 0 1px 4px 1px rgb(189, 187, 186);
}
#section {
  width: 70%;
  margin: 0 auto;
}
.pointer {
  cursor: pointer;
  font-size: 18px;
}
#share1 {
  position: fixed;
  right: 0px;
  bottom: calc(45%);
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
.dialog-footer {
  text-align: center;
}
.link_color {
  color: #409eff;
  cursor: pointer;
}
</style>
