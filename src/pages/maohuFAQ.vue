<template>
  <div class="how-to-use-maohu">
    <HomeHeader></HomeHeader>
    <div class="use-wrap">
      <p class="h1-title">常见问题</p>
      <el-collapse accordion v-model="currentCollapse" @change="changeCurrentCollapse">
        <el-collapse-item title="猫糊怎么登录？" name="1">
          <div class="video-box">
            <video-player
              class="video-player vjs-custom-skin"
              :playsinline="true" 
              :options="playerOption(video.login, currentCollapse === '1')"
            ></video-player>
          </div>
        </el-collapse-item>
        <el-collapse-item title="如何建立自己的关系网？" name="2">
          <div class="video-box">
            <video-player
              class="video-player vjs-custom-skin"
              :playsinline="true" 
              :options="playerOption(video.contact, currentCollapse === '2')"
            ></video-player>
            <p class="info-title">添加我信任的人</p>
            <div class="img-wrap">
              <el-image class="option-img" :src="imgList.circleValue1" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleValue2" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleValue3" alt="" srcset="" lazy></el-image>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="如何建立资源库？" name="3">
          <div class="video-box">
            <video-player
              class="video-player vjs-custom-skin"
              :playsinline="true" 
              :options="playerOption(video.resource, currentCollapse === '3')"
            ></video-player>
            <p class="info-title">添加我的企业</p>
            <div class="img-wrap">
              <el-image class="option-img" :src="imgList.circleContact1" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleContact2" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleContact3" alt="" srcset="" lazy></el-image>
            </div>
            <p class="info-title">添加我认识的企业</p>
            <div class="img-wrap">
              <el-image class="option-img" :src="imgList.circleContact4" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleContact5" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleContact6" alt="" srcset="" lazy></el-image>
            </div>
            <p class="info-title">添加企业评价</p>
            <div class="img-wrap">
              <el-image class="option-img" :src="imgList.circleContact7" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleContact8" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleContact9" alt="" srcset="" lazy></el-image>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="如何发布自建项目，并邀请服务号协助？" name="4">
          <div class="video-box">
            <video-player
              class="video-player vjs-custom-skin"
              :playsinline="true" 
              :options="playerOption(video.assist, currentCollapse === '4')"
            ></video-player>
            <p class="info-title">创建一个招投标业务需求</p>
            <div class="img-wrap">
              <el-image class="option-img" :src="imgList.circleAssist1" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleAssist2" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleAssist3" alt="" srcset="" lazy></el-image>
            </div>
            <p class="info-title">对项目进行基本信息的描述式导入</p>
            <div class="img-wrap">
              <el-image class="option-img" :src="imgList.circleAssist4" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleAssist5" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleAssist6" alt="" srcset="" lazy></el-image>
            </div>
            <p class="info-title">邀请你信任的服务号协助</p>
            <div class="img-wrap">
              <el-image class="option-img" :src="imgList.circleAssist7" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleAssist8" alt="" srcset="" lazy></el-image>
            </div>
            <p class="info-title">协助服务号为你完善信息</p>
            <div class="img-wrap">
              <el-image class="option-img" :src="imgList.circleAssist9" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleAssist10" alt="" srcset="" lazy></el-image>
              <el-image class="option-img" :src="imgList.circleAssist11" alt="" srcset="" lazy></el-image>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="为什么要登记我的资源库？" name="5">
          <div>用户互加好友后，可以共享双方的企业资源，达到拓展业务渠道，资源整合的效果。</div>
        </el-collapse-item>
        <el-collapse-item title="如何和朋友共享资源库？" name="6">
          <div>用户互相添加对方为信任的人，就可以共享资源库了。</div>
        </el-collapse-item>
        <el-collapse-item title="自己创建的项目，删除后还能找回吗？" name="7">
          <div>用户对个人创建的项目拥有所有权，删除或修改的法律风险都归属自己，猫糊系统不做任何数据存储。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import HomeHeader from './template/HomeHeader'

import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: "maohufaq",
  components: {
    HomeHeader,
    videoPlayer
  },
  data() {
    return {
      currentCollapse: '',
      imgList: {
        circleAssist1: "https://wechat.cdzjkl.com/files/file/personalCircleAssist1.png",
        circleAssist2: "https://wechat.cdzjkl.com/files/file/personalCircleAssist2.png",
        circleAssist3: "https://wechat.cdzjkl.com/files/file/personalCircleAssist3.png",
        circleAssist4: "https://wechat.cdzjkl.com/files/file/personalCircleAssist4.png",
        circleAssist5: "https://wechat.cdzjkl.com/files/file/personalCircleAssist5.png",
        circleAssist6: "https://wechat.cdzjkl.com/files/file/personalCircleAssist6.png",
        circleAssist7: "https://wechat.cdzjkl.com/files/file/personalCircleAssist7.png",
        circleAssist8: "https://wechat.cdzjkl.com/files/file/personalCircleAssist8.png",
        circleAssist9: "https://wechat.cdzjkl.com/files/file/personalCircleAssist9.png",
        circleAssist10: "https://wechat.cdzjkl.com/files/file/personalCircleAssist10.png",
        circleAssist11: "https://wechat.cdzjkl.com/files/file/personalCircleAssist11.png",
        circleContact1: "https://wechat.cdzjkl.com/files/file/personalCircleContact1.png",
        circleContact2: "https://wechat.cdzjkl.com/files/file/personalCircleContact2.png",
        circleContact3: "https://wechat.cdzjkl.com/files/file/personalCircleContact3.png",
        circleContact4: "https://wechat.cdzjkl.com/files/file/personalCircleContact4.png",
        circleContact5: "https://wechat.cdzjkl.com/files/file/personalCircleContact5.png",
        circleContact6: "https://wechat.cdzjkl.com/files/file/personalCircleContact6.png",
        circleContact7: "https://wechat.cdzjkl.com/files/file/personalCircleContact7.png",
        circleContact8: "https://wechat.cdzjkl.com/files/file/personalCircleContact8.png",
        circleContact9: "https://wechat.cdzjkl.com/files/file/personalCircleContact9.png",
        circleValue1: "https://wechat.cdzjkl.com/files/file/personalCircleValue1.png",
        circleValue2: "https://wechat.cdzjkl.com/files/file/personalCircleValue2.png",
        circleValue3: "https://wechat.cdzjkl.com/files/file/personalCircleValue3.png"
      },
      video: {
        login: "https://wechat.cdzjkl.com/files/file/maohuLogin.mp4",
        contact: "https://wechat.cdzjkl.com/files/file/maohuContact.mp4",
        resource: "https://wechat.cdzjkl.com/files/file/maohuResource.mp4",
        assist: "https://wechat.cdzjkl.com/files/file/maohuAssits.mp4"
      }
    }
  },
  computed: {
    playerOption() {
      return (src, autoplay) => {
        return {
          playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
          autoplay, // 如果true,浏览器准备好时开始回放。
          controls: true, // 控制条
          preload: 'auto', // 视频预加载
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: '',
            src
          }],
          poster: "", // 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let {col} = vm.$route.params
      if(col) {
        vm.currentCollapse = col
      }
    })
  },
  methods: {
    changeCurrentCollapse(cur) {
      this.currentCollapse = cur
    }
  }
}
</script>

<style>
.use-wrap .el-collapse-item__header{
  font-size: 16px;
}
.use-wrap .el-collapse-item__content{
  color: #999;
}
</style>

<style lang="less" scoped>
.how-to-use-maohu{
  padding-bottom: 20px;
  background: #f4f4f4;
  font-family: '微软雅黑';
}
.use-wrap{
  margin: 20px auto;
  box-sizing: border-box;
  padding: 25px 40px 25px 40px;
  width: 1200px;
  background: #fff;
  .h1-title{
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 20px;
    font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
    color: #333;
  }
}
.nav-list{
  background: #fff;
  margin-bottom: 20px;
  &-wrap{
    .use-wrap;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.img-wrap{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .option-img{
    width: 280px;
  }
}
.video-box{
  width: 1000px;
  .info-title{
    position: relative;
    margin-top: 25px;
    padding-left: 45px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
    &::before{
      content: '';
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      top: 50%;
      left: 30px;
      transform: translateY(-50%);
      background: #333;
    }
  }
}
</style>
