<template>
  <div id="myCustomResult">
    <el-row>
      <el-col :span="24">
        <div class="header">
          <!-- <el-row>
            <el-col :span='12'>
              <p v-show="myCustomResultData.xmmc">
                <label>项目名称：</label>
                <span>{{myCustomResultData.xmmc}}</span>
              </p>
            </el-col>
            <el-col :span='12'>
              <p v-show="myCustomResultData.xmyz">
                <label>业主名称：</label>
                <span>{{myCustomResultData.xmyz}}</span>
              </p>
            </el-col>
          </el-row> -->

          <div class="content">
            <p v-show="myCustomResultData.xmmc || myCustomResultData.xmyz">
              <label>关&nbsp;键&nbsp;词&nbsp;&nbsp;：</label>
              <span class="block" v-for="(item,i) in  myCustomResultData.xmmc.split(',')" :key="i"> {{item}}</span>
              <span class="block" v-for="(item,i) in  myCustomResultData.xmyz.split(',')" :key="i"> {{item}}</span>
            </p>
            <!-- <p v-show="myCustomResultData.xmyz">
              <label>业主名称：</label>
              <span class="block">{{myCustomResultData.xmyz}}</span>
            </p> -->
            <p v-show="myCustomResultData.jylx">
              <label>交易类型：</label>
              <span v-if="myCustomResultData.jylx.indexOf('全部')>-1"  class="block"> 全部</span>
              <span v-else  class="block" v-for="(item,i) in  myCustomResultData.jylx.split(',')" :key="i">{{ item}}</span>
            </p>
            <p v-show="area_pc" style="margin-bottom:10px;width:100%" >
              <label>所在地区：</label>
              <span v-for="(item_,i_) in area_pc" :key="i_">
                <span class="block" v-if="item_.province.status==1">{{item_.province.name}}(全)</span>
                <span v-else class="block" v-for="(item2_,i2_) in item_.city">{{item_.province.name}}-{{item2_.name}}(
                  <span v-if="item2_.status==1">全</span>
                  <span v-else>{{item2_.local.length}}</span>
                  )</span>
              </span>
              <!-- <span v-if="(area_pc[0].city.length>0 && noneProvince.indexOf(area_pc[0].province.name)==-1) || noneProvince.indexOf(area_pc[0].province.name)!=-1">{{area_pc[0].province.name}} </span>
              <span v-if="area_pc[0].province.status==1">(全部区域)</span>
              <span v-else>
                <span v-if="area_pc[0].city.length>0"> ：</span>
                <span v-for="(item,i) in area_pc[0].city" :key="i" style="margin-right:20px">
                  <span v-if="item.local">
                    <span v-if="item.local.length>0">
                      <span>{{i-0+1}}.</span>
                      {{item.name}}
                      <span v-if="item.status==1">(全部区域)</span>
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
                  <span v-if="item.noNext">
                    {{i-0+1}}. {{item.name}}(全部区域)
                  </span>
                </span>
              </span> -->
            </p>
          </div>

        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:20px;">
      <el-col :span="19">
        <div>
          <el-radio-group v-model="read_radio" @change="change_read_radio">
            <el-radio-button label="未读">未读 ({{unreadCount}})</el-radio-button>
            <el-radio-button label="已读">已读 ({{readCount}})</el-radio-button>
            <el-radio-button label="全部">全部({{allCount}})</el-radio-button>

          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="5">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" @submit.native.prevent>
          <!-- <el-form-item label="项目名称">
            <el-input v-model="formInline.xmmc" clearable @change="onSubmit('search')" placeholder="请输入项目名称" style="width:400px" @keyup.enter.native="onSubmit('search')"></el-input>
          </el-form-item>
          <el-form-item> 
            <el-button-group style="position:relative;bottom:2px;">
              <el-button type="primary" @click="onSubmit('search')">查询</el-button>
              <el-button @click="onSubmit('reset')">重置</el-button>
            </el-button-group>-->
          <el-button-group style="position:relative;bottom:2px;left:55px;">
            <el-button type="primary" @click="onSubmit('read')">置为已读</el-button>
            <el-button type="success" @click="onSubmit('read_all')">全部置为已读</el-button>
            <el-button type="danger" @click="onSubmit('del')">删除</el-button>
          </el-button-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <el-table @sort-change="fn_sortable" :data="tableData" style="width: 100%" border v-loading='loading' @selection-change="handleSelectionChange">
            <el-table-column type="index" width="60" label="序号" align="center">
              <template slot-scope="scope">{{scope.$index+(page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column type="selection" width="60" align="center">
            </el-table-column>
            <el-table-column prop="bt" label="项目名称" align="center">
              <template slot-scope="scope">
                <span class="open_link" @click="open_link(scope.row)">{{scope.row.bt}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="xmyz" label="项目业主" align="center">
            </el-table-column>
            <el-table-column prop="jylx" label="交易类型" align="center" width="200">
            </el-table-column>
            <el-table-column prop="fbsj" label="日期" align="center" width="120">
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.status=='1'">已读</span>
                <span v-else-if="scope.row.status=='0'" class="open_link" @click="onSubmit('read',scope.row)">置为已读</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="120">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="onSubmit('del',scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination align="right" @current-change="changePage" :current-page.sync="page" background layout="total,prev, pager, next" :total="total" class="pagination"></el-pagination>

        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['myCustomResultData'],
  data() {
    return {
      read_radio: '未读',
      formInline: {
        xmmc: '',
        order: '',
        ordername: ''
      },
      allCount: 0,
      readCount: 0,
      unreadCount: 0,
      tableData: [],
      page: 1,
      total: 1,
      loading: false,
      multipleSelection: [],
      area_pc: {},
      noneProvince: ['台湾省', '香港特别行政区', '澳门特别行政区']
    }
  },
  created() {
    console.log(this.myCustomResultData)
    this.area_pc = this.myCustomResultData.area
    this.searchList()
  },
  watch: {},
  methods: {
    onSubmit(type, row) {
      //搜索
      if (type == 'search') {
        this.page = 1
        this.searchList()
      } else if (type == 'reset') {
        this.page = 1
        this.formInline.xmmc = ''
        this.searchList()
      } else {
        let params = {
          dz_id: this.myCustomResultData.id,
          zb_id: {},
          type: type
        }
        if (row) {
          //一行
          params.zb_id[row.type] = row.id
        } else {
          if (this.multipleSelection.length == 0 && type !== 'allread') {
            this.$message.error('请先选择列表')
            return
          }
          if (type != 'read_all') {
            let pass = {
              sc: '',
              qg: ''
            }
            this.multipleSelection.forEach(ele => {
              pass[ele.type] += ele.id + ','
            })
            params.zb_id = pass
          }
        }
        this.axios.post('/index/Tendering/saveDzStatus', params, data => {
          this.$emit('refresh')
          this.searchList()
        })
      }
    },
    searchList() {
      //列表
      let type = ''
      if (this.read_radio == '全部') {
        type = 'all'
      } else if (this.read_radio == '已读') {
        type = 'read'
      } else if (this.read_radio == '未读') {
        type = 'unread'
      }
      let params = {
        xmmc: this.formInline.xmmc,
        dz_id: this.myCustomResultData.id,
        minFbsj: '',
        maxFbsj: '',
        jylx: '',
        area: [],
        type: type, //全部 已读 未读
        order: this.formInline.order,
        sort: this.formInline.ordername,
        page: this.page,
        rows: 10
      }
      this.loading = true
      this.axios.post('/index/Tendering/tenderList', params, data => {
        this.loading = false
        this.tableData = data.rows || []
        this.total = data.total || 0
        this.allCount = data.allCount || 0
        this.readCount = data.readCount || 0
        this.unreadCount = data.unreadCount || 0
        if (this.page > 1 && data.status == 'failed') {
          this.page -= 1
          this.searchList()
        }
      })
    },
    changePage(val) {
      //分页
      this.page = val
      this.searchList()
    },
    change_read_radio() {
      //切换单选按钮
      this.page = 1
      this.searchList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    fn_sortable(param) {
      let order = ''
      if (param.order == 'ascending') {
        order = 'asc'
      } else if (param.order == 'descending') {
        order = 'desc'
      }
      this.formInline.order = order
      this.formInline.ordername = order ? param.prop : ''
      this.page = 1
      this.searchList()
    },
    open_link(item) {
      this.onSubmit('read', item)
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?zbgs_id=&zbxx_id=${item.id}&source=${
          item.type
        }&type=zbxx&xmmc=${item.bt}`
      })
      window.open(href, '招标公告' + item.id + item.bt)
    }
  }
}
</script>

<style lang="less" scoped>
#myCustomResult {
  .header {
    .title {
      color: #999;
      font-size: 20px;
      display: flex;
      align-items: center;
    }

    .content {
      margin: 10px 0;
      font-size: 15px;
      display: flex;
      flex-flow: row wrap;
      p:first-child {
        // padding: 0 20px 0 0;
      }
      p:last-child {
        border-right: none;
      }
      p {
        width: 50%;
        margin: 0 0px 10px 0;
        label {
          font-weight: 600;
        }
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
  }
  .open_link {
    color: #409eff;
    cursor: pointer;
  }
}
</style>

