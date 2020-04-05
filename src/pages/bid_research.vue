<template>
    <div class="bid_research">
        <h1>{{edit.xmmc}}</h1>
        <el-row style="margin:20px 0;">
            <el-col :span="5" :offset="7">
                <span>当前选择方案:</span>
                <el-select @change="onChangePLan" size="medium" v-model="threads.selectVal">
                    <el-option v-for="item in threads.data" :key="item.id" :label="item.node_name" :value="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="set_newPlan('bidResearch')">新建方案</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="success" @click="show_jbxx">项目基本信息</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="20" :offset="2">
                <div class="box_content">
                    <div draggable="true" v-loading="item.loading" @dragstart="handleDragStart($event, item)" @dragover.prevent="handleDragOver($event, item)" @dragenter="handleDragEnter($event, item)" @dragend="handleDragEnd($event, item)" class="box" :class="item.icon ? 'active_box' : ''" v-for="(item,index) in components " :key="index">
                        <div class="content">
                            <span>{{item.name}}</span>
                            <span v-if="item.have_data" class="have_data"></span>
                            <el-button @click="selectBox(item.name)" size="mini" :type="item.icon ? 'success' :'danger'" :icon="item.icon ? 'el-icon-check' : 'el-icon-close'" circle class="c_icon"></el-button>
                        </div>
                        <div class="btns">
                            <div class="config" @click="setConfig(item.tab)">配置</div>
                            <div class="switch-btn">
                                <span :class="item.no_info ? '' : 'active_btn'" @click="switchBtn(item,false)">否决</span>
                                <span>/</span>
                                <span :class="item.no_info ? 'active_btn' : ''" @click="switchBtn(item,true)">参考</span>
                            </div>
                        </div>
                    </div>
                    <el-button type="primary" class="operation" @click="operate">运算</el-button>
                    <!-- <el-button type="danger" class="operation" @click="cancelOperate">取消运算</el-button> -->
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <!-- <p class="table-title" style="color:#2f80d1">预研公司集</p> -->
                <audit-table @changeStateTrue="changeStateTrue" @changeStateFalse="changeStateFalse" v-loading="count_ajax >=2 ? false : true" v-on:changeYshData="changeYshData" v-on:fnAddCompanyToProject="fnAddCompanyToProject" v-on:auditNoAudit="ajaxOnYesorNoList" :yshData="yesGsData" :wshData="noGsData" :allData="allGsData" :operationState="operationState"></audit-table>
            </el-col>
        </el-row>
        <el-row style="margin-top:50px;">
            <el-col :span="22" :offset="1">
                <div class="diplay-flex-column">
                    <p class="table-title" style="color:#2f80d1">流程控制</p>
                    <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
                        <el-form-item style="width:180px">
                            <el-input clearable placeholder="公司名称" v-model="yesGetedGsData.formData.gsmc" @keydown.enter.native="onSearch('ajaxYesGetedGsList','yesGetedGsData')"></el-input>
                        </el-form-item>
                        <el-form-item style="width:110px">
                            <el-select placeholder="不限制" v-model="yesGetedGsData.formData.areaTypeVal" @change="onChangeArea('ajaxYesGetedGsList','yesGetedGsData')">
                                <el-option label="不限制" value="0"></el-option>
                                <el-option label="川内企业" value="1"></el-option>
                                <el-option label="入川企业" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSearch('ajaxYesGetedGsList','yesGetedGsData')">查询</el-button>
                            <el-button @click="onResetForm('ajaxYesGetedGsList','yesGetedGsData')">重置</el-button>
                        </el-form-item>
                        <el-form-item style="width:120px;margin-left:20px;">
                            <el-select placeholder="选择" v-model="yesGetedGsData.formData.fp_bs_sh">
                                <el-option key="1" label="分配" value="分配"></el-option>
                                <el-option key="2" label="标书制作" value="标书制作"></el-option>
                                <el-option key="3" label="人工审核" value="人工审核"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="width:110px">
                            <el-select placeholder="选择人员" v-model="yesGetedGsData.formData.ryVal" @change="onDistribute_button('all','ajaxYesGetedGsList',yesGetedGsData.formData.ryVal,yesGetedGsData.selectRows,'audit_user_id','',yesGetedGsData.formData.fp_bs_sh)">
                                <el-option label value></el-option>
                                <el-option v-for="item in allUsers[yesGetedGsData.formData.fp_bs_sh]" :key="item.id" :label="item.username" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <!-- <el-button @click="onDistribute_button('all','ajaxYesGetedGsList',yesGetedGsData.formData.ryVal,yesGetedGsData.selectRows,'audit_user_id','',yesGetedGsData.formData.fp_bs_sh)">确定</el-button> -->
                        </el-form-item>
                        <el-form-item style="margin-left:20px;">
                            <el-select style="width:150px" filterable placeholder="方案" v-model="yesGetedGsData.formData.planVal">
                                <el-option label value></el-option>
                                <el-option v-for="item in planList" :key="item.id" :label="item.node_name" :value="item.id"></el-option>
                            </el-select>
                            <el-button type="primary" @click="onExecutePlan('yesGetedGsData','ajaxYesGetedGsList',yesGetedGsData.formData.planVal)">执行方案</el-button>
                            <el-button type="success" @click="set_newPlan('tj')">添加验证</el-button>
                            <el-select style="width:150px;margin-left:20px;" v-model="open_close" placeholder="开通或关闭展示" @change="onIsDisplay('','ajaxYesGetedGsList',yesGetedGsData.selectRows)">
                                <el-option label="开通展示" value="yes"></el-option>
                                <el-option label="取消开通" value="no"></el-option>
                            </el-select>
                            <!-- <el-button @click="onIsDisplay('yes','ajaxYesGetedGsList',yesGetedGsData.selectRows)">开通展示</el-button> -->
                            <!-- <el-button @click="onIsDisplay('no','ajaxYesGetedGsList',yesGetedGsData.selectRows)">取消开通</el-button> -->
                        </el-form-item>
                        <el-form-item style="position:absolute;right:70px;">
                            <el-button type="danger" @click="onDeleteGs('all','ajaxYesGetedGsList','yesGetedGsData')">批量删除</el-button>
                        </el-form-item>
                    </el-form>
                    <div style="flex:1">
                        <el-table height="700px" border :data="yesGetedGsData.rows" v-loading="yesGetedGsData.loading" @select-all="onSelect_yesGetedGsRows" @select="onSelect_yesGetedGsRows">
                            <el-table-column type="selection" width="50px" align="center"></el-table-column>

                            <el-table-column type="index" width="50px" label="序号" align="center">
                                <template slot-scope="scope">{{scope.$index+(yesGetedGsData.page-1)*yesGetedGsData.row+1}}</template>
                            </el-table-column>
                            <el-table-column prop="gsmc" label="公司名称" align="center">
                                <template slot-scope="scope">
                                    <div style="display:flex">
                                        <div class="link_text" @click="openGs(scope.row)">{{scope.row.gsmc}}</div>
                                        <div style="padding-left:2px">
                                            <i v-if="scope.row.take_sign==1 || scope.row.take_sign==2" style="color:#54e20d" class="el-icon-check"></i>
                                            <i v-if="scope.row.take_sign==2" style="color:#54e20d" class="el-icon-check"></i>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="human_user" width="90px" label="审核人员" align="center">
                                <template slot-scope="scope">
                                    <change-ry :ry_list="allUsers" :extraObj="{type:'人工审核',ajaxFn:'ajaxYesGetedGsList',dataObj:'yesGetedGsData',ry_type:'human_user_id'}" :row="scope.row" :ry="scope.row.human_user" @onSelect="onListInSelect"></change-ry>
                                </template>
                            </el-table-column>
                            <el-table-column prop="audit_user" width="100px" label="拿公司人员" align="center">
                                <template slot-scope="scope">
                                    <change-ry :ry_list="allUsers" :extraObj="{type:'分配',ajaxFn:'ajaxYesGetedGsList',dataObj:'yesGetedGsData',ry_type:'audit_user_id'}" :row="scope.row" :ry="scope.row.audit_user" @onSelect="onListInSelect"></change-ry>
                                </template>
                            </el-table-column>
                            <el-table-column prop="tender_user" width="110px" label="制作标书人员" align="center">
                                <template slot-scope="scope">
                                    <change-ry :ry_list="allUsers" :extraObj="{type:'标书制作',ajaxFn:'ajaxYesGetedGsList',dataObj:'yesGetedGsData',ry_type:'tender_user_id'}" :row="scope.row" :ry="scope.row.tender_user" @onSelect="onListInSelect"></change-ry>
                                </template>
                            </el-table-column>
                            <el-table-column prop label="认识的人" width="100px" align="center">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.firm.length > 0">
                                        <change-ry :ry_list="{'认识的人':computeKnow(scope.row.firm)}" :extraObj="{type:'认识的人',ajaxFn:'ajaxYesGetedGsList',dataObj:'yesGetedGsData',ry_type:'audit_user_id'}" :row="scope.row" ry="选择" @onSelect="onListInSelect"></change-ry>
                                    </div>
                                    <div v-else>-</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="已选方案" align="center"></el-table-column>
                            <el-table-column prop="sign" label="条件满足概况" align="center">
                                <template slot-scope="scope">
                                    <div @click="onCheckResult(scope.row)" style="cursor:pointer">
                                        <el-button :style="{'color':item.status?'#5daf34':'red'}" type="text" size="medium" v-for="item in scope.row.sign" :key="item.id">{{item.name}}{{item.count?'('+item.count+'个)':''}}</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="display" width="150px" label="是否已开通展示" align="center">
                                <template slot-scope="scope">
                                    <el-button v-if="scope.row.display == 1" size="mini" type="success" icon="el-icon-check" circle @click="onIsDisplay('no','ajaxYesGetedGsList',[scope.row],'one')"></el-button>
                                    <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onIsDisplay('yes','ajaxYesGetedGsList',[scope.row],'one')"></el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="100px" align="center">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="danger" @click="onDeleteGs('one','ajaxYesGetedGsList',scope.row.gs_id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-pagination style="margin-top:20px" :current-page.sync="yesGetedGsData.page" :page-size="this.yesGetedGsData.row" @current-change="yesGetedGsChangePage" @size-change="yesGetedGsChangeSize" align="right" background layout="sizes,total,prev, pager, next" :total="yesGetedGsData.total"></el-pagination>
                </div>
            </el-col>
        </el-row>
        <div v-if="research_plan.dialogVisible">
            <el-dialog title="新建方案" :visible.sync="research_plan.dialogVisible" width="50%">
                <bid-new-plan v-on:closeDialog="closeDialog" v-on:onSubmitNewPlan="onSubmitNewPlan" :data="{jbxx_id:research_plan.id,name:research_plan.name,tab:'bidResearch'}"></bid-new-plan>
            </el-dialog>
        </div>
        <div v-if="jbxx.dialogVisible">
            <el-dialog :visible.sync="jbxx.dialogVisible" width="50%">
                <bid-jbxx :jbxxId="jbxx_id"></bid-jbxx>
            </el-dialog>
        </div>
        <!-- 1.4.1 -->
        <!-- <div v-if="zhubiao.dialogVisible"> -->
        <el-dialog title="1.4.1条件设置" :visible.sync="zhubiao.dialogVisible" width="98%" top="10px" class="zhubiao_dialog">
            <item-config v-on:closeDialog="closeDialog" v-on:onSubmitConfig="fn_zb" :dataset="JSON.stringify(zhubiao.set_condition)"></item-config>
        </el-dialog>
        <!-- </div> -->
        <!-- 信用评价 -->
        <!-- <div v-if="xypj.dialogVisible"> -->
        <el-dialog width="40%" title="信用评价" :visible.sync="xypj.dialogVisible" append-to-body>
            <bid-xypj v-on:closeDialog="closeDialog" :dataset="JSON.stringify(xypj.dataset)" v-on:fnXypj="fn_xypj"></bid-xypj>
        </el-dialog>
        <!-- </div> -->
        <!-- 公司工具 -->
        <!-- <div v-if="gsgj.dialogVisible"> -->
        <el-dialog width="80%" title="公司工具" :visible.sync="gsgj.dialogVisible" append-to-body>
            <bid-gsgj v-on:closeDialog="closeDialog" :data="JSON.stringify(gsgj.dataset)" v-on:fnGsgj="fn_gsgj"></bid-gsgj>
        </el-dialog>
        <!-- </div> -->
        <!-- 公司行为数据分析 -->
        <!-- <div v-if="gsxw.dialogVisible"> -->
        <el-dialog width="80%" title="公司行为数据分析" :visible.sync="gsxw.dialogVisible" append-to-body>
            <bid-gsxw v-on:closeDialog="closeDialog" :data="JSON.stringify(gsxw.dataset)" v-on:fnGsxw="fn_gsxw"></bid-gsxw>
        </el-dialog>
        <!-- </div> -->
    </div>
</template>
<script>
import bidNewPlan from "./template/bid_newPlan.vue";
import bidJbxx from "./template/bid_jbxx.vue";
import itemConfig from "./ItemConfig2.vue";
import bidGsgj from "./template/bid_gsgj2.vue";
import bidXypj from "./template/bid_xypj.vue";
import bidGsxw from "./template/bid_gsxw.vue";
import changeRy from "./template/changeRy.vue";
import AuditTable from "./template/AuditTable.vue";
import { getDate } from "./../store/formatter";

export default {
    data() {
        return {
            open_close: "",
            count_ajax: 0,
            thread_id: "",
            jbxx_id: "117",
            cate: "1",
            edit: {
                xmmc: "11"
            },
            threads: {
                data: [],
                selectVal: ""
            },
            research_plan: {
                dialogVisible: false,
                name: "",
                id: "",
                tab: "bidResearch"
            },
            jbxx: {
                dialogVisible: false
            },
            components: [
                {
                    name: "1.4.1",
                    tab: "zhubiao",
                    icon: false,
                    func: "saveZz",
                    func_s: "onConfirmrun",
                    no_info: false, // false是否决，true参考
                    id: "",
                    zz_id: "",
                    yj_id: "",
                    ry_id: "",
                    have_data: false,
                    loading: false,
                    isChange: false, // 是否修改条件
                    no_info_change: false // 是否修改参考否决
                },
                {
                    name: "信用",
                    tab: "xypj",
                    icon: false,
                    func: "saveCredit",
                    func_s: "searchCredit",
                    no_info: true,
                    id: "",
                    have_data: false,
                    loading: false,
                    isChange: false,
                    no_info_change: false // 是否修改参考否决
                },
                {
                    name: "公司工具",
                    tab: "gsgj",
                    icon: false,
                    func: "saveCompSet",
                    func_s: "checkCompSet",
                    no_info: true,
                    id: "",
                    have_data: false,
                    isChange: false,
                    loading: false,
                    no_info_change: false // 是否修改参考否决
                },
                {
                    name: "公司行为数据分析",
                    tab: "gsxw",
                    icon: false,
                    func: "saveCompBehavior",
                    func_s: "checkCompBehavior",
                    no_info: true,
                    id: "",
                    have_data: false,
                    isChange: false,
                    loading: false,
                    no_info_change: false // 是否修改参考否决
                },
                {
                    name: "行业工具",
                    tab: "hygj",
                    icon: false,
                    func: "saveHygj",
                    func_s: "checkCompSet",
                    no_info: true,
                    id: "",
                    have_data: false,
                    loading: false,
                    isChange: false,
                    no_info_change: false // 是否修改参考否决
                }
            ],
            pass: [],
            pass_func: [],
            pass_cate: {},
            zhubiao: {
                dialogVisible: false,
                have_data: false,
                set_condition: {
                    // 传入的数据
                }
            },
            xypj: {
                dialogVisible: false,
                have_data: false,
                xy_id: "",
                data: {},
                dataset: {}
            },
            gsgj: {
                dialogVisible: false,
                have_data: false,
                gsgj_id: "",
                dataset: {
                    xmdq: "",
                    xmlx: "",
                    minDate: "",
                    maxDate: "",
                    money: "",
                    cate: "",
                    scxw1: "",
                    scxw2: "",
                    scxw3: "",
                    zssl1: "",
                    zssl2: "",
                    ywfx: ""
                }
                // data: {}
            },
            hygj: {
                dialogVisible: false,
                have_data: false
            },
            gsxw: {
                dialogVisible: false,
                have_data: false,
                gsxw_id: "",
                data: {},
                dataset: {}
            },
            dragging: null,
            yesTable: [{}],
            form: {
                // 1.4.1
                zz_id: "",
                yj_id: "",
                ry_id: "",
                zz: {
                    zzyes: false,
                    selected_zzTransferL: [], // 储存选择的条件
                    selected_zzTransferR: [], // 储存选择的条件
                    ajax_data: {
                        orand: ""
                    },
                    display: {
                        selected_zzL: [], // 资质默认选中项
                        selected_zzTextL: "",
                        selected_zzValueL: [], // 资质选中项
                        selected_zzR: [],
                        selected_zzTextR: "",
                        selected_zzValueR: [],
                        selected_zzContentL: [],
                        selected_zzContentR: []
                    }
                },
                xmjl: {
                    xmjlyes: false,
                    selectedAll: [
                        {
                            jzsz: "",
                            zy: "",
                            akz: "",
                            zcz_zczy: "",
                            zcz_name: "",
                            zcz_dj: ""
                        }
                    ]
                },
                xy: {
                    xymc: "",
                    ajax_data: {
                        xymc: "",
                        xytype: "",
                        df: "",
                        pmrq: "1"
                    }
                },
                jsfzr: {
                    jsfzryes: false,
                    selectedAll: [
                        {
                            jzsz: "",
                            zy: "",
                            akz: "",
                            zcz_zczy: "",
                            zcz_name: "",
                            zcz_dj: ""
                        }
                    ]
                },
                xmjl_yj: {
                    xmjlyjyes: false
                },
                lsyj: {
                    lsyjyes: false,
                    checkAll: false, // 是否全选
                    default_date: new Date(),
                    yjInputKey: "",
                    yjlyOptions: [], // 复选框列表
                    otheryq: [],
                    ajax_data: {
                        year: "", // 年
                        date: {
                            minTime: "",
                            maxTime: new Date()
                        }, // 时间范围
                        xmlx: "",
                        YjTags: [], // 关键词
                        zmj: "", // 总面积
                        money: "",
                        kgwg: [],
                        gcyt: "",
                        checkedList: [], // 选中类表
                        selectOtheryq: ["finish"]
                    }
                },
                xcsgry: {
                    xcsgryyes: false,
                    // 施工人员的按钮数据
                    userList: [],
                    // 施工人员选择数据
                    selectedAll: []
                },
                otherry: {
                    otherryyes: false,
                    selectedAll: {
                        zjgcs: [
                            {
                                zczy: "",
                                zsh: ""
                            }
                        ],
                        zcaqgcs: [
                            {
                                zczy: "",
                                zsh: ""
                            }
                        ]
                    }
                },
                // 水利人员
                slry: {
                    selectedAll: [],
                    display: [
                        {
                            jst: false,
                            zgmc: "", //资格名称
                            zczy: "", //专业
                            zsh: "", //安考证
                            zc: "", //职称
                            gwmc: "" //岗位名称
                        }
                    ]
                }
            },
            // 页面左侧 类似业绩 勾选了水利
            waterForm: {
                minKgsj: "", //开工时间
                maxKgsj: "", //开工时间
                sminHtqx: "", //开始最小合同期限
                smaxHtqx: "", //开始最大合同期限
                eminHtqx: "", //结束最小合同期限
                emaxHtqx: "", //结束最大合同期限
                sminSjgq: "", //开始最小实际工期
                smaxSjgq: "", //开始最大实际工期
                eminSjgq: "", //结束最小实际工期
                emaxSjgq: "", //结束最大实际工期
                htminMoney: "", //最小合同金额
                htmaxMoney: "", //最大合同金额
                jsminMoney: "", //最小结算金额
                jsmaxMoney: "", //最大结算金额
                gczt: [], //项目状态
                states: ["开工在建", "完工待验收", "完工已验收"], //项目状态
                gcdbs: [], // 工程等别下拉列表
                gcjbs: [], // 工程级别
                gcgms: [], // 工程规模
                gcdb: "", //工程等别
                gcjb: "", //工程级别
                gcgm: "", //工程规模
                key: "", // 当前输入的关键词
                lsyj: "", // 类似业绩
                isIndeterminate: true,
                checkAll: false,
                keys: [], // 添加的关键词

                checkWater: false // 勾选了水利
            },
            // 水利人员 下拉列表数据
            waterPerson: {
                radio: "建设厅人员",
                zgmc: [], // 资格名称
                zczy: [], // 专业
                zsh: [], // 安考证
                zc: [], // 职称
                gwmc: [] // 岗位名称
            },
            value_kgwg: [],
            // 已审核数据
            yesGsData: {
                formData: {
                    gsmc: "",
                    areaTypeVal: "0",
                    ryVal: ""
                },
                selectRows: [],
                page: 1,
                tableNewData: "",
                total: 0,
                row: 10,
                zbMinNum: "",
                zbMaxNum: "",
                tbMinNum: "",
                tbMaxNum: "",
                rows: [],
                table: {},
                loading: true,
                jbxx_id: "",
                order: "desc",
                ordername: "activity ",
                gsgzType: ""
            },
            // 未审核数据
            noGsData: {
                formData: {
                    gsmc: "",
                    areaTypeVal: "0"
                },
                rows: [],
                total: 0,
                page: 1,
                row: 10,
                tableNewData: "",
                zbMinNum: "",
                zbMaxNum: "",
                tbMinNum: "",
                tbMaxNum: "",
                loading: true,
                jbxx_id: "",
                order: "desc",
                ordername: "activity ",
                gsgzType: ""
            },
            // 全部公司数据
            allGsData: {
                formData: {
                    gsmc: "",
                    areaTypeVal: "0",
                    ryVal: ""
                },
                selectRows: [],
                rows: [],
                loading: true,
                page: 1,
                total: 0,
                row: 10
            },
            // 已拿到的公司集合
            yesGetedGsData: {
                formData: {
                    gsmc: "",
                    areaTypeVal: "0",
                    ryVal: "",
                    planVal: "",
                    fp_bs_sh: "分配"
                },
                selectRows: [],
                rows: [],
                loading: false,
                page: 1,
                total: 0,
                row: 10
            },
            planList: [],
            allUsers: [],
            user_cate: "全部",
            // 这个是记录  table 组件名字的编号
            operationState: true,
            role: {}
        };
    },
    created() {
        const self_ = this;
        window.addEventListener(
            "message",
            function(event) {
                // 父接受
                if (event.data == "刷新") {
                    self_.getPlans();
                }
            },
            false
        );
    },
    mounted() {
        this.jbxx_id = this.$route.query.jbxx_id;
        this.yesGsData.jbxx_id = this.$route.query.jbxx_id;
        this.noGsData.jbxx_id = this.$route.query.jbxx_id;
        this.yesGsData.thread_id = this.$route.query.thread_id;
        this.noGsData.thread_id = this.$route.query.thread_id;
        this.thread_id = this.$route.query.thread_id;
        this.pid = this.$route.query.thread_id;
        this.fn_role();
        this.fn_edit();
        this.getThreads();
        this.ajaxGetUser();
        this.getPlans();
        this.getComponents();
        this.ajaxAllGsList();
        this.ajaxYesGetedGsList();
    },
    components: {
        bidNewPlan,
        bidJbxx,
        itemConfig,
        bidGsgj,
        bidXypj,
        bidGsxw,
        changeRy,
        AuditTable
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
        changeStateTrue() {
            this.operationState = true;
        },
        changeStateFalse() {
            this.operationState = false;
        },
        // 点击公司名称
        openGs(row) {
            if (this.role.company_role !== "C") {
                let { href } = this.$router.resolve({
                    path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.gsmc}`
                });
                window.open(href, "公司详情" + row.gs_id);
            } else {
                this.axios.post(
                    "/index/mine/roleCompSource",
                    { gs_id: row.gs_id },
                    res => {
                        // 获取跳转页面结果
                        //   console.log(res)
                        if (res === "四川省建设厅") {
                            let { href } = this.$router.resolve({
                                path: `/gs_scjst?gs_id=${row.gs_id}`
                            });
                            window.open(href, "/gs_scjst" + row.gs_id);
                        } else {
                            let { href } = this.$router.resolve({
                                path: `/gs_building?gs_id=${row.gs_id}`
                            });
                            window.open(href, "/gs_building" + row.gs_id);
                        }
                    }
                );
            }
        },
        handleDragStart(e, item) {
            this.dragging = item;
        },
        handleDragEnd(e, item) {
            this.dragging = null;
        },
        handleDragOver(e) {
            e.dataTransfer.dropEffect = "move"; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
        },
        handleDragEnter(e, item) {
            e.dataTransfer.effectAllowed = "move"; // 为需要移动的元素设置dragstart事件
            if (item === this.dragging) {
                return;
            }
            const newItems = [...this.components];
            const src = newItems.indexOf(this.dragging);
            const dst = newItems.indexOf(item);
            newItems.splice(dst, 0, ...newItems.splice(src, 1));

            this.components = newItems;
            this.formatComponents();
        },
        formatComponents() {
            this.components.map((v, i) => {
                if (
                    (v.name == "公司工具" || v.name == "公司行为数据分析") &&
                    i == 0
                ) {
                    v.no_info = false;
                }
            });
        },
        closeDialog(data) {
            this[data]["dialogVisible"] = false;
        },
        computeKnow(d) {
            return d.map(v => {
                return {
                    id: v.user_id,
                    username: v.username
                };
            });
        },
        getComponents() {
            this.axios.post(
                "/index/thread/getComponents",
                {
                    thread_id: this.thread_id
                },
                data => {
                    this.ajaxYesGsList();
                    this.ajaxNoGsList();
                    if (data.status == "success") {
                        let components = JSON.parse(data.message);
                        this.components = components;
                        // alert(1)
                        this.compBehaviorGet();
                        this.companySet();
                        this.displayCredit();
                    } else {
                        this.components = [
                            {
                                name: "1.4.1",
                                tab: "zhubiao",
                                icon: false,
                                func: "saveZz",
                                func_s: "onConfirmrun",
                                no_info: false,
                                id: "",
                                zz_id: "",
                                yj_id: "",
                                ry_id: "",
                                have_data: false,
                                loading: false,
                                isChange: false,
                                no_info_change: false // 是否修改参考否决
                            },
                            {
                                name: "信用",
                                tab: "xypj",
                                icon: false,
                                func: "saveCredit",
                                func_s: "searchCredit",
                                no_info: true,
                                id: "",
                                have_data: false,
                                loading: false,
                                isChange: false,
                                no_info_change: false // 是否修改参考否决
                            },
                            {
                                name: "公司工具",
                                tab: "gsgj",
                                icon: false,
                                func: "saveCompSet",
                                func_s: "checkCompSet",
                                no_info: true,
                                id: "",
                                have_data: false,
                                isChange: false,
                                loading: false,
                                no_info_change: false // 是否修改参考否决
                            },
                            {
                                name: "公司行为数据分析",
                                tab: "gsxw",
                                icon: false,
                                func: "saveCompBehavior",
                                func_s: "checkCompBehavior",
                                no_info: true,
                                id: "",
                                have_data: false,
                                isChange: false,
                                loading: false,
                                no_info_change: false // 是否修改参考否决
                            },
                            {
                                name: "行业工具",
                                tab: "hygj",
                                icon: false,
                                func: "saveHygj",
                                func_s: "checkCompSet",
                                no_info: true,
                                id: "",
                                have_data: false,
                                isChange: false,
                                loading: false,
                                no_info_change: false // 是否修改参考否决
                            }
                        ];
                    }
                }
            );
        },
        saveComponents() {
            this.components.map(v => {
                v.isChange = false;
                v.no_info_change = false;
            });
            this.axios.post(
                "/index/thread/saveComponents",
                {
                    thread_id: this.thread_id,
                    components: JSON.stringify(this.components)
                },
                data => {
                    if (data.status == "success") {
                        // alert(2)

                        this.ajaxYesGsList();
                        this.ajaxNoGsList();
                        this.count_ajax = 0;
                    }
                }
            );
        },
        // 获取人员列表
        ajaxGetUser() {
            this.axios.post(
                "/index/project/getUsers",
                {
                    company_id: localStorage.getItem("company_id")
                },
                data => {
                    this.allUsers = data.rows;
                }
            );
        },
        // 获取方案列表
        getPlans() {
            this.axios.post(
                "/Index/thread/getThread",
                {
                    jbxx_id: this.jbxx_id,
                    cate: 3
                },
                data => {
                    if (data.status == "success") {
                        this.planList = data.rows;
                    } else {
                        this.planList = [];
                    }
                }
            );
        },
        onSelect_yesGetedGsRows(rows) {
            this.yesGetedGsData.selectRows = rows;
        },
        yesGetedGsChangePage(val) {
            this.yesGetedGsData.page = val;
            this.ajaxYesGetedGsList();
        },
        yesGetedGsChangeSize(val) {
            this.yesGetedGsData.row = val;
            this.yesGetedGsData.page = 1;
            this.yesGetedGsData.total = 0;
            this.ajaxYesGetedGsList();
        },

        show_jbxx() {
            this.jbxx.dialogVisible = true;
        },
        fn_edit(id) {
            // 显示项目预研方案
            this.axios.post(
                "/index/project/edit",
                {
                    jbxx_id: this.jbxx_id
                },
                data => {
                    this.edit = data.res;
                    document.title = "工作台：" + this.edit.xmmc;
                    this.gsgj.dataset = {
                        xmlxB: this.edit.xmlxB,
                        xmdq: this.edit.area,
                        max_date: getDate("new")
                    };
                    this.gsxw.dataset = {
                        xmyz: this.edit.xmyzdw,
                        area: this.edit.area.split(","),
                        maxTime: getDate("new")
                    };
                }
            );
        },
        getThreads() {
            this.axios.post(
                "/Index/thread/getThread",
                {
                    jbxx_id: this.jbxx_id,
                    cate: this.cate
                },
                data => {
                    if (data.status == "success") {
                        this.threads.data = data.rows;
                        this.threads.selectVal =
                            this.$route.query.thread_id - 0;
                        this.thread_id = this.$route.query.thread_id - 0;
                    }
                }
            );
        },
        onChangePLan(v) {
            // console.log('thread_id--:' + v)
            // this.thread_id = v
            // this.threads.selectVal = v
            // this.getPlans()
            // this.getComponents()
            let research = this.$router.resolve({
                path: `/bidResearch?jbxx_id=${this.jbxx_id}&thread_id=${v}`
            });
            window.open(research.href, "_self");
            location.reload();
        },
        set_newPlan(type) {
            this.research_plan.type = type;
            this.research_plan.dialogVisible = true;
            this.research_plan.name = this.getDate() + "_";
            this.research_plan.id = this.jbxx_id;
        },
        onSubmitNewPlan(data) {
            // console.log(data)
            this.research_plan.dialogVisible = false;
            if (data) {
                let params = {
                    jbxx_id: this.research_plan.id,
                    name: data.trim()
                };
                if (params.name.length == 0 || params.name.length > 15) {
                    this.$message.error("请修改方案名称在15个字之内");
                    return;
                }
                this.axios.post("/index/thread/newPlan", params, data => {
                    if (data.status == "success") {
                        this.research_plan.dialogVisible = false;
                        if (this.research_plan.type == "tj") {
                            let { href } = this.$router.resolve({
                                path: `/iteminfo/ItemConfigNew?jbxx_id=${
                                    this.jbxx_id
                                }&thread_id=${data.message}`
                            });
                            window.open(href, `${this.jbxx_id}${data.message}`);
                        } else {
                            let { href } = this.$router.resolve({
                                path: `/bidResearch?jbxx_id=${
                                    this.jbxx_id
                                }&thread_id=${data.message}`
                            });
                            window.open(href, `${this.jbxx_id}${data.message}`);
                        }
                    } else {
                        this.$message.error(data.message);
                    }
                });
            }
        },

        getDate() {
            // 得到今天的日期；
            let date = new Date();
            let year = date.getFullYear();
            let month =
                date.getMonth() + 1 > 9
                    ? date.getMonth() + 1
                    : "0" + (date.getMonth() + 1);
            let day =
                date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
            return year.toString() + month.toString() + day.toString();
        },
        selectBox(name) {
            this.components.map(e => {
                if (name == e.name) {
                    e.icon = !e.icon;
                }
            });
        },
        setConfig(tab) {
            this[tab].dialogVisible = true;
            this.zhubiao.set_condition = {
                jbxx_id: this.jbxx_id,
                thread_id: this.threads.selectVal,
                type: "newZb"
            };
            // this.gsgj.dataset = {
            //   jbxx_id: this.jbxx_id,
            //   thread_id: this.thread_id,
            //   gsgj_id: this.gsgj_id,
            //   xmlxB: this.edit.xmlxB,
            //   area: this.edit.area
            // }
            // this.xypj.dataset = {
            //   xy_id: this.xy_id,
            //   thread_id: this.thread_id
            // }
            // this.gsxw.dataset = {
            //   thread_id: this.thread_id,
            //   gsxw_id: this.gsxw_id,
            //   xmyz: this.edit.xmyzdw,
            //   area: this.edit.area
            // }
        },
        // 1.4.1配置弹窗 点击保存 从子组件拿到data数据
        fn_zb(data) {
            this.zhubiao.dialogVisible = false;
            let have_data = true;

            this.form = data.form;
            this.options_gcyt=data.options_gcyt
            this.waterForm = data.waterForm;
            this.waterPerson = data.waterPerson;
            this.showOther = data.showOther;
            this.showGcyt= data.showGcyt;
            this.components.map(v => {
                if (v.tab == "zhubiao") {
                    v.have_data = have_data;
                    v.isChange = have_data;
                    v.icon = true;
                }
            });
            console.log(data, "data");
        },
        // 信用评价
        fn_xypj(data) {
            // console.log(data)
            this.xypj.dialogVisible = false;
            let have_data = true;
            this.xypj.dataset = {
                item: data.item,
                orand: data.orand,
                sixty: data.sixty,
                today: data.today
            };
            this.components.map(v => {
                if (v.tab == "xypj") {
                    v.have_data = have_data;
                    v.isChange = have_data;
                    v.icon = true;
                }
            });
        },
        fn_gsgj(data) {
            this.gsgj.dialogVisible = false;
            let have_data = data != "cancel";
            if (data != "cancel") {
                this.gsgj.dataset = data.data;
                this.components.map(v => {
                    if (v.tab == "gsgj") {
                        v.have_data = have_data;
                        v.isChange = have_data;
                        v.icon = true;
                    }
                });
            }
            // console.log(this.gsgj.dataset)
        },
        fn_gsxw(data) {
            this.gsxw.dialogVisible = false;
            let have_data = data != "cancel";
            if (data != "cancel") {
                this.gsxw.dataset = data.data;
            }
            this.components.map(v => {
                if (v.tab == "gsxw") {
                    v.have_data = have_data;
                    v.isChange = have_data;
                    v.icon = true;
                }
            });
            // console.log(data)
        },
        cancelOperate() {
            this.components.map(v => {
                v.loading = false;
            });
            this.axios.cancelpost();
        },
        operate() {
            this.operationState = false;
            this.yesGsData.tableNewData = "";
            this.noGsData.tableNewData = "";
            //  console.log( this.operationState)
            //  console.log( this.tableNewData)
            let self = this;
            // 运算
            this.pass = [];
            this.pass = this.components.filter(v => {
                if (v.icon) {
                    return v;
                }
            });
            if (this.pass.length == 0) return;
            let pass = this.pass[0];
            let tab =
                pass.isChange || pass.no_info_change ? pass.func : pass.func_s;
            this.pass_func = [];
            this.pass_cate = [];
            let count = 0;
            this.pass.forEach(element => {
                // console.log(element.no_info_change + '------参考否决')
                if (element.isChange || element.no_info_change) {
                    // 改变了条件或者否决参考，执行save
                    // alert(element.func)
                    this.pass_func.push(element.func);
                } else {
                    this.pass_func.push(element.func_s);
                }
                let key = element.tab;
                this.pass_cate[key] = element.no_info;
                // console.log(JSON.stringify(this.pass), '执行的接口')
                if (!element["have_data"]) {
                    count += 1;
                }
            });
            if (count > 0) {
                this.$message.error("有组件未配置条件");
                return;
            }
            // console.log('tab=------:' + tab)
            this.axios.post(
                "/index/Aptitude/clean",
                { thread_id: this.thread_id },
                data => {
                    if (data.status == "success") {
                        // switch (tab) {
                        //   case 'saveZz':
                        //     if (
                        //       !this.form.zz.zzyes &&
                        //       !this.form.lsyj.lsyjyes &&
                        //       !this.form.xmjl.xmjlyes &&
                        //       !this.form.xcsgry.xcsgryyes &&
                        //       !this.form.otherry.otherryyes
                        //     ) {
                        //       this.$message({
                        //         type: 'error',
                        //         message: '您还没有配置1.4.1'
                        //       })
                        //       return
                        //     }
                        //     this.saveZz()
                        //     break
                        //   default:
                        // break
                        // }
                        this.components.forEach(element => {
                            console.log(element, "lalal");
                            if (element.tab == "zhubiao") {
                                this.zz_id = element.zz_id;
                                this.yj_id = element.yj_id;
                                this.ry_id = element.ry_id;
                                this.zz_isChange = element.isChange;
                                this.zz_info_isChange = element.no_info_change;
                            } else if (element.tab == "xypj") {
                                this.xy_id = element.id;
                                this.xypj_isChange = element.isChange;
                                this.xypj_info_isChange =
                                    element.no_info_change;
                            } else if (element.tab == "gsgj") {
                                this.gsgj_id = element.id;
                                this.gsgj_isChange = element.isChange;
                                this.gsgj_info_isChange =
                                    element.no_info_change;
                            } else if (element.tab == "gsxw") {
                                this.gsxw_id = element.id;
                                this.gsxw_isChange = element.isChange;
                                this.gsxw_info_isChange =
                                    element.no_info_change;
                            }
                        });
                        // console.log(
                        //     'zz_id:' + this.zz_id,
                        //     'yj_id:' + this.yj_id,
                        //     'ry_id:' + this.ry_id,
                        //     'xy_id' + this.xy_id,
                        //     'gsgj_id:' + this.gsgj_id,
                        //     'gsxw_id:' + gsxw_id
                        //   )
                        this[tab]();
                        this.yesGsData.page = 1;
                        this.noGsData.page = 1;
                    } else {
                        this.$message.error("接口clean失败");
                    }
                }
            );
        },
        saveZz(differBtn) {
            this.components.map(v => {
                if (v.tab == "zhubiao") {
                    v.loading = true;
                }
            });

            // console.log(this.pass_cate);
            // console.log(this.form.zz.zzyes)
            if (this.form.zz.zzyes) {
                let zz_txt = {
                    left: [],
                    right: [],
                    orand: this.form.zz.ajax_data.orand
                };
                let zz = {
                    orand: this.form.zz.ajax_data.orand,
                    left: {},
                    right: {}
                };
                // 左边资质
                let zzL = this.form.zz.display.selected_zzContentL;
                if (zzL.length > 0) {
                    zzL.forEach((v, i) => {
                        zz.left[v.label] = v.value;
                        zz_txt.left.push(v.label);
                    });
                }

                // 右边资质
                let zzR = this.form.zz.display.selected_zzContentR;
                if (zzR.length > 0) {
                    zzR.forEach((v, i) => {
                        zz.right[v.label] = v.value;
                        zz_txt.right.push(v.label);
                    });
                }

                this.axios.post(
                    "/index/Aptitude/saveZz",
                    {
                        zz,
                        zz_txt,
                        zz_id: this.zz_id,
                        display: {
                            orand: this.form.zz.ajax_data.orand,
                            selected_zzContentL: this.form.zz.display
                                .selected_zzContentL,
                            selected_zzContentR: this.form.zz.display
                                .selected_zzContentR
                        },
                        jbxx_id: this.jbxx_id,
                        thread_id: this.thread_id,
                        cate: this.pass_cate.zhubiao ? "1" : "0"
                    },
                    data => {
                        this.zz_id = data.message;
                        this.components.map(v => {
                            if (v.tab == "zhubiao") {
                                v.zz_id = data.message;
                            }
                        });
                        this.ajax_number += 1;
                        this.saveYj(differBtn);
                    }
                );
            } else {
                this.axios.post(
                    "/index/Aptitude/saveZz",
                    {
                        use: "no",
                        zz_id: this.zz_id,
                        jbxx_id: this.jbxx_id,
                        thread_id: this.thread_id,
                        cate: this.pass_cate.zhubiao ? "1" : "0"
                    },
                    data => {
                        this.zz_id = data.message;
                        this.components.map(v => {
                            if (v.tab == "zhubiao") {
                                v.zz_id = "";
                            }
                        });
                        this.ajax_number += 1;
                        this.saveYj(differBtn);
                    }
                );
            }
        },
        saveYj(differBtn) {
            //类似业绩传值
            if (this.form.lsyj.lsyjyes) {
                let lsyj_data = {};
                if (this.form.lsyj.ajax_data.checkedList.length > 0) {
                    //其他业绩
                    lsyj_data = {
                        condition: {
                            keys: {
                                contain: this.form.lsyj.ajax_data.YjTags
                                    ? this.form.lsyj.ajax_data.YjTags.map(
                                          v => v.name
                                      )
                                    : ""
                            },
                            xmlx: {
                                contain: [this.form.lsyj.ajax_data.xmlx]
                            },
                            gcyt: {
                                name: this.form.lsyj.ajax_data.gcyt
                            },
                            zmj: [
                                this.form.lsyj.ajax_data.xmlx == "房建工程"
                                    ? this.form.lsyj.ajax_data.zmj
                                    : ""
                            ]
                        },
                        table: this.form.lsyj.ajax_data.checkedList,
                        minMoney: this.form.lsyj.ajax_data.money,
                        number: this.form.lsyj.ajax_data.number || 0,
                        around: {
                            minTime:
                                this.form.lsyj.ajax_data.date.minTime || "",
                            maxTime:
                                this.form.lsyj.ajax_data.date.maxTime || "",
                            kg:
                                this.form.lsyj.ajax_data.kgwg.indexOf("开工") !=
                                -1
                                    ? true
                                    : false,
                            wg:
                                this.form.lsyj.ajax_data.kgwg.indexOf("完工") !=
                                -1
                                    ? true
                                    : false,
                            number: this.form.lsyj.ajax_data.number || 0
                        },
                        jbxx_id: this.jbxx_id,
                        thread_id: this.thread_id,
                        yj_id: this.yj_id,
                        display: this.form.lsyj.ajax_data
                    };
                    if (this.form.lsyj.ajax_data.gcyt && this.showGcyt) {
                        console.log(1)
                        //如果有工程项目
                        let newobj = this.options_gcyt.filter(v => {
                            if (v.label == this.form.lsyj.ajax_data.gcyt) {
                                return v;
                            }
                        });
                        lsyj_data.condition.gcyt = {
                            name: newobj[0].label,
                            id: newobj[0].value
                        };
                    }
                    if (this.showOther) {
                        this.form.lsyj.ajax_data.selectOtheryq.forEach(v => {
                            lsyj_data.around[v] = 1;
                        });
                    }
                } else if (this.waterForm.checkWater) {
                    //水利业绩
                    lsyj_data = {
                        condition: {
                            keys: {
                                contain: this.waterForm.keys
                                    ? this.waterForm.keys.map(v => v.name)
                                    : ""
                            },
                            gczt: this.waterForm.gczt,
                            gcdb: this.waterForm.gcdb,
                            gcjb: this.waterForm.gcjb,
                            gcgm: this.waterForm.gcgm
                        },
                        number: this.waterForm.lsyj || 0,
                        around: {
                            number: this.waterForm.lsyj || 0,
                            // 水利
                            minKgsj: this.waterForm.minKgsj,
                            maxKgsj: this.waterForm.maxKgsj,
                            sminHtqx: this.waterForm.sminHtqx,
                            smaxHtqx: this.waterForm.smaxHtqx,
                            eminHtqx: this.waterForm.eminHtqx,
                            emaxHtqx: this.waterForm.emaxHtqx,
                            sminSjgq: this.waterForm.sminSjgq,
                            smaxSjgq: this.waterForm.smaxSjgq,
                            eminSjgq: this.waterForm.eminSjgq,
                            emaxSjgq: this.waterForm.emaxSjgq,
                            htminMoney: this.waterForm.htminMoney,
                            htmaxMoney: this.waterForm.htmaxMoney,
                            jsminMoney: this.waterForm.jsminMoney,
                            jsmaxMoney: this.waterForm.jsmaxMoney
                            // 水利
                        },
                        type: 1,
                        jbxx_id: this.jbxx_id,
                        thread_id: this.thread_id,
                        yj_id: this.yj_id,
                        displaySl: this.waterForm,
                        table: ["proj_sljg"]
                    };
                }
                this.axios.post("/index/search_yj/saveYj", lsyj_data, data => {
                    this.yj_id = data.message;
                    console.log(111);
                    this.components.map(v => {
                        if (v.tab == "zhubiao") {
                            v.yj_id = data.message;
                            console.log(222);
                        }
                    });
                    console.log(333);
                    this.ajax_number += 1;

                    this.saveZj(differBtn);
                    // this.onConfirmrun(differBtn);
                });
            } else {
                this.axios.post(
                    "/index/search_yj/saveYj",
                    {
                        use: "no",
                        yj_id: this.yj_id,
                        jbxx_id: this.$route.query.jbxx_id,
                        thread_id: this.thread_id
                    },
                    data => {
                        this.yj_id = data.message;
                        this.components.map(v => {
                            if (v.tab == "zhubiao") {
                                v.yj_id = "";
                            }
                        });
                        this.ajax_number += 1;
                        this.saveZj(differBtn);
                        // this.onConfirmrun(differBtn);
                    }
                );
            }
        },
        // 保存建设厅人员
        handleSaveJstRy(differBtn) {
            //项目经理传送的值
            let user_all = [];
            let order = 0;
            //项目经理
            if (this.form.xmjl.xmjlyes) {
                this.form.xmjl.selectedAll.forEach((v, i) => {
                    order += 1;
                    if (v.jzsz) {
                        let obj2 = {
                            rylb: "项目经理",
                            num: 1,
                            dj: v.jzsz,
                            zczy: v.zy,
                            zsh: v.akz || "",
                            zcz_dj: v.zcz_dj,
                            zcz_zczy: v.zcz_zczy,
                            zcz_name: v.zcz_name,
                            order
                        };
                        user_all.push(obj2);
                    }
                });
            }
            //技术负责人
            if (this.form.jsfzr.jsfzryes) {
                this.form.jsfzr.selectedAll.forEach((v, i) => {
                    order += 1;
                    if (v.jzsz) {
                        let obj2 = {
                            rylb: "技术负责人",
                            num: 1,
                            dj: v.jzsz,
                            zczy: v.zy,
                            zsh: v.akz || "",
                            zcz_dj: v.zcz_dj,
                            zcz_zczy: v.zcz_zczy,
                            zcz_name: v.zcz_name,
                            order
                        };
                        user_all.push(obj2);
                    }
                });
            }
            //现场施工人员
            if (this.form.xcsgry.xcsgryyes) {
                this.form.xcsgry.selectedAll.forEach((v, i) => {
                    order += 1;
                    let obj2 = {
                        rylb: "现场施工人员",
                        num: v.userNumber,
                        zczy: v.selectedAll.join(","),
                        dj: v.typeName,
                        zsh: v.zsh,
                        order
                    };
                    user_all.push(obj2);
                });
            }
            // 其他主要人员
            if (this.form.otherry.otherryyes) {
                this.form.otherry.selectedAll.zjgcs.forEach((v, i) => {
                    order += 1;
                    let obj2 = {
                        rylb: "其他主要人员",
                        num: 1,
                        zczy: v.zczy ? v.zczy.join(",") : "",
                        dj: "造价工程师",
                        zsh: "",
                        order
                    };
                    v.zczy.length ? user_all.push(obj2) : "";
                });
                this.form.otherry.selectedAll.zcaqgcs.forEach((v, i) => {
                    order += 1;
                    let obj2 = {
                        rylb: "其他主要人员",
                        num: 1,
                        zczy: v.zczy ? v.zczy.join(",") : "",
                        dj: "注册安全工程师",
                        zsh: v.zsh || "",
                        order
                    };
                    v.zczy.length ? user_all.push(obj2) : "";
                });
            }

            //人员保存
            if (
                this.form.xcsgry.xcsgryyes ||
                this.form.xmjl.xmjlyes ||
                this.form.jsfzr.jsfzryes ||
                this.form.otherry.otherryyes
            ) {
                let post_data = {
                    tab: "建设厅人员",
                    xcsgry: "",
                    xmjl: ""
                };
                if (this.form.xcsgry.xcsgryyes) {
                    post_data.xcsgry = this.form.xcsgry.selectedAll;
                }
                if (this.form.xmjl.xmjlyes) {
                    post_data.xmjl = this.form.xmjl.selectedAll;
                }
                if (this.form.jsfzr.jsfzryes) {
                    post_data.jsfzr = this.form.jsfzr.selectedAll;
                }
                if (this.form.xmjl_yj.xmjlyjyes) {
                    post_data.xmjl_yj = "true";
                }
                if (this.form.otherry.otherryyes) {
                    post_data.otherry = this.form.otherry.selectedAll;
                }
                console.log(user_all, "user-all");
                this.axios.post(
                    "/index/Search_Ry/saveZj",
                    {
                        jbxx_id: this.jbxx_id,
                        thread_id: this.thread_id,
                        type: "筑标",
                        condition: user_all,
                        post_data: JSON.stringify(post_data),
                        ry_id: this.ry_id || "",
                        similar: this.form.xmjl_yj.xmjlyjyes ? 1 : 0
                    },
                    data => {
                        this.ry_id = data.message;
                        this.components.map(v => {
                            if (v.tab == "zhubiao") {
                                v.ry_id = data.message;
                            }
                        });
                        this.ajax_number += 1;
                        this.onConfirmrun(differBtn);
                    }
                );
            } else {
                this.axios.post(
                    "/index/Search_Ry/saveZj",
                    {
                        use: "no",
                        ry_id: this.ry_id || "",
                        jbxx_id: this.$route.query.jbxx_id,
                        type: "筑标",
                        thread_id: this.thread_id
                    },
                    data => {
                        this.ry_id = data.message;
                        this.components.map(v => {
                            if (v.tab == "zhubiao") {
                                v.ry_id = "";
                            }
                        });
                        this.ajax_number += 1;
                        this.onConfirmrun(differBtn);
                    }
                );
            }
        },
        // 保存水利人员
        handleSaveSlRy(differBtn) {
            //项目经理传送的值
            let user_all = [];
            let order = 0;
            // 水利人员
            // 水利人员
            if (this.form.slry.selectedAll.length > 0) {
                this.form.slry.selectedAll.forEach((v, i) => {
                    order += 1;
                    let obj2 = {
                        rylb: "水利人员",
                        num: 1,
                        order,
                        in_jst: v.jst ? 1 : 0,
                        zgmc: v.zgmc,
                        zczy: v.zczy,
                        zsh: v.zsh,
                        zcz_name: v.zc,
                        gwmc: v.gwmc
                    };
                    user_all.push(obj2);
                });
                let post_data = {
                    tab: "水利人员",
                    slry: this.form.slry.selectedAll
                };

                this.axios.post(
                    "/index/Search_Ry/saveZj",
                    {
                        jbxx_id: this.jbxx_id,
                        thread_id: this.thread_id,
                        type: "筑标",
                        condition: user_all,
                        post_data: JSON.stringify(post_data),
                        ry_id: this.ry_id || "",
                        similar: this.form.xmjl_yj.xmjlyjyes ? 1 : 0
                    },
                    data => {
                        this.ry_id = data.message;
                        this.ajax_number += 1;
                        this.onConfirmrun(differBtn);
                    }
                );
            } else {
                this.axios.post(
                    "/index/Search_Ry/saveZj",
                    {
                        use: "no",
                        ry_id: this.ry_id || "",
                        jbxx_id: this.$route.query.jbxx_id,
                        type: "筑标",
                        thread_id: this.thread_id
                    },
                    data => {
                        this.ry_id = data.message;
                        this.ajax_number += 1;
                        this.onConfirmrun(differBtn);
                    }
                );
            }
        },
        saveZj(differBtn) {
            if (this.waterPerson.radio === "建设厅人员") {
                this.handleSaveJstRy(differBtn);
            } else {
                this.handleSaveSlRy(differBtn);
            }
        },
        onConfirmrun(differBtn) {
            this.components.map(v => {
                if (v.tab == "zhubiao") {
                    v.loading = true;
                }
            });
            this.axios.post(
                "/index/Aptitude/searchZz",
                { zzid: this.zz_id, thread_id: this.thread_id },
                data => {
                    this.axios.post(
                        "/index/Search_yj/searchYj",
                        { yj_id: this.yj_id, thread_id: this.thread_id },
                        data => {
                            if (data.message == "类似项目业绩个数不足") {
                                this.ajax_number = 0;
                                this.$message({
                                    type: "error",
                                    message: data.message + ",请重新选择条件"
                                });
                                return;
                            }
                            this.axios.post(
                                "/index/search_ry/searchRy",
                                {
                                    id: this.ry_id,
                                    thread_id: this.thread_id,
                                    gsmc: ""
                                },
                                data => {
                                    this.components.map(v => {
                                        if (v.tab == "zhubiao") {
                                            v.loading = false;
                                        }
                                    });
                                    this.ajax_number = 0;
                                    let index;
                                    if (
                                        this.zz_isChange ||
                                        this.zz_info_isChange
                                    ) {
                                        index = this.pass_func.indexOf(
                                            "saveZz"
                                        );
                                    } else {
                                        index = this.pass_func.indexOf(
                                            "onConfirmrun"
                                        );
                                    }
                                    // console.log(JSON.stringify(this.pass_func))
                                    if (index + 1 == this.pass_func.length) {
                                        this.saveComponents();
                                        return;
                                    }
                                    const next_func = this.pass_func[index + 1];
                                    // console.log(next_func);
                                    this[next_func]();
                                }
                            );
                        }
                    );
                }
            );
        },
        saveCredit() {
            // 信用
            this.components.map(v => {
                if (v.tab == "xypj") {
                    v.loading = true;
                }
            });
            // console.log('信用')
            let params = {
                jbxx_id: this.jbxx_id,
                thread_id: this.thread_id,
                xy_id: this.xy_id,
                xypj: this.xypj.dataset.item,
                orand: this.xypj.dataset.orand,
                sixty: this.xypj.dataset.sixty,
                today: this.xypj.dataset.today,
                cate: this.pass_cate.xypj ? "1" : "0"
            };
            this.axios.post("/index/Search_Credit/saveCredit", params, data => {
                if (data.status == "failed") {
                    this.$message.error("信用接口报错");
                    return;
                }
                this.components.map(v => {
                    if (v.tab == "xypj") {
                        v.id = data.message;
                    }
                });
                this.xy_id = data.message;
                this.searchCredit();
            });
        },
        searchCredit() {
            this.components.map(v => {
                if (v.tab == "xypj") {
                    v.loading = true;
                }
            });
            let params = {
                id: this.xy_id,
                thread_id: this.thread_id
            };
            this.axios.post(
                "/index/Search_Credit/SearchCredit",
                params,
                data => {
                    this.components.map(v => {
                        if (v.tab == "xypj") {
                            v.loading = false;
                        }
                    });

                    let index;
                    if (this.xypj_isChange || this.xypj_info_isChange) {
                        index = this.pass_func.indexOf("saveCredit");
                    } else {
                        index = this.pass_func.indexOf("searchCredit");
                    }
                    if (index + 1 == this.pass_func.length) {
                        this.saveComponents();
                        return;
                    }
                    const next_func = this.pass_func[index + 1];
                    // console.log(next_func)
                    this[next_func]();
                }
            );
        },
        saveCompSet() {
            // 公司工具
            this.components.map(v => {
                if (v.tab == "gsgj") {
                    v.loading = true;
                }
            });
            // console.log('公司工具' + this.gsgj.dataset.xmdq)

            let params = {
                id: this.gsgj_id,
                jbxx_id: this.jbxx_id,
                thread_id: this.thread_id,
                xmdq: this.gsgj.dataset.xmdq,
                xmlx: this.gsgj.dataset.xmlxB.join(","),
                minDate: this.gsgj.dataset.min_date,
                maxDate: this.gsgj.dataset.max_date,
                money: this.gsgj.dataset.money,
                cate: this.pass_cate.gsgj ? "1" : "0",
                conditions: {}
            };
            if (this.gsgj.dataset.scxw1) {
                params.conditions.scxw1 = this.gsgj.dataset.scxw1;
            }
            if (this.gsgj.dataset.scxw2) {
                params.conditions.scxw2 = this.gsgj.dataset.scxw2;
            }
            if (this.gsgj.dataset.scxw3) {
                params.conditions.scxw3 = this.gsgj.dataset.scxw3;
            }
            if (this.gsgj.dataset.zssl1) {
                params.conditions.zssl1 = this.gsgj.dataset.zssl1;
            }
            if (this.gsgj.dataset.zssl2) {
                params.conditions.zssl2 = this.gsgj.dataset.zssl2;
            }
            if (this.gsgj.dataset.ywfx) {
                params.conditions.ywfx = this.gsgj.dataset.ywfx;
            }

            this.axios.post("/index/Task/saveCompSet", params, data => {
                this.gsgj_id = data.message;
                this.components.map(v => {
                    if (v.tab == "gsgj") {
                        v.id = data.message;
                    }
                });
                this.checkCompSet();
            });
        },
        checkCompSet() {
            this.components.map(v => {
                if (v.tab == "gsgj") {
                    v.loading = true;
                }
            });
            let params = {
                id: this.gsgj_id,
                thread_id: this.thread_id
            };
            this.axios.post("/index/Task/checkCompSet", params, data => {
                this.components.map(v => {
                    if (v.tab == "gsgj") {
                        v.loading = false;
                    }
                });
                let index;
                if (this.gsgj_isChange || this.gsgj_info_isChange) {
                    index = this.pass_func.indexOf("saveCompSet");
                } else {
                    index = this.pass_func.indexOf("checkCompSet");
                }

                if (index + 1 == this.pass_func.length) {
                    this.saveComponents();
                    return;
                }
                const next_func = this.pass_func[index + 1];
                // console.log(next_func);
                this[next_func]();
            });
        },
        saveCompBehavior() {
            // 公司行为
            // console.log('公司行为', this.gsxw.dataset)
            this.components.map(v => {
                if (v.tab == "gsxw") {
                    v.loading = true;
                }
            });
            console.log(this.gsxw.dataset);
            let params = {
                id: this.gsxw_id,
                jbxx_id: this.jbxx_id,
                thread_id: this.thread_id,
                xmyz: this.gsxw.dataset.xmyz,
                area: this.gsxw.dataset.area.join(","),
                minTime: this.gsxw.dataset.minTime,
                maxTime: this.gsxw.dataset.maxTime,
                xmCondition: {
                    keys: {
                        contain:
                            this.gsxw.dataset.keys.length > 0
                                ? this.gsxw.dataset.keys
                                : [this.gsxw.dataset.key]
                    },
                    xmlx: {
                        contain: [this.gsxw.dataset.xmlx]
                    },
                    minMoney: this.gsxw.dataset.minMoney,
                    maxMoney: this.gsxw.dataset.maxMoney
                },
                cate: this.pass_cate.gsxw ? "1" : "0",
                minzbNumber: this.gsxw.dataset.minzbNumber,
                maxzbNumber: this.gsxw.dataset.maxzbNumber,
                mintbNumber: this.gsxw.dataset.mintbNumber,
                maxtbNumber: this.gsxw.dataset.maxtbNumber
            };
            this.axios.post(
                "/index/Analysis_Report/saveCompBehavior",
                params,
                data => {
                    this.gsxw_id = data.message;
                    this.components.map(v => {
                        if (v.tab == "gsxw") {
                            v.id = data.message;
                        }
                    });
                    this.checkCompBehavior();
                }
            );
        },
        checkCompBehavior() {
            this.components.map(v => {
                if (v.tab == "gsxw") {
                    v.loading = true;
                }
            });
            let params = {
                id: this.gsxw_id,
                thread_id: this.thread_id
            };
            this.axios.post(
                "/index/Analysis_Report/checkCompBehavior",
                params,
                data => {
                    this.components.map(v => {
                        if (v.tab == "gsxw") {
                            v.loading = false;
                        }
                    });
                    let index;
                    if (this.gsxw_isChange || this.gsxw_info_isChange) {
                        index = this.pass_func.indexOf("saveCompBehavior");
                    } else {
                        index = this.pass_func.indexOf("checkCompBehavior");
                    }

                    if (index + 1 == this.pass_func.length) {
                        this.saveComponents();

                        return;
                    }
                    const next_func = this.pass_func[index + 1];
                    this[next_func]();
                }
            );
        },
        switchBtn(item, val) {
            if (item.tab == "zhubiao" && val) {
                this.$message.error("1.4.1只能是否决条件");
                return;
            }
            this.components.map(v => {
                if (v.name == item.name) {
                    v.no_info_change = true;
                    v.no_info = val;
                }
            });
        },
        changeYshData(data, newData) {
            // console.log(data)
            // console.log(this.yesGsData,'----changeYshData')
            // 组件操作
            this.operationState = true;
            this[data.dataObj].tableNewData =
                newData || this[data.dataObj].tableNewData;
            this[data.dataObj].formData.gsmc = data.gsmc;
            this[data.dataObj].formData.areaTypeVal = data.scale;
            this[data.dataObj].row = data.rows;
            this[data.dataObj].page = data.page;
            this[data.dataObj].order = data.order;
            this[data.dataObj].ordername = data.ordername;
            this[data.dataObj].loading = false;
            this[data.dataObj].gsgzType = data.gsgzType;
            this[data.dataObj].zbMinNum = data.zbminNum ? data.zbminNum : "";
            this[data.dataObj].zbMaxNum = data.zbmaxNum ? data.zbmaxNum : "";
            this[data.dataObj].tbMinNum = data.tbminNum ? data.tbminNum : "";
            this[data.dataObj].tbMaxNum = data.tbmaxNum ? data.tbmaxNum : "";
            if (this.operationState) {
                if (data.dataObj == "yesGsData" || data.dataObj == "noGsData") {
                    if (this[data.dataObj].table["公司工具"]) {
                        if (newData) {
                            for (let item in this[data.dataObj].table[
                                "公司工具"
                            ]) {
                                if (newData[item].label !== "") {
                                    this[data.dataObj].table["公司工具"][
                                        item
                                    ].lable =
                                        newData[item].name;
                                }
                            }
                        }
                    }
                }
            }

            // console.log(this.yesGsData,'----changeYshData')
            if (data.type == 1) {
                this.ajaxYesGsList();
                this.count_ajax = 1;
            } else if (data.type == 0) {
                this.ajaxNoGsList();
                this.count_ajax = 1;
            } else if (data.type == 2) {
                this.ajaxAllGsList();
            }
        },
        // 已审核公司集合
        ajaxYesGsList() {
            // console.log(this.yesGsData)
            // console.log(typeof this.yesGsData.gsgzType)
            let queryObj = {
                jbxx_id: this.jbxx_id,
                id: this.thread_id,
                gsmc: this.yesGsData.formData.gsmc,
                scale: this.yesGsData.formData.areaTypeVal,
                type: 1,
                rows: this.yesGsData.row,
                page: this.yesGsData.page,
                order: this.yesGsData.order,
                ordername: this.yesGsData.ordername,
                search: this.yesGsData.gsgzType,
                minzbNumber: this.yesGsData.zbMinNum,
                maxzbNumber: this.yesGsData.zbMaxNum,
                mintbNumber: this.yesGsData.tbMinNum,
                maxtbNumber: this.yesGsData.tbMaxNum
            };
            this.yesGsData.loading = false;
            this.axios.post("/Index/thread/audited?type=1", queryObj, data => {
                if (this.yesGsData.page > 1 && data.rows.length == 0) {
                    this.yesGsData.page -= 1;
                    this.ajaxYesGsList();
                    this.ajaxNoGsList();
                    // alert(5)
                    this.count_ajax = 0;
                    return;
                }
                this.yesGsData.loading = false;
                this.yesGsData.rows = data.rows || [];
                this.yesGsData.table = data.table || {};
                this.yesGsData.total = data.total || 0;
                this.yesGsData.row = queryObj.rows;
                this.yesGsData.selectRows = [];
                this.count_ajax += 1;
                //  console.log("看我看我  ！！！！！！！！！！！！！")
                if (this.yesGsData.table["公司工具"]) {
                    // console.log("看我看我  ！！！！！！！！！！！！！  我是里面的")
                    for (let item in this.yesGsData.table["公司工具"]) {
                        if (item == "scxw1") {
                            if (
                                this.yesGsData.table["公司工具"][item].type == 0
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "该时间内<span class='el-icon-close'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 1
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "该时间内<span class='el-icon-check'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 2
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "该时间内不限";
                            }
                        } else if (item == "scxw2") {
                            if (
                                this.yesGsData.table["公司工具"][item].type == 0
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "历年该地区<span class='el-icon-close'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 1
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "历年该地区<span class='el-icon-check'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 2
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "历年该地区不限";
                            }
                        } else if (item == "scxw3") {
                            if (
                                this.yesGsData.table["公司工具"][item].type == 0
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "近一年半<span class='el-icon-close'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 1
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "近一年半<span class='el-icon-check'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 2
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "近一年半不限";
                            }
                        } else if (item == "zssl1") {
                            if (
                                this.yesGsData.table["公司工具"][item].type == 0
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "项目小于金额<span class='el-icon-close'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 1
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "项目大于金额<span class='el-icon-check'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 2
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "项目金额不限";
                            }
                        } else if (item == "zssl2") {
                            if (
                                this.yesGsData.table["公司工具"][item].type == 0
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "业绩小于金额<span class='el-icon-close'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 1
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "业绩大于金额<span class='el-icon-check'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 2
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "业绩金额不限";
                            }
                        } else if (item == "ywfx") {
                            if (
                                this.yesGsData.table["公司工具"][item].type == 0
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "企业未参此类型<span class='el-icon-close'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 1
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "企业参此类型<span class='el-icon-check'></span>";
                            }
                            if (
                                this.yesGsData.table["公司工具"][item].type == 2
                            ) {
                                this.yesGsData.table["公司工具"][item].lable =
                                    "企业参与不限";
                            }
                        }
                    }
                }
                // console.log(this.operationState)
                // console.log(this.yesGsData.table["公司工具"])
                if (this.operationState) {
                    for (let item in this.yesGsData.table["公司工具"]) {
                        if (this.yesGsData.tableNewData[item].label !== "") {
                            this.yesGsData.table["公司工具"][
                                item
                            ].lable = this.yesGsData.tableNewData[item].name;
                            // console.log( this.yesGsData.table["公司工具"])
                        }
                    }
                }
                //  console.log(this.yesGsData.table["公司工具"])
            });
        },
        // 未审核公司集合
        ajaxNoGsList() {
            this.noGsData.loading = false;
            let queryObj = {
                jbxx_id: this.jbxx_id,
                id: this.thread_id,
                gsmc: this.noGsData.formData.gsmc,
                scale: this.noGsData.formData.areaTypeVal,
                type: 0,
                rows: this.noGsData.row,
                page: this.noGsData.page,
                order: this.noGsData.order,
                ordername: this.noGsData.ordername,
                search: this.noGsData.gsgzType,
                minzbNumber: this.noGsData.zbMinNum,
                maxzbNumber: this.noGsData.zbMaxNum,
                mintbNumber: this.noGsData.tbMinNum,
                maxtbNumber: this.noGsData.tbMaxNum
            };

            this.noGsData.loading = false;
            this.axios.post("/Index/thread/audited?type=0", queryObj, data => {
                if (this.noGsData.page > 1 && data.rows.length == 0) {
                    this.noGsData.page -= 1;
                    this.ajaxNoGsList();
                    return;
                }
                this.noGsData.loading = false;
                this.noGsData.rows = data.rows || [];
                this.noGsData.total = data.total || 0;
                this.noGsData.table = data.table || {};
                this.noGsData.selectRows = [];
                this.noGsData.row = queryObj.rows;
                this.count_ajax += 1;
                console.log(this.noGsData);
                if (this.noGsData.table["公司工具"]) {
                    for (let item in this.noGsData.table["公司工具"]) {
                        if (item == "scxw1") {
                            if (
                                this.noGsData.table["公司工具"][item].type == 0
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "该时间内<span class='el-icon-close'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 1
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "该时间内<span class='el-icon-check'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 2
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "该时间内不限";
                            }
                        } else if (item == "scxw2") {
                            if (
                                this.noGsData.table["公司工具"][item].type == 0
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "历年该地区<span class='el-icon-close'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 1
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "历年该地区<span class='el-icon-check'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 2
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "历年该地区不限";
                            }
                        } else if (item == "scxw3") {
                            if (
                                this.noGsData.table["公司工具"][item].type == 0
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "近一年半<span class='el-icon-close'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 1
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "近一年半<span class='el-icon-check'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 2
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "近一年半不限";
                            }
                        } else if (item == "zssl1") {
                            if (
                                this.noGsData.table["公司工具"][item].type == 0
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "项目小于金额<span class='el-icon-close'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 1
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "项目大于金额<span class='el-icon-check'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 2
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "项目金额不限";
                            }
                        } else if (item == "zssl2") {
                            if (
                                this.noGsData.table["公司工具"][item].type == 0
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "业绩小于金额<span class='el-icon-close'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 1
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "业绩大于金额<span class='el-icon-check'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 2
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "业绩金额不限";
                            }
                        } else if (item == "ywfx") {
                            if (
                                this.noGsData.table["公司工具"][item].type == 0
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "企业未参此类型<span class='el-icon-close'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 1
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "企业参此类型<span class='el-icon-check'></span>";
                            }
                            if (
                                this.noGsData.table["公司工具"][item].type == 2
                            ) {
                                this.noGsData.table["公司工具"][item].lable =
                                    "企业参与不限";
                            }
                        }
                    }
                }
                if (this.operationState) {
                    for (let item in this.noGsData.table["公司工具"]) {
                        if (this.noGsData.tableNewData[item].label !== "") {
                            this.noGsData.table["公司工具"][
                                item
                            ].lable = this.noGsData.tableNewData[item].name;
                            // console.log( this.noGsData.table["公司工具"])
                        }
                    }
                }
            });
        },
        // 全部公司集合
        ajaxAllGsList() {
            this.allGsData.loading = true;
            this.axios.post(
                "/index/element_set/getAllCompany",
                {
                    // type: '分配',
                    // user_cate: '分配',
                    jbxx_id: this.jbxx_id,
                    gsmc: this.allGsData.formData.gsmc,
                    scale: this.allGsData.formData.areaTypeVal,
                    rows: this.allGsData.row,
                    page: this.allGsData.page,
                    jbxx_id: this.jbxx_id,
                    page: this.allGsData.page
                },
                data => {
                    this.allGsData.loading = false;
                    this.allGsData.rows = data.rows || [];
                    this.allGsData.total = data.total || 0;
                    this.allGsData.selectRows = [];
                }
            );
        },
        // 执行方案
        onExecutePlan(dataObj, ajaxFn, planid) {
            let gs_id = this[dataObj].selectRows.map(v => v.gs_id);
            if (gs_id.length == 0) {
                this.$message.error("请选择公司");
                return;
            }
            gs_id = gs_id.join(",");
            let nowPlan = this.planList.filter(v => v.id == planid);
            if (nowPlan.length == 0) {
                nowPlan.node_name = "";
                nowPlan.cate = "";
            } else {
                nowPlan = nowPlan[0];
            }
            this.yesGetedGsData.loading = true;

            this.axios.post(
                "/index/Human_Allot/executePlan",
                {
                    jbxx_id: this.jbxx_id,
                    thread_id: planid,
                    gs_id,
                    name: nowPlan.node_name,
                    cate: nowPlan.cate,
                    case: planid ? 0 : 1
                },
                data => {
                    this[ajaxFn]();
                }
            );
        },
        // 删除分配公司
        onDeleteGs(type, ajaxObj, gs_idOrDataObj) {
            this.$confirm("确认删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    if (type == "all") {
                        gs_idOrDataObj = this[gs_idOrDataObj].selectRows.map(
                            v => v.gs_id
                        );
                        if (gs_idOrDataObj.length == 0) {
                            this.$message.error("请选择公司");
                            return;
                        }
                        gs_idOrDataObj = gs_idOrDataObj.join(",");
                    }
                    this.axios.post(
                        "/index/element_set/editCompanyToProject",
                        {
                            company_id: localStorage.getItem("company_id"),
                            human_id: this.human_id,
                            gs_id: gs_idOrDataObj,
                            type: 1,
                            jbxx_id: this.jbxx_id,
                            diff: this.user_cate
                        },
                        data => {
                            if (data.status == "success") {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                this[ajaxObj]();
                                this.ajaxYesGsList();
                                this.ajaxAllGsList();
                                this.ajaxNoGsList();
                                this.count_ajax = 0;
                                // alert(6)
                            }
                        }
                    );
                })
                .catch(() => {});
        },
        companySet() {
            // 公司工具
            this.axios.post(
                "/index/task/companySet",
                { jbxx_id: this.jbxx_id, thread_id: this.thread_id },
                data => {
                    let condition = data.condition
                        ? JSON.parse(data.condition)
                        : {};
                    this.gsgj.dataset = {
                        xmdq: data.xmdq || this.edit.area,
                        money: data.money,
                        min_date: data.minDate,
                        max_date: data.maxDate,
                        xmlxB: data.xmlx || this.edit.xmlxB,
                        scxw1: condition.scxw1,
                        scxw2: condition.scxw2,
                        scxw3: condition.scxw3,
                        zssl1: condition.zssl1,
                        zssl2: condition.zssl2,
                        ywfx: condition.ywfx
                    };
                }
            );
        },

        compBehaviorGet() {
            this.axios.post(
                "/index/Analysis_Report/compBehaviorGet",
                { thread_id: this.thread_id, jbxx_id: this.jbxx_id },
                data => {
                    if (data.status == "success") {
                        let xmCondition = data.message.xmCondition
                            ? JSON.parse(data.message.xmCondition)
                            : {};
                        this.gsxw.dataset = {
                            xmyz: data.message.xmyz,
                            area: data.message.area
                                ? data.message.area.split(",")
                                : [],
                            maxTime: data.message.maxTime,
                            minTime: data.message.minTime,
                            mintbNumber: data.message.mintbNumber,
                            maxtbNumber: data.message.maxtbNumber,
                            minzbNumber: data.message.minzbNumber,
                            maxzbNumber: data.message.maxzbNumber,
                            keys:
                                xmCondition && xmCondition.keys
                                    ? xmCondition.keys.contain
                                    : [],
                            xmlx:
                                xmCondition && xmCondition.xmlx
                                    ? xmCondition.xmlx.contain.join(",")
                                    : "",
                            minMoney: xmCondition.minMoney || "",
                            maxMoney: xmCondition.maxMoney || ""
                        };
                    }
                }
            );
        },
        displayCredit() {
            this.axios.post(
                "/index/Search_Credit/displayCredit",
                { thread_id: this.thread_id, jbxx_id: this.jbxx_id },
                data => {
                    if (data.status == "success") {
                        let condition = JSON.parse(data.rows.condition);
                        this.xypj.dataset = {
                            item: condition.xypj,
                            sixty: condition.sixty,
                            today: condition.today,
                            orand: condition.orand
                        };
                    }
                }
            );
        },
        // 流程控制接口
        ajaxYesGetedGsList() {
            this.yesGetedGsData.loading = true;
            this.axios.post(
                "/index/element_set/getAllotedCompany",
                {
                    // user_cate: '分配',
                    valid: 1,
                    jbxx_id: this.jbxx_id,
                    gsmc: this.yesGetedGsData.formData.gsmc,
                    scale: this.yesGetedGsData.formData.areaTypeVal,
                    rows: this.yesGetedGsData.row,
                    page: this.yesGetedGsData.page
                },
                data => {
                    if (
                        this.yesGetedGsData.page > 1 &&
                        data.rows.length == 0 &&
                        data.status == "success"
                    ) {
                        this.yesGetedGsData.page -= 1;
                        this.ajaxYesGetedGsList();
                        return;
                    }
                    this.yesGetedGsData.loading = false;
                    this.yesGetedGsData.rows = data.rows || [];
                    this.yesGetedGsData.total = data.total || 0;
                    this.yesGetedGsData.selectRows = [];
                }
            );
        },
        // 列表中的选择人员回调
        onListInSelect(obj) {
            this.onDistribute_button(
                "one",
                obj.ajaxFn,
                obj.ry_id,
                obj.gs_id,
                obj.ry_type,
                obj.username
            );
        },
        fnAddCompanyToProject(data) {
            if (data.user_cate == "分配" || data.user_cate == "标书制作") {
                this.axios.post(
                    "/index/element_set/addCompanyToProject",
                    {
                        company_id: localStorage.getItem("company_id"),
                        jbxx_id: this.jbxx_id,
                        gs_ids: data.gs_ids,
                        user_id: data.user_id,
                        username: data.username,
                        user_cate:
                            data.user_cate == "标书制作" ? "标书制作" : "分配"
                    },
                    data => {
                        this.ajaxYesGetedGsList();
                        this.ajaxYesGsList();
                        this.ajaxNoGsList();
                        this.ajaxAllGsList();
                        this.count_ajax = 0;
                        // alert(7)
                    }
                );
            } else {
                this.axios.post(
                    "/index/Human_Allot/addCompanyToHuman",
                    {
                        jbxx_id: this.jbxx_id,
                        human_id: this.thread_id,
                        company_id: localStorage.getItem("company_id"),
                        gs_ids: data.gs_ids,
                        user_id: data.user_id,
                        username: data.username
                    },
                    data => {
                        this.ajaxYesGetedGsList();
                        this.ajaxYesGsList();
                        this.ajaxNoGsList();
                        this.ajaxAllGsList();
                        this.count_ajax = 0;
                        // alert(8)
                    }
                );
            }
        },
        // 下部分列表分配公司
        onDistribute_button(
            type,
            ajaxObj,
            user_id,
            gs_id,
            ry_type,
            username = "",
            fp_bs_sh
        ) {
            if (fp_bs_sh == "分配") {
                ry_type = "audit_user_id";
            } else if (fp_bs_sh == "标书制作") {
                ry_type = "tender_user_id";
            } else if (fp_bs_sh == "人工审核") {
                ry_type = "human_user_id";
            }
            if (type == "all") {
                gs_id = gs_id.map(v => v.gs_id);
                if (gs_id.length == 0) {
                    this.yesGetedGsData.formData.ryVal = "";
                    this.$message.error("请选择公司");
                    return;
                }
                gs_id = gs_id.join(",");
                if (user_id) {
                    username = this.allUsers[this.user_cate].filter(
                        v => v.id == user_id
                    )[0].username;
                }
            }
            let queryObj = {
                company_id: localStorage.getItem("company_id"),
                jbxx_id: this.jbxx_id,
                gs_id: gs_id,
                type: 2,
                username
            };
            queryObj[ry_type] = user_id;
            this.axios.post(
                "/index/element_set/editCompanyToProject",
                queryObj,
                data => {
                    this.yesGetedGsData.formData.ryVal = "";
                    this[ajaxObj]();
                    this.ajaxGetedRyList();
                }
            );
        },
        onSearch(ajaxObj, dataObj) {
            this[dataObj].page = 1;
            this[dataObj].total = 0;
            this[ajaxObj]();
        },
        // 同意重置事件
        onResetForm(ajaxObj, dataObj) {
            // console.log("11111111111111111111111")
            this.yesGetedGsData.row = 10;
            this[dataObj].formData.gsmc = "";
            this[dataObj].formData.areaTypeVal = "0";
            this[dataObj].page = 1;
            this[dataObj].total = 0;
            this[ajaxObj]();
        },
        // 改变是否是否川内外
        onChangeArea(ajaxObj, dataobj) {
            this[dataobj].page = 1;
            this[ajaxObj]();
        },
        // 是否开通展示
        onIsDisplay(type, ajaxFn, rows, typeAllOne) {
            if (rows.length == 0) {
                this.$message.error("请选择公司");
                this.open_close = "";
                return;
            }
            let url,
                queryObj,
                open_type = type || this.open_close;

            if (open_type == "yes") {
                // 开通
                url = "/Index/Project/saveDisplay";
                rows = rows.map(v => {
                    let obj = [v.gs_id, 0, 0, v.cate];
                    if (v.sign) {
                        v.sign.forEach(v2 => {
                            if (v2.name == "业绩") {
                                obj[1] = v2.id;
                            } else if (v2.name == "人员") {
                                obj[2] = v2.id;
                            }
                        });
                    }
                    return obj;
                });
                rows = JSON.stringify(rows);
                queryObj = {
                    data: rows,
                    jbxx_id: this.jbxx_id
                };
            } else {
                // 关闭
                url = "/Index/Project/delDisplay";
                rows = rows.map(v => v.gs_id).join(",");
                queryObj = {
                    gs_id: rows,
                    jbxx_id: this.jbxx_id
                };
            }
            this.axios.post(url, queryObj, data => {
                this.open_close = "";

                this[ajaxFn]();
            });
        },
        // 查看结果集
        onCheckResult(row) {
            var yj_id, ry_id;
            row.sign.forEach(v => {
                if (v.name == "业绩") {
                    yj_id = v.id;
                } else if (v.name == "人员") {
                    ry_id = v.id;
                }
            });
            let { href } = this.$router.resolve({
                path: `/bidResultRyYj?jbxx_id=${this.jbxx_id}&gs_id=${
                    row.gs_id
                }&yj_id=${yj_id}&ry_id=${ry_id}&flag=1`
            });
            window.open(href);
        },
        // 审核未审核公司操作
        ajaxOnYesorNoList(data) {
            this.axios.post(
                "/Index/thread/Auditing",
                {
                    id: this.thread_id,
                    jbxx_id: this.jbxx_id,
                    gs_id: data.gs_id,
                    type: data.type
                },
                data => {
                    if (data.status == "success") {
                        this.ajaxYesGsList();
                        this.ajaxNoGsList();
                        this.ajaxYesGetedGsList();
                        this.count_ajax = 0;
                        // alert(9)
                    }
                }
            );
        }
    }
};
</script>
<style lang="less" scoped>
.bid_research {
    padding: 20px;
    .table-title {
        margin: 20px auto;
        text-align: center;
        font-size: 28px;
    }
    h1 {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #dcdcdc;
    }
    .operation {
        height: 90px;
        width: 100px;
    }
    .active_box {
        border: 1px solid #409eff !important;
    }
    .box_content {
        width: 100%;
        display: flex;
    }
    .active_btn {
        color: #409eff;
    }
    .have_data {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #409eff;
        position: relative;
        top: -2px;
    }
    .box {
        cursor: pointer;
        width: 200px;
        margin-right: 10px;
        border: 1px solid #dcdcdc;
        height: 90px;
        .content {
            height: 60px;
            border-bottom: 1px solid #dcdcdc;
            text-align: center;
            line-height: 60px;
            position: relative;
            .active_icon {
                color: rgb(14, 207, 14);
            }
            .none_icon {
                color: red;
            }
            .c_icon {
                position: absolute;
                top: 0;
                right: 5px;
                transform: scale(0.7);
            }
        }
        .btns {
            display: flex;
            line-height: 29px;
            background-color: #f3f3f3;
            > div:first-child {
                border-right: 1px solid #dcdcdc;
            }
            > div {
                flex: 1;
                text-align: center;
                // width: 50%;
            }
        }
    }
}
</style>
