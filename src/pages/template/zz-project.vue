<template>
  <!-- 资质搜索下的业绩条件 -->
  <div class="zz-project" v-loading='loading'>
    <el-form :inline="true" :model="form" class="zz-project-form" size="small">
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
            <el-input v-model="form.xmmc" placeholder="项目名称" class="normal1-input" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资金范围">
            <el-input v-model="form.minMoney" placeholder="资金范围" class="normal-input" clearable></el-input>
            <span class="normal-line">-</span>
            <el-input v-model="form.maxMoney" placeholder="资金范围" class="normal-input" clearable></el-input>
            <span class="normal-text">万元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="中标日期">
            <el-date-picker :picker-options="pickerOptionsZbStart" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.minZbrq" class="normal-input"></el-date-picker>
            <span class="normal-line">-</span>
            <el-date-picker :picker-options="pickerOptionsZbEnd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.maxZbrq" class="normal-input"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开工日期">
            <el-date-picker :picker-options="pickerOptionsKgStart" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.minKgrq" class="normal-input"></el-date-picker>
            <span class="normal-line">-</span>
            <el-date-picker :picker-options="pickerOptionsKgEnd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.maxKgrq" class="normal-input"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="竣工日期">
            <el-date-picker :picker-options="pickerOptionsJgStart" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.minJgrq" class="normal-input"></el-date-picker>
            <span class="normal-line">-</span>
            <el-date-picker :picker-options="pickerOptionsJgEnd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.maxJgrq" class="normal-input"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目类型">
            <el-select v-model="form.xmlx" placeholder="项目类型" class="normal1-input" clearable>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      sourceList: ['全国建筑市场'],
      xmlxList: [],
      apt_id: '',
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
    this.apt_id = localStorage.getItem('apt_id') || ''
    this.handleGetProType()
  },
  methods: {
    handleGetProType() {
      let that = this
      let data = {
        source: this.sourceVal //切换来源时要重新请求
      }
      this.axios.post('/firm/Apt_Per_Pro_Search/getProType', data, res => {
        if (res.status === 'success') {
          this.xmlxList = res.rows
          this.getCond()
        }
      })
    },
    getCond() {
      let that = this
      const params = {
        apt_id: that.apt_id,
        query_cate: 'pro'
      }
      this.axios.post('/firm/Apt_Per_Pro_Search/getCond', data, res => {
        if (res.status === 'success') {
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
      if (
        !this.form.xmlx &&
        !this.form.xmmc &&
        !this.form.minMoney &&
        !this.form.maxMoney &&
        !this.form.minZbrq &&
        !this.form.maxZbrq &&
        !this.form.minKgrq &&
        !this.form.maxKgrq &&
        !this.form.minJgrq &&
        !this.form.maxJgrq 
        // &&
        // this.from != 'list'
      ) {
        this.$message.error('请输入搜索条件')
        return
      }
      this.loading = true
      return
      this.axios.post(
        '/firm/Apt_Per_Pro_Search/proSearch',
        data,
        res => {
          this.loading = true
          if (res.status == 'success') {
            // 运行成功将标志存入缓存
            let achiSearch = {
              name: '业绩',
              index: 1
            }
            let personSearch = uni.getStorageSync('personSearch')
            if (personSearch) {
              //有人员
              achiSearch.index = 2
            }
            uni.setStorageSync('achiSearch', achiSearch)
            uni.removeStorageSync('zzSearch_yj_map')
            uni.removeStorageSync('zzSearch_yj_bar')
            uni.setStorageSync('zzPackOrder', this.zzPackOrder)
            uni.$emit('zzAddSearchBack', 'zzYjSearch')
          } else {
            this.$message.error('运行失败，请重新搜索')
          }
        },
        err => {
          this.loading = true
          this.$message.error('运行失败，请重新搜索')
        }
      )
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
    }
  }
}
</script>

<style lang="less" scoped>
.zz-project {
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
