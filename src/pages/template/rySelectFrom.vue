<template>
    <div style="padding:20px;">
        <el-form :inline="false" :model="formInline" size="mini" class="demo-form-inline" @submit.native.prevent>
            <div style="width:40%;float:left">
                <el-form-item label="人员名称" :style="{marginRight:'0px'}">
                    <el-input v-model="formInline.name" placeholder="输入完整人员名称" style="width:70%" @keydown.enter.native="onSerch"></el-input>
                </el-form-item>
            </div>
            <div style="width:58%;float:right">
                <el-form-item label="证书编号或注册证书号" :style="{marginRight:'0px'}">
                    <el-input v-model="formInline.number" placeholder="输入至少六位证书编号或注册证书号" style="width:57%" @keydown.enter.native="onSerch"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div style="clear:both"></div>
        <el-form :inline="false" size="mini" :model="formInline" class="demo-form-inline" @submit.native.prevent>
            <el-form-item label="所在单位">
                <el-input v-model="formInline.company" placeholder="输入所在单位名称" style="width:28%" @keydown.enter.native="onSerch"></el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" align="center" @submit.native.prevent>
            <el-button size="mini" type="primary" @click="onSerch">搜索</el-button>
            <el-button size="mini" @click="reset">重置</el-button>
        </el-form>
    </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      formInline: {
        name: '',
        number: '',
        company: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('rySelect', this.formInline)
    },
    reset() {
      this.formInline = {
        name: '',
        number: '',
        company: ''
      }
      this.$emit('rySelect', this.formInline)
    },
    onSerch() {
      if (
        this.formInline.name == '' &&
        this.formInline.number == '' 
      ) {
        this.$message({
          message: '请完善人员搜索内容',
          type: 'error'
        })
        return
      }
      localStorage.setItem('setRySearchValue', JSON.stringify(this.formInline))
      this.$emit("onSearch", { url: "/searchRy", formInline: this.formInline });
      // let { href } = this.$router.resolve({
      //   path: `/searchRy`
      // })
      // window.open(href, this.formInline.name)
    }
  }
}
</script>

<style>
</style>



