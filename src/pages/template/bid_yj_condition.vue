<template>
    <div id="yj_condition">
            <!-- <el-card class="box-card" id="card1">
                <div slot="header" class="clearfix">
                    <span>请添加条件模块</span>
                </div>
                <div>
                    <el-button :type="display_key ? 'primary' : ''" size="small" @click="switchTab('key')">关键字</el-button>
                    <el-button :type="display_xmlx ? 'primary' : ''" size="small" @click="switchTab('xmlx')">类型</el-button>
                    <el-button :type="display_money_date ? 'primary' : ''" size="small" @click="switchTab('money')">金额</el-button>
                </div>
            </el-card> -->

        <el-card class="box-card key" v-show="display_key">
            <div slot="header" class="clearfix">
                <span>项目名称可能涉及的关键字</span>
            </div>
            <div>
                <el-row>
                    <el-col :span="24">
                        <el-form :inline="true" :model="form" class="demo-form-inline" size="small" @submit.native.prevent>
                            <el-form-item label="含有">
                                <el-input v-model="form.key_have" placeholder="含有"></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="不含有">
                                <el-input v-model="form.key_noHave" placeholder="不含有"></el-input>
                            </el-form-item> -->
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit('key')">添加</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" style="border-right:1px solid #d4d4d4;">
                        <div>
                            <el-row class="">
                                <el-col :span="24">
                                    <p>条件词组</p>
                                </el-col>
                            </el-row>
                            <el-row class="elRow">
                                <el-col :span="24">
                                    <div class="row">
                                        <span class="title">含&nbsp;&nbsp;&nbsp;&nbsp;有：</span>
                                        <div class="block">
                                            <div v-for="(item,index) in xmCondition.condition.keys.contain" :key="index" @click="del('contain','key',item)">
                                                {{item}}
                                                <span class="del">x</span>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- <el-row class="elRow">
                                <el-col :span="24">
                                    <div class="row">
                                        <span class="title">不含有：</span>
                                        <div class="block">
                                            <div v-for="(item,index) in xmCondition.condition.keys.notContain" :key="index" @click="del('noContain','key',item)">
                                                {{item}}
                                                <span class="del">x</span>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row> -->
                        </div>
                    </el-col>
                    <el-col :span="12" style="padding-left:20px;">
                        <div>
                            <el-row class="">
                                <el-col :span="24">
                                    <p>热搜词组</p>
                                </el-col>
                            </el-row>
                            <el-row class="elRow">
                                <el-col :span="24">
                                    <div class="row">
                                        <span class="title">含&nbsp;&nbsp;&nbsp;&nbsp;有：</span>
                                        <div class="block">
                                            <div @click="add('contain','key','河流')">河流</div>
                                            <div @click="add('contain','key','水渠')">水渠</div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- <el-row class="elRow">
                                <el-col :span="24">
                                    <div class="row">
                                        <span class="title">不含有：</span>
                                        <div class="block">
                                            <div @click="add('noContain','key','建筑')">建筑</div>
                                            <div @click="add('noContain','key','水利')">水利</div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row> -->
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card xmlx" v-show="display_xmlx">
            <div slot="header" class="clearfix">
                <span>项目可能涉及到的类型</span>
            </div>
            <div>
                <el-row>
                    <el-col :span="24">
                        <el-form :inline="true" :model="form" class="demo-form-inline" size="small" @submit.native.prevent>
                            <el-form-item label="含有">
                                <el-select v-model="form.lx_have" placeholder="含有">
                                    <el-option v-for="item in xmlx" :key="item" :label="item" :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <el-form-item label="不含有">
                                <el-select v-model="form.lx_noHave" placeholder="不含有">
                                    <el-option v-for="item in xmlx" :key="item" :label="item" :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit('xmlx')">添加</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" style="border-right:1px solid #d4d4d4;">
                        <div>
                            <el-row class="">
                                <el-col :span="24">
                                    <p>条件词组</p>
                                </el-col>
                            </el-row>
                            <el-row class="elRow">
                                <el-col :span="24">
                                    <div class="row">
                                        <span class="title">含&nbsp;&nbsp;&nbsp;&nbsp;有：</span>
                                        <div class="block">
                                            <div v-for="(item,index) in xmCondition.condition.xmlx.contain" :key="index" @click="del('contain','xmlx',item)">
                                                {{item}}
                                                <span class="del">x</span>
                                            </div>
                                        </div>
                                    </div>

                                </el-col>
                            </el-row>
                            <!-- <el-row class="elRow">
                                <el-col :span="24">
                                    <div class="row">
                                        <span class="title">不含有：</span>
                                        <div class="block">
                                            <div v-for="(item,index) in xmCondition.condition.xmlx.notContain" :key="index" @click="del('noContain','xmlx',item)">
                                                {{item}}
                                                <span class="del">x</span>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row> -->
                        </div>
                    </el-col>
                    <el-col :span="12" style="padding-left:20px;">
                        <div>
                            <el-row class="">
                                <el-col :span="24">
                                    <p>热搜词组</p>
                                </el-col>
                            </el-row>
                            <el-row class="elRow">
                                <el-col :span="24">
                                    <div class="row">
                                        <span class="title">含&nbsp;&nbsp;&nbsp;&nbsp;有：</span>
                                        <div class="block">
                                            <div @click="add('contain','xmlx','市政')">市政</div>
                                            <div @click="add('contain','xmlx','水利')">水利</div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- <el-row class="elRow">
                                <el-col :span="24">
                                    <div class="row">
                                        <span class="title">不含有：</span>
                                        <div class="block">
                                            <div @click="add('noContain','xmlx','建筑工程')">建筑工程</div>
                                            <div @click="add('noContain','xmlx','水利工程')">水利工程</div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row> -->
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="box-card money_time" v-show="display_money_date">
            <div slot="header" class="clearfix">
                <span>项目金额与时间</span>
            </div>
            <div>
                <el-row>
                    <el-col :span="12">
                        <el-form :inline="true" :model="form" class="demo-form-inline" size="small" @submit.native.prevent>
                            <el-form-item label="金额(万元)">
                                <el-col :span="11">
                                    <el-input v-model="form.min_money" placeholder="最小金额"></el-input>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                    <el-input v-model="form.max_money" placeholder="最大金额"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12" v-show="show_type=='tool'">
                        <el-form :inline="true" :model="form" class="demo-form-inline" size="small" @submit.native.prevent>
                            <el-form-item label="中标时间">
                                <el-date-picker type="date" value-format="yyyy-MM-dd" style="width:200px" placeholder="选择日期" v-model="form.min_date"></el-date-picker>
                                <span class="line" :span="2">-</span>
                                <el-date-picker type="date" value-format="yyyy-MM-dd" style="width:200px" placeholder="选择日期" v-model="form.max_date"></el-date-picker>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-row style="text-align:center">
            <el-button type="primary" @click="onSubmit('all')">提交</el-button>
            <el-button @click="onSubmit('cancel')">取消</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show_type:'',
            display_zbsj:true,
            display_key: true,
            display_xmlx: true,
            display_money_date: true,
            form: {
                key_have: "",
                key_noHave: "",
                lx_have: "",
                lx_noHave: "",
                min_date: "",
                max_date: "",
                min_money: "",
                max_money: ""
            },
            xmCondition: {
                tableName: "zbgs_jbxxs_his",
                condition: {
                    keys: {
                        contain: [],
                        notContain: []
                    },
                    xmlx: {
                        contain: [],
                        notContain: []
                    }
                },
                minMoney: "",
                maxMoney: "",
                minZbgsTime: "",
                maxZbgsTime: ""
            },
            xmlx: {
                '市政':'市政',
                '房建':'房建',
                '公路':'公路',
                '水利':'水利',
                '其他':'其他'
            }
        };
    },
    created(){
    },
    
    mounted() {
        this.get_href();
        this.getSource();
    },
    methods: {
        get_href(){
            let url=window.location.href;
            let a=url.slice(url.indexOf("#"),url.indexOf("?"));
            if(a=='#/bidIndustryTool'){
                this.show_type='tool'
            }
        },
        getSource() {
            this.axios.post(
                "/index/Common/getSource",
                { type: "xmlx" },
                data => {
                    // this.xmlx = data;
                }
            );
        },
        del(type, key, value) {
            if (key == "key") {
                if (type == "contain") {
                    this.xmCondition.condition.keys.contain.splice(
                        this.xmCondition.condition.keys.contain.indexOf(value),
                        1
                    );
                } else {
                    this.xmCondition.condition.keys.notContain.splice(
                        this.xmCondition.condition.keys.notContain.indexOf(
                            value
                        ),
                        1
                    );
                }
            } else if (key == "xmlx") {
                if (type == "contain") {
                    this.xmCondition.condition.xmlx.contain.splice(
                        this.xmCondition.condition.xmlx.contain.indexOf(value),
                        1
                    );
                } else {
                    this.xmCondition.condition.xmlx.notContain.splice(
                        this.xmCondition.condition.xmlx.notContain.indexOf(
                            value
                        ),
                        1
                    );
                }
            }
        },
        add(type, key, value) {
            if (key == "key") {
                if (type == "contain") {
                    if (
                        this.xmCondition.condition.keys.contain.indexOf(
                            value
                        ) == -1
                    ) {
                        this.xmCondition.condition.keys.contain.push(value);
                    }
                } else {
                    if (
                        this.xmCondition.condition.keys.notContain.indexOf(
                            value
                        ) == -1
                    ) {
                        this.xmCondition.condition.keys.notContain.push(value);
                    }
                }
            } else if (key == "xmlx") {
                if (type == "contain") {
                    if (
                        this.xmCondition.condition.xmlx.contain.indexOf(
                            value
                        ) == -1
                    ) {
                        this.xmCondition.condition.xmlx.contain.push(value);
                    }
                } else {
                    if (
                        this.xmCondition.condition.xmlx.notContain.indexOf(
                            value
                        ) == -1
                    ) {
                        this.xmCondition.condition.xmlx.notContain.push(value);
                    }
                }
            }
        },
        switchTab(key) {
            switch (key) {
                case "key":
                    this.display_key = !this.display_key;
                    break;
                case "xmlx":
                    this.display_xmlx = !this.display_xmlx;
                    break;
                case "money":
                    this.display_money_date = !this.display_money_date;
                    break;
            }
        },
        onSubmit(key) {
            switch (key) {
                case "key":
                    if (
                        this.form.key_have &&
                        this.xmCondition.condition.keys.contain.indexOf(
                            this.form.key_have
                        ) == -1
                    ) {
                        this.xmCondition.condition.keys.contain.push(
                            this.form.key_have
                        );
                    }
                    if (
                        this.form.key_noHave &&
                        this.xmCondition.condition.keys.notContain.indexOf(
                            this.form.key_noHave
                        ) == -1
                    ) {
                        this.xmCondition.condition.keys.notContain.push(
                            this.form.key_noHave
                        );
                    }
                    this.form.key_have = "";
                    this.form.key_noHave = "";
                    break;
                case "xmlx":
                    if (
                        this.form.lx_have &&
                        this.xmCondition.condition.xmlx.contain.indexOf(
                            this.form.lx_have
                        ) == -1
                    ) {
                        this.xmCondition.condition.xmlx.contain.push(
                            this.form.lx_have
                        );
                    }
                    if (
                        this.form.lx_noHave &&
                        this.xmCondition.condition.xmlx.notContain.indexOf(
                            this.form.lx_noHave
                        ) == -1
                    ) {
                        this.xmCondition.condition.xmlx.notContain.push(
                            this.form.lx_noHave
                        );
                    }

                    this.form.lx_have = "";
                    this.form.lx_noHave = "";
                    break;
                case "all":
                    if (this.display_money_date) {
                        this.xmCondition.minMoney = this.form.min_money;
                        this.xmCondition.maxMoney = this.form.max_money;
                        this.xmCondition.minZbgsTime = this.form.min_date;
                        this.xmCondition.maxZbgsTime = this.form.max_date;
                    } else {
                        this.xmCondition.minMoney = "";
                        this.xmCondition.maxMoney = "";
                        this.xmCondition.minZbgsTime = "";
                        this.xmCondition.maxZbgsTime = "";
                    }
                    if (!this.display_key) {
                        this.xmCondition.condition.keys.contain = [];
                        this.xmCondition.condition.keys.notContain = [];
                    }
                    if (!this.display_xmlx) {
                        this.xmCondition.condition.xmlx.contain = [];
                        this.xmCondition.condition.xmlx.notContain = [];
                    }
                    this.$emit("onYjCondition", this.xmCondition);
                    break;
                case "cancel":
                    this.$emit("onYjCondition", "cancel");
                    break;
            }
        }
    }
};
</script>
<style>
.el-dialog__body {
    padding: 0x 20px 20px 20px;
}
#card1 .el-dialog__body {
    padding-top: 20px;
}
.el-card {
    margin-bottom: 20px;
}
.key .el-card__header {
    background-color: #337ab7;
    color: white;
}
.xmlx .el-card__header {
    background-color: #3c763d;
    color: white;
}
.money_time .el-card__header {
    background-color: #8a6d3b;
    color: white;
}
.line {
    text-align: center;
    vertical-align: middle;
    min-width: 35px;
    display: inline-block;
}
</style>

<style lang="less" scoped>
.elRow {
    margin: 20px 0;
}
.row {
    display: flex;
    .title {
        display: block;
        width: 70px;
        line-height: 31px;
    }
    .block {
        div {
            display: inline-block;
            padding: 6px 20px;
            background-color: #337ab7;
            color: white;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            position: relative;
            .del {
                position: absolute;
                top: -2px;
                right: 5px;
            }
        }
    }
}
</style>
