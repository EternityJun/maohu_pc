<template>
  <div>
    <el-form :inline="true" @submit.native.prevent>
      <el-form-item label="积分类型">
        <el-select v-model="jf.optionsSelect" placeholder="请选择">
          <el-option v-for="item in jf.options" :key="item.label" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="积分">
        <el-input placeholder="积分数" type="number" v-model="jf.inputNumber"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input style="width:350px;" placeholder="备注信息(20个字以内)" v-model="jf.inputValue"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="jfFn().add()">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="jf.tableLists" style="width: 100%" align="center" v-loading="jf.loading" border>
      <el-table-column type="index" label="序号" align="center" width="60">
        <template slot-scope="scope">{{scope.$index+(page-1)*10+1}}</template>
      </el-table-column>
      <el-table-column prop="username" label="操作人" align="center"></el-table-column>
      <el-table-column prop="integral" label="积分" align="center">
        <template slot-scope="scope">
          <div :style="{'color':scope.row.negative?'#606266':'red'}">{{scope.row.integral}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="txt" label="备注" align="center"></el-table-column>
      <el-table-column prop="created" label="时间" align="center"></el-table-column>
      <el-table-column prop="order_name" label="更改人" align="center"></el-table-column>

      <!-- 项目所属人可编辑，确认积分 needData.xm_user_id-->
      <el-table-column label="操作" align="center" v-if="user_id==1">
        <template slot-scope="scope">
          <el-button v-if="scope.row.flag==0" type="primary" size="mini" @click="sureJf(scope.row)">确认积分</el-button>
          <el-button v-else type="success" size="mini" @click="editJf(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" v-else>
        <template slot-scope="scope">
          <el-button :disabled="scope.row.flag==0 ? false : true" :type="scope.row.flag==0 ? 'danger' : ''" size="mini" @click="jfFn().del(scope.row)">{{scope.row.flag==0 ? '删除' : '已完成'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align="right" @current-change="changePage" :current-page.sync="page" background layout="total,prev, pager, next" :total="total" class="pagination"></el-pagination>
    <el-dialog title="提示" :visible.sync="edit.dialogVisible" width="30%">
      <el-form ref="form" :model="edit" label-width="80px">
        <el-form-item label="积分">
          <el-input v-model="edit.jf" type="number" placeholder="积分"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="edit.mark" placeholder="备注(20字以内)"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button type="" @click="edit.dialogVisible==false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    needData: null
  },
  watch: {
    needData() {
      this.jf.optionsSelect = ''
      this.jf.inputNumber = ''
      this.jf.inputValue = ''
      this.jfFn().getLiset()
    }
  },
  data() {
    return {
      user_id: this.$store.state.userInfo.user_id,
      jbxx_id: this.$route.query.jbxx_id,
      jf: {
        loading: false,
        optionsSelect: '',
        inputNumber: '',
        inputValue: '',
        options: [
          {
            label: '添加积分',
            value: 'add'
          },
          {
            label: '减少积分',
            value: 'remove'
          }
        ],
        tableLists: []
      },
      page: 1,
      total: 0,
      // 编辑积分
      edit: {
        dialogVisible: false,
        jf: '',
        mark: '',
        id: ''
      }
    }
  },
  created() {
    this.jfFn().getLiset()
  },
  methods: {
    changePage(val) {
      this.page = val
      this.jfFn().getLiset()
    },
    onSubmit() {
      //编辑积分提交
      var ajax_data = {
        login_service_id: localStorage.getItem('service_id'),
        gs_id: this.needData.gs_id,
        jbxx_id: this.jbxx_id,
        user_id: this.user_id,
        txt: this.edit.mark,
        integral: this.edit.jf,
        id: this.edit.id
      }
      if (ajax_data.integral.length == 0) {
        this.$message.error('请输入积分')
        return
      }
      if (ajax_data.txt.length > 20) {
        this.$message.error('请控制备注在20个字之内')
        return
      }
      this.axios.post('/Index/Integral/addCompanyIntegral', ajax_data, data => {
        if ((data.status = 'success')) {
          this.edit = {
            dialogVisible: false,
            id: '',
            jf: '',
            mark: ''
          }
          this.jfFn().getLiset()
        }
      })
    },
    editJf(row) {
      this.edit = {
        dialogVisible: true,
        id: row.id,
        jf: row.integral,
        mark: row.txt
      }
    },
    sureJf(row) {
      let _this = this
      this.axios.post(
        '/index/integral/confirmCompanyIntegral',
        {
          id: row.id
        },
        data => {
          if (data.status == 'success') {
            this.jfFn().getLiset()
          } else {
            this.$message.error('操作失败')
          }
        }
      )
    },
    // 积分
    jfFn() {
      let getLiset = () => {
        this.jf.loading = true
        let query_data = {
          // type: 'wx',
          user_id: this.user_id,
          gs_id: this.needData.gs_id,
          jbxx_id: this.jbxx_id,
          page: this.page,
          rows: 10
        }
        this.axios.post('/Index/Integral/companyDetails', query_data, data => {
          this.jf.loading = false
          if (query_data.page > 1 && data.status == 'failed') {
            this.page -= 1
            this.jfFn().getLiset()
          } else {
            this.jf.tableLists = data.rows || []
            this.total = data.total || 0
          }
        })
      }
      //添加
      let add = () => {
        let type = this.jf.optionsSelect
        let query_data = {
          gs_id: this.needData.gs_id,
          jbxx_id: this.jbxx_id,
          user_id: this.user_id,
          login_service_id: localStorage.getItem('service_id')
        }
        if (type == '') {
          this.$message.error('请选择积分类型')
          return
        } else if (this.jf.inputNumber == '') {
          this.$message.error('请输入积分')
          return
        } else if (type == 'remove') {
          query_data.integral = -this.jf.inputNumber
        } else if (type == 'add') {
          query_data.integral = this.jf.inputNumber
        }
        query_data.txt = this.jf.inputValue
        if (query_data.txt.length > 20) {
          this.$message.error('请控制备注字数在20字以内')
          return
        }
        this.axios.post(
          '/Index/Integral/addCompanyIntegral',
          query_data,
          data => {
            this.jf.inputValue = ''
            this.jf.inputNumber = ''
            this.jf.optionsSelect = ''
            this.$emit('onChangeData')
            window.opener.postMessage('公司刷新', '*')
            this.jfFn().getLiset()
          }
        )
      }
      //删除
      let del = row => {
        let query_data = {
          id: row.id
        }
        this.axios.post(
          '/Index/Integral/delCompanyIntegral',
          query_data,
          data => {
            this.$emit('onChangeData')
            window.opener.postMessage('公司刷新', '*')

            this.jfFn().getLiset()
          }
        )
      }
      return {
        getLiset,
        del,
        add
      }
    }
  }
}
</script>

