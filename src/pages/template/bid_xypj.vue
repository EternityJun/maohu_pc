<template>
  <div>
    <div class="tiaojian-content">
      <el-form ref="form" :model="form" label-width="80px" v-if="form.xymc=='水利市场信用' || !form.xymc" @submit.native.prevent>
        <el-form-item label="信用名称">
          <el-select style="width:200px" v-model="form.xymc" placeholder="请选择" clearable @change="changeSelect">
            <el-option v-for="(item,key,index) in xytypes" :key="index" :label="key" :value="key"></el-option>
          </el-select>
          <el-select style="width:200px" v-model="form.xytype" placeholder="请选择" clearable v-show="form.xymc=='水利市场信用'" @change="changeSelect2">
            <el-option v-for="(item,key,index) in xytypes2" :key="index" :label="key" :value="key"></el-option>
          </el-select>
          <el-select style="width:200px" v-model="form.xylast" placeholder="请选择" clearable v-show="form.xymc=='水利市场信用'">
            <el-option v-for="(item,index) in xytypes3" :key="index" :label="item" :value="item">{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="60日排名" v-show=" form.xymc && form.xymc !='水利市场信用' && form.xymc !='公路市场信用'">
          <el-input v-model="form.six_min" style="width:183px"></el-input>
          <span class="line">——</span>
          <el-input v-model="form.six_max" style="width:183px"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmit('sure')">保存</el-button>
          <el-button type="" @click="onCancel()">取消</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px" v-if="form.xymc=='公路市场信用'" @submit.native.prevent>
        <el-form-item label="信用名称">
          <el-select style="width:200px" v-model="form.xymc" placeholder="请选择" clearable @change="changeSelect">
            <el-option v-for="(item,key,index) in xytypes" :key="index" :label="key" :value="key"></el-option>
          </el-select>
          <el-select style="width:200px" v-model="form.xytype" placeholder="请选择" clearable v-if="form.xymc=='公路市场信用'">
            <el-option v-for="(item,index) in xytypes2" :key="index" :label="item" :value="item">{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmit('sure')">确定</el-button>
          <el-button type="" @click="onCancel()">取消</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px" v-if="form.xymc=='成都信用'" @submit.native.prevent>
        <el-form-item label="信用名称">
          <el-select style="width:200px" v-model="form.xymc" placeholder="请选择" clearable @change="changeSelect">
            <el-option v-for="(item,key,index) in xytypes" :key="index" :label="key" :value="key"></el-option>
          </el-select>
          <el-select style="width:200px" v-model="form.xytype" placeholder="请选择" clearable @change="changeSelect3">
            <el-option v-for="(item,index) in cdxy" :key="index" :label="item" :value="item">{{item}}</el-option>
          </el-select>
          <el-select style="width:200px" v-model="form.cd_last" placeholder="请选择" clearable>
            <el-option v-for="(item,index) in xytypes3" :key="index" :label="item" :value="item">{{item}}</el-option>
          </el-select>
          <!-- <el-select style="width:200px" v-model="form.xytype" placeholder="请选择" clearable @change="changeSelect3">
                        <el-option v-for="(item,index) in cdxy" :key="index" :label="item" :value="item">{{item}}</el-option>
                    </el-select> -->
        </el-form-item>
        <el-form-item label="信用得分" v-if="form.xytype=='得分' && form.cd_last">
          大于0分
        </el-form-item>
        <el-form-item label="60日排名" v-if="form.xytype=='排名' && form.cd_last">
          <el-input v-model="form.six_min" style="width:183px"></el-input>
          <span class="line">——</span>
          <el-input v-model="form.six_max" style="width:183px"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmit('sure')">确定</el-button>
          <el-button type="" @click="onCancel()">取消</el-button>
        </el-form-item>
      </el-form>

      <el-form ref="form" :model="form" label-width="80px" v-if="form.xymc=='成都建委信用'" @submit.native.prevent>
        <el-form-item label="信用名称">
          <el-select style="width:200px" v-model="form.xymc" placeholder="请选择" clearable @change="changeSelect">
            <el-option v-for="(item,key,index) in xytypes" :key="index" :label="key" :value="key"></el-option>
          </el-select>
          <el-select style="width:200px" v-model="form.xytype" placeholder="请选择" clearable @change="changeSelect3">
            <el-option v-for="(item,index) in xytypes2" :key="index" :label="item" :value="item">{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="60日排名" v-show="form.xytype">
          <el-input v-model="form.six_min" style="width:183px"></el-input>
          <span class="line">——</span>
          <el-input v-model="form.six_max" style="width:183px"></el-input>
        </el-form-item>
        <el-form-item label="条件关系" label-width="80px" v-show="form.xytype">
          <el-select style="width:120px" v-model="form.orand" placeholder="请选择" clearable>
            <!-- <el-option label="不限制" value=""></el-option> -->
            <el-option label="且" value="且"></el-option>
            <el-option label="或" value="或"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="今日排名" v-show="form.xytype">
          <el-input v-model="form.today_min" style="width:183px"></el-input>
          <span class="line">——</span>
          <el-input v-model="form.today_max" style="width:183px"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmit('sure')">保存</el-button>
          <el-button type="" @click="onCancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataset'],
  data() {
    return {
      form: {
        xymc: '',
        xytype: '',
        xylast: '',
        cd_last: '',
        six_min: '',
        six_max: '',
        today_min: '',
        today_max: '',
        orand: '',
        df: '',
        pmrq: ''
      },
      xytypes: null,
      xytypes2: null,
      xytypes3: null,
      item: '',
      cdxy: [],
      xypj_dataset: [],
      type: ''
    }
  },
  mounted() {
    // console.log(this.dataset)
    this.xypj_dataset = JSON.parse(this.dataset)

    this.getXyTypes()
  },
  methods: {
    onCancel() {
      this.$emit('closeDialog', 'xypj')
    },
    onSubmit(type) {
      let data = {
        item: '',
        sixty: '',
        today: '',
        orand: ''
      }
      let item = ''
      let xytype = this.form.xytype == null ? '' : this.form.xytype
      let xylast = this.form.xylast == null ? '' : this.form.xylast
      let cd_last = this.form.cd_last == null ? '' : this.form.cd_last
      if (this.form.xymc == '水利市场信用') {
        item = this.form.xymc + ',' + xytype + ',' + xylast
      } else if (this.form.xymc == '公路市场信用') {
        item = this.form.xymc + ',' + xytype
      } else if (this.form.xymc == '成都信用') {
        item = this.form.xymc + ',' + cd_last
        if (xytype == '得分') {
          item += ',大于0分'
        } else {
          data.sixty = this.form.six_min + ',' + this.form.six_max
        }
      } else if (this.form.xymc == '成都建委信用') {
        item = this.form.xymc + ',' + xytype
        data.sixty = this.form.six_min + ',' + this.form.six_max
        data.today = this.form.today_min + ',' + this.form.today_max
        data.orand = this.form.orand == null ? '' : this.form.orand
      }
      data.item = item
      if (!data.item && !data.sixty && !data.today && !data.orand) {
        this.$message.error('未设置信用条件')
        return
      }
      // console.log(data)
      this.$emit('fnXypj', data)
    },
    emit_up(type) {
      if (type == 'cancel') {
        this.$emit('fnXypj', 'cancel')
      }
    },
    getXyTypes() {
      this.axios.post('/index/thread/getXyTypes', {}, data => {
        this.xytypes = data.rows
        this.cd_df = data.rows['成都信用']['得分']
        this.cd_pm = data.rows['成都信用']['排名']
        this.xypj_arr = this.xypj_dataset.item.split(',')
        // console.log(this.xypj_arr)
        this.form.six_min = this.xypj_dataset.sixty.split(',')[0] || ''
        this.form.six_max = this.xypj_dataset.sixty.split(',')[1] || ''
        this.form.today_min = this.xypj_dataset.today.split(',')[0] || ''
        this.form.today_max = this.xypj_dataset.today.split(',')[1] || ''
        this.form.orand = this.xypj_dataset.orand || ''
        this.form.xymc = this.xypj_arr[0] ? this.xypj_arr[0] : ''
        this.form.xytype = this.xypj_arr[1] ? this.xypj_arr[1] : ''
        this.form.xylast = this.xypj_arr[2] ? this.xypj_arr[2] : ''

        if (this.form.xymc == '成都信用') {
          if (this.cd_df.indexOf(this.xypj_arr[1]) > -1) {
            this.form.xytype = '得分'
          } else {
            this.form.xytype = '排名'
          }
          this.form.cd_last = this.xypj_arr[1] ? this.xypj_arr[1] : ''
        }
        // console.log(this.cd_df, this.cd_pm)

        this.changeSelect()
      })
    },
    changeSelect(type) {
      // console.log(1)
      let self = this
      let xymc = self.form.xymc
      //   self.form.xytype = ''
      //   self.form.xylast = ''
      //   self.form.cd_last = ''
      for (let v in self.xytypes) {
        if (v == xymc) {
          if (xymc == '成都信用') {
            this.cdxy_type = self.xytypes[v]
            for (let i in self.xytypes[v]) {
              this.cdxy.push(i)
            }
            // if(this.cdxy_type.indexOf(self.form.xytype)==-1){
            //     self.form.xytype=''
            // }
          } else {
            this.cdxy = []
            self.xytypes2 = self.xytypes[v]
            // if(this.xytypes2.indexOf(self.form.xytype)==-1){
            //     self.form.xytype=''
            // }
          }
        }
      }
      this.changeSelect2()
    },
    changeSelect2(type) {
      // console.log(2)
      let self = this
      let xymc = self.form.xytype
      //   self.form.xylast = ''
      //   self.form.cd_last = ''
      for (let v in self.xytypes2) {
        if (v == xymc) {
          self.xytypes3 = self.xytypes2[v]
        }
      }
      this.changeSelect3()
    },
    changeSelect3(type) {
      // console.log(3)
      let self = this
      //   self.form.cd_last = ''
      let xymc = self.form.xytype
      for (let v in self.cdxy_type) {
        if (v == xymc) {
          self.xytypes3 = self.cdxy_type[v]
        }
      }
    }
  }
}
</script>

<style lang="less">
.line {
  color: gainsboro;
}
</style>
