<!--  -->
<template>
  <div class="qyZtbAddXm">
    <el-tabs v-model="activeName" :rules="rules" style="margin-top:-30px" @tab-click="tabClick">
      <el-tab-pane label="项目未公开上网" name="first">
        <el-form ref="form" :model="proNotOnline" label-width="80px">
          <el-form-item label="*项目名称" prop="xmmc">
            <el-input v-model="proNotOnline.xmmc" clearable placeholder="输入项目名称" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目地区" prop="xmdq">
            <el-cascader :options="xmdqList" @change="changeListData" ref="xmdqNode" style="width:100%;" v-model="proNotOnline.xmdq" clearable></el-cascader>
          </el-form-item>
          <el-form-item label="项目业主" prop="xmyz">
            <el-input v-model="proNotOnline.xmyz" clearable placeholder="输入项目业主"></el-input>
          </el-form-item>
          <div style="width:400px;margin:0 auto; padding-bottom:20px">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="资质要求"></el-checkbox>
              <el-checkbox label="人员要求"></el-checkbox>
              <el-checkbox label="业绩要求"></el-checkbox>
              <el-checkbox label="其他"></el-checkbox>
            </el-checkbox-group>
          </div>
          <zzyqNewSearch v-if="zzyqState" :closeMyDialog='closeMyDialog' @changeZZyq="changeZZyq"></zzyqNewSearch>

          <el-form-item v-if="ryyqState" prop="ryyq" label="人员要求">
            <el-input clearable :autosize="{ maxRows: 3}" v-model="proNotOnline.ryyq" placeholder="输入人员要求"></el-input>
          </el-form-item>
          <el-form-item v-if="yjyqState" prop="yjyq" label="业绩要求">
            <el-input clearable v-model="proNotOnline.yjyq" :autosize="{ maxRows: 5}" placeholder="输入业绩要求"></el-input>
          </el-form-item>
          <el-form-item v-if="qtyqState" prop="qtyq" label="其他">
            <el-input clearable v-model="proNotOnline.qtyq" :autosize="{ maxRows: 2}" placeholder="输入其他要求"></el-input>
          </el-form-item>
          <div style="width:100%;">
            <div style="width:240px;margin:0 auto">
              <el-button @click="addXmDalite()" type="primary">添加</el-button>
              <el-button @click="resetFormData">重置</el-button>
              <el-button @click="colse" type="danger">取消</el-button>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="项目已公开上网" name="second">
        <zbgg-search :addXmData="addXmData" v-if="showZbgg"></zbgg-search>
        <div style="width:100%;">
          <div style="width:70px;margin:0 auto">
            <el-button @click="colse" type="danger">取消</el-button>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="项目已公开上网" name="second">
        <div style="padding:0 20px">
          <el-form inline ref="form1" :model="searchData" @submit.native.prevent>
            <el-form-item label="项目名称" prop="xmmc">
              <el-input style="width:350px" @keyup.enter.native="onSearch" v-model="searchData.xmmc" placeholder="输入项目名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="招标类型" prop="zblx">
              <el-select v-model="searchData.zblx" clearable style="width:350px">
                <el-option v-for="one in zblxlist" :key="one" :value="one" :label="one"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="招标类别" prop="zblb">
              <el-select v-model="searchData.zblb" clearable style="width:350px">
                <el-option v-for="one in zblblist" :key="one" :value="one" :label="one"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form inline ref="form2" :model="searchData" @submit.native.prevent>
            <el-form-item label="项目类别" prop="xmlb">
              <el-select v-model="searchData.xmlb" clearable @change="onSearch" style="width:350px">
                <el-option v-for="one in xmlblist" :key="one.label" :value="one.value" :label="one.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属地区" prop="area">
              <el-cascader :options="xmdqList" @change="changeListData" ref="xmdqNode" style="width:100%;" v-model="proOnline.xmdq" clearable></el-cascader>
            </el-form-item>
            <el-form-item label="发布日期" prop="date">
              <el-date-picker value-format="yyyy-MM-dd" v-model="searchData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:350px"></el-date-picker>
            </el-form-item>
            <div style="width:100%;text-align:center;margin-bottom:20px;">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onReset">重置</el-button>
            </div>
          </el-form>
          <el-table :data="tablaData" v-loading="loading" border>
            <el-table-column label="序号" width="60" align="center">
              <template slot-scope="scope">{{scope.$index+(searchData.page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="bt" label="项目名称" align="center">
              <template slot-scope="scope">
                <div v-html="scope.row.bt" class="link_color" @click="openGs(scope.row)">{{scope.row.bt}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="ssd" label="建设地点" align="center">
              <template slot-scope="scope">
                <div v-html="scope.row.ssd"></div>
              </template>
            </el-table-column>
            <el-table-column prop="zblb" label="招标类别" align="center" width="90">
              <template slot-scope="scope">
                <div v-html="scope.row.zblb"></div>
              </template>
            </el-table-column>
            <el-table-column prop="fbsj" align="center" label="发布日期" width="120">
              <template slot-scope="scope">
                <div v-html="scope.row.fbsj"></div>
              </template>
            </el-table-column>
            <el-table-column prop="jzrq" label="报名截止日期" align="center" width="120">
              <template slot-scope="scope">
                <div v-html="scope.row.jzrq"></div>
              </template>
            </el-table-column>
            <el-table-column prop="tb_jzrq" label="投标截止日期" align="center" width="120">
              <template slot-scope="scope">
                <div v-html="scope.row.tb_jzrq"></div>
              </template>
            </el-table-column>
            <el-table-column label="导入" width="100" align="center">
              <template slot-scope="scope">
                <el-button title="点击导入" disabled v-if="scope.row.import == 1" style="color:#d1d1d1" size="mini">{{scope.row.is_import}}</el-button>
                <el-button v-else title="点击导入" size="mini" @click="onClick_import(scope)">{{scope.row.is_import?scope.row.is_import:'导入'}}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination ref="fenye" style="margin-top:20px" @current-change="handleSizeChange" align="right" :current-page="searchData.page" background layout="total,prev, pager, next" :total="swtotle||0"></el-pagination>
        </div>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import zzyqSearch from './zzyqSearch'
import zzyqNewSearch from './zzyqNewSearch'

// 招标查询
import zbggSearch from '../searchMyCustomization'

export default {
  name: 'qyZtbAddXm',
  props: ['pageName', 'closeMyDialog'],
  components: {
    zzyqSearch,
    zzyqNewSearch,
    zbggSearch
  },
  data() {
    return {
      showZbgg: false,
      addXmData: {}, //传到招标查询组件的数据
      rules: {
        xmmc: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      checkList: [],
      zzyqState: false,
      ryyqState: false,
      yjyqState: false,
      qtyqState: false,
      props: {
        multiple: true,
        value: 'dname',
        // checkStrictly: true,
        label: 'dname'
      },
      props1: {
        value: 'name',
        label: 'name'
      },
      clickArr: [], // 存取静态 圈内 ？ 全域
      activeName: 'first',
      activeBtn: 'changeBtnTxt active',
      normalBtn: 'changeBtnTxt normal',
      activeBtnState: true,
      dialogFormVisible: false,

      proOnline: {
        area: '',
        xmdq: []
      },
      proNotOnline: {
        service_id: '',
        company_id: '',
        search: '',
        user_id: '',
        xmdq: [],
        loading: true,
        area: '',
        xmmc: '',
        type: '自建项目',
        row: 10,
        page: 1,
        jbxx_id: '',
        count: 0,
        tableData: [],
        newObj: {},
        zzyq: [],
        ryyq: '',
        xmyz: '',
        yjyq: '',
        qtyq: ''
      },
      form: {
        xmmc: '',
        xmyz: '',
        area: ''
      },
      xmdqList: [],
      zzyqList: [],
      loading: false,
      zblblist: ['全部', '公招', '比选', '采购'],
      zblxlist: [
        '施工招标',
        '代理招标',
        '监理招标',
        '勘察设计招标',
        '造价招标',
        '采购招标',
        '其他招标'
      ],
      // xmlblist: ["全部","建筑工程", "公路", "市政", "水利", "其他"],
      xmlblist: [
        { value: '', label: '全部' },
        { value: '建筑工程', label: '建筑工程' },
        { value: '公路', label: '公路' },
        { value: '市政', label: '市政' },
        { value: '其他', label: '其他' }
      ],
      ssdqList: [],
      swtotle: 0,
      count: 0,
      searchData: {
        xmmc: '',
        zblb: '',
        xmlb: '',
        // area: '',
        province: '',
        city: '',
        zblx: '',
        date: '',
        page: 1,
        rows: 10
      },
      // 列表数据
      tablaData: [],
      newObj: {},
      openColor: 'link_color',
      // 搜索  地区列表data,
      zzyqArr: [],
      xmdqNode1: {}
    }
  },

  watch: {
    checkList() {
      this.zzyqState = false
      this.ryyqState = false
      this.yjyqState = false
      this.qtyqState = false
      for (let i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i] == '资质要求') {
          this.zzyqState = true
        }
        if (this.checkList[i] == '人员要求') {
          this.ryyqState = true
        }
        if (this.checkList[i] == '业绩要求') {
          this.yjyqState = true
        }
        if (this.checkList[i] == '其他') {
          this.qtyqState = true
        }
      }
      let a = this.checkList.indexOf('资质要求')
      // console.log(a)
    }
  },
  created() {
    if (this.pageName == '外部') {
      this.proNotOnline.service_id = this.$route.query.login_service_id
    }
    this.thisPageName = this.$route.name
    if (this.thisPageName == 'qyZtbPage') {
      this.proTableDta = this.grTableDta
    } else {
      this.proTableDta = this.qyTableDta
    }
    this.getProvinceCity()
    this.getAreaType()
    this.getZzyqData()
    this.ajax_list()
    // console.log("add",this.closeMyDialog)
  },
  methods: {
    tabClick(a) {
      if (a.label == '项目已公开上网') {
        this.showZbgg = false
        this.$nextTick(function() {
          this.addXmData = {
            service_id: this.proNotOnline.service_id
          }
          this.showZbgg=true
        })
      }
    },
    openGs(row) {
      let myPath
      if (this.thisPageName == 'qyfwqPage') {
        myPath = `/enterpriseDetails?zbxx_id=${
          row.id ? row.id : row.zbxx_id
        }&zbgs_id=&type=zbxx&xmmc=${
          row.bt ? row.bt : row.xmmc
        }&login_service_id=${this.$route.query.login_service_id}&gsmc=${
          this.$route.query.gsmc
        }&source=${row.source}`
      } else {
        myPath = `/enterpriseDetails?zbxx_id=${
          row.id ? row.id : row.zbxx_id
        }&zbgs_id=&type=zbxx&xmmc=${row.bt ? row.bt : row.xmmc}&source=${
          row.source
        }`
      }
      let { href } = this.$router.resolve({
        path: myPath
      })
      window.open(
        href,
        '招标信息' + row.id ? row.id : row.zbxx_id + row.bt ? row.bt : row.xmmc
      )
    },
    colse() {
      this.$emit('closeDialog')
      this.$emit('changeTbaleList')
    },
    changeZZyq(val, arr) {
      this.proNotOnline.zzyq = val //OK的
      this.zzyqArr = arr
    },
    getAreaType() {
      let obj = {
        type: '招中标'
      }
      this.axios.post('/firm/Firm_Search/getAreaType', obj, data => {
        this.ssdqList = data
      })
    },
    resetFormData() {
      this.$confirm('此操作将重置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.resetForm()
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    resetForm() {
      this.$refs.form.resetFields()
    },

    getZzyqData() {
      this.axios.post('/firm/Firm_search/getQualiDict', {}, data => {
        this.zzyqList = data.rows
      })
    },
    getProvinceCity() {
      this.axios.post('/index/common/getProvinceCity', {}, data => {
        this.xmdqList = data
        this.xmdqList.forEach((item, index) => {
          if (
            item.label == '天津市' ||
            item.label == '北京市' ||
            item.label == '重庆市' ||
            item.label == '台湾省' ||
            item.label == '香港特别行政区' ||
            item.lable == '澳门特别行政区' ||
            item.label == '南海诸岛'
          ) {
            this.$set(item, 'children', undefined)
          }
        })
      })
    },
    addXmDalite() {
      if (this.proNotOnline.xmmc == '') {
        this.$message('请填写项目名称')
      }
      if (this.proNotOnline.xmmc.length < 2) {
        this.$message('项目名称最少两个字')
      } else {
        this.getiProjectSave()
      }
    },
    getiProjectSave(index) {
      localStorage.setItem('xmmc', this.proNotOnline.xmmc)
      localStorage.setItem('area', this.proNotOnline.xmdq)
      localStorage.setItem('owner', this.proNotOnline.xmyz)
      localStorage.setItem('zzyq', JSON.stringify(this.proNotOnline.zzyq))
      localStorage.setItem('ryyq', this.proNotOnline.ryyq)
      localStorage.setItem('yjyq', this.proNotOnline.yjyq)
      localStorage.setItem('qtyq', this.proNotOnline.qtyq)
      localStorage.setItem('zzyqState', this.zzyqState)
      localStorage.setItem('ryyqState', this.ryyqState)
      localStorage.setItem('yjyqState', this.yjyqState)
      localStorage.setItem('qtyqState', this.qtyqState)
      localStorage.setItem('zzyq_txt', JSON.stringify(this.zzyqArr))
      console.log(localStorage.ryyqState)
      let obj = {
        service_id: this.proNotOnline.service_id,
        jbxx_id: this.proNotOnline.jbxx_id,
        company_id: this.proNotOnline.company_id,
        user_id: this.proNotOnline.user_id,
        xmmc: this.proNotOnline.xmmc,
        area: this.proNotOnline.area,
        xmyz: this.proNotOnline.xmyz,
        role: this.proNotOnline.role,
        zzyq: this.proNotOnline.zzyq,
        ryyq: this.proNotOnline.ryyq,
        yjyq: this.proNotOnline.yjyq,
        qtyq: this.proNotOnline.qtyq,
        zzyq_txt: JSON.stringify(this.zzyqArr)
      }
      this.axios.post('/index/project/projectSave', obj, data => {
        this.zzyqState = false
        this.ryyqState = false
        this.yjyqState = false
        this.qtyqState = false
        this.resetForm()
        this.zzyq_txt = ''
        if (data.status === 'success') {
          this.$message.success('添加成功')
          let arr = JSON.stringify(this.zzyqArr)
          localStorage.setItem('zzyqArr', arr)
          if (this.clickArr[index] === 0) {
            this.clickArr.splice(index, 1, 1)
          } else {
            this.clickArr.splice(index, 1, 0)
          }
          this.$emit('changeTbaleList')
          this.$emit('closeDialog')
          localStorage.setItem('isExist', true)
        } else {
          this.$message({
            message: data.message,
            type: 'danger'
          })
          if (data.message == '该项目已存在') {
            this.proNotOnline.xmmc = localStorage.getItem('xmmc')
            this.proNotOnline.xmdq = localStorage.getItem('area')
            this.proNotOnline.xmyz = localStorage.getItem('owner')
            this.proNotOnline.zzyq = JSON.parse(localStorage.getItem('zzyq'))
            this.proNotOnline.ryyq = localStorage.getItem('ryyq')
            this.proNotOnline.yjyq = localStorage.getItem('yjyq')
            this.proNotOnline.qtyq = localStorage.getItem('qtyq')
            if (localStorage.getItem('zzyqState') == 'false') {
              this.zzyqState = false
            } else {
              this.zzyqState = true
            }
            if (localStorage.getItem('ryyqState') == 'false') {
              this.ryyqState = false
            } else {
              this.ryyqState = true
            }
            if (localStorage.getItem('yjyqState') == 'false') {
              this.yjyqState = false
            } else {
              this.yjyqState = true
            }
            if (localStorage.getItem('qtyqState') == 'false') {
              this.qtyqState = false
            } else {
              this.qtyqState = true
            }
            // this.zzyqState = localStorage.getItem("zzyqState");
            // this.ryyqState = localStorage.getItem("ryyqState");
            // this.yjyqState = localStorage.getItem("yjyqState");
            // this.qtyqState = localStorage.getItem("qtyqState");
            // this.zzyqArr = localStorage.getItem("zzyq_txt");
            // localStorage.setItem("isExist", true);
          }
        }
      })
    },
    addXm() {
      this.activeName = 'first'
      this.checkList = []
      this.searchData.page = 1
      this.total = 0
      this.searchData.xmmc = ''
      this.searchData.zblx = ''
      this.searchData.zblb = ''
      this.searchData.xmlb = ''
      // this.searchData.area = ''
      this.searchData.province = ''
      this.searchData.city = ''
      this.searchData.date = ''
      this.zzyqState = false
      this.ryyqState = false
      this.yjyqState = false
      this.qtyqState = false
      this.resetForm()
      this.ajax_list()
    },
    onChild_row(val) {
      this.dialogDrVisible = false
      this.table_xm.page = 1
      this.table_xm.activeBtn = val
      this.fn_stageNum()
      this.tableXm()
      // this.$emit('onChild_row')
    },
    // 点击搜索
    onSearch() {
      this.searchData.page = 1
      this.total = 0
      this.ajax_list()
    },
    onReset() {
      this.searchData.page = 1
      this.total = 0
      this.searchData.zblx = ''
      this.$refs.form1.resetFields()
      this.$refs.form2.resetFields()
      this.proOnline.xmdq = []
      this.searchData.province = ''
      this.searchData.city = ''
      this.ajax_list()
    },
    // 导入
    onClick_import(data) {
      data.row.cs = `四川省/${data.row.cs}`
      let types = this.types
      let obj = {
        zbxx_id: data.row.id,
        user_id: this.$store.state.userInfo.user_id,
        area: data.row.cs,
        fbsj: data.row.fbsj,
        bm_jzrq: data.row.jzrq,
        tb_jzrq: data.row.tb_jzrq,
        xmyz: data.row.xmyz,
        xmmc: data.row.bt,
        type: 'import',
        company_id: localStorage.getItem('company_id'),
        username: localStorage.getItem('username'),
        gsmc: localStorage.getItem('qymc'),
        gs_id: localStorage.getItem('gs_id'),
        xmlx: data.row.xmlx
      }
      this.proNotOnline.newObj = obj
      this.axios.post(
        '/index/project/projectSave',
        {
          jbxx_id: '',
          service_id: this.proNotOnline.service_id,
          company_id: this.proNotOnline.company_id,
          user_id: this.$store.state.userInfo.user_i,
          xmmc: this.proNotOnline.newObj.xmmc,
          area: this.proNotOnline.newObj.area,
          zbxx_id: this.proNotOnline.newObj.zbxx_id,
          fbsj: this.proNotOnline.newObj.fbsj,
          tb_jzrq: this.proNotOnline.newObj.tb_jzrq,
          bm_jzrq: this.proNotOnline.newObj.bm_jzrq,
          xmyz: data.row.xmyz
        },
        data => {
          if (data.status == 'success') {
            this.$message.success('导入成功')
          } else {
            this.$message.danger(data.message)
          }
          this.$emit('changeTbaleList')
          // this.$emit('closeDialog')
          this.ajax_list()
        }
      )
    },
    // 招标分页
    handleSizeChange(val) {
      this.searchData.page = val
      this.ajax_list()
    },
    // 请求获取招标列表
    ajax_list(tag) {
      return
      if (tag != '导入') {
        // 为了页面保持高度
        this.tablaData = []
      }
      this.loading = true
      let ajax_data = JSON.parse(JSON.stringify(this.searchData))
      ajax_data.company_id = localStorage.getItem('company_id')

      if (ajax_data.zblb == '全部') {
        ajax_data.zblb = ''
      }
      if (ajax_data.date) {
        ajax_data.min_date = ajax_data.date[0] || ''
        ajax_data.max_date = ajax_data.date[1] || ''
      } else {
        ajax_data.min_date = ''
        ajax_data.max_date = ''
      }
      delete ajax_data.date
      if (ajax_data.area == '不限制') {
        ajax_data.area = ''
      }
      ajax_data.zblx = this.searchData.zblx
      if (this.thisPageName == 'qyfwqPage') {
        ajax_data.service_id = this.$route.query.login_service_id
      }
      this.axios.post('/index/Project/tenderNotice', ajax_data, data => {
        this.loading = false
        this.tablaData = data.rows
        this.swtotle = data.total || 0
        this.count = data.count
      })
    },
    changeListData(val) {
      for (let i = 0; i < val.length; i++) {
        if (val[1]) {
          if (this.activeName == 'second') {
            this.proOnline.area = `${val[0]}/${val[1]}`
          } else {
            this.proNotOnline.area = `${val[0]}/${val[1]}`
          }
        } else {
          if (this.activeName == 'second') {
            this.proOnline.area = `${val[0]}`
          } else {
            this.proNotOnline.area = `${val[0]}`
          }
        }
      }
      if (this.activeName == 'second') {
        let pass = this.proOnline.area.split('/')
        this.searchData.province = pass[0]
        this.searchData.city = pass[1]
        this.onSearch()
      }
    }
  }
}
</script>
<style lang='less' scoped>
.el-cascader-menu__wrap {
  height: 350px;
}
#myHeader {
  height: 90px;
  background-color: #4999e0;
  div {
    width: 70%;
    line-height: 90px;
    margin: 0 auto;
    span {
      font-size: 20px;
      font-weight: 500;
      margin-left: 10px;
      color: white;
    }
    span:first-child {
      font-size: 18px;
    }
  }
}
#mySection {
  padding-top: 20px;
  width: 70%;
  margin: 0 auto;
}
.qyztbTable {
  header {
    width: 100%;
  }
}
.changeBtnTxt {
  display: inline-block;
  text-align: center;
  height: 40px;
  width: 120px;
  line-height: 40px;

  vertical-align: middle;
  // border: 1px solid #d5d5d5;
  cursor: pointer;
}
.active {
  border-radius: 5px;
  background-color: #409eff;
  color: white;
}
#seacherRow {
  text-align: right;
  //   display: flex;
  & > div {
    display: inline-block;
  }
}
.normal {
  background-color: white;
  color: black;
}
.fwconcent {
  color: #409eff;
}
.link_color {
  color: #409eff;
  cursor: pointer;
}
</style>