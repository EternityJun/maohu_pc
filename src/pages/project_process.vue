<!--项目列表-->
<template>
  <el-row>
    <el-col :span="24">

      <el-header height="auto">
        <body-top></body-top>
        <div>
          <!-- 导航栏 -->
          <head-menu :index="'/project_process'"></head-menu>
        </div>
        <!--流程横排-->
        <div style="width: 100%;height:100px;margin-top:10px;">
          <ul style="height: 100px;" class="liu">
            <li @click="select_button_radio(1)">
              <img :src="button_radio.image1u" alt v-if="index == 1" style="z-index:999">
              <img :src="button_radio.image1d" alt style="z-index:998">
              <span :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '预定'?'#ffffff':'#606266',zIndex:'1000'}">预定({{total1}}条)</span>
            </li>
            <li @click="select_button_radio(2)">
              <img :src="button_radio.image1u" alt v-if="index == 2" style="z-index:997">
              <img :src="button_radio.image1d" alt style="z-index:996">
              <span :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '报名'?'#ffffff':'#606266',zIndex:'1000'}">报名(上网)({{total2}}条)</span>
            </li>
            <li @click="select_button_radio(3)">
              <img :src="button_radio.image1u" alt v-if="index == 3" style="z-index:995">
              <img :src="button_radio.image1d" alt style="z-index:994">
              <span :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '标书'?'#ffffff':'#606266',zIndex:'1000'}">标书({{total3}}条)</span>
            </li>
            <li @click="select_button_radio(4)">
              <img :src="button_radio.image1u" alt v-if="index == 4" style="z-index:993">
              <img :src="button_radio.image1d" alt style="z-index:992">
              <span :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '开标'?'#ffffff':'#606266',zIndex:'1000'}">开标({{total4}}条)</span>
            </li>
            <li @click="select_button_radio(5)">
              <img :src="button_radio.image5u" alt v-if="index == 5" style="z-index:991">
              <img :src="button_radio.image5d" alt style="z-index:990">
              <span :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '过期'?'#ffffff':'#606266',zIndex:'1000'}">过期({{total5}}条)</span>
            </li>
          </ul>
        </div>
        <el-row class="border-b">
          <div style="float:left;margin-bottom:20px;">
            <el-radio-group v-model="tableTy" @change="handleClickTab" v-if="role.company_user">
              <el-radio-button label="add">自建项目</el-radio-button>
              <el-radio-button label="coop">合作项目</el-radio-button>
            </el-radio-group>
            <el-button v-if="tableTy === 'add' && role.company_user" style="margin-left: 10px;" type="primary" @click="onNewItem">新建项目</el-button>
            <el-button v-if="tableTy === 'add' && role.company_user" type="primary" @click="dialogDrVisible = true">导入</el-button>
            <el-button v-if="role.company_user" type="info" @click="openRecyclingStation">回收站</el-button>
          </div>
          <div style="float:right">
            <el-form :inline="true" class="demo-form-inline" align="right" @submit.native.prevent>
              <el-form-item label="项目地区">
                <el-select v-model="projectArea" placeholder="请选择" @change="onSearch">
                  <el-option v-for="item in projectAreaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目名称">
                <el-input v-model="searchxmmc" placeholder="请输入项目名称" @keyup.enter.native="onSearch"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button @click="onReset">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="clearfix"></div>
        </el-row>
      </el-header>
      <el-row style="padding:0 40px;">
        <el-table :data="tableData" style="width: 100%;height:100%" v-loading="loading" border>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(nowPage-1)*10+1}}</template>
          </el-table-column>
          <el-table-column align="center" prop="date1" label="项目名称">
            <template slot-scope="scope">
              <div v-if="scope.row.zbxx_id>0" class="link_color" @click="openGs(scope.row)">{{scope.row.xmmc}}</div>
              <span v-else>{{scope.row.xmmc}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="xmdq" label="项目地区" width="100"></el-table-column>
          <el-table-column align="center" prop="jd" label="进度" width="600">
            <template slot-scope="scope">
              <div style="width: 100%;height:22px;">
                <ul style="height: 100px;position: relative;" class="liu2">
                  <li style="width:150px;z-index: 100">
                    <span style="font-size: 12px;position: absolute;width:150px;heigth:22px;">
                      <label :style="{color:scope.row.stage1?'#ffffff':'#606266',width:'100%',heigth:'100%'}">{{scope.row.stage1 || '预定'}}</label>
                    </span>
                    <img v-if="scope.row.stage1 && index != 5" :src="list_image.l1y" id="image" style="width:100%;height: 100%">
                    <img v-if="!scope.row.stage1 && index != 5" :src="list_image.l1n" id="image" style="width:100%;height: 100%">
                    <img v-if="index == 5" :src="list_image.hy1" id="image" style="width:86%;height: 100%">
                  </li>
                  <li style="width:190px;z-index: 88;left:122px;">
                    <span style="font-size: 12px;position: absolute;top:0px;z-index: 10;left:5px;width:190px;heigth:22px;">
                      <label :style="{color:scope.row.stage2?'#ffffff':'#606266',width:'100%',heigth:'100%'}">{{scope.row.bm_jzrq || '报名'}}</label>
                    </span>
                    <img v-if="index >= 2 && index!=5" :src="list_image.l2y" id="image" style="width:100%;height: 100%">
                    <img v-if="index < 2 && index!=5" :src="list_image.l2n" id="image" style="width:100%;height: 100%">
                    <img v-if="index == 5" :src="list_image.hy2" id="image" style="width:100%;height: 100%">
                  </li>
                  <li style="width:170px;z-index: 77;left:264px;">
                    <span style="font-size: 12px;position: absolute;top:0px;z-index: 10;width:170px;heigth:22px;">
                      <label :style="{color:scope.row.stage3?'#ffffff':'#606266',width:'100%',height:'100%'}">标书</label>
                    </span>
                    <img v-if="index >= 3 && index!=5" :src="list_image.l3y" id="image" style="width:100%;height: 100%">
                    <img v-if="index < 3 && index!=5" :src="list_image.l3n" id="image" style="width:100%;height: 100%">
                    <img v-if="index == 5" :src="list_image.hy3" id="image" style="width:93%;height: 100%;">
                  </li>
                  <li style="width:150px;z-index: 66;left: 401px;">
                    <span style="font-size: 12px;position: absolute;top:0px;z-index: 10;left:10px;width:150px;heigth:22px">
                      <label :style="{color:scope.row.stage4?'#ffffff':'#606266',width:'100%',heigth:'100%'}">{{scope.row.tb_jzrq || '开标'}}</label>
                    </span>
                    <img v-if="index>=4 && index!=5" :src="list_image.l4y" id="image" style="width:100%;height: 100%">
                    <img v-if="index<4 && index!=5" :src="list_image.l4n" id="image" style="width:100%;height: 100%">
                    <img v-if="index == 5" :src="list_image.hy4" id="image" style="width:100%;height: 100%;">
                  </li>
                </ul>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="控制中心" align="center" width="100" v-if="role.company_user && tableTy === 'add'">
            <template slot-scope="scope">
              <span v-if="scope.row.cate!='合作'" class="primary_btn" @click="openXq('对手分析',scope.row)">对手分析</span>
            </template>
          </el-table-column>
          <el-table-column prop="flow" label="工作内容" align="center" width="300">
            <template slot-scope="scope">
              <span class="primary_btn" v-if="scope.row.cate!='合作'" @click="clickFn('分配',scope.row)">查看</span>
              <span class="primary_btn" v-if="scope.row.role.indexOf('报名情况')>-1 ||scope.row.role.indexOf('预约')>-1" @click="openXq('报名情况',scope.row)">报名情况</span>
              <span class="primary_btn" v-if="scope.row.role.indexOf('标书情况')>-1" @click="openXq('标书情况',scope.row)">标书情况</span>
              <span class="primary_btn" v-show="role.company_user" @click="clickFn('编辑',scope.row)">编辑</span>
              <span class="danger_btn" v-show="role.company_user" @click="clickFn('删除',scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-footer>
        <el-pagination ref="fenye" @current-change="handleSizeChange" align="right" background layout="total,prev, pager, next" :total="total"></el-pagination>
      </el-footer>
      <el-dialog :title="newXmTitle" :visible.sync="visibleNewItem" :before-close="closeAddXm">
        <new-xm @onAddNewItem="onAddNewItem" ref="newXm" :newXmId='newXmId'></new-xm>
      </el-dialog>
      <el-dialog title="回收站" :visible.sync="visibleMidden" width="70%">
        <itemImport></itemImport>
      </el-dialog>
      <!--匹配弹窗-->
      <el-dialog append-to-body width="80%" title="招标公告" :visible.sync="dialogPpVisible">
        <item-import types="匹配列表" :row="nowRow" @onChild_row="onChild_row"></item-import>
      </el-dialog>
      <!--导入弹窗-->
      <el-dialog width="80%" title="招标公告" :visible.sync="dialogDrVisible">
        <item-import types="首页列表" @onChild_row="onChild_row"></item-import>
      </el-dialog>
      <!-- 已报名 查看详情窗口 -->
      <el-dialog width="20%" title="报名" :visible.sync="bmVisible">
        <div style="width:100%;margin-top:10px;text-align:center;margin:10 auto">
          <el-button size="small" style="width:200px;" type="success" @click="openBmfile">查看报名凭证</el-button>
        </div>
        <div style="width:100%;margin-top:10px;text-align:center;margin:10 auto">
          <el-button size="small" style="width:200px;" type="danger" @click="unsetBm" v-if="yuding=='报名情况'">取消报名</el-button>
        </div>
      </el-dialog>
      <!-- 报名情况弹窗 -->
      <el-dialog width="60%" title="报名详情" :visible.sync="Xq.visible">
        <div style="height:500px;">
          <div style="padding-bottom:40px;">
            <!--  -->
            <span style="width:68px;float:right" v-if="row.bm.is_sign == 0 && yuding.indexOf('报名情况')>-1">
              <el-upload :action="updateUrl" :data="updateData" multiple :limit="1" :show-file-list="false" :on-success="uploadSuccess" :before-upload="tableLoading">
                <el-button size="small" style="width:68px;" type="primary" @click="handData()">报名</el-button>
                <!-- <el-button size="small" type="success">已报名</el-button> -->
              </el-upload>
            </span>
            <span style="width:68px;float:right" v-if="row.bm.is_sign == 1" @click="openBm()" @mouseout="changeText('yibaoming','已报名')">
              <el-button size="small" type="success" style="width:68px;">
                <span class="yibaoming">已报名</span>
              </el-button>
            </span>
          </div>
          <el-table :data="Xq.list" style="width: 100%;" v-loading="Xq.loading" border>
            <el-table-column label="序号" width="60" align="center" type="index"></el-table-column>
            <el-table-column prop="username" label="人员名称"></el-table-column>
            <el-table-column prop="cellphone" label="联系电话" width="150" align="center"></el-table-column>
            <el-table-column prop="created" label="时间" width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column width="200" label="操作" align="center" v-if="yuding.indexOf('预约')>-1">
              <template slot-scope="scope">
                <el-button size="small" type="success" v-if="scope.row.status == '待确认'" @click="checkBm(scope.row,'_1')">确认</el-button>
                <el-button size="small" type="danger" v-if="scope.row.status == '待确认'" @click="checkBm(scope.row,'_2')">取消</el-button>
                <el-button size="small" v-if="scope.row.status == '已确定'" type="success" @click="checkBm(scope.row,'')">已确定</el-button>
                <el-button size="small" v-if="scope.row.status == '已取消'" @click="checkBm(scope.row,'')">已取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <div v-if="recyclingStation.dialogVisible">
        <el-dialog title="回收站" :visible.sync="recyclingStation.dialogVisible" width="60%" top="50px">
          <xm-recycling-station :params="recyclingStation" @refresh="refresh"></xm-recycling-station>
          <el-row>
            <el-col :span="24" style="text-align:center;margin-top:20px;">
              <el-button @click="recyclingStation.dialogVisible = false">关 闭</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </div>

    </el-col>

  </el-row>
</template>
<script>
/* eslint-disable */
import ItemImport from './ItemImport'
import newXm from './template/newXm'
import myReserve from './template/myReserve'
import { valid } from 'semver'
import Cookie from './../cookie'
import XmRecyclingStation from './template/XmRecyclingStation'

//引入图片
import l1u from '../assets/l1u.png'
import l1d from '../assets/l2d.png'
import l2u from '../assets/l1u.png'
import l2d from '../assets/l2d.png'
import l5u from '../assets/l5u.png'
import l5d from '../assets/l5d.png'
import h1 from '../assets/h1.png'
import h2 from '../assets/h1.png'
import h3 from '../assets/h1.png'
import h4 from '../assets/h4.png'
import uploadFile from './template/uploadbm'
import head_menu from './template/head_menu.vue'

export default {
  name: 'ItemList',
  components: {
    ItemImport,
    newXm,
    myReserve,
    uploadFile,
    headMenu: head_menu,
    XmRecyclingStation
  },
  data() {
    return {
      tableTy: 'add', // add-自建项目 coop-合作项目
      role: {},
      nowRow: null,
      //当前页面
      type: '预定',
      newXmTitle: '',
      newXmId: '',
      index: 1,
      newItem: {
        name: localStorage.getItem('username')
      },
      visibleNewItem: false, //新建项目弹框
      visibleMidden: false, //回收站
      loading: false,
      myreserveVisible: false, //我的预定弹框
      loadingMidden: false,
      //隐藏导入弹框
      dialogDrVisible: false,
      dialogPpVisible: false,
      bt: '筑标',
      searchxmmc: '',
      nowPage: 1,
      listHeight: 0,
      total: 0,
      tableData: [],
      middenTable: [],
      middentotal: 0,
      middennowPage: 1,
      //各个选项下，项目的数目
      total1: '0',
      total2: '0',
      total3: '0',
      total4: '0',
      total5: '0',
      button_radio: {
        image1u: l1u,
        image1d: l1d,
        image5u: l5u,
        image5d: l5d
      },
      //用于列表中的图片替换
      list_image: {
        l1y: l1u,
        l1n: l1d,
        l2y: l2u,
        l2n: l2d,
        l3y: l2u,
        l3n: l2d,
        l4y: l5u,
        l4n: l5d,
        hy1: h1,
        hy2: h2,
        hy3: h3,
        hy4: h4
      },
      fileData: [],
      zbwjVisible: false,
      cdata: {},
      bm: {},
      //已报名的删除按钮
      shanchu: false,
      bmVisible: false,
      power: {
        bm: 0,
        bszz: 0,
        rgsh: 0
      },
      Xq: {
        visible: false,
        loading: false,
        list: [],
        title: '',
        ajaxData: {
          company_id: '',
          jbxx_id: ''
        },
        page: 1
      },
      projectAreaList: [],
      projectArea: '',
      bm: {},
      row: {
        bm: {}
      },
      daiquerenVisible: false,
      checkBmAjax: {},
      yuding: [],
      updateUrl:
        'https://wechat.cdzjkl.com/index/Human_Review/uploadFile',
      updateData: {
        token: localStorage.getItem('token'),
        login_company_id: localStorage.getItem('company_id'),
        login_user_id: localStorage.getItem('user_id')
      },
      recyclingStation: {
        dialogVisible: false
      }
    }
  },
  created() {
    document.title = '企业招投标'
    if (this.$route.query.jbxx_id) {
      this.getStage()
    } else {
      this.index = 1
    }
    this.getProAreaList()
    this.fn_role()
  },
  methods: {
    getStage() {
      let self = this
      self.axios.post(
        '/index/project/getProjStage',
        { jbxx_id: this.$route.query.jbxx_id },
        data => {
          switch (data) {
            case '预定':
              this.index = 1
              break
            case '报名':
              this.index = 2
              break
            case '标书':
              this.index = 3
              break
            case '开标':
              this.index = 4
              break
            case '过期':
              this.index = 5
              break
          }
          this.tableTy = 'coop'
          this.select_button_radio(this.index)
        }
      )
    },
    // 点击tab按钮进行切换 新建项目-add 合作项目-coop
    handleClickTab(val) {
      this.tableTy = val
      this.nowPage = 1
      this.total = 0
      // 请求项目列表 table表格
      this.getList()
    },

    openRecyclingStation() {
      this.recyclingStation = {
        dialogVisible: true,
        user_id: this.$store.state.userInfo.user_id,
        xmmc: this.searchxmmc,
        stage: this.type,
        type: '项目流程',
        company_id: localStorage.getItem('company_id'),
        xmdq: this.projectArea,
        valid: 2
      }
    },
    closeAddXm() {
      this.newXmId = ''
      this.$refs.newXm.cancelDia()
    },
    clickFn(type, row) {
      let self = this
      switch (type) {
        case '编辑':
          this.newXmId = row.id
          this.newXmTitle = '编辑项目'
          this.visibleNewItem = true
          break
        case '分配':
          let { href } = this.$router.resolve({
            path: `/myItem?jbxx_id=${row.id}&status=${this.type}`
          })
          window.open(href, `分配${row.id}`)
          break
        case '删除':
          this.$confirm('删除后将进入回收站,确认删除该项目?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              self.axios.post(
                '/index/project/delProject',
                { jbxx_id: row.id, valid: 2 },
                data => {
                  if (data.status == 'success') {
                    self.getCount()
                    self.getList()
                  } else {
                    self.$message.success(data.message)
                  }
                }
              )
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          break
      }
    },
    openGs(row) {
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?zbxx_id=${
          row.zbxx_id
        }&zbgs_id=&type=zbxx&xmmc=${row.xmmc}&source=${row.source}`
      })
      window.open(href, '招标信息' + row.zbxx_id + row.xmmc)
    },
    fn_role() {
      let self = this
      self.axios.post(
        '/index/mine/role',
        {
          user_id: this.$store.state.userInfo.user_id,
          company_id: localStorage.getItem('company_id')
        },
        data => {
          this.role = data
          // this.role.company_user = false
          if (!this.$route.query.jbxx_id) {
            this.tableTy = this.role.company_user ? 'add' : 'coop'
            this.select_button_radio(1)
          }
        }
      )
    },
    //报名成功的回调
    uploadSuccess(response, file, fileList) {
      this.row.bm.is_sign = 1
      this.bm.voucher = response.data.filename_time
      this.axios.post('/index/project/signOperate', this.bm, data => {
        this.$message({
          message: '报名成功',
          type: 'success'
        })
        this.bmVisible = false
        this.loading = false
        this.getList()
      })
    },
    //获取项目列表 下拉菜单 地区
    getProAreaList() {
      this.axios.post('/index/project/cate', {}, data => {
        this.projectAreaList = data.xmdq
      })
    },
    //报名前存储数据
    handData() {
      // this.bm = {
      //   company_id: localStorage.getItem("company_id"),
      //   gsmc: localStorage.getItem("qymc"),
      //   is_sign: 1,
      //   voucher: ""
      // };
    },
    //打开已报名详情弹窗
    openBm() {
      this.bmVisible = true
    },
    //打开报名文件
    openBmfile() {
      if (this.bm.voucher) {
        window.open(
          'https://wechat.cdzjkl.com/files/options/' +
            this.bm.voucher
        )
      } else {
        this.$message({
          message: '未上传凭证',
          type: 'error'
        })
      }
    },
    //取消报名
    unsetBm() {
      this.bm.voucher = ''
      this.bm.is_sign = 0
      this.axios.post('/index/project/signOperate', this.bm, data => {
        this.$message({
          message: '取消成功',
          type: 'success'
        })
        this.row.bm.is_sign = 0
        this.getList()
        this.bmVisible = false
      })
    },
    // 打开报名标书详情
    openXq(type, row) {
      this.checkBmAjax.jbxx_id = row.id
      if (type == '报名情况') {
        this.yuding = row.role
        //提前存储数据
        this.bm = {
          company_id: localStorage.getItem('company_id'),
          gsmc: localStorage.getItem('qymc'),
          jbxx_id: row.id,
          is_sign: 1,
          voucher: row.bmxx_file
        }
        this.row.bm = {
          is_sign: row.is_sign
        }
        this.Xq.title = '报名情况'
        this.Xq.ajaxData.company_id = localStorage.getItem('company_id')
        this.Xq.ajaxData.jbxx_id = row.id
        this.coopUser()
        this.Xq.visible = true
      } else if (type == '标书情况') {
        let { href } = this.$router.resolve({
          path: `/itemBsDet?jbxx_id=${row.id}&gs_id=${localStorage.getItem(
            'gs_id'
          )}`
        })
        window.open(href, 'c' + row.id)
      } else if (type == '对手分析') {
        let { href } = this.$router.resolve({
          path: `/competitorAnalysis?jbxx_id=${row.id}&page=1`
        })
        window.open(href, `/对手分析jbxx_id=${row.id}`)
      }
    },
    //请求报名标书详情接口
    coopUser() {
      this.Xq.loading = true
      this.axios.post('/index/project/coopUser', this.Xq.ajaxData, data => {
        this.Xq.list = data.rows
        this.Xq.loading = false
      })
    },
    //鼠标移动到已报名上
    changeText(btn, text) {
      var bm = document.getElementsByClassName(btn)[0]
      bm.innerHTML = text
    },
    //鼠标移动开已报名上
    mouseoutText(btn, text) {
      var bm = document.getElementsByClassName(btn)[0]
      bm.innerHTML = text
    },

    //招标回调
    onChild_row(row) {
      switch (row) {
        case '预定':
          this.index = 1
          break
        case '报名':
          this.index = 2
          break
        case '标书':
          this.index = 3
          break
        case '开标':
          this.index = 4
          break
        case '过期':
          this.index = 5
          break
      }
      this.dialogDrVisible = false
      this.select_button_radio(this.index)
      this.getList()
      this.getCount()
    },

    //匹配
    onMarry(row) {
      this.nowRow = row
      this.dialogPpVisible = true
    },
    //获得各个阶段的数目
    getCount() {
      this.axios.post(
        '/index/project/stageNum ',
        {
          user_id: this.$store.state.userInfo.user_id,
          xmmc: this.searchxmmc,
          company_id: localStorage.getItem('company_id'),
          type: '项目流程',
          proj_cate: this.tableTy
        },
        data => {
          //this.tableData = data.rows;
          this.total1 = data.total.预定 || 0
          this.total2 = data.total.报名 || 0
          this.total3 = data.total.标书 || 0
          this.total4 = data.total.开标 || 0
          this.total5 = data.total.过期 || 0
        }
      )
    },
    //点击 报名确认或者取消
    checkBm(row, num) {
      if (num == '_1') {
        this.checkBmAjax.status = 1
      } else if (num == '_2') {
        this.checkBmAjax.status = 2
      }
      if (row.status == '待确认') {
        this.checkBmAjax.user_id = row.user_id
        this.checkBmAjax.company_id = localStorage.getItem('company_id')
        this.daiquerenVisible = true
        this.isCooperate()
      } else if (row.status == '已确定') {
        this.checkBmAjax.user_id = row.user_id
        this.checkBmAjax.company_id = localStorage.getItem('company_id')
        this.checkBmAjax.status = 2
        this.isCooperate()
      } else if (row.status == '已取消') {
        this.checkBmAjax.user_id = row.user_id
        this.checkBmAjax.company_id = localStorage.getItem('company_id')
        this.checkBmAjax.status = 1
        this.isCooperate()
      }
    },
    //请求报名确认或取消的接口
    isCooperate() {
      this.axios.post('/index/project/isCooperate', this.checkBmAjax, data => {
        this.$message({
          showClose: true,
          message: '修改状态成功',
          type: 'success'
        })
        this.coopUser()
      })
    },
    //点击新建
    onNewItem() {
      this.newXmId = ''
      this.newXmTitle = '新建项目'
      this.visibleNewItem = true
    },
    //回收站
    onMidden() {
      this.visibleMidden = true
      this.getList(0)
    },
    tableLoading() {
      this.loading = true
    },
    //回调
    onAddNewItem(data) {
      this.visibleNewItem = false
      if (data != 'cancel') {
        this.index = 1
        this.select_button_radio(this.index)
        this.getList()
      }
    },

    openWin(type, row) {
      if (type == 'bs') {
        let { href } = this.$router.resolve({
          path: `/itemBsInfo?jbxx_id=${row.id}`
        })
        window.open(href, 'c' + row.id)
      } else if (type == 'rgsh') {
        let { href } = this.$router.resolve({
          path: `/itemCheckInfo?jbxx_id=${row.id}`
        })
        window.open(href, 'c' + row.id)
      } else {
      }
    },
    refresh() {
      this.getList()
    },
    //请求列表valid==0为回收站
    getList() {
      var index = this.index
      let ajax_data = {
        user_id: this.$store.state.userInfo.user_id,
        xmmc: this.searchxmmc,
        stage: this.type,
        type: '项目流程',
        proj_cate: this.tableTy,
        company_id: localStorage.getItem('company_id'),
        xmdq: this.projectArea
      }
      this.loading = true
      ajax_data.page = this.nowPage
      this.tableData = []
      this.axios.post('/index/project/re_lists', ajax_data, data => {
        if (data.total > 0 && data.status == 'failed' && ajax_data.page > 1) {
          this.nowPage -= 1
          this.getList()
        }
        this.tableData = data.rows
        this.loading = false
        this.total = data.total || 0
        this.getCount()
        if (index == 1) {
          this.total1 = data.total || 0
        } else if (index == 2) {
          this.total2 = data.total || 0
        } else if (index == 3) {
          this.total3 = data.total || 0
        } else if (index == 4) {
          this.total4 = data.total || 0
        } else {
          this.total5 = data.total || 0
        }
      })
    },
    //获取页面高度
    getH() {
      let top_h = this.$refs.topH.clientHeight
      let fenye_h = this.$refs.fenye.$el.clientHeight
      let winH =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      this.listHeight = parseInt(winH - top_h - fenye_h)
    },
    //列表分页
    handleSizeChange(val) {
      this.nowPage = val
      this.getList()
    },
    // 垃圾箱分页
    middenhandleSizeChange(val) {
      this.middennowPage = val
      this.getList(0)
    },
    // 搜索
    onSearch: function() {
      this.nowPage = 1
      this.total = 0
      this.getList()
    },
    onReset: function() {
      this.getCount()
      this.nowPage = 1
      this.total = 0
      this.searchxmmc = ''
      this.projectArea = ''
      this.getList()
    },
    //点击列表
    table_click(row) {
      let { href } = this.$router.resolve({
        path: `/iteminfo?jbxx_id=${row.id}&status=${
          row.status == '预定' ? 'yd' : ''
        }`
      })
      window.open(href, row.id)
      // this.$router.push({ path: "/iteminfo", query: { jbxx_id: row.id } });
    },
    //删除还原
    onDelRow(row, valid) {
      if (valid == 2) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.myListCaozuo(row, valid)
          })
          .catch(() => {})
      } else {
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.myListCaozuo(row, valid)
          })
          .catch(() => {})
      }
    },
    //删除还原
    myListCaozuo(row, valid) {
      this.axios.post(
        '/index/project/delProject',
        {
          jbxx_id: row.id,
          valid
        },
        data => {
          if ((data.status = 'success')) {
            this.$message.success('成功')
            if (valid != 2) {
              if (valid == 1) {
                this.getList(0)
              }
              this.getList()
            } else {
              //删除回收站数据
              this.getList(0)
            }
          } else {
            this.$message.console.error('失败')
          }
        }
      )
    },
    //button_radio 选项卡切换
    select_button_radio(index) {
      this.nowPage = 1
      this.total = 0
      this.index = index
      this.check_page()
    },
    //根据选项卡 切换筛选情况
    check_page() {
      var type = ''
      if (this.index == 1) {
        type = '预定'
      } else if (this.index == 2) {
        type = '报名'
      } else if (this.index == 3) {
        type = '标书'
      } else if (this.index == 4) {
        type = '开标'
      } else {
        type = '过期'
      }
      this.type = type
      this.getList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@activeColor: #409eff;

a {
  text-decoration: none;
}

.el-container {
  /* position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; */
}
.primary_btn {
  color: @activeColor;
  margin-right: 10px;
  cursor: pointer;
}
.danger_btn {
  color: red;
  cursor: pointer;
}
.top-position {
  padding-bottom: 10px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  background: #ffffff;
}

.bt2 {
}

.jd-bj {
  color: #ffffff;
  text-align: center;
  background-image: url('../assets/jd.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.el-header {
  padding: 0;
}

.btdiv {
  color: #ffffff;
  margin-bottom: 20px;
  background-color: #324157;
  display: flex;
  padding: 0 50px;
}

.border-b {
  margin: 0 40px;
}

.liu {
  margin: 0 auto;
  width: 1200px;
}

.liu li {
  position: relative;
  cursor: pointer;
  height: 58px;
  float: left;
  list-style: none;
  width: 235px;
}
.liu li img {
  position: absolute;
}

.liu2 li {
  height: 22px;
  float: left;
  position: absolute;
  list-style: none;
}
.link_color {
  color: rgb(58, 142, 230);
  cursor: pointer;
}
</style>
