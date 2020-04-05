<!--项目列表-->
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
<template>
  <el-container>
    <el-header height="auto">
      <body-top></body-top>
      <div>
        <!-- 导航栏 -->
        <head-menu :index="'/performance'"></head-menu>
      </div>
      <div>
        <div style="width:1200px;height:60px;margin:0 auto;margin-top:20px;">
          <div style="padding-bottom:22px;">
            <el-col :xs="0" :span="22" class="bt2">
              <span style="font-size:20px;">企业业绩</span>
            </el-col>
            <el-col :xs="0" :span="2" align="left">
              <el-button type="primary" @click="handleAddYj">添加业绩</el-button>
            </el-col>
          </div>
        </div>
        <div class="table_footer">
          <el-row>
            <div style="position:absolute;left:0%;">
              <el-button type="primary" icon="el-icon-d-arrow-left" @click="checkTableButton()"></el-button>
            </div>
            <div style="position:absolute;right:0%;">
              <el-button type="primary" icon="el-icon-d-arrow-right" @click="checkTableButton()"></el-button>
            </div>
            <div :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'300px',zIndex:'9',display:tableIndex==1?'block':'none'}" @click="checkTable(2)"></div>
            <div :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'0',zIndex:'9',display:tableIndex!=1?'block':'none'}" @click="checkTable(1)"></div>
            <div :style="tableStyleR" @click="checkTable(2)">
              <p :style="{margin:'10px 0',width:'100%',textAlign:tableIndex==2?'center':'right',fontSize:'20px',color:'#67C23a'}">
                企业外部数据
                <!-- <i class="el-icon-error"></i> -->
              </p>
              <div style="margin-top:20px;">
                <el-form :inline="true" @submit.native.prevent>
                  <el-form-item label="项目名称">
                    <el-input style="width:412px" v-model="leftAjaxData.xmmc" placeholder="请输入项目名称" @keydown.enter.native="searchYj('left')"></el-input>
                  </el-form-item>
                  <el-form-item label="资金范围">
                    <el-input style="width:210px" v-model="leftAjaxData.minMoney" placeholder="金额" @keydown.enter.native="searchYj('left')">
                      <template slot="append">万元</template>
                    </el-input>
                    <span>-</span>
                    <el-input style="width:210px" v-model="leftAjaxData.maxMoney" placeholder="金额" @keydown.enter.native="searchYj('left')">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="开工日期">
                    <el-date-picker style="width:200px" v-model="leftAjaxData.minKgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                    <span>-</span>
                    <el-date-picker style="width:200px" v-model="leftAjaxData.maxKgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="竣工日期">
                    <el-date-picker style="width:210px" v-model="leftAjaxData.minJgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                    <span>-</span>
                    <el-date-picker style="width:210px" v-model="leftAjaxData.maxJgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" @submit.native.prevent>
                  <el-form-item label="从业人员">
                    <el-input style="width:110px" v-model="leftAjaxData.name" placeholder="人员名称" @keydown.enter.native="searchYj('left')"></el-input>
                  </el-form-item>
                  <el-form-item label="项目类型">
                    <el-select style="width:130px" v-model="leftAjaxData.projectType" placeholder="选择数据来源" @change="searchYj('left')">
                      <el-option v-for="item in gsyjXmlx" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="中标日期">
                    <el-date-picker style="width:136px" v-model="leftAjaxData.minZbgsTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                    <span>-</span>
                    <el-date-picker style="width:136px" v-model="leftAjaxData.maxZbgsTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="数据来源">
                    <el-select style="width:154px" v-model="leftAjaxData.source" placeholder="选择项目类型" @change="searchYj('left')">
                      <el-option v-for="item in sourceList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div style="text-align:center;padding:0 20px 10px 0">
                  <el-button type="primary" @click="searchYj('left')">搜索</el-button>
                  <el-button @click="resetYj('left')">重置</el-button>
                </div>
              </div>
              <el-table :data="leftTable" style="width: 100%" v-loading="left.visible" border>
                <el-table-column label="序号" width="60" align="center">
                  <template slot-scope="scope">
                    {{(leftAjaxData.page-1)*10+scope.$index+1}}
                  </template>
                </el-table-column>
                <el-table-column label="项目名称" width="500" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" class="primary_btn" @click="openYjDet(scope.row,2)">{{scope.row.proj_name}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="proj_type" label="项目类型" width="120" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="数据来源" align="center" width="120">
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" class="primary_btn" v-if="scope.row.import !=1" @click="comeInYj(scope.row)">导入内部</el-button>
                    <el-button type="text" class="primary_btn" v-if="scope.row.import ==1" disabled>已导入</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination style="margin-top:10px" align="right" @current-change="leftTableChangePage" :current-page.sync="left.fPage" :page-size="10" background layout="total,prev, pager, next" :total="left.total"></el-pagination>
            </div>
            <div :style="tableStyleL" @click="checkTable(1)">
              <p :style="{margin:'10px 0',width:'100%',textAlign:tableIndex==1?'center':'left',fontSize:'20px',color:'#f56c6c'}">
                企业内部数据&nbsp;
                <!-- <i class="el-icon-success"></i> -->
              </p>
              <div style="margin-top:20px;">
                <el-form :inline="true" @submit.native.prevent>
                  <el-form-item label="项目名称">
                    <el-input style="width:412px" v-model="rightAjaxData.xmmc" placeholder="请输入项目名称" @keydown.enter.native="searchYj('right')"></el-input>
                  </el-form-item>
                  <el-form-item label="资金范围">
                    <el-input style="width:210px" v-model="rightAjaxData.minMoney" placeholder="金额" @keydown.enter.native="searchYj('right')">
                      <template slot="append">万元</template>
                    </el-input>
                    <span>-</span>
                    <el-input style="width:210px" v-model="rightAjaxData.maxMoney" placeholder="金额" @keydown.enter.native="searchYj('right')">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="开工日期">
                    <el-date-picker style="width:200px" v-model="rightAjaxData.minKgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                    <span>-</span>
                    <el-date-picker style="width:200px" v-model="rightAjaxData.maxKgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="竣工日期">
                    <el-date-picker style="width:210px" v-model="rightAjaxData.minJgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                    <span>-</span>
                    <el-date-picker style="width:210px" v-model="rightAjaxData.maxJgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" @submit.native.prevent>
                  <el-form-item label="从业人员">
                    <el-input style="width:110px" v-model="rightAjaxData.name" placeholder="人员名称" @keydown.enter.native="searchYj('right')"></el-input>
                  </el-form-item>
                  <el-form-item label="项目类型">
                    <el-select style="width:130px" v-model="rightAjaxData.projectType" placeholder="选择项目类型" @change="searchYj('right')">
                      <el-option v-for="item in gsyjXmlx" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="中标日期">
                    <el-date-picker style="width:136px" v-model="rightAjaxData.minZbgsTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                    <span>-</span>
                    <el-date-picker style="width:136px" v-model="rightAjaxData.maxZbgsTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="数据来源">
                    <el-select style="width:154px" v-model="rightAjaxData.source" placeholder="选择数据来源" @change="searchYj('right')">
                      <el-option v-for="item in sourceList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div style="text-align:center;padding:0 20px 10px 0">
                  <el-button type="primary" @click="searchYj('right')">搜索</el-button>
                  <el-button @click="resetYj('right')">重置</el-button>
                </div>
              </div>
              <el-table :data="rightTable" style="width: 100%" v-loading="right.visible" border>
                <el-table-column label="序号" width="60" align="center">
                  <template slot-scope="scope">
                    {{(rightAjaxData.page-1)*10+scope.$index+1}}
                  </template>
                </el-table-column>
                <el-table-column prop="proj_name" label="项目名称" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" class="primary_btn" @click="openYjDet(scope.row,1)">{{scope.row.proj_name}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="proj_type" label="项目类型" width="120" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="数据来源" align="center" width="120">
                </el-table-column>
                <el-table-column label="操作" align="center" width="180">
                  <template slot-scope="scope">
                    <el-button type="text" class="primary_btn" @click="openYjDet(scope.row,1)">查看编辑</el-button>
                    <!-- <el-button type="text" class="primary_btn" size="small" @click="checkBm(scope.row)">添加附件</el-button> -->
                    <el-button type="text" style="color:rgb(245, 108, 108)" class="primary_btn" @click="deleteYj(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination style="margin-top:10px" align="right" @current-change="rightTableChangePage" :current-page.sync="right.fPage" :page-size="10" background layout="total,prev, pager, next" :total="right.total"></el-pagination>
            </div>
          </el-row>
        </div>
      </div>
      </div>
    </el-header>
    <!-- 业绩添加窗口 -->
    <el-dialog width="60%" title="添加业绩" :visible.sync="addYj.visible">
      <div style="text-align:center">
        <el-radio-group v-model="addYj.type" size="small" @change="selectAddType">
          <el-radio-button label="全国建筑市场">全国建筑市场</el-radio-button>
          <el-radio-button label="四川省建设厅">四川省建设厅</el-radio-button>
          <el-radio-button label="全国公路市场">全国公路市场</el-radio-button>
          <el-radio-button label="全国水利市场">全国水利市场</el-radio-button>
        </el-radio-group>
      </div>
      <div class="add-ban" style="margin-top:20px;">
        <p class="add-text">基本信息</p>
        <div>
          <div class="add-form">
            <el-form :inline="true" class="demo-form-inline" label-width="135px" @submit.native.prevent>
              <el-form-item :label="item.name" v-for="(item, key) in addYj.page.jbxx" :key="key" class="add-form-item1">
                <el-input v-model="item['value']" placeholder="请输入内容" class="add-input" v-if="item.type == 'input'"></el-input>
                <el-input type="number" v-model="item['value']" placeholder="请输入内容" class="add-input" v-if="item.type == 'number'"></el-input>
                <el-date-picker type="date" placeholder="选择日期" v-model="item['value']" v-if="item.type == 'time'" class="add-input"></el-date-picker>
                <el-select v-model="item['value']" placeholder="请选择" v-if="item.type == 'select'" class="add-input">
                  <el-option v-for="item1 in item.list" :key="item1.value" :label="item1.label" :value="item1.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="add-ban" style="margin-top:20px;">
        <p class="add-text">金额/日期</p>
        <div>
          <div class="add-form">
            <el-form :inline="true" class="demo-form-inline" label-width="135px" @submit.native.prevent>
              <el-form-item :label="item.name" v-for="(item, key) in addYj.page.md" :key="key" class="add-form-item2">
                <el-input v-model="item['value']" placeholder="请输入内容" style="width:400px;" v-if="item.type == 'input'"></el-input>
                <el-input type="number" v-model="item['value']" placeholder="请输入内容" style="width:400px;" v-if="item.type == 'number'"></el-input>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="item['value']" v-if="item.type == 'time'" style="width:400px;" @change="checkHt(item.key)"></el-date-picker>
                <el-input v-model="item['value']" placeholder="根据开始和结束日期自动生成" style="width:400px;" v-if="item.type == 'none'" disabled></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div>
        <el-form :inline="true" class="demo-form-inline" style="text-align:center;margin-top:20px;" @submit.native.prevent>
          <el-form-item>
            <el-button type="primary" @click="toAddYj">添加</el-button>
            <el-button @click="addYj.visible = false">取消</el-button>
          </el-form-item>
        </el-form>
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
import uploadFile from './template/uploadbm'
import head_menu from './template/head_menu.vue'
import carouselCard from './sonPage/carouselCard.vue'
import carouselItem from './sonPage/carouselItem.vue'

export default {
  name: 'ItemList',
  components: {
    ItemImport,
    nweItem,
    myReserve,
    uploadFile,
    headMenu: head_menu,
    carouselCard,
    carouselItem
  },
  data() {
    return {
      //添加窗口验证器
      rules: {
        xmmc: [{ required: true, message: '请输入项目名称', trigger: 'blur' }]
      },
      leftTable: [],
      left: {
        visible: false,
        page: 1,
        row: 10,
        total: 0,
        fPage: 1
      },
      right: {
        visible: false,
        page: 1,
        row: 10,
        total: 0,
        fPage: 1
      },
      rightTable: [],
      leftAjaxData: {
        gs_id: localStorage.getItem('gs_id'),
        xmmc: '',
        name: '',
        minMoney: '',
        maxMoney: '',
        minZbgsTime: '',
        maxZbgsTime: '',
        minKgsjTime: '',
        maxKgsjTime: '',
        minJgsjTime: '',
        maxJgsjTime: '',
        projectType: '',
        source: '',
        page: 1,
        cate: 1,
        rows: 10
      },
      rightAjaxData: {
        gs_id: localStorage.getItem('gs_id'),
        xmmc: '',
        name: '',
        minMoney: '',
        maxMoney: '',
        minZbgsTime: '',
        maxZbgsTime: '',
        minKgsjTime: '',
        maxKgsjTime: '',
        minJgsjTime: '',
        maxJgsjTime: '',
        projectType: '',
        source: '',
        page: 1,
        rows: 10
      },
      gsyjXmlx: [
        '全部',
        '建筑工程',
        '市政工程',
        '水利工程',
        '公路工程',
        '其他工程'
      ],
      sourceList: [
        '全部',
        '全国建筑市场',
        '四川省建设厅',
        '全国公路市场',
        '全国水利市场'
      ],
      tableData: '',
      remark: '全国建筑市场',
      input: '',
      yj: {},
      addYj: {
        page: {
          jbxx: [],
          md: []
        },
        visible: false,
        type: '全国建筑市场',
        jzsc: {
          jbxx: [
            {
              key: 'xmmc',
              name: '项目名称',
              value: '',
              type: 'input'
            },
            {
              key: 'sjxmbh',
              name: '省级项目编号',
              value: '',
              type: 'input'
            },
            {
              key: 'szqh',
              name: '所在区划',
              value: '',
              type: 'input'
            },
            {
              key: 'jsdw',
              name: '建设单位',
              value: '',
              type: 'input'
            },
            {
              key: 'jsdwzzjgdm',
              name: '统一社会信用代码',
              value: '',
              type: 'input'
            },
            {
              key: 'xmfl',
              name: '项目分类',
              value: '',
              type: 'select',
              list: [
                { value: '建筑工程', label: '建筑工程' },
                { value: '市政工程', label: '市政工程' },
                { value: '水利工程', label: '水利工程' },
                { value: '公路工程', label: '公路工程' },
                { value: '其他工程', label: '其他工程' }
              ]
            },
            {
              key: 'jsxz',
              name: '建设性质',
              value: '',
              type: 'input'
            },
            {
              key: 'gcyt',
              name: '工程用途',
              value: '',
              type: 'input'
            },
            {
              key: 'zmj',
              name: '总面积(平方米)',
              value: '',
              type: 'number'
            },
            {
              key: 'lxjb',
              name: '立项级别',
              value: '',
              type: 'input'
            },
            {
              key: 'lxwh',
              name: '立项文号',
              value: '',
              type: 'input'
            }
          ],
          md: [
            {
              key: 'ztz',
              name: '总投资(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'zbje',
              name: '中标金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'htje',
              name: '合同金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'sjzj',
              name: '实际造价',
              value: '',
              type: 'number'
            },
            {
              key: 'zbrq',
              name: '中标日期',
              value: '',
              type: 'time'
            },
            {
              key: 'scwcrq',
              name: '审查完成日期',
              value: '',
              type: 'time'
            },
            {
              key: 'htqdrq',
              name: '合同签订日期',
              value: '',
              type: 'time'
            },
            {
              key: 'fzrq',
              name: '发证日期',
              value: '',
              type: 'time'
            },
            {
              key: 'kgrq',
              name: '实际开工日期',
              value: '',
              type: 'time'
            },
            {
              key: 'jun_rq',
              name: '实际竣工验收日期',
              value: '',
              type: 'time'
            }
          ]
        },
        scjst: {
          jbxx: [
            {
              key: 'xmmc',
              name: '项目名称',
              value: '',
              type: 'input'
            },
            {
              key: 'lxwh',
              name: '立项文号',
              value: '',
              type: 'input'
            },
            {
              key: 'jsdw',
              name: '建设单位',
              value: '',
              type: 'input'
            },
            {
              key: 'jsdz',
              name: '建设地址',
              value: '',
              type: 'input'
            },
            {
              key: 'ssdq',
              name: '所属地区',
              value: '',
              type: 'input'
            },
            {
              key: 'xmfl',
              name: '项目分类',
              value: '',
              type: 'select',
              list: [
                { value: '建筑工程', label: '建筑工程' },
                { value: '市政工程', label: '市政工程' },
                { value: '水利工程', label: '水利工程' },
                { value: '公路工程', label: '公路工程' },
                { value: '其他工程', label: '其他工程' }
              ]
            },
            {
              key: 'jsxz',
              name: '建设性质',
              value: '',
              type: 'input'
            },
            {
              key: 'gcyt',
              name: '工程用途',
              value: '',
              type: 'input'
            },
            {
              key: 'jsgm',
              name: '建设规模',
              value: '',
              type: 'input'
            }
          ],
          md: [
            {
              key: 'ztz',
              name: '总投资(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'zbje',
              name: '中标金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'htje',
              name: '合同金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'sjzj',
              name: '实际造价(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'zbrq',
              name: '中标日期',
              value: '',
              type: 'time'
            },
            {
              key: 'scwcrq',
              name: '审查完成日期',
              value: '',
              type: 'time'
            },
            {
              key: 'htqdrq',
              name: '合同签订日期',
              value: '',
              type: 'time'
            },
            {
              key: 'fzrq',
              name: '发证日期',
              value: '',
              type: 'time'
            },
            {
              key: 'kgrq',
              name: '实际开工日期',
              value: '',
              type: 'time'
            },
            {
              key: 'jun_rq',
              name: '实际竣工验收日期',
              value: '',
              type: 'time'
            }
            // zyz: '',
            // zbje: '',
            // hthe: '',
            // sjzj: '',
            // brq: '',
            // scwcrq: '',
            // htqdrq: '',
            // fzrq: '',
            // kgrq: '',
            // jun_rq: ''
          ]
        },
        gl: {
          jbxx: [
            {
              key: 'xmmc',
              name: '项目名称',
              value: '',
              type: 'input'
            },
            {
              key: 'qymc',
              name: '企业名称',
              value: '',
              type: 'input'
            },

            {
              key: 'xmlx',
              name: '项目类型',
              value: '',
              type: 'input'
            },
            {
              key: 'jsdj',
              name: '技术等级',
              value: '',
              type: 'input'
            },
            {
              key: 'htdmc',
              name: '合同段名称',
              value: '',
              type: 'input'
            },
            {
              key: 'kszh',
              name: '合同段开始桩号',
              value: '',
              type: 'input'
            },
            {
              key: 'jszh',
              name: '合同段结束桩号',
              value: '',
              type: 'input'
            },
            {
              key: 'zlpdqk',
              name: '质量评定情况',
              value: '',
              type: 'input'
            },
            {
              key: 'szsf',
              name: '所在省份',
              value: '',
              type: 'input'
            },
            {
              key: 'xmdm',
              name: '项目代码',
              value: '',
              type: 'input'
            },
            {
              key: 'zygcl',
              name: '主要工程量',
              value: '',
              type: 'input'
            },
            {
              key: 'yj_type',
              name: '信息来源',
              value: '',
              type: 'select',
              list: [
                { value: 1, label: '省厅录入' },
                { value: 2, label: '省厅审核' }
              ]
            },
            {
              key: 'yz',
              name: '建设状态',
              value: '',
              type: 'select',
              list: [
                { value: '主包,已建', label: '主包,已建' },
                { value: '分包,已建', label: '分包,已建' },
                { value: '主包,在建', label: '主包,在建' },
                { value: '分包,在建', label: '分包,在建' }
              ]
            },
            {
              key: 'bdlx',
              name: '标段类型',
              value: '',
              type: 'input'
            },
            {
              key: 'bdmc',
              name: '标段名称',
              value: '',
              type: 'input'
            },
            {
              key: 'zbqy',
              name: '中标企业',
              value: '',
              type: 'input'
            },
            {
              key: 'sfwg',
              name: '是否完工',
              value: '',
              type: 'input'
            },
            {
              key: 'jgysdf',
              name: '交工验收得分',
              value: '',
              type: 'input'
            },
            {
              key: 'jsgm',
              name: '合同段建设规模',
              value: '',
              type: 'input'
            },
            {
              key: 'other',
              name: '其他',
              value: '',
              type: 'input'
            }
          ],
          md: [
            {
              key: 'htje',
              name: '合同价(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'jsje',
              name: '结算价(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'kgrq',
              name: '开工日期',
              value: '',
              type: 'time'
            },
            {
              key: 'jiao_rq',
              name: '交工日期',
              value: '',
              type: 'time'
            },
            {
              key: 'jun_rq',
              name: '竣工日期',
              value: '',
              type: 'time'
            }
          ]
        },
        sl: {
          jbxx: [
            {
              key: 'xmmc',
              name: '项目名称',
              value: '',
              type: 'input'
            },
            {
              key: 'htmc',
              name: '合同名称',
              value: '',
              type: 'input'
            },
            {
              key: 'xmlx',
              name: '项目类型',
              value: '',
              type: 'input'
            },
            {
              key: 'gczt',
              name: '工程状态',
              value: '',
              type: 'input'
            },
            {
              key: 'xmgs',
              name: '项目归属',
              value: '',
              type: 'input'
            },
            {
              key: 'gclx',
              name: '工程类型',
              value: '',
              type: 'input'
            },
            {
              key: 'gcjsms',
              name: '工程建设模式',
              value: '',
              type: 'input'
            },
            {
              key: 'gcbh',
              name: '工程编号',
              value: '',
              type: 'input'
            },
            {
              key: 'gcdb',
              name: '工程等别',
              value: '',
              type: 'input'
            },
            {
              key: 'gcjb',
              name: '工程级别',
              value: '',
              type: 'input'
            },
            {
              key: 'gcgm',
              name: '工程规模',
              value: '',
              type: 'input'
            },
            {
              key: 'gcgjzb',
              name: '工程关键指标',
              value: '',
              type: 'input'
            },
            {
              key: 'htzynr',
              name: '合同主要内容',
              value: '',
              type: 'input'
            }
          ],
          md: [
            {
              key: 'htje',
              name: '合同金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'jsje',
              name: '结算金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'htqdrq',
              name: '合同签订日期',
              value: '',
              type: 'time'
            },
            {
              key: 'htqx_min',
              name: '合同期限(开始日期)',
              value: '',
              type: 'time'
            },
            {
              key: 'htqx_max',
              name: '合同期限(结束日期)',
              value: '',
              type: 'time'
            },
            {
              key: 'htqx_total',
              name: '合同期限(总天数)',
              value: '',
              type: 'none'
            },
            {
              key: 'kgrq',
              name: '开工日期',
              value: '',
              type: 'time'
            },
            {
              key: 'sjgq_min',
              name: '实际工期(开始日期)',
              value: '',
              type: 'time'
            },
            {
              key: 'sjgq_max',
              name: '实际工期(结束日期)',
              value: '',
              type: 'time'
            },
            {
              key: 'sjgq_total',
              name: '实际工期(总天数)',
              value: '',
              type: 'none'
            }
          ]
        }
      },
      comeIn: {
        id: '',
        gs_id: localStorage.getItem('gs_id')
      },
      jbxx_ajaxData: '',
      md_ajaxData: '',
      // 公司切换
      tableIndex: 1,
      tableStyleL:
        'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);min-height:810px;position:absolute;width:85%;left:-33px;z-index:10;',
      tableStyleR:
        'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(36%) scale(0.8);min-height:810px;position:absolute;width:85%;left:-112px;z-index:8;'
      //------------------------------------------------------
    }
  },
  created() {
    document.title = '业绩管理'
    this.selectAddType('全国建筑市场')
    this.getLeftProjectList()
    this.getRightProjectList()
  },
  watch: {},
  methods: {
    //按钮无限切换
    checkTableButton() {
      if (this.tableIndex == 2) {
        this.checkTable(1)
      } else {
        this.checkTable(2)
      }
    },
    //切换表格
    checkTable(type) {
      if (type == 2) {
        this.tableIndex = 2
        this.tableStyleL =
          'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(-7%) scale(0.8);position:absolute;width:85%;left:-33px;z-index:8;min-height:810px;transition: .3s;'
        this.tableStyleR =
          'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:85%;left:-33px;z-index:10;min-height:810px;transition: .3s;'
      } else {
        this.tableIndex = 1
        this.tableStyleL =
          'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:85%;left:-33px;z-index:10;min-height:810px;transition: .3s;'
        this.tableStyleR =
          'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(36%) scale(0.8);position:absolute;width:85%;left:-112px;z-index:8;min-height:810px;transition: .3s;'
      }
    },
    //------------------------------------------------------------------------------
    // 打开业绩添加页面
    handleAddYj() {
      this.selectAddType(this.remark)
      this.addYj.visible = true
    },
    //添加页面选择不同的数据来源
    selectAddType(val) {
      this.remark = val
      if (val == '全国建筑市场') {
        this.addYj.page.jbxx = JSON.parse(JSON.stringify(this.addYj.jzsc.jbxx))
        this.addYj.page.md = JSON.parse(JSON.stringify(this.addYj.jzsc.md))
      } else if (val == '四川省建设厅') {
        this.addYj.page.jbxx = JSON.parse(JSON.stringify(this.addYj.scjst.jbxx))
        this.addYj.page.md = JSON.parse(JSON.stringify(this.addYj.scjst.md))
      } else if (val == '全国公路市场') {
        this.addYj.page.jbxx = JSON.parse(JSON.stringify(this.addYj.gl.jbxx))
        this.addYj.page.md = JSON.parse(JSON.stringify(this.addYj.gl.md))
      } else if (val == '全国水利市场') {
        this.addYj.page.jbxx = JSON.parse(JSON.stringify(this.addYj.sl.jbxx))
        this.addYj.page.md = JSON.parse(JSON.stringify(this.addYj.sl.md))
      }
    },
    //判断合同总天数
    checkHt(type) {
      this.checkGq(type)
      if (this.remark == '全国水利市场') {
        if (type == 'htqx_min' || type == 'htqx_max') {
          if (
            this.addYj.page.md[3].value != '' &&
            this.addYj.page.md[4].value != ''
          ) {
            if (this.addYj.page.md[3].value > this.addYj.page.md[4].value) {
              this.addYj.page.md[3].value = ''
              this.addYj.page.md[4].value = ''
              alert('结束日期不能大于开始日期')
            } else {
              this.addYj.page.md[5].value =
                Date.parse(this.addYj.page.md[4].value) -
                Date.parse(this.addYj.page.md[3].value)
              this.addYj.page.md[5].value =
                this.addYj.page.md[5].value / 3600 / 24 / 1000
            }
          }
        }
      }
    },
    //判断实际工期
    checkGq(type) {
      if (this.remark == '全国水利市场') {
        if (type == 'sjgq_min' || type == 'sjgq_max') {
          if (
            this.addYj.page.md[7].value != '' &&
            this.addYj.page.md[8].value != ''
          ) {
            if (this.addYj.page.md[7].value > this.addYj.page.md[8].value) {
              this.addYj.page.md[7].value = ''
              this.addYj.page.md[8].value = ''
              alert('结束日期不能大于开始日期')
            } else {
              this.addYj.page.md[9].value =
                Date.parse(this.addYj.page.md[8].value) -
                Date.parse(this.addYj.page.md[7].value)
              this.addYj.page.md[9].value =
                this.addYj.page.md[9].value / 3600 / 24 / 1000
            }
          }
        }
      }
    },
    getValue() {},
    //添加业绩
    toAddYj() {
      this.toData()
    },
    //打开业绩详情窗口
    openYjDet(row, type) {
      var source = ''
      if (row.remark == '全国建筑市场') {
        source = 'jzsc'
      } else if (row.remark == '四川省建设厅') {
        source = 'jst'
      } else if (row.remark == '全国公路市场') {
        source = 'gl'
      } else {
        source = 'sl'
      }
      if (type == 1) {
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=${source}&cate=${
            row.cate ? row.cate : 'import'
          }`
        })
        window.open(href, '业绩详情' + row.proj_name + row.id + source)
      } else {
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
        })
        window.open(href, '业绩详情' + row.proj_name + row.id + source)
      }
    },
    //导入按钮
    comeInYj(row) {
      this.axios.post(
        '/firm/Company_performance/importPro',
        {
          id: row.id,
          gs_id: localStorage.getItem('gs_id')
        },
        data => {
          this.$message({
            message: '导入成功',
            type: 'success'
          })
          this.getLeftProjectList()
          this.getRightProjectList()
        }
      )
    },
    //左表翻页
    leftTableChangePage(val) {
      this.leftAjaxData.page = val
      this.getLeftProjectList()
    },
    //右表翻页
    rightTableChangePage(val) {
      this.rightAjaxData.page = val
      this.getRightProjectList()
    },
    //删除业绩 按钮
    deleteYj(row) {
      this.axios.post(
        '/firm/Company_performance/delPro',
        {
          id: row.id
        },
        data => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getRightProjectList()
        }
      )
    },
    //处理 添加数据
    toData() {
      var gs_id = localStorage.getItem('gs_id')
      var Yjarr = new Array()
      var mdArr = new Array()
      for (var i = 0; i < this.addYj.page.jbxx.length; i++) {
        Yjarr[this.addYj.page.jbxx[i].key] = this.addYj.page.jbxx[i].value
      }
      for (var j = 0; j < this.addYj.page.md.length; j++) {
        mdArr[this.addYj.page.md[j].key] = this.addYj.page.md[j].value
      }
      var jbxx_obj = {
        gs_id: gs_id,
        jbxx: Yjarr,
        remark: this.remark
      }
      var md_obj = {
        md: mdArr,
        remark: this.remark,
        type: 1
      }
      this.md_ajaxData = md_obj
      this.jbxx_ajaxData = jbxx_obj
      this.jbxx_ajaxData.type = '1'
      this.addProBase()
    },
    //请求添加 基本信息 接口
    addProBase() {
      this.jbxx_ajaxData.jbxx.ztz = this.md_ajaxData.md.ztz
      this.axios.post(
        '/firm/Company_performance/saveProBase',
        this.jbxx_ajaxData,
        data => {
          if (data.status == 'success') {
            this.md_ajaxData.proj_id = data.proj_id
            this.saveProMd()
          } else {
            this.$message({
              message: '基本信息添加失败',
              type: 'warning'
            })
          }
        }
      )
    },
    searchYj(type) {
      this.right.fPage = 1
      this.left.fPage = 1
      this.leftAjaxData.page = 1
      this.rightAjaxData.page = 1
      if (type == 'left') {
        this.getLeftProjectList()
      } else if ('right') {
        this.getRightProjectList()
      }
    },
    resetYj(type) {
      this.left.fPage = 1
      this.right.fPage = 1
      if (type == 'left') {
        this.leftAjaxData = {
          gs_id: localStorage.getItem('gs_id'),
          xmmc: '',
          name: '',
          minMoney: '',
          maxMoney: '',
          minZbgsTime: '',
          maxZbgsTime: '',
          minKgsjTime: '',
          maxKgsjTime: '',
          minJgsjTime: '',
          maxJgsjTime: '',
          projectType: '',
          cate: 1,
          page: 1,
          rows: 10
        }
        this.getLeftProjectList()
      } else if ('right') {
        this.rightAjaxData = {
          gs_id: localStorage.getItem('gs_id'),
          xmmc: '',
          name: '',
          minMoney: '',
          maxMoney: '',
          minZbgsTime: '',
          maxZbgsTime: '',
          minKgsjTime: '',
          maxKgsjTime: '',
          minJgsjTime: '',
          maxJgsjTime: '',
          projectType: '',
          page: this.right.page,
          rows: 10
        }
        this.getRightProjectList()
      }
    },
    //请求左边列表接口
    getLeftProjectList() {
      this.left.visible = true
      this.axios.post(
        '/firm/performance/projectLists',
        this.leftAjaxData,
        data => {
          if (data.status == 'success') {
            this.leftTable = data.rows || []
          } else {
            this.leftTable = []
          }
          this.left.total = data.total || 0
          this.left.visible = false
        }
      )
    },
    //请求右边列表接口
    getRightProjectList() {
      this.axios.post(
        '/firm/Company_performance/projectLists',
        this.rightAjaxData,
        data => {
          if (data.status == 'success') {
            this.rightTable = data.rows || ''
          } else {
            this.rightTable = []
          }
          this.right.total = data.total || 0
          this.right.visible = false
        }
      )
    },
    //请求添加 金额时间 接口
    saveProMd() {
      this.axios.post(
        '/firm/Company_performance/saveProMd',
        this.md_ajaxData,
        data => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getLeftProjectList()
          this.getRightProjectList()
          this.addYj.visible = false
        }
      )
    }
    // ----------------------------------------------------------------------------
  }
}
</script>
<style>
.el-dialog__body {
  padding: 0 20px 20px 20px;
}
</style>

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
  line-height: 40px;
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
.add-text {
  font-size: 26px;
  text-align: center;
  margin: 10px 0;
}
.add-ban {
  border-top: 1px solid #cccccc;
}
.add-input {
  width: 400px;
}
.add-form {
  margin: 10px 0;
  overflow: hidden;
}
.add-form .add-form-item1:nth-child(even) {
  float: right;
}
.add-form .add-form-item2:nth-child(even) {
  float: right;
}
.table_footer {
  width: 1200px;
  height: 1000px;
  margin-left: 25px;
  display: block;
  margin-right: 25px;
  margin: 0 auto;
}
</style>
