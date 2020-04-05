<template>
  <div class="bg">
    <div class="center">
      <p>筑标(成都)咨询有限责任公司系统管理平台</p>
      <div class="login">
        <el-row class="change_state">
          <el-col :span="12">
            <el-button class="change_text" @click="onClick_change('账号登陆',true)" :class="select_text=='账号登陆'?'select_change_text':''" type="text">账号登陆</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="change_text" @click="onClick_change('扫码登录',false)" :class="select_text=='扫码登录'?'select_change_text':''" type="text">扫码登陆</el-button>
          </el-col>
        </el-row>
        <transition name="fade">
          <el-form :model="forms" :hidden="!show_code" :rules="rules" ref="login_form" @submit.native.prevent>
            <el-form-item prop="phone">
              <el-input placeholder="手机号" v-model.number="forms.phone"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input placeholder="验证码" v-model.number="forms.code" @keyup.enter.native="onLogin">
                <el-button style="width:120px" slot="append" @click="onGet_code">{{get_code_text}}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width:100%" type="primary" @click="onLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </transition>
        <transition name="fade">
          <div :hidden="show_code" style="line-height:187px;height:187px;text-align:center">
            敬请期待
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
var pnone_pass = false;
import Cookie from "./../cookie";
export default {
  data() {
    //验证方法
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        pnone_pass = false;
        callback(new Error("请输入手机号码"));
      } else if (!Number.isInteger(value)) {
        pnone_pass = false;
        callback(new Error("请输入数字"));
      } else if ((value + "").length != 11) {
        pnone_pass = false;
        callback(new Error("请输入11位数的手机号码"));
      } else {
        pnone_pass = true;
        callback();
      }
    };
    //验证方法
    var validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        phone: [{ validator: validatePhone, trigger: "change" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      },
      get_code_text: "获取验证码",
      show_code: true, //隐藏扫码登陆
      forms: {
        phone: "",
        code: ""
      },
      second: 60,
      select_text: "账号登陆"
    };
  },
  created() {
    this.$store.state.userInfo.user_id = Cookie.getCookie("user_id");
  },
  methods: {
    onClick_change(text, v) {
      this.select_text = text;
      this.show_code = v;
    },
    //获取验证码
    onGet_code() {
      
      if (pnone_pass) {
        if (this.get_code_text != "获取验证码") {
          return;
        }
        this.get_code_text = this.second + "s";
        let time = setInterval(() => {
          if (this.second == 0) {
            this.get_code_text = "获取验证码";
            this.second = 60;
            clearInterval(time);
          } else {
            this.second -= 1;
            this.get_code_text = this.second + "s";
          }
        }, 1000);
        this.axios.post(
          "/index/Login/sendMsg",
          { cellphone: this.forms.phone },
          data => {}
        );
      }
    },
    //登录
    onLogin() {
      this.$refs["login_form"].validate(valid => {
        if (valid) {
          //验证通过 
          this.axios.post(
            "/index/Login/login",
            { cellphone: this.forms.phone, verify: this.forms.code},
            data => {
              if (data.status == "success") {
                this.$store.state.userInfo.user_id = data.userid;
                localStorage.setItem('username', data.username);
                Cookie.setCookie("user_id", data.userid,24*60*60);
                Cookie.setCookie("sid", data.sid,24*60*60);
                this.$router.push("/");
              } else {
                this.$message.error(data.msg);
              }
            }
          );
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.change_state {
  text-align: center;
  margin-bottom: 20px;
}
.change_text {
  font-size: 18px;
  color: #324057;
}
.select_change_text {
  color: #66b1ff;
}
.el-select {
  width: 100px;
  background-color: red;
}
.input-with-select .el-input-group__prepend {
  background-color: red;
}
.bg {
  min-width: 400px;
  min-height: 490px;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #324057;
}
.center {
  position: relative;
  top: 10%;
}
.center > p {
  text-align: center;
  color: #ffffff;
  line-height: 100px;
  font-size: 28px;
}
.login {
  border-radius: 10px;
  width: 330px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 30px;
}
</style>

