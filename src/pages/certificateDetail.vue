<!--人员详情-->
<template>
  <div class="ItemInfo_content">
    <!-- <div>
      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称" v-for="(value, key) in formLabelAlign.jbxx" :key="key">
          <el-input v-model="value['value']"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="aaa">提交</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <div class="content_header">
      <div class="tittle">{{jbxx.staff_name}}</div>
    </div>
    <div class="content_body">
      <div class="body_header">
        <!-- 人员基本信息 -->
        <el-row>
          <el-col :span="24">
            <div class="head">
              <span>基本信息</span>
              <i v-if="this.$route.query.cate ==2" class="el-icon-edit-outline" @click="editJbxx"></i>
            </div>
          </el-col>
          <!-- 性别、证件类型、证件号码 -->
          <el-col :span="24">
            <!-- 性别 -->
            <el-row>
              <el-col :span="7">
                <div class="grid-content bg-purple" style="border-top: #d5d5d5 1px solid;border-right:none">性别</div>
              </el-col>
              <el-col :span="17">
                <div class="grid-content bg-purple-light" style="border-top: #d5d5d5 1px solid;">{{jbxx.sex}}</div>
              </el-col>
            </el-row>
            <!-- 证件类型 -->
            <el-row>
              <el-col :span="7">
                <div class="grid-content bg-purple" style="border-right:none">证件类型</div>
              </el-col>
              <el-col :span="17">
                <div class="grid-content bg-purple-light">{{jbxx.certificate_type}}</div>
              </el-col>
            </el-row>
            <!-- 证件号码 -->
            <el-row>
              <el-col :span="7">
                <div class="grid-content bg-purple" style="border-right:none">证件号码</div>
              </el-col>
              <el-col :span="17">
                <div class="grid-content bg-purple-light">{{jbxx.certificate_number}}</div>
              </el-col>
            </el-row>
          </el-col>
          <!-- 关联企业 -->
          <!-- <el-col :span="12">
            <el-row>
              <el-col :span="7">
                <div class="grid-content bg-purple" style="border-top: #d5d5d5 1px solid;height:128px;line-height:128px;border-right:none">关联企业</div>
              </el-col>
              <el-col :span="17">
                <div class="grid-content bg-purple-light" style="border-top: #d5d5d5 1px solid;">{{jbxx.company.length>0?jbxx.company[0]:''}}</div>
                <div class="grid-content bg-purple-light">{{jbxx.company.length>1?jbxx.company[1]:''}}</div>
                <div class="grid-content bg-purple-light">{{jbxx.company.length>2?jbxx.company[2]:''}}</div>
              </el-col>
            </el-row>
          </el-col> -->
        </el-row>
      </div>
      <div class="body_content">
        <el-row>
          <el-col :span='22'>
            <head-nav :data="navData" @switchNav="switchNav"></head-nav>
          </el-col>
          <el-col :span="2" style="position:absolute;right:0;top:15px;">
            <el-button  @click="fn_addZj" type="primary">添加证件</el-button>
          </el-col>
        </el-row>
        <div>

        </div>
        <!-- 证书信息 -->
        <div v-if="zsxx" v-loading="loading">
          <div class="item_zs" v-for="(item1,key2) in itemInfo" :key="key2">
            <!-- 标题 -->
            <div class="title">
              {{key2}}
            </div>
            <!-- 内容 -->
            <div class="itemInfo">
              <!-- 内容中的每一个小项 -->
              <div class="itemInfoLi" v-for="(item,key) in item1" :key="key">
                <div class="itemInfoLi_title">

                  <span style="float:left">
                    {{item.not_each[0]?item.not_each[0]:''}}
                  </span>
                  <i v-if="key2 =='手动添加'" class="el-icon-edit-outline editIcon" @click="editZj(item.id)"></i>
                  <span style="float:right;font-size:14px;">
                    {{item.not_each[1]?item.not_each[1]:''}}
                  </span>
                </div>
                <div class="itemInfoLi_content">
                  <el-row>
                    <!-- 左边的内容 -->
                    <el-col :span="12">
                      <div>
                        <!-- 第一排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[0]?item.each[0].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[0]?item.each[0].value:''">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第二排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[2]?item.each[2].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[2]?item.each[2].value:''">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第三排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[4]?item.each[4].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[4]?item.each[4].value:''">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第四排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[6]?item.each[6].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[6]?item.each[6].value:''">
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <!-- 右边的内容 -->
                    <el-col :span="12">
                      <!-- 右边的内容 -->
                      <div>
                        <!-- 第一排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[1]?item.each[1].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[1]?item.each[1].value:''">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第二排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[3]?item.each[3].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[3]?item.each[3].value:''" style="overflow:hiden">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第三排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[5]?item.each[5].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[5]?item.each[5].value:''">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第四排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[7]?item.each[7].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[7]?item.each[7].value:''">
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="itemInfoLi_footer" style="height:15px">
                  <img v-if="key2=='四川省建设厅'" src="../assets/gs_jst&gl.png" alt="" :style="{width:'15px',verticalAlign:'middle'}">
                  <img v-if="key2=='全国建筑市场'" src="../assets/gs_jz.png" alt="" :style="{width:'15px',verticalAlign:'middle'}">
                  <img v-if="key2=='全国水利市场'" src="../assets/gs_sl.png" alt="" :style="{width:'15px',verticalAlign:'middle'}">
                  <img v-if="key2=='全国公路市场'" src="../assets/gs_jst&gl.png" alt="" :style="{width:'15px',verticalAlign:'middle'}">
                  <img v-if="key2 !='手动添加' && key2!='四川省建设厅'&&key2!='全国建筑市场' && key2!='全国水利市场' && key2!='全国公路市场'" src="../assets/ie.jpg" alt="" :style="{width:'15px',verticalAlign:'middle'}">
                  <a v-if="key2 !='手动添加'" :href="item.http" target="_blank" :style="{color:'#999',textDecoration:'underline',verticalAlign:'middle'}">
                    数据源网
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 工程业绩 -->
        <div class="item_yj" v-if="gcyj">
          <ry-proj :staff_base_id="staff_base_id"></ry-proj>
        </div>
        <!-- 其他 -->
        <div class="item_qt" v-if="qt">
          <!-- title -->
          <div style="margin-bottom:20px;margin-top:4px">
            <span :style="{borderRadius:'4px',padding:'5px',backgroundColor:lh?'#409EFF':'#fff',cursor:'pointer',color:lh?'#fff':'#000'}" @click="chechLh('lh')">良好/不良
              <span :style="{color:lh?'#fff':'#348bda'}">({{BlLhCount[0].num}})</span>
            </span>
            <span :style="{borderRadius:'4px',padding:'5px',backgroundColor:bg?'#409EFF':'#fff',cursor:'pointer',color:bg?'#fff':'#000'}" @click="chechLh('bg')">变更记录
              <span :style="{color:bg?'#fff':'#348bda'}">({{BlLhCount[0].num}})</span>
            </span>
          </div>
          <div>
            <!-- 良好/不良 -->
            <div v-if="lh">
              <el-table :data="tableDataLh" style="width: 100%;margin-top:5px" border>
                <el-table-column type="index" label="序号" width="60" align="center">
                </el-table-column>
                <el-table-column prop="cxjlbh" label="诚信记录编号" width="180" align="center">
                </el-table-column>
                <el-table-column prop="cxjlzt" label="诚信记录主体" width="180" align="center">
                </el-table-column>
                <el-table-column prop="jdnr" label="决定内容" align="center">
                </el-table-column>
                <el-table-column label="实施部门(文号)" align="center">
                  <template slot-scope="scope">
                    {{getSsbmWh(scope.row.ssbm,scope.row.wh)}}
                  </template>
                </el-table-column>
                <el-table-column prop="fbyxq" label="发布有效期" align="center">
                </el-table-column>
              </el-table>
            </div>
            <!-- 变更记录 -->
            <div v-if="bg">
              <el-table :data="tableData" style="width: 100%;margin-top:5px" border>
                <el-table-column type="index" label="序号" width="" align="center">
                </el-table-column>
                <el-table-column prop="date" label="变更日期" align="center">
                </el-table-column>
                <el-table-column prop="name" label="变更内容" align="center">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-dialog :title="addZj.title" :visible.sync="addZj.dialogVisible" width="30%">
        <el-row>
          <el-col :span='20' :offset='2'>
            <el-form :model="addZj" @submit.native.prevent class="demo-form-inline" label-width='132px' ref="addZj" :rules="rules">
              <el-form-item label="证件类型" prop='zjlx'>
                <el-input v-model="addZj.zjlx" placeholder="证件类型"></el-input>
              </el-form-item>
              <el-form-item label="证件号">
                <el-input v-model="addZj.number" placeholder="证件号"></el-input>
              </el-form-item>
              <el-form-item label="注册专业/专业/职称">
                <el-input v-model="addZj.major" placeholder="注册专业/专业/职称"></el-input>
              </el-form-item>
              <el-form-item label="证书级别/等级/岗位">
                <el-input v-model="addZj.level" placeholder="证书级别/等级/岗位"></el-input>
              </el-form-item>
              <el-form-item label="有效期">
                <el-date-picker style="width:312px" v-model="addZj.valid_date" type="date" placeholder="选择日期" value-format='yyyy-MM-dd'>
                </el-date-picker>
                <!-- <el-input v-model="addZj.valid_date" placeholder="有效期"></el-input> -->
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24' style="text-align:center">
            <el-button type="primary" @click="onSubmit('addZj','1')">保存</el-button>
            <el-button type="" @click="onSubmit('addZj','2')">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="编辑基本信息" :visible.sync="editRy.dialogVisible" width="30%">
        <certificate-add :data="editRy.data" @fnAdd="fnAdd"></certificate-add>
      </el-dialog>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ryProj from './template/ryProj.vue'
import headNav from './template/head_nav.vue'
import certificateAdd from './template/certificateAdd.vue'

export default {
  data() {
    return {
      // formLabelAlign: {
      //   name: 'John',
      //   sex: '男',
      // },
      // formLabelAlign: {
      //   jbxx: [
      //     {
      //       value: 'John',
      //       label: '姓名',
      //       key: 'name'
      //     },
      //     {
      //       value: '男',
      //       label: '性别',
      //       key: 'sex'
      //     }
      //   ]
      // },

      rules: {
        zjlx: [
          { required: true, message: '请输入证件类型', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      name: this.$route.query.name,
      gs_id: this.$route.query.gs_id,
      editRy: {
        dialogVisible: false,
        data: {}
      },
      addZj: {
        title: '添加证件',
        dialogVisible: false,
        zjlx: '',
        number: '',
        major: '',
        level: '',
        valid_date: ''
      },
      itemInfo: {},
      jbxx: {
        company: [],
        staff_name: ''
      },
      navData: {
        nav: [
          // { text: '证书信息', num: 0 },
          // { text: '工程业绩', num: 0 },
          // { text: '其他', num: 0 }
        ],
        source: {
          link: '',
          name: ''
        }
      },
      //切换按钮
      loading: true,
      zsxx: true,
      gcyj: false,
      qt: false,
      lh: true,
      bg: false,
      //模拟数据
      tableData: [],
      staff_base_id: this.$route.query.staff_base_id,
      staff_id: '',
      tableDataLh: [],
      BlLhCount: []
    }
  },
  components: {
    ryProj,
    headNav,
    certificateAdd
  },
  created() {
    this.getJbxx()

    // this.getStaffInfo()
    document.title = '人员详情:' + this.$route.query.name
    // this.getLh()
  },
  methods: {
    editZj(id) {
      this.axios.post(
        '/firm/company_People/editStaffInfo',
        { id, type: '证件信息' },
        data => {
          if (data.status == 'success') {
            this.addZj = {
              cate: this.$route.query.cate,
              id: id,
              title: '编辑证件',
              dialogVisible: true,
              zjlx: data.rows.certificate_type,
              number: data.rows.certificate_number,
              major: data.rows.major,
              level: data.rows.certificate_level,
              valid_date: data.rows.valid_date
            }
          } else {
            this.$message.error(data.message)
          }
        }
      )
    },
    fnAdd(type) {
      if (type == 'refresh') {
        this.getJbxx()
      }
      this.editRy.dialogVisible = false
    },
    editJbxx() {
      this.editRy.dialogVisible = true
      this.editRy.data = {
        type: 'edit',
        name: this.jbxx.staff_name,
        sex: this.jbxx.sex,
        certificate_number: this.jbxx.certificate_number,
        id: this.jbxx.id
      }
    },
    fn_addZj() {
      this.addZj = {
        id: '',
        cate: this.$route.query.cate,
        title: '添加证件',
        dialogVisible: true,
        zjlx: '',
        number: '',
        major: '',
        level: '',
        valid_date: ''
      }
    },
    onSubmit(formName, type) {
      if (type == 1) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let params = {
              gs_id: this.gs_id,
              name: this.name,
              id: this.addZj.id,
              cate: this.$route.query.cate,
              staff_base_id: this.staff_base_id,
              zjlx: this.addZj.zjlx,
              number: this.addZj.number,
              major: this.addZj.major,
              level: this.addZj.level,
              valid_date: this.addZj.valid_date
            }
            this.axios.post('/firm/company_People/addPeople', params, data => {
              if (data.status == 'success') {
                this.$message.success('保存成功')
                this.getStaffInfo();
                this.resetAddZj()
              } else {
                this.$message.error(data.message)
              }
            })
          } else {
            return false
          }
        })
      } else {
        this.resetAddZj()
      }
    },
    resetAddZj() {
      this.addZj = {
        id: '',
        cate: this.$route.query.cate,
        title: '添加证件',
        dialogVisible: false,
        zjlx: '',
        number: '',
        major: '',
        level: '',
        valid_date: ''
      }
    },
    getStaffInfo() {
      this.axios.post(
        '/firm/company_People/getStaffId',
        {
          staff_base_id: this.$route.query.staff_base_id,
          name: this.$route.query.name,
          gs_id: this.$route.query.gs_id
        },
        data => {
          if (data.status == 'success') {
            // this.staff_base_id = data.rows.staff_base_id
            this.staff_id = data.rows.staff_id

            // this.getLh()
            // this.getBl()
            // this.getBlLhCount()
          } else {
          }
          this.getData()
          this.getNavNumber()
          this.getTableData()
        }
      )
    },
    //获得良好信息记录
    getLh() {
      this.axios.post(
        '/firm/company_People/peopleCredit',
        { staff_id: this.staff_id, type: '良好/不良' },
        data => {
          if (data.status == 'success') {
            this.tableDataLh = data.rows
          } else {
          }
        }
      )
    },
    //获得变更记录信息记录
    getBlLhCount() {
      this.axios.post(
        '/firm/company_People/peopleCreditCount',
        { staff_id: this.staff_id },
        data => {
          if (data.status == 'success') {
            this.BlLhCount = data.rows
          } else {
          }
        }
      )
    },
    //返回实施部门(文号)
    getSsbmWh(a, b) {
      return a + '(' + b + ')'
    },
    //获得变更记录信息记录
    getBl() {
      this.axios.post(
        '/firm/company_People/peopleCredit',
        { staff_id: this.staff_id, type: '变更记录' },
        data => {
          if (data.status == 'success') {
          } else {
          }
        }
      )
    },
    getData() {
      this.axios.post(
        '/firm/company_People/staffDetail',
        { staff_id: this.staff_id },
        data => {
          this.loading = false
          if (data.status == 'success') {
            this.itemInfo = data.rows
          } else {
          }
        }
      )
    },
    getJbxx() {
      this.axios.post(
        '/firm/company_People/staffBase',
        {
          staff_base_id: this.staff_base_id,
          cate: this.$route.query.cate || ''
        },
        data => {
          if (data.status == 'success') {
            this.jbxx = data.rows
            this.jbxx.company = data.rows.company
          } else {
          }
          this.getStaffInfo()
        }
      )
    },
    //工程业绩数据
    getTableData() {
      this.axios.post(
        '/firm/Performance/projectLists',
        { staff_base_id: this.staff_base_id },
        data => {}
      )
    },
    //导航栏数据
    getNavNumber() {
      this.axios.post(
        '/firm/company_People/countNav',
        { staff_id: this.staff_id, staff_base_id: this.staff_base_id },
        data => {
          this.navData = {
            nav: [
              // { text: '证书信息', num: data[0].count },
              // { text: '工程业绩', num: data[1].count },
              // { text: '其他', num: data[2].count }
            ],
            source: {
              link: '',
              name: ''
            }
          }
          data.forEach(element => {
            this.navData.nav.push({ text: element.title, num: element.count })
          })
        }
      )
    },
    switchNav(name) {
      this.zsxx = false
      this.gcyj = false
      this.qt = false
      if (name == '证书信息') {
        this.zsxx = true
      }
      if (name == '工程业绩') {
        this.gcyj = true
      }
      if (name == '其他') {
        this.qt = true
      }
    },
    chechLh(name) {
      this.lh = false
      this.bg = false
      if (name == 'lh') {
        this.lh = true
      }
      if (name == 'bg') {
        this.bg = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.xmxx_class {
  margin-left: 50px;
  font-size: 14px;
}
.myrow {
  margin: 20px 0;
  display: flex;
}
.myrow > div:first-child {
  width: 120px;
}
.mycol_1 {
  flex: 1;
}
a:link {
  color: #409eff;
  text-decoration: none;
}

.ItemInfo_content {
  // 一级页面头部开始
  .content_header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .tittle {
      // line-height: 60px;
      padding: 14px 0;
      -moz-box-shadow: 0px 0px 0px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      width: 100%;
      font-size: 32px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
  // 一级页面头部结束

  // 一级页面身体开始
  .content_body {
    width: 1200px;
    display: flex;
    margin: 0 auto;
    padding: 25px;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    // height: calc(~'100% - 60px');
    background: #fff;
    .body_header {
      box-shadow: none;
      background: #ffffff;
      .head {
        border: 1px solid #ddd;
        padding: 10px;
        border-bottom: none;
        span {
          font-size: 20px;
          color: #409eff;
        }
        i {
          margin-left: 10px;
          cursor: pointer;
          font-size: 20px;
          color: gray;
        }
      }
      .evryone {
        display: flex;
        flex-direction: row;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        .each {
          min-width: 150px;
          margin-left: 25px;
          height: 60px;
          justify-content: center;
          span {
            color: #606266;
          }
        }
        .each_button {
          width: 49%;
          height: 60px;
          text-align: right;
          padding-right: 25px;
        }
        .evryone_one {
          width: 125px;
          height: 60px;
          margin-left: 25px;
        }
        .evryone_two {
          height: 28px;
          display: flex;
          flex-direction: row;
          // width: 740px;
          // height: 20px;
          margin-top: 20px;
          font-size: 14px;
          color: #000000;
          .eachOne {
            position: relative;
            background-size: 100% 100%;
            width: 250px;
            line-height: 28px;
            height: 28px;
            text-align: center;
            z-index: 10;
          }
          .eachOne:nth-child(2) {
            left: -30px;
            z-index: 9;
          }
          .eachOne:nth-child(3) {
            left: -55px;
            z-index: 8;
          }

          .eachOne:nth-child(4) {
            left: -82px;
            z-index: 7;
          }
          .active {
            background-image: url('../assets/jd.png');
            background-repeat: no-repeat;
            background-size: cover;
            width: 250px;
            height: 28px;
            text-align: center;
            color: #ffffff;
          }
        }
      }
      .evryone:nth-child(3),
      .evryone:nth-child(2) {
        border: none;
      }
    }
    .body_content {
      background: #ffffff;
      // height: calc(~'100% - 270px');
      box-shadow: none;
      .item_zs {
        border: 1px #d5d5d5 solid;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
          color: #409eff;
        }
        .itemInfo {
          overflow: hidden;
          .itemInfoLi {
            position: relative;
            .el-row {
              margin-bottom: 10px;
            }
            .itemInfoLi_title {
              width: 560px;
              height: 32px;
              border-bottom: 1px #d5d5d5 solid;
              margin: auto;
              line-height: 32px;
              .editIcon {
                margin-left: 20px;
                color: gray;
                cursor: pointer;
                font-size: 20px;
                margin-top: 6px;
              }
            }
            .itemInfoLi_content {
              padding: 20px;
              .content_left {
                font-size: 14px;
                color: #999;
                text-align: right;
              }
              .content_right {
                font-size: 14px;
              }
            }
            .itemInfoLi_footer {
              position: absolute;
              bottom: 10px;
              right: 20px;
              font-size: 13px;
            }
            width: 591px;
            height: 230px;
            margin-top: 2px;
            margin-left: 4px;
            margin-bottom: 2px;
            border: 1px #d5d5d5 solid;
            float: left;
          }
          .itemInfoLi:hover {
            border: 1px #409eff solid;
          }
        }
      }
      .information {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        .informatin_header {
          display: flex;
          margin-left: 25px;
          font-size: 20px;
          height: 70px;
          line-height: 70px;
        }
        .infromation_body {
          font-size: 14px;
          display: flex;
          flex-direction: row;
          margin-left: 50px;
          .each_left {
            display: flex;
            width: 100px;
            flex-direction: column;
            margin-right: 25px;
            .left_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
          }
          .each_right {
            display: flex;
            flex-direction: column;
            .right_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
            // .right_each_two {
            //   margin-bottom: 20px;
            //   color: #06b6ff;
            // }
            .right_botton {
              display: flex;
              flex-direction: row;
              color: #409eff;
              .button_left {
                display: flex;
                flex-direction: column;
                margin-right: 115px;
                .right_each_two {
                  cursor: pointer;
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
              }
              .button_right {
                border: 1px solid #9d9d9d;
                padding-left: 20px;
                padding-right: 80px;
                display: flex;
                flex-direction: column;
                align-content: center;
                display: flex;
                .right_each_two {
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
                .right_each_two:last-child {
                  margin-bottom: 0px;
                }
              }
            }
          }
        }
      }
      .table {
        display: flex;
        flex-direction: column;
        .table_header {
          font-size: 20px;
          margin: 25px;
        }
        .table_footer {
          margin: 25px;
          display: block;
        }
      }
    }
  }
}
</style>
<style scoped>
.liu li {
  width: 250px;
  height: 28px;
  float: left;
  list-style: none;
  position: absolute;
  text-align: center;
  line-height: 28px;
}
.bg-purple {
  background: #f9f9f9;
  text-align: center;
  height: 42px;
  border: #d5d5d5 1px solid;
  border-top: none;
  line-height: 42px;
  font-size: 14px;
}
.bg-purple-light {
  background: #fff;
  text-align: center;
  height: 42px;
  border: #d5d5d5 1px solid;
  border-top: none;
  line-height: 42px;
  font-size: 14px;
}
</style>