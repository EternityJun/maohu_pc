<!--项目列表-->
<template>
  <el-row>
    <el-col :span="24">
      <el-header height="auto">
        <body-top></body-top>
        <div>
          <!-- 导航栏 -->
          <head-menu :index="'/projectCenter'"></head-menu>
        </div>
        <!--流程横排-->
        <div style="width: 100%;height:75px;margin-top:20px;">
          <ul style="height: 75px;" class="liu">
            <li @click="select_button_radio(1)">
              <img :src="button_radio.image1u" alt v-if="this.index == 1" style="z-index:999" />
              <img :src="button_radio.image1d" alt style="z-index:998" />
              <span
                :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '预定'?'#ffffff':'#606266',zIndex:'1000'}"
              >预定({{total1}}条)</span>
            </li>
            <li @click="select_button_radio(2)">
              <img :src="button_radio.image1u" alt v-if="this.index == 2" style="z-index:997" />
              <img :src="button_radio.image1d" alt style="z-index:996" />
              <span
                :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '报名'?'#ffffff':'#606266',zIndex:'1000'}"
              >报名(上网)({{total2}}条)</span>
            </li>
            <li @click="select_button_radio(3)">
              <img :src="button_radio.image1u" alt v-if="this.index == 3" style="z-index:995" />
              <img :src="button_radio.image1d" alt style="z-index:994" />
              <span
                :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '标书'?'#ffffff':'#606266',zIndex:'1000'}"
              >标书({{total3}}条)</span>
            </li>
            <li @click="select_button_radio(4)">
              <img :src="button_radio.image1u" alt v-if="this.index == 4" style="z-index:993" />
              <img :src="button_radio.image1d" alt style="z-index:992" />
              <span
                :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '开标'?'#ffffff':'#606266',zIndex:'1000'}"
              >开标({{total4}}条)</span>
            </li>
            <li @click="select_button_radio(5)">
              <img :src="button_radio.image5u" alt v-if="this.index == 5" style="z-index:991" />
              <img :src="button_radio.image5d" alt style="z-index:990" />
              <span
                :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '过期'?'#ffffff':'#606266',zIndex:'1000'}"
              >过期({{total5}}条)</span>
            </li>
          </ul>
        </div>

        <el-row class="border-b">
          <div style="float: left;width:800px;height: 50px;">
            <el-col :xs="0" :span="4" class="bt2">
              <p style="font-size:20px;font-weight:lighter">我的项目</p>
            </el-col>
            <el-col :xs="0" :span="12" align="left" style="display:flex;">
              <div>
                <el-button type="primary" @click="onNewItem">新建项目</el-button>
              </div>
              <div style="margin-left:15px;">
                <el-button type="primary" @click="dialogDrVisible = true">导入</el-button>
              </div>
              <div style="margin-left:15px;">
                <el-button type="info" @click="openRecyclingStation">回收站</el-button>
              </div>
            </el-col>
          </div>
          <div style="float:right;width:900px;height: 50px;">
            <el-col>
              <el-form :inline="true" class="demo-form-inline" align="right" @submit.native.prevent>
                <el-form-item label="项目地区">
                  <el-select v-model="projectArea" placeholder="请选择" @change="onSearch">
                    <el-option
                      v-for="item in projectAreaList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目名称">
                  <el-input
                    style="width:300px"
                    v-model="searchxmmc"
                    placeholder="请输入项目名称"
                    @keyup.enter.native="onSearch"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSearch">查询</el-button>
                  <el-button type @click="onReset">重置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </div>
        </el-row>
      </el-header>
      <el-row style="padding:0 40px;">
        <el-table :data="tableData" style="width: 100%;" v-loading="loading" border>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(nowPage-1)*10+1}}</template>
          </el-table-column>
          <el-table-column align="center" prop="date1" label="项目名称">
            <template slot-scope="scope">
              <div
                v-if="scope.row.zbxx_id>0"
                class="link_color"
                @click="openGs(scope.row)"
              >{{scope.row.xmmc}}</div>
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
                      <label
                        :style="{color:scope.row.stage1?'#ffffff':'#606266',width:'100%',heigth:'100%'}"
                      >{{scope.row.stage1 || '预定'}}</label>
                    </span>
                    <img
                      v-if="scope.row.stage1 && index != 5"
                      :src="list_image.l1y"
                      id="image"
                      style="width:100%;height: 100%"
                    />
                    <img
                      v-if="!scope.row.stage1 && index != 5"
                      :src="list_image.l1n"
                      id="image"
                      style="width:100%;height: 100%"
                    />
                    <img
                      v-if="index == 5"
                      :src="list_image.hy1"
                      id="image"
                      style="width:86%;height: 100%"
                    />
                  </li>
                  <li style="width:190px;z-index: 88;left:122px;">
                    <span
                      style="font-size: 12px;position: absolute;top:0px;z-index: 10;left:5px;width:190px;heigth:22px;"
                    >
                      <label
                        :style="{color:scope.row.stage2?'#ffffff':'#606266',width:'100%',heigth:'100%'}"
                      >{{scope.row.bm_jzrq || '报名'}}</label>
                    </span>
                    <img
                      v-if="index >= 2 && index!=5"
                      :src="list_image.l2y"
                      id="image"
                      style="width:100%;height: 100%"
                    />
                    <img
                      v-if="index < 2 && index!=5"
                      :src="list_image.l2n"
                      id="image"
                      style="width:100%;height: 100%"
                    />
                    <img
                      v-if="index == 5"
                      :src="list_image.hy2"
                      id="image"
                      style="width:100%;height: 100%"
                    />
                  </li>
                  <li style="width:170px;z-index: 77;left:264px;">
                    <span
                      style="font-size: 12px;position: absolute;top:0px;z-index: 10;width:170px;heigth:22px;"
                    >
                      <label
                        :style="{color:scope.row.stage3?'#ffffff':'#606266',width:'100%',height:'100%'}"
                      >标书</label>
                    </span>
                    <img
                      v-if="index >= 3 && index!=5"
                      :src="list_image.l3y"
                      id="image"
                      style="width:100%;height: 100%"
                    />
                    <img
                      v-if="index < 3 && index!=5"
                      :src="list_image.l3n"
                      id="image"
                      style="width:100%;height: 100%"
                    />
                    <img
                      v-if="index == 5"
                      :src="list_image.hy3"
                      id="image"
                      style="width:93%;height: 100%;"
                    />
                  </li>
                  <li style="width:150px;z-index: 66;left: 401px;">
                    <span
                      style="font-size: 12px;position: absolute;top:0px;z-index: 10;left:10px;width:150px;heigth:22px"
                    >
                      <label
                        :style="{color:scope.row.stage4?'#ffffff':'#606266',width:'100%',heigth:'100%'}"
                      >{{scope.row.tb_jzrq || '开标'}}</label>
                    </span>
                    <img
                      v-if="index>=4 && index!=5"
                      :src="list_image.l4y"
                      id="image"
                      style="width:100%;height: 100%"
                    />
                    <img
                      v-if="index<4 && index!=5"
                      :src="list_image.l4n"
                      id="image"
                      style="width:100%;height: 100%"
                    />
                    <img
                      v-if="index == 5"
                      :src="list_image.hy4"
                      id="image"
                      style="width:100%;height: 100%;"
                    />
                  </li>
                </ul>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="工作内容" align="center" width="200">
            <template slot-scope="scope">
              <span class="primary_btn" @click="handcoopCompany(scope.row,'查看')">查看</span>
              <span
                class="primary_btn"
                v-show="scope.row.cate=='登记'"
                @click="handcoopCompany(scope.row,'编辑')"
              >编辑</span>
              <span class="danger_btn" @click="handcoopCompany(scope.row,'删除')">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-footer>
        <el-pagination
          ref="fenye"
          @current-change="handleSizeChange"
          align="right"
          :current-page.sync="Apage"
          background
          layout="total,prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-footer>
      <el-dialog :title="newXmTitle" :visible.sync="visibleNewItem" :before-close="closeAddXm">
        <new-xm @onAddNewItem="onAddNewItem" ref="newXm" :newXmId="newXmId"></new-xm>
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
          <el-upload
            :action="updateUrl"
            :data="updateData"
            multiple
            :limit="1"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="tableLoading"
          >
            <el-button size="small" style="width:200px;" type="primary">重新报名</el-button>
            <!-- <el-button size="small" type="success">已报名</el-button> -->
          </el-upload>
        </div>
        <div style="width:100%;margin-top:10px;text-align:center;margin:10 auto">
          <el-button size="small" style="width:200px;" type="success" @click="openBmfile">查看报名凭证</el-button>
        </div>
        <div style="width:100%;margin-top:10px;text-align:center;margin:10 auto">
          <el-button size="small" style="width:200px;" type="danger" @click="unsetBm">取消报名</el-button>
        </div>
      </el-dialog>
      <el-dialog width="80%" title="报名情况" :visible.sync="coop.visible" top="10px">
        <el-row style="margin-bottom:20px;">
          <el-col :span="1" :offset="23">
            <el-button type="primary" size="small" @click="handcoopCompany(coop.scope_row,'分配')">分配</el-button>
          </el-col>
        </el-row>
        <el-table :data="coop.list" style="width: 100%;height:100%" v-loading="coop.loading" border>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(coop.row.page-1)*10+1}}</template>
          </el-table-column>
          <el-table-column align="center" prop="company_name" label="企业名称">
            <template slot-scope="scope">
              <el-button type="text" @click="openGs1(scope.row)">{{scope.row.company_name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="social_code" label="统一社会信用代码" width="250"></el-table-column>
          <el-table-column align="center" prop="legal_person" label="法人代表" width="100"></el-table-column>
          <el-table-column align="center" prop="status" label="状态" width="100">
            <template slot-scope="scope">
              <span style="color:#67C23A" v-if="scope.row.status == '已报名'">{{scope.row.status}}</span>
              <span style="color:#E6A23C" v-if="scope.row.status == '待确认'">{{scope.row.status}}</span>
              <span style="color:#409EFF" v-if="scope.row.status == '已预订'">{{scope.row.status}}</span>
              <span style="color:#909399" v-if="scope.row.status == '未通过'">{{scope.row.status}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="coopSizeChange"
          align="right"
          background
          layout="total,prev, pager, next"
          :total="coop.total"
        ></el-pagination>
      </el-dialog>
      <div v-if="recyclingStation.dialogVisible">
        <el-dialog
          title="回收站"
          :visible.sync="recyclingStation.dialogVisible"
          width="60%"
          top="50px"
        >
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
import XmRecyclingStation from './template/XmRecyclingStation'
import { valid } from 'semver'
import Cookie from './../cookie'
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
  data () {
    return {
      role: {},
      updateUrl:
        'https://wechat.cdzjkl.com/index/Human_Review/uploadFile',
      updateData: {
        token: localStorage.getItem('token'),
        login_company_id: localStorage.getItem('company_id'),
        login_user_id: localStorage.getItem('user_id')
      },
      newXmId: '',
      newXmTitle: '新建项目',
      Apage: 1,
      nowRow: null,
      //当前页面
      type: '预定',
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
      projectAreaList: [],
      projectArea: '',
      coop: {
        visible: false,
        loading: false,
        list: [],
        row: {
          user_id: '',
          jbxx_id: '',
          gsmc: '',
          page: 1
        }
      },
      recyclingStation: {
        dialogVisible: false
      }
    }
  },
  created () {
    document.title = '我的项目'
    this.index = 1
    this.select_button_radio(1)
    this.getProAreaList()
    this.fn_role()
  },
  methods: {
    openRecyclingStation () {
      this.recyclingStation = {
        dialogVisible: true,
        user_id: this.$store.state.userInfo.user_id,
        xmmc: this.searchxmmc,
        stage: this.type,
        type: '项目中心',
        company_id: localStorage.getItem('company_id'),
        xmdq: this.projectArea,
        valid: 2
      }
    },
    // 跳转
    openGs1 (row) {
      if (this.role.company_role !== 'C') {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.company_name}`
        })
        window.open(href, '公司详情' + row.gs_id)
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

    openGs (row) {
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?zbxx_id=${
          row.zbxx_id
          }&zbgs_id=&type=zbxx&xmmc=${row.xmmc}&source=${row.source}`
      })
      window.open(href, '招标信息' + row.zbxx_id + row.xmmc)
    },
    fn_role () {
      let self = this
      self.axios.post(
        '/index/mine/role',
        {
          user_id: this.$store.state.userInfo.user_id,
          company_id: localStorage.getItem('company_id')
        },
        data => {
          this.role = data
        }
      )
    },
    //报名成功的回调
    uploadSuccess (response, file, fileList) {
      this.bm.is_sign = 1
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
    //报名前存储数据
    handData (row) {
      this.bm = {
        company_id: localStorage.getItem('company_id'),
        jbxx_id: row.id,
        gsmc: '四川佳和建设有限公司',
        is_sign: 1,
        voucher: ''
      }
    },
    //打开已报名详情弹窗
    openBm (row) {
      this.bm = {
        company_id: localStorage.getItem('company_id'),
        jbxx_id: row.id,
        gsmc: '四川佳和建设有限公司',
        voucher: row.bmxx_file
      }
      this.bmVisible = true
    },
    //打开报名文件
    openBmfile () {
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
    unsetBm () {
      this.bm.voucher = ''
      this.bm.is_sign = 0
      this.axios.post('/index/project/signOperate', this.bm, data => {
        this.$message({
          message: '取消成功',
          type: 'success'
        })
        this.getList()
        this.bmVisible = false
      })
    },
    //鼠标移动到已报名上
    changeText (btn, text) {
      var bm = document.getElementsByClassName(btn)[0]
      bm.innerHTML = text
    },
    //鼠标移动开已报名上
    mouseoutText (btn, text) {
      var bm = document.getElementsByClassName(btn)[0]
      bm.innerHTML = text
    },

    //打开查看报名情况窗口
    handcoopCompany (row, type) {
      let self = this
      switch (type) {
        case '分配':
          let { href } = this.$router.resolve({
            path: `/competitorAnalysis?jbxx_id=${row.id}&page=0`
          })
          window.open(href, `/对手分析jbxx_id=${row.id}`)
          break
        case '查看':
          this.coop.scope_row = row
          this.coop.visible = true
          this.coop.row.jbxx_id = row.id
          this.coop.row.user_id = this.$store.state.userInfo.user_id
          this.coopCommpany()
          break
        case '编辑':
          this.newXmId = row.id
          this.newXmTitle = '编辑项目'
          this.visibleNewItem = true
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
    //请求报名情况接口
    coopCommpany () {
      this.coop.loading = true
      // this.axios.post(
      //   '/index/project/coopCommpany',
      //   {
      //     user_id: this.coop.row.user_id,
      //     jbxx_id: this.coop.row.jbxx_id,
      //     gsmc: this.coop.row.gsmc
      //   },
      //   data => {
      //     this.coop.list = data.rows
      //     this.coop.loading = false
      //   }
      // )
      this.axios.post(
        '/index/element_set/getMaohuAlloted',
        {
          user_id: this.coop.row.user_id,
          jbxx_id: this.coop.row.jbxx_id,
          gsmc: this.coop.row.gsmc,
          page: this.coop.row.page,
          rows: 10
        },
        data => {
          this.coop.list = data.rows || []
          this.coop.total = data.total || 0
          this.coop.loading = false
        }
      )
    },
    //匹配
    onMarry (row) {
      this.nowRow = row
      this.dialogPpVisible = true
    },
    //获得各个阶段的数目
    getCount () {
      this.axios.post(
        '/index/project/stageNum ',
        {
          user_id: this.$store.state.userInfo.user_id,
          xmmc: this.searchxmmc,
          company_id: localStorage.getItem('company_id'),
          type: '项目中心'
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
    //点击新建
    onNewItem () {
      this.newXmId = ''
      this.newXmTitle = '新建项目'
      this.visibleNewItem = true
    },
    //回收站
    onMidden () {
      this.visibleMidden = true
      this.getList(0)
    },
    tableLoading () {
      this.loading = true
    },
    //回调
    onAddNewItem (data) {
      this.newXmId = ''
      this.visibleNewItem = false
      if (data != 'cancel') {
        this.index = 1
        this.select_button_radio(this.index)
        this.getList()
      }
    },
    closeAddXm () {
      this.newXmId = ''
      this.$refs.newXm.cancelDia()
    },
    //子级传父级导入数据
    onChild_row (row) {
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
      console.log(this.type)
    },
    openWin (type, row) {
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
    refresh () {
      this.getList()
    },
    //请求列表valid==0为回收站
    getList () {
      var index = this.index
      let ajax_data = {
        user_id: this.$store.state.userInfo.user_id,
        xmmc: this.searchxmmc,
        stage: this.type,
        type: '项目中心',
        company_id: localStorage.getItem('company_id'),
        xmdq: this.projectArea,
        valid: 1
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
    getH () {
      let top_h = this.$refs.topH.clientHeight
      let fenye_h = this.$refs.fenye.$el.clientHeight
      let winH =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      this.listHeight = parseInt(winH - top_h - fenye_h)
    },
    //获取项目列表 下拉菜单 地区
    getProAreaList () {
      this.axios.post('/index/project/cate', {}, data => {
        this.projectAreaList = data.xmdq
      })
    },
    //列表分页
    handleSizeChange (val) {
      this.nowPage = val
      this.getList()
    },
    coopSizeChange (val) {
      this.coop.row.page = val
      this.coopCommpany()
    },
    // 垃圾箱分页
    middenhandleSizeChange (val) {
      this.middennowPage = val
      this.getList(0)
    },
    // 搜索
    onSearch: function () {
      this.nowPage = 1
      this.total = 0
      this.getList()
    },
    onReset: function () {
      this.projectArea = ''
      this.getCount()
      this.nowPage = 1
      this.total = 0
      this.searchxmmc = ''
      this.Apage = 1
      this.getList()
    },
    //点击列表
    table_click (row) {
      let { href } = this.$router.resolve({
        path: `/iteminfo?jbxx_id=${row.id}&status=${
          row.status == '预定' ? 'yd' : ''
          }`
      })
      window.open(href, row.id)
      // this.$router.push({ path: "/iteminfo", query: { jbxx_id: row.id } });
    },
    //删除还原
    onDelRow (row, valid) {
      if (valid == 2) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.myListCaozuo(row, valid)
          })
          .catch(() => { })
      } else {
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.myListCaozuo(row, valid)
          })
          .catch(() => { })
      }
    },
    //删除还原
    myListCaozuo (row, valid) {
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
    //切换账号
    onChangeUser () {
      // Cookie.delCookie('user_id');
      // Cookie.delCookie("sid");
      this.$router.push('/')
    },
    //button_radio 选项卡切换
    select_button_radio (index) {
      this.nowPage = 1
      this.total = 0
      this.index = index
      this.check_page()
    },
    //根据选项卡 切换筛选情况
    check_page () {
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
<style scoped lang='less'>
@activeColor: #409eff;
a {
  text-decoration: none;
}

.el-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
  font-size: 18px;
  font-weight: 600;
}

.jd-bj {
  color: #ffffff;
  text-align: center;
  background-image: url("../assets/jd.png");
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
.primary_btn {
  color: @activeColor;
  margin-right: 10px;
  cursor: pointer;
}
.danger_btn {
  color: red;
  cursor: pointer;
}
</style>
