<!--我的项目详情-->
<template>
  <div class="ItemInfo_content">
    <!-- 一级页面头部开始 -->
    <div class="content_header">
      <div class="tittle">{{projectPerformanceHeads.xmmc}}</div>
    </div>
    <!-- 一级页面头部结束 -->
    <!-- 一级页面身体开始 -->
    <div class="content_body">
      <div class="body_header">
        <div class="evryone">
          <div class="each">
            项目业主：
            <span style="font-size:16px">{{projectPerformanceHeads.xmyzdw}}</span>
          </div>
          <div class="each">
            项目地区：
            <span style="font-size:16px">{{projectPerformanceHeads.xmdq}}</span>
          </div>
          <div class="each">
            项目类型：
            <span style="font-size:16px">{{projectPerformanceHeads.xmlxB}}</span>
          </div>
          <!-- <div class="each_button">
            <el-button @click="buttonBlack">返回</el-button>
          </div>-->
        </div>
        <div class="evryone">
          <div class="evryone_one">项目进度：</div>
          <div class="evryone_two">
            <!--流程横排-->
            <div>
              <ul style="position: relative;margin:0 auto;" class="liu">
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg1+')',width:'270px',left:'0',zIndex:'100'}"
                >
                  <span
                    :style="{textAlign:'center',fontSize:'14px',color:projectPerformanceHeads.status == '预定'?'#ffffff':'#606266'}"
                  >{{projectPerformanceHeads.status=='预定'?projectPerformanceHeads.stage1:'预定'}}</span>
                </li>
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg2+')',width:'270px',left:'238px',zIndex:'99'}"
                >
                  <span
                    :style="{fontSize:'14px',color:projectPerformanceHeads.status == '报名'?'#ffffff':'#606266'}"
                  >{{projectPerformanceHeads.status=='报名'?projectPerformanceHeads.stage2:'报名'}}</span>
                </li>
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg3+')',width:'270px',left:'475px',zIndex:'98'}"
                >
                  <span
                    :style="{fontSize: '14px',color:projectPerformanceHeads.status == '标书'?'#ffffff':'#606266'}"
                  >{{projectPerformanceHeads.status=='标书'?projectPerformanceHeads.stage3:'标书'}}</span>
                </li>
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg4+')',width:'270px',left:'711px',zIndex:'97'}"
                >
                  <span
                    :style="{fontSize: '14px',color:projectPerformanceHeads.status == '开标'?'#ffffff':'#606266'}"
                  >{{projectPerformanceHeads.status=='开标'?projectPerformanceHeads.stage4:'开标'}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- <div class="evryone">
          <div class="first">投标人资质条件、能力和信誉:</div>
          <div class="second">
            <el-button size="small" v-if="user_btn.btn1" :disabled="user_btn.disable1" type="primary" plain @click="ConfigurationLook">
              配置查看
              <i v-if="iconclass" class="el-icon-success el-icon--right" style="color:#3dc357"></i>
              <i v-else class="el-icon-question el-icon--right" style="color:#d1d1d1"></i>
            </el-button>
            <el-button size="small" v-if="user_btn.btn2" plain type="primary" :disabled="user_btn.disable2" @click="config_wj = true">配置文件</el-button>
          </div>
        </div>-->
      </div>
      <div class="body_content">
        <div class="information">
          <div class="informatin_header">项目信息</div>
          <div class="xmxx_class">
            <div class="myrow">
              <div>资质要求</div>
              <div class="mycol_1">{{projectPerformanceHeads.zzyq}}</div>
            </div>
            <div class="myrow">
              <div>人员要求</div>
              <div class="mycol_1">{{projectPerformanceHeads.ryyq}}</div>
            </div>
            <div class="myrow">
              <div>业绩要求</div>
              <div class="mycol_1">{{projectPerformanceHeads.yjyq}}</div>
            </div>
            <div class="myrow">
              <div>其它要求</div>
              <div class="mycol_1">{{projectPerformanceHeads.qtyq}}</div>
            </div>
            <!-- <div class="myrow">
              <div>招标公告</div>
              <div class="mycol_1">
                <el-button size="mini" type="primary" v-if="!projectPerformanceHeads.zbxx_id" :disabled="projectPerformanceHeads.status == '预定'" @click="onClickPassFirst">选择文件</el-button>
                <a v-if="projectPerformanceHeads.zbxx_id" style="color: #409EFF;" :href="'http://www.520coc.cn/CompanyRounds/getMassage?zbgsid=&type=0&zbwj=undefined&zbqd=undefined&zbxxid='+projectPerformanceHeads.zbxx_id" target="_blank">点击查看</a>
              </div>
            </div>-->
            <!-- <div class="myrow">
              <div>招标文件</div>
              <div class="mycol_1">
                <el-button type="primary" @click="openFileList(1)" :disabled="projectPerformanceHeads.status == '预定'" size="mini">查看编辑</el-button>
              </div>
            </div>
            <div class="myrow">
              <div>清单</div>
              <div class="mycol_1">
                <el-button type="primary" @click="openFileList(2)" :disabled="projectPerformanceHeads.status == '预定'" size="mini">查看编辑</el-button>
              </div>
            </div>-->
          </div>
        </div>
        <!-- 数据表格 -->
        <div class="table" style="height:760px;margin:20px auto 45px;">
          <div class="table_header">相关企业</div>
          <div class="table_footer">
            <el-table :data="tableDataFirst.rows" v-loading="loading1" border>
              <el-table-column label="序号" header-align="center" align="center" width="60">
                <template slot-scope="scope">{{scope.$index+(pageL-1)*10+1}}</template>
              </el-table-column>
              <el-table-column prop="name" label="企业名称" min-width="40%" align="center">
                <template slot-scope="scope">
                  <el-button @click="open_gs(scope.row)" type="text">{{scope.row.gsmc}}</el-button>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="reserve" label="预订" align="center" min-width="12%">
                <template slot-scope="scope">
                  <el-tooltip class="item" :disabled="!scope.row.reserve_txt" effect="dark" :content="scope.row.reserve_txt" placement="top">
                    <el-button type="text" style="color:#606266" @click="onShowTk('reserve_txt',scope.row)">
                      <i :class="scope.row.reserve=='已预订'?'el-icon-circle-check':'el-icon-error'" :style="{color:scope.row.reserve=='已预订'?'#10CF46':'#f56c6c',fontSize:'17px'}"></i>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="报名" props="entry" align="center" min-width="12%">
                <template slot-scope="scope">
                  <el-tooltip class="item" :disabled="!scope.row.entry_txt" effect="dark" :content="scope.row.entry_txt" placement="top">
                    <el-button type="text" style="color:#606266" @click="onShowTk('bmxx_txt',scope.row)">
                      <i :class="scope.row.entry=='已报名'?'el-icon-circle-check':'el-icon-error'" :style="{color:scope.row.entry=='已报名'?'#10CF46':'#f56c6c',fontSize:'17px'}"></i>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column width="100" label="遇到的问题" align="center" prop="difficult_txt">
                <template slot-scope="scope">
                  <el-tooltip class="item" :disabled="!scope.row.difficult_txt" effect="dark" :content="scope.row.difficult_txt" placement="top">
                    <el-button type="text" style="color:#606266" @click="onShowTk('difficult_txt',scope.row)">
                      <i :class="scope.row.difficult?'el-icon-circle-check':'el-icon-error'" :style="{color:scope.row.difficult?'#10CF46':'#f56c6c',fontSize:'17px'}"></i>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column width="100" label="积分" align="center" prop="jf">
                <template slot-scope="scope">
                  <el-button type="text" @click="jfFn().onShow(scope.row)" :style="{color:scope.row.integral<0?'red':''}">{{scope.row.integral}}</el-button>
                </template>
              </el-table-column>-->
              <el-table-column width="300" label="留言" align="center" prop="ly">
                <template slot-scope="scope">
                  <el-button type="text" @click="lyFn().onShow(scope.row)">{{scope.row.count_words}}</el-button>
                </template>
              </el-table-column>
              <!-- <el-table-column width="80" label="操作">
                <template slot-scope="scope">
                  <el-button size="small" @click="onOpen(scope.row)" type="primary">查看</el-button>
                </template>
              </el-table-column>-->
            </el-table>
            <el-pagination
              align="right"
              style="margin-top:10px"
              @current-change="changePage"
              background
              layout="total,prev, pager, next"
              :total="totalL"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 招标公告点击上传二级弹窗开始-->
    <div class="biddingAnnouncement">
      <el-dialog title="招标公告" :visible.sync="biddingAnnouncement" width="80%">
        <item-import types="业绩详情" @onChild_row="onChildzbgg_row"></item-import>
      </el-dialog>
    </div>
    <!--招标公告点击上传结束-->
    <!-- 配置文件 -->
    <el-dialog :visible.sync="config_wj" title="配置信息" @open="onShow_configTk" width="70%">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input @change="aa" type="textarea" :rows="20" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-col>
        <el-col :span="12" style="height:430px;overflow:auto">
          <div class="tj_row" v-for="(row,index) in config_wjData" :key="index">
            <p class="tjtitle">{{row.title}}</p>
            <p style="word-wrap:break-word;padding-left: 30px" v-html="row.txt"></p>
          </div>
        </el-col>
        <el-col align="center" style="margin-top:10px">
          <el-button @click="onSaveWj" type="primary">保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- <el-dialog :visible.sync="taskTk" :title="tkTxt+':'+clickgsRow.gsmc" width="500px">
      <div style="display:flex;justify-content:center">
        <div style="margin-right:20px" v-if="this.tkType == 'difficult_txt'">
          <el-select v-model="taskData.phase" placeholder="请选择原因">
            <el-option v-for="item in noOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div>
          <el-input placeholder="备注" v-model="taskData.txt" @keyup.enter.native="onSavetask"></el-input>
        </div>
      </div>
      <div style="margin-top:20px;text-align:center">
        <el-button size="small" type="danger" @click="onDeltask">{{tkTxt=='有问题'?'公司没有问题':'不'+tkTxt}}</el-button>
        <el-button size="small" type="primary" @click="onSavetask">{{tkTxt}}</el-button>
      </div>
    </el-dialog>-->
    <!-- 留言 -->
    <el-dialog :title="'留言:'+clickgsRow.gsmc" :visible.sync="ly.dialog">
      <leave-word :needData="ly.needData" @onChangeData="onChangePlData"></leave-word>
    </el-dialog>
    <!-- 积分 -->
    <!-- <el-dialog :title="'积分:'+clickgsRow.gsmc" :visible.sync="jf.dialog">
      <jf-list :needData="jf.needData" @onChangeData="onChangeJfData"></jf-list>
    </el-dialog>-->
    <el-dialog :visible.sync="zbwj.visible" title="招标文件" width="500px">
      <div>
        <el-upload
          multiple
          class="upload-demo"
          :action="updateUrl"
          :data="updateData"
          :on-change="handleChange"
          :on-success="uploadSuccess"
          :on-remove="uploadRemove"
          :file-list="zbwj.fileList"
          :on-preview="openFile"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div style="margin: 0 auto;margin-top: 30px;margin-bottom:10px;">
          <div style="border-left: 1px solid #ffffff;text-align:center">
            <el-button type="success" @click="handleSubmit('formValidate')" style="width:100px;">提交</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="zjqd.visible" title="招标文件" width="500px">
      <div>
        <el-upload
          multiple
          class="upload-demo"
          :action="updateUrl"
          :data="updateData"
          :on-change="handleChange"
          :on-success="uploadSuccess"
          :on-remove="uploadRemove"
          :file-list="zjqd.fileList"
          :on-preview="openFile"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div style="margin: 0 auto;margin-top: 30px;margin-bottom:10px;">
          <div style="border-left: 1px solid #ffffff;text-align:center">
            <el-button type="success" @click="handleSubmit('formValidate')" style="width:100px;">提交</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import ItemImport from "./ItemImport.vue";
import EnterpriseNamePopover from "./sonPage/EnterpriseNamePopover.vue";
import leaveWord from "./template/leaveWord.vue"; //留言组件
// import jfList from "./sonPage/jfList.vue"; //积分组件
import Updata from "./../updata";

//引入图片
import l1u from "../assets/l1u.png";
import l1d from "../assets/l2d.png";
import l2u from "../assets/l1u.png";
import l2d from "../assets/l2d.png";
import l5u from "../assets/l5u.png";
import l5d from "../assets/l5d.png";
import { scrypt } from "crypto";
export default {
  components: {
    ItemImport,
    EnterpriseNamePopover,
    leaveWord
    // jfList
  },
  name: "ItemInfo",
  data () {
    return {
      
      updateUrl:
        "https://wechat.cdzjkl.com/index/Human_Review/uploadFile",
      updateData: {
        token: localStorage.getItem("token"),
        login_company_id: localStorage.getItem("company_id"),
        login_user_id: localStorage.getItem("user_id")
      },
      zbwj: {
        visible: false,
        fileList: [],
        //上传前处理成组的fileList
        getFileList: [],
        upfile: ""
      },
      zjqd: {
        visible: false,
        fileList: [],
        //上传前处理成组的fileList
        getFileList: [],
        upfile: ""
      },
      clickGs_id: "", //点击的公司id
      // 公司操作列表数据
      noOptions: [
        {
          label: "不好合作",
          value: "1"
        },
        {
          label: "其他人已拿",
          value: "2"
        },
        {
          label: "其他情况",
          value: "3"
        }
      ],
      //切换表格
      tkTxt: "预定",
      taskTk: false,
      tkType: "",
      taskData: {
        txt: "",
        phase: ""
      },
      // 公司切换
      tableIndex: 1,
      tableStyleL:
        "box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);min-height:810px;position:absolute;width:80%;z-index:10;",
      tableStyleR:
        "box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);min-height:810px;position:absolute;width:80%;z-index:8;",
      //流程用图
      button_radio: {
        l1: l1u,
        l2: l2u,
        l3: l2u,
        l4: l2u,
        l5: l5u,
        l6: l1d,
        l7: l2d,
        l8: l5d
      },
      li: {
        bg1: "",
        bg2: "",
        bg3: "",
        bg4: ""
      },
      user_btn: {
        btn1: false,
        btn2: false,
        disable1: true,
        disable2: true
      },
      config_wjData: null, //配置文件数据
      textarea: null, //多行输入框
      config_wj: false, //配置文件弹框
      clickgsRow: "", //点击公司当前行数据
      openObj: {},
      jbxx_id: this.$route.query.jbxx_id,
      loading1: false,
      loading2: false,
      nameTittle: "",
      pageL: 1,
      pageR: 1,
      totalR: 0,
      totalL: 0,
      biddingAnnouncement: false, //招标公告弹窗
      title: "项目详情",
      projectPerformanceHeads: [],
      updata: {}, //上传文件
      content: {
        firstName: true
      },
      lefts: [
        {
          name: "资质要求"
        },
        {
          name: "人员要求"
        },
        {
          name: "业绩要求"
        },
        {
          name: "其他要求"
        }
      ],
      tableDataFirst: [
        //首页下面的表格
      ],
      noTableDataFirst: [],
      //留言数据
      ly: {
        dialog: false,
        needData: { gs_id: "" }
      },
      //积分
      jf: {
        dialog: false,
        needData: {}
      },
      scType: 1,
      role: {}
    };
  },
  mounted () { },
  created () {
    // console.log(this.$route);

    const self_ = this;
    window.addEventListener(
      "message",
      function (event) {
        //父接受
        if (event.data == "刷新") {
          self_.getItemInfo();
        } else if (event.data == "公司刷新") {
          self_.getLists(self_.tableIndex);
        }
      },
      false
    );
    this.axios.post(
      "/index/mine/getComponent",
      {
        user_id: this.$store.state.userInfo.user_id,
        jbxx_id: this.$route.query.jbxx_id
      },
      data => {
        if (data.status == "success") {
          data.message.forEach(v => {
            if (v.title == "配置文件") {
              this.user_btn.btn2 = true;
              if (v.flag == 1) {
                this.user_btn.disable2 = false;
              }
            } else if (v.title == "配置查看") {
              this.user_btn.btn1 = true;
              if (v.flag == 1) {
                this.user_btn.disable1 = false;
              }
            }
          });
        }
      }
    );
    this.fn_role();
    this.getItemInfo();
    this.getLists(1); //已拿到公司
    this.getLists(2); //未拿到公司
  },
  computed: {
    iconclass () {
      //配置查看的显示
      var a = this.projectPerformanceHeads;
      if (a.zz_id || a.ry_id || a.yj_id) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {},
  methods: {
    // 权限控制 点击公司名称时
    fn_role () {
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
    //点击打开上传文件的列表
    openFileList (type) {
      if (type == 1) {
        this.scType = 1;
        this.zbwj.visible = true;
      } else {
        this.scType = 2;
        this.zjqd.visible = true;
      }
    },
    //填充上传列表
    allFileList () {
      var a = this.projectPerformanceHeads.zbwj
        ? decodeURI(this.projectPerformanceHeads.zbwj).split(",")
        : [];
      var b = this.projectPerformanceHeads.zbwj_time
        ? decodeURI(this.projectPerformanceHeads.zbwj_time).split(",")
        : [];
      this.zbwj.fileList = [];
      for (var i = 0; i < a.length; i++) {
        this.zbwj.fileList.push({
          name: a[i],
          response: {
            data: {
              filename_time: b[i]
            }
          }
        });
      }
      var c = this.projectPerformanceHeads.zjqd
        ? decodeURI(this.projectPerformanceHeads.zjqd).split(",")
        : [];
      var d = this.projectPerformanceHeads.zjqd_time
        ? decodeURI(this.projectPerformanceHeads.zjqd_time).split(",")
        : [];
      this.zjqd.fileList = [];
      for (var i = 0; i < c.length; i++) {
        this.zjqd.fileList.push({
          name: c[i],
          response: {
            data: {
              filename_time: d[i]
            }
          }
        });
      }
    },
    //上传文件的诸多方法
    uploadSuccess (response, file, fileList) {
      if (this.scType == 1) {
        this.zbwj.fileList = fileList;
      } else {
        this.zjqd.fileList = fileList;
      }
    },
    handleChange () { },
    uploadRemove (file, fileList) {
      if (this.scType == 1) {
        this.zbwj.fileList = fileList;
        var c = file.response.data.filename_time;
        this.axios.post(
          "/index/project/re_edit",
          {
            zbwj_del: c,
            jbxx_id: this.$route.query.jbxx_id
          },
          data => {
            alert("111");
          }
        );
      } else {
        this.zjqd.fileList = fileList;
        var c = file.response.data.filename_time;
        this.axios.post(
          "/index/project/re_edit",
          {
            zjqd_del: c,
            jbxx_id: this.$route.query.jbxx_id
          },
          data => {
            alert("222");
          }
        );
      }
    },
    handleSubmit () {
      if (this.scType == 1) {
        // console.log(this.scType)
        if (this.zbwj.fileName == "") {
          this.$Modal.error({
            title: "",
            content: "未选择文件!"
          });
          return;
        }
        var ajax = "";
        for (var i = 0; i < this.zbwj.fileList.length; i++) {
          if (i == this.zbwj.fileList.length - 1) {
            ajax =
              ajax +
              this.zbwj.fileList[i].response.data.filename_time;
          } else {
            ajax =
              ajax +
              this.zbwj.fileList[i].response.data.filename_time +
              ",";
          }
        }
        ajax = encodeURI(ajax);
        this.axios.post(
          "/index/project/re_edit",
          {
            zbwj: ajax,
            jbxx_id: this.$route.query.jbxx_id
          },
          data => {
            alert("欧耶111");
          }
        );
      } else {
        console.log(this.scType);
        if (this.zjqd.fileName == "") {
          this.$Modal.error({
            title: "",
            content: "未选择文件!"
          });
          return;
        }
        var ajax = "";
        for (var i = 0; i < this.zjqd.fileList.length; i++) {
          if (i == this.zjqd.fileList.length - 1) {
            ajax =
              ajax +
              this.zjqd.fileList[i].response.data.filename_time;
          } else {
            ajax =
              ajax +
              this.zjqd.fileList[i].response.data.filename_time +
              ",";
          }
        }
        ajax = encodeURI(ajax);
        this.axios.post(
          "/index/project/re_edit",
          {
            zjqd: ajax,
            jbxx_id: this.$route.query.jbxx_id
          },
          data => {
            alert("欧耶222");
          }
        );
      }
    },
    changeType () {
      // console.log(this.getFileList+'码')
      // console.log(decodeURI(this.getFileList))
      //return
      this.zbwj.fileList = this.zbwj.getFileList
        ? JSON.parse(decodeURI(this.zbwj.getFileList))
        : [];
    },
    openFile (file) {
      console.log(file);
      window.open(
        
        "https://wechat.cdzjkl.com/files/options/" +
        file.response.data.filename_time
      );
    },
    //显示任务弹框
    onShowTk (type, row) {
      this.taskTk = true;
      this.clickgsRow = row;
      this.tkType = type;
      if (type == "reserve_txt") {
        this.tkTxt = "预订";
      } else if (type == "bmxx_txt") {
        this.tkTxt = "报名";
      } else {
        this.tkTxt = "有问题";
      }
      let query_data = {
        gs_id: row.gs_id,
        jbxx_id: this.jbxx_id
      };
      this.clickGs_id = row.gs_id;
      this.axios.post(
        "/index/element_set/execPhaseTxt",
        query_data,
        data => {
          if (!data.rows) {
            this.taskData = { txt: "", phase: "" };
            return;
          }
          var obj = data.rows.filter(v => {
            return v.column == type;
          });
          if (!obj[0]) {
            this.taskData = { txt: "", phase: "" };
            return;
          }
          if (obj[0].phase == "不好合作") {
            obj[0].phase = "1";
          } else if (obj[0].phase == "其他人已拿") {
            obj[0].phase = "2";
          } else {
            obj[0].phase = "3";
          }
          this.taskData = obj[0];
        }
      );
    },
    // 取消任务
    onDeltask () {
      let query_data = {
        gs_id: this.clickGs_id,
        jbxx_id: this.jbxx_id,
        column: this.tkType
      };
      this.axios.post("/Index/element_set/delTxt", query_data, data => {
        this.$message.success("完成");
        this.getLists(1);
        this.getLists(2);
        this.taskTk = false;
      });
    },
    //保存任务
    onSavetask () {
      let query_data = {
        gs_id: this.clickGs_id,
        jbxx_id: this.jbxx_id
      };
      if (this.tkType == "reserve_txt") {
        query_data.reserve = 1;
        query_data.reserve_txt = this.taskData.txt;
      } else if (this.tkType == "bmxx_txt") {
        query_data.bmxx = 1;
        query_data.bmxx_txt = this.taskData.txt;
      } else {
        if (!this.taskData.phase) {
          this.$message.error("请选择原因");
          return;
        }
        query_data.difficult = this.taskData.phase;
        query_data.difficult_txt = this.taskData.txt;
      }
      this.axios.post(
        "/Index/element_set/editCompanyExecPhase",
        query_data,
        data => {
          this.$message.success("完成");
          this.getLists(this.tableIndex);
          if (this.tableIndex == 2) {
            if (this.tkType != "difficult_txt") {
              this.getLists(1);
            }
          } else if (this.tkType == "difficult_txt") {
            this.getLists(2);
          }
          this.taskTk = false;
        }
      );
    },
    //获取公司列表
    getLists (type) {
      //公司列表
      this["loading" + type] = true;
      this.axios.post(
        "/index/company/ownCompany",
        {
          jbxx_id: this.$route.query.jbxx_id,
          user_id: this.$store.state.userInfo.user_id,
          company_id: this.$store.state.userInfo.company_id,
          cate: type,
          page: type == 1 ? this.pageL : this.pageR,
          rows: "10"
        },
        data => {
          this["loading" + type] = false;
          if (type == 1) {
            this.totalL = data.total || 0;
            this.tableDataFirst = data;
          } else {
            this.totalR = data.total || 0;
            this.noTableDataFirst = data;
          }
        }
      );
    },
    //改变页面
    changePage (val) {
      if (this.tableIndex == 1) {
        this.pageL = val;
      } else {
        this.pageR = val;
      }
      this.getLists(this.tableIndex);
    },

    //渲染进度横条
    jindu () {
      this.li.bg1 =
        this.projectPerformanceHeads.status == "预定"
          ? this.button_radio.l1
          : this.button_radio.l6;
      this.li.bg2 =
        this.projectPerformanceHeads.status == "报名"
          ? this.button_radio.l2
          : this.button_radio.l7;
      this.li.bg3 =
        this.projectPerformanceHeads.status == "标书"
          ? this.button_radio.l3
          : this.button_radio.l7;
      this.li.bg4 =
        this.projectPerformanceHeads.status == "开标"
          ? this.button_radio.l5
          : this.button_radio.l8;
    },
    aa (v) {
      console.log(v);
    },
    //保存条件
    onSaveWj () {
      this.getTextarea("save");
    },
    //显示弹框
    onShow_configTk () {
      //this.getTextarea('see')
      // 获取配置文字
      this.axios.post(
        "/index/mine/txt",
        { thread_id: this.projectPerformanceHeads.thread_id },
        data => {
          this.config_wjData = data.rows;
        }
      );
    },
    //文本框
    getTextarea (type) {
      this.axios.post(
        "/index/mine/zbxx_txt",
        {
          jbxx_id: this.$route.query.jbxx_id,
          txt: this.textarea,
          type
        },
        data => {
          if (data.status == "success") {
            if (type == "save") {
              this.$message.success("成功");
              this.config_wj = false;
            } else {
              this.textarea = data.message.zbxx_txt;
            }
          }
        }
      );
    },
    // 获取项目基本信息
    getItemInfo () {
      this.axios.post(
        //项目基本信息
        "/index/project/re_detail",
        {
          jbxx_id: this.$route.query.jbxx_id,
          user_id: this.$store.state.userInfo.user_id
        },
        data => {
          this.projectPerformanceHeads = data.rows;
          this.jindu();
          this.allFileList();
          document.title = this.projectPerformanceHeads.xmmc;
        }
      );
    },
    //上传文件改变
    onChange_file (el) {
      // this.updataFile(el);
      Updata.updataFile(el, this, () => {
        this.getItemInfo();
      });
    },
    /**一级页面的点击事件开始**/
    ConfigurationLook () {
      //配置查看按钮
      let thread_id = this.projectPerformanceHeads.thread_id || "";
      let { href } = this.$router.resolve({
        path: `/iteminfo/ItemConfig?jbxx_id=${
          this.$route.query.jbxx_id
          }&thread_id=${thread_id}`
      });
      window.open(href, "_blank");
      // this.$router.push({
      //   path: "/iteminfo/ItemConfig",
      //   query: { jbxx_id: this.$route.query.jbxx_id,thread_id:this.projectPerformanceHeads.thread_id}
      // });
    },
    onClickPassFirst () {
      //招标公告上传按钮
      this.biddingAnnouncement = true;
    },
    //上传招标公告子组件事件
    onChildzbgg_row () {
      this.biddingAnnouncement = false;
      this.getItemInfo();
    },
    //企业名称的点击事件
    onOpen (data) {
      let thread_id = this.projectPerformanceHeads.thread_id || "";
      let { href } = this.$router.resolve({
        path: `/itemGsInfo?jbxx_id=${this.$route.query.jbxx_id}&gs_id=${
          data.gs_id
          }`
      });
      window.open(href, "gs_" + data.gs_id);
    },
    // 积分
    jfFn () {
      let onShow = row => {
        this.clickgsRow = row;
        this.jf.dialog = true;
        this.jf.needData = {
          gs_id: row.gs_id
        };
      };
      return {
        onShow
      };
    },
    //留言
    lyFn () {
      let onShow = row => {
        this.clickgsRow = row;
        this.ly.dialog = true;
        this.ly.needData = {
          gs_id: row.gs_id,
          cate: "分配"
        };
      };
      return {
        onShow
      };
    },
    //打开公司详情
    open_gs (row) {
      if (this.role.company_role !== "C") {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.gsmc}`
        });
        window.open(href, "公司详情" + row.gs_id);
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
    // 积分回调
    onChangeJfData () {
      this.getLists(this.tableIndex);
    },
    //评论回调
    onChangePlData () {
      this.getLists(this.tableIndex);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.tj_row {
  margin-bottom: 20px;
  .tjtitle {
    font-size: 16px;
    color: #222222;
  }
  .tj_text {
    word-wrap: break-word;
    text-indent: 30px;
  }
}
.xmxx_class {
  margin-left: 50px;
  font-size: 14px;
}
.myrow {
  margin: 20px 0;
  display: flex;
}
.myrow > div:first-child {
  width: 120px;
}
.mycol_1 {
  flex: 1;
}
a:link {
  color: #409eff;
  text-decoration: none;
}

.ItemInfo_content {
  // 一级页面头部开始
  .content_header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .tittle {
      // line-height: 60px;
      padding: 14px 0;
      -moz-box-shadow: 0px 0px 0px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      width: 100%;
      font-size: 32px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
  // 一级页面头部结束

  // 一级页面身体开始
  .content_body {
    display: flex;
    padding: 25px;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    // height: calc(~'100% - 60px');
    background: #f9f9f9;
    .body_header {
      height: 120px;
      background: #ffffff;
      margin-bottom: 20px;
      -moz-box-shadow: 0px 0px 5px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      .evryone {
        display: flex;
        flex-direction: row;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        .each {
          margin-left: 25px;
          height: 60px;
          justify-content: center;
          span {
            color: #606266;
          }
        }
        .each_button {
          width: 49%;
          height: 60px;
          text-align: right;
          padding-right: 25px;
        }
        .evryone_one {
          width: 125px;
          height: 60px;
          margin-left: 25px;
        }
        .first {
          margin-left: 25px;
          margin-right: 10px;
        }
        .second {
          color: #409eff;
          font-size: 18px;
        }
        .evryone_two {
          height: 28px;
          display: flex;
          flex-direction: row;
          // width: 740px;
          // height: 20px;
          margin-top: 10px;
          font-size: 14px;
          color: #000000;
          .eachOne {
            width: 250px;
            line-height: 28px;
            height: 28px;
            text-align: center;
          }
          .active {
            background-image: url("../assets/jd.png");
            background-repeat: no-repeat;
            background-size: cover;
            width: 250px;
            height: 28px;
            text-align: center;
            color: #ffffff;
          }
        }
      }
      .evryone:nth-child(3),
      .evryone:nth-child(2) {
        border: none;
      }
    }
    .body_content {
      background: #ffffff;
      // height: calc(~'100% - 270px');
      -moz-box-shadow: 0px 0px 5px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      .information {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        .informatin_header {
          display: flex;
          margin-left: 25px;
          font-size: 20px;
          height: 50px;
          line-height: 50px;
        }
        .infromation_body {
          font-size: 14px;
          display: flex;
          flex-direction: row;
          margin-left: 50px;
          .each_left {
            display: flex;
            width: 100px;
            flex-direction: column;
            margin-right: 25px;
            .left_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
          }
          .each_right {
            display: flex;
            flex-direction: column;
            .right_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
            // .right_each_two {
            //   margin-bottom: 20px;
            //   color: #06b6ff;
            // }
            .right_botton {
              display: flex;
              flex-direction: row;
              color: #409eff;
              .button_left {
                display: flex;
                flex-direction: column;
                margin-right: 115px;
                .right_each_two {
                  cursor: pointer;
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
              }
              .button_right {
                border: 1px solid #9d9d9d;
                padding-left: 20px;
                padding-right: 80px;
                display: flex;
                flex-direction: column;
                align-content: center;
                display: flex;
                .right_each_two {
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
                .right_each_two:last-child {
                  margin-bottom: 0px;
                }
              }
            }
          }
        }
      }
      .table {
        display: flex;
        flex-direction: column;
        .table_header {
          margin-left: 25px;
          font-size: 20px;
          margin-bottom: 25px;
          margin-right: 25px;
        }
        .table_footer {
          margin-left: 25px;
          display: block;
          margin-right: 25px;
        }
      }
      .body_footer {
        margin: 0 25px;
        background: #f2f2f2;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        margin-top: 30px;
        margin-bottom: 60px;
      }
    }
  }
}
</style>
<style scoped>
.liu li {
  width: 250px;
  height: 28px;
  float: left;
  list-style: none;
  position: absolute;
  text-align: center;
  line-height: 28px;
}
</style>
<style scoped>
.liu li {
  width: 250px;
  height: 28px;
  float: left;
  list-style: none;
  position: absolute;
  text-align: center;
  line-height: 28px;
}
</style>