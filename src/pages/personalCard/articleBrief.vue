<template>
  <div class="art-brief">
    <el-button type="text" icon="el-icon-arrow-left" @click="handleClickBack">返回</el-button>
    <div class="art-brief-title">建投条详情</div>
    <!-- 列表的每一项 -->
    <div class="t-p-i">
      <!-- 相同样式的头部 -->
      <div class="list-top">
        <div class="l-t-left">
          <div class="img">
            <img :src="showBrief.avatar ? showBrief.avatar : '../../assets/CAT-02.png'" alt />
          </div>
          <div class="info">
            <span class="name">{{showBrief.username}}</span>
            <span class="time">{{showBrief.created}}</span>
          </div>
        </div>
        <i
          class="iconfont icon-delete d-i"
          v-if="showBrief.user_id == user_id"
          @click="handleDelIcon"
        ></i>
      </div>
      <!-- 建头条内容样式 -->
      <div class="list-bottom" v-if="showBrief.id">
        <div class="art-content">{{showBrief.content}}</div>
        <div class="art-img">
          <img
            @click="handleClickImg(s_index)"
            v-for="(one, s_index) in showBrief.images"
            :key="s_index"
            :src="one"
            alt
            class="img"
          />
        </div>
        <div class="art-footer">
          <span class="read-num">{{showBrief.read_volume}}</span>
          <span class="zan-num" @click.stop="handleZanIcon">
            <i
              class="iconfont icon-zan r-i"
              :style="{color: showBrief.is_upvote === 1 ? '#409eff' : ''}"
            ></i>
            {{showBrief.upvote_cnt ? showBrief.upvote_cnt : 0}}
          </span>
        </div>
      </div>
    </div>
    <!-- 建投条 查看图片大图弹窗 -->
    <el-dialog title="查看大图" :visible.sync="dialogVisible" width="60%">
      <el-carousel height="500px" trigger="click" :autoplay="autoplay">
        <el-carousel-item v-for="(item, index) in this.curBrief.images" :key="index">
          <el-image style="width: 100%;height:100%;" :src="item" fit="contain"></el-image>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["curBrief", "curTab"],
  data() {
    return {
      dialogVisible: false, // 查看大图 弹窗显示
      autoplay: false, // 走马灯 不自动播放
      user_id: "",
      showBrief: {},
      curIndex: 0 // 幻灯片 当前展示的图片索引
    };
  },
  created() {
    this.showBrief = this.curBrief;
    this.user_id = this.$store.state.userInfo.user_id;
    // this.getArticleList();
  },
  destroyed() {
    // 调用阅读接口
    this.getReadVolume();
  },
  methods: {
    conH(nVal, lVal) {
      console.log(nVal, lVal, "change");
      if (lVal != -1) {
        this.curIndex = lVal;
      }
    },
    // 点击返回按钮
    handleClickBack() {
      this.$emit("handleChildData", { showTab: 7, curTab: this.curTab });
    },
    // 请求当前建投条的详细信息
    getArticleList() {
      this.axios.post(
        "/relation/service/articleList",
        {
          id: this.curBrief.id,
          friend_id: this.curBrief.user_id,
          type: "content",
          user_id: this.user_id
        },
        res => {
          if (res.status === "success") {
            this.showBrief.is_upvote = rows;
          }
        }
      );
    },
    // 请求阅读接口
    getReadVolume() {
      this.axios.post(
        "/relation/service/readVolume",
        {
          id: this.curBrief.id
        },
        res => {
          if (res.status === "success") {
          }
        },
        err => {}
      );
    },
    // 点击图片 查看大图
    handleClickImg(index) {
      this.curIndex = index;
      this.dialogVisible = true;
    },
    // 点击删除图标
    handleDelIcon() {
      this.$confirm("确定删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getDelArticle();
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
      
    },
    // 调用删除建投条接口
    getDelArticle() {
      this.axios.post(
        "/relation/service/delArticle",
        {
          id: this.showBrief.id
        },
        data => {
          if (data.status == "success") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            if (this.showBrief.filename) {
              this.getDelUpload();
            }
            // this.showBrief = {};
            this.$emit("handleChildData", { showTab: 7, curTab: this.curTab });
          }
        }
      );
    },
    // 调用删除图片接口
    getDelUpload() {
      this.axios.post(
        "/index/common/delUpload",
        {
          filename: this.showBrief.filename
        },
        data => {
          if (data.status === "success") {
          }
        }
      );
    },
    // 点击点赞图标
    handleZanIcon() {
      let item = this.curBrief;
      let type = "";
      if (item.is_upvote === 0 || item.is_upvote === "") {
        // 没有点赞 调用点赞接口
        type = 1;
      } else {
        // 已经点赞 调用取消点赞接口
        type = 0;
      }
      this.axios.post(
        "/relation/service/upvote",
        {
          id: item.id,
          user_id: this.user_id,
          type: type
        },
        data => {
          if (data.status == "success") {
            // 点赞成功
            this.showBrief.is_upvote = type;
            this.showBrief.upvote_cnt =
              type === 0
                ? this.showBrief.upvote_cnt - 1
                : this.showBrief.upvote_cnt + 1;
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
// 全部、建投条、业务列表样式
.art-brief {
  padding-top: 60px;
  .art-brief-title {
    //   padding: 10px 0;
    padding-bottom: 10px;
    text-align: center;
    font-size: 22px;
    border-bottom: 1px solid #f3f3f3;
  }
  .d-i {
    height: 25px;
    line-height: 25px;
    font-size: 18px;
    text-align: right;
    color: #999;
  }
  .t-p-i {
    padding: 10px 0;
    .list-top {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      // align-items: center;
      .l-t-left {
        display: flex;
        align-items: center;
      }
      .img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-weight: bold;
          font-size: 20px;
        }
        .time {
          color: #999;
          font-size: 16px;
          margin-top: 5px;
        }
      }
    }
    .art-content {
      padding: 0 10px;
      margin-top: 5px;
    }
    .art-img {
      display: flex;
      flex-wrap: wrap;
      padding-left: 10px;
      margin: 5px 0;
      .img {
        margin-right: 5px;
        margin-bottom: 5px;
        width: 200px;
        height: 150px;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
    .art-footer {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999;
      .read-num {
      }
      .zan-num {
        color: #333;
        .r-i {
          color: #999;
          font-size: 18px;
          margin-right: 5px;
        }
      }
    }
    .list-bottom1 {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999;
      .pro-left {
        flex: 1;
        .name {
          color: #409eff;
        }
        .other {
          font-size: 12px;
        }
      }
      .pro-right {
        width: 16px;
      }
    }
  }
}
</style>