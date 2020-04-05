<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="" style="padding-left:0px">
                    <el-form :inline="true" :model="form" class="demo-form-inline">
                        <el-form-item label="地区">
                            <el-select v-model="form.xmdq" placeholder="不限制" clearable style="width:300px">
                                <el-option v-for="item in cate.xmdq" :key="item.id" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="日期">
                            <div style="width:400px;display:flex;">
                                <div>
                                    <el-date-picker :picker-options="pickerOptionsStart" style="width:100%;" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.min_date"></el-date-picker>
                                </div>
                                <div class="line">-</div>
                                <div>
                                    <el-date-picker :picker-options="pickerOptionsEnd" style="width:100%;" type="date" value-format="yyyy-MM-dd" placeholder="选择时间" v-model="form.max_date"></el-date-picker>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="金额">
                            <el-input v-model="form.money" style="width:250px;" clearable>
                                <template slot="append">万元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="项目类型">
                            <el-select v-model="form.xmlxB" placeholder="不限制" multiple collapse-tags style="width:300px;">
                                <el-option v-for="item in cate.xmlxB" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="企业类型">
                            <el-select v-model="form.scale" placeholder="不限制" >
                                <el-option label="不限制" value=""></el-option>
                                <el-option label="川内企业" value="1"></el-option>
                                <el-option label="入川企业" value="2"></el-option>
                            </el-select>
                        </el-form-item> -->
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="form" class="demo-form-inline" @submit.native.prevent>
                    <el-form-item>
                        <el-select v-model="form.scxw1" placeholder="该时间内投标记录不限制" clearable class='select'>
                            <el-option label="该时间内有投标记录√" value="1"></el-option>
                            <el-option label="该时间内没有投标记录×" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.scxw2" placeholder="历年在该地区投标记录不限制" clearable class='select'>
                            <el-option label="历年在该地区有投标记录√" value="1"></el-option>
                            <el-option label="历年在该地区没有投标记录×" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.scxw3" placeholder="近18个月在该地区投标记录不限制" clearable class='select' style="width:260px">
                            <el-option label="近18个月在该地区有投标记录√" value="1"></el-option>
                            <el-option label="近18个月在该地区没有投标记录×" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.zssl1" placeholder="参与项目金额不限制" clearable class='select' style="width:222px;">
                            <el-option label="参与项目大于金额√" value="1"></el-option>
                            <el-option label="参与项目小于金额×" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.zssl2" placeholder="所有业绩金额不限制" clearable class='select' style="width:223px;">
                            <el-option label="所有业绩大于金额√" value="1"></el-option>
                            <el-option label="所有业绩小于金额×" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.ywfx" placeholder="企业类型项目不限制" clearable class='select'>
                            <el-option label="企业参加过此类型项目√" value="1"></el-option>
                            <el-option label="企业未参加过类型项目×" value="0"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item style="text-align:center;width:100%;margin-bottom:10px;">
                        <el-button type="primary" @click="onSubmit('sure')">保存</el-button>
                        <el-button type="" @click="onCancel()">取消</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.form.max_date
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.form.min_date
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      },
      cate: {},
      form: {
        xmdq: '',
        min_date: '',
        max_date: '',
        money: '',
        xmlxB: [],
        scale: '',
        scxw1: '',
        scxw2: '',
        scxw3: '',
        zssl1: '',
        zssl2: '',
        ywfx: ''
      },
      update: true
    }
  },

  mounted() {
    this.p_data = JSON.parse(this.data)
    console.log(this.p_data)
    // this.jbxx_id = this.p_data.jbxx_id
    // this.thread_id = this.p_data.thread_id
    // this.gsgj_id = this.p_data.gsgj_id
    this.form.xmdq = this.p_data.xmdq
    this.form.xmlxB = this.p_data.xmlxB
    this.form.max_date = this.p_data.max_date
    this.form.min_date = this.p_data.min_date
    this.form.money = this.p_data.money
    this.form.scxw1 = this.p_data.scxw1
    this.form.scxw2 = this.p_data.scxw2
    this.form.scxw3 = this.p_data.scxw3
    this.form.zssl1 = this.p_data.zssl1
    this.form.zssl2 = this.p_data.zssl2
    this.form.ywfx = this.p_data.ywfx

    this.fn_cate()
    // this.companySet()
  },
  watch: {
    data: function() {}
  },
  methods: {
    onCancel() {
      this.$emit('closeDialog', 'gsgj')
    },
    isUpdate() {
      let params = {
        thread_id: this.thread_id
      }
      this.axios.post('/index/thread/isUpdate', params, data => {
        this.update = data.update
      })
    },
    companySet(jbxx_id) {
      //公司工具
      this.axios.post(
        '/index/task/companySet',
        { jbxx_id: this.jbxx_id, thread_id: this.thread_id, id: this.gsgj_id },
        data => {
          this.form.xmdq = data.xmdq
          this.form.money = data.money
          this.form.min_date = data.minDate
          this.form.max_date = data.maxDate
          this.form.xmlxB = data.xmlx || []
        }
      )
    },
    fn_cate() {
      this.axios.post('/index/project/cate', {}, data => {
        this.cate = data
      })
    },
    onSubmit(type) {
      //   console.log(this.form)
      if (
        type == 'sure' &&
        (!this.form.max_date &&
          !this.form.min_date &&
          !this.form.money &&
          !this.form.xmdq &&
          this.form.xmlxB.length == 0 &&
          !this.form.scxw1 &&
          !this.form.scxw2 &&
          !this.form.scxw3 &&
          !this.form.zssl1 &&
          !this.form.zssl2 &&
          !this.form.ywfx)
      ) {
        this.$message.error('未设置公司工具条件')
        return
      }
      this.$emit('fnGsgj', { type, data: type == 'cancel' ? {} : this.form })
    }
  }
}
</script>

<style>
.success {
  color: rgb(103, 194, 58);
}
.error {
  color: red;
}
</style>

<style lang="less" scoped>
.line {
  width: 30px;
  text-align: center;
}
.select {
  width: 236px;
}
</style>
