<template>
  <div class="normal-table">
    <h1>{{xm_info.xmmc}}</h1>
    <el-row style="margin:20px 0;">
      <el-col :span="6" :offset="9">
        <span>当前选择方案:</span>
        <el-select @change="onChangePLan" size="medium" v-model="threads.selectVal">
          <el-option v-for="item in threads.data" :key="item.id" :label="item.node_name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <audit-table v-loading="count_ajax >=2 ? false : true" v-on:changeYshData="changeYshData" v-on:fnAddCompanyToProject="fnAddCompanyToProject" v-on:auditNoAudit="ajaxOnYesorNoList" :yshData="yesGsData" :wshData="noGsData" :allData="allGsData"></audit-table>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import AuditTable from './AuditTable.vue'

export default {
  props: ['tableData'],
  data() {
    return {
      xm_info: {
        xmmc: ''
      },
       threads: {
        data: [],
        selectVal: ''
      },
      p_data: {},
      count_ajax: 0,
      // 已审核数据
      yesGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0',
          ryVal: ''
        },
        selectRows: [],
        page: 1,
        total: 0,
        row: 10,
        rows: [],
        table: {},
        loading: true,
        jbxx_id: '',
        order: 'desc',
        ordername: 'activity '
      },
      // 未审核数据
      noGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0'
        },
        rows: [],
        total: 0,
        page: 1,
        row: 10,
        loading: true,
        jbxx_id: '',
        order: 'desc',
        ordername: 'activity '
      },
      //全部公司数据
      allGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0',
          ryVal: ''
        },
        selectRows: [],
        rows: [],
        loading: true,
        page: 1,
        total: 0,
        row: 10
      }
    }
  },
  components: {
    AuditTable
  },
  created() {
    
    const tableData = JSON.parse(this.tableData)
    this.p_data = {
      jbxx_id: tableData.jbxx_id,
      thread_id: tableData.thread_id
    }
    this.ajaxYesGsList()
    this.ajaxNoGsList()
    this.ajaxNoGsList()
    this.ajaxXmInfo();
    this.getPlans(1)
  },
  methods: {
     ajaxXmInfo() {
      this.axios.post(
        '/Index/project/edit',
        {
          jbxx_id: this.p_data.jbxx_id
        },
        data => {
          this.xm_info = data.res
          document.title = '分配-' + data.res.xmmc
        }
      )
    },
    //获取方案列表
    getPlans(cate) {
      this.axios.post(
        '/Index/thread/getThread',
        {
          jbxx_id: this.p_data.jbxx_id,
          cate: cate
        },
        data => {
          if (data.status == 'success') {
            if (cate == 3) {
              this.planList = data.rows
            } else {
              this.threads.data = data.rows
              this.threads.selectVal = this.$route.query.thread_id - 0
              this.thread_id = this.$route.query.thread_id - 0
            }
          } else {
            this.planList = []
          }
        }
      )
    },
    onChangePLan(v) {
      let research = this.$router.resolve({
        path: `/configfp?jbxx_id=${this.p_data.jbxx_id}&thread_id=${v}`
      })
      window.open(research.href, '_self')
      location.reload()
    },
    changeYshData(data) {
      // console.log(data,'----changeYshData')
      //组件操作
      this[data.dataObj].formData.gsmc = data.gsmc
      this[data.dataObj].formData.areaTypeVal = data.scale
      this[data.dataObj].row = data.rows
      this[data.dataObj].page = data.page
      this[data.dataObj].order = data.order
      this[data.dataObj].ordername = data.ordername
      this[data.dataObj].loading = false
      if (data.type == 1) {
        this.ajaxYesGsList()
        this.count_ajax = 1
      } else if (data.type == 0) {
        this.ajaxNoGsList()
        this.count_ajax = 1
      } else if (data.type == 2) {
        this.ajaxAllGsList()
      }
    },
    fnAddCompanyToProject(data) {
      if (data.user_cate == '分配' || data.user_cate == '标书制作') {
        this.axios.post(
          '/index/element_set/addCompanyToProject',
          {
            company_id: localStorage.getItem('company_id'),
            jbxx_id: this.p_data.jbxx_id,
            gs_ids: data.gs_ids,
            user_id: data.user_id,
            username: data.username,
            user_cate: data.user_cate == '标书制作' ? '标书制作' : '分配'
          },
          data => {
            this.ajaxYesGetedGsList()
            this.ajaxYesGsList()
            this.ajaxNoGsList()
            this.ajaxAllGsList()
            this.count_ajax = 0
            
            // alert(7)
          }
        )
      } else {
        this.axios.post(
          '/index/Human_Allot/addCompanyToHuman',
          {
            jbxx_id: this.p_data.jbxx_id,
            human_id: this.p_data.thread_id,
            company_id: localStorage.getItem('company_id'),
            gs_ids: data.gs_ids,
            user_id: data.user_id,
            username: data.username
          },
          data => {
            this.ajaxYesGetedGsList()
            this.ajaxYesGsList()
            this.ajaxNoGsList()
            this.ajaxAllGsList()
            this.count_ajax = 0
            // alert(8)
          }
        )
      }
    },
    //审核未审核公司操作
    ajaxOnYesorNoList(data) {
      this.axios.post(
        '/Index/thread/Auditing',
        {
          id: this.p_data.thread_id,
          jbxx_id: this.p_data.jbxx_id,
          gs_id: data.gs_id,
          type: data.type
        },
        data => {
          if (data.status == 'success') {
            this.ajaxYesGsList()
            this.ajaxNoGsList()
            this.ajaxYesGetedGsList()
            this.count_ajax = 0
            // alert(9)
          }
        }
      )
    },
    // 已审核公司集合
    ajaxYesGsList() {
      let queryObj = {
        jbxx_id: this.p_data.jbxx_id,
        id: this.p_data.thread_id,
        gsmc: this.yesGsData.formData.gsmc,
        scale: this.yesGsData.formData.areaTypeVal,
        type: 1,
        rows: this.yesGsData.row,
        page: this.yesGsData.page,
        order: this.yesGsData.order,
        ordername: this.yesGsData.ordername
      }

      this.yesGsData.loading = false
      this.axios.post('/Index/thread/audited?type=1', queryObj, data => {
        if (this.yesGsData.page > 1 && data.rows.length == 0) {
          this.yesGsData.page -= 1
          this.ajaxYesGsList()
          this.ajaxNoGsList()
          // alert(5)
          this.count_ajax = 0
          return
        }
        this.yesGsData.loading = false
        this.yesGsData.rows = data.rows || []
        this.yesGsData.table = data.table || {}
        this.yesGsData.total = data.total || 0
        this.yesGsData.row = this.allGsData.row
        this.yesGsData.selectRows = []
        this.count_ajax += 1
      })
    },
    // 未审核公司集合
    ajaxNoGsList() {
      this.noGsData.loading = false
      let queryObj = {
        jbxx_id: this.p_data.jbxx_id,
        id: this.p_data.thread_id,
        gsmc: this.noGsData.formData.gsmc,
        scale: this.noGsData.formData.areaTypeVal,
        type: 0,
        rows: this.noGsData.row,
        page: this.noGsData.page,
        order: this.noGsData.order,
        ordername: this.noGsData.ordername
      }

      this.noGsData.loading = false
      this.axios.post('/Index/thread/audited?type=0', queryObj, data => {
        if (this.noGsData.page > 1 && data.rows.length == 0) {
          this.noGsData.page -= 1
          this.ajaxNoGsList()
          return
        }
        this.noGsData.loading = false
        this.noGsData.rows = data.rows || []
        this.noGsData.total = data.total || 0
        this.noGsData.table = data.table || {}
        this.noGsData.selectRows = []
        this.noGsData.row = this.allGsData.row
        this.count_ajax += 1
      })
    },
    //全部公司集合
    ajaxAllGsList() {
      this.allGsData.loading = true
      this.axios.post(
        '/index/element_set/getAllCompany',
        {
          // type: '分配',
          // user_cate: '分配',
          jbxx_id: this.p_data.jbxx_id,
          gsmc: this.allGsData.formData.gsmc,
          scale: this.allGsData.formData.areaTypeVal,
          rows: this.allGsData.row,
          page: this.allGsData.page,
          jbxx_id: this.p_data.jbxx_id,
          page: this.allGsData.page
        },
        data => {
          this.allGsData.loading = false
          this.allGsData.rows = data.rows || []
          this.allGsData.total = data.total || 0
          this.allGsData.selectRows = []
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
h1 {
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #dcdcdc;
}
</style>


