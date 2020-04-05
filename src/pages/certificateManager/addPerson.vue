<template>
    <div>
        <el-form :inline="true" label-position="right">
            <el-form-item label="人员名称">
                <el-input style="width:217px;" v-model="addPersonName" placeholder="请输入人员名称"></el-input>
            </el-form-item>
            <el-form-item label="证书编号">
                <el-input style="width:217px;" v-model="addCerNumber" placeholder="请输入证书编号"></el-input>
            </el-form-item>
            <!-- <el-form-item label="有效期">
                            <el-input v-model="addDate" placeholder="请输入有效期"></el-input>
                        </el-form-item>
                        <el-form-item label="有效期">
                            <el-date-picker style="width:130px" v-model="startTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                            <span style="width:12px;display:inline-block;text-align:center;">-</span>
                            <el-date-picker style="width:130px" v-model="endTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                        </el-form-item> -->
            <el-form-item>
                <el-button @click="handleClickAddBtn" type="primary">添加</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-table :data="tableData" v-loading="loading" border style="width: 100%; margin-top: 20px">
                <el-table-column align="center" prop="sort" label="序号" width="60">
                </el-table-column>
                <el-table-column align="center" prop="xm" label="姓名">
                    <template slot-scope="scope">
                        <el-button @click="handleClickName(scope.row)" :disabled="scope.row.modified === null" type="text">{{scope.row.xm}}</el-button>
                        <!-- <div style="color: #409eff;cursor:pointer;">{{scope.row.xm}}</div> -->
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="zczsh" label="证书编号">
                </el-table-column>
                <el-table-column align="center" prop="modified" label="入库时间">
                </el-table-column>
                <el-table-column align="center" prop="txt" label="备注"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button :disabled="scope.row.modified !== null" @click="handleClickEdit(scope.row)" type="primary" size="small">编辑</el-button>
                        <el-button :disabled="scope.row.modified !== null" @click="handleClickDelete(scope.row)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleChangePage" :total="total" :current-page.sync="currentPage" :page-size.sync="pageSize" align="right" style="margin-top:10px" background layout="total,prev, pager, next"></el-pagination>
        </el-row>
        <!-- 点击编辑按钮 弹出窗 -->
        <el-dialog width="400px" title="编辑人员" append-to-body :visible.sync="isShow3">
            <el-form label-width="80px" label-position="right">
                <el-form-item label="人员名称">
                    <el-input style="width:217px;" v-model="editName" placeholder="请输入人员名称"></el-input>
                </el-form-item>
                <el-form-item label="证书编号">
                    <el-input style="width:217px;" v-model="editNum" placeholder="请输入证书编号"></el-input>
                </el-form-item>
                <!-- <el-form-item label="备注">
                    <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="editRemark">
                    </el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-button @click="handleClickEditBtn" type="primary">确定</el-button>
                    <el-button @click="handleClickCancelBtn">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            gs_id: localStorage.getItem("gs_id"),
            user_id: localStorage.getItem("user_id"),
            // 添加人员
            addPersonName: "",
            addCerNumber: "",
            tableData: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            loading: false,
            isShow3: false,
            editName: '',
            editNum: '',
            editId: '',
            editRyId: '',
            editGsId: '',
        };
    },
    created() {
        // 请求人员列表
        this.loading = true;
        this.handleRequestList();
    },
    methods: {
        // 点击添加按钮 添加人员
        handleClickAddBtn() {
            if (this.addPersonName === "") {
                this.$message.error("人员名称不能为空");
                return;
            }

            if (this.addCerNumber === "") {
                this.$message.error("证件号不能为空");
                return;
            }

            this.$confirm("您确定要添加当前人员吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.loading = true;
                    this.handleRequestAddPerson();
                })
                .catch(() => {
                    this.addPersonName = "";
                    this.addCerNumber = "";
                });
        },
        // 调用添加人员接口
        handleRequestAddPerson() {
            this.axios.post(
                "/index/search_ry/add_people",
                {
                    gs_id: this.gs_id,
                    user_id: this.user_id,
                    name: this.addPersonName,
                    number: this.addCerNumber
                },
                data => {
                    if (data.status === "success") {
                        
                        this.addPersonName = "";
                        this.addCerNumber = "";

                        // 刷新人员列表
                        // this.loading = true;
                        this.handleRequestList();
                        this.$message({
                            message: "添加人员成功",
                            type: "success"
                        });
                    } else {
                        this.$message.error(data.message);
                        this.loading = false;
                    }
                }
            );
        },
        // 请求添加人员列表
        handleRequestList() {
            this.axios.post(
                "/index/search_ry/get_temp_staff",
                {
                    gs_id: this.gs_id,
                    user_id: this.user_id,
                    page: this.currentPage,
                    rows: this.pageSize
                },
                data => {
                    if (data.status === "success") {
                        this.tableData = data.rows.map((item, index) => {
                            return {
                                ...item,
                                sort:
                                    (this.currentPage - 1) * this.pageSize +
                                    index +
                                    1
                            };
                        });
                        this.total = data.total;
                    } else {
                        // this.$message.error(data.message);
                        this.tableData = [];
                        this.total = 0;
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
        // 点击表格行 操作列 编辑按钮
        handleClickEdit(row) {
            this.isShow3 = true;
            this.editName = row.xm;
            this.editNum = row.zczsh;
            this.editId = row.id;
            this.editRyId = row.ry_id;
            this.editGsId = row.gs_id;
        },
        // 点击表格行 操作列 删除按钮
        handleClickDelete(row) {
            this.$confirm("您确定要删除当前人员吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.axios.post(
                        "/index/search_ry/del_people",
                        { id: row.id },
                        data => {
                            if (data.status === "success") {
                                this.$message({
                                    message: "删除人员成功",
                                    type: "success"
                                });
                                // 刷新人员列表
                                this.loading = true;
                                this.handleRequestList();
                            } else {
                                this.$message.error(data.message);
                            }
                        }
                    );
                })
                .catch(() => {});
        },
        // 点击表格行 姓名字段
        handleClickName(row) {
            // 跳转页面
            let { href } = this.$router.resolve({
                path: `/ryDet?gs_id=${row.gs_id
                }&name=${row.xm}&staff_base_id=${row.staff_base_id}`
            });
            window.open(href, '人员详情' + row.gs_id + row.xm);
        },
        // 编辑人员弹窗 点击确定按钮
        handleClickEditBtn() {

            if (this.editName === "") {
                this.$message.error("人员名称不能为空");
                return;
            }

            if (this.editNum === "") {
                this.$message.error("证件号不能为空");
                return;
            }

            this.axios.post(
                "/index/search_ry/add_people",
                {
                    id: this.editId,
                    ry_id: this.editRyId,
                    gs_id: this.editGsId,
                    user_id: this.user_id,
                    name: this.editName,
                    number: this.editNum
                },
                data => {
                    if (data.status === 'success') {
                        this.isShow3 = false;
                        this.$message({
                            message: "编辑人员成功",
                            type: "success"
                        });

                        // 刷新人员列表
                        this.loading = true;
                        this.handleRequestList();
                    } else {
                        this.$message.error(data.message);
                    }
                }
            );
        },
        // 编辑人员弹窗 点击取消按钮
        handleClickCancelBtn() {
            this.isShow3 = false;
        }
    }
};
</script>

<style lang="less" scoped>
</style>


