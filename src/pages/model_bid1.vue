<template>
  <div id="modelBid1">
    <el-row class="title">
      <el-col :span="2">
        <div>
          <h1>模型一</h1>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-form ref="form" :model="model" label-width="115px" @submit.native.prevent>
            <el-form-item label="模型名称">
              <el-input v-model="model.name" style="width:302px"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span='2'>
        <el-button type="primary" @click="openZb">中标信息</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:30px">
      <p>基本信息</p>
    </el-row>
    <el-row>
      <el-col :span="23" :offset="1">
        <el-form ref="form" :model="jbxx" label-width="115px" :inline="true" @submit.native.prevent>
          <el-form-item label="项目名称">
            <el-input v-model="jbxx.xmmc" style="width:715px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="importXm">导入</el-button>
            <el-button type="success" @click="showXm">查看</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23" :offset="1">
        <el-form ref="form" :model="jbxx" :inline="true" @submit.native.prevent>
          <el-form-item label="最高限价(万元)" label-width="115px">
            <el-input @focus="is_clear2('zgxjw',1)" @blur="is_clear2('zgxjw',2)" v-model="jbxx.zgxjw" placeholder="最高限价(万元)" style="width:300px" type="number" @change="change_zgxjw"></el-input>
          </el-form-item>
          <el-form-item>=</el-form-item>
          <el-form-item label="评审价(万元)" label-width="100px">
            <el-input @focus="is_clear2('psbjw',1)" @blur="is_clear2('psbjw',2)" v-model="jbxx.psbjw" style="width:300px" placeholder="评审价(万元)" type="number" @change="change_psj"></el-input>
          </el-form-item>
          <el-form-item>+</el-form-item>
          <el-form-item label="不可变价(万元)" label-width="110px">
            <el-input @focus="is_clear2('bkbjw',1)" @blur="is_clear2('bkbjw',2)" v-model="jbxx.bkbjw" style="width:300px" placeholder="不可变价(万元)" type="number" @change="change_bkbj"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="margin-top:30px">
      <el-col :span="1" style="line-height:40px">投标单位</el-col>
      <el-col :span="7">
        <el-form ref="form" :model="model" label-width="120px" :inline="true" @submit.native.prevent>
          <el-form-item label="公司家数">
            <el-input v-model="tbdw.num" type="number" style="width:190px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addQy">添加企业</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-form ref="form" :model="tbdw" label-width="50px" :inline="true" @submit.native.prevent>
          <el-form-item label="分组">
            <el-input clearable v-model="tbdw.min_group" placeholder="起始点" style="width:120px" type="number"></el-input>
            <span>-</span>
            <el-input clearable v-model="tbdw.max_group" placeholder="结束点" style="width:120px" type="number"></el-input>
          </el-form-item>
          <el-form-item label="步长">
            <el-select v-model="tbdw.group" placeholder="请选择" style="width:120px" clearable>
              <el-option v-for="item in tbdw.groups" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changePacket">确定</el-button>
            <el-button type="" @click="changePacket('cancel')">取消分组</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="tbdw">
      <el-col :span="24">
        <el-table :data="comp_data.tableData" style="width: 100%" @sort-change="fn_sortable" :span-method="spanMethods" :row-class-name="tableRowClassName">
          <el-table-column type="index" width="60" label="序号" align="center">
            <template slot-scope="scope">{{scope.$index+(comp_data.page-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="gsbh" label="编号" width="100" sortable="custom" align="center">
            <template slot-scope="{row,$index}">
              <span :style="row.section ? 'color:red' : ''">{{row.gsbh}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tbbjw" label="投标报价(万元)" sortable="custom" align="center">
            <template slot-scope="{row,$index}">
              <input @focus="is_clear('tbbjw',row,1)" @blur="is_clear('tbbjw',row,2)" :class="[row.grey ? 'colorTransprent' : '',row.tbbjw_icon ? 'colorRed' : '','editCell']" style="width:100%" v-model="row.tbbjw" type="number" @change="onChange('tbbjw',row)">
            </template>
          </el-table-column>
          <el-table-column prop="tbxf" label="点位" sortable="custom" align="center">
            <template slot-scope="{row,$index}">
              <input @focus="is_clear('tbxf',row,1)" @blur="is_clear('tbxf',row,2)" :class="[row.grey ? 'colorTransprent' : '',row.tbxf_icon ? 'colorRed' : '','editCell']" style="width:100%" v-model="row.tbxf" @change="onChange('tbxf',row)">
            </template>
          </el-table-column>
          <el-table-column align="center" width="20">
            <template slot-scope="{row,$index}">=</template>
          </el-table-column>
          <el-table-column prop="psbjw" label="评审价(万元)" sortable="custom" align="center">
            <template slot-scope="{row,$index}">
              <input @focus="is_clear('psbjw',row,1)" @blur="is_clear('psbjw',row,2)" :class="[row.grey ? 'colorTransprent' : '',row.psbjw_icon ? 'colorRed' : '','editCell']" style="width:100%" v-model="row.psbjw" type="number" @change="onChange('psbjw',row)">
            </template>
          </el-table-column>
          <el-table-column prop="psxf" label="点位" sortable="custom" align="center">
            <template slot-scope="{row,$index}">
              <input @focus="is_clear('psxf',row,1)" @blur="is_clear('psxf',row,2)" :class="[row.grey ? 'colorTransprent' : '',row.psxf_icon ? 'colorRed' : '','editCell']" style="width:100%" v-model="row.psxf" @change="onChange('psxf',row)">
            </template>
          </el-table-column>
          <el-table-column align="center" width="20">
            <template slot-scope="{row,$index}">+</template>
          </el-table-column>
          <el-table-column prop="bkbjw" label="不可变价(万元)" sortable="custom" align="center">
            <template slot-scope="{row,$index}">
              <input @focus="is_clear('bkbjw',row,1)" @blur="is_clear('bkbjw',row,2)" :class="[row.grey ? 'colorTransprent' : '',row.bkbjw_icon ? 'colorRed' : '','editCell']" style="width:100%" v-model="row.bkbjw" type="number" @change="onChange('bkbjw',row)">
            </template>
          </el-table-column>
          <el-table-column prop="qymc" label="企业名称" align="center" width="300">
            <template slot-scope="{row}">
              <input :class="[row.grey ? 'colorTransprent' : '','editCell']" style="width:100%" v-model="row.qymc" @change="onChange('qymc',row)">
            </template>
          </el-table-column>
          <el-table-column prop="packet" label="平均值" align="center" width="100">
            <template slot-scope="{row}">
              <span :class="[row.grey ? 'colorTransprent' : '','editCell']" style="width:100%;">{{row.avg}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="packet" label="双低值" align="center" width="100">
            <template slot-scope="{row}">
              <span :class="[row.grey ? 'colorTransprent' : '','editCell']" style="width:100%">{{row.low}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="flow" label="操作" align="center" width="150">
            <template slot-scope="scope">
              <span class="danger_btn" @click="delRow(scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 计算结果 -->
    <el-row style="margin-top:30px">
      <el-col :span="12">计算结果</el-col>
      <el-col :span="11" :offset="1">计算区间</el-col>
    </el-row>
    <el-row style="margin-bottom:10px;margin-top:10px">
      <el-col :span="3" :offset="1">投标报价(万元)</el-col>
      <el-col :span="2">点位</el-col>
      <el-col :span="3" :offset="1">评审价(万元)</el-col>
      <el-col :span="2">点位</el-col>
    </el-row>
    <el-row>
      <el-form ref="form" :model="jsjg" label-width="80px" @submit.native.prevent>
        <el-col :span="4">
          <el-form-item label="平均值">
            <el-input v-model="jsjg.pjz.tbbjw" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-input v-model="jsjg.pjz.tbxf" readonly></el-input>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input v-model="jsjg.pjz.psbjw" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-input v-model="jsjg.pjz.psxf" readonly></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-form-item label="点位">
            <el-input v-model="jsjg.min_xf" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="text-align:center;line-height:35px">—</el-col>
        <el-col :span="2">
          <el-input v-model="jsjg.max_xf" type="number"></el-input>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" size="small" @click="computeInterval">计算</el-button>
            <el-button size="small" @click="resetInterval">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-form ref="form" :model="jsjg" label-width="80px" @submit.native.prevent>
        <el-col :span="4">
          <el-form-item label="双低">
            <el-input v-model="jsjg.sd.tbbjw" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-input v-model="jsjg.sd.tbxf" readonly></el-input>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input v-model="jsjg.sd.psbjw" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-input v-model="jsjg.sd.psxf" readonly></el-input>
        </el-col>
      </el-form>
    </el-row>

    <el-row style="padding-top:30px;">
      <el-col :span="12">
        <el-table :data="comp_data2.tableData" style="width: 100%;height:550px;" border>
          <el-table-column type="index" width="60" label="序号" align="center">
            <template slot-scope="scope">{{scope.$index+(comp_data2.page-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="qymc" label="企业名称" align="center"></el-table-column>
          <el-table-column prop="psbjw" label="评审报价" width="180" align="center"></el-table-column>
          <el-table-column prop="bkbjw" label="不可变价" width="180" align="center"></el-table-column>
        </el-table>
        <el-pagination align="right" @current-change="changePage2" :current-page.sync="comp_data2.page" background layout="total,prev, pager, next" :total="comp_data2.total" class="pagination"></el-pagination>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-table :data="comp_data3.tableData" style="width: 100%;height:550px;" border>
          <el-table-column type="index" width="60" label="序号" align="center">
            <template slot-scope="scope">{{scope.$index+(comp_data3.page-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="qymc" label="企业名称" align="center"></el-table-column>
          <el-table-column prop="psbjw" label="评审报价" width="180" align="center"></el-table-column>
          <el-table-column prop="bkbjw" label="不可变价" width="180" align="center"></el-table-column>
        </el-table>
        <el-pagination align="right" @current-change="changePage3" :current-page.sync="comp_data3.page" background layout="total,prev, pager, next" :total="comp_data3.total" class="pagination"></el-pagination>
      </el-col>
    </el-row>

    <el-row style="margin-top:10px">
      <el-col :span="24" style="text-align:center">
        <el-button type="success" @click="onSubmit('save')">保存</el-button>
        <el-button type="primary" @click="onSubmit('saveAs')">另存为副本</el-button>
        <el-button @click="onSubmit('close')">关闭</el-button>
      </el-col>
    </el-row>
    <!-- 中标公示 -->
    <el-dialog title="中标公示" :visible.sync="model.dialogVisable" width="90%">
      <model-zbgs :data="{name:model.name,offerid:model.offerid}" v-on:fnZbgs="fn_zbgs"></model-zbgs>
      <el-row style="text-align:center">
        <el-form>
          <el-form-item>
            <el-button type="primary" @click="model.dialogVisable=false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-dialog>
    <div v-if="tbdw.dialogVisable">
      <el-dialog title="添加投标单位" :visible.sync="tbdw.dialogVisable" width="50%">
        <model-tbdw :data="tbdwData" v-on:fnTbdw="fn_tbdw"></model-tbdw>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import modelTbdw from './template/model_tbdw.vue'
import modelZbgs from './template/model_zbgs.vue'
import { formatNum } from '../store/formatter.js'
import tableMregeFn from '../tableMrege'

export default {
  data() {
    return {
      changeRow: false,
      model: {
        name: '',
        sort: '',
        order: '',
        offerid: this.$route.query.offerid,
        dialogVisable: false
      },
      tbdw: {
        dialogVisable: false,
        returnData: {},
        max_gsbh: '',
        num: '',
        groups: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ],
        group: '',
        min_group: '',
        max_group: ''
      },
      tbdwData: {},
      max_gsbh: 'G0',
      jbxx: {
        xmmc: '',
        zgxjw: '',
        psbjw: '',
        bkbjw: '',
        zb_id: '',
        zbxx_id: ''
      },
      jsjg: {
        pjz: {
          id: '',
          offer_id: this.$route.query.offerid,
          tbbjw: '',
          tbxf: '',
          psbjw: '',
          psxf: ''
        },
        sd: {
          id: '',
          tbbjw: '',
          offer_id: this.$route.query.offerid,
          tbxf: '',
          psbjw: '',
          psxf: ''
        },
        min_xf: '',
        max_xf: ''
      },
      comp_data: {
        tableData: [
          // {
          //     id: 1799,
          //     offer_id: 104,
          //     gsbh: "G1",
          //     gs_id: 28996,
          //     qymc: "中恒工程设计院有限公司",
          //     tbbjw: "6.00",
          //     psbjw: "4.00",
          //     tbxf: "0.98",
          //     valid: 1
          // }
        ],
        page: 1
      },
      comp_data2: {
        tableData: [],
        page: 1,
        total: 0
      },
      comp_data3: {
        tableData: [],
        page: 1,
        total: 0
      },
      merge_array: []
    }
  },
  created() {
    document.title = '投标模型1'
    this.getOffer(1)
    this.getOffer(2)
    this.getOffer(3)
  },
  components: {
    modelZbgs,
    modelTbdw
  },
  methods: {
    is_clear2(key, type) {
      if (this.jbxx[key] == 0) {
        this.jbxx[key] = type == 1 ? '' : formatNum(0)
      }
    },
    is_clear(key, row, type) {
      // console.log(key, row)
      let comp_data = this.comp_data.tableData

      if (row[key] == 0) {
        comp_data.forEach(element => {
          if (element.id == row.id) {
            element[key] = type == 1 ? '' : formatNum(0)
          }
        })
      }
      this.comp_data.tableData = comp_data
    },
    openZb() {
      window.open('http://www.520coc.cn/Hydsjs/builder_zhongbiao', '_blank')
    },
    spanMethods({ row, column, rowIndex, columnIndex }) {
      let prop = column.property
      if (prop == 'packet') {
        if (!row.packet) {
          return
        }
        //如果存在prop
        const _row = this.merge_array[rowIndex][prop]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.grey === 1) {
        return 'warning-row'
      }
      return ''
    },
    changePacket(type) {
      if (type == 'cancel') {
        //取消分组
        this.tbdw.min_group = ''
        this.tbdw.max_group = ''
        this.tbdw.group = ''
      }
      this.fn_saveAll(true)
      // this.getOffer(1);
    },
    changePage2(val) {
      this.comp_data2.page = val
      this.getOffer(2)
    },
    changePage3(val) {
      this.comp_data3.page = val
      this.getOffer(3)
    },
    resetInterval() {
      this.jsjg.min_xf = ''
      this.jsjg.max_xf = ''
      this.getOffer(1)
    },
    computeInterval() {
      this.fn_saveAll()
    },
    delRow(row) {
      let self = this
      let params = {
        comp_id: row.id
      }
      let comp_data = self.comp_data.tableData
      // console.log(comp_data, row.id)
      self
        .$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let pass = comp_data.filter(v => {
            return v.id != row.id
          })
          // console.log(pass)
          this.comp_data.tableData = pass
          self.axios.post(`/index/Offer_Model/delOffer`, params, data => {
            if (data.status == 'success') {
              // self.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // })
              self.jsjgfn()
              self.fn_saveAll()
              // self.getOffer(1)
            } else {
              // self.$message.error('删除失败,稍后重试')
            }
          })
        })
        .catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 计算评审价；评审价点位
    compute(type, row, changeType) {
      let self = this
      let comp_data = self.comp_data.tableData
      comp_data.forEach(element => {
        if (changeType == 'compute') {
          if (element.id == row.id) {
            switch (type) {
              case 'tbbjw': //修改投标报价
                element.psbjw_icon = true
                element.psxf_icon = true
                element.tbxf_icon = true
                element.bkbjw_icon = false
                self.compute('psbjw', row, 'tbdw') //评审价
                self.compute('psbjw_xf', row, 'tbdw') //评审价点位
                self.compute('tbbjw_xf', row, 'tbdw') //投标报价点位
                break
              case 'psbjw':
                element.psbjw_icon = false
                element.psxf_icon = true
                element.bkbjw_icon = true
                element.tbxf_icon = false
                element.tbbjw_icon = false
                self.compute('bkbjw', row, 'tbdw') //不可变价
                self.compute('psbjw_xf', row, 'tbdw') //评审价点位
                break
              case 'bkbjw':
                element.psbjw_icon = true
                element.psxf_icon = true
                element.bkbjw_icon = false
                element.tbxf_icon = false
                self.compute('psbjw', row, 'tbdw') //评审价，评审价点位
                self.compute('psbjw_xf', row, 'tbdw') //评审价，评审价点位
                break
              case 'tbxf':
                element.psbjw_icon = true
                element.psxf_icon = true
                element.bkbjw_icon = false
                element.tbxf_icon = true
                element.tbbjw_icon = true
                self.compute('psbjw', row, 'tbdw') //评审价
                self.compute('psbjw_xf', row, 'tbdw') //，评审价点位
                self.compute('tbxf', row, 'tbdw') //投标报价
                break
              case 'psxf':
                element.psbjw_icon = true
                element.psxf_icon = true
                element.bkbjw_icon = true
                element.tbxf_icon = false
                self.compute('psxf', row, 'tbdw') //评审价
                self.compute('bkbjw', row, 'tbdw') //不可变价
                break
              default:
                break
            }
          }
        } else if (changeType == 'tbdw') {
          if (element.id == row.id) {
            switch (type) {
              case 'psbjw': //计算评审价  =投标报价-不可变价
                element.psbjw = formatNum(
                  element.tbbjw - 0 - (element.bkbjw - 0),
                  2
                )
                break
              case 'psbjw_xf': //计算评审价的点位  =评审价/评审价
                element.psxf = formatNum(
                  element.psbjw / (self.jbxx.psbjw - 0) * 100,
                  2
                )
                break
              case 'bkbjw': //计算不可变价 =投标报价-评审价
                element.bkbjw = formatNum(
                  element.tbbjw - 0 - (element.psbjw - 0),
                  2
                )
                break
              case 'tbbjw_xf': //计算投标报价的点位 投标报价/最高限价*100
                element.tbxf = formatNum(
                  element.tbbjw / (self.jbxx.zgxjw - 0) * 100,
                  2
                )
                break
              case 'tbxf': //计算投标报价=点位*投标报价
                element.tbbjw = formatNum(
                  (self.jbxx.zgxjw - 0) * element.tbxf / 100,
                  2
                )
                break
              case 'psxf': //计算评审价=点位*评审价
                element.psbjw = formatNum(
                  (self.jbxx.psbjw - 0) * element.psxf / 100,
                  2
                )
                break
            }
          }
        } else if (changeType == 'jbxx') {
          element.tbxf = formatNum(
            element.tbbjw / (self.jbxx.zgxjw - 0) * 100,
            2
          )
          element.psxf = formatNum(
            element.psbjw / (self.jbxx.psbjw - 0) * 100,
            2
          )
        }
      })
      self.comp_data.tableData = comp_data
      //   修改计算结果
      self.jsjgfn()
    },
    onChange(type, row) {
      //改变了某一行 ;修改计算结果
      let self = this
      self.changeRow = true
      if (type == 'tbbjw') {
        //修改投标报价
        self.compute('tbbjw', row, 'compute')
        // self.compute("psbjw", row, "tbdw"); //评审价，评审价点位
        // self.compute("psbjw_xf", row, "tbdw"); //评审价，评审价点位
        // self.compute("tbbjw_xf", row, "tbdw"); //投标报价点位
      } else if (type == 'psbjw') {
        //修改评审价
        self.compute('psbjw', row, 'compute')
        // self.compute("bkbjw", row, "tbdw"); //不可变价
        // self.compute("psbjw_xf", row, "tbdw"); //评审价点位
      } else if (type == 'bkbjw') {
        //修改不可变价
        self.compute('bkbjw', row, 'compute')
      } else if (type == 'tbxf') {
        //修改投标点位
        self.compute('tbxf', row, 'compute')
        // self.compute("psbjw", row, "tbdw"); //评审价
        // self.compute("psbjw_xf", row, "tbdw"); //，评审价点位
        // self.compute("tbxf", row, "tbdw"); //投标报价
      } else if (type == 'psxf') {
        //修改评审价点位 ,改不可变价
        self.compute('psxf', row, 'compute')
        // self.compute("psxf", row, "tbdw"); //评审价
        // self.compute("bkbjw", row, "tbdw"); //不可变价
      }
    },
    addQy() {
      if (this.tbdw.num > 0) {
        if (this.tbdw.num > 1000) {
          this.$message.error('添加的公司过多，请修改')
          return
        }
        this.fn_tbdw(this.tbdw.num)
      } else {
        this.tbdw.dialogVisable = true
        if (this.max_gsbh) {
          let num = this.max_gsbh.slice(1)
          this.tbdw.max_gsbh = 'G' + (num - 0 + 1)
        } else {
          this.tbdw.max_gsbh = 'G1'
        }
        this.tbdwData = {
          zgxjw: this.jbxx.zgxjw,
          psbjw: this.jbxx.psbjw,
          max_gsbh: this.tbdw.max_gsbh,
          offerid: this.model.offerid
        }
      }
    },
    jsjgfn(type, multiple) {
      //计算结果的值
      let self = this
      let zbdwRows = self.comp_data.tableData
      let jsjg_tbj = 0
      let jsjg_tbxf = 0
      let jsjg_psbj = 0
      let jsjg_psxf = 0
      let jsjg_bkbj = 0
      let tbbjw_num = 0
      let tbxf_num = 0
      let psbjw_num = 0
      let psxf_num = 0
      zbdwRows.forEach(element => {
        let tbbjw = element.tbbjw
        let tbxf = element.tbxf
        let psbjw = element.psbjw
        let psxf = element.psxf
        let bkbjw = element.bkbjw
        if (tbbjw > 0) {
          tbbjw_num += 1
        }
        if (tbxf > 0) {
          tbxf_num += 1
        }
        if (psbjw > 0) {
          psbjw_num += 1
        }
        if (psxf > 0) {
          psxf_num += 1
        }
        jsjg_tbj += tbbjw - 0
        jsjg_tbxf += tbxf - 0
        jsjg_psbj += psbjw - 0
        jsjg_psxf += psxf - 0
        jsjg_bkbj += bkbjw - 0
      })
      if (type) {
        // 添加弹框公司才用returnData
        let tbbjw = 0
        let tbxf = 0
        let psbjw = 0
        let psxf = 0
        let bkbjw = 0
        if (!multiple) {
          //不是多家公司
          tbbjw = self.tbdw.returnData.tbbjw
          tbxf = self.tbdw.returnData.tbxf
          psbjw = self.tbdw.returnData.psbjw
          psxf = self.tbdw.returnData.psxf
          bkbjw = self.tbdw.returnData.bkbjw
        }
        if (tbbjw > 0) {
          tbbjw_num += 1
        }
        if (tbxf > 0) {
          tbxf_num += 1
        }
        if (psbjw > 0) {
          psbjw_num += 1
        }
        if (psxf > 0) {
          psxf_num += 1
        }
        jsjg_tbj += tbbjw - 0
        jsjg_tbxf += tbxf - 0
        jsjg_psbj += psbjw - 0
        jsjg_psxf += psxf - 0
        jsjg_bkbj += bkbjw - 0
      }
      this.jsjg.pjz = {
        id: this.jsjg.pjz.id,
        offer_id: this.jsjg.pjz.offer_id,
        res_cate: '平均值',
        tbbjw: jsjg_tbj && formatNum(jsjg_tbj / tbbjw_num, 2),
        tbxf: jsjg_tbxf && formatNum(jsjg_tbxf / tbxf_num, 2),
        psbjw: jsjg_psbj && formatNum(jsjg_psbj / psbjw_num, 2),
        psxf: jsjg_psxf && formatNum(jsjg_psxf / psxf_num, 2)
      }
      this.jsjg.sd = {
        id: this.jsjg.sd.id,
        offer_id: this.jsjg.sd.offer_id,
        res_cate: '双低',
        tbbjw: jsjg_tbj && formatNum(jsjg_tbj / tbbjw_num * 0.95, 2),
        tbxf: jsjg_tbxf && formatNum(jsjg_tbxf / tbxf_num * 0.95, 2),
        psbjw: jsjg_psbj && formatNum(jsjg_psbj / psbjw_num * 0.95, 2),
        psxf: jsjg_psxf && formatNum(jsjg_psxf / psxf_num * 0.95, 2)
      }
    },
    fn_saveAll(input) {
      //本页面操作后的保存
      let self = this
      let name = self.model.name
      let xmmc = self.jbxx.xmmc
      let zgxjw = self.jbxx.zgxjw
      let psbjw = self.jbxx.psbjw
      let bkbjw = self.jbxx.bkbjw
      let tbdw_inputs = self.comp_data.tableData
      let tbdw = []
      tbdw_inputs.forEach(element => {
        let obj = {
          id: element.id,
          gs_id: element.gs_id,
          offer_id: self.model.offerid,
          qymc: element.qymc,
          tbbjw: isNaN(element.tbbjw) ? 0 : element.tbbjw,
          psbjw: isNaN(element.psbjw) ? 0 : element.psbjw,
          bkbjw: isNaN(element.bkbjw) ? 0 : element.bkbjw,
          tbxf: isNaN(element.tbxf) ? 0 : element.tbxf,
          psxf: isNaN(element.psxf) ? 0 : element.psxf
        }
        if (typeof input == 'number') {
          //2 保存为副本
          obj.offer_id = ''
          obj.id = ''
          obj.gsbh = element.gsbh
        }
        tbdw.push(obj)
      })

      let jsjg = [self.jsjg.pjz, self.jsjg.sd]
      if (typeof input == 'number') {
        jsjg[0].offer_id = ''
        jsjg[0].id = ''
        jsjg[1].offer_id = ''
        jsjg[1].id = ''
      }

      let params = {
        jbxx: {
          id: self.model.offerid,
          name,
          xmmc,
          zgxjw,
          psbjw,
          bkbjw,
          zb_id: self.jbxx.zb_id,
          user_id: self.$store.state.userInfo.user_id
        },
        tbdw,
        jsjg
      }
      if (typeof input == 'number') {
        params.jbxx.id = ''
        params.jbxx.name = name + '副本'
      }

      self.axios.post(`/index/Offer_Model/saveOffer`, params, data => {
        if (data.status == 'success') {
          if (input) {
            if (typeof input == 'number') {
              //副本保存
              this.$confirm('副本保存成功,是否跳转到副本编辑?', '提示', {
                confirmButtonText: '编辑副本',
                cancelButtonText: '取消',
                type: 'warning'
              })
                .then(() => {
                  let { href } = self.$router.resolve({
                    path: `/modelBid1?offerid=${data.message}`
                  })
                  window.open(href, `_blank`)
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消副本编辑'
                  })
                })
            } else {
              //正常保存
              self.getOffer(1)
            }
          } else {
            if (input == 'save') {
              self.$message({
                type: 'success',
                message: '保存成功'
              })
            }
            self.getOffer(1)
          }
        } else {
          self.$message.error('保存失败，稍后重试')
        }
      })
    },
    fn_tbdw(val) {
      this.fn_saveAll()

      //添加公司后的保存
      let self = this
      self.tbdw.returnData = val
      let tbdw = [] //投标单位的值
      let obj = {}
      if (val > 0) {
        //多家单位
        let gsbh_index = self.max_gsbh.slice(1) - 0
        for (let index = 0; index < val; index++) {
          obj = {
            id: '',
            gsbh: 'G' + (gsbh_index + index + 1),
            gs_id: '',
            offer_id: self.model.offerid,
            qymc: '',
            tbbjw: 0,
            psbjw: 0,
            bkbjw: 0,
            tbxf: 0,
            psxf: 0
          }
          tbdw.push(obj)
        }
        this.tbdw.num = ''
      } else {
        obj = {
          id: '',
          gsbh: self.tbdw.max_gsbh,
          gs_id: val.gs_id,
          offer_id: self.model.offerid,
          qymc: val.gsmc,
          tbbjw: val.tbbjw - 0 || 0,
          psbjw: val.psbjw - 0 || 0,
          bkbjw: val.bkbjw - 0 || 0,
          tbxf: val.tbxf || 0,
          psxf: val.psxf || 0
        }
        tbdw.push(obj)
      }
      let jsjgfn_val = val > 0 ? true : false
      self.jsjgfn(true, jsjgfn_val)
      let jsjg = [self.jsjg.pjz, self.jsjg.sd]
      let params = {
        tbdw,
        jsjg,
        jbxx: {
          id: self.model.offerid,
          name: self.model.name,
          xmmc: self.jbxx.xmmc,
          zgxjw: self.jbxx.zgxjw,
          psbjw: self.jbxx.psbjw,
          bkbjw: self.jbxx.bkbjw,
          zb_id: self.jbxx.zb_id,
          user_id: self.$store.state.userInfo.user_id
        }
      }
      self.axios.post(`/index/Offer_Model/saveOffer`, params, data => {
        if (data.status == 'success') {
          self.tbdw.dialogVisable = false
          self.getOffer(1)
        } else {
          self.$message.error('保存失败，稍后重试')
        }
      })
    },
    fn_zbgs() {
      this.model.dialogVisable = false
      this.jsjgfn()
      this.getOffer(1)
    },
    change_zgxjw() {
      //修改最高限价，不可变价不变,算评审价
      this.jbxx.psbjw = formatNum(
        this.jbxx.zgxjw - 0 - (this.jbxx.bkbjw - 0),
        2
      )
      this.compute('', '', 'jbxx')
    },
    change_psj() {
      //修改评审价，算不可变价
      this.jbxx.bkbjw = formatNum(
        this.jbxx.zgxjw - 0 - (this.jbxx.psbjw - 0),
        2
      )
      this.compute('', '', 'jbxx')
    },
    change_bkbj() {
      //修改不可变价，算评审价
      this.jbxx.psbjw = formatNum(
        this.jbxx.zgxjw - 0 - (this.jbxx.bkbjw - 0),
        2
      )
      this.compute('', '', 'jbxx')
    },

    importXm() {
      this.model.dialogVisable = true
    },
    showXm() {
      console.log(this.jbxx)
      if (this.jbxx.zbxx_id) {
        let { href } = this.$router.resolve({
                path: `/enterpriseDetails?zbxx_id=${this.jbxx.zbxx_id ||
                    ""}&zbgs_id=${this.jbxx.id || ""}&xmmc=${this.jbxx.xmmc}&type=zbgs&source=${row.source}`
            });
            window.open(href, "中标公示" + this.jbxx.id + this.jbxx.zbxx_id + this.jbxx.xmmc);
      }
    },
    onSubmit(key) {
      switch (key) {
        case 'save':
          this.fn_saveAll('save')
          break
        case 'saveAs':
          this.fn_saveAll(2)
          break
        case 'close':
          window.close()
          break
      }
    },
    fn_sortable(param) {
      let self = this
      let order = ''
      if (param.order == 'ascending') {
        order = 'asc'
      } else if (param.order == 'descending') {
        order = 'desc'
      }
      if (this.changeRow) {
        //改变了某一行的数据需要保存
        // this.$confirm("更改数据后排序需要保存，是否继续", "提示", {
        //     confirmButtonText: "保存并排序",
        //     cancelButtonText: "取消",
        //     type: "warning"
        // })
        //     .then(() => {
        this.model.sort = param.prop
        this.model.order = order
        this.fn_saveAll(true)
        // })
        // .catch(() => {
        //     this.$message({
        //         type: "info",
        //         message: "已取消排序"
        //     });
        // });
      } else {
        this.model.sort = param.prop
        this.model.order = order
        this.getOffer(1)
      }
    },
    getOffer(cate) {
      // console.log(
      //     "保存不传gsbh?另存为要传？？？？投标单位为0的数据不计算？？？分组的区间"
      // );
      let self = this
      let params = {
        offer_id: self.model.offerid,
        cate,
        sort: self.model.sort,
        order: self.model.order,
        packet: self.tbdw.group == '取消分组' ? '' : self.tbdw.group,
        min_packet: self.tbdw.min_group,
        max_packet: self.tbdw.max_group,
        min_xf: self.jsjg.min_xf,
        max_xf: self.jsjg.max_xf
      }
      if (!params.packet && (params.min_packet && params.max_packet)) {
        self.$message.error('分组步长为空，请选择')
        return
      }
      if (cate == 2) {
        params.page = self.comp_data2.page
        params.rows = 10
      } else if (cate == 3) {
        params.page = self.comp_data3.page
        params.rows = 10
      }
      self.axios.post(`/index/Offer_Model/getOffer`, params, data => {
        if (data.status == 'success') {
          if (cate == 1) {
            self.changeRow = false
            //投标单位
            self.model.name = data.rows.name
            self.jbxx.xmmc = data.rows.xmmc
            self.jbxx.zgxjw = data.rows.zgxjw
            self.jbxx.psbjw = data.rows.psbjw
            self.jbxx.bkbjw = data.rows.bkbjw
            self.jbxx.zb_id = data.rows.zb_id
            self.jbxx.zbxx_id = data.rows.zbxx_id
            self.max_gsbh = data.rows.max_gsbh ? data.rows.max_gsbh : 'G0'
            self.comp_data.tableData = data.rows.comp_data || [] //投标单位
            self.jsjg.pjz = data.rows.avg_data ? data.rows.avg_data : {}
            self.jsjg.pjz.offer_id = self.model.offerid
            self.jsjg.pjz.res_cate = '平均值'
            self.jsjg.sd = data.rows.two_low_data ? data.rows.two_low_data : {}
            self.jsjg.sd.offer_id = self.model.offerid
            self.jsjg.sd.res_cate = '双低'
            self.merge_array = tableMregeFn.tableMrege(data.rows.comp_data)
            // if (data.rows.comp_data) {
            //     self.formatter_table(data.rows.comp_data);
            // } else {
            //     self.comp_data.tableData = [];
            // }
          } else if (cate == 2) {
            self.comp_data2.tableData = data.rows
            self.comp_data2.total = data.total
          } else if (cate == 3) {
            self.comp_data3.tableData = data.rows
            self.comp_data3.total = data.total
          }
        }
      })
    },
    formatter_table(table) {
      let data = table
      let row = ''
      let zu_number = 0
      let zu_txt = ''
      let array_background = [1, 2]
      data.forEach((obj, i) => {
        let background = ''
        if (obj.packet) {
          if (i == 0) {
            zu_txt = obj.packet
          } else {
            if (obj.packet != zu_txt) {
              zu_number += 1
              zu_txt = obj.packet
            }
          }

          obj.color = array_background[zu_number % 2]
        } else {
          obj.color = ''
        }
      })
      // console.log(data);
      this.comp_data.tableData = data
      this.merge_array = tableMregeFn.tableMrege(data)
    }
  }
}
</script>
<style scoped>
.el-table .warning-row {
  background: rgb(218, 217, 217);
}
</style>

<style lang="less" scoped>
.pagination {
  margin: 20px 0;
}
.danger_btn {
  color: red;
  cursor: pointer;
}
.colorRed {
  color: red;
}
.colorTransprent {
  background: transparent;
}
.borderNone {
  border: none;
}
#modelBid1 {
  min-width: 1550px;
  padding: 30px 60px;
  .title {
    // background-color: gainsboro;
    border-bottom: 1px solid gainsboro;
    line-height: 40px;
    h1 {
      font-weight: lighter;
    }
  }
  .tbdw {
    .editCell {
      border: none;
      // border: 1px solid  gainsboro;
      padding: 3px;
      text-align: center;
    }
  }
}
</style>
