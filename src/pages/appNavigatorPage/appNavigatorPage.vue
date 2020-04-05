<template>
  <div class="wrapper">
    <div class="page-top">
      <div class="img">
        <img src="../../assets/CAT-02.png" alt="图标" />
      </div>
      <div class="right">
        <span class="title">猫糊</span>
        <span class="other">建筑行业</span>
      </div>
    </div>
    <div class="page-banner">
      <div class="banner-item"><img src="../../assets/app-des3.png" alt=""></div>
      <div class="banner-item"><img src="../../assets/app-des1.png" alt=""></div>
      <div class="banner-item"><img src="../../assets/app-des4.jpg" alt=""></div>
      <div class="banner-item"><img src="../../assets/app-des2.png" alt=""></div>
      
      
    </div>
    <div class="page-desc">
      <p class="title">应用描述</p>
      <p class="content">
        猫糊是建筑行业招投标领域一个为用户提供多样化服务的平台，平台为用户提供行业查询、招标定制、业务圈、创建名片等免费的基础服务，
        平台上将汇聚众多个人服务号和企业服务号，这些服务号将为用户提供多样化的个性服务和定制服务，让建筑行业的服务产生价值。
      </p>
    </div>
    <div class="page-btn">
      <!-- <div class="btn">立即下载</div> -->
      <!-- <a class="btn" href="maohu://pages/index/index">立即下载</a> -->
      <!-- <div class="btn" id="openapp">立即打开</div> -->
    </div>
    <!-- 如果是微信浏览器 显示该弹窗 -->
    <div class="page-poup" v-if="isTip">
      <div class="poup-content">
        <div class="title">链接打不开？</div>
        <div class="one">请点击右上角</div>
        <div class="two">选择“在浏览器中打开”</div>
      </div>
    </div>
    <!-- 进入浏览器（不是微信浏览器）时，展示的弹窗 -->
    <div class="poup-content1" v-if="!isTip">
      <div class="title">提示</div>
      <div class="btn-wra">
        <div id="left" class="common-btn left-btn">点击下载</div>
        <div id="right" class="common-btn right-btn">打开App</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTip: false
    };
  },
  mounted() {
    let that = this;
    let url = {
      open: "maohu://pages/index/index", // 打开app的scheme url
      down:
        "https://service.dcloud.net.cn/build/download/07fc4ea0-0516-11ea-b8e7-f1fb981e009a" // 下载apk的地址
    };

    // 一开始进入页面时 查看手机是否安装了app
    let iframe = document.createElement("iframe");
    let body = document.body;
    iframe.style.cssText = "display:none;width=0;height=0";
    // 有的浏览器会有默认的提示弹窗 点击确定，打开app
    iframe.src = url.open;
    body.appendChild(iframe);
    iframe.onload = function(e) {
      var e = e || window.event;
      e.preventDefault();
    };
    iframe.onerror = function() {};
    // let timer = null;
    // 立即打开的按钮
    // let openapp = document.getElementById("openapp");
    // openapp.addEventListener(
    //   "click",
    //   function() {
    //     if (/MicroMessenger/gi.test(navigator.userAgent)) {
    //       // 引导用户在浏览器中打开
    //       that.isTip = true;
    //     } else {
    //         alert('click')
    //       //   body.appendChild(iframe);
    //       iframe.src = url.open;
    //       timer = setTimeout(function() {
    //         window.location.href = url.down;
    //       }, 2000);
    //     }
    //   },
    //   false
    // );
    // 点击下载按钮
    let downApp = document.getElementById("left");
    downApp.addEventListener(
      "click",
      function() {
        if (/MicroMessenger/gi.test(navigator.userAgent)) {
          // 引导用户在浏览器中打开
          that.isTip = true;
        } else {
          window.location.href = url.down;
        }
      },
      false
    );
    // 打开App按钮
    let openApp = document.getElementById("right");
    openApp.addEventListener(
      "click",
      function() {
        if (/MicroMessenger/gi.test(navigator.userAgent)) {
          // 引导用户在浏览器中打开
          that.isTip = true;
        } else {
          //   body.appendChild(iframe);
          iframe.src = url.open;
          // timer = setTimeout(function() {
          //   alert('请先下载App');
          // }, 2000);
        }
      },
      false
    );
    // 下面的三个监听方法 防止打开app后继续跳转到下载页面
    // document.addEventListener(
    //   "webkitvisibilitychange",
    //   function() {
    //     var tag = document.hidden || document.webkitHidden;
    //     if (tag) {
    //       clearTimeout(timer);
    //     }
    //   },
    //   false
    // );
    // document.addEventListener(
    //   "webkitvisibilitychange",
    //   function() {
    //     var tag = document.hidden || document.webkitHidden;
    //     if (tag) {
    //       clearTimeout(timer);
    //     }
    //   },
    //   false
    // );

    // window.addEventListener(
    //   "pagehide",
    //   function() {
    //     clearTimeout(timer);
    //   },
    //   false
    // );
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;

  .page-poup {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    .poup-content {
      width: 100%;
      padding: 6rem;
      box-sizing: border-box;
      background-color: #fff;
      .title {
        font-size: 6rem;
        font-weight: bold;
        text-align: center;
      }
      .one {
        font-size: 3rem;
        text-align: center;
        line-height: 1.6;
      }
      .two {
        font-size: 3.5rem;
        text-align: center;
      }
    }
  }
  .poup-content1 {
    width: 70%;
    // height: 40rem;
    position: fixed;
    background-color: #fff;
    border-radius: 2rem;
    // box-shadow: 0 2px 10px 10px #f3f3f3;
    border: 1px solid #f3f3f3;
    left: 15%;
    top: 45%;
    margin-top: -20rem;
    z-index: 101;
    // padding: 2rem;
    // box-sizing: border-box;
    .title {
      font-size: 4rem;
      text-align: center;
      font-weight: bold;
      // line-height: 1.6;
      height: 12rem;
      line-height: 12rem;
    }
    .btn-wra {
      width: 100%;
      display: flex;
      margin-top: 3rem;
      border-top: 1px solid #d5d5d5;
      .common-btn {
        flex: 1;
        height: 9rem;
        line-height: 9rem;
        text-align: center;
        font-size: 3.5rem;
      }
      .left-btn {
        border-right: 1px solid #d5d5d5;
      }
      .right-btn {
      }
    }
  }
  .page-top {
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .img {
      width: 12rem;
      height: 12rem;
      border: 1px solid #45a4fc;
      border-radius: 6rem;
      box-sizing: border-box;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      margin-left: 2rem;
      display: flex;
      flex-direction: column;
      .title {
        font-weight: bold;
        font-size: 4rem;
      }
      .other {
        color: #999;
        font-size: 2rem;
      }
    }
  }
  .page-banner {
    white-space: nowrap;
    width: 100%;
    overflow-x: auto;
    .banner-item {
      margin-left: 2rem;
      display: inline-block;
      width: 36rem;
      height: 60rem;
      background-color: pink;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .page-desc {
    width: 100%;
    border-top: 2rem solid #f3f3f3;
    padding: 2rem;
    box-sizing: border-box;
    .title {
      font-size: 3.5rem;
    }
    .content {
      color: #999;
      font-size: 2.8rem;
      line-height: 1.6;
    }
  }
  .page-btn {
    // position: fixed;
    // bottom: 0;
    // left: 0;
    // z-index: 1;
    // background-color: #fff;
    margin-top: 2rem;
    width: 100%;
    padding: 2rem 0;
    border-top: 1px solid #f3f3f3;
    box-sizing: border-box;
    text-align: center;
    .btn {
      display: inline-block;
      width: 80%;
      height: 8rem;
      border-radius: 4rem;
      color: #fff;
      font-size: 3.5rem;
      text-align: center;
      line-height: 8rem;
      background-color: #45a4fc;
      text-decoration: none;
    }
  }
}
</style>