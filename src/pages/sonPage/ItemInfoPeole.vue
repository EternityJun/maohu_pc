<template>
    <div style="padding:0 20px">
        <div v-if="types === 'newAdd'">
            <p @click="handlePs(item)" :class="curPS === item.rylb ? 'per-sou-ac' : 'per-sou-de'" v-for="(item, index) in personSource" :key="index">
                <span>{{item.rylb}}</span>
                <span :style="curPS === item.rylb ? '' : 'color: #348bda'">({{item.count}})</span>
            </p>
        </div>
        <div class="add_header">
            <div class="header_left">
                当前选择人员：
                <span>{{nowRow.name}}</span>

            </div>

            <div class="header_right">
                <!-- <el-select v-show="this.types == 'newAdd'" v-model="option_ry_type" placeholder="请选择职位">
          <el-option v-for="item in ryTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select> -->
                <el-input style="width:200px" placeholder="搜索当前条件人员" v-model="searchName" clearable @keyup.enter.native="onKeyupsearch('search')"></el-input>
                <el-button type="primary" @click.prevent="onKeyupsearch('search')">搜索</el-button>
                <el-button v-if="!isShare" type="primary" v-show="this.types != 'newAdd'" @click.prevent="onKeyupsearch('all')">搜索全部</el-button>
            </div>
        </div>
        <div class="add footer">
            <div style="text-align:centerl;color:#E6A23C;margin-bottom:20px;">{{noPrson}}</div>
            <el-table :data="tableData" style="width: 100%;" v-loading="loading" border>
                <el-table-column label="序号" prop="sort" align="center" width="60px"></el-table-column>
                <el-table-column align="center" prop="jobName" label="姓名" min-width="12%">
                    <template slot-scope="scope">
                        <a v-if="scope.row.expire == 0" target="_blank" style="color:red" :href="scope.row.http">{{scope.row.name}}</a>
                        <a v-else-if="scope.row.is_onbuild == 1" target="_blank" style="color:#e6a23c" :href="scope.row.http">{{scope.row.name}}</a>
                        <a v-else target="_blank" style="color: rgb(64, 158, 255)" :href="scope.row.http">{{scope.row.name}}</a>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="bookNumber" label="证书名称" min-width="15%">
                    <template slot-scope="scope">
                        <div class="table_col_child">{{scope.row.rylb}}</div>
                        <div class="table_col_child" v-for="one in scope.row.other_arr" :key="one.id" :style="{color:one.expire-0?'':'#f56c6c'}">{{one.rylb}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="rank" label="证书级别/等级/岗位" min-width="12%">
                    <template slot-scope="scope">
                        <div class="table_col_child">{{scope.row.dj}}</div>
                        <div class="table_col_child" v-for="one in scope.row.other_arr" :key="one.id" :style="{color:one.expire-0?'':'#f56c6c'}">{{one.dj}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="certificateNumber" label="证书号" min-width="15%">
                    <template slot-scope="scope">
                        <div class="table_col_child">{{scope.row.zsh}}</div>
                        <div class="table_col_child" v-for="one in scope.row.other_arr" :key="one.id" :style="{color:one.expire-0?'':'#f56c6c'}">{{one.zsh}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="zczy" label="注册专业/专业/职称" min-width="12%">
                    <template slot-scope="scope">
                        <div class="table_col_child">{{scope.row.zczy}}</div>
                        <div class="table_col_child" v-for="one in scope.row.other_arr" :key="one.id" :style="{color:one.expire-0?'':'#f56c6c'}">{{one.zczy}}</div>
                    </template>
                </el-table-column>
                <el-table-column v-if="types == 'newAdd'" align="center" prop="zczy" label="职位" min-width="12%">
                    <template slot-scope="scope">
                        <el-select @change="handleChangeType(scope.row)" v-if="types == 'newAdd' && scope.row.is_select === 0 && !scope.row.proj_id && scope.row.is_onbuild != 1 && !isSl" v-model="ryTypes[scope.row.sort]" placeholder="请选择职位">
                            <el-option v-for="item in ryTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <span v-if="types == 'newAdd' && scope.row.is_select === 0 && !scope.row.proj_id && scope.row.is_onbuild != 1 && isSl">水利人员</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.proj_id" type="text" size="small" @click="onCheckyj(scope.row)">类似业绩</el-button>
                        <el-button v-if="scope.row.is_onbuild == 2" type="text" style="color:#cf9236" size="small" @click="onCheckzjyj(scope.row)">疑似在建</el-button>
                        <el-button v-if="scope.row.is_onbuild == 1" type="text" size="small" @click="onCheckzjyj(scope.row)">查看在建</el-button>
                        <el-button v-else-if="scope.row.is_select == 1" type="text" style="color:#f56c6c" size="small" :disabled="true">已使用</el-button>
                        <el-button v-else @click="onSelect(scope.row)" size="small">{{btnType=='change' ? '选择' : '增加'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="changepage" :current-page.sync="page" align="right" style="margin-top:10px" background layout="total,prev, pager, next" :total="total"></el-pagination>
        </div>
        <el-dialog append-to-body title="在建业绩列表" :visible.sync="checkzjyjtk" width="80%">
            <rynow-build :ry_row="nowbuild_row"></rynow-build>
        </el-dialog>
        <el-dialog append-to-body title="业绩列表" :visible.sync="checkyjtk" width="80%">
            <project-list :nowRow="nowyj_row"></project-list>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
import rynowBuild from "../template/ryNowBuild.vue";
import projectList from "../template/projectList.vue";
export default {
    props: {
        nowRow: null,
        types: null,
        ry_id: null,
        isShare: false,
        btnType: null,
        isSl: false
    },
    components: {
        rynowBuild,
        projectList
    },
    // props: ["tableData"],
    data() {
        return {
            gs_id: this.$route.query.gs_id,
            checkzjyjtk: false,
            checkyjtk: false,
            total: 0,
            page: 1,
            loading: false,
            searchName: "",
            option_ry_type: "", //人员类型
            curId: "",
            tableData: [],
            nowbuild_row: "", //在建人员id
            nowyj_row: "", //在建人员id
            ryTypeOption: [
                {
                    label: "项目经理",
                    value: "项目经理"
                },
                {
                    label: "技术负责人",
                    value: "技术负责人"
                },
                {
                    label: "其他主要人员",
                    value: "其他主要人员"
                }
            ],
            flag: 0,
            noPrson: "",
            ryTypes: [],
            personSource: [],
            curPS: "全部",
            dis: "search" // 判断是搜索还是全部搜索
        };
    },
    created() {
        console.log(this.gsId, "gs");
        this.curPs = "全部";
        this.getPersonList("search");
        this.handlePersonSource();
    },
    watch: {
        nowRow() {
            console.log(this.gsId, "gs");
            this.searchName = "";
            this.page = 1;
            this.total = 0;
            this.ryTypes = [];
            this.curPs = "全部";
            this.getPersonList("search");
            this.handlePersonSource();
        }
    },
    methods: {
        //
        handlePs(item) {
            this.curPS = item.rylb;
            this.page = 1;
            this.getPersonList("search");
        },
        //
        handlePersonSource() {
            let params = {
                gs_id: this.gs_id,
            }
            if (this.isSl) {
                params.type = 'slry';
            }
            this.axios.post(
                "/index/search_ry/personSource",
                params,
                data => {
                    if (data.status == "success") {
                        this.personSource = data.rows;
                    } else {
                    }
                }
            );
        },
        // 改变人员职称
        handleChangeType(row) {
            this.curId = row.id;
            console.log(this.option_ry_type, row, "--------------");
        },
        onKeyupsearch(dis) {
            this.dis = dis;
            this.total = 0;
            this.page = 1;
            this.getPersonList(dis);
        },
        //查看业绩
        onCheckyj(row) {
            this.checkyjtk = true;
            this.nowyj_row = row;
        },
        //查看在建在建
        onCheckzjyj(row) {
            this.checkzjyjtk = true;
            this.nowbuild_row = row;
        },
        //选择人员
        onSelect(row) {
            if (
                this.types === "newAdd" &&
                !this.isSl &&
                this.ryTypes[row.sort] === ""
            ) {
                this.$message({
                    message: "请先选择职位再进行增加!",
                    type: "warning"
                });
                return;
            }
            //选择
            // let obj = JSON.parse(JSON.stringify(this.nowRow));
            let obj = JSON.parse(JSON.stringify(row));
            obj.id = this.nowRow.id;
            if (this.types == "newAdd") {
                if (this.isSl) {
                    obj.zw = '水利人员'
                } else {
                    obj.zw = this.ryTypes[row.sort];
                }
                
            } else {
                obj.zw = this.nowRow.zw;
            }
            obj.other_arr = row.other_arr;
            obj.gs_id = this.nowRow.gs_id;
            obj.name = this.nowRow.name;
            obj.ry_id = this.ry_id;
            obj.ided = row.id; //更换数据id
            obj.named = row.name; //更换数据name
            obj.serial_num = this.nowRow.rowIndex;
            obj.jbxx_id = this.$route.query.jbxx_id;
            if (this.types == "change") {
                obj.cate = 2;
            } else if (this.types == "add") {
                obj.cate = 1;
            }
            console.log(obj, "canshu");
            this.axios.post("/index/search_ry/savePerson", obj, data => {
                this.loading = false;
                if (data.status == "success") {
                    this.$message({
                        type: "success",
                        message: "操作成功"
                    });
                    this.ryTypes = [];
                    if (this.types == "add" || this.types == "newAdd") {
                        this.$emit("onSelectNewuser", { type: "add" });
                    } else {
                        this.$emit("onSelectNewuser");
                    }
                } else {
                    this.$message({
                        type: "error",
                        message: data.message
                    });
                }
            });
        },
        //分页请求
        changepage(val) {
            this.page = val;
            this.getPersonList(this.dis);
        },
        getPersonList(dis) {
            this.tableData = [];
            this.loading = true;
            let row = this.nowRow;
            let obj = {};
            if (this.types == "newAdd") {
                obj = {
                    search1: "all",
                    name: this.searchName,
                    gs_id: this.gs_id,
                    ry_id: this.ry_id,
                    yj_id: row.yj_id,
                    page: this.page,
                    row: 10,
                    rylb: this.curPS
                };
                if (dis == "search") {
                    // if (!this.searchName) {
                    //   this.$message.error('请填写姓名')
                    //   this.loading = false
                    //   this.ryTypes = [];
                    //   return
                    // }
                } else {
                    this.loading = false;
                    return;
                }
            } else {
                obj = {
                    gs_id: row.gs_id,
                    ry_id: this.ry_id,
                    yj_id: this.nowRow.yj_id,
                    jbxx_id: this.$route.query.jbxx_id,
                    similar: this.nowRow.proj_id ? 1 : "",
                    zcz_dj: this.nowRow.zcz_dj,
                    zcz_zczy: this.nowRow.zcz_zczy,
                    zczy: row.major,
                    condition: row.level ? row.level : row.dj,
                    akz: row.akz,
                    rylb: row.rylb,
                    name: this.searchName,
                    page: this.page,
                    row: 10
                };
            }
            if (dis == "all") {
                obj.search1 = "all";
            }
            if (row.zw == "项目经理" || row.zw == "技术负责人") {
                obj.type = 1;
            } else if (row.zw == "其他主要人员") {
                obj.type = 3;
            } else {
                obj.type = 2;
            }
            if (this.types == "newAdd") {
                obj.type = 4;
                obj.is_add = 1;
            }
            if (this.isSl) {
                obj.type = 'slry';
            }
            if (row.zw == "水利人员") {
                obj.type = "slry";
                obj.gwmc = row.gwmc;
                obj.zgmc = row.rylb;
                obj.in_jst = "0";
            }
            this.axios.post("/index/search_ry/replacePerson", obj, data => {
                if (
                    data.status == "failed" &&
                    this.flag == 0 &&
                    this.isShare == true
                ) {
                    this.getPersonList("all");
                    this.noPrson = "当前条件暂无人员，已为您匹配全部人员";
                    this.flag = 1;
                    return;
                }
                if (data.status == "success") {
                    this.total = data.total;
                    this.tableData = data.rows.map((item, index) => {
                        return {
                            ...item,
                            sort: (this.page - 1) * 10 + index + 1
                        };
                    });
                    console.log(this.tableData, "data");
                    let ryTypes = [];
                    for (let i = 0; i < this.total; i++) {
                        if (this.ryTypes.length > 0 && this.ryTypes[i] !== "") {
                            ryTypes.push(this.ryTypes[i]);
                        } else {
                            ryTypes.push("");
                        }
                    }

                    this.ryTypes = ryTypes;
                }
                if (this.flag == 1 && this.isShare == true) {
                    this.noPrson = "当前条件暂无人员，已为您匹配全部人员";
                } else {
                    this.noPrson = "";
                }
                this.loading = false;
                this.flag = 0;
            });
        }
    }
};

</script>
<style scoped lang="less">
.per-sou-ac {
    display: inline-block;
    background-color: #348bda;
    color: #fff;
    padding: 5px 10px;
    // margin-right: 10px;
    border-radius: 4px;
    margin: 0 10px 10px 0;
    box-sizing: border-box;
    cursor: pointer;
}
.per-sou-de {
    display: inline-block;
    // margin-right: 10px;
    border-radius: 4px;
    padding: 5px 10px;
    margin: 0 10px 10px 0;
    cursor: pointer;
}
.add_header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    .header_left {
        display: flex;
        font-size: 20px;
        span {
            font-weight: 900;
        }
    }
    .header_right {
        flex: 1;
        text-align: right;
        input {
            width: 200px;
        }
    }
}
.table_col_child:first-child {
    padding-top: 6px;
    min-height: 36px;
}
.table_col_child:last-child {
    padding-bottom: 0;
    border-bottom: none;
    min-height: 36px;
}
.table_col_child {
    min-height: 48px;
    border-bottom: 1px solid #ebeef5;
    padding: 12px;
}
</style>
<style>
.table_cell_padding0 .cell {
    padding: 0;
}
</style>

