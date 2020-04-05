<template>
  <div style="color:#333333,overflow:hidden">
    <header>
      <div>
        <span class="gsmc">{{gsmc}}</span>
      </div>
    </header>
    <div class="centent">
      <div style="font-size:0;margin-bottom:6px">
        <div class="btn btn_img">
          <img :src="source" alt="数据源" style="vertical-align:sub" />
        </div>
        <el-button v-if="this.gs_source.indexOf('全国建筑市场') != '-1'" class="btn" @click="openHref('/gs_building')">
          <i class="icon_gs" :style="{'background-image':'url(' + gs_jz+ ')'}"></i>全国建筑市场
        </el-button>
        <el-button v-if="this.gs_source.indexOf('四川省建设厅') != '-1'" class="btn" @click="openHref('/gs_scjst')">
          <i class="icon_gs" :style="{'background-image':'url(' + gs_jstGl + ')'}"></i>四川省建设厅
        </el-button>
        <el-button v-if="this.gs_source.indexOf('全国公路市场') != '-1'" class="btn" @click="openHref('/gs_road')">
          <i class="icon_gs" :style="{'background-image':'url(' + gs_jstGl + ')'}"></i>全国公路市场
        </el-button>
        <el-button v-if="this.gs_source.indexOf('全国水利市场') != '-1'" class="btn" @click="openHref('/gs_water')">
          <i class="icon_gs" :style="{'background-image':'url(' + gs_sl + ')'}"></i>全国水利市场
        </el-button>
      </div>
      <head-nav :data="headData" @switchNav="switchNav" v-if="isShow"></head-nav>
      <div class="content_everyDiv" v-loading="allLoading || allLoadingZj">
        <!-- 企业证书 -->
        <transition name="transitionFadediv" v-if="isShow">
          <div v-show="tabs == '企业证书'">
            <table-info :tableData="tableData" v-if="tableData.rows.length>0"></table-info>
            <el-row>
              <el-col :span="tableData.rows.length>0 ? 3 : 0" style="height:100%">
                <el-menu default-active="0" class="el-menu-vertical-demo zz_ul" @select="handleOpen">
                  <div v-for="(item,i) in radio_zzs" :key="i">
                    <el-menu-item :index="i.toString()">
                      <span slot="title">{{item.zzlx}}</span>
                      <span class="count">{{item.count}}</span>
                    </el-menu-item>
                  </div>
                </el-menu>
              </el-col>
              <el-col :span="tableData.rows.length>0 ? 20 : 24" :offset="tableData.rows.length>0 ? 1 : 0">
                <!-- <el-table key="jbxxTable" :span-method="arraySpanMethod" :data="jbxx.tableData" border v-loading="jbxx.loading" style="margin-top:10px"> -->
                <div class="zz_box">
                  <el-table key="jbxxTable" :span-method="arraySpanMethod" :data="zz_tableData" border v-loading="zz_tableData_loading" style="margin-top:10px" height="800px">
                    <el-table-column width="60" type="index" label="序号" align="center"></el-table-column>
                    <el-table-column align="center" prop="zzlb" label="资质类别"></el-table-column>
                    <el-table-column align="center" prop="zzzsh" label="资质证书号"></el-table-column>
                    <el-table-column align="center" prop="zzmc" label="资质名称"></el-table-column>
                    <el-table-column label="发证日期" prop="fzrq" align="center"></el-table-column>
                    <el-table-column label="证书有效期" prop="zsyxq" align="center"></el-table-column>
                    <el-table-column label="发证机关" prop="fzjg" align="center"></el-table-column>
                  </el-table>
                </div>

              </el-col>
            </el-row>

          </div>
        </transition>
        <!-- 人员信息 -->
        <transition name="transitionFadediv" v-if="isShow">
          <div v-show="tabs == '人员信息'">
            <div class="fl_div" v-if="zsxx.nav.length>0">
              <div class="row" v-for="one in zsxx.nav" :key="one.remark">
                <div class="title">
                  <div :class="[one.remark == zsxx.source && zsxx.zjlx == ''?'selected':'']" @click="zsxxFn().onSelectedNav(one.remark,'',one.type)">
                    {{one.remark}}
                    <span class="color_blue">({{one.count}}本)</span>
                    :
                  </div>
                </div>
                <div class="value">
                  <div class="hover_div" v-for="child in one.children" :key="child.certificate_type" :class="[one.remark == zsxx.source && child.certificate_type==zsxx.zjlx?'selectedText':'']" @click="zsxxFn().onSelectedNav(one.remark,child.certificate_type,one.type)">
                    {{child.certificate_type}}
                    <span class="color_blue">({{child.count}}本)</span>
                  </div>
                </div>
              </div>
            </div>
            <el-form align="right" :inline="true" style="margin-top:10px;" @submit.native.prevent>
              <el-form-item v-if="zsxx.zjlx == '三类人员'||zsxx.zjlx == '注册建造师'||zsxx.zjlx == '职称'||zsxx.zjlx =='施工现场专业人员'&&mySource == '四川省建设厅（注册证）'" :label="zsxx.zjlx+'搜索'">
                <el-select v-model="value" @change="changeDropDown" style="width:150px" placeholder="请选择">
                  <el-option v-for="item in dropDownList" :key="item.major" :label="item.major" :value="item.major">
                  </el-option>
                </el-select>
                <el-select v-if="childrenState" v-model="value1" @change="changeDropDown1" style="width:150px" placeholder="请选择">
                  <el-option v-for="item1 in dropDownList1" :key="item1.major" :label="item1.major" :value="item1.major">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="人员名称">
                <el-input v-model="zsxx.rymc" style="width:150px" @keyup.enter.native="zsxxFn().onSearch()" clearable placeholder="人员名称"></el-input>
              </el-form-item>
              <el-form-item label="证书编号">
                <el-input v-model="zsxx.zsbh" @keyup.enter.native="zsxxFn().onSearch()" clearable placeholder="证书编号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="zsxxFn().onSearch()">搜索</el-button>
                <el-button @click="zsxxFn().onReset()">重置</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="zsxx.tableData" border v-loading="zsxx.loading">
              <el-table-column type="index" width="60" align="center" label="序号">
                <template slot-scope="scope">
                  <div>{{(scope.$index+1)+(zsxx.page-1)*10}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="name" label="姓名">
                <template slot-scope="scope">
                  <el-button type="text" @click="openRy(scope.row.name,scope.row.remark,scope.row)">{{scope.row.name+scope.row.total}}</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="certificate_type" label="证件类型"></el-table-column>
              <el-table-column align="center" prop="certificate_number" label="证件号"></el-table-column>
              <el-table-column align="center" prop="major" label="注册专业/专业/职称"></el-table-column>
              <el-table-column align="center" prop="certificate_level" label="证书级别/等级/岗位"></el-table-column>
              <el-table-column align="center" prop="valid_date" label="有效期">
                <template slot-scope="scope">
                  <div :style="{color:scope.row.expire?'':'red'}">{{scope.row.valid_date}}</div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px" @current-change="zsxxPageSizeChange" align="right" background layout="total,prev, pager, next" :total="zsxx.total"></el-pagination>
          </div>
        </transition>
        <!-- 工程业绩 -->
        <transition name="transitionFadediv" v-if="isShow">
          <div v-show="tabs == '工程业绩'">
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item label="项目名称">
                <el-input style="width:285px" v-model="gcyj.xmmc" @keyup.enter.native="gcyjFn().onSearch()" placeholder="请输入项目名称"></el-input>
              </el-form-item>
              <el-form-item label="资金范围">
                <el-input style="width:176px" v-model="gcyj.je_min" @keyup.enter.native="gcyjFn().onSearch()" placeholder="金额">
                  <template slot="append">万元</template>
                </el-input>
                <span>-</span>
                <el-input style="width:176px" v-model="gcyj.je_max" @keyup.enter.native="gcyjFn().onSearch()" placeholder="金额">
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="开工日期">
                <el-date-picker style="width:136px" v-model="gcyj.kgrq_min" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                <span>-</span>
                <el-date-picker style="width:136px" v-model="gcyj.kgrq_max" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
              </el-form-item>
            </el-form>
            <el-form :inline="true" @submit.native.prevent>
              <el-form-item label="竣工日期">
                <el-date-picker style="width:136px" v-model="gcyj.jgrq_min" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                <span>-</span>
                <el-date-picker style="width:136px" v-model="gcyj.jgrq_max" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
              </el-form-item>
              <el-form-item label="从业人员">
                <el-input style="width:130px" v-model="gcyj.cyry" @keyup.enter.native="gcyjFn().onSearch()" placeholder="人员名称"></el-input>
              </el-form-item>
              <el-form-item label="项目类型">
                <el-select style="width:154px" v-model="gcyj.xmlx" placeholder="选择项目类型" @change="gcyjFn().onSearch()">
                  <el-option v-for="item in gsyjXmlx" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="中标日期">
                <el-date-picker style="width:136px" v-model="gcyj.zbrq_min" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                <span>-</span>
                <el-date-picker style="width:136px" v-model="gcyj.zbrq_max" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
              </el-form-item>
            </el-form>
            <div style="text-align:center;padding:0 20px 10px 0">
              <el-button type="primary" @click="gcyjFn().onSearch()">搜索</el-button>
              <el-button @click="gcyjFn().onReset()">重置</el-button>
            </div>
            <el-table key="gcyjTable" :data="gcyj.tableData" border v-loading="gcyj.loading">
              <el-table-column type="index" width="60" align="center" label="序号">
                <template slot-scope="scope">
                  <div>{{(scope.$index+1)+(gcyj.page-1)*10}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" width="400" prop="proj_name" label="项目名称">
                <template slot-scope="scope">
                  <div class="link_color" @click="open_yj(scope.row)">{{scope.row.proj_name}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="proj_type" label="项目类型"></el-table-column>
              <el-table-column align="center" prop="money" label="金额(万元)"></el-table-column>
              <el-table-column align="center" prop="proj_date" label="日期"></el-table-column>
              <el-table-column align="center" prop="remark" label="数据源"></el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px" @current-change="gcyjPageSizeChange" align="right" background layout="total,prev, pager, next" :total="gcyj.total"></el-pagination>
          </div>
        </transition>
        <!-- 招投标市场行为(全) -->

        <transition name="transitionFadediv" v-if="isShow">
          <div v-show="tabs == '招投标市场行为'">
            <div>
              <div v-for="one in ztbscxw.nav" :key="one.name" :class="['hover_div',one.type == ztbscxw.selectedNav?'selectedNav':'']" @click="ztbscxwFn().onSelectedNav(one.type)">
                {{one.name}}
                <span class="color_blue" v-if="one.value">({{one.value}})</span>
              </div>
            </div>
            <div v-show="ztbscxw.selectedNav == 'stat'">
              <gs-zb-count :params="gsZbCountData"></gs-zb-count>
            </div>
            <el-form :inline="true" style="margin-top:10px;display:inline-block" @submit.native.prevent v-show="ztbscxw.selectedNav != 'stat'">
              <el-form-item label="项目名称">
                <el-input @keyup.enter.native="ztbscxwFn().getList()" style="width:285px" v-model="ztbscxw.xmmc" placeholder="项目名称"></el-input>
              </el-form-item>
              <el-form-item label="中标日期">
                <el-date-picker style="width:180px" v-model="ztbscxw.zbrq_min" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                <span>-</span>
                <el-date-picker style="width:180px" v-model="ztbscxw.zbrq_max" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
              </el-form-item>
              <el-form-item label="项目类型">
                <el-select style="width:250px" v-model="ztbscxw.xmlx" placeholder="选择项目类型" @change="ztbscxwFn().onSearch()">
                  <el-option v-for="item in xmlxOptions" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form v-if="ztbscxw.selectedNav != 'tender' && ztbscxw.selectedNav != 'stat'" :inline="true" style="display:inline-block" @submit.native.prevent>
              <el-form-item label="从业人员">
                <el-input style="width:285px" v-model="ztbscxw.cyry" @keyup.enter.native="ztbscxwFn().onSearch()" placeholder="人员名称"></el-input>
              </el-form-item>
              <el-form-item label="资金范围">
                <el-input style="width:180px" v-model="ztbscxw.je_min" @keyup.enter.native="ztbscxwFn().onSearch()" placeholder="金额">
                  <template slot="append">万元</template>
                </el-input>
                <span>-</span>
                <el-input style="width:180px" v-model="ztbscxw.je_max" @keyup.enter.native="ztbscxwFn().onSearch()" placeholder="金额">
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="入围名次" v-if="ztbscxw.selectedNav == 'win'">
                <el-input style="width:250px" v-model="ztbscxw.rwmc" @keyup.enter.native="ztbscxwFn().onSearch()" placeholder="入围名次"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align:center;margin-bottom:10px" v-show="ztbscxw.selectedNav != 'stat'">
              <el-button type="primary" @click="ztbscxwFn().onSearch()">搜索</el-button>
              <el-button @click="ztbscxwFn().onReset()">重置</el-button>
            </div>
            <el-table :data="ztbscxw.tableData" key="ztbscxyTable" border v-loading="ztbscxw.loading" v-show="ztbscxw.selectedNav != 'stat'">
              <el-table-column width="60" type="index" label="序号" align="center">
                <template slot-scope="scope">
                  <div>{{(scope.$index+1)+(ztbscxw.page-1)*10}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="xmmc" width="400" label="项目名称">
                <template slot-scope="scope">
                  <div class="link_color" @click="open_zbyj(scope.row)">{{scope.row.xmmc}}</div>
                </template>
              </el-table-column>
              <el-table-column v-if="ztbscxw.selectedNav != 'win'" align="center" prop="xmyz" label="项目业主"></el-table-column>
              <el-table-column v-if="ztbscxw.selectedNav == 'tender'" align="center" prop="tbbj" label="废标原因"></el-table-column>
              <template v-if="ztbscxw.selectedNav != 'tender'">
                <el-table-column width="115px" align="center" prop="tbbjw" label="投标报价(万元)"></el-table-column>
                <el-table-column width="105px" align="center" prop="psbjw" label="评审价(万元)"></el-table-column>
                <el-table-column width="95px" align="center" prop="zhpf" label="综合评分"></el-table-column>
              </template>
              <el-table-column v-if="ztbscxw.selectedNav == 'win'" align="center" prop="zbmc" label="入围名次"></el-table-column>
              <el-table-column width="95px" v-if="ztbscxw.selectedNav != 'tender'" align="center" prop="name" label="项目负责人"></el-table-column>
              <el-table-column width="95px" align="center" prop="kbsj" label="开标日期"></el-table-column>
              <el-table-column width="120px" align="center" prop="area" label="项目所在地"></el-table-column>
            </el-table>
            <el-pagination v-show="ztbscxw.selectedNav != 'stat'" style="margin-top:20px" @current-change="ztbscxwPageSizeChange" align="right" background layout="total,prev, pager, next" :total="ztbscxw.total"></el-pagination>
          </div>
        </transition>
        <!-- 招投标市场行为(仅中标公示) -->
        <transition name="transitionFadediv" v-if="!isShow">
          <div>
            <div>
              <div v-for="one in ztbscxw.nav" :key="one.name" :class="['hover_div',one.type == ztbscxw.selectedNav?'selectedNav':'']" @click="ztbscxwFn().onSelectedNav(one.type)">
                {{one.name}}
                <span class="color_blue">({{one.value}})</span>
              </div>
            </div>
            <!-- <p style="font-size:20px;margin-bottom:10px">中标公示</p> -->
            <!-- 筛选 -->
            <el-form :inline="true" style="margin-top:10px;display:inline-block" @submit.native.prevent>
              <el-form-item label="项目名称">
                <el-input @keyup.enter.native="ztbscxwFn().getList()" style="width:285px" v-model="ztbscxw.xmmc" placeholder="项目名称"></el-input>
              </el-form-item>
              <el-form-item label="中标日期">
                <el-date-picker style="width:180px" v-model="ztbscxw.zbrq_min" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
                <span>-</span>
                <el-date-picker style="width:180px" v-model="ztbscxw.zbrq_max" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
              </el-form-item>
              <el-form-item label="项目类型">
                <el-select style="width:250px" v-model="ztbscxw.xmlx" placeholder="选择项目类型" @change="ztbscxwFn().onSearch()">
                  <el-option v-for="item in xmlxOptions" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <!-- 表格 -->
            <el-form v-if="ztbscxw.selectedNav != 'tender'" :inline="true" style="display:inline-block" @submit.native.prevent>
              <el-form-item label="从业人员">
                <el-input style="width:285px" v-model="ztbscxw.cyry" @keyup.enter.native="ztbscxwFn().onSearch()" placeholder="人员名称"></el-input>
              </el-form-item>
              <el-form-item label="资金范围">
                <el-input style="width:180px" v-model="ztbscxw.je_min" @keyup.enter.native="ztbscxwFn().onSearch()" placeholder="金额">
                  <template slot="append">万元</template>
                </el-input>
                <span>-</span>
                <el-input style="width:180px" v-model="ztbscxw.je_max" @keyup.enter.native="ztbscxwFn().onSearch()" placeholder="金额">
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="入围名次" v-if="ztbscxw.selectedNav == 'win'">
                <el-input style="width:250px" v-model="ztbscxw.rwmc" @keyup.enter.native="ztbscxwFn().onSearch()" placeholder="入围名次"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align:center;margin-bottom:10px">
              <el-button type="primary" @click="ztbscxwFn().onSearch()">搜索</el-button>
              <el-button @click="ztbscxwFn().onReset()">重置</el-button>
            </div>

            <el-table :data="ztbscxw.tableData" key="ztbscxyTable" border v-loading="ztbscxw.loading">
              <el-table-column width="60" type="index" label="序号" align="center">
                <template slot-scope="scope">
                  <div>{{(scope.$index+1)+(ztbscxw.page-1)*10}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="xmmc" width="400" label="项目名称">
                <template slot-scope="scope">
                  <div class="link_color" @click="open_zbyj(scope.row)">{{scope.row.xmmc}}</div>
                </template>
              </el-table-column>
              <el-table-column v-if="ztbscxw.selectedNav != 'win'" align="center" prop="xmyz" label="项目业主"></el-table-column>
              <el-table-column v-if="ztbscxw.selectedNav == 'tender'" align="center" prop="tbbj" label="废标原因"></el-table-column>
              <template v-if="ztbscxw.selectedNav != 'tender'">
                <el-table-column width="115px" align="center" prop="tbbjw" label="投标报价(万元)"></el-table-column>
                <el-table-column width="105px" align="center" prop="psbjw" label="评审价(万元)"></el-table-column>
                <el-table-column width="95px" align="center" prop="zhpf" label="综合评分"></el-table-column>
              </template>
              <el-table-column v-if="ztbscxw.selectedNav == 'win'" align="center" prop="zbmc" label="入围名次"></el-table-column>
              <el-table-column width="95px" v-if="ztbscxw.selectedNav != 'tender'" align="center" prop="name" label="项目负责人"></el-table-column>
              <el-table-column width="95px" align="center" prop="kbsj" label="开标日期"></el-table-column>
              <el-table-column width="120px" align="center" prop="area" label="项目所在地"></el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px" @current-change="ztbscxwPageSizeChange" align="right" background layout="total,prev, pager, next" :total="ztbscxw.total"></el-pagination>
          </div>
        </transition>

        <!-- 大数据中心 -->
        <transition name="transitionFadediv" v-if="isShow">
          <div v-show="tabs == '大数据中心'">
            <business-man :params="bigData"></business-man>
          </div>
        </transition>
        <!-- 大数据中心 -->
      </div>
    </div>
  </div>
</template>
<script>
import source from '../assets/source.png'
import gs_jstGl from '../assets/gs_jst&gl.png'
import gs_jz from '../assets/gs_jz.png'
import gs_sl from '../assets/gs_sl.png'
import headNav from './template/head_nav'
import tableInfo from './template/tableInfo'
import tableMregeFn from './../tableMrege'
import businessMan from './businessManagement'
import gsZbCount from './gs_zbCount'
export default {
  components: {
    headNav,
    tableInfo,
    businessMan,
    gsZbCount
  },
  data() {
    return {
      radio_zzs: [],
      radio_zz: '',
      allLoading: false,
      allLoadingZj: false,
      value: '',
      value1: '',
      gs_jstGl,
      gs_jz,
      gs_sl,
      gs_source: [], // 公司来源
      merge_array: [], // 合并数据
      tabs: '企业证书',
      source,
      gs_id: this.$route.query.gs_id,
      gsyjXmlx: [
        '全部',
        '建筑工程',
        '市政工程',
        '水利工程',
        '公路工程',
        '其他工程'
      ],
      xmlxOptions: [],
      gsmc: '',
      comp_id: '',
      tableData: {
        col: 2,
        rows: [
          // {
          //   name: "地点",
          //   value: ""
          //   children: {
          //     th: ["省份", "地区"],
          //     rows: [["四川", "成都"], ["四川", "内江"]]
          //   }
          // }
        ]
      },
      headData: {
        nav: [
          { text: '企业证书', num: '' },
          { text: '人员信息', num: '' },
          { text: '工程业绩', num: '' },
          { text: '招投标市场行为', num: '' }
        ],
        source: {
          link: '',
          name: ''
        }
      },
      // 基本信息
      jbxx: {
        tableData: [],
        loading: false
      },
      zz_tableData: [],
      zz_tableData_loading: false,
      // 人员信息
      zsxx: {
        source: '',
        loading: false,
        nav: [],
        tableData: [],
        rymc: '',
        zsbh: '',
        page: 1,
        total: 0,
        zjlx: ''
      },
      // 工程业绩
      gcyj: {
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
      // 招投标市场行为
      ztbscxw: {
        nav: [],
        selectedNav: 'stat', // 默认选中中标公示
        tableData: [],
        loading: false,
        xmmc: '',
        je_min: '',
        je_max: '',
        cyry: '', // 从业人员
        zbrq_min: '',
        zbrq_max: '',
        xmlx: '', // 项目类别
        page: 1,
        rwmc: '' // 入围名次
      },
      isShow: false,
      bigData: {},
      gsZbCountData: {},
      //下拉
      myZjlx: '',
      mySource: '',
      dropDownList: [], //人员下拉筛选
      dropDownList1: [], //人员下拉筛选
      major: '',
      number: '',
      certificate_level: '',
      childrenState: false,
      sanleiPerson: ''
    }
  },
  created() {
    this.getGsSource()
    // 导航统计
    this.getcompCate()
    // 招投标市场行为
    this.ztbscxwFn().getCountNav()
    this.getxmlx()
    this.getQualiSource()
    // if (localStorage.company_id != 1) {
    //   this.ztbscxwFn().reset();
    //   this.ztbscxw.tableData = [];
    //   this.ztbscxw.selectedNav = "bid";
    //   this.ztbscxwFn().getList();
    // }
    let gsmc = this.$route.query.gsmc
    document.title = '公司详情:' + gsmc
  },
  watch: {
    $route: function(newVal) {
      window.location.reload()
    }
  },
  methods: {
    getQualiSource() {
      this.axios.post(
        '/firm/Firm_Detail/qualiSource',
        { gs_id: this.gs_id },
        data => {
          if (data.rows[0].remark == '全国建筑市场') {
            this.radio_zzs = data.rows[0].children
            this.getQualiList('全部')
          } else {
            this.radio_zzs = []
          }
        }
      )
    },
    getQualiList(zzlx) {
      let params = {
        gs_id: this.gs_id,
        source: '全国建筑市场',
        zzlx,
        zzmc: '',
        page: 1,
        rows: 100
      }
      this.zz_tableData_loading = true
      this.axios.post('/firm/Firm_Detail/qualiList', params, data => {
        this.zz_tableData_loading = false
        this.merge_array = tableMregeFn.tableMrege(data.rows || [])
        this.zz_tableData = data.rows || []
      })
    },
    handleOpen(i, path) {
      let item = this.radio_zzs[i]
      // this.getJbxx(item.zzlx)
      this.getQualiList(item.zzlx)
    },
    changeDropDown(val) {
      this.value1 = ''
      this.dropDownList1 = []
      this.sanleiPerson = ''
      //  this.certificate_level = ''
      this.dropDownList.forEach(item => {
        if (item.major == val) {
          if (item.children) {
            this.dropDownList1 = item.children
          }
        }
      })
      this.childrenState = true
      if (this.myZjlx == '三类人员') {
        this.number = val
        this.certificate_level = ''
      } else if (this.myZjlx == '施工现场专业人员') {
        this.major = ''
        this.certificate_level = val
      } else {
        this.certificate_level = ''
        this.major = val
      }
      this.zsxxFn().getList(1)
    },
    changeDropDown1(val) {
      if (this.myZjlx == '施工现场专业人员') {
        this.major = val
      } else if (this.myZjlx == '三类人员') {
        this.number = this.sanleiPerson
        this.number = this.number + val
      } else {
        this.certificate_level = val
      }
      this.zsxxFn().getList(1)
    },
    // 合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      let prop = column.property
      if (prop) {
        // 如果存在prop
        const _row = this.merge_array[rowIndex][prop]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    // 获取基本信息和企业证书
    getJbxx(type) {
      let query_data = {
        gs_id: this.gs_id,
        // source: '全国建筑市场',
        // zzlx: type
      }
      this.jbxx.loading = true
      this.axios.post('/firm/Firm_Detail/compDetail', query_data, data => {
        this.jbxx.loading = false
        if (data.status == 'success') {
          this.tableData = {}
          this.$nextTick(() => {
            this.tableData = {
              col: 2,
              rows: data.rows
            }
          })
          // 合并行
          // this.merge_array = tableMregeFn.tableMrege(data.rows.comp_zz)
          this.jbxx.tableData = data.rows
        }
      })
    },
    // 公司统计nav
    getcompCate() {
      let query_data = {
        gs_id: this.gs_id
      }
      this.allLoadingZj=true
      this.axios.post('/firm/People/countCompNav', query_data, data => {
        this.headData = {
          nav: data.rows,
          source: {
            link: '',
            name: ''
          }
        }
        this.allLoadingZj=false
      })
    },
    // 获取公司名称
    getGsmc() {
      let query_data = {
        gs_id: this.gs_id,
        source: this.gs_source[0]
      }
      this.axios.post('/firm/Firm_detail/getCompBase', query_data, data => {
        this.gsmc = data.rows.qymc
        this.comp_id = data.rows.comp_id
        this.getJbxx('全部')
      })
    },
    // 公司数据源
    getGsSource() {
      let query_data = {
        gs_id: this.gs_id
      }
      this.axios.post('/firm/Firm_detail/getCompBase', query_data, data => {
        this.gs_source = data
        this.getGsmc()
      })
    },
    // tab切换回调
    switchNav(data) {
      this.tabs = data
      if (data == '人员信息') {
        this.zsxxFn().getSource()
        this.zsxxFn().onReset()
      } else if (data == '工程业绩') {
        this.gcyjFn().onReset()
      } else if (data == '招投标市场行为') {
        this.gsZbCountData = {
          gs_id: this.gs_id
        }
        this.ztbscxwFn().onReset()
      } else if (data == '大数据中心') {
        this.bigData = {
          gs_id: this.gs_id,
          source: this.gs_source[0]
        }
      }
    },
    // 人员信息
    zsxxFn() {
      let getList = num => {
        this.zsxx.loading = true
        let query_data = {
          gs_id: this.gs_id,
          source: this.zsxx.source,
          zjlx: this.zsxx.zjlx,
          name: this.zsxx.rymc,
          number: this.zsxx.zsbh,
          page: this.zsxx.page,
          type: this.zsxx.type,
          major: this.major,
          certificate_level: this.certificate_level,
          rows: 10
        }
        if (num == 1) {
          query_data.number = this.number
        }
        this.axios.post('/firm/people/peopleList', query_data, data => {
          this.zsxx.loading = false
          this.zsxx.tableData = data.rows || []
          this.zsxx.total = data.total || 0
        })
      }
      // 获取导航列表
      let getSource = () => {
        let query_data = {
          gs_id: this.gs_id
        }
        this.axios.post('/firm/people/peopleSource', query_data, data => {
          this.zsxx.nav = data.rows || []
        })
      }
      //获取下拉
      let getSourceInfo = zjlx => {
        this.dropDownList = []
        this.dropDownList1 = []
        this.value = ''
        this.value1 = ''
        this.childrenState = false
        let info_data = {
          gs_id: this.gs_id,
          zjlx: zjlx
        }
        this.axios.post('/firm/people/getSourceInfo', info_data, data => {
          let arr = data.rows
          arr.forEach(item => {
            if (item.children) {
              let arr1 = []
              if (item.children.length > 0) {
                item.children.forEach(item1 => {
                  if (item1 != '' && item1) {
                    let obj = {}
                    obj.major = item1
                    arr1.push(obj)
                  }
                })
                item.children = arr1
              }
            }
          })
          this.dropDownList = arr
        })
      }

      // 点击导航
      let onSelectedNav = (source, zjlx, type) => {
        console.log(zjlx)
        this.myZjlx = zjlx
        this.childrenState = false
        this.mySource = source
        ;(this.number = ''), (this.major = ''), (this.certificate_level = '')
        // console.log(source, zjlx, type)
        if (source == this.zsxx.source && zjlx == this.zsxx.zjlx) {
          this.zsxx.source = ''
          this.zsxx.zjlx = ''
        } else {
          this.zsxx.source = source
          this.zsxx.zjlx = zjlx
          this.zsxx.type = type
        }
        this.zsxx.page = 1
        this.zsxx.total = 0
        this.zsxx.rymc = ''
        this.zsxx.zsbh = ''
        // zjlx == '施工现场专业人员'||
        getSourceInfo(zjlx)
        getList()
      }
      // 搜索
      let onSearch = () => {
        this.childrenState = false
        this.myZjlx = ''
        this.mySource = ''
        ;(this.number = ''), (this.major = ''), (this.certificate_level = '')
        this.zsxx.source = ''
        this.zsxx.zjlx = ''
        this.zsxx.page = 1
        this.zsxx.total = 0
        getList()
      }
      let onReset = () => {
        this.childrenState = false
        this.myZjlx = ''
        this.mySource = ''
        ;(this.number = ''), (this.major = ''), (this.certificate_level = '')
        this.zsxx.source = ''
        this.zsxx.zjlx = ''
        this.zsxx.rymc = ''
        this.zsxx.zsbh = ''
        this.zsxx.page = 1
        this.zsxx.total = 0
        getList()
      }
      return {
        getList,
        getSource,
        onSearch,
        onReset,
        onSelectedNav
      }
    },
    // 工程业绩
    gcyjFn() {
      let getList = () => {
        this.gcyj.loading = true
        let query_data = {
          gs_id: this.gs_id,
          xmmc: this.gcyj.xmmc,
          name: this.gcyj.cyry,
          minMoney: this.gcyj.je_min,
          maxMoney: this.gcyj.je_max,
          minZbgsTime: this.gcyj.zbrq_min,
          maxZbgsTime: this.gcyj.zbrq_max,
          minKgsjTime: this.gcyj.kgrq_min,
          maxKgsjTime: this.gcyj.kgrq_max,
          minJgsjTime: this.gcyj.jgrq_min,
          maxJgsjTime: this.gcyj.jgrq_max,
          projectType: this.gcyj.xmlx,
          page: this.gcyj.page,
          rows: 10
        }
        this.axios.post('/firm/performance/projectLists', query_data, data => {
          this.gcyj.loading = false
          this.gcyj.tableData = data.rows || []
          this.gcyj.total = data.total || 0
        })
      }
      // 搜索
      let onSearch = () => {
        this.gcyj.page = 1
        this.gcyj.total = 0
        getList()
      }
      // 重置
      let onReset = () => {
        this.gcyj.xmmc = ''
        this.gcyj.je_min = ''
        this.gcyj.je_max = ''
        this.gcyj.kgrq_min = ''
        this.gcyj.kgrq_max = ''
        this.gcyj.jgrq_min = ''
        this.gcyj.jgrq_max = ''
        this.gcyj.cyry = ''
        this.gcyj.zbrq_min = ''
        this.gcyj.zbrq_max = ''
        this.gcyj.xmlx = ''
        this.gcyj.page = 1
        this.gcyj.total = 0
        getList()
      }
      return {
        getList,
        onSearch,
        onReset
      }
    },
    // 招投标市场行为
    ztbscxwFn() {
      // 获取统计条数
      let getCountNav = () => {
        let query_data = {
          gs_id: this.gs_id
        }
        this.allLoading = true
        this.axios.post('/firm/Bid_performance/countNav', query_data, data => {
          // if (localStorage.company_id == 1) {
          this.ztbscxw.nav = data || []
          this.isShow = true
          this.allLoading = false
          // } else {
          // this.ztbscxw.nav = [
          // {
          //   name: "中标公示",
          //   type: "bid",
          //   value: 131
          // }
          // ];
          // }
        })
      }
      // 获取列表
      let getList = () => {
        if (this.ztbscxw.selectedNav == 'stat') {
          return
        }
        this.ztbscxw.loading = true
        let query_data = {
          gs_id: this.gs_id,
          xmmc: this.ztbscxw.xmmc,
          name: this.ztbscxw.cyry,
          minMoney: this.ztbscxw.je_min,
          maxMoney: this.ztbscxw.je_max,
          minZbgsTime: this.ztbscxw.zbrq_min,
          maxZbgsTime: this.ztbscxw.zbrq_max,
          projectType: this.ztbscxw.xmlx,
          type: this.ztbscxw.selectedNav,
          zbmc: this.ztbscxw.rwmc,
          page: this.ztbscxw.page,
          rows: 10
        }

        this.axios.post('/firm/Bid_performance/lists', query_data, data => {
          this.ztbscxw.loading = false
          this.ztbscxw.tableData = data.rows || []
          this.ztbscxw.total = data.total
        })
      }
      // 搜索
      let onSearch = () => {
        this.ztbscxw.page = 1
        getList()
      }
      // 点击导航条数
      let onSelectedNav = typeTxt => {
        if (typeTxt == this.ztbscxw.selectedNav) {
          console.log(690)
          // this.ztbscxw.selectedNav = "";
        } else {
          reset()
          this.ztbscxw.tableData = []
          this.ztbscxw.selectedNav = typeTxt
          this.ztbscxw.page = 1
          this.ztbscxw.total = 0
          getList()
        }
      }
      // 重置事件
      let onReset = () => {
        this.ztbscxw.total = 0
        reset()
        getList()
      }
      // 重置
      let reset = () => {
        this.ztbscxw.xmmc = ''
        this.ztbscxw.je_min = ''
        this.ztbscxw.je_max = ''
        this.ztbscxw.cyry = '' // 从业人员
        this.ztbscxw.zbrq_min = ''
        this.ztbscxw.zbrq_max = ''
        this.ztbscxw.xmlx = '' // 项目类别
        this.ztbscxw.page = 1
        this.ztbscxw.rwmc = '' // 入围名次
      }
      return {
        getList,
        getCountNav,
        onSelectedNav,
        onReset,
        onSearch,
        reset
      }
    },
    // 路由跳转
    openHref(nowhref) {
      let { href } = this.$router.resolve({
        path: `${nowhref}?login_service_id=${
          this.$route.query.login_service_id
        }&qymc=${this.$route.query.qymc}&gs_id=${this.gs_id}`
      })
      window.open(href, nowhref + this.gs_id)
    },
    // 分页请求
    ztbscxwPageSizeChange(page) {
      this.ztbscxw.page = page
      this.ztbscxwFn().getList()
    },
    // 工程业绩
    gcyjPageSizeChange(page) {
      this.gcyj.page = page
      this.gcyjFn().getList()
    },
    // 证书信息
    zsxxPageSizeChange(page) {
      this.zsxx.page = page
      this.zsxxFn().getList()
    },
    // 获取项目类型
    getxmlx() {
      this.axios.post('/firm/Bid_performance/projectType', {}, data => {
        this.xmlxOptions = data
      })
    },
    // 人员跳转
    openRy(name, source, row) {
      let { href } = this.$router.resolve({
        path: `/ryDet?login_service_id=${
          this.$route.query.login_service_id
        }&qymc=${this.$route.query.qymc}&gs_id=${
          this.$route.query.gs_id
        }&name=${name}&staff_base_id=${
          row.staff_base_id ? row.staff_base_id : ''
        }`
      })
      window.open(href, '人员详情' + this.$route.query.gs_id + name)
    },
    // 业绩跳转
    open_yj(row) {
      console.log(row)
      let source = ''
      if (row.remark == '全国建筑市场') {
        source = 'jzsc'
      } else if (row.remark == '四川省建设厅') {
        source = 'jst'
      } else if (row.remark == '全国公路市场') {
        source = 'gl'
      } else if (row.remark == '全国水利市场') {
        source = 'sl'
      } else {
        let { href } = this.$router.resolve({
          path: `/enterpriseDetails?login_service_id=${
            this.$route.query.login_service_id
          }&gsmc=${this.$route.query.qymc}&zbxx_id=${row.zbxx_id ||
            ''}&zbgs_id=${row.proj_id || ''}&xmmc=${
            row.proj_name
          }&type=zbgs&source=${row.source}`
        })
        window.open(
          href,
          '中标公示' + row.proj_id + row.zbxx_id + row.proj_name
        )
        return
      }
      let { href } = this.$router.resolve({
        path: `/yjDet?login_service_id=${
          this.$route.query.login_service_id
        }&qymc=${this.$route.query.qymc}&proj_id=${
          row.proj_id
        }&source=${source}`
      })
      window.open(href, '业绩详情' + row.proj_name + row.proj_id + source)
    },
    open_zbyj(row) {
      //   let gsmc = this.$route.query.gsmc
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?login_service_id=${
          this.$route.query.login_service_id
        }&qymc=${this.$route.query.qymc}&zbgs_id=${row.id}&zbxx_id=${
          row.zbxx_id
        }&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
      })
      window.open(href, '中标公示' + row.id + row.zbxx_id + row.xmmc)
    },
    // 搜索
    onSearch() {}
  }
}
</script>
<style lang="less" scoped>
/* 动画 */
.transitionFadediv-leave-active,
.transitionFadediv-enter-active {
  transition: opacity 0.2s;
}
.transitionFadediv-enter,
.transitionFadediv-leave-to {
  opacity: 0;
}
.content_everyDiv {
  position: relative;
  > div {
    margin-bottom: 20px;
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
  }
}
.link_color {
  color: rgb(58, 142, 230);
  cursor: pointer;
}
.tittle {
  text-align: center;
  padding: 14px 0;
  box-shadow: 0px 0px 5px #e0e0e0;
  font-size: 32px;
}
.centent {
  width: 1200px;
  margin: 20px auto;
}
.btn_img {
  display: inline-block;
  background-color: #fafafa;
  text-align: center;
  line-height: 50px;
}
.btn:first-child {
  margin-left: 0;
}
.btn {
  font-size: 24px;
  width: 220px;
  margin-left: 25px;
}
.fl_div {
  border: 1px solid #d5d5d5;
  padding: 8px;
  .row {
    font-size: 14px;
    display: flex;
    .title {
      cursor: pointer;
      div {
        margin-right: 10px;
        padding: 4px 6px;
        border-radius: 4px;
      }
      div:hover {
        background-color: rgba(52, 139, 218, 1);
        color: #ffffff;
        .color_blue {
          color: #ffffff;
        }
      }
      div.selected {
        background-color: rgba(52, 139, 218, 1);
        color: #ffffff;
        .color_blue {
          color: #ffffff;
        }
      }
    }
    .value {
      flex: 1;
    }
  }
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
.hover_div {
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  margin: 0 6px 8px 0;
  padding: 4px 6px;
  border-radius: 4px;
}
.color_blue {
  color: rgba(52, 139, 218, 1);
}
.selectedNav {
  background-color: rgba(52, 139, 218, 1);
  color: #ffffff;
  .color_blue {
    color: #ffffff;
  }
}
.hover_div:hover {
  background-color: rgba(52, 139, 218, 1);
  color: #ffffff;
}
.hover_div:hover .color_blue {
  color: #ffffff;
}
.el-form-item {
  margin-bottom: 10px;
}
.selectedText {
  background-color: rgba(52, 139, 218, 1);
  color: #ffffff;
  .color_blue {
    color: #ffffff;
  }
}
.icon_gs {
  background-size: cover;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
@media screen and (max-width: 1200px) {
  .centent {
    width: 100%;
  }
  .btn {
    font-size: 14px;
  }
}
.zz_ul {
  margin-top: 10px;
  height: 100%;
  border: 1px solid #ebeef5;
  .count {
    float: right;
    display: inline-block;
    // background-color: #d5d5d5;
    // position: absolute;
    // right: 0;
  }
}
.zz_box{
  // height: 500px;
  // overflow-y: auto;

}
</style>
