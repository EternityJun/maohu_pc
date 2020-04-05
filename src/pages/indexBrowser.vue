<template>
  <div style="min-height:800px;min-width:1000px">
    <el-row style="height:90px">
      <el-col :offset="1" :span="18">
        <p class="header_bt">{{showGsmc}}_服务号</p>
      </el-col>
      <el-col :offset="1" :span="2" align="right" id="dd">
        <el-popover
          popper-class="user_list"
          placement="bottom"
          trigger="click"
          style="padding:10px 30px 10px 0"
        >
          <div>
            <div class="select_list" @click="persona">个人中心</div>
            <div class="select_list" @click="toBid">猫糊_个人服务号</div>
            <div class="select_list" @click="onchangeUser">退出登录</div>
          </div>
          <div class="user_div" slot="reference" style="cursor:pointer;">
            <img
              style="border-radius:50%"
              :src="user_img?user_img:'../assets/user.png'"
              alt
              height="50px"
              width="50px"
            />
            <div class="user_name">{{userName}}</div>
          </div>
        </el-popover>
      </el-col>
    </el-row>
    <div class="bj_div" :style="{backgroundImage: 'url(' + img + ')' }">
      <p class="bt_title"></p>
      <div class="searchBox">
        <ul>
          <li
            v-for="(value,key) in searchBox"
            :key="key"
            :class="[value.txt==tab.txt ?  'active': '']"
            @click="switchTab(value)"
          >{{value.txt}}</li>
        </ul>
        <div class="demo-input-suffix">
          <el-input
            :placeholder="tab.placeholder"
            v-model="search"
            :readonly="tab.txt == '资质'?true:false"
            @click.native="tab.txt == '资质' && show_components()"
            @keyup.enter.native="go_search()"
          >
            <i
              v-if="tab.txt !== '资质'"
              slot="suffix"
              class="el-input__icon el-icon-circle-plus-outline cursor"
              v-show="!checked && tab.txt!='工程项目'  && tab.txt!='采招公告'"
              @click.stop="show_components()"
            ></i>
            <i
              v-if="tab.txt !== '资质'"
              slot="suffix"
              class="el-input__icon el-icon-remove-outline cursor"
              v-show="checked && tab.txt!='工程项目' && tab.txt!='采招公告'"
              @click.stop="hide_components()"
            ></i>
            <i
              v-if="tab.txt !== '资质'"
              slot="suffix"
              class="el-input__icon el-icon-search cursor"
              @click.stop="go_search()" 
            ></i>
          </el-input>
        </div>
        <transition name="transitionslide">
          <div class="components component_qy" v-show="tab.txt=='企业' && checked">
            <search-qy :options="options" @onSearch="onSearch"></search-qy>
          </div>
        </transition>
        <transition name="transitionslide">
          <div class="components" v-show="tab.txt=='人员' && checked">
            <ry-select-from @onSearch="onSearch"></ry-select-from>
          </div>
        </transition>
      </div>
      <el-dialog
        class="search_tk"
        title="资质选择"
        width="900px"
        @close="hide_components()"
        :visible.sync="centerDialogVisible"
      >
        <zz-search @onSearch="onSearch"></zz-search>
      </el-dialog>

      <div class="toolBlock" id="cellall">
        <div class="tool_row">
          <div
            class="cell zj"
            v-if="tubiao.indexOf('证件管理') != '-1'"
            @click="onclick('/certificateManager','证件管理')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/ZJ-2.png" alt />
          </div>
          <div
            class="cell yj"
            v-if="tubiao.indexOf('业绩管理') != '-1'"
            @click="onclick('/performance','业绩管理')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/YJ-2.png" alt />
          </div>
          <div
            class="cell dsj"
            v-if="tubiao.indexOf('大数据中心') != '-1'"
            @click="onclick('/bigData','大数据中心1')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/DSJ-2.png" alt />
          </div>
          <div
            class="cell xcx"
            v-if="tubiao.indexOf('小程序管理') != '-1'"
            @click="onclick('/indexconfiguer','小程序管理')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/XCX-2.png" alt />
          </div>
          <div
            v-if="tubiao.indexOf('权限管理') != '-1'"
            class="cell ry"
            @click="onclick('/user_list','权限管理')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/RY-2.png" alt />
          </div>
          <!-- <div
            class="cell ztb"
            v-if="tubiao.indexOf('企业招投标') != '-1'"
            @click="onclick('/project_process','企业招投标')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/ZTBLC-2.png" alt />
          </div> -->
          
          <div
            class="cell qyfwh"
              v-if="tubiao.indexOf('企业服务号') != '-1'"
            @click="onclick('/enterpriseCircle','企业服务号','second')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/QYFUH2.svg" alt />
          </div>
          <div
            class="cell qyztb"
            v-if="tubiao.indexOf('企业招投标') != '-1'"
            @click="onclick('/qyfwqPage','企业招投标','third')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/QYZ2.svg" alt />
          </div>  
          <div
            v-if="tubiao.indexOf('积分管理') != '-1'"
            class="cell jfgl"
            @click="onclick('/integralZb','积分管理')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/JF-2.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Cookie from "./../cookie";
import user_img from "../assets/user.png";
import bjhome from "../assets/bjhome.png";
import searchQy from "./template/searchQy";
import rySelectFrom from "./template/rySelectFrom";
import zzSearch from "./template/zzSearch";
import { loginOut } from "../store/formatter.js";
import vFooter from "./template/footer";

export default {
  data () {
    return {

      company_name: this.$store.state.userInfo.qymc,
      centerDialogVisible: false,
      options: {
        size: "mini",
        searchQy: {}
      },
      searchBox: [
        { txt: "企业", url: "/searchQy", placeholder: "输入企业名称" },
        { txt: "资质", url: "/searchZz", placeholder: "选择资质" },
        { txt: "人员", url: "/searchRy", placeholder: "输入人员名称" },
        {
          txt: "工程项目",
          url: "/searchYj",
          placeholder: "输入工程项目名称关键字"
        },
        {
          txt: "采招公告",
          url: "/searchZbgg",
          placeholder: "请输入招标项目名称关键词 例：水库、河道"
        }
      ],
      search: "",
      tab: { txt: "企业", url: "/searchQy", placeholder: "输入企业名称" },
      checked: false,
      img: bjhome,
      inBoxgrid: {
        x: null,
        y: null
      },
      user_img: this.$store.state.userInfo.user_img || user_img,
      timeName: 0,
      userName: this.$store.state.userInfo.username,
      tubiao: [],
      role: {},
      formInline: {
        name: "",
        number: "",
        company: ""
      },
      login_service_id: this.$router.history.current.query.service_id
    };
  },
  components: {
    searchQy,
    rySelectFrom,
    zzSearch
  },
  created () {
       localStorage.setItem('setzzSearchValue_checked','')
        localStorage.setItem('setzzSearchValue','')
    let obj = this.$router.history.current.query
    this.showGsmc = this.$router.history.current.query.gsmc
    let service_id = this.$router.history.current.query.service_id
    localStorage.setItem("service_id", service_id ? service_id : "")
    document.title = localStorage.getItem("qymc");
    this.quanxian();
    this.getUserServiceRole()
  },
  methods: {
     persona () {
        // 跳转去个人中心
        this.$router.push(`/Persona?login_service_id=${this.$route.query.login_service_id}&gsmc=${this.$route.query.gsmc}`)
      },
    getUserServiceRole () {
      let obj = {
        service_id: localStorage.getItem('service_id'),
        user_id: localStorage.getItem('user_id')
      }
      this.axios.post("/relation/role/userServiceRole", obj, data => {
        console.log(data)
      })

    },
    toBid () {
       let { href } = this.$router.resolve({
        path: `/personal`
      });
      window.open(href, '猫糊-服务号');
    },
    //权限控制
    quanxian () {
      this.tubiao = this.$store.state.menu.text;
      this.axios.post(
        "/index/mine/role",
        {
          user_id: this.$store.state.userInfo.user_id,
          company_id: localStorage.getItem("company_id")
        },
        data => {
          this.role = data;
        }
      );
    },
    onOver (e) {
      var w = e.target.offsetWidth;
      var h = e.target.offsetHeight;
      var x = e.pageX - e.target.getBoundingClientRect().left - w / 2;
      var y = e.pageY - e.target.getBoundingClientRect().top - h / 2;
      var direction =
        Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90 + 3) % 4;
      var dirName = new Array("上", "右", "下", "左");
      if (e.type == "mouseenter") {
        this.animationIn(dirName[direction], e.target);
      } else {
        this.animationOut(dirName[direction], e.target);
      }
    },
    //进入
    animationIn (direction, el) {
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
    animationOut (direction, el) {
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
    onclick (url, title) {
      let { href } = this.$router.resolve({
        path: `${url}?login_service_id=${this.login_service_id}&gsmc=${this.showGsmc}`
      });
      window.open(href, this.showGsmc);
    },
    //改变用户登录
    onchangeUser () {
      Cookie.delCookie("token");
      loginOut();
    },
    switchTab (item) {
      this.search = "";
      this.tab = item;
      this.checked = false;
    },
    show_components () {
      this.checked = true;
      if (this.tab.txt == "资质") {
        this.centerDialogVisible = true;
      }
    },
    hide_components () {
      this.checked = false;
    },
    //点击组件搜索
    onSearch (obj) {
      let { href } = this.$router.resolve({
        path: obj.url
      });

      if (obj.url == "/searchQy") {
        let { gsmc, xydm, zsbh, fr, qylx, zcsd, is_rc, area } = obj.form;
        gsmc = gsmc || "";
        xydm = xydm || "";
        zsbh = zsbh || "";
        fr = fr || "";
        qylx = qylx || "";
        zcsd = zcsd || "";

        this.checked = false;

        href = href + "?login_service_id="+this.login_service_id+"&qymc="+this.showGsmc+"&arg=" + gsmc + xydm + zsbh + fr + qylx + zcsd;

        window.open(href, "qySearch");
      }
      if (obj.url == "/searchRy") {
        // 搜索人员名称
        let { name, number, company } = obj.formInline;
        if (
          name.length < 2 && name.length > 0
          //  &&
          // this.formInline.number.length == 0 &&
          // this.formInline.company.length == 0
        ) {
          this.$message({
            message: "人员名称：请输入至少两个汉字进行查询",
            type: "error"
          });
          return;
        }
        if (number && number.length < 6) {
          this.$message({
            message: "请输入至少六位证书编号进行查询",
            type: "error"
          });
          return;
        }

        this.checked = false;

        href = href +  "?login_service_id="+this.login_service_id+"&qymc="+this.showGsmc+"&arg=" + name + number + company;

        window.open(href, "rySearch");
      }
      if (obj.url == "/searchZz") {
        window.open(href + "?login_service_id="+this.login_service_id+"&qymc="+this.showGsmc+"&date=" + new Date().getSeconds(), '资质搜索');
      }
    },
    //点击搜索
    go_search () {
      if (this.search == "") {
        this.$message({
          message: "搜索项不能为空",
          type: "error"
        });
        return;
      }
      let { href } = this.$router.resolve({
        path: this.tab.url,
        // query:{
        //   login_service_id:this.login_service_id,
        //   qymc:this.showGsmc,
        // }
      });
      if (href == "#/searchQy") {
        href = href + "?login_service_id="+this.login_service_id+"&qymc="+this.showGsmc+"&gsmc=" + this.search;
        localStorage.setItem("searchQy", JSON.stringify({ gsmc: this.search }));
        this.options.searchQy = null;
        this.search = "";
        window.open(href, "qySearch");
      }
      if (href == "#/searchYj") {
        // 搜索工程项目跳转
        href = href + "?login_service_id="+this.login_service_id+"&qymc="+this.showGsmc+"&proName=" + this.search;
        localStorage.setItem("searchYj", JSON.stringify({ yjmc: this.search }));
        this.options.searchQy = null;
        this.search = "";
        window.open(href, "yjSearch");
      }
      if (href == "#/searchRy") {
        // 搜索人员名称
        href = href + "?login_service_id="+this.login_service_id+"&qymc="+this.showGsmc+"&name=" + this.search;
        this.formInline.name = this.search;
        localStorage.setItem(
          "setRySearchValue",
          JSON.stringify(this.formInline)
        );
        this.options.searchQy = null;
        this.search = "";
        window.open(href, "rySearch");
      }
       if (href == "#/searchZbgg") {
        // localStorage.setItem('searchZbgg',null)
        // return
        //采招公告
        href = href + "?xmmc=" + this.search;
        // let params = {
        //   xmmc: '',
        //   xmmcs: [this.search],
        //   xmyz: '',
        //   xmyzs: [],
        //   jylx_gcjs: [
        //     { label: '施工', status: false },
        //     { label: '代理', status: false },
        //     { label: '监理', status: false },
        //     { label: '勘察设计', status: false },
        //     { label: '造价', status: false },
        //     { label: '其他招标', status: false }
        //   ],
        //   jylx_zfcg: [{ label: '政府采购', status: false }],
        //   area: []
        // }
        // localStorage.setItem('searchZbgg', JSON.stringify(params))
        let params = {
          xmmcs: [this.search]
        };
        localStorage.setItem("searchZbgg", JSON.stringify(params));

        this.options.searchZbgg = null;
        this.search = "";
        window.open(href, "searchZbgg");
        // window.location.reload();
      }
    }
  }
};
</script>
<style>
.search_tk .el-dialog__body {
  padding: 0 20px 20px;
}
</style>

<style scoped  >
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
  padding-top: 9.5px;
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
  background-image: url("../assets/bjhome.png");
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
.tool_row > div.xcx {
  background-image: url("../assets/XCX-1.png");
}
.tool_row > div.ry {
  background-image: url("../assets/RY-1.png");
}
.tool_row > div.ztb {
  background-image: url("../assets/ZTBLC-1.png");
}
.tool_row > div.zj {
  background-image: url("../assets/ZJ-1.png");
}
.tool_row > div.yj {
  background-image: url("../assets/YJ-1.png");
}
.tool_row > div.dsj {
  background-image: url("../assets/DSJ-1.png");
}
.tool_row > div.qyfwh {
  background-image: url("../assets/QYFUH1.svg");
}
.tool_row > div.qyztb {
  background-image: url("../assets/QYZ1.svg");
}
.foot {
  position: relative;
  width: 100%;
  margin-top: 5%;
  text-align: center;
}
.cursor {
  cursor: pointer;
}
.searchBox {
  width: 35%;
  min-width: 670px;
  margin: 0 auto;
  margin-top: 50px;
  position: relative;
}
.searchBox ul {
  padding: 0 20px;
  margin: 20px 0;
}
.searchBox ul li {
  list-style: none;
  display: inline-block;
  margin-right: 10px;
  color: white;
  padding: 3px 8px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 16px;
}
.searchBox li.active {
  color: #348bda;
  background-color: white;
}
.components {
  width: 670px;
  background-color: white;
  position: absolute;
  top: 87px;
  z-index: 99;
  box-shadow: 0 0 2px#559cdf;
}
.component_qy {
  width: 650px;
  padding-left: 20px;
}
.transitionslide-enter-active,
.transitionslide-leave-active {
  transition: all 0.4s;
}
.transitionslide-enter,
.transitionslide-leave-to {
  transform: translateY(-200px);
  opacity: 0;
}
.tool_row > div.jfgl {
    background-image: url("../assets/JF-1.png");
}
</style>

