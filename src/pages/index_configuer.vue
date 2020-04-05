<!--公司配置-->
<template>
    <div id="indexConfiguer">
        <body-top></body-top>
        <headMenu :index="'/indexconfiguer'"></headMenu>
        <div class="body" style="padding-top:20px">
            <!-- <p>主页管理</p> -->
            <el-row class="company_upload">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>企业头像<span style="color:#409eff;font-size:12px;">(建议尺寸90px * 90px)</span></span>
                        </div>
                        <div class="text item">
                            <el-upload ref="logoupload" class="avatar-uploader" :action="url+'/MaoHu/public/index.php/index/Human_Review/uploadFile'" :show-file-list="false" :before-upload="beforeAvatarUpload" :on-success="fileSuccessLogo">
                                <img v-if="logoImage" :src="logoImage" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="company_upload">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>背景图片<span style="color:#409eff;font-size:12px;">(最多三张，建议尺寸400px * 150px)</span></span>
                        </div>
                        <div class="text item">
                            <el-upload :action="url+'/MaoHu/public/index.php/index/Human_Review/uploadFile'" list-type="picture-card" multiple :file-list="fileList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="fileSuccessbanner">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt>
                            </el-dialog>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="company_upload" v-for="(item ,index ) in groups" :key="index">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div class="text item">
                            <el-checkbox v-model="item.value">{{item.name}}</el-checkbox>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row class="company_upload">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <el-checkbox v-model="lxfs.value">联系方式<span style="color:#409eff;font-size:12px;">(最多十张)</span></el-checkbox>
                        </div>
                        <div class="text item">
                            <el-upload :action="url+'/MaoHu/public/index.php/index/Human_Review/uploadFile'" list-type="picture-card" multiple :file-list="fileList1" :on-preview="handlePictureCardPreview" :on-remove="handleRemoveContact" :on-success="fileSuccessConatct">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt>
                            </el-dialog>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" style="text-align:center">
                    <el-button type="primary" @click="ajaxSave">保存</el-button>
                </el-col>
            </el-row>
            <!-- <div class="company_upload">
        <div>
          <p>LOGO</p>
          <el-upload ref="logoupload" class="avatar-uploader" :action="url+'/MaoHu/public/index.php/index/Human_Review/uploadFile'" :show-file-list="false" :before-upload="beforeAvatarUpload" :on-success="fileSuccessLogo">
            <img v-if="logoImage" :src="logoImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="company_upload">
        <p style="padding:10px 0">背景图片</p>
        <el-upload :action="url+'/MaoHu/public/index.php/index/Human_Review/uploadFile'" list-type="picture-card" multiple :file-list="fileList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="fileSuccessbanner">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </div> -->
            <!-- <el-form style="display:inline-block" ref="ruleForm2" label-width="100px">
        <el-form-item label="企业介绍">
          <el-input type="textarea" style="width:500px" v-model="form.js"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input type="text" style="width:500px" v-model="form.lxr"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input type="number" style="width:500px" v-model.number="form.dh"></el-input>
        </el-form-item>
        <el-form-item label="菜单栏">
          <el-checkbox-group v-model="form.checkedBox">
            <el-checkbox label="简介" border>简介</el-checkbox>
            <el-checkbox label="文章" border>文章</el-checkbox>
            <el-checkbox label="人员" border>人员</el-checkbox>
            <el-checkbox label="业绩" border>业绩</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item style="width:500px" align="center">
          <el-button type="primary" @click="ajaxSave">保存</el-button>
        </el-form-item>
      </el-form> -->
        </div>
    </div>
</template>
<script>
import headMenu from './template/head_menu.vue'
export default {
  data() {
    return {
      // url:'http://114.215.223.123',
      url: 'http://115.28.156.246',
      fileList: [],
      fileList1: [],
      delImg: [],
      dialogImageUrl: '',
      dialogVisible: false,
      checkList: [],
      logoImage: '',
      contactsImage: '',
      bjImage: '',
      groups: [
        { name: '建投条', value: false },
        { name: '企业文章', value: false },
        { name: '企业视频', value: false },
        { name: '企业资质', value: false },
        { name: '企业人员', value: false },
        { name: '工程业绩', value: false }
      ],
      lxfs: { name: '联系方式', value: false },
      successLogo: '',
      successBanner: [],
      successContact: []
    }
  },
  components: {
    headMenu
  },
  created() {
    document.title = '小程序管理'
    this.getGsinfo()
  },
  methods: {
    //上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 、PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isLt2M && isJPG) {
        this.logoImage = URL.createObjectURL(file)
      }
      return isJPG && isLt2M
    },
    fileSuccessLogo(response, file, fileList) {
      this.successLogo = response.data.filename_time
    },
    //上传之前
    beforeAvatarUpload2(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 、PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isLt2M && isJPG) {
        this.bjImage = URL.createObjectURL(file)
      }
      return isJPG && isLt2M
    },

    //背景图删除
    handleRemove(file, fileList) {
      let a = file.response ? file.response.data.filename_time : file.name
      let indexOfval = this.successBanner.indexOf(a)
      if (indexOfval >= 0) {
        this.successBanner.splice(indexOfval, 1)
      }
      this.delImg.push(a)
    },
    handleRemoveContact(file, fileList) {
      let indexOfval = this.successContact.indexOf(file.name)
      if (indexOfval >= 0) {
        this.successContact.splice(indexOfval, 1)
      }
    },
    //点击放大事件
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    //上传成功
    fileSuccessbanner(response, file, fileList) {
      this.successBanner.push(response.data.filename_time)
    },
    fileSuccessConatct(response, file, fileList) {
      this.successContact.push(response.data.filename_time)
    },
    // 保存
    ajaxSave() {
      let groups = this.groups
      let group = []
      groups.forEach(element => {
        if (element.value) {
          group.push(element.name)
        }
      })
      let contact = ''
      if (this.successBanner.length > 3) {
        this.$message.error('请减少背景图片的数量')
        return
      }
      if (this.lxfs.value) {
        if (this.successContact.length == 0) {
          this.$message.error('您还未上传联系人的图片')
          return
        } else {
          if (this.successContact.length > 10) {
            this.$message.error('请减少联系人图片的数量')
            return
          }
          contact = this.successContact ? this.successContact.join(',') : ''
          group.push(this.lxfs.name)
        }
      }
      if (
        !group.join(',') &&
        !contact &&
        !this.successLogo &&
        !this.successBanner.join(',')
      ) {
        this.$message.error('请至少上传企业头像再保存')
        return
      }
      if (this.successContact.length > 0 && !this.lxfs.value) {
        this.$confirm(
          '您上传了联系人图片，但未勾选联系人选项, 是否保存联系人?',
          '提示',
          {
            confirmButtonText: '保存',
            cancelButtonText: '不保存',
            type: 'warning'
          }
        )
          .then(() => {
            this.lxfs.value = true
            group.push(this.lxfs.name)
            contact = this.successContact ? this.successContact.join(',') : ''
            this.save(group, contact)
          })
          .catch(() => {
            this.save(group, contact)
          })
      } else {
        this.save(group, contact)
      }
    },
    save(group, contact) {
      if (this.delImg.length > 0) {
        this.axios.post(
          '/index/Human_Review/delUpload',
          {
            filename: this.delImg.join(',')
          },
          data => {}
        )
      }

      this.axios.post(
        '/index/company/homepageManage',
        {
          gs_id: localStorage.getItem('gs_id'),
          company_id: localStorage.getItem('company_id'),
          groups: group.join(','),
          contact: contact,
          // 企业头像
          headimg: this.successLogo,
          //轮播图片
          banner: this.successBanner ? this.successBanner.join(',') : '',
          type: 'edit'
        },
        data => {
          this.$message.success('成功')
          location.reload()
            
        }
      )
    },
    
    //获取公司信息
    getGsinfo() {
      this.axios.post(
        '/index/company/homepageManage',
        {
          gs_id: localStorage.getItem('gs_id'),
          type: 'check'
        },
        data => {
          this.groups.forEach(element => {
            if (data.rows.groups.indexOf(element.name) > -1) {
              element.value = true
            }
          })
          this.successLogo = data.rows.headimg || ''
          this.successBanner = data.rows.banner
            ? data.rows.banner.split(',')
            : []
          this.successContact = data.rows.contact
            ? data.rows.contact.split(',')
            : []
          if (data.rows.headimg) {
            this.logoImage =
              this.url + '/MaoHu/upload/files/options/' + data.rows.headimg
          }
          if (data.rows.banner) {
            let arrayImg = data.rows.banner.split(',')
            let imgs = arrayImg.map(v => {
              return {
                name: v,
                url: this.url + '/MaoHu/upload/files/options/' + v
              }
            })
            this.fileList = imgs
          }
          if (data.rows.contact) {
            this.lxfs.value = true
            let arrayImg = data.rows.contact.split(',')
            let imgs = arrayImg.map(v => {
              return {
                name: v,
                url: this.url + '/MaoHu/upload/files/options/' + v
              }
            })
            this.fileList1 = imgs
          }
        }
      )
    }
  }
}
</script>

<style lang="less">
.company_upload {
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
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>

<style lang="less" scoped>
.body {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;

  > p {
    padding: 20px 0;
    font-size: 20px;
  }
}
.company_upload {
  margin-bottom: 20px;
  // padding-left: 100px;
  > div {
    margin-right: 30px;
    display: inline-block;
    > p {
      padding: 10px 0;
    }
  }
}
</style>

