<!--筑标成都项目操作分配标书-->
<template>
  <div class="carousel-card" :style="'height:'+height+';'+'width:'+width" ref="carouselCard">
    <el-button
      style="z-index:5;position:absolute;top:0px;left:-90px"
      type="primary"
      icon="el-icon-d-arrow-left"
      @click="prev"
    ></el-button>
    <el-button
      style="z-index:5;position:absolute;top:0px;right:-90px"
      type="primary"
      icon="el-icon-d-arrow-right"
      @click="next"
    ></el-button>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props:{
    height:{
      default: '500px'
    },
    width:{
      default:'90%'
    }
  },
  data() {
    return {
      carouselData: {
        activeIndex: 0
      }
    };
  },
  mounted() {
    let carouselDiv = this.$refs.carouselCard;
    let carouselCards = carouselDiv.querySelectorAll("div.carousel-item");
    carouselCards[0].classList.add("active");
    this.carouseChange();
  },
  methods: {
    // 下一个
    next() {
      // console.log(this.activeIndex)
      let carouselCards = this.$refs.carouselCard.querySelectorAll(
        "div.carousel-item"
      );
      carouselCards.forEach((element, i) => {
        element.style.zIndex = 0;
        if (i == this.activeIndex) {
          element.classList.remove("active");
          if (i == carouselCards.length - 1) {
            carouselCards[0].classList.add("active");
          } else {
            carouselCards[i + 1].classList.add("active");
          }
        }
      });
      this.carouseChange();
    },
    //上一个
    prev() {
      let carouselCards = this.$refs.carouselCard.querySelectorAll(
        "div.carousel-item"
      );
      carouselCards.forEach((element, i) => {
        element.style.zIndex = 0;
        if (i == this.activeIndex) {
          element.classList.remove("active");
          if (i == 0) {
            carouselCards[carouselCards.length - 1].classList.add("active");
          } else {
            carouselCards[i - 1].classList.add("active");
          }
        }
      });
      this.carouseChange();
    },
    // 点击蒙层
    onMask(el) {
      let carouselCards = this.$refs.carouselCard.querySelectorAll(
        "div.carousel-item"
      );
      let nowParent = el.target.parentNode;
      //循环所有的卡片
      carouselCards.forEach((el, i) => {
        if (el == nowParent) {
          if (carouselCards.length > 2) {
            if (this.activeIndex == 0) {
              if (i - this.activeIndex > 1) {
                this.prev();
              } else if (i - this.activeIndex == 1) {
                this.next();
              }
            } else if (this.activeIndex == carouselCards.length - 1) {
              if (this.activeIndex - i > 1) {
                this.next();
              } else if (this.activeIndex - i == 1) {
                this.prev();
              }
            } else {
              if (this.activeIndex - i > 0) {
                this.prev();
              } else if (this.activeIndex - i < 0) {
                this.next();
              }
            }
          } else {
            this.next();
          }
          return;
        }
      });
    },
    // 轮播
    carouseChange() {
      let carouselDiv = this.$refs.carouselCard;
      let carouselCards = carouselDiv.querySelectorAll("div.carousel-item");
      let active = this.$refs.carouselCard.querySelector("div.active");
      active.style.cssText = `transform:translateX(${(carouselDiv.offsetWidth -
        active.offsetWidth) /
        2}px)`;
      //获取当前现实目标
      let activeIndex;
      carouselCards.forEach((element, i) => {
        if (element == active) {
          this.activeIndex = i;
          return (activeIndex = i);
        }
      });
      if (carouselCards.length <= 2) {
        if (activeIndex == 0) {
          carouselCards[1].style.cssText = `transform:translateX(${(carouselDiv.offsetWidth -
            active.offsetWidth * 0.8) /
            2 +
            40}px) scale(0.8);z-index:2`;
        } else {
          carouselCards[0].style.cssText = `transform:translateX(${(carouselDiv.offsetWidth -
            active.offsetWidth * 0.8) /
            2 +
            40}px) scale(0.8);z-index:2`;
        }
      }
      //轮播长度大于2
      if (carouselCards.length > 2) {
        if (activeIndex == 0) {
          carouselCards[
            activeIndex + 1
          ].style.cssText = `transform:translateX(${(carouselDiv.offsetWidth -
            active.offsetWidth * 0.8) /
            2 +
            40}px) scale(0.8);z-index:2`;

          carouselCards[
            carouselCards.length - 1
          ].style.cssText = `transform:translateX(${(carouselDiv.offsetWidth -
            active.offsetWidth) /
            2 -
            (active.offsetWidth - active.offsetWidth * 0.8) / 2 -
            40}px) scale(0.8);z-index:2`;
        } else if (activeIndex == carouselCards.length - 1) {
          carouselCards[0].style.cssText = `transform:translateX(${(carouselDiv.offsetWidth -
            active.offsetWidth * 0.8) /
            2 +
            40}px) scale(0.8);z-index:2`;

          carouselCards[
            activeIndex - 1
          ].style.cssText = `transform:translateX(${(carouselDiv.offsetWidth -
            active.offsetWidth) /
            2 -
            (active.offsetWidth - active.offsetWidth * 0.8) / 2 -
            40}px) scale(0.8);z-index:2`;
        } else {
          carouselCards[
            activeIndex + 1
          ].style.cssText = `transform:translateX(${(carouselDiv.offsetWidth -
            active.offsetWidth * 0.8) /
            2 +
            40}px) scale(0.8);z-index:2`;

          carouselCards[
            activeIndex - 1
          ].style.cssText = `transform:translateX(${(carouselDiv.offsetWidth -
            active.offsetWidth) /
            2 -
            (active.offsetWidth - active.offsetWidth * 0.8) / 2 -
            40}px) scale(0.8);z-index:2`;
        }
      }
    }
  }
};
</script>

<style lang="less">
.carousel-card {
  position: relative;
  width: 100%;
  margin: 0 auto;
  > .carousel-item {
    height: 100%;
    padding: 10px;
    background-color: #ffffff;
    position: absolute;
    border: 1px solid #e0e0e0;
    left: 0;
    right: 0;
    width: 100%;
    transform: scale(0.85);
    transition: transform 0.3s;
    .mask {
      background-color: #999;
      opacity: 0.3;
      z-index: 4;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
  .active {
    transform: translateX(0) scale(1);
    z-index: 4;
    .mask {
      display: none;
    }
  }
}
</style>
