<!--项目列表-->
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
<template>
  <el-container>
    <el-header height="auto">
      <body-top></body-top>
      <!--流程横排-->
      <div style="width: 100%;height:100px;margin-top:10px;">
        <ul style="height: 100px;position: relative;" class="liu">
          <li style="width:270px;z-index: 100" @click="select_button_radio(1)">
            <span :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '预定'?'#ffffff':'#606266'}">预定({{total1}}条)</span>
            <img :src="button_radio.l1" id="image" style="width:100%;height: 100%">
          </li>
          <li style="width:306px;z-index: 88;left:236px;" @click="select_button_radio(2)">
            <span :style="{fontSize:'20px',position: 'absolute',top:'14px',left:' 65px',color:type == '报名'?'#ffffff':'#606266'}">报名(上网)({{total2}}条)</span>
            <img :src="button_radio.l2" id="image" style="width:100%;height: 100%">
          </li>
          <li style="width:306px;z-index: 77;left:507px;" @click="select_button_radio(3)">
            <span :style="{fontSize: '20px',position: 'absolute',top:'14px',left: '88px',color:type == '标书'?'#ffffff':'#606266'}">标书({{total3}}条)</span>
            <img :src="button_radio.l3" id="image" style="width:100%;height: 100%">
          </li>
          <li style="width:306px;z-index: 66;left: 778px;" @click="select_button_radio(4)">
            <span :style="{fontSize: '20px',position: 'absolute',top:'14px',left:' 88px',color:type == '开标'?'#ffffff':'#606266'}">开标({{total4}}条)</span>
            <img :src="button_radio.l4" id="image" style="width:100%;height: 100%">
          </li>
          <li style="width:280px;z-index: 55;left: 1049px;margin-top: 2px" @click="select_button_radio(5)">
            <span :style="{fontSize: '20px',position: 'absolute',top:'12px',left: '85px',color:type == '过期'?'#ffffff':'#606266'}">过期({{total5}}条)</span>
            <img :src="button_radio.l5" id="image" style="width:100%;height: 95%">
          </li>
        </ul>
      </div>

      <el-row class="border-b">
        <div style="float: left;width:800px;height: 80px;">
          <el-col :xs="0" :span="3" class="bt2">
            <p>我的项目</p>
          </el-col>
          <el-col :xs="0" :span="12" align="left">
            <!-- <div v-if="index == 1">
              <el-button type="success" disabled @click="onNewItem">新建项目</el-button>
            </div> -->
            <!-- <div v-if="index == 2">
              <el-button type="success" @click="dialogDrVisible = true">导入</el-button>
            </div> -->
          </el-col>
        </div>
        <div style="float:right;width:600px;height: 80px;">
          <el-col>
            <el-form :inline="true" class="demo-form-inline" align="right" @submit.native.prevent>
              <el-form-item>
                <el-input v-model="searchxmmc" placeholder="请输入项目名称" @keyup.enter.native="onSearch"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="primary" @click="onReset">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="tableData" :header-cell-style="{background:'#f5f7fa'}"  style="width: 100%;height:100%" v-loading="loading">
        <el-table-column label="#" width="100">
          <template slot-scope="scope">{{scope.$index+(nowPage-1)*10+1}}</template>
        </el-table-column>
        <el-table-column align="left" prop="date1" label="项目名称">
          <template slot-scope="scope">
            <div v-html="scope.row.xmmc"></div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="xmdq" label="项目地区" width="300"></el-table-column>
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
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="scope">
            <!--  -->
            <span style="width:68px;float:left" v-if="scope.row.is_sign == 0 && power.bm == 1">
              <el-upload action="https://wechat.cdzjkl.com/index/Human_Review/uploadFile" multiple :limit="1" :show-file-list="false" :on-success="uploadSuccess" :before-upload="tableLoading">
                <el-button size="small" style="width:68px;" type="primary" @click="handData(scope.row)">报名</el-button>
                <!-- <el-button size="small" type="success">已报名</el-button> -->
              </el-upload>
            </span>
            <span style="width:68px;float:left" v-if="scope.row.is_sign == 1 && power.bm == 1" @click="openBm(scope.row)" @mouseout="changeText('yibaoming','已报名')">
              <el-button size="small" type="success" @click="handData(scope.row)" style="width:68px;">
                <span class="yibaoming">已报名</span>
              </el-button>
            </span>
            <el-button size="small" type="success" @click="openWin('rgsh',scope.row)" style="float:left;margin-left:10px;" v-if="scope.row.role.indexOf('人工审核') > -1">人工审核</el-button>
            <!--  -->
            <el-button size="small" style="float:left;margin-left:10px" type="success" @click="openWin('bs',scope.row)" v-if="scope.row.role.indexOf('标书') > -1">标书</el-button>
            <!-- <el-button size="small" style="float:right;" @click="onDelRow(scope.row,0)" type="danger">删除</el-button> -->
            <el-button size="small" style="float:left;margin-left:10px;" @click="table_click(scope.row)" type="primary">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination ref="fenye" @current-change="handleSizeChange" align="right" background layout="prev, pager, next" :total="total"></el-pagination>
    </el-footer>
    <el-dialog title="新建项目" :visible.sync="visibleNewItem">
      <nwe-item @onAddNewItem="onAddNewItem"></nwe-item>
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
        <el-upload action="https://wechat.cdzjkl.com/index/Human_Review/uploadFile" multiple :limit="1" :show-file-list="false" :on-success="uploadSuccess" :before-upload="tableLoading">
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
  </el-container>
</template>
<script>
/* eslint-disable */
import ItemImport from './ItemImport'
import nweItem from './template/newItem'
import myReserve from './template/myReserve'
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

export default {
  name: 'ItemList',
  components: {
    ItemImport,
    nweItem,
    myReserve,
    uploadFile
  },
  data() {
    return {
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
        l1: l1u,
        l2: l2u,
        l3: l2u,
        l4: l2u,
        l5: l5u
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
      }
    }
  },
  created() {
    document.title = '项目流程'
    this.index = 1
    this.select_button_radio(1)
  },
  methods: {
    //报名成功的回调
    uploadSuccess(response, file, fileList) {
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
    //测试
    aaa() {
      console.log(1111)
    },
    //报名前存储数据
    handData(row) {
      this.bm = {
        company_id: localStorage.getItem('company_id'),
        jbxx_id: row.id,
        gsmc: '四川佳和建设有限公司',
        is_sign: 1,
        voucher: ''
      }
    },
    //打开已报名详情弹窗
    openBm(row) {
      this.bm = {
        company_id: localStorage.getItem('company_id'),
        jbxx_id: row.id,
        gsmc: '四川佳和建设有限公司',
        voucher: row.bmxx_file
      }
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
        this.getList()
        this.bmVisible = false
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
    onChild_row() {
      this.dialogDrVisible = false
      this.getCount()
      this.$emit('onChild_row')
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
          type: '项目流程'
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
    onNewItem() {
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
    onAddNewItem() {
      this.visibleNewItem = false
      this.getList()
    },
    //子级传父级导入数据
    onChild_row(row) {
      this.select_button_radio(this.index)
      this.getList()
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
    //请求列表valid==0为回收站
    getList() {
      var index = this.index
      let ajax_data = {
        user_id: this.$store.state.userInfo.user_id,
        xmmc: this.searchxmmc,
        stage: this.type,
        type: '项目流程',
        company_id: localStorage.getItem('company_id')
      }
      this.loading = true
      ajax_data.page = this.nowPage
      this.tableData = []
      this.axios.post('/index/project/re_lists', ajax_data, data => {
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
      if (index == 1) {
        this.button_radio.l1 = l1u
        this.button_radio.l2 = l2d
        this.button_radio.l3 = l2d
        this.button_radio.l4 = l2d
        this.button_radio.l5 = l5d
        this.check_page()
      } else if (index == 2) {
        this.button_radio.l1 = l1d
        this.button_radio.l2 = l2u
        this.button_radio.l3 = l2d
        this.button_radio.l4 = l2d
        this.button_radio.l5 = l5d
        this.check_page()
      } else if (index == 3) {
        this.button_radio.l1 = l1d
        this.button_radio.l2 = l2d
        this.button_radio.l3 = l2u
        this.button_radio.l4 = l2d
        this.button_radio.l5 = l5d
        this.check_page()
      } else if (index == 4) {
        this.button_radio.l1 = l1d
        this.button_radio.l2 = l2d
        this.button_radio.l3 = l2d
        this.button_radio.l4 = l2u
        this.button_radio.l5 = l5d
        this.check_page()
      } else {
        this.button_radio.l1 = l1d
        this.button_radio.l2 = l2d
        this.button_radio.l3 = l2d
        this.button_radio.l4 = l2d
        this.button_radio.l5 = l5u
        this.check_page()
      }
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
<style scoped>
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
  border-bottom: 2px solid #06b6ff;
}

.liu {
  margin: 0 auto;
  width: 1370px;
}

.liu li {
  cursor: pointer;
  height: 58px;
  float: left;
  list-style: none;
  position: absolute;
}

.liu2 li {
  height: 22px;
  float: left;
  position: absolute;
  list-style: none;
}
</style>
