<!--筑标成都项目操作分配标书-->
<template>
  <div>
    <p style="line-height:90px;text-align:center;font-size:34px">成都项目</p>
    <carousel-card height="800px">
      <carousel-item>
        <div class="ys-ws-divs">
          <div>
            <p class="table-title" style="color:#00c0ff">已审核公司集合</p>
            <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
              <el-form-item style="width:180px">
                <el-input @keydown.enter.native="ajaxYesGsList" clearable placeholder="公司名称" v-model="yesGsData.formData.gsmc"></el-input>
              </el-form-item>
              <el-form-item style="width:110px">
                <el-select placeholder="不限制" v-model="yesGsData.formData.areaTypeVal" @change="onChangeArea('ajaxYesGsList')">
                  <el-option label="不限制" value="0"></el-option>
                  <el-option label="川内企业" value="1"></el-option>
                  <el-option label="入川企业" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ajaxYesGsList">
                  查询
                  <i class="el-icon-search el-icon--right"></i>
                </el-button>
                <el-button @click="onResetForm('ajaxYesGsList','yesGsData')">
                  重置
                  <i class="el-icon-refresh el-icon--right"></i>
                </el-button>
              </el-form-item>
              <el-form-item style="width:100px">
                <el-select placeholder="选择" v-model="yesGsData.formData.ryVal">
                  <el-option label value></el-option>
                  <el-option v-for="item in allUsers['分配']" :key="item.id" :label="item.username" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onDistribute('yesGsData','ajaxYesGsList')">
                  分配
                  <i class="el-icon-caret-right el-icon--right"></i>
                </el-button>
              </el-form-item>
            </el-form>
            <el-table max-height="530" border :data="yesGsData.tableList" v-loading="yesGsData.loading" :row-style="tableRowClassName" @select-all="onSelect_yesGsRows" @select="onSelect_yesGsRows">
              <el-table-column type="selection" :selectable="disabledCheck" width="40px" align="center"></el-table-column>
              
              <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
              <el-table-column prop="gsmc" label="公司名称" align="center"></el-table-column>
              <el-table-column prop="zbids" width="110px" label="中标次数" align="center" sortable></el-table-column>
              <el-table-column prop="zbxxids" width="110px" label="中标次数" align="center" sortable></el-table-column>
              <el-table-column prop="flag" width="58px" label="标签" align="center">
                <template slot-scope="scope">
                  <i @click="onShowDialog('ajaxYesGsList',scope.row,'yes')" v-if="scope.row.flag == 1" style="color:#00c0ff;font-size:18px" class="el-icon-star-on"></i>
                  <i @click="onShowDialog('ajaxYesGsList',scope.row,'no')" style="font-size:18px" v-else class="el-icon-star-off"></i>
                </template>
              </el-table-column>
              <el-table-column width="98px" label="条件-结果集" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="onCheck(scope.row)">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column width="86px" label="审核" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="ajaxOnYesorNoList(scope.row.gs_id,'1')">未审核</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px" @current-change="yesGsDataChangePage" @size-change="yesGsDataChangeSize" align="right" background layout="total,prev, pager, next" :total="yesGsData.total"></el-pagination>
          </div>
          <div>
            <p class="table-title" style="color:red">未审核公司集合</p>
            <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
              <el-form-item style="width:200px">
                <el-input clearable placeholder="公司名称" v-model="noGsData.formData.gsmc" @keydown.enter.native="ajaxNoGsList"></el-input>
              </el-form-item>
              <el-form-item style="width:110px">
                <el-select placeholder="不限制" v-model="noGsData.formData.areaTypeVal" @change="onChangeArea('ajaxNoGsList')">
                  <el-option label="不限制" value="0"></el-option>
                  <el-option label="川内企业" value="1"></el-option>
                  <el-option label="入川企业" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ajaxNoGsList">
                  查询
                  <i class="el-icon-search el-icon--right"></i>
                </el-button>
                <el-button @click="onResetForm('ajaxNoGsList','noGsData')">
                  重置
                  <i class="el-icon-refresh el-icon--right"></i>
                </el-button>
              </el-form-item>
            </el-form>
            <el-table max-height="530" border :data="noGsData.tableList" v-loading="noGsData.loading" :row-style="tableRowClassName">
              <el-table-column type="selection" :selectable="disabledCheck" width="50px" align="center"></el-table-column>
              
              <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
              <el-table-column prop="gsmc" label="公司名称" align="center"></el-table-column>
              <el-table-column prop="zbids" label="中标次数" align="center" sortable></el-table-column>
              <el-table-column prop="zbxxids" label="中标次数" align="center" sortable></el-table-column>
              <el-table-column prop="flag" width="58px" label="标签" align="center">
                <template slot-scope="scope">
                  <i v-if="scope.row.flag == 1" style="color:#00c0ff;font-size:18px" class="el-icon-star-on" @click="onShowDialog('ajaxNoGsList',scope.row,'yes')"></i>
                  <i style="font-size:18px" v-else class="el-icon-star-off" @click="onShowDialog('ajaxNoGsList',scope.row,'no')"></i>
                </template>
              </el-table-column>
              <el-table-column width="86px" label="审核" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="ajaxOnYesorNoList(scope.row.gs_id,'0')">审核</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px" @current-change="noGsDataChangePage" @size-change="noGsDataChangeSize" align="right" background layout="total,prev, pager, next" :total="noGsData.total"></el-pagination>
          </div>
        </div>
      </carousel-item>
      <carousel-item>
        <div>
          <p class="table-title" style="color:red">全部公司集合</p>
          <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
            <el-form-item style="width:180px">
              <el-input clearable placeholder="公司名称" v-model="allGsData.formData.gsmc" @keydown.enter.native="ajaxAllGsList"></el-input>
            </el-form-item>
            <el-form-item style="width:110px">
              <el-select placeholder="不限制" v-model="allGsData.formData.areaTypeVal" @change="onChangeArea('ajaxAllGsList')">
                <el-option label="不限制" value="0"></el-option>
                <el-option label="川内企业" value="1"></el-option>
                <el-option label="入川企业" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="ajaxAllGsList">
                查询
                <i class="el-icon-search el-icon--right"></i>
              </el-button>
              <el-button @click="onResetForm('ajaxAllGsList','allGsData')">
                重置
                <i class="el-icon-refresh el-icon--right"></i>
              </el-button>
            </el-form-item>
            <el-form-item style="width:100px">
              <el-select placeholder="选择" v-model="allGsData.formData.ryVal">
                <el-option label value></el-option>
                <el-option v-for="item in allUsers['分配']" :key="item.id" :label="item.username" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onDistribute('allGsData','ajaxAllGsList')">
                分配
                <i class="el-icon-caret-right el-icon--right"></i>
              </el-button>
            </el-form-item>
          </el-form>
          <el-table max-height="530" border :data="allGsData.tableList" v-loading="allGsData.loading" :row-style="tableRowClassName" @select-all="onSelect_allGsRows" @select="onSelect_allGsRows">
            <el-table-column type="selection" :selectable="disabledCheck" width="50px" align="center"></el-table-column>
            
            <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
            <el-table-column prop="gsmc" label="公司名称" align="center"></el-table-column>
          </el-table>
          <el-pagination style="margin-top:20px" @current-change="allGsDataChangePage" @size-change="allGsDataChangeSize" align="right" background layout="total,prev, pager, next" :total="allGsData.total"></el-pagination>
        </div>
      </carousel-item>
    </carousel-card>
    <div style="margin:50px 0">
      <carousel-card height="400px">
        <carousel-item>
          <div>
            <p class="table-title" style="color:#2f80d1">已拿到公司集合</p>
            <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
              <el-form-item style="width:180px">
                <el-input clearable placeholder="公司名称" v-model="yesGetedGsData.formData.gsmc" @keydown.enter.native="ajaxYesGetedGsList"></el-input>
              </el-form-item>
              <el-form-item style="width:110px">
                <el-select placeholder="不限制" v-model="yesGetedGsData.formData.areaTypeVal" @change="onChangeArea('ajaxYesGetedGsList')">
                  <el-option label="不限制" value="0"></el-option>
                  <el-option label="川内企业" value="1"></el-option>
                  <el-option label="入川企业" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ajaxYesGetedGsList">
                  查询
                  <i class="el-icon-search el-icon--right"></i>
                </el-button>
                <el-button @click="onResetForm('ajaxYesGetedGsList','yesGetedGsData')">
                  重置
                  <i class="el-icon-refresh el-icon--right"></i>
                </el-button>
              </el-form-item>
              <el-form-item style="width:100px">
                <el-select placeholder="选择" v-model="yesGetedGsData.formData.ryVal">
                  <el-option label value></el-option>
                  <el-option v-for="item in allUsers['分配']" :key="item.id" :label="item.username" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onDistribute_button('all','ajaxYesGetedGsList',yesGetedGsData.formData.ryVal,yesGetedGsData.selectRows,'audit_user_id')">
                  拿公司
                  <i class="el-icon-caret-right el-icon--right"></i>
                </el-button>
                <el-button @click="onDeleteGs('all','ajaxYesGetedGsList','yesGetedGsData')">批量删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-select style="width:150px" filterable placeholder="方案" v-model="yesGetedGsData.formData.planVal">
                  <el-option label value></el-option>
                  <el-option v-for="item in planList" :key="item.thread_id" :label="item.threadName" :value="item.thread_id"></el-option>
                </el-select>
                <el-button @click="onExecutePlan('yesGetedGsData','ajaxYesGetedGsList',yesGetedGsData.formData.planVal)">执行方案</el-button>
                <el-button @click="onIsDisplay('yes','ajaxYesGetedGsList',yesGetedGsData.selectRows)">开通展示</el-button>
                <el-button @click="onIsDisplay('no','ajaxYesGetedGsList',yesGetedGsData.selectRows)">取消开通</el-button>
              </el-form-item>
            </el-form>
            <el-table max-height="530" border :data="yesGetedGsData.tableList" v-loading="yesGetedGsData.loading" @select-all="onSelect_yesGetedGsRows" @select="onSelect_yesGetedGsRows">
              <el-table-column type="selection" width="50px" align="center"></el-table-column>
              
              <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
              <el-table-column prop="gsmc" label="公司名称" align="center">
                <template slot-scope="scope">
                  <el-button type="text">{{scope.row.gsmc}}</el-button>
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
              <el-table-column prop label="认识的人" width="100px" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.firm.length > 0">
                    <change-ry :ry_list="{'认识的人':computeKnow(scope.row.firm)}" :extraObj="{type:'认识的人',ajaxFn:'ajaxYesGetedGsList',dataObj:'yesGetedGsData',ry_type:'audit_user_id'}" :row="scope.row" ry="选择" @onSelect="onListInSelect"></change-ry>
                  </div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="已选方案" align="center"></el-table-column>
              <el-table-column prop="sign" label="条件满足概况" align="center">
                <template slot-scope="scope">
                  <div @click="onCheckResult(scope.row)">
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
            <el-pagination style="margin-top:20px" @current-change="yesGetedGsChangePage" @size-change="yesGetedGsChangeSize" align="right" background layout="total,prev, pager, next" :total="yesGetedGsData.total"></el-pagination>
          </div>
        </carousel-item>
        <carousel-item>
          <div>
            <p class="table-title" style="color:#2f80d1">拿公司人员集合</p>
            <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
              <el-form-item label="添加拿公司人员">
                <el-select placeholder="选择" v-model="getedRyData.formData.ryVal">
                  <el-option v-for="item in allUsers['分配']" :key="item.id" :label="item.username" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onAddRyList">确定</el-button>
                <el-button @click="onDeleteRy('all')">批量取消人员</el-button>
              </el-form-item>
            </el-form>
            <el-table max-height="530" border :data="getedRyData.tableList" v-loading="getedRyData.loading" @select-all="onSelect_getedRyRows" @select="onSelect_getedRyRows">
              <el-table-column type="selection" width="50px" align="center"></el-table-column>
              
              <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
              <el-table-column prop="username" label="人员" align="center"></el-table-column>
              <el-table-column prop="baseInfoComponent" label="基本信息" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.baseInfoComponent == 1" size="mini" type="success" icon="el-icon-check" circle @click="onRySwitch(scope.row,'no',scope.row.baseInfoComponent_group_id)"></el-button>
                  <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onRySwitch(scope.row,'yes',scope.row.baseInfoComponent_group_id)"></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="companyExecPhase" label="相关企业" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.companyExecPhase == 1" size="mini" type="success" icon="el-icon-check" circle @click="onRySwitch(scope.row,'no',scope.row.companyExecPhase_group_id)"></el-button>
                  <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onRySwitch(scope.row,'yes',scope.row.companyExecPhase_group_id)"></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="serviceTeam" label="项目服务团队" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.serviceTeam == 1" size="mini" type="success" icon="el-icon-check" circle @click="onRySwitch(scope.row,'no',scope.row.serviceTeam_group_id)"></el-button>
                  <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onRySwitch(scope.row,'yes',scope.row.serviceTeam_group_id)"></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="proExecPhase" label="项目相关执行内容" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.proExecPhase == 1" size="mini" type="success" icon="el-icon-check" circle @click="onRySwitch(scope.row,'no',scope.row.proExecPhase_group_id)"></el-button>
                  <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onRySwitch(scope.row,'yes',scope.row.proExecPhase_group_id)"></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="proEnclosure" label="项目相关附件" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.proEnclosure == 1" size="mini" type="success" icon="el-icon-check" circle @click="onRySwitch(scope.row,'no',scope.row.proEnclosure_group_id)"></el-button>
                  <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onRySwitch(scope.row,'yes',scope.row.proEnclosure_group_id)"></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="proTimeRequire" label="项目要求" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.proTimeRequire == 1" size="mini" type="success" icon="el-icon-check" circle @click="onRySwitch(scope.row,'no',scope.row.proTimeRequire_group_id)"></el-button>
                  <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onRySwitch(scope.row,'yes',scope.row.proTimeRequire_group_id)"></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="check" label="配置查看" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.check == 1" size="mini" type="success" icon="el-icon-check" circle @click="onRySwitch(scope.row,'no',scope.row.check_group_id)"></el-button>
                  <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onRySwitch(scope.row,'yes',scope.row.check_group_id)"></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="file" label="配置文件" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.file == 1" size="mini" type="success" icon="el-icon-check" circle @click="onRySwitch(scope.row,'no',scope.row.file_group_id)"></el-button>
                  <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onRySwitch(scope.row,'yes',scope.row.file_group_id)"></el-button>
                </template>
              </el-table-column>
              <el-table-column label="所负责公司" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="onGetUserGsList(scope.row)">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="300px" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="onOpenTemplate(scope.row)">编辑组件</el-button>
                  <el-button type="primary" size="mini" @click="sendMessage(scope.row)">短信提醒</el-button>
                  <el-button type="danger" size="mini" @click="onDeleteRy('one',scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="margin-top:20px" @current-change="getedRyChangePage" @size-change="getedRyChangeSize" align="right" background layout="total,prev, pager, next" :total="getedRyData.total"></el-pagination>
          </div>
        </carousel-item>
        <carousel-item>
          <div>
            <p class="table-title" style="color:red">未拿到公司集合</p>
            <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
              <el-form-item style="width:180px">
                <el-input clearable placeholder="公司名称" v-model="noGetedGsData.formData.gsmc" @keydown.enter.native="ajaxNoGetedGsList"></el-input>
              </el-form-item>
              <el-form-item style="width:110px">
                <el-select placeholder="不限制" v-model="noGetedGsData.formData.areaTypeVal" @change="onChangeArea('ajaxNoGetedGsList')">
                  <el-option label="不限制" value="0"></el-option>
                  <el-option label="川内企业" value="1"></el-option>
                  <el-option label="入川企业" value="2"></el-option>
                </el-select>
              </el-form-item>00
              <el-form-item>
                <el-button type="primary" @click="ajaxNoGetedGsList">
                  查询
                  <i class="el-icon-search el-icon--right"></i>
                </el-button>
                <el-button @click="onResetForm('ajaxNoGetedGsList','noGetedGsData')">
                  重置
                  <i class="el-icon-refresh el-icon--right"></i>
                </el-button>
              </el-form-item>
              <el-form-item style="width:100px">
                <el-select placeholder="选择" v-model="noGetedGsData.formData.ryVal">
                  <el-option label value></el-option>
                  <el-option v-for="item in allUsers['分配']" :key="item.id" :label="item.username" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onDistribute_button('all','ajaxNoGetedGsList',noGetedGsData.formData.ryVal,noGetedGsData.selectRows,'audit_user_id')">
                  拿公司
                  <i class="el-icon-caret-right el-icon--right"></i>
                </el-button>
                <el-button @click="onDeleteGs('all','ajaxNoGetedGsList','noGetedGsData')">批量删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-select style="width:150px" filterable placeholder="方案" v-model="noGetedGsData.formData.planVal">
                  <el-option label value></el-option>
                  <el-option v-for="item in planList" :key="item.thread_id" :label="item.threadName" :value="item.thread_id"></el-option>
                </el-select>
                <el-button @click="onExecutePlan('noGetedGsData','ajaxNoGetedGsList',noGetedGsData.formData.planVal)">执行方案</el-button>
                <el-button @click="onIsDisplay('yes','ajaxNoGetedGsList',noGetedGsData.selectRows)">开通展示</el-button>
                <el-button @click="onIsDisplay('no','ajaxNoGetedGsList',noGetedGsData.selectRows)">取消开通</el-button>
              </el-form-item>
            </el-form>
            <el-table max-height="530" border :data="noGetedGsData.tableList" v-loading="noGetedGsData.loading" @select-all="onSelect_noGetedGsRows" @select="onSelect_noGetedGsRows">
              <el-table-column type="selection" width="50px" align="center"></el-table-column>
              
              <el-table-column type="index" width="50px" label="序号" align="center"></el-table-column>
              <el-table-column prop="gsmc" label="公司名称" align="center"></el-table-column>
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
              <el-table-column prop label="认识的人" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.firm.length > 0">
                    <change-ry :ry_list="{'认识的人':computeKnow(scope.row.firm)}" :extraObj="{type:'认识的人',ajaxFn:'ajaxNoGetedGsList',dataObj:'noGetedGsData',ry_type:'audit_user_id'}" :row="scope.row" ry="选择" @onSelect="onListInSelect"></change-ry>
                  </div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="已选方案" align="center"></el-table-column>
              <el-table-column prop="sign" width="300px" label="条件满足概况" align="center">
                <template slot-scope="scope">
                  <el-button :style="{'color':item.status?'#5daf34':'red'}" type="text" size="medium" v-for="item in scope.row.sign" :key="item.id">{{item.name}}{{item.count?'('+item.count+'个)':''}}</el-button>
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
            <el-pagination style="margin-top:20px" @current-change="noGetedGsChangePage" @size-change="noGetedGsChangeSize" align="right" background layout="total,prev, pager, next" :total="noGetedGsData.total"></el-pagination>
          </div>
        </carousel-item>
      </carousel-card>
    </div>
    <!-- 标签弹框 -->
    <el-dialog title="打标签" :visible.sync="tagDialogData.dialogVisible">
      <el-form label-width="160px" style="width:510px;margin:0 auto" @submit.native.prevent>
        <el-form-item label="是否是国企/央企:">
          <el-radio v-model="tagDialogData.formData.qyxz" :label="1">是</el-radio>
          <el-radio v-model="tagDialogData.formData.qyxz" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="从不投标/不对外投标:">
          <el-radio v-model="tagDialogData.formData.tbpl" :label="1">是</el-radio>
          <el-radio v-model="tagDialogData.formData.tbpl" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="不好合作:">
          <el-radio v-model="tagDialogData.formData.cooperation" :label="1">是</el-radio>
          <el-radio v-model="tagDialogData.formData.cooperation" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="公司有问题:">
          <el-radio v-model="tagDialogData.formData.issue" :label="1">是</el-radio>
          <el-radio v-model="tagDialogData.formData.issue" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="其它:">
          <div class="tag-text" v-for="(item,i) in tagDialogData.formData.other" :key="item.id">
            <span>{{i+1}}.</span>
            <p>{{item.content}}</p>
            <span>{{item.modified}}</span>
            <i style="color:red" class="el-icon-close" @click="onDeleteTagOther(item.id)"></i>
          </div>
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容" v-model="tagDialogData.formData.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tagDialogData.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTagSave">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 负责公司的弹框 -->
    <el-dialog title="负责公司" :visible.sync="userGslist.dialogVisible">
      <el-table :data="userGslist.tableList" style="width: 100%" border>
        <el-table-column type="index" width="60" label="序号" align="center"></el-table-column>
        <el-table-column prop="gsmc" label="公司名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="onDeleUserGs(scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
  </div>
</template>
<script>
import carouselCard from './sonPage/carouselCard.vue'
import carouselItem from './sonPage/carouselItem.vue'
import changeRy from './template/changeRy.vue'
export default {
  components: {
    carouselCard,
    carouselItem,
    changeRy
  },
  data() {
    return {
      //用户数据
      allUsers: {},
      // 方案列表
      planList: [],
      jbxx_id: 206,
      id: 1377,
      last_treeId: 453,
      human_id: 1377,
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
          ryVal: ''
        },
        selectRows: [],
        page: 1,
        total: 0,
        row: 10,
        tableList: [],
        loading: false
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
        loading: false
      },
      //全部公司数据
      allGsData: {
        formData: {
          gsmc: '',
          areaTypeVal: '0',
          ryVal: ''
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
      }
    }
  },
  created() {
    this.getNode()
    this.ajaxGetTemplate()
    this.ajaxGetUser()
    this.getPlans()
    this.ajaxYesGsList()
    this.ajaxNoGsList()
    this.ajaxAllGsList()
    this.ajaxYesGetedGsList()
    this.ajaxGetedRyList()
    this.ajaxNoGetedGsList()
  },
  methods: {
    computeKnow(d) {
      return d.map(v => {
        return {
          id: v.user_id,
          username: v.username
        }
      })
    },
    //获取节点
    getNode() {
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/company/node',
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
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/getComponent',
        {
          user_cate: '分配'
        },
        data => {
          this.userGslist.templateData.list = data.message
        }
      )
    },
    //获取人员列表
    ajaxGetUser() {
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/project/getUsers',
        data => {
          this.allUsers = data.message
        }
      )
    },
    //获取方案列表
    getPlans() {
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/Index/thread/getThread',
        {
          jbxx_id: this.jbxx_id,
          cate: 2
        },
        data => {
          if(data.status == 'success'){
            this.planList = data
          }else{
            this.planList = []
          }
        }
      )
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
    //列表被选颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.exit == 1) {
        return { backgroundColor: '#e5e5e5' }
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
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/Index/Others/delete',
        {
          id
        },
        data => {
          this.ajaxTagData()
        }
      )
    },
    //获取标签数据
    ajaxTagData() {
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/Index/Others/labelShow',
        {
          gs_id: this.tagDialogData.row.gs_id
        },
        data => {
          let obj = {
            qyxz: data.rows.qyxz,
            tbpl: data.rows.tbpl,
            cooperation: data.rows.cooperation,
            other: data.rows.other,
            issue: data.rows.issue,
            content: '',
            id: data.rows.id
          }
          this.tagDialogData.formData = obj
        }
      )
    },
    //保存修改组件
    onTemplateSave() {
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/personAllot',
        {
          jbxx_id: this.jbxx_id,
          user_id: this.selected_row.user_id,
          level_id: this.selected_row.level_id,
          group_id: this.userGslist.templateData.val.join(','),
          type: 2,
          diff: '分配'
        },
        data => {
          this.userGslist.templateData.dialogEditVisible = false
          this.ajaxGetedRyList()
          this.$message.success('修改成功')
        }
      )
    },
    //点击保存标签
    onTagSave() {
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/Index/Others/label',
        {
          thread_id: this.human_id,
          gs_id: this.tagDialogData.row.gs_id,
          id: this.tagDialogData.formData.id,
          type: 'list',
          content: this.tagDialogData.formData.content,
          qyxz: this.tagDialogData.formData.qyxz,
          tbpl: this.tagDialogData.formData.tbpl,
          cooperation: this.tagDialogData.formData.cooperation,
          issue: this.tagDialogData.formData.issue
        },
        data => {
          this.tagDialogData.dialogVisible = false
          let ajaxFn = this.tagDialogData.ajaxFn
          this[ajaxFn]()    
        }
      )
    },
    // 已审核公司集合
    ajaxYesGsList() {
      this.yesGsData.loading = true
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/Index/thread/audited?type=1',
        {
          user_cate: '分配',
          jbxx_id: this.jbxx_id,
          id: this.id,
          human_id: this.human_id,
          gsmc: this.yesGsData.formData.gsmc,
          scale: this.yesGsData.formData.areaTypeVal,
          valid: 1,
          rows: this.yesGsData.row,
          page: this.yesGsData.page
        },
        data => {
          this.yesGsData.loading = false
          this.yesGsData.tableList = data.rows || []
          this.yesGsData.total = data.total || 0
          this.yesGsData.selectRows = []
        }
      )
    },
    // 未审核公司集合
    ajaxNoGsList() {
      this.noGsData.loading = true
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/Index/thread/audited?type=0',
        {
          user_cate: '分配',
          jbxx_id: this.jbxx_id,
          id: this.id,
          human_id: this.human_id,
          gsmc: this.noGsData.formData.gsmc,
          scale: this.noGsData.formData.areaTypeVal,
          valid: 1,
          rows: this.noGsData.row,
          page: this.noGsData.page
        },
        data => {
          this.noGsData.loading = false
          this.noGsData.tableList = data.rows || []
          this.noGsData.total = data.total || 0
        }
      )
    },
    //全部公司集合
    ajaxAllGsList() {
      this.allGsData.loading = true
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/getAllCompany',
        {
          type: '分配',
          user_cate: '分配',
          jbxx_id: this.jbxx_id,
          gsmc: this.allGsData.formData.gsmc,
          scale: this.allGsData.formData.areaTypeVal,
          rows: this.allGsData.row,
          page: this.allGsData.page,
          jbxx_id: this.jbxx_id,
          rows: 30,
          page: this.allGsData.page
        },
        data => {
          this.allGsData.loading = false
          this.allGsData.tableList = data.rows || []
          this.allGsData.total = data.total || 0
          this.allGsData.selectRows = []
        }
      )
    },
    // 已拿到公司集合
    ajaxYesGetedGsList() {
      this.yesGetedGsData.loading = true
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/getAllotedCompany',
        {
          user_cate: '分配',
          valid: 1,
          jbxx_id: this.jbxx_id,
          gsmc: this.yesGetedGsData.formData.gsmc,
          scale: this.yesGetedGsData.formData.areaTypeVal,
          rows: this.yesGetedGsData.row,
          page: this.yesGetedGsData.page
        },
        data => {
          this.yesGetedGsData.loading = false
          this.yesGetedGsData.tableList = data.rows || []
          this.yesGetedGsData.total = data.total || 0
          this.yesGetedGsData.selectRows = []
        }
      )
    },
    //未拿到公司集合
    ajaxNoGetedGsList() {
      this.noGetedGsData.loading = true
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/getAllotedCompany',
        {
          user_cate: '分配',
          valid: 2,
          jbxx_id: this.jbxx_id,
          gsmc: this.noGetedGsData.formData.gsmc,
          scale: this.noGetedGsData.formData.areaTypeVal,
          rows: this.noGetedGsData.row,
          page: this.noGetedGsData.page
        },
        data => {
          this.noGetedGsData.loading = false
          this.noGetedGsData.tableList = data.rows || []
          this.noGetedGsData.total = data.total || 0
          this.noGetedGsData.selectRows = []
        }
      )
    },
    //拿公司人员集合
    ajaxGetedRyList() {
      this.getedRyData.loading = true
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/getUserBaseInfo',
        {
          jbxx_id: this.jbxx_id,
          type: '分配',
          rows: this.getedRyData.row,
          page: this.getedRyData.page
        },
        data => {
          this.getedRyData.loading = false
          this.getedRyData.tableList = data.rows || []
          this.getedRyData.total = data.total || 0
          this.getedRyData.selectRows = []
        }
      )
    },
    //审核未审核公司操作
    ajaxOnYesorNoList(gs_id, type) {
      this.axios.post(
        '/Index/thread/Auditing',
        {
          id: this.human_id,
          jbxx_id: this.jbxx_id,
          gs_id,
          type,
          node_id: this.last_treeId,
          node_name: '人员'
        },
        data => {
          if (data.status == 'success') {
            this.ajaxYesGsList()
            this.ajaxNoGsList()
          }
        }
      )
    },
    //改变是否是否川内外
    onChangeArea(ajaxObj, dataobj) {
      this[ajaxObj]()
    },
    //同意重置事件
    onResetForm(ajaxObj, dataObj) {
      this[dataObj].formData.gsmc = ''
      this[dataObj].formData.areaTypeVal = '0'
      this[ajaxObj]()
    },
    //派发人员
    onDistribute(dataObj, ajaxObj) {
      let gs_id = this[dataObj].selectRows.map(v => v.gs_id)
      if (gs_id.length == 0) {
        this.$message.error('请选择公司')
        return
      }
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/addCompanyToProject',
        {
          company_id:localStorage.getItem('company_id'),
          jbxx_id: this.jbxx_id,
          gs_ids: gs_id.join(','),
          user_id: this[dataObj].formData.ryVal
        },
        data => {
          this[ajaxObj]()
          this.ajaxYesGetedGsList()
          this.ajaxGetedRyList()
        }
      )
    },
    //查看结果集合
    onCheck(row) {
      let { href } = this.$router.resolve({
        path: `/bidResultRyYJ?jbxx_id=${this.jbxx_id}&gs_id=${row.gs_id}&yj_id=${
          this.node.yj_node
        }&ry_id=${this.node.ry_node}`
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
        path: `/bidResultRyYJ?jbxx_id=${this.jbxx_id}&gs_id=${
          row.gs_id
        }&yj_id=${yj_id}&ry_id=${ry_id}`
      })
      window.open(href)
    },
    //下部分列表分配公司
    onDistribute_button(type, ajaxObj, user_id, gs_id, ry_type) {
      if (type == 'all') {
        gs_id = gs_id.map(v => v.gs_id)
        if (gs_id.length == 0) {
          this.$message.error('请选择公司')
          return
        }
        gs_id = gs_id.join(',')
      }
      let queryObj = {
        jbxx_id: this.jbxx_id,
        gs_id: gs_id,
        type: 2
      }
      queryObj[ry_type] = user_id
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/editCompanyToProject',
        queryObj,
        data => {
          this[ajaxObj]()
          this.ajaxGetedRyList()
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
      this.$confirm(
        '该方案有多个同类型节点时，以最新节点为运算标准，并覆盖之前的结果，是否继续？'
      )
        .then(_ => {
          let nowPlan = this.planList.filter(v => v.thread_id == planid);
          if(nowPlan.length == 0){
            nowPlan.node_name = ''
            nowPlan.cate = ''
          }else{
            nowPlan = nowPlan[0]
          }
          this.axios.post(
            'http://114.215.223.123/ProPro/public/index.php/index/Human_Allot/executePlan',
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
        })
        .catch(_ => {})
    },
    // 删除分配公司
    onDeleteGs(type, ajaxObj, gs_idOrDataObj) {
      if (type == 'all') {
        gs_idOrDataObj = this[gs_idOrDataObj].selectRows.map(v => v.gs_id)
        if (gs_idOrDataObj.length == 0) {
          this.$message.error('请选择公司')
          return
        }
        gs_idOrDataObj.join(',')
      }
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/editCompanyToProject',
        {
          gs_id: gs_idOrDataObj,
          type: 1,
          jbxx_id: this.jbxx_id,
          diff: '分配'
        },
        data => {
          if (data.status == 'success') {
            this[ajaxObj]()
            this.ajaxYesGsList()
            this.ajaxAllGsList()
            this.ajaxNoGsList()
          }
        }
      )
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
        url =
          'http://114.215.223.123/ProPro/public/index.php/Index/Project/saveDisplay'
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
        url =
          'http://114.215.223.123/ProPro/public/index.php/Index/Project/delDisplay'
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
        obj.ry_type
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
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/personAllot',
        {
          jbxx_id: this.jbxx_id,
          user_id: row.user_id,
          level_id: row.level_id,
          group_id,
          type: 2,
          diff: '分配'
        },
        data => {
          this.ajaxGetedRyList()
        }
      )
    },
    //删除人员集合type是否是多选或单个删除
    onDeleteRy(type, row) {
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
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/personAllot',
        {
          jbxx_id: this.jbxx_id,
          user_id,
          type: 3,
          diff: '分配'
        },
        data => {
          this.ajaxGetedRyList()
          this.ajaxYesGsList()
          this.ajaxNoGsList()
          this.ajaxAllGsList()
          this.ajaxYesGetedGsList()
          this.ajaxNoGetedGsList()
        }
      )
    },
    //添加人员集合
    onAddRyList() {
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/personAllot',
        {
          jbxx_id: this.jbxx_id,
          user_id: this.getedRyData.formData.ryVal,
          level_id: '',
          group_id: '',
          type: 1,
          diff: '分配'
        },
        data => {
          this.ajaxGetedRyList()
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
      this.userGslist.tableList = []
      this.userGslist.dialogVisible = true
      this.ajaxGetUseredGslist()
    },
    //删除负责人公司
    onDeleUserGs(row) {
      this.axios.post(
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/editCompanyToProject',
        {
          gs_id: row.gs_id,
          user_id: this.userGslist.selected_row.user_id,
          type: 1,
          c_phase: row.c_phase,
          jbxx_id: this.jbxx_id,
          diff: '分配'
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
        'http://114.215.223.123/ProPro/public/index.php/index/element_set/getUserCompany',
        {
          user_id: this.selected_row.user_id,
          jbxx_id: this.jbxx_id,
          type: '分配',
          rows: 10000,
          page: 1
        },
        data => {
          this.userGslist.loading = false
          this.userGslist.tableList = data.rows || []
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
            'http://114.215.223.123/ProPro/public/index.php/index/element_set/sendMessage',
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
  display: flex;
  > div {
    flex: 1;
    padding: 0 10px;
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
</style>

