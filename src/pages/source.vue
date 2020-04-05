<template>
    <div style="height:auto">
        <div>
            <body-top></body-top>
            <!-- 导航栏 -->
            <div>
                <head-menu :index="'/source'"></head-menu>
            </div>
            <div style="width:100%;height: 55px;margin-top: 20px;">
                <div style="width:564px;margin: 0 auto">
                    <div class="title" :class="changePage===1?'title-hover':''" @click="changePage=1">行业通讯录</div>
                    <div class="title" :class="changePage===2?'title-hover':''" @click="changePage=2">企业评价</div>
                </div>
            </div>
        </div>
        <div style="position:relative;width:1200px;margin:0 auto;">
            <!--行业通讯录-->
            <div v-show="changePage===1" class="iknow_div">
                <el-row>
                    <el-row style="line-height:50px;">
                        <div>
                            <span style="font-size: 20px">行业通讯录</span>
                        </div>
                    </el-row>
                    <el-row>
                        <el-col style="text-align: right">
                            <el-form :inline="true" :model="iknow" class="demo-form-inline" @submit.native.prevent>
                                <el-form-item label="企业名称">
                                    <el-input v-model="iknow.search" placeholder="请输入企业名称" @keyup.enter.native="searchIknow"></el-input>
                                </el-form-item>
                                <el-form-item label="属地">
                                    <el-cascader :options="areaTypeList" v-model="areaType" placeholder="请选择属地" @change="areahandleChange"></el-cascader>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="searchIknow">搜索</el-button>
                                    <el-button type @click="onreset(1)">重置</el-button>
                                    <el-button type="success" @click="iknowhandleAdd">添加</el-button>
                                    <el-button type="info" @click="Recovery(1)">回收站</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-row>
                <!--第二排的表格-->
                <div style="overflow: hidden;">
                    <el-table :data="iknow.tableData" v-loading="iknow.isloading" border>
                        <el-table-column label="序号" width="60" align="center">
                            <template slot-scope="scope">{{scope.$index+(iknow.page-1)*10+1}}</template>
                        </el-table-column>
                        <el-table-column prop="qymc" label="企业名称" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="openGs(scope.row)">{{scope.row.qymc}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="duty" label="我认识(公司负责人/业务负责人/业务人员)" width="300" align="center"></el-table-column>
                        <el-table-column prop="area" label="注册属地" width="100" align="center"></el-table-column>
                        <el-table-column prop="remark" label="备注" width="250" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column width="200" label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="primary" @click="iknowHandleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="small" @click="iknowHandleDelete(scope.$index, scope.row,1)" type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-pagination style="margin-top:20px" align="right" @current-change="iknowhandleCurrentChange" :current-page.sync="iknow.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="iknow.total"></el-pagination>
            </div>
            <!--企业评价-->
            <div v-show="changePage===2" class="buliang">
                <!--第一排 搜索框和添加按钮-->
                <el-row>
                    <el-row style="line-height:50px;">
                        <div>
                            <span style="font-size: 20px">企业评价</span>
                        </div>
                    </el-row>
                    <el-row style="text-align: right">
                        <el-form :inline="true" :model="iknow" class="demo-form-inline" @submit.native.prevent>
                            <el-form-item label="评价">
                                <el-select v-model="bl.record" placeholder="请选择好评/差评" @change="searchBl">
                                    <el-option label="全部" value></el-option>
                                    <el-option label="好评" value="good"></el-option>
                                    <el-option label="差评" value="bad"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="企业名称">
                                <el-input v-model="bl.search" placeholder="请输入企业名称" @keyup.enter.native="searchBl"></el-input>
                            </el-form-item>
                            <el-form-item label="属地">
                                <el-cascader :options="areaTypeList" v-model="areaType" placeholder="请选择属地" @change="areahandleChange"></el-cascader>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="searchBl">搜索</el-button>
                                <el-button type @click="onreset(2)">重置</el-button>
                                <el-button type="success" @click="blhandleAdd">添加</el-button>
                                <el-button type="info" @click="Recovery(2)">回收站</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </el-row>
                <!--评论页面 表格-->
                <div style="heigth:1500px;">
                    <el-table :data="bl.tableData" style="width: 100%" v-loading="bl.isloading" border>
                        <el-table-column label="序号" width="60" align="center">
                            <template slot-scope="scope">{{scope.$index+(bl.page-1)*10+1}}</template>
                        </el-table-column>
                        <el-table-column prop="qymc" label="企业名称" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="openGs(scope.row)">{{scope.row.qymc}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="area" label="注册属地" width="100" align="center"></el-table-column>
                        <el-table-column label="好评/差评" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" ref="btn" @click="blhandleEdit(scope.$index, scope.row)">
                                    {{scope.row.goodRecord}}/{{scope.row.badRecord}}
                                    <i class="el-icon-edit"></i>
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column width="200" label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button size="small" @click="iknowHandleDelete(scope.$index, scope.row,2)" type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-pagination style="margin-top:20px" align="right" @current-change="blhandleCurrentChange" :current-page.sync="bl.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="bl.total"></el-pagination>
            </div>
        </div>

        <!--通讯录 添加窗口-->
        <el-dialog title="添加企业" :visible.sync="iknow.addVisible" width="90%" top="2vh">
            <div style="padding:0 20px">
                <!--第一排 搜索框和添加按钮-->
                <div>
                    <el-input v-model="iknow.add.search" placeholder="请输入内容" style="width:400px;" clearable @keyup.enter.native="searchAllComp"></el-input>
                    <el-button type="primary" @click="searchAllComp">搜索</el-button>
                </div>
                <!--第二排的表格-->
                <el-table :data="iknow.add.tableData" v-loading="iknow.add.loading" border style="margin-top:10px;">
                    <el-table-column label="序号" width="60" align="center">
                        <template slot-scope="scope">{{scope.$index+(iknow.add.page-1)*10+1}}</template>
                    </el-table-column>
                    <el-table-column prop="gsmc" label="企业名称" width="500" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="openGs(scope.row,1)">{{scope.row.gsmc}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="legal_person" label="法人" width="200" align="center"></el-table-column>
                    <el-table-column prop="area" label="所属地区" align="center"></el-table-column>
                    <el-table-column width="90" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.know == 2" size="small" type="primary" style="width:67px" @click="selectComp(scope.$index, scope.row)">添加</el-button>
                            <el-button v-if="scope.row.know == 1" disabled size="small" style="width:67px">已添加</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination align="right" style="margin-top:10px" @current-change="iknow_add_handleCurrentChange" :current-page.sync="iknow.add.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="iknow.add.total"></el-pagination>
            </div>
        </el-dialog>
        <!--通讯录 编辑窗口-->
        <el-dialog :title="iknow.editData.qymc" :visible.sync="iknow.editVisible" width="30%">
            <div style="width:75%;margin: 0 auto;">
                <span style="line-height:30px">选择你认识该公司的人员 （备注：可多选）</span>
                <el-select v-model="iknow.ry" multiple placeholder="请选择" style="width:100%;">
                    <el-option v-for="item in iknow.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <div style="margin-top: 20px;">
                    <span style="line-height:30px">备注：</span>
                    <el-input v-model="iknow.remark" placeholder="请输入内容" type="textarea" :autosize="{ minRows: 2, maxRows: 5}"></el-input>
                </div>
            </div>
            <div style="width:100%;text-align: center;margin-top: 40px;">
                <el-button @click="iknow.editVisible = false">取 消</el-button>
                <el-button type="primary" @click="iknowEditOk">确 定</el-button>
            </div>
        </el-dialog>
        <!--通讯录 回收站窗口 -->
        <el-dialog title="回收站" :visible.sync="recoveryKey" width="90%" top="5vh">
            <div style="padding:0 20px">
                <el-table :data="recovery.rows" v-loading="iknow.add.loading" border style="height:635px" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="序号" width="60" align="center">
                        <template slot-scope="scope">{{scope.$index+(iknow.add.page-1)*10+1}}</template>
                    </el-table-column>
                    <el-table-column prop="qymc" label="企业名称" width="500" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="openGs(scope.row)">{{scope.row.qymc}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="legal_person" label="法人" width="200" align="center"></el-table-column>
                    <el-table-column prop="area" label="所属地区" align="center"></el-table-column>
                    <el-table-column width="200" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="success" size="small" @click="Edit('restore',scope)">恢复</el-button>
                            <el-button type="danger" size="small" @click="Edit('delete',scope)">彻底删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row type="flex" justify="end">
                    <el-col :span="4">
                        <transition name="el-zoom-in-top">
                            <div style="margin-top:20px;" v-if="selections.length!==0">
                                <el-button type="success" size="small" @click="Edit('restore')">批量恢复</el-button>
                                <el-button type="danger" size="small" @click="Edit('delete')">批量删除</el-button>
                            </div>
                        </transition>
                    </el-col>
                    <el-col :span="8" :offset="12">
                        <el-pagination background :current-page.sync='inf_recovery.page' @current-change="recoveryCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next" :total="recovery.total"></el-pagination>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
        <!--评论 评论列表窗口-->
        <el-dialog :title="bl.editData.qymc" :visible.sync="bl.editVisible" width="35%" top="5vh">
            <el-row style="padding-bottom:10px;">
                <el-radio-group v-model="ComChangDef" size="mini" class="com-chang">
                    <el-radio-button :label="1">好评({{Good_num}})</el-radio-button>
                    <el-radio-button :label="0">差评({{Bad_num}})</el-radio-button>
                </el-radio-group>
            </el-row>
            <div style="height: 500px; overflow: auto;">
                <el-row>
                    <el-row style="width:100px;margin:20px auto" v-if="Good_num===0 && ComChangDef===1">暂无好评</el-row>
                    <el-row style="width:100px;margin:20px auto" v-if="Bad_num===0 && ComChangDef===0">暂无差评</el-row>
                    <el-row v-for="o in bl.editData.tableData" :key="o.id">
                        <el-row v-if="o.type ===ComChangDef" style="margin-top:20px;">
                            <el-row>
                                <div style="width:40px;text-align: center;float: left">
                                    <div v-if="!o.avatar" style="width:30px;height:30px;">
                                        <i class="el-icon-service" style="font-size: 30px;"></i>
                                    </div>
                                    <div v-if="o.avatar" style="width:30px;height:30px;">
                                        <img :src="o.avatar" alt style="height: 30px;border-radius:50%">
                                    </div>
                                </div>
                                <div style="float: left;line-height:30px">
                                    <span style="color: rgb(63,141,213);">{{ o.nickname }} ({{o.fbsj}})</span>
                                </div>
                                <div style="float:right;margin-left:10px;line-height:30px" v-if="o.user_id == $store.state.userInfo.user_id">
                                    <span @click="comEdit(o)" style="color: #999;cursor: pointer;">
                                        <i class="el-icon-edit-outline"></i>
                                    </span>
                                    <span @click="iknowHandleDelete(o.id,'',0)" style="color: #999;cursor: pointer;">
                                        <i class="el-icon-delete"></i>
                                    </span>
                                    <span>
                                        <el-button type="success" size="mini" class="on-off" @click="changeCheckBtn(o.id,0)" v-if="o.open==1" round>已公开</el-button>
                                        <el-button type="danger" size="mini" class="on-off" @click="changeCheckBtn(o.id,1)" v-if="o.open==0" round>已隐藏</el-button>
                                    </span>
                                </div>
                            </el-row>
                            <el-row>
                                <div style="margin-left: 40px;">{{ o.record }}</div>
                            </el-row>
                        </el-row>
                    </el-row>
                </el-row>
            </div>
            <el-row type="flxe" justify="end" style="padding-top:10px;">
                <el-col :span="8">
                    <el-radio v-model="comState" :label="1">
                        好评
                        <span class="com-state" :class="comState===1?'good_hover':'good_def'"></span>
                    </el-radio>
                    <el-radio v-model="comState" :label="0">
                        <span>差评</span>
                        <span class="com-state" :class="comState===0?'bad_hover':'bad_def'" x></span>
                    </el-radio>
                </el-col>
                <el-col :span="8" :offset="8" style="text-align:right">
                    <el-checkbox v-model="bl.checked">是否公开所有人可见</el-checkbox>
                </el-col>
            </el-row>
            <div style="margin-top: 10px;">
                <el-input ref="record" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="bl.editData.record"></el-input>
            </div>
            <el-row type="flex" justify="end" style="margin-top:20px;">
                <el-col :span="8" style="text-align:right">
                    <el-button size="small" @click="Off">关闭</el-button>
                    <el-button type="primary" size="small" @click="seedMessage">发布</el-button>
                </el-col>
            </el-row>
        </el-dialog>
        <!--查看不良信息 窗口 不知道有没有用-->
        <el-dialog :title="bl.editData.qymc" :visible.sync="bl.kan.Visible" width="35%">
            <div>
                <div v-for="o in bl.kan.tableData" :key="o.id" class="text item" style="margin:0 0 20px 10px;">
                    <div style="overflow:hidden">
                        <div style="width:40px;text-align: center;float: left">
                            <div v-if="!o.avatar" style="width:30px;height:30px;">
                                <i class="el-icon-service" style="font-size: 30px;"></i>
                            </div>
                            <div v-if="o.avatar" style="width:30px;height:30px;">
                                <img :src="o.avatar" alt style="height: 30px;border-radius:50%">
                            </div>
                        </div>
                        <div style="float: left;line-height:30px">
                            <span style="color: rgb(63,141,213);">({{o.type?'好评':'差评'}})&nbsp;&nbsp;{{ o.nickname }} ({{o.fbsj}})</span>
                        </div>
                    </div>
                    <div style="margin-left: 40px;">{{ o.record }}</div>
                </div>
            </div>
        </el-dialog>
        <!--评论 添加窗口-->
        <el-dialog title="添加企业" :visible.sync="bl.add.addVisible" width="90%" top="2vh">
            <div style="padding:0 20px">
                <!--第一排 搜索框和添加按钮-->
                <div style="padding-bottom:10px;">
                    <el-input v-model="bl.add.search" placeholder="请输入内容" style="width:400px;" @keyup.enter.native="searchAllComp"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="searchAllComp">搜索</el-button>
                </div>
                <!--第二排的表格-->
                <div>
                    <el-table :data="bl.add.tableData" v-loading="bl.add.loading" border>
                        <el-table-column label="序号" width="60" align="center">
                            <template slot-scope="scope">{{scope.$index+(bl.add.page-1)*10+1}}</template>
                        </el-table-column>
                        <el-table-column prop="gsmc" label="企业名称" width="500" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" @click="openGs(scope.row,1)">{{scope.row.gsmc}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="legal_person" label="法人" width="200" align="center"></el-table-column>
                        <el-table-column prop="area" label="所属地区" align="center"></el-table-column>
                        <el-table-column width="90" label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.record == 2" size="small" type="primary" style="width:67px" @click="selectComp2(scope.$index, scope.row)">添加</el-button>
                                <el-button v-if="scope.row.record == 1" disabled size="small" style="width:67px">已添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-pagination style="margin-top:10px" align="right" @current-change="bl_add_handleCurrentChange" :current-page.sync="bl.add.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="bl.add.total"></el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
import head_menu from './template/head_menu.vue'
import { fail } from 'assert'
export default {
  data() {
    return {
      role: {},
      test: [{ type: 1 }],
      changePage: 1, // 1为通讯录 2为评论
      model: 1,
      selections: [],
      pageModel: 1,
      btnModel: true,
      //删除接口数据
      inf_del: {
        rep_id: '',
        record_id: '',
        qy_type: '',
        type: 'recover'
      },
      // 回收站接口数据
      inf_recovery: {
        user_id: this.$store.state.userInfo.user_id,
        valid: 2,
        qy_type: 1,
        page: 1,
        rows: 10
      },
      recoveryKey: false,
      recovery: {},
      good_num: 0,
      bad_num: 0,
      ComChangDef: 1, //展示好评列表/差评列表
      comState: 1, //默认好评
      oneShow: true,
      pageChange: 1,
      input: '',
      //上表格参数
      iknow: {
        //搜索关键词
        search: '',
        total: 0,
        currentPage3: 1,
        //是否显示 编辑窗口
        editVisible: false,
        editVisible2: false,
        //是否显示添加窗口
        addVisible: false,
        //上 表格加载中
        isloading: false,
        //编辑窗口数据
        editData: {
          qymc: '',
          textarea: '',
          req_id: '',
          remark: ''
        },
        //编辑选项卡
        options: [
          {
            value: '企业负责人',
            label: '企业负责人'
          },
          {
            value: '招投标负责人',
            label: '招投标负责人'
          },
          {
            value: '资料员',
            label: '资料员'
          },
          {
            value: '其他',
            label: '其他'
          }
        ],
        value5: [],
        ry: '',
        //主表数据
        tableData: [],
        page: 1,
        //添加窗口数据
        add: {
          tableData: [],
          page: 1,
          currentPage3: 1,
          loading: false,
          search: '',
          gs_id: ''
        },
        remark: '',
        area: ''
      },
      bl: {
        //编辑窗口数据
        editData: {
          qymc: '',
          rep_id: '',
          gs_id: '',
          record: '',
          tableData: []
        },
        add: {
          addVisible: false,
          page: 1,
          search: '',
          loading: false,
          tableData: [],
          currentPage3: 1,
          total: 0,
          gs_id: ''
        },
        //是否公开所有人可见
        checked: false,
        //数据
        tableData: [],
        //是否显示编辑窗口
        editVisible: false,
        //分页按钮
        currentPage3: 1,
        //是否显示添加按钮
        addVisible: false,
        //加载中效果
        isloading: false,
        //搜索词
        search: '',
        //页码
        page: 1,
        //总页数
        total: 0,
        kan: {
          Visible: false,
          tableData: []
        }
      },
      delete: {
        rep_id: '',
        bad_id: '',
        qy_type: ''
      },
      deleteType: '',
      areaType: [],
      areaTypeList: [],
      is_rc: '',
      value: 1
    }
  },
  components: {
    headMenu: head_menu
  },
  created() {
    // console.log(this.bl.editData.tableData);

    this.setTitle()
    //加载页面时获取页面数据
    this.getData()
    this.getData2()
    this.getAreaType()
    this.fn_role();
  },
  methods: {
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
        }
      )
    },
    Off() {
      this.getAllcomp2()
      this.bl.editVisible = false
      // this.bl.add.addVisible = false;
    },
    //批量选择
    handleSelectionChange(val) {
      this.selections = val //保存所选内容
    },
    comEdit(item) {
      this.bl.editData.rep_id = item.rep_id
      this.bl.editData.gs_id = item.gs_id
      this.bl.editData.record_id = item.id
      this.bl.editData.record = item.record
      this.bl.checked = item.open == 1 ? true : false
      this.comState = item.type
      this.$refs.record.focus()
      this.btnModel = false //开启修改编辑
    },
    //  恢复 彻底删除
    Edit(model, scope) {
      this.inf_del.type = model
      if (scope) {
        this.inf_del.rep_id = scope.row.id
        this.inf_del.qy_type = scope.row.qy_type
      } else {
        let ids = ''
        this.selections.forEach((item, index) => {
          if (index === 0) {
            ids += item.id
          } else {
            ids += ',' + item.id
          }
        })

        this.inf_del.rep_id = ids
        this.inf_del.qy_type = this.selections[0].qy_type
      }
      this.axios.post('/index/Repository/delRepFirm', this.inf_del, res => {
        this.getList(this.pageModel)
        if (model === 'restore') {
          this.$message({
            message: '已恢复',
            type: 'success'
          })
        } else {
          this.$message({
            message: '已永久删除',
            type: 'info'
          })
        }
        this.searchIknow()
        this.searchBl()
      })
    },
    // 回收站分页按钮
    recoveryCurrentChange(val) {
      this.inf_recovery.page = val
      this.getList(this.model)
    },
    // 获取回收站内容列表
    getList(model) {
      this.model = model
      this.inf_recovery.qy_type = model
      this.axios.post(
        '/index/Repository/searchRepFirm',
        this.inf_recovery,
        res => {
          this.recovery = res
        }
      )
    },
    //回收站按钮
    Recovery(model) {
      this.inf_recovery.page = 1
      this.pageModel = model
      this.getList(model)
      this.recoveryKey = true
    },
    //
    setTitle() {
      document.title = '行业交互'
    },
    //招标回调
    onChild_row() {
      this.dialogDrVisible = false
      this.$emit('onChild_row')
    },
    //匹配
    onMarry(row) {
      this.nowRow = row
      this.dialogDrVisible = true
    },
    onreset(type) {
      this.is_rc = ''
      this.areaType = []
      this.bl.record = ''
      if (type == 1) {
        this.iknow.page = 1
        this.iknow.search = ''
        this.iknow.area = ''
        this.iknow.currentPage3 = 1
        this.getData()
      } else {
        this.bl.page = 1
        this.bl.search = ''
        this.bl.area = ''
        this.bl.currentPage3 = 1
        this.getData2()
      }
    },
    searchIknow() {
      this.iknow.currentPage3 = 1
      this.iknow.page = 1
      this.getData()
    },
    //获取上表格页面数据
    getData() {
      //获取 我信任 表格数据
      this.iknow.isloading = true
      var that = this
      //获取表格数据
      this.axios.post(
        '/index/Repository/searchRepFirm',
        {
          user_id: that.$store.state.userInfo.user_id,
          qymc: that.iknow.search,
          qy_type: 1,
          page: that.iknow.page,
          area: this.iknow.area,
          is_rc: this.is_rc
        },
        data => {
          that.iknow.tableData = data.rows
          if (data.status == 'success') {
            that.iknow.total = data.total
          } else {
            if (that.iknow.page == 1) {
              that.iknow.total = 0
            }
          }
          that.iknow.isloading = false
        }
      )
    },
    //是否公开该评论
    changeCheckBtn(id, open) {
      this.axios.post(
        '/index/Repository/turnRecord',
        {
          id: id,
          open: open
        },
        data => {
          this.getBlMessage()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      )
    },
    searchBl() {
      this.bl.currentPage3 = 1
      this.bl.page = 1
      this.getData2()
    },
    //获取下表格页面数据
    getData2() {
      this.bl.isloading = true
      var that = this
      //获取表格数据
      this.axios.post(
        '/index/Repository/searchRepFirm',
        {
          user_id: that.$store.state.userInfo.user_id,
          qymc: that.bl.search,
          qy_type: 2,
          page: that.bl.page,
          area: this.bl.area,
          is_rc: this.is_rc,
          com_record: this.bl.record
        },
        data => {
          that.bl.tableData = data.rows
          if (data.status == 'success') {
            that.bl.total = data.total
          } else {
            if (that.bl.page == 1) {
              that.bl.total = 0
            }
          }
          this.bl.isloading = false
        }
      )
    },
    //打开编辑窗口 iknow
    iknowHandleEdit(index, row) {
      this.iknow.editVisible = true
      this.iknow.editData.qymc = this.iknow.tableData[index].qymc
      this.iknow.editData.remark = this.iknow.tableData[index].remark
      this.iknow.ry = this.iknow.tableData[index].duty
        ? this.iknow.tableData[index].duty.split(',')
        : []
      this.iknow.editData.req_id = this.iknow.tableData[index].id
      this.iknow.remark = row.remark
    },
    //编辑窗口确认 iknow
    //通讯录编辑窗口
    iknowEditOk() {
      // console.log(this.iknow.remark);
      //判断当前是否是添加公司
      if (this.iknow.addVisible) {
        //添加 公司
        this.axios.post(
          '/index/Repository/saveRepFirm',
          {
            user_id: this.$store.state.userInfo.user_id,
            qy_type: 1,
            valid: 1,
            qymc: this.iknow.editData.qymc,
            duty: this.iknow.ry.join(','),
            remark: this.iknow.remark,
            gs_id: this.iknow.add.gs_id
          },
          data => {
            this.getData()
            this.getAllcomp()
            this.iknow.editVisible = false
            this.iknow.editVisible2 = false
          }
        )
      } else {
        //修改 公司
        var str = this.iknow.ry.join(',')
        this.axios.post(
          '/index/Repository/saveRepFirm',
          {
            rep_id: this.iknow.editData.req_id,
            qy_type: 1,
            duty: str,
            remark: this.iknow.remark,
            gs_id: this.bl.add.gs_id
          },
          data => {
            this.$message({
              message: '已保存',
              type: 'success'
            })
            str = ''
            this.getData()
          }
        )
        this.iknow.editVisible = false
      }
    },
    //打开添加窗口 iknow
    iknowhandleAdd() {
      this.searchBl()
      this.iknow.add.currentPage3 = 1
      this.iknow.add.search = ''
      this.iknow.addVisible = true
      this.iknow.add.page = 1
      this.getAllcomp()
    },
    //选择注册属地
    areahandleChange(val) {
      this.iknow.currentPage3 = 1
      this.bl.currentPage3 = 1
      let y = val[1]
      if (y[0] == '四川省') {
        this.is_rc = '否'
      } else {
        this.is_rc = '是'
      }
      if (y == '不限制') {
        y = ''
      }
      if (this.pageChange) {
        this.iknow.area = y
      } else {
        this.bl.area = y
      }
      if (val[0] == '入川企业') {
        this.is_rc = '是'
      } else if (val[0] == '四川省') {
        this.is_rc = '否'
      }
      if (this.pageChange === 1) {
        this.getData()
      } else {
        this.getData2()
      }
    },
    //请求注册属地接口
    getAreaType() {
      this.axios.post('/firm/firm_search/getAreaType', {}, data => {
        this.areaTypeList = data
      })
    },
    searchAllComp() {
      this.iknow.add.page = 1
      this.bl.add.page = 1
      this.bl.add.currentPage3 = 1
      this.iknow.add.currentPage3 = 1
      this.getAllcomp()
      this.getAllcomp2()
    },
    //获得全部公司列表
    getAllcomp() {
      // this.iknow.add.loading = true;
      var that = this
      this.axios.post(
        '/index/element_set/getAllCompany',
        {
          user_id: this.$store.state.userInfo.user_id,
          page: that.iknow.add.page,
          gsmc: that.iknow.add.search,
          cate: 1
        },
        data => {
          that.iknow.add.tableData = data.rows
          that.iknow.add.total = data.total
          that.iknow.add.loading = false
        }
      )
    },
    //下表获得公司列表
    getAllcomp2() {
      this.bl.add.loading = true
      var that = this
      this.axios.post(
        '/index/element_set/getAllCompany',
        {
          user_id: this.$store.state.userInfo.user_id,
          page: that.bl.add.page,
          gsmc: that.bl.add.search,
          cate: 1
        },
        data => {
          that.bl.add.tableData = data.rows
          that.bl.add.total = data.total
          that.bl.add.loading = false
        }
      )
    },
    //上表格 添加窗口下面的分页按钮
    iknow_add_handleCurrentChange(val) {
      this.bl.add.currentPage3 = 1
      this.iknow.add.page = val
      this.getAllcomp()
    },
    //评论 编辑窗口
    blhandleEdit(index, row) {
      this.bl.editData.record = '' //重置输入框
      this.btnModel = true //默认为发布按钮
      this.ComChangDef = 1 //默认打开好评窗口
      this.good_num = row.goodRecord
      this.bad_num = row.badRecord
      this.bl.editData.qymc = this.bl.tableData[index].qymc
      this.bl.editData.gs_id = this.bl.tableData[index].gs_id
      this.bl.editVisible = true
      this.bl.editData.rep_id = this.bl.tableData[index].id
      this.bl.checked = false
      this.getBlMessage()
    },
    //获得评论列表
    getBlMessage() {
      this.axios.post(
        '/index/Repository/searchRepFirm',
        {
          rep_id: this.bl.editData.rep_id,
          qy_type: 3,
          gs_id: this.bl.editData.gs_id,
          user_id: this.$store.state.userInfo.user_id
        },
        data => {
          if (data.status == 'success') {
            this.bl.editData.tableData = JSON.parse(JSON.stringify(data.rows))
            this.bl.kan.tableData = JSON.parse(JSON.stringify(data.rows))
            this.bl.editData.tableData.forEach(e => {
              e.open = e.open.toString()
            })
          } else {
            this.bl.editData.tableData = []
            this.bl.kan.tableData = []
          }
        }
      )
    },
    //通讯录 翻页
    iknowhandleCurrentChange(val) {
      this.iknow.page = val
      this.getData()
    },
    //通讯录 选择公司
    selectComp(index, row) {
      this.iknow.remark = '' //清除输入框
      this.iknow.editVisible = true
      this.iknow.ry = []
      this.iknow.editData.qymc = ''
      this.iknow.editData.qymc = this.iknow.add.tableData[index].gsmc
      this.iknow.add.gs_id = row.gs_id
      this.bl.add.gs_id = row.gs_id
    },
    //通讯录 选择公司 确定
    iknowEditOk2() {
      this.axios.post(
        '/index/Repository/saveRepFirm',
        {
          user_id: this.$store.state.userInfo.user_id,
          qy_type: 1,
          valid: 1,
          qymc: this.iknow.editData.qymc,
          duty: this.iknow.ry.join(','),
          gs_id: this.iknow.add.gs_id
        },
        data => {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.getAllcomp()
          this.iknow.editVisible = false
          this.iknow.editVisible2 = false
          this.getData()
        }
      )
    },
    //输入框失去焦点时触发 编辑事件
    editText(index, row) {
      this.axios.post(
        '/index/Repository/saveRepFirm',
        {
          rep_id: this.iknow.tableData[index].id,
          qy_type: 1,
          duty: this.iknow.tableData[index].duty,
          remark: this.iknow.tableData[index].remark
        },
        data => {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        }
      )
    },
    //下表格 打开添加窗口
    blhandleAdd() {
      this.bl.add.currentPage3 = 1
      this.bl.add.page = 1
      this.bl.add.search = ''
      this.bl.add.addVisible = true
      this.getAllcomp2()
    },
    //下表格分页
    bl_add_handleCurrentChange(val) {
      this.bl.add.page = val
      this.getAllcomp2()
    },
    // 评论 选择一个公司
    selectComp2(index, row) {
      this.axios.post(
        '/index/Repository/saveRepFirm',
        {
          user_id: this.$store.state.userInfo.user_id,
          gs_id: this.bl.add.tableData[index].gs_id,
          qymc: this.bl.add.tableData[index].gsmc,
          qy_type: 2
        },
        res => {
          this.$message.success('已添加')
          // this.bl.add.addVisible = false;
          this.getData2()
          this.getAllcomp2()
        }
      )
      let self = this
      let a = setTimeout(() => {
        this.blhandleEdit(0, this.bl.tableData[0])
      }, 500)
    },
    //评论 主表分页
    blhandleCurrentChange(val) {
      this.bl.page = val
      this.getData2()
    },
    //发布
    seedMessage() {
      if (!this.btnModel) {
        this.iknowHandleDelete(this.bl.editData.record_id, '', 0)
      }
      if (this.bl.editData.record == '') {
        this.$message.error('请输入发送的内容')
        return
      } else if (this.comState !== 1 && this.comState !== 0) {
        this.$message.info('请做出评价')
      } else {
        this.axios.post(
          '/index/Repository/saveRepFirm',
          {
            rep_id: this.bl.editData.rep_id,
            user_id: this.$store.state.userInfo.user_id,
            gs_id: this.bl.editData.gs_id,
            qy_type: 3,
            record: this.bl.editData.record,
            open: this.bl.checked ? 1 : 0,
            type: this.comState
          },
          data => {
            this.bl.editData.record = ''
            this.getBlMessage()
            this.getData2()
            this.$message.success('发布成功')
            // this.bl.add.addVisible = false;
          }
        )
      }
    },
    //查看不良信息
    kan(index, row) {
      this.bl.editData.qymc = this.bl.tableData[index].qymc
      this.bl.editData.gs_id = this.bl.tableData[index].gs_id
      this.bl.editData.rep_id = this.bl.tableData[index].id
      this.bl.kan.Visible = true
      this.getBlMessage()
    },
    //删除
    iknowHandleDelete(index, row, type) {
      // console.log(index);
      //直接删除
      if (type === 0) {
        this.deleteType = 3
        this.delete.bad_id = index
      } else {
        //回收站
        this.deleteType = type
        this.delete.rep_id = row.id
      }
      this.deleteOk(type)
    },
    //确认删除
    deleteOk(type) {
      this.axios.post(
        '/index/Repository/delRepFirm',
        {
          rep_id: this.delete.rep_id,
          record_id: this.delete.bad_id,
          qy_type: this.deleteType,
          type: type === 0 ? 'delete' : 'recover'
        },
        data => {
          //修改的时候不提示用户删除 自己悄悄删
          if (this.btnModel) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
          this.getData2()
          this.iknow.page = 1
          this.bl.page = 1
          if (this.deleteType == 1) {
            this.getData()
          } else if (this.deleteType == 2) {
            this.getData2()
          } else if (this.deleteType == 3) {
            this.getBlMessage()
            this.getData2()
          }
        }
      )
    },
    // 跳转
    openGs(row, model) {
      let gsmc = ''
      if (model) {
        gsmc = row.gsmc
      } else {
        gsmc = row.qymc
      }
      if (this.role.company_role !== 'C') {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${gsmc}`
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
    }
  },
  computed: {
    Good_num() {
      let num = 0
      let obj = this.bl.editData.tableData
      Object.keys(obj).forEach(function(key) {
        // console.log(obj[key]);
        if (obj[key].type === 1) {
          num++
        }
      })
      return num
    },
    Bad_num() {
      let num = 0
      let obj = this.bl.editData.tableData
      Object.keys(obj).forEach(function(key) {
        // console.log(obj[key]);
        if (obj[key].type === 0) {
          num++
        }
      })
      return num
    }
  },
  watch: {
    'bl.editData.record': {
      deep: true,
      handler: function(newV, oldV) {
        if (!newV) {
          this.btnModel = true
        }
      }
    }
  }
}
</script>
<style scoped>
.on-off {
  padding-left: 10px;
  padding-right: 10px;
  height: 18px;
  line-height: 4px;
}
.el-row {
  overflow: hidden;
}
.el-col {
  overflow: hidden;
}
.com-state-chang {
  display: inline-block;
  height: 12px;
  width: 12px;
  background-size: 12px;
}
.com-state {
  display: inline-block;
  height: 14px;
  width: 14px;
  background-size: 14px;
}
.good_def {
  background-image: url(../assets/good_def.png);
}
.good_hover {
  background-image: url(../assets/good_hover.png);
}
.good_hover2 {
  background-image: url(../assets/good_hover2.png);
}
.bad_def {
  background-image: url(../assets/bad_def.png);
}
.bad_hover {
  background-image: url(../assets/bad_hover.png);
}
.bad_hover2 {
  background-image: url(../assets/bad_hover2.png);
}
.iknow_div {
  padding: 20px 0;
}
.buliang {
  padding: 20px 0;
}
.el-header {
  padding: 0;
}
.title_div {
  padding: 0 50px;
  display: flex;
  color: #ffffff;
  background-color: #324157;
}
.title_text {
  flex: 1;
  font-size: 32px;
  padding: 14px 0;
  text-align: center;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
.title {
  cursor: pointer;
  width: 280px;
  height: 55px;
  float: left;
  background-color: #f2f2f2;
  text-align: center;
  line-height: 55px;
  color: #000;
}
.title-hover {
  color: white;
  background-color: #66b1ff;
}
.el-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
