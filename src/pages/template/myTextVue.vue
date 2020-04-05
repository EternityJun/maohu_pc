<!--  -->
<template>
  <div class="myTextVue">
    <el-table :data="tableData.data" style="width: 100%" @selection-change="handleSelectionChange" :row-style="tableRowClassName" border max-height="900px" @sort-change="yesTableSort">
      <el-table-column type="selection" width="50" :selectable="disabledCheck"></el-table-column>
      <el-table-column fixed="left" label="序号" header-align="center" align="center" width="60">
        <template slot-scope="scope">{{scope.$index+(tableData.page-1)*tableData.row+1}}</template>
      </el-table-column>
      <el-table-column fixed="left" prop="gsmc" label="企业名称" min-width="150" align="center">
        <template slot-scope="scope">
          <p @click="openDetails(scope.row)" style="cursor: pointer;color: #66b1ff">{{scope.row.gsmc}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="tableData.oneFourOne" align="center" min-width="250" prop="141" label="1.4.1">
        <template slot-scope="scope">
          <span v-for="item in scope.row[141]" :key="item.name" class="ry_yj" @click="onCheckResult(scope.row)" style="cursor:pointer">
            <span :class="item.status?grennColor:redColor">{{item.name}}</span>
            <span :class="item.status?grennColor:redColor" v-if="item.count">({{item.count}})</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="tableData.credit  " align="center" label="信用">
        <el-table-column align="center" v-for="item in tableData.credit" :key="item.name" min-width="100" :prop="item.name" :label="item.lable"></el-table-column>
      </el-table-column>

      <el-table-column v-if=" tableData.tool " align="center" label="公司工具">
        <el-table-column align="center" v-for="item in newGsgj" :key="item.name" height="120px" width="150" :prop="item.name" :label="item.lable">
          <template slot="header" slot-scope="scope">
            <el-dropdown trigger="click" @command="handleCommand" style="cursor:pointer;" size="mini">
              <span v-html="item.lable">
                {{item.lable}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for=" i in item.search" :key="i.name" :command="{item,i}">{{i.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template slot-scope="scope">
            <span :class="scope.row[item.name]?gsgzTureIcon:gsgzFlaseIcon"></span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column v-if=" tableData.analyze " align="center" label="公司行为数据分析">
        <el-table-column align="center" v-for="item in tableData.analyze" min-width="80" :key="item.name" :prop="item.name" :label="item.lable" sortable="custom">
          <template slot-scope="scope">
            <el-button @click="open_detail(scope.row,item.name,1)" type="text">{{scope.row[item.name]}}</el-button>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column fixed="right" v-if="!tableData.buttonState" align="center" label="操作" width="85">
        <template slot-scope="scope">
          <el-button type="primary " size="mini" v-if="tableData.name == '未审核'" @click="deletilData(scope.row)">审核</el-button>
          <el-button type="primary" size="mini" v-if="tableData.name == '已审核'" @click="deletilData(scope.row)">未审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="zb_tb_count.dialogVisible">
      <el-dialog title="项目" :visible.sync="zb_tb_count.dialogVisible">
        <el-dialog title="项目" :visible.sync="zb_tb_count.dialogVisible" width="70%" top="20px" append-to-body>
          <bid-xm :xm="zb_tb_count.data"></bid-xm>
        </el-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import bidXm from './bidXm.vue'

export default {
  name: 'myTextVue',
  data() {
    return {
      grennColor: 'grennColor',
      redColor: 'redColor',
      gsgzTureIcon: 'el-icon-check grennColor iconFont',
      gsgzFlaseIcon: 'el-icon-close redColor iconFont',
      loading: true,
      // 排序
      zb_tb_count: {
        dialogVisible: false,
        data: {
          thread_id: '',
          jbxx_id: ''
        }
      },
      scxw1: {
        label: '',
        // 名字
        type: '',
        // 类型
        name: ''
        //字段
      },
      scxw2: {
        label: '',
        type: '',
        name: ''
        //字段
      },
      scxw3: {
        label: '',
        type: '',
        name: ''
        //字段
      },
      zssl1: {
        label: '',
        type: '',
        name: ''
        //字段
      },
      zssl2: {
        label: '',
        type: '',
        name: ''
        //字段
      },
      ywfx: {
        label: '',
        type: '',
        name: ''
        //字段
      },
      newTable: [],
      allType: [],
      yshGsgzTypeList: {},
      wshGsgzTypeList: {},
      yshSortingObj: {
        page: '',
        // total:this.tableData.total,
        row: '',
        order: '',
        orderName: '',
        gsgzType: ''
      },
      wshSortingObj: {
        page: '',
        // total:this.tableData.total,
        row: '',
        order: '',
        orderName: '',
        gsgzType: ''
      },
      allSelectData: {
        scxw1: {
          label: '',
          type: '',
          name: ''
        },
        scxw2: {
          label: '',
          type: '',
          name: ''
        },
        scxw3: {
          label: '',
          type: '',
          name: ''
        },
        zssl1: {
          label: '',
          type: '',
          name: ''
        },
        zssl2: {
          label: '',
          type: '',
          name: ''
        },
        ywfx: {
          label: '',
          type: '',
          name: ''
        }
      },
      wshSelectData: {
        scxw1: {
          label: '',
          type: '',
          name: ''
        },
        scxw2: {
          label: '',
          type: '',
          name: ''
        },
        scxw3: {
          label: '',
          type: '',
          name: ''
        },
        zssl1: {
          label: '',
          type: '',
          name: ''
        },
        zssl2: {
          label: '',
          type: '',
          name: ''
        },
        ywfx: {
          label: '',
          type: '',
          name: ''
        }
      },
      selectName: '',
      selectLable: '',
      newGsgj: '',
      isRouterAlive: true
    }
  },
  props: ['tableData', 'operationState'],
  components: {
    bidXm
  },
  watch: {
    tableData: {
      handler: function(newVal, old) {
        if (this.tableData) {
          if (newVal) {
            // console.log(newVal)
            this.newGsgj=''
            this.$nextTick(() => {
              this.newGsgj = newVal.tool
            })
            // console.log(this.newGsgj, 'this.newGsgj')
            
            if (!this.operationState) {
              this.yshGsgzTypeList = {}
              this.wshGsgzTypeList = {}
              // console.log( this.yshGsgzTypeList," this.yshGsgzTypeList")
              this.allSelectData = {
                scxw1: {
                  label: '',
                  type: '',
                  name: ''
                },
                scxw2: {
                  label: '',
                  type: '',
                  name: ''
                },
                scxw3: {
                  label: '',
                  type: '',
                  name: ''
                },
                zssl1: {
                  label: '',
                  type: '',
                  name: ''
                },
                zssl2: {
                  label: '',
                  type: '',
                  name: ''
                },
                ywfx: {
                  label: '',
                  type: '',
                  name: ''
                }
              }
              this.wshSelectData = {
                scxw1: {
                  label: '',
                  type: '',
                  name: ''
                },
                scxw2: {
                  label: '',
                  type: '',
                  name: ''
                },
                scxw3: {
                  label: '',
                  type: '',
                  name: ''
                },
                zssl1: {
                  label: '',
                  type: '',
                  name: ''
                },
                zssl2: {
                  label: '',
                  type: '',
                  name: ''
                },
                ywfx: {
                  label: '',
                  type: '',
                  name: ''
                }
              }
              this.selectName = ''
              this.selectLable = ''
                 this.scxw1= {
                    label: '',
                    // 名字
                    type: '',
                    // 类型
                    name: ''
                    //字段
                  },
                  this.scxw2= {
                    label: '',
                    type: '',
                    name: ''
                    //字段
                  },
                  this.scxw3={
                    label: '',
                    type: '',
                    name: ''
                    //字段
                  },
                  this.zssl1= {
                    label: '',
                    type: '',
                    name: ''
                    //字段
                  },
                  this.zssl2={
                    label: '',
                    type: '',
                    name: ''
                    //字段
                  },
                  this.ywfx={
                    label: '',
                    type: '',
                    name: ''
                    //字段
                  }
            }
            // console.log( this.allSelectData)
            this.tableData = newVal
            // this.$nextTick()
          }
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  methods: {
    //调用父亲的方法
    getChangeList(obj) {
      // console.log(this.yshGsgzTypeList)
      let typeNum
      this.selectName = this[obj.item.name].name
      this.selectLabel = [obj.item.name].label
      if (this.tableData.name == '已审核') {
        this.allType = []
        //  this.gsgzTypeList={}
        for (let i in this.tableData.tool) {
          this.allType.push(i)
        }
        for (let t = 0; t < this.allType.length; t++) {
          let myName = this.allType[t]
          // console.log(this.allType[t],this.allType[t])
          // console.log(this[myName].type,"this[myName].type")
       
          //  this.yshGsgzTypeList[myName]= this[myName].type?this[myName].type:this.tabelData.tool[myName].type
          this.yshGsgzTypeList[myName] = this[myName].type
          if (this.yshGsgzTypeList[myName] === '') {
            // console.log(this.yshGsgzTypeList[myName]);
            delete this.yshGsgzTypeList[myName]
            // delete  this.allSelectData[myName];
          }
        }
           console.log(this.yshGsgzTypeList,"this.yshGsgzTypeList")
        typeNum = 1
     
        this.yshSortingObj = {
          page: 1,
          order: this.yesTableSort.order,
          // row: this.tableData.row,
          gsgzType: this.yshGsgzTypeList,
          name: this[obj.item.name].name,
          label: this[obj.item.name].label,
          orderName: this.yesTableSort.orderName,
          objName: 'yesGsData'
        }
        this.$emit(
          'sortingTableData',
          this.yshSortingObj,
          typeNum,
          this.allSelectData
        )
      } else if (this.tableData.name == '未审核') {
        this.allType = []
        for (let i in this.tableData.tool) {
          this.allType.push(i)
        }
        for (let t = 0; t < this.allType.length; t++) {
          let myName = this.allType[t]
          this.wshGsgzTypeList[myName] = this[myName].type
          if (this.wshGsgzTypeList[myName] === '') {
            delete this.wshGsgzTypeList[myName]
          }
        }
        typeNum = 0
        this.wshSortingObj = {
          page: 1,
          // row: this.tableData.row,
          order: this.wshSortingObj.order,
          gsgzType: this.wshGsgzTypeList,
          name: this[obj.item.name].name,
          label: this[obj.item.name].label,
          orderName: this.wshSortingObj.orderName,
          objName: 'noGsData'
        }
        // console.log(  this.wshSortingObj)
        this.$emit(
          'sortingTableData',
          this.wshSortingObj,
          typeNum,
          this.allSelectData
        )
        // console.log(111111)
      }
    },
    //是否可选择列表多选框
    disabledCheck(row, index) {
      if (row.exit == 1) {
        return false
      } else {
        return true
      }
    },

    //是否可选择列表多选框
    disabledCheck(row, index) {
      if (row.exit == 1) {
        return false
      } else {
        return true
      }
    },
    //列表已经被选颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.exit == 1) {
        return { backgroundColor: '#e5e5e5' }
      }
    },
    // 排序
    yesTableSort(column, prop, order) {
      let typeNum
      if (this.tableData.name == '已审核') {
        typeNum = 1
        this.yesTableSort.orderName = column.prop
        if (column.order == 'descending') {
          // order = "desc";
          this.yesTableSort.order = 'desc'
        } else {
          // order = "asc";
          this.yesTableSort.order = 'asc'
        }
        this.sortingObj = {
          page: 1,
          // total:this.tableData.total,
          // row: this.tableData.data.length,
          gsgzType: this.yshGsgzTypeList,
          order: this.yesTableSort.order,
          orderName: this.yesTableSort.orderName,
          name: this.selectName,
          label: this.selectLabel,
          //  gsgzType:this.gsgzTypeList
          objName: 'yesGsData'
        }
      } else {
        typeNum = 0
        this.wshSortingObj.orderName = column.prop
        if (column.order == 'descending') {
          // order = "desc";
          this.wshSortingObj.order = 'desc'
        } else {
          // order = "asc";
          this.wshSortingObj.order = 'asc'
        }
        this.sortingObj = {
          page: 1,
          // total:this.tableData.total,
          // row: this.tableData.data.length,
          gsgzType: this.wshGsgzTypeList,
          order: this.wshSortingObj.order,
          name: this.selectName,
          label: this.selectLabel,
          orderName: this.wshSortingObj.orderName,
          //  gsgzType:this.gsgzTypeList
          objName: 'noGsData'
        }
      }
      this.$emit(
        'sortingTableData',
        this.sortingObj,
        typeNum,
        this.allSelectData
      )
    },
    //审核按钮
    //改变table 表头的下拉框的值
    handleCommand(obj) {
      this[obj.item.name].name = obj.i.name
      this[obj.item.name].type = obj.i.lable
      this[obj.item.name].label = obj.item.name
      if (obj.item.name == 'scxw1') {
        if (obj.i.lable == 0) {
          this.allSelectData[obj.item.name].name =
            "该时间内<span class='el-icon-close'></span>"
        }
        if (obj.i.lable == 1) {
          this.allSelectData[obj.item.name].name =
            "该时间内<span class='el-icon-check'></span>"
        }
        if (obj.i.lable == 2) {
          this.allSelectData[obj.item.name].name = '该时间内不限'
        }
      } else if (obj.item.name == 'scxw2') {
        if (obj.i.lable == 0) {
          this.allSelectData[obj.item.name].name =
            "历年该地区<span class='el-icon-close'></span>"
        }
        if (obj.i.lable == 1) {
          this.allSelectData[obj.item.name].name =
            "历年该地区<span class='el-icon-check'></span>"
        }
        if (obj.i.lable == 2) {
          this.allSelectData[obj.item.name].name = '历年该地区不限'
        }
      } else if (obj.item.name == 'scxw3') {
        if (obj.i.lable == 0) {
          this.allSelectData[obj.item.name].name =
            "近一年半<span class='el-icon-close'></span>"
        }
        if (obj.i.lable == 1) {
          this.allSelectData[obj.item.name].name =
            "近一年半<span class='el-icon-check'></span>"
        }
        if (obj.i.lable == 2) {
          this.allSelectData[obj.item.name].name = '近一年半不限'
        }
      } else if (obj.item.name == 'zssl1') {
        if (obj.i.lable == 0) {
          this.allSelectData[obj.item.name].name =
            "项目小于金额<span class='el-icon-close'></span>"
        }
        if (obj.i.lable == 1) {
          this.allSelectData[obj.item.name].name =
            "项目大于金额<span class='el-icon-check'></span>"
        }
        if (obj.i.lable == 2) {
          this.allSelectData[obj.item.name].name = '项目金额不限'
        }
      } else if (obj.item.name == 'zssl2') {
        if (obj.i.lable == 0) {
          this.allSelectData[obj.item.name].name =
            "业绩小于金额<span class='el-icon-close'></span>"
        }
        if (obj.i.lable == 1) {
          this.allSelectData[obj.item.name].name =
            "业绩小于金额<span class='el-icon-check'></span>"
        }
        if (obj.i.lable == 2) {
          this.allSelectData[obj.item.name].name = '业绩金额不限'
        }
      } else if (obj.item.name == 'ywfx') {
        if (obj.i.lable == 0) {
          this.allSelectData[obj.item.name].name =
            "企业未参此类型<span class='el-icon-close'></span>"
        }
        if (obj.i.lable == 1) {
          this.allSelectData[obj.item.name].name =
            "企业参此类型<span class='el-icon-check'></span>"
        }
        if (obj.i.lable == 2) {
          this.allSelectData[obj.item.name].name = '企业参与不限'
        }
      }
      this.allSelectData[obj.item.name].type = obj.i.lable
      this.allSelectData[obj.item.name].label = obj.item.name
      this.getChangeList(obj)
      console.log(this.allSelectData,this.allSelectData)
    },
    deletilData(i) {
      let typeNum
      if (this.tableData.name == '已审核') {
        typeNum = 1
      } else {
        typeNum = 0
      }
      // console.log(typeNum)
      // console.log(typeNum)
      this.$emit('deletilMyData', i, typeNum)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // console.log(val)
      // console.log(this.tableData)
      this.$emit('myselectData', val, this.tableData.name, this.allSelectData)
    },
    openDetails(row) {
      let { href } = this.$router.resolve({
        path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.gsmc}`
      })
      window.open(href, '公司详情' + row.gs_id)
    },
    //查看结果集
    onCheckResult(row) {
      // console.log(row)
      var yj_id, ry_id
      row['141'].forEach(v => {
        if (v.name == '业绩') {
          yj_id = v.id
        } else if (v.name == '人员') {
          ry_id = v.id
        }
      })
      let { href } = this.$router.resolve({
        path: `/bidResultRyYj?jbxx_id=${this.tableData.jbxx_id}&gs_id=${
          row.gs_id
        }&yj_id=${yj_id}&ry_id=${ry_id}&flag=0`
      })
      window.open(href)
    },
    open_detail(row, sortField, type) {
      this.zb_tb_count.dialogVisible = true
      this.zb_tb_count.data = {
        thread_id: this.tableData.thread_id,
        jbxx_id: this.tableData.jbxx_id,
        type,
        gs_id: row.gs_id,
        sortField: sortField
      }
    }
  }
}
</script>
<style lang='less' scoped>
.my141 {
  display: flex;
}
.grennColor {
  color: rgb(93, 175, 52);
}
.redColor {
  color: red;
}
.iconFont {
  font-size: 16px;
  font-weight: 800;
}
.ry_yj {
  margin-right: 10px;
}
</style>