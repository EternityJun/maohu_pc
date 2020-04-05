<!--  -->
<template>
  <div class="qyZtbPage">
    <body-top></body-top>
    <headMenu :index="'/qyfwqPage'"></headMenu>
    <div id="mySection">
      <qyztbTable @changeDialog='changeDialog' ref="myTable"></qyztbTable>
      <el-dialog :close-on-click-modal="BooleanData" :visible.sync="dialogFormVisible" width="80%">
        <qyZtbAddXm ref="myDialog" :pageName="pageName" :closeMyDialog='closeMyDialog' @changeTbaleList='changeTbaleList' @closeDialog='closeDialog'></qyZtbAddXm>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import headMenu from "./template/head_menu.vue";
// import zzyqSearch from './template/zzyqSearch'
import qyztbTable from "./template/qyztbTable.vue";
import qyZtbAddXm from "./template/qyZtbAddXm.vue";
export default {
  name: "qyZtbPage",
  data() {
    return {
      //项目添加的状态
      pageName: "外部",
      BooleanData: false,
      dialogFormVisible: false,
      fristCilck: false, //添加项目  第一次点击不重置
      closeMyDialog:false
    };
  },
  components: {
    headMenu,
    // zzyqSearch
    qyztbTable,
    qyZtbAddXm
  },
  created() {
    document.title = "我的项目";
    // console.log("page",this.closeMyDialog)
  },
  methods: {
    changeDialog() {
      this.dialogFormVisible = true;
      this.closeMyDialog = false;
      if (this.fristCilck) {
        this.$refs.myDialog.addXm();
      }
      this.fristCilck = true;
    },
    changeTbaleList() {
      this.$refs.myTable.getProjectList();
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.closeMyDialog = true;
    }
  }
};
</script>
<style lang='less' scoped>
#myHeader {
  height: 90px;
  background-color: #4999e0;
  div {
    width: 70%;
    line-height: 90px;
    margin: 0 auto;
    span {
      font-size: 20px;
      font-weight: 500;
      margin-left: 10px;
      color: white;
    }
    span:first-child {
      font-size: 18px;
    }
  }
}
#mySection {
  padding-top: 20px;
  width: 70%;
  margin: 0 auto;
}
.qyztbTable {
  header {
    width: 100%;
  }
}
.changeBtnTxt {
  display: inline-block;
  text-align: center;
  height: 40px;
  width: 120px;
  line-height: 40px;
  padding-top: -2px;
  vertical-align: middle;
  // transform：translate(0,1px);
  // border: 1px solid #d5d5d5;
  cursor: pointer;
}
.active {
  border-radius: 5px;
  background-color: #4999ed;
  color: white;
}
#seacherRow {
  text-align: right;
  //   display: flex;
  & > div {
    display: inline-block;
  }
}
.normal {
  background-color: white;
  color: black;
}
.fwconcent {
  color: #409eff;
}
.link_color {
  color: #409eff;
  cursor: pointer;
}
</style>
