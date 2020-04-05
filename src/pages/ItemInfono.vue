<!--项目详情-->
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
                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg1+')',width:'270px',left:'0',zIndex:'100'}">
                  <span :style="{textAlign:'center',fontSize:'14px',color:projectPerformanceHeads.status == '预定'?'#ffffff':'#606266'}">{{projectPerformanceHeads.status=='预定'?projectPerformanceHeads.stage1:'预定'}}</span>
                </li>
                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg2+')',width:'270px',left:'238px',zIndex:'99'}">
                  <span :style="{fontSize:'14px',color:projectPerformanceHeads.status == '报名'?'#ffffff':'#606266'}">{{projectPerformanceHeads.status=='报名'?projectPerformanceHeads.stage2:'报名'}}</span>
                </li>
                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg3+')',width:'270px',left:'475px',zIndex:'98'}">
                  <span :style="{fontSize: '14px',color:projectPerformanceHeads.status == '标书'?'#ffffff':'#606266'}">{{projectPerformanceHeads.status=='标书'?projectPerformanceHeads.stage3:'标书'}}</span>
                </li>
                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg4+')',width:'270px',left:'711px',zIndex:'97'}">
                  <span :style="{fontSize: '14px',color:projectPerformanceHeads.status == '开标'?'#ffffff':'#606266'}">{{projectPerformanceHeads.status=='开标'?projectPerformanceHeads.stage4:'开标'}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="evryone">
          <div class="first">投标人资质条件、能力和信誉:</div>
          <div class="second">
            <el-button size="small" v-if="user_btn.btn1" :disabled="$route.query.status=='yd'" type="primary" plain @click="ConfigurationLook">
              配置查看
              <i v-if="iconclass" class="el-icon-success el-icon--right" style="color:#3dc357"></i>
              <i v-else class="el-icon-question el-icon--right" style="color:#d1d1d1"></i>
            </el-button>
            <el-button size="small" v-if="user_btn.btn2" plain type="primary" :disabled="$route.query.status=='yd'" @click="config_wj = true">配置文件</el-button>
          </div>
        </div>
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
            <div class="myrow">
              <div>招标公告</div>
              <div class="mycol_1">
                <a class="right_each_two" v-if="projectPerformanceHeads.zbxx_id" style="color: #409EFF;" :href="'http://www.520coc.cn/CompanyRounds/getMassage?zbgsid=&type=0&zbwj=undefined&zbqd=undefined&zbxxid='+projectPerformanceHeads.zbxx_id" target="_blank">点击查看</a>
                <!-- <a class="right_each_two" v-else style="color: #409EFF;" :disabled="$route.query.jbxx_id!='预定'" > 点击上传</a> -->
                <el-button style="position:absolute" size="mini" v-if="!projectPerformanceHeads.zbxx_id" :disabled="$route.query.status=='yd'" @click="onClickPassFirst">选择文件</el-button>
              </div>
            </div>
            <div class="myrow">
              <div>招标文件</div>
              <div class="mycol_1">
                <a class="right_each_two" v-if="projectPerformanceHeads.zbwj" :href="projectPerformanceHeads.zbwj" style="color: #409EFF;" target="_blank">点击下载</a>
                <a class="right_each_two" v-else>
                  <div style="position:relative">
                    <input style="position:absolute;z-index:5;opacity:0" type="file" ref="zbwj" @change="onChange_file('zbwj')" :disabled="$route.query.status=='yd'">
                    <el-button style="position:absolute" size="mini" :disabled="$route.query.status=='yd'">选择文件</el-button>
                  </div>
                </a>
              </div>
            </div>
            <div class="myrow">
              <div>清单</div>
              <div class="mycol_1">
                <a class="right_each_two" v-if="projectPerformanceHeads.zjqd?true:false" :href="projectPerformanceHeads.zjqd" style="color: #409EFF;" target="_blank">点击下载</a>
                <a class="right_each_two" v-else>
                  <div style="position:relative">
                    <input style="position:absolute;z-index:5;opacity:0" type="file" ref="zjqd" @change="onChange_file('zjqd')" :disabled="$route.query.status=='yd'">
                    <el-button style="position:absolute" size="mini" :disabled="$route.query.status=='yd'">选择文件</el-button>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="table">
          <div class="table_header">相关企业</div>
          <div class="table_footer">
            <el-table :data="tableDataFirst.rows" v-loading="loading">
              <el-table-column label="序号" header-align="center" align="center" width="100">
                <template slot-scope="scope">{{scope.$index+(page-1)*10+1}}</template>
              </el-table-column>
              <el-table-column prop="name" label="企业名称" align="center">
                <template slot-scope="scope">
                  <div @click="onOpen(scope.row)" type="text">{{scope.row.gsmc}}</div>
                </template>
              </el-table-column>
              <el-table-column label="完成情况" align="center">
                <el-table-column prop="reserve" label="预定" align="center">
                  <template slot-scope="scope">
                    <el-tooltip class="item" :disabled="!scope.row.reserve_txt" effect="dark" :content="scope.row.reserve_txt" placement="top">
                      <el-button type="text" style="color:#606266">
                        <i :class="scope.row.reserve=='已预订'?'el-icon-circle-check':''" style="color:#10CF46;font-size:17px"></i>
                        <span>{{scope.row.reserve}}</span>
                      </el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="报名" props="entry" align="center">
                  <template slot-scope="scope">
                    <el-tooltip class="item" :disabled="!scope.row.entry_txt" effect="dark" :content="scope.row.entry_txt" placement="top">
                      <el-button type="text" style="color:#606266">
                        <i :class="scope.row.entry=='已报名'?'el-icon-circle-check':''" style="color:#10CF46;font-size:17px"></i>
                        <span>{{scope.row.entry}}</span>
                      </el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="bid" label="标书" align="center">
                  <template slot-scope="scope">
                    <el-tooltip class="item" :disabled="!scope.row.bid_txt" effect="dark" :content="scope.row.bid_txt" placement="top">
                      <el-button type="text" style="color:#606266">
                        <i :class="(scope.row.bid=='半套'||scope.row.bid=='全套')?'el-icon-circle-check':''" style="color:#10CF46;font-size:17px"></i>
                        <span>{{scope.row.bid}}</span>
                      </el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="deposit" label="公司保证金" align="center">
                  <template slot-scope="scope">
                    <el-popover :disabled="!scope.row.deposit_img" placement="top-start" trigger="hover">
                      <div style="text-align:center">
                        <a style="color:#409EFF" :href="scope.row.deposit_img" target="_blank">点击查看</a>
                      </div>
                      <el-button slot="reference" type="text" style="color:#606266">
                        <i :class="scope.row.deposit=='已打保证金'?'el-icon-circle-check':''" style="color:#10CF46;font-size:17px"></i>
                        <span>{{scope.row.deposit}}</span>
                      </el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="遇到的问题" align="center" prop="difficult_txt"></el-table-column>
              <el-table-column label="人员" align="center" prop="difficult_txt"></el-table-column>
              <el-table-column label="业绩" align="center" prop="difficult_txt"></el-table-column>
              <el-table-column label="积分" align="center" prop="difficult_txt"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="body_footer" v-if="tableDataFirst.rows !== undefined && tableDataFirst.rows.length >0 &&tableDataFirst.rows.length<tableDataFirst.total?true:false" @click="moreDates">更多</div>
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
          <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="textarea"></el-input>
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
    <!-- 完成情况弹框 -->
    <el-dialog :visible.sync="gs_list.finish.tk" title="完成情况" width="500px">
      <el-form ref="form" @submit.native.prevent>
        <el-form-item v-for="one in gs_list.finish.tableLists" :key="one.phase">
          <el-checkbox v-model="one.isCheck">{{one.phase}}</el-checkbox>
          <el-input style="width:300px" :disabled="one.isDisabled" placeholder="备注" inline v-model="one.txt">
            <el-button v-if="one.isDisabled" @click="finishFn().onEdit(one.phase)" slot="append" icon="el-icon-edit"></el-button>
          </el-input>
          <label>{{one.time}}</label>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button>完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import ItemImport from './ItemImport.vue'
import EnterpriseNamePopover from './sonPage/EnterpriseNamePopover.vue'
import Updata from './../updata'

//引入图片
import l1u from '../assets/l1u.png'
import l1d from '../assets/l2d.png'
import l2u from '../assets/l1u.png'
import l2d from '../assets/l2d.png'
import l5u from '../assets/l5u.png'
import l5d from '../assets/l5d.png'
export default {
  components: {
    ItemImport,
    EnterpriseNamePopover
  },
  name: 'ItemInfo',
  data() {
    return {
      gs_list: {
        //公司列表弹框
        finish: {
          tk: true,
          tableLists: [
            {
              isCheck: false,
              isDisabled: false,
              txt: '',
              time: '',
              column: 'reserve_txt',
              phase: '预定'
            },
            {
              isCheck: false,
              isDisabled: false,
              column: 'bmxx_txt',
              txt: '',
              time: '',
              phase: '报名'
            }
          ]
        }
      },
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
        bg1: '',
        bg2: '',
        bg3: '',
        bg4: ''
      },
      user_btn: {
        btn1: false,
        btn2: false
      },
      config_wjData: null, //配置文件数据
      textarea: null, //多行输入框
      config_wj: false, //配置文件弹框
      clickgsRow: '', //点击公司当前行数据
      openObj: {},
      jbxx_id: this.$route.query.jbxx_id,
      loading: false,
      nameTittle: '',
      page: 1,
      biddingAnnouncement: false, //招标公告弹窗
      title: '项目详情',
      projectPerformanceHeads: [],
      updata: {}, //上传文件
      content: {
        firstName: true
      },
      lefts: [
        {
          name: '资质要求'
        },
        {
          name: '人员要求'
        },
        {
          name: '业绩要求'
        },
        {
          name: '其他要求'
        }
      ],
      tableDataFirst: [
        //首页下面的表格
      ],
      centerDialogVisible: false
    }
  },
  created() {
    const self_ = this
    window.addEventListener(
      'message',
      function(event) {
        //父接受
        if (event.data == '刷新') {
          self_.getItemInfo()
        }
      },
      false
    )
    this.finishFn().getFinishList() //获取完成情况list
    this.axios.post(
      '/index/mine/getComponent',
      {
        user_id: this.$store.state.userInfo.user_id,
        jbxx_id: this.$route.query.jbxx_id
      },
      data => {
        if (data.status == 'success') {
          data.message.forEach(v => {
            if (v.title == '配置文件') {
              this.user_btn.btn2 = true
            } else if (v.title == '配置查看') {
              this.user_btn.btn1 = true
            }
          })
        }
      }
    )
    this.getItemInfo()
    //公司列表
    this.axios.post(
      '/index/company/ownCompany',
      {
        jbxx_id: this.$route.query.jbxx_id,
        user_id: this.$store.state.userInfo.user_id,
        company_id: this.$store.state.userInfo.company_id,
        page: '1',
        rows: '10'
      },
      data => {
        this.tableDataFirst = data
      }
    )
  },
  computed: {
    iconclass() {
      var a = this.projectPerformanceHeads
      if (a.zz_id || a.ry_id || a.yj_id) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    //渲染进度横条
    jindu() {
      this.li.bg1 =
        this.projectPerformanceHeads.status == '预定'
          ? this.button_radio.l1
          : this.button_radio.l6
      this.li.bg2 =
        this.projectPerformanceHeads.status == '报名'
          ? this.button_radio.l2
          : this.button_radio.l7
      this.li.bg3 =
        this.projectPerformanceHeads.status == '标书'
          ? this.button_radio.l3
          : this.button_radio.l7
      this.li.bg4 =
        this.projectPerformanceHeads.status == '开标'
          ? this.button_radio.l4
          : this.button_radio.l8
    },
    //保存条件
    onSaveWj() {
      this.getTextarea('save')
    },
    //显示弹框
    onShow_configTk() {
      this.getTextarea('see')
      // 获取配置文字
      this.axios.post(
        '/index/mine/txt',
        { thread_id: this.projectPerformanceHeads.thread_id },
        data => {
          this.config_wjData = data.rows
        }
      )
    },
    //文本框
    getTextarea(type) {
      this.axios.post(
        '/index/mine/zbxx_txt',
        {
          jbxx_id: this.$route.query.jbxx_id,
          txt: this.textarea,
          type
        },
        data => {
          if (data.status == 'success') {
            if (type == 'save') {
              this.$message.success('成功')
              this.config_wj = false
            } else {
              this.textarea = data.message.zbxx_txt
            }
          }
        }
      )
    },
    // 获取项目基本信息
    getItemInfo() {
      this.axios.post(
        //项目基本信息
        '/index/mine/lists',
        {
          jbxx_id: this.$route.query.jbxx_id,
          user_id: this.$store.state.userInfo.user_id
        },
        data => {
          this.projectPerformanceHeads = data.rows
          this.jindu()
          document.title = this.projectPerformanceHeads.xmmc
        }
      )
    },
    //上传文件改变
    onChange_file(el) {
      // this.updataFile(el);
      Updata.updataFile(el, this, () => {
        this.getItemInfo()
      })
    },
    /**一级页面的点击事件开始**/
    ConfigurationLook() {
      //配置查看按钮
      let thread_id = this.projectPerformanceHeads.thread_id || ''
      let { href } = this.$router.resolve({
        path: `/iteminfo/ItemConfig?jbxx_id=${
          this.$route.query.jbxx_id
        }&thread_id=${thread_id}`
      })
      window.open(href, '_blank')
      // this.$router.push({
      //   path: "/iteminfo/ItemConfig",
      //   query: { jbxx_id: this.$route.query.jbxx_id,thread_id:this.projectPerformanceHeads.thread_id}
      // });
    },
    onClickPassFirst() {
      //招标公告上传按钮
      this.biddingAnnouncement = true
    },
    //上传招标公告子组件事件
    onChildzbgg_row() {
      this.biddingAnnouncement = false
      this.getItemInfo()
    },
    //企业名称的点击事件
    onOpen(data) {
      this.nameTittle = data.gsmc
      this.clickgsRow = data
      this.centerDialogVisible = true
    },
    // buttonBlack() {
    //   //返回按钮
    //   this.$router.push({ path: "./", query: { id: "" } });
    // },
    moreDates() {
      //点击获得更多
      this.loading = true
      this.axios.post(
        '/index/company/ownCompany',
        {
          jbxx_id: this.$route.query.jbxx_id,
          user_id: this.$store.state.userInfo.user_id,
          company_id: this.$store.state.userInfo.company_id,
          page: this.page + 1,
          rows: '10',
          type: 'more'
        },
        data => {
          if (data.status == 'success') {
            this.loading = false
            this.tableDataFirst = data
          } else {
            this.loading = false
          }
        }
      )
    },
    //刷新公司列表
    onUpdataGsList() {
      this.centerDialogVisible = false
      this.axios.post(
        '/index/company/ownCompany',
        {
          jbxx_id: this.$route.query.jbxx_id,
          user_id: this.$store.state.userInfo.user_id,
          company_id: this.$store.state.userInfo.company_id,
          page: '1',
          rows: '10'
        },
        data => {
          this.tableDataFirst = data
        }
      )
    },
    //删除公司完成情况
    finishFn() {
      let getFinishList = d => {
        var query_data = {
          gs_id: 7369,
          jbxx_id: 203
        }
        this.axios.post('/index/element_set/execPhaseTxt', query_data, data => {
          data.rows.map(v => {
            if (v.txt) {
              v.isCheck = true
              v.isDisabled = true
            } else {
              v.isCheck = false
              v.isDisabled = false
            }
            return v
          })
          this.gs_list.finish.tableLists = data.rows || []
        })
      }
      let onEdit = type => {
        this.gs_list.finish.tableLists.map(v => {
          if (v.phase == type) {
            v.isDisabled = false
          }
          return v
        })
      }
      return {
        getFinishList,
        onEdit
      }
    }
  }
}
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
    // height: calc(~"100% - 60px");
    background: #f9f9f9;
    .body_header {
      height: 180px;
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
            background-image: url('../assets/jd.png');
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
      // height: calc(~"100% - 270px");
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
          height: 70px;
          line-height: 70px;
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