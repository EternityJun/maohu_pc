<template>
  <div style="padding:0 20px">
    <div v-if="types == '匹配列表'" style="padding-bottom:20px">
      <span>匹配名称:</span>
      <span style="font-weight:bold">{{row.xmmc}}</span>
    </div>
    <el-form inline ref="form1" :model="searchData" @submit.native.prevent>
      <el-form-item label="项目名称" prop="xmmc">
        <el-input style="width:400px" @keyup.enter.native="onSearch" v-model="searchData.xmmc" placeholder="输入项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="招标类别" prop="zblb">
        <el-select v-model="searchData.zblb" clearable style="width:400px">
          <el-option v-for="one in zblblist" :key="one" :value="one" :label="one"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目类别" prop="xmlb">
        <el-select v-model="searchData.xmlb" clearable @change="onSearch" style="width:400px">
          <el-option v-for="one in xmlblist" :key="one.label" :value="one.value" :label="one.label"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form inline ref="form2" :model="searchData" @submit.native.prevent>
      <el-form-item label="所属地区" prop="area">
        <el-select v-model="searchData.area" clearable style="width:400px">
          <el-option v-for="one in this.ssdqList" :key="one" :value="one" :label="one"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布日期" prop="date">
        <el-date-picker value-format="yyyy-MM-dd" v-model="searchData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:400px"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100px" @click="onSearch">搜索</el-button>
        <el-button type="" style="width:100px" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tablaData" v-loading="loading" border>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{scope.$index+(searchData.page-1)*10+1}}</template>
      </el-table-column>
      <el-table-column prop="bt" label="项目名称" align="center">
        <template slot-scope="scope">
          <div  v-html="scope.row.bt" class="link_color" @click="openGs(scope.row)">{{scope.row.bt}}</div>
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
          <el-button disabled v-if="scope.row.is_import == '已导入'" style="color:#d1d1d1" size="mini">已导入</el-button>
          <el-button disabled v-else-if="scope.row.is_import == '已过期'" style="color:#d1d1d1" size="mini">已过期</el-button>
          <el-button v-else size="mini" @click="onClick_import(scope)">导入</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination ref="fenye" style="margin-top:20px" @current-change="handleSizeChange" align="right" background layout="total,prev, pager, next" :total="total"></el-pagination>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    types: String,
    row: null
  },
  data() {
    name:"ItemImport"
    return {
      loading: false,
      zblblist: ['全部', '公招', '比选', '采购'],
      // xmlblist: ["全部","建筑工程", "公路", "市政", "水利", "其他"],
      xmlblist: [
        { value: '', label: '全部' },
        { value: '建筑工程', label: '建筑工程' },
        { value: '公路', label: '公路' },
        { value: '市政', label: '市政' },
        { value: '其他', label: '其他' }
      ],
      ssdqList: [],
      total: 0,
      searchData: {
        xmmc: '',
        zblb: '',
        xmlb: '',
        area: '',
        date: '',
        page: 1,
        rows: 10
      },
      //列表数据
      tablaData: []
    }
  },
  watch: {
    row() {
      this.searchData.xmmc = this.row.xmmc
      this.ajax_list()
    }
  },
  created() {
    if (this.types == '匹配列表') {
      this.searchData.xmmc = this.row.xmmc
    }
    this.axios.post('http://www.520coc.cn/Qymcs/get_area_cs', {}, data => {
      this.ssdqList = data.map(v => v.Name)
    })
    this.ajax_list()
  },
  methods: {
    openGs(row) {
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?zbxx_id=${
          row.id
        }&zbgs_id=&type=zbxx&xmmc=${row.bt}&source=${row.source}`
      })
      window.open(href, '招标信息' + row.id + row.bt)
    },
    //点击搜索
    onSearch() {
      this.searchData.page = 1
      this.total = 0
      this.ajax_list()
    },
    onReset() {
      this.searchData.page = 1
      this.total = 0
      this.$refs.form1.resetFields()
      this.$refs.form2.resetFields()
      this.ajax_list()
    },
    //导入
    onClick_import(data) {
      let types = this.types
      let obj = {
        zbxx_id: data.row.id,
        user_id: this.$store.state.userInfo.user_id,
        area: data.row.cs,
        fbrj: data.row.fbrj,
        bm_jzrq: data.row.jzrq,
        tb_jzrq: data.row.tb_jzrq,
        xmmc: data.row.bt,
        type: 'import',
        company_id: localStorage.getItem('company_id'),
        username: localStorage.getItem('username'),
        gsmc: localStorage.getItem('qymc'),
        gs_id:localStorage.getItem('gs_id'),
        xmlx: data.row.xmlx
      }
      if (types == '业绩详情') {
        obj.jbxx_id = this.$route.query.jbxx_id
      } else if (types == '匹配列表') {
        obj.jbxx_id = this.row.id
      }
      this.$confirm(
        `项目名称:${data.row.bt}</br>发布日期:${
          data.row.fbsj
        }</br>报名截止日期:${data.row.jzrq}</br>投标截止日期:${
          data.row.tb_jzrq
        }`,
        '请您认真确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }
      )
        .then(() => {
          this.loading = true
          this.axios.post('/index/project/addProject', obj, data => {
            this.loading = false
            if (data.status == 'success') {
              this.$message({
                showClose: true,
                message: '成功',
                type: 'success'
              })
              this.ajax_list('导入')
              this.$emit('onChild_row', data.message)
            } else {
              this.$message({
                showClose: true,
                message: data.message,
                type: 'error'
              })
            }
          })
        })
        .catch(() => {})
    },
    //招标分页
    handleSizeChange(val) {
      this.searchData.page = val
      this.ajax_list()
    },

    //请求获取招标列表
    ajax_list(tag) {
      if (tag != '导入') {
        //为了页面保持高度
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
      this.axios.post('/index/Project/tenderNotice', ajax_data, data => {
        this.loading = false
        this.tablaData = data.rows
        this.total = data.total || 0
      })
    }
  }
}
</script>
<style lang="less" scoped>
.link_color {
    color: rgb(58, 142, 230);
    cursor: pointer;
}
</style>


