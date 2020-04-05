<template>
  <div class="bid_research">
    <h1>{{edit.xmmc}}</h1>
    <el-row style="margin:20px 0;">
      <el-col :span="10" :offset="7">
        <div class="plan-top">
          <span>当前人工审核方案:</span>
          <label>{{now_sh_planData?now_sh_planData.node_name:''}}</label>
          <div style="display:inline-block;margin:0 20px">
            <span>预研方案:</span>
            <el-select @change="onChangePLan" size="medium" v-model="nowPlanData.selectVal">
              <el-option v-for="item in planList2" :key="item.id" :label="item.node_name" :value="item.id"></el-option>
            </el-select>
          </div>
        </div>
        <!-- <span>标书方案:</span>
        <el-select @change="onChangePLan" size="medium" v-model="threads.selectVal">
          <el-option v-for="item in threads.data" :key="item.id" :label="item.node_name" :value="item.id"></el-option>
        </el-select> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <audit-table v-loading="count_ajax >=2 ? false : true" @changeStateTrue="changeStateTrue" @changeStateFalse="changeStateFalse" v-on:changeYshData="changeYshData" v-on:fnAddCompanyToProject="fnAddCompanyToProject" v-on:auditNoAudit="ajaxOnYesorNoList" :yshData="yesGsData" :wshData="noGsData" :allData="allGsData" :operationState="operationState"></audit-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div style="margin:50px 0">
          <carousel-card height="900px">
            <carousel-item>
              <div class="diplay-flex-column">
                <p class="table-title" style="color:#2f80d1">人工审核已通过公司集合</p>
                <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
                  <el-form-item style="width:180px">
                    <el-input clearable @clear="onSearch('ajaxYesGetedGsList','yesGetedGsData')" placeholder="公司名称" v-model="yesGetedGsData.formData.gsmc" @keydown.enter.native="onSearch('ajaxYesGetedGsList','yesGetedGsData')"></el-input>
                  </el-form-item>
                  <el-form-item style="width:110px">
                    <el-select placeholder="不限制" v-model="yesGetedGsData.formData.areaTypeVal" @change="onChangeArea('ajaxYesGetedGsList','yesGetedGsData')">
                      <el-option label="不限制" value="0"></el-option>
                      <el-option label="川内企业" value="1"></el-option>
                      <el-option label="入川企业" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSearch('ajaxYesGetedGsList','yesGetedGsData')">
                      查询
                    </el-button>
                    <el-button @click="onResetForm('ajaxYesGetedGsList','yesGetedGsData')">
                      重置
                    </el-button>

                  </el-form-item>
                  <el-form-item style="width:120px;margin-left:20px;">
                    <el-select placeholder="选择" v-model="yesGetedGsData.formData.fp_bs_sh">
                      <el-option key="1" label="分配" value="分配"></el-option>
                      <el-option key="2" label="标书制作" value="标书制作"></el-option>
                      <el-option key="3" label="人工审核" value="人工审核"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="width:110px">
                    <el-select placeholder="选择人员" v-model="yesGetedGsData.formData.ryVal" @change="onDistribute_button('all','ajaxYesGetedGsList',yesGetedGsData.formData.ryVal,yesGetedGsData.selectRows,'audit_user_id','',yesGetedGsData.formData.fp_bs_sh)">
                      <el-option label value></el-option>
                      <el-option v-for="item in allUsers[yesGetedGsData.formData.fp_bs_sh]" :key="item.id" :label="item.username" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                  </el-form-item>
                  <el-form-item style="margin-left:20px;">
                    <el-select style="width:200px" filterable placeholder="方案" v-model="yesGetedGsData.formData.planVal">
                      <el-option label value></el-option>
                      <el-option v-for="item in planList" :key="item.id" :label="item.node_name" :value="item.id"></el-option>
                    </el-select>
                    <el-button type="primary" @click="onExecutePlan('yesGetedGsData','ajaxYesGetedGsList',yesGetedGsData.formData.planVal)">执行方案</el-button>
                    <el-button type="success" @click="set_newPlan('tj')">添加验证</el-button>
                    <el-select style="width:150px;margin-left:20px;" v-model="open_close" placeholder="开通或关闭展示" @change="onIsDisplay('','ajaxYesGetedGsList',yesGetedGsData.selectRows)">
                      <el-option label="开通展示" value="yes"></el-option>
                      <el-option label="取消开通" value="no"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="position:absolute;right:0px;">
                    <el-button type="danger" @click="onDeleteGs('all','ajaxYesGetedGsList','yesGetedGsData')">批量删除</el-button>
                  </el-form-item>
                </el-form>
                <div style="flex:1">
                  <el-table height="700px" border :data="yesGetedGsData.rows" v-loading="yesGetedGsData.loading" @select-all="onSelect_yesGetedGsRows" @select="onSelect_yesGetedGsRows">
                    <el-table-column type="selection" width="50px" align="center"></el-table-column>

                    <el-table-column type="index" width="50px" label="序号" align="center">
                      <template slot-scope="scope">{{scope.$index+(yesGetedGsData.page-1)*yesGetedGsData.row+1}}</template>
                    </el-table-column>
                    <el-table-column prop="gsmc" label="公司名称" align="center">
                      <template slot-scope="scope">
                        <div style="display:flex">
                          <div class="link_text" @click="openGs(scope.row)">{{scope.row.gsmc}}</div>
                          <div style="padding-left:2px">
                            <i v-if="scope.row.take_sign==1 || scope.row.take_sign==2" style="color:#54e20d" class="el-icon-check"></i>
                            <i v-if="scope.row.take_sign==2" style="color:#54e20d" class="el-icon-check"></i>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="human_user" width="90px" label="审核人员" align="center">
                      <template slot-scope="scope">
                        <change-ry :ry_list="allUsers" :extraObj="{type:'人工审核',ajaxFn:'ajaxYesGetedGsList',dataObj:'yesGetedGsData',ry_type:'human_user_id'}" :row="scope.row" :ry="scope.row.human_user" @onSelect="onListInSelect"></change-ry>
                      </template>
                    </el-table-column>
                    <el-table-column prop="audit_user" width="100px" label="拿公司人员" align="center">
                      <template slot-scope="scope">
                        <change-ry :ry_list="allUsers" :extraObj="{type:'分配',ajaxFn:'ajaxYesGetedGsList',dataObj:'yesGetedGsData',ry_type:'audit_user_id'}" :row="scope.row" :ry="scope.row.audit_user" @onSelect="onListInSelect"></change-ry>
                      </template>
                    </el-table-column>
                    <el-table-column prop="tender_user" width="110px" label="制作标书人员" align="center">
                      <template slot-scope="scope">
                        <change-ry :ry_list="allUsers" :extraObj="{type:'标书制作',ajaxFn:'ajaxYesGetedGsList',dataObj:'yesGetedGsData',ry_type:'tender_user_id'}" :row="scope.row" :ry="scope.row.tender_user" @onSelect="onListInSelect"></change-ry>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="已选方案" align="center"></el-table-column>
                    <el-table-column prop="sign" label="条件满足概况" align="center">
                      <template slot-scope="scope">
                        <div @click="onCheckResult(scope.row)" style="cursor:pointer">
                          <el-button :style="{'color':item.status?'#5daf34':'red'}" type="text" size="medium" v-for="item in scope.row.sign" :key="item.id">{{item.name}}{{item.count?'('+item.count+'个)':''}}</el-button>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="display" width="150px" label="是否已开通展示" align="center">
                      <template slot-scope="scope">
                        <el-button v-if="scope.row.display == 1" size="mini" type="success" icon="el-icon-check" circle @click="onIsDisplay('no','ajaxYesGetedGsList',[scope.row],'one')"></el-button>
                        <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onIsDisplay('yes','ajaxYesGetedGsList',[scope.row],'one')"></el-button>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100px" align="center">
                      <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="onDeleteGs('one','ajaxYesGetedGsList',scope.row.gs_id)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-pagination style="margin-top:20px" :current-page.sync="yesGetedGsData.page" @current-change="yesGetedGsChangePage" @size-change="yesGetedGsChangeSize" align="right" background layout="sizes,total,prev, pager, next" :total="yesGetedGsData.total"></el-pagination>
              </div>
            </carousel-item>

            <carousel-item>
              <div class="diplay-flex-column">
                <p class="table-title" style="color:#2f80d1">审核人员集合</p>
                <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
                  <el-form-item :label="'添加'+this.user_cate+'人员'">
                    <el-select placeholder="选择" v-model="getedRyData.formData.ryVal">
                      <el-option v-for="item in allUsers[user_cate]" :key="item.id" :label="item.username" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="onAddRyList">确定</el-button>
                    <el-button @click="onDeleteRy('all')">批量取消人员</el-button>
                  </el-form-item>
                </el-form>
                <div style="flex:1">
                  <el-table height="700px" border :data="getedRyData.tableList" v-loading="getedRyData.loading" @select-all="onSelect_getedRyRows" @select="onSelect_getedRyRows">
                    <el-table-column type="selection" width="50px" align="center"></el-table-column>
                    <el-table-column type="index" width="60" label="序号" align="center">
                      <template slot-scope="scope">{{scope.$index+(getedRyData.page-1)*getedRyData.row+1}}</template>
                    </el-table-column>

                    <el-table-column prop="user_name" label="人员" align="center"></el-table-column>
                    <el-table-column prop="person_check" label="人工审核" align="center">
                      <template slot-scope="scope">
                        <el-button v-if="scope.row.person_check == 1" size="mini" type="success" icon="el-icon-check" circle @click="onRySwitch(scope.row,'no',scope.row.person_check_group_id)"></el-button>
                        <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onRySwitch(scope.row,'yes',scope.row.person_check_group_id)"></el-button>
                      </template>
                    </el-table-column>
                    <el-table-column label="所负责公司" align="center">
                      <template slot-scope="scope">
                        <el-button :type="scope.row.hasCompany==1 ? 'primary' : ''" size="mini" @click="onGetUserGsList(scope.row)">查看</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300px" align="center">
                      <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="sendMessage(scope.row)">短信提醒</el-button>
                        <el-button type="danger" size="mini" @click="onDeleteRy('one',scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-pagination style="margin-top:20px" @current-change="getedRyChangePage" @size-change="getedRyChangeSize" align="right" background layout="sizes,total,prev, pager, next" :total="getedRyData.total"></el-pagination>
              </div>
            </carousel-item>
            <carousel-item>
              <div class="diplay-flex-column">
                <p class="table-title" style="color:red">人工审核未通过公司集合</p>
                <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
                  <el-form-item style="width:180px">
                    <el-input clearable @clear="onSearch('ajaxNoGetedGsList','noGetedGsData')" placeholder="公司名称" v-model="noGetedGsData.formData.gsmc" @keydown.enter.native="onSearch('ajaxNoGetedGsList','noGetedGsData')"></el-input>
                  </el-form-item>
                  <el-form-item style="width:110px">
                    <el-select placeholder="不限制" v-model="noGetedGsData.formData.areaTypeVal" @change="onChangeArea('ajaxNoGetedGsList','noGetedGsData')">
                      <el-option label="不限制" value="0"></el-option>
                      <el-option label="川内企业" value="1"></el-option>
                      <el-option label="入川企业" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSearch('ajaxNoGetedGsList','noGetedGsData')">
                      查询
                    </el-button>
                    <el-button @click="onResetForm('ajaxNoGetedGsList','noGetedGsData')">
                      重置
                    </el-button>

                  </el-form-item>
                  <el-form-item style="width:120px;margin-left:20px;">
                    <el-select placeholder="选择" v-model="noGetedGsData.formData.fp_bs_sh">
                      <el-option key="1" label="分配" value="分配"></el-option>
                      <el-option key="2" label="标书制作" value="标书制作"></el-option>
                      <el-option key="3" label="人工审核" value="人工审核"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="width:110px">
                    <el-select placeholder="选择人员" v-model="noGetedGsData.formData.ryVal" @change="onDistribute_button('all','ajaxNoGetedGsList',noGetedGsData.formData.ryVal,noGetedGsData.selectRows,'audit_user_id','',noGetedGsData.formData.fp_bs_sh)">
                      <el-option label value></el-option>
                      <el-option v-for="item in allUsers[noGetedGsData.formData.fp_bs_sh]" :key="item.id" :label="item.username" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                  </el-form-item>
                  <el-form-item style="margin-left:20px;">
                    <el-select style="width:200px" filterable placeholder="方案" v-model="noGetedGsData.formData.planVal">
                      <el-option label value></el-option>
                      <el-option v-for="item in planList" :key="item.id" :label="item.node_name" :value="item.id"></el-option>
                    </el-select>
                    <el-button type="primary" @click="onExecutePlan('noGetedGsData','ajaxNoGetedGsList',noGetedGsData.formData.planVal)">执行方案</el-button>
                    <el-button type="success" @click="set_newPlan('tj')">添加验证</el-button>
                    <el-select style="width:150px;margin-left:20px;" v-model="open_close" placeholder="开通或关闭展示" @change="onIsDisplay('','ajaxNoGetedGsList',noGetedGsData.selectRows)">
                      <el-option label="开通展示" value="yes"></el-option>
                      <el-option label="取消开通" value="no"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="position:absolute;right:0px;">
                    <el-button type="danger" @click="onDeleteGs('all','ajaxNoGetedGsList','noGetedGsData')">批量删除</el-button>
                  </el-form-item>
                </el-form>
                <div style="flex:1">
                  <el-table height="700px" border :data="noGetedGsData.rows" v-loading="noGetedGsData.loading" @select-all="onSelect_noGetedGsRows" @select="onSelect_noGetedGsRows">
                    <el-table-column type="selection" width="50px" align="center"></el-table-column>

                    <el-table-column type="index" width="50px" label="序号" align="center">
                      <template slot-scope="scope">{{scope.$index+(noGetedGsData.page-1)*noGetedGsData.row+1}}</template>
                    </el-table-column>
                    <el-table-column prop="gsmc" label="公司名称" align="center">
                      <template slot-scope="scope">
                        <div class="link_text" @click="openGs(scope.row)">{{scope.row.gsmc}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="human_user" label="审核人员" align="center">
                      <template slot-scope="scope">
                        <change-ry :ry_list="allUsers" :extraObj="{type:'人工审核',ajaxFn:'ajaxNoGetedGsList',dataObj:'noGetedGsData',ry_type:'human_user_id'}" :row="scope.row" :ry="scope.row.human_user" @onSelect="onListInSelect"></change-ry>
                      </template>
                    </el-table-column>
                    <el-table-column prop="audit_user" label="拿公司人员" align="center">
                      <template slot-scope="scope">
                        <change-ry :ry_list="allUsers" :extraObj="{type:'分配',ajaxFn:'ajaxNoGetedGsList',dataObj:'noGetedGsData',ry_type:'audit_user_id'}" :row="scope.row" :ry="scope.row.audit_user" @onSelect="onListInSelect"></change-ry>
                      </template>
                    </el-table-column>
                    <el-table-column prop="tender_user" label="制作标书人员" align="center">
                      <template slot-scope="scope">
                        <change-ry :ry_list="allUsers" :extraObj="{type:'标书制作',ajaxFn:'ajaxNoGetedGsList',dataObj:'noGetedGsData',ry_type:'tender_user_id'}" :row="scope.row" :ry="scope.row.tender_user" @onSelect="onListInSelect"></change-ry>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="已选方案" align="center"></el-table-column>
                    <el-table-column prop="sign" label="条件满足概况" align="center" width="300px">
                      <template slot-scope="scope">
                        <div @click="onCheckResult(scope.row)" style="cursor:pointer">
                          <el-button :style="{'color':item.status?'#5daf34':'red'}" type="text" size="medium" v-for="item in scope.row.sign" :key="item.id">{{item.name}}{{item.count?'('+item.count+'个)':''}}</el-button>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="display" label="是否已开通展示" align="center">
                      <template slot-scope="scope">
                        <el-button v-if="scope.row.display == 1" size="mini" type="success" icon="el-icon-check" circle @click="onIsDisplay('no','ajaxNoGetedGsList',[scope.row],'one')"></el-button>
                        <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onIsDisplay('yes','ajaxNoGetedGsList',[scope.row],'one')"></el-button>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="onDeleteGs('one','ajaxNoGetedGsList',scope.row.gs_id)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-pagination style="margin-top:20px" :current-page.sync="noGetedGsData.page" @current-change="noGetedGsChangePage" @size-change="noGetedGsChangeSize" align="right" background layout="sizes,total,prev, pager, next" :total="noGetedGsData.total"></el-pagination>
              </div>
            </carousel-item>
          </carousel-card>
        </div>
      </el-col>
    </el-row>
    <div v-if="research_plan.dialogVisible">
      <el-dialog title="新建方案" :visible.sync="research_plan.dialogVisible" width="50%">
        <bid-new-plan v-on:closeDialog="closeDialog" v-on:onSubmitNewPlan="onSubmitNewPlan" :data="{jbxx_id:research_plan.id,name:research_plan.name,tab:'bidResearch'}"></bid-new-plan>
      </el-dialog>
    </div>
    <div v-if="jbxx.dialogVisible">
      <el-dialog :visible.sync="jbxx.dialogVisible" width="50%">
        <bid-jbxx :jbxxId="jbxx_id"></bid-jbxx>
      </el-dialog>
    </div>
    <!-- 负责公司的弹框 -->
    <el-dialog title="编辑组件" :visible.sync="userGslist.templateData.dialogEditVisible">
      <el-select style="width:250px" multiple collapse-tags placeholder="选择组件" v-model="userGslist.templateData.val">
        <el-option v-for="item in userGslist.templateData.list" :key="item.id" :label="item.title" :value="item.id"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userGslist.templateData.dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTemplateSave">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="负责公司" :visible.sync="userGslist.dialogVisible" top="50px">
      <el-table :data="userGslist.tableList" style="width: 100%" border>
        <el-table-column type="index" width="60" label="序号" align="center">
          <template slot-scope="scope">{{scope.$index+(userGslist.page-1)*userGslist.row+1}}</template>
        </el-table-column>
        <el-table-column prop="gsmc" label="公司名称" align="center">
          <template slot-scope="scope">
            <div class="link_text" @click="openGs(scope.row)">{{scope.row.gsmc}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="onDeleUserGs(scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination align="right" @current-change="changePageUserGsList" :current-page.sync="userGslist.page" background layout="total,prev, pager, next" :total="userGslist.total" class="pagination"></el-pagination>

    </el-dialog>
  </div>
</template>
<script>
import bidNewPlan from './template/bid_newPlan.vue'
import bidJbxx from './template/bid_jbxx.vue'
import itemConfig from './ItemConfig2.vue'
import changeRy from './template/changeRy.vue'
import AuditTable from './template/AuditTable.vue'
import { getDate } from './../store/formatter'
import carouselCard from './sonPage/carouselCard.vue'
import carouselItem from './sonPage/carouselItem.vue'

export default {
  components: {
    bidNewPlan,
    itemConfig,
    changeRy,
    AuditTable,
    carouselCard,
    carouselItem
  },
  data() {
    return {
      operationState: true,
      //当前人工审核方案信息
      human_id: this.$route.query.human_id,
      now_sh_planData: '',
      nowPlanData: {
        selectVal: this.$route.query.thread_id || '',
        name: '',
        thread_id: '',
        node_name: ''
      },
      closeDialog: false,
      open_close: '',
      count_ajax: 0,
      thread_id: '',
      jbxx_id: '117',
      cate: '1',
      edit: {
        xmmc: '11'
      },
      planList2: [],

      threads: {
        data: [],
        selectVal: ''
      },
      research_plan: {
        dialogVisible: false,
        name: '',
        id: '',
        tab: 'bidResearch'
      },
      jbxx: {
        dialogVisible: false
      },
      dragging: null,
      yesTable: [{}],
      // 已审核数据
      yesGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0',
          ryVal: '',
          fp_bs_sh: '人工审核'
        },
        selectRows: [],
        page: 1,
        total: 0,
        row: 10,
        zbMinNum: '',
        zbMaxNum: '',
        tbMinNum: '',
        tbMaxNum: '',
        rows: [],
        table: {},
        loading: true,
        jbxx_id: '',
        order: 'desc',
        ordername: 'activity ',
        gsgzType: '',
        tableNewData: ''
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
        zbMinNum: '',
        zbMaxNum: '',
        tbMinNum: '',
        tbMaxNum: '',
        loading: true,
        jbxx_id: '',
        order: 'desc',
        ordername: 'activity ',
        gsgzType: '',
        tableNewData: ''
      },
      //全部公司数据
      allGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0',
          ryVal: '',
          fp_bs_sh: '人工审核'
        },
        selectRows: [],
        rows: [],
        loading: true,
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
          planVal: '',
          fp_bs_sh: '人工审核'
        },
        selectRows: [],
        rows: [],
        loading: false,
        page: 1,
        total: 0,
        row: 10
      },
      //未拿到公司集合
      noGetedGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0' /*川内川外地区*/,
          ryVal: '',
          planVal: '',
          fp_bs_sh: '人工审核'
        },
        row: 10,
        page: 1,
        total: 0,
        selectRows: [],
        rows: [],
        loading: false
      },
      //人员集合
      getedRyData: {
        formData: {
          ryVal: ''
        },
        rows: [],
        selectRows: [],
        loading: false,
        page: 1,
        row: 10,
        total: 0
      },
      planList: [],
      allUsers: [],
      user_cate: '人工审核',
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
      }
    }
  },
  created() {
    const self_ = this
    window.addEventListener(
      'message',
      function(event) {
        //父接受
        if (event.data == '刷新') {
          self_.getPlans(1)
          self_.getPlans(3)
        }
      },
      false
    )
  },
  mounted() {
    this.jbxx_id = this.$route.query.jbxx_id
    this.yesGsData.jbxx_id = this.$route.query.jbxx_id
    this.noGsData.jbxx_id = this.$route.query.jbxx_id
    this.yesGsData.thread_id = this.$route.query.thread_id
    this.noGsData.thread_id = this.$route.query.thread_id
    this.thread_id = this.$route.query.thread_id
    this.pid = this.$route.query.thread_id
    this.fn_edit()
    // this.getThreads()
    this.ajaxGetUser()
    // this.getPlans(1) //预研
    // this.getPlans(3) //全部
    // this.ajaxAllGsList()
    this.ajaxYesGetedGsList()
    this.ajaxNoGetedGsList()
    this.ajaxGetedRyList()
    this.ajaxGetTemplate()
    // this.getNode()
    // this.ajaxYesGsList()
    // this.ajaxNoGsList()
    this.getNowPlan()
  },

  methods: {
    changeStateTrue(dataObj) {
      this[dataObj].tableNewData = ''
      this.operationState = true
    },
    changeStateFalse() {
      this.operationState = false
    },
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
    //获取节点
    getNode() {
      this.axios.post(
        '/index/company/node',
        {
          thread_id: this.human_id,
          jbxx_id: this.jbxx_id
        },
        data => {
          data.forEach(v => {
            if (v.name == '业绩') {
              this.node.yj_node = v.id
            } else if (v.name == '人员') {
              this.node.ry_node = v.id
            } else if (v.name == '资质') {
              this.node.zz_node = v.id
            }
          })
        }
      )
    },
    //获取组件列表
    ajaxGetTemplate() {
      this.axios.post(
        '/index/element_set/getComponent',
        {
          user_cate: this.user_cate
        },
        data => {
          this.userGslist.templateData.list = data.message
        }
      )
    },
    onSelect_getedRyRows(rows) {
      this.getedRyData.selectRows = rows
    },
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
    //添加人员集合
    onAddRyList() {
      // let username = ''
      // if (this.getedRyData.formData.ryVal) {
      //   username = this.allUsers[this.user_cate].filter(
      //     v => v.id == this.getedRyData.formData.ryVal
      //   )[0].username
      // }
      // this.axios.post(
      //   '/index/element_set/personAllot',
      //   {
      //     username,
      //     jbxx_id: this.jbxx_id,
      //     user_id: this.getedRyData.formData.ryVal,
      //     level_id: '',
      //     group_id: '',
      //     type: 1,
      //     diff: this.user_cate
      //   },
      //   data => {
      //     this.getedRyData.formData.ryVal = ''
      //     this.ajaxGetedRyList()
      //   }
      // )
      let user_name = this.allUsers[this.user_cate].filter(
        v => this.getedRyData.formData.ryVal == v.id
      )
      user_name = user_name[0].username
      this.axios.post(
        '/index/Human_Allot/addCompanyToHuman',
        {
          company_id: localStorage.getItem('company_id'),
          jbxx_id: this.jbxx_id,
          user_id: this.getedRyData.formData.ryVal,
          human_id: this.human_id,
          username: user_name,
          type: 1,
          diff: this.user_cate
        },
        data => {
          this.ajaxGetedRyList()
        }
      )
    },
    //保存修改组件
    onTemplateSave() {
      let username = ''
      if (this.selected_row.user_id) {
        username = this.allUsers[this.user_cate].filter(
          v => v.id == this.selected_row.user_id
        )[0].username
      }
      this.axios.post(
        '/index/element_set/personAllot',
        {
          username,
          jbxx_id: this.jbxx_id,
          user_id: this.selected_row.user_id,
          level_id: this.selected_row.level_id,
          group_id: this.userGslist.templateData.val.join(','),
          type: 2,
          diff: this.user_cate
        },
        data => {
          this.userGslist.templateData.dialogEditVisible = false
          this.ajaxGetedRyList()
          this.$message.success('修改成功')
        }
      )
    },
    computeKnow(d) {
      return d.map(v => {
        return {
          id: v.user_id,
          username: v.username
        }
      })
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
    //未拿到公司集合
    ajaxNoGetedGsList() {
      this.noGetedGsData.loading = true
      this.axios.post(
        '/index/Human_Allot/getHumanCompany',
        {
          user_cate: this.user_cate,
          valid: 2,
          jbxx_id: this.jbxx_id,
          human_id: this.human_id,
          gsmc: this.noGetedGsData.formData.gsmc,
          scale: this.noGetedGsData.formData.areaTypeVal,
          rows: this.noGetedGsData.row,
          page: this.noGetedGsData.page
        },
        data => {
          if (this.noGetedGsData.page > 1 && data.status == 'failed') {
            this.noGetedGsData.page -= 1
            this.ajaxNoGetedGsList()
            return
          }
          this.noGetedGsData.loading = false
          this.noGetedGsData.rows = data.rows || []
          this.noGetedGsData.total = data.total || 0
          this.noGetedGsData.selectRows = []
        }
      )
    },
    //拿公司人员集合
    ajaxGetedRyList() {
      this.getedRyData.loading = true
      this.axios.post(
        '/index/Human_Allot/getHumanUser',
        {
          jbxx_id: this.jbxx_id,
          type: this.user_cate,
          human_id: this.human_id,
          rows: this.getedRyData.row,
          page: this.getedRyData.page
        },
        data => {
          if (
            this.getedRyData.page > 1 &&
            data.rows.length == 0 &&
            data.status == 'success'
          ) {
            this.getedRyData.page -= 1
            this.ajaxGetedRyList()
            return
          }
          this.getedRyData.loading = false
          this.getedRyData.tableList = data.rows || []
          this.getedRyData.total = data.total || 0
          this.getedRyData.selectRows = []
        }
      )
    },
    //获取当前方案信息
    getNowPlan() {
      this.axios.post(
        '/Index/Human_Allot/getPlan',
        {
          human_id: this.human_id
        },
        data => {
          if (data.status == 'success') {
            this.now_sh_planData = data.rows
          }
          this.getPlans(1)
          this.getPlans(3)
        }
      )
    },
    //获取方案列表
    getPlans(cate) {
      this.axios.post(
        '/Index/thread/getThread',
        {
          jbxx_id: this.jbxx_id,
          cate: cate
        },
        data => {
          if (data.status == 'success') {
            if (cate == 1) {
              this.threads.data = data.rows
              this.threads.selectVal = this.$route.query.thread_id - 0
              this.thread_id = this.$route.query.thread_id - 0

              this.planList2 = data.rows
              let filterObj = data.rows.filter(
                v => v.id == this.now_sh_planData.thread_id
              )
              this.nowPlanData.selectVal = this.thread_id || data.rows[0].id
              if (!this.thread_id) {
                this.thread_id = data.rows[0].id
              }
              // if (filterObj.length > 0) {
              //   this.nowPlanData.node_name = filterObj[0].node_name
              //   this.nowPlanData.selectVal = filterObj[0].id
              // } else {
              //   this.nowPlanData.node_name = data.rows[0].node_name
              //   this.nowPlanData.selectVal = data.rows[0].id
              // }
              this.ajaxYesGsList()
              this.ajaxNoGsList()
              this.getNode()
            } else {
              this.planList = data.rows
            }
          } else {
            this.planList = []
            this.planList2 = []
          }
        }
      )
    },
    onSelect_yesGetedGsRows(rows) {
      this.yesGetedGsData.selectRows = rows
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

    show_jbxx() {
      this.jbxx.dialogVisible = true
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
          document.title = '审核：' + this.edit.xmmc
          this.gsgj.dataset = {
            xmlxB: this.edit.xmlxB,
            xmdq: this.edit.area,
            max_date: getDate('new')
          }
          this.gsxw.dataset = {
            xmyz: this.edit.xmyzdw,
            area: this.edit.area.split(','),
            maxTime: getDate('new')
          }
        }
      )
    },
    getThreads() {
      this.axios.post(
        '/Index/thread/getThread',
        {
          jbxx_id: this.jbxx_id,
          cate: this.cate
        },
        data => {
          if (data.status == 'success') {
            this.threads.data = data.rows
            this.threads.selectVal = this.$route.query.thread_id - 0
            this.thread_id = this.$route.query.thread_id - 0
          }
        }
      )
    },
    onChangePLan(v) {
      let research = this.$router.resolve({
        path: `/configsh?jbxx_id=${this.jbxx_id}&human_id=${
          this.human_id
        }&thread_id=${v}`
      })
      window.open(research.href, '_self')
      location.reload()
    },
    set_newPlan(type) {
      this.research_plan.type = type
      this.research_plan.dialogVisible = true
      this.research_plan.name = this.getDate() + '_'
      this.research_plan.id = this.jbxx_id
    },
    onSubmitNewPlan(data) {
      console.log(data)
      this.research_plan.dialogVisible = false
      if (data) {
        let params = {
          jbxx_id: this.research_plan.id,
          name: data.trim(),
          cate: 2
        }
        if (params.name.length == 0 || params.name.length > 15) {
          this.$message.error('请修改方案名称在15个字之内')
          return
        }
        this.axios.post('/index/thread/newPlan', params, data => {
          if (data.status == 'success') {
            this.research_plan.dialogVisible = false
            if (this.research_plan.type == 'tj') {
              let { href } = this.$router.resolve({
                path: `/iteminfo/ItemConfigNew?jbxx_id=${
                  this.jbxx_id
                }&thread_id=${data.message}`
              })
              window.open(href, `${this.jbxx_id}${data.message}`)
            } else {
              let { href } = this.$router.resolve({
                path: `/bidResearch?jbxx_id=${this.jbxx_id}&thread_id=${
                  data.message
                }`
              })
              window.open(href, `${this.jbxx_id}${data.message}`)
            }
          } else {
            this.$message.error(data.message)
          }
        })
      }
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
      return year.toString() + month.toString() + day.toString()
    },

    changeYshData(data, newData) {
      console.log(data, '----changeYshData')
      //组件操作
      this.operationState = true
      this[data.dataObj].tableNewData = newData
        ? newData
        : this[data.dataObj].tableNewData
      this[data.dataObj].formData.gsmc = data.gsmc
      this[data.dataObj].formData.areaTypeVal = data.scale
      this[data.dataObj].row = data.rows
      this[data.dataObj].page = data.page
      this[data.dataObj].order = data.order
      this[data.dataObj].ordername = data.ordername
      this[data.dataObj].loading = false
      this[data.dataObj].gsgzType = data.gsgzType
      this[data.dataObj].zbMinNum = data.zbminNum ? data.zbminNum : ''
      this[data.dataObj].zbMaxNum = data.zbmaxNum ? data.zbmaxNum : ''
      this[data.dataObj].tbMinNum = data.tbminNum ? data.tbminNum : ''
      this[data.dataObj].tbMaxNum = data.tbmaxNum ? data.tbmaxNum : ''
      if (this.operationState) {
        if (data.dataObj == 'yesGsData' || data.dataObj == 'noGsData') {
          if (this[data.dataObj].table['公司工具']) {
            if (newData) {
              for (let item in this[data.dataObj].table['公司工具']) {
                if (newData[item].label !== '') {
                  this[data.dataObj].table['公司工具'][item].lable =
                    newData[item].name
                }
              }
            }
          }
        }
      }
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
    // 已审核公司集合
    ajaxYesGsList() {
      let queryObj = {
        user_cate: this.user_cate,
        jbxx_id: this.jbxx_id,
        id: this.thread_id,
        gsmc: this.yesGsData.formData.gsmc,
        scale: this.yesGsData.formData.areaTypeVal,
        type: 1,
        rows: this.yesGsData.row,
        page: this.yesGsData.page,
        order: this.yesGsData.order,
        ordername: this.yesGsData.ordername,
        search: this.yesGsData.gsgzType,
        minzbNumber: this.yesGsData.zbMinNum,
        maxzbNumber: this.yesGsData.zbMaxNum,
        mintbNumber: this.yesGsData.tbMinNum,
        maxtbNumber: this.yesGsData.tbMaxNum
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
        if (this.yesGsData.table['公司工具']) {
          for (let item in this.yesGsData.table['公司工具']) {
            if (item == 'scxw1') {
              if (this.yesGsData.table['公司工具'][item].type == 0) {
                this.yesGsData.table['公司工具'][item].lable =
                  "该时间内<span class='el-icon-close'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 1) {
                this.yesGsData.table['公司工具'][item].lable =
                  "该时间内<span class='el-icon-check'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 2) {
                this.yesGsData.table['公司工具'][item].lable = '该时间内不限'
              }
            } else if (item == 'scxw2') {
              if (this.yesGsData.table['公司工具'][item].type == 0) {
                this.yesGsData.table['公司工具'][item].lable =
                  "历年该地区<span class='el-icon-close'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 1) {
                this.yesGsData.table['公司工具'][item].lable =
                  "历年该地区<span class='el-icon-check'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 2) {
                this.yesGsData.table['公司工具'][item].lable = '历年该地区不限'
              }
            } else if (item == 'scxw3') {
              if (this.yesGsData.table['公司工具'][item].type == 0) {
                this.yesGsData.table['公司工具'][item].lable =
                  "近一年半<span class='el-icon-close'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 1) {
                this.yesGsData.table['公司工具'][item].lable =
                  "近一年半<span class='el-icon-check'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 2) {
                this.yesGsData.table['公司工具'][item].lable = '近一年半不限'
              }
            } else if (item == 'zssl1') {
              if (this.yesGsData.table['公司工具'][item].type == 0) {
                this.yesGsData.table['公司工具'][item].lable =
                  "项目小于金额<span class='el-icon-close'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 1) {
                this.yesGsData.table['公司工具'][item].lable =
                  "项目大于金额<span class='el-icon-check'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 2) {
                this.yesGsData.table['公司工具'][item].lable = '项目金额不限'
              }
            } else if (item == 'zssl2') {
              if (this.yesGsData.table['公司工具'][item].type == 0) {
                this.yesGsData.table['公司工具'][item].lable =
                  "业绩小于金额<span class='el-icon-close'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 1) {
                this.yesGsData.table['公司工具'][item].lable =
                  "业绩大于金额<span class='el-icon-check'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 2) {
                this.yesGsData.table['公司工具'][item].lable = '业绩金额不限'
              }
            } else if (item == 'ywfx') {
              if (this.yesGsData.table['公司工具'][item].type == 0) {
                this.yesGsData.table['公司工具'][item].lable =
                  "企业未参此类型<span class='el-icon-close'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 1) {
                this.yesGsData.table['公司工具'][item].lable =
                  "企业参此类型<span class='el-icon-check'></span>"
              }
              if (this.yesGsData.table['公司工具'][item].type == 2) {
                this.yesGsData.table['公司工具'][item].lable = '企业参与不限'
              }
            }
          }
        }
        for (let item in this.yesGsData.table['公司工具']) {
          if (this.yesGsData.tableNewData[item].label !== '') {
            this.yesGsData.table['公司工具'][
              item
            ].lable = this.yesGsData.tableNewData[item].name
          }
        }
      })
    },
    // 未审核公司集合
    ajaxNoGsList() {
      this.noGsData.loading = false
      let queryObj = {
        user_cate: this.user_cate,
        jbxx_id: this.jbxx_id,
        id: this.thread_id,
        gsmc: this.noGsData.formData.gsmc,
        scale: this.noGsData.formData.areaTypeVal,
        type: 0,
        rows: this.noGsData.row,
        page: this.noGsData.page,
        order: this.noGsData.order,
        ordername: this.noGsData.ordername,
        search: this.noGsData.gsgzType,
        minzbNumber: this.noGsData.zbMinNum,
        maxzbNumber: this.noGsData.zbMaxNum,
        mintbNumber: this.noGsData.tbMinNum,
        maxtbNumber: this.noGsData.tbMaxNum
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
        if (this.noGsData.table['公司工具']) {
          for (let item in this.noGsData.table['公司工具']) {
            if (item == 'scxw1') {
              if (this.noGsData.table['公司工具'][item].type == 0) {
                this.noGsData.table['公司工具'][item].lable =
                  "该时间内<span class='el-icon-close'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 1) {
                this.noGsData.table['公司工具'][item].lable =
                  "该时间内<span class='el-icon-check'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 2) {
                this.noGsData.table['公司工具'][item].lable = '该时间内不限'
              }
            } else if (item == 'scxw2') {
              if (this.noGsData.table['公司工具'][item].type == 0) {
                this.noGsData.table['公司工具'][item].lable =
                  "历年该地区<span class='el-icon-close'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 1) {
                this.noGsData.table['公司工具'][item].lable =
                  "历年该地区<span class='el-icon-check'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 2) {
                this.noGsData.table['公司工具'][item].lable = '历年该地区不限'
              }
            } else if (item == 'scxw3') {
              if (this.noGsData.table['公司工具'][item].type == 0) {
                this.noGsData.table['公司工具'][item].lable =
                  "近一年半<span class='el-icon-close'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 1) {
                this.noGsData.table['公司工具'][item].lable =
                  "近一年半<span class='el-icon-check'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 2) {
                this.noGsData.table['公司工具'][item].lable = '近一年半不限'
              }
            } else if (item == 'zssl1') {
              if (this.noGsData.table['公司工具'][item].type == 0) {
                this.noGsData.table['公司工具'][item].lable =
                  "项目小于金额<span class='el-icon-close'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 1) {
                this.noGsData.table['公司工具'][item].lable =
                  "项目大于金额<span class='el-icon-check'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 2) {
                this.noGsData.table['公司工具'][item].lable = '项目金额不限'
              }
            } else if (item == 'zssl2') {
              if (this.noGsData.table['公司工具'][item].type == 0) {
                this.noGsData.table['公司工具'][item].lable =
                  "业绩小于金额<span class='el-icon-close'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 1) {
                this.noGsData.table['公司工具'][item].lable =
                  "业绩大于金额<span class='el-icon-check'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 2) {
                this.noGsData.table['公司工具'][item].lable = '业绩金额不限'
              }
            } else if (item == 'ywfx') {
              if (this.noGsData.table['公司工具'][item].type == 0) {
                this.noGsData.table['公司工具'][item].lable =
                  "企业未参此类型<span class='el-icon-close'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 1) {
                this.noGsData.table['公司工具'][item].lable =
                  "企业参此类型<span class='el-icon-check'></span>"
              }
              if (this.noGsData.table['公司工具'][item].type == 2) {
                this.noGsData.table['公司工具'][item].lable = '企业参与不限'
              }
            }
          }
        }
        for (let item in this.noGsData.table['公司工具']) {
          if (this.noGsData.tableNewData[item].label !== '') {
            this.noGsData.table['公司工具'][
              item
            ].lable = this.noGsData.tableNewData[item].name
          }
        }
      })
    },
    //全部公司集合
    ajaxAllGsList() {
      this.allGsData.loading = true
      this.axios.post(
        '/index/element_set/getAllCompany',
        {
          type: this.user_cate,
          user_cate: this.user_cate,
          jbxx_id: this.jbxx_id,
          gsmc: this.allGsData.formData.gsmc,
          scale: this.allGsData.formData.areaTypeVal,
          rows: this.allGsData.row,
          page: this.allGsData.page,
          jbxx_id: this.jbxx_id,
          page: this.allGsData.page
        },
        data => {
          this.allGsData.loading = false
          this.allGsData.rows = data.rows || []
          this.allGsData.total = data.total || 0
          this.allGsData.selectRows = []
        }
      )
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
      this[dataObj].loading = true
      this.axios.post(
        '/index/Human_Allot/executePlan',
        {
          jbxx_id: this.jbxx_id,
          thread_id: planid,
          gs_id,
          name: nowPlan.node_name,
          cate: nowPlan.cate,
          case: planid ? 0 : 1
        },
        data => {
          this[ajaxFn]()
        }
      )
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
          this.axios.post(
            '/index/element_set/editCompanyToProject',
            {
              company_id: localStorage.getItem('company_id'),
              human_id: this.human_id,
              gs_id: gs_idOrDataObj,
              type: 1,
              jbxx_id: this.jbxx_id,
              diff: this.user_cate
            },
            data => {
              if (data.status == 'success') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this[ajaxObj]()
                this.ajaxYesGsList()
                this.ajaxAllGsList()
                this.ajaxNoGsList()
                this.count_ajax = 0
                // alert(6)
              }
            }
          )
        })
        .catch(() => {})
    },
    companySet() {
      //公司工具
      this.axios.post(
        '/index/task/companySet',
        { jbxx_id: this.jbxx_id, thread_id: this.thread_id },
        data => {
          let condition = data.condition ? JSON.parse(data.condition) : {}
          this.gsgj.dataset = {
            xmdq: data.xmdq || this.edit.area,
            money: data.money,
            min_date: data.minDate,
            max_date: data.maxDate,
            xmlxB: data.xmlx || this.edit.xmlxB,
            scxw1: condition.scxw1,
            scxw2: condition.scxw2,
            scxw3: condition.scxw3,
            zssl1: condition.zssl1,
            zssl2: condition.zssl2,
            ywfx: condition.ywfx
          }
        }
      )
    },

    compBehaviorGet() {
      this.axios.post(
        '/index/Analysis_Report/compBehaviorGet',
        { thread_id: this.thread_id, jbxx_id: this.jbxx_id },
        data => {
          if (data.status == 'success') {
            let xmCondition = data.message.xmCondition
              ? JSON.parse(data.message.xmCondition)
              : {}
            this.gsxw.dataset = {
              xmyz: data.message.xmyz,
              area: data.message.area ? data.message.area.split(',') : [],
              maxTime: data.message.maxTime,
              minTime: data.message.minTime,
              mintbNumber: data.message.mintbNumber,
              maxtbNumber: data.message.maxtbNumber,
              minzbNumber: data.message.minzbNumber,
              maxzbNumber: data.message.maxzbNumber,
              keys:
                xmCondition && xmCondition.keys ? xmCondition.keys.contain : [],
              xmlx:
                xmCondition && xmCondition.xmlx
                  ? xmCondition.xmlx.contain.join(',')
                  : '',
              minMoney: xmCondition.minMoney || '',
              maxMoney: xmCondition.maxMoney || ''
            }
          }
        }
      )
    },
    displayCredit() {
      this.axios.post(
        '/index/Search_Credit/displayCredit',
        { thread_id: this.thread_id, jbxx_id: this.jbxx_id },
        data => {
          if (data.status == 'success') {
            let condition = JSON.parse(data.rows.condition)
            this.xypj.dataset = {
              item: condition.xypj,
              sixty: condition.sixty,
              today: condition.today,
              orand: condition.orand
            }
          }
        }
      )
    },
    // 流程控制接口
    ajaxYesGetedGsList() {
      this.yesGetedGsData.loading = true
      this.axios.post(
        '/index/Human_Allot/getHumanCompany',
        {
          user_cate: this.user_cate,
          valid: 1,
          jbxx_id: this.jbxx_id,
          human_id: this.human_id,
          gsmc: this.yesGetedGsData.formData.gsmc,
          scale: this.yesGetedGsData.formData.areaTypeVal,
          rows: this.yesGetedGsData.row,
          page: this.yesGetedGsData.page
        },
        data => {
          if (this.yesGetedGsData.page > 1 && data.status == 'failed') {
            this.yesGetedGsData.page -= 1
            this.ajaxYesGetedGsList()
            return
          }

          this.yesGetedGsData.loading = false
          this.yesGetedGsData.rows = data.rows || []
          this.yesGetedGsData.total = data.total || 0
          this.yesGetedGsData.selectRows = []
        }
      )
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
        username = this.allUsers[this.user_cate].filter(
          v => v.id == row.user_id
        )[0].username
      }
      this.axios.post(
        '/index/element_set/personAllot',
        {
          username,
          jbxx_id: this.jbxx_id,
          user_id: row.user_id,
          level_id: row.level_id,
          group_id,
          type: 2,
          diff: this.user_cate
        },
        data => {
          this.ajaxGetedRyList()
        }
      )
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
          this.axios.post(
            '/index/element_set/personAllot',
            {
              jbxx_id: this.jbxx_id,
              user_id,
              type: 3,
              diff: this.user_cate
            },
            data => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.ajaxGetedRyList()
              this.ajaxYesGsList()
              this.ajaxNoGsList()
              this.ajaxAllGsList()
              this.ajaxYesGetedGsList()
              this.ajaxNoGetedGsList()
            }
          )
        })
        .catch(() => {})
    },
    //跳转页数
    yesGsDataChangePage(val) {
      this.yesGsData.page = val
      this.ajaxYesGsList()
    },
    yesGsDataChangeSize(val) {
      this.yesGsData.row = val
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
      this.userGslist.rows = []
      this.userGslist.dialogVisible = true
      this.ajaxGetUseredGslist()
    },
    //删除负责人公司
    onDeleUserGs(row) {
      this.axios.post(
        '/index/element_set/editCompanyToProject',
        {
          company_id: localStorage.getItem('company_id'),
          gs_id: row.gs_id,
          user_id: this.userGslist.selected_row.user_id,
          type: 1,
          c_phase: row.c_phase,
          jbxx_id: this.jbxx_id,
          diff: this.user_cate
        },
        data => {
          this.ajaxGetUseredGslist()
          this.ajaxYesGetedGsList()
          this.ajaxNoGetedGsList()
          this.ajaxYesGsList()
          this.ajaxNoGsList()
          this.ajaxAllGsList()
        }
      )
    },
    //获取人员负责公司列表
    ajaxGetUseredGslist() {
      this.userGslist.loading = true
      this.axios.post(
        '/index/Human_Allot/getUserCompany',
        {
          human_id: this.human_id,
          user_id: this.selected_row.user_id,
          jbxx_id: this.jbxx_id,
          type: this.user_cate,
          rows: this.userGslist.row,
          page: this.userGslist.page,
        },
        data => {
          if (
            this.userGslist.page > 1 &&
            data.status == 'success' &&
            data.rows.length == 0
          ) {
            this.userGslist.page -= 1
            this.ajaxGetUseredGslist()
            return
          }
          this.userGslist.loading = false
          this.userGslist.tableList = data.rows || []
          this.userGslist.total = data.total || 0
        }
      )
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
      this.$confirm('向该用户发送消息提醒?', '提示', {
        type: 'warning'
      })
        .then(_ => {
          this.axios.post(
            '/index/element_set/sendMessage',
            {
              jbxx_id: this.jbxx_id,
              user_id: row.user_id
            },
            data => {
              this.$message.success('已发送')
            }
          )
        })
        .catch(_ => {})
    },
    fnAddCompanyToProject(data) {
      if (data.user_cate == '分配' || data.user_cate == '标书制作') {
        this.axios.post(
          '/index/element_set/addCompanyToProject',
          {
            company_id: localStorage.getItem('company_id'),
            jbxx_id: this.jbxx_id,
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
            this.ajaxYesGetedGsList()
            this.count_ajax = 0
            // alert(7)
          }
        )
      } else {
        this.axios.post(
          '/index/Human_Allot/addCompanyToHuman',
          {
            jbxx_id: this.jbxx_id,
            human_id: this.human_id,
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
    //下部分列表分配公司
    onDistribute_button(
      type,
      ajaxObj,
      user_id,
      gs_id,
      ry_type,
      username = '',
      fp_bs_sh
    ) {
      if (fp_bs_sh == '分配') {
        ry_type = 'audit_user_id'
      } else if (fp_bs_sh == '标书制作') {
        ry_type = 'tender_user_id'
      } else if (fp_bs_sh == '人工审核') {
        ry_type = 'human_user_id'
      }
      if (type == 'all') {
        gs_id = gs_id.map(v => v.gs_id)
        if (gs_id.length == 0) {
          this.yesGetedGsData.formData.ryVal = ''
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
      this.axios.post(
        '/index/element_set/editCompanyToProject',
        queryObj,
        data => {
          this.yesGetedGsData.formData.ryVal = ''
          this.noGetedGsData.formData.ryVal = ''
          this[ajaxObj]()
          this.ajaxGetedRyList()
        }
      )
    },
    onSearch(ajaxObj, dataObj) {
      this[dataObj].page = 1
      this[dataObj].total = 0
      this[ajaxObj]()
    },
    //同意重置事件
    onResetForm(ajaxObj, dataObj) {
      this[dataObj].formData.gsmc = ''
      this[dataObj].formData.areaTypeVal = '0'
      this[dataObj].page = 1
      this[dataObj].total = 0
      this[ajaxObj]()
    },
    //改变是否是否川内外
    onChangeArea(ajaxObj, dataobj) {
      this[dataobj].page = 1
      this[ajaxObj]()
    },
    //是否开通展示
    onIsDisplay(type, ajaxFn, rows, typeAllOne) {
      if (rows.length == 0) {
        this.$message.error('请选择公司')
        this.open_close = ''
        return
      }
      let url,
        queryObj,
        open_type = type || this.open_close

      if (open_type == 'yes') {
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
        this.open_close = ''

        this[ajaxFn]()
      })
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
        path: `/bidResultRyYJ?jbxx_id=${this.jbxx_id}&gs_id=${
          row.gs_id
        }&yj_id=${yj_id}&ry_id=${ry_id}&flag=1`
      })
      window.open(href)
    },
    //审核未审核公司操作
    ajaxOnYesorNoList(data) {
      this.axios.post(
        '/Index/thread/Auditing',
        {
          id: this.thread_id,
          jbxx_id: this.jbxx_id,
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

    //选中列表多选框
    onSelect_yesGsRows(rows) {
      this.yesGsData.selectRows = rows
    },
    onSelect_allGsRows(rows) {
      this.allGsData.selectRows = rows
    },
    onSelect_yesGetedGsRows(rows) {
      this.yesGetedGsData.selectRows = rows
    },
    onSelect_noGetedGsRows(rows) {
      this.noGetedGsData.selectRows = rows
    },
    onSelect_getedRyRows(rows) {
      this.getedRyData.selectRows = rows
    },
    // 跳转
    openGs(row) {
      let { href } = this.$router.resolve({
        path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.gsmc}`
      })
      window.open(href, '公司详情' + row.gs_id)
    }
  }
}
</script>
<style lang="less" scoped>
.bid_research {
  padding: 20px;
  .table-title {
    margin: 20px auto;
    text-align: center;
    font-size: 28px;
  }
  h1 {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #dcdcdc;
  }
  .operation {
    height: 90px;
    width: 100px;
  }
  .active_box {
    border: 1px solid #409eff !important;
  }
  .box_content {
    width: 100%;
    display: flex;
  }
  .active_btn {
    color: #409eff;
  }
  .have_data {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #409eff;
    position: relative;
    top: -2px;
  }
  .box {
    cursor: pointer;
    width: 200px;
    margin-right: 10px;
    border: 1px solid #dcdcdc;
    height: 90px;
    .content {
      height: 60px;
      border-bottom: 1px solid #dcdcdc;
      text-align: center;
      line-height: 60px;
      position: relative;
      .active_icon {
        color: rgb(14, 207, 14);
      }
      .none_icon {
        color: red;
      }
      .c_icon {
        position: absolute;
        top: 0;
        right: 5px;
        transform: scale(0.7);
      }
    }
    .btns {
      display: flex;
      line-height: 29px;
      background-color: #f3f3f3;
      > div:first-child {
        border-right: 1px solid #dcdcdc;
      }
      > div {
        flex: 1;
        text-align: center;
        // width: 50%;
      }
    }
  }
}
.plan-top {
  font-size: 18px;
  > span {
  }
  > label {
    color: rgb(0, 192, 255);
  }
}
</style>


