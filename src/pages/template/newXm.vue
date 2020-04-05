<template>
    <div>
        <el-form label-width="120px" :model="tableXmForm" :rules="tableXmFormRules" ref="tableXmForm" @submit.native.prevent>
            <el-form-item label="项目名称" prop="xmmc">
                <el-input v-model="tableXmForm.xmmc"></el-input>
            </el-form-item>
            <el-form-item label="项目地区" prop="xmdq">
                <el-select v-model="tableXmForm.xmdq" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in cate.xmdq" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型A" prop="xmlxA">
                <el-select v-model="tableXmForm.xmlxA" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in cate.xmlxA" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型B" prop="value5">
                <el-select v-model="value5" multiple placeholder="请选择" style="width:100%">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目阶段" prop="stage">
                <el-select v-model="tableXmForm.stage" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in cate.stage" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目业主单位" prop="xmyzdw">
                <el-input v-model="tableXmForm.xmyzdw"></el-input>
            </el-form-item>
            <el-form-item label="项目所属人" prop="ssr">
                <el-select v-model="tableXmForm.ssr" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in ssr" :key="item.id" :label="item.username" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资质要求" prop="zzyq">
                <el-input v-model="tableXmForm.zzyq"></el-input>
            </el-form-item>
            <el-form-item label="人员要求" prop="ryyq">
                <el-input v-model="tableXmForm.ryyq"></el-input>
            </el-form-item>
            <el-form-item label="业绩要求" prop="yjyq">
                <el-input v-model="tableXmForm.yjyq"></el-input>
            </el-form-item>
            <el-form-item label="其他要求" prop="qtyq">
                <el-input v-model="tableXmForm.qtyq"></el-input>
            </el-form-item>
            <el-form-item label="招标公告链接" prop="zbgg">
                <el-input v-model="tableXmForm.zbgg"></el-input>
            </el-form-item>
            <el-form-item label="招标文件附件">
                <el-upload class="upload-demo" :action="fileUploadUrl" :data="updateData" :on-success="handleChange_zbwj" :on-remove="uploadRemove_zbwj" :file-list="fileList.zbwj" :on-preview="openFile">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="造价清单附件">
                <el-upload multiple class="upload-demo" :action="fileUploadUrl" :data="updateData" :on-success="handleChange_zjqd" :on-remove="uploadRemove_zjqd" :file-list="fileList.zjqd" :on-preview="openFile">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="其他附件">
                <el-upload multiple class="upload-demo" :action="fileUploadUrl" :data="updateData" :on-success="handleChange_others" :on-remove="uploadRemove_others" :file-list="fileList.qtfj" :on-preview="openFile">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="控制价" prop="kzj">
                <el-input v-model.number="tableXmForm.kzj">
                    <template slot="append">万元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="项目监管部门" prop="xmjgbm">
                <el-input v-model="tableXmForm.xmjgbm"></el-input>
            </el-form-item>
            <el-form-item label="建设内容及规模" prop="jsnrjgm">
                <el-input v-model="tableXmForm.jsnrjgm"></el-input>
            </el-form-item>
            <el-form-item label="项目特征" prop="xmtz">
                <el-input v-model="tableXmForm.xmtz"></el-input>
            </el-form-item>
            <el-form-item label="其他" prop="qt">
                <el-input v-model="tableXmForm.qt"></el-input>
            </el-form-item>

            <el-form-item style="text-align:center">
                <el-button type="primary" @click="onSubmitXm('tableXmForm')">确认</el-button>
                <el-button @click="cancelDia">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { fileUploadUrl } from '@/store/formatter'
export default {
  props: ['newXmId'],
  data() {
    var validateZbgg = (rule, value, callback) => {
      if (
        value &&
        !/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(\S+\.\S+)$/.test(
          value
        )
      ) {
        callback(new Error('链接地址格式有误，请重填'))
      } else {
        callback()
      }
    }
    return {
      cate: {},
      ssr: {},
      fileUploadUrl: fileUploadUrl,
      updateData: {
        token: localStorage.getItem('token'),
        login_company_id: localStorage.getItem('company_id'),
        login_user_id: localStorage.getItem('user_id')
      },
      tableXmFormRules: {
        xmmc: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }
        ],
        zbgg: [{ validator: validateZbgg, trigger: 'blur' }]
        // kzj: [{ validator: validateKzj, trigger: 'blur' }]
      },
      options: [],
      value5: [],
      tableXmForm: {
        xmmc: '',
        kzj: '',
        zbgg: '',
        del_zbwj: '',
        del_zjqd: '',
        del_qtfj: '',
        value5: []
      },
      fileList: {
        zbwj: [],
        zjqd: [],
        qtfj: []
      }
    }
  },
  created() {
    this.edit(this.newXmId)
    this.fn_cate()
    this.fn_ssr()
  },
  watch: {
    newXmId(val) {
      this.edit(this.newXmId)
    },
    deep: true //对象内部属性的监听，关键。
  },
  methods: {
    fn_cate() {
      this.axios.post('/index/project/cate', {}, data => {
        this.cate = data
        this.options = data['xmlxB']
      })
    },
    fn_ssr() {
      this.axios.post(
        '/index/project/getUsers',
        { company_id: localStorage.getItem('company_id') },
        data => {
          this.ssr = data.rows['所属人']
        }
      )
    },
    // 上传文件
    format_Change(fileList) {
      let item = {
        name: fileList.response.data.filename,
        filename_time: fileList.response.data.filename_time
      }
      return item
    },
    handleChange_zbwj(file, fileList) {
      this.fileList.zbwj.push(this.format_Change(fileList))
    },
    handleChange_zjqd(file, fileList) {
      this.fileList.zjqd.push(this.format_Change(fileList))
    },
    handleChange_others(file, fileList) {
      this.fileList.qtfj.push(this.format_Change(fileList))
    },
    handleChange_xmyy(file, fileList) {
      this.fileList.xmyy.push(this.format_Change(fileList))
    },
    uploadRemove_zbwj(file, fileList) {
      this.tableXmForm.del_zbwj =
        this.tableXmForm.del_zbwj + file.filename_time + ','
      this.fileList.zbwj = fileList
    },
    uploadRemove_zjqd(file, fileList) {
      this.fileList.zjqd = fileList
      this.tableXmForm.del_zjqd =
        this.tableXmForm.del_zjqd + file.filename_time + ','
    },
    uploadRemove_others(file, fileList) {
      this.fileList.qtfj = fileList
      this.tableXmForm.del_qtfj =
        this.tableXmForm.del_qtfj + file.filename_time + ','
    },
    uploadRemove_xmyy(file, fileList) {
      this.fileList.xmyy = fileList
      this.table_xm.xmyy.del_xmyy =
        this.tableXmForm.del_xmyy + file.filename_time + ','
    },
    openFile(file) {
      window.open(
        'https://wechat.cdzjkl.com/files/options/' +
          file.filename_time
      )
    },
    reset() {
      this.value5 = []
      this.fileList.zbwj = []
      this.fileList.zjqd = []
      this.fileList.qtfj = []
      this.tableXmForm.del_zbwj = ''
      this.tableXmForm.del_zjqd = ''
      this.tableXmForm.del_qtfj = ''
      this.tableXmForm.id = ''
      this.$forceUpdate()
    },
    edit(id) {
      // console.log('id---:' + id)
      if (!id) {
        this.reset()
        return
      }
      this.fileList.zbwj = []
      this.fileList.zjqd = []
      this.fileList.qtfj = []
      this.fileList.xmyy = []
      let loading = this.$loading()
      this.axios.post('/index/project/edit', { jbxx_id: id }, data => {
        loading.close()
        this.tableXmForm = data.res
        this.tableXmForm.id = id
        this.tableXmForm.xmdq = data.res.xmdq == 0 ? '' : data.res.xmdq
        this.tableXmForm.xmlxA = data.res.xmlxA == 0 ? '' : data.res.xmlxA
        this.tableXmForm.stage = data.res.stage == 0 ? '' : data.res.stage
        this.tableXmForm.ssr = data.res.ssr == 0 ? '' : data.res.ssr
        this.value5 = data.res.xmlxB
        let zbwj = decodeURI(data.res.zbwj).split(',')
        this.fileList.zbwj = data.res.zbwj
          ? this.format_fileList(data.res.zbwj, data.res.zbwj_time)
          : []
        this.fileList.zjqd = data.res.zjqd
          ? this.format_fileList(data.res.zjqd, data.res.zjqd_time)
          : []
        this.fileList.qtfj = data.res.qtfj
          ? this.format_fileList(data.res.qtfj, data.res.qtfj_time)
          : []
        this.tableXmForm.del_zbwj = ''
        this.tableXmForm.del_zjqd = ''
        this.tableXmForm.del_qtfj = ''
      })
    },
    format_fileList(str, str2) {
      let arr = decodeURI(str).split(',')
      let arr2 = decodeURI(str2).split(',')
      let file = []
      for (let i = 0; i < arr.length; i++) {
        let item = {
          name: arr[i],
          filename_time: arr2[i]
        }
        file.push(item)
      }
      return file
    },
    format_str(arr) {
      let str = ''
      for (let i = 0; i < arr.length; i++) {
        str += arr[i].filename_time + ','
      }
      str = str.substr(0, str.length - 1)
      return str
    },
    onSubmitXm(formName, type) {
      //提交项目表单
      let self = this
      if (formName == 'tableXmForm') {
        self.$refs[formName].validate(valid => {
          if (!valid) {
            return false
          } else {
            let params = {
              user_id: this.$store.state.userInfo.user_id,
              company_id: localStorage.getItem('company_id'),
              id: this.tableXmForm.id,
              xmmc: this.tableXmForm.xmmc,
              xmdq: this.tableXmForm.xmdq,
              xmlxA: this.tableXmForm.xmlxA,
              xmlxB: this.value5,
              stage: this.tableXmForm.stage,
              xmyzdw: this.tableXmForm.xmyzdw,
              ssr: this.tableXmForm.ssr,
              zzyq: this.tableXmForm.zzyq,
              yjyq: this.tableXmForm.yjyq,
              ryyq: this.tableXmForm.ryyq,
              qtyq: this.tableXmForm.qtyq,
              zbgg: this.tableXmForm.zbgg,
              kzj: this.tableXmForm.kzj,
              xmjgbm: this.tableXmForm.xmjgbm,
              jsnrjgm: this.tableXmForm.jsnrjgm,
              xmtz: this.tableXmForm.xmtz,
              qt: this.tableXmForm.qt,
              user_id: this.$store.state.userInfo.user_id,
              del_zbwj: this.tableXmForm.del_zbwj,
              del_zjqd: this.tableXmForm.del_zjqd,
              del_qtfj: this.tableXmForm.del_qtfj,
              zbwj:
                this.fileList.zbwj.length > 0
                  ? encodeURI(
                      JSON.stringify(this.format_str(this.fileList.zbwj)),
                      'utf-8'
                    )
                  : null,
              zjqd:
                this.fileList.zjqd.length > 0
                  ? encodeURI(
                      JSON.stringify(this.format_str(this.fileList.zjqd)),
                      'utf-8'
                    )
                  : null,
              qtfj:
                this.fileList.qtfj.length > 0
                  ? encodeURI(
                      JSON.stringify(this.format_str(this.fileList.qtfj)),
                      'utf-8'
                    )
                  : null
            }
            self.axios.post('/index/project/pro_save', params, data => {
              if (data.status == 'success') {
                self.$message.success('保存成功')
                self.$emit('onAddNewItem',this.tableXmForm.id)                
                self.$refs['tableXmForm'].resetFields()
                self.reset();
              } else {
                self.$message.success(data.message)
              }
            })
          }
        })
      }
    },
    cancelDia() {
      this.$refs['tableXmForm'].resetFields()
      this.reset();
      this.$emit('onAddNewItem', 'cancel')
    }
  }
}
</script>


