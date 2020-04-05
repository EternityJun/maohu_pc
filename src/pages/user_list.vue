<template>
  <div style="min-width:1200px;">
    <body-top></body-top>
    <headMenu :index="'/user_list'"></headMenu>
    <div class="container">
      <transition name="fade" mode="out-in" appear>
        <div class="pos_top container_ry">
          <el-row class="titleRy" style="margin-top:20px;">
            <el-col :span="4"  v-if="company_id >0">
              <!-- <span style="font-size:20px">人员权限</span> -->
              <div>
                <el-radio-group v-model="ry_radio" @change="changeRyRadio">
                  <el-radio-button label="企业人员"></el-radio-button>
                  <el-radio-button label="合作人员"></el-radio-button>
                </el-radio-group>
              </div>
            </el-col>
            <el-col :span='20' style="height: 50px;" align="right" :offset="company_id >0 ? 0 : 4">
              <el-form ref="table_xm" :model="table_ry" :inline="true" class="demo-form-inline" @submit.native.prevent>
                <el-form-item label="权限" v-show="ry_radio=='企业人员'">
                  <el-select @remove-tag="handleRemoveTag" @change="handleSelChange" v-model="qxVal" multiple placeholder="请选择权限" style="width:380px;" clearable>
                    <el-option v-for="(item,index) in table_ry.groupList" :key="index" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="人员名称">
                  <el-input placeholder="请输入人员名称" @clear="searchFn('ry')"  v-model="table_ry.input" @keydown.enter.native="searchFn('ry')" clearable>
                    <!-- <el-button class="btn_search" slot="append" @click="searchFn('ry')">搜索</el-button> -->
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="btn_search" @click="searchFn('ry')">搜索</el-button>
                  <el-button type="success" @click="addRy">添加</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <template>
              <el-table :data="table_ry.data" style="width: 100%;" border v-loading="loading">
                <el-table-column type="index" width="60" label="序号" align="center">
                  <template slot-scope="scope">
                    {{scope.$index+(table_ry.page-1)*10+1}}
                  </template>
                </el-table-column>
                <el-table-column prop="username" label="人员名称" align="center">
                </el-table-column>
                <el-table-column prop="cellphone" label="电话号码" align="center">
                </el-table-column>
                <el-table-column prop="group" label="权限配置" min-width="200" align="center" v-if="ry_radio=='企业人员'">
                </el-table-column>
                <el-table-column prop="" label="操作" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button size="small" @click="ryTableEdit(scope.row)" type="primary">编辑</el-button>
                    <el-button size="small" @click="ryTableDel(scope.row)" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination align="right" @current-change="changePageRy" :current-page.sync="table_ry.page" background layout="total,prev, pager, next" :total="table_ry.total" class="pagination"></el-pagination>
            </template>
          </el-row>
        </div>
      </transition>

    </div>
    <!-- 人员的添加编辑 -->
    <el-dialog title="添加人员" :visible.sync="table_ry.dialogVisible">
      <el-form :model="tableRyForm" :rules="tableRyFormRules" ref="tableRyForm" label-width="100px" @submit.native.prevent>
        <el-form-item label="人员名称" prop="username">
          <el-input v-model="tableRyForm.username" placeholder="请输入人员名称"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input v-model="tableRyForm.cellphone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="权限配置" v-show="ry_radio=='企业人员'">
          <el-select v-show="table_ry.dialogVisible" v-model="tableRyForm.group_id" placeholder="请选择权限配置" style="width:100%" multiple clearable>
            <el-option v-for="(item,index) in table_ry.groupList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmitRy('tableRyForm')">确定</el-button>
          <el-button @click="table_ry.dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>
<script>
import headMenu from './template/head_menu.vue'

export default {
  data() {
    var validateCellphone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话号码'))
      } else {
        if (!/^1[345789]\d{9}$/.test(value)) {
          callback(new Error('手机号码格式有误，请重填'))
          return false
        }
        callback()
      }
    }
    return {
      company_id:localStorage.getItem('company_id'),
      userH: 1000,
      tab: '',
      threads: [],
      cate_p: '筑标',
      table_gs: {
        dialogVisible: false,
        data: [],
        total: 0,
        page: 1
      },
      numberValidateForm: {
        age: ''
      },
      tableRyFormRules: {
        username: [
          {
            required: true,
            message: '请输入人员名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ],
        cellphone: [
          {
            required: true,
            message: '请输入电话号码',
            trigger: 'blur'
          },
          { validator: validateCellphone, trigger: 'blur' }
        ]
      },
      tableRyForm: {
        username: '',
        cellphone: '',
        old_phone: '',
        group_id: []
      },
      options: [],
      value5: [],
      activeBtn: '',
      ry_radio: '企业人员',
      table_ry: {
        edit_id: '',
        add_edit: '',
        groupList: [],
        input: '',
        data: [],
        page: 1,
        total: 0,
        dialogVisible: false
      },

      dialogDrVisible: false,
      cate: {},
      ssr: {},
      fileList: {
        zbwj: [],
        zjqd: [],
        qtfj: [],
        xmyy: []
      },
      //上传前处理成组的fileList
      upfile: '',
      stageNum: {},
      role: {},
      qxVal: [] // 选中的权限值
    }
  },
  components: {
    headMenu
  },
  created() {
    this.groupList()
    this.tableRy()
    this.fn_cate()
    this.fn_role()
    document.title = '人员权限'
  },

  methods: {
    // 移除标签
    handleRemoveTag() {
      console.log(this.qxVal, '================')
      this.tableRy()
    },
    // 权限筛选条件改变
    handleSelChange(val) {
      this.qxVal = val
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
          if (!data.person_user) {
            //没有人员管理权限
            this.activeBtn = 'xm'
          } else {
            this.activeBtn = 'ry'
          }
        }
      )
    },
    onSubmitRy() {
      let params = {
        cate: this.cate_p,
        company_id: localStorage.getItem('company_id'),
        user_id: this.$store.state.userInfo.user_id,
        username: this.tableRyForm.username,
        cellphone: this.tableRyForm.cellphone,
        old_phone: this.tableRyForm.old_phone,
        group_id: this.tableRyForm.group_id.join(','),
        id: this.table_ry.edit_id
      }
      if (this.ry_radio == '合作人员') {
        params.cate = '合作'
      }
      let self = this
      self.$refs['tableRyForm'].validate(valid => {
        if (!valid) {
          return false
        } else {
          self.axios.post(
            '/index/company_staff/saveStaffRole',
            params,
            data => {
              if (data.status == 'success') {
                self.tableRy()
                self.table_ry.dialogVisible = false
              } else {
                self.$message.error(data.message)
              }
            }
          )
        }
      })
    },

    fn_cate() {
      this.axios.post('/index/project/cate', {}, data => {
        this.cate = data
        this.options = data['xmlxB']
      })
    },

    openFullScreen() {
      this.loading = true
    },
    closeFullScreen() {
      this.loading = false
    },
    changePageRy(val) {
      //人员表格分页
      this.table_ry.page = val
      this.tableRy()
    },
    // 人员权限
    groupList() {
      if (this.$store.state.userInfo.href.indexOf('bid.520coc.cn') > -1) {
        this.cate_p = '筑标'
      } else if (
        this.$store.state.userInfo.href.indexOf('laipi.520coc.cn') > -1
      ) {
        this.cate_p = '企业'
      }
      this.axios.post(
        '/index/company_staff/groupList',
        { cate: this.cate_p },
        data => {
          this.table_ry.groupList = data
        }
      )
    },
    changeRyRadio() {
      this.table_ry.data=[]
      this.tableRy()
    },
    tableRy() {
      let self = this
      let params = {
        cate: this.cate_p,
        company_id: localStorage.getItem('company_id'),
        name: self.table_ry.input,
        group: this.qxVal.join(','),
        page: self.table_ry.page
      }
      if (this.ry_radio == '合作人员') {
        params.cate = '合作'
      }
      self.openFullScreen()
      this.axios.post('/index/company_staff/staffList', params, data => {
        if (data.status == 'success') {
          self.table_ry.data = data.rows
          self.table_ry.total = data.total
        } else {
          if (params.page > 1) {
            self.table_ry.page = self.table_ry.page - 1
            self.tableRy()
          } else {
            self.table_ry.data = []
            self.table_ry.total = 0
          }
        }
        self.closeFullScreen()
      })
    },

    switchTabs(type) {
      //切换人员管理项目管理
      this.activeBtn = type
    },
    searchFn(type) {
      //人员搜索
      let self = this
      if (type == 'ry') {
        self.table_ry.page = 1
        self.tableRy()
      }
    },
    addRy() {
      //添加人员
      let self = this
      self.table_ry.dialogVisible = true
      self.table_ry.edit_id = ''
      self.tableRyForm.username = ''
      self.tableRyForm.cellphone = ''
      self.tableRyForm.group_id = []
      self.table_ry.add_edit = 'add'
    },
    ryTableEdit(scope) {
      //人员表格编辑
      let self = this
      self.table_ry.dialogVisible = true
      self.table_ry.add_edit = 'edit'
      self.table_ry.edit_id = scope.id
      self.tableRyForm.username = scope.username
      self.tableRyForm.cellphone = scope.cellphone
      self.tableRyForm.old_phone = scope.cellphone
      self.tableRyForm.group_id = scope.group_id
        ? scope.group_id.split(',').map(v => v - 0)
        : []
    },
    ryTableDel(row) {
      let self = this
      this.$confirm('是否删除该人员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios.post(
            '/index/company_staff/delStaff',
            { id: row.id },
            data => {
              if (data.status == 'success') {
                this.tableRy()
              } else {
                this.$message.success(data.message)
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
    }
  }
}
</script>
<style>
/* .title .el-input-group__append,
.title button {
  background-color: #409eff;
  border-color: #409eff;
  color: #ffffff;
} */
.el-dialog__footer {
  text-align: center;
}
.pagination {
  margin-top: 10px;
}
.lineHeightReset .el-form-item__label {
  line-height: 18px;
}
</style>

<style lang="less" scoped>
@activeColor: #409eff;
@stage_left: 234px;
@stage_left2: 170px;
@stage_zIndex: 11;

.activeA {
  color: @activeColor;
  cursor: pointer;
}
.cursor {
  cursor: pointer;
}
.activeBtn {
  color: white;
  background-color: @activeColor;
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
.el-dialog {
  .row_plan:first-child {
    border-top: 1px solid #ddd;
  }
}
.row_plan {
  // border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 5px 0;
  .plan_name {
    line-height: 50px;
  }
  .icon_style {
    width: 50px;
    transform: rotate(180deg);
    text-align: center;
    font-size: 20px;
    color: #999;
  }
  .plan_button {
    line-height: 50px;
  }
  .normal_item {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    line-height: 50px;
    text-align: center;
    background-color: #666;
    color: white;
  }
  .done_item {
    color: #2ecc40;
  }
  .inService_item {
    color: #428bca;
  }
}

.tabs {
  width: 1200px;
  margin: 0 auto;
  // padding: 10px 0;
  margin-top: 1px;
  height: 36px;
  border-bottom: 1px solid gainsboro;
  padding-bottom: 1px;
  span {
    height: 100%;
    display: inline-block;
    line-height: 35px;
    padding: 0px 20px;
  }
}
.container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 0;
  .pos_top {
    // position: absolute;
    // top: 0;
    width: 100%;
  }
  .titleRy {
    // border-bottom: 2px solid @activeColor;
  }
}
</style>
