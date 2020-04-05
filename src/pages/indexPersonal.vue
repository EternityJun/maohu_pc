  <!--首页-->
<template>    
  <div style="min-height:800px;min-width:1000px">
    <el-row style="height:90px;padding:10px 0;">
      <el-col :offset="1" :span="1">
        <img style="width:70px;height:70px;padding-left:30px;" src="../assets/CAT-02.png" />
      </el-col>
      <el-col :span="2">
        <span class="header_bt">猫糊</span>
      </el-col>
      <!-- justify-content: center; -->
      <!-- <el-col :span="18" style="display:flex;">
                <span style="opacity:0">1</span>
                <div v-for="(item,index) in myCompanys" :key="index" class="companys" @click="openMyCompany(item)">
                    <img style="width:40px;height:40px;" :src="imgUrl+item.headimg" alt="">
                    <span class="header_companys">{{item.qymc}}</span>
                </div>
      </el-col>-->
      <el-col :span="16" style="display:flex;">
        <span style="opacity:0">1</span>
        <div
          v-for="(item,index) in myCompanys"
          :key="index"
          class="companys"
          @click="openMyCompany(item)"
        >
          <img style="width:40px;height:40px;" :src="item.avatar" alt />
          <span class="header_companys">{{item.name+`_服务号`}}</span>
        </div>
      </el-col>
      <el-col :span="1">
        <el-dropdown
          v-if="myCompanys2.length>0"
          class="more"
          trigger="click"
          @command="openMyCompany"
        >
          <span class="el-dropdown-link">
            更多服务号
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :command="item"
              v-for="(item,index) in myCompanys2"
              :key="index"
            >{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="2" align="right" id="dd">
        <el-popover
          popper-class="user_list"
          placement="bottom"
          trigger="click"
          style="padding:10px 30px 10px 0"
        >
          <div>
            <div class="select_list" @click="persona">个人中心</div>
            <div class="select_list" @click="personalCard">电子名片</div>
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
        <div class="demo-input-suffix" style="width:100%">
          <!-- <el-autocomplete v-if="tab.txt == '采招公告'" style="width:100%" v-model="search" :fetch-suggestions="querySearchAsyncXmmc" placeholder="请输入关键词 例：水库、河道(回车添加)" @select="handleSelectXmmc" @keyup.enter.native="go_search()"></el-autocomplete> -->

          <el-input
            :placeholder="tab.placeholder"
            v-model="search"
            :readonly="tab.txt == '资质' || tab.txt == '资质加人员'?true:false"
            @click.native="(tab.txt == '资质' || tab.txt == '资质加人员') && show_components()"
            @keyup.enter.native="go_search()"
          >
            <i
              v-if="tab.txt !== '资质' && tab.txt !== '资质加人员'"
              slot="suffix"
              class="el-input__icon el-icon-circle-plus-outline cursor"
              v-show="!checked && tab.txt!='工程项目' && tab.txt!='采招公告'"
              @click.stop="show_components()"
            ></i>
            <i
              v-if="tab.txt !== '资质' && tab.txt !== '资质加人员'"
              slot="suffix"
              class="el-input__icon el-icon-remove-outline cursor"
              v-show="checked && tab.txt!='工程项目'  && tab.txt!='采招公告'"
              @click.stop="hide_components()"
            ></i>
            <i
              v-if="tab.txt !== '资质' && tab.txt !== '资质加人员'"
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
        <!-- <transition name="transitionslide">
          <div class="components" v-show="tab.txt=='采招公告' && checked">
            <zbgg :options="zbgg_options" @onSearch="onSearch"></zbgg>
          </div>
        </transition>-->
      </div>
      <el-dialog
        class="search_tk"
        title="资质选择"
        width="80%"
        @close="hide_components()"
        :visible.sync="centerDialogVisible"
      >
        <zz-search @onSearch="onSearch"></zz-search>
      </el-dialog>
      <el-dialog
        title="资质加人员选择"
        width="80%"
        @close="hide_components()"
        :visible.sync="centerDialogVisible1"
      >
        <zz-ry-select :type="1" />
      </el-dialog>

      <div class="toolBlock" id="cellall">
        <div class="tool_row">
          <div
            class="cell ztb"
            v-if="tubiao.indexOf('行业交互') != '-1'"
            @click="onclick('/source','资源库')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/JH-2.png" alt />
          </div>
          <div
            class="cell zyk"
            v-if="tubiao.indexOf('业务消息') != '-1'"
            @click="onclick('/indexwaitThing','代办事务')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/XX-2.png" alt />
          </div>
          <!-- <div class="cell rgsh" v-if="tubiao.indexOf('我的项目') != '-1'" @click="onclick('/projectCenter','我的项目')" @mouseleave="onOver" @mouseenter="onOver">
                        <img src="../assets/XM-2.png" alt>
          </div>-->
          <div
            class="cell wddz"
            v-if="tubiao.indexOf('业务圈') != '-1'"
            @click="onclick('/myCustomization','招标定制')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/wddz1.svg" alt />
          </div>
          <div
            class="cell qyfwh"
            v-if="tubiao.indexOf('业务圈') != '-1'"
            @click="onclick('/personalCircle','业务圈','second')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/GRYWQ2.svg" alt />
            <!-- 服务圈 -->
          </div>
          <div
            class="cell qyztb"
            v-if="tubiao.indexOf('我的项目') != '-1'"
            @click="onclick('/qyZtbPage','我的项目','third')"
            @mouseleave="onOver"
            @mouseenter="onOver"
          >
            <img src="../assets/GRXM2.svg" alt />
            <!-- 我的项目 -->
          </div>
          <div
            class="cell jfgl"
            v-if="tubiao.indexOf('积分管理') != '-1'"
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
import zzRySelect from "./template/zzRySelect";
import zbgg from "./template/myCustomizationSearch"; //采招公告
import { loginOut } from "../store/formatter.js";

export default {
  data() {
    return {
      user_id: '',
      imgUrl: "https://wechat.cdzjkl.com/files/options/",
      myCompanys: [],
      myCompanys2: [],
      centerDialogVisible: false,
      centerDialogVisible1: false,
      options: {
        size: "mini",
        searchQy: {
          gsmc: "",
          gsKey: [],
          xydm: "",
          zsbh: "",
          fr: "",
          qylx: "",
          zcsd: [],
          checked: false
        }
      },
      zbgg_options: {
        size: "mini",
        from: "personal",
        searchZbgg: {
          xmmc: "",
          xmmcs: [],
          xmyz: "",
          xmyzs: [],
          jylx_gcjs: [
            { label: "施工", status: false },
            { label: "代理", status: false },
            { label: "监理", status: false },
            { label: "勘察设计", status: false },
            { label: "造价", status: false },
            { label: "其他招标", status: false }
          ],
          jylx_zfcg: [{ label: "政府采购", status: false }],
          area: []
        }
      },
      searchBox: [
        { txt: "企业", url: "/searchQy", placeholder: "输入企业名称" },
        { txt: "资质", url: "/searchZz", placeholder: "选择资质" },
        { txt: "人员", url: "/searchRy", placeholder: "输入人员名称" },
        {
          txt: "工程项目",
          url: "/searchYj",
          placeholder: "输入工程项目名称关键字,如：桥梁，医院"
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
      formInline: {
        name: "",
        number: "",
        company: ""
      }
    };
  },
  components: {
    searchQy,
    rySelectFrom,
    zzSearch,
    zzRySelect,
    zbgg
  },
  created() {
    this.user_id = this.$store.state.userInfo.user_id;
    localStorage.setItem("setzzSearchValue_checked", "");
    localStorage.setItem("setzzSearchValue", "");
    this.quanxian();
    this.myCompany();
    this.getIpToArea();
    document.title = "猫糊-服务号";
  },
  methods: {
    getIpToArea() {
      this.axios.post("/index/common/ipTOArea", {}, data => {
        if (data == null) {
          this.getIpToArea();
          return;
        }
        let province = data.province || "";
        let city = data.city || "";
        localStorage.setItem("local_province", province);
        localStorage.setItem("local_city", city);
      });
    },
    persona() {
      // 跳转去个人中心
      this.$router.push("/Persona");
    },
    // 跳转去个人电子名片
    personalCard() {
      let { href } = this.$router.resolve({
        path: `/personalCard?target_id=${this.user_id}&card_name=${this.userName}`
      });
      window.open(href, this.userName + this.user_id);
    },
    openMyCompany(item) {
      // window.open(`${item.url}?company_id=${item.company_id}`, item.qymc);
      localStorage.setItem("service_id", item.service_id);
      let { href } = this.$router.resolve({
        path: `/browser?login_service_id=${item.service_id}&service_id=${item.service_id}&gsmc=${item.name}`
      });
      window.open(href, item.name);
      //   let { href } = this.$router.resolve({
      //           path: `/ryDet?gs_id=${this.gsId}&name=${row.xm}&staff_base_id=`
      //       });
      //       window.open(href, "人员详情" + this.gsId + row.xm);
    },
    myCompany() {
      // this.axios.post(
      //   "/index/Mine/MyCompany",
      //   {
      //     user_id: this.$store.state.userInfo.user_id
      //   },
      //   data => {
      //     if (data.status == "success") {
      //       this.myCompanys = data.rows[0];
      //       this.myCompanys2 = data.rows[1];
      //     }
      //   }
      // );
      // this.axios.post(
      //     "/relation/Person_Service/MyService",
      //     {
      //         user_id: this.$store.state.userInfo.user_id
      //     },
      //     data => {
      //         if (data.status == "success") {
      //             this.myCompanys = data.rows;
      //             // this.myCompanys2 = data.rows[1];
      //         }
      //     }
      // );
      this.axios.post(
        "/index/mine/MyService",
        {
          user_id: this.$store.state.userInfo.user_id
        },
        data => {
          if (data.status == "success") {
            this.myCompanys = data.rows[0];
            this.myCompanys2 = data.rows[1];
          }
        }
      );
    },
    //权限控制
    quanxian() {
      this.tubiao = this.$store.state.menu.text;
    },
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
    onclick(url, title) {
      let { href } = this.$router.resolve({
        path: `${url}`
      });
      window.open(href, title);
    },
    //改变用户登录
    onchangeUser() {
      Cookie.delCookie("token");
      loginOut();
    },
    switchTab(item) {
      this.search = "";
      this.tab = item;
      this.checked = false;
    },
    show_components() {
      this.checked = true;
      if (this.tab.txt == "资质") {
        this.centerDialogVisible = true;
      }
      if (this.tab.txt == "资质加人员") {
        this.centerDialogVisible1 = true;
      }
    },
    hide_components() {
      this.checked = false;
    },
    //点击组件搜索
    onSearch(obj) {
      let { href } = this.$router.resolve({
        path: obj.url
      });

      if (obj.url == "/searchQy") {
        let {
          gsmc,
          gsKey,
          xydm,
          zsbh,
          fr,
          qylx,
          zcsd,
          checked
        } = obj.form;
        gsmc = gsmc || "";
        gsKey = gsKey || [];
        xydm = xydm || "";
        zsbh = zsbh || "";
        fr = fr || "";
        qylx = qylx || "";
        zcsd = zcsd || [];
        checked = checked || false;

        let pa = checked ? "?arg=" + gsKey.join(",") + xydm + zsbh + fr + qylx + zcsd : "?arg=" + gsmc + xydm + zsbh + fr + qylx + zcsd;

        href =
          href + pa;

        window.open(href, "qySearch");
      }
      if (obj.url == "/searchRy") {
        // 搜索人员名称
        let { name, number, company } = obj.formInline;
        if (
          name.length < 2 &&
          name.length > 0
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

        href = href + "?arg=" + name + number + company;

        window.open(href, "rySearch");
      }
      if (obj.url == "/searchZz") {
        window.open(href + "?date=" + new Date().getSeconds(), "资质搜索");
      }
      if (obj.url == "/searchZbgg") {
        window.open(href + "?date=" + new Date().getSeconds(), "采招公告");
        this.hide_components();
      }
    },

    openPage() {
      let { href } = this.$router.resolve({
        path: this.tab.url
      });
      if (href == "#/searchZbgg") {
        window.open(href, "searchZbgg");
      }
    },
    querySearchAsyncXmmc(word, cb) {
      if (word !== "") {
        let params = {
          word,
          type: "xmmc",
          area_type: ""
        };
        this.axios.post("/index/Tendering/keyGuide", params, data => {
          let rows = data.rows || [];
          let cbData = [];
          rows.forEach(e => {
            cbData.push({ value: e });
          });
          cb(cbData);
        });
      }
    },
    handleSelectXmmc(item) {
      this.go_search();
    },
    //点击搜索
    go_search() {
      if (this.search == "") {
        this.$message({
          message: "搜索项不能为空",
          type: "error"
        });
        return;
      }
      let { href } = this.$router.resolve({
        path: this.tab.url
      });
      if (href == "#/searchQy") {
        href = href + "?gsmc=" + this.search;
        localStorage.setItem(
          "searchQy",
          JSON.stringify({
            gsmc: this.search,
            gsKey: [],
            xydm: '',
            zsbh: '',
            fr: '',
            qylx: '',
            zcsd: [],
            checked: false
          })
        );
        this.options.searchQy = null;
        this.search = "";
        window.open(href, "qySearch");
      }
      if (href == "#/searchYj") {
        // 搜索工程项目跳转
        href = href + "?proName=" + this.search;
        localStorage.setItem("searchYj", JSON.stringify({ yjmc: this.search }));
        this.options.searchQy = null;
        this.search = "";
        window.open(href, "yjSearch");
      }
      if (href == "#/searchRy") {
        // 搜索人员名称
        href = href + "?name=" + this.search;
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
        console.log(params)
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

<style scoped >
.more {
  line-height: 75px;
  cursor: pointer;
  color: #1296db;
}
.header_bt {
  line-height: 80px;
  padding-left: 40px;
  font-size: 36px;
  display: inline-block;
}
.header_companys {
  height: 50px;
  max-width: 390px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  line-height: 50px;
  margin-left: 10px;
}
.companys {
  height: 50px;
  margin-top: 15px;
  margin-right: 30px;
  display: flex;
  cursor: pointer;
}
.select_list:hover {
  background-color: #f5f7fa;
}
.select_list {
  text-align: center;
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
  /* padding-top: 6px; */
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
.tool_row > div.ztb {
  background-image: url("../assets/JH-1.png");
}
.tool_row > div.zyk {
  background-image: url("../assets/XX-1.png");
}
.tool_row > div.rgsh {
  background-image: url("../assets/XM-1.png");
}
.tool_row > div.bsjc {
  background-image: url("../assets/zhuye1.png");
}
.tool_row > div.zbcd {
  background-image: url("../assets/zhubiao1.png");
}
.tool_row > div.qyfwh {
  background-image: url("../assets/GRYWQ1.svg");
}
.tool_row > div.wddz {
  background-image: url("../assets/wddz2.svg");
}
.tool_row > div.qyztb {
  background-image: url("../assets/GRXM1.svg");
}
.tool_row > div.jfgl {
  background-image: url("../assets/JF-1.png");
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
  width: 43%;
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
  width: 100%;
  background-color: white;
  position: absolute;
  top: 87px;
  z-index: 99;
  box-shadow: 0 0 2px#559cdf;
}
.component_qy {
  width: 97%;
  padding-left: 3%;
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
</style>

