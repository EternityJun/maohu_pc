<template>
  <div class="chat-view">
    <div class="chat-top">
      <span class="iconfont icon-i-back back" @click="handleClickBack"></span>
      <span class="bar-title">{{friend.name}}</span>
    </div>
    <div class="chat-btm">
      <el-input v-model="inputContent" clearable></el-input>
      <el-button v-show="inputContent" type="primary" class="send-btn" @click="sendMsg('txt')">发送</el-button>
      <el-upload
        class="card-avatar-box"
        :action="imgUrl"
        :show-file-list="false"
        :on-success="uploadImgSuccess"
        :on-error="uploadImgError"
        :before-upload="beforeImgUpload"
        :limit="3"
      >
        <el-button v-show="!inputContent" class="send-btn" type="primary"><span class="iconfont icon-add"></span></el-button>
      </el-upload>
    </div>
    <div
      v-infinite-scroll="getMsg"
      :infinite-scroll-disabled="status.isLoading"
      class="chat-main"
      ref="chatBox"
    >
      <div
        v-for="(item, index) in chatList"
        :key="item.id"
        class="chat-item"
      >
        <div v-if="showChatTime(index)" class="timestamp">
          {{item.created}}
        </div>
        <div class="chat-item-wrap" :class="{me: userInfo.user_id == item.sender_id}">
          <div class="user-avatar">
            <img :src="avatarImg(item.avatar)" class="interit-img"/>
          </div>
          <div class="user-content">
            <div class="content-box">
              <span v-if="item.type === '文本'" class="content-text">{{item.content}}</span>
              <el-image
                v-if="item.type === '图片'"
                :src="imageUrl(item.content)" 
                :preview-src-list="chatImgs"
                class="interit-img"
                @click="showBigImg(imageUrl(item.content))"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </div>
          <div class="content-status" :class="{read: item.status}">
            {{item.status | readStatus}}
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      fullscreen
      :visible.sync="isShowBigImg"
      :before-close="closeBigImgDialog"
    >
      <el-image :src="bigImg">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'ChatView',
  filters: {
    readStatus(status) {
      return status ? '已读' : '未读'
    }
  },
  data() {
    return {
      bigImg: '',
      chatList: [],
      chatIds: [],
      inputContent: '',
      isShowBigImg: false,
      timeout: 300000,
      pullTimer: null,
      openPull: false,
      scrollThrottleTimer: null,
      status: {
        isShowLoadMore: false,
        loadMoreStatus: 'loading',
        isLoading: false,
      },
      page: 1,
      rows: 15,
    };
  },
  computed:{
    ...mapState(["userInfo"]),
    friend() {
      const friend = {
        id: this.$route.query.target_id || '17',
        name: this.$route.query.card_name || '测试',
      }
      return friend;
    },
    // 查看图片地址
    imageUrl() {
      return img =>(process.env.NODE_ENV === 'development'
        ? `http://114.215.223.123/MaoHu/public/files/options/${img}`
        : `https://wechat.cdzjkl.com/files/options/${img}`);
    },
    // 上传图片接口
    imgUrl() {
      return `${process.env.NODE_ENV === 'development' ? 'https://test.cdzjkl.com/MaoHu/public/index.php' : 'https://mobile.cdzjkl.com/MaoHuTest/public/index.php'}/index/common/uploadImage`;
      // return "https://wechat.cdzjkl.com/index/common/uploadImage";
    },
    chatImgs() {
      return this.chatList.filter(el => el.type === '图片');
    }
  },
  created() {
    this.getMsg();
  },
  methods: {
    avatarImg(img) {
      return img || require("@/assets/default_avator.png");
    },
    handleClickBack() {
      this.$emit("handleChildData", { showTab: 8 });
    },
    beforeImgUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    closeBigImgDialog() {
      this.isShowBigImg = false;
    },
    showBigImg(url) {
      this.bigImg = url;
      this.isShowBigImg = true;
    },
    showChatTime(index) {
      if (index === 0) {
        return true;
      }
      const preTime = new Date(this.chatList[index - 1].created);
      const indexTime = new Date(this.chatList[index].created);
      if (preTime - indexTime >= this.timeout) {
        return true;
      }
      return false;
    },
    getMsg() {
      if (this.status.isLoading) return;
      this.status.isLoading = true;
      this.status.isShowLoadMore = true;
      this.status.loadMoreStatus = 'loading';
      const params = {
        friend_id: this.friend.id,
        page: this.page,
        rows: this.rows,
      };
      this.axios.post(
        '/relation/user_message/windowMsg',
        params,
        res => {
          this.status.isLoading = false;
          this.status.isShowLoadMore = false;
          if (res.status === 'success') {
            if (this.page === 1) {
              this.chatList = res.rows;
              this.chatIds = this.chatList.map(el => el.id);
            } else {
              // 此处进行信息去重，
              const list = res.rows.filter(el => !this.chatIds.includes(el.id));
              this.chatList = this.chatList.concat(list);
              // 将新添加的数据加入验证中
              this.chatIds = this.chatIds.concat(list.map(el => el.id));
            }
            this.page += 1;
          } else {
            if (this.page === 1) {
              this.chatList = [];
              this.chatIds = [];
              this.total = 0;
            }
          }
          // 在第一次请求结束后开启新信息的访问
          if (!this.openPull) {
            this.pullTimer = setTimeout(this.getNewInfo, 10000);
            this.openPull = true;
            // 判断当前是否存在未读信息，存在则标记为已读
            if (this.chatList.filter(el => !el.status && el.sender_id !== this.userInfo.user_id).length) {
              this.updateChat();
            }
            // 存在数据 则将窗体拉至最后一项
            if (this.chatList.length) {
              this.$nextTick(() =>{
                this.$refs.chatBox.children[0].scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
              })
            }
          }
        }
      );
    },
    // 更新信息
    getNewInfo() {
      if (!this.openPull) return;
      const params = {
        friend_id: this.friend.id,
        page: 1,
        rows: 10,
      };
      this.axios.post(
        '/relation/user_message/windowMsg',
        params,
        res => {
          if (res.status === 'success') {
            res.rows.reverse();
            const list = [];
            const refreshList = []
            // 将存在的信息和新的信息进行分开处理
            res.rows.forEach(el => {
              if (!this.chatIds.includes(el.id)) {
                list.push(el);
              } else {
                refreshList.push(el);
              }
            })
            // 将旧信息内存在的情况进行更新
            this.chatList = this.chatList.map(el => {
              let data = el
              refreshList.some(item => {
                if (item.id === data.id) {
                  data = item;
                  return true;
                }
                return false;
              })
              return data;
            })
            // 添加新信息
            this.chatList = list.concat(this.chatList);
            // 添加新信息id
            this.chatIds = list.map(el => el.id).concat(this.chatIds);
            // 更新当前新信息的未读情况
            if (list.filter(el => !el.status && el.sender_id !== this.user_id).length) {
              this.updateChat();
            }
            // 当位于顶部的时候 拉至窗体最上的新信息
            if (this.$refs.chatBox.scrollTop < 21) {
              this.$nextTick(() => {
                this.$refs.chatBox.children[0].scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
              })
            }
          }
          clearTimeout(this.pullTimer);
          if (!this.openPull) return;
          this.pullTimer = setTimeout(this.getNewInfo, 10000);
        }
      )
    },
    // 获取当前用户发出的最新的一条消息
    newestMsg() {
      const params = {
        friend_id: this.friend.id,
      }
      this.axios.post(
        '/relation/user_message/newestMsg',
        params,
        res => {
          if (res.status === 'success') {
            this.chatList.unshift(res.rows);
            this.chatIds.unshift(res.rows.id);
            this.$nextTick(() => {
              this.$refs.chatBox.children[0].scrollIntoView({
                  behavior: "smooth",
                  block: "start",
              });
            })
          }
        }
      )
    },
    sendMsg(type, info) {
      if (type === 'txt' && this.inputContent === '') return;
      if (type !== 'txt' && !info) return; 
      const params = {
        sender_id: this.userInfo.user_id,
        receiver_id: this.friend.id,
        content: type === 'txt' ? this.inputContent : info,
        content_type: type === 'txt' ? '文本' : '图片',
        type: 1,
      }
      if (type === 'txt') {
        this.inputContent = '';
        this.axios.post(
          '/relation/user_message/saveMsg',
          params,
          res => {
            if (res.status === 'success') {
              this.newestMsg();
            } else {
              uni.showToast({
                icon: 'none',
                title: '信息发送失败',
              });
            }
          },
        )
        return;
      }
      this.axios.post(
        '/relation/user_message/saveMsg',
        params,
        res => {
          if (res.status === 'success') {
            this.newestMsg();
          } else {
            uni.showToast({
              icon: 'none',
              title: '信息发送失败',
            });
          }
        },
      );
    },
    updateChat() {
      const params = {
        friend_id: this.friend_id,
        type: 2,
      }
      this.$api(
        'relation/user_message/saveMsg',
        params,
        res => {},
      )
    },
    uploadImgError(res) {
      this.$message.error(res.message);
    },
    uploadImgSuccess(res, file) {
      if (res.status === 'success') {
        this.sendMsg('img', res.data.filename_time)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: 100%;
  height: 100%;
  // width: 700px;
  height: 570px;
  --height-def: 50px;
  overflow: hidden;
}
.chat-top {
  width: 100%;
  height: var(--height-def);
  line-height: var(--height-def);
  background: #45a4fc;
  color: #fff;
}
.chat-main {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background: #f5f5f5;
  flex: 1;
}
.chat-btm {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #d5d5d5;
  padding: 0 10px;
  width: 100%;
  height: var(--height-def);
  background: #fafafa;
}
.back {
  padding: 0 10px;
  cursor: pointer;
}
.bar-title {
  padding-left: 10px;
}
.send-btn {
  margin-left: 10px;
}
.chat-item {
  .timestamp {
    margin-top: 5px;
    padding: 10px 0;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
.chat-item-wrap {
  position: relative;
  display: flex;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  &:last-child {
    margin-bottom: 10px;
  }
  .user-content {
    max-width: 300px;
    margin: 0 10px;
    display: flex;
    flex: 1;
  }
  .content-box {
    position: relative;
    border-radius: 4px;
    margin: 5px;
    padding: 5px;
    min-width: 28px;
    max-width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    line-height: 22px;
    word-break: break-all;
    &::before {
      content: '';
      position: absolute;
      z-index: 2;
      top: 12px;
      left: -10px;
      border-top: 5px solid transparent;
      border-left: 5px solid transparent;
      border-right: 5px solid #fff;
      border-bottom: 5px solid transparent;
    }
  }
  .content-status {
    position: absolute;
    bottom: -5px;
    left: 61px;
    color: #999;
    font-size: 12px;
  }
  .content-options {
    position: absolute;
    top: -24px;
    background: #000;
    .option-item {
      padding: 2px 5px;
      color: #fff;
    }
    &::before {
      content: '';
      position: absolute;
      z-index: 2;
      left: 50%;
      transform: translateX(-50%);
      bottom: -9px;
      border-top: 5px solid #000;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
  }
}
.me {
  flex-direction: row-reverse;
  .content-box {
    &::before {
      display: none;
    }
    &::after {
      content: '';
      position: absolute;
      z-index: 2;
      top: 12px;
      left: none;
      right: -10px;
      border-top: 5px solid transparent;
      border-left: 5px solid #fff;
      border-right: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
  }
  .user-content {
    justify-content: flex-end;
  }
  .content-status {
    left: inherit;
    right: 61px;
  }
}
.user-avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  overflow: hidden;
}
.content-text {
  font-size: 14px;
}
.interit-img {
  width: 100%;
  height: 100%;
  cursor: pointer;

  & /deep/ .image-slot {
    width: 100px;
    height: 50px;
    line-height: 50px;
    background: #f5f7fa;
    text-align: center;
    color: #999;
  }
}
.read {
  color: #45A4FC;
}
</style>
