<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="gs_research" class="demo-form-inline" @submit.native.prevent>
                    <el-form-item label="公司名称">
                        <el-input v-model="gs_research.gsmc" @focus="openInner()" placeholder="公司名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onGsResearch('ss')">查询</el-button>
                        <el-button @click="onGsResearch('reset')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-table :data="gs_research.tableData" style="width: 100%" border v-loading="loading">
            <el-table-column type="index" width="60" label="序号" align="center">
                <template slot-scope="scope">
                    {{scope.$index+(gs_research.page-1)*10+1}}
                </template>
            </el-table-column>
            <el-table-column prop="node_name" label="节点" align="center">
            </el-table-column>
            <el-table-column prop="value" label="细节" align="center">
                <template slot-scope="scope">
                    <span v-show="scope.row.value==0" style="color:red">不满足</span>
                    <span v-show="scope.row.value==1">满足</span>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog width="60%" title="全部公司集合" :visible.sync="gs_research.innerVisible" append-to-body>
            <el-row>
                <el-col :span="24">
                    <el-form :inline="true" :model="allCompany" class="demo-form-inline" @submit.native.prevent>
                        <el-form-item label="公司名称">
                            <el-input v-model="allCompany.gsmc" @keydown.enter.native="onGsResearch('inner_ss')" placeholder="公司名称" style="width:500px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onGsResearch('inner_ss')">查询</el-button>
                            <el-button @click="onGsResearch('inner_reset')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-table :data="allCompany.tableData" style="width: 100%" border>
                <el-table-column type="index" width="60" label="序号" align="center">
                    <template slot-scope="scope">
                        {{scope.$index+(allCompany.page-1)*10+1}}
                    </template>
                </el-table-column>
                <el-table-column prop="gsmc" label="公司名称" align="center">
                </el-table-column>
                <el-table-column prop="name" label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" @click="check_gs(scope.row)" type="primary">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination align="right" @current-change="changePage" :current-page.sync="allCompany.page" background layout="total,prev, pager, next" :total="allCompany.total" class="pagination"></el-pagination>

        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ["data"],
    data() {
        return {
            loading: false,
            gs_research: {
                innerVisible: false,
                dialogVisible: false,
                gsmc: "",
                gs_id: "",
                tableData: [],
                inner_tableData: [],
                page: 1,
                rows: 10
            },
            allCompany: {
                gsmc: "",
                rows: 10,
                page: 1,
                order: "asc",
                total: 0,
                tableData: []
            }
        };
    },
    methods: {
        changePage(val) {
            this.allCompany.page = val;
            this.getAllCompany();
        },
        openInner() {
            this.gs_research.innerVisible = true;
            this.allCompany.gsmc = "";
            this.getAllCompany();
        },
        onGsResearch(key) {
            switch (key) {
                case "ss":
                    if (this.gs_research.gs_id) {
                        this.getCompanyDetail();
                    } else {
                        this.gs_research.innerVisible = true;
                        this.getAllCompany();
                    }

                    break;
                case "reset":
                    this.gs_research.gs_id = "";
                    this.gs_research.gsmc = "";
                    this.getCompanyDetail();
                    break;
                case "inner_ss":
                    this.getAllCompany();
                    break;
                case "inner_reset":
                    this.allCompany.gsmc = "";
                    this.allCompany.page = 1;
                    this.getAllCompany();
                    break;
            }
        },
        getAllCompany() {
            this.axios.post(
                "/index/thread/getAllCompany",
                {
                    jbxx_id: this.jbxx_id,
                    gsmc: this.allCompany.gsmc,
                    rows: this.allCompany.rows,
                    page: this.allCompany.page,
                    order: this.allCompany.order
                },
                data => {
                    this.allCompany.tableData = data.rows;
                    this.allCompany.total = data.total;
                }
            );
        },
        check_gs(scope) {
            // console.log(scope);
            this.gs_research.innerVisible = false;
            this.gs_research.gsmc = scope.gsmc;
            this.gs_research.gs_id = scope.gs_id;
        },
        getCompanyDetail() {
            this.loading = true;
            this.axios.post(
                "/index/thread/companySearch",
                {
                    jbxx_id: this.data.jbxx_id,
                    thread_id: this.data.thread_id,
                    gs_id: this.gs_research.gs_id,
                    rows: this.gs_research.rows,
                    page: this.gs_research.page,
                    order: this.gs_research.order
                },
                data => {
                    this.loading = false;
                    if (this.gs_research.gs_id) {
                        this.gs_research.tableData = data.rows;
                        this.gs_research.total = data.total;
                    } else {
                        this.gs_research.tableData =[];
                        this.gs_research.total = 0;
                    }
                }
            );
        }
    }
};
</script>
<style>
.el-pagination {
    margin-top: 20px;
}
</style>

<style lang="less" scoped>
</style>
