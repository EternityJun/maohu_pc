<template>
  <!-- 资质搜索下的业绩条件 -->
  <div class="zz-fit-yj" v-loading='loading'>
    <el-form :inline="true" :model="form" class="zz-fit-yj-form" size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="数据来源">
            <el-select v-model="form.sourceVal" placeholder="数据来源" class="normal1-input">
              <el-option v-for="(item,i) in sourceList" :key="i" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input v-model="form.xmmc" placeholder="项目名称" class="normal1-input" clearable @keyup.enter.native="getSearchYj()" @clear='getSearchYj'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资金范围">
            <el-input v-model="form.minMoney" placeholder="资金范围" class="normal-input" clearable @keyup.enter.native="getSearchYj()" @clear='getSearchYj'></el-input>
            <span class="normal-line">-</span>
            <el-input v-model="form.maxMoney" placeholder="资金范围" class="normal-input" clearable @keyup.enter.native="getSearchYj()" @clear='getSearchYj'></el-input>
            <span class="normal-text">万元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="中标日期">
            <el-date-picker :picker-options="pickerOptionsZbStart" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.minZbrq" class="normal-input" @change="getSearchYj" @clear='getSearchYj'></el-date-picker>
            <span class="normal-line">-</span>
            <el-date-picker :picker-options="pickerOptionsZbEnd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.maxZbrq" class="normal-input" @change="getSearchYj" @clear='getSearchYj'></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开工日期">
            <el-date-picker :picker-options="pickerOptionsKgStart" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.minKgrq" class="normal-input" @change="getSearchYj" @clear='getSearchYj'></el-date-picker>
            <span class="normal-line">-</span>
            <el-date-picker :picker-options="pickerOptionsKgEnd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.maxKgrq" class="normal-input" @change="getSearchYj" @clear='getSearchYj'></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="竣工日期">
            <el-date-picker :picker-options="pickerOptionsJgStart" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.minJgrq" class="normal-input" @change="getSearchYj" @clear='getSearchYj'></el-date-picker>
            <span class="normal-line">-</span>
            <el-date-picker :picker-options="pickerOptionsJgEnd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.maxJgrq" class="normal-input" @change="getSearchYj" @clear='getSearchYj'></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目类型">
            <el-select v-model="form.xmlx" placeholder="项目类型" class="normal1-input" clearable @change="getSearchYj" @clear='getSearchYj'>
              <el-option v-for="(item,i) in xmlxList" :key="i" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align:center">
          <el-form-item size="middle">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="" @click="onReset">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="yjList" border v-loading="loadingTb">
      <el-table-column type="index" width="60" align="center" label="序号">
        <template slot-scope="scope">
          <div>{{(scope.$index+1)+(page-1)*10}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="项目名称">
        <template slot-scope="scope">
          <div class="link_color" @click="openYj(scope.row)">{{scope.row.proj_name}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="proj_type" label="项目类型"></el-table-column>
      <el-table-column align="center" prop="money" label="金额(万元)"></el-table-column>
      <el-table-column align="center" prop="proj_date" label="日期"></el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:20px" @current-change="pageSizeChange" align="right" background layout="total,prev, pager, next" :total="yjTotal"></el-pagination>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loadingTb: false,
      sourceList: ['全国建筑市场'],
      xmlxList: [],
      apt_id: '1127',
      gs_id: '14411',
      cate: '', //全部 四川 入川
      form: {
        sourceVal: '全国建筑市场',
        xmmc: '',
        minMoney: '',
        maxMoney: '',
        minZbrq: '',
        maxZbrq: '',
        minKgrq: '',
        maxKgrq: '',
        minJgrq: '',
        maxJgrq: '',
        xmlx: ''
      },
      page: 1,
      rows: 10,
      yjList: [],
      yjTotal: 0,
      pickerOptionsZbStart: {
        disabledDate: time => {
          let endDateVal = this.form.maxZbrq
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsZbEnd: {
        disabledDate: time => {
          let beginDateVal = this.form.minZbrq
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      },
      pickerOptionsKgStart: {
        disabledDate: time => {
          let endDateVal = this.form.maxKgrq
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsKgEnd: {
        disabledDate: time => {
          let beginDateVal = this.form.minKgrq
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      },

      pickerOptionsJgStart: {
        disabledDate: time => {
          let endDateVal = this.form.maxJgrq
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsJgEnd: {
        disabledDate: time => {
          let beginDateVal = this.form.minJgrq
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      }
    }
  },
  created() {
    // this.apt_id = localStorage.getItem('apt_id') || ''
    this.handleGetProType()
  },
  methods: {
    handleGetProType() {
      let that = this
      let data = {
        source: this.form.sourceVal //切换来源时要重新请求
      }
      this.axios.post('/firm/Apt_Per_Pro_Search/getProType', data, res => {
        if (res.status == 'success') {
          that.xmlxList = res.rows
          console.log(res.status == 'success')
          that.getSearchYj()
          console.log(0)
        }
      })
    },

    onSubmit() {
      console.log(JSON.stringify(this.form))
      let that = this
      let data = {
        apt_id: this.apt_id, // 公司集表id
        cond: {
          xmmc: this.form.xmmc, // 项目名称
          minMoney: this.form.minMoney, // 最小金额
          maxMoney: this.form.maxMoney, // 最大金额
          minZbgsTime: this.form.minZbrq, // 最小中标日期
          maxZbgsTime: this.form.maxZbrq, // 最大中标日期
          minKgsjTime: this.form.minKgrq, // 最小开工日期
          maxKgsjTime: this.form.maxKgrq, // 最大开工日期
          minJgsjTime: this.form.minJgrq, // 最小竣工日期
          maxJgsjTime: this.form.maxJgrq, // 最大竣工日期
          projectType: this.form.xmlx, // 项目类型(单选)
          source: this.form.sourceVal // 数据来源(目前只有全国建筑市场)
        }
      }
      if (
        (this.form.minMoney && isNaN(parseFloat(this.form.minMoney))) ||
        (this.form.maxMoney && isNaN(parseFloat(this.form.maxMoney)))
      ) {
        this.$message.error('资金只能是数字')
        return
      }
      if (parseFloat(this.form.maxMoney) < parseFloat(this.form.minMoney)) {
        this.$message.error('最大金额不能小于最小金额')
        return
      }
      this.getSearchYj()
    },
    onReset() {
      this.form.xmmc = ''
      this.form.minMoney = ''
      this.form.maxMoney = ''
      this.form.minZbrq = ''
      this.form.maxZbrq = ''
      this.form.minKgrq = ''
      this.form.maxKgrq = ''
      this.form.minJgrq = ''
      this.form.maxJgrq = ''
      this.form.xmlx = ''
      this.page = 1
      this.getSearchYj()
    },
    pageSizeChange(page) {
      this.page = page
      this.getSearchYj()
    },
    getSearchYj() {
      let that = this
      let params = {
        apt_id: this.apt_id,
        gs_id: this.gs_id, //          公司集表id
        xmmc: this.form.xmmc, // 项目名称
        minMoney: this.form.minMoney, // 最小金额
        maxMoney: this.form.maxMoney, // 最大金额
        minZbgsTime: this.form.minZbrq, // 最小中标日期
        maxZbgsTime: this.form.maxZbrq, // 最大中标日期
        minKgsjTime: this.form.minKgrq, // 最小开工日期
        maxKgsjTime: this.form.maxKgrq, // 最大开工日期
        minJgsjTime: this.form.minJgrq, // 最小竣工日期
        maxJgsjTime: this.form.maxJgrq, // 最大竣工日期
        projectType: this.form.xmlx, // 项目类型(单选)
        source: this.form.sourceVal, // 数据来源(目前只有全国建筑市场)
        page: this.page,
        rows: this.rows
      }
      this.loadingTb = true
      this.axios.post(
        '/firm/Apt_Per_Pro_Search/proList',
        params,
        data => {
          this.loadingTb = false
          this.yjList = data.rows || []
          this.yjTotal = data.total || 0
        },
        err => {
          this.loadingTb = false
          this.$message.error('加载失败')
        }
      )
    },
    openYj(row) {
      let source = ''
      if (row.remark == '全国建筑市场') {
        source = 'jzsc'
      } else if (row.remark == '四川省建设厅') {
        source = 'jst'
      } else if (row.remark == '全国公路市场') {
        source = 'gl'
      } else if (row.remark == '全国水利市场') {
        source = 'sl'
      } else {
        let { href } = this.$router.resolve({
          path: `/enterpriseDetails?login_service_id=&gsmc=${this.$route.query.qymc}&zbxx_id=${row.zbxx_id ||
            ''}&zbgs_id=${row.proj_id || ''}&xmmc=${
            row.proj_name
          }&type=zbgs&source=${row.source}`
        })
        window.open(
          href,
          '中标公示' + row.proj_id + row.zbxx_id + row.proj_name
        )
        return
      }
      let { href } = this.$router.resolve({
        path: `/yjDet?login_service_id=${
          this.$route.query.login_service_id
        }&qymc=${this.$route.query.qymc}&proj_id=${
          row.proj_id
        }&source=${source}`
      })
      window.open(href, '业绩详情' + row.proj_name + row.proj_id + source)
    }
  }
}
</script>

<style lang="less" scoped>
.zz-fit-yj {
  padding-left: 25px;
  .normal1-input {
    width: 290px;
  }
  .normal-input {
    width: 130px;
  }
  .normal-line {
    display: inline-block;
    width: 22px;
    text-align: center;
    color: #999;
  }
  .normal-text {
    display: inline-block;
    width: 50px;
    text-align: center;
    color: #999;
  }
}
</style>
