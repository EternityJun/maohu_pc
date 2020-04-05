<!--筑标成都项目操作分配标书制作-->
<template>
  <div>
    <p style="margin: 20px 0px 10px;text-align: center;font-size: 34px;">{{xm_info.xmmc}}</p>
    <carousel-card height="1100px;">
      <carousel-item>
        <div class="ys-ws-divs">
          <div>
            <p class="table-title" style="color:#00c0ff">已审核公司集合</p>
            <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
              <el-form-item style="width:180px">
                <el-input @clear="onSearch('ajaxYesGsList','yesGsData')" @keydown.enter.native="onSearch('ajaxYesGsList','yesGsData')" clearable placeholder="公司名称" v-model="yesGsData.formData.gsmc"></el-input>
              </el-form-item>
              <el-form-item style="width:110px">
                <el-select placeholder="不限制" v-model="yesGsData.formData.areaTypeVal" @change="onChangeArea('ajaxYesGsList','yesGsData')">
                  <el-option label="不限制" value="0"></el-option>
                  <el-option label="川内企业" value="1"></el-option>
                  <el-option label="入川企业" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="yshData.table['公司行为数据分析']">
                <el-form-item v-if="yshData.table['公司行为数据分析'].zbNumber" style="width:200px">
                  <div style="display:flex;">
                    <el-input placeholder="中标次数" @keydown.enter.native="onSearch('ajaxYesGsList','yesGsData')" v-model="yesGsData.zbMinNum" class="input-with-select" />
                    <span class="spanClass">-</span>
                    <el-input placeholder="中标次数" @keydown.enter.native="onSearch('ajaxYesGsList','yesGsData')" v-model="yesGsData.zbMaxNum" class="input-with-select" />
                  </div>
                </el-form-item>
                <el-form-item v-if="yshData.table['公司行为数据分析'].tbNumber" style="width:200px">
                  <div style="display:flex;">
                    <el-input placeholder="投标次数" @keydown.enter.native="onSearch('ajaxYesGsList','yesGsData')" v-model="yesGsData.tbMinNum" class="input-with-select" /> 
                    <span class="spanClass">-</span>
                    <el-input placeholder="投标次数" @keydown.enter.native="onSearch('ajaxYesGsList','yesGsData')" v-model="yesGsData.tbMaxNum" class="input-with-select" />
                  </div>
                </el-form-item>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch('ajaxYesGsList','yesGsData')">查询</el-button>
                <el-button @click="onResetForm('ajaxYesGsList','yesGsData')">重置</el-button>
              </el-form-item>
              <el-form-item style="width:120px">
                <el-select placeholder="选择" v-model="yesGsData.formData.fp_bs_sh">
                  <el-option key="1" label="分配" value="分配"></el-option>
                  <el-option key="2" label="标书制作" value="标书制作"></el-option>
                  <el-option key="3" label="人工审核" value="人工审核"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width:100px">
                <el-select placeholder="选择" v-model="yesGsData.formData.ryVal">
                  <el-option label value></el-option>
                  <el-option v-for="item in allUsers[yesGsData.formData.fp_bs_sh]" :key="item.id" :label="item.username" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onDistribute('yesGsData','ajaxYesGsList')">确定</el-button>
              </el-form-item>

              <el-form-item style="position:absolute;right:10px">
                <el-button type="danger" @click="onAllAuditing('yesGsData','ajaxYesGsList')">批量未审核</el-button>
              </el-form-item>
            </el-form>
            <div style="flex:1">
              <myTextVue :tableData="allData1" :operationState="operationState" @myselectData="myselectData" @deletilMyData="deletilMyData" @sortingTableData="sortingTableData" v-loading="yshData.loading"></myTextVue>
            </div>
            <el-pagination style="margin-top:20px" :current-page.sync="yesGsData.page" @current-change="yesGsDataChangePage" @size-change="yesGsDataChangeSize" :page-size="yesGsData.row" align="right" background layout="sizes,total,prev, pager, next" :total="yshData.total"></el-pagination>
          </div>
        </div>
      </carousel-item>
      <carousel-item>
        <div class="ys-ws-divs">
          <div>
            <p class="table-title" style="color:red">未审核公司集合</p>
            <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
              <el-form-item style="width:200px">
                <el-input @clear="onSearch('ajaxNoGsList','noGsData')" clearable placeholder="公司名称" v-model="noGsData.formData.gsmc" @keydown.enter.native="onSearch('ajaxNoGsList','noGsData')"></el-input>
              </el-form-item>
              <el-form-item style="width:110px">
                <el-select placeholder="不限制" v-model="noGsData.formData.areaTypeVal" @change="onChangeArea('ajaxNoGsList','noGsData')">
                  <el-option label="不限制" value="0"></el-option>
                  <el-option label="川内企业" value="1"></el-option>
                  <el-option label="入川企业" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="yshData.table['公司行为数据分析']">
                <el-form-item style="width:200px" v-if="yshData.table['公司行为数据分析'].zbNumber">
                  <div style="display:flex;">
                    <el-input placeholder="中标次数"  @keydown.enter.native="onSearch('ajaxNoGsList','noGsData')" v-model="noGsData.zbMinNum" class="input-with-select" />
                    <span class="spanClass">-</span>
                    <el-input placeholder="中标次数"  @keydown.enter.native="onSearch('ajaxNoGsList','noGsData')" v-model="noGsData.zbManNum" class="input-with-select" />
                  </div>
                </el-form-item>
                <el-form-item style="width:200px" v-if="yshData.table['公司行为数据分析'].tbNumber">
                  <div style="display:flex;">
                    <el-input placeholder="投标次数"  @keydown.enter.native="onSearch('ajaxNoGsList','noGsData')" v-model="noGsData.tbMinNum" class="input-with-select" />
                    <span class="spanClass">-</span>
                    <el-input placeholder="投标次数"  @keydown.enter.native="onSearch('ajaxNoGsList','noGsData')" v-model="noGsData.tbManNum" class="input-with-select" />
                  </div>
                </el-form-item>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch('ajaxNoGsList','noGsData')">查询</el-button>
                <el-button @click="onResetForm('ajaxNoGsList','noGsData')">重置</el-button>
              </el-form-item>
              <el-form-item style="position:absolute;right:10px">
                <el-button type="success" @click="onAllAuditing('noGsData','ajaxNoGsList')">批量审核</el-button>
              </el-form-item>
            </el-form>
            <div style="flex:1">
              <myTextVue :tableData="allData2" @myselectData="myselectData" @deletilMyData="deletilMyData" @sortingTableData="sortingTableData" :operationState="operationState" v-loading="wshData.loading"></myTextVue>
            </div>
            <el-pagination style="margin-top:20px" :current-page.sync="noGsData.page" @current-change="noGsDataChangePage" @size-change="noGsDataChangeSize" :page-size="noGsData.row" align="right" background layout="sizes,total,prev, pager, next" :total="wshData.total"></el-pagination>
          </div>
        </div>
      </carousel-item>
      <carousel-item>
        <div class="diplay-flex-column">
          <p class="table-title" style="color:red">全部公司集合</p>
          <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
            <el-form-item style="width:180px">
              <el-input clearable @clear="onSearch('ajaxAllGsList','allGsData')" placeholder="公司名称" v-model="allGsData.formData.gsmc" @keydown.enter.native="onSearch('ajaxAllGsList','allGsData')"></el-input>
            </el-form-item>
            <el-form-item style="width:110px">
              <el-select placeholder="不限制" v-model="allGsData.formData.areaTypeVal" @change="onChangeArea('ajaxAllGsList','allGsData')">
                <el-option label="不限制" value="0"></el-option>
                <el-option label="川内企业" value="1"></el-option>
                <el-option label="入川企业" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch('ajaxAllGsList','allGsData')">查询</el-button>
              <el-button @click="onResetForm('ajaxAllGsList','allGsData')">重置</el-button>
            </el-form-item>
            <el-form-item style="width:120px">
              <el-select placeholder="选择" v-model="allGsData.formData.fp_bs_sh">
                <el-option key="1" label="分配" value="分配"></el-option>
                <el-option key="2" label="标书制作" value="标书制作"></el-option>
                <el-option key="3" label="人工审核" value="人工审核"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width:100px">
              <el-select placeholder="选择" v-model="allGsData.formData.ryVal">
                <el-option label value></el-option>
                <el-option v-for="item in allUsers[allGsData.formData.fp_bs_sh]" :key="item.id" :label="item.username" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onDistribute('allGsData','ajaxAllGsList')">确定</el-button>
            </el-form-item>
          </el-form>
          <!-- <div style="flex:1"> -->
          <div style>
            <myTextVue :tableData="allData3" @myselectData="myselectData" @deletilMyData="deletilMyData" v-loading="allData.loading"></myTextVue>
          </div>
          <el-pagination style="margin-top:20px" :current-page.sync="allGsData.page" @current-change="allGsDataChangePage" @size-change="allGsDataChangeSize" :page-size="allGsData.row" align="right" background layout="sizes,total,prev, pager, next" :total="allData.total"></el-pagination>
        </div>
      </carousel-item>
    </carousel-card>
  </div>
</template>
<script>
import carouselCard from '../sonPage/carouselCard.vue'
import carouselItem from '../sonPage/carouselItem.vue'
// import changeRy from '../changeRy.vue'
// import bidXm from './template/bidXm.vue'
import myTextVue from './myTextVue'

export default {
  components: {
    carouselCard,
    carouselItem,
    myTextVue
  },
  data() {
    return {
      CiShuMin1: '',
      CiShuMin2: '',
      CiShuMax1: '',
      CiShuMax2: '',
      order: 'desc',
      ordername: 'activity',
      loading1: true,
      xm_info: {
        xmmc: ''
      },
      user_cate: '全部',
      user_cate_prop: 'audit_user_id',
      //用户数据
      allUsers: {},
      // 方案列表
      planList: [],
      jbxx_id: this.$route.query.jbxx_id,
      id: '',
      last_treeId: '',
      human_id: '',
      node: {
        ry_node: '',
        yj_node: '',
        zz_node: ''
      },
      //选择分配人员数据
      tableList_checkRyVal: '',
      //标签弹框数据
      tagDialogData: {
        dialogVisible: false,
        row: null,
        ajaxFn: null,
        formData: {
          id: '',
          qyxz: '',
          tbpl: '',
          cooperation: '',
          issue: '',
          content: ''
        }
      },
      //人员负责公司
      userGslist: {
        page: 1,
        row: 10,
        dialogVisible: false,
        loading: false,
        tableList: [],
        // 查看公司列表当前行
        selected_row: '',
        templateData: {
          list: [],
          val: [],
          dialogEditVisible: false
        }
      },
      // 已审核数据
      yesGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0',
          ryVal: '',
          fp_bs_sh: '分配'
        },
        selectRows: [],
        page: 1,
        zbMinNum: '',
        zbMaxNum: '',
        tbMinNum: '',
        tbMaxNum: '',
        gsgzType: '',
        order: '',
        orderName: '',
        total: 0,
        row: 10,
        tableList: [],
        loading: false,
        //重置
        clearState: false
      },
      // 未审核数据
      noGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0'
        },
        tableList: [],
        total: 0,
        page: 1,
        zbMinNum: '',
        gsgzType: '',
        zbMaxNum: '',
        tbMinNum: '',
        tbMaxNum: '',
        row: 10,
        order: '',
        orderName: '',
        loading: false,
        selectRows: [],
        clearState: false
      },
      //全部公司数据
      allGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0',
          ryVal: '',
          fp_bs_sh: '分配'
        },
        selectRows: [],
        tableList: [],
        loading: false,
        page: 1,
        total: 0,
        row: 10
      },
      //已拿到的公司集合
      yesGetedGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0',
          ryVal: '',
          planVal: ''
        },
        selectRows: [],
        tableList: [],
        loading: false,
        page: 1,
        total: 0,
        row: 10
      },
      //人员集合
      getedRyData: {
        formData: {
          ryVal: ''
        },
        tableList: [],
        selectRows: [],
        loading: false,
        page: 1,
        row: 10,
        total: 0
      },
      //未拿到公司集合
      noGetedGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0' /*川内川外地区*/,
          ryVal: '',
          planVal: ''
        },
        row: 10,
        page: 1,
        total: 0,
        selectRows: [],
        tableList: [],
        loading: false
      },
      zb_tb_count: {
        dialogVisible: false,
        data: {
          thread_id: '',
          jbxx_id: ''
        }
      },
      allData1: {
        page: 1,
        row: 10,
        data: [],
        oneFourOne: '',
        credit: '',
        tool: '',
        analyze: '',
        ordinaryData: '',
        buttonState: ''
      },
      allData2: {
        data: [],
        oneFourOne: '',
        credit: '',
        tool: '',
        analyze: '',
        ordinaryData: '',
        buttonState: '',
        page: 1,
        row: 10
      },
      allData3: {
        data: [],
        oneFourOne: '',
        credit: '',
        tool: '',
        analyze: '',
        ordinaryData: '',
        buttonState: '',
        page: 1,
        row: 10
      },
      yshSelectRows: [],
      pageName1: '',
      pageName2: '',
      pageName3: '',
      yshLoaging: true,
      wshLoaging: true,
      allLoaging: true
    }
  },
  // props:["yshData",'wshData','allData'],
  props: {
    yshData: {
      type: Object,
      default() {
        return {
          rows: [],
          loaging: true,
          table: {
            '141': '',
            信用: '',
            公司工具: '',
            公司行为数据分析: '',
            企业名称: ''
          }
        }
      }
    },
    wshData: {
      type: Object,
      default() {
        return {
          rows: [],
          loaging: true,
          table: {
            '141': '',
            信用: '',
            公司工具: '',
            公司行为数据分析: '',
            企业名称: ''
          }
        }
      }
    },
    allData: {
      type: Object,
      default() {
        return {
          rows: [],
          loaging: true,
          table: {
            '141': '',
            信用: '',
            公司工具: '',
            公司行为数据分析: '',
            企业名称: ''
          }
        }
      }
    },
    operationState: {
      type: Boolean
    }
  },
  created() {
    // this.ajaxXmInfo()
    this.id = this.$route.query.thread_id
    this.last_treeId = this.$route.query.last_treeId
    this.human_id = this.$route.query.thread_id

    this.ajaxGetUser()

    // this.ajaxYesGsList()
    // this.ajaxNoGsList()
    this.ajaxAllGsList()
  },
  watch: {
    yshData: {
      handler: function(newVal, old) {
        if (this.yshData) {
          if (newVal) {
            // console.log(this.yshData,"this.yshData")
            this.changeData1()
            this.yesGsData.page = this.yshData.page
              ? this.yshData.page
              : this.yesGsData.page
            // console.log( this.operationState)
            // this[dataObj].total = 0;
            // console.log()
          }
        }
      },
      deep: true //对象内部属性的监听，关键。
    },
    wshData: {
      handler: function(newVal, old) {
        if (this.wshData) {
          if (newVal) {
            this.noGsData.page = this.wshData.page
              ? this.wshData.page
              : this.noGsData.page

            this.changeData2()
          }
        }
      },
      deep: true //对象内部属性的监听，关键。
    },
    allData: {
      handler: function(newVal, old) {
        if (this.allData) {
          if (newVal) {
            this.allGsData.page = this.allData.page
              ? this.allData.page
              : this.allGsData.page
            this.changeData3()
          }
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  methods: {
    changePageUserGsList(val) {
      this.userGslist.page = val
      this.ajaxGetUseredGslist()
    },
    open_detail(row, sortField, type) {
      this.zb_tb_count.dialogVisible = true
      this.zb_tb_count.data = {
        thread_id: this.human_id,
        jbxx_id: this.jbxx_id,
        type,
        gs_id: row.gs_id,
        sortField: sortField
      }
    },
    //获取人员列表
    ajaxGetUser() {
      this.axios.post(
        '/index/project/getUsers',
        {
          company_id: localStorage.getItem('company_id')
        },
        data => {
          this.allUsers = data.rows
        }
      )
    },
    //获取方案列表
    //选择人员弹框操作
    hiddePopover(key, i, type) {
      if (type == 'yes') {
        //ajax
      }
      this.yesGetedGsData[key]['item' + i] = false
    },
    //点击人员换人赋值
    onClickRy(ry) {
      this.tableList_checkRyVal = ry
    },
    //列表被选颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.exit == 1) {
        return { backgroundColor: '#e5e5e5' }
      }
    },
    //排序
    yesTableSort(column, prop, order) {
      if (column.order == 'descending') {
        order = 'desc'
      } else {
        order = 'asc'
      }
      this.yesGsData.page = 1
      this.yesGsData.total = 0
      this.ajaxYesGsList(column.prop, order)
    },
    //排序
    noTableSort(column, prop, order) {
      if (column.order == 'descending') {
        order = 'desc'
      } else {
        order = 'asc'
      }
      this.noGsData.page = 1
      this.noGsData.total = 0
      this.ajaxNoGsList(column.prop, order)
    },
    //是否可选择列表多选框
    disabledCheck(row, index) {
      if (row.exit == 1) {
        return false
      } else {
        return true
      }
    },
    //点击标签
    onShowDialog(ajaxFn, row, type) {
      this.tagDialogData.dialogVisible = true
      this.tagDialogData.ajaxFn = ajaxFn
      this.tagDialogData.row = row
      if (type == 'yes') {
        this.ajaxTagData()
      } else {
        let obj = {
          ajaxFn: ajaxFn,
          qyxz: '',
          tbpl: '',
          id: '',
          cooperation: '',
          issue: '',
          content: ''
        }
        this.tagDialogData.formData = obj
      }
    },
    //删除标签备注
    onDeleteTagOther(id) {
      //   this.axios.post(
      //     "/Index/Others/delete",
      //     {
      //       id
      //     },
      //     data => {
      //       this.ajaxTagData();
      //     }
      //   );
    },
    //获取标签数据
    ajaxTagData() {
      //   this.axios.post(
      //     "/Index/Others/labelShow",
      //     {
      //       gs_id: this.tagDialogData.row.gs_id
      //     },
      //     data => {
      //       let obj = {
      //         qyxz: data.rows.qyxz,
      //         tbpl: data.rows.tbpl,
      //         cooperation: data.rows.cooperation,
      //         other: data.rows.other,
      //         issue: data.rows.issue,
      //         content: "",
      //         id: data.rows.id
      //       };
      //       this.tagDialogData.formData = obj;
      //     }
      //   );
    },
    //保存修改组件
    onTemplateSave() {
      let username = ''
      if (this.selected_row.user_id) {
        username = this.allUsers['分配'].filter(
          v => v.id == this.selected_row.user_id
        )[0].username
      }
      //   this.axios.post(
      //     "/index/element_set/personAllot",
      //     {
      //       username,
      //       jbxx_id: this.jbxx_id,
      //       user_id: this.selected_row.user_id,
      //       level_id: this.selected_row.level_id,
      //       group_id: this.userGslist.templateData.val.join(","),
      //       type: 2,
      //       diff: "分配"
      //     },
      //     data => {
      //       this.userGslist.templateData.dialogEditVisible = false;
      //       this.ajaxGetedRyList();
      //       this.$message.success("修改成功");
      //     }
      //   );
    },
    //点击保存标签
    onTagSave() {
      //   this.axios.post(
      //     "/Index/Others/label",
      //     {
      //       thread_id: this.human_id,
      //       gs_id: this.tagDialogData.row.gs_id,
      //       id: this.tagDialogData.formData.id,
      //       type: "list",
      //       content: this.tagDialogData.formData.content,
      //       qyxz: this.tagDialogData.formData.qyxz,
      //       tbpl: this.tagDialogData.formData.tbpl,
      //       cooperation: this.tagDialogData.formData.cooperation,
      //       issue: this.tagDialogData.formData.issue
      //     },
      //     data => {
      //       this.tagDialogData.dialogVisible = false;
      //       let ajaxFn = this.tagDialogData.ajaxFn;
      //       this[ajaxFn]();
      //     }
      //   );
    },
    sortingTableData(obj, num, allObj) {
      // console.log(obj,"obj")
      // console.log(this.yshData)
      this[obj.objName].page = obj.page
      this[obj.objName].order = obj.order
      this[obj.objName].orderName = obj.orderName
      this[obj.objName].gsgzType = obj.gsgzType
      this[obj.objName].name = obj.name
      this[obj.objName].label = obj.label
      this.order = obj.order
      this.orderName = obj.orderName
      let queryObj = {
        gsmc: this.yesGsData.formData.gsmc,
        scale: this.yesGsData.formData.areaTypeVal,
        type: num,
        page: obj.page,
        order: obj.order ? obj.order : 'desc',
        ordername: obj.orderName ? obj.orderName : 'activity ',
        dataObj: num == 1 ? 'yesGsData' : 'noGsData',
        gsgzType: obj.gsgzType,
        rows: num == 1 ? this.yesGsData.row : this.noGsData.row,
        name: obj.name,
        label: obj.label
      }
      console.log(queryObj, 'queryObj')
      this.$emit('changeYshData', queryObj, allObj)
      // console.log(queryObj,)
    },
    // 已审核公司集合
    ajaxYesGsList(ordername = '', order = 'desc') {
      this.yshLoading = true
      let queryObj = {
        // user_cate: '分配',
        // jbxx_id: this.jbxx_id,
        // id: this.id,
        // human_id: this.human_id,
        gsmc: this.yesGsData.formData.gsmc,
        scale: this.yesGsData.formData.areaTypeVal,
        type: 1,
        rows: this.yesGsData.row,
        page: this.yesGsData.page,
        order: this.yesGsData.order ? this.yesGsData.order : '',
        zbminNum: this.yesGsData.zbMinNum ? this.yesGsData.zbMinNum : '',
        zbmaxNum: this.yesGsData.zbMaxNum ? this.yesGsData.zbMaxNum : '',
        tbminNum: this.yesGsData.tbMinNum ? this.yesGsData.tbMinNum : '',
        tbmaxNum: this.yesGsData.tbMaxNum ? this.yesGsData.tbMaxNum : '',
        ordername: this.yesGsData.orderName
          ? this.yesGsData.orderName
          : 'activity ',
        name: this.yesGsData.name,
        label: this.yesGsData.label,
        dataObj: 'yesGsData',
        gsgzType: this.yesGsData.gsgzType
      }
      // console.log(queryObj,"queryObj")
      // console.log(this.yesGsData,"this.yesGsData")
      this.$emit('changeYshData', queryObj)
    },
    // 未审核公司集合
    ajaxNoGsList(ordername = '', order = 'desc') {
      this.wshLoading = true
      let queryObj = {
        // user_cate: '分配',
        // jbxx_id: this.jbxx_id,
        // id: this.id,
        // human_id: this.human_id,
        gsmc: this.noGsData.formData.gsmc,
        scale: this.noGsData.formData.areaTypeVal,
        type: 0,
        rows: this.noGsData.row,
        page: this.noGsData.page,
        dataObj: 'noGsData',
        order: this.noGsData.order ? this.noGsData.order : '',
        zbminNum: this.noGsData.zbMinNum ? this.noGsData.zbMinNum : '',
        zbmaxNum: this.noGsData.zbMaxNum ? this.noGsData.zbMaxNum : '',
        tbminNum: this.noGsData.tbMinNum ? this.noGsData.tbMinNum : '',
        tbmaxNum: this.noGsData.tbMaxNum ? this.noGsData.tbMaxNum : '',
        ordername: this.noGsData.orderName
          ? this.noGsData.orderName
          : 'activity ',
        name: this.noGsData.name,
        label: this.noGsData.label,
        gsgzType: this.noGsData.gsgzType
      }
      // console.log(queryObj);
      this.$emit('changeYshData', queryObj)
      //   this.axios.post('/Index/thread/audited?type=0', queryObj, data => {
      //     if (this.noGsData.page > 1 && data.status == 'failed') {
      //       this.noGsData.page -= 1
      //       this.ajaxNoGsList()
      //       return
      //     }
      //     this.noGsData.loading = false
      //     this.noGsData.tableList = data.rows || []
      //     this.noGsData.total = data.total || 0
      //   })
    },
    //全部公司集合
    ajaxAllGsList() {
      this.allLoading = true
      let queryObj = {
        gsmc: this.allGsData.formData.gsmc,
        scale: this.allGsData.formData.areaTypeVal,
        type: 2,
        rows: this.allGsData.row,
        page: this.allGsData.page,
        dataObj: 'allGsData',
        order: 'desc',
        ordername: 'activity'
      }
      this.$emit('changeYshData', queryObj)
    },
    // 已拿到公司集合
    //拿公司人员集合
    ajaxGetedRyList() {},
    ajaxOnYesorNoList(gs_id, type) {},
    //改变是否是否川内外
    onChangeArea(ajaxObj, dataobj) {
      // console.log(ajaxObj)
      // console.log(dataobj)
      // console.log(this[dataobj])

      this[dataobj].page = 1
      this[ajaxObj]()
    },
    //同意重置事件
    onResetForm(ajaxObj, dataObj) {
      this.$emit('changeStateTrue', dataObj)
      // console.log(this.operationState)
      // this.yesGsData.row = 10;
      // this.noGsData.row = 10;

      this[dataObj].formData.gsmc = ''
      this[dataObj].formData.areaTypeVal = '0'
      this[dataObj].page = 1
      this[dataObj].row = 10
      this[dataObj].total = 0
      this[dataObj].zbMinNum = ''
      this[dataObj].zbMaxNum = ''
      this[dataObj].tbMinNum = ''
      this[dataObj].tbMaxNum = ''
      this[dataObj].gsgzType = ''
      this[dataObj].order = ''
      this[dataObj].orderName = ''
      this[ajaxObj]()
      this.yesGsDataChangeSize(10)
      // console.log( this.yesGsData," this[dataObj].gsgzType")
      this.$emit('changeStateFalse')
    },
    //搜索
    onSearch(ajaxObj, dataObj) {
      this.yshLoaging = true
      this.wshLoaging = true
      this[dataObj].page = 1
      this[dataObj].total = 0
      this[ajaxObj]()
    },
    onAllAuditing(dataObj, ajaxObj) {
      //批量未审核，审核
      let gs_id = this[dataObj].selectRows.map(v => v.gs_id)
      if (gs_id.length == 0) {
        this.$message.error('请选择公司')
        return
      }
      let myObj = {
        gs_id: gs_id.join(','),
        type: dataObj == 'yesGsData' ? '1' : '0'
      }
      this.$emit('auditNoAudit', myObj)
    },
    //派发人员
    onDistribute(dataObj, ajaxObj) {
      let gs_id = this[dataObj].selectRows.map(v => v.gs_id)
      if (gs_id.length == 0) {
        this.$message.error('请选择公司')
        return
      }
      let username = ''
      if (this[dataObj].formData.ryVal) {
        username = this.allUsers[this.user_cate].filter(
          v => v.id == this[dataObj].formData.ryVal
        )[0].username
      }
      let params = {
        gs_ids: gs_id.join(','),
        user_id: this[dataObj].formData.ryVal,
        username,
        type: '',
        user_cate: ''
      }
      if (dataObj == 'yesGsData') {
        params.type = this.yesGsData.formData.ryVal
        params.user_cate = this.yesGsData.formData.fp_bs_sh
      } else if (dataObj == 'allGsData') {
        params.type = this.allGsData.formData.ryVal
        params.user_cate = this.allGsData.formData.fp_bs_sh
      }

      // console.log(params);
      this.$emit('fnAddCompanyToProject', params)
    },
    //查看结果集合
    onCheck(row) {
      let { href } = this.$router.resolve({
        path: `/bidResultRyYj?jbxx_id=${this.jbxx_id}&gs_id=${
          row.gs_id
        }&yj_id=${this.node.yj_node}&ry_id=${this.node.ry_node}&flag=0`
      })
      window.open(href)
    },
    //查看结果集
    onCheckResult(row) {
      var yj_id, ry_id
      row.sign.forEach(v => {
        if (v.name == '业绩') {
          yj_id = v.id
        } else if (v.name == '人员') {
          ry_id = v.id
        }
      })
      let { href } = this.$router.resolve({
        path: `/bidResultRyYj?jbxx_id=${this.jbxx_id}&gs_id=${
          row.gs_id
        }&yj_id=${yj_id}&ry_id=${ry_id}&flag=1`
      })
      window.open(href)
    },
    //下部分列表分配公司
    onDistribute_button(type, ajaxObj, user_id, gs_id, ry_type, username = '') {
      if (type == 'all') {
        gs_id = gs_id.map(v => v.gs_id)
        if (gs_id.length == 0) {
          this.$message.error('请选择公司')
          return
        }
        gs_id = gs_id.join(',')
        if (user_id) {
          username = this.allUsers[this.user_cate].filter(
            v => v.id == user_id
          )[0].username
        }
      }
      let queryObj = {
        company_id: localStorage.getItem('company_id'),
        jbxx_id: this.jbxx_id,
        gs_id: gs_id,
        type: 2,
        username
      }
      queryObj[ry_type] = user_id
      //   this.axios.post(
      //     "/index/element_set/editCompanyToProject",
      //     queryObj,
      //     data => {
      this[ajaxObj]()
      this.ajaxGetedRyList()
      //     }
      //   );
    },
    //执行方案
    onExecutePlan(dataObj, ajaxFn, planid) {
      let gs_id = this[dataObj].selectRows.map(v => v.gs_id)
      if (gs_id.length == 0) {
        this.$message.error('请选择公司')
        return
      }
      gs_id = gs_id.join(',')
      let nowPlan = this.planList.filter(v => v.id == planid)
      if (nowPlan.length == 0) {
        nowPlan.node_name = ''
        nowPlan.cate = ''
      } else {
        nowPlan = nowPlan[0]
      }
      this.yesGetedGsData.loading = true

      //   this.axios.post(
      //     "/index/Human_Allot/executePlan",
      //     {
      //       jbxx_id: this.jbxx_id,
      //       thread_id: planid,
      //       gs_id,
      //       name: nowPlan.node_name,
      //       cate: nowPlan.cate,
      //       case: planid ? 0 : 1
      //     },
      //     data => {
      this[ajaxFn]()
      //     }
      //   );
    },
    // 删除分配公司
    onDeleteGs(type, ajaxObj, gs_idOrDataObj) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (type == 'all') {
            gs_idOrDataObj = this[gs_idOrDataObj].selectRows.map(v => v.gs_id)
            if (gs_idOrDataObj.length == 0) {
              this.$message.error('请选择公司')
              return
            }
            gs_idOrDataObj = gs_idOrDataObj.join(',')
          }
          //   this.axios.post(
          //     "/index/element_set/editCompanyToProject",
          //     {
          //       company_id: localStorage.getItem("company_id"),
          //       gs_id: gs_idOrDataObj,
          //       type: 1,
          //       jbxx_id: this.jbxx_id,
          //       diff: "分配"
          //     },
          //     data => {
          //       if (data.status == "success") {
          //         this.$message({
          //           type: "success",
          //           message: "删除成功!"
          //         });
          this[ajaxObj]()
          this.ajaxYesGsList()
          this.ajaxAllGsList()
          this.ajaxNoGsList()
          //       }
          //     }
          //   );
        })
        .catch(() => {})
    },
    //是否开通展示
    onIsDisplay(type, ajaxFn, rows, typeAllOne) {
      if (rows.length == 0) {
        this.$message.error('请选择公司')
        return
      }
      let url, queryObj
      if (type == 'yes') {
        //开通
        url = '/Index/Project/saveDisplay'
        rows = rows.map(v => {
          let obj = [v.gs_id, 0, 0, v.cate]
          if (v.sign) {
            v.sign.forEach(v2 => {
              if (v2.name == '业绩') {
                obj[1] = v2.id
              } else if (v2.name == '人员') {
                obj[2] = v2.id
              }
            })
          }
          return obj
        })
        rows = JSON.stringify(rows)
        queryObj = {
          data: rows,
          jbxx_id: this.jbxx_id
        }
      } else {
        //关闭
        url = '/Index/Project/delDisplay'
        rows = rows.map(v => v.gs_id).join(',')
        queryObj = {
          gs_id: rows,
          jbxx_id: this.jbxx_id
        }
      }
      this.axios.post(url, queryObj, data => {
        this[ajaxFn]()
      })
    },

    //列表中的选择人员回调
    onListInSelect(obj) {
      this.onDistribute_button(
        'one',
        obj.ajaxFn,
        obj.ry_id,
        obj.gs_id,
        obj.ry_type,
        obj.username
      )
    },

    // 人员集合开通配置
    onRySwitch(row, type, id) {
      let group_id
      if (type == 'no') {
        let a = row.group_id.split(',')
        a.splice(a.indexOf(id + ''), 1)
        group_id = a.join(',')
      } else {
        if (row.group_id) {
          group_id = row.group_id.split(',')
          group_id.push(id)
          group_id = group_id.join(',')
        } else {
          group_id = id
        }
      }
      let username = ''
      if (row.user_id) {
        username = this.allUsers['分配'].filter(v => v.id == row.user_id)[0]
          .username
      }
      //   this.axios.post(
      //     "/index/element_set/personAllot",
      //     {
      //       username,
      //       jbxx_id: this.jbxx_id,
      //       user_id: row.user_id,
      //       level_id: row.level_id,
      //       group_id,
      //       type: 2,
      //       diff: "分配"
      //     },
      //     data => {
      this.ajaxGetedRyList()
      // }
      //   );
    },
    //删除人员集合type是否是多选或单个删除
    onDeleteRy(type, row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let user_id
          if (type == 'all') {
            if (this.getedRyData.selectRows.length == 0) {
              this.$message.error('请选择人员')
              return
            }
            user_id = this.getedRyData.selectRows.map(v => v.user_id)
            user_id = user_id.join(',')
          } else {
            user_id = row.user_id
          }
          //   this.axios.post(
          //     "/index/element_set/personAllot",
          //     {
          //       jbxx_id: this.jbxx_id,
          //       user_id,
          //       type: 3,
          //       diff: "分配"
          //     },
          //     data => {
          //       this.$message({
          //         type: "success",
          //         message: "删除成功!"
          //       });
          this.ajaxGetedRyList()
          this.ajaxYesGsList()
          this.ajaxNoGsList()
          this.ajaxAllGsList()
          this.ajaxYesGetedGsList()
          this.ajaxNoGetedGsList()
          //     }
          //   );
        })
        .catch(() => {})
    },
    //添加人员集合
    onAddRyList() {
      let username = ''
      if (this.getedRyData.formData.ryVal) {
        username = this.allUsers['分配'].filter(
          v => v.id == this.getedRyData.formData.ryVal
        )[0].username
      }
      //   this.axios.post(
      //     "/index/element_set/personAllot",
      //     {
      //       username,
      //       jbxx_id: this.jbxx_id,
      //       user_id: this.getedRyData.formData.ryVal,
      //       level_id: "",
      //       group_id: "",
      //       type: 1,
      //       diff: "分配"
      //     },
      //     data => {
      this.ajaxGetedRyList()
      // }
      //   );
    },
    myselectData(val, name) {
      if (name == '已审核') {
        this.yshSelectRows = val
        this.yesGsData.selectRows = val
      } else if (name == '未审核') {
        this.noGsData.selectRows = val
      } else if (name == '全部') {
        this.allGsData.selectRows = val
      }

      // console.log(name)
      // console.log(val)
    },
    deletilMyData(val, num) {
      let myObj = {
        gs_id: val.gs_id,
        type: num
      }
      this.$emit('auditNoAudit', myObj)
      // console.log(val.gs_id,num)
    },

    findZbNum(dataObj, ajaxObj) {
      // console.log(dataObj);
      if (dataObj == 'yesGsData') {
        this[dataObj].zbMinNum = this.zbCiShuMin1
        this[dataObj].zbMinNum = this.zbCiShuMin1
        this.ajaxYesGsList()
      } else {
        this[dataObj].zbMinNum = this.zbCiShuMin2
        this[dataObj].zbMinNum = this.zbCiShuMin2
        this.ajaxNoGsList()
      }
      // this[ajaxObj]
    },
    yesGsDataChangePage(val) {
      this.yesGsData.page = val
      this.ajaxYesGsList()
      //  console.log(  this.yesGsData,"点击分页是  的    page")
    },
    yesGsDataChangeSize(val) {
      this.yesGsData.row = val
      // console.log(this.yesGsData.row, " this.yesGsData");
      this.yesGsData.page = 1
      this.yesGsData.total = 0
      this.ajaxYesGsList()
    },
    noGsDataChangePage(val) {
      this.noGsData.page = val
      this.ajaxNoGsList()
    },
    noGsDataChangeSize(val) {
      this.noGsData.row = val
      this.noGsData.page = 1
      this.noGsData.total = 0
      this.ajaxNoGsList()
    },
    allGsDataChangePage(val) {
      this.allGsData.page = val
      this.ajaxAllGsList()
    },
    allGsDataChangeSize(val) {
      this.allGsData.row = val
      this.allGsData.page = 1
      this.allGsData.total = 0
      this.ajaxAllGsList()
    },
    yesGetedGsChangePage(val) {
      this.yesGetedGsData.page = val
      this.ajaxYesGetedGsList()
    },
    yesGetedGsChangeSize(val) {
      this.yesGetedGsData.row = val
      this.yesGetedGsData.page = 1
      this.yesGetedGsData.total = 0
      this.ajaxYesGetedGsList()
    },
    getedRyChangePage(val) {
      this.getedRyData.page = val
      this.ajaxGetedRyList()
    },
    getedRyChangeSize(val) {
      this.getedRyData.row = val
      this.getedRyData.page = 1
      this.getedRyData.total = 0
      this.ajaxGetedRyList()
    },
    noGetedGsChangePage(val) {
      this.noGetedGsData.page = val
      this.ajaxNoGetedGsList()
    },
    noGetedGsChangeSize(val) {
      this.noGetedGsData.row = val
      this.noGetedGsData.page = 1
      this.noGetedGsData.total = 0
      this.ajaxNoGetedGsList()
    },
    //负责人公司
    onGetUserGsList(row) {
      this.selected_row = row
      this.userGslist.tableList = []
      this.userGslist.dialogVisible = true
      this.ajaxGetUseredGslist()
    },
    //删除负责人公司
    onDeleUserGs(row) {
      this.ajaxGetUseredGslist()
      this.ajaxYesGetedGsList()
      this.ajaxNoGetedGsList()
      this.ajaxYesGsList()
      this.ajaxNoGsList()
      this.ajaxAllGsList()
    },
    //获取人员负责公司列表
    ajaxGetUseredGslist() {
      this.userGslist.loading = true
      this.ajaxGetUseredGslist()
      //         return;
      //       }
      //       this.userGslist.loading = false;
      //       this.userGslist.tableList = data.rows || [];
      //       this.userGslist.total = data.total || 0;
      //     }
      //   );
    },
    //打开组件弹框
    onOpenTemplate(row) {
      this.selected_row = row
      let arrays = row.group_id ? row.group_id.split(',') : []
      if (arrays.indexOf('12') >= 0) {
        arrays.splice(arrays.indexOf('12'), 1)
      }
      if (arrays.indexOf('13') >= 0) {
        arrays.splice(arrays.indexOf('13'), 1)
      }
      arrays = arrays.map(v => v - 0)
      this.userGslist.templateData.val = arrays
      this.userGslist.templateData.dialogEditVisible = true
    },
    //发送短信
    sendMessage(row) {
      //   this.$confirm("向该用户发送消息提醒?", "提示", {
      //     type: "warning"
      //   })
      // .then(_ => {
      //   this.axios.post(
      //     "/index/element_set/sendMessage",
      //     {
      //       jbxx_id: this.jbxx_id,
      //       user_id: row.user_id
      //     },
      //     data => {
      //       this.$message.success("已发送");
      //     }
      //   );
      // })
      // .catch(_ => {});
    },

    changeData1() {
      this.pageName1 = '已审核'
      this.yesGsData.formData.fp_bs_sh = this.yshData.formData.fp_bs_sh
      if (this.yshData.total != '' || this.yshData.total == 0) {
        this.yshLoaging = false
        if (this.wshData.total == '') {
          this.wshLoaging = false
        }
        //   console.log("11111111111111111111111111")
        let oneFourOne = this.yshData.table['141']
          ? this.yshData.table['141']
          : ''
        let credit = this.yshData.table['信用']
          ? this.yshData.table['信用']
          : ''
        let tool = this.yshData.table['公司工具']
          ? this.yshData.table['公司工具']
          : ''
        let analyze = this.yshData.table['公司行为数据分析']
          ? this.yshData.table['公司行为数据分析']
          : ''
        let ordinaryData = this.yshData.table['企业名称']
          ? this.yshData.table['企业名称']
          : ''
        let buttonState = false
        this.allData1 = {
          data: this.yshData.rows,
          page: this.yshData.page,
          row: this.yshData.row,
          oneFourOne: oneFourOne,
          credit: credit,
          tool: tool,
          analyze: analyze,
          name: this.pageName1,
          ordinaryData: ordinaryData,
          buttonState: buttonState,
          loading: false,
          jbxx_id: this.yshData.jbxx_id,
          thread_id: this.yshData.thread_id
        }
      }
      //   console.log(oneFourOne)
    },
    changeData2() {
      this.pageName2 = '未审核'
      if (this.wshData.total != '') {
        //  console.log(this.wshData.table["公司工具"],"11111111111111111111111")
        this.wshLoaging = false
        // console.log(this.wshData.table)
        let oneFourOne = this.wshData.table['141']
          ? this.wshData.table['141']
          : ''
        let credit = this.wshData.table['信用']
          ? this.wshData.table['信用']
          : ''
        let tool = this.wshData.table['公司工具']
          ? this.wshData.table['公司工具']
          : ''
        let analyze = this.wshData.table['公司行为数据分析']
          ? this.wshData.table['公司行为数据分析']
          : ''
        let ordinaryData = this.wshData.table['企业名称']
          ? this.wshData.table['企业名称']
          : ''
        let buttonState = false
        this.allData2 = {
          data: this.wshData.rows,
          oneFourOne: oneFourOne,
          credit: credit,
          tool: tool,
          analyze: analyze,
          name: this.pageName2,
          ordinaryData: ordinaryData,
          buttonState: buttonState,
          page: this.wshData.page,
          row: this.wshData.row ? this.wshData.row : 10,
          jbxx_id: this.wshData.jbxx_id,
          thread_id: this.wshData.thread_id
        }
      }
      if (this.wshData.total == 0) {
        this.allData2 = {
          data: [],
          // oneFourOne: [],
          // credit: [],
          // tool: [],
          // analyze: [],
          name: this.pageName2,
          // ordinaryData: [],
          // buttonState: "",
          page: this.wshData.page,
          row: this.wshData.row ? this.wshData.row : 10,
          jbxx_id: this.wshData.jbxx_id,
          thread_id: this.wshData.thread_id
        }
      }
    },
    changeData3() {
      this.pageName3 = '全部'
      this.buttonState = true
      //  console.log(this.wshData)
      this.allGsData.formData.fp_bs_sh = this.allData.formData.fp_bs_sh
      if (this.allData3.total != '') {
        this.allLoaging = false
        let buttonState = true
        this.allData3 = {
          data: this.allData.rows,
          page: this.allData.page,
          row: this.allData.row,
          oneFourOne: '',
          credit: '',
          tool: '',
          analyze: '',
          ordinaryData: '',
          name: this.pageName3,
          buttonState: buttonState
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.table-title {
  margin: 20px auto;
  text-align: center;
  font-size: 28px;
}
.ys-ws-divs {
  height: 100%;
  //   display: flex;
  //超出了
  > div {
    flex: 1;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
  }
}
.tag-text {
  display: flex;
  align-items: center;
  > p {
    flex: 1;
    padding: 0 6px;
  }
}
.diplay-flex-column {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.spanClass{
  color: #d3d3d3;
  margin:0 5px;
}
</style>

