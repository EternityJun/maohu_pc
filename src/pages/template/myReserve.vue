<!--我的预定项目-->
<template>
    <div>
        <el-table :data="myydTable" v-loading="loading">
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column label="项目名称" prop="xmmc"></el-table-column>
            <el-table-column width="150" label="地区" prop="xmdq"></el-table-column>
            <el-table-column label="操作" align="right" width="80">
                <template slot-scope="scope1">
                    <el-button size="small" type="success" @click="onMarry(scope1.row)">匹配</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination ref="fenye" style="margin-top:10px" @current-change="mySizeChange" align="right" background layout="total,prev, pager, next" :total="total"></el-pagination>
        <el-dialog append-to-body width="80%" title="招标公告" :visible.sync="dialogDrVisible">
            <item-import types="匹配列表" :row="nowRow" @onChild_row="onChild_row"></item-import>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
import ItemImport from '../ItemImport.vue';
export default {
  components:{
      ItemImport
  },
  props:{
    myreserveVisible:null
  },
  data() {
    return {
      loading:false,
      dialogDrVisible:false,
      page: 1,
      total: 0,
      myydTable: null,
      nowRow:null
    };
  },
  created() {
    this.getMyList();
  },
  watch:{
      myreserveVisible(){
        if(this.myreserveVisible){
          this.getMyList()
        }
      }
  },
  methods: {
    //匹配
    onMarry(row) {
      this.nowRow = row
      this.dialogDrVisible = true
    },
    //我的预定分页
    mySizeChange(val){
      this.page = val;
      this.getMyList();
    },
    //获取我的预定列表
    getMyList() {
      this.loading = true;
      this.axios.post(
        "/index/Mine/lists",
        {
          user_id: this.$store.state.userInfo.user_id,
          xmmc: "",
          page: this.page,
          reserve: 2
        },
        data => {
          this.loading = false;
          this.total = data.total;
          this.myydTable = data.rows;
        }
      );
    },
    //招标回调
    onChild_row(){
      this.dialogDrVisible = false;
      this.getMyList();
      this.$emit('onChild_row')
    }
  }
};
</script>

