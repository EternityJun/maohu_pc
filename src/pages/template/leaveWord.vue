<!--留言-->
<template>
  <div>
    <p>共{{total}}条评论</p>
    <div id="content" v-loading="loading" style="margin-bottom:10px;max-height:500px;overflow-y:auto">
      <div v-if="leaveDatas">
        <div v-for="one in leaveDatas" :key="one.id" class="leave_row">
          <div class="leave_row_top">
            <img class="img_user" :src="one.headimgurl || user_logo" alt>
            <div>
              <div>
                <span>{{one.sender_name}}</span>
                <span class="color08c">({{one.gsmc}})</span>
              </div>
              <div class="leave_row_time">{{one.created}}</div>
            </div>
            <span v-if="one.user_id == $store.state.userInfo.user_id" @click="leaveWord_delete(one.id)" style="color: #999;cursor: pointer;width:20px;height:20px;margin: 3px 0 0 6px;">
              <i class="el-icon-delete"></i>
            </span>
          </div>
          <div class="leave_row_text">
            <p class="pointer" @click="onReply(one.id,one.id,one.sender_name,one.sender)">{{one.content}}</p>
          </div>
          <div class="leave_row_leavetexts">
            <div class="leavetexts_row" v-for="childrenOne in one.children" :key="childrenOne.id">
              <div class="color08c">{{childrenOne.sender_name}}：</div>
              <div class="pointer" @click="onReply(childrenOne.id,one.id,childrenOne.sender_name,childrenOne.sender)">
                <span class="color08c">@{{childrenOne.receiver_name}}</span>
                {{childrenOne.content}}
              </div>
              <span v-if="childrenOne.user_id == $store.state.userInfo.user_id" @click="leaveWord_delete(childrenOne.id)" style="color: #999;cursor: pointer;width:20px;height:20px;margin: 3px 0 0 6px;">
                <i class="el-icon-delete"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div @keyup.ctrl.enter="onSend" ref="textarea" contenteditable="true" placeholder="请输入内容" style="padding:6px 10px;height:50px;border:1px solid #dcdfe6;border-radius:4px;overflow-y:auto"></div>
    </div>
    <div style="color:#cccccc;font-size:14px;">Ctrl+Enter提交</div>
    <div style="text-align:right;padding-top:20px">
      <el-button type="success" @click="onSend">发送</el-button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import user_logo from '../../assets/user.png'
export default {
  props: {
    needData: null
  },
  watch: {
    needData() {
      this.leaveDatas = []
      this.total = 0
      this.getLeaveWord()
    }
  },
  data() {
    return {
      loading: true,
      user_logo: user_logo,
      total: 0,
      textarea: '',
      leaveDatas: null,
      reply: {
        id: '',
        pid: ''
      }
    }
  },
  created() {
    this.getLeaveWord()
  },
  methods: {
    //删除回复
    leaveWord_delete(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.axios.post(
            '/index/element_set/delLeaveWords',
            {
              user_id: this.$store.state.userInfo.user_id,
              cate: this.needData.cate,
              id: id
            },
            data => {
              this.$emit('onChangeData')
              //window.opener.postMessage('公司刷新', '*')
              this.getLeaveWord()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }
          )
        })
        .catch(_ => {})
    },
    //回复留言
    onReply(id, pid, sender_name, sender_id) {
      this.reply = { id, pid, sender_name }
      this.$refs.textarea.innerHTML = `<span class="warn_name" data-senderid="${sender_id}" data-pid="${pid}" data-id="${id}" style="background-color:#D3eebc" contenteditable="false">@${sender_name}</span> `
    },
    //获取留言信息
    getLeaveWord() {
      this.loading = true
      this.axios.post(
        '/Index/element_set/getLeaveWords',
        {
          jbxx_id: this.$route.query.jbxx_id,
          type: 1,
          type_id: this.needData.gs_id,
          cate: this.needData.cate
        },
        data => {
          if (data.status == 'success') {
            this.leaveDatas = data.message
            this.total = data.total || 0
          } else {
            this.leaveDatas = ''
          }
          this.loading = false
        }
      )
    },
    //点击发送
    onSend() {
      let receiver = '',
        reply_id = '',
        pid = '',
        content
      let elspan = this.$refs.textarea.querySelector('.warn_name')
      let alltext = this.$refs.textarea.innerText
      if (elspan) {
        var textspan = elspan.innerText
        content = alltext.substring(textspan.length)
        receiver = elspan.getAttribute('data-senderid')
        reply_id = elspan.getAttribute('data-id')
        pid = elspan.getAttribute('data-pid')
      } else {
        content = alltext
      }
      if (content == '') {
        this.$message.error('请输入内容')
        return
      }
      let ajax_data = {
        jbxx_id: this.$route.query.jbxx_id,
        user_id: this.$store.state.userInfo.user_id,
        gs_id: this.needData.gs_id,
        pid, //父级id
        content,
        reply_id, //回复当前数据id
        sender: this.$store.state.userInfo.user_id, //发送人id
        receiver, //回复当前人员id
        cate: this.needData.cate
      }
      this.axios.post('/Index/element_set/addLeaveWords', ajax_data, data => {
        this.$refs.textarea.innerHTML = ''
        this.$emit('onChangeData')
        this.getLeaveWord()
      })
    }
  }
}
</script>
<style scoped>
.leave_row {
  font-size: 14px;
  color: #606266;
  margin: 10px 0;
}
.leave_row_top {
  display: flex;
}
.leave_row .img_user {
  border-radius: 50%;
  width: 38px;
  height: 38px;
  margin: 0 10px;
}
.leave_row_time {
  padding-top: 4px;
  color: #969696;
}
.leave_row_text {
  margin: 6px 0 6px 58px;
}
.leave_row_leavetexts {
  margin-left: 58px;
}
.leavetexts_row {
  display: flex;
}
.color08c {
  color: #08c;
}
.pointer {
  cursor: pointer;
}
</style>


