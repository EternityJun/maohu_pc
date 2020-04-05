<template>
    <div id="head_nav">
        <div class="nav1">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <div style="margin-right:30px;height:46px;" v-on:click="switchNav(item.text)" :index="index+'-1'" :is="!item.child ? 'el-menu-item' : 'el-submenu'" v-for="(item,index) in data.nav" :key="index">
                    <template v-if="!item.child">
                        {{item.text}}
                        <span class="num" v-show="item.num !=='' && item.num !=-1">{{item.num}}</span>
                    </template>
                    <template v-else>
                        <template slot="title">
                            <span class="li_text">{{item.text}}</span>
                            <span class="num" v-show="item.num !=='' && item.num !=-1">{{item.num}}</span>
                        </template>
                        <div v-for="(item1,index1 ) in item.child" :key="index1">
                            <el-submenu :index="index1+'-1-1'" v-if="item1.child">
                                <template slot="title">{{item1.text}}</template>
                                <el-menu-item  :index="index1+'-'+index11+'-1-1-1'" v-for="(item11,index11 ) in item1.child" v-on:click="switchNav(item1.text+item11.text)" :key="index11">{{item11.text}}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="index1+'-1-1'" v-on:click="switchNav(item1.text)">{{item1.text}}</el-menu-item>
                        </div>
                    </template>
                </div>
                <li class="link_li" v-show="data.source.link">
                    <a class="cursor" :href="data.source.link" target="_blank"><img :src="data.source.img" style="vertical-align:sub">{{data.source.name}}</a>
                </li>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data"],
    data() {
        return {
            activeIndex: "0-1",
            tab: ""
        };
    },
    computed: {},
    methods: {
        switchNav: function(name) {
            this.tab = name;
            this.$emit("switchNav", name);
        }
    }
};
</script>
<style>
.nav1 .el-menu-item,
.nav1 .el-submenu .el-submenu__title {
    padding: 0;
}
.nav1 .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 46px;
}
.nav1 li.is-active,
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu:hover .el-submenu__title {
    color: #409eff !important;
}
.el-menu--horizontal > .el-menu-item.is-active,
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    border-bottom: 2px solid #409eff;
}
/* .el-menu--popup,.el-menu--popup li{
    min-width: 116px;
} */
</style>

<style lang="less" scoped>
@charset "utf-8";
@active-color: #409eff;
@num-color: #ff6a6a;
.cursor {
    cursor: pointer;
}
.el-menu.el-menu--horizontal {
    border-bottom: none;
}
#submenu {
    color: #ff6a6a;
    .el-submenu__title {
        color: yellow;
    }
}
.nav1 {
    .el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
        display: none;
    }
    ::-webkit-scrollbar-track-piece {
        //滚动条凹槽的颜色，还可以设置边框属性
        background-color: #f8f8f8;
    }
    ::-webkit-scrollbar {
        //滚动条的宽度
        width: 5px;
        height: 5px;
    }
    ::-webkit-scrollbar-thumb {
        //滚动条的设置
        background-color: #f8f8f8;
        background-clip: padding-box;
        min-height: 28px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #f8f8f8;
    }
    ul {
        width: 1200px;
        white-space: nowrap;
        margin: 0 auto;
        overflow: auto;
        position: relative;
        .down_menu {
            background-color: green;
        }
        li.is-active {
            .li_text {
                color: #409eff !important;
            }
        }
        li {
            font-size: 18px;
            // color: #333;
            margin: 0px 0px 20px 0;
            display: inline-block;
            float: none;
            .num {
                display: inline-block;
                color: white;
                background-color: @num-color;
                border-radius: 2px;
                padding: 2px 3px;
                font-size: 15px;
                position: relative;
                top: -2px;
                height: 14px;
                line-height: 14px;
                margin-left: 2px;
            }
        }

        .li_text {
            font-size: 18px !important;
            // color: #333;
        }
        .link_li {
            position: absolute;
            right: 1px;
            bottom: 6px;
            margin-top: -30px;
            font-size: 14px;
            a {
                color: @active-color;
                text-decoration: underline;
                img {
                    width: 15px;
                    height: 15px;
                    margin-right: 4px;
                }
            }
        }
    }
}
</style>

