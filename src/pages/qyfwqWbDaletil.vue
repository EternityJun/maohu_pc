<!--  -->
<template>
  <div class="qyfwqWbDaletil">
    <div v-if="role||role1" v-loading="roleLoading">
          <header>
            <p id="myID" >{{basicInfo.gsmc?basicInfo.gsmc:basicInfo.service_name}}</p>
          </header>
          <section id="section">
            <el-row>
              <el-col :span="22">
                <div style="padding-top:20px">
                  <span>项目名称：</span>
                  <span style=" word-break:break-all;">{{basicInfo.xmmc}}</span>
                </div>
                <div style="padding-top:10px" v-if="basicInfo.xmdq">
                  <span>项目地区：</span>
                  <span>{{basicInfo.xmdq}}</span>
                </div>
                <div style="padding-top:10px" v-if="basicInfo.xmyzdw">
                  <span>项目业主：</span>
                  <span>{{basicInfo.xmyzdw}}</span>
                </div>
                <div style="padding-top:10px" v-if="basicInfo.zzyq">
                  <span>资质要求：</span>
                    <span>{{basicInfo.zzyq_display?basicInfo.zzyq_display:basicInfo.zzyq_str}}</span>
                </div>
              </el-col>

            </el-row>
            <div style="margin-top:20px">
              <el-tabs v-model="activeName">
                <el-tab-pane label="项目信息" name="first">
            
                      <p v-if="basicInfo.xmmc" style="padding-top:20px">项目名称：
                        {{basicInfo.xmmc}}</p>
                      <p v-if="basicInfo.xmdq" style="padding-top:20px">项目地区：
                        {{basicInfo.xmdq}}</p>
                      <p v-if="basicInfo.xmyzdw" style="padding-top:20px">项目业主：
                        {{basicInfo.xmyzdw}}</p>
                      <p v-if="basicInfo.zzyqText" style="padding-top:20px">资质要求：
                        {{basicInfo.zzyqText}}</p>
                        <p  v-if="basicInfo.ryyq" style="padding-top:20px">人员要求：
                          {{basicInfo.ryyq}}</p>
                      <p   v-if="basicInfo.yjyq" style="padding-top:20px">业绩要求：
                        {{basicInfo.yjyq}}</p>
                        <p  v-if="basicInfo.qtyq"  style="padding-top:20px">其他要求：
                          {{basicInfo.qtyq}}</p>
                </el-tab-pane>
                <el-tab-pane label="人员分析" name="second">
                  <qyFwhPerson :myForm = 'form'></qyFwhPerson>
                </el-tab-pane>
                <el-tab-pane label="业绩分析" name="third">
                  <myDetails v-if="basicInfo.xmmc" :basicInfo="basicInfo"></myDetails>
                </el-tab-pane>
                <el-tab-pane label="公开信息" name="fourth">
                   <qyGkxx  :myForm= 'form' :basicInfo="basicInfo"></qyGkxx> 
                </el-tab-pane>
                <el-tab-pane label="积分" name="sixth" v-if="isIntegral=='success'">
                  <jf-list style="margin-bottom:50px;" :needData="jf.needData" @onChangeData="onChangeJfData"></jf-list>
                </el-tab-pane>
                <el-tab-pane label="留言" name="five">
                  <div>
                    <div v-if="LeaveMessage.data !='暂无留言内容'">
                      <div>
                        共<span style="color:#499efe">{{LeaveMessage.total}}</span>条评论
                      </div>
                      <div style="height:100px;margin:20px 0 0 20px" v-for="item in LeaveMessage.data" :key="item.id">
                        <div style="display:flex;margin-bottom:10px">
                          <div>
                            <img style="height:50px;width:50px;border-radius:25px;" :src="item.headimgurl" alt />
                          </div>
                          <div>
                            <div style="display:flex">
                              <p style="height:20px;line-height:20px;color:#969696;margin-left:10px">{{item.sender_name}}</p>
                            </div>
                            <p style="height:20px;line-height:20px;color:#969696;margin-left:10px">{{item.modified}}</p>
                          </div>
                          <div>
                            <span   v-if="item.sender == user_id" @click="deleteLeaveWords(item)" class="el-icon-delete" style="font-size:16px;cursor: pointer;color:#beb2b5;margin-left:10px;"></span>
                          </div>
                        </div>
                        <div>
                          <p style="margin:10px 10px 10px 60px">{{item.content}}</p>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div>暂无留言内容</div>
                    </div>
                    <div style="margin-top:50px;  text-align: right;">
                      <el-input type="textarea" v-model="LeaveMessage.concent" maxlength="100" placeholder="输入内容"></el-input>
                      <div style="width:100%;text-align:center;">
                        <el-button style="margin:20px 0" @click="submitMsg" type="primary">提交</el-button>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </section>
    </div>
    <div v-else>
      <p style="text-align:center;font-size:18px;height:500px;line-height:500px">
        请联系项目请求人！设置你的权限
      </p>
      <div style="text-align:center">
        <el-button type="primary"  @click="backIndex">返回首页</el-button>
      </div>
      
    </div>

    <el-dialog :visible.sync="personSearchState" :close-on-click-modal="BooleanData">
      <personSearch></personSearch>
    </el-dialog>


    <div id="share">
      <el-button type="primary" icon="el-icon-share" size="mini">分享</el-button>
      <share v-if="getCutUrlKey" :config="config"></share>
    </div>
     <div id="share1">
      <el-button type="primary" style="font-size:12px;width:73px;" @click="backIndex"> 首页</el-button>
    </div>
  </div>
</template>

<script>
import Cookie from '../cookie/index.js'
import 'social-share.js/dist/css/share.min.css'
import 'social-share.js/dist/js/social-share.min.js'
import myDetails from './details.vue'
import personSearch from './template/personSearch.vue'
import jfList from './sonPage/jfList.vue' //积分组件
import qyFwhPerson from './template/qyFwhPerson.vue' //人员分析组件
import qyGkxx from "./template/qyGkxx";//公开信息

export default {
  name: 'qyfwqWbDaletil',
  data() {
    return {
      share:"",
      BooleanData:false,
      //积分
      jf: {
        dialog: false,
        needData: {}
      },
      isIntegral: '',
      getCutUrlKey: false,
      config: {
        url: window.location.href, // 网址，默认使用 window.location.href
        source: '标题', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: this.$route.query.xmmc, // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image: 'https://wechat.cdzjkl.com/files/options/'+this.$store.state.userInfo.gs_logo, // 图片, 默认取网页中第一个img标签
        sites: ['qq', 'wechat', 'qzone', 'weibo', 'douban'], // 启用的站点
        // disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
        wechatQrcodeHelper:
          '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
      },
      activeName: 'first',
      form: {},
      data: [],
       personSearchState:false,
      service_id: '',
      user_id: '',
      basicInfo: {},
      zzyqList: [],
      xmdqList: [],

      checkList: [],
      zzyqState: false,
      ryyqState: false,
      yjyqState: false,
      qtyqState: false,
      upaData: {
        qtyq: '',
        ryyq: '',
        xmdq: '',
        xmmc: '',
        xmyzdw: '',
        yjyq: '',
        zzyq: '',
        zzyq_display:"",
      },
      CompanyList: {
        status: '',
        selectUserId: '',
        selectedWorkName: {},
        words: '',
        cate: '企业',
        type: 'own',
      },
      total: 0,
      xmdqList: [],
      zzyqList: [],
      loading: false,
      role: '',
      LeaveMessage: {
        data: [],
        totle: 0,
        mas: '',
        concent: ''
      },
      ryfjData: {
        loading: true,
        ryName: '',
        ryZsh: '',
        tableData: [],
        rows: 10,
        page: 1,
        count: 0
      },
         roleLoading:true,
         role:true,
         role1:true,

    }
  },
  components: {
    myDetails,
    jfList,
    personSearch,
    qyFwhPerson,
    qyGkxx
  },
  watch: {
    checkList() {//判断项目信息中的多选的选中状态
      this.zzyqState = false
      this.ryyqState = false
      this.yjyqState = false
      this.qtyqState = false
      for (let i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i] == '资质要求') {
          this.zzyqState = true
        }
        if (this.checkList[i] == '人员要求') {
          this.ryyqState = true
        }
        if (this.checkList[i] == '业绩要求') {
          this.yjyqState = true
        }
        if (this.checkList[i] == '其他') {
          this.qtyqState = true
        }
      }
      let a = this.checkList.indexOf('资质要求')
    }
  },
  created() {
    this.share = localStorage.getItem("share")
    if (this.share === '1') {
      // 判断是非是分享页面
      this.$route.query.name = 'wb'
      let url = window.location.href
      url = url.replace(/&share=1/, '')
      localStorage.setItem('formUrl', url)
    }
     let url = window.location.href;
    this.axios.post(
      '/index/Common/buildurl',
      {
        url: url
      },
      res => {
        this.config.url = res.url
        this.getCutUrlKey = true
      }
    )
    this.service_id = localStorage.getItem('service_id')
    this.user_id = localStorage.getItem('user_id')
    document.title = '详情'
    let obj = this.$route.query
    this.form = obj
    this.getRe_detail()
    this.getZzyqData()
    this.getProvinceCity()
    this.getLeaveWords()
    this.fn_isIntegral() //积分
  },
  methods: {
    // 积分回调
    onChangeJfData() {},
    backIndex(){
      if(this.$route.query.login_service_id){
        this.$router.push({
        path:`/browser?login_service_id=${this.$route.query.login_service_id}&gsmc=${this.$route.query.gsmc}`
      })
      }else{
        this.$router.push({
        path:`/personal`
        })
      }
      
    },
    fn_isIntegral() {
      //公司列表
      this.axios.post(
        '/index/integral/isIntegral',
        {
          jbxx_id: this.$route.query.jbxx_id,
          user_id: this.$store.state.userInfo.user_id,
          login_service_id:this.$route.query.service_id
        },
        data => {
          this.isIntegral = data.status
        }
      )
    },
    deleteLeaveWords(item) {
      this.$confirm('此操作将删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let obj = {
            id: item.id,
            type_id: this.form.gs_id,
            cate: '对手分析',
            user_id: localStorage.getItem('user_id')
          }
          this.axios.post('/index/element_set/delLeaveWords', obj, data => {
            // console.log(data);
             if(data.status == 'success'){
              this.$message({
                message:"删除成功",
                type:"success"
              })
                 this.getLeaveWords()
            }else{
                this.$message({
                message:data.message,
                type:"danger"
              })
            }
            // this.getLeaveWords()
          })
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    
    getUserServiceRole() {
      let obj = {
        jbxx_id:this.form.jbxx_id,
        service_id:  this.login_service_id
          ? this.login_service_id
          : this.$route.query.login_service_id,
        user_id: localStorage.getItem('user_id')
      }
      this.axios.post('/relation/role/userServiceRole', obj, data => {
        this.roleLoading = false
        this.role= data.message.check_proj_detail
        this.role1= data.message.pro_detail
      })
    },
    
    editComp() {
      let obj = {
        id: this.CompanyList.data.id,
        service_id: this.login_service_id
          ? this.login_service_id
          : this.$route.query.login_service_id,
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id,
        gs_id: this.CompanyList.idList,
        analyst_id: this.CompanyList.analyst_id,
        analyst_name: this.CompanyList.analyst_name,
        status: this.CompanyList.status,
        words: this.CompanyList.words,
        cate: this.CompanyList.cate,
        type: '1'
      }
      this.axios.post('/relation/pro_details/editComp', obj, data => {
        // console.log(data);
        this.getCompanyList()
      })
    },
    getCompanyList() {
      let obj = {
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id,
        cate: this.CompanyList.cate,
        qymc: this.CompanyList.qymc,
        type: this.CompanyList.type,
        page: this.CompanyList.page,
        rows: this.CompanyList.rows
      }
      this.axios.post('/relation/pro_details/companyList', obj, data => {
        this.CompanyList.data = data.rows
        this.CompanyList.count = data.total || 0
        for (let i = 0; i < this.CompanyList.data.length; i++) {
          this.$set(this.CompanyList.data[i], 'selectName', '')
        }
        // console.log(data);
      })
    },
    assignmentData() {
      this.upaData.qtyq = this.basicInfo.qtyq
      this.upaData.ryyq = this.basicInfo.ryyq
      this.upaData.xmdq = this.basicInfo.xmdq
      this.upaData.xmmc = this.basicInfo.xmmc
      this.upaData.xmyzdw = this.basicInfo.xmyzdw
      this.upaData.yjyq = this.basicInfo.yjyq
      this.upaData.zzyq = this.basicInfo.zzyq
      // console.log(this.upaData);
      // console.log(this.basicInfo);
    },
    getZzyqData() {
      this.axios.post('/firm/Firm_search/getQualiDict', {}, data => {
        // console.log(data);
        this.zzyqList = data.rows
      })
    },
    getProvinceCity() {
      this.axios.post('/index/common/getProvinceCity', {}, data => {
        this.xmdqList = data
        this.xmdqList.forEach((item,index)=>{
          if(item.label == '天津市'||item.label == '北京市'||item.label== "重庆市"||item.label == '台湾省'||item.label == '香港特别行政区'||item.lable == "澳门特别行政区"||item.label=='南海诸岛'){
            this.$set(item,'children',[])
          }
        })
        // console.log( this.xmdqList)
      })
    },
    getRe_detail() {
      let obj = {
        jbxx_id: this.form.jbxx_id,
        gs_id: this.form.gs_id,
        analyst_id: this.user_id,
        service_id: this.form.service_id,
        cate: '企业'
      }
      this.axios.post('/relation/pro_details/re_detail', obj, data => {
        this.basicInfo = data.rows
        this.jf.needData = {
          gs_id: this.$route.query.gs_id,
          xm_user_id: data.rows.user_id
        }
        this.$set(this.basicInfo, 'zzyqText', this.basicInfo.zzyq)
        // this.$set( this.form,'mcjc',his.basicInfo.service_name)
        // this.form.mcjc = this.basicInfo.service_name
        if(this.basicInfo.role != "全域"){
           this.getUserServiceRole()
        }
         this.roleLoading=false,
        this.form.xmmc = this.basicInfo.xmmc
        this.assignmentData()
      })
    },
    getLeaveWords() {
      let obj = {
        jbxx_id: this.form.jbxx_id,
        type: 1,
        type_id: this.form.gs_id,
        cate: '对手分析'
      }
      this.axios.post('/Index/element_set/getLeaveWords', obj, data => {
        this.LeaveMessage.data = data.message
        this.LeaveMessage.total = data.total || 0

        // console.log(data);
      })
    },
    submitMsg() {
      if (this.LeaveMessage.concent != '') {
        let obj = {
          jbxx_id: this.form.jbxx_id,
          user_id: this.user_id,
          gs_id: this.form.gs_id,
          pid: '',
          // type:1,
          // type_id:this.form.gs_id,
          content: this.LeaveMessage.concent,
          reply_id: '',
          sender: this.user_id,
          receiver: '',
          cate: '对手分析'
        }
        this.axios.post('/Index/element_set/addLeaveWords', obj, daya => {
          this.getLeaveWords()
          this.LeaveMessage.concent = ''
          this.$message({
            message: '留言成功',
            type: 'success'
          })
          // console.log(data);
        })
      } else {
        this.$message({
          message: '请填写内容',
          type: 'danger'
        })
      }
    },
  }
}
</script>
<style lang='less' scoped>
#myTkHeader {
  height: 400px;
  // line-height: 40px;
  // margin-left: 50px;
}
.qyztbDetails {
  header {
    height: 60px;
    font-size: 25px;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid black;
  }
}
#myID {
  height: 100px;
  font-size: 25px;
  text-align: center;
  line-height: 100px;
  // border-bottom: 1px solid black;
     box-shadow:  0 1px 4px 1px rgb(189, 187, 186)
}
#section {
  width: 70%;
  margin: 0 auto;
}
.headerBtn {
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin-top: 20px;
  border-radius: 10;
  text-align: center;
  color: black;
  border: solid 1px #d5d5d5;
  font-size: 14px;
}
.headerColor {
  background-color: #37b6ed;
  color: white;
}
#share1 {
  position: fixed;
  right: 0px;
  bottom: calc(45%);
}
#share {
  display: flex;
  position: fixed;
  right: -210px;
  bottom: 50%;
  &:hover {
    transition: all 0.3s;
    right: 0;
  }
}
.pointer {
  cursor: pointer;
  font-size: 18px;
}
.link_color {
  color: #409eff;
  cursor: pointer;
}
</style>
