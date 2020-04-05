<template>
    <div style="cursor:default;">
        <el-table :data="projectList" :page-size.sync="pageSize" :current-page.sync="currentPage" border v-loading="loading">
            <el-table-column label="序号" width="60" align="center">
                <template slot-scope="scope">
                    <p style="text-align: center;">{{scope.row.sort}}</p>
                </template>
            </el-table-column>
            <el-table-column label="项目名称" align="center">
                <template slot-scope="scope">
                    <p @click="handleClickProjectName(scope.row)" class="hide blue-color">{{ scope.row.xmmc }}</p>
                </template>
            </el-table-column>
            <el-table-column property="xmlx" label="项目类型" align="center" width="200"></el-table-column>
            <el-table-column property="city" label="项目所在地" align="center"  width="200">
                <template slot-scope="scope">
                    <p class="hide black-color">{{ scope.row.city }}</p>
                </template>
            </el-table-column>
            <el-table-column property="kbsj" label="时间" width="150" align="center"></el-table-column>
            <el-table-column property="money" label="金额(万)" width="150" align="center"></el-table-column>
            <el-table-column v-if="routeName === 'regionDistribution'" property="source" label="数据来源" width="150" align="center"></el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
            <div style="margin-top: 10px;">
                <el-pagination background :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total" @current-change="handleChangePage"></el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ["name", "gsId", "money", "type", "curData", "hoverData"],
    data() {
        return {
            pageSize: 10,
            currentPage: 1,
            total: 0,
            loading: false,
            projectList: [],
            routeName: ""
        };
    },
    created() {
        this.loading = true;
        this.routeName = this.$route.name;
        switch (this.routeName) {
            case "regionDistribution": // 企业经营区域分布
                if (this.type == 1) {
                    // 点击全国
                    this.handleDetailProvince();
                } else if (this.type == 2) {
                    // 点击四川
                    this.handleDetailCity();
                }
                break;
            case "sizeDistribution": // 企业经营业务规模分布
                this.handleDetailScale();
                break;
            case "businessScopeDistribution": // 企业经营业务范畴分布
                this.handleDetailCategory();
                break;
            case "activenessDistribution": // 企业经营活跃度分析
                this.handleDetailActivity();
                break;
            default:
                break;
        }
    },
    methods: {
        // 查询企业经营区域分布（全国）详情
        handleDetailProvince() {
            this.axios.post(
                "/firm/statistics_manage/detailProvince",
                {
                    gs_id: this.gsId,
                    province: this.name,
                    page: this.currentPage,
                    rows: this.pageSize
                },
                data => {
                    if (data.status === "success") {
                        this.projectList = data.list.map((item, index) => {
                            return {
                                sort:
                                    (this.currentPage - 1) * this.pageSize +
                                    index +
                                    1,
                                ...item
                            };
                        });

                        this.total = data.count;
                    } else {
                        this.$message.error(data.message);
                        this.total = 0;
                        this.projectList = [];
                    }

                    this.loading = false;
                }
            );
        },
        // 查询企业经营区域分布（四川）详情
        handleDetailCity() {
            this.axios.post(
                "/firm/statistics_manage/detailCity",
                {
                    gs_id: this.gsId,
                    city: this.name,
                    page: this.currentPage,
                    rows: this.pageSize
                },
                data => {
                    if (data.status === "success") {
                        this.projectList = data.list.map((item, index) => {
                            return {
                                sort:
                                    (this.currentPage - 1) * this.pageSize +
                                    index +
                                    1,
                                ...item
                            };
                        });

                        this.total = data.count;
                    } else {
                        this.$message.error(data.message);
                        this.total = 0;
                        this.projectList = [];
                    }

                    this.loading = false;
                }
            );
        },
        // 查询企业经营业务规模分布详情
        handleDetailScale() {
            this.axios.post(
                "/firm/statistics_manage/detailScale",
                {
                    gs_id: this.gsId,
                    year:
                        this.type === 1
                            ? this.curData === "全部" ? "" : this.curData
                            : this.hoverData === "全部" ? "" : this.hoverData,
                    money: this.money,
                    page: this.currentPage,
                    rows: this.pageSize
                },
                data => {
                    if (data.status === "success") {
                        this.projectList = data.list.map((item, index) => {
                            return {
                                sort:
                                    (this.currentPage - 1) * this.pageSize +
                                    index +
                                    1,
                                ...item
                            };
                        });

                        this.total = data.total;
                    } else {
                        this.$message.error(data.message);
                        this.total = 0;
                        this.projectList = [];
                    }

                    this.loading = false;
                }
            );
        },
        // 查询企业经营业务范畴分布详情
        handleDetailCategory() {
            this.axios.post(
                "/firm/statistics_manage/detailCategory",
                {
                    gs_id: this.gsId,
                    yjlx: this.name,
                    page: this.currentPage,
                    rows: this.pageSize
                },
                data => {
                    if (data.status === "success") {
                        this.projectList = data.list.map((item, index) => {
                            return {
                                sort:
                                    (this.currentPage - 1) * this.pageSize +
                                    index +
                                    1,
                                ...item
                            };
                        });

                        this.total = data.total;
                    } else {
                        this.$message.error(data.message);
                        this.total = 0;
                        this.projectList = [];
                    }

                    this.loading = false;
                }
            );
        },
        // 查询企业经营活跃度分析详情
        handleDetailActivity() {
            this.axios.post(
                "/firm/statistics_manage/detailActivity",
                {
                    gs_id: this.gsId,
                    time: this.name,
                    page: this.currentPage,
                    rows: this.pageSize
                },
                data => {
                    if (data.status === "success") {
                        this.projectList = data.list.map((item, index) => {
                            return {
                                sort:
                                    (this.currentPage - 1) * this.pageSize +
                                    index +
                                    1,
                                ...item
                            };
                        });

                        this.total = data.total;
                    } else {
                        this.$message.error(data.message);
                        this.total = 0;
                        this.projectList = [];
                    }

                    this.loading = false;
                }
            );
        },
        // 点击分页 改变表格页码
        handleChangePage(val) {
            this.loading = true;
            this.currentPage = val;
            switch (this.routeName) {
                case "regionDistribution": // 企业经营区域分布
                    if (this.type == 1) {
                        // 点击全国
                        this.handleDetailProvince();
                    } else if (this.type == 2) {
                        // 点击四川
                        this.handleDetailCity();
                    }
                    break;
                case "sizeDistribution": // 企业经营业务规模分布
                    this.handleDetailScale();
                    break;
                case "businessScopeDistribution": // 企业经营业务范畴分布
                    this.handleDetailCategory();
                    break;
                case "activenessDistribution": // 企业经营活跃度分析
                    this.handleDetailActivity();
                    break;
                default:
                    break;
            }
        },
        // 点击表格行 项目名称
        handleClickProjectName(row) {
            
            // /yjDet?proj_id=0000000067122d4301671a15efbb6f60&source=gl
            let type = row.type;
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
        }
    }
};
</script>

<style scoped>
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
.black-color {
    color: rgb(96, 98, 102);
}
.input {
    border-radius: 4px;
    height: 24px;
    display: inline-block;
    padding: 0 6px;
    width: 300px;
    border: 1px solid #95b8e7;
}
.sel-button {
    height: 30px;
    line-height: 30rpx;
    margin-left: 5px;
}
.page {
    /* height: 100px;
    line-height: 100px; */
}
</style>





