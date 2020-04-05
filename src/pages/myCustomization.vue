<template>
  <div id="myCustomization">
    <body-top></body-top>
    <div style="height:60px;">
      <head-menu style="height:60px;" :index="'/myCustomization'"></head-menu>
    </div>
    <div class="content" v-loading='loading'>
      <zbgg :options="zbgg_options" @onSearch="onSearch" @onAddMap='onAddMap' class="searchBox" v-if="refreshZbgg" @onOpenMap="onOpenMap"></zbgg>
      <el-row>
        <el-col :span="24">
          <div>
            <h1 class="title">定制清单
              <!-- 暂只能定制一个清单， -->
              <p>（定制说明：此处定制的是未上网招标的项目，暂只能定制一个清单，您填写的信息越全面，我们为您匹配的内容将越精准。项目上网后会第一时间通知您）</p>
            </h1>
            <el-row>
              <el-col :span="24">
                <div class="card-content">
                  <el-card class="box-card single-card" v-for="(item,i) in list" :key="i">
                    <div slot="header" class="clearfix">
                      <span>定制项</span>
                      <span class="time">{{item.modified}}</span>
                      <i class="el-icon-delete delete" @click="delDz(item)"></i>
                      <span class="item" v-show="item.unread>0">{{item.unread}}</span>
                    </div>
                    <ul>
                      <li v-if="item.xmmc || item.xmyz">
                        <el-row style="width:100%">
                          <el-col :span="5">关&nbsp;键&nbsp;词&nbsp;&nbsp;：</el-col>
                          <el-col :span="19">
                            <div class="overflow">
                              <span v-if="item.xmmc" v-for="(item,i) in item.xmmc.split(',')" :key="i" class="block">{{item}}</span>
                              <span v-if="item.xmyz" v-for="(item,i) in item.xmyz.split(',')" :key="i+'-1'" class="block">{{item}}</span>
                            </div>
                          </el-col>
                        </el-row>
                      </li>
                      <!-- <li>
                        <p>业主名称：</p>
                        <p >{{item.xmyz}}</p>
                      </li> -->
                      <li>
                        <!-- <p>交易类型：</p>
                        <p class="overflow">{{item.jylx.indexOf('全部')>-1 ? '全部' : item.jylx}}</p> -->
                        <el-row style="width:100%">
                          <el-col :span="5">交易类型：</el-col>
                          <el-col :span="19">
                            <div class="overflow">
                              <span class="block" v-if="item.jylx.indexOf('全部')>-1 || item.jylx.length==0">全部</span>
                              <span v-else v-for="(item,i) in item.jylx.split(',')" :key="i" class="block">{{item}}</span>
                            </div>
                          </el-col>
                        </el-row>
                      </li>
                      <li>
                        <el-row style="width:100%">
                          <el-col :span="5">所在地区：</el-col>
                          <el-col :span="19">
                            <div class="overflow">
                              <div v-for="(item_,i_) in item.area" :key="i_">
                                <span class="block" v-if="item_.province.status==1">{{item_.province.name}}(全)</span>
                                <span v-else class="block" v-for="(item2_,i2_) in item_.city">{{item_.province.name}}-{{item2_.name}}(
                                  <span v-if="item2_.status==1">全</span>
                                  <span v-else>{{item2_.local.length}}</span>
                                  )</span>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                        <!-- <el-row>
                          <el-col :span="5">所在地区：</el-col>
                          <el-col :span="19">
                            <div class="overflow">
                              <span v-for="(item_,i_) in item.area" :key="i" >
                                <span v-if="item_.province.status==1">{{item_.province.name}}(全)</span>
                                <span v-else class="block" v-for="(item2_,i2_) in item_.city" >{{item_.province.name}}-{{item2_.name}}(
                                  <span v-if="item2_.status==1">全</span>
                                  <span v-else>{{item2_.local.length}}</span>
                                  )</span>
                              </span>
                            </div>
                          </el-col>
                        </el-row> -->
                        <!-- <p>所在地区：</p>
                        <p class="overflow">
                          {{item.area[0].province.name}}
                          <span v-if="item.area[0].province.status==1">(全)</span>
                          <span v-else>
                            <span v-if="item.area[0].city.length>0"> ：</span>
                            <span v-for="(item,i) in item.area[0].city" :key="i" style="margin-right:20px">
                              <span v-if="item.local.length>0">
                                <span>{{i-0+1}}.</span>
                                {{item.name}}
                                <span v-if="item.status==1">(全)</span>
                              </span>
                              <span v-if="item.local.length>0 && item.status==0"> (</span>
                              <span v-if="item.status==0">
                                <span v-for="(local,i_local) in item.local" :key="i_local">
                                  <span v-if="i_local<3">{{local}}
                                    <span v-if="item.local.length>i_local-0+1 && i_local!=2">,</span>
                                  </span>
                                </span>
                                <span v-if="item.local.length>3">......</span>
                              </span>
                              <span v-if="item.local.length>0 && item.status==0">)</span>
                            </span>
                          </span>
                        </p> -->
                      </li>
                    </ul>
                    <div class="bottom clearfix">
                      <el-button type="primary" size="small" class="button" @click="handle(1,item,i)">编辑</el-button>
                      <el-button type="primary" size="small" class="button" @click="handle(2,item,i)">查看结果</el-button>
                    </div>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="dialogVisible">
      <el-dialog title="编辑" :before-close='beforeClose' :visible.sync="dialogVisible" width="80%" :close-on-click-modal="close_on_click_modal">
        <zbgg :options="zbgg_options" @onSearch="onSearch" @onAddMap='onAddMap'></zbgg>
      </el-dialog>
    </div>

    <div v-if="dialogVisibleResult">
      <el-dialog top="10px" title="定制结果" :visible.sync="dialogVisibleResult" width="90%" class="dialogVisibleResult" :close-on-click-modal="close_on_click_modal">
        <my-custom-result :myCustomResultData='myCustomResultData' @refresh="refresh"></my-custom-result>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleResult = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- <div v-if="mapDialogVisable">
      <el-dialog top="10px" title="查看结果" :visible.sync="mapDialogVisable" width="97%" class="dialogVisibleResult" :close-on-click-modal="close_on_click_modal">
        <province-city-district-map @onAddMap='onAddMap'></province-city-district-map>
      </el-dialog>
    </div> -->
  </div>
</template>

<script>
import myCustomResult from './myCustomResult'
import zbgg from './template/myCustomizationSearch' //招标公告搜索框
import provinceCityDistrictMap from './template/provinceCityDistrictMap' //招标公告搜索框
import headMenu from './template/head_menu.vue'

export default {
  components: {
    myCustomResult,
    zbgg,
    provinceCityDistrictMap,
    headMenu
  },
  data() {
    return {
      mapDialogVisable: false,
      refreshZbgg: true,
      close_on_click_modal: false,
      loading: false,
      loadingSave: false,
      dialogVisible: false,
      dialogVisibleResult: false,
      props: { multiple: true },
      editId: '',
      numberValidateForm: {
        age: ''
      },
      form: {
        num: '',
        area: [],
        xmlb: [],
        zblb: '',
        xmmc: '',
        xmyz: '',
        xmmc_remnant: 50,
        xmyz_remnant: 50
      },
      editForm: {
        num: '',
        area: [],
        xmlb: [],
        zblb: '',
        xmmc: '',
        xmyz: '',
        xmmc_remnant: 50,
        xmyz_remnant: 50
      },
      list: [],
      provinceCity: [],
      projType: {
        xmlb: [],
        zblb: []
      },
      //传到组件的数据
      myCustomResultData: {},
      area_from: 'pc',
      zbgg_options: {
        size: 'middle',
        from: 'wddz', //定制
        type: 'add',
        searchZbgg: {
          xmmc: '',
          xmmcs: [],
          xmyz: '',
          xmyzs: [],
          jylx: [],
          jylx_gcjs: [
            { label: '工程施工', status: false },
            { label: '代理', status: false },
            { label: '监理', status: false },
            { label: '勘察设计', status: false },
            { label: '造价', status: false },
            { label: '其他招标', status: false }
          ],
          jylx_zfcg: [{ label: '政府采购', status: false }],
          area: []
        }
      },
      changeAreaArr: [],
      gcjs: [],
      zfcg: []
    }
  },
  created: function() {
    this.fn_cate()

    this.getJylx()
  },
  methods: {
    // 获取招标定制条件
    getZbCondition() {
      this.axios.post(
        '/index/Tendering/zbCondition',
        { user_id: this.$store.state.userInfo.user_id },
        data => {
          if (data.status == 'success') {
            if (data.rows.area.length > 0) {
              this.changeAreaArr = data.rows.area
              this.fnChangeAreaArr(data.rows.area, 'mapToSelect', '')
            }
            if (data.rows.jylx) {
              this.refreshZbgg = false
              this.$nextTick(function() {
                this.zbgg_options.searchZbgg.jylx = data.rows.jylx.split(',')
                if (this.zbgg_options.searchZbgg.jylx.length == this.jylxs.length - 1) {
                  this.zbgg_options.searchZbgg.jylx.unshift('全部')
                }
                this.refreshZbgg=true
                console.log(this.zbgg_options.searchZbgg.jylx)
              })
            } else if (data.rows.area.length == 0 && !data.rows.jylx) {
              this.formatArea()
            }
          } else {
            this.formatArea()
          }
        }
      )
    },
    // 请求交易类型
    getJylx() {
      this.axios.post('/index/Tendering/getJylx', {}, data => {
        // let gcjs = data.gcjs,
        //   zfcg = data.zfcg
        // gcjs.forEach(v => {
        //   v.status = false
        // })
        // zfcg.forEach(v => {
        //   v.status = false
        // })

        // this.refreshZbgg = false
        // this.$nextTick(() => {
        //   this.zbgg_options.searchZbgg.jylx_gcjs = gcjs
        //   this.zbgg_options.searchZbgg.jylx_zfcg = zfcg
        //   this.refreshZbgg = true
        // })
        // this.gcjs = JSON.parse(JSON.stringify(gcjs))
        // this.zfcg = JSON.parse(JSON.stringify(zfcg))
        this.jylxs = data
        this.displayDz()
        this.getZbCondition()
      })
    },
    beforeClose(done) {
      this.editId = ''
      done()
    },
    onAddMap(obj) {
      // console.log('地图返回的数据')
      // console.log(JSON.stringify(obj))
      // this.mapDialogVisable = false
      // this.fnChangeAreaArr(obj, 'mapToSelect')
      // this.mapDialogVisable = false
      // this.area_from = 'App'
      // this.changeAreaArr = obj
      // this.changeArea(obj, 'mapToSelect')
    },
    changeArea(area, type) {
      this.axios.post('/index/Tendering/changeArea', { area, type }, data => {
        if (type == 'selectToMap') {
          this.changeAreaArr = data.save //包含数组
          this.saveDz()
        } else {
          this.zbgg_options.searchZbgg.form.area = data
        }
      })
    },
    onOpenMap() {
      this.mapDialogVisable = true
    },
    onSearch(obj) {
      // console.log('obj')
      console.log(obj)
      if (obj.type == 'close') {
        this.editId = ''
        this.dialogVisible = false
        this.zbgg_options.type = 'add'
        this.zbgg_options.searchZbgg = {
          xmmc: '',
          xmmcs: [],
          xmyz: '',
          xmyzs: [],
          jylx: [],
          // jylx_gcjs: this.gcjs,
          // jylx_zfcg: this.zfcg,
          area: []
        }
        this.refreshZbgg = false

        this.$nextTick(() => {
          this.refreshZbgg = true
        })
      } else {
        this.dialogVisible = false

        this.zbgg_options.searchZbgg = JSON.parse(JSON.stringify(obj.form))
        if (obj.form.area.length == 0) {
          this.$confirm('地区必选！', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
            .then(() => {})
            .catch(() => {})
          return
        }
        this.saveDz()
        // this.changeArea(obj.form.area, 'selectToMap')
      }
    },
    refresh() {
      this.displayDz()
    },
    fn_cate() {
      this.axios.post('/index/common/getProvinceCity', {}, data => {
        this.provinceCity = data
      })
      this.axios.post('/index/Tendering/getProjType', {}, data => {
        this.projType = data.rows
      })
    },

    handle(type, item, i) {
      if (type == 1) {
        //编辑
        this.editId = item.id
        this.zbgg_options.type = 'edit'
        this.dialogVisible = true
        let item_ = JSON.parse(JSON.stringify(item))
        let jylxs = []
        console.log(jylxs)

        // let jylx_gcjs = this.zbgg_options.searchZbgg.jylx_gcjs
        // let jylx_zfcg = this.zbgg_options.searchZbgg.jylx_zfcg
        this.jylxs.map(v => {
          if (item_.jylx.indexOf(v.label) > -1) {
            jylxs.push(v.value || '全部')
          }
        })
        // jylx_zfcg.map(v => {
        //   if (jylxs.indexOf(v.label) > -1) {
        //     v.status = true
        //   } else {
        //     v.status = false
        //   }
        // })
        // let area = JSON.parse(item_.area_pc),
        //   pass = []
        // area.forEach(e => {
        //   pass.push([e.province, e.city, e.local])
        // })
        this.zbgg_options.searchZbgg = {
          xmmc: '',
          xmmcs: item_.xmmc ? item_.xmmc.split(',') : [],
          xmyz: '',
          xmyzs: item_.xmyz ? item_.xmyz.split(',') : [],
          jylx: jylxs,
          // jylx_gcjs: jylx_gcjs,
          // jylx_zfcg: jylx_zfcg,
          area: item.area
        }
        this.refreshZbgg = false

        this.$nextTick(() => {
          this.refreshZbgg = true
        })
        // let area = []
        // area = item_.area.split(',').map(ele => {
        //   if (ele.indexOf('/') == ele.length - 1) {
        //     ele = ele.substring(0, ele.length - 1)
        //     ele = [ele]
        //   } else {
        //     ele = ele.split('/')
        //   }
        //   return ele
        // })
        // item_.area = area
        // item_.xmlb = item_.xmlb ? item_.xmlb.split(',') : []
        // this.editForm = JSON.parse(JSON.stringify(item_))
      } else {
        this.dialogVisibleResult = true
        this.myCustomResultData = item
      }
    },
    handleChange(value) {},

    saveDz() {
      let type = this.editId ? 2 : 1 ////type 添加1 编辑2 删除3
      let edit_id = ''
      if (this.editId) {
        //编辑
        edit_id = this.editId
      }
      // console.log(edit_id + '---edit_id')
      if (this.list.length > 0 && !edit_id) {
        this.$confirm('已有定制,是否覆盖之前的定制？', '提示', {
          confirmButtonText: '覆盖',
          type: 'warning'
        })
          .then(() => {
            type = 2
            edit_id = this.list[0].id
            this.handleSaveDz(type, edit_id)
          })
          .catch(() => {
            return
          })
      } else {
        this.handleSaveDz(type, edit_id)
      }
    },
    handleSaveDz(type, edit_id) {
      let jylx = this.zbgg_options.searchZbgg.jylx
      // this.zbgg_options.searchZbgg.jylx_gcjs.concat(
      //   this.zbgg_options.searchZbgg.jylx_zfcg
      // )
      let jylxs = []
      // jylx.forEach(ele => {
      //   if (ele.status) {
      //     jylxs.push(ele.value)
      //   }
      // })
      jylxs = jylx.filter(v => {
        return v != '全部'
      })
      let params = {
        user_id: this.$store.state.userInfo.user_id,
        xmmc: this.zbgg_options.searchZbgg.xmmcs.join(','),
        xmyz: this.zbgg_options.searchZbgg.xmyzs.join(','),
        area: this.zbgg_options.searchZbgg.changeAreaArr, //包含
        area_pc: this.zbgg_options.searchZbgg.area, //分散
        area_type:
          this.zbgg_options.searchZbgg.area[0][0] == '四川省' ? '四川' : '全国',
        jylx: jylxs.join(','),
        login_type: this.area_from,
        id: edit_id,
        type: type ////type 添加1 编辑2 删除3
      }

      this.loadingSave = true
      this.loading = true
      this.axios.post('/index/Tendering/saveDz', params, data => {
        this.loadingSave = false
        this.refreshZbgg = false
        this.loading = false

        this.$nextTick(() => {
          this.refreshZbgg = true
        })

        if (data.status == 'success') {
          this.$message.success('保存成功')
          this.zbgg_options.searchZbgg = {
            xmmc: '',
            xmmcs: [],
            xmyz: '',
            xmyzs: [],
            jylx_gcjs: this.gcjs,
            jylx_zfcg: this.zfcg,
            area: []
          }
          this.editId = ''
          this.dialogVisible = false
          this.displayDz()
        } else {
          this.$confirm('保存失败！' + data.message, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
            .then(() => {})
            .catch(() => {})
        }
      })
    },
    displayDz() {
      //定制清单
      this.loading = true
      let params = {
        user_id: this.$store.state.userInfo.user_id,
        page: 1,
        rows: 100
      }
      this.axios.post('/index/Tendering/dzList', params, data => {
        this.loading = false
        this.list = data.rows || []
        this.list.forEach(element => {
          let jylx = element.jylx,
            yjlxs = []
          this.jylxs.forEach(e => {
            if (e.value) {
              if (jylx.indexOf(e.value) > -1) {
                yjlxs.push(e.label)
              }
            }
          })
          if (yjlxs.length == this.jylxs.length - 1) {
            yjlxs.unshift('全部')
          }

          // this.gcjs.forEach(e => {
          //   if (jylx.indexOf(e.value) > -1) {
          //     yjlxs.push(e.label)
          //   }
          // })
          // this.zfcg.forEach(e => {
          //   if (jylx.indexOf(e.value) > -1) {
          //     yjlxs.push(e.label)
          //   }
          // })
          element.jylx = yjlxs.join(',')
        })
      })
    },
    delDz(row) {
      this.$confirm('取消定制, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {
            id: row.id,
            type: 3
          }
          this.axios.post('/index/Tendering/saveDz', params, data => {
            if (data.status == 'success') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.displayDz()
            } else {
              this.$confirm('删除失败！' + data.message, '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning'
              })
                .then(() => {})
                .catch(() => {})
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>
<style>
.single-card .el-card__header {
  padding: 10px 20px;
}
.dialogVisibleResult .el-dialog__body {
  padding: 0px 20px 30px 20px;
}
</style>

<style lang="less" scoped>
#myCustomization {
  .searchBox {
    // border: 1px solid #45a4fc;
    // margin-top: 20px;
  }
  .content {
    width: 1300px;
    margin: 0 auto;

    .addCustom {
      border-bottom: 1px solid #f3f3f3;
    }
    .title {
      margin: 15px 0;
      color: #999;
      font-size: 20px;
      display: flex;
      align-items: center;
      p {
        font-size: 15px;
      }
    }
    .normalSelect {
      width: 375px;
    }
    .normalInput {
      width: 566px;
    }
    .card-content {
      display: flex;
      flex-flow: row wrap;

      .single-card:nth-child(3n) {
        margin: 0 0 20px 0;
      }
      .single-card {
        width: 410px;
        height: 280px;
        margin: 0 30px 30px 0;
        .clearfix {
          .item {
            float: right;
            color: white;
            background-color: #f56c6c;
            display: inline-block;
            padding: 2px 5px;
            border-radius: 10px;
            font-size: 12px;
            margin-right: 10px;
            margin-top: 1px;
          }
          .delete {
            width: 20px;
            height: 20px;
            float: right;
            color: #999;
            font-size: 20px;
            cursor: pointer;
          }
          .time {
            font-size: 13px;
            color: #999;
            margin-left: 20px;
          }
        }
        ul::-webkit-scrollbar {
          width: 5px;
        }
        ul::-webkit-scrollbar-track {
          background-color: #f1f1f1;
          -webkit-border-radius: 2em;
          -moz-border-radius: 2em;
          border-radius: 2em;
        }
        ul::-webkit-scrollbar-thumb {
          background-color: #d1d1d1;
          -webkit-border-radius: 2em;
          -moz-border-radius: 2em;
          border-radius: 2em;
        }
        ul {
          height: 160px;
          overflow: auto;
          list-style: none;
          li {
            font-size: 13px;
            margin-bottom: 10px;
            display: flex;
            p:first-child {
              width: 65px;
            }
            p:last-child {
              flex: 1;
            }
          }
        }

        .bottom {
          text-align: center;
          margin-top: 10px;
        }
      }
    }
  }
  .remnant {
    text-align: right;
    color: #999;
  }
  .overflow {
    // width: 100px;
    overflow: hidden;
    // text-overflow: ellipsis;
    max-height: 50px;
    // white-space: nowrap;
  }
  .block {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 18px;
    border: 1px solid #d1d1d1;
    margin: 0 5px 5px 5px;
    font-size: 12px;
  }
}
</style>

