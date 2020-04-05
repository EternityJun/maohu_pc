<template>
  <div class="mh-service">
    <div class="logo-wrap">
      <img src="../assets/logo-maohu.png" alt="" class="logo">
      <router-link tag="div" to="/personal" class="avatar-wrap" v-if="isLoading">
        <img v-if="isLoading" :src="loginData.avatar" alt="" srcset="" class="avatar">
      </router-link>
    </div>
    <main class="main">
      <header class="home-header">
        <div class="logo-wrap">
          <img src="../assets/logo-maohu.png" alt="" class="logo">
          <router-link tag="div" to="/personal" class="avatar-wrap" v-if="isLoading">
            <img :src="loginData.avatar" alt="" srcset="" class="avatar">
          </router-link>
        </div>
      </header>
      <div class="main-banner">
        <div class="banner-list">
          <el-carousel height="500px">
            <el-carousel-item v-for="img in bannerImgList" :key="img.label">
              <div class="banner-img-wrap">
                <el-image :src="img.banner">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <div class="main-banner-wrap justfy">
              <div class="title-wrap">
                <h2 class="main-title text-center">猫糊</h2>
                <p class="sub-title text-center">{{img.label}}</p>
              </div>
              <div class="button-wrap">
                <router-link tag="div" to="/personal" class="btn center" v-if="isLoading">
                  <span>进入首页</span>
                </router-link>
                <router-link tag="div" to="/login" class="btn center" v-else>
                  <span>登录</span>
                </router-link>
                <el-popover
                  placement="bottom"
                  trigger="hover">
                  <div class="qrcode-img-wrap">
                    <img src="../assets/qrcode.jpg" alt="" srcset="">
                  </div>
                  <el-button slot="reference" type="text" :style="{'display': 'block', 'padding': '0'}">
                    <div class="btn">
                      <span>微信小程序</span>
                    </div>
                  </el-button>
                </el-popover>
              </div>
              <p class="ver-info text-center">
                <span><i class="el-icon-time"></i>发布日期 ：2019-06-18</span>
                <span><i class="el-icon-s-opportunity"></i>当前版本：v1.0</span>
              </p>
            </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="box-wrap">
          <div class="info-box">
            <p class="main-title"><i class="el-icon-circle-plus"></i>系统公告</p>
            <div class="info-list">
              <p class="info-item">1、关于猫糊上线的通知</p>
              <p class="info-item">2、关于系统升级的通知</p>
            </div>
            <router-link class="more" tag="a" to="/bulletinlist">更多>></router-link>
          </div>
          <div class="info-box">
            <p class="main-title"><i class="el-icon-circle-plus"></i>常见问题</p>
            <div class="info-list">
              <p class="info-item" @click="toPath('maohufaq', {col: '1'})">1、猫糊怎么登录？</p>
              <p class="info-item" @click="toPath('maohufaq', {col: '2'})">2、如何建立自己的关系网？</p>
            </div>
            <router-link class="more" tag="a" to="/maohufaq">更多>></router-link>
          </div>
          <div class="info-box">
            <p class="main-title"><i class="el-icon-circle-plus"></i>资料专区</p>
            <div class="info-list">
              <router-link tag="p" class="info-item" to="/maohuinstruction">1、猫糊使用说明</router-link>
              <p class="info-item"></p>
            </div>
            <router-link class="more" tag="a" to="/maohuinstruction">更多>></router-link>
          </div>
        </div>
      </div>
      <div class="section-list">
        <section class="our-production">
          <div class="section-title">
            <h2 class="main-title">我们的产品</h2>
            <p class="sub-title">产品介绍</p>
          </div>
          <div class="product-box">
            <div class="info-box">
              <!-- <div class="section">
                <p class="title">适用范围：</p>
                <span>（建筑行业）招投标领域</span>
              </div> -->
              <!-- <div class="section">
                <p class="title">价值：</p>
                <ul>
                  <li class="info-item">1、让招投标领域的服务产生价值</li>
                  <li class="info-item">2、让你的行业资源转换为业务</li>
                  <li class="info-item">3、让你的业务关系网成为你的业务渠道</li>
                </ul>
              </div> -->
              <div class="section">
                <p class="title">猫糊服务号：</p>
                <ul>
                  <li class="info-item">为建筑行业招投标领域服务</li>
                  <li class="info-item">让招投标领域的服务产生价值</li>
                  <li class="info-item">让你的行业资源转换为业务</li>
                  <li class="info-item">让你的业务关系网成为你的业务渠道</li>
                </ul>
              </div>
            </div>
            <div class="pic-box">
              <div class="pic-center">
                <img src="../assets/homepage-gear-02.png" alt="" srcset="" class="gear">
              </div>
              <!-- <div class="arr-item">
                <div class="arr"></div>
                <span class="word">共享资源的人</span>
              </div>
              <div class="arr-item">
                <div class="arr"></div>
                <span class="word">我的业务资源</span>
              </div>
              <div class="arr-item">
                <div class="arr"></div>
                <span class="word">我信任的人 / 服务号</span>
              </div>
              <div class="arr-item">
                <div class="arr"></div>
                <span class="word">信任我的服务号（个人、企业）</span>
              </div>
              <div class="pic-center">
                <div class="img-wrap">
                  <div class="prod-img"></div>
                </div>
                <img src="../assets/homepage-gear.png" alt="" srcset="" class="gear">
              </div> -->
            </div>
          </div>
        </section>
        <section class="create-service">
          <ul class="service-list">
            <li class="service-item">
              <div class="icon-wrap">
                <i class="el-icon-user"></i>
              </div>
              <div class="text-content">
                <p class="title">如何创建个人服务号（免费）？</p>
                <ul class="info-list">
                  <li class="info-item">登录猫糊（PC端，移动端）</li>
                  <li class="info-item">按照页面提示，输入手机号和验证码</li>
                  <li class="info-item">个人服务号创建成功</li>
                </ul>
              </div>
            </li>
            <li class="service-item">
              <div class="icon-wrap">
                <i class="el-icon-office-building"></i>
              </div>
              <div class="text-content">
                <p class="title">如何创建企业服务号？</p>
                <ul class="info-list">
                  <li class="info-item">拨打客服热线：028-68731622</li>
                  <li class="info-item">描述企业基本信息及业务需求</li>
                  <li class="info-item">猫糊后台创建，成功后电话反馈</li>
                </ul>
              </div>
            </li>
            <li class="service-item">
              <div class="icon-wrap">
                <i class="el-icon-help"></i>
              </div>
              <div class="text-content">
                <p class="title">猫糊服务号收费吗？</p>
                <ul class="info-list">
                  <li class="info-item">个人用户免费使用，企业用户会根据服务类型，收取相应的年费。</li>
                </ul>
              </div>
            </li>
            <li class="service-item">
              <div class="icon-wrap">
                <i class="el-icon-alarm-clock"></i>
              </div>
              <div class="text-content">
                <p class="title">企业数据不准确怎么办？</p>
                <ul class="info-list">
                  <li class="info-item">猫糊为企业用户推出了“更新数据”服务，频率为每周更新，数据准确率达到98%以上，详情请咨询客服：028-68731622。</li>
                </ul>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
    <section class="service-car" @mousemove="isShowCardArrow = true" @mouseout="isShowCardArrow = false">
      <transition name="el-fade-in-linear">
        <div class="arrow-wrap" v-show="isShowCardArrow">
            <div class="el-icon-arrow-left arrow" @click="carouselPrev"></div>
            <div class="el-icon-arrow-right arrow" @click="carouselNext"></div>
        </div>
      </transition>
      <div class="service-car-wrap">
        <div class="section-title">
          <h2 class="main-title">我们的服务</h2>
          <p class="sub-title">服务体系做什么服务</p>
        </div>
        <el-carousel
          :interval="cardSpeed"
          type="card"
          height="480px"
          arrow="never"
          ref="cardCar"
          :autoplay="canCardAutoplay"
        >
          <el-carousel-item v-for="car in serviceCar" :key="car.title">
            <div class="service-card">
              <div class="service-card-wrap">
                <p class="card-title">{{car.title}}</p>
                <p class="card-cont">{{car.desc}}</p>
                <i :class="car.icon" class="card-icon"></i>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>
    <ContactUs></ContactUs>
    <HomeFixedAside :speed="50"></HomeFixedAside>
  </div>
</template>

<script>
import Cookie from '../cookie'

import ContactUs from './template/ContactUs'
import HomeFixedAside from './template/HomeFixedAside'
import HomeHeader from './template/HomeHeader'

import banner1 from '../assets/u2_state0.png'
import banner2 from '../assets/u2_state1.png'
export default {
  name: 'mh-service',
  components: {
    ContactUs,
    HomeFixedAside,
    HomeHeader
  },
  data() {
    return {
      // avatar: localStorage.getItem('user_img'),
      
      bannerImgList: [banner1, banner2],
      isLoading: false,
      loginData:{},
      bannerImgList: [{
        banner: banner1,
        label: '让招投标领域的服务产生价值'
      }, {
        banner: banner2,
        label: '让你的行业资源转换为业务'
      }, {
        banner: banner1,
        label: '让你的业务关系网成为你的业务渠道'
      }],
      canCardAutoplay: true,
      cardSpeed: 4000,
      cardChickTimer: null,
      isAnimating: false,
      isLoading: Boolean(localStorage.getItem('token') || Cookie.getCookie('token')),
      isShowCardArrow: false,
      serviceCar: [{
        title: '免费开通服务号',
        desc: '致电95187-1，领取您的专属优惠权益',
        icon: 'el-icon-user-solid'
      }, {
        title: '更新数据',
        desc: '致电95187-1，领取您的专属优惠权益',
        icon: 'el-icon-s-data'
      }, {
        title: '大数据监控',
        desc: '致电95187-1，领取您的专属优惠权益',
        icon: 'el-icon-s-operation'
      }, {
        title: '人工审核',
        desc: '致电95187-1，领取您的专属优惠权益',
        icon: 'el-icon-s-check'
      }, {
        title: '标书检查',
        desc: '致电95187-1，领取您的专属优惠权益',
        icon: 'el-icon-s-claim'
      }]
    }
  },
  methods: {
    carouselNext() {
      if(this.isAnimating) return
      this.$refs.cardCar.next()
      this.isAnimating = true
      this.canCardAutoplay = false
      this.cardChickTimer = setTimeout(this.endAnimation, this.cardSpeed / 8)
    },
    carouselPrev() {
      if(this.isAnimating) return
      this.$refs.cardCar.prev()
      this.isAnimating = true
      this.canCardAutoplay = false
      this.cardChickTimer = setTimeout(this.endAnimation, this.cardSpeed / 8)
    },
    endAnimation() {
      clearTimeout(this.cardChickTimer)
      this.isAnimating = false
      this.canCardAutoplay = true
    },
    loginStatus(){
      /* 或者本地token 或者是cookie中的token */
      let CompInfoData = {
          token: localStorage.getItem('token') || Cookie.getCookie('token'),
        }
      this.axios.post('/index/login/loginStatus', CompInfoData, data => {
        this.loginData = data.message
        if(data.status == 'failed'){
          this.isLoading = false
        }else{
          this.isLoading = true
        }
      })
    },
    toPath(name, params) {
      this.$router.push({
        name,
        params
      })
    }
  },
  created(){
    this.loginStatus()
    // console.log(this.$store.state.userInfo)
  },

}
</script>

<style lang="less" scoped>
ol,dl,ul{
  list-style: none;
}
.mh-service{
  font-family: 微软雅黑;
}
.justfy{
  width: 1300px;
  margin: 0 auto; 
}
.text-center{
  text-align: center
}
.section-title{
  text-align: center;
  .main-title{
    font-family: '微软雅黑';
    font-weight: 400;
    font-style: normal;
    color: #333;
    font-size: 24px;
    padding-top: 70px;
  }
  .sub-title{
    font-size: 12px;
    color: #666;
    padding: 20px 0 35px 0;
  }
}
.img-wrap-shadow{
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before{
    content: '';
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    left: 0;
    background: #e4e4e4;
  }
  i{
    color: #fff;
    font-size: 35px;
    position: absolute;
    z-index: 4;
  }
  img{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
  }
}
.logo-wrap{
  position: absolute;
  z-index: 20;
  width: 1200px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: space-between;
  .logo{
    margin-top: 21px;
    margin-left: -8px;
    height: 47px;
    width: 99px;
  }
  .avatar-wrap{
    height: 55px;
    width: 55px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    margin-top: 21px;
    .avatar{
      height: 100%;
      width: 100%;
    }
  }
}
.main{
  &-banner{
    background: #57c5f7 no-repeat center center;
    height: 500px;
    position: relative;
    margin-bottom: 100px;
    &::before{
      content: ' ';
      position: absolute;
      bottom: 0;
      height: 90px;
      width: 100%;
      background: url('../assets/home-cloud.png');
      z-index: 5;
    }
    .banner-img-wrap{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-wrap{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 5;
      .title-wrap{
        color: #fff;
        padding-top: 140px;
        .main-title{
          font-weight: 700;
          font-size: 36px;
          font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
          line-height: 52px;
        }
        .sub-title{
          font-weight: 400;
          font-size: 32px;
          line-height: 52px;
        }
      }
      .button-wrap{
        display: flex;
        justify-content: center;
        padding-top: 20px;
        .btn{
          width: 190px;
          height: 56px;
          line-height: 56px;
          border-radius: 28px;
          font-size: 20px;
          background: #fff;
          color: #26abe2;
          text-align: center;
          cursor: pointer;
          &:hover{
            background: #f9f9f9;
          }
          &.center{
            margin-right: 20px;
          }
        }
      }
      .ver-info{
        color: #fff;
        padding-top: 40px;
        padding-bottom: 30px;
        span{
          i{
            margin-right: 3px;
          }
          &:first-child{
            margin-right: 15px;
          }
        }
      }
    }
    .box-wrap{
      transform: translateY(-50%);
      width: 1210px;
      height: 180px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 3px 3px #ccc;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      z-index: 20;
      border-radius: 6px;
      .info-box{
        width: 205px;
        i{
          margin-right: 5px;
        }
        .main-title{
          height: 44px;
          line-height: 44px;
          color: #333;
        }
        .info-list{
          font-size: 14px;
          color: #666;
          .info-item{
            height: 24px;
            line-height: 24px;
            cursor: pointer;
            &:hover{
              color: #333;
            }
          }
        }
        .more{
          height: 36px;
          line-height: 36px;
          color: #666;
          text-decoration: none;
          font-size: 14px;
          &:hover{
            color: #333;
          }
        }
      }
    }
  }
  .section-list{
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
  }
}
.product-box{
  display: flex;
  align-items: center;
  margin-bottom: 80px;
  .info-box{
    box-sizing: border-box;
    padding: 50px;
    width: 450px;
    .section{
      margin-bottom: 30px;
    }
    .title{
      font-weight: 700;
      margin-bottom: 10px;
    }
    .info-item{
      margin-bottom: 10px;
    }
  }
  .pic-box{
    position: relative;
    flex: 1;
    .pic-center{
      position: relative;
      margin: 0 auto;
      // width: 320px;
      // height: 320px;
      height: 360px;
      display: flex;
      justify-content: center;
      align-items: center;
      // .img-wrap{
      //   position: absolute;
      //   width: 350px;
      //   height: 180px;
      //   box-sizing: border-box;
      //   overflow: hidden;
      //   .prod-img{
      //     position: absolute;
      //     left: 50%;
      //     top: 50%;
      //     transform: translate3d(-52%, -50%, 0);
      //     width: 200px;
      //     height: 306px;
      //     background: url('../assets/mao-prod.svg') no-repeat center center;
      //   }
      // }
      .gear{
        position: absolute;
        // width: 100%;
        height: 100%;
      }
    }
    // .arr-item{
    //   position: absolute;
    //   &:first-child{
    //     top: 0;
    //     left: 60px;
    //     .arr{
    //       transform: rotateZ(35deg);
    //       top: 60px;
    //       left: 70px;
    //     }
    //   }
    //   &:nth-child(2) {
    //     bottom: 0;
    //     left: 60px;
    //     .arr{
    //       transform: rotateZ(-35deg);
    //       bottom: 60px;
    //       left: 70px;
    //     }
    //   }
    //   &:nth-child(3) {
    //     top: 0;
    //     right: 60px;
    //     .arr{
    //       transform: rotateZ(145deg);
    //       top: 60px;
    //       right: 70px;
    //     }
    //   }
    //   &:nth-child(4) {
    //     bottom: 0;
    //     right: 0;
    //     .arr{
    //       transform: rotateZ(225deg);
    //       bottom: 60px;
    //       right: 130px;
    //     }
    //   }
    //   .word{
    //     font-weight: 700;
    //   }
    //   .arr{
    //     width: 80px;
    //     border-top: 2px dashed #A6A6A6;
    //     position: absolute;
    //     &::before{
    //       content: '';
    //       position: absolute;
    //       border-top: 5px solid #A6A6A6; 
    //       border-left: 5px solid #A6A6A6; 
    //       border-right: 5px solid transparent; 
    //       border-bottom: 5px solid transparent;
    //       left: -5px;
    //       top: -6px;
    //       transform: rotateZ(-45deg)
    //     }
    //   }
    // }
  }
}
.create-service{
  height: 400px;
  padding-top: 85px;
  padding-bottom: 100px;
  .service-list{
    height: 100%;
    display: flex;
    justify-content: space-between;
    .service-item{
      width: 285px;
      position: relative;
      &:nth-child(2n + 1){
        .icon-wrap{
          background: #324473;
          i{
            color: #fff;
          }
        }
        .text-content{
          background: #e7e6e6;
          .title{
            color: #324473;
          }
          .info-list{
            color: #324473;
            .info-item{
              &::before{
                background: #324473;
              }
            }
          }
        }
      }
      &:nth-child(2n){
        .icon-wrap{
          background: #e7e6e6;
          i{
            color: #324473;
          }
        }
        .text-content{
          background: #324473;
          .title{
            color: #fff;
          }
          .info-list{
            color: #fff;
            .info-item{
              &::before{
                background: #fff;
              }
            }
          }
        }
      }
      .icon-wrap{
        width: 110px;
        height: 110px;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          font-size: 40px;
        }
      }
      .text-content{
        width: 100%;
        height: 345px;
        position: absolute;
        left: 0;
        bottom: 0;
        .title{
          font-size: 18px;
          font-weight: 700;
          text-align: center;
          padding-top: 78px;
          padding-bottom: 30px;
        }
        .info-list{
          padding-left: 35px;
          box-sizing: border-box;
          .info-item{
            line-height: 35px;
            font-size: 14px;
            position: relative;
            &::before{
              content: '';
              position: absolute;
              top: 16px;
              left: -12px;
              width: 5px;
              height: 5px;
              border-radius: 50%
            }
          }
        }
      }
    }
  }
}
.service-car{
  padding-bottom: 100px;
  background: #f7f7f7;
  position: relative;
  &-wrap{
    width: 45%;
    margin: 0 auto;
  }
  .arrow-wrap{
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    width: 100%;
    box-sizing: border-box;
    top: 50%;
    transform: translateY(-50%);
    font-size: 42px;
    .arrow{
      cursor: pointer;
      opacity: .7;
      &:hover{
        opacity: 1;
      }
    }
  }
}
.service-card{
  display: flex;
  justify-content: center;
  position: relative;
  &-wrap{
    height: 480px;
    width: 300px;
    background: #fff;
    box-sizing: border-box;
    border-top: 2px solid #3295fa;
    border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .card{
      &-title{
        color: #3295fa;
        font-size: 30px;
        padding-top: 52px;
      }
      &-cont{
        text-align: center;
        padding: 48px 40px 0px;
        line-height: 25px;
      }
      &-icon{
        position: absolute;
        bottom: 50px;
        font-size: 170px;
        color: #3296fac5;
      }
    }
  }
}
.service-box{
  display: flex;
  border-top: 1px solid #f2f2f2;
  border-left: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  .service-item{
    width: 240px;
    height: 300px;
    border-right: 1px solid #f2f2f2;
    box-sizing: border-box;
    padding: 30px 10px;
    text-align: center;
  }
}
.qrcode-img-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  img{
    height: 100%;
  }
}
</style>
