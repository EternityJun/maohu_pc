<template>
  <div style="min-height:800px;min-width:1000px">
    <el-row style="height:90px">
      <el-col :span="20">
        <p class="header_bt"></p>
      </el-col>
      <el-col :span="4" align="right" id="dd">
        <el-popover popper-class="user_list" placement="bottom" trigger="click" style="padding:10px 0">
          <div>
            <div class="select_list" @click="onchangeUser">退出登录</div>
          </div>
          <div class="user_div" slot="reference">
            <img style="border-radius:50%" :src="user_img?user_img:'../assets/user.png'" alt="" height="50px">
            <div class="user_name">{{userName}}</div>
          </div>
        </el-popover>
      </el-col>
    </el-row>
    <div class="bj_div" :style="{backgroundImage: 'url(' + img + ')' }">
      <p class="bt_title">筑标(成都)</p>
      <div class="toolBlock" id="cellall">
        <div class="tool_row">
          <div class="cell zyk" @click="onclick('/source','资源库')" @mouseleave="onOver" @mouseenter="onOver">
            <img src="../assets/zy-02.png" alt="">
          </div>
          <div v-if="tubiao.indexOf('分配') > -1" class="cell ztb" @click="onclick('/nitemList','招投标')" @mouseleave="onOver" @mouseenter="onOver">
            <img src="../assets/ztb-02.png" alt="">
          </div>
          <div v-if="tubiao.indexOf('人工审核') > -1" class="cell rgsh" @click="onclick('/itemCheck','人工审核')" @mouseleave="onOver" @mouseenter="onOver">
            <img src="../assets/rg-02.png" alt="">
          </div>
          <div v-if="tubiao.indexOf('标书制作') > -1" class="cell bsjc" @click="onclick('/itemBsList','标书检查')" @mouseleave="onOver" @mouseenter="onOver">
            <img src="../assets/bs-02.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <p>系统开发单位：成都中建科联网络科技有限公司</p>
      <p>系统使用指导电话：028-68731622</p>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Cookie from "./../cookie";
import user_img from '../assets/user.png'
import bjhome from '../assets/bjhome.png';
export default {
  data() {
    return {
      img:bjhome,
      inBoxgrid: {
        x: null,
        y: null
      },
      user_img:localStorage.getItem('user_img') || user_img,
      timeName: 0,
      userName: localStorage.getItem("username"),
      tubiao:[],
    };
  },
  created(){
  },
  methods: {
    onOver(e) {
      var w = e.target.offsetWidth;
      var h = e.target.offsetHeight;
      var x = e.pageX - e.target.getBoundingClientRect().left - w / 2;
      var y = e.pageY - e.target.getBoundingClientRect().top - h / 2;
      var direction =
        Math.round(((Math.atan2(y, x) * 180) / Math.PI + 180) / 90 + 3) % 4;
      var dirName = new Array("上", "右", "下", "左");
      if (e.type == "mouseenter") {
        this.animationIn(dirName[direction], e.target);
      } else {
        this.animationOut(dirName[direction], e.target);
      }
    },
    //进入
    animationIn(direction, el) {
      var settime = "0.3s";
      var img = el.querySelector("img");
      clearTimeout(this.timeName);
      if (direction == "左") {
        img.style.left = "-160px";
        img.style.top = "0";
        setTimeout(() => {
          img.style.transition = "all " + settime;
          img.style.left = "0";
          this.timeName = 0;
        }, 1);
      } else if (direction == "右") {
        img.style.left = "160px";
        img.style.top = "0";
        setTimeout(() => {
          img.style.transition = "all " + settime;
          img.style.left = "0";
        }, 1);
      } else if (direction == "上") {
        img.style.top = "-160px";
        img.style.left = "0";
        setTimeout(() => {
          img.style.transition = "all " + settime;
          img.style.top = "0";
        }, 1);
      } else if (direction == "下") {
        img.style.top = "160px";
        img.style.left = "0";
        setTimeout(() => {
          img.style.transition = "all " + settime;
          img.style.top = "0";
        }, 100);
      }
    },
    //出来
    animationOut(direction, el) {
      var settime = 300;
      var px = 160;
      var img = el.querySelector("img");
      if (direction == "左") {
        img.style.left = "-160px";
        img.style.top = "0";
      } else if (direction == "右") {
        img.style.left = "160px";
        img.style.top = "0";
      } else if (direction == "上") {
        img.style.top = "-160px";
        img.style.left = "0";
      } else if (direction == "下") {
        img.style.top = "160px";
        img.style.left = "0";
      }
      this.timeName = setTimeout(() => {
        if (document.getElementById("cellall")) {
          document
            .getElementById("cellall")
            .querySelectorAll("img")
            .forEach(element => {
              element.style.transition = "";
            });
        }
      }, settime);
    },
    //跳转
    onclick(url,title) {
      let { href } = this.$router.resolve({
        path: `${url}`
      });
      window.open(href, title);
    },
    //改变用户登录
    onchangeUser() {
      Cookie.delCookie("user_id");
      Cookie.delCookie("sid");
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.header_bt {
  line-height: 90px;
  padding-left: 30px;
  font-size: 36px;
}
.select_list:hover {
  background-color: #f5f7fa;
}
.select_list {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
}
.user_div {
  height: 90px;
  padding-top: 6px;
  display: inline-block;
  text-align: center;
  padding-right: 20px;
}
.user_name {
  font-size: 14px;
  cursor: pointer;
  color: #606266;
  padding: 0 15px;
}
.bj_div {
  height: 620px;
  background-image: url('../assets/bjhome.png');
  background-size: 100% 100%;
}
.bt_title {
  padding-top: 30px;
  color: #ffffff;
  text-align: center;
  font-size: 50px;
}
.toolBlock {
  margin-top: 60px;
}
.tool_row {
  text-align: center;
  margin: 20px;
}
.tool_row > div {
  position: relative;
  display: inline-block;
  width: 160px;
  height: 160px;
  margin: 12px;
  overflow: hidden;
}
.tool_row > div > img {
  position: absolute;
  left: -160px;
}
.tool_row > div.ztb {
  background-image: url(../assets/ztb-01.png);
}
.tool_row > div.zyk {
  background-image: url(../assets/zy-01.png);
}
.tool_row > div.rgsh {
  background-image: url(../assets/rg-01.png);
}
.tool_row > div.bsjc {
  background-image: url(../assets/bs-01.png);
}
.foot {
  position: relative;
  width: 100%;
  margin-top: 5%;
  text-align: center;
}
</style>

