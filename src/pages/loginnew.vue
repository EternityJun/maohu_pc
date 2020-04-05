<template>
  <div class="bj" :style="{backgroundImage: 'url(' + img + ')' }">
    <p class="bt_title">筑标(成都)</p>
    <div class="login">
      <el-row class="change_state">
        <el-col :span="24">
          <el-button class="change_text" style="padding:0" type="text">用户登录 / User Login</el-button>
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
          <el-form-item style="margin-bottom:0">
            <el-button style="width:100%" type="primary" @click="onLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </transition>
      <transition name="fade">
        <div :hidden="show_code" style="line-height:187px;height:187px;text-align:center">敬请期待</div>
      </transition>
    </div>
    <div class="foot">
      <p>系统开发单位：成都中建科联网络科技有限公司</p>
      <p>系统使用指导电话：028-68731622</p>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
var pnone_pass = false;
import Cookie from "./../cookie";
import bjpng from "../assets/dlbj.png";
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
      img: bjpng,
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
      select_text: "账号登陆",
    };
  },
  created() {
    this.$store.state.userInfo.user_id = Cookie.getCookie("user_id");
    
    this.axios.post("/index/company/getCompInfo", {
      url: href
    },data=>{
      localStorage.setItem('gs_id',data.rows.company_id)
      this.$store.state.gs_id = data.rows.company_id;
    });
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
          data => {
            if (data.status == "failed") {
              clearInterval(time);
              this.$message.error(data.msg);
              this.get_code_text = "获取验证码";
              this.second = 60;
            }
          }
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
            { cellphone: this.forms.phone, verify: this.forms.code },
            data => {
              if (data.status == "success") {
                this.$store.state.userInfo.user_id = data.userid;
                localStorage.setItem("userName", data.username);
                Cookie.setCookie("user_id", data.userid, 24 * 60 * 60);
                Cookie.setCookie("sid", data.sid, 24 * 60 * 60);
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
.bj {
  min-width: 1000px;
  min-height: 700px;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-image: url("../assets/dlbj.png");
  background-size: 100% 100%;
}
.bt_title {
  position: absolute;
  margin: 0 auto;
  width: 100%;
  top: 15%;
  color: #ffffff;
  font-size: 50px;
  text-align: center;
  text-shadow: 2px 4px 2px #222;
}
.change_text {
  font-size: 18px;
}
.change_state {
  text-align: center;
  margin-bottom: 20px;
}
.login {
  position: relative;
  top: 50%;
  border-radius: 4px;
  width: 20%;
  max-width: 300px;
  margin: -112px auto 0;
  background-color: #ffffff;
  padding: 20px;
}
.foot {
  position: absolute;
  width: 100%;
  bottom: 4%;
  text-align: center;
}
</style>

