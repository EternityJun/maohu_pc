<template>
  <div>
    <el-row>
      <el-form ref="research_plan" :model="research_plan" label-width="80px" @submit.native.prevent>
        <el-form-item label="名称">
          <el-input v-model="research_plan.name"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button type="primary" @click="new_plan('name')">确定</el-button>
      <el-button @click="emit('cancel')">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      research_plan: {
        name: '',
        data: [],
        dialogVisible: false,
        dialogVisibleName: false,
        id: ''
      },
      emit_data: ''
    }
  },
  watch: {
    data: function() {
      this.research_plan.name = this.data.name
    }
  },
  created() {
    this.research_plan.name = this.data.name
  },
  methods: {
    emit(type) {
      if (type == 'cancel') {
        this.emit_data = ''
      }
      this.$emit('onSubmitNewPlan', this.emit_data)
    },
    new_plan(type) {
      console.log(type, this.data)
      switch (type) {
        case 'new': //新建方案
          this.research_plan.dialogVisibleName = true
          this.research_plan.name = this.data.name
          break

        case 'name': //方案名称确定
          let self = this
          // console.log(this.data.tab);
          if (this.data.tab == 'yy') {
            let params = {
              jbxx_id: this.data.jbxx_id,
              name: this.research_plan.name.trim(),
              cate: 1
            }
            if (params.name.length == 0 || params.name.length > 15) {
              this.$message.error('请修改方案名称在15个字之内')
              return
            }
            this.axios.post('/index/thread/newPlan', params, data => {
              if (data.status == 'success') {
                let tree = [
                  {
                    name: '公司像',
                    id: data.message,
                    pid: '',
                    children: []
                  }
                ]
                let params2 = {
                  thread_id: data.message,
                  jbxx_id: params.jbxx_id,
                  name: params.name,
                  txt: JSON.stringify(tree)
                }
                self.axios.post('/index/thread/newPlan', params2, data1 => {
                  if (data1.status == 'success') {
                    this.emit()
                    // let { href } = this.$router.resolve({
                    //   path: `/bidCanvas?jbxx_id=${
                    //     this.data.jbxx_id
                    //   }&thread_id=${params2.thread_id}`
                    // })
                    // window.open(
                    //   href,
                    //   `${this.data.jbxx_id}${params2.thread_id}`
                    // )
                    let research = self.$router.resolve({
                      path: `/bidResearch?jbxx_id=${
                        this.data.jbxx_id
                      }&thread_id=${params2.thread_id}`
                    })
                    window.open(
                      research.href,
                      `${this.data.jbxx_id}${params2.thread_id}`
                    )
                  } else {
                    this.$message.error('操作失败')
                  }
                })
              } else {
                this.$message.error(data.message)
              }
            })
          } else if (this.data.tab == 'sh') {
            let params = {
              jbxx_id: this.data.jbxx_id,
              name: this.research_plan.name.trim(),
              type: '人工审核'
            }
            if (params.name.length == 0 || params.name.length > 15) {
              this.$message.error('请修改方案名称在15个字之内')
              return
            }
            this.axios.post('/index/Human_Allot/newPlan', params, data => {
              this.emit()
              let { href } = this.$router.resolve({
                path: `/configsh?jbxx_id=${this.data.jbxx_id}&human_id=${data}`
              })
              window.open(href, `${this.data.jbxx_id}${data}`)
            })
          } else if (this.data.tab == 'tj') {
            let params = {
              jbxx_id: this.data.jbxx_id,
              name: this.research_plan.name.trim(),
              cate: 2
            }
            if (params.name.length == 0 || params.name.length > 15) {
              this.$message.error('请修改方案名称在15个字之内')
              return
            }
            this.axios.post('/index/thread/newPlan', params, data => {
              if (data.status == 'success') {
                this.emit()
                let { href } = this.$router.resolve({
                  path: `/iteminfo/ItemConfigNew?jbxx_id=${
                    this.data.jbxx_id
                  }&thread_id=${data.message}`
                })
                window.open(href, `${this.data.jbxx_id}${data.message}`)
              } else {
                this.$message.error(data.message)
              }
            })
          } else if (this.data.tab == 'tree') {
            if (!this.research_plan.name) return
            this.emit_data = this.research_plan.name
              ? this.research_plan.name.trim()
              : ''
            this.emit()
          } else if (this.data.tab == 'bidResearch') {
            //新项目预研

            if (!this.research_plan.name) {
              this.$message.error('请修改方案名称在15个字之内')
              return
            }
            this.emit_data = this.research_plan.name
              ? this.research_plan.name.trim()
              : ''
            this.emit()
          }
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

