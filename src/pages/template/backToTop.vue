<template>
    <div class="backTop cursor" @click="backTop" v-show="need_backTop">
        <i class="el-icon-back"></i>
    </div>
</template>
<style lang="less" scoped>
// 回到顶部
.cursor{
    cursor: pointer;
}
.backTop {
    position: fixed;
    right: 50px;
    bottom: 100px;
    i {
        font-size: 50px;
        color: #dcdcdc;
        transform: rotate(90deg);
        -ms-transform: rotate(90deg); /* IE 9 */
        -moz-transform: rotate(90deg); /* Firefox */
        -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
        -o-transform: rotate(90deg); /* Opera */
    }
}
</style>
<script>
export default {
    data() {
        return {
            isTop: true, //是否到达顶部
            timer: null, //定时器
            need_backTop: false
        };
    },
    created: function() {
        let self = this;
        window.onscroll = function() {
            let scrollTop = document.documentElement.scrollTop; //滚动条在Y轴上的滚动距离
            self.need_backTop = scrollTop > 200 ? true : false; //滚动距离大于200就显示回到顶部
            if (!self.isTop) {
                //判断当点击回到顶部按钮后滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
                clearInterval(self.timer);
            }
            self.isTop = false;
        };
    },
    methods: {
        backTop() {
            let self = this;
            self.timer = setInterval(function() {
                let scrollTop = document.documentElement.scrollTop; //滚动条在Y轴上的滚动距离
                let speed = Math.floor(-scrollTop / 4); //用于设置速度差，产生缓动的效果 返回小于等于x的最大整数
                document.documentElement.scrollTop = scrollTop + speed;
                self.isTop = true; //用于阻止滚动事件清除定时器
                if (scrollTop == 0) {
                    clearInterval(self.timer);
                }
            }, 50);
        }
    }
};
</script>
