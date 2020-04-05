<template>
    <div>
        <el-form :inline="true" :model="form" class="demo-form-inline" @submit.native.prevent>
            <el-row>
                <el-col :span="24">
                    <el-form-item :label="data.max_gsbh">
                        <el-input v-model="form.gsmc" placeholder="企业名称" style="width:410px">
                            <el-button slot="append" @click="addQy">添加企业</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item>
                        投标报价(万)
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        点位
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        评审价(万元)
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item>
                        点位
                    </el-form-item>

                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        不可变价(万)
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-input v-model="form.tbbjw" placeholder="投标报价" @change="change_zgxjw"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="form.tbxf" placeholder="点位"></el-input>
                </el-col>
                <el-col :span="1" style="text-align:center;line-height:37px">
                    =
                </el-col>
                <el-col :span="5">
                    <el-input v-model="form.psbjw" placeholder="评审价" @change="change_psj"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="form.psxf" placeholder="点位"></el-input>
                </el-col>
                <el-col :span="1" style="text-align:center;line-height:37px">
                    +
                </el-col>
                <el-col :span="4">
                    <el-input v-model="form.bkbjw" placeholder="不可变价" @change="change_bkbj"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" style="text-align:center;margin-top:30px">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">添加</el-button>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>

        <el-dialog title="公司列表" :visible.sync="allCompany.dialogVisable" width="50%" append-to-body>
            <all-company :data='modelTbdw' v-on:fnModelTbdw="fn_allcompany"></all-company>
        </el-dialog>
    </div>
</template>

<script>
import allCompany from "./allCompany.vue";
import { formatNum } from "../../store/formatter.js";

export default {
    props: ["data"],
    data() {
        return {
            modelTbdw: "modelTbdw",
            parentData: {},
            form: {
                gsmc:'',
                gs_id:'',
                tbbjw: "",
                psbjw: "",
                bkbjw: "",
                tbxf: "",
                psxf: ""
            },
            allCompany: {
                dialogVisable: false
            }
        };
    },
    components: {
        allCompany
    },
    watch: {
        data() {
            this.setData();
        }
    },
    created() {
        this.setData();
    },
    methods: {
        setData() {
            this.parentData = this.data;
            console.log(this.data);
        },
        change_zgxjw() {
            //修改投标报价，不可变价有,算评审价
            // 投标下浮 = 投标报价/最高限价*100
            if (this.form.bkbjw) {
                this.form.psbjw = formatNum(
                    this.form.zgxjw - 0 - (this.form.bkbjw - 0),
                    2
                );
            }
            if (this.form.tbbjw) {
                this.form.tbxf = formatNum(
                    (this.form.tbbjw - 0) / (this.parentData.zgxjw - 0) * 100,
                    2
                );
            }
        },
        change_psj() {
            //修改评审价，算不可变价
            // 评审下浮 = 评审价/基本信息的评审价*100
            this.form.bkbjw = formatNum(
                this.form.tbbjw - 0 - (this.form.psbjw - 0),
                2
            );
            if (this.form.psbjw) {
                this.form.psxf = formatNum(
                    (this.form.psbjw - 0) / (this.parentData.psbjw - 0) * 100,
                    2
                );
            }
        },
        change_bkbj() {
            //修改不可变价，算评审价
            this.form.psbjw = formatNum(
                this.form.tbbjw - 0 - (this.form.bkbjw - 0),
                2
            );
        },
        addQy() {
            this.allCompany.dialogVisable = true;
        },
        fn_allcompany(val) {
            this.allCompany.dialogVisable = false;
            this.form.gsmc = val.gsmc;
            this.form.gs_id = val.gs_id;
        },
        onSubmit() {
            console.log('233')
            this.$emit('fnTbdw',this.form)
           
        }
    }
};
</script>

<style lang="less" scoped>
</style>
