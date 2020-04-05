<template>
  <div>
    <el-row>
      <el-col :span='20' :offset="2">
        <el-form :model="form" ref="form" class="demo-form-inline" label-width='80px' :rules="rules" @submit.native.prevent>
          <el-form-item label="人员名称" prop="name">
            <el-input :readonly="data.type=='edit'" v-model="form.name" placeholder="人员名称"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="请选择" clearable style="width:374px;">
              <el-option label="男" value="男">
              </el-option>
              <el-option label="女" value="女">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-input v-model="form.zjlx" readonly placeholder="证件类型"></el-input>
          </el-form-item>
          <el-form-item label="证件号码" prop='id_number'>
            <el-input v-model="form.id_number" placeholder="证件号码"></el-input>
          </el-form-item>
          <el-form-item align='center'>
            <el-button type="primary" v-if="data.type=='add'" @click="onSubmit('form','1')">保存并添加证件</el-button>
            <el-button type="success" @click="onSubmit('form','2')">保存</el-button>
            <el-button type="" @click="onSubmit('form','3')">取消</el-button>
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
      gs_id:localStorage.getItem('gs_id'),
      // gs_id: 7583,
      form: {
        id: '',
        name: this.data.name || '',
        sex: this.data.sex || '',
        id_number: this.data.certificate_number || '',
        zjlx: '居民身份证'
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        id_number: [
          { min: 18, max: 18, message: '身份证长度不对', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    data: function() {
      this.form = {
        id: '',
        name: this.data.name || '',
        sex: this.data.sex || '',
        id_number: this.data.certificate_number || '',
        zjlx: '居民身份证'
      }
    }
  },
  methods: {
    onSubmit(formName, key) {
      switch (key) {
        case '3':
          this.$emit('fnAdd', 'cancel')
          this.resetForm()
          break
        default:
          this.addPeople(formName, key)
          break
      }
    },
    addPeople(formName, key) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            gs_id: this.gs_id,
            name: this.form.name,
            sex: this.form.sex,
            id_number: this.form.id_number
          }
          if (this.data.type == 'edit') {
            params.id = this.data.id
          }
          this.axios.post('/firm/company_People/addPeople', params, data => {
            if (data.status == 'success') {
              if (key == 1) {
                this.$emit('fnAdd', 'refresh')
                this.resetForm()
                let { href } = this.$router.resolve({
                  path: `/certificateDetail?gs_id=${this.gs_id}&name=${
                    params.name
                  }&staff_base_id=${data.message}&cate=${data.cate}`
                })
                window.open(
                  href,
                  `/certificateDetail?gs_id=${this.gs_id}&name=${
                    params.name
                  }&staff_base_id=${data.message}&cate=${data.cate}`
                )
              } else {
                this.$emit('fnAdd', 'refresh')
                this.$message.success('保存成功')
                this.resetForm()
              }
            } else {
              this.$message.error(data.message)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.form = {
        id: '',
        name: this.data.name || '',
        sex: this.data.sex || '',
        id_number: this.data.certificate_number || '',
        zjlx: '居民身份证'
      }
    }
  }
}
</script>
 <style lang="less" scoped>
</style>
 
 