<!--画像项目标书制作-->
<template>
  <div>
    <p style="margin:20px 0 10px;text-align:center;font-size:34px">{{xm_info.xmmc}}</p>
    <carousel-card height="650px;width:95%;">
      <carousel-item>
        <div class="ys-ws-divs">
          <div>
            <p class="table-title" style="color:#00c0ff">已审核公司集合</p>
            <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
              <el-form-item style="width:160px">
                <el-input @keydown.enter.native="onSearch('ajaxYesGsList','yesGsData')" clearable placeholder="公司名称" v-model="yesGsData.formData.gsmc"></el-input>
              </el-form-item>
              <el-form-item style="width:110px">
                <el-select placeholder="不限制" v-model="yesGsData.formData.areaTypeVal" @change="onChangeArea('ajaxYesGsList','yesGsData')">
                  <el-option label="不限制" value="0"></el-option>
                  <el-option label="川内企业" value="1"></el-option>
                  <el-option label="入川企业" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch('ajaxYesGsList','yesGsData')">
                  查询
                </el-button>
                <el-button @click="onResetForm('ajaxYesGsList','yesGsData')">
                  重置
                </el-button>
              </el-form-item>
              <el-form-item style="width:100px">
                <el-select placeholder="选择" v-model="yesGsData.formData.ryVal">
                  <el-option label value></el-option>
                  <el-option v-for="item in allUsers[user_cate]" :key="item.id" :label="item.username" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onDistribute('yesGsData','ajaxYesGsList')">
                  {{user_cate}}
                  <i class="el-icon-caret-right el-icon--right"></i>
                </el-button>
              </el-form-item>
            </el-form>
            <div style="flex:1">
              <el-table height="100%" border :data="yesGsData.tableList" v-loading="yesGsData.loading" @sort-change="yesTableSort" :row-style="tableRowClassName" @select-all="onSelect_yesGsRows" @select="onSelect_yesGsRows">
                <el-table-column type="selection" :selectable="disabledCheck" width="40px" align="center"></el-table-column>
                <el-table-column type="index" width="60" label="序号" align="center">
                  <template slot-scope="scope">{{scope.$index+(yesGsData.page-1)*yesGsData.row+1}}</template>
                </el-table-column>

                <el-table-column prop="gsmc" label="公司名称" align="center">
                  <template slot-scope="scope">
                    <div class="link_text" @click="openGs(scope.row)">{{scope.row.gsmc}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="zbxxids" width="105px" label="中标次数" align="center" sortable="custom">
                  <template slot-scope="scope">
                    <el-button @click="open_detail(scope.row,'zbxxids',1)" type="text">{{scope.row.zbxxids}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="zbids" width="105px" label="投标次数" align="center" sortable="custom">
                  <template slot-scope="scope">
                    <el-button @click="open_detail(scope.row,'zbids',1)" type="text">{{scope.row.zbids}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="flag" width="50px" label="标签" align="center">
                  <template slot-scope="scope">
                    <i @click="onShowDialog('ajaxYesGsList',scope.row,'yes')" v-if="scope.row.flag == 1" style="color:#00c0ff;font-size:18px;cursor:pointer;" class="el-icon-star-on"></i>
                    <i @click="onShowDialog('ajaxYesGsList',scope.row,'no')" style="font-size:18px;cursor:pointer;" v-else class="el-icon-star-off"></i>
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
            </div>
            <el-pagination style="margin-top:20px" :current-page.sync="yesGsData.page" @current-change="yesGsDataChangePage" @size-change="yesGsDataChangeSize" align="right" background layout="sizes,total,prev, pager, next" :total="yesGsData.total"></el-pagination>
          </div>
          <div>
            <p class="table-title" style="color:red">未审核公司集合</p>
            <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
              <el-form-item style="width:200px">
                <el-input clearable placeholder="公司名称" v-model="noGsData.formData.gsmc" @keydown.enter.native="onSearch('ajaxNoGsList','noGsData')"></el-input>
              </el-form-item>
              <el-form-item style="width:110px">
                <el-select placeholder="不限制" v-model="noGsData.formData.areaTypeVal" @change="onChangeArea('ajaxNoGsList','noGsData')">
                  <el-option label="不限制" value="0"></el-option>
                  <el-option label="川内企业" value="1"></el-option>
                  <el-option label="入川企业" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch('ajaxNoGsList','noGsData')">
                  查询
                </el-button>
                <el-button @click="onResetForm('ajaxNoGsList','noGsData')">
                  重置
                </el-button>
              </el-form-item>
            </el-form>
            <div style="flex:1">
              <el-table height="100%" border :data="noGsData.tableList" v-loading="noGsData.loading" :row-style="tableRowClassName" @sort-change="noTableSort">
                <el-table-column type="selection" :selectable="disabledCheck" width="50px" align="center"></el-table-column>
                <el-table-column type="index" width="60" label="序号" align="center">
                  <template slot-scope="scope">{{scope.$index+(noGsData.page-1)*noGsData.row+1}}</template>
                </el-table-column>

                <el-table-column prop="gsmc" label="公司名称" align="center">
                  <template slot-scope="scope">
                    <div class="link_text" @click="openGs(scope.row)">{{scope.row.gsmc}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="zbxxids" width="105px" label="中标次数" align="center" sortable="custom">
                  <template slot-scope="scope">
                    <el-button @click="open_detail(scope.row,'zbxxids',2)" type="text">{{scope.row.zbxxids}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="zbids" width="105px" label="投标次数" align="center" sortable="custom">
                  <template slot-scope="scope">
                    <el-button @click="open_detail(scope.row,'zbids',2)" type="text">{{scope.row.zbids}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="flag" width="50px" label="标签" align="center">
                  <template slot-scope="scope">
                    <i v-if="scope.row.flag == 1" style="color:#00c0ff;font-size:18px;cursor:pointer;" class="el-icon-star-on" @click="onShowDialog('ajaxNoGsList',scope.row,'yes')"></i>
                    <i style="font-size:18px;cursor:pointer;" v-else class="el-icon-star-off" @click="onShowDialog('ajaxNoGsList',scope.row,'no')"></i>
                  </template>
                </el-table-column>
                <el-table-column width="80px" label="审核" align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="ajaxOnYesorNoList(scope.row.gs_id,'0')">审核</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-pagination style="margin-top:20px" :current-page.sync="noGsData.page" @current-change="noGsDataChangePage" @size-change="noGsDataChangeSize" align="right" background layout="sizes,total,prev, pager, next" :total="noGsData.total"></el-pagination>
          </div>
        </div>
      </carousel-item>
      <carousel-item>
        <div class="diplay-flex-column">
          <p class="table-title" style="color:red">全部公司集合</p>
          <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
            <el-form-item style="width:180px">
              <el-input clearable placeholder="公司名称" v-model="allGsData.formData.gsmc" @keydown.enter.native="onSearch('ajaxAllGsList','allGsData')"></el-input>
            </el-form-item>
            <el-form-item style="width:110px">
              <el-select placeholder="不限制" v-model="allGsData.formData.areaTypeVal" @change="onChangeArea('ajaxAllGsList','allGsData')">
                <el-option label="不限制" value="0"></el-option>
                <el-option label="川内企业" value="1"></el-option>
                <el-option label="入川企业" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch('ajaxAllGsList','allGsData')">
                查询
              </el-button>
              <el-button @click="onResetForm('ajaxAllGsList','allGsData')">
                重置
              </el-button>
            </el-form-item>
            <el-form-item style="width:100px">
              <el-select placeholder="选择" v-model="allGsData.formData.ryVal">
                <el-option label value></el-option>
                <el-option v-for="item in allUsers[user_cate]" :key="item.id" :label="item.username" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onDistribute('allGsData','ajaxAllGsList')">
                {{user_cate}}
                <i class="el-icon-caret-right el-icon--right"></i>
              </el-button>
            </el-form-item>
          </el-form>
          <div style="flex:1">
            <el-table height="100%" border :data="allGsData.tableList" v-loading="allGsData.loading" :row-style="tableRowClassName" @select-all="onSelect_allGsRows" @select="onSelect_allGsRows">
              <el-table-column type="selection" :selectable="disabledCheck" width="50px" align="center"></el-table-column>
              <el-table-column type="index" width="60" label="序号" align="center">
                <template slot-scope="scope">{{scope.$index+(allGsData.page-1)*allGsData.row+1}}</template>
              </el-table-column>

              <el-table-column prop="gsmc" label="公司名称" align="center">
                <template slot-scope="scope">
                  <div class="link_text" @click="openGs(scope.row)">{{scope.row.gsmc}}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination style="margin-top:20px" :current-page.sync="allGsData.page" @current-change="allGsDataChangePage" @size-change="allGsDataChangeSize" align="right" background layout="sizes,total,prev, pager, next" :total="allGsData.total"></el-pagination>
        </div>
      </carousel-item>
    </carousel-card>
    <div style="margin:50px 0">
      <carousel-card height="650px">
        <carousel-item>
          <div class="diplay-flex-column">
            <p class="table-title" style="color:#2f80d1">标书制作已通过公司集合</p>
            <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
              <el-form-item style="width:180px">
                <el-input clearable placeholder="公司名称" v-model="yesGetedGsData.formData.gsmc" @keydown.enter.native="onSearch('ajaxYesGetedGsList','yesGetedGsData')"></el-input>
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
              <el-form-item style="width:100px">
                <el-select placeholder="选择" v-model="yesGetedGsData.formData.ryVal">
                  <el-option label value></el-option>
                  <el-option v-for="item in allUsers[user_cate]" :key="item.id" :label="item.username" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onDistribute_button('all','ajaxYesGetedGsList',yesGetedGsData.formData.ryVal,yesGetedGsData.selectRows,user_cate_prop)">
                  {{user_cate}}
                  <i class="el-icon-caret-right el-icon--right"></i>
                </el-button>
                <el-button @click="onDeleteGs('all','ajaxYesGetedGsList','yesGetedGsData')">批量删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-select style="width:150px" filterable placeholder="方案" v-model="yesGetedGsData.formData.planVal">
                  <el-option label value></el-option>
                  <el-option v-for="item in planList" :key="item.id" :label="item.node_name" :value="item.id"></el-option>
                </el-select>
                <el-button @click="onExecutePlan('yesGetedGsData','ajaxYesGetedGsList',yesGetedGsData.formData.planVal)">执行方案</el-button>
                <el-button @click="onIsDisplay('yes','ajaxYesGetedGsList',yesGetedGsData.selectRows)">开通展示</el-button>
                <el-button @click="onIsDisplay('no','ajaxYesGetedGsList',yesGetedGsData.selectRows)">取消开通</el-button>
              </el-form-item>
            </el-form>
            <div style="flex:1">
              <el-table height="100%" border :data="yesGetedGsData.tableList" v-loading="yesGetedGsData.loading" @select-all="onSelect_yesGetedGsRows" @select="onSelect_yesGetedGsRows">
                <el-table-column type="selection" width="50px" align="center"></el-table-column>

                <el-table-column type="index" width="60" label="序号" align="center">
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
                <el-table-column prop label="认识的人" width="100px" align="center">
                  <template slot-scope="scope">
                    <div v-if="scope.row.firm.length > 0">
                      <change-ry :ry_list="{'认识的人':computeKnow(scope.row.firm)}" :extraObj="{type:'认识的人',ajaxFn:'ajaxYesGetedGsList',dataObj:'yesGetedGsData',ry_type:user_cate_prop}" :row="scope.row" ry="选择" @onSelect="onListInSelect"></change-ry>
                    </div>
                    <div v-else>-</div>
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
            <p class="table-title" style="color:#2f80d1">制作标书人员集合</p>
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
              <el-table height="100%" border :data="getedRyData.tableList" v-loading="getedRyData.loading" @select-all="onSelect_getedRyRows" @select="onSelect_getedRyRows">
                <el-table-column type="selection" width="50px" align="center"></el-table-column>

                <el-table-column type="index" width="60" label="序号" align="center">
                  <template slot-scope="scope">{{scope.$index+(getedRyData.page-1)*getedRyData.row+1}}</template>
                </el-table-column>
                <el-table-column prop="username" label="人员" align="center"></el-table-column>
                <el-table-column prop="bs_check" label="标书制作" align="center">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.bs_check == 1" size="mini" type="success" icon="el-icon-check" circle @click="onRySwitch(scope.row,'no',scope.row.bs_check_group_id)"></el-button>
                    <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="onRySwitch(scope.row,'yes',scope.row.bs_check_group_id)"></el-button>
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
            <el-pagination style="margin-top:20px" :current-page.sync="getedRyData.page" @current-change="getedRyChangePage" @size-change="getedRyChangeSize" align="right" background layout="sizes,total,prev, pager, next" :total="getedRyData.total"></el-pagination>
          </div>
        </carousel-item>
        <carousel-item>
          <div class="diplay-flex-column">
            <p class="table-title" style="color:red">标书制作未通过公司集合</p>
            <el-form inline size="medium" style="font-size:0" @submit.native.prevent>
              <el-form-item style="width:180px">
                <el-input clearable placeholder="公司名称" v-model="noGetedGsData.formData.gsmc" @keydown.enter.native="onSearch('ajaxNoGetedGsList','noGetedGsData')"></el-input>
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
              <el-form-item style="width:100px">
                <el-select placeholder="选择" v-model="noGetedGsData.formData.ryVal">
                  <el-option label value></el-option>
                  <el-option v-for="item in allUsers[user_cate]" :key="item.id" :label="item.username" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onDistribute_button('all','ajaxNoGetedGsList',noGetedGsData.formData.ryVal,noGetedGsData.selectRows,user_cate_prop)">
                  {{user_cate}}
                  <i class="el-icon-caret-right el-icon--right"></i>
                </el-button>
                <el-button @click="onDeleteGs('all','ajaxNoGetedGsList','noGetedGsData')">批量删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-select style="width:150px" filterable placeholder="方案" v-model="noGetedGsData.formData.planVal">
                  <el-option label value></el-option>
                  <el-option v-for="item in planList" :key="item.id" :label="item.node_name" :value="item.id"></el-option>
                </el-select>
                <el-button @click="onExecutePlan('noGetedGsData','ajaxNoGetedGsList',noGetedGsData.formData.planVal)">执行方案</el-button>
                <el-button @click="onIsDisplay('yes','ajaxNoGetedGsList',noGetedGsData.selectRows)">开通展示</el-button>
                <el-button @click="onIsDisplay('no','ajaxNoGetedGsList',noGetedGsData.selectRows)">取消开通</el-button>
              </el-form-item>
            </el-form>
            <div style="flex:1">
              <el-table height="100%" border :data="noGetedGsData.tableList" v-loading="noGetedGsData.loading" @select-all="onSelect_noGetedGsRows" @select="onSelect_noGetedGsRows">
                <el-table-column type="selection" width="50px" align="center"></el-table-column>

                <el-table-column type="index" width="60" label="序号" align="center">
                  <template slot-scope="scope">{{scope.$index+(noGetedGsData.page-1)*noGetedGsData.row+1}}</template>
                </el-table-column>
                <el-table-column prop="gsmc" label="公司名称" align="center">
                  <template slot-scope="scope">
                    <div class="link_text" @click="openGs(scope)">{{scope.row.gsmc}}</div>
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
                <el-table-column prop label="认识的人" align="center">
                  <template slot-scope="scope">
                    <div v-if="scope.row.firm.length > 0">
                      <change-ry :ry_list="{'认识的人':computeKnow(scope.row.firm)}" :extraObj="{type:'认识的人',ajaxFn:'ajaxNoGetedGsList',dataObj:'noGetedGsData',ry_type:user_cate_prop}" :row="scope.row" ry="选择" @onSelect="onListInSelect"></change-ry>
                    </div>
                    <div v-else>-</div>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="已选方案" align="center"></el-table-column>
                <el-table-column prop="sign" width="300px" label="条件满足概况" align="center">
                  <template slot-scope="scope">
                    <div style="cursor:pointer">
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
        <el-form-item style="margin-top:40px;">
          <el-button type="primary" @click="onTagSave">提 交</el-button>
          <el-button @click="tagDialogData.dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="tagDialogData.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTagSave">提 交</el-button>
      </span> -->
    </el-dialog>
    <!-- 负责公司的弹框 -->
    <el-dialog title="负责公司" :visible.sync="userGslist.dialogVisible" top="50px">
      <el-table :data="userGslist.tableList" height="600px" style="width: 100%" border>
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
    <div v-if="zb_tb_count.dialogVisible">
      <el-dialog title="项目" :visible.sync="zb_tb_count.dialogVisible" width="70%" top="50px">
        <bid-xm :xm="zb_tb_count.data"></bid-xm>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import carouselCard from "./sonPage/carouselCard.vue";
import carouselItem from "./sonPage/carouselItem.vue";
import changeRy from "./template/changeRy.vue";
import bidXm from "./template/bidXm.vue";

export default {
    components: {
        carouselCard,
        carouselItem,
        changeRy,
        bidXm
    },
    data() {
        return {
            zb_tb_count: {
                dialogVisible: false,
                data: {
                    thread_id: "",
                    jbxx_id: ""
                }
            },
            xm_info: {
                xmmc: ""
            },
            user_cate: "标书制作",
            user_cate_prop: "tender_user_id",
            //用户数据
            allUsers: {},
            // 方案列表
            planList: [],
            jbxx_id: this.$route.query.jbxx_id,
            last_treeId: this.$route.query.last_treeId,
            human_id: this.$route.query.thread_id,
            node: {
                ry_node: "",
                yj_node: "",
                zz_node: ""
            },
            //标签弹框数据
            tagDialogData: {
                dialogVisible: false,
                row: null,
                ajaxFn: null,
                formData: {
                    id: "",
                    qyxz: "",
                    tbpl: "",
                    cooperation: "",
                    issue: "",
                    content: ""
                }
            },
            //人员负责公司
            userGslist: {
                dialogVisible: false,
                loading: false,
                tableList: [],
                // 查看公司列表当前行
                selected_row: "",
                total: 0,
                row: 10,
                page: 1
            },
            // 已审核数据
            yesGsData: {
                formData: {
                    gsmc: "",
                    areaTypeVal: "0",
                    ryVal: ""
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
                    gsmc: "",
                    areaTypeVal: "0"
                },
                row: 10,
                tableList: [],
                total: 0,
                page: 1,
                loading: false
            },
            //全部公司数据
            allGsData: {
                formData: {
                    gsmc: "",
                    areaTypeVal: "0",
                    ryVal: ""
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
                    gsmc: "",
                    areaTypeVal: "0",
                    ryVal: "",
                    planVal: ""
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
                    ryVal: ""
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
                    gsmc: "",
                    areaTypeVal: "0" /*川内川外地区*/,
                    ryVal: "",
                    planVal: ""
                },
                row: 10,
                page: 1,
                total: 0,
                selectRows: [],
                tableList: [],
                loading: false
            },
            role: {}
        };
    },
    created() {
        this.fn_role();
        this.ajaxXmInfo();
        this.getPlans();
        this.ajaxGetUser();
        this.ajaxAllGsList();
        this.ajaxYesGetedGsList();
        this.ajaxGetedRyList();
        this.ajaxNoGetedGsList();
    },
    methods: {
        // 权限控制 点击公司名称时
        fn_role() {
            let self = this;
            self.axios.post(
                "/index/mine/role",
                {
                    user_id: this.$store.state.userInfo.user_id,
                    company_id: localStorage.getItem("company_id")
                },
                data => {
                    this.role = data;
                }
            );
        },
        changePageUserGsList(val) {
            this.userGslist.page = val;
            this.ajaxGetUseredGslist();
        },
        open_detail(row, sortField, type) {
            this.zb_tb_count.dialogVisible = true;
            this.zb_tb_count.data = {
                thread_id: this.human_id,
                jbxx_id: this.jbxx_id,
                type,
                gs_id: row.gs_id,
                sortField: sortField
            };
        },
        //获取项目基本信息
        ajaxXmInfo() {
            this.axios.post(
                "/Index/project/edit",
                {
                    jbxx_id: this.jbxx_id
                },
                data => {
                    this.xm_info = data.res;
                    document.title = "标书：" + data.res.xmmc;
                }
            );
        },
        //认识的人计算
        computeKnow(d) {
            return d.map(v => {
                return {
                    id: v.user_id,
                    username: v.username
                };
            });
        },
        //获取节点
        getNode() {
            this.axios.post(
                "/index/company/node",
                {
                    thread_id: this.human_id,
                    jbxx_id: this.jbxx_id
                },
                data => {
                    data.forEach(v => {
                        if (v.name == "业绩") {
                            this.node.yj_node = v.id;
                        } else if (v.name == "人员") {
                            this.node.ry_node = v.id;
                        } else if (v.name == "资质") {
                            this.node.zz_node = v.id;
                        }
                    });
                }
            );
        },
        //获取人员列表
        ajaxGetUser() {
            this.axios.post(
                "/index/project/getUsers",
                {
                    company_id: localStorage.getItem("company_id")
                },
                data => {
                    this.allUsers = data.rows;
                }
            );
        },
        //获取方案列表
        getPlans() {
            this.axios.post(
                "/Index/thread/getThread",
                {
                    jbxx_id: this.jbxx_id,
                    cate: 2
                },
                data => {
                    if (data.status == "failed") {
                        this.planList = [];
                    } else {
                        this.planList = data.rows;
                    }
                    this.ajaxYesGsList();
                    this.ajaxNoGsList();
                    this.getNode();
                }
            );
        },
        //列表已经被选颜色
        tableRowClassName({ row, rowIndex }) {
            if (row.exit == 1) {
                return { backgroundColor: "#e5e5e5" };
            }
        },
        //已审核排序
        yesTableSort(column, prop, order) {
            if (column.order == "descending") {
                order = "desc";
            } else {
                order = "asc";
            }
            this.yesGsData.page = 1;
            this.yesGsData.total = 0;
            this.ajaxYesGsList(column.prop, order);
        },
        //未审核排序
        noTableSort(column, prop, order) {
            if (column.order == "descending") {
                order = "desc";
            } else {
                order = "asc";
            }
            this.noGsData.page = 1;
            this.noGsData.total = 0;
            this.ajaxNoGsList(column.prop, order);
        },
        //是否可选择列表多选框
        disabledCheck(row, index) {
            if (row.exit == 1) {
                return false;
            } else {
                return true;
            }
        },
        //点击标签
        onShowDialog(ajaxFn, row, type) {
            this.tagDialogData.dialogVisible = true;
            this.tagDialogData.ajaxFn = ajaxFn;
            this.tagDialogData.row = row;
            if (type == "yes") {
                this.ajaxTagData();
            } else {
                let obj = {
                    ajaxFn: ajaxFn,
                    qyxz: "",
                    tbpl: "",
                    id: "",
                    cooperation: "",
                    issue: "",
                    content: ""
                };
                this.tagDialogData.formData = obj;
            }
        },
        //删除标签备注
        onDeleteTagOther(id) {
            this.axios.post(
                "/Index/Others/delete",
                {
                    id
                },
                data => {
                    this.ajaxTagData();
                }
            );
        },
        //获取标签数据
        ajaxTagData() {
            this.axios.post(
                "/Index/Others/labelShow",
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
                        content: "",
                        id: data.rows.id
                    };
                    this.tagDialogData.formData = obj;
                }
            );
        },
        //点击保存标签
        onTagSave() {
            this.axios.post(
                "/Index/Others/label",
                {
                    thread_id: this.human_id,
                    gs_id: this.tagDialogData.row.gs_id,
                    id: this.tagDialogData.formData.id,
                    type: "list",
                    content: this.tagDialogData.formData.content,
                    qyxz: this.tagDialogData.formData.qyxz,
                    tbpl: this.tagDialogData.formData.tbpl,
                    cooperation: this.tagDialogData.formData.cooperation,
                    issue: this.tagDialogData.formData.issue
                },
                data => {
                    this.tagDialogData.dialogVisible = false;
                    let ajaxFn = this.tagDialogData.ajaxFn;
                    this[ajaxFn]();
                }
            );
        },
        // 已审核公司集合
        ajaxYesGsList(ordername = "", order = "desc") {
            if (typeof ordername == "object") {
                ordername = "";
            }
            this.yesGsData.loading = true;
            let queryObj = {
                user_cate: this.user_cate,
                jbxx_id: this.jbxx_id,
                id: this.human_id,
                gsmc: this.yesGsData.formData.gsmc,
                scale: this.yesGsData.formData.areaTypeVal,
                valid: 1,
                rows: this.yesGsData.row,
                page: this.yesGsData.page,
                order
            };
            if (ordername) {
                queryObj.ordername = ordername;
            }
            this.axios.post("/Index/thread/audited?type=1", queryObj, data => {
                if (this.yesGsData.page > 1 && data.status == "failed") {
                    this.yesGsData.page -= 1;
                    this.ajaxYesGsList();
                    return;
                }
                this.yesGsData.loading = false;
                this.yesGsData.tableList = data.rows || [];
                this.yesGsData.total = data.total || 0;
                this.yesGsData.selectRows = [];
            });
        },
        // 未审核公司集合
        ajaxNoGsList(ordername = "", order = "desc") {
            if (typeof ordername == "object") {
                ordername = "";
            }
            this.noGsData.loading = true;
            let queryObj = {
                user_cate: this.user_cate,
                jbxx_id: this.jbxx_id,
                id: this.human_id,
                gsmc: this.noGsData.formData.gsmc,
                scale: this.noGsData.formData.areaTypeVal,
                valid: 1,
                rows: this.noGsData.row,
                page: this.noGsData.page,
                order
            };
            if (ordername) {
                queryObj.ordername = ordername;
            }
            this.axios.post("/Index/thread/audited?type=0", queryObj, data => {
                if (this.noGsData.page > 1 && data.status == "failed") {
                    this.noGsData.page -= 1;
                    this.ajaxNoGsList();
                    return;
                }
                this.noGsData.loading = false;
                this.noGsData.tableList = data.rows || [];
                this.noGsData.total = data.total || 0;
            });
        },
        //全部公司集合
        ajaxAllGsList() {
            this.allGsData.loading = true;
            this.axios.post(
                "/index/element_set/getAllCompany",
                {
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
                    this.allGsData.loading = false;
                    this.allGsData.tableList = data.rows || [];
                    this.allGsData.total = data.total || 0;
                    this.allGsData.selectRows = [];
                }
            );
        },
        // 已拿到公司集合
        ajaxYesGetedGsList() {
            this.yesGetedGsData.loading = true;
            this.axios.post(
                "/index/element_set/getAllotedCompany",
                {
                    user_cate: this.user_cate,
                    valid: 1,
                    jbxx_id: this.jbxx_id,
                    gsmc: this.yesGetedGsData.formData.gsmc,
                    scale: this.yesGetedGsData.formData.areaTypeVal,
                    rows: this.yesGetedGsData.row,
                    page: this.yesGetedGsData.page
                },
                data => {
                    if (
                        this.yesGetedGsData.page > 1 &&
                        data.rows.length == 0 &&
                        data.status == "success"
                    ) {
                        this.yesGetedGsData.page -= 1;
                        this.ajaxYesGetedGsList();
                        return;
                    }
                    this.yesGetedGsData.loading = false;
                    this.yesGetedGsData.tableList = data.rows || [];
                    this.yesGetedGsData.total = data.total || 0;
                    this.yesGetedGsData.selectRows = [];
                }
            );
        },
        //未拿到公司集合
        ajaxNoGetedGsList() {
            this.noGetedGsData.loading = true;
            this.axios.post(
                "/index/element_set/getAllotedCompany",
                {
                    user_cate: this.user_cate,
                    valid: 2,
                    jbxx_id: this.jbxx_id,
                    gsmc: this.noGetedGsData.formData.gsmc,
                    scale: this.noGetedGsData.formData.areaTypeVal,
                    rows: this.noGetedGsData.row,
                    page: this.noGetedGsData.page
                },
                data => {
                    this.noGetedGsData.loading = false;
                    this.noGetedGsData.tableList = data.rows || [];
                    this.noGetedGsData.total = data.total || 0;
                    this.noGetedGsData.selectRows = [];
                }
            );
        },
        //拿公司人员集合
        ajaxGetedRyList() {
            this.getedRyData.loading = true;
            this.axios.post(
                "/index/element_set/getUserBaseInfo",
                {
                    jbxx_id: this.jbxx_id,
                    type: this.user_cate,
                    rows: this.getedRyData.row,
                    page: this.getedRyData.page
                },
                data => {
                    if (
                        this.getedRyData.page > 1 &&
                        data.rows.length == 0 &&
                        data.status == "success"
                    ) {
                        this.getedRyData.page -= 1;
                        this.ajaxGetedRyList();
                        return;
                    }
                    this.getedRyData.loading = false;
                    this.getedRyData.tableList = data.rows || [];
                    this.getedRyData.total = data.total || 0;
                    this.getedRyData.selectRows = [];
                }
            );
        },
        //审核未审核公司操作
        ajaxOnYesorNoList(gs_id, type) {
            this.axios.post(
                "/Index/thread/Auditing",
                {
                    id: this.human_id,
                    jbxx_id: this.jbxx_id,
                    gs_id,
                    type,
                    node_id: this.last_treeId,
                    node_name: "人员"
                },
                data => {
                    if (data.status == "success") {
                        this.ajaxYesGsList();
                        this.ajaxNoGsList();
                    }
                }
            );
        },
        //改变是否是否川内外
        onChangeArea(ajaxObj, dataobj) {
            this[dataobj].page = 1;
            this[ajaxObj]();
        },
        //同意重置事件
        onResetForm(ajaxObj, dataObj) {
            this[dataObj].formData.gsmc = "";
            this[dataObj].formData.areaTypeVal = "0";
            this[dataObj].page = 1;
            this[dataObj].total = 0;
            this[ajaxObj]();
        },
        //搜索
        onSearch(ajaxObj, dataObj) {
            this[dataObj].page = 1;
            this[dataObj].total = 0;
            this[ajaxObj]();
        },
        //派发人员
        onDistribute(dataObj, ajaxObj) {
            let gs_id = this[dataObj].selectRows.map(v => v.gs_id);
            if (gs_id.length == 0) {
                this.$message.error("请选择公司");
                return;
            }
            let username = "";
            if (this[dataObj].formData.ryVal) {
                username = this.allUsers[this.user_cate].filter(
                    v => v.id == this[dataObj].formData.ryVal
                )[0].username;
            }
            this.axios.post(
                "/index/element_set/addCompanyToProject",
                {
                    company_id: localStorage.getItem("company_id"),
                    jbxx_id: this.jbxx_id,
                    gs_ids: gs_id.join(","),
                    user_id: this[dataObj].formData.ryVal,
                    username,
                    user_cate: this.user_cate
                },
                data => {
                    this[ajaxObj]();
                    this.ajaxYesGetedGsList();
                    this.ajaxGetedRyList();
                }
            );
        },
        //查看结果集合
        onCheck(row) {
            let { href } = this.$router.resolve({
                path: `/bidResultRyYJ?jbxx_id=${this.jbxx_id}&gs_id=${
                    row.gs_id
                }&yj_id=${this.node.yj_node}&ry_id=${this.node.ry_node}&flag=0`
            });
            window.open(href);
        },
        //查看结果集
        onCheckResult(row) {
            var yj_id, ry_id;
            row.sign.forEach(v => {
                if (v.name == "业绩") {
                    yj_id = v.id;
                } else if (v.name == "人员") {
                    ry_id = v.id;
                }
            });
            let { href } = this.$router.resolve({
                path: `/bidResultRyYJ?jbxx_id=${this.jbxx_id}&gs_id=${
                    row.gs_id
                }&yj_id=${yj_id}&ry_id=${ry_id}&flag=1`
            });
            window.open(href);
        },
        //下部分列表分配公司
        onDistribute_button(
            type,
            ajaxObj,
            user_id,
            gs_id,
            ry_type,
            username = ""
        ) {
            if (type == "all") {
                gs_id = gs_id.map(v => v.gs_id);
                if (gs_id.length == 0) {
                    this.$message.error("请选择公司");
                    return;
                }
                gs_id = gs_id.join(",");
                if (user_id) {
                    username = this.allUsers[this.user_cate].filter(
                        v => v.id == user_id
                    )[0].username;
                }
            }
            let queryObj = {
                jbxx_id: this.jbxx_id,
                gs_id: gs_id,
                type: 2,
                company_id: localStorage.getItem("company_id"),
                username
            };
            queryObj[ry_type] = user_id;
            this.axios.post(
                "/index/element_set/editCompanyToProject",
                queryObj,
                data => {
                    this[ajaxObj]();
                    this.ajaxGetedRyList();
                }
            );
        },
        //执行方案
        onExecutePlan(dataObj, ajaxFn, planid) {
            let gs_id = this[dataObj].selectRows.map(v => v.gs_id);
            if (gs_id.length == 0) {
                this.$message.error("请选择公司");
                return;
            }
            gs_id = gs_id.join(",");
            this[dataObj].loading = true;
            let nowPlan = this.planList.filter(v => v.id == planid);
            if (nowPlan.length == 0) {
                nowPlan.node_name = "";
                nowPlan.cate = "";
            } else {
                nowPlan = nowPlan[0];
            }
            this.yesGetedGsData.loading = true;

            this.axios.post(
                "/index/Human_Allot/executePlan",
                {
                    jbxx_id: this.jbxx_id,
                    thread_id: planid,
                    gs_id,
                    name: nowPlan.node_name || "",
                    cate: nowPlan.cate || "",
                    case: planid ? 0 : 1
                },
                data => {
                    this[ajaxFn]();
                }
            );
        },
        // 删除分配公司
        onDeleteGs(type, ajaxObj, gs_idOrDataObj) {
            this.$confirm("确认删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    if (type == "all") {
                        gs_idOrDataObj = this[gs_idOrDataObj].selectRows.map(
                            v => v.gs_id
                        );
                        if (gs_idOrDataObj.length == 0) {
                            this.$message.error("请选择公司");
                            return;
                        }
                        gs_idOrDataObj = gs_idOrDataObj.join(",");
                    }
                    this.axios.post(
                        "/index/element_set/editCompanyToProject",
                        {
                            company_id: localStorage.getItem("company_id"),
                            human_id: this.human_id,
                            gs_id: gs_idOrDataObj,
                            type: 1,
                            jbxx_id: this.jbxx_id,
                            diff: this.user_cate
                        },
                        data => {
                            if (data.status == "success") {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                this[ajaxObj]();
                                this.ajaxYesGsList();
                                this.ajaxAllGsList();
                                this.ajaxNoGsList();
                            }
                        }
                    );
                })
                .catch(() => {});
        },
        //是否开通展示
        onIsDisplay(type, ajaxFn, rows, typeAllOne) {
            if (rows.length == 0) {
                this.$message.error("请选择公司");
                return;
            }
            let url, queryObj;
            if (type == "yes") {
                //开通
                url = "/Index/Project/saveDisplay";
                rows = rows.map(v => {
                    let obj = [v.gs_id, 0, 0, v.cate];
                    if (v.sign) {
                        v.sign.forEach(v2 => {
                            if (v2.name == "业绩") {
                                obj[1] = v2.id;
                            } else if (v2.name == "人员") {
                                obj[2] = v2.id;
                            }
                        });
                    }
                    return obj;
                });
                rows = JSON.stringify(rows);
                queryObj = {
                    data: rows,
                    jbxx_id: this.jbxx_id
                };
            } else {
                //关闭
                url = "/Index/Project/delDisplay";
                rows = rows.map(v => v.gs_id).join(",");
                queryObj = {
                    gs_id: rows,
                    jbxx_id: this.jbxx_id
                };
            }
            this.axios.post(url, queryObj, data => {
                this[ajaxFn]();
            });
        },

        //列表中的选择人员回调
        onListInSelect(obj) {
            this.onDistribute_button(
                "one",
                obj.ajaxFn,
                obj.ry_id,
                obj.gs_id,
                obj.ry_type,
                obj.username
            );
        },

        // 人员集合开通配置
        onRySwitch(row, type, id) {
            let group_id;
            if (type == "no") {
                let a = row.group_id.split(",");
                if (a.indexOf(id + "") >= 0) {
                    a.splice(a.indexOf(id + ""), 1);
                }
                group_id = a.join(",");
            } else {
                if (row.group_id) {
                    group_id = row.group_id.split(",");
                    group_id.push(id);
                    group_id = group_id.join(",");
                } else {
                    group_id = id;
                }
            }
            let username = "";
            if (row.user_id) {
                username = this.allUsers[this.user_cate].filter(
                    v => v.id == row.user_id
                )[0].username;
            }
            this.axios.post(
                "/index/element_set/personAllot",
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
                    this.ajaxGetedRyList();
                }
            );
        },
        //删除人员集合type是否是多选或单个删除
        onDeleteRy(type, row) {
            this.$confirm("确认删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let user_id;
                    if (type == "all") {
                        if (this.getedRyData.selectRows.length == 0) {
                            this.$message.error("请选择人员");
                            return;
                        }
                        user_id = this.getedRyData.selectRows.map(
                            v => v.user_id
                        );
                        user_id = user_id.join(",");
                    } else {
                        user_id = row.user_id;
                    }
                    this.axios.post(
                        "/index/element_set/personAllot",
                        {
                            jbxx_id: this.jbxx_id,
                            user_id,
                            type: 3,
                            diff: this.user_cate
                        },
                        data => {
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                            this.ajaxGetedRyList();
                            this.ajaxYesGsList();
                            this.ajaxNoGsList();
                            this.ajaxAllGsList();
                            this.ajaxYesGetedGsList();
                            this.ajaxNoGetedGsList();
                        }
                    );
                })
                .catch(() => {});
        },
        //添加人员集合
        onAddRyList() {
            let username = this.allUsers[this.user_cate].filter(
                v => this.getedRyData.formData.ryVal == v.id
            );
            username = username[0].username;
            this.axios.post(
                "/index/element_set/personAllot",
                {
                    jbxx_id: this.jbxx_id,
                    username,
                    user_id: this.getedRyData.formData.ryVal,
                    type: 1,
                    diff: this.user_cate
                },
                data => {
                    this.ajaxGetedRyList();
                }
            );
        },

        //选中列表多选框
        onSelect_yesGsRows(rows) {
            this.yesGsData.selectRows = rows;
        },
        onSelect_allGsRows(rows) {
            this.allGsData.selectRows = rows;
        },
        onSelect_yesGetedGsRows(rows) {
            this.yesGetedGsData.selectRows = rows;
        },
        onSelect_noGetedGsRows(rows) {
            this.noGetedGsData.selectRows = rows;
        },
        onSelect_getedRyRows(rows) {
            this.getedRyData.selectRows = rows;
        },
        //跳转页数
        yesGsDataChangePage(val) {
            this.yesGsData.page = val;
            this.ajaxYesGsList();
        },
        yesGsDataChangeSize(val) {
            this.yesGsData.row = val;
            this.yesGsData.page = 1;
            this.yesGsData.total = 0;
            this.ajaxYesGsList();
        },
        noGsDataChangePage(val) {
            this.noGsData.page = val;
            this.ajaxNoGsList();
        },
        noGsDataChangeSize(val) {
            this.noGsData.row = val;
            this.noGsData.page = 1;
            this.noGsData.total = 0;
            this.ajaxNoGsList();
        },
        allGsDataChangePage(val) {
            this.allGsData.page = val;
            this.ajaxAllGsList();
        },
        allGsDataChangeSize(val) {
            this.allGsData.row = val;
            this.allGsData.page = 1;
            this.allGsData.total = 0;
            this.ajaxAllGsList();
        },
        yesGetedGsChangePage(val) {
            this.yesGetedGsData.page = val;
            this.ajaxYesGetedGsList();
        },
        yesGetedGsChangeSize(val) {
            this.yesGetedGsData.row = val;
            this.yesGetedGsData.page = 1;
            this.yesGetedGsData.total = 0;
            this.ajaxYesGetedGsList();
        },
        getedRyChangePage(val) {
            this.getedRyData.page = val;
            this.ajaxGetedRyList();
        },
        getedRyChangeSize(val) {
            this.getedRyData.row = val;
            this.getedRyData.page = 1;
            this.getedRyData.total = 0;
            this.ajaxGetedRyList();
        },
        noGetedGsChangePage(val) {
            this.noGetedGsData.page = val;
            this.ajaxNoGetedGsList();
        },
        noGetedGsChangeSize(val) {
            this.noGetedGsData.row = val;
            this.noGetedGsData.page = 1;
            this.noGetedGsData.total = 0;
            this.ajaxNoGetedGsList();
        },
        //负责人公司
        onGetUserGsList(row) {
            this.selected_row = row;
            this.userGslist.tableList = [];
            this.userGslist.dialogVisible = true;
            this.ajaxGetUseredGslist();
        },
        //删除负责人公司
        onDeleUserGs(row) {
            this.axios.post(
                "/index/element_set/editCompanyToProject",
                {
                    company_id: localStorage.getItem("company_id"),
                    gs_id: row.gs_id,
                    human_id: this.human_id,
                    user_id: this.userGslist.selected_row.user_id,
                    type: 1,
                    c_phase: row.c_phase,
                    jbxx_id: this.jbxx_id,
                    diff: this.user_cate
                },
                data => {
                    this.ajaxGetUseredGslist();
                    this.ajaxYesGetedGsList();
                    this.ajaxNoGetedGsList();
                    this.ajaxYesGsList();
                    this.ajaxNoGsList();
                    this.ajaxAllGsList();
                }
            );
        },
        //获取人员负责公司列表
        ajaxGetUseredGslist() {
            this.userGslist.loading = true;
            this.axios.post(
                "/index/element_set/getUserCompany",
                {
                    user_id: this.selected_row.user_id,
                    jbxx_id: this.jbxx_id,
                    type: this.user_cate,
                    rows: this.userGslist.row,
                    page: this.userGslist.page
                },
                data => {
                    if (
                        this.userGslist.page == 1 &&
                        data.status == "success" &&
                        data.rows.length == 0
                    ) {
                        this.userGslist.page -= 1;
                        this.ajaxGetUseredGslist();
                        return;
                    }
                    this.userGslist.loading = false;
                    this.userGslist.tableList = data.rows || [];
                    this.userGslist.total = data.total || 0;
                }
            );
        },
        //发送短信
        sendMessage(row) {
            this.$confirm("向该用户发送消息提醒?", "提示", {
                type: "warning"
            })
                .then(_ => {
                    this.axios.post(
                        "/index/element_set/sendMessage",
                        {
                            jbxx_id: this.jbxx_id,
                            user_id: row.user_id
                        },
                        data => {
                            this.$message.success("已发送");
                        }
                    );
                })
                .catch(_ => {});
        },
        // 跳转
        openGs(row) {
            if (this.role.company_role !== "C") {
                let { href } = this.$router.resolve({
                    path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.gsmc}`
                });
                window.open(href, "公司详情" + row.gs_id);
            } else {
            this.axios.post('/index/mine/roleCompSource', { gs_id: row.gs_id }, res => {
          // 获取跳转页面结果
          //   console.log(res)
                if (res === '四川省建设厅') {
                    let { href } = this.$router.resolve({
                    path: `/gs_scjst?gs_id=${row.gs_id}`
                    })
                    window.open(href, '/gs_scjst' + row.gs_id)
                } else {
                    let { href } = this.$router.resolve({
                    path: `/gs_building?gs_id=${row.gs_id}`
                    })
                    window.open(href, '/gs_building' + row.gs_id)
                }
                })
            }
        }
    }
};
</script>

<style lang="less" scoped>
.table-title {
    margin: 20px auto;
    text-align: center;
    font-size: 28px;
}
.ys-ws-divs {
    height: 100%;
    display: flex;
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
</style>

