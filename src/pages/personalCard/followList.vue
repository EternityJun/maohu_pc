<template>
  <div id="listPage">
    <el-button type="text" icon="el-icon-arrow-left" @click="handleClickBack">返回</el-button>
    <div class="searchCon">
      <el-input class="input" v-model="searchName" clearable placeholder="请输入人员名称" @keyup.enter.native="searchPerson(activeName)" @clear="searchPerson(activeName)"></el-input>
      <el-button type="primary" @click="searchPerson(activeName)">搜索</el-button>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="浏览" name="history">
        <div class="listCon">
          <el-main style="padding:0" v-loading="isShowLoad" v-if='activeName=="history"'>
            <div v-for="(item,index) in historyList" :key="index">
              <div class="oneItem">
                <div class="leftInfo">
                  <div class="leftUp">
                    <div class="avatar" @click="handleClickRyList(item)"><img :src="item.card_avatar"></div>
                    <div class="name_post">
                      <div class="name">{{item.card_name}}</div>
                      <div class="post">{{item.comp_duty==null||item.comp_duty==""?"暂无职位":item.comp_duty}}</div>
                    </div>
                  </div>
                  <div>{{item.comp_name==null||item.comp_name==""?"暂无公司":item.comp_name}}</div>
                </div>
                <div class="rightInfo">
                  <div>{{item.phone_one}}</div>
                  <div>{{item.wechat_id==null||item.wechat_id==""?"暂无微信":item.wechat_id}}</div>
                  <div>{{item.comp_address==null||item.comp_address==""?"暂无地址":item.comp_address}}</div>
                </div>
              </div>
            </div>
            <div class="noMore" v-if="historyData">暂无更多数据</div>
            <el-pagination background layout="prev, pager, next" @current-change="changePage1" :total="historyTotal" :current-page.sync="historyPage">
            </el-pagination>
          </el-main>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关注" name="follow">
        <div class="listCon">
          <el-main style="padding:0" v-loading="isShowLoad" v-if='activeName=="follow"'>
            <div v-for="(item,index) in followList" :key="index">
              <div class="oneItem">
                <div class="leftInfo">
                  <div class="leftUp">
                    <div class="avatar" @click="handleClickRyList(item)"><img :src="item.card_avatar"></div>
                    <div class="name_post">
                      <div class="name">{{item.card_name}}</div>
                      <div class="post">{{item.comp_duty==null||item.comp_duty==""?"暂无职位":item.comp_duty}}</div>
                    </div>
                  </div>
                  <div>{{item.comp_name==null||item.comp_name==""?"暂无公司":item.comp_name}}</div>
                </div>
                <div class="rightInfo">
                  <div>{{item.phone_one}}</div>
                  <div>{{item.wechat_id==null||item.wechat_id==""?"暂无微信":item.wechat_id}}</div>
                  <div>{{item.comp_address==null||item.comp_address==""?"暂无地址":item.comp_address}}</div>
                </div>
              </div>
            </div>
            <div class="noMore" v-if="followData">暂无更多数据</div>
            <el-pagination background layout="prev, pager, next" @current-change="changePage2" :total="followTotal" :current-page.sync="followPage">
            </el-pagination>
          </el-main>
        </div>
      </el-tab-pane>
      <el-tab-pane label="信任" name="trust">
        <div class="listCon">
          <el-main style="padding:0" v-loading="isShowLoad" v-if='activeName=="trust"'>
            <div v-for="(item,index) in trustList" :key="index">
              <div class="oneItem">
                <div class="leftInfo">
                  <div class="leftUp">
                    <div class="avatar" @click="handleClickRyList(item)"><img :src="item.card_avatar"></div>
                    <div class="name_post">
                      <div class="name">{{item.card_name}}</div>
                      <div class="post">{{item.comp_duty==null||item.comp_duty==""?"暂无职位":item.comp_duty}}</div>
                    </div>
                  </div>
                  <div>{{item.comp_name==null||item.comp_name==""?"暂无公司":item.comp_name}}</div>
                </div>
                <div class="rightInfo">
                  <div>{{item.phone_one}}</div>
                  <div>{{item.wechat_id==null||item.wechat_id==""?"暂无微信":item.wechat_id}}</div>
                  <div>{{item.comp_address==null||item.comp_address==""?"暂无地址":item.comp_address}}</div>
                </div>
              </div>
            </div>
            <div class="noMore" v-if="trustData">暂无更多数据</div>
            <el-pagination background layout="prev, pager, next" @current-change="changePage3" :total="trustTotal" :current-page.sync="trustPage">
            </el-pagination>
          </el-main>
        </div>
      </el-tab-pane>
      <el-tab-pane label="靠谱" name="reliable">
        <div class="listCon">
          <el-main style="padding:0" v-loading="isShowLoad" v-if='activeName=="reliable"'>
            <div v-for="(item,index) in reliableList" :key="index">
              <div class="oneItem">
                <div class="leftInfo">
                  <div class="leftUp">
                    <div class="avatar" @click="handleClickRyList(item)"><img :src="item.card_avatar"></div>
                    <div class="name_post">
                      <div class="name">{{item.card_name}}</div>
                      <div class="post">{{item.comp_duty==null||item.comp_duty==""?"暂无职位":item.comp_duty}}</div>
                    </div>
                  </div>
                  <div>{{item.comp_name==null||item.comp_name==""?"暂无公司":item.comp_name}}</div>
                </div>
                <div class="rightInfo">
                  <div>{{item.phone_one}}</div>
                  <div>{{item.wechat_id==null||item.wechat_id==""?"暂无微信":item.wechat_id}}</div>
                  <div>{{item.comp_address==null||item.comp_address==""?"暂无地址":item.comp_address}}</div>
                </div>
              </div>
            </div>
            <div class="noMore" v-if="reliableData">暂无更多数据</div>
            <el-pagination background layout="prev, pager, next" @current-change="changePage4" :total="reliableTotal" :current-page.sync="reliablePage">
            </el-pagination>
          </el-main>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "followList",
  props: ["userId", "tabName"],
  data() {
    return {
      activeName: "",
      searchName: "",
      isShowLoad: false,
      //浏览记录
      // searchName1: "",
      historyTotal: 0,
      historyList: [],
      historyPage: 1,
      historyData: false, //控制“暂无更多数据”的出现
      //我的关注
      // searchName2: "",
      followTotal: 0,
      followList: [],
      followPage: 1,
      followData: false,
      // 信任我的人
      // searchName3: "",
      trustTotal: 0,
      trustList: [],
      trustPage: 1,
      trustData: false,
      //靠谱
      // searchName4: "",
      reliableTotal: 0,
      reliableList: [],
      reliablePage: 1,
      reliableData: false
    };
  },
  created() {
    // this.activeName = "history";
    // this.getHistoryList();
    // this.getFollowList();
    // this.getTrustList();
    // this.getReliableList();
  },
  methods: {
    // 点击返回按钮
    handleClickBack() {
      this.$emit("handleChildData", { showTab: 6 });
    },
    // 浏览记录 列表数据
    getHistoryList() {
      this.isShowLoad = true;
      this.axios.post(
        "/relation/User_Card/browseList",
        {
          user_id: this.userId,
          cate: "his",
          name: this.searchName,
          page: this.historyPage,
          rows: 4
        },
        data => {
          if (data.status === "success") {
            this.historyList = data.rows;
            this.historyTotal = data.total;
            this.historyData = false;
          } else {
            this.historyList = [];
            this.historyTotal = 0;
            this.historyData = true;
          }
          this.isShowLoad = false;
        }
      );
    },
    // 我的关注 列表数据
    getFollowList() {
      this.isShowLoad = true;
      this.axios.post(
        "/relation/User_Card/concernList",
        {
          user_id: this.userId,
          name: this.searchName,
          cate: "his",
          page: this.followPage,
          rows: 10
        },
        data => {
          if (data.status === "success") {
            this.followList = data.rows;
            this.followTotal = data.total;
            this.followData = false;
          } else {
            this.followList = [];
            this.followTotal = 0;
            this.followData = true;
          }
          this.isShowLoad = false;
        }
      );
    },
    // 信任我的列表
    getTrustList() {
      this.isShowLoad = true;
      this.axios.post(
        "/relation/User_Card/trustList",
        {
          user_id: this.userId,
          name: this.searchName,
          cate: "his",
          page: this.trustPage,
          status: 1,
          rows: 10
        },
        data => {
          if (data.status === "success") {
            this.trustList = data.rows;
            this.trustTotal = data.total;
            this.trustData = false;
          } else {
            this.trustList = [];
            this.trustTotal = 0;
            this.trustData = true;
          }
          this.isShowLoad = false;
        }
      );
    },
    // 靠谱 列表数据
    getReliableList() {
      this.isShowLoad = true;
      this.axios.post(
        "/relation/User_Card/reliableList",
        {
          user_id: this.userId,
          cate: "his",
          name: this.searchName,
          page: this.reliablePage,
          rows: 10
        },
        data => {
          if (data.status === "success") {
            this.reliableList = data.rows;
            this.reliableTotal = data.total;
            this.reliableData = false;
          } else {
            this.reliableList = [];
            this.reliableTotal = 0;
            this.reliableData = true;
          }
          this.isShowLoad = false;
        }
      );
    },
    changePage1(val) {
      this.historyPage = val;
      this.getHistoryList();
    },
    changePage2(val) {
      this.followPage = val;
      this.getFollowList();
    },
    changePage3(val) {
      this.trustPage = val;
      this.getTrustList();
    },
    changePage4(val) {
      this.reliablePage = val;
      this.getReliableList();
    },
    searchPerson(type) {
      if (type == "history") {
        this.getHistoryList();
      } else if (type == "follow") {
        this.getFollowList();
      } else if (type == "trust") {
        this.getTrustList();
      } else if (type == "reliable") {
        this.getReliableList();
      }
    },
    // 点击列表跳转至人员名片
    handleClickRyList(item) {
      let { href } = this.$router.resolve({
        path: "/personalCard",
        query: {
          target_id: item.source_id,
          card_name: item.card_name
        }
      });
      window.open(href);
    }
  },
  watch: {
    activeName(val) {
      this.searchName = "";
      if (val == "history") {
        this.getHistoryList();
      } else if (val == "follow") {
        this.getFollowList();
      } else if (val == "trust") {
        this.getTrustList();
      } else if (val == "reliable") {
        this.getReliableList();
      }
    },
    tabName: {
      immediate: true,
      handler: function(val) {
        console.log(val);
        if (val) {
          this.activeName = val;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
#listPage {
  position: relative;
  padding-top: 60px;
  width: 100%;
  height: 100%;
}
.searchCon {
  width: 50%;
  position: absolute;
  top: 58px;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  .input {
    margin-right: 10px;
  }
}
.oneItem {
  height: 120px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #d5d5d5;
  .leftInfo {
    .leftUp {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .name_post {
        div {
          height: 30px;
          line-height: 30px;
        }
        .name {
          font-weight: bolder;
        }
        .post {
          color: #999;
        }
      }
      .avatar img {
        cursor: pointer;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
  }
  .rightInfo {
    color: #999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    div {
      width: 330px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.noMore {
  width: 130px;
  margin: 0 auto;
  color: #999;
}
</style>
