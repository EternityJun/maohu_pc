<!--  -->
<template>
  <div class="qyZtbPage">
    <body-top></body-top>
    <headMenu :index="'/qyZtbPage'"></headMenu>
    <div id="mySection">
      <qyztbTable @changeDialog='changeDialog' ref="myTable"></qyztbTable>
      <el-dialog :close-on-click-modal="BooleanData" :visible.sync="dialogFormVisible" width="80%" :before-close="beforeClose">
        <qyZtbAddXm ref="myDialog" @changeTbaleList='changeTbaleList'  :closeMyDialog='closeMyDialog' @closeDialog='closeDialog'></qyZtbAddXm>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import headMenu from "./template/head_menu.vue"; //投标下的导航
import qyztbTable from "./template/qyztbTable.vue"; //table
import qyZtbAddXm from "./template/qyZtbAddXm.vue"; //添加弹框
export default {
  name: "qyZtbPage",
  data() {
    return {
      BooleanData: false,
      dialogFormVisible: false,
      fristCilck: false, //添加项目  第一次点击不重置
      closeMyDialog: false
    };
  },
  components: {
    headMenu,
    qyztbTable,
    qyZtbAddXm
  },
  created() {
    document.title = "我的项目";
  },
  methods: {
    changeDialog() {
      //table组件 调用  兄弟组件 打开弹框的方法
      this.dialogFormVisible = true;
      this.closeMyDialog = false;
      if (this.fristCilck) {
        this.$refs.myDialog.addXm();
      }
      this.fristCilck = true;
    },
    beforeClose(done){
      this.changeTbaleList()
      done()
    },
    changeTbaleList() {
      //弹框组件 调用  table组件  刷新列表的方法
      this.$refs.myTable.getProjectList();
    },
    closeDialog() {
      //关闭弹框
      this.dialogFormVisible = false;
      this.closeMyDialog = true;
    }
  }
};
</script>
<style lang='less' >
.el-cascader-menu__wrap {
  height: 350px;
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
</style>
