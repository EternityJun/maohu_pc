<template>
  <div class="bid_canvas" v-loading="loading">
    <h1>{{edit.xmmc}}</h1>
    <el-row>
      <el-col :span="4">
        <bid-jbxx :jbxxId="jbxx_id" v-if="jbxx_id"></bid-jbxx>
      </el-col>
      <el-col :span="16">
        <bid-canvas v-on:listenMenuClick="listenMenuClick" :tree="{tree:tree,status_id:status_id}"></bid-canvas>
      </el-col>
      <el-col :span="4" class="left">
        <div class="card-p">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>所有方案</span>
            </div>
            <ul v-for="(item,index) in threads" :key="index" class="text item">
              <li>
                <span class="name" :class="thread_id ==item.id ? 'active_plan' : ''">{{item.node_name}}</span>
                <span v-show="thread_id !=item.id">
                  <el-button size="mini" type="primary" @click="open_thread(item.id)">查看</el-button>
                  <el-button size="mini" type="danger" @click="delThread(item.id)">删除</el-button>
                </span>
              </li>
            </ul>
            <el-row style="text-align:center;margin-top:20px;">
              <el-button @click="newPlan_new()" size="mini" type="primary">新建方案</el-button>
            </el-row>
          </el-card>
        </div>
        <div class="card-p">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>组件集合</span>
            </div>
            <div class="card-button">
              <el-button type="primary" @click="fn_tool('zhubiao')">1.4.1</el-button>
            </div>
            <div class="card-button">
              <el-button type="primary" @click="fn_tool('gsgj')">公司工具</el-button>
            </div>
            <div class="card-button" v-show="status_id">
              <el-button type="primary" @click="fn_tool('/bidIndustryTool')">行业工具</el-button>
            </div>
            <div class="card-button" v-show="status_id">
              <el-button type="primary" @click="fn_tool('/bidGsxw')">公司行为数据分析</el-button>
            </div>
            <div class="card-button" v-show="status_id">
              <el-button type="primary" @click="fn_tool('gs_research')">公司查询</el-button>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div v-if="zhubiao.dialogVisible">
      <el-dialog title="1.4.1条件设置" :visible.sync="zhubiao.dialogVisible" width="95%" top="10px" class="zhubiao_dialog" @close="close_dialog">
        <item-config v-on:onSubmitConfig="onSubmitConfig" :dataset="JSON.stringify(zhubiao.data)"></item-config>
      </el-dialog>
    </div>
    <div v-if="gsgj.dialogVisible">
      <el-dialog title="公司工具" :visible.sync="gsgj.dialogVisible" width="95%" top="10px" class="zhubiao_dialog" @close="close_dialog">
        <bid-gsgj :data="JSON.stringify(gsgj)"></bid-gsgj>
        <!-- <bid-gsgj :data="JSON.stringify({jbxx_id:jbxx_id,thread_id:thread_id,show_condition:show_condition,node_id:current_id ? current_id : dataset_node_id,})"></bid-gsgj> -->
        <el-row>
          <el-col :span="24" style="text-align:center">
            <el-button @click="close_dialog">关闭</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>

    <div v-if="gs_research.dialogVisible">
      <el-dialog title="公司查询" :visible.sync="gs_research.dialogVisible">
        <bid-gs-research :data={jbxx_id:jbxx_id,thread_id:status_id}></bid-gs-research>
      </el-dialog>
    </div>

    <div v-if="dataset.dialogVisible">
      <el-dialog title="公司集合" :visible.sync="dataset.dialogVisible" width="95%" top='10px' class="dataSet" @close="close_dialog">
        <bid-data-set :data="JSON.stringify(gsSet)"></bid-data-set>
        <el-row style="margin-top:40px;">
          <el-col :span="24" style="text-align:center">
            <el-button @click="close_dialog">关闭</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <div v-if="newPlan2.dialogVisible">
      <el-dialog title="新建方案" :visible.sync="newPlan2.dialogVisible" width="50%">
        <bid-new-plan v-on:onSubmitNewPlan="onSubmitNewPlan" :data="{jbxx_id:newPlan2.id,name:newPlan2.name,tab:'yy'}"></bid-new-plan>
      </el-dialog>
    </div>

    <!-- 节点名称 -->
    <div v-if="newNodename.dialogVisible">
      <el-dialog title="节点名称" :visible.sync="newNodename.dialogVisible" width="50%">
        <bid-new-plan v-on:onSubmitNewPlan="onSubmitNewPlan" :data="{jbxx_id:newNodename.id,name:newNodename.name,tab:'tree',type:newNodename.type}"></bid-new-plan>
      </el-dialog>
    </div>

  </div>
</template>
<script>
// 取消选中公司集
import itemConfig from './ItemConfig.vue'
import bidGsResearch from './template/bid_gsResearch.vue'
import bidGsgj from './template/bid_gsgj.vue'
import bidJbxx from './template/bid_jbxx.vue'
import bidCanvas from './template/bid_canvas.vue'
import bidDataSet from './template/bid_dataset.vue'
import bidNewPlan from './template/bid_newPlan.vue'
export default {
  name: 'hello',
  data() {
    return {
      loading: false,
      tree_value: 1,
      dataset_node_id: '',
      pid: '',
      jbxx_id: '',
      plan_id: '',
      thread_id: '',
      threads: [],
      status_id: '',
      current_id: '',
      gsSet: {},
      newNodename: {
        dialogVisible: false,
        data: {}
      },
      zhubiao: {
        dialogVisible: false,
        data: {
          thread_id: '',
          jbxx_id: '',
          node_id: '',
          show_condition: false,
          flag: 0
        }
      },
      gsgj: {
        dialogVisible: false,
        jbxx_id: '',
        thread_id: '',
        show_condition: false,
        node_id: ''
        // current_id ? current_id : dataset_node_id
      },
      dataset: {
        dialogVisible: false
      },
      newPlan2: {
        dialogVisible: false,
        name: '',
        id: ''
      },
      gs_research: {
        innerVisible: false,
        dialogVisible: false,
        gsmc: '',
        tableData: [],
        inner_tableData: [],
        page: 1,
        rows: 10
      },
      allCompany: {
        gsmc: '',
        rows: 10,
        page: 1,
        order: 'asc',
        total: 0,
        tableData: []
      },
      tree: [],
      node_id: '',
      show_condition: false,
      nodes: [],
      edit: {
        xmmc: ''
      },
      key_key: ''
    }
  },
  created() {},
  mounted() {
    this.jbxx_id = this.$route.query.jbxx_id
    this.thread_id = this.$route.query.thread_id
    this.pid = this.$route.query.thread_id
    this.fn_researchPlan({ jbxx_id: this.jbxx_id }, 'thread')
    this.fn_edit()
  },
  components: {
    itemConfig,
    bidGsgj,
    bidJbxx,
    bidCanvas,
    bidGsResearch,
    bidDataSet,
    bidNewPlan
  },
  methods: {
    close_dialog() {
      this.gsgj.dialogVisible = false
      this.dataset.dialogVisible = false
      this.fn_researchPlan(
        {
          thread_id: this.thread_id,
          status_id: this.status_id
        },
        'tree'
      )
    },
    open_thread(id) {
      let { href } = this.$router.resolve({
        path: '/bidCanvas' + `?jbxx_id=${this.jbxx_id}&thread_id=${id}`
      })
      window.open(href, `${this.jbxx_id}${id}`)
    },
    onSubmitNewPlan(data) {
      this.newPlan2.dialogVisible = false
      if (data && this.newNodename.dialogVisible) {
        this.fn_newNodename(data)
      }
      this.newNodename.dialogVisible = false
    },
    getDate() {
      //得到今天的日期；
      let date = new Date()
      let year = date.getFullYear()
      let month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)
      let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      // this.research_plan.name=year.toString() + month.toString() + day.toString()+"_";
      return year.toString() + month.toString() + day.toString()
    },
    newPlan_new() {
      this.newPlan2.dialogVisible = true
      this.newPlan2.name = this.getDate() + '_'
      this.newPlan2.id = this.jbxx_id
    },
    delThread(id, type) {
      let self = this
      let params = {
        jbxx_id: self.jbxx_id,
        id: self.thread_id
      }
      if (type == 'node') {
        params.node_id = id
      } else {
        //删除方案
        params.thread_id = id
      }
      self.axios.post('/index/thread/delThread', params, data => {
        if (data.status == 'success') {
          self.fn_researchPlan({ jbxx_id: self.jbxx_id }, 'thread')
          // self.fn_researchPlan({ thread_id: self.thread_id }, "tree");
        } else {
          self.$message.error('删除失败，请稍后重试')
        }
      })
    },
    newPlan(type) {
      if (type == 'zb') {
        this.newNodename.name = '1.4.1'
      } else {
        this.newNodename.name = '公司工具'
      }
      this.newNodename.type = ''
      this.newNodename.dialogVisible = true
    },
    fn_newNodename(nodename) {
      let self = this
      let node_detail = this.node_detail.data
      // console.log(node_detail)
      if (this.newNodename.type == 'rename') {
        let params2 = {
          thread_id: node_detail.id,
          jbxx_id: self.jbxx_id,
          name: nodename,
          type: node_detail.type
        }
        this.axios.post('/index/thread/newPlan', params2, data => {
          if (data) {
            self.fn_researchPlan(
              {
                thread_id: this.thread_id,
                status_id: this.status_id
              },
              'tree'
            )
          } else {
            self.$message.error('接口错误')
          }
        })
      } else {
        let params = {
          pid: this.pid,
          jbxx_id: this.jbxx_id,
          name: nodename,
          type: this.key_key == 'zb' ? '1.4.1' : '公司工具' //组件名称
        }
        this.loading = true
        this.axios.post('/index/thread/newPlan', params, data => {
          this.loading = false
          if (data.status == 'success') {
            self.dataset_node_id = data.message
            self.current_id = data.message
            let item = {
              name: nodename,
              type: this.key_key == 'zb' ? '1.4.1' : '公司工具',
              id: data.message,
              pid: self.pid,
              children: []
            }
            let params2 = {
              thread_id: data.message,
              jbxx_id: self.jbxx_id,
              name: params.name,
              type: params.type,
              txt: JSON.stringify(item)
            }
            if (this.key_key == 'zb') {
              this.zhubiao.data = {
                thread_id: self.thread_id,
                jbxx_id: self.jbxx_id,
                node_id: data.message,
                pid: self.pid,
                show_condition: true,
                flag: self.flag,
                date: new Date()
              }
              // console.log(this.zhubiao.data);
              this.zhubiao.dialogVisible = true
            } else if (this.key_key == 'gs') {
              this.gsgj = {
                thread_id: self.thread_id,
                jbxx_id: self.jbxx_id,
                node_id: data.message,
                pid: self.pid,
                show_condition: true,
                dialogVisible: true,
                date: new Date()
              }
            }
            this.axios.post('/index/thread/newPlan', params2, data => {
              if (data) {
                self.fn_researchPlan(
                  {
                    thread_id: this.thread_id,
                    status_id: this.status_id
                  },
                  'tree'
                )
              } else {
                self.$message.error('接口错误')
              }
            })
          } else {
            self.$message.error(data.message)
          }
        })
      }
    },

    onSubmitConfig(data) {
      this.zhubiao.dialogVisible = false
      if (data == 'cancel' && this.key_key == 'zb') {
        // console.log("添加了1.4.1又取消");
        this.delThread(this.dataset_node_id, 'node')
      }
      this.fn_researchPlan(
        { thread_id: this.thread_id, status_id: this.status_id },
        'tree'
      )
    },
    listenMenuClick(key) {
      //画布菜单事件
      console.log(key)
      this.node_detail = key.node_detail
      this.node_id = key.node_detail.data.id //节点的id
      this.dataset_node_id = this.node_id
      // console.log("node_id:---" + this.node_id);
      this.pid = key.node_detail.data.id //当前节点的id作为下一个节点的父节点
      this.key_key = key.key
      switch (key.key) {
        case 'zb':
          this.flag = 0 //节点有没有运行
          this.show_condition = true
          this.newPlan(key.key)
          break
        case 'gs':
          this.newPlan(key.key)
          this.show_condition = true
          break
        case 'rename': //重命名
          this.newNodename.dialogVisible = true
          this.newNodename.name = key.node_detail.data.Fname
          this.newNodename.type = 'rename'
          break
        case 'dataset':
          this.gsSet = {
            jbxx_id: this.jbxx_id,
            thread_id: this.node_id,
            thread_id2: this.thread_id,
            date: new Date()
          }
          this.dataset.dialogVisible = false
          this.$nextTick(() => {
            this.dataset.dialogVisible = true
          })
          break
        case 'condition':
          if (this.node_detail.data.type == '1.4.1') {
            this.zhubiao.data.node_id = this.node_id
            this.zhubiao.data.thread_id = this.thread_id
            this.zhubiao.data.flag = key.node_detail.data.flag //节点有没有运行
            this.zhubiao.data.show_condition = false
            this.zhubiao.dialogVisible = true
            this.zhubiao.date = new Date()
          } else {
            //公司工具
            this.gsgj.jbxx_id = this.jbxx_id
            this.gsgj.thread_id = this.thread_id
            this.gsgj.node_id = this.node_id
            this.gsgj.show_condition = true
            this.gsgj.dialogVisible = true
            this.gsgj.date = new Date()
            // console.log(this.gsgj);
          }
          this.show_condition = false
          break
        case 'del': //删除节点
          this.delThread(this.node_id, 'node')
          break
        case 'pick': //选中公司集
          this.fn_pick(this.node_id, 1)
          break
        case 'noPick': //取消公司集
          this.fn_pick(this.node_id, 0)
        case 'keyRight': //选中节点 加条件
          this.fn_researchPlan(
            {
              thread_id: this.thread_id,
              status_id: this.status_id,
              node_id: key.node_detail.data.id
            },
            'tree'
          )
        default:
          break
      }
    },
    fn_pick(node_id, type) {
      // let itemStyle = {
      //     normal: {
      //         color: "#67C23A",
      //         fontWeight: "bolder",
      //         fontSize: 15,
      //         borderWidth: 2,
      //         borderColor: "#cc66ff"
      //     }
      // };
      this.axios.post(
        '/index/thread/savestatus',
        {
          node_id: node_id,
          thread_id: this.thread_id,
          symbolSize: 30,
          type
        },
        data => {
          if (data.status == 'success') {
            //标记状态
            this.$message.success(data.message)
            this.fn_researchPlan({ jbxx_id: this.jbxx_id }, 'thread')
          }
        }
      )
    },
    fn_edit(id) {
      //显示项目预研方案
      this.axios.post(
        '/index/project/edit',
        {
          jbxx_id: this.jbxx_id
        },
        data => {
          this.edit = data.res
          document.title = '工作台：' + this.edit.xmmc
        }
      )
    },
    fn_researchPlan(params, type) {
      let self = this
      //显示项目预研方案
      self.axios.post('/index/thread/getThread', params, data => {
        if (data.status == 'success') {
          if (type == 'thread') {
            self.threads = data.rows
            let pass = self.threads.filter(function(v, i) {
              if (v.id == self.thread_id) {
                return v
              }
            })
            this.status_id = pass[0].status_id
            this.fn_researchPlan(
              {
                thread_id: this.thread_id,
                status_id: this.status_id
              },
              'tree'
            )
          } else {
            self.tree = data.rows
            if (!params.node_id) {
              this.node_id = ''
            }
          }
        }
      })
    },
    fn_tool(url) {
      switch (url) {
        case '/bidGsxw': //公司行为分析
          var { href } = this.$router.resolve({
            path:
              url +
              `?jbxx_id=${this.jbxx_id}&thread_id=${this.status_id}&xmyzdw=${
                this.edit.xmyzdw
              }&area=${this.edit.area}&xmmc=${this.edit.xmmc}`
          })
          window.open(href, ``)
          break
        case '/bidIndustryTool': //公司行为分析
          var href_ = this.$router.resolve({
            path:
              url +
              `?jbxx_id=${this.jbxx_id}&thread_id=${this.status_id}&xmyzdw=${
                this.edit.xmyzdw
              }&area=${this.edit.area}&xmmc=${this.edit.xmmc}`
          })
          window.open(href_.href, ``)
          break
        case 'gs_research':
          this.gs_research.dialogVisible = true
          break
        case 'zhubiao':
          //父级id
          if (!this.node_id) {
            this.$message.error('请先选择父级节点再添加组件')
          } else {
            this.flag = 0 //节点有没有运行
            this.key_key = 'zb'
            this.show_condition = true
            this.newPlan('zb')
            // this.node_id = ''
          }
          break
        case 'gsgj':
          if (!this.node_id) {
            this.$message.error('请先选择父级节点再添加组件')
          } else {
            this.flag = 0 //节点有没有运行
            this.show_condition = true
            this.newPlan('gs')
            this.key_key = 'gs'
            // this.node_id = ''
          }
          break
      }
    }
  }
}
</script>
<style>
.left .el-card__header {
  padding: 7px 20px;
}
.dataSet .el-dialog__body {
  padding-top: 0px;
}
.zhubiao_dialog .el-dialog__body {
  padding: 0px 20px 20px;
}
</style>

<style lang="less" scoped>
.active_plan {
  color: #428bca;
  font-weight: bolder;
}
.bid_canvas {
  padding: 20px;
  h1 {
    text-align: center;
  }
  .left {
    .card-p {
      margin-bottom: 10px;
    }
    .item {
      margin: 10px 0;
      li {
        list-style: none;
        display: flex;
        .name {
          flex: 1;
          display: flex;
          align-items: Center;
          font-size: 15px;
        }
      }
    }
    .box-card {
      max-height: 500px;
      overflow-y: auto;
    }
    .card-button {
      margin-bottom: 10px;
    }
  }
}
</style>
