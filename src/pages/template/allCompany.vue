<template>
    <div>
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

    </div>
</template>

<script>
export default {
    props:['data'],
    data() {
        return {
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
    created(){
        this.getAllCompany();
    },
    methods: {
        changePage(val) {
            this.allCompany.page = val;
            this.getAllCompany();
        },
        onGsResearch(key) {
            switch (key) {
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
            if(this.data=='modelTbdw'){//报价模型投标单位
                this.$emit('fnModelTbdw',{gsmc:scope.gsmc,gs_id:scope.gs_id})
            }
        },
        onSubmit() {}
    }
};
</script>


<style lang="less" scoped>
</style>
