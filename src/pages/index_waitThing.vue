<!-- 代办事务 -->
<template>
  <div>
    <body-top></body-top>
    <!-- 导航栏 -->
    <div>
      <head-menu :index="'/indexwaitThing'"></head-menu>
    </div>
    <div class="body">
      <div style="height:40px;margin-bottom:10px;">
        <div style="float:left">
          <span style="font-size:20px">业务消息</span>
        </div>
        <div style="float:right">
          <el-select v-model="value" placeholder="操作筛选" @change="ajaxGetList">
            <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
      </div>
      <el-table align :data="tableData" border v-loading="loading" style="margin-top:10px;">
        <el-table-column align="center" label="序号" width="60">
          <template slot-scope="scope">{{scope.$index+(page-1)*10+1}}</template>
        </el-table-column>
        <el-table-column align="center" prop="xmmc" label="项目"></el-table-column>
        <el-table-column align="center" prop="modified" label="时间" width="250"></el-table-column>
        <el-table-column align="center" label="企业名称" width="200">
          <template slot-scope="scope">
            <span @click="handleClickLookBtn(scope.row)" style="color:#409eff;cursor:pointer;">查看</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" v-if="scope.row.is_read === '未读'" type="primary" @click="onClick(scope.row)">未读</el-button>
            <el-button size="middle" v-else type="text">已读</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination align="right" style="margin-top:10px" background :current-page="page" @current-change="pageChange" layout="total,prev, pager, next" :total="total"></el-pagination>
    </div>
    <!-- 企业列表弹窗 -->
    <div v-if="isShow">
      <el-dialog title="企业列表" :visible.sync="isShow" width="80%" top="20px">
        <need-deal-qy
          :jbId="curJbId"
          :xmmc="curXm"
         />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import head_menu from "./template/head_menu.vue";
import needDealQy from "./template/needDealQy";
/* eslint-disable */
export default {
    data() {
        return {
            iptval: "",
            loading: false, // 项目列表
            tableData: [], // 代办事务项目列表
            user_id: this.$store.state.userInfo.user_id,
            total: 0,
            page: 1,
            options: ["全部", "已读", "未读"],
            value: "全部",
            // 企业列表
            isShow: false, // 点击企业列 查看按钮 显示企业列表
            curJbId: '',
            curXm: '',
        };
    },
    created() {
        document.title = "业务消息";
        // 请求项目列表数据
        this.loading = true;
        this.ajaxGetList();
    },
    components: {
        headMenu: head_menu,
        needDealQy
    },
    methods: {
        // 请求项目列表数据
        ajaxGetList() {
            this.axios.post(
                "/index/mine/needDealProject",
                {
                    user_id: this.$store.state.userInfo.user_id,
                    // company_id: localStorage.getItem("company_id"),
                    status: this.value,
                    page: this.page,
                    rows: 10
                },
                data => {
                    if (data.status === "success") {
                        this.tableData = data.rows;
                        this.total = data.total;
                    } else {
                        this.tableData = [];
                        this.total = 0;
                    }

                    this.loading = false;
                }
            );
        },
        // 点击分页 请求项目列表
        pageChange(val) {
            this.page = val;
            // 请求项目列表
            this.ajaxGetList();
        },
        //点击表格行操作列 未读按钮 变为已读
        onClick(row) {
            this.axios.post(
                "/index/mine/changeRead",
                {
                    jbxx_id: row.jbxx_id,
                    user_id: this.user_id
                },
                data => {
                    if (data.status == "success") {
                        this.$message.success("操作成功");
                        // 刷新项目列表
                        this.ajaxGetList();
                    } else {
                        this.$message.error("操作失败");
                    }
                }
            );
        },
        // 改变下拉框值，切换项目列表信息为已读、未读、全部
        handleSelectChange() {
            this.page = 1;
            // 请求项目列表
            this.ajaxGetList();
        },
        // 点击表格行 企业列表 查看按钮 显示弹窗
        handleClickLookBtn(row) {
            this.isShow = true;
            this.curJbId = row.jbxx_id;
            this.curXm = row.xmmc;
        },
    
    }
};
</script>

<style>
.search_div .el-input-group__append {
    background-color: #409eff;
    border-color: #409eff;
    color: #ffffff;
}
</style>

<style scoped lang="less">
.body {
    padding-top: 20px;
    width: 1200px;
    margin: 0 auto;
}
.search_div {
    align-items: center;
    padding-bottom: 10px;
    display: flex;
    p {
        flex: 1;
        font-size: 20px;
    }
}
</style>
