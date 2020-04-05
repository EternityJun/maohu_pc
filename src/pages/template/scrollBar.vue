<template>
  <div
    class="f-scroll"
    @mouseleave="startH = 0"
    @mousemove.prevent="onMousemoveBarFn"
    @mouseup="startH = 0"
  >
    <div
      @scroll="onScrollFn"
      class="f-scroll_wrap"
      ref="f_scroll"
      :style="{'marginRight':barH != '100%'?'-17px':''}"
    >
      <slot></slot>
    </div>
    <div class="f-scroll_bar" v-if="barH != '100%'">
      <div
        @mousedown.prevent="onMousedownBarFn"
        class="f-scroll_thumb"
        :style="{'top':barT,'height':barH}"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      barH: 30,
      barT: 0,
      startH: 0,
      startT: 0,
      elBar: null
    };
  },
  mounted() {
    this.elBar = this.$refs.f_scroll;
    this.onScrollFn();
  },
  methods: {
    //容器滚动页面的滚动距离和对应高度
    onScrollFn(el) {
      let scrollH = this.elBar.scrollHeight; //总的滚动高度
      let t = this.elBar.scrollTop; //当前滚动距离
      let h = this.elBar.offsetHeight; //实际高度
      let retio = (h / scrollH) * 100; //实际高度占总高度的比例
      this.barH = retio > 4 ? retio + "%" : "4%"; //滚动条的最小总高为4%
      let f_t = (t / scrollH) * 100; //距离顶部位置
      if (retio < 4) {
        //如果高度的百分比小于4
        f_t = (t /(scrollH+(scrollH*0.04-300))) * 100; //距离顶部位置
      }
      (f_t > 0 && (this.barT = f_t + "%")) || (this.barT = 0);
      if(el){
          this.$emit('scroll',this.elBar)
      }
    },
    // 移动滚动条
    onMousemoveBarFn() {
      if (this.startH > 0) {
        let h = this.elBar.offsetHeight; //实际高度
        let scrollH = this.elBar.scrollHeight; //总的滚动高度
        let y = this.startT + ((el.clientY - this.startH) / h) * scrollH;
        this.elBar.scrollTo(0, y);
      }
    },
    // 点击滚动条
    onMousedownBarFn() {
      let scroll_obj = this.$refs.f_scroll;
      this.startT = this.elBar.scrollTop;
      this.startH = el.clientY;
    }
  }
};
</script>

<style scoped>
.f-scroll {
  overflow: hidden;
  position: relative;
}
.f-scroll_wrap {
  height: 100%;
  overflow: auto;
  margin-right: -17px;
}
.f-scroll_bar {
  position: absolute;
  right: 2px;
  top: 0;
  bottom: 0;
  width: 6px;
  border-radius: 4px;
  background-color: #f2f2f5;
}
.f-scroll_thumb {
  position: absolute;
  background-color: #9093994d;
  border-radius: 4px;
  width: inherit;
}
.f-scroll_thumb:hover {
  background-color: #c7c9cc;
  cursor: pointer;
}
</style>

