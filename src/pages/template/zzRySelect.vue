<template>
    <div class="sel-wrapper" v-loading="loading">
        <!-- <el-cascader style="width:400px;margin-bottom:10px;" :options="caZzList" v-model="zz_s" @change="handleCaList">
            <template slot-scope="{ node, data }">
                <span>{{ data.label }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
        </el-cascader> -->
        <!-- 资质条件选择 -->
        <div class="sel-list">
            <div class="sel-input">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="资质名称">
                        <el-select v-model="zzTypeVal" placeholder="资质类别" @change="handleChangeZzType">
                            <el-option v-for="item in zzTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="zzItemShow">
                        <el-select v-model="zzItemVal" placeholder="资质项" @change="handleChangeZzItem">
                            <el-option v-for="item in zzItemList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="zzLevelShow">
                        <el-select v-model="zzLevelVal" placeholder="注册等级" @change="handleChangeZzLevel">
                            <el-option v-for="item in zzLevelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="sel-content">
                <span class="sel-name">资质条件</span>
                <!-- 已选资质条件展示列表 -->
                <ul class="sel-content-list">
                    <li class="sel-item" v-for="(item, index) in zzSelList" :key="index">{{index + 1}}. {{item.name}}
                        <i class="el-icon-close delete" @click="handleDelZzItem(item, index)"></i>
                    </li>
                </ul>
            </div>
        </div>
        <div class="line"></div>
        <!-- 人员条件选择 -->
        <div class="sel-list">
            <div class="sel-input">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="人员证件">
                        <el-select v-model="ryTypeVal" placeholder="证书类型" @change="handleChangeRyType">
                            <el-option v-for="item in ryTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="ryMajorShow">
                        <el-select v-model="ryMajorVal" placeholder="注册专业" @change="handleChangeRyMajor">
                            <el-option v-for="item in ryMajorList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="ryLevelShow">
                        <el-select v-model="ryLevelVal" placeholder="注册等级" @change="handleChangeRyLevel">
                            <el-option v-for="item in ryLevelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="sel-content">
                <span class="sel-name">人员条件</span>
                <!-- 已选人员条件展示列表 -->
                <ul class="sel-content-list">
                    <li class="sel-item" v-for="(item, index) in rySelList" :key="index">{{index + 1}}.{{item.name}}
                        <i class="el-icon-close delete" @click="handleDelRyItem(item, index)"></i>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 弹窗底部按钮 -->
        <el-row type="flex" style="margin-top:10px;" justify="center">
            <el-button type="primary" @click="handleClickSearchBtn">搜索</el-button>
            <el-button type="normal" @click="handleClickEmptyBtn">清空</el-button>
        </el-row>
    </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
    props: ["zzSel", "rySel", "type"],
    data() {
        return {
            // 资质选择
            caZzList: [],
            zzList: [],
            zzTypeList: [],
            zzTypeVal: "", // 资质类别
            zzTypeTxt: "",
            zzItemList: [],
            zzItemVal: "", // 资质项
            zzItemTxt: "",
            zzItemShow: false,
            zzLevelList: [],
            zzLevelVal: "", // 资质等级
            zzLevelTxt: "",
            zzLevelShow: false,
            zzSelList: [], // 资质条件筛选列表
            isQl: false, // 用来判断当前选择的资质条件是否已存在
            // 人员选择
            ryList: [],
            ryTypeList: [], // 人员证书类型
            ryTypeVal: "",
            ryTypeTxt: "",
            ryMajorList: [], // 人员注册专业列表
            ryMajorVal: "",
            ryMajorTxt: "",
            ryMajorShow: false,
            ryLevelList: [], // 人员注册等级列表
            ryLevelVal: "",
            ryLevelTxt: "",
            ryLevelShow: false,
            rySelList: [], // 人员条件选择列表
            isRyQl: false, // 用来判断当前选择的人员条件时候已存在
            loading: false,

            zz_s: ""
        };
    },
    created() {
        if (this.type === 2) {
            // 子组件位于资质加人员搜索列表页面 1-子组件位于首页
            this.zzSelList = this.zzSel;
            this.rySelList = this.rySel;
        }
        // 已选资质为空时
        this.handleInitZzPage();
        // 已选人员为空时
        this.handleInitRyPage();
        // 获取资质搜索条件列表
        this.handleGetQualiDict();
        // 获取证件搜索条件列表
        this.handleGetDocType();
    },
    methods: {
        handleCaList(val) {
            console.log(val, 'caList')
        },
        // 已选资质为空时，初始化页面
        handleInitZzPage() {
            if (this.zzSelList.length === 0) {
                // 资质选择
                this.zzTypeVal = ""; // 资质类别
                this.zzTypeTxt = "";
                this.zzItemList = [];
                this.zzItemVal = ""; // 资质项
                this.zzItemTxt = "";
                this.zzItemShow = false;
                this.zzLevelList = [];
                this.zzLevelVal = ""; // 资质等级
                this.zzLevelTxt = "";
                this.zzLevelShow = false;
                this.zzSelList = []; // 资质条件筛选列表
                this.isQl = false; // 用来判断当前选择的资质条件是否已存在
            }
        },
        // 已选人员证件为空时，初始化页面
        handleInitRyPage() {
            if (this.rySelList.length === 0) {
                // 人员选择
                this.ryTypeVal = "";
                this.ryTypeTxt = "";
                this.ryMajorList = []; // 人员注册专业列表
                this.ryMajorVal = "";
                this.ryMajorTxt = "";
                this.ryMajorShow = false;
                this.ryLevelList = []; // 人员注册等级列表
                this.ryLevelVal = "";
                this.ryLevelTxt = "";
                this.ryLevelShow = false;
                this.rySelList = []; // 人员条件选择列表
                this.isRyQl = false; // 用来判断当前选择的人员条件时候已存在
            }
        },

        // 获取资质搜索条件列表
        handleGetQualiDict() {
            this.loading = true;
            this.axios.post("/firm/firm_search/getQualiDict", {}, data => {
                if (data.status === "success") {
                    // 全部数据
                    this.zzList = data.rows;
                    this.caZzList = this.handleZzListData(data.rows);
                    console.log(this.caZzList, "ca");
                    // 资质类型列表
                    this.zzTypeList = data.rows.map((item, index) => {
                        return {
                            label: item.dname,
                            value: item.val
                        };
                    });
                }
                this.loading = false;
            });
        },
        // 改变返回的资质搜索条件数据列表字段
        handleZzListData(data) {
            return data.map(item => {
                if (item.children && item.children.length > 0) {
                    return {
                        label: item.dname,
                        value: item.val + '',
                        children: this.handleZzListData(item.children)
                    };
                } else {
                    return {
                        label: item.dname,
                        value: item.val + ''
                    };
                }
            });
        },
        // 资质类别改变的时候 选择资质类别
        handleChangeZzType(val) {
            // 初始化资质项和资质等级数据
            this.zzItemList = [];
            this.zzItemVal = "";
            this.zzItemTxt = "";
            this.zzItemShow = false;

            this.zzLevelList = [];
            this.zzLevelVal = "";
            this.zzLevelTxt = "";
            this.zzLevelShow = false;

            this.zzList.map((item, index) => {
                if (item.val === this.zzTypeVal) {
                    this.zzTypeTxt = item.dname;
                    if (item.children && item.children.length > 0) {
                        this.zzItemList = item.children.map((one, s_index) => {
                            return {
                                label: one.dname,
                                value: one.val
                            };
                        });
                        this.zzItemShow = true;
                    } else {
                        // 没有子选项时
                        let name = [this.zzTypeTxt];
                        let sVal = [this.zzTypeVal];
                        let zzSelList = this.zzSelList;
                        zzSelList.push({
                            name: name,
                            val: sVal
                        });
                        this.zzSelList = zzSelList;
                    }
                }
            });
        },
        // 资质项改变的时候 选择资质项
        handleChangeZzItem(val) {
            // 初始化资质等级数据
            this.zzLevelList = [];
            this.zzLevelVal = "";
            this.zzLevelTxt = "";
            this.zzLevelShow = false;

            this.zzList.map((item, index) => {
                if (item.val === this.zzTypeVal) {
                    item.children.map((one, s_index) => {
                        if (one.val === this.zzItemVal) {
                            this.zzItemTxt = one.dname;
                            if (one.children && one.children.length > 0) {
                                this.zzLevelList = one.children.map(
                                    (s_item, s_i) => {
                                        return {
                                            label: s_item.dname,
                                            value: s_item.val
                                        };
                                    }
                                );

                                this.zzLevelShow = true;
                            } else {
                                // 没有子选项时
                                let name = [this.zzTypeTxt, this.zzItemTxt];
                                let sVal = [this.zzTypeVal, this.zzItemVal];
                                let zzSelList = this.zzSelList;
                                zzSelList.push({
                                    name: name.join("/"),
                                    val: sVal.join("_")
                                });
                                this.zzSelList = zzSelList;
                            }
                        }
                    });
                }
            });
        },
        // 资质等级改变的时候 选择资质等级
        handleChangeZzLevel(val) {
            for (let i = 0; i < this.zzSelList.length; i++) {
                let item = this.zzSelList[i];
                if (
                    item.val.indexOf(this.zzTypeVal + "_" + this.zzItemVal) ===
                    0
                ) {
                    this.isQl = true;
                    this.$message({
                        message: "不能重复选择",
                        type: "warning"
                    });
                    // 使资质等级的值保持为上一次选择的值(select在判断之前已经改变了资质等级的值，这里进行还原)

                    this.zzLevelVal = Number(item.val.split("_")[2]);
                    this.zzLevelTxt = item.name.split("/")[2];

                    break;
                    // return
                } else {
                    this.isQl = false;
                    continue;
                }
            }

            if (this.isQl) {
                return;
            }

            // return

            this.zzLevelList.map((item, index) => {
                if (item.value === this.zzLevelVal) {
                    this.zzLevelTxt = item.label;
                }
            });

            let name = [this.zzTypeTxt, this.zzItemTxt, this.zzLevelTxt];
            let sVal = [this.zzTypeVal, this.zzItemVal, this.zzLevelVal];
            let zzSelList = this.zzSelList;
            zzSelList.push({
                name: name.join("/"),
                val: sVal.join("_")
            });
            this.zzSelList = zzSelList;
        },
        // 点击资质条件每列的 x号，删除当前选中条件
        handleDelZzItem(item, index) {
            let zzSelList = this.zzSelList;
            zzSelList.splice(index, 1);
            this.zzSelList = zzSelList;
            this.handleInitZzPage();
        },
        // 获取证件搜索条件列表
        handleGetDocType() {
            this.axios.post("/firm/firm_search/getDocType", {}, data => {
                if (data.status === "success") {
                    // 全部数据
                    this.ryList = data.rows;

                    // 人员类型列表
                    this.ryTypeList = data.rows.map((item, index) => {
                        return {
                            label: item.dname,
                            value: item.val
                        };
                    });
                }
            });
        },
        // 人员证件类型改变的时候 选择人员证件类型
        handleChangeRyType(val) {
            // 初始化人员注册专业和注册等级数据
            this.ryMajorList = [];
            this.ryMajorVal = "";
            this.ryMajorTxt = "";
            this.ryMajorShow = false;

            this.ryLevelList = [];
            this.ryLevelVal = "";
            this.ryLevelTxt = "";
            this.ryLevelShow = false;

            this.ryList.map((item, index) => {
                if (item.val === this.ryTypeVal) {
                    this.ryTypeTxt = item.dname;
                    if (item.children && item.children.length > 0) {
                        this.ryMajorList = item.children.map((one, s_index) => {
                            return {
                                label: one.dname,
                                value: one.val
                            };
                        });
                        this.ryMajorShow = true;
                    } else {
                        // 没有子选项时
                        let name = [this.ryTypeTxt];
                        let sVal = [this.ryTypeVal];
                        let rySelList = this.rySelList;
                        rySelList.push({
                            name: name,
                            val: sVal
                        });
                        this.rySelList = rySelList;
                    }
                }
            });
        },
        // 人员注册专业改变的时候 选择人员注册专业
        handleChangeRyMajor(val) {
            // 初始化人员注册等级数据
            this.ryLevelList = [];
            this.ryLevelVal = "";
            this.ryLevelTxt = "";
            this.ryLevelShow = false;

            this.ryList.map((item, index) => {
                if (item.val === this.ryTypeVal) {
                    item.children.map((one, s_index) => {
                        if (one.val === this.ryMajorVal) {
                            this.ryMajorTxt = one.dname;
                            if (one.children && one.children.length > 0) {
                                this.ryLevelList = one.children.map(
                                    (s_item, s_i) => {
                                        return {
                                            label: s_item.dname,
                                            value: s_item.val
                                        };
                                    }
                                );

                                this.ryLevelShow = true;
                            } else {
                                // 没有子选项时
                                let name = [this.ryTypeTxt, this.ryMajorTxt];
                                let sVal = [this.ryTypeVal, this.ryMajorVal];
                                let rySelList = this.rySelList;
                                rySelList.push({
                                    name: name.join("/"),
                                    val: sVal.join("_")
                                });
                                this.rySelList = rySelList;
                            }
                        }
                    });
                }
            });
        },
        // 人员注册等级改变的时候 选择人员注册等级
        handleChangeRyLevel(val) {
            for (let i = 0; i < this.rySelList.length; i++) {
                let item = this.rySelList[i];
                if (
                    item.val.indexOf(
                        this.ryTypeVal + "_" + this.ryMajorVal + "_"
                    ) === 0
                ) {
                    this.isRyQl = true;
                    this.$message({
                        message: "不能重复选择",
                        type: "warning"
                    });
                    // 使资质等级的值保持为上一次选择的值(select在判断之前已经改变了资质等级的值，这里进行还原)

                    this.ryLevelVal = Number(item.val.split("_")[2]);
                    this.ryLevelTxt = item.name.split("/")[2];

                    break;
                    // return
                } else {
                    this.isRyQl = false;
                    continue;
                }
            }

            if (this.isRyQl) {
                return;
            }

            // return

            this.ryLevelList.map((item, index) => {
                if (item.value === this.ryLevelVal) {
                    this.ryLevelTxt = item.label;
                }
            });

            let name = [this.ryTypeTxt, this.ryMajorTxt, this.ryLevelTxt];
            let sVal = [this.ryTypeVal, this.ryMajorVal, this.ryLevelVal];
            let rySelList = this.rySelList;
            rySelList.push({
                name: name.join("/"),
                val: sVal.join("_")
            });
            this.rySelList = rySelList;
        },
        // 点击人员条件每列的 x号，删除当前选中条件
        handleDelRyItem(item, index) {
            let rySelList = this.rySelList;
            rySelList.splice(index, 1);
            this.rySelList = rySelList;
            this.handleInitRyPage();
        },
        // 点击搜索按钮 调用父组件方法 请求表格列表接口
        handleClickSearchBtn() {
            if (this.zzSelList.length === 0 && this.rySelList.length === 0) {
                this.$message.error("搜索条件不能为空!");
                return;
            }
            let data = {
                zzSelList: this.zzSelList,
                rySelList: this.rySelList
            };
            if (this.type === 1) {
                // 生成唯一的uuid
                let mydate = new Date();
                let uuid =
                    mydate.getDay() +
                    mydate.getHours() +
                    mydate.getMinutes() +
                    mydate.getSeconds() +
                    mydate.getMilliseconds() +
                    Math.round(Math.random() * 10000);
                // 子组件位于首页时
                localStorage.setItem("zzRyData", JSON.stringify(data));
                let { href } = this.$router.resolve({
                    path: `/aptWithPerSearch?data=${uuid}`
                });
                window.open(href, "资质加人员详情");
            } else if (this.type === 2) {
                // 子组件位于资质加人员详情页时
                this.$emit("sendChildData", data);
            }
        },
        // 点击清空按钮 清空所有数据
        handleClickEmptyBtn() {
            // 资质选择
            this.zzTypeVal = ""; // 资质类别
            this.zzTypeTxt = "";
            this.zzItemList = [];
            this.zzItemVal = ""; // 资质项
            this.zzItemTxt = "";
            this.zzItemShow = false;
            this.zzLevelList = [];
            this.zzLevelVal = ""; // 资质等级
            this.zzLevelTxt = "";
            this.zzLevelShow = false;
            this.zzSelList = []; // 资质条件筛选列表
            this.isQl = false; // 用来判断当前选择的资质条件是否已存在
            // 人员选择
            this.ryTypeVal = "";
            this.ryTypeTxt = "";
            this.ryMajorList = []; // 人员注册专业列表
            this.ryMajorVal = "";
            this.ryMajorTxt = "";
            this.ryMajorShow = false;
            this.ryLevelList = []; // 人员注册等级列表
            this.ryLevelVal = "";
            this.ryLevelTxt = "";
            this.ryLevelShow = false;
            this.rySelList = []; // 人员条件选择列表
            this.isRyQl = false; // 用来判断当前选择的人员条件时候已存在
            this.$emit("sendChildData", {
                zzSelList: this.zzSelList,
                rySelList: this.rySelList
            });
        }
    }
};
</script>

<style lang="less" scoped>
.sel-wrapper {
    width: 100%;
    // height: 300px;
    border: 1px solid #d5d5d5;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 4px;
    .line {
        width: calc(100% - 20px);
        height: 1px;
        background-color: #fff;
        margin: 10px auto;
    }
    .sel-list {
        width: 100%;
        .sel-content {
            width: 100%;
            .sel-name {
                // padding-right: 12px;
                display: inline-block;
                width: 68px;
                vertical-align: top;
            }
            .sel-content-list {
                width: calc(100% - 80px);
                list-style: none;
                border: 1px solid #d5d5d5;
                border-radius: 4px;
                display: inline-block;
                padding: 10px;
                box-sizing: border-box;
                height: 150px;
                overflow: auto;
                .sel-item {
                    width: 100%;
                    // height: 24px;
                    line-height: 24px;
                    .delete {
                        padding-left: 10px;
                        color: red;
                    }
                }
            }
        }
    }
}
</style>


