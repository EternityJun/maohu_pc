<template>
    <div>
        <el-form ref="form" :model="form" label-width="95px" :inline="true" @submit.native.prevent>
            <el-row>
                <el-col :span="24">
                    <div>
                        <el-form-item label="项目名称">
                            <el-input v-model="form.xmmc" style="width:319px" @keyup.enter.native="onSearch('research')" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="项目类别">
                            <el-select v-model="form.xmlx" placeholder="项目类别" style="width:319px" clearable>
                                <el-option label="建筑" value="建筑"></el-option>
                                <el-option label="公路" value="公路"></el-option>
                                <el-option label="市政" value="市政"></el-option>
                                <el-option label="水利" value="水利"></el-option>
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属地区">
                            <el-select v-model="form.area" placeholder="所属地区" style="width:319px" clearable>
                                <el-option v-for="item in cate.xmdq" :key="item.id" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="中标时间">
                            <el-form-item prop="date1" class="nomalInput" clearable>
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.min_date" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <span>-</span>
                            <el-form-item prop="date1" class="nomalInput">
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.max_date" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        <el-form-item label="最高限价(万)">
                            <el-input v-model="form.min_money" class="nomalInput" type="number"></el-input>
                            <span>-</span>
                            <el-input v-model="form.max_money" class="nomalInput" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="中标下浮">
                            <el-input v-model="form.min_zbxf" class="nomalInput" type="number"></el-input>
                            <span>-</span>
                            <el-input v-model="form.max_zbxf" class="nomalInput" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="最低下浮">
                            <el-input v-model="form.min_zdxf" class="nomalInput" type="number"></el-input>
                            <span>-</span>
                            <el-input v-model="form.max_zdxf" class="nomalInput" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="平均下浮">
                            <el-input v-model="form.min_average" class="nomalInput" type="number"></el-input>
                            <span>-</span>
                            <el-input v-model="form.max_average" class="nomalInput" type="number"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        <el-form-item label="有效投标(家)">
                            <el-input v-model="form.min_effect" class="nomalInput" type="number"></el-input>
                            <span>-</span>
                            <el-input v-model="form.max_effect" class="nomalInput" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="总投标(家)">
                            <el-input v-model="form.min_count" class="nomalInput" type="number"></el-input>
                            <span>-</span>
                            <el-input v-model="form.max_count" class="nomalInput" type="number"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row style="text-align:center">
                <el-form-item>
                    <el-button type="primary" @click="onSearch('search')">确定</el-button>
                    <el-button @click="onSearch('reset')">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="24">
                <el-table :data="table.tableData" style="width: 100%" border v-loading="loading" @sort-change='fn_sortable'>
                    <el-table-column label="序号" header-align="center" align="center" width="80">
                        <template slot-scope="scope">{{scope.$index+(form.page-1)*10+1}}</template>
                    </el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" width="300" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" :title="scope.row.xmmc" @click="openXm(scope.row)">{{scope.row.xmmc}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="kbsj" label="中标时间" width="110" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="zgxjw" label="最高限价(万)" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="tbbjw" label="投标报价(万)" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="is_zq" label="准确性" width="100" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="zbxf" label="中标下浮" width="110" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="zdxf" label="最低下浮" width="110" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="average" label="平均下浮" width="110" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="effective" label="有效投标(家)" width="130" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="tbgs_count" label="总投标(家)" width="120" align="center" sortable="custom">
                    </el-table-column>
                    <el-table-column prop="" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.is_kb" style="margin-bottom:10px;margin-left:10px" size="mini" type="success" @click="clickFn('开标记录',scope.row)">导入开标记录</el-button>
                            <el-button v-else style="margin-bottom:10px;margin-left:10px" size="mini" disabled>导入开标记录</el-button>
                            <el-button size="mini" type="primary" @click="clickFn('评审结果',scope.row)">导入评审结果</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination align="right" :current-page.sync="form.page" style="margin-top:10px" @current-change="changePage" background layout="total,prev, pager, next" :total="table.total"></el-pagination>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import axios from "axios";
export default {
    props: ["data"],
    data() {
        return {
            offerid: "",
            name: "",
            loading: false,
            form: {
                fx_type: "search",
                fx_id: "",
                zb_del: "",
                zb_undo: "",
                xmmc: "",
                xmlx: "",
                area: "",
                min_date: "",
                max_date: "",
                min_money: "",
                max_money: "",
                min_zbxf: "",
                max_zbxf: "",
                min_zdxf: "",
                max_zdxf: "",
                min_average: "",
                min_average: "",
                min_effect: "",
                max_effect: "",
                min_count: "",
                max_count: "",
                rows: 10,
                page: 1,
                order: "",
                sort: ""
            },
            cate: {},
            table: {
                tableData: [],
                total: 0
            }
        };
    },
    created() {
        this.getCate();
        this.onSubmit();
    },
    methods: {
        fn_sortable(param) {
            let order = "";
            if (param.order == "ascending") {
                order = "asc";
            } else if (param.order == "descending") {
                order = "desc";
            }
            this.form.order = order;
            this.form.sort = param.prop;
            this.onSubmit();
        },
        openXm(row) {
            let { href } = this.$router.resolve({
                path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ||
                    ""}&zbgs_id=${row.id || ""}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
            });
            window.open(href, "中标公示" + row.id + row.zbxx_id + row.xmmc);
        },
        changePage(val) {
            let self = this;
            self.form.page = val;
            self.onSubmit();
        },
        onSearch(type) {
            this.form.page = 1;
            this.onSubmit(type);
        },
        onSubmit(type) {
            let self = this;
            if (type == "reset") {
                self.form = {
                    fx_type: "search",
                    fx_id: "",
                    zb_del: "",
                    zb_undo: "",
                    xmmc: "",
                    xmlx: "",
                    area: "",
                    min_date: "",
                    max_date: "",
                    min_money: "",
                    max_money: "",
                    min_zbxf: "",
                    max_zbxf: "",
                    min_zdxf: "",
                    max_zdxf: "",
                    min_average: "",
                    min_average: "",
                    min_effect: "",
                    max_effect: "",
                    min_count: "",
                    max_count: "",
                    rows: 10,
                    page: 1,
                    order: "",
                    sort: ""
                };
            }
            let params = self.form;
            self.loading = true;
            this.axios.post(
                "http://www.520coc.cn/Hydsjs/winBidMonitor",
                params,
                data => {
                    self.loading = false;
                    self.table.tableData = data.rows;
                    self.table.total = data.total - 0;
                }
            );
        },
        getCate() {
            this.axios.post("/index/project/cate", {}, data => {
                this.cate = data;
            });
        },
        clickFn(type, row) {
            let self = this;
            let params = {
                offer_id: self.data.offerid,
                user_id: self.$store.state.userInfo.user_id,
                zb_id: row.id,
                type,
                name: self.data.name
            };
            this.axios.post("/index/Offer_Model/offerImport", params, data => {
                if (data.status == "success") {
                    //导入成功
                    self.$emit("fnZbgs", "close");
                    // let {href} = this.$router.resolve({
                    //     path: `/modelBid1?offerid=${data.message}`
                    // });
                    // window.open(href, "_self");
                } else {
                    self.$message.error(data.message);
                }
            });
        }
    }
};
</script>

<style scope>
.el-form--inline .el-form-item {
    margin-right: 0 !important;
}
.el-dialog__body {
    padding: 10px 20px;
}
.el-form-item {
    margin-bottom: 10px;
}
</style>

<style lang="less" scoped>
@activeColor: #409eff;
@successColor: #67c23a;

.nomalInput {
    width: 153px;
}
.primary_btn {
    color: @activeColor;
    cursor: pointer;
}
.success_btn {
    color: @successColor;
    cursor: pointer;
}
.canot_btn {
    color: rgb(155, 146, 146);
    cursor: pointer;
}
</style>
