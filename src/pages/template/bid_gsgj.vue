<template>
    <div>
        <el-row>
            <el-col :span="20" :offset="2">
                <div class="" style="padding-left:20px">
                    <el-form :inline="true" ref="form" :model="form" label-width="" @submit.native.prevent>
                        <el-form-item label="地区">
                            <el-select v-model="form.xmdq" placeholder="不限制" style="width:180px">
                                <el-option v-for="item in cate.xmdq" :key="item.id" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="日期" label-width="55px">
                            <el-col :span="11">
                                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.min_date" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2" style="text-align:center">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择时间" v-model="form.max_date" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="金额" label-width="55px">
                            <el-input v-model="form.money" style="width:150px">
                                <template slot="append">万元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="项目类型" label-width="85px">
                            <el-select v-model="form.xmlxB" placeholder="不限制" style="width:250px" multiple>
                                <el-option v-for="item in cate.xmlxB" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('tj')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="table" style="height:1000px;margin-top:50px;">
                    <div class="table_footer">
                        <el-row :gutter="20">
                            <div style="position:absolute;left:3%;">
                                <el-button type="primary" icon="el-icon-d-arrow-left" @click="checkTableButton()"></el-button>
                            </div>
                            <div style="position:absolute;right:3%;">
                                <el-button type="primary" icon="el-icon-d-arrow-right" @click="checkTableButton()"></el-button>
                            </div>
                            <div :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'637px',zIndex:'9',display:tableIndex==1?'block':'none'}" @click="checkTable(2)"></div>
                            <div :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'0',zIndex:'9',display:tableIndex!=1?'block':'none'}" @click="checkTable(1)"></div>
                            <div :style="tableStyleL" @click="checkTable(1)">

                                <p :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==1?'center':'left',fontSize:'20px',color:'#67C23a'}">
                                    已审核公司&nbsp;
                                    <i class="el-icon-success"></i>
                                </p>
                                <el-row>
                                    <el-col :span="24">
                                        <el-form :inline="true" :model="formYsh" class="demo-form-inline" @submit.native.prevent>
                                            <el-form-item>
                                                <el-input v-model="formYsh.gsmc" placeholder="公司名称" style="width:444px" @keyup.enter.native="onSubmit('ss')"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formYsh.scale" placeholder="不限制" @change="onChangeArea('audited','formWsh')">
                                                    <el-option label="不限制" value=""></el-option>
                                                    <el-option label="川内企业" value="1"></el-option>
                                                    <el-option label="入川企业" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formYsh.scxw1" placeholder="该时间内投标记录不限制" clearable>
                                                    <el-option label="该时间内有投标记录√" value="1"></el-option>
                                                    <el-option label="该时间内没有投标记录×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formYsh.scxw2" placeholder="历年在项目投标记录不限制" clearable>
                                                    <el-option label="历年在项目有投标记录√" value="1"></el-option>
                                                    <el-option label="历年在项目没有投标记录×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formYsh.scxw3" placeholder="近18个月在该地区投标记录不限制" clearable>
                                                    <el-option label="近18个月在该地区有投标记录√" value="1"></el-option>
                                                    <el-option label="近18个月在该地区没有投标记录×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formYsh.zssl1" placeholder="参与项目金额不限制" clearable>
                                                    <el-option label="参与项目大于金额√" value="1"></el-option>
                                                    <el-option label="参与项目小于金额×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formYsh.zssl2" placeholder="所有业绩金额不限制" clearable>
                                                    <el-option label="所有业绩大于金额√" value="1"></el-option>
                                                    <el-option label="所有业绩小于金额×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formYsh.ywfx" placeholder="企业类型项目不限制" clearable>
                                                    <el-option label="企业参加过此类型项目√" value="1"></el-option>
                                                    <el-option label="企业未参加过类型项目×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>

                                            <el-form-item>
                                                <el-button type="primary" @click="onSubmit('ss')">查询</el-button>
                                                <el-button type="primary" @click="onSubmit('reset')">重置</el-button>
                                                <el-button type="primary" @click="auditing('all')">不通过</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </el-col>
                                </el-row>
                                <el-table :data="tableDataFirst" v-loading="loading" border @selection-change="handleSelectionChange">
                                    <el-table-column label="序号" header-align="center" align="center" width="80">
                                        <template slot-scope="scope">{{scope.$index+(pageL-1)*formYsh.rows+1}}</template>
                                    </el-table-column>
                                    <el-table-column type="selection" width="40" align="center">
                                    </el-table-column>
                                    <el-table-column prop="name" label="企业名称" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <el-button @click="open_gs(scope.row)" type="text">{{scope.row.gsmc}}</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="scxw1" label="该时间内有投标记录" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.scxw1==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.scxw1==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="scxw2" label="历年在该地区内有投标记录" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.scxw2==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.scxw2==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="scxw3" label="近18个月在该地区有投标记录" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.scxw3==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.scxw3==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="zssl1" label="参与项目大于此金额" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.zssl1==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.zssl1==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="zssl2" label="所有业绩大于金额" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.zssl2==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.zssl2==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="ywfx" label="企业参加过此类型项目" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.ywfx==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.ywfx==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="100" label="操作" align="center">
                                        <template slot-scope="scope">
                                            <el-button size="small" @click="auditing(scope.row)" type="primary">未审核</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination align="right" :current-page.sync="pageL" style="margin-top:10px" @size-change="sizeChange" @current-change="changePage" background layout="sizes,total,prev, pager, next" :total="totalL"></el-pagination>
                            </div>
                            <div :style="tableStyleR" @click="checkTable(2)">

                                <p :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==2?'center':'right',fontSize:'20px',color:'#f56c6c'}">
                                    未审核公司
                                    <i class="el-icon-error"></i>
                                </p>
                                <el-row>
                                    <el-col :span="24">
                                        <el-form :inline="true" :model="formWsh" class="demo-form-inline" @submit.native.prevent>
                                            <el-form-item>
                                                <el-input v-model="formWsh.gsmc" placeholder="公司名称" style="width:444px" @keyup.enter.native="onSubmit('ss')"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formWsh.scale" placeholder="不限制" @change="onChangeArea('audited','formWsh')">
                                                    <el-option label="不限制" value=""></el-option>
                                                    <el-option label="川内企业" value="1"></el-option>
                                                    <el-option label="入川企业" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formWsh.scxw1" placeholder="该时间内投标记录不限制" clearable>
                                                    <el-option label="该时间内有投标记录√" value="1"></el-option>
                                                    <el-option label="该时间内没有投标记录×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formWsh.scxw2" placeholder="历年在项目投标记录不限制" clearable>
                                                    <el-option label="历年在项目有投标记录√" value="1"></el-option>
                                                    <el-option label="历年在项目没有投标记录×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formWsh.scxw3" placeholder="近18个月在该地区投标记录不限制" clearable>
                                                    <el-option label="近18个月在该地区有投标记录√" value="1"></el-option>
                                                    <el-option label="近18个月在该地区没有投标记录×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formWsh.zssl1" placeholder="参与项目金额不限制" clearable>
                                                    <el-option label="参与项目大于金额√" value="1"></el-option>
                                                    <el-option label="参与项目小于金额×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formWsh.zssl2" placeholder="所有业绩金额不限制" clearable>
                                                    <el-option label="所有业绩大于金额√" value="1"></el-option>
                                                    <el-option label="所有业绩小于金额×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-select v-model="formWsh.ywfx" placeholder="企业类型项目不限制" clearable>
                                                    <el-option label="企业参加过此类型项目√" value="1"></el-option>
                                                    <el-option label="企业未参加过类型项目×" value="2"></el-option>
                                                </el-select>
                                            </el-form-item>

                                            <el-form-item>
                                                <el-button type="primary" @click="onSubmit('ss')">查询</el-button>
                                                <el-button type="primary" @click="onSubmit('reset')">重置</el-button>
                                                <el-button type="primary" @click="auditing('all')">通过</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </el-col>
                                </el-row>
                                <el-table :data="noTableDataFirst" v-loading="loading" border @selection-change="handleSelectionChange">
                                    <el-table-column label="序号" header-align="center" align="center" width="100">
                                        <template slot-scope="scope">{{scope.$index+(pageR-1)*formWsh.rows+1}}</template>
                                    </el-table-column>
                                    <el-table-column type="selection" width="40" align="center">
                                    </el-table-column>
                                    <el-table-column prop="name" label="企业名称" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <el-button @click="open_gs(scope.row)" type="text">{{scope.row.gsmc}}</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="scxw1" label="该时间内有投标记录" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.scxw1==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.scxw1==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="scxw2" label="历年在该地区内有投标记录" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.scxw2==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.scxw2==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="scxw3" label="近18个月在该地区有投标记录" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.scxw3==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.scxw3==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="zssl1" label="参与项目大于此金额" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.zssl1==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.zssl1==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="zssl2" label="所有业绩大于金额" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.zssl2==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.zssl2==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="ywfx" label="企业参加过此类型项目" min-width="40%" align="center">
                                        <template slot-scope="scope">
                                            <i class="el-icon-success success" v-show="scope.row.ywfx==1"></i>
                                            <i class="el-icon-error error" v-show="scope.row.ywfx==0"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="100" label="操作" align="center">
                                        <template slot-scope="scope">
                                            <el-button size="small" @click="auditing(scope.row)" type="primary">审核</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination align="right" :current-page.sync="pageR" style="margin-top:10px" @size-change="sizeChange" @current-change="changePage" background layout="sizes,total,prev, pager, next" :total="totalR"></el-pagination>
                            </div>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    props: ["data"],
    data() {
        return {
            cate: {},
            form: {
                xmdq: "",
                min_date: "",
                max_date: "",
                money: "",
                xmlxB: []
            },
            formYsh: {
                type: 1,
                gsmc: "",
                scale: "",
                scxw1: "",
                scxw2: "",
                scxw3: "",
                zssl1: "",
                zssl2: "",
                ywfx: "",
                page: 1,
                rows: 10
            },
            formWsh: {
                type: 0,
                gsmc: "",
                scale: "",
                scxw1: "",
                scxw2: "",
                scxw3: "",
                zssl1: "",
                zssl2: "",
                ywfx: "",
                page: 1,
                rows: 10
            },
            tableDataFirst: [],
            noTableDataFirst: [],
            loading: false,
            totalL: 0,
            totalR: 0,
            pageL: 1,
            pageR: 1,
            // 公司切换
            tableIndex: 1,
            tableStyleL:
                "box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);min-height:810px;height:860px;overflow:auto;position:absolute;width:80%;z-index:10;",
            tableStyleR:
                "box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);min-height:810px;height:860px;overflow:auto;position:absolute;width:80%;z-index:8;",
            is_change: false,
            multipleSelection: [],
            update: true,
            role: {}
        };
    },

    mounted() {
        this.p_data = JSON.parse(this.data);
        console.log(this.p_data);
        this.jbxx_id = this.p_data.jbxx_id;
        this.thread_id = this.p_data.thread_id;
        this.node_id = this.p_data.node_id;
        this.fn_role();
        this.fn_cate();
        this.companySet();
        this.isUpdate();
    },
    watch: {
        data: function() {
            this.p_data = JSON.parse(this.data);
            // console.log("公司工具条件");
            // console.log(this.p_data);
            this.jbxx_id = this.p_data.jbxx_id;
            this.thread_id = this.p_data.thread_id;
            this.node_id = this.p_data.node_id;
            this.companySet();
            this.isUpdate();
        },
        "form.xmdq": function() {
            this.fn_change();
        },
        "form.min_date": function() {
            this.fn_change();
        },
        "form.max_date": function() {
            this.fn_change();
        },
        "form.money": function() {
            this.fn_change();
        },
        "form.xmlxB": function() {
            this.fn_change();
        }
    },
    methods: {
        // 权限控制 点击公司名称时
        fn_role() {
            let self = this;
            self.axios.post(
                "/index/mine/role",
                {
                    user_id: this.$store.state.userInfo.user_id,
                    company_id: localStorage.getItem("company_id")
                },
                data => {
                    this.role = data;
                }
            );
        },
        //改变是否是否川内外
        onChangeArea(ajaxObj, dataobj) {
            if (dataobj == "formYsh") {
                this.pageL = 1;
                this.audited(1);
            } else if (dataobj == "formWsh") {
                this.pageR = 1;
                this.audited(2);
            }
        },
        isUpdate() {
            let params = {
                thread_id: this.thread_id,
                node_id: this.node_id
            };
            this.axios.post("/index/thread/isUpdate", params, data => {
                this.update = data.update;
            });
        },
        // 多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 已审核 未审核
        auditing(row) {
            if (!this.update) {
                this.$message.error("该节点已经运行完成，不能再修改条件");
                return;
            }
            let gs_id = "";
            if (row == "all") {
                let multipleSelection = this.multipleSelection;
                multipleSelection.forEach(element => {
                    gs_id += element.gs_id + ",";
                });
                gs_id = gs_id.substring(0, gs_id.length - 1);
            } else {
                gs_id = row.gs_id;
            }
            let params = {
                id: this.p_data.node_id, //点击的节点的id
                gs_id: gs_id,
                type: this.tableIndex == 1 ? 1 : 0 // 1:已审核到未审核
            };
            this.axios.post("/index/thread/Auditing", params, data => {
                this.audited(1);
                this.audited(2);
            });
        },
        companySet(jbxx_id) {
            //公司工具
            this.axios.post(
                "/index/task/companySet",
                { jbxx_id: this.jbxx_id, node_id: this.node_id },
                data => {
                    this.form.xmdq = data.xmdq;
                    this.form.money = data.money;
                    this.form.min_date = data.minDate;
                    this.form.max_date = data.maxDate;
                    this.form.xmlxB = data.xmlx || [];
                    this.audited(1);
                    this.audited(2);
                }
            );
        },
        // 跳转
        open_gs(row) {
            if (this.role.company_role !== "C") {
                let { href } = this.$router.resolve({
                    path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.gsmc}`
                });
                window.open(href, "公司详情" + row.gs_id);
            } else {
               this.axios.post('/index/mine/roleCompSource', { gs_id: row.gs_id }, res => {
          // 获取跳转页面结果
          //   console.log(res)
          if (res === '四川省建设厅') {
            let { href } = this.$router.resolve({
              path: `/gs_scjst?gs_id=${row.gs_id}`
            })
            window.open(href, '/gs_scjst' + row.gs_id)
          } else {
            let { href } = this.$router.resolve({
              path: `/gs_building?gs_id=${row.gs_id}`
            })
            window.open(href, '/gs_building' + row.gs_id)
          }
        })
            }
        },
        fn_change() {
            this.is_change = true;
        },
        fn_cate() {
            this.axios.post("/index/project/cate", {}, data => {
                this.cate = data;
            });
        },
        onSubmit(type) {
            switch (type) {
                case "tj":
                    if (!this.p_data.show_condition) {
                        this.$message.error(
                            "该节点已经运行完成，不能再修改条件"
                        );
                        return;
                    }
                    let params = {
                        jbxx_id: this.p_data.jbxx_id,
                        node_id: this.node_id
                    };
                    if (this.is_change) {
                        this.check_change(params);
                    }
                    break;
                case "ss":
                    this.audited(1);
                    this.audited(2);
                    break;
                case "reset":
                    if (this.tableIndex == 1) {
                        this.formYsh.gsmc = "";
                        this.formYsh.scale = "";
                        this.pageL = 1;
                        this.formYsh.scxw1 = "";
                        this.formYsh.scxw2 = "";
                        this.formYsh.scxw3 = "";
                        this.formYsh.zssl1 = "";
                        this.formYsh.zssl2 = "";
                        this.formYsh.ywfx = "";
                    } else {
                        this.formWsh.gsmc = "";
                        this.formWsh.scale = "";
                        this.formWsh.scxw1 = "";
                        this.formWsh.scxw2 = "";
                        this.formWsh.scxw3 = "";
                        this.formWsh.zssl1 = "";
                        this.formWsh.zssl2 = "";
                        this.formWsh.ywfx = "";
                        this.pageR = 1;
                    }

                    this.audited(1);
                    this.audited(2);
                    break;
                default:
                    break;
            }
        },
        check_change() {
            let self = this;
            let params = {
                node_id: self.node_id,
                jbxx_id: self.jbxx_id,
                tool: true,
                condition: {
                    xmdq: self.form.xmdq,
                    minDate: self.form.min_date,
                    maxDate: self.form.max_date,
                    money: self.form.money,
                    xmlx: self.form.xmlxB
                }
            };
            this.openFullScreen();
            this.axios.post("/index/task/check_change", params, data => {
                self.is_change = false;
                self.audited(1);
                self.audited(2);
            });
        },
        openFullScreen() {
            this.loading = true;
        },
        closeFullScreen() {
            this.loading = false;
        },
        audited(index) {
            let params = {
                jbxx_id: this.p_data.jbxx_id,
                id: this.p_data.node_id,
                order: "",
                ordername: "activity"
            };
            this.openFullScreen();
            if (index == 1) {
                params.type = this.formYsh.type;
                params.gsmc = this.formYsh.gsmc;
                params.scale = this.formYsh.scale;
                params.scxw1 = this.formYsh.scxw1;
                params.scxw2 = this.formYsh.scxw2;
                params.scxw3 = this.formYsh.scxw3;
                params.zssl1 = this.formYsh.zssl1;
                params.zssl2 = this.formYsh.zssl2;
                params.ywfx = this.formYsh.ywfx;
                params.rows = this.formYsh.rows;
                params.page = this.pageL;
                params.flag = "gsgj";
            } else {
                params.type = this.formWsh.type;
                params.gsmc = this.formWsh.gsmc;
                params.scale = this.formWsh.scale;
                params.scxw1 = this.formWsh.scxw1;
                params.scxw2 = this.formWsh.scxw2;
                params.scxw3 = this.formWsh.scxw3;
                params.zssl1 = this.formWsh.zssl1;
                params.zssl2 = this.formWsh.zssl2;
                params.ywfx = this.formWsh.ywfx;
                params.rows = this.formWsh.rows;
                params.page = this.pageR;
                params.flag = "gsgj";
            }
            this.axios.post("/index/thread/audited", params, data => {
                if (data.status == "success") {
                    if (params.type == 1) {
                        this.closeFullScreen();

                        this.tableDataFirst = data.rows;
                        this.totalL = data.total;
                    } else {
                        this.noTableDataFirst = data.rows;
                        this.totalR = data.total;
                    }
                } else {
                    if (params.type == 1) {
                        this.closeFullScreen();

                        if (params.page > 1) {
                            this.pageL = params.page - 1;
                            this.audited(1);
                        } else {
                            this.tableDataFirst = [];
                            this.totalL = 0;
                            this.pageL = 1;
                        }
                    } else {
                        if (params.page > 1) {
                            this.pageR = params.page - 1;
                            this.audited(2);
                        } else {
                            this.noTableDataFirst = [];
                            this.totalR = 0;
                            this.pageR = 1;
                        }
                    }
                }
            });
        },
        newPlan(params) {
            this.axios.post("/index/thread/newPlan", params, data => {
                this.edit = data.res;
            });
        },
        //改变页面
        changePage(val) {
            if (this.tableIndex == 1) {
                this.pageL = val;
            } else {
                this.pageR = val;
            }
            this.audited(1);
            this.audited(2);
        },
        sizeChange(val) {
            if (this.tableIndex == 1) {
                this.formYsh.rows = val;
                this.pageL = 1;
            } else {
                this.formWsh.rows = val;
                this.pageR = 1;
            }
            this.audited(1);
            this.audited(2);
        },
        //按钮无限切换
        checkTableButton() {
            if (this.tableIndex == 2) {
                this.checkTable(1);
            } else {
                this.checkTable(2);
            }
            // this.audited();
        },
        //切换表格
        checkTable(type) {
            if (type == 2) {
                this.tableIndex = 2;
                this.tableStyleL =
                    "box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(-10%) scale(0.8);position:absolute;width:80%;z-index:8;min-height:810px;height:860px;overflow:auto;transition: .3s;";
                this.tableStyleR =
                    "box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:80%;z-index:10;min-height:810px;height:860px;overflow:auto;transition: .3s;";
            } else {
                this.tableIndex = 1;
                this.tableStyleL =
                    "box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:80%;z-index:10;min-height:810px;height:860px;overflow:auto;transition: .3s;";
                this.tableStyleR =
                    "box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);position:absolute;width:80%;z-index:8;min-height:810px;height:860px;overflow:auto;transition: .3s;";
            }
        }
    }
};
</script>

<style>
.success {
    color: rgb(103, 194, 58);
}
.error {
    color: red;
}
</style>

<style lang="less" scoped>
</style>
