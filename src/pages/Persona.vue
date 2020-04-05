<template>
  <div class="box">
    <!--头部-->
    <body-top></body-top>
    <!---->
    <div class="Tips">
      <span>
        <b>基本资料</b>
      </span>
      <div>请完善以下信息,方便我们更好的为您服务！（点击头像更换头像）</div>
    </div>
    <!--表单-->

    <div class="by">
      <div>基本信息</div>
      <!---->
      <div class="frm" v-loading="jbxxLoading">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名字" prop="name">
            <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="* 手机号" prop="Phone" >
            <el-input v-model.number="ruleForm.Phone" auto-complete="off">
              <template slot="append">
                <span
                 
                  style="color:#999;font-size:12px;"
                >请勿轻易更改手机号</span>
                <!-- <el-button
                  v-else
                  title="如果手机号没变！可以忽略"
                  slot="append"
                  @click="onGet_code"
                >{{second===0?'发送验证码':second+'s'}}</el-button> -->
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="ruleForm.Phone != inf.cellphone"
            prop="code"
            label="验证码"
            title="输入后点击验证按钮"
          >
            <el-input placeholder="验证码" v-model.number="ruleForm.code">
                <template slot="append">
                <el-button
                  title="如果手机号没变！可以忽略"
                  slot="append"
                  @click="onGet_code"
                >{{second===0?'发送验证码':second+'s'}}</el-button>
              </template>
              <!-- <el-button
                v-if="ruleForm.Phone != inf.cellphone"
                slot="append"
                type="primary"
                @click="onGetPhone"
              >验证手机</el-button> -->
            </el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="ruleForm.gender" auto-complete="off" placeholder="请选择">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定微信">
            <el-button
              @click="inf.unionid?'':dialogVisible = true;inf.unionid?'':getWxcode()"
            >{{Wechat_name}}</el-button>
          </el-form-item>
          <el-form-item label="系统头像">
            <el-upload
              class="avatar-uploader"
              :action="url"
              :data='myImgData'
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error='handleAvatarError'
            >
              <img
                v-if="ruleForm.avatar"
                :src="imgDataState?imgDataUrl:ruleForm.avatar"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!--头像-->
          <!-- <el-form-item label="系统头像">
              <div class="portrait">
              <img style="border-radius:50%" :src="ruleForm.avatar?ruleForm.avatar:'../assets/user.png'" alt height="100%">
        
              <div class="upload" @click="toggleShow">
                <i class="el-icon-camera-solid"></i>
              </div>
              </div>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!---->
      <!--微信二维码-->
      <el-dialog title="绑定微信" :visible.sync="dialogVisible" width="20%" center>
        <span class="span_text">您确认绑定该微信吗?如果绑定,之前用该微信号登录的数据即将被注销.并且绑定之后不可再次更改</span>
        <div class="binding" v-loading="wxLoading">
          <img :src="imgUrl" alt="绑定微信" />
        </div>
        <span class="span_text">请使用微信扫描二维码登录“猫糊小程序”</span>
      </el-dialog>
      <!--上传组件-->
      <div >
        <my-upload
          field
         
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="show"
          
          :withCredentials="imgUpState"
          :width="300"
          :height="300"
          :url="url"
          :params="params"
          :headers="headers"
          img-format="png"
        ></my-upload>
      </div>
    </div>
    <div id="share1">
      <el-button type="primary" style="font-size:12px;width:73px;" @click="backIndex">首页</el-button>
    </div>
  </div>
</template>
<script>
import "babel-polyfill"; // es6 shim
let Base64 = require("js-base64").Base64;
import myUpload from "vue-image-crop-upload";

export default {
  name: "Persona",
  components: {
    "my-upload": myUpload
  },
  props: {},
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      myImgData:{
        cate:'avatar'
      },
      jbxxLoading:true,
      wxLoading: true,
      //伦查   微信是否绑定成功

      weiXinState: {
        state: false
      },
      imgUrl: "",
      imgLoading: true,
      imgUpState: true,
      dialogVisible: false, // 对话框
      imageUrl: "",
      url:
        "https://wechat.cdzjkl.com/index/common/uploadImage",
          // "https://test.cdzjkl.com/index/common/uploadImage",
      // 上传组件
      show: false,
      ruleForm: {
        name: "", // 名字
        gender: "", // 性别,
        Phone: "", // 电话
        avatar: "",
        code: ""
      },
      imgData: {},
      imgData1: {},
      imgDataState: false,
      imgDataUrl: "",
      Wechat_name: "点击绑定", // 微信昵称
      rules: {
        Phone: [{ validator: checkPhone, trigger: "change" }],
        name: [
          { required: true, message: "请输入您的名字", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "请选择您的性别", trigger: "change" }
        ]
      },
      inf: {},
      params: {
        token: localStorage.getItem("token"),
        login_company_id: localStorage.getItem("company_id"),
        login_user_id: localStorage.getItem("user_id")
      },
      headers: {
        //   'ccess-Control-Allow-Credentials': true,
        //  'Access-Control-Allow-Origin':'http://115.28.156.246',
        smail: "*_~"
      },
      imgDataUrl: "", // the datebase64 url of created image
      //
      sendMseStatus: true,
      second: 0,
      phoneState: false,
      oldFileName:''
    };
  },
  created() {
    document.title = "个人中心";
    this.ruleForm.name = this.userName;
    this.getMy();
  },
  methods: {
    onGetPhone() {
      let obj = {
        phone: this.ruleForm.Phone,
        code: this.ruleForm.code
      };
      this.axios.post("/index/login/verify", obj, data => {
        if (data.status == "success") {
          this.$message({
            type: "success",
            message: data.message
          });
           this.phoneState = true;
           if (this.ruleForm.gender == "男") {
                this.ruleForm.gender = 1;
              } else if (this.ruleForm.gender == "女") {
                this.ruleForm.gender = 2; //默认
              }
              let obj = {
                user_id: localStorage.getItem("user_id"),
                username: this.ruleForm.name,
                sex: this.ruleForm.gender,
                avatar: this.imgData.filename_time
              };
              if (this.phoneState) {
                obj.cellphone = this.ruleForm.Phone;
              } else {
                obj.cellphone = this.inf.cellphone;
              }
              this.axios.post("/index/mine/editUserInfo", obj, data => {
                this.ruleForm.code = ''
                if (data.status == "success") {
                  this.$message({
                    type: "success",
                    message: data.message
                  });
                  this.second= 0
                } else {
                  this.$message({
                    type: "danger",
                    message: data.message
                  });
                }
                this.getMy(1);
              });
        } else {
          this.$message({
            type: "danger",
            message: data.message
          });
        }
      });
    },
    onGet_code() {
      // 用户有权限  下发验证码
      // 发送验证码
      if (this.sendMseStatus) {
        this.sendMseStatus = false;
        this.axios.post(
          "/index/Login/sendMsg",
          { cellphone: this.ruleForm.Phone },
          data => {
           
            if (data.status == "failed") {
              this.second = 0
              this.$message.error(data.message);
            }else{
               this.second = 60;
            const time = setInterval(() => {
              this.second -= 1;
              if (this.second === 0) {
                this.sendMseStatus = true;
                window.clearInterval(time);
              }
            }, 1000);
            }
          }
        );
      }
    },
    isBindWx() {
      this.axios.post(
        "/index/login/isBindWx",
        { user_id: this.inf.user_id },
        data => {
          if (data.status == "success") {
            this.weiXinState.state = true;
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: data.message
            });
           location.reload()
          }
          const time = setTimeout(() => {
            this.weiXinState.state = true;
          }, 60000);
        }
      );
    },
    backIndex() {
      if (this.$route.query.login_service_id) {
        this.$router.push({
          path: `/browser?login_service_id=${this.$route.query.login_service_id}&gsmc=${this.$route.query.gsmc}`
        });
      } else {
        this.$router.push({
          path: `/personal`
        });
      }
    },
    getWxcode() {
      this.wxLoading = true;
      this.imgUrl = "";
      let obj = {
        cellphone: this.inf.cellphone
      };
      this.axios.post("/index/login/getQRCode", obj, data => {
        this.wxLoading = false;
        // this.weiXinState.state = true;
        this.imgUrl = `data:image/png;base64,${data.message}`;
        const time = setInterval(() => {
          console.log(this.weiXinState.state)
          if (this.weiXinState.state) {
            window.clearInterval(time);
          }
          this.isBindWx();
        }, 5000);
      });
    },
    handleAvatarSuccess(res, file) {
        this.$message.success(res.message)
      this.imgDataState = true;
      let url = "https://wechat.cdzjkl.com/files/options/";
      this.imgDataUrl = url + res.data.filename_time;
      this.imgData = res.data;
      this.imgData1 = file;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarError(res, file){
      this.$message.error(res.message)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getMy(num) {
      let obj = {
        user_id: localStorage.getItem("user_id")
      };
      this.axios.post("/index/mine/my", obj, data => {
        this.inf = data.rows;
        this.oldFileName = data.rows.avatar.split('/')[data.rows.avatar.split('/').length-1]
        this.assignmentInf();
        // console,log(data)
      });
    },
    assignmentInf() {
      if (this.inf.sex == 0) {
        this.ruleForm.gender = "男"; //默认
      } else if (this.inf.sex === 1) {
        this.ruleForm.gender = "男"; //默认
      } else if (this.inf.sex == 2) {
        this.ruleForm.gender = "女"; //默认
      }
      this.ruleForm.name = this.inf.username;
      // this.ruleForm.gender = this.inf.sex;
      this.ruleForm.Phone = this.inf.cellphone;
      this.ruleForm.avatar = this.inf.avatar;
      this.Wechat_name = this.inf.unionid ? this.inf.nickname : "点击绑定";
       this.jbxxLoading = false
      //  console.log(this.ruleForm)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
        console.log(field)
      // 操作成功，不管成功还是失败都会先执行这里
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      // 上传成功
        console.log(jsonData)
     
      this.user_img = this.imgDataUrl;
    },
    cropUploadFail(status, field) {
      console.log(field)
      // this.$message.error(data.message)
      // 上传失败
      // console.log(status);
      // console.log("field: " + field);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         
          this.$confirm(
            "此操作将修改个人信息, 是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
               if(this.ruleForm.Phone != this.inf.cellphone){
                   this.onGetPhone()
                }else{
                  if (this.ruleForm.gender == "男") {
                this.ruleForm.gender = 1;
              } else if (this.ruleForm.gender == "女") {
                this.ruleForm.gender = 2; //默认
              }
              let obj = {
                user_id: localStorage.getItem("user_id"),
                username: this.ruleForm.name,
                sex: this.ruleForm.gender,
                cellphone : this.ruleForm.Phone,
                avatar: this.imgData.filename_time
              };
              // if (this.phoneState) {
              //   obj.cellphone = this.ruleForm.Phone;
              // } else {
              //   obj.cellphone = this.inf.cellphone;
              // }
              this.axios.post("/index/mine/editUserInfo", obj, data => {
                this.ruleForm.code = ''
                if (data.status == "success") {
                  this.delUpload(this.oldFileName)
                  this.$message({
                    type: "success",
                    message: data.message
                  });
                  this.second= 0
                } else {
                  this.$message({
                    type: "danger",
                    message: data.message
                  });
                }
                this.getMy(1);
              });
                }
           
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        } else {
          this.$message({
            type: "danger",
            message: "请按照提示填写"
          });
          return false;
        }
      });
    },
    delUpload(val){
      let obj = {
        filename: val
      }
      this.axios.post('/index/common/delUpload',obj,data=>[
      ])
    },
  },
};
</script>

<style scoped lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.upload {
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 100px;
  left: 0;
  transition: all 0.5s;
  line-height: 30px;
  opacity: 0;
}
.portrait:hover.portrait > .upload {
  opacity: 1;
  top: 70px !important;
}
.box {
  width: 100%;
  margin: auto;
}
.by {
  padding-top: 20px;
  width: 1200px;
  margin: auto;
}
.portrait {
  cursor: pointer;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
}
.name {
  text-align: center;
  width: 200px;
  margin: 10px auto 0;
}
.uploads {
  width: 500px;
  height: 500px;
  border: #9ea7b4 1px solid;
}
.frm {
  /*margin:10px auto 0;*/
  margin-top: 30px;
  width: 500px;
  overflow: hidden;
}
.Tips {
  width: 1200px;
  margin: 20px auto 0;
  overflow: hidden;
}
.Tips > div {
  margin-top: 20px;
  box-sizing: border-box;
  padding-left: 10px;
  width: 100%;
  height: 35px;
  background-color: #e6f9fc;
  color: #00c1de;
  line-height: 35px;
  border: #00c1de 1px solid;
}
.span_text {
  margin: 10px 0;
  display: block;
  width: 100%;
  text-align: center;
}
.binding {
  width: 200px;
  height: 200px;
  margin: auto;
}
.binding > img {
  width: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  border-radius: 50px;
  width: 100px;
  height: 100px;
  display: block;
}
#share1 {
  position: fixed;
  right: 0px;
  bottom: calc(45%);
}
</style>
