<template>
  <div id="certificateManager">
    <body-top></body-top>
    <headMenu :index="'/certificateManager'"></headMenu>
    <div class="certificateManagerHead">
      <el-row style="margin:20px 0;">
        <el-col :span='22' class="certificate">企业人员</el-col>
        <el-col :span='2'>
          <el-button type="primary" @click="addRy">添加人员</el-button>
        </el-col>
      </el-row>

      <el-row class="table">
        <el-col :span='24'>
          <div class="table_footer">
            <el-row>
              <div style="position:absolute;left:-2%;">
                <el-button type="primary" icon="el-icon-d-arrow-left" @click="checkTableButton()"></el-button>
              </div>
              <div style="position:absolute;right:-2%;">
                <el-button type="primary" icon="el-icon-d-arrow-right" @click="checkTableButton()"></el-button>
              </div>
              <div :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'300px',zIndex:'9',display:tableIndex==1?'block':'none'}" @click="checkTable(2)"></div>
              <div :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'0',zIndex:'9',display:tableIndex!=1?'block':'none'}" @click="checkTable(1)"></div>
              <div :style="tableStyleL" @click="checkTable(1)">
                <p :style="{margin:'10px 0',width:'100%',textAlign:tableIndex==1?'center':'left',fontSize:'20px',color:'#f56c6c'}">
                  企业内部数据
                  <!-- <i class="el-icon-error"></i> -->
                </p>
                <el-row>
                  <el-col :span='24'>
                    <div class="fl_div">
                      <div class="row" v-for="one in zsxx1.nav" :key="one.remark">
                        <div class="title">
                          <div @click="onSelectedNav(one.remark,'',1)" :class="[one.remark == zsxx1.source && zsxx1.zjlx == ''?'selected':'']">
                            {{one.remark}}
                            <span class="color_blue">({{one.count}})</span>
                            :
                          </div>
                        </div>
                        <div class="value">
                          <div @click="onSelectedNav(one.remark,child.certificate_type,1)" class="hover_div" v-for="child in one.children" :key="child.certificate_type" :class="[one.remark == zsxx1.source && child.certificate_type==zsxx1.zjlx?'selectedText':'']">
                            {{child.certificate_type}}
                            <span class="color_blue">({{child.count}})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='24'>
                    <el-form align="right" :inline="true" style="margin-top:20px;" @submit.native.prevent>
                      <el-form-item label="人员名称">
                        <el-input v-model="zsxx1.rymc" @keyup.enter.native="onSearch(1)" clearable placeholder="人员名称"></el-input>
                      </el-form-item>
                      <el-form-item label="证书编号">
                        <el-input v-model="zsxx1.zsbh" @keyup.enter.native="onSearch(1)" clearable placeholder="证书编号"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSearch(1)">搜索</el-button>
                        <el-button @click="onReset(1)">重置</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
                <el-table :data="table1.tableData" v-loading="table1.loading" border>
                  <el-table-column label="序号" header-align="center" align="center" width="60">
                    <template slot-scope="scope">{{scope.$index+(table1.page-1)*10+1}}</template>
                  </el-table-column>
                  <el-table-column align="center" prop="name" label="姓名">
                   <template slot-scope="scope">
                      <el-button  @click="onSubmit('ck',scope.row)" type="text">{{scope.row.name + scope.row.total}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="certificate_type" label="证件类型" width="110"></el-table-column>
                  <el-table-column align="center" prop="certificate_number" label="证件号"></el-table-column>
                  <el-table-column align="center" prop="major" label="注册专业/专业/职称" width="150"></el-table-column>
                  <el-table-column align="center" prop="certificate_level" label="证书级别/等级/岗位" width="150"></el-table-column>
                  <el-table-column align="center" prop="valid_date" label="有效期">
                    <template slot-scope="scope">
                      <div :style="{color:scope.row.expire?'':'red'}">{{scope.row.valid_date}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="操作" align="center" width="125">
                    <template slot-scope="scope">
                      <el-button type="text" class="primary_btn" @click="onSubmit('ck',scope.row)">查看编辑</el-button>
                      <!-- <el-button type="text" class="primary_btn" @click="onSubmit('addFile',scope.row)">添加附件</el-button> -->
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination align="right" style="margin-top:10px" @current-change="changePage" background layout="total,prev, pager, next" :total="table1.total"></el-pagination>
              </div>
              <div :style="tableStyleR" @click="checkTable(2)">
                <p :style="{margin:'10px 0',width:'100%',textAlign:tableIndex==2?'center':'right',fontSize:'20px',color:'#67C23a'}">
                  企业外部数据&nbsp;
                  <!-- <i class="el-icon-success"></i> -->
                </p>
                <el-row>
                  <el-col :span='24'>
                    <div class="fl_div">
                      <div class="row" v-for="one in zsxx.nav" :key="one.remark">
                        <div class="title">
                          <div @click="onSelectedNav(one.remark,'',2)" :class="[one.remark == zsxx.source && zsxx.zjlx == ''?'selected':'']">
                            {{one.remark}}
                            <span class="color_blue">({{one.count}})</span>
                            :
                          </div>
                        </div>
                        <div class="value">
                          <div @click="onSelectedNav(one.remark,child.certificate_type,2)" class="hover_div" v-for="child in one.children" :key="child.certificate_type" :class="[one.remark == zsxx.source && child.certificate_type==zsxx.zjlx?'selectedText':'']">
                            {{child.certificate_type}}
                            <span class="color_blue">({{child.count}})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='24'>
                    <el-form align="right" :inline="true" style="margin-top:20px;" @submit.native.prevent>
                      <el-form-item label="人员名称">
                        <el-input v-model="zsxx.rymc" @keyup.enter.native="onSearch(2)" clearable placeholder="人员名称"></el-input>
                      </el-form-item>
                      <el-form-item label="证书编号">
                        <el-input v-model="zsxx.zsbh" @keyup.enter.native="onSearch(2)" clearable placeholder="证书编号"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSearch(2)">搜索</el-button>
                        <el-button @click="onReset(2)">重置</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>

                <el-table :data="table2.tableData" v-loading="table2.loading" border>
                  <el-table-column label="序号" header-align="center" align="center" width="60">
                    <template slot-scope="scope">{{scope.$index+(table2.page-1)*10+1}}</template>
                  </el-table-column>
                  <el-table-column align="center" prop="name" label="姓名">
                    <template slot-scope="scope">
                      <el-button  @click="onSubmit('ck2',scope.row)" type="text">{{scope.row.name + scope.row.total}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="certificate_type" label="证件类型"></el-table-column>
                  <el-table-column align="center" prop="certificate_number" label="证件号"></el-table-column>
                  <el-table-column align="center" prop="major" label="注册专业/专业/职称" width="150"></el-table-column>
                  <el-table-column align="center" prop="certificate_level" label="证书级别/等级/岗位" width="150"></el-table-column>
                  <el-table-column align="center" prop="valid_date" label="有效期">
                    <template slot-scope="scope">
                      <div :style="{color:scope.row.expire?'':'red'}">{{scope.row.valid_date}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="操作" align="center" width="125">
                    <template slot-scope="scope">
                      <!-- <el-button type="text" class="primary_btn" @click="onSubmit('ck2',scope.row)">查看</el-button> -->
                      <el-button :disabled="scope.row.is_import ==1"  type="text" class="primary_btn" @click="onSubmit('import',scope.row)">{{scope.row.is_import ==1 ? '已导入' : '导入内部'}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination align="right" style="margin-top:10px" @current-change="changePage" background layout="total,prev, pager, next" :total="table2.total"></el-pagination>
              </div>

            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="添加人员" :visible.sync="add.dialogVisible" width="30%">
      <certificate-add @fnAdd="fnAdd" :data="{type:'add',name:''}"></certificate-add>
    </el-dialog>
  </div>
</template>
<script>
import headMenu from './template/head_menu.vue'
import certificateAdd from './template/certificateAdd.vue'
import axios from 'axios'

export default {
  data() {
    return {
      loading: false,
      gs_id: localStorage.getItem('gs_id'),
      // 人员信息
      add: {
        dialogVisible: false,
        form: {
          name: '',
          xb: '',
          zjlx: '',
          zjhm: ''
        }
      },
      zsxx: {
        source: '',
        loading: false,
        nav: [],
        rymc: '',
        zsbh: '',
        zjlx: ''
      },
      zsxx1: {
        //企业
        source: '',
        loading: false,
        nav: [],
        rymc: '',
        zsbh: '',
        zjlx: ''
      },
      table2: {
        loading: false,
        total: 0,
        page: 1,
        tableData: []
      },
      table1: {
        loading: false,
        total: 0,
        page: 1,
        tableData: [{}]
      },
      // 公司切换
      tableIndex: 1,
      tableStyleL:
        'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);min-height:810px;position:absolute;width:89%;left:-60px;z-index:10;',
      tableStyleR:
        'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);min-height:810px;position:absolute;width:89%;left:-112px;z-index:8;'
    }
  },
  components: {
    headMenu,
    certificateAdd
  },
  created() {
    this.getSource(1)
    this.getSource(2)
    this.getList(1)
    this.getList(2);
    document.title='证件管理'
  },
  methods: {
    fnAdd(type) {
      this.add.dialogVisible = false
      if (type == 'refresh') {
        this.getList(1)
      }
    },
    //搜索
    onSearch(type) {
      if (type == 1) {
        this.zsxx1.source = ''
        this.zsxx1.zjlx = ''
        this.table1.page = 1
        this.table1.total = 0
        this.getList(1)
      } else {
        this.zsxx.source = ''
        this.zsxx.zjlx = ''
        this.table2.page = 1
        this.table2.total = 0
        this.getList(2)
      }
    },
    onReset(type) {
      if (type == 1) {
        this.zsxx1.source = ''
        this.zsxx1.zjlx = ''
        this.zsxx1.rymc = ''
        this.zsxx1.zsbh = ''
        this.table1.page = 1
        this.table1.total = 0
        this.getList(1)
      } else {
        this.zsxx.source = ''
        this.zsxx.zjlx = ''
        this.zsxx.rymc = ''
        this.zsxx.zsbh = ''
        this.table2.page = 1
        this.table2.total = 0
        this.getList(2)
      }
    },
    //人员跳转
    openRy(name, source, row) {
      let { href } = this.$router.resolve({
        path: `/ryDet?gs_id=${this.gs_id}&name=${name}&cate=1&staff_base_id=${
          row.staff_base_id ? row.staff_base_id : ''
        }`
      })
      window.open(href, name + this.gs_id)
    },
    //点击导航
    onSelectedNav(source, zjlx, type) {
      //type 1 企业
      if (type == 1) {
        if (source == this.zsxx1.source && zjlx == this.zsxx1.zjlx) {
          this.zsxx1.source = ''
          this.zsxx1.zjlx = ''
        } else {
          this.zsxx1.source = source
          this.zsxx1.zjlx = zjlx
        }
        this.table1.page = 1
        this.table1.total = 0
        this.zsxx1.rymc = ''
        this.zsxx1.zsbh = ''
        this.getList(1)
      } else {
        if (source == this.zsxx.source && zjlx == this.zsxx.zjlx) {
          this.zsxx.source = ''
          this.zsxx.zjlx = ''
        } else {
          this.zsxx.source = source
          this.zsxx.zjlx = zjlx
        }
        this.table2.page = 1
        this.table2.total = 0
        this.zsxx.rymc = ''
        this.zsxx.zsbh = ''
        this.getList(2)
      }
    },
    getList(type) {
      let query_data
      let url = ''
      if (type == 1) {
        this.table1.loading = true
        query_data = {
          gs_id: this.gs_id,
          source: this.zsxx1.source,
          zjlx: this.zsxx1.zjlx,
          name: this.zsxx1.rymc,
          number: this.zsxx1.zsbh,
          page: this.table1.page,
          rows: 10
        }
        url = '/firm/company_People/staffList'
      } else {
        this.table2.loading = true
        query_data = {
          gs_id: this.gs_id,
          source: this.zsxx.source,
          zjlx: this.zsxx.zjlx,
          name: this.zsxx.rymc,
          number: this.zsxx.zsbh,
          page: this.table2.page,
          rows: 10
        }
        url = '/firm/people/peopleList'
      }
      this.axios.post(url, query_data, data => {
        if (type == 1) {
          this.table1.loading = false
          this.table1.tableData = data.rows || []
          this.table1.total = data.total || 0
        } else {
          this.table2.loading = false
          this.table2.tableData = data.rows || []
          this.table2.total = data.total || 0
        }
      })
      
    },
    addRy() {
      this.add.dialogVisible = true
    },
    onSubmit(key, row) {
      switch (key) {
        case 'ck':
          let { href } = this.$router.resolve({
            path: `/certificateDetail?gs_id=${this.gs_id}&name=${
              row.name
            }&staff_base_id=${row.staff_base_id}&cate=${row.cate}`
          })
          window.open(
            href,
            `/certificateDetail?gs_id=${this.gs_id}&name=${
              row.name
            }&staff_base_id=${row.staff_base_id}`
          )
          break
        case 'ck2':
          let href2 = this.$router.resolve({
            path: `/ryDet?gs_id=${this.gs_id}&name=${row.name}&staff_base_id=${
              row.staff_base_id
            }&cate=1`
          })
          window.open(
            href2.href,
            `/ryDet?gs_id=${this.gs_id}&name=${row.name}&staff_base_id=${
              row.staff_base_id
            }&cate=1`
          )
          break
        case 'import': //导入内部
          this.importPeople(row)
          this.getSource(1);
          break

        default:
          break
      }
    },
    importPeople(row) {
      let params = {
        gs_id: this.gs_id,
        staff_base_id: row.staff_base_id,
        name: row.name
      }
      this.axios.post('/firm/company_People/importPeople', params, data => {
        if (data.status == 'success') {
          this.getList(1)
          this.getList(2)
        } else {
          this.$message.error(data.message)
        }
      })
    },
    //获取导航列表
    getSource(type) {
      let query_data = {
        gs_id: this.gs_id
      }
      let url =
        type == 1
          ? '/firm/company_People/staffSource'
          : '/firm/people/peopleSource'

      this.axios.post(`${url}`, query_data, data => {
        if (data.status == 'success') {
          if (type == 1) {
            //企业内部数据
            this.zsxx1.nav = data.rows || []
          } else {
            this.zsxx.nav = data.rows || []
          }
        }
      })
    },
    //改变页面
    changePage(val) {
      if (this.tableIndex == 1) {
        this.table1.page = val
      } else {
        this.table2.page = val
      }
      this.getList(this.tableIndex)
    },
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
          'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(-10%) scale(0.8);position:absolute;width:89%;left:-22px;z-index:8;min-height:810px;transition: .3s;'
        this.tableStyleR =
          'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:89%;left:-60px;z-index:10;min-height:810px;transition: .3s;'
      } else {
        this.tableIndex = 1
        this.tableStyleL =
          'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:89%;left:-60px;z-index:10;min-height:810px;transition: .3s;'
        this.tableStyleR =
          'margin-bottom:50px;box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);position:absolute;width:89%;left:-112px;z-index:8;min-height:810px;transition: .3s;'
      }
    }
  }
}
</script>

<style lang="less" scoped>
#certificateManager {
  .certificateManagerHead {
    width: 1200px;
    margin: 20px auto;
  }
  .certificate {
    font-size: 20px;
    line-height: 40px;
  }
  .hover_div {
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
    margin: 0 6px 8px 0;
    padding: 4px 6px;
    border-radius: 4px;
  }
  .hover_div:hover {
    background-color: rgba(52, 139, 218, 1);
    color: #ffffff;
  }
  .hover_div:hover .color_blue {
    color: #ffffff;
  }
  .color_blue {
    color: rgba(52, 139, 218, 1);
  }
  .selectedText {
    background-color: rgba(52, 139, 218, 1);
    color: #ffffff;
    .color_blue {
      color: #ffffff;
    }
  }
  .fl_div {
    border: 1px solid #d5d5d5;
    padding: 8px;
    .row {
      font-size: 14px;
      display: flex;
      .title {
        cursor: pointer;
        div {
          margin-right: 10px;
          padding: 4px 6px;
          border-radius: 4px;
        }
        div:hover {
          background-color: rgba(52, 139, 218, 1);
          color: #ffffff;
          .color_blue {
            color: #ffffff;
          }
        }
        div.selected {
          background-color: rgba(52, 139, 218, 1);
          color: #ffffff;
          .color_blue {
            color: #ffffff;
          }
        }
      }
      .value {
        flex: 1;
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
}
</style>
