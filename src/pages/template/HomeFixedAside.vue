<template>
    <div class="home-fixed-aside">
      <aside class="fixed-aside" v-if="asideType === 'home'">
        <div class="action-item">
          <transition name="el-fade-in-linear">
            <div class="action-item-wrap" v-show="isShowBackTop" @click="backTop">
              <div class="icon-wrap">
                <i class="icon-list icon-back"></i>
              </div>
              <span>返回</span>
            </div>
          </transition>
        </div>
        <el-popover
          placement="left"
          trigger="hover">
          <div class="qrcode-box">
            <div class="ser-img-wrap">
              <img src="../../assets/weixinSerCode.png" alt="" srcset="">
            </div>
          </div>
          <el-button type="text" slot="reference" :style="{'display': 'block','padding': '0', 'width': '56px', 'height': '56px', 'border': '0'}">
            <div class="action-item">
              <div class="action-item-wrap">
                <div class="icon-wrap">
                  <i class="icon-list icon-weixin"></i>
                </div>
                <span>微信客服</span>
              </div>
            </div>
          </el-button>
        </el-popover>
        <el-popover
          placement="left"
          trigger="hover">
          <div class="qrcode-box">
            <div class="ser-img-wrap">
              <img src="../../assets/qqSerCode.png" alt="" srcset="">
            </div>
          </div>
          <el-button type="text" slot="reference" :style="{'display': 'block','padding': '0', 'width': '56px', 'height': '56px', 'border': '0'}">
            <div class="action-item">
              <div class="action-item-wrap">
                <div class="icon-wrap">
                  <i class="icon-list icon-qq"></i>
                </div>
                <span>QQ客服</span>
              </div>
            </div>
          </el-button>
        </el-popover>
        <!-- <el-popover
          placement="left"
          trigger="hover">
          <div class="qrcode-box">
            <p>微信扫描二维码</p>
            <div class="img-wrap">
              <img src="../../assets/qrcode.png" alt="" srcset="">
            </div>
          </div>
          <el-button type="text" slot="reference" :style="{'display': 'block','padding': '0', 'width': '56px', 'height': '56px', 'border': '0'}">
            <div class="action-item">
              <div class="action-item-wrap">
                <div class="icon-wrap">
                  <i class="icon-list icon-weixin"></i>
                </div>
                <span>关注</span>
              </div>
            </div>
          </el-button>
        </el-popover>
        <div class="action-item">
          <div class="action-item-wrap">
            <div class="icon-wrap">
              <i class="icon-list icon-qq"></i>
            </div>
            <span>交流群</span>
          </div>
        </div> -->
      </aside>
      <aside class="aside" v-if="asideType === 'contact'">
        <el-popover
          placement="left-end"
          trigger="hover"
          width="320px"
          v-model="isShowContactInfo">
          <div class="contact-wrap">
            <i class="el-icon-close close" @click="isShowContactInfo = false"></i>
            <ul class="contact-us-box">
              <li class="online-item">
                <div class="online-img-wrap"></div>
                <div class="text-wrap">
                  <p class="main-text">咨询电话</p>
                  <p class="sub-text phone">028-68731622</p>
                </div>
              </li>
              <li class="online-item">
                <div class="online-img-wrap"></div>
                <div class="text-wrap">
                  <p class="main-text">智能在线</p>
                  <p class="sub-text">智能诊断，秒级解答</p>
                </div>
              </li>
              <li class="online-item">
                <div class="online-img-wrap"></div>
                <div class="text-wrap">
                  <p class="main-text">聆听·建议反馈</p>
                  <p class="sub-text">我们不是完美的，我们渴望您的建议</p>
                </div>
              </li>
            </ul>
          </div>
          <el-button type="text" slot="reference" :style="{'display': 'block','padding': '0', 'width': '40px', 'height': '120px', 'border': '0'}">
            <div class="action-item contact-us">
              <div class="action-item-wrap">
                <div class="icon-wrap">
                  <i class="icon-list icon-contact"></i>
                </div>
                <p>联</p>
                <p>系</p>
                <p>我</p>
                <p>们</p>
              </div>
            </div>
          </el-button>
        </el-popover>
        <div class="action-item back-top">
          <transition name="el-fade-in-linear">
            <div class="action-item-wrap" v-show="isShowBackTop" @click="backTop">
              <div class="icon-wrap">
                <i class="icon-list icon-back"></i>
              </div>
            </div>
          </transition>
        </div>
      </aside>
    </div>
</template>

<script>
export default {
  name: 'HomeFixedAside',
  data() {
    return {
      isShowBackTop: false,
      isShowContactInfo: false,
      ignoreTop: 0,
      refEl: null
    }
  },
  props: {
    refs: {
      type: String,
      default: null
    },
    speed: {
      type: Number,
      default: 100
    },
    asideType: {
      type: String,
      default: 'home'
    }
  },
  mounted() {
    if(this.refs) {
      this.refEl = document.querySelector(this.refs)
      this.ignoreTop = this.getElementTop(this.refEl)
    }
    window.addEventListener('scroll', this.initBackTopListener)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.initBackTopListener)
  },
  methods: {
    backTop() {
      let curHeight = document.documentElement.scrollTop
      let nextHeight = Math.max(0, curHeight - this.speed)
      document.documentElement.scrollTop = nextHeight
      if(nextHeight > 0) {
        requestAnimationFrame(()=>{this.backTop(this.speed)})
      }
    },
    getElementTop(el) {
      if(!el) return
      let elTop = el.offsetTop
      let elParent = el.offsetParent
      while(elParent != null){
        elTop += elParent.offsetTop;
        elParent = elParent.offsetParent;
      }
      return elTop;
    },
    handleBackTop() {
      const CHECKTOP = this.refEl ? this.refEl.offsetHeight + this.ignoreTop : 0
      if(document.documentElement.scrollTop > CHECKTOP) {
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
      }
    },
    initBackTopListener() {
      this.handleBackTop()
    }
  }
}
</script>

<style lang="less" scoped>
.fixed-aside{
  position: fixed;
  width: 56px;
  right: 10px;
  bottom: 10px;
  z-index: 200;
  .action-item{
    width: 56px;
    height: 56px;
    cursor: pointer;
    &-wrap{
      height: 100%;
      width: 100%;
      position: relative;
      z-index: 100;
      box-sizing: border-box;
      border-left: 1px solid #f2f2f2;
      border-right: 1px solid #f2f2f2;
      border-top: 1px solid #f2f2f2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #ccc;
      background: #fff;
      .icon-wrap{
        height: 20px;
        width: 20px;
        overflow: hidden;
        .icon-list{
          background: url('../../assets/aside-list.svg') no-repeat;
          display: block;
        }
        .icon-back{
          width: 125px;
          height: 130px;
          background-position: -12px -4px;
        }
        .icon-weixin{
          width: 135px;
          height: 130px;
          background-position: -14px -46px;
        }
        .icon-qq{
          width: 135px;
          height: 130px;
          background-position: -12px -26px;
        }
      }
      span{
        font-size: 12px;
      }
      &:hover{
        background: #26abe2;
        border-left: 1px solid #26abe2;
        border-right: 1px solid #26abe2;
        border-top: 1px solid #26abe2;
        color: #fff;
        .icon-list{
          &.icon-back{
            background-position: -31px -4px;
          }
          &.icon-weixin{
            background-position: -34px -46px;
          }
          &.icon-qq{
            background-position: -31px -26px;
          }
        }
      }
    }
    &:last-of-type{
      border-bottom: 1px solid #f2f2f2;
      &:hover{
        border-bottom: 1px solid #26abe2;
      }
    }
  }
}
.aside{
  position: fixed;
  width: 50px;
  right: 10px;
  bottom: 10px;
  z-index: 200;
  .contact-us{
    height: 120px;
  }
  .back-top{
    margin-top: 10px;
    height: 40px;
  }
  .action-item{
    width: 40px;
    cursor: pointer;
    &-wrap{
      height: 100%;
      width: 100%;
      position: relative;
      z-index: 100;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #57C5F7;
      background: #fff;
      box-shadow: 0 0 4px #999;
      p{
        padding: 3px 0;
      }
      .icon-wrap{
        height: 20px;
        width: 20px;
        overflow: hidden;
        .icon-list{
          display: block;
        }
        .icon-back{
          width: 30px;
          height: 30px;
          background: url('../../assets/backtop-01.svg') no-repeat;
          background-position: -5px -10px;
        }
        .icon-contact{
          width: 20px;
          height: 20px;
          background: url('../../assets/contact-01.svg') no-repeat;
        }
      }
    }
  }
}
.contact-wrap{
  position: relative;
  .close{
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    color: #999;
    font-weight: 700;
    &:hover{
      color: #333;
    }
  }
  .contact-us-box{
    padding: 20px 15px 0 15px;
    .online-item{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-bottom: 20px;
      &:nth-child(1){
        .online-img-wrap{
          background: url('../../assets/contact-online-03.svg') no-repeat center center;
        }
      }
      &:nth-child(2){
        .online-img-wrap{
          background: url('../../assets/contact-online-02.svg') no-repeat center center;
        }
      }
      &:nth-child(3){
        .online-img-wrap{
          background: url('../../assets/contact-online-01.svg') no-repeat center center;
        }
      }
      .online-img-wrap{
        width: 30px;
        height: 30px;
        margin-right: 20px;
        background-repeat: no-repeat;
        background-position: center;
      }
      .text-wrap{
        .main-text{
          color: #333;
          margin-bottom: 6px;
          &:hover{
            color: #57c5f7;
          }
        }
        .sub-text{
          color: #999;
          font-size: 12px;
        }
        .phone{
          color: #57C5F7;
        }
      }
    }
  }
}
.qrcode-box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p{
    font-size: 12px;
    color: #999;
  }
  .img-wrap{
    width: 95px;
    height: 95px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.ser-img-wrap{
  width: 120px;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>

