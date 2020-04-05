<!--项目详情-->
<template>
  <div class="ItemInfo_content">
    <!-- 一级页面头部开始 -->
    <div class="content_header">
      <div class="tittle">{{itemInfo.gsmc}}</div>
    </div>
    <!-- 一级页面头部结束 -->
    <!-- 一级页面身体开始 -->
    <div class="content_body">
      <div class="body_header">
        <div style="font-size:24px;margin-left:25px;margin-top:20px;">{{itemInfo.xmmc}}</div>
        <div class="evryone" style="border-bottom:1px solid #e1e1e1">
          <div class="each">
            项目业主：
            <span style="font-size:16px">{{itemInfo?itemInfo.xmyzdw:''}}</span>
          </div>
          <div class="each">
            项目地区：
            <span style="font-size:16px">{{itemInfo?itemInfo.xmdq:''}}</span>
          </div>
          <div class="each">
            项目类型：
            <span style="font-size:16px">{{itemInfo?itemInfo.xmlxB:''}}</span>
          </div>
        </div>
        <div class="evryone">
          <div class="evryone_one">项目进度：</div>
          <div class="evryone_two">
            <!--流程横排-->
            <div style="width: 100%;height:100px;">
              <ul style="height: 100px;position: relative;margin:0 auto;width:1370px;" class="liu">
                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg1+')',width:'270px',left:'0',zIndex:'100'}">
                  <span :style="{textAlign:'center',fontSize:'14px',color:itemInfo.status == '预定'?'#ffffff':'#606266'}">{{itemInfo.status=='预定'?itemInfo.stage1:'预定'}}</span>
                </li>
                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg2+')',width:'270px',left:'238px',zIndex:'99'}">
                  <span :style="{fontSize:'14px',color:itemInfo.status == '报名'?'#ffffff':'#606266'}">{{itemInfo.status=='报名'?itemInfo.stage2:'报名'}}</span>
                </li>
                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg3+')',width:'270px',left:'475px',zIndex:'98'}">
                  <span :style="{fontSize: '14px',color:itemInfo.status == '标书'?'#ffffff':'#606266'}">{{itemInfo.status=='标书'?itemInfo.stage3:'标书'}}</span>
                </li>
                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg4+')',width:'270px',left:'711px',zIndex:'97'}">
                  <span :style="{fontSize: '14px',color:itemInfo.status == '开标'?'#ffffff':'#606266'}">{{itemInfo.status=='开标'?itemInfo.stage4:'开标'}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="body_content">
        <div class="information" style="display:none">
          <div class="informatin_header">项目信息</div>
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
          <div class="table_header" style="display:flex">
            <div style="flex:1">项目管理机构</div>
            <el-button type="primary" @click="openAddRy">添加</el-button>
          </div>
          <div class="table_footer">
            <ry-list :needData="needData"></ry-list>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="添加人员" :visible.sync="addRylist_visible" width="80%">
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item label="姓名">
          <el-input v-model="addform.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="证书号">
          <el-input v-model="addform.number" placeholder="证书号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="addform.identity" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addRylistBtn">添加</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-table border :data="addTableList" v-loading="addloading">
          <el-table-column type="index" width="50px" label="序号" header-align="center" align="center"></el-table-column>
          <el-table-column label="姓名" prop="xm" align="center">
            <template slot-scope="scope">
              <span style="color: #409eff" @click="openXqOne(scope.row)">{{scope.row.xm}}</span>
            </template>
          </el-table-column>
          <el-table-column label="证书号" prop="zczsh" align="center"></el-table-column>
          <el-table-column label="身份证号" prop="sfzh" align="center"></el-table-column>
          <el-table-column label="入库" prop="modified" align="center"></el-table-column>
          <el-table-column label="备注" prop="txt" align="center"></el-table-column>
          <el-table-column label="操作" prop="capz" align="center">
            <template slot-scope="scope">
              <div v-if="!scope.row.modified">
                <el-button type="text" @click="editUserRow(scope.row)">编辑</el-button>
                <el-button type="text" @click="delUserRow(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog append-to-body title="编辑人员" :visible.sync="editaddRylist_visible">
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item label="姓名">
          <el-input v-model="NowRowRy.xm" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="证书号">
          <el-input v-model="NowRowRy.zczsh" placeholder="证书号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="NowRowRy.sfzh" placeholder="身份证号"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button type="primary" @click="onConfirmEdit_btn">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog append-to-body title="业绩列表" :visible.sync="checkyjtk" width="80%">
      <project-list :nowRow="childrenNowRow"></project-list>
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
// 组件
import iteminfoPeole from './sonPage/ItemInfoPeole'
import projectList from './template/projectList'
import ryList from './sonPage/ryList'
//引入图片
import l1u from '../assets/l1u.png'
import l1d from '../assets/l2d.png'
import l2u from '../assets/l1u.png'
import l2d from '../assets/l2d.png'
import l5u from '../assets/l5u.png'
import l5d from '../assets/l5d.png'
export default {
  components: {
    iteminfoPeole,
    projectList,
    ryList
  },
  name: 'ItemInfo',
  data() {
    return {
      //流程用图
      button_radio: {
        l1: l1u,
        l2: l2u,
        l3: l2u,
        l4: l2u,
        l5: l5u,
        l6: l1d,
        l7: l2d,
        l8: l5d
      },
      needData: {
        ry_id: this.$route.query.ry_id,
        yj_id: this.$route.query.yj_id
      },
      li: {
        bg1: '',
        bg2: '',
        bg3: '',
        bg4: ''
      },
      addform: {
        name: '',
        number: '',
        identity: ''
      },
      //换人的列表弹框
      childrenType: '', //增删改查的状态
      childrenNowRow: '', //当前选中行
      itemInfo: {},
      addRylist_visible: false,
      editaddRylist_visible: false, //编辑人员弹框状态
      loading: false,
      addloading: false,
      tableList: [],
      addTableList: [],
      page: 1,
      total: 0,
      ry_id: this.$route.query.ry_id,
      gs_id: this.$route.query.gs_id,
      gsmc: '',
      NowRowRy: {
        xm: '',
        zczsh: '',
        sfzh: ''
      }, //当前编辑人员行
      checkyjtk: false //业绩弹框
    }
  },
  created() {
    this.getItemInfo()
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
  methods: {
    //渲染进度横条
    jindu() {
      console.log(this.itemInfo.status)
      this.li.bg1 =
        this.itemInfo.status == '预定'
          ? this.button_radio.l1
          : this.button_radio.l6
      this.li.bg2 =
        this.itemInfo.status == '报名'
          ? this.button_radio.l2
          : this.button_radio.l7
      this.li.bg3 =
        this.itemInfo.status == '标书'
          ? this.button_radio.l3
          : this.button_radio.l7
      this.li.bg4 =
        this.itemInfo.status == '开标'
          ? this.button_radio.l4
          : this.button_radio.l8
    },
    // 获取业绩信息
    getItemInfo() {
      let obj = {
        jbxx_id: this.$route.query.jbxx_id,
        user_id: this.$store.state.userInfo.user_id,
        gs_id: this.$route.query.gs_id
      }
      this.axios.post('/index/project/re_detail', obj, data => {
        if (data.status == 'success') {
          this.itemInfo = data.rows
          this.jindu()
          document.title = '人员:' + this.itemInfo.gsmc
        }
      })
    },
    //查看业绩
    onHandleYj(row) {
      this.checkyjtk = true
      row.yj_id = this.itemInfo.yj_id
      this.childrenNowRow = row
    },
    //显示人员弹框
    openAddRy() {
      this.addRylist_visible = true
      this.getAddryList()
    },
    // 添加人员
    addRylistBtn() {
      let array = []
      this.addform.name ? array.push(this.addform.name) : ''
      this.addform.number ? array.push(this.addform.number) : ''
      this.addform.identity ? array.push(this.addform.identity) : ''
      if (array.length > 1) {
        this.$confirm('请确认所填信息无误!, 是否继续?', '提示', {
          confirmButtonText: '已确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let obj = {
              ry_id: this.ry_id,
              gs_id: this.$route.query.gs_id,
              user_id: this.$store.state.userInfo.user_id,
              ...this.addform
            }
            this.addloading = true
            this.axios.post('/index/Search_Ry/add_people', obj, data => {
              if (data.status == 'success') {
                this.addloading = false
                this.$message.success('成功')
                this.addform.name = ''
                this.addform.number = ''
                this.addform.identity = ''
                this.getAddryList()
              } else {
                this.$message.error('失败')
              }
            })
          })
          .catch(() => {})
      } else {
        this.$message.error('请选填两项内容')
      }
    },
    //编辑人员
    editUserRow(row) {
      this.editaddRylist_visible = true
      this.NowRowRy = JSON.parse(JSON.stringify(row))
    },
    //删除人员
    delUserRow(row) {
      this.addloading = true
      this.axios.post('/index/Search_Ry/del_people', { id: row.id }, data => {
        if (data.status == 'success') {
          this.$message.success('成功')
          this.getAddryList()
        } else {
          this.$message.error('失败')
        }
      })
    },
    //确定修改人员
    onConfirmEdit_btn() {
      this.addloading = true
      let array_l = []
      this.NowRowRy.xm ? array_l.push(1) : ''
      this.NowRowRy.zczsh ? array_l.push(1) : ''
      this.NowRowRy.sfzh ? array_l.push(1) : ''
      if (array_l.length <= 1) {
        this.$message.error('请选填两项内容')
        return
      }
      this.axios.post(
        '/index/Search_Ry/add_people',
        {
          ry_id: this.ry_id,
          gs_id: this.$route.query.gs_id,
          user_id: this.$store.state.userInfo.user_id,
          id: this.NowRowRy.id,
          name: this.NowRowRy.xm,
          number: this.NowRowRy.zczsh,
          identity: this.NowRowRy.sfzh
        },
        data => {
          if (data.status == 'success') {
            this.editaddRylist_visible = false
            this.$message.success('成功')
            this.getAddryList()
          } else {
            this.$message.success('失败')
          }
        }
      )
    },
    // 获取添加人列表信息
    getAddryList() {
      this.addloading = true
      this.axios.post(
        '/index/Search_Ry/get_temp_staff',
        {
          user_id: this.$store.state.userInfo.user_id,
          gs_id: this.gs_id,
          ry_id: this.ry_id
        },
        data => {
          this.addloading = false
          this.addTableList = data.rows || []
        }
      )
    },
    openXqOne(row) {
      let { href } = this.$router.resolve({
        path: `/ryDet?gs_id=${row.gs_id}&name=${row.xm}&staff_base_id=${row.staff_base_id ? row.staff_base_id : ""}`
      })
      window.open(href, '人员详情' + row.gs_id + row.xm)
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
            position: relative;
            background-size: 100% 100%;
            width: 250px;
            line-height: 28px;
            height: 28px;
            text-align: center;
            z-index: 10;
          }
          .eachOne:nth-child(2) {
            left: -30px;
            z-index: 9;
          }
          .eachOne:nth-child(3) {
            left: -55px;
            z-index: 8;
          }

          .eachOne:nth-child(4) {
            left: -82px;
            z-index: 7;
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
          font-size: 20px;
          margin: 25px;
        }
        .table_footer {
          margin: 25px;
          display: block;
        }
      }
    }
  }
}
</style>
<style scoped>
.liu li {
  width: 250px;
  height: 28px;
  float: left;
  list-style: none;
  position: absolute;
  text-align: center;
  line-height: 28px;
}
</style>