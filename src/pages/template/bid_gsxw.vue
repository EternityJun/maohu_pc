<template>
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline" label-width="70px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="业主">
            <el-input v-model="form.xmyz" placeholder="业主" style="width:400px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="地区">
            <el-select v-model="form.area" collapse-tags multiple placeholder="不限制" style="width:300px;">
              <el-option v-for="item in cate.xmdq" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select v-model="form.xmlx" placeholder="不限制" style="width:120px;" clearable>
              <el-option v-for="(item,index) in xmlx" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <p>
              <el-date-picker :picker-options="pickerOptionsStart" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.minTime" style="width: 150px;"></el-date-picker>
              <span class="line">-</span>
              <el-date-picker :picker-options="pickerOptionsEnd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.maxTime" style="width: 150px;"></el-date-picker>
            </p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="金额">
            <el-input v-model="form.minMoney" style="width:194px;" clearable>
              <template slot="append">万元</template>
            </el-input>
            <span>-</span>
            <el-input v-model="form.maxMoney" style="width:194px;" clearable>
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="中标次数">
            <el-input v-model="form.minzbNumber" style="width:199px;" clearable>
            </el-input>
            <span>-</span>
            <el-input v-model="form.maxzbNumber" style="width:199px;" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="投标次数">
            <el-input v-model="form.mintbNumber" style="width:199px;" clearable>
            </el-input>
            <span>-</span>
            <el-input v-model="form.maxtbNumber" style="width:199px;" clearable>
            </el-input>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="关键词">
            <el-input v-model.trim="form.key" style="width:400px" clearable placeholder="请输入关键字" @keyup.enter.native="onConfirmKey"></el-input>&nbsp;
            <label class="text_ipt">例：道、路、桥(回车键确定添加)</label>

          </el-form-item>
          <div style="width:90%;padding-left:75px;">
            <el-tag v-for="(tag,index) in form.keys" :key="tag" closable @close="onDelete_yjTag(index)">{{tag}}</el-tag>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item style="text-align:center;width:100%;margin-bottom:0;margin-top:10px;">
            <el-button type="primary" @click="onSubmit('sure')">保存</el-button>
            <el-button type="" @click="onCancel()">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.form.maxTime
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.form.minTime
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      },
      form: {
        key: '',
        keys: [],
        xmlx: '',
        xmyz: '',
        area: [],
        minTime: '',
        maxTime: '',
        maxMoney: '',
        minMoney: '',
        minzbNumber: '',
        maxzbNumber: '',
        mintbNumber: '',
        maxtbNumber: ''
      },
      cate: [],
      xmlx: ['市政工程', '房建工程', '公路工程', '水利工程', '其他工程'],
      thread_id: ''
    }
  },
  created() {
    this.fn_cate()
  },
  mounted() {
    let data = JSON.parse(this.data)
    this.form.xmyz = data.xmyz || ''
    this.form.area = data.area || ''
    this.form.maxTime = data.maxTime || ''
    this.form.minTime = data.minTime || ''
    this.form.mintbNumber = data.mintbNumber || ''
    this.form.maxtbNumber = data.maxtbNumber || ''
    this.form.minzbNumber = data.minzbNumber || ''
    this.form.maxzbNumber = data.maxzbNumber || ''
    this.form.keys = data.keys || []
    this.form.xmlx = data.xmlx || ''
    this.form.minMoney = data.minMoney || ''
    this.form.maxMoney = data.maxMoney || ''
    // this.thread_id = data.thread_id
    // this.gsxw_id = data.gsxw_id
    // this.form.xmyz = data.xmyz
    // this.form.area = data.area.split(',')
    // this.compBehaviorGet()
    console.log(this.form)
    
  },
  methods: {
    fn_cate() {
      this.axios.post('/index/project/cate', {}, data => {
        this.cate = data
      })
    },
    compBehaviorGet() {
      this.axios.post(
        '/index/Analysis_Report/compBehaviorGet',
        { thread_id: this.thread_id, id: this.gsxw_id },
        data => {
          if (data.status == 'success') {
            this.form.xmyz = data.message.xmyz
            this.form.area = data.message.area
              ? data.message.area.split(',')
              : []
            this.form.maxTime = data.message.maxTime 
            this.form.minTime = data.message.minTime
            this.form.tbNumber = data.message.tbNumber || ''
            this.form.zbNumber = data.message.zbNumber || ''

            let xmCondition = JSON.parse(data.message.xmCondition)
            this.form.keys = xmCondition.keys ? xmCondition.keys.contain : []
            this.form.xmlx = xmCondition.xmlx
              ? xmCondition.xmlx.contain.join(',')
              : ''
            this.form.minMoney = xmCondition.minMoney || ''
            this.form.maxMoney = xmCondition.maxMoney || ''
          }

        }
      )
    },
    onSubmit(type) {
      console.log(this.form)
      if (
        type == 'sure' &&
        (!this.form.xmyz &&
          this.form.area.length == 0 &&
          !this.form.xmlx &&
          !this.form.minTime &&
          !this.form.maxTime &&
          !this.form.minMoney &&
          !this.form.maxMoney &&
          !this.form.minzbNumber &&
          !this.form.mintbNumber &&
          !this.form.maxzbNumber &&
          !this.form.maxtbNumber &&
          this.form.keys.length == 0)
      ) {
        this.$message.error('未设置条件')
        return
      }
      this.$emit('fnGsxw', { type, data: type == 'cancel' ? {} : this.form })
    },
    onDelete_yjTag(index) {
      this.form.keys = this.form.keys.filter((v, i) => {
        if (i != index) {
          return v
        }
      })
    },
    //点击回车添加关键词
    onConfirmKey() {
      if (this.form.key) {
        if (!this.form.keys) {
          this.form.keys = []
        }
        var filterArray = this.form.keys.filter((v, i) => {
          if (v == this.form.key) {
            return v
          }
        })
        if (filterArray.length) {
          this.$message({
            showClose: true,
            message: '已经存在该关键字',
            type: 'error'
          })
        } else {
          // this.form.keys.push({
          //   name: this.form.key
          // })
          this.form.keys.push(this.form.key)
          this.form.key = ''
        }
      }
    },
    onCancel(){
      this.$emit('closeDialog','gsxw')
    }
  }
}
</script>
<style scoped>
.text_ipt {
  color: #606266;
  font-size: 14px;
}
.el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
.gjc .el-form-item__content {
  width: 100% !important;
}
</style>
