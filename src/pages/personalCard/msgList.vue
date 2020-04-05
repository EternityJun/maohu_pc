<template>
  <div id="listPage">
    <el-button type="text" icon="el-icon-arrow-left" @click="handleClickBack">返回</el-button>
    <div class="searchCon">
      <el-input class="input" v-model="searchName" clearable placeholder="请输入人员名称" @keyup.enter.native="searchPerson(activeName)" @clear="searchPerson(activeName)"></el-input>
      <el-button type="primary" @click="searchPerson(activeName)">搜索</el-button>
      <el-button v-if="activeName=='friend'" type="primary" @click="openApply">好友申请</el-button>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="私信" name="msg">
        <div class="listCon">
          <el-main style="padding:0" v-loading="isShowLoad" v-if='activeName=="msg"'>
            <div v-for="(item,index) in msgList" :key="index">
              <div class="oneItem">
                <div class="leftInfo">
                  <div class="leftUp">
                    <div class="avatar" @click="toChatPage(item)"><img :src="item.card_avatar"></div>
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
            <div class="noMore" v-if="msgData">暂无更多数据</div>
            <el-pagination background layout="prev, pager, next" @current-change="changePage1" :total="msgTotal" :current-page.sync="msgPage">
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
      <el-tab-pane label="好友" name="friend">
        <div class="listCon">
          <el-main style="padding:0" v-loading="isShowLoad" v-if='activeName=="friend"'>
            <div v-for="(item,index) in friendList" :key="index">
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
            <div class="noMore" v-if="friendData">暂无更多数据</div>
            <el-pagination background layout="prev, pager, next" @current-change="changePage3" :total="friendTotal" :current-page.sync="friendPage">
            </el-pagination>
          </el-main>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--处理好友申请窗口-->
    <el-dialog title="好友申请" :visible.sync="showApply" width="60%" top="2vh">
      <div style="padding:0 20px">
        <!--第一排 搜索-->
        <div>
          <el-input v-model="applySearch" clearable placeholder="请输入人员名称" style="width:400px;" @keyup.enter.native="searchApply" @clear="searchApply"></el-input>
          <el-button type="primary" @click="searchApply">搜索</el-button>
        </div>
        <!--第二排的表格-->
        <el-table :data="applyList" v-loading="applyLoading" border style="margin-top:10px;">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(applyPage-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="card_name" label="人员名称" width="120" align="center"></el-table-column>
          <el-table-column prop="phone_one" label="电话号码" width="130" align="center"></el-table-column>
          <el-table-column prop="comp_name" label="公司名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center" style="display:flex" width="380">
            <template slot-scope="scope">
              <el-select v-if="scope.row.status=='待接受'" clearable style="width:150px;margin-left:20px" v-model="status[scope.$index]" placeholder="请选择" :disabled="statuDisabled[scope.$index]">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" @click.native="openRemark(scope.$index,scope.row,$event)">
                </el-option>
              </el-select>
              <el-select v-if="scope.row.status!='待接受'" style="width:150px;margin-left:20px" v-model="scope.row.status" disabled>
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-button size="mini" style="margin-left:30px" @click="delApply(scope.row)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="knowAllBtn" align="right" style="margin-top:10px" @current-change="applyCurrentChange" :current-page.sync="applyPage" :page-size="10" background layout="total,prev, pager, next" :total="count>100?100:count" :page-count="10"></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "followList",
  props: ["tabName"],
  data() {
    return {
      activeName: "",
      searchName: "",
      isShowLoad: false,
      //浏览记录
      // searchName1: "",
      msgTotal: 0,
      msgList: [],
      msgPage: 1,
      msgData: false, //控制“暂无更多数据”的出现
      //我的关注
      // searchName2: "",
      followTotal: 0,
      followList: [],
      followPage: 1,
      followData: false,
      // 好友
      friendTotal: 0,
      friendList: [],
      friendPage: 1,
      friendData: false,
      showApply: false,
      count: 0,
      applyList: [],
      applyPage: 1, //申请页数
      applyLoading: false,
      applySearch: "", //申请列表搜索值
      statusOptions: [
        {
          value: "1",
          label: "同意"
        },
        {
          value: "3",
          label: "不同意"
        }
      ],
      statuDisabled: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      status: []
    };
  },
  created() {
    // this.activeName = "msg";
    // this.getMsgList();
    // this.getFollowList();
    // this.getFriendList();
  },
  methods: {
    // 点击返回按钮
    handleClickBack() {
      this.$emit("handleChildData", { showTab: 6 });
    },
    // 私信 列表数据
    getMsgList() {
      this.isShowLoad = true;
      this.axios.post(
        "/relation/user_message/listMsg",
        {
          user_id: this.$store.state.userInfo.user_id,
          name: this.searchName,
          page: this.msgPage,
          rows: 4
        },
        data => {
          if (data.status === "success") {
            this.msgList = data.rows;
            this.msgTotal = data.total;
            this.msgData = false;
          } else {
            this.msgList = [];
            this.msgTotal = 0;
            this.msgData = true;
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
          user_id: this.$store.state.userInfo.user_id,
          name: this.searchName,
          cate: "my",
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
    // 我的好友 列表数据
    getFriendList() {
      this.isShowLoad = true;
      this.axios.post(
        "/relation/User_Card/friendList",
        {
          user_id: this.$store.state.userInfo.user_id,
          name: this.searchName,
          cate: "my",
          page: this.friendPage,
          status: 1,
          rows: 10
        },
        data => {
          this.count = data.count;
          if (data.status === "success") {
            this.friendList = data.rows;
            this.friendTotal = data.total;
            this.friendData = false;
          } else {
            this.friendList = [];
            this.friendTotal = 0;
            this.friendData = true;
          }
          this.isShowLoad = false;
        }
      );
    },
    changePage1(val) {
      this.msgPage = val;
      this.getMsgList();
    },
    changePage2(val) {
      this.followPage = val;
      this.getFollowList();
    },
    changePage3(val) {
      this.friendPage = val;
      this.getFriendList();
    },
    searchPerson(type) {
      if (type == "msg") {
        this.getMsgList();
      } else if (type == "follow") {
        this.getFollowList();
      } else if (type == "friend") {
        this.getFriendList();
      }
    },
    // 打开好友申请列表
    openApply() {
      this.showApply = true;
      this.applyStatus = [];
      this.getApply();
    },
    // 获取好友申请列表
    getApply() {
      this.applyLoading = true;
      //获取表格数据
      this.axios.post(
        "/relation/User_Card/friendList",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          user_id: this.$store.state.userInfo.user_id,
          page: this.applyPage,
          cate: "apply",
          name: this.applySearch,
          status: 1,
          rows: 10
        },
        data => {
          if (data.status == "success") {
            this.applyList = data.rows;
            this.count = data.count;
            // this.change.apply.remark = [];
          } else if (data.status == "failed" && this.applyPage != 1) {
            this.applyPage -= 1;
            this.getApply();
          } else {
            if (this.applyPage == 1) {
              this.count = 0;
              this.applyList = [];
            }
          }
          this.applyLoading = false;
        }
      );
    },
    // 搜索好友申请
    searchApply() {
      this.applyPage = 1;
      this.getApply();
    },
    // 好友申请翻页
    applyCurrentChange(val) {
      this.applyPage = val;
      // this.change.apply.savedRemark=[]
      this.getApply();
    },
    // 好友申请选择同意/拒绝
    openRemark(index, row, e) {
      console.log(e.target.innerText);
      // 拒绝
      if (e.target.innerText == "不同意") {
        this.$confirm("是否拒绝该用户好友请求？", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.axios.post(
              "/relation/Person_Service/checkUserUser ",
              {
                login_user_id: this.$store.state.userInfo.user_id,
                source_id: this.$store.state.userInfo.user_id,
                temp_id: row.con_id,
                target_id: row.source_id,
                status: 3
              },
              data => {
                if (data.status == "success") {
                  this.$message.success("已拒绝");
                  this.getApply();
                  this.getFriendList();
                }
              }
            );
          })
          .catch(() => {});
        // 同意
      } else if (e.target.innerText == "同意") {
        this.axios.post(
          "/relation/Person_Service/checkUserUser ",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            source_id: this.$store.state.userInfo.user_id,
            temp_id: row.con_id,
            target_id: row.source_id,
            target_name: row.card_name,
            status: 1
          },
          data => {
            if (data.status == "success") {
              this.$message.success("已同意");
              this.getApply();
              this.getFriendList();
            }
          }
        );
      }
    },
    // 删除好友申请列表
    delApply(row) {
      this.$confirm("是否确定删除该条申请？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.post(
            "/relation/Person_Service/delResUserTemp ",
            {
              id: row.con_id
            },
            data => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getApply();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击列表跳转至私信页
    toChatPage(item) {
      let { href } = this.$router.resolve({
        path: "/personalCard",
        query: {
          target_id: item.friend_id,
          name: item.card_name,
          showTab: 8
        }
      });
      window.open(href, item.card_name + item.friend_id);
    },
    // 点击列表跳转至人员名片
    handleClickRyList(item) {
      let { href } = this.$router.resolve({
        path: "/personalCard",
        query: {
          target_id: item.target_id,
          card_name: item.card_name
        }
      });
      window.open(href, item.card_name + item.target_id);
    }
  },
  watch: {
    activeName(val) {
      this.searchName = "";
      if (val == "msg") {
        this.getMsgList();
      } else if (val == "follow") {
        this.getFollowList();
      } else if (val == "friend") {
        this.getFriendList();
      }
    },
    tabName: {
      immediate: true,
      handler: function(val) {
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
