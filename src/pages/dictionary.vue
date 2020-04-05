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
      <head-menu :index="index"></head-menu>
      <!-- 标题栏 -->
      <div class="title_bar" v-loading="data.loading">
        <el-row>
          <el-col :span="19" class="title_bar_font">
            <span v-if="listType == 1">职称证字典管理</span>
            <span v-if="listType == 2">工程用途字典管理</span>
          </el-col>
          <el-col :span="2" class="title_bar_font">
            <el-button type="success" @click="handleAdd" size="medium">添加</el-button>
          </el-col>
          <el-col :span="2" class="title_bar_font">
            <el-button type="primary" @click="handCk" size="medium">查看全部专业</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 主内容 -->
      <div class="table_main" v-loading="data.loading">
        <div>
          <el-table :data="data.list" border style="width: 100%;margin-top:10px;" key='projectList'>
            <el-table-column prop="id" label="序号" width="60" align="center">
              <template slot-scope="scope">{{scope.$index+(data.page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="name" :label="data.tableHead.cul1" align="center">
            </el-table-column>
            <el-table-column label="操作" width="350" align="center">
              <template slot-scope="scope">
                <el-button type="success" @click="handleAddCl(scope.row)" size="mini">添加子集</el-button>
                <el-button type="primary" @click="handleCkChild(scope.row)" size="mini">查看</el-button>
                <el-button type="primary" @click="handEdit(scope.row)" size="mini">编辑</el-button>
                <el-button type="danger" @click="del_data1(scope.row)" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination align="right" @current-change="changePageAll" :current-page.sync="data.page" background layout="total,prev, pager, next" :total="data.total" class="pagination"></el-pagination>
        </div>
      </div>
    </div>
    <!-- 添加窗口 -->
    <el-dialog :visible.sync="add.visible">
      <div class="title_header">输入父级名称</div>
      <div style="text-align:center;border-bottom: 1px #e5e5e5 solid;">
        <el-input placeholder="请输入内容" v-model="add.input" style="width:500px;margin-top:20px;margin-bottom:20px;">
        </el-input>
      </div>
      <div class="title_bottom">
        <div class="title_bottom">
          <el-button type="primary" @click="save_dict('save')">&nbsp;确定&nbsp;</el-button>
          <el-button @click="add.visible = false">&nbsp;取消&nbsp;</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 查看全部专业 -->
    <el-dialog :visible.sync="all.visible" top="1px">
      <div class="title_header">全部专业----{{listType==1?'职称字典':'工程用途字典'}}</div>
      <div style="margin-top:10px;">
        <el-row>
          <el-col :span='17' :offset="7">
            <el-form :inline="true" :model="all" class="demo-form-inline" @submit.native.prevent>
              <el-form-item>
                <el-input v-model="all.input" placeholder="请输入内容" @keydown.enter.native="ckSearch"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="all.select" placeholder="请选择" @change="getCkData">
                  <el-option v-for="item in all.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ckSearch" size="medium">查询</el-button>
                <el-button type="" @click="ckSearch('reset')" size="medium">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div style="text-align:center;border-bottom: 1px #e5e5e5 solid;">
        <el-table :data="all.list" border style="width: 100%;margin-top:10px;" key='projectList' v-loading="all.loading">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(all.ajaxData.page-1)*10+1}}</template>
          </el-table-column>
          <el-table-column v-if="listType == 1" prop="zczy" label="注册专业" align="center">
          </el-table-column>
          <el-table-column v-if="listType == 2" prop="gcyt" label="工程用途" align="center">
          </el-table-column>
          <el-table-column v-if="listType == 1" prop="count" label="总数" align="center">
          </el-table-column>
          <el-table-column prop="dictionary" label="字典值" align="center">
          </el-table-column>
        </el-table>
        <el-pagination background layout="total,prev, pager, next" :total="all.total" @current-change="allChangePage" :current-page.sync="all.nowPage">
        </el-pagination>
      </div>
      <div class="title_bottom">
        <div class="title_bottom">
          <el-button type="" @click="all.visible = false">&nbsp;关闭&nbsp;</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 添加子集 -->
    <el-dialog :visible.sync="addChild.visible">
      <div class="title_header">全部专业</div>
      <div style="margin-top:10px;">
        <el-row>
          <el-col :span='17' :offset="7">
            <el-form :inline="true" :model="all" class="demo-form-inline" @submit.native.prevent>
              <el-form-item>
                <el-input v-model="all.input" placeholder="请输入内容" style="width:250px" @keydown.enter.native="ckSearch"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="all.select" placeholder="请选择" style="width:150px" @change="getCkData">
                  <el-option v-for="item in all.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ckSearch" size="medium">查询</el-button>
                <el-button type="" @click="ckSearch('reset')" size="medium">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div style="text-align:center;border-bottom: 1px #e5e5e5 solid;">
        <el-table :data="all.list" border style="width: 100%;margin-top:10px;" key='projectList' v-loading="all.loading">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(all.ajaxData.page-1)*10+1}}</template>
          </el-table-column>
          <el-table-column v-if="listType == 1" prop="zczy" label="注册专业" align="center">
          </el-table-column>
          <el-table-column v-if="listType == 2" prop="gcyt" label="注册专业" align="center">
          </el-table-column>
          <el-table-column v-if="listType == 1" prop="count" label="总数" align="center">
          </el-table-column>
          <el-table-column prop="dictionary" label="字典值" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button :type="scope.row.valid==2 ? 'primary' : ''" :disabled="scope.row.valid==2 ? false : true" size="mini" @click="save_title(scope.row)">{{scope.row.valid==2 ? '选择' : '已选择'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="total,prev, pager, next" :total="all.total" @current-change="allChangePage">
        </el-pagination>
      </div>
      <div class="title_bottom">
        <!-- <el-button type="primary" @click="save_title(scope.row)">&nbsp;添加&nbsp;</el-button> -->
        <el-button type="" @click="addChild.visible = false">&nbsp;关闭&nbsp;</el-button>
      </div>
    </el-dialog>
    <!-- 查看子集 -->
    <el-dialog :visible.sync="ckChild.visible" top="1px">
      <div class="title_header">查看</div>
      <div style="margin-top:10px;">
        <el-row>
          <el-col :span="7" class="title_bar_font">
            <el-input v-model="ckChild.input" placeholder="请输入内容" style="width:250px" @keydown.enter.native="ckChildSearch "></el-input>
          </el-col>
          <el-col :span="2" class="title_bar_font">
            <el-button type="primary" @click="ckChildSearch" size="medium">查询</el-button>
          </el-col>
          <el-col :span="3" class="title_bar_font">
            <el-button type="" @click="ckChildSearch('reset')" size="medium">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div style="text-align:center;border-bottom: 1px #e5e5e5 solid;">
        <el-table :data="ckChild.list" border style="width: 100%;margin-top:10px;" key='projectList' v-loading="ckChild.loading">
          <el-table-column type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              {{scope.$index+(ckChild.ajaxData.page-1)*10+1}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="注册专业" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="del_data(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="total,prev, pager, next" :total="ckChild.total" @current-change="ckChildChangePage" :current-page.sync="ckChild.now_page">
        </el-pagination>
      </div>
      <div class="title_bottom">
        <el-button type="" @click="ckChild.visible = false">&nbsp;关闭&nbsp;</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import head_menu from './template/head_menu.vue'
import tableMregeFn from './../tableMrege'

export default {
  components: {
    headMenu: head_menu
  },
  data() {
    return {
      index: '/dictionary',
      listType: 1,
      data: {
        list: [],
        ajaxData: {},
        tableHead: {
          cul1: ''
        },
        loading: false,
        page: 1,
        total: 0
      },
      add: {
        visible: false,
        input: '',
        ajaxData: {},
        id: ''
      },
      all: {
        visible: false,
        list: [],
        ajaxData: {
          zczy: '',
          rows: 10,
          page: 1,
          order: 'asc'
        },
        input: '',
        total: 10,
        page: 1,
        nowPage: 1,
        loading: false,
        options: [
          {
            value: '1',
            label: '已使用'
          },
          {
            value: '2',
            label: '未使用'
          }
        ],
        select: ''
      },
      addChild: {
        visible: false,
        ajaxData: {
          zczy: '公路工程',
          parent_id: '',
          parent_name: '道路与桥梁',
          id: '',
          dict_id: ''
        }
      },
      ckChild: {
        visible: false,
        input: '',
        list: [],
        total: 0,
        now_page: 1,
        ajaxData: {
          zczy: '',
          parent_id: 62,
          rows: 10,
          page: 1,
          order: 'desc'
        }
      }
    }
  },
  created() {
    this.getUrlType()
    document.title = '字典管理'
  },
  watch: {
    $route(to, from) {
      this.data.page = 1
      this.getUrlType()
    }
  },
  methods: {
    changePageAll(val) {
      this.data.page = val
      this.getUrlType()
    },
    //判断进入哪一个表
    getUrlType() {
      var type = ''
      var type = this.$route.query.type
      if (type == 'gc') {
        this.listType = 2
        ;(this.data.tableHead.cul1 = '工程用途字典'),
          (this.index = '/dictionary?type=gc')
      } else {
        this.listType = 1
        this.data.tableHead.cul1 = '职称字典'
        this.index = '/dictionary'
      }
      console.log(this.index)
      this.getTableData()
    },
    //获取表格数据
    getTableData() {
      this.data.loading = true
      var url = '/Index/Dictionaries/get_dict'
      this.data.ajaxData = {}
      if (this.listType == 1) {
        this.data.ajaxData = {
          dict_id: 8,
          rows: 10,
          page: this.data.page,
          order: 'desc'
        }
      } else {
        this.data.ajaxData = {
          dict_id: 9,
          rows: 10,
          page: this.data.page,
          order: 'desc'
        }
      }
      this.axios.post(url, this.data.ajaxData, data => {
        this.data.list = data.rows
        this.data.total = data.total
        this.data.loading = false
      })
    },
    //查看专业 翻页
    allChangePage(page) {
      this.all.ajaxData.page = page
      this.getCkData()
    },
    //点击打开添加窗口
    handleAdd() {
      this.add.visible = true
      this.add.input = ''
      this.add.ajaxData.id = ''
    },
    //打开编辑的窗口
    handEdit(row) {
      this.add.visible = true
      this.add.ajaxData.id = row.id
      this.add.input = row.name
    },
    //请求添加/编辑的窗口
    save_dict(type) {
      var url = '/index/Dictionaries/save_dict'
      if(this.add.input == ''){
        this.$message({
          message: '请输入内容后再提交',
          type: 'error'
        })
        return
      }
      if (this.listType == 1) {
        this.add.ajaxData.name = this.add.input
        this.add.ajaxData.dict_id = 8
      } else {
        this.add.ajaxData.name = this.add.input
        this.add.ajaxData.dict_id = 9
      }
      this.axios.post(url, this.add.ajaxData, data => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.getTableData()
        this.add.visible = false
      })
    },
    //查看全部专业
    handCk() {
      this.all = {
        visible: true,
        list: [],
        ajaxData: {
          zczy: '',
          rows: 10,
          page: 1,
          order: 'asc'
        },
        input: '',
        total: 10,
        page: 1,
        loading: false,
        options: [
          {
            value: '1',
            label: '已使用'
          },
          {
            value: '2',
            label: '未使用'
          }
        ],
        select: ''
      }
      this.getCkData()
    },
    //请求全部专业接口
    getCkData() {
      // alert(this.all.select)
      this.all.ajaxData.valid=this.all.select
      this.all.loading = true
      var url = ''
      if (this.listType == 1) {
        url = '/index/Dictionaries/getTitle'
      } else {
        url = '/index/Dictionaries/getAllDict'
      }
      this.axios.post(url, this.all.ajaxData, data => {
        this.all.list = data.rows
        this.all.total = data.total
        this.all.loading = false
      })
    },
    //查询
    ckSearch(type) {
      this.all.nowPage = 1
      if (type == 'reset') {
        this.all = {
          visible: true,
          list: [],
          ajaxData: {
            zczy: '',
            rows: 10,
            page: 1,
            order: 'asc'
          },
          nowPage: 1,
          input: '',
          total: 10,
          page: 1,
          loading: false,
          options: [
            {
              value: '1',
              label: '已使用'
            },
            {
              value: '2',
              label: '未使用'
            }
          ],
          select: ''
        }
        this.all.ajaxData.valid = ''
      } else {
        this.all.ajaxData.page = 1
        this.all.nowPage = 1
        if (this.listType == 1) {
          this.all.ajaxData.zczy = this.all.input
          this.all.ajaxData.valid = this.all.select
        } else {
          this.all.ajaxData.gcyt = this.all.input
        }
      }
      this.getCkData()
    },
    //全部专业 重置
    ckReset() {},
    //添加专业
    addCl() {},
    //打卡添加子集窗口
    handleAddCl(row) {
      this.all.input = ''
      this.all.ajaxData.zczy = ''
      this.all.ajaxData.page = 1
      this.addChild.visible = true
      this.addChild.ajaxData.parent_name = row.name
      this.addChild.ajaxData.parent_id = row.id
      this.all.ajaxData.parent_id=row.id;
      this.getCkData()
      
    },
    //请求选择子集接口
    save_title(row) {
      if (this.listType == 1) {
        this.addChild.ajaxData.dict_id = 8
        this.addChild.ajaxData.zczy = row.zczy
      } else {
        this.addChild.ajaxData.dict_id = 9
        this.addChild.ajaxData.zczy = row.gcyt
      }
      var url = '/index/Dictionaries/save_title'
      this.axios.post(url, this.addChild.ajaxData, data => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.addChild.visible = false
        this.getTableData()
      })
    },
    //打开查看子集
    handleCkChild(row) {
      //窗口数据初始化
      this.ckChild = {
        visible: true,
        input: '',
        list: [],
        total: 0,
        now_page: 1,
        ajaxData: {
          zczy: '',
          parent_id: '',
          rows: 10,
          page: 1,
          order: 'desc'
        }
      }
      this.ckChild.ajaxData.parent_id = row.id
      this.get_cfg()
    },
    //查看子集 列表接口请求
    get_cfg() {
      var url = ''
      this.ckChild.loading = true
      url = '/index/Dictionaries/get_cfg'
      this.ckChild.loading = true
      this.axios.post(url, this.ckChild.ajaxData, data => {
        this.ckChild.list = data.rows
        this.ckChild.total = data.total
        this.ckChild.loading = false
        this.ckChild.loading = false
      })
    },
    del_data1(row) {
      this.$confirm('确认删除？')
        .then(_ => {
          let url = ''
          url = '/index/Dictionaries/del_data'
          this.ckChild.loading = true
          let ajaxData = {
            id: row.id,
            zczy: row.name,
            type: 'dict'
          }
          this.axios.post(url, ajaxData, data => {
            this.ckChild.now_page = 1
            this.data.page = 1
            this.getTableData()
            this.$error({
              message: '删除成功'
            })
          })
        })
        .catch(_ => {})
    },
    //查看子集 翻页
    ckChildChangePage(val) {
      this.ckChild.ajaxData.page = val
      this.get_cfg()
    },
    //查看子集查询
    ckChildSearch(type) {
      this.ckChild.now_page = 1
      this.ckChild.ajaxData.page = 1
      if (type == 'reset') {
        this.ckChild.input = ''
        this.ckChild.ajaxData.zczy = ''
      } else {
        this.ckChild.ajaxData.zczy = this.ckChild.input
      }
      this.get_cfg()
    },
    //删除子集
    del_data(row) {
      this.$confirm('确认删除？')
        .then(_ => {
          var url = '/index/Dictionaries/del_data'
          this.axios.post(url, { id: row.id, zczy: row.name }, data => {
            this.ckChild.ajaxData.page = 1
            this.ckChild.now_page = 1
            this.get_cfg()
            this.$error({
              message: '删除'
            })
          })
          
        })
        .catch(_ => {})
    }
  }
}
</script>
<style>
.pagination {
  /* text-align: right;
  margin: 20px 0; */
}
</style>

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
    height: 38px;
    padding-top: 30px;
    .title_bar_font {
      font-size: 28px;
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
  text-align: center;
  padding-top: 10px;
}
</style>