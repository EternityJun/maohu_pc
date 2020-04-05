<!--项目详情-->
<template>
  <div class="ItemInfo_content">
    <!-- 一级页面头部开始 -->
    <div class="content_header">
      <div class="tittle">{{itemInfo.xmmc}}</div>
    </div>
    <!-- 一级页面头部结束 -->

    <!-- 一级页面身体开始 -->
    <div class="content_body">
      <div class="body_header">
        <div class="evryone" style="border-bottom:1px solid #e1e1e1">
          <div class="each">
            项目业主：
            <span style="font-size:16px">{{itemInfo.xmyzdw}}</span>
          </div>
          <div class="each">
            项目地区：
            <span style="font-size:16px">{{itemInfo.xmdq}}</span>
          </div>
          <div class="each">
            项目类型：
            <span style="font-size:16px">{{itemInfo.xmlxB}}</span>
          </div>
        </div>
        <div class="evryone">
          <div class="evryone_one">
            项目进度：
          </div>
          <div class="evryone_two">
            <div class="eachOne" :style="firstStyle">预定</div>
            <div class="eachOne" :style="centerStyle">{{itemInfo.stage2?itemInfo.stage2:'报名'}}</div>
            <div class="eachOne" :style="centerStyle2">标书</div>
            <div class="eachOne" :style="lastStyle">{{itemInfo.stage4?itemInfo.stage4:'开标'}}</div>
          </div>
        </div>
      </div>
      <div class="body_content">
        <div class="information">
          <div class="informatin_header">
            项目信息
          </div>
          <div class="xmxx_class">
            <div class="myrow">
              <div>资质要求</div>
              <div class="mycol_1">{{itemInfo.zzyq}}</div>
            </div>
            <div class="myrow">
              <div>人员要求</div>
              <div class="mycol_1">{{itemInfo.ryyq}}</div>
            </div>
            <div class="myrow">
              <div>业绩要求</div>
              <div class="mycol_1">{{itemInfo.yjyq}}</div>
            </div>
            <div class="myrow">
              <div>其它要求</div>
              <div class="mycol_1">{{itemInfo.qtyq}}</div>
            </div>
          </div>
        </div>
        <div class="table">
          <div class="table_header">
            相关企业
          </div>
          <div class="table_footer">
            <el-table border :data="gsDataL.gslist" v-loading="gsDataL.loading">
              <el-table-column type="index" width="50px" label="序号" header-align="center" align="center">
              </el-table-column>
              <el-table-column prop="gsmc" label="企业名称" width="200px" align="center">
                <template slot-scope="scope">
                  {{scope.row.gsmc}}
                </template>
              </el-table-column>
              <el-table-column label="人员情况" prop="people_situation" align="center">
                <template slot-scope="scope">
                  <el-button :style="{color:scope.row.ry_status?'#3a8ee6':'red'}" @click="onjumpRy(scope.row)" size="small" type="text">{{scope.row.people_situation}}</el-button>
                </template>
              </el-table-column>
              <el-table-column label="业绩情况" prop="yj" align="center">
                <template slot-scope="scope">
                  <el-button :style="{color:scope.row.yj_status?'#3a8ee6':'red'}" size="small" type="text">{{scope.row.project_situation}}</el-button>
                </template>
              </el-table-column>
              <el-table-column label="其他情况" prop="other_situation" align="center"></el-table-column>
              <el-table-column label="标签" align="center">
                <template slot-scope="scope">
                  <el-popover placement="top" title="标签" width="460" v-model="scope.row.visible" @show="showTagRow(scope.row,1)">
                    <el-form label-width="152px" @submit.native.prevent>
                      <el-form-item label="是否是国企/央企">
                        <el-radio-group v-model="tagData.qyxz">
                          <el-radio label="2">否</el-radio>
                          <el-radio label="1">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="从不投标/不对外投标">
                        <el-radio-group v-model="tagData.tbpl">
                          <el-radio label="2">否</el-radio>
                          <el-radio label="1">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="不好合作">
                        <el-radio-group v-model="tagData.cooperation">
                          <el-radio label="2">否</el-radio>
                          <el-radio label="1">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="公司有问题">
                        <el-radio-group v-model="tagData.issue">
                          <el-radio label="2">否</el-radio>
                          <el-radio label="1">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="其他">
                        <el-input @keyup.enter.native="onCloseTag(scope.row,'confirm',1)" v-model="tagData.other" style="width:260px" placeholder="其他问题"></el-input>
                      </el-form-item>
                      <el-form-item label-width="0" align="center">
                        <el-button size="small" @click="onCloseTag(scope.row,'cancel',1)">取消</el-button>
                        <el-button type="primary" size="small" @click="onCloseTag(scope.row,'confirm',1)">确定</el-button>
                      </el-form-item>
                    </el-form>
                    <el-button slot="reference" type="text" icon="el-icon-star-off"></el-button>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="操作" prop="cz" align="center">
                <template slot-scope="scope">
                  <el-button @click="onOpenMs(scope.row)" type="text" icon="el-icon-edit-outline"></el-button>
                </template>
              </el-table-column>
              <el-table-column label="审核" prop="sh" align="center">
                <template slot-scope="scope">
                  <el-button @click="onPassBtn(scope.row,2)" type="text" style="color:#606266">不通过
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px" ref="fenye" @current-change="pageSizeChangeL" align="right" background layout="total,prev, pager, next" :total="gsDataL.total"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="对企业的描述" :visible.sync="qymsDialogVisible" width="60%">
      <div v-loading='msloading'>
        <div>
          <el-row v-for="(one,i) in msdata" :key="i" type="flex" style="flex-direction:column;margin-bottom:20px">
            <el-row type="flex" style="align-items:center;margin-bottom:4px">
              <img style="height:32px;" :src="one.headimgurl" alt="">
              <div style="padding:0 6px 0 10px">{{one.user_name}}</div>
              <span>{{one.modified}}</span>
            </el-row>
            <div style="flex:1;padding-left:40px">{{one.content}}</div>
          </el-row>
        </div>
        <div>
          <el-input type="textarea" @keyup.ctrl.enter.native="onPj" :rows="4" placeholder="请输入内容" v-model="textareaValue">
          </el-input>
        </div>
        <div style="color:#cccccc;font-size:14px;">
          Ctrl+Enter提交
        </div>
        <div style="text-align:right;margin-top:10px">
          <el-button type="primary" @click="onPj">评价</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import firstImgUrl from '../assets/h1.png'
import centerImgUrl from '../assets/h1.png'
import lastImgUrl from '../assets/h4.png'
//高亮组
import prifirstImgUrl from '../assets/l1u.png'
import pricenterImgUrl from '../assets/l1u.png'
import prilastImgUrl from '../assets/l5u.png'

export default {
  name: 'ItemInfo',
  data() {
    return {
      user_id: this.$store.state.userInfo.user_id,
      jbxx_id: this.$route.query.jbxx_id,
      nowRow: null,
      msdata: null,
      qymsDialogVisible: false,
      msloading: false, //描述等待
      textareaValue: '', //多行文本框
      itemInfo: {
        xmmc: ''
      },
      tagData: {
        qyxz: '',
        tbpl: '', //不投标
        cooperation: '', //不好合作
        issue: '', //有问题
        other: ''
      },
      gsDataL: {
        total: 0,
        page: 1,
        loading: false,
        gslist: []
      },
      gsDataR: {
        page: 1,
        total: 0,
        loading: false,
        gslist: []
      }
    }
  },
  computed: {
    firstStyle() {
      let imgurl = this.itemInfo.stage1 ? prifirstImgUrl : firstImgUrl
      return {
        color: '#ffffff',
        backgroundImage: 'url(' + imgurl + ')'
      }
    },
    centerStyle() {
      let imgurl = this.itemInfo.stage2 ? pricenterImgUrl : centerImgUrl
      return {
        color: '#ffffff',
        backgroundImage: 'url(' + imgurl + ')'
      }
    },
    centerStyle2() {
      let imgurl = this.itemInfo.stage3 ? pricenterImgUrl : centerImgUrl
      return {
        color: '#ffffff',
        backgroundImage: 'url(' + imgurl + ')'
      }
    },
    lastStyle() {
      let imgurl = this.itemInfo.stage4 ? prilastImgUrl : lastImgUrl
      return {
        color: '#ffffff',
        backgroundImage: 'url(' + imgurl + ')'
      }
    }
  },
  created() {
    this.getItemInfo()
    //公司集合
    this.getGsList(1) //已审核
    this.getGsList(2) //未审核
  },
  methods: {
    //保存标签/关闭标签
    onCloseTag(row, type, valid) {
      //点击确定后关闭
      let tabledata = null
      if (type == 'confirm') {
        let tapobj = this.tagData
        var obj = {
          thread_id: row.thread_id,
          gs_id: row.gs_id,
          type: 'list',
          ...tapobj
        }
        this.axios.post('/Index/Others/label', obj, data => {
          if (data.status == 'success') {
            this.$message.success('成功')
            this.getGsList(valid)
          } else {
            this.$message.error('失败')
          }
        })
      }
      if (valid == 1) {
        this.gsDataL.gslist.map(v => {
          if (v.id == row.id) {
            v.visible = false
          }
          return v
        })
      } else {
        this.gsDataR.gslist.map(v => {
          if (v.id == row.id) {
            v.visible = false
          }
          return v
        })
      }
    },
    //显示标签
    showTagRow(row, type) {
      this.nowRow = row
      this.axios.post('/Index/Others/labelShow', { gs_id: row.gs_id }, data => {
        if (data.status == 'success') {
          this.tagData = data.rows
        }
      })
    },
    //打开对企业的描述弹框
    onOpenMs(row) {
      this.msdata = null
      this.nowRow = row
      this.qymsDialogVisible = true
      this.msloading = true
      this.getGsMslist(row)
    },
    // 点击评价
    onPj() {
      if (this.textareaValue == '') {
        this.$message.error('请输入评价内容')
      } else {
        this.qymsDialogVisible = false
        let obj = {
          jbxx_id: this.jbxx_id,
          user_id: this.user_id,
          gs_id: this.nowRow.gs_id,
          content: this.textareaValue,
          flag: 1
        }
        this.axios.post('/index/Element_Set/addLeaveWords', obj, data => {
          this.textareaValue = ''
          if (data.status == 'success') {
            this.$message.success('成功')
          } else {
            this.$message.success('成功')
          }
        })
      }
    },
    //点击通过/不通过
    onPassBtn(row, valid) {
      let obj = {
        gs_id: row.gs_id,
        user_id: this.user_id,
        jbxx_id: this.jbxx_id,
        valid
      }
      this.axios.post('/index/Human_Review/saveCompanyReview', obj, data => {
        if (data.status == 'success') {
          this.getGsList(2)
          this.getGsList(1)
        }
      })
    },
    //获取评论信息
    getGsMslist(row) {
      let obj = {
        jbxx_id: this.jbxx_id,
        user_id: this.user_id,
        gs_id: row.gs_id
      }
      this.axios.post('/index/Element_Set/companyReviewWords', obj, data => {
        this.msloading = false
        if (data.status == 'success') {
          this.msdata = data.message
        }
      })
    },
    //获取业绩信息
    getItemInfo() {
      let obj = {
        jbxx_id: this.$route.query.jbxx_id,
        user_id: this.user_id
      }
      this.axios.post('/index/project/re_detail', obj, data => {
        if (data.status == 'success') {
          this.itemInfo = data.rows
        }
      })
    },
    pageSizeChangeL(val) {
      this.gsDataL.page = val
      this.getGsList(1)
    },
    pageSizeChangeR(val) {
      this.gsDataR.page = val
      this.getGsList(2)
    },
    //请求公司描述
    getGsList(valid) {
      let obj = {
        jbxx_id: this.jbxx_id,
        user_id: this.user_id,
        is_bs: 1,
        row: 10,
        valid: valid
      }
      if (valid == 1) {
        obj.page = this.gsDataL.page
        this.gsDataL.loading = true
      } else {
        obj.page = this.gsDataR.page
        this.gsDataR.loading = true
      }
      this.axios.post('/index/Human_Review/companyReviewList', obj, data => {
        this.gsDataR.loading = false
        this.gsDataL.loading = false
        if (valid == 1) {
          this.gsDataL.gslist = data.rows
          this.gsDataL.total = data.total || 0
        } else {
          this.gsDataR.gslist = data.rows
          this.gsDataR.total = data.total || 0
        }
      })
    },
    //打开人员详情列表
    onjumpRy(row) {
      let { href } = this.$router.resolve({
        path: `/itemCheckInfoRy?jbxx_id=${this.jbxx_id}&gs_id=${
          row.gs_id
        }&ry_id=${row.ry_id}`
      })
      window.open(href, 'b' + row.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.xmxx_class {
  margin-left: 50px;
  font-size: 14px;
}
.myrow {
  margin: 20px 0;
  display: flex;
}
.myrow > div:first-child {
  width: 120px;
}
.mycol_1 {
  flex: 1;
}
a:link {
  color: #409eff;
  text-decoration: none;
}

.ItemInfo_content {
  // 一级页面头部开始
  .content_header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .tittle {
      // line-height: 60px;
      padding: 14px 0;
      -moz-box-shadow: 0px 0px 0px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      width: 100%;
      font-size: 32px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
  // 一级页面头部结束

  // 一级页面身体开始
  .content_body {
    display: flex;
    padding: 25px;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    // height: calc(~'100% - 60px');
    background: #f9f9f9;
    .body_header {
      background: #ffffff;
      margin-bottom: 20px;
      -moz-box-shadow: 0px 0px 5px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      .evryone {
        display: flex;
        flex-direction: row;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        .each {
          min-width: 150px;
          margin-left: 25px;
          height: 60px;
          justify-content: center;
          span {
            color: #606266;
          }
        }
        .each_button {
          width: 49%;
          height: 60px;
          text-align: right;
          padding-right: 25px;
        }
        .evryone_one {
          width: 125px;
          height: 60px;
          margin-left: 25px;
        }
        .evryone_two {
          height: 28px;
          display: flex;
          flex-direction: row;
          // width: 740px;
          // height: 20px;
          margin-top: 20px;
          font-size: 14px;
          color: #000000;
          .eachOne {
            background-size: 100% 100%;
            width: 250px;
            line-height: 28px;
            height: 28px;
            text-align: center;
            position: relative;
            z-index: 10;
          }
          .eachOne:nth-child(2) {
            z-index: 9;
            left: -30px;
          }
          .eachOne:nth-child(3) {
            z-index: 8;
            left: -55px;
          }
          .eachOne:nth-child(4) {
            z-index: 7;
            left: -82px;
          }
          .active {
            background-image: url('../assets/jd.png');
            background-repeat: no-repeat;
            background-size: cover;
            width: 250px;
            height: 28px;
            text-align: center;
            color: #ffffff;
          }
        }
      }
      .evryone:nth-child(3),
      .evryone:nth-child(2) {
        border: none;
      }
    }
    .body_content {
      background: #ffffff;
      // height: calc(~'100% - 270px');
      -moz-box-shadow: 0px 0px 5px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      .information {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        .informatin_header {
          display: flex;
          margin-left: 25px;
          font-size: 20px;
          height: 70px;
          line-height: 70px;
        }
        .infromation_body {
          font-size: 14px;
          display: flex;
          flex-direction: row;
          margin-left: 50px;
          .each_left {
            display: flex;
            width: 100px;
            flex-direction: column;
            margin-right: 25px;
            .left_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
          }
          .each_right {
            display: flex;
            flex-direction: column;
            .right_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
            // .right_each_two {
            //   margin-bottom: 20px;
            //   color: #06b6ff;
            // }
            .right_botton {
              display: flex;
              flex-direction: row;
              color: #409eff;
              .button_left {
                display: flex;
                flex-direction: column;
                margin-right: 115px;
                .right_each_two {
                  cursor: pointer;
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
              }
              .button_right {
                border: 1px solid #9d9d9d;
                padding-left: 20px;
                padding-right: 80px;
                display: flex;
                flex-direction: column;
                align-content: center;
                display: flex;
                .right_each_two {
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
                .right_each_two:last-child {
                  margin-bottom: 0px;
                }
              }
            }
          }
        }
      }
      .table {
        display: flex;
        flex-direction: column;
        .table_header {
          margin-left: 25px;
          font-size: 20px;
          margin-bottom: 25px;
          margin-right: 25px;
        }
        .table_footer {
          margin-left: 25px;
          display: block;
          margin-right: 25px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
