<!--企业圈-->
<template>
  <div class="enterpriseCircle_content">
    <header>
      <body-top></body-top>
      <!-- 导航栏 -->
      <div style="height:60px;">
        <head-menu style="height:60px;" :index="'/personalCircle'"></head-menu>
      </div>
    </header>

    <div class="main_content person_main_content">
      <div class="downOut">
        <div class="downIn"></div>
      </div>
      <div class="row_one">
        <!-- 我信任的 -->
        <div class="me_trustCircle circle person_circle">
          <div class="circleTitle">我信任的人</div>
          <div class="peopleList meTrustPeople">
            <div class="onePerson" v-for="(item,index) in meTrustPeople" :key="index" v-if="index<6" @click="openCard('meTrust',item)">
              <el-tooltip placement="top" effect="light">
                <p slot="content">{{item.card_name}}</p>
                <img class="avatarImg" :src="item.card_avatar" alt="">
              </el-tooltip>
            </div>
          </div>
          <span class="link_color more" @click="openTable('meTrust')">查看更多></span>
        </div>
        <!-- 互换资源 -->
        <div class="changeCircle circle person_circle">
          <div class="circleTitle">我的好友</div>
          <div class="peopleList changePeople">
            <div class="onePerson" v-for="(item,index) in changePeople" :key="index" v-if="index<6" @click="openCard('change',item)">
              <el-tooltip placement="top" effect="light">
                <p slot="content">{{item.card_name}}</p>
                <img class="avatarImg" :src="item.card_avatar" alt="">
              </el-tooltip>
            </div>
          </div>
          <span class="link_color more" @click="openTable('change')">查看更多></span>
        </div>
        <!-- 我的关注 -->
        <div class="trustMeCircle circle person_circle">
          <div class="circleTitle">我的关注</div>
          <div class="peopleList trustMePeople">
            <div class="onePerson" v-for="(item,index) in followPeople" :key="index" v-if="index<6" @click="openCard('follow',item)">
              <el-tooltip placement="top" effect="light">
                <p slot="content">{{item.card_name}}</p>
                <img class="avatarImg" :src="item.card_avatar" alt="">
              </el-tooltip>
            </div>
          </div>
          <span class="link_color more trustMeMore" @click="openTable('follow')">查看更多></span>
        </div>
      </div>
      <div class="row_two">
        <!-- 信任我的 -->
        <div class="trustMeCircle circle person_circle">
          <div class="circleTitle">信任我的人</div>
          <div class="peopleList trustMePeople">
            <div class="onePerson" v-for="(item,index) in trustMePeople" :key="index" v-if="index<6" @click="openCard('trustMe',item)">
              <el-tooltip placement="top" effect="light">
                <p slot="content">{{item.card_name}}</p>
                <img class="avatarImg" :src="item.card_avatar" alt="">
              </el-tooltip>
            </div>
          </div>
          <span class="link_color more trustMeMore" @click="openTable('trustMe')">查看更多></span>
        </div>

        <!-- 浏览记录 -->
        <div class="trustMeCircle circle person_circle">
          <div class="circleTitle">浏览记录</div>
          <div class="peopleList trustMePeople">
            <div class="onePerson" v-for="(item,index) in historyPeople" :key="index" v-if="index<6" @click="openCard('history',item)">
              <el-tooltip placement="top" effect="light">
                <p slot="content">{{item.card_name}}</p>
                <img class="avatarImg" :src="item.card_avatar" alt="">
              </el-tooltip>
            </div>
          </div>
          <span class="link_color more trustMeMore" @click="openTable('history')">查看更多></span>
        </div>
      </div>
    </div>
    <div class="myself">
      <img class="myAvatar" :src="this.$store.state.userInfo.user_img" alt="">
    </div>
    <div class="main_content">
      <div class="upOut">
        <div class="upIn"></div>
      </div>
      <!-- 我的企业 -->
      <div class="mineCircle circle">
        <div class="circleTitle">我的企业</div>
        <div class="peopleList knowPeople">
          <div class="onePerson" v-for="(item,index) in minePeople" :key="index" v-if="index<6" @click="openTable('mine')">
            <el-tooltip placement="top" effect="light">
              <p slot="content">{{item.name}}</p>
              <img class="avatarImg" :src="item.avatar" alt="">
            </el-tooltip>
          </div>
        </div>
        <span class="link_color more" @click="openTable('mine')">查看更多></span>
      </div>
      <!-- 认识的建筑企业 -->
      <div class="knowCircle circle">
        <div class="circleTitle">认识的建筑企业</div>
        <div class="peopleList knowPeople">
          <div class="onePerson" v-for="(item,index) in knowPeople" :key="index" v-if="index<6" @click="openTable('know')">
            <el-tooltip placement="top" effect="light">
              <p slot="content">{{item.name}}</p>
              <img class="avatarImg" :src="item.avatar" alt="">
            </el-tooltip>
          </div>
        </div>
        <span class="link_color more" @click="openTable('know')">查看更多></span>
      </div>
      <!-- 我被企业坑过 -->
      <div class="badCircle circle">
        <div class="circleTitle">我的评价</div>
        <div class="peopleList badPeople">
          <div class="onePerson" v-for="(item,index) in badPeople" :key="index" v-if="index<6" @click="openTable('bad')">
            <el-tooltip placement="top" effect="light">
              <p slot="content">{{item.qymc}}</p>
              <img class="avatarImg" :src="item.avatar" alt="">
            </el-tooltip>
          </div>
        </div>
        <span class="link_color more" @click="openTable('bad')">查看更多></span>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import head_menu from "./template/head_menu.vue";

export default {
  components: {
    headMenu: head_menu
  },

  data() {
    return {
      inPeople: [
        {
          avatar: "",
          name: "111"
        },
        {
          avatar: "",
          name: "222"
        },
        {
          avatar: "",
          name: "333"
        },
        {
          avatar: "",
          name: "444"
        },
        {
          avatar: "",
          name: "555"
        },
        {
          avatar: "",
          name: "666"
        },
        {
          avatar: "",
          name: "777"
        }
      ],
      meTrustPeople: [],
      trustMePeople: [],
      changePeople: [],
      followPeople: [],
      historyPeople: [],
      minePeople: [],
      knowPeople: [],
      badPeople: []
      // servicePeople: []
    };
  },
  created() {
    document.title = "业务圈";
    this.getMeTrust();
    this.getTrustMe();
    this.getChange();
    this.getFollow();
    this.getHistory();
    this.getMineData();
    this.getKnowData();
    this.getBadData();
  },
  methods: {
    getMeTrust() {
      // console.log(this.$store.state.userInfo.user_id)
      this.axios.post(
        "/relation/User_Card/trustList",
        {
          user_id: this.$store.state.userInfo.user_id,
          cate: "my",
          page: 1,
          status: 1,
          rows: 3
        },
        data => {
          if (data.status == "success") {
            this.meTrustPeople = data.rows;
          }
        }
      );
    },
    getTrustMe() {
      // console.log(this.$store.state.userInfo.user_id)
      this.axios.post(
        "/relation/User_Card/trustList",
        {
          user_id: this.$store.state.userInfo.user_id,
          cate: "his",
          page: 1,
          status: 1,
          rows: 3
        },
        data => {
          if (data.status == "success") {
            this.trustMePeople = data.rows;
          }
        }
      );
    },
    getChange() {
      // console.log(this.$store.state.userInfo.user_id);
      this.axios.post(
        "/relation/User_Card/friendList",
        {
          user_id: this.$store.state.userInfo.user_id,
          page: 1,
          cate: "my",
          status: 1,
          rows: 3
        },
        data => {
          if (data.status == "success") {
            this.changePeople = data.rows;
          }
        }
      );
    },
    getFollow() {
      // console.log(this.$store.state.userInfo.user_id);
      this.axios.post(
        "/relation/User_Card/concernList",
        {
          user_id: this.$store.state.userInfo.user_id,
          page: 1,
          cate: "my",
          rows: 3
        },
        data => {
          if (data.status == "success") {
            this.followPeople = data.rows;
          }
        }
      );
    },
    getHistory() {
      // console.log(this.$store.state.userInfo.user_id);
      this.axios.post(
        "/relation/User_Card/browseList",
        {
          user_id: this.$store.state.userInfo.user_id,
          page: 1,
          cate: "my",
          rows: 3
        },
        data => {
          if (data.status == "success") {
            this.historyPeople = data.rows;
          }
        }
      );
    },
    getMineData() {
      this.axios.post(
        "/relation/Person_Service/userOrgCircle",
        {
          user_id: this.$store.state.userInfo.user_id,
          source: 1,
          page: 1,
          rows: 3
        },
        data => {
          if (data.status == "success") {
            this.minePeople = data.rows;
          } else {
          }
        }
      );
    },
    getKnowData() {
      this.axios.post(
        "/relation/Person_Service/userOrgCircle",
        {
          user_id: this.$store.state.userInfo.user_id,
          source: 2,
          page: 1,
          rows: 3
        },
        data => {
          if (data.status == "success") {
            this.knowPeople = data.rows;
          } else {
          }
        }
      );
    },
    getBadData() {
      this.axios.post(
        "/relation/Person_Service/userPitCircle",
        {
          user_id: this.$store.state.userInfo.user_id,
          rows: 3
        },
        data => {
          if (data.status == "success") {
            this.badPeople = data.rows;
          } else {
          }
        }
      );
    },
    // 个人 跳转到名片
    openCard(type, item) {
      let query = {
        target_id: item.target_id,
        card_name: item.card_name
      };
      if (type == "trustMe") {
        query.target_id = item.source_id;
      }
      let { href } = this.$router.resolve({
        path: "/personalCard",
        query: query
      });
      if (type == "trustMe") {
        window.open(href, item.card_name + item.source_id);
      } else {
        window.open(href, item.card_name + item.target_id);
      }
    },
    //公司 跳转到表格
    openTable(type) {
      let { href } = this.$router.resolve({
        path: "/personService",
        query: {
          type: type
        }
      });
      window.open(href);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.enterpriseCircle_content {
  width: 100%;
  .main_content {
    position: relative;
    width: 1200px;
    padding: 30px;
    margin: 30px auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-radius: 40px;
    border: 1px solid #a9a9a9;
  }
  .person_main_content {
    display: block;
    .row_one {
      display: flex;
      justify-content: space-between;
    }
    .row_two {
      width: 1000px;
      margin: 20px auto 0;
      display: flex;
      justify-content: space-around;
    }
  }
  // 三角形
  .downOut {
    position: absolute;
    top: 444px;
    left: 600px;
    width: 0;
    height: 0;
    border-width: 30px;
    border-style: solid;
    border-color: #a9a9a9 transparent transparent transparent;
  }
  .downIn {
    position: absolute;
    top: -30px;
    left: -29px;
    width: 0;
    height: 0;
    border-width: 29px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
  .upOut {
    position: absolute;
    top: -60px;
    left: 600px;
    width: 0;
    height: 0;
    border-width: 30px;
    border-style: solid;
    border-color: transparent transparent #a9a9a9 transparent;
  }
  .upIn {
    position: absolute;
    top: -28px;
    left: -29px;
    width: 0;
    height: 0;
    border-width: 29px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
  .circle {
    position: relative;
    width: 360px;
    height: 180px;
    border: 1px solid #a9a9a9;
    border-radius: 90px;
    text-align: center;
    .circleTitle {
      margin-top: 16px;
      font-size: 18px;
      font-weight: bolder;
    }
    .avatarImg {
      border-radius: 50%;
    }
  }
  .peopleList {
    // margin-top: -30px;
    width: 300px;
    margin: 15px auto 0;
    display: flex;
    justify-content: space-around;
    .onePerson {
      // position: absolute;
      width: 70px;
      height: 70px;
      cursor: pointer;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
  }
  // 查看更多
  .link_color {
    color: rgb(58, 142, 230);
    cursor: pointer;
  }
  .more {
    position: absolute;
    bottom: 20px;
    left: 150px;
    font-size: 14px;
  }
  .myself {
    width: 120px;
    height: 120px;
    margin: 55px auto;
    .myAvatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
  }
}
</style>