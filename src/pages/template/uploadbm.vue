<template>
  <div>
    <el-upload
      multiple
      class="upload-demo"
      :action="updateUrl"
      :data="updateData"
      :on-change="handleChange"
      :on-success="uploadSuccess"
      :on-remove="uploadRemove"
      :file-list="fileList"
      :on-preview="openFile"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div style="margin: 0 auto;margin-top: 30px;margin-bottom:10px;">
      <div style="border-left: 1px solid #ffffff;text-align:center">
        <el-button type="success" @click="handleSubmit('formValidate')" style="width:100px;">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    getFileList: {},
    uploadVisible: true,
    getData: {}
  },
  data() {
    return {
      uploadUrl: global.URL + "home/uploadFile",
      fileList: [],
      //上传前处理成组的fileList
      upfile: "",
      updateUrl:
        "https://wechat.cdzjkl.com/index/Human_Review/uploadFile",
      updateData: {
        token: localStorage.getItem("token"),
        login_company_id: localStorage.getItem("company_id"),
        login_user_id: localStorage.getItem("user_id")
      }
    };
  },
  watch: {
    getFileList() {
      this.changeType();
    }
  },
  created() {
    this.changeType();
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      this.fileList = fileList;
    },
    handleChange() {},
    uploadRemove(file, fileList) {
      this.fileList = fileList;
    },
    handleSubmit() {
      if (this.fileName == "") {
        this.$Modal.error({
          title: "",
          content: "未选择文件!"
        });
        return;
      }
      var data = encodeURI(JSON.stringify(this.fileList), "utf-8");
      this.getData.voucher = this.axios.post(
        "https://wechat.cdzjkl.com/index/project/signOperate",
        this.getData,
        data => {
          this.$emit("success", false);
        }
      );
    },
    changeType() {
      // console.log(this.getFileList+'码')
      // console.log(decodeURI(this.getFileList))
      //return
      this.fileList = this.getFileList
        ? JSON.parse(decodeURI(this.getFileList))
        : [];
    },
    openFile(file) {
      window.open(decodeURI(file.response.data.filename_time));
    }
  }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-ceiling {
  background: #464c5b;
  padding: 10px 0;
  overflow: hidden;
}
.layout-ceiling-main {
  float: right;
  margin-right: 15px;
}
.layout-ceiling-main a {
  color: #9ba7b5;
}
.radioBlock {
  width: 1100px;
  margin-top: 20px;
  display: block;
  transition: 1s;
}
.radioDisplay {
  width: 1100px;
  margin-top: 20px;
  transition: 1s;
  display: none;
}
</style>