<template>
    <div>
        <!-- <body-top></body-top> -->
        <!-- <headMenu :index="'/businessManagement'"></headMenu> -->
        <div style="min-width: 1000px;">
        <!-- <el-row>
            <el-col :span="24">
                <h2 class="title">四川佳和建设工程有限公司大数据</h2>
            </el-col>
        </el-row> -->
        <el-row>
            <div class="wrapper">
                <ul class="content">
                    <li v-for="(item, index) in list" :key="index" class="business-item">
                        <div class="img"><img :src="item.img" alt="" /></div>
                        <span class="desc" @click="handleClickDesc(index)">{{item.desc}}</span>
                    </li>
                </ul>
            </div>
        </el-row>
    </div>
    </div>
</template>

<script>
import Business1 from "../assets/business1.png";
import Business2 from "../assets/business2.png";
import Business3 from "../assets/business3.png";
import Business4 from "../assets/business4.png";
import headMenu from './template/head_menu.vue';
export default {
    components: {
        headMenu
    },
    props:['params'],
    data() {
        return {
            list: [
                {
                    img: Business1,
                    desc: "企业经营区域分布"
                },
                {
                    img: Business2,
                    desc: "企业经营业务规模分布"
                },
                {
                    img: Business3,
                    desc: "企业经营业务范畴分布"
                },
                {
                    img: Business4,
                    desc: "企业经营活跃度分析"
                }
            ]
        };
    },
    methods: {
        // 点击每项名称 跳转页面
        handleClickDesc(index) {
            switch (index) {
                case 0: // 区域分布
                    var { href } = this.$router.resolve({
                        path: `/regionDistribution?gs_id=${this.params.gs_id}&source=${this.params.source}`
                    });
                    window.open(href,"regionDistribution"+this.params.gs_id);
                    break;
                case 1: // 业务规模分布
                    var { href } = this.$router.resolve({
                        path: `/sizeDistribution?gs_id=${this.params.gs_id}&source=${this.params.source}`
                    });
                    window.open(href,"sizeDistribution"+this.params.gs_id);
                    break;
                case 2: // 业务范畴分布
                    var { href } = this.$router.resolve({
                        path: `/businessScopeDistribution?gs_id=${this.params.gs_id}&source=${this.params.source}`
                    });
                    window.open(href,"businessScopeDistribution"+this.params.gs_id);
                    break;
                case 3: // 活跃度分析
                    var { href } = this.$router.resolve({
                        path: `/activenessDistribution?gs_id=${this.params.gs_id}&source=${this.params.source}`
                    });
                    window.open(href,"activenessDistribution"+this.params.gs_id);
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.title {
    font-weight: normal;
    background-color: #fff;
    text-align: center;
    font-size: 26px;
    padding: 10px 0;
    background: #fafafa;
    border-bottom: 1px solid #999;
    margin: auto 0;
}

.wrapper {
    width: 500px;
    margin: 0 auto;

    .content {
        width: 900px;
        margin: 100px auto;
        height: 230px;

        .business-item {
            line-height: 30px;
            font-size: 14px;
            margin: 10px 0 100px;
            width: 450px;
            float: left;
            list-style: none;
            .img {
                background-color: #f0f4fa;
                width: 55px;
                height: 55px;
                display: block;
                float: left;
                border-radius: 150px;
                border: 1px solid #b7c4d4;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .desc {
                color: #000;
                display: inline-block;
                cursor: pointer;
                height: 55px;
                line-height: 55px;
                margin-left: 10px;

                &:hover {
                    color: #df4744;
                }
            }
        }
    }
}
</style>





