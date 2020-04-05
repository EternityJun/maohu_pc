<template>
    <div id="model">
        <body-top></body-top>
        <div class="elMenu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color='#409eff'>
                <el-menu-item index="1">投标模型一</el-menu-item>
                <el-menu-item index="2">
                    投标模型二
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 投标模型一 -->
        <div class="container" v-show="currentIndex==1">
            <el-form :inline="true" style="text-align:right" :model="formModelOne" class="demo-form-inline" @submit.native.prevent>
                <el-form-item label="模型名称">
                    <el-input v-model="formModelOne.name" placeholder="请输入模型名称" @keydown.enter.native="table_model(1)" clearable>
                        <el-button slot="append" type="primary" @click="table_model(1)">查询</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('add','')">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="formModelOne.tableData" style="width: 100%" border v-bind:loading="loading">
                <el-table-column type="index" width="60" label="序号" align="center">
                    <template slot-scope="scope">
                        {{scope.$index+(formModelOne.page-1)*10+1}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" width="180" align="center">
                </el-table-column>
                <el-table-column prop="xmmc" label="项目名称" align="center">
                </el-table-column>
                <el-table-column prop="zgxjw" label="最高限价(万元)" align="center">
                </el-table-column>
                <el-table-column prop="address" label="操作" align="center" width="180">
                    <template slot-scope="scope">
                        <span class="primary_btn" type="primary" @click="onSubmit('edit',scope.row)">编辑</span>
                        <span class="danger_btn" @click="del(scope.row)">删除</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination align="right" @current-change="changePage" :current-page.sync="formModelOne.page" background layout="total,prev, pager, next" :total="formModelOne.total" class="pagination"></el-pagination>

        </div>
        <!-- 投标模型二 -->
        <div class="container" v-show="currentIndex==2">
            <el-form :inline="true" style="text-align:right" :model="formModelTwo" class="demo-form-inline" @submit.native.prevent>
                <el-form-item label="模型名称">
                    <el-input v-model="formModelTwo.name" placeholder="请输入模型名称" @keydown.enter.native="table_model(2)" clearable>
                        <el-button slot="append" type="primary" @click="table_model(2)">查询</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('add','')">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="formModelTwo.tableData" style="width: 100%" border v-bind:loading="loading">
                <el-table-column type="index" width="60" label="序号" align="center">
                    <template slot-scope="scope">
                        {{scope.$index+(formModelTwo.page-1)*10+1}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" align="center">
                </el-table-column>
                <el-table-column prop="count" label="点位矩阵(条)" align="center">
                </el-table-column>
                <el-table-column prop="address" label="操作" align="center" width="180">
                    <template slot-scope="scope">
                        <span class="primary_btn" type="primary" @click="onSubmit('edit',scope.row)">编辑</span>
                        <span class="danger_btn" @click="del(scope.row)">删除</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination align="right" @current-change="changePage" :current-page.sync="formModelTwo.page" background layout="total,prev, pager, next" :total="formModelTwo.total" class="pagination"></el-pagination>

        </div>
        <el-dialog title="模型名称" :visible.sync="model.dialogVisible" width="30%">
            <el-row>
                <el-form ref="research_plan" :model="model" label-width="80px" @submit.native.prevent>
                    <el-form-item label="模型名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>

                </el-form>
            </el-row>
            <el-row style="text-align:center">
                <el-button type="primary" @click="onSubmit('submitName')">确 定</el-button>
                <el-button @click="model.dialogVisible = false">取 消</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import headMenu from "./template/head_menu.vue";
import { getDate } from "../store/formatter.js";
export default {
    data() {
        return {
            loading: false,
            activeIndex: "1",
            currentIndex: "1",
            model: {
                dialogVisible: false,
                name: getDate() + "_"
            },
            formModelOne: {
                name: "",
                tableData: [],
                page: 1,
                rows: 10,
                total: 0
            },
            formModelTwo: {
                name: "",
                tableData: [],
                page: 1,
                rows: 10,
                total: 0
            }
        };
    },
    components: {
        headMenu
    },
    created() {
        this.table_model(1);
        this.table_model(2);
        document.title = "报价模型";
    },
    methods: {
        changePage(val) {
            if (this.currentIndex == 1) {
                this.formModelOne.page = val;
            } else {
                this.formModelTwo.page = val;
            }
            this.table_model(this.currentIndex);
        },
        handleSelect(val) {
            this.currentIndex = val;
        },
        onSubmit(type, row) {
            let self = this;
            switch (type) {
                case "add":
                    self.model.dialogVisible = true;
                    self.model.name = getDate() + "_";
                    break;
                case "submitName":
                    self.saveOffer();
                    break;
                case "edit":
                    let url =
                        self.currentIndex == 1 ? "modelBid1" : "modelBid2";
                    let { href } = this.$router.resolve({
                        path: `/${url}?offerid=${row.id}`
                    });
                    if (self.currentIndex == 1) {
                        window.open(href, `投标模型1${row.id}`);
                    } else {
                        window.open(href, `投标模型2${row.id}`);
                    }

                    break;
                default:
                    break;
            }
        },
        saveOffer() {
            let self = this;
            let params = null;
            let url = "";
            if (self.currentIndex == 1) {
                url = "saveOffer";
                params = {
                    jbxx: {
                        name: self.model.name,
                        user_id: self.$store.state.userInfo.user_id
                    }
                };
            } else {
                url = "saveOffer2";
                params = {
                    main: {
                        name: self.model.name,
                        user_id: self.$store.state.userInfo.user_id
                    }
                };
            }

            self.axios.post(`/index/Offer_Model/${url}`, params, data => {
                if (data.status == "success") {
                    self.model.dialogVisible = false;
                    self.table_model(self.currentIndex);
                } else {
                    self.$message.error("接口错误，请稍后重试");
                }
            });
        },
        table_model(currentIndex) {
            let self = this;
            self.loading = true;
            let params = null;
            if (currentIndex == 1) {
                params = {
                    user_id: self.$store.state.userInfo.user_id,
                    name: self.formModelOne.name,
                    rows: self.formModelOne.rows,
                    page: self.formModelOne.page
                };
            } else {
                params = {
                    user_id: self.$store.state.userInfo.user_id,
                    name: self.formModelTwo.name,
                    rows: self.formModelTwo.rows,
                    page: self.formModelTwo.page
                };
            }
            let url = currentIndex == 1 ? "getOffer" : "getOffer2";
            self.axios.post(`/index/Offer_Model/${url}`, params, data => {
                self.loading = false;
                if (data.status == "success") {
                    if (currentIndex == 1) {
                        self.formModelOne.tableData = data.rows;
                        self.formModelOne.total = data.total;
                    } else {
                        self.formModelTwo.tableData = data.rows;
                        self.formModelTwo.total = data.total;
                    }
                } else {
                    if (params.page > 1) {
                        if (currentIndex == 1) {
                            self.formModelOne.page -= 1;
                        } else {
                            self.formModelTwo.page -= 1;
                        }
                        self.table_model(currentIndex);
                    } else {
                        if (currentIndex == 1) {
                            self.formModelOne.tableData = [];
                            self.formModelOne.total = 0;
                        } else {
                            self.formModelTwo.tableData = [];
                            self.formModelTwo.total = 0;
                        }
                    }
                }
            });
        },
        del(scope) {
            let self = this;
            self
                .$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    let url = self.currentIndex == 1 ? "delOffer" : "delOffer2";
                    self.axios.post(
                        `/index/Offer_Model/${url}`,
                        { offer_id: scope.id },
                        data => {
                            if (data.status == "success") {
                                self.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                self.table_model(self.currentIndex);
                            } else {
                                self.$message.error("接口错误，请稍后重试");
                            }
                        }
                    );
                })
                .catch(() => {
                    self.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>

<style lang="less" scoped>
@activeColor: #409eff;
.pagination {
    margin: 20px 0;
}
.primary_btn {
    color: @activeColor;
    margin-right: 10px;
    cursor: pointer;
}
.danger_btn {
    color: red;
    cursor: pointer;
}
#model {
    .elMenu {
        width: 100%;
        border-bottom: 1px solid gainsboro;
        .el-menu-demo {
            width: 1200px;
            margin: 0 auto;
            border: none;
        }
    }
    .container {
        width: 1200px;
        margin: 20px auto;
    }
}
</style>
