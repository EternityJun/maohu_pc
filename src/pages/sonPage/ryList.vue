<template>
  <div class="ry_list">
    <div style="text-align:right;margin:0 50px 10px">
      <el-button type="primary" icon="el-icon-refresh" circle @click="onRefresh"></el-button>
    </div>
    <el-table :data="tableLists" v-loading="loading">
      <el-table-column type="index" header-align="center" align="center"  label="序号">
        <template slot-scope="scope">
          <span>{{(scope.$index+1)+(page-1)*10}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="zw" label="职位">
        <template slot-scope="scope">
          <span>{{scope.row.zw}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="姓名">
        <template slot-scope="scope">
          <span style="color: #409eff;cursor:pointer" @click="openXqOne(scope.row.gs_id,scope.row.name,scope.row.http,scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="职称"></el-table-column>
      <el-table-column label="执业或职业资格证明" align="center">
        <el-table-column align="center" prop="rylb" label="证书名称" class-name="table_cell_padding0">
          <template slot-scope="scope">
            <div class="table_col_child">{{scope.row.rylb}}</div>
            <div class="table_col_child" v-for="one in scope.row.other_arr" :key="one.id" :style="{color:one.expire-0?'':'#f56c6c'}">{{one.rylb}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="dj" label="证书级别/等级/岗位" class-name="table_cell_padding0">
          <template slot-scope="scope">
            <div class="table_col_child">{{scope.row.dj}}</div>
            <div class="table_col_child" v-for="one in scope.row.other_arr" :key="one.id" :style="{color:one.expire-0?'':'#f56c6c'}">{{one.dj}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="zsh" label="证书号" class-name="table_cell_padding0">
          <template slot-scope="scope">
            <div class="table_col_child">{{scope.row.zsh}}</div>
            <div class="table_col_child" v-for="one in scope.row.other_arr" :key="one.id" :style="{color:one.expire-0?'':'#f56c6c'}">{{one.zsh}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="zczy" label="注册专业/专业/职称" class-name="table_cell_padding0">
          <template slot-scope="scope">
            <div class="table_col_child">
              <el-tooltip class="item" :disabled="!scope.row.zczy" effect="dark" :content="scope.row.zczy" placement="top">
                <div>{{scope.row.zczy.split(',').length >1?scope.row.zczy.split(',')[0]+'...':scope.row.zczy}}</div>
              </el-tooltip>
            </div>
            <div v-for="one in scope.row.other_arr" class="table_col_child" :key="one.id">
              <el-tooltip class="item" :disabled="!one.zczy" effect="dark" :content="one.zczy" placement="top">
                <div :style="{color:one.expire-0?'':'#f56c6c'}">{{one.zczy.split(',').length >1?one.zczy.split(',')[0]+'...':one.zczy}}</div>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="备注" v-if="unLock">
        <template slot-scope="scope">
          <template v-if="scope.row.proj_id">
            <el-button v-if="scope.row.proj_id == 'empty'" disabled type="text" style="color:#909399" size="small">类似业绩</el-button>
            <el-button v-else @click="onHandle(scope.row,'checkYj')" type="text" size="small">类似业绩</el-button>
          </template>
          <template>
            <div style="font-size:14px">
              <el-button @click="onHandle(scope.row,'change',scope.$index)" type="text" size="small">换人</el-button>
              <el-button @click="onHandle(scope.row,'add',scope.$index)" type="text" size="small">增加</el-button>
              <el-button @click="onHandle(scope.row,'del')" type="text" size="small">删除</el-button>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div style="display:flex;margin-top:10px">
      <div style="flex:1;text-align:center">
        <el-button v-if="page*10 >= total && unLock && ry_id" type="success" icon="el-icon-plus" circle @click="onHandle({},'newAdd','')"></el-button>
      </div>
      <el-pagination @current-change="changePage" background layout="total,prev, pager, next" :total="total"></el-pagination>
    </div>
    <el-dialog title="人员列表" append-to-body :visible.sync="ryListVisible" width="80%">
      <iteminfo-peole :isSl="isSl" :gsId="gs_id" :isShare="isShare" :btnType="btnType" :types="childrenType" :nowRow="childrenNowRow" :ry_id="ry_id" @onSelectNewuser="onSelectNewuser"></iteminfo-peole>
    </el-dialog>
    <!-- 查看业绩列表 -->
    <el-dialog title="业绩列表" :visible.sync="checkyjtk" width="80%" :append-to-body='true'>
        <project-list :nowRow="childrenNowRow"></project-list>
      
    </el-dialog>

  </div>
</template>
<script>
/* eslint-disable */
import iteminfoPeole from './ItemInfoPeole'
import projectList from './../template/projectList'
export default {
  props: {
    needData: null,
    unLock: {
      default: true
    },
    isShare: false
  },
  components: {
    iteminfoPeole,
    projectList
  },
  watch: {
    needData() {
      this.getRyList()
      this.ry_id = this.needData.ry_id
      this.yj_id = this.needData.yj_id
    }
  },
  data() {
    return {
      gs_id: this.$route.query.gs_id,
      tableLists: [],
      loading: false,
      total: 0,
      page: 1,
      ryListVisible: false,
      btnType: '',
      childrenType: '',
      childrenNowRow: null,
      ry_id: '',
      checkyjtk: false,
      isSl: false, // 判断当前人员列表是否全都是水利人员
    }
  },
  created() {
    this.ry_id = this.needData.ry_id
    this.yj_id = this.needData.yj_id

    this.getRyList()
  },
  methods: {
    onRefresh() {
      this.axios.post(
        '/index/search_ry/refresh', //项目机构管理
        {
          gs_id: this.gs_id,
          ry_id: this.needData.ry_id
        },
        data => {
          this.getRyList()
        }
      )
    },
    //获取数据
    getRyList() {
      if (!this.needData.ry_id) {
        return
      }
      this.loading = true
      this.axios.post(
        '/index/search_ry/companytoperson', //项目机构管理
        {
          gs_id: this.gs_id,
          ry_id: this.needData.ry_id,
          jbxx_id: this.needData.jbxx_id,
          page: this.page,
          row: 10
        },
        data => {
          if (data.status == 'success') {
            this.tableLists = data.rows || []
            this.total = data.total || 0
          } else {
            if (this.page > 1) {
              this.page -= 1
              this.getRyList()
            } else {
              this.tableLists = []
              this.total = 0
            }
          }
          this.loading = false
        }
      )
    },
    // 改变页数
    changePage(val) {
      this.page = val
      this.getRyList()
    },
    // 人员操作函数
    onHandle(row, types, index) {
      if (types == 'checkYj') {
        this.checkyjtk = true
        row.yj_id = this.yj_id
        this.childrenNowRow = row
      } else if (types != 'del') {
        this.isSl = this.tableLists.some((item) => {
          return item.zw === '水利人员'
        })
        this.ryListVisible = true
        this.btnType = types
        row.yj_id = this.yj_id
        row.gs_id = this.gs_id
        this.childrenNowRow = row
        row.rowIndex = (this.xmjgglpage - 1) * 10 + index + 1
        this.childrenType = types
      } else {
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let obj = {
              gs_id: row.gs_id,
              ry_id: this.ry_id,
              rylb: row.rylb,
              dj: row.dj,
              num: row.num
            }
            this.axios.post('/index/search_ry/isDel', obj, data => {
              if (data.status == 'success') {
                let obj = row
                obj.cate = 3
                obj.ry_id = this.ry_id
                obj.jbxx_id = this.$route.query.jbxx_id
                this.axios.post('/index/search_ry/savePerson', obj, data => {
                  if (data.status == 'success') {
                    window.opener.postMessage('刷新', '*')
                    window.opener.postMessage('公司刷新', '*')
                    this.$message({
                      showClose: true,
                      message: '成功',
                      type: 'success'
                    })
                    this.getRyList()
                  } else {
                    this.$message({
                      showClose: true,
                      message: '删除失败',
                      type: 'error'
                    })
                  }
                })
              } else {
                this.$message({
                  showClose: true,
                  message: data.mes,
                  type: 'error'
                })
              }
            })
          })
          .catch(() => {})
      }
    },
    // 人员增删改回调
    onSelectNewuser(back) {
      this.ryListVisible = false
      this.getRyList()
      if (back) {
        if (back.type == 'add') {
          window.opener.postMessage('刷新', '*')
          window.opener.postMessage('公司刷新', '*')
        }
      }
    },
    openXqOne(id, name, link, row) {
      if (this.isShare) {
        window.open(link)
      } else {
        let { href } = this.$router.resolve({
          path: `/ryDet?gs_id=${id}&name=${name}&staff_base_id=${
            row.staff_base_id ? row.staff_base_id : ''
          }`
        })
        window.open(href, '人员详情' + id + name)
      }
    }
  }
}
</script>
<style scoped>
.table_col_child:first-child {
  padding-top: 6px;
  min-height: 36px;
}
.table_col_child:last-child {
  padding-bottom: 0;
  border-bottom: none;
  min-height: 36px;
}
.table_col_child {
  min-height: 48px;
  border-bottom: 1px solid #ebeef5;
  padding: 12px;
}
.ry_list {
  /* margin-bottom:100px; */
  /* border: 10px solid #000; */
}
</style>

<style>
.table_cell_padding0 .cell {
  padding: 0;
}
</style>
