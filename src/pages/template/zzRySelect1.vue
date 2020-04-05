<template>
    <div v-loading="loading">
        <!-- 资质条件 -->
        <div class="zz_search">
            <div class="select_tj">
                <div class="zz_name">
                    <span>资质名称</span>
                    <el-select style="margin-right:6px;width:180px;" v-for="(item,i) in zz_select_options" :key="i" size="small" v-model="item.selectVal" placeholder="请选择" @change="onChange_yj(i,item.options)">
                        <el-option v-for="item2 in item.options" :key="item2.value" :label="item2.label" :value="item2.value"></el-option>
                    </el-select>
                </div>
                <div class="zz_tj">
                    <span>资质条件</span>
                    <div class="zz_tjlists">
                        <ul>
                            <li v-for="(item,i) in new_frame" :key="i">
                                <p>{{i+1}}.{{item.name}}</p>
                                <div class="ej_zz">
                                    <div v-for="(item2,i2) in item.children" :key="i2">
                                        <span>{{item2.name}}</span>
                                        <i @click="onClear(item2.value)" class="el-icon-close" style="color:red"></i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="select_center">
                <div style="height:160px;overflow:auto" class="div_scoll">
                    <el-checkbox-group v-model="zz_checked" @change="onChange_checkbox">
                        <div class="check_row" v-for="item in zz_checkboxs" :key="item.value">
                            <el-checkbox :label="item.value">{{item.label}}</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <!-- 分割线 -->
        <div class="line"></div>
        <!-- 人员条件 -->
        <div class="zz_search">
            <div class="select_tj">
                <div class="zz_name">
                    <span>人员证件</span>
                    <el-select style="margin-right:6px;width:180px;" v-for="(item,i) in ry_select_options" :key="i" size="small" v-model="item.selectVal" placeholder="请选择" @change="onChange_ry(i,item.options)">
                        <el-option v-for="item2 in item.options" :key="item2.value" :label="item2.label" :value="item2.value"></el-option>
                    </el-select>
                </div>
                <div class="zz_tj">
                    <span>人员条件</span>
                    <div class="zz_tjlists">
                        <ul>
                            <li v-for="(item,i) in ry_new_frame" :key="i">
                                <p>{{i+1}}.{{item.name}}</p>
                                <div class="ej_zz">
                                    <div v-for="(item2,i2) in item.children" :key="i2">
                                        <span>{{item2.name}}</span>
                                        <i @click="onClearRy(item2.value)" class="el-icon-close" style="color:red"></i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="select_center">
                <div style="height:160px;overflow:auto" class="div_scoll">
                    <el-checkbox-group v-model="ry_checked" @change="onChange_checkboxRy">
                        <div class="check_row" v-for="item in ry_checkboxs" :key="item.value">
                            <el-checkbox :label="item.value">{{item.label}}</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <!-- 操作按钮 -->
        <div align="center" style="margin-top:10px;">
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button @click="onClearTj">清空</el-button>
        </div>
    </div>
</template>
<script>
export default {
    props: ["zzSel", "rySel", "type"],
    data() {
        return {
            loading: true,
            // 资质
            iptzz_yj: "", //一级选中值
            zz_checked: [], //选中资质数组
            zz_options_yj: [], //一级下拉
            zz_options_ej: [], //二级下拉
            zz_TjArray: [],
            //所有的资质项
            zz_allCheckboxs: [],
            //选中的资质项
            zz_checkboxs: [],
            zz_select_options: [], //全部的下拉选择数据
            new_frame: [], //资质条件选择文本
            obj: {},
            // 人员
            iptzz_ry: "", //一级选中值
            ry_checked: [], //选中人员数组
            ry_options_yj: [], //一级下拉
            ry_options_ej: [], //二级下拉
            ry_TjArray: [],
            //所有的人员项
            ry_allCheckboxs: [],
            //选中的人员项
            ry_checkboxs: [],
            ry_select_options: [], //全部的下拉选择数据
            ry_new_frame: [], //人员条件选择文本
            ry_obj: {}
        };
    },
    created() {
        if (this.type === 2) {
            // 子组件位于资质加人员搜索列表页面 1-子组件位于首页
            this.zz_TjArray = this.zzSel;
            this.rySelList = this.rySel;
        }
        this.getZz();
        // 获取证件搜索条件列表
        this.handleGetDocType();
    },
    //事件
    methods: {
        //获取资质字典
        getZz() {
            this.axios.post("/firm/Firm_search/getQualiDict", {}, backData => {
                let zzYj = [];
                let zzArray = []; //所有的资质条件
                backData.rows.forEach(v => {
                    let obj_yj = {
                        value: v.val || "工程设计",
                        label: v.dname,
                        children: v.children
                    };
                    zzYj.push(obj_yj);
                    v.children.forEach(v2 => {
                        v2.children.forEach(v3 => {
                            let yj_d = null;
                            if (v.val) {
                                yj_d = v.val;
                            } else {
                                yj_d = "工程设计";
                            }
                            if (v3.children) {
                                v3.children.forEach(v4 => {
                                    if (v4.children) {
                                        v4.children.forEach(v5 => {
                                            let obj = {
                                                value:
                                                    yj_d +
                                                    "_" +
                                                    v2.val +
                                                    "_" +
                                                    v3.val +
                                                    "_" +
                                                    v4.val +
                                                    "_" +
                                                    v5.val,
                                                label:
                                                    v.dname +
                                                    " / " +
                                                    v2.dname +
                                                    " / " +
                                                    v3.dname +
                                                    " / " +
                                                    v4.dname +
                                                    " / " +
                                                    v5.dname
                                            };
                                            zzArray.push(obj);
                                        });
                                    } else {
                                        let obj = {
                                            value:
                                                yj_d +
                                                "_" +
                                                v2.val +
                                                "_" +
                                                v3.val +
                                                "_" +
                                                v4.val,
                                            label:
                                                v.dname +
                                                " / " +
                                                v2.dname +
                                                " / " +
                                                v3.dname +
                                                " / " +
                                                v4.dname
                                        };
                                        zzArray.push(obj);
                                    }
                                });
                            } else {
                                let obj = {
                                    value: yj_d + "_" + v2.val + "_" + v3.val,
                                    label:
                                        v.dname +
                                        " / " +
                                        v2.dname +
                                        " / " +
                                        v3.dname
                                };
                                zzArray.push(obj);
                            }
                        });
                    });
                });
                
                this.zz_select_options.push({ options: zzYj, selectVal: "" });
                // this.zz_checkboxs = zzArray;
                this.zz_allCheckboxs = zzArray;
                this.defaultFn();
            });
        },
        //资质默认选中值
        defaultFn() {
            let check = this.zzSel;
            if (check) {
                if (check.length !== 0) {
                    this.zz_checked = check.map(item => {
                        return item.value;
                    });
                    this.onChange_checkbox();
                } else {
                    this.loading = false;
                }
            } else {
                this.loading = false;
            }
        },
        // 资质选择 选中第一级时
        onChange_yj(i, obj) {
            if (i == 0) {
                this.obj = obj;
            }
            let yj = obj.filter(
                v => v.value === this.zz_select_options[i].selectVal
            );
            let ej_array = [
                {
                    value: "",
                    label: "全部"
                }
            ];
            if (i == 1 && yj[0].label == "全部") {
                this.onChange_yj(0, this.obj);
                return;
            }

            yj[0].children.forEach(v => {
                let obj = {
                    value: v.val,
                    label: v.dname,
                    children: v.children
                };
                ej_array.push(obj);
            });
            this.zz_select_options.splice(i + 1, 8);
            if (ej_array[1].children) {
                this.zz_select_options.push({
                    options: ej_array,
                    selectVal: ""
                });
            }
            // console.log(this.zz_select_options)
            this.filterZz();
        },
        //改变多选框赋值条件数据
        onChange_checkbox(val) {
            // console.log(val, 'val')
            // console.log(this.zz_checked, '多选框')
            this.zz_TjArray = this.zz_checked.map(v => {
                return this.zz_allCheckboxs.filter(v2 => v2.value == v)[0];
            });
            var new_frame = [];
            this.zz_TjArray.forEach(v => {
                var name_array = v.label.split(" / ");
                var value_ = v.value;
                if (new_frame.length == 0) {
                    new_frame = [
                        {
                            name: name_array[0],
                            children: [
                                {
                                    name: name_array.slice(1, 8).join(" / "),
                                    value: value_
                                }
                            ]
                        }
                    ];
                } else {
                    var ex_i = null;
                    var existence = new_frame.filter((v2, i2) => {
                        if (v2.name == name_array[0]) {
                            ex_i = i2;
                            return v2;
                        }
                    });
                    if (existence[0]) {
                        new_frame[ex_i].children.push({
                            name: name_array.slice(1, 8).join(" / "),
                            value: value_
                        });
                    } else {
                        let obj = {
                            name: name_array[0],
                            children: [
                                {
                                    name: name_array.slice(1, 8).join(" / "),
                                    value: value_
                                }
                            ]
                        };
                        new_frame.push(obj);
                    }
                }
            });
            this.new_frame = new_frame;
            this.loading = false;
        },
        //筛选资质选项
        filterZz() {
            var a = [];
            this.zz_select_options.forEach(v => {
                v.selectVal && a.push(v.selectVal);
            });
            // console.log(a);
            let nowArray = this.zz_allCheckboxs.filter(
                v => v.value.indexOf(a.join("_") + "_") == 0
            );
            this.zz_checkboxs = nowArray;
            // console.log(this.zz_checkboxs)
        },
        //清除资质选项
        onClear(value) {
            this.zz_checked = this.zz_checked.filter(v => v != value);
            // if (this.zz_checked.length == 0) {
            //     localStorage.setItem("setzzSearchValue", "");
            //     localStorage.setItem("setzzSearchValue_checked", "");
            // }
            this.onChange_checkbox();
        },
        // 获取证件搜索条件列表
        handleGetDocType() {
            this.axios.post("/firm/firm_search/getDocType", {}, data => {
                let ryYj = [];
                let ryArray = []; //所有的人员条件
                data.rows.forEach(v => {
                    let obj_ry = {
                        value: v.val,
                        label: v.dname,
                        children: v.children
                    };
                    ryYj.push(obj_ry);
                    v.children.forEach(v2 => {
                        v2.children.forEach(v3 => {
                            let ry_d = null;
                            if (v.val) {
                                ry_d = v.val;
                            } else {
                                ry_d = "工程设计";
                            }
                            let obj = {
                                value: ry_d + "_" + v2.val + "_" + v3.val,
                                label:
                                    v.dname +
                                    " / " +
                                    v2.dname +
                                    " / " +
                                    v3.dname
                            };
                            ryArray.push(obj);
                        });
                    });
                });
                // this.loading = false;
                this.ry_select_options.push({ options: ryYj, selectVal: "" });
                // this.zz_checkboxs = zzArray;
                this.ry_allCheckboxs = ryArray;
                this.defaultFnRy();
            });
        },
        //人员默认选中值
        defaultFnRy() {
            let check = this.rySel;
            if (check) {
                if (check.length !== 0) {
                    this.ry_checked = check.map(item => {
                        return item.value;
                    });
                    this.onChange_checkboxRy();
                }
            }
        },
        //人员 改变多选框赋值条件数据
        onChange_checkboxRy(val) {
            // console.log(val, 'val')
            // console.log(this.zz_checked, '多选框')
            this.ry_TjArray = this.ry_checked.map(v => {
                return this.ry_allCheckboxs.filter(v2 => v2.value == v)[0];
            });
            var new_frame = [];
            this.ry_TjArray.forEach(v => {
                var name_array = v.label.split(" / ");
                var value_ = v.value;
                if (new_frame.length == 0) {
                    new_frame = [
                        {
                            name: name_array[0],
                            children: [
                                {
                                    name: name_array.slice(1, 8).join(" / "),
                                    value: value_
                                }
                            ]
                        }
                    ];
                } else {
                    var ex_i = null;
                    var existence = new_frame.filter((v2, i2) => {
                        if (v2.name == name_array[0]) {
                            ex_i = i2;
                            return v2;
                        }
                    });
                    if (existence[0]) {
                        new_frame[ex_i].children.push({
                            name: name_array.slice(1, 8).join(" / "),
                            value: value_
                        });
                    } else {
                        let obj = {
                            name: name_array[0],
                            children: [
                                {
                                    name: name_array.slice(1, 8).join(" / "),
                                    value: value_
                                }
                            ]
                        };
                        new_frame.push(obj);
                    }
                }
            });
            this.ry_new_frame = new_frame;
            // this.loading = false;
        },
        // 人员选择 选中第一级时
        onChange_ry(i, obj) {
            if (i == 0) {
                this.ry_obj = obj;
            }
            let yj = obj.filter(
                v => v.value === this.ry_select_options[i].selectVal
            );
            let ej_array = [
                {
                    value: "",
                    label: "全部"
                }
            ];
            if (i == 1 && yj[0].label == "全部") {
                this.onChange_ry(0, this.ry_obj);
                return;
            }

            yj[0].children.forEach(v => {
                let obj = {
                    value: v.val,
                    label: v.dname,
                    children: v.children
                };
                ej_array.push(obj);
            });
            this.ry_select_options.splice(i + 1, 8);
            if (ej_array[1].children) {
                this.ry_select_options.push({
                    options: ej_array,
                    selectVal: ""
                });
            }
            // console.log(this.zz_select_options)
            this.filterRy();
        },
        //筛选人员选项
        filterRy() {
            var a = [];
            this.ry_select_options.forEach(v => {
                v.selectVal && a.push(v.selectVal);
            });
            // console.log(a);
            let nowArray = this.ry_allCheckboxs.filter(
                v => v.value.indexOf(a.join("_") + "_") == 0
            );
            this.ry_checkboxs = nowArray;
            // console.log(this.zz_checkboxs)
        },
        //清除人员选项
        onClearRy(value) {
            this.ry_checked = this.ry_checked.filter(v => v != value);
            // if (this.ry_checked.length == 0) {
            //     localStorage.setItem("setzzSearchValue", "");
            //     localStorage.setItem("setzzSearchValue_checked", "");
            // }
            this.onChange_checkboxRy();
        },
        //点击搜索
        onSearch() {
            //   let search_array = {};
            //   this.zz_TjArray.forEach(v => {
            //     let labels = v.label.split(" / ");
            //     if (labels[0] == "工程设计(建筑市场)") {
            //       if (search_array["工程设计"]) {
            //         //如果存在工程设计
            //         let gc_value = v.value.split("_");
            //         gc_value.splice(0, 1);
            //         let label_l = labels.slice(labels.length - 1, labels.length);
            //         search_array["工程设计"][0][label_l.join("_")] =
            //           "工程设计" + gc_value.join("_");
            //       } else {
            //         let obj = {};
            //         let gc_value = v.value.split("_");
            //         gc_value.splice(0, 1);
            //         let label_l = labels.slice(labels.length - 1, labels.length);
            //         obj[label_l.join("_")] = "工程设计" + gc_value.join("_");
            //         search_array["工程设计"] = [obj];
            //       }
            //     } else {
            //       //如果不是工程设计
            //       let index_ = null;
            //       let pass = search_array[labels[0]];
            //       if (!pass) {
            //         //不存在一级
            //         let obj2 = {};
            //         obj2[labels[1] + "_" + labels[2]] = v.value;
            //         search_array[labels[0]] = [obj2];
            //       } else {
            //         // 判断是否二级相同
            //         let pass2_index = null;
            //         search_array[labels[0]].forEach((v1, i1) => {
            //           for (let key_ in v1) {
            //             if (key_.indexOf(labels[1]) == 0) {
            //               pass2_index = i1;
            //             }
            //           }
            //         });
            //         if (pass2_index == null) {
            //           //不存在相同的二级
            //           //如果没有
            //           let obj = {};
            //           obj[labels[1] + "_" + labels[2]] = v.value;
            //           search_array[labels[0]].push(obj);
            //         } else {
            //           search_array[labels[0]][pass2_index][
            //             labels[1] + "_" + labels[2]
            //           ] = v.value;
            //         }
            //       }
            //     }
            //   });
            console.log(this.zz_TjArray, "check");
            if (this.zz_TjArray.length === 0) {
                this.$message.error("搜索条件不能为空!");
                return;
            }
            let data = {
                zzSelList: this.zz_TjArray,
                rySelList: this.ry_TjArray
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
        //清空
        onClearTj() {
            // console.log(this.zz_select_options)
            this.zz_select_options.map(v => {
                v.selectVal = "";
            });
            this.zz_checked = [];
            this.zz_select_options.splice(1, 8);
            localStorage.setItem("setzzSearchValue", "");
            localStorage.setItem("setzzSearchValue_checked", "");
            this.filterZz();
            this.onChange_checkbox();
        }
    }
};
</script>


<style lang="less" scoped>
.div_scoll::-webkit-scrollbar-track-piece {
    background-color: #f8f8f8;
}
.div_scoll::-webkit-scrollbar {
    width: 9px;
    height: 9px;
}
.div_scoll::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    background-clip: padding-box;
    min-height: 28px;
}
.div_scoll::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
}

.line {
    // width: calc(100% - 20px);
    height: 1px;
    background-color: #d5d5d5;
    margin: 10px auto;
}

.zz_search {
    border: 1px solid #d5d5d5;
    .select_tj {
        // border: 1px solid #d5d5d5;
        margin-bottom: 10px;
        padding: 10px 20px;
    }
    .select_center {
        border-top: 1px solid #d5d5d5;
        // margin-bottom: 10px;
        padding: 10px 20px;
    }
    .select_tj {
        span {
            font-size: 14px;
            margin-right: 10px;
        }
        .zz_name {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }
        .zz_tj {
            display: flex;
            .zz_tjlists {
                border: 1px solid #d5d5d5;
                padding: 4px;
                font-size: 14px;
                flex: 1;
                min-height: 20px;
                ul {
                    overflow: auto;
                    display: flex;
                    flex-flow: wrap;
                    li {
                        list-style: none;
                        float: left;
                        width: 50%;
                        margin-bottom: 4px;
                        .ej_zz {
                            color: #888;
                            padding: 0 10px;
                            > div {
                                padding: 2px 0;
                                span {
                                    flex: unset;
                                }
                                display: flex;
                                align-items: center;
                            }
                        }
                    }
                }
            }
        }
    }
    //选中check内容
    .select_center {
        .check_row {
            margin-bottom: 10px;
        }
    }
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
</style>


