<template>
    <div class="company-wrapper">
        <el-row>
            <el-col :span="24">
                <h3 class="company-name">{{companyName}}</h3>
            </el-col>
        </el-row>
        <el-table :data="projectList" border v-loading="loading" @sort-change="handleTimeSort" :default-sort="{prop: 'kbsj', order: 'descending'}">
            <el-table-column label="序号" width="60" align="center">
                <template slot-scope="scope">
                    <p style="text-align: center;">{{ scope.row.sort }}</p>
                </template>
            </el-table-column>
            <el-table-column label="项目名称" align="center">
                <template slot-scope="scope">
                    <p @click="handleClickProjectName(scope.row)" class="hide blue-color">{{ scope.row.xmmc }}</p>
                </template>
            </el-table-column>
            <el-table-column label="项目业主" align="center">
                <template slot-scope="scope">
                    <p class="hide">{{ scope.row.zbr }}</p>
                </template>
            </el-table-column>
            <el-table-column property="kbsj" label="开标时间" sortable="custom" width="200" align="center"></el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
            <div style="margin-top: 10px;">
                <el-pagination :page-size.sync="pageSize" background :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total" @current-change="handleChangePage"></el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            projectList: [],
            currentPage: 1,
            total: 0,
            loading: false,
            companyId: "",
            compareId: "",
            companyName: "",
            sort: 1, // 0-升序 1-降序
            pageSize: 10
        };
    },
    created() {
        // 得到路由参数
        // console.log(this.$route.query);
        this.companyId = this.$route.query.company_id;
        this.compareId = this.$route.query.compare_id;
        this.companyName = this.$route.query.company_name;
        this.loading = true;
        this.handleProjectList();
        document.title = '公司项目';
    },
    watch: {
        '$route': function(newVal) {
            window.location.reload();
        }
    },
    methods: {
        // 查询中标关联公司项目列表
        handleProjectList() {
            this.axios.post(
                "/index/statistics_bid/bidDetail",
                {
                    gs_id: this.companyId,
                    compare_id: this.compareId,
                    sort: this.sort, // 1-升序 0-降序
                    page: this.currentPage,
                    rows: this.pageSize
                },
                data => {
                    if (data.status === "success") {
                        this.projectList = data.list.map((item, index) => {
                            return {
                                ...item,
                                sort:
                                    (this.currentPage - 1) * this.pageSize +
                                    index +
                                    1
                            };
                        });

                        this.total = data.total;
                    }

                    this.loading = false;
                }
            );
        },
        // 分页
        handleChangePage(val) {
            this.loading = true;
            this.currentPage = val;
            this.handleProjectList();
        },
        // 点击表格行 项目名称
        handleClickProjectName(row) {
            // 跳转路由
            let { href } = this.$router.resolve({
                path: `/enterpriseDetails?zbxx_id=${row.zbxx_id}&zbgs_id=${row.id}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
            });
            window.open(href, '中标公示' + row.id + row.zbxx_id + row.xmmc);
        },
        // 点击开标时间表头 排序
        handleTimeSort(column, props, order) {
            this.loading = true;
            console.log(column.order);
            if (column.order === "descending") {
                // 降序
                this.sort = 1;
                this.handleProjectList();
            } else {
                // 升序
                this.sort = 0;
                this.handleProjectList();
            }
        }
    }
};
</script>

<style scoped>
.company-wrapper {
    min-width: 800px;
    /* padding: 40px 20px; */
    padding: 0 20px 40px;
    margin: 0 auto;
    height: 814px;
    box-sizing: border-box;
    cursor: default;
}
.company-name {
    padding: 14px 0;
    /* -webkit-box-shadow: 0px 0px 5px #e0e0e0;
    box-shadow: 0px 0px 5px #e0e0e0; */
    width: 100%;
    font-size: 32px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-weight: normal;
    /* color: #df4744;
    text-align: center;
    margin: 0 0 10px;
    border-bottom: 1px dotted #df4744;
    padding: 0 0 5px 10px;
    font-size: 16px; */
}
.hide {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.blue-color {
    color: #409eff;
    cursor: pointer;
}
</style>


