<!--项目列表-->
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
<template>
  <div>
    <!-- 头部 -->
    <body-top></body-top>
    <div class="main">
      <!-- 导航栏 -->
      <head-menu :index="'/integral'"></head-menu>
      <!-- 标题栏 -->
      <div class="title_bar">
        <el-row>
          <el-col :span="3" class="title_bar_font" style="font-size:22px;font-weight:lighter">
            <span v-if="listType == 1">项目列表</span>
            <span v-if="listType == 2">人员列表</span>
          </el-col>
          <el-col :span="5" class="title_bar_font" style="font-weight:lighter">
            总积分:
            <span v-if="listType == 1">{{project.all.total}}</span>
            <span v-if="listType == 2">{{ry.all.total_integral}}</span>
          </el-col>
          <el-col :span="5" class="title_bar_font">
            花费积分:
            <span v-if="listType == 1" v-html="project.all.spend">{{project.all.spend}}</span>
            <span v-if="listType == 2" v-html="ry.all.spend_integral">{{ry.all.spend_integral}}</span>
          </el-col>
          <el-col :span="5" class="title_bar_font">
            剩余积分:
            <span v-if="listType == 1" v-html="project.all.rest">{{project.all.rest}}</span>
            <span v-if="listType == 2" v-html="ry.all.residual_integral">{{ry.all.residual_integral}}</span>
          </el-col>
          <el-col :span="6" class="title_bar_font">
            <el-radio-group v-model="radio1" @change="changeListType" style="float:right">
              <el-radio-button label="查看项目列表"></el-radio-button>
              <el-radio-button label="查看人员列表"></el-radio-button>
            </el-radio-group>
            <!-- <el-button type="primary" plain @click="changeListType" v-if="listType == 1">查看人员列表</el-button>
            <el-button type="primary" plain @click="changeListType" v-if="listType == 2">查看项目列表</el-button>-->
          </el-col>
        </el-row>
      </div>
      <!-- 主内容 -->
      <div class="table_main">
        <div v-if="listType == 1">
          <el-row class="table_title">
            <el-col :span="21" style="height: 45px;">
              <el-form :inline="true" :model="search" class="demo-form-inline" @submit.native.prevent>
                <el-form-item label="项目名称">
                  <el-input style="width:300px" placeholder="请输入项目名称" clearable v-model="search.xmmc" @keydown.enter.native="searchXm"></el-input>
                </el-form-item>
                <el-form-item label="项目进度">
                  <el-select v-model="proAjaxData.stage" placeholder="请选择" @change="xmjd_change">
                    <el-option v-for="item in xmjd_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="searchXm">搜索</el-button>
                  <el-button type @click="XmsearchReset">重置</el-button>
                  <el-button type="success" @click="handleAddItem">添加</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="3">
              <el-button type="danger" round size="medium" @click="searchQq" v-if="project.stage == 1">查看过期项目</el-button>
              <el-button type="success" round size="medium" @click="searchQq" v-if="project.stage == 0">查看有效项目</el-button>
            </el-col>
          </el-row>
          <el-table :data="project.list" border style="width: 100%" key="projectList" v-loading="project.loading">
            <el-table-column label="序号" width="60" align="center">
              <template slot-scope="scope">{{scope.$index+(proAjaxData.page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="xmmc" label="项目名称"></el-table-column>
            <el-table-column label="项目进度" width="200" v-if="project.stage == 1">
              <template slot-scope="scope">
                <div class="xmjd">{{scope.row.stage}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="total" label="项目总积分" width="100" align="center">
              <template slot-scope="scope">
                <span v-html="scope.row.total" @click="mxXmIntegral(scope.row)" style="color:#66b1ff;cursor:pointer">{{scope.row.total}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="spend" label="项目花费积分" width="120" align="center">
              <template slot-scope="scope">
                <span v-html="scope.row.spend" @click="openXmDet(scope.row)" style="color:#66b1ff;cursor:pointer">{{scope.row.spend}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="rest" label="项目剩余积分" width="120" align="center">
              <template slot-scope="scope">
                <span v-html="scope.row.rest">{{scope.row.rest}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="zjXmIntegral(scope.row)" size="mini">增加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background layout="total,prev, pager, next" :total="project.total" @current-change="projectChangePage" :current-page.sync="project.Apage" style="margin:20px 0;text-align:right;"></el-pagination>
        </div>
        <div v-if="listType == 2">
          <el-row class="table_title">
            <el-col :span="23" :offset="1">
              <el-form :inline="true" :model="ry" class="demo-form-inline" @submit.native.prevent>
                <el-form-item label="电话号码">
                  <el-input placeholder="电话号码" clearable style v-model="ry.phone" @keydown.enter.native="searchRy"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                  <el-input placeholder="用户名" clearable style v-model="ry.username" @keydown.enter.native="searchRy"></el-input>
                </el-form-item>
                <el-form-item label="微信昵称">
                  <el-input placeholder="微信昵称" clearable style v-model="ry.nickname" @keydown.enter.native="searchRy"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="searchRy">搜索</el-button>
                  <el-button type @click="RysearchReset">重置</el-button>
                  <el-button type="success" @click="handleAddItem">添加</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-table :data="ry.list" border style="width: 100%;margin-top:10px;" key="ryList" v-loading="ry.loading">
            <el-table-column prop="id" label="序号" width="60" align="center">
              <template slot-scope="scope">{{scope.$index+(peopleAjaxData.page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="username" label="人员名称" width="180" align="center"></el-table-column>
            <el-table-column prop="nickname" label="微信昵称" align="center"></el-table-column>
            <el-table-column prop="cellphone" label="电话号码" align="center"></el-table-column>
            <el-table-column prop="total_integral" label="总积分" align="center" width="100">
              <template slot-scope="scope">
                <span v-html="scope.row.total_integral" style="color:#409EFF;cursor:pointer" @click="mxRyIntegral(scope.row)">{{scope.row.total_integral}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="spend_integral" label="花费积分" align="center" width="100">
              <template slot-scope="scope">
                <span v-html="scope.row.spend_integral" @click="openRyDet(scope.row)" style="color:#409EFF;cursor:pointer">{{scope.row.spend_integral}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="total_integral" label="剩余积分" align="center" width="100">
              <template slot-scope="scope">
                <span v-html="scope.row.residual_integral">{{scope.row.residual_integral}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center" width="100">
              <template slot-scope="scope">
                <el-button type="primary" @click="zjRyIntegral(scope.row)" size="mini">增加</el-button>
                <!-- <el-button type="danger" @click="delXmRy(scope.row)" size="mini">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background layout="total,prev, pager, next" :total="ry.total" @current-change="ryChangePage" :current-page.sync="ry.Apage" style="margin:20px 0;text-align:right;"></el-pagination>
        </div>
      </div>
    </div>
    <!-- 添加项目弹窗 -->
    <el-dialog title="添加项目" :visible.sync="GsListVisible" top="30px" :close-on-click-modal="close_on_click_modal">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="项目名称">
          <el-input v-model="add.xmInput" placeholder="请输入项目名称" @keydown.enter.native="addSearch('xm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSearch('xm')">搜索</el-button>
          <el-button @click="addSearch">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="add.XmList" border style="width: 100%;margin-top:10px;">
        <el-table-column prop="id" label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+(add.Xmpage-1)*10+1}}</template>
        </el-table-column>
        <el-table-column prop="xmmc" label="项目名称" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="addProject(scope.row)" v-if="scope.row.flag == 0">选择</el-button>
            <el-button type="primary" size="mini" v-if="scope.row.flag == 1" disabled>已选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total,prev, pager, next" :total="add.XmListTotal" :current-page.sync="add.xm.nowPage" @current-change="addProChangePage" style="margin:20px 0;text-align:right;"></el-pagination>
    </el-dialog>
    <!-- 添加人员弹窗 -->
    <el-dialog title="添加人员" :visible.sync="RyListVisible" top="50px" :close-on-click-modal="close_on_click_modal">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="人员名称">
          <el-input v-model="add.ryInput" placeholder="请输入人员名称" @keydown.enter.native="addSearch('ry')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSearch('ry')">搜索</el-button>
          <el-button @click="addSearch">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="add.RyList" border style="width: 100%;margin-top:10px;">
        <el-table-column prop="id" label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+(add.Rypage-1)*10+1}}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="nickname" label="微信昵称" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="addRy(scope.row)" v-if="scope.row.flag == 0">选择</el-button>
            <el-button type="primary" size="mini" v-if="scope.row.flag == 1" disabled>已选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total,prev, pager, next" :total="add.RyListTotal" @current-change="addRyChangePage" :current-page.sync="add.ry.nowPage" style="margin:20px 0;text-align:right;"></el-pagination>
    </el-dialog>
    <!-- 项目查看窗口 -->
    <el-dialog :title="project.title" :visible.sync="project.DetVisible" :close-on-click-modal="close_on_click_modal">
      <el-table key="bbb" :span-method="arraySpanMethod" style="margin-top:10px;" border :data="project.ck.list">
        <el-table-column width="60" type="index" label="序号" align="center"></el-table-column>
        <el-table-column align="center" prop="username" label="人员"></el-table-column>
        <el-table-column align="center" prop="total_integral" label="实际总分"></el-table-column>
        <el-table-column align="center" prop="gsmc" label="企业名称"></el-table-column>
        <el-table-column align="center" label="实际积分">
          <template slot-scope="scope">
            {{scope.row.company_integral}}
            <span style="color:#428bca">({{scope.row.all_company}})</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.allSure==0 ?  'primary' : ''" @click="handGsRy(scope.row)" size="mini">{{scope.row.allSure==0 ? '确认' : '编辑'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 人员查看窗口 -->
    <el-dialog title="查看人员" :visible.sync="ry.DetVisible" :close-on-click-modal="close_on_click_modal">
      <el-table key="aaa" :span-method="arraySpanMethod" border style="margin-top:10px" :data="ry.ck.list">
        <el-table-column width="60" type="index" label="序号" align="center"></el-table-column>
        <el-table-column align="center" prop="xmmc" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="gsmc" label="公司名称"></el-table-column>
        <el-table-column align="center" prop="company_integral" label="实际积分"></el-table-column>
        <el-table-column label="实际总分" prop="total_integral" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handGsRy(scope.row)" size="mini">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 业绩增加积分窗口 -->
    <el-dialog :visible.sync="project.zj.visible" :title="project.zj.xmmc" width="30%" :close-on-click-modal="close_on_click_modal">
      <el-form ref="form" :model="project" label-width="80px">
        <el-form-item label="积分(万)">
          <el-input placeholder="请输入积分" type="number" v-model="project.zj.score"></el-input>
        </el-form-item>
        <el-form-item label="积分">
          <el-input placeholder="请输入内容" v-model="project.zj.score*10000" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="liuyan" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div class="title_bottom">
        <el-button type="primary" @click="addProjectIntegral">&nbsp;确定&nbsp;</el-button>
        <el-button @click="project.zj.visible = false">&nbsp;取消&nbsp;</el-button>
      </div>
    </el-dialog>
    <!-- 人员增加积分窗口 -->
    <el-dialog :visible.sync="ry.zj.visible" :title="ry.zj.title" width="30%" :close-on-click-modal="close_on_click_modal">
      <el-form ref="form" :model="ry" label-width="80px">
        <el-form-item label="积分(万)">
          <el-input placeholder="请输入积分" type="number" v-model="ry.zj.score"></el-input>
        </el-form-item>
        <el-form-item label="积分">
          <el-input placeholder="请输入内容" v-model="ry.zj.score*10000" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="liuyan2" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div class="title_bottom">
        <el-button type="primary" @click="addPeopleIntegral">&nbsp;确定&nbsp;</el-button>
        <el-button @click="ry.zj.visible = false">&nbsp;取消&nbsp;</el-button>
      </div>
    </el-dialog>
    <!-- 查看业绩积分变动明细 -->
    <el-dialog :visible.sync="project.mx.visible" :title="project.mx.xmmc" :close-on-click-modal="close_on_click_modal">
      <div style="text-align:center">
        <el-table :data="project.mx.list" border style="width: 100%;margin-top:10px;" v-loading="project.mx.loading">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{(project.mx.page-1)*10+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="created" label="时间" align="center"></el-table-column>
          <el-table-column prop="integral" label="积分" align="center"></el-table-column>
          <el-table-column prop="txt" label="备注" align="center" width="450"></el-table-column>
        </el-table>
        <el-pagination background layout="total,prev, pager, next" :total="project.mx.total" :current-page="project.mx.page" @current-change="proMxChangePage"></el-pagination>
      </div>
      <div class="title_bottom">
        <el-button type="" @click="project.mx.visible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 查看人员积分变动明细 -->
    <el-dialog :visible.sync="ry.mx.visible" :close-on-click-modal="close_on_click_modal">
      <div class="title_header">积分明细-------{{ry.mx.username}}</div>
      <div style="text-align:center">
        <el-table :data="ry.mx.list" border style="width: 100%;margin-top:10px;" v-loading="ry.mx.loading">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{(ry.mx.page-1)*10+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="created" label="时间" align="center"></el-table-column>
          <el-table-column prop="integral" label="积分" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" align="center" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
        <el-pagination background layout="total,prev, pager, next" :total="ry.mx.total" :current-page="ry.mx.page" @current-change="ryMxChangePage"></el-pagination>
      </div>
      <div class="title_bottom">
        <el-button type="" @click="ry.mx.visible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 查询人员对公司积分的操作 -->
    <el-dialog :visible.sync="ry.gsry.visible" title="确认积分" top='10px' :close-on-click-modal="close_on_click_modal">
      <div style="text-align:center">
        <el-table :data="ry.gsry.list" border style="width: 100%;margin-top:10px;" v-loading="ry.gsry.loading">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+(ry.gsry.page-1)*10+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="integral" label="积分" align="center"></el-table-column>
          <el-table-column prop="username" label="操作人" align="center"></el-table-column>
          <el-table-column prop="txt" label="备注" align="center"></el-table-column>
          <el-table-column prop="created" label="时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="small" :type="scope.row.flag == 1 ? '' : 'primary'" @click="confirmIntegral(scope.row)">{{scope.row.flag == 1 ? '编辑积分' : '确认积分'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :current-page.sync="ry.gsry.page" :total="ry.gsry.total" @current-change="confirmChangePage"></el-pagination>
      </div>
      <div class="title_bottom">
        <el-button :disabled="ry.gsry.allSure==1 ? true :false" type="primary" @click="confirmIntegral('all')">全部确认</el-button>
        <el-button type="" @click="ry.gsry.visible = false">关闭</el-button>
      </div>
      <el-dialog width="50%" title="编辑积分" :visible.sync="ry.gsry.innerVisible" append-to-body :close-on-click-modal="close_on_click_modal">
        <el-form ref="form" :model="ry.gsry.form" label-width="80px">
          <el-form-item label="积分">
            <el-input v-model="ry.gsry.form.integral" type="number"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="ry.gsry.form.remarks"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="addCompanyIntegral">确认</el-button>
            <el-button @click="ry.gsry.innerVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import head_menu from './template/head_menu.vue'
import tableMregeFn from './../tableMrege'
import image1 from '../assets/l11u.png'
export default {
  components: {
    headMenu: head_menu
  },
  data() {
    return {
      close_on_click_modal:false,
      liuyan: '',
      liuyan2: '',
      radio1: '查看项目列表',
      listType: 1,
      GsListVisible: false,
      RyListVisible: false,
      add: {
        XmList: [],
        XmListTotal: 10,
        Xmpage: 1,
        Rypage: 1,
        RyList: [],
        RyListTotal: 10,
        xm: {
          nowPage: 1
        },
        ry: {
          nowPage: 1
        }
      },
      project: {
        Apage: 1,
        all: 0,
        list: [],
        loading: false,
        total: 0,
        rest: 0,
        stage: 1,
        DetVisible: false,
        page: 1,
        zj: {
          visible: false,
          username: '',
          score: 0,
          jbxx_id: ''
        },
        mx: {
          visible: false,
          username: '',
          jbxx_id: '',
          list: [],
          page: 1
        },
        ck: {
          list: [],
          jbxx_id: ''
        }
      },
      ry: {
        Apage: 1,
        list: [],
        loading: false,
        total: 0,
        rest: 0,
        phone: '',
        username: '',
        nickname: '',
        all: 0,
        zj: {
          visible: false,
          xmmc: '',
          score: 0,
          jbxx_id: ''
        },
        mx: {
          visible: false,
          xmmc: '',
          jbxx_id: '',
          list: [],
          page: 1
        },
        DetVisible: false,
        ck: {
          list: [],
          user_id: ''
        },
        gsry: {
          page: 1,
          total: 0,
          list: [],
          loading: false,
          visible: false,
          innerVisible: false,
          form: {
            integral: '',
            remarks: ''
          }
        }
      },
      peopleAjaxData: {
        cate: 'integral',
        rows: 10,
        page: 1,
        order: 'asc'
      },
      proAjaxData: {
        xmmc: '',
        type: '正常',
        stage: '',
        rows: 10,
        page: 1,
        order: 'asc'
      },
      search: {
        xmmc: ''
      },
      xmjd_options: [
        { label: '全部', value: '' },
        { label: '预定', value: '预定' },
        { label: '报名', value: '报名' },
        { label: '标书', value: '标书' },
        { label: '开标', value: '开标' }
      ]
    }
  },
  created() {
    this.getProjectData()
    this.getPeopleData()
    this.projectTotalRest()
    this.ryTotalRest()
    document.title = '积分管理'
  },
  methods: {
    confirmChangePage(val) {
      this.ry.gsry.page = val
      this.handGsRy(this.companyDetailsRow)
    },
    confirmIntegral(val) {
      //确认积分
      console.log(val.integral, val.txt)
      if (val.flag == 1) {
        this.ry.gsry.innerVisible = true
        this.ry.gsry.form.id = val.id
        this.ry.gsry.form.user_id = val.user_id
        this.ry.gsry.form.integral = val.integral
        this.ry.gsry.form.remarks = val.txt
        return
      }
      let table = this.ry.gsry.list
      const _this = this
      let params = {}
      if (val == 'all') {
        params.gs_id = this.ry.gsry.gs_id
      } else {
        params.id = val.id
      }
      _this.axios.post(
        '/Index/integral/confirmCompanyIntegral',
        params,
        data => {
          _this.handGsRy(_this.companyDetailsRow)
        }
      )
    },
    addCompanyIntegral() {
      //编辑积分
      let params = {
        integral: this.ry.gsry.form.integral,
        txt: this.ry.gsry.form.remarks,
        id: this.ry.gsry.form.id,
        user_id: this.ry.gsry.form.user_id,
        gs_id: this.ry.gsry.gs_id,
        jbxx_id: this.project.ck.jbxx_id
      }
      this.axios.post('/Index/integral/addCompanyIntegral', params, data => {
        this.ry.gsry.innerVisible = false
        this.handGsRy(this.companyDetailsRow)
      })
    },
    getPeopleData() {
      this.ry.loading = true
      this.axios.post(
        '/Index/integral/peopleLists',
        this.peopleAjaxData,
        data => {
          this.ry.list = data.rows
          this.ry.total = data.total
          this.ry.loading = false
        }
      )
    },
    getProjectData() {
      this.project.loading = true
      this.axios.post(
        '/Index/integral/projectLists',
        this.proAjaxData,
        data => {
          this.project.list = data.rows || []
          this.project.total = data.total || 0
          this.project.loading = false
        }
      )
    },
    // 合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      let prop = column.property
      if (prop) {
        //如果存在prop
        const _row = this.merge_array[rowIndex][prop]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    //项目进度筛选
    xmjd_change() {
      this.project.Apage = 1
      this.proAjaxData.page = 1
      this.getProjectData()
    },
    //项目搜索
    searchXm() {
      this.proAjaxData.xmmc = this.search.xmmc
      this.project.Apage = 1
      this.proAjaxData.page = 1
      this.getProjectData()
    },
    //人员搜索
    searchRy() {
      this.peopleAjaxData.phone = this.ry.phone
      this.peopleAjaxData.username = this.ry.username
      this.peopleAjaxData.nickname = this.ry.nickname
      this.getPeopleData()
    },
    //项目积分管理
    projectTotalRest() {
      this.axios.post('/Index/integral/projectTotalRest', {}, data => {
        this.project.all = data.rows
      })
    },
    //人员积分管理
    ryTotalRest() {
      this.axios.post('/Index/integral/peopleIntegral', {}, data => {
        this.ry.all = data.rows
      })
    },
    //项目搜索重置
    XmsearchReset() {
      this.search.xmmc = ''
      this.project.Apage = 1
      this.proAjaxData.xmmc = ''
      this.proAjaxData.page = 1
      this.proAjaxData.stage = ''
      this.getProjectData()
    },
    //人员搜索重置
    RysearchReset() {
      this.ry.Apage = 1
      this.ry.username = ''
      this.ry.phone = ''
      this.ry.nickname = ''
      this.peopleAjaxData.nickname = ''
      this.peopleAjaxData.phone = ''
      this.peopleAjaxData.username = ''
      this.peopleAjaxData.page = 1
      this.getPeopleData()
    },
    //查看过期项目
    searchQq() {
      if (this.project.stage == 1) {
        this.proAjaxData.type = '过期'
        this.getProjectData()
        this.project.stage = 0
      } else {
        this.proAjaxData.type = '正常'
        this.getProjectData()
        this.project.stage = 1
      }
    },
    changeListType() {
      //人员列表
      if (this.listType == 1) {
        this.listType = 2
      } else {
        //项目列表
        this.listType = 1
      }
    },
    addItem() {},
    handleAddItem() {
      if (this.listType == 2) {
        this.RyListVisible = true
        this.getRyList()
      } else {
        this.GsListVisible = true
        this.getXmList()
      }
    },
    //加载添加人员列表
    getRyList() {
      var data = {
        username: this.add.ryInput,
        cate: 'all',
        rows: 10,
        page: this.add.Rypage,
        order: 'asc'
      }
      this.axios.post('/index/integral/peopleLists', data, data => {
        this.add.RyList = data.rows
        this.add.RyListTotal = data.total
      })
    },
    //查询添加列表
    addSearch(type) {
      if (type == 'xm') {
        this.getXmList()
        this.add.xm.nowPage = 1
      } else if (type == 'ry') {
        this.getRyList()
        this.add.ry.nowPage = 1
      } else {
        this.add.Rypage = 1
        this.add.Xmpage = 1
        this.add.xmInput = ''
        this.add.ryInput = ''
        this.add.xm.nowPage = 1
        this.add.ry.nowPage = 1
        this.getXmList()
        this.getRyList()
      }
    },
    // 加载添加项目列表
    getXmList() {
      var data = {
        xmmc: this.add.xmInput,
        rows: 10,
        page: this.add.Xmpage,
        order: 'asc'
      }
      this.axios.post('/index/integral/addProjectLists', data, data => {
        this.add.XmList = data.rows
        this.add.XmListTotal = data.total
      })
    },
    //添加项目 分页跳转
    addProChangePage(page) {
      this.add.Xmpage = page
      this.getXmList()
    },
    //项目积分 分页跳转
    projectChangePage(page) {
      this.proAjaxData.page = page
      this.getProjectData()
    },
    //人员积分 分页跳转
    ryChangePage(page) {
      this.peopleAjaxData.page = page
      this.getPeopleData()
    },
    //添加人员 分页跳转
    addRyChangePage(page) {
      this.add.Rypage = page
      this.getRyList()
    },
    //添加项目接口请求
    addProject(row) {
      var data = {
        jbxx_id: row.id
      }
      this.axios.post('/index/integral/addProject', data, data => {
        this.GsListVisible = false
        this.getProjectData()
      })
    },
    //添加人员接口请求
    addRy(row) {
      var data = {
        user_id: row.id
      }
      this.axios.post('/index/integral/addPerson', data, data => {
        this.RyListVisible = false
        this.getPeopleData()
      })
    },
    //查看项目详情
    openXmDet(row) {
      this.project.title = '项目花费积分--' + row.xmmc
      this.project.DetVisible = true
      this.project.ck.jbxx_id = row.id
      this.peopleCheckList()
    },
    //查看人员详情
    openRyDet(row) {
      this.ry.DetVisible = true
      this.ry.ck.user_id = row.id
      this.peopleCheckList()
    },
    //请求查看接口
    peopleCheckList() {
      var data = {}
      var url = ''
      if (this.listType == 1) {
        data = {
          jbxx_id: this.project.ck.jbxx_id,
          order: 'asc'
        }
        url = '/Index/integral/projectCheckList'
      } else {
        data = {
          user_id: this.ry.ck.user_id,
          order: 'asc'
        }
        url = '/Index/integral/peopleCheckList'
      }
      this.axios.post(url, data, data => {
        // 合并行
        if (data.status == 'success') {
          this.merge_array = tableMregeFn.tableMrege(data.rows)
        } else {
          this.merge_array = []
        }
        if (this.listType == 1) {
          this.project.ck.list = data.rows
        } else {
          this.ry.ck.list = data.rows
        }
      })
    },
    //项目增加积分
    zjXmIntegral(row) {
      this.project.zj.score = null
      this.project.zj.visible = true
      this.project.zj.xmmc = '增加积分--' + row.xmmc
      this.project.zj.jbxx_id = row.id
      this.liuyan = ''
    },
    //人员增加积分
    zjRyIntegral(row) {
      this.ry.zj.score = null
      this.ry.zj.visible = true
      this.ry.zj.username = row.username
      this.ry.zj.title = '增加积分--' + row.username
      this.ry.zj.user_id = row.id
      this.liuyan2 = ''
    },
    //添加项目积分
    addProjectIntegral() {
      if (this.project.zj.score <= 0) {
        this.$message({
          message: '请输入有效积分',
          type: 'error'
        })
        return
      }
      if (this.liuyan.length > 20) {
        this.$message({
          message: '请输入20个字符以内的备注',
          type: 'error'
        })
        return
      }
      
      var data = {
        integral: this.project.zj.score * 10000,
        jbxx_id: this.project.zj.jbxx_id,
        txt: this.liuyan
      }
      this.axios.post('/index/integral/addProjectIntegral', data, data => {
        this.$message({
          message: '添加积分成功',
          type: 'success'
        })
        this.project.zj.visible = false
        this.projectTotalRest()
        this.getProjectData()
      })
    },
    //添加人员积分
    addPeopleIntegral() {
      if (this.ry.zj.score <= 0) {
        this.$message({
          message: '请输入有效积分',
          type: 'error'
        })
        return
      }
      if (this.liuyan2.length > 20) {
        this.$message({
          message: '请输入20个字符以内的备注',
          type: 'error'
        })
        return
      }
      var data = {
        integral: this.ry.zj.score * 10000,
        user_id: this.ry.zj.user_id,
        remark: this.liuyan2
      }
      this.axios.post('/index/integral/addPeopleIntegral', data, data => {
        this.$message({
          message: '添加积分成功',
          type: 'success'
        })
        this.ry.zj.visible = false
        this.ryTotalRest()
        this.getPeopleData()
      })
    },
    //打开项目积分变动明细窗口
    mxXmIntegral(row) {
      this.project.mx.visible = true
      this.project.mx.xmmc = '积分明细--' + row.xmmc
      this.project.mx.jbxx_id = row.id
      this.project.mx.page = 1
      this.projectDetails()
    },
    //打开人员积分变动明细窗口
    mxRyIntegral(row) {
      this.ry.mx.visible = true
      this.ry.mx.username = row.username
      this.ry.mx.user_id = row.id
      this.ry.mx.page = 1
      this.peopleDetails()
    },
    //项目积分明细 页码改变
    ryMxChangePage(val) {
      this.ry.mx.page = val
      this.peopleDetails()
    },
    //项目积分明细 页码改变
    proMxChangePage(val) {
      this.project.mx.page = val
      this.projectDetails()
    },
    //请求积分变动明细接口
    projectDetails() {
      this.project.mx.loading = true
      var data = {
        jbxx_id: this.project.mx.jbxx_id,
        rows: 10,
        page: this.project.mx.page,
        order: 'asc'
      }
      this.axios.post('/Index/integral/projectDetails', data, data => {
        this.project.mx.list = data.rows || []
        this.project.mx.total = data.total || 0
        this.project.mx.loading = false
      })
    },
    //请求积分变动明细接口
    peopleDetails() {
      this.ry.mx.loading = true
      var data = {
        user_id: this.ry.mx.user_id,
        rows: 10,
        page: this.ry.mx.page,
        order: 'asc'
      }
      this.axios.post('/Index/integral/peopleDetails', data, data => {
        this.ry.mx.list = data.rows || []
        this.ry.mx.total = data.total || 0
        this.ry.mx.loading = false
      })
    },
    //查看操作公司积分的人员
    handGsRy(row) {
      this.ry.gsry.gs_id = row.gs_id
      this.companyDetailsRow = row
      if (!this.ry.gsry.visible) {
        this.ry.gsry.page = 1
      }
      this.ry.gsry.visible = true

      let ajaxdata = {}
      if (this.listType == 2) {
        ajaxdata = {
          jbxx_id: row.jbxx_id,
          gs_id: row.gs_id,
          user_id: this.ry.ck.user_id,
          rows: 10,
          page: this.ry.gsry.page,
          order: 'asc'
        }
      } else {
        ajaxdata = {
          jbxx_id: this.project.ck.jbxx_id,
          gs_id: row.gs_id,
          user_id: row.user_id,
          rows: 10,
          page: this.ry.gsry.page,
          order: 'asc'
        }
      }
      this.axios.post('/Index/integral/companyDetails', ajaxdata, data => {
        this.ry.gsry.list = data.rows || []
        this.ry.gsry.total = data.total || 0
        this.ry.gsry.allSure = data.allSure == 0 ? 0 : 1
        this.peopleCheckList()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  margin: 0 auto;
  .table_main {
    width: 1200px;
    margin: 0 auto;
    .table_title {
      margin-top: 10px;
    }
  }
  .title_bar {
    width: 1200px;
    margin: 0 auto;
    height: 55px;
    padding-top: 30px;
    border-bottom: 1px solid #eee;
    .title_bar_font {
      font-size: 20px;
      font-weight: lighter;
      line-height: 40px;
    }
  }
}
.title_header {
  font-size: 20px;
  margin-top: -20px;
  padding-bottom: 20px;
  border-bottom: 1px #e5e5e5 solid;
}
.title_bottom {
  // border-top: 1px #e5e5e5 solid;
  text-align: center;
  padding-top: 20px;
}
.xmjd {
  background-image: url(../assets/l11u.png);
  width: 160px;
  height: 20px;
  background-repeat: round;
  text-align: center;
  color: #fff;
}
</style>