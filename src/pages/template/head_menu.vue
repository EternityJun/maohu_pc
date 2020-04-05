<template>
  <div style="width:100%;margin:0 auto;border-bottom: solid 1px #e6e6e6;">
    <!-- 导航栏 -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="border:none;width:1200px;margin:0 auto">
      <el-menu-item v-for="(item,index1) in menu" :key="index1" :index="item.path">{{item.text}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  components: {},
  props: {
    index: ""
  },
  data() {
    return {
      // service_id:"",
      query: {},
      // gsmc:"",
      activeIndex: "",
      menu_browser: [
        { text: "首页", path: "/" },
        { text: "证件管理", path: "/certificateManager" },
        { text: "业绩管理", path: "/performance" },
        { text: "小程序管理", path: "/indexconfiguer" },
        { text: "权限管理", path: "/user_list" },
        { text: "招投标流程", path: "/project_process" }
      ],
      menu_personal: [
        { text: "首页", path: "/" },
        { text: "行业交互", path: "/source" },
        { text: "业务消息", path: "/indexwaitThing" },
        { text: "我的项目", path: "/projectCenter" }
      ],
      menu_bid: [
        { text: "首页", path: "/" },
        // { text: '机器人', path: '/indexBid',  },
        { text: "项目服务管理", path: "/indexBid" },
        { text: "大数据中心", path: "/bigData" },
        { text: "人员权限", path: "/user_list" },
        { text: "积分管理", path: "/integral" },
        { text: "人工审核", path: "/itemCheck?cate=筑标" },
        { text: "标书检查", path: "/itemBsList?cate=筑标" },
        { text: "中标数据分析", path: "/zhongbiao_data" }
      ],
      menu_dictionary: [
        { text: "职称证字典", path: "/dictionary" },
        { text: "工程用途字典", path: "/dictionary?type=gc" }
      ],
      menu_business: [
        { text: "企业经营区域分布", path: "/regionDistribution" },
        { text: "企业经营业务规模分布", path: "/sizeDistribution" },
        { text: "企业经营业务范畴分布", path: "/businessScopeDistribution" },
        { text: "企业经营活跃度分析", path: "/activenessDistribution" }
      ],
      menu_personCircle: [
        { text: "首页", path: "/personal" },
        { text: "业务圈", path: "/personalCircle" },
        { text: "我的项目", path: "/qyZtbPage" }
      ],
      menu_enterpriseCircle: [
        { text: "首页", path: "/browser" },
        { text: "企业服务号", path: "/enterpriseCircle" },
        { text: "企业招投标", path: "/qyfwqPage" }
      ],
      menu: []
    };
  },
  created() {
    this.query = this.$route.query;
    this.query.service_id = this.query.login_service_id;
    this.activeIndex = this.index;
  },
  watch: {
    activeIndex() {
      this.is_menu();
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      var t = keyPath[0];
      let href = "";
      if (key == "/personal") {
        href = this.$router.resolve({
          path: `${t}`
        }).href;
      } else if(key == "/dictionary"){
        href = this.$router.resolve({
          path: `${t}`,
        }).href;
      }else{
        href = this.$router.resolve({
          path: `${t}`,
          query: this.query
        }).href;
      }
      // if (t == '/') {
      //   window.open('http://'+window.location.host,localStorage.getItem('qymc'))
      // } else {
      window.location.href = href;
      // }
    },
    is_menu() {
      var aaa = JSON.parse(localStorage.getItem("menu"));
      aaa.forEach(item => {
        item.path = item.path.replace(/(\s*$)/g, "");
      });
       this.menu = aaa;  
      if (this.activeIndex == "/dictionary" || this.activeIndex == "/dictionary?type=gc") {
        this.menu = this.menu_dictionary;
      }
      if (
        this.activeIndex == "/regionDistribution" ||
        this.activeIndex == "/sizeDistribution" ||
        this.activeIndex == "/businessScopeDistribution" ||
        this.activeIndex == "/activenessDistribution"
      ) {
        this.menu = this.menu_business;
      }
    }
  }
};
</script>