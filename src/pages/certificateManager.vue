<template>
    <div class="certificateManager">
        <body-top></body-top>
        <headMenu :index="'/certificateManager'"></headMenu>
        <div class="content">
            <el-row>
                <el-col>
                    <span class="total">人员总数：{{total}}条</span>
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="tableData" v-loading="loading" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
                    <el-table-column label="序号" width="60px" align="center" type="index">
                    </el-table-column>
                    <el-table-column align="center" prop="remark" label="数据来源" width="180">
                        <template slot-scope="scope">
                            <div style="cursor:pointer;" @click="handleClickSource(scope.row)">{{scope.row.remark}}
                                <span style="color: #409eff;">({{scope.row.remarkCount}})</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="type" label="类别">
                        <template slot-scope="scope">
                            <div style="cursor:pointer;" @click="handleClickType(scope.row)">{{scope.row.type}}
                                <span style="color: #409eff;">{{scope.row.type ? '(' + scope.row.typeCount + ')' : ''}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="major" label="专业">
                        <template slot-scope="scope">
                            <div style="cursor:pointer;" @click="handleClickMajor(scope.row)">{{scope.row.major}}
                                <span style="color: #409eff;">{{scope.row.major ? '(' + scope.row.majorCount + ')' : ''}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="level" label="等级" width="250px">
                        <template slot-scope="scope">
                            <div style="cursor:pointer;" @click="handleClickLevel(scope.row)">{{scope.row.level}}
                                <span style="color: #409eff;">{{scope.row.level ? '(' + scope.row.count + ')' : ''}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column align="center" prop="count" label="个数">
                        <template slot-scope="scope">
                            <div style="color: #409eff;cursor:pointer;" @click="handleClickCount(scope.row)">{{scope.row.count}}</div>
                        </template>
                    </el-table-column> -->
                </el-table>
                <!-- <el-pagination @current-change="handleChangePage" :total="total" :current-page.sync="currentPage" :page-size.sync="pageSize" align="right" style="margin-top:10px" background layout="total,prev, pager, next"></el-pagination> -->
            </el-row>
        </div>
    </div>
</template>

<script>
import headMenu from "./template/head_menu.vue";
import tableMregeFn from "./../tableMrege";
export default {
    components: {
        headMenu
    },
    data() {
        return {
            gs_id: localStorage.getItem("gs_id") || '7583',
            // gs_id: "7583",
            tableData: [],
            merge_array: [], // 合并相同行数据
            total: 0,
            currentPage: 1,
            pageSize: 10,
            loading: false,
            peopleCounts: 0 // 人员总数
        };
    },
    created() {
        document.title = "证件管理";
        // 请求列表数据
        // 
        this.loading = true;
        this.handleRequestList();
    },
    methods: {
        // 合并相同行
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            let prop = column.property;
            if (prop === "remark" || prop === "type" || prop === "major") {
                //如果存在prop
                const _row = this.merge_array[rowIndex][prop];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
        },
        // 请求表格列表数据
        handleRequestList() {
            this.axios.post(
                "/firm/people/peopleSourceNew",
                { gs_id: this.gs_id },
                data => {
                    if (data.status === "success") {
                        this.tableData = data.rows;
                        this.total = data.total;
                        // 合并行
                        this.merge_array = tableMregeFn.tableMrege(data.rows);
                        // this.tableData = data.rows.map((item, index) => {
                        //     return {
                        //         ...item,
                        //         remarkCount: this.merge_array[index].remark,
                        //         typeCount: this.merge_array[index].type,
                        //         majorCount: this.merge_array[index].major
                        //     }
                        // })
                        // console.log(this.merge_array, '合并数据')
                        // 计算合并行 分别的总个数
                        this.handleCounts(data.rows);
                    } else {
                        // this.$message.error(data.message);
                    }

                    this.loading = false;
                }
            );
        },
        // 点击表格行 等级
        handleClickLevel(row) {
            // 跳转页面
            let { href } = this.$router.resolve({
                path: `/certificateBrief?source=${row.remark}&type=${
                    row.type
                }&major=${row.major}&level=${row.level}`
            });
            window.open(href, 'certificateBrief');
        },
        // 点击表格行 专业
        handleClickMajor(row) {
            // 跳转页面
            let { href } = this.$router.resolve({
                path: `/certificateBrief?source=${row.remark}&type=${
                    row.type
                }&major=${row.major}&level=全部`
            });
            window.open(href, 'certificateBrief');
        },
        // 点击表格行 类别
        handleClickType(row) {
            // 跳转页面
            let { href } = this.$router.resolve({
                path: `/certificateBrief?source=${row.remark}&type=${
                    row.type
                }&major=全部&level=全部`
            });
            window.open(href, 'certificateBrief');
        },
        // 点击表格行 数据来源
        handleClickSource(row) {
            // 跳转页面
            let { href } = this.$router.resolve({
                path: `/certificateBrief?source=${
                    row.remark
                }&type=全部&major=全部&level=全部`
            });
            window.open(href, 'certificateBrief');
        },
        // 点击分页
        handleChangePage() {},
        // 统计个数
        handleCounts(datas) {
            this.merge_array.map((item, index) => {
                if (item.remark > 0) {
                    // 合并行 数据来源总个数
                    let remarkCount = 0;
                    for (let i = index; i < item.remark + index; i++) {
                        remarkCount += datas[i].count;
                    }

                    this.tableData[index].remarkCount = remarkCount;
                }

                if (item.type > 0) {
                    // 合并行 类别总个数
                    let typeCount = 0;
                    for (let i = index; i < item.type + index; i++) {
                        typeCount += datas[i].count;
                    }

                    this.tableData[index].typeCount = typeCount;
                }

                if (item.major > 0) {
                    // 合并行 专业总个数
                    let majorCount = 0;
                    for (let i = index; i < item.major + index; i++) {
                        majorCount += datas[i].count;
                    }

                    this.tableData[index].majorCount = majorCount;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.certificateManager {
    .total {
        font-size: 20px;
        line-height: 40px;
    }
    .content {
        width: 1200px;
        margin: 20px auto;
        cursor: default;
    }
}
</style>


