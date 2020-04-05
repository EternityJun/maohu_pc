<template>
  <div class="contact-way">
    <div class="contact-info">
      <h2 class="main-title white">联系我们</h2>
      <p class="sub-title white"></p>
    </div>
    <ul class="contact-way-wrap">
      <li class="contact-way-item">
        <div class="svg-icon-wrap">
          <div class="svg-wrap">
            <div class="svg-img"></div>
          </div>
        </div>
        <div class="text-wrap">
          <p class="contact-title">客服热线</p>
          <p class="contact-sentence">请拨打客服电话：028-68731622</p>
        </div>
      </li>
      <li class="contact-way-item">
        <div class="svg-icon-wrap">
          <div class="svg-wrap">
            <div class="svg-img"></div>
          </div>
        </div>
        <div class="text-wrap">
          <p class="contact-title">微<span class="space"></span>信</p>
          <p class="contact-sentence">请添加客服微信：18140108520</p>
        </div>
      </li>
      <li class="contact-way-item">
        <div class="svg-icon-wrap">
          <div class="svg-wrap">
            <div class="svg-img"></div>
          </div>
        </div>
        <div class="text-wrap">
          <p class="contact-title">QQ</p>
          <p class="contact-sentence">请添加客服QQ：824322520</p>
        </div>
      </li>
      <li class="contact-way-item">
        <div class="svg-icon-wrap">
          <div class="svg-wrap">
            <div class="svg-img"></div>
          </div>
        </div>
        <div class="text-wrap">
          <p class="contact-title">邮<span class="space"></span>箱</p>
          <p class="contact-sentence">如有疑问，请发邮件至</p>
          <p class="contact-sentence">824322520@qq.com</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'contactUs'
}
</script>

<style lang="less" scoped>
.contact-way{
  padding: 80px 0;
  background: #324473;
  .contact-info{
    text-align: center;
    .main-title{
      padding-top: 0;
      color: #fff;
      font-weight: 400;
    }
    .sub-title{
      padding: 20px 0 100px 0;
      color: #fff;
      font-size: 12px;
    }
  }
  &-wrap{
    width: 1200px;
    height: 180px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }
  &-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 180px;
    &:nth-child(2){
      .svg-icon-wrap{
        .svg-img{
          left: -65px;
        }
      }
    }
    &:nth-child(3){
      .svg-icon-wrap{
        .svg-img{
          left: -32px;
        }
      }
    }
    &:last-child{
      .svg-icon-wrap{
        .svg-img{
          left: -98px;
        }
      }
    }
    .svg-icon-wrap{
      height: 75px;
      width: 75px;
      border-radius: 50%;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      .svg-wrap{
        position: relative;
        height: 34px;
        width: 34px;
        overflow: hidden;
      }
      .svg-img{
        position: relative;
        left: 0;
        top: 0;
        width: 130px;
        height: 34px;
        background: url('../../assets/contact-02.svg') no-repeat;
      }
    }
    .text-wrap{
      text-align: center;
      .contact-title{
        font-size: 18px;
        font-weight: 700;
        color: #fff;
      }
      .contact-sentence{
        padding-top: 10px;
        font-size: 12px;
        color: #fff;
      }
      .space{
        padding: 0 4px;
      }
    }
  }
}
</style>
