<template>
    <el-row>
        <el-table :data="tableData" v-loading="loading" border style="width: 100%; margin-top: 20px">
            <el-table-column align="center" prop="sort" label="序号" width="60">
            </el-table-column>
            <el-table-column align="center" prop="xmmc" label="项目名称">
                <template slot-scope="scope">
                    <div @click="handleClickProjectName(scope.row)" style="color: #409eff;cursor:pointer;">{{scope.row.xmmc}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="qymc" label="企业名称">
            </el-table-column>
            <el-table-column align="center" prop="xm" label="姓名" width="200px">
                <template slot-scope="scope">
                    <div @click="handleClickName(scope.row)" style="color: #409eff;cursor:pointer;">{{scope.row.xm}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="drjs" label="担任角色">
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleChangePage" :total="total" :current-page.sync="currentPage" :page-size.sync="pageSize" align="right" style="margin-top:10px" background layout="total,prev, pager, next"></el-pagination>
    </el-row>
</template>

<script>
export default {
    props: ['staffId', 'staffBaseId'],
    data() {
        return {
            tableData: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            loading: false,
            gs_id: localStorage.getItem("gs_id"),
        };
    },
    created () {
        // 请求列表
        this.handleRequestList();
    },
    methods: {
        // 请求在建业绩列表
        handleRequestList() {
            this.axios.post(
                "/firm/people/peopleBuild",
                { 
                    gs_id: this.gs_id,
                    staff_id: this.staffId,
                    page: this.currentPage,
                    rows: this.pageSize
                },
                data => {
                    if (data.status === "success") {
                        this.tableData = data.rows.map((item, index) => {
                            return {
                                ...item,
                                sort: (this.currentPage - 1) * this.pageSize + index + 1
                            }
                        });
                        this.total = data.total;
                    } else {
                        // this.$message.error(data.message);
                    }

                    this.loading = false;
                }
            );
        },
        // 点击分页
        handleChangePage(val) {
            this.currentPage = val;
            this.loading = true;
            this.handleRequestList();
        },
        // 点击表格行 项目名称
        handleClickProjectName(row) {
            let type = row.source;
            if (type === "zbgs") {
                let { href } = this.$router.resolve({
                    path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ? row.zbxx_id : ''}&zbgs_id=${
                        row.id
                    }&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
                });
                window.open(href, '中标公示' + row.id + row.zbxx_id + row.xmmc);
            } else if (
                type === "jst" ||
                type === "jzsc" ||
                type === "gl" ||
                type === "sl"
            ) {
                let { href } = this.$router.resolve({
                    path: `/yjDet?proj_id=${row.proj_id}&source=${type}`
                });
                window.open(href, '业绩详情' + row.xmmc + row.proj_id + type);
            }
        },
        // 点击表格行 人员名称
        handleClickName(row) {
            // 跳转页面
            let { href } = this.$router.resolve({
                path: `/ryDet?gs_id=${row.gs_id}&name=${row.xm}&staff_base_id=${this.staffBaseId}`
            });
            window.open(href, '人员详情' + row.gs_id + row.xm);
        }
    }
};
</script>

<style lang="less" scoped>
</style>


