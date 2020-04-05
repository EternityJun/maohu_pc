<!--项目详情-->
<template>
  <div class="dialog_body">
    <div class="dialog_header">
      <div class="evryone">
        <div class="evryone_first" style="margin-left:25px">{{yjInfo.xmmc}}</div>
      </div>
      <div class="evryone" style="margin-left:25px">
        <div class="each">项目业主：{{yjInfo.xmyzdw}}</div>
        <div class="each">项目地区：{{yjInfo.xmdq}}</div>
        <div class="each">项目类型：{{yjInfo.xmlxB}}</div>
      </div>
      <div class="evryone">
        <div class="evryone_one">项目进度：</div>
        <div class="evryone_two">
          <div :class="yjInfo.status=='预定'?'active eachOne':'eachOne'">预定</div>
          <div
            :class="yjInfo.status==yjInfo.bm_jzrq?'active eachOne':'eachOne'"
          >{{yjInfo.bm_jzrq||'报名'}}</div>
          <div :class="yjInfo.status=='标书'?'active eachOne':'eachOne'">标书</div>
          <div
            :class="yjInfo.status==yjInfo.tb_jzrq?'active eachOne':'eachOne'"
          >{{yjInfo.tb_jzrq||'开标'}}</div>
        </div>
      </div>
    </div>
    <div class="dialog_content">
      <el-tabs v-model="activeName" class="tabs_label">
        <el-tab-pane label="项目信息" name="first">
          <div class="xmxx_class" style="margin-left:10px">
            <div class="myrow">
              <div>资质要求</div>
              <div class="mycol_1">{{yjInfo.zzyq}}</div>
            </div>
            <div class="myrow">
              <div>人员要求</div>
              <div class="mycol_1">{{yjInfo.ryyq}}</div>
            </div>
            <div class="myrow">
              <div>业绩要求</div>
              <div class="mycol_1">{{yjInfo.yjyq}}</div>
            </div>
            <div class="myrow">
              <div>其它要求</div>
              <div class="mycol_1">{{yjInfo.qtyq}}</div>
            </div>
            <div class="myrow">
              <div style="line-height:40px">招标公告</div>
              <div class="mycol_1">
                <a
                  class="right_each_two"
                  v-if="yjInfo.zbxx_id"
                  style="color: #06b6ff;"
                  :href="'http://www.520coc.cn/CompanyRounds/getMassage?zbgsid=&type=0&zbwj=undefined&zbqd=undefined&zbxxid='+yjInfo.zbxx_id"
                  target="_blank"
                >点击查看</a>
                <el-button
                  class="right_each_two"
                  type="text"
                  v-else
                  :disabled="disabledpass"
                  @click="onClickPassFirst"
                >点击上传</el-button>
              </div>
            </div>
            <div class="myrow">
              <div>招标文件</div>
              <div class="mycol_1">
                <a
                  class="right_each_two"
                  v-if="yjInfo.zbwj"
                  :href="yjInfo.zbwj"
                  style="color: #06b6ff;"
                  target="_blank"
                >点击下载</a>
                <a class="right_each_two" v-else>
                  <div style="position:relative">
                    <input
                      :disabled="disabledpass"
                      style="position:absolute;z-index:5;opacity:0;cursor:pointer"
                      type="file"
                      ref="zbwj"
                      @change="onChange_file('zbwj')"
                    >
                    <el-button
                      :disabled="disabledpass"
                      type="text"
                      style="position:absolute"
                      size="mini"
                    >选择文件</el-button>
                  </div>
                </a>
              </div>
            </div>
            <div class="myrow">
              <div>清单</div>
              <div class="mycol_1">
                <a
                  class="right_each_two"
                  v-if="yjInfo.zjqd?true:false"
                  :href="yjInfo.zjqd"
                  style="color: #06b6ff;"
                  target="_blank"
                >点击下载</a>
                <a class="right_each_two" v-else>
                  <div style="position:relative">
                    <input
                      :disabled="disabledpass"
                      style="position:absolute;z-index:5;opacity:0;cursor:pointer"
                      type="file"
                      ref="zjqd"
                      @change="onChange_file('zjqd')"
                    >
                    <el-button
                      type="text"
                      :disabled="disabledpass"
                      style="position:absolute"
                      size="mini"
                    >选择文件</el-button>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目机构管理" v-if="display.ry_type" name="second">
          <el-table :data="xmjgglRows"  style="width: 100%;" v-loading="loading">
            <el-table-column type="index" header-align="center" align="center"></el-table-column>
            <el-table-column align="center" prop="zw" label="职位" min-width="20%">
              <template slot-scope="scope">
                <span>{{scope.row.zw}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="姓名" min-width="12%">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.expire == 0"
                  target="_blank"
                  style="color:red;text-decoration:none"
                  :href="scope.row.http"
                >{{scope.row.name}}</a>
                <a
                  v-else
                  target="_blank"
                  style="color: rgb(64, 158, 255);text-decoration:none"
                  :href="scope.row.http"
                >{{scope.row.name}}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" label="职称" min-width="12%"></el-table-column>
            <el-table-column align="center" prop="rylb" label="证书名称" min-width="15%">
              <template slot-scope="scope">
                <span>{{scope.row.rylb}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dj" label="级别" min-width="10%">
              <template slot-scope="scope">
                <span>{{scope.row.dj}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="zsh" label="证号" min-width="15%">
              <template slot-scope="scope">
                <span>{{scope.row.zsh}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="zczy" label="专业" min-width="10%">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  :disabled="!scope.row.zczy"
                  effect="dark"
                  :content="scope.row.zczy"
                  placement="top"
                >
                  <label>{{scope.row.zczy.split(',').length >1?scope.row.zczy.split(',')[0]+'...':scope.row.zczy}}</label>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" label="备注" min-width="20%">
              <template slot-scope="scope">
                <template v-if="scope.row.proj_id">
                  <el-button @click="onHandleYj(scope.row)" type="text" size="small">查看业绩</el-button>
                </template>
                <template>
                  <el-button
                    @click="onHandle(scope.row,'change',scope.$index)"
                    type="text"
                    size="small"
                  >换人</el-button>
                  <el-button
                    @click="onHandle(scope.row,'add',scope.$index)"
                    type="text"
                    size="small"
                  >增加</el-button>
                  <el-button @click="onHandle(scope.row,'del')" type="text" size="small">删除</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="changeXmjgglpage"
            align="right"
            style="margin-top:10px"
            background
            layout="total,prev, pager, next"
            :total="xmjgglTotal"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="类似业绩" v-if="display.yj_type" name="third">
          <el-table :data="lsyjRows"  style="width: 100%;">
            <el-table-column type="index" header-align="center" align="center"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" min-width="55%">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.link"
                  style="color:#37B6ED"
                  :href="scope.row.link"
                  target="_blank"
                >{{scope.row.xmmc}}</a>
                <span v-else style="color:#333">{{scope.row.xmmc}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="money" label="金额(万元)" min-width="20%">
              <template slot-scope="scope">
                <span>{{scope.row.money}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="source"
              label="数据源"
              :filters="lsyjFilter"
              :filter-method="filterTag"
              filter-placement="bottom-end"
              min-width="20%"
            >
              <template slot-scope="scope">{{scope.row.source}}</template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="changelsyjpage"
            align="right"
            style="margin-top:10px"
            background
            layout="total,prev, pager, next"
            :total="lsyjTotal"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="企业内容" name="fourth">
          <el-table :data="contentManagements.rows"  style="width: 100%;">
            <el-table-column type="index" align="center"></el-table-column>
            <!-- <el-table-column
              align="left"
              prop="title"
              label="标题"
              width="100"
            >
              <template slot-scope="scope">
                <span>{{scope.row.title}}</span>
              </template>
            </el-table-column>-->
            <el-table-column prop="wants" label="要求" width="280">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.ask[0].flag"
                  :disabled="contentManagements.ask_operate==true?false:true"
                  v-if="scope.row.title=='标书'?false:true"
                >{{scope.row.ask[0].name}}</el-checkbox>
                <div v-else style=" display: flex; flex-direction: rows;">
                  <el-radio-group
                    v-model="scope.row.ask.flag"
                    style=" display: flex; flex-direction: rows;margin-top:10px;margin-right:20px"
                  >
                    <el-radio
                      label="1"
                      :disabled="contentManagements.ask_operate==true?false:true"
                    >半套</el-radio>
                    <el-radio
                      label="2"
                      :disabled="contentManagements.ask_operate==true?false:true"
                    >全套</el-radio>
                  </el-radio-group>
                  <el-button
                    @click="cancelTryFrist"
                    :disabled="contentManagements.ask_operate==true?false:true"
                    size="small"
                  >取消选择</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="finits" label="完成情况">
              <template slot-scope="scope">
                <div
                  v-if="scope.row.title=='标书'?false:true"
                  style=" display: flex; flex-direction: rows;margin-left:20px;padding:0px 5px;"
                >
                  <el-checkbox
                    @change="isdisabled"
                    v-model="scope.row.status[0].flag"
                    :disabled="checkDisabled"
                    style="margin-top:5px;margin-right:20px;"
                  >{{scope.row.status[0].name}}</el-checkbox>
                  <el-input
                    :disabled="inputdisabled[scope.$index]"
                    @input="limitOrder(scope.row.status[0].text)"
                    v-if="scope.row.title=='公司保证金'?false:true"
                    v-show="scope.row.status[0].flag"
                    v-model="scope.row.status[0].text"
                    placeholder="请输入内容"
                    maxlength="20"
                    style="width:380px;height:40px;"
                    ref="count"
                  >
                    <i
                      style="cursor: pointer;"
                      @click="oncontentedit(scope.$index)"
                      slot="suffix"
                      class="el-input__icon el-icon-edit"
                    ></i>
                  </el-input>
                  <div v-else v-show="scope.row.status[0].flag" style="margin-top:5px;">
                    <a
                      class="right_each_two1"
                      v-if="!scope.row.status[0].deposit_img?false:true"
                      :href="scope.row.status[0].deposit_img"
                      target="_blank"
                    >点击查看图片</a>
                    <a class="right_each_two2" v-if="!scope.row.status[0].deposit_img?false:true">
                      <i
                        class="el-icon-error"
                        @click="button_delte(scope.row.status[0].deposit_img)"
                      ></i>
                    </a>
                    <div v-else>
                      <div style="position:relative;top: -5px">
                        <input
                          style="position:absolute;z-index:5;opacity:0"
                          type="file"
                          ref="tupian"
                          @change="onChange_tupian('tupian')"
                        >
                        <el-button style="position:absolute" size="mini">选择图片</el-button>
                      </div>
                      <div style="position:absolute;left: 249px;top: 15px;">{{uptupianList}}</div>
                    </div>
                  </div>
                </div>
                <div v-else style=" display: flex; flex-direction: rows;flex-direction: row;">
                  <el-radio-group
                    v-model="scope.row.status[0].flag"
                    style=" display: flex; flex-direction: rows;margin-top:10px;margin-left:20px;margin-right:20px;"
                  >
                    <el-radio @change="isdisabled" :disabled="checkDisabled" label="1">半套</el-radio>
                    <el-radio @change="isdisabled" :disabled="checkDisabled" label="2">全套</el-radio>
                  </el-radio-group>
                  <el-button
                    @click="cancelTryTwo"
                    size="small"
                    style="width:80px;height:35px;margin-top:3px;margin-right:20px"
                  >取消选择</el-button>
                  <el-input
                    :disabled="inputdisabled[scope.$index]"
                    @input="limitOrder(scope.row.status[0].text)"
                    v-model="scope.row.status[0].text"
                    v-show="scope.row.status[0].flag=='1'||scope.row.status[0].flag=='2'"
                    placeholder="请输入内容"
                    style="width:200px;"
                    ref="count"
                  >
                    <i
                      style="cursor: pointer;"
                      @click="oncontentedit(scope.$index)"
                      slot="suffix"
                      class="el-input__icon el-icon-edit"
                    ></i>
                  </el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="finits" label="遇到问题">
              <template slot-scope="scope">
                <div v-if="scope.row.difficult">
                  <el-checkbox
                    :disabled="issuecheckDisabled"
                    @change="isdisabled"
                    v-model="scope.row.difficult[0].flag"
                    style="margin-top:5px;margin-right:20px;"
                  >{{scope.row.difficult[0].name}}</el-checkbox>
                  <el-input
                    :disabled="input2disabled[scope.$index]"
                    v-show="scope.row.difficult[0].flag"
                    v-model="scope.row.difficult[0].text"
                    placeholder="请输入内容"
                    maxlength="20"
                    style="width:380px;height:40px;"
                    ref="count"
                  >
                    <i
                      style="cursor: pointer;"
                      @click="oncontentedit2(scope.$index)"
                      slot="suffix"
                      class="el-input__icon el-icon-edit"
                    ></i>
                  </el-input>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="tableUpButton">
            <div class="buttonLeft"></div>
            <el-button class="buttonRight" @click="buttonSaveData">保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 更换人员列表 -->
    <el-dialog title="人员列表" append-to-body :visible.sync="ryListVisible" width="80%">
      <iteminfo-peole
        :types="childrenType"
        :nowRow="childrenNowRow"
        :ry_id="ry_id"
        @onSelectNewuser="onSelectNewuser"
      ></iteminfo-peole>
    </el-dialog>
    <!-- 导入招标公告 -->
    <el-dialog append-to-body title="招标公告" :visible.sync="zbggtk" width="80%">
      <item-import types="业绩详情" @onChild_row="onChildzbgg_row"></item-import>
    </el-dialog>
    <!-- 查看业绩列表 -->
    <el-dialog append-to-body title="业绩列表" :visible.sync="checkyjtk" width="80%">
      <project-list :nowRow="childrenNowRow"></project-list>
    </el-dialog>
  </div>
  <!-- 点击企业名称二级页面弹窗结束-->
</template>

<script>
/* eslint-disable */
import Updata from "./../../updata";
import iteminfoPeole from "./ItemInfoPeole";
import itemImport from "./../ItemImport";
import projectList from "./../template/projectList";
export default {
  props: {
    yjInfo: null,
    nowRow: null,
    centerDialogVisible: null
  },
  components: {
    // 祖册组件
    iteminfoPeole,
    itemImport,
    projectList
  },
  watch: {
    nowRow() {
      this.xmjgglRows = [];
      this.xmjgglTotal = 0;
      this.xmjgglpage = 1;
      this.lsyjpage = 1;
      this.lsyjTotal = 0;
      this.lsyjRows = [];
      this.activeName = "first";
      this.getQycontent();
      this.getRyYj();
    },
    centerDialogVisible() {
      this.getQycontent();
      this.getRyYj();
    }
  },
  computed: {
    //预定阶段不允许操作
    disabledpass() {
      if (
        this.yjInfo.stage2 != "" ||
        this.yjInfo.stage3 != "" ||
        this.yjInfo.stage4 != ""
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    this.getQycontent();
    this.getRyYj();
  },
  name: "ItemInfo",
  data() {
    return {
      display: {
        yj_type: false,
        ry_type: false
      },
      checkyjtk: false, //人员业绩弹框
      inputdisabled: [], //input只读
      input2disabled: [], //input只读
      ry_id: null,
      yj_id: null,
      //人员列表弹框
      xmjgglTotal: 0,
      lsyjTotal: 0,
      xmjgglpage: 1,
      lsyjpage: 1,
      ryListVisible: false,
      xmjgglRows: null, //项目机构管理
      childrenNowRow: "", //传入下级菜单当前行的数据
      childrenType: "", //区分是添加还是删除
      dfd: "",

      loading: false,
      nameTittle: "",
      radio: "2",
      page: 1,
      delVisible: false, //删除提示弹框的状态
      editItemInfoPeole: false, //更换弹窗
      configurationToView: false, //招标文件查看弹窗
      zbggtk: false, //招标公告弹窗
      inventoryFile: false, //清单弹窗
      activeName: "first", //企业查看弹窗的导航卡的设置初始第一个
      title: "项目详情",
      lsyjRows: [], //类似业绩
      lsyjFilter: [], //类似业绩数据源
      contentManagements: [],
      content: {
        firstName: true
      },
      uptupian: "",
      uptupianList: "",
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
      // 是否可选择多选框
      issuecheckDisabled: false,
      checkDisabled: false
    };
  },
  methods: {
    //监听改变数据
    isdisabled() {
      var filter_ = this.contentManagements.rows.filter(v => {
        if (v.status[0].flag && v.status[0].flag != "0") {
          return v;
        }
      });
      var filter_2 = this.contentManagements.rows.filter(v => {
        if (v.difficult) {
          if (v.difficult[0].flag) {
            return v;
          }
        }
      });
      if (filter_.length == 0) {
        this.issuecheckDisabled = false;
      } else {
        this.issuecheckDisabled = true;
      }
      if (filter_2.length == 0) {
        this.checkDisabled = false;
      } else {
        this.checkDisabled = true;
      }
    },
    limitOrder(date) {
      if (date.length > 19) {
        this.$message({
          showClose: true,
          message: "输入文字长度不能超过20个",
          type: "error"
        });
      }
    },
    // 获取权限
    getRyYj() {
      this.axios.post(
        "/Index/project/isDisplay",
        {
          gs_id: this.nowRow.gs_id,
          jbxx_id: this.$route.query.jbxx_id
        },
        data => {
          if (data.status == "success") {
            this.ry_id = data.rows.ry_id;
            this.yj_id = data.rows.yj_id;
            this.display.ry_type = data.rows.ry_id ? true : false;
            this.display.yj_type = data.rows.yj_id ? true : false;
            this.getXmjgglData();
            this.getLsyjFilter();
            this.getLsyj();
          } else {
            this.display.ry_type = false;
            this.display.yj_type = false;
          }
        }
      );
    },
    button_delte(data) {
      this.uptupian = "";
      this.contentManagements.rows[3].status[0].deposit_img = "";
      this.uptupianList = "";
    },
    updatatupian(el, nowvue, fn) {
      var this_file = nowvue.$refs[el];
      var inpFiles = this_file.files;
      var files = inpFiles[0].name;
      console.log("tag", files);
      this.uptupianList = files;
      console.log(777, this.uptupianList);
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(inpFiles[0]);
        reader.onload = e => {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          this.uptupian = e.target.result;
          console.log("图片1", this.uptupian);
        };
      }
      console.log("图片2", this.uptupian);
    },
    onClickPassFirst() {
      this.zbggtk = true;
    },
    //上传文件改变
    onClick_file(el) {
      console.log("88", "");
      // this.updataFile(el);
      //上传
      Updata.updataFile(el, this, () => {
        this.getItemInfo();
      });
    },
    //导入
    onChildzbgg_row(obj) {
      this.zbggtk = false;
      this.$emit("onZbgg");
    },
    //打开弹框
    openZbtk() {
      this.zbggtk = true;
    },
    //上传input改变
    onChange_file(el) {
      //上传
      Updata.updataFile(el, this, () => {
        this.$emit("onupdata");
      });
    },
    //点击修改
    oncontentedit(i) {
      var new_ = JSON.parse(JSON.stringify(this.inputdisabled));
      new_[i] = false;
      this.inputdisabled = new_;
    },
    //点击修改
    oncontentedit2(i) {
      var new_ = JSON.parse(JSON.stringify(this.input2disabled));
      new_[i] = false;
      this.input2disabled = new_;
    },
    //上传图片
    onChange_tupian(el) {
      this.updatatupian(el, this, () => {});
    },
    //项目机构管理改变分页
    changeXmjgglpage(val) {
      this.xmjgglpage = val;
      this.getXmjgglData();
    },
    //类似业绩改变分页
    changelsyjpage(val) {
      this.lsyjpage = val;
      this.getLsyj();
    },
    //项目机构管理
    getXmjgglData() {
      this.loading = true;
      this.axios.post(
        "/index/search_ry/companytoperson", //项目机构管理
        {
          gs_id: this.nowRow.gs_id,
          ry_id: this.ry_id,
          page: this.xmjgglpage,
          row: 10
        },
        data => {
          this.loading = false;
          if (data.status == "success") {
            this.xmjgglRows = data.rows;
            this.xmjgglTotal = data.total;
          }
        }
      );
    },
    //获取企业内容
    getQycontent() {
      console.log("dd", this.nowRow.gs_id);
      this.axios.post(
        "/index/company/content",
        {
          jbxx_id: this.$route.query.jbxx_id,
          user_id: this.$store.state.userInfo.user_id,
          gs_id: this.nowRow.gs_id
        },
        data => {
          this.inputdisabled = [];
          data.rows.forEach((one, i) => {
            if (one.status[0].text) {
              this.inputdisabled.push(true);
            } else {
              this.inputdisabled.push(false);
            }
            if (one.difficult) {
              if (one.difficult[0].text) {
                this.input2disabled.push(true);
              } else {
                this.input2disabled.push(false);
              }
            }
          });
          if (data.rows[3].status[0].flag == false) {
            this.uptupianList = "";
          }
          this.contentManagements = data;
          this.isdisabled();
        }
      );
    },
    // 获取类似业绩
    getLsyj() {
      this.axios.post(
        "/index/search_yj/companyToYj", //类似业绩table
        {
          yj_id: this.yj_id,
          gs_id: this.nowRow.gs_id,
          page: this.lsyjpage,
          row: 10
        },
        data => {
          if (data.status == "success") {
            this.lsyjRows = data.rows;
            this.lsyjTotal = data.total;
          }
        }
      );
    },
    //类似业绩数据源下拉筛选列表
    getLsyjFilter() {
      this.axios.post(
        "/index/search_yj/tableSource",
        {
          yj_id: this.yj_id
        },
        data => {
          this.lsyjFilter = data.rows.map(v => {
            let obj = {
              text: v.source,
              value: v.source
            };
            return obj;
          });
        }
      );
    },
    //选择人员回调
    onSelectNewuser(row) {
      this.ryListVisible = false;
      this.getXmjgglData();
    },
    //查看业绩
    onHandleYj(row) {
      this.checkyjtk = true;
      row.yj_id = this.yj_id;
      this.childrenNowRow = row;
    },
    /**项目机构管理增删改操作事件**/
    onHandle(row, types, index) {
      if (types != "del") {
        this.ryListVisible = true;
        row.yj_id = this.yj_id;
        this.childrenNowRow = row;
        row.rowIndex = (this.xmjgglpage - 1) * 10 + index + 1;
        this.childrenType = types;
      } else {
        this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let obj = {
              gs_id: row.gs_id,
              ry_id: this.ry_id,
              rylb: row.rylb,
              dj: row.dj,
              num: row.num
            };
            this.axios.post("/index/Project/isDel", obj, data => {
              if (data.status == "success") {
                let obj = row;
                obj.cate = 3;
                obj.ry_id = this.ry_id;
                this.axios.post("/index/Project/savePerson", obj, data => {
                  if (data.status == "success") {
                    this.$message({
                      showClose: true,
                      message: "成功",
                      type: "success"
                    });
                    this.getXmjgglData();
                  } else {
                    this.$message({
                      showClose: true,
                      message: "删除失败",
                      type: "error"
                    });
                  }
                });
              } else {
                this.$message({
                  showClose: true,
                  message: data.mes,
                  type: "error"
                });
              }
            });
          })
          .catch(() => {});
      }
    },

    filterTag(value, row) {
      //数据源事件
      return row.source === value;
    },

    handleEdit(index, row) {
      console.log(11, index, row);
    },
    cancelTryFrist() {
      //要求取消按钮
      this.contentManagements.rows[2].ask.flag = "";
    },
    cancelTryTwo() {
      //完成情况取消按钮
      this.contentManagements.rows[2].status[0].flag = "";
      this.isdisabled();
    },
    buttonSaveData() {
      let contentData = {
        askReserve: "", //预定状态
        statusReserve: "", //已预定状态
        askEntry: "", //报名状态
        statusEntry: "", //已报名状态
        askBid: "", //要求标书状态
        statusBid: "", //完成标书状态
        askDeposit: "", //要求保证金状态
        statusDeposit: "", //完成保证金状态
        reserve_txt: "", //已预定状态输入框的内容
        entry_txt: "", //已报名状态输入框的内容
        bid_txt: "", //完成标书输入框的内容
        deposit_img: "", //完成保证金图片
        difficult: "",
        difficulttxt: ""
      };
      //太乱将就嘛
      var passNumber = 0;
      this.contentManagements.rows.filter((v, i) => {
        if (v.title == "预定") {
          contentData.askReserve = v.ask[0].flag;
          contentData.statusReserve = v.status[0].flag;
          contentData.reserve_txt = v.status[0].text;
          v.difficult[0].flag ? (passNumber += 1) : "";
          contentData.difficult = v.difficult[0].flag ? 1 : "";
          contentData.difficulttxt = v.difficult[0].text;
        } else if (v.title == "报名") {
          contentData.askEntry = v.ask[0].flag;
          contentData.statusEntry = v.status[0].flag;
          contentData.entry_txt = v.status[0].text;
          v.difficult[0].flag ? (passNumber += 1) : "";
          contentData.difficult = v.difficult[0].flag ? 2 : "";
          contentData.difficulttxt = v.difficult[0].text;
        } else if (v.title == "标书") {
          contentData.askBid = v.ask.flag;
          contentData.statusBid = v.status[0].flag;
          contentData.bid_txt = v.status[0].text;
          v.difficult[0].flag ? (passNumber += 1) : "";
          contentData.difficult = v.difficult[0].flag ? 3 : "";
          contentData.difficulttxt = v.difficult[0].text;
        } else if (v.title == "公司保证金") {
          contentData.askDeposit = v.ask[0].flag;
          contentData.statusDeposit = v.status[0].flag;
          // contentData.deposit_img = v.status.deposit_img;
        }
      });
      if (passNumber > 1) {
        this.$message.error("只能选择一个遇到的问题");
        return;
      }
      //点击企业内容的保存按钮
      this.axios.post(
        "/index/company/saveContent",
        {
          jbxx_id: this.$route.query.jbxx_id, //项目id
          gs_id: this.nowRow.gs_id, //公司id
          ask_reserve: contentData.askReserve, //预定状态
          reserve: contentData.statusReserve, //已预定状态
          ask_entry: contentData.askEntry, //报名状态
          entry: contentData.statusEntry, //已报名状态
          ask_bid: contentData.askBid, //要求标书状态
          bid: contentData.statusBid, //完成标书状态
          ask_deposit: contentData.askDeposit, //要求保证金状态
          deposit: contentData.statusDeposit, //完成保证金状态
          reserve_txt: contentData.reserve_txt,
          entry_txt: contentData.entry_txt,
          bid_txt: contentData.bid_txt,
          deposit_img: this.uptupian,
          difficult: contentData.difficult,
          difficult_txt: contentData.difficulttxt
        },
        data => {
          if (data.status == "success") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$emit("onUpdataGsList");
          } else {
            this.$message.error("检测到,条件未更改");
          }
        }
      );
    }

    /**二级企业名称弹出框的点击事件结束**/
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.el-dialog__body {
  padding-top: 10px;
}
a:link {
  color: #06b6ff;
  text-decoration: none;
}
.el-dialog__title {
  font-size: 26px !important;
  text-align: center;
  color: #303133;
}
.tabs_label .el-tabs__item {
  font-size: 18px;
}

//企业名称二级弹窗开始
.popUpWindows {
  .dialog_body {
    // border-top: 1px solid #9d9d9d;
    margin-top: -20px;
    .dialog_header {
      height: 150px;
      width: 100%;
      border: 1px solid #9d9d9d;
      border-radius: 2px;
      margin: 20px 0;
      .evryone {
        display: flex;
        flex-direction: row;
        height: 50px;
        /*    border-bottom: 1px solid #9d9d9d;*/
        line-height: 50px;
        .each {
          margin-right: 25px;
          font-size: 14px;
          height: 50px;
          justify-content: center;
        }
        .each_button {
          width: 49%;
          height: 50px;
          text-align: right;
          padding-right: 25px;
        }
        .evryone_one {
          width: 75px;
          height: 50px;
          margin-left: 25px;
          font-size: 14px;
        }
        .evryone_first {
          font-size: 20px;
          font-weight: 500;
        }
        .first {
          font-size: 20px;
          margin-left: 25px;
          margin-right: 10px;
        }
        .second {
          color: #06b6ff;
          font-size: 14px;
        }
        .evryone_two {
          line-height: 20px;
          display: flex;
          flex-direction: row;
          width: 740px;
          height: 20px;
          margin-top: 15px;
          background-color: #f6f6f6;
          font-size: 12px;
          color: #000000;
          .eachOne {
            width: 200px;
            height: 20px;
            text-align: center;
          }
          .active {
            background-image: url("../../assets/jd.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 200px;
            height: 20px;
            text-align: center;
            color: #ffffff;
          }
        }
      }
    }
  }
  .dialog_content {
    .right_each_two {
      height: 45px;
      cursor: pointer;
    }
    .right_each_two1 {
      height: 45px;
      cursor: pointer;
      color: #06b6ff;
    }
    .right_each_two2 {
      height: 45px;
      cursor: pointer;
      color: #06b6ff;
    }
    .right_each_two2:hover {
      height: 45px;
      cursor: pointer;
      color: #ff0000;
    }
    font-size: 14px;
    .infromation_body_two {
      padding: 20px 0 0 20px;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      .each_left {
        display: flex;
        width: 100px;
        // margin-left: 25px;
        flex-direction: column;
        margin-right: 25px;
        .left_each {
          height: 45px;
          align-content: center;
          display: flex;
        }
        .el-tabs__nav-wrap {
          overflow: hidden;
          margin-bottom: -1px;
          position: relative;
          margin-bottom: 30px;
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
          color: #06b6ff;
          .button_left {
            display: flex;
            flex-direction: column;
            margin-right: 115px;
            .right_each_two {
              height: 45px;
              cursor: pointer;
              align-content: center;
              display: flex;
            }
            .right_each_two1 {
              height: 45px;
              cursor: pointer;
              align-content: center;
              display: flex;
              color: #06b6ff;
            }
            .right_each_two2 {
              height: 45px;
              cursor: pointer;
              align-content: center;
              display: flex;
              color: #06b6ff;
            }

            .right_each_two1:hover {
              .el-icon-error {
                display: block;
              }
              .el-icon-success {
                display: none;
              }
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
              color: #06b6ff;
            }
            .right_each_two:last-child {
              margin-bottom: 0px;
            }
          }
        }
      }
    }
    .tableUpButton {
      margin-top: 25px;
      display: flex;
      flex-direction: rows;
      .buttonLeft {
        display: flex;
        width: 90%;
      }
      .buttonRight {
        flex: 1;
      }
    }
  }
}
//企业名称二级弹窗结束
</style>
