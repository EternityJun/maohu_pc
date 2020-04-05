<!--企业圈-->
<template>
  <div>
    <body-top></body-top>
    <headMenu :index="'/enterpriseCircle'"></headMenu>
    <div id="enterpriseCircle">
      <!-- 页面一 -->
      <div class="main_content" v-if="model<1" v-loading="loading">
        <div class="outCircle">
          <span class="outNo" v-if="res.out.length===0">暂无外部人员</span>
          <span class="inNo" v-if="res.in.length===0">暂无内部人员</span>
          <div class="inCircle">
            <div class="peopleList inPeople">
              <el-tooltip
                v-for="(item,index) in res.in"
                :key="index"
                :content="item.username"
                placement="top"
                effect="light"
              >
                <div class="onePerson" :class="'person'+index">
                  <img :src="item.avatar" alt style="height:100%" />
                </div>
              </el-tooltip>
            </div>
            <div v-if="res_userServiceRole.add_in_person" class="addBtn inAdd" @click="Add(-1)">
              <p class="icon_plus">+</p>
              <p class="addText">添加人员</p>
            </div>
            <span class="link_color inMore" @click="ClickModel(1)">查看更多>></span>
          </div>
          <div class="peopleList outPeople">
            <el-tooltip
              v-for="(item,index) in res.out"
              :key="index"
              :content="item.username"
              placement="top"
              effect="light"
            >
              <div class="onePerson" :class="'person'+index">
                <img :src="item.avatar" alt style="height:100%" />
              </div>
            </el-tooltip>
          </div>
          <div v-if="res_userServiceRole.add_out_person" class="addBtn outAdd" @click="Add(-2)">
            <p class="icon_plus">+</p>
            <p class="addText">添加人员</p>
          </div>
          <span class="link_color outMore" @click="ClickModel(2)">查看更多>></span>
        </div>
      </div>
      <!-- 页面二 -->
      <div v-else>
        <el-row class="enterpriseCircleTitle">
          <el-col :span="2">
            <h3>{{model===1?'内部人员':'外部人员'}}</h3>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="ClickModel(0)">返回</el-button>
          </el-col>
          <el-col :span="10" :offset="10" style="text-align:right">
            <el-input
              placeholder="请输入人员姓名"
              clearable
              @clear="Clear"
              @keyup.enter.native="GetTableList"
              v-model="inf_tableList.name"
              style="width:200px"
            ></el-input>
            <el-button type="primary" @click="Clear">搜索</el-button>
            <el-button @click="Reset">重置</el-button>
            <el-button
              v-if="res_userServiceRole.add_in_person && model===1 || res_userServiceRole.add_out_person && model===2"
              type="success"
              @click="Add(0)"
            >添加</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-table :data="res_table.rows" border v-loading="loading2">
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="username" :width="model===1?150:''" label="人员名称" align="center"></el-table-column>
            <el-table-column prop="cellphone" :width="model===1?150:''" label="电话号码" align="center"></el-table-column>
            <el-table-column v-if="model===1" prop="rule_name" label="权限" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.rule_name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="Edit(scope)"
                v-if="res_userServiceRole.add_in_person && model===1 "
                >编辑</el-button>
                <el-button      v-if="res_userServiceRole.add_in_person && model===1 || res_userServiceRole.add_out_person && model===2"  size="mini" type="danger" @click="Delete(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row type="flex" justify="end">
          <el-col :span="8" :offset="16">
            <el-pagination
              v-if="res_table.total"
              @current-change="handleCurrentChange"
              :current-page.sync="inf_tableList.page"
              background
              layout="total,prev, pager, next"
              :total="res_table.total"
            ></el-pagination>
          </el-col>
        </el-row>
      </div>
      <!-- 添加 / 编辑 人员对话框 -->
      <el-dialog
        :title="Math.abs(model)===1?(edit?'编辑内部人员':'添加内部人员'):'添加外部人员'"
        :visible.sync="dialogVisible"
        width="500px"
      >
        <el-form ref="addForm" :rules="addRules" :model="inf_add" label-width="80px">
          <el-form-item label="人员名称" prop="username">
            <el-input v-model="inf_add.username" placeholder="请输入人员名称" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model.number="inf_add.cellphone" placeholder="请输入电话号码" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="权限配置" v-if="Math.abs(model)===1 " prop="rule">
            <el-select v-model="inf_add.rule" multiple collapse-tags placeholder="请选择">
              <el-option
                v-for="(item,index) in rulesList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="AddSubmit('addForm')">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import headMenu from './template/head_menu.vue'
export default {
  components: {
    headMenu
  },
  data () {
    // 手机号验证规则
    var checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      // console.log(reg.test(value));
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入正确的电话号码'))
      }
    }
    return {
      serviceId: '',
      model: 0, // 控制当前页面所有操作模式  0:页面一  1:页面二(圈内)  2:页面二(圈外)  -1:页面一(圈内)  -2:页面一(圈外) ----核心数据 不能删除
      edit: false, // 编辑功能是否打开 默认关闭
      loading: false,
      loading2: false,
      editRulesList: [],
      addRules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        cellphone: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        rule: [{ required: true, message: '权限不能为空', trigger: 'blur' }]
      },
      dialogVisible: false, // 添加人员 对话框控制
      dialogVisible2: false, // 配置权限 对话框控制
      // 接口预设数据
      // 表格列表接口数据
      inf_tableList: {
        service_id: '',
        name: '',
        page: 1,
        rows: 10
      },
      inf_userServiceRole: {
        service_id: localStorage.getItem('service_id'),
        user_id: localStorage.getItem('user_id')
      },
      // 添加人员接口数据
      inf_add: {
        service_id: '',
        company: '',
        company_id: '',
        username: '',
        cellphone: null,
        rule: []
      },
      // 删除接口
      inf_delete: {
        service_id: '',
        id: ''
      },
      // 接收初始页面数据结果
      res: {
        in: [],
        out: []
      },
      // 接受权限列表
      rulesList: [],
      // 接收表格列表数据结果
      res_table: {},
      // 当前用户权限列表
      res_userServiceRole: {
        add_in_person: false,
        add_out_person: false,
        add_proj: false,
        check_wbyw: false,
        release: false,
        ywqq: false
      }
    }
  },
  created () {
    this.InIt()

  },
  methods: {
    test () {
      return 1
    },
    // 初始化数据
    InIt () {
      document.title = '企业服务号' // 设置title
      // 处理serviceId
      //   let serviceId = localStorage.getItem('service_id')
      let serviceId = this.$route.query.login_service_id
      this.serviceId = serviceId || (() => {
        console.log('未查询到当前service_id，默认使用1')
        return 1
      })()
      this.GetUserServiceRole() // 获取当前用户权限
      // 获取人员列表
      this.loading = true
      this.axios.post(
        '/relation/enterprise_service/users',
        { service_id: this.serviceId },
        res => {
          if (res.status === 'success') {
            this.res = res.rows
          } else {
            this.$message.info(res.message)
          }
          this.loading = false
        }
      )
    },
    // 获取当前用户的操作权限
    GetUserServiceRole () {
      this.axios.post('/relation/role/userServiceRole', this.inf_userServiceRole, res => {
        if (res.status === 'success') {
          this.res_userServiceRole = res.message
        } else {
          console.log('权限查询失败，关闭所有权限:'.res.message)
        }
      })
    },
    // 获取添加人员时的权限列表
    GetRulesList () {
      this.axios.post(
        '/relation/enterprise_service/rules',
        { service_id: this.serviceId },
        res => {
          this.rulesList = res.rows
          this.editRulesList = JSON.parse(JSON.stringify(res.rows))
        }
      )
    },
    // 获取table数据
    GetTableList () {
      this.loading2 = true
      // 获取 内部/外部 人员;
      this.inf_tableList.service_id = this.serviceId
      this.axios.post(
        `/relation/enterprise_service/${
        this.model === 1 ? 'index' : 'outIndex'
        }`,
        this.inf_tableList,
        res => {
          this.res_table = {}
          if (res.status === 'success') {
            // console.log(res)
            // 判断当前列表返回数据是否为0，如果为0，size--
            if (res.rows.length === 0 && this.inf_tableList.page > 1) {
              this.inf_tableList.page--
              return this.GetTableList() // 重新搜索
            } else {
              this.res_table = res
            }
          } else {
            this.$message.info(res.message)
          }
          this.loading2 = false
        }
      )
    },
    // 重置
    Reset () {
      this.inf_tableList.name = '' // 重置姓名为空
      this.Clear()
    },
    // 清除
    Clear () {
      this.inf_tableList.page = 1 // 重置搜索第一页
      this.GetTableList()
    },
    // 页面切换
    handleCurrentChange (val) {
      this.inf_tableList.page = val
      this.GetTableList()
    },
    // 添加按钮
    Add (val) {
      this.edit = false // 关闭编辑模式
      if (val !== 0) {
        this.model = val // 切换内部添加 /外部添加
      }
      this.GetRulesList() // 获取权限列表
      // 如果是第一页面的添加
      // 初始化添加接口数据
      this.inf_add = {
        service_id: '',
        company: '',
        company_id: '',
        username: '',
        cellphone: null,
        rule: []
      }
      this.dialogVisible = true
      if (this.$refs.addForm) {
        this.$refs.addForm.clearValidate() // 移除验证
      }
    },
    // 添加 /编辑 确定按钮
    AddSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 添加 /编辑 内部/外部 人员;
          if (Math.abs(this.model) === 2) {
            // 处理添加外部人员不需要传入的部分数据
            delete this.inf_add.rule
            delete this.inf_add.company
            delete this.inf_add.company_id
          }
          if (this.edit) {
            // 处理编辑模式不需要传入的部分数据
            delete this.inf_add.cs_id
            delete this.inf_add.group_id
            delete this.inf_add.rule_name
            // this.inf_add.rule_id = null
          }
          this.inf_add.service_id = this.serviceId // 获取当前服务号id
          // 添加 内部/外部 人员;
          this.axios.post(
            `/relation/enterprise_service/${
            this.edit ? (Math.abs(this.model) === 1 ? 'update' : 'outUpdate') : (Math.abs(this.model) === 1 ? 'save' : 'outSave')
            }`,
            this.inf_add,
            res => {
              if (res.status === 'success') {
                this.$message.success('操作成功')
                // 刷新页面数据  页面一 ? 页面二
                this.model < 0 ? this.InIt() : this.GetTableList()
              
                this.dialogVisible = false
              } else {
                this.$message.info(res.message) // 提示错误
              }
                this.GetUserServiceRole()
            }
          )
        }
      })
    },
    // 编辑按钮
    Edit (scope) {
      this.edit = true
      //   console.log(scope)
      this.GetRulesList() // 获取权限列表
      this.inf_add = JSON.parse(JSON.stringify(scope.row))
      if (this.$refs.addForm) {
        this.$refs.addForm.clearValidate() // 移除验证
      }
      this.dialogVisible = true
    },
    // 删除按钮
    Delete (scope) {
      // console.log(scope);
      // 删除 内部/外部 人员;
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading2 = true
          this.inf_delete.service_id = this.serviceId
          this.inf_delete.id = scope.row.id
          this.axios.post(
            `/relation/enterprise_service/${
            this.model === 1 ? 'delete' : 'outDelete'
            }`,
            this.inf_delete,
            res => {
              if (res.status === 'success') {
                this.GetTableList()
                this.$message.success('已删除')
                this.res_table.rows.splice(scope.$index, 1)
                // 判断当前列表返回数据是否为0，如果为0，size--
                if (this.res_table.rows.length === 0 && this.inf_tableList.page > 1) {
                  this.inf_tableList.page--
                  return this.GetTableList() // 重新搜索
                }
              } else {
                this.$message.info(res.message) // 提示错误
              }
              this.loading2 = false
            }
          )
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    // 页面模式切换
    ClickModel (val) {
      this.model = val
      val === 0 ? this.InIt() : this.Clear() // 切换时刷新页面
    }
  },
}
</script>
<style  lang="less" >
#enterpriseCircle {
  width: 1200px;
  margin: 0 auto;
  .el-input {
    width: 380px;
  }
  .el-pagination {
    margin: 10px 0;
  }
  .absolute-center {
    position: absolute;
    height: 20px;
    background: red;
    width: 200px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0 auto;
  }
  .outCircle {
    position: relative;
    width: 1060px;
    height: 500px;
    margin: 50px auto;
    border: 1px solid #a9a9a9;
    border-radius: 50%;
    text-align: center;
  }
  .inCircle {
    width: 600px;
    height: 250px;
    margin: 30px auto;
    border: 1px solid #a9a9a9;
    border-radius: 50%;
  }
  .peopleList {
    position: relative;

    .onePerson {
      overflow: hidden;
      position: absolute;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      cursor: pointer;
      img {
        height: 100%;
        width: 100%;
      }
      //   &:hover {
      //     transform: scale(1.2);
      //     transition: all 0.5s;
      //   }
    }
  }
  .inPeople {
    .person0 {
      //   border: 1px solid #409eff;
      top: 20px;
      left: 220px;
    }
    .person1 {
      top: 120px;
      left: 180px;
    }
    .person2 {
      top: 110px;
      left: 310px;
    }
    .person3 {
      top: 30px;
      left: 380px;
    }
    .person4 {
      top: 60px;
      left: 70px;
    }
  }
  .outPeople {
    .person0 {
      top: 40px;
      left: 490px;
    }
    .person1 {
      top: 30px;
      left: 600px;
    }
    .person2 {
      top: 30px;
      left: 380px;
    }
    .person3 {
      top: 5px;
      left: 710px;
    }
    .person4 {
      top: 5px;
      left: 270px;
    }
    .person5 {
      top: -35px;
      left: 820px;
    }
    .person6 {
      top: -35px;
      left: 160px;
    }
    .person7 {
      top: -210px;
      left: 860px;
      transform: scale(0.8);
    }
    .person8 {
      top: -120px;
      left: 90px;
      transform: scale(0.9);
    }
    .person9 {
      top: -210px;
      left: 130px;
      transform: scale(0.8);
    }
  }
  .inNo {
    color: #c0c4cc;
    position: absolute;
    width: 200px;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 350px;
  }
  .outNo {
    color: #c0c4cc;
    position: absolute;
    width: 200px;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 100px;
  }
  // 添加人员
  .addBtn {
    color: #888;
    width: 70px;
    height: 70px;
    background: #e9e9e9;
    border-radius: 50%;
    cursor: pointer;
    // &:hover {
    //   transform: scale(1.2);
    //   transition: all 0.5s;
    // }
    .icon_plus {
      font-size: 30px;
      font-weight: bolder;
      padding-top: 7px;
    }
    .addText {
      font-size: 14px;
      margin-top: -7px;
    }
  }
  .inAdd {
    position: relative;
    left: 450px;
    top: 120px;
  }
  .outAdd {
    position: relative;
    top: -120px;
    left: 890px;
    transform: scale(0.9);
  }
  // 查看更多
  .link_color {
    color: rgb(58, 142, 230);
    cursor: pointer;
    font-size: 14px;
  }
  .inMore {
    position: absolute;
    top: 250px;
    left: 490px;
  }
  .outMore {
    position: absolute;
    top: 450px;
    left: 490px;
  }
}
#enterpriseCircle .enterpriseCircleTitle {
  margin: 10px 0;
  height: 40px;
  line-height: 40px;
  .el-input {
    display: inline-block;
  }
  .el-input__suffix {
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
}
.right {
  float: right;
}
</style>
