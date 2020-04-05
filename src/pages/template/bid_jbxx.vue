<template>
    <div id="bid_jbxx">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <div class="text item">
                <p :title="item.name" v-for="(item,index) in form " :key="index" v-if="item.value">{{item.value}}</p>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    props: ["jbxxId"],
    data() {
        return {
            form: {
                xmdq: { name: "项目地区", value: "" },
                xmlxA: { name: "项目类型A", value: "" },
                xmlxB: { name: "项目类型B", value: "" },
                stage: { name: "项目阶段", value: "" },
                xmyzdw: { name: "项目业主单位", value: "" },
                zzyq: { name: "资质要求", value: "" },
                ryyq: { name: "人员要求", value: "" },
                yjyq: { name: "业绩要求", value: "" },
                qtyq: { name: "其他要求", value: "" },
                kzj: { name: "控制价", value: "" },
                xmjgbm: { name: "项目监管部门", value: "" },
                jsnrjgm: { name: "建设内容及规模", value: "" },
                xmtz: { name: "项目特征", value: "" },
                qt: { name: "其他", value: "" }
            }
        };
    },
    mounted() {
        this.edit(this.jbxxId);
    },
    watch:{
        jbxxId:function(){
             this.edit(this.jbxxId);
        }
    },
    methods: {
        edit(jbxx_id) {
            this.axios.post(
                "/index/project/edit",
                { jbxx_id: jbxx_id },
                data => {
                    if (data.status == "success") {
                        let back = data.res;
                        let xmdq = "",
                            xmlxA = "",
                            xmlxB = "",
                            stage = "";
                        if (back.xmdq == 5) {
                            xmdq = "成都市";
                        } else if (back.xmdq == 6) {
                            xmdq = "自贡市";
                        } else if (back.xmdq == 7) {
                            xmdq = "绵阳市";
                        } else if (back.xmdq == 8) {
                            xmdq = "凉山州";
                        } else if (back.xmdq == 9) {
                            xmdq = "内江市";
                        } else if (back.xmdq == 10) {
                            xmdq = "乐山市";
                        } else if (back.xmdq == 11) {
                            xmdq = "南充市";
                        } else if (back.xmdq == 12) {
                            xmdq = "甘孜州";
                        } else if (back.xmdq == 13) {
                            xmdq = "宜宾市";
                        } else if (back.xmdq == 14) {
                            xmdq = "巴中市";
                        } else if (back.xmdq == 15) {
                            xmdq = "眉山市";
                        } else if (back.xmdq == 16) {
                            xmdq = "广安市";
                        } else if (back.xmdq == 17) {
                            xmdq = "广元市";
                        } else if (back.xmdq == 18) {
                            xmdq = "资阳市";
                        } else if (back.xmdq == 19) {
                            xmdq = "德阳市";
                        } else if (back.xmdq == 20) {
                            xmdq = "泸州市";
                        } else if (back.xmdq == 21) {
                            xmdq = "攀枝花市";
                        } else if (back.xmdq == 22) {
                            xmdq = "达州市";
                        } else if (back.xmdq == 23) {
                            xmdq = "遂宁市";
                        } else if (back.xmdq == 24) {
                            xmdq = "雅安市";
                        } else if (back.xmdq == 25) {
                            xmdq = "阿坝州";
                        }

                        if (back.xmlxA == 1) {
                            xmlxA = "公招项目";
                        } else if (back.xmlxA == 2) {
                            xmlxA = "EPC项目";
                        } else if (back.xmlxA == 3) {
                            xmlxA = "PPP项目";
                        }

                        let xmlxb_val = "";
                        if (back.xmlxB.indexOf(34) >= 0) {
                            xmlxB = "水利项目";
                            xmlxb_val = "3";
                        }
                        if (back.xmlxB.indexOf(35) >= 0) {
                            xmlxB = `${xmlxB} 市政项目`;
                            xmlxb_val += ",2";
                        }
                        if (back.xmlxB.indexOf(36) >= 0) {
                            xmlxB = `${xmlxB} 公路项目`;
                            xmlxb_val += ",4";
                        }
                        if (back.xmlxB.indexOf(37) >= 0) {
                            xmlxB = `${xmlxB} 房建项目`;
                            xmlxb_val += ",65";
                        }

                        if (back.xmlxB.indexOf(38) >= 0) {
                            xmlxB = `${xmlxB} 其他类型项目`;
                            xmlxb_val += ",13";
                        }
                        //stage
                        if (back.stage == 39) {
                            stage = "项目立项，招勘察设计/代理阶段";
                        } else if (back.stage == 40) {
                            stage = "代理已确定，招标施工招标为上网阶段";
                        } else if (back.stage == 41) {
                            stage = "施工招标已上网阶段，投标未截止阶段";
                        } else if (back.stage == 42) {
                            stage = "已报名截止，未开标阶段";
                        } else if (back.stage == 43) {
                            stage = "其他阶段";
                        }
                        this.form.xmdq.value = xmdq;
                        this.form.xmlxA.value = xmlxA;
                        this.form.xmlxB.value = xmlxB;
                        this.form.stage.value = stage;
                        this.form.xmyzdw.value = back.xmyzdw;
                        this.form.zzyq.value = back.zzyq;
                        this.form.ryyq.value = back.ryyq;
                        this.form.yjyq.value = back.yjyq;
                        this.form.qtyq.value = back.qtyq;
                        this.form.kzj.value = back.kzj;
                        this.form.xmjgbm.value = back.xmjgbm;
                        this.form.jsnrjgm.value = back.jsnrjgm;
                        this.form.xmtz.value = back.xmtz;
                        this.form.qt.value = back.qt;
                    }
                }
            );
        }
    }
};
</script>
<style scoped>
#bid_jbxx .el-card__header{
    padding: 7px 20px;
}
</style>

<style lang="less" scoped>
#bid_jbxx {
    p:first-child {
        // padding-top: 0;
    }
    p {
        padding: 10px 0;
        border-bottom: 1px solid gainsboro;
    }
}
</style>
