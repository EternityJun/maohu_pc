<template>
  <div style="color:#333333">
    <header>
      <div>
        <span class="gsmc">{{config_data.gsmc}}</span>
        <!-- <span class="info">更新时间：{{config_data.gxsj}}</span> -->
      </div>
    </header>
    <div class="center1200">
      <div style="margin-top:20px">
        <tableInfo :tableData="tableData"></tableInfo>
      </div>
      <head-nav :data="headData" @switchNav="switchNav"></head-nav>
      <div class="content_div">
        <!-- 企业证书 -->
        <transition name="transitionFadediv">
          <div v-show="tabName == '企业证书'">
            <div class="zs_div" v-for="(one,i) in qyzs.content" :key="i">
              <div class="header">
                <div>{{one.zzlb}}</div>
                <div>{{one.cxf}}</div>
              </div>
              <div class="content">
                <div v-for="(one2,i2) in one.zzx" :key="i2">
                  <div v-for="(one3,i3) in one2" :key="i3">
                    <div class="name">{{one3.name}}:</div>
                    <div class="value" v-html="one3.value.replace(/[|]/g,'<br>')"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <!-- 企业人员 -->
        <transition name="transitionFadediv">
          <div v-show="tabName == '企业人员'">
            <div class="row">
              <div class="title">
                <div :class="qyry.zjlx == '全部'?'selected':''" @click="qyryFn().onRylb('全部')">
                  全部
                  <span class="span_color">({{qyry.rylb.total}}本)</span>：
                </div>
              </div>
              <div class="value">
                <div v-for="one in qyry.rylb.lists" @click="qyryFn().onRylb(one.rylb)" :key="one.rylb" :class="['hover_div',qyry.zjlx == one.rylb?'selected':'']">
                  {{one.rylb}}
                  <span class="span_color">({{(one.counts)}}本)</span>
                </div>
              </div>
            </div>
            <el-form align="right" :inline="true" style="margin-top:10px;" @submit.native.prevent>
              <el-form-item label="人员名称">
                <el-input @keyup.enter.native="qyryFn().onSearch()" v-model="qyry.rymc" clearable placeholder="人员名称"></el-input>
              </el-form-item>
              <el-form-item label="证书编号">
                <el-input @keyup.enter.native="qyryFn().onSearch()" v-model="qyry.zsbh" clearable placeholder="证书编号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="qyryFn().onSearch()">搜索</el-button>
                <el-button @click="qyryFn().onReset()">重置</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="qyry.tableData" border v-loading="qyry.loading" :span-method="arraySpanMethod">
              <el-table-column width="60" type="index" align="center" label="序号">
                <template slot-scope="scope">
                  <div>{{(scope.$index+1)+(qyry.page-1)*10}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="name" label="姓名">
                <template slot-scope="scope">
                  <el-button type="text" @click="openRy(scope.row.name,scope.row.fzjg,scope.row)">{{scope.row.name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column width="160" align="center" prop="zslb" label="证书类别"></el-table-column>
              <el-table-column width="160" align="center" prop="zsbh" label="证书编号"></el-table-column>
              <el-table-column width="130" align="center" prop="fzrq" label="发证日期"></el-table-column>
              <el-table-column width="130" align="center" prop="zsyxq" label="证书有效期">
                <template slot-scope="scope">
                  <span :style="{color:scope.row.expire === 0?'red':''}">{{scope.row.zsyxq}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="fzjg" width="400" label="发证机关"></el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px" @current-change="qyryPageSizeChange" align="right" background layout="total,prev, pager, next" :total="qyry.total"></el-pagination>
          </div>
        </transition>
        <!-- 在建项目 -->
        <transition name="transitionFadediv">
          <div v-show="tabName == '在建项目'">
            <el-form :inline="true" style="margin-top:10px;" @submit.native.prevent>
              <el-form-item label="项目名称">
                <el-input @keyup.enter.native="zjxmFn().onSearch()" style="width:285px" v-model="zjxm.xmmc" placeholder="项目名称"></el-input>
              </el-form-item>
              <el-form-item label="资金范围">
                <el-input style="width:180px" v-model="zjxm.je_min" placeholder="金额">
                  <template slot="append">万元</template>
                </el-input>
                <span>-</span>
                <el-input style="width:180px" v-model="zjxm.je_max" placeholder="金额">
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="开工日期">
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="zjxm.kgrq_min" type="date" placeholder="年/月/日"></el-date-picker>
                <span>-</span>
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="zjxm.kgrq_max" type="date" placeholder="年/月/日"></el-date-picker>
              </el-form-item>
            </el-form>
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item label="竣工日期">
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="zjxm.jgrq_min" type="date" placeholder="年/月/日"></el-date-picker>
                <span>-</span>
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="zjxm.jgrq_max" type="date" placeholder="年/月/日"></el-date-picker>
              </el-form-item>
              <el-form-item label="从业人员">
                <el-input style="width:138px" v-model="zjxm.cyry" placeholder="从业人员"></el-input>
              </el-form-item>
              <el-form-item label="项目类型">
                <el-select style="width:154px" v-model="zjxm.xmlx" placeholder="选择项目类型">
                  <el-option v-for="item in xmlxOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="中标日期">
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="zjxm.zbrq_min" type="date" placeholder="年/月/日"></el-date-picker>
                <span>-</span>
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="zjxm.zbrq_max" type="date" placeholder="年/月/日"></el-date-picker>
              </el-form-item>
            </el-form>
            <div style="text-align:center;padding:0 20px 10px 0">
              <el-button type="primary" @click="zjxmFn().onSearch()">搜索</el-button>
              <el-button @click="zjxmFn().onReset()">重置</el-button>
            </div>
            <el-table :data="zjxm.tableData" border v-loading="zjxm.loading">
              <el-table-column width="60" type="index" align="center" label="序号">
                <template slot-scope="scope">
                  <div>{{(scope.$index+1)+(zjxm.page-1)*10}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="xmbh" label="项目编码"></el-table-column>
              <el-table-column align="center" prop="xmmc" label="项目名称" width="400">
                <template slot-scope="scope">
                  <div class="link_color" @click="openYj(scope.row.proj_id, scope.row.xmmc)">{{scope.row.xmmc}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="jsdw" label="建设单位"></el-table-column>
              <el-table-column align="center" prop="jsdz" label="项目地址"></el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px;" @current-change="zjxmPageSizeChange" background align="right" layout="total,prev,pager,next" :total="zjxm.total"></el-pagination>
          </div>
        </transition>
        <!-- 业绩信息 -->
        <transition name="transitionFadediv">
          <div v-show="tabName == '业绩信息'">
            <el-form :inline="true" style="margin-top:10px;" @submit.native.prevent>
              <el-form-item label="项目名称">
                <el-input style="width:285px" @keyup.enter.native="yjxxFn().onSearch()" v-model="yjxx.xmmc" placeholder="项目名称"></el-input>
              </el-form-item>
              <el-form-item label="资金范围">
                <el-input style="width:180px" v-model="yjxx.je_min" placeholder="金额">
                  <template slot="append">万元</template>
                </el-input>
                <span>-</span>
                <el-input style="width:180px" v-model="yjxx.je_max" placeholder="金额">
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="开工日期">
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="yjxx.kgrq_min" type="date" placeholder="年/月/日"></el-date-picker>
                <span>-</span>
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="yjxx.kgrq_max" type="date" placeholder="年/月/日"></el-date-picker>
              </el-form-item>
            </el-form>
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item label="竣工日期">
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="yjxx.jgrq_min" type="date" placeholder="年/月/日"></el-date-picker>
                <span>-</span>
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="yjxx.jgrq_max" type="date" placeholder="年/月/日"></el-date-picker>
              </el-form-item>
              <el-form-item label="从业人员">
                <el-input style="width:138px" v-model="yjxx.cyry" placeholder="从业人员"></el-input>
              </el-form-item>
              <el-form-item label="项目类型">
                <el-select style="width:154px" v-model="yjxx.xmlx" placeholder="选择项目类型">
                  <el-option v-for="item in xmlxOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="中标日期">
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="yjxx.zbrq_min" type="date" placeholder="年/月/日"></el-date-picker>
                <span>-</span>
                <el-date-picker style="width:136px" value-format="yyyy-MM-dd" v-model="yjxx.zbrq_max" type="date" placeholder="年/月/日"></el-date-picker>
              </el-form-item>
            </el-form>
            <div style="text-align:center;padding:0 20px 10px 0">
              <el-button type="primary" @click="yjxxFn().onSearch()">搜索</el-button>
              <el-button @click="yjxxFn().onReset()">重置</el-button>
            </div>
            <el-table :data="yjxx.tableData" border v-loading="yjxx.loading">
              <el-table-column width="60" type="index" align="center" label="序号">
                <template slot-scope="scope">
                  <div>{{(scope.$index+1)+(yjxx.page-1)*10}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="xmbh" label="项目编码"></el-table-column>
              <el-table-column align="center" prop="xmmc" label="项目名称" width="400">
                <template slot-scope="scope">
                  <div class="link_color" @click="openYj(scope.row.proj_id, scope.row.xmmc)">{{scope.row.xmmc}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="jsdw" label="建设单位"></el-table-column>
              <el-table-column align="center" prop="jsdz" label="项目地址"></el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px" @current-change="yjxxPageSizeChange" background align="right" layout="total,prev,pager,next" :total="yjxx.total"></el-pagination>
          </div>
        </transition>
        <!-- 不良行为 -->
        <transition name="transitionFadediv">
          <div v-show="tabName == '不良行为'" class="blxw_div">
            <el-collapse v-model="collapse_i">
              <el-collapse-item name="1">
                <template slot="title">
                  <div style="margin-left:10px">不良行为</div>
                </template>
                <el-table :data="blxw.tableData" border v-loading="blxw.loading">
                  <el-table-column align="center" width="50px" type="index" label="序号"></el-table-column>
                  <el-table-column align="center" width="100px" prop="xwdm" label="行为代码"></el-table-column>
                  <el-table-column align="center" prop="xwms" label="行为描述"></el-table-column>
                  <el-table-column align="center" width="80px" prop="kcfs" label="扣除分数"></el-table-column>
                  <el-table-column align="center" prop="xwss" label="行为事实"></el-table-column>
                  <el-table-column align="center" prop="cfjg" label="处罚机构"></el-table-column>
                  <el-table-column align="center" width="100px" prop="fbyxq" label="发布有效期"></el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template slot="title">
                  <div style="margin-left:10px">违法信息</div>
                </template>
                <el-table border v-loading="blxw.loading">
                  <el-table-column align="center" width="50px" type="index" label="序号"></el-table-column>
                  <el-table-column align="center" width="100px" prop="xwdm" label="判决文书编号"></el-table-column>
                  <el-table-column align="center" prop="xwms" label="扣除分数"></el-table-column>
                  <el-table-column align="center" width="80px" prop="kcfs" label="行为事实"></el-table-column>
                  <el-table-column align="center" prop="xwss" label="判决机关"></el-table-column>
                  <el-table-column align="center" width="100px" prop="fbyxq" label="发布有效期"></el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item name="3">
                <template slot="title">
                  <div style="margin-left:10px">行政处罚</div>
                </template>
                <el-table border v-loading="blxw.loading">
                  <el-table-column align="center" width="50px" type="index" label="序号"></el-table-column>
                  <el-table-column align="center" width="100px" prop="xwdm" label="处罚文书编号"></el-table-column>
                  <el-table-column align="center" prop="xwms" label="行为事实"></el-table-column>
                  <el-table-column align="center" width="80px" prop="kcfs" label="处罚事由"></el-table-column>
                  <el-table-column align="center" prop="xwss" label="处罚依据"></el-table-column>
                  <el-table-column align="center" prop="cfjg" label="处罚内容"></el-table-column>
                  <el-table-column align="center" prop="cfjg2" label="扣除分数"></el-table-column>
                  <el-table-column align="center" prop="cfjg3" label="判决机关"></el-table-column>
                  <el-table-column align="center" width="100px" prop="fbyxq" label="发布有效期"></el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item name="4">
                <template slot="title">
                  <div style="margin-left:10px">行政强制</div>
                </template>
                <el-table border v-loading="blxw.loading">
                  <el-table-column align="center" width="50px" type="index" label="序号"></el-table-column>
                  <el-table-column align="center" width="100px" prop="xwdm" label="强制文书编号"></el-table-column>
                  <el-table-column align="center" prop="xwms" label="行为事实"></el-table-column>
                  <el-table-column align="center" width="80px" prop="kcfs" label="强制措施"></el-table-column>
                  <el-table-column align="center" prop="xwss" label="法律依据"></el-table-column>
                  <el-table-column align="center" prop="cfjg" label="扣除分数"></el-table-column>
                  <el-table-column align="center" prop="cfjg2" label="强制机关"></el-table-column>
                  <el-table-column align="center" width="100px" prop="fbyxq" label="发布有效期"></el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item name="5">
                <template slot="title">
                  <div style="margin-left:10px">行政裁决(定)</div>
                </template>
                <el-table border v-loading="blxw.loading">
                  <el-table-column align="center" width="50px" type="index" label="序号"></el-table-column>
                  <el-table-column align="center" width="100px" prop="xwdm" label="裁决(定)书编号"></el-table-column>
                  <el-table-column align="center" prop="xwms" label="行为事实"></el-table-column>
                  <el-table-column align="center" width="80px" prop="kcfs" label="裁决(定)事由"></el-table-column>
                  <el-table-column align="center" prop="xwss" label="裁决(定)结果"></el-table-column>
                  <el-table-column align="center" prop="cfjg" label="扣除分数"></el-table-column>
                  <el-table-column align="center" prop="dd" label="裁决(定)机关"></el-table-column>
                  <el-table-column align="center" width="100px" prop="fbyxq" label="发布有效期"></el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item name="6">
                <template slot="title">
                  <div style="margin-left:10px">欠薪及欠缴社保金</div>
                </template>
                <el-table border v-loading="blxw.loading">
                  <el-table-column align="center" width="50px" type="index" label="序号"></el-table-column>
                  <el-table-column align="center" width="100px" prop="xwdm" label="欠薪总额"></el-table-column>
                  <el-table-column align="center" prop="xwms" label="欠缴社保金额"></el-table-column>
                  <el-table-column align="center" width="80px" prop="kcfs" label="行为事实"></el-table-column>
                  <el-table-column align="center" prop="xwss" label="扣除分数"></el-table-column>
                  <el-table-column align="center" prop="cfjg" label="记录机关"></el-table-column>
                  <el-table-column align="center" width="100px" prop="fbyxq" label="发布有效期"></el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item name="7">
                <template slot="title">
                  <div style="margin-left:10px">质量安全</div>
                </template>
                <el-table border v-loading="blxw.loading">
                  <el-table-column align="center" width="50px" type="index" label="序号"></el-table-column>
                  <el-table-column align="center" width="100px" prop="xwdm" label="工程名称"></el-table-column>
                  <el-table-column align="center" prop="xwms" label="行为事实"></el-table-column>
                  <el-table-column align="center" width="80px" prop="kcfs" label="扣除分数"></el-table-column>
                  <el-table-column align="center" prop="xwss" label="发布机关"></el-table-column>
                  <el-table-column align="center" width="100px" prop="fbyxq" label="发布有效期"></el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </div>
        </transition>
        <!-- 良好行为 -->
        <transition name="transitionFadediv">
          <div v-show="tabName == '良好行为'" align="right">
            <el-form inline @submit.native.prevent>
              <el-form-item label="项目名称">
                <el-input @keyup.enter.native="creditFn().onSearch()" v-model="lhxw.xmmc" clearable placeholder="项目名称/工法名称"></el-input>
              </el-form-item>
              <el-form-item label="颁发机构">
                <el-input @keyup.enter.native="creditFn().onSearch()" v-model="lhxw.bfjg" clearable placeholder="颁发机构"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="creditFn().onSearch()">搜索</el-button>
                <el-button @click="creditFn().onReset()">重置</el-button>
              </el-form-item>
            </el-form>
            <el-table border :data="lhxw.tableData" v-loading="lhxw.loading">
              <el-table-column align="center" width="50px" type="index" label="序号">
                <template slot-scope="scope">
                  <div>{{(scope.$index+1)+(lhxw.page-1)*10}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="hjmc" label="获奖名称"></el-table-column>
              <el-table-column align="center" width="100px" prop="hjdj" label="获奖等级"></el-table-column>
              <el-table-column align="center" prop="bfjg" label="颁发机构"></el-table-column>
              <el-table-column align="center" width="110px" prop="lbmc" label="类别名称"></el-table-column>
              <el-table-column align="center" prop="xmgfmc" label="项目名称/工法名称"></el-table-column>
              <el-table-column align="center" width="100px" prop="hjrq" label="获奖日期"></el-table-column>
              <el-table-column align="center" prop="xxnr" label="详细内容"></el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px;" @current-change="lhxwPageSizeChange" background align="right" layout="total,prev,pager,next" :total="lhxw.total"></el-pagination>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import gs_jstGl from '../assets/gs_jst&gl.png'
import tableInfo from './template/tableInfo'
import headNav from './template/head_nav'
import tableMregeFn from './../tableMrege'
export default {
  components: {
    tableInfo,
    headNav
  },
  data() {
    return {
      merge_array: [], //合并
      tabName: '企业证书',
      config_data: {
        gs_id: this.$route.query.gs_id,
        gsmc: '',
        gxsj: '00-00-00',
        comp_id: ''
      },
      collapse_i: ['1'], //展开项
      //基本信息数据
      tableData: {},
      source2: {},
      headData: {
        nav: [],
        source: {
          link: 'www.baidu.com',
          name: '四川省建设厅',
          img: gs_jstGl
        }
      },
      xmlxOption: [
        {
          value: '房建',
          lebel: '房建'
        },
        {
          value: '市政',
          lebel: '市政'
        },
        {
          value: '其他',
          lebel: '其他'
        }
      ],
      //企业资质
      qyzs: {
        content: null
      },
      //企业人员
      qyry: {
        rylb: {
          total: 0,
          lists: []
        },
        tableData: [],
        loading: false,
        rymc: '',
        zsbh: '',
        zjlx: '全部',
        page: 1,
        total: 0
      },
      //   在建项目
      zjxm: {
        tableData: [],
        loading: false,
        xmmc: '',
        je_min: '',
        je_max: '',
        kgrq_min: '',
        kgrq_max: '',
        jgrq_min: '',
        jgrq_max: '',
        cyry: '',
        zbrq_min: '',
        zbrq_max: '',
        xmlx: '',
        page: 1,
        total: 0
      },
      //   业绩信息
      yjxx: {
        tableData: [],
        loading: false,
        xmmc: '',
        je_min: '',
        je_max: '',
        kgrq_min: '',
        kgrq_max: '',
        jgrq_min: '',
        jgrq_max: '',
        cyry: '',
        zbrq_min: '',
        zbrq_max: '',
        xmlx: '',
        page: 1,
        total: 0
      },
      blxw: {
        tableData: [],
        loading: false
      },
      lhxw: {
        tableData: [],
        loading: false,
        xmmc: '',
        bfjg: '',
        page: 1,
        total: 0
      }
    }
  },
  created() {
    this.getGsmc()
  },
  watch: {
    $route: function(newVal) {
      window.location.reload()
    }
  },
  methods: {
    //合并单元格
    // 合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      let prop = column.property
      if (prop == 'name') {
        //如果存在prop
        const _row = this.merge_array[rowIndex][prop]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    // 获取公司名称及对应的comp_id
    getGsmc() {
      let query_data = {
        gs_id: this.config_data.gs_id,
        source: '四川省建设厅'
      }
      this.axios.post('/firm/Firm_detail/getCompBase', query_data, data => {
        this.config_data.comp_id = data.rows.comp_id
        this.config_data.gsmc = data.rows.qymc
        this.config_data.gxsj = data.rows.modified
        this.source2 = {
          link: data.rows.source_link,
          name: '四川省建设厅'
        }
        this.getJbxx()
        this.creditFn().getList('不良行为')
        this.creditFn().getList('良好行为')
        //获取导航统计条数
        this.getcompCate()
        document.title = '川 | ' + data.rows.qymc
      })
    },
    //获取基本信息和企业证书
    getJbxx() {
      let query_data = {
        comp_id: this.config_data.comp_id,
        source: '四川省建设厅',
        qymc: this.config_data.gsmc
      }
      this.axios.post('/firm/Firm_Detail/firmBasic', query_data, data => {
        if (data.status == 'success') {
          this.tableData = {
            col: 2,
            rows: data.rows.comp_jbxx
          }
          this.qyzs.content = data.rows.comp_zz || []
        }
      })
    },
    //公司统计nav
    getcompCate() {
      let query_data = {
        comp_id: this.config_data.comp_id,
        source: '四川省建设厅'
      }
      this.axios.post('/firm/Firm_detail/getCompCate', query_data, data => {
        this.headData.nav = data.rows
        this.headData = {
          nav: data.rows,
          source: this.source2
        }
        this.headData.source.img = gs_jstGl
      })
    },
    //改变tab
    switchNav(name) {
      this.tabName = name
      if (name == '企业人员') {
        this.qyryFn().getLb()
        this.qyryFn().onReset()
      } else if (name == '在建项目') {
        this.zjxmFn().onReset()
      } else if (name == '业绩信息') {
        this.yjxxFn().onReset()
      }
    },
    // 企业人员数据
    qyryFn() {
      //   获取类别
      let getLb = () => {
        let query_data = {
          comp_id: this.config_data.comp_id,
          source: '四川省建设厅'
        }
        this.axios.post('/firm/Firm_detail/getStaffCate', query_data, data => {
          let total = data.rows.filter(v => {
            return v.rylb == '全部'
          })
          let lists = data.rows.filter(v => {
            return v.rylb != '全部'
          })
          this.qyry.rylb.total = total[0].counts || 0
          this.qyry.rylb.lists = lists || []
        })
      }
      //   点击人员类别
      let onRylb = txt => {
        this.qyry.zjlx = txt
        this.qyry.page = 1
        this.qyry.total = 0
        this.qyry.rymc = ''
        this.qyry.zsbh = ''
        this.qyryFn().getList()
      }
      //获取列表
      let getList = () => {
        this.qyry.loading = true
        let query_data = {
          zjlx: this.qyry.zjlx == '全部' ? '' : this.qyry.zjlx,
          rymc: this.qyry.rymc,
          zsbh: this.qyry.zsbh,
          gs_id: this.config_data.gs_id,
          page: this.qyry.page,
          rows: 10,
          comp_id: this.config_data.comp_id,
          source: '四川省建设厅'
        }
        this.axios.post('/firm/Firm_detail/firmStaff', query_data, data => {
          this.qyry.loading = false
          // 合并行
          this.qyry.tableData = data.rows || []
          this.qyry.total = data.total || 0
          if (data.rows) {
            this.merge_array = tableMregeFn.tableMrege(data.rows)
          }
        })
      }
      let onSearch = () => {
        this.qyry.page = 1
        this.qyry.total = 0
        this.qyry.zjlx = '全部'
        getList()
      }
      let onReset = () => {
        this.qyry.page = 1
        this.qyry.total = 0
        this.qyry.zjlx = '全部'
        this.qyry.rymc = ''
        this.qyry.zsbh = ''
        getList()
      }
      return {
        getLb,
        onSearch,
        getList,
        onRylb,
        onReset
      }
    },
    //在建业绩
    zjxmFn() {
      let getList = () => {
        this.zjxm.loading = true
        let query_data = {
          comp_id: this.config_data.comp_id,
          source: '四川省建设厅',
          xmmc: this.zjxm.xmmc,
          minMoney: this.zjxm.je_min,
          maxMoney: this.zjxm.je_max,
          minKgrq: this.zjxm.kgrq_min,
          maxKgrq: this.zjxm.kgrq_max,
          minJgrq: this.zjxm.jgrq_min,
          maxJgrq: this.zjxm.jgrq_max,
          minZbrq: this.zjxm.zbrq_min,
          maxZbrq: this.zjxm.zbrq_max,
          rymc: this.zjxm.cyry,
          xmlx: this.zjxm.xmlx,
          page: this.zjxm.page,
          rows: 10,
          yjType: 0
        }
        this.axios.post('/firm/Firm_detail/firmProj', query_data, data => {
          this.zjxm.loading = false
          this.zjxm.tableData = data.rows || []
          this.zjxm.total = data.total || 0
        })
      }
      // 搜索
      let onSearch = () => {
        this.zjxm.page = 1
        this.zjxm.total = 0
        getList()
      }
      // 重置
      let onReset = () => {
        this.zjxm.xmmc = ''
        this.zjxm.je_min = ''
        this.zjxm.je_max = ''
        this.zjxm.kgrq_min = ''
        this.zjxm.kgrq_max = ''
        this.zjxm.jgrq_min = ''
        this.zjxm.jgrq_max = ''
        this.zjxm.cyry = ''
        this.zjxm.zbrq_min = ''
        this.zjxm.zbrq_max = ''
        this.zjxm.xmlx = ''
        this.zjxm.page = 1
        this.zjxm.total = 0
        getList()
      }
      return {
        getList,
        onSearch,
        onReset
      }
    },
    //业绩数据
    yjxxFn() {
      let getList = () => {
        this.yjxx.loading = true
        let query_data = {
          comp_id: this.config_data.comp_id,
          source: '四川省建设厅',
          xmmc: this.yjxx.xmmc,
          minMoney: this.yjxx.je_min,
          maxMoney: this.yjxx.je_max,
          minKgrq: this.yjxx.kgrq_min,
          maxKgrq: this.yjxx.kgrq_max,
          minJgrq: this.yjxx.jgrq_min,
          maxJgrq: this.yjxx.jgrq_max,
          minZbrq: this.yjxx.zbrq_min,
          maxZbrq: this.yjxx.zbrq_max,
          rymc: this.yjxx.cyry,
          xmlx: this.yjxx.xmlx,
          page: this.yjxx.page,
          rows: 10,
          yjType: 1
        }
        this.axios.post('/firm/Firm_detail/firmProj', query_data, data => {
          this.yjxx.loading = false
          this.yjxx.tableData = data.rows || []
          this.yjxx.total = data.total || 0
        })
      }
      // 搜索
      let onSearch = () => {
        this.yjxx.page = 1
        this.yjxx.total = 0
        getList()
      }
      // 重置
      let onReset = () => {
        this.yjxx.xmmc = ''
        this.yjxx.je_min = ''
        this.yjxx.je_max = ''
        this.yjxx.kgrq_min = ''
        this.yjxx.kgrq_max = ''
        this.yjxx.jgrq_min = ''
        this.yjxx.jgrq_max = ''
        this.yjxx.cyry = ''
        this.yjxx.zbrq_min = ''
        this.yjxx.zbrq_max = ''
        this.yjxx.xmlx = ''
        this.yjxx.page = 1
        this.yjxx.total = 0
        getList()
      }
      return {
        getList,
        onSearch,
        onReset
      }
    },
    // 良好不良记录信用记录
    creditFn() {
      let getList = typeTxt => {
        let query_data = {
          comp_id: this.config_data.comp_id,
          source: '四川省建设厅',
          cate: typeTxt
        }
        if (typeTxt == '良好行为') {
          this.lhxw.loading = true
          query_data.xmmc = this.lhxw.xmmc
          query_data.bfjg = this.lhxw.bfjg
          query_data.page = this.lhxw.page
          query_data.rows = 10
        } else {
          this.blxw.loading = true
        }
        this.axios.post('/firm/Firm_detail/firmCredit', query_data, data => {
          this.blxw.loading = false
          this.lhxw.loading = false
          if (typeTxt == '不良行为') {
            this.blxw.tableData = data.rows['不良行为'] || []
          }
          if (typeTxt == '良好行为') {
            this.lhxw.tableData = data.rows
            this.lhxw.total = data.total
          }
        })
      }
      let onSearch = () => {
        getList('良好行为')
      }
      let onReset = () => {
        this.lhxw.xmmc = ''
        this.lhxw.bfjg = ''
        this.lhxw.page = 1
        this.lhxw.total = 0
        getList('良好行为')
      }
      return {
        getList,
        onSearch,
        onReset
      }
    },
    // 在建项目分页请求
    zjxmPageSizeChange(value) {
      this.zjxm.page = value
      this.zjxmFn().getList()
    },
    // 业绩信息分页请求
    yjxxPageSizeChange(value) {
      this.yjxx.page = value
      this.yjxxFn().getList()
    },
    // 企业人员分页请求
    qyryPageSizeChange(value) {
      this.qyry.page = value
      this.qyryFn().getList()
    },
    //良好行为分页请求
    lhxwPageSizeChange(value) {
      this.lhxw.page = value
      this.creditFn().getList('良好行为')
    },
    //人员跳转
    openRy(name, source, row) {
      let { href } = this.$router.resolve({
        path: `/ryDet?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&gs_id=${
          this.$route.query.gs_id
        }&name=${name}&staff_base_id=${
          row.staff_base_id ? row.staff_base_id : ''
        }`
      })
      window.open(href, '人员详情' + this.$route.query.gs_id + name)
    },
    //业绩跳转
    openYj(proj_id, xmmc) {
      let { href } = this.$router.resolve({
        path: `/yjDet?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&proj_id=${proj_id}&source=jst`
      })
      window.open(href, '业绩详情' + xmmc + proj_id + 'jst')
    }
  }
}
</script>
<style>
.blxw_div .el-collapse-item__header {
  background-color: rgba(242, 242, 242, 1);
  font-size: 14px;
}
.blxw_div .el-collapse-item__wrap {
  border-bottom: none;
}
.blxw_div .el-collapse-item {
  margin-bottom: 20px;
}
.blxw_div .el-collapse-item__content {
  padding-bottom: 0;
}
.blxw_div .el-collapse {
  border-bottom: none;
}
</style>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 10px;
}
header {
  box-shadow: 2px 2px 2px rgb(241, 240, 240);
  height: 70px;
  min-width: 1200px;
  line-height: 70px;
  div {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .gsmc {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 32px;
    }
    .info {
      position: absolute;
      right: 0;
      bottom: -10px;
      font-size: 13px;
    }
  }
}
.center1200 {
  width: 1200px;
  margin: 0 auto;
}
.zs_div {
  border: 1px solid #d5d5d5;
  display: inline-block;
  margin: 0 0 10px;
  min-width: 586px;
  .header {
    margin: 0 10px;
    display: flex;
    line-height: 38px;
    justify-content: space-between;
    border-bottom: 1px solid #d5d5d5;
  }
  .content {
    font-size: 14px;
    padding: 30px 6px;
    > div {
      display: inline-block;
      width: 593px;
      vertical-align: text-top;
      margin-bottom: 20px;
      > div {
        display: flex;
        padding: 5px 0;
        .name {
          margin-right: 10px;
          width: 120px;
          text-align: right;
          color: #999999;
        }
        .value {
          flex: 1;
        }
      }
    }
  }
}
.row {
  font-size: 14px;
  display: flex;
  .title {
    div {
      cursor: pointer;
      margin-right: 10px;
      padding: 4px 6px;
      border-radius: 4px;
    }
    div:hover {
      background-color: rgba(52, 139, 218, 1);
      color: #ffffff;
      .span_color {
        color: #ffffff;
      }
    }
  }
  .value {
    flex: 1;
  }
}
.selected {
  background-color: rgba(52, 139, 218, 1);
  color: #ffffff;
  .span_color {
    color: #ffffff;
  }
}
.hover_div {
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  margin: 0 6px 8px 0;
  padding: 4px 6px;
  border-radius: 4px;
}
.span_color {
  color: rgba(52, 139, 218, 1);
}
.hover_div:hover {
  background-color: rgba(52, 139, 218, 1);
  color: #ffffff;
}
.hover_div:hover .span_color {
  color: #ffffff;
}
.link_color {
  color: rgb(58, 142, 230);
  cursor: pointer;
}
.content_div {
  position: relative;
  > div {
    margin-bottom: 20px;
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0
  }
}
/* 动画 */
.transitionFadediv-enter-active,
.transitionFadediv-leave-active {
  transition: opacity 0.2s;
}
.transitionFadediv-enter,
.transitionFadediv-leave-to {
  opacity: 0;
}
</style>

