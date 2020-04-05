<template>
    <div style="padding:20px">
         <div class="add_header">
          <div class="header_left">当前选择人员：<span>{{addTexyName}}</span></div>
          <div class="header_right">
            <el-input placeholder="查找" v-model="inputModel"  clearable  @keyup.enter.native="nextFocus()"></el-input>
          </div>
        </div>
        <div class="add footer">
            <el-table :data="newTableData"  style="width: 100%;"  >
                  <el-table-column type="index"  label="序号" header-align="center" align="center"></el-table-column>
                    <el-table-column align="center" prop="name" label="姓名"  min-width="12%" >
                    <template slot-scope="scope">
                      <span style="color:#37B6ED">{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="rylb" label="证书名称" min-width="15%">
                    <template slot-scope="scope">
                      <span >{{scope.row.rylb}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="dj" label="级别"   min-width="12%">
                    <template slot-scope="scope">
                      <span >{{scope.row.dj}}</span>
                    </template>
                  </el-table-column>
                       <el-table-column align="center" prop="zsh" label="证号"  min-width="15%" >
                    <template slot-scope="scope">
                      <span>{{scope.row.zsh}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="zczy" label="专业"  min-width="12%">
                  </el-table-column>
                   <el-table-column
                    align="center"
                    label="备注"
                    width="100">
                    <template slot-scope="scope">
                      <el-button @click="addSelect(scope.row)" type="text" size="small">选择</el-button>
                    </template>
                  </el-table-column>
                </el-table>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
  props:['newTableData','addTexyName'],
  data() {
    return {
     inputModel:''
    };
  },
  created() {

  },
  methods:{
      nextFocus(){
          this.$emit('nextFocusButton',this.inputModel)
          // console.log(555)
      },
      addSelect(dates){
        //选择
        this.$emit('addSelectButton',dates)
      }
  }
};
</script>
<style lang="less">
    .add_header {
      display: flex;
      flex-direction: row;
      .header_left {
        display: flex;
        flex-direction: row;
        width: 200px;
        font-size: 20px;
        span {
          font-weight: 900;
        }
      }
      .header_right {
        flex: 1;
        text-align: right;
        input {
          width: 200px;
        }
      }
    }
</style>

