<template>
  <div style="1300px">
    <body-top></body-top>
    <headMenu :index="'/indexBid'"></headMenu>
    <!-- <el-row class="tabs" v-if="role.person_user">
      <span class="cursor" v-bind:class="activeBtn=='ry' ? 'activeBtn' : ''" @click="switchTabs('ry')">人员管理</span>
      <span class="cursor" v-bind:class="activeBtn=='xm' ? 'activeBtn' : ''" @click="switchTabs('xm')">项目管理</span>
    </el-row>-->
    <!-- <div class="container">
      <transition name="fade" mode="out-in" appear>
        <div v-show="activeBtn=='ry'" class="pos_top container_ry">
          <el-row class="title">
            <el-col :span="3">
              <h2>企业人员</h2>
            </el-col>
            <el-col :span='1'>
              <el-button type="primary" @click="addRy">添加</el-button>
            </el-col>
            <el-col :span='5' :offset="15">
              <el-input placeholder="请输入人员名称" v-model="table_ry.input" @keydown.enter.native="searchFn('ry')" clearable>
                <el-button class="btn_search" slot="append" icon="el-icon-search" @click="searchFn('ry')"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <template>
              <el-table :data="table_ry.data" style="width: 100%;height:600px" border v-loading="loading">
                <el-table-column type="index" width="60" label="序号" align="center">
                  <template slot-scope="scope">
                    {{scope.$index+(table_ry.page-1)*10+1}}
                  </template>
                </el-table-column>
                <el-table-column prop="username" label="人员名称" width="180" align="center">
                </el-table-column>
                <el-table-column prop="cellphone" label="电话号码" width="180" align="center">
                </el-table-column>
                <el-table-column prop="group" label="权限配置" align="center">
                </el-table-column>
                <el-table-column prop="" label="操作" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button size="small" @click="ryTableEdit(scope.row)" type="primary">编辑</el-button>
                    <el-button size="small" @click="ryTableDel(scope.row)" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination align="right" @current-change="changePageRy" :current-page.sync="table_ry.page" background layout="total,prev, pager, next" :total="table_ry.total" class="pagination"></el-pagination>
            </template>
          </el-row>
        </div>
      </transition>
    </div>-->
    <div class="container" style="width:100%">
      <transition>
        <div class="pos_top container_xm">
          <ul v-if="role.company_user" class="tab_ul" :style="{width: role.company_user ? '1200px' : '1200px'}">
            <li @click="switchXmTabs('预定')" v-bind:class="table_xm.activeBtn=='预定' ? 'activeLi' : ''">
              <span>预定({{stageNum['预定']}}条)</span>
              <img :src="table_xm.activeBtn=='预定' ? table_xm.images.l11u : table_xm.images.l22d" alt>
            </li>
            <li @click="switchXmTabs('报名')" v-bind:class="table_xm.activeBtn=='报名' ? 'activeLi' : ''">
              <span>报名(上网)({{stageNum['报名']}}条)</span>
              <img :src="table_xm.activeBtn=='报名' ? table_xm.images.l11u : table_xm.images.l22d" alt>
            </li>
            <li @click="switchXmTabs('标书')" v-bind:class="table_xm.activeBtn=='标书' ? 'activeLi' : ''">
              <span>标书({{stageNum['标书']}}条)</span>
              <img :src="table_xm.activeBtn=='标书' ? table_xm.images.l11u : table_xm.images.l22d" alt>
            </li>
            <li @click="switchXmTabs('开标')" v-bind:class="table_xm.activeBtn=='开标' ? 'activeLi' : ''">
              <span>开标({{stageNum['开标']}}条)</span>
              <img :src="table_xm.activeBtn=='开标' ? table_xm.images.l11u : table_xm.images.l22d" alt>
            </li>
            <li @click="switchXmTabs('过期')" v-bind:class="table_xm.activeBtn=='过期' ? 'activeLi' : ''">
              <span>过期({{stageNum['过期']}}条)</span>
              <img :src="table_xm.activeBtn=='过期' ? table_xm.images.l11u : table_xm.images.l22d" alt>
            </li>
            <li @click="switchXmTabs('已关闭')" v-bind:class="table_xm.activeBtn=='已关闭' ? 'activeLi' : ''">
              <span>已关闭({{stageNum['已关闭']}}条)</span>
              <img :src="table_xm.activeBtn=='已关闭' ? table_xm.images.l55u : table_xm.images.l55d" alt>
            </li>
          </ul>
          <ul v-else class="tab_ul2" :style="{width: role.company_user ? '1200px' : '1200px'}">
            <li @click="switchXmTabs('预定')" v-bind:class="table_xm.activeBtn=='预定' ? 'activeLi' : ''">
              <span>预定({{stageNum['预定']}}条)</span>
              <img :src="table_xm.activeBtn=='预定' ? table_xm.images.l1u : table_xm.images.l2d" alt>
            </li>
            <li @click="switchXmTabs('报名')" v-bind:class="table_xm.activeBtn=='报名' ? 'activeLi' : ''">
              <span>报名(上网)({{stageNum['报名']}}条)</span>
              <img :src="table_xm.activeBtn=='报名' ? table_xm.images.l1u : table_xm.images.l2d" alt>
            </li>
            <li @click="switchXmTabs('标书')" v-bind:class="table_xm.activeBtn=='标书' ? 'activeLi' : ''">
              <span>标书({{stageNum['标书']}}条)</span>
              <img :src="table_xm.activeBtn=='标书' ? table_xm.images.l1u : table_xm.images.l2d" alt>
            </li>
            <li @click="switchXmTabs('开标')" v-bind:class="table_xm.activeBtn=='开标' ? 'activeLi' : ''">
              <span>开标({{stageNum['开标']}}条)</span>
              <img :src="table_xm.activeBtn=='开标' ? table_xm.images.l1u : table_xm.images.l2d" alt>
            </li>
            <li @click="switchXmTabs('过期')" v-bind:class="table_xm.activeBtn=='过期' ? 'activeLi' : ''">
              <span>过期({{stageNum['过期']}}条)</span>
              <img :src="table_xm.activeBtn=='过期' ? table_xm.images.l5u : table_xm.images.l5d" alt>
            </li>
          </ul>
          <el-row class="titleXm">
            <el-col :span="2">
              <span style="font-size:20px;">我的项目</span>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" @click="addXm" v-if="role.company_user">新建项目</el-button>
              <el-button type="primary" @click="dialogDrVisible = true" v-if="role.company_user">导入</el-button>
            </el-col>
            <el-col :span="role.company_user ? 16 : 12" :offset="role.company_user ? 3 : 7">
              <el-form ref="table_xm" :model="table_xm" label-width="80px" :inline="true" class="demo-form-inline" @submit.native.prevent>
                <el-form-item label="人员" v-if="role.company_user">
                  <el-select v-model="table_xm.ry" clearable placeholder="请选择" @change="searchFn('xm')">
                    <el-option v-for="(item,index) in selectRy.rows" :key="index" :label="item.username" :value="item.user_id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目地区">
                  <el-select v-model="table_xm.xmdq" placeholder="请选择" @change="searchFn('xm')">
                    <el-option v-for="item in cate.xmdq" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目名称">
                  <el-input style="width:300px" placeholder="请输入项目名称" v-model="table_xm.input" @keydown.enter.native="searchFn('xm')" clearable>
                    <!-- <el-button class="btn_search" slot="append" icon="el-icon-search" @click="searchFn('xm')"></el-button> -->
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="searchFn('xm')">查询</el-button>
                  <el-button @click="searchFn('xmCancel')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <template>
              <el-table :data="table_xm.data" v-loading="tableLoading" style="width: 100%;" border>
                <el-table-column type="index" width="60" label="序号" align="center">
                  <template slot-scope="scope">{{scope.$index+(table_xm.page-1)*10+1}}</template>
                </el-table-column>
                <el-table-column align="center" prop="xmmc" min-width="300" label="项目名称">
                  <template slot-scope="scope">
                    <div v-if="scope.row.zbxx_id>0" class="link_color" @click="openGs(scope.row)">{{scope.row.xmmc}}</div>
                    <span v-else>{{scope.row.xmmc}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="xmdq" label="项目地区" align="center" min-width="80"></el-table-column>
                <el-table-column prop="progress" label="进度" align="center" min-width="450">
                  <!-- <template slot-scope="scope">
                    <ul class="tableXm_ul">
                      <li v-bind:class="scope.row.stage1 ? 'activeLi' : ''">
                        <span>{{scope.row.stage1 ? scope.row.stage1 :'预定' }}</span>
                        <img
                          :src="scope.row.stage1 ? table_xm.images.l1u : table_xm.images.l2d"
                          alt
                        >
                      </li>
                      <li
                        v-bind:class="scope.row.stage2 ? 'activeLi' : ''"
                        :style="{width:scope.row.stage2?'200px':''}"
                      >
                        <span>{{scope.row.stage2 ? scope.row.stage2 :'报名' }}</span>
                        <img
                          :src="scope.row.stage2 ? table_xm.images.l1u : table_xm.images.l2d"
                          alt
                        >
                      </li>
                      <li
                        v-bind:class="scope.row.stage3 ? 'activeLi' : ''"
                        :style="{width:scope.row.stage3?'200px':''}"
                      >
                        <span>{{scope.row.stage3 ? scope.row.stage3 :'标书' }}</span>
                        <img
                          :src="scope.row.stage3 ? table_xm.images.l1u : table_xm.images.l2d"
                          alt
                        >
                      </li>
                      <li
                        v-bind:class="scope.row.stage4 ? 'activeLi' : ''"
                        :style="{width:scope.row.stage4?'200px':''}"
                      >
                        <span>{{scope.row.stage4 ? scope.row.stage4 :'开标' }}</span>
                        <img
                          :src="scope.row.stage4 ? table_xm.images.l5u : table_xm.images.l5d"
                          alt
                        >
                      </li>
                    </ul>
                  </template> -->
                  <template slot-scope="scope">
                    <ul class="tableXm_ul">
                      <li v-bind:class="table_xm.activeBtn=='预定'? 'activeLi' : ''">
                        <span>{{table_xm.activeBtn=='预定' ? scope.row.stage1 :'预定' }}</span>
                        <img :src="table_xm.activeBtn=='预定'? table_xm.images.l1u : table_xm.images.l2d" alt>
                      </li>
                      <li v-bind:class="table_xm.activeBtn=='报名'? 'activeLi' : ''" :style="{width:table_xm.activeBtn=='报名'?'200px':''}">
                        <span>{{table_xm.activeBtn=='报名' ? scope.row.stage2 :'报名' }}</span>
                        <img :src="table_xm.activeBtn=='报名' ? table_xm.images.l1u : table_xm.images.l2d" alt>
                      </li>
                      <li v-bind:class="table_xm.activeBtn=='标书'? 'activeLi' : ''" :style="{width:table_xm.activeBtn=='标书'?'200px':''}">
                        <span>{{table_xm.activeBtn=='标书' ? scope.row.stage3 :'标书' }}</span>
                        <img :src="table_xm.activeBtn=='标书'? table_xm.images.l1u : table_xm.images.l2d" alt>
                      </li>
                      <li v-bind:class="table_xm.activeBtn=='开标' ? 'activeLi' : ''" :style="{width:table_xm.activeBtn=='开标'?'200px':''}">
                        <span>{{table_xm.activeBtn=='开标' ? scope.row.stage4 :'开标' }}</span>
                        <img :src="table_xm.activeBtn=='开标' ? table_xm.images.l5u : table_xm.images.l5d" alt>
                      </li>
                    </ul>
                  </template>
                </el-table-column>
                <el-table-column prop="base" label="基础信息" align="center" min-width="300" v-if="role.company_user">
                  <template slot-scope="scope">
                    <span class="primary_btn" @click="clickFn('关闭',scope)">{{scope.row.valid==1 ? '关闭' : '开通'}}</span>
                    <span class="primary_btn" @click="clickFn('编辑',scope)">编辑</span>
                    <span class="primary_btn" @click="clickFn('已分配',scope)">已分配</span>
                    <span class="primary_btn" @click="clickFn('基本信息',scope)">基本信息</span>
                    <span class="primary_btn" @click="clickFn('服务团队',scope)">服务团队</span>
                    <span class="primary_btn" @click="clickFn('执行内容',scope)">执行内容</span>
                    <span class="primary_btn" @click="clickFn('相关附件',scope)">相关附件</span>
                    <span class="primary_btn" @click="clickFn('项目要求',scope)">项目要求</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="research" label="预研" align="center" width="60" v-if="role.company_user">
                  <template slot-scope="scope">
                    <span style="display:block;text-align:center;width:100%" class="primary_btn" @click="clickFn('预研',scope)">预研</span>
                  </template>
                </el-table-column>
                <el-table-column prop="research" label="验证" align="center" width="60" v-if="role.company_user">
                  <template slot-scope="scope">
                    <span style="display:block;text-align:center;width:100%" class="primary_btn" @click="clickFn('条件',scope)">添加</span>
                  </template>
                </el-table-column>
                <el-table-column prop="flow" label="流程控制" align="center" width="190" v-if="role.company_user">
                  <template slot-scope="scope">
                    <span class="primary_btn" @click="clickFn('分配',scope)">分配</span>
                    <span class="primary_btn" @click="clickFn('标书',scope)">标书</span>
                    <span class="primary_btn" @click="clickFn('审核',scope)">审核</span>
                    <span class="danger_btn" @click="clickFn('删除',scope)">删除</span>
                  </template>
                </el-table-column>-->
                <el-table-column prop="flow" label="控制中心" align="center" min-width="300" v-if="role.company_user">
                  <template slot-scope="scope">
                    <span class="primary_btn" @click="clickFn('预研',scope)">预研</span>
                    <span class="primary_btn" @click="clickFn('条件',scope)">验证</span>
                    <span class="primary_btn" @click="clickFn('分配',scope)">分配</span>
                    <span class="primary_btn" @click="clickFn('标书',scope)">标书</span>
                    <span class="primary_btn" @click="clickFn('审核',scope)">审核</span>
                    <span class="primary_btn" @click="clickFn('导出',scope)">导出</span>
                    <span class="danger_btn" @click="clickFn('删除',scope)">删除</span>
                  </template>
                </el-table-column>
                <el-table-column prop="flow" label="工作内容" align="center" min-width="200">
                  <template slot-scope="scope">
                    <span class="primary_btn" v-for="(item,index) in scope.row.role" :key="index" @click="opDeletil(item,scope)">{{item}}</span>
                    <!-- <span class="primary_btn" @click="opDeletil('标书',scope)">标书</span>
                    <span class="primary_btn" @click="opDeletil('审核',scope)">审核</span> -->
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="flow" label="操作" align="center" width="150" v-if="!role.company_user">
                  <template slot-scope="scope">
                <span class="primary_btn" @click="clickFn('查看',scope)">查看</span>-->
                <!-- <span class="primary_btn" @click="clickFn('编辑',scope)">编辑</span> -->
                <!-- <span class="danger_btn" @click="clickFn('删除',scope)">删除</span> -->
                <!-- </template>
                </el-table-column>-->
              </el-table>
              <el-pagination align="right" @current-change="changePageXm" :current-page.sync="table_xm.page" background layout="total,prev, pager, next" :total="table_xm.total" class="pagination"></el-pagination>
            </template>
          </el-row>
        </div>
      </transition>
    </div>
    <!-- 人员的添加编辑 -->
    <el-dialog title="添加人员" :visible.sync="table_ry.dialogVisible">
      <el-form ref="tableRyForm" :model="tableRyForm" :rules="tableRyFormRules" label-width="100px" @submit.native.prevent>
        <el-form-item label="人员名称" prop="username">
          <el-input v-model="tableRyForm.username" placeholder="请输入人员名称"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input v-model="tableRyForm.cellphone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="权限配置">
          <el-select v-show="table_ry.dialogVisible" v-model="tableRyForm.group_id" placeholder="请选择权限配置" style="width:100%" multiple clearable>
            <el-option v-for="(item,index) in table_ry.groupList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmitRy('tableRyForm')">确定</el-button>
          <el-button @click="table_ry.dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--导入弹窗-->
    <el-dialog width="80%" title="招标公告" :visible.sync="dialogDrVisible">
      <item-import types="首页列表" @onChild_row="onChild_row"></item-import>
    </el-dialog>
    <!-- 项目的基本信息 -->
    <el-dialog title="基本信息" :visible.sync="jbxx.dialogVisible">
      <el-form ref="form" :model="jbxx.form" label-width="100px" @submit.native.prevent>
        <el-form-item label="项目名称">
          <el-input v-model="jbxx.form.xmmc"></el-input>
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="jbxx.form.url"></el-input>
        </el-form-item>
        <el-form-item label="项目业主单位">
          <el-input v-model="jbxx.form.xmyzdw"></el-input>
        </el-form-item>
        <el-form-item label="项目地区">
          <el-select v-model="jbxx.form.xmdq" placeholder="请选择">
            <el-option v-for="item in cate.xmdq" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资质要求">
          <el-input v-model="jbxx.form.zzyq"></el-input>
        </el-form-item>
        <el-form-item label="人员要求">
          <el-input v-model="jbxx.form.ryyq"></el-input>
        </el-form-item>
        <el-form-item label="业绩要求">
          <el-input v-model="jbxx.form.yjyq"></el-input>
        </el-form-item>
        <el-form-item label="其他要求">
          <el-input v-model="jbxx.form.qtyq"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmitJbxx">确认</el-button>
          <el-button @click="jbxx.dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 服务团队 -->
    <el-dialog title="服务团队" :visible.sync="team.dialogVisible">
      <el-form ref="form" :model="team.form" label-width="100px" @submit.native.prevent>
        <el-form-item label="项目所属人">
          <el-col :span="11">
            <el-select v-model="team.form.ssr" placeholder="请选择" style="width:100%">
              <el-option v-for="item in ssr" :key="item.id" :label="item.username" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-input v-model="team.form.ssr_phone" placeholder="电话"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="项目负责人">
          <el-col :span="11">
            <el-input v-model="team.form.xmfzr" placeholder="姓名"></el-input>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-input v-model="team.form.xmfzr_phone" placeholder="电话"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="项目监督人">
          <el-col :span="11">
            <el-input v-model="team.form.xmjdr" placeholder="姓名"></el-input>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-input v-model="team.form.xmjdr_phone" placeholder="电话"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="项目秘书">
          <el-col :span="11">
            <el-input v-model="team.form.xmms" placeholder="姓名"></el-input>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-input v-model="team.form.xmms_phone" placeholder="电话"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="项目协调人(企业联络人)" class="lineHeightReset">
          <el-col :span="11">
            <el-input v-model="team.form.xmxtr" placeholder="姓名"></el-input>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-input v-model="team.form.xmxtr_phone" placeholder="电话"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmitTeam">确认</el-button>
          <el-button @click="team.dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 执行内容 -->
    <el-dialog title="执行内容" :visible.sync="execution.dialogVisible">
      <el-form ref="form" :model="execution.form" label-width="130px" @submit.native.prevent>
        <el-form-item label="项目备案">
          <el-input v-model="execution.form.xmba"></el-input>
        </el-form-item>
        <el-form-item label="项目上网">
          <el-input v-model="execution.form.xmsw"></el-input>
        </el-form-item>
        <el-form-item label="项目报名截止日期" class>
          <a class="activeA" @click="fn_checkGs('bmxx')">{{execution.form.bmxx}}家</a>
        </el-form-item>
        <el-form-item label="标书制作">
          <a class="activeA" @click="fn_checkGs('bs_make')">{{execution.form.bs_make}}家</a>
        </el-form-item>
        <el-form-item label="标书检查工作">
          <a class="activeA" @click="fn_checkGs('bs_check')">{{execution.form.bs_check}}家</a>
        </el-form-item>
        <el-form-item label="保证金">
          <a class="activeA" @click="fn_checkGs('bzj')">{{execution.form.bzj}}家</a>
        </el-form-item>
        <el-form-item label="开标结果登记栏" class>
          <el-input v-model="execution.form.kbjg"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmitExecution">确认</el-button>
          <el-button @click="execution.dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 相关附件 -->
    <el-dialog title="相关附件" :visible.sync="attachment.dialogVisible">
      <el-form ref="formAbout" :rules="formAboutRules" :model="tableXmForm" label-width="100px" @submit.native.prevent>
        <el-form-item label="项目预研报告">
          <el-upload multiple class="upload-demo" :action="updateUrl" :data="updateData" :auto-upload="true" :on-success="handleChange_xmyy" :on-remove="uploadRemove_xmyy" :file-list="fileList.xmyy" :on-preview="openFile">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="招标公告链接" prop="zbgg">
          <el-input v-model="tableXmForm.zbgg"></el-input>
        </el-form-item>
        <el-form-item label="招标文件附件">
          <el-upload class="upload-demo" :action="updateUrl" :data="updateData" :on-success="handleChange_zbwj" :on-remove="uploadRemove_zbwj" :file-list="fileList.zbwj" :on-preview="openFile">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="造价清单附件">
          <el-upload multiple class="upload-demo" :action="updateUrl" :data="updateData" :on-success="handleChange_zjqd" :on-remove="uploadRemove_zjqd" :file-list="fileList.zjqd" :on-preview="openFile">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmitXm('formAbout',1)">确认</el-button>
          <el-button @click="attachment.dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 项目要求 -->
    <el-dialog title="项目要求" :visible.sync="demand.dialogVisible" top="50px">
      <el-form ref="form" :model="demand.form" label-width="100px" @submit.native.prevent>
        <el-form-item label="出方案日期">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="demand.form.fa_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="报名开始日期">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="demand.form.star_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止日期">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="demand.form.end_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="标书制作日期">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="demand.form.bszz_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="标书检查日期">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="demand.form.bsjc_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="打保证金日期">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="demand.form.bzj_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="开标日期">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="demand.form.kb_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmitDemand">确认</el-button>
          <el-button @click="demand.dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 登记项目 -->
    <el-dialog title="项目要求" :visible.sync="table_xm.dialogVisible">
      <el-form ref="tableXmForm" label-width="120px" :model="tableXmForm" :rules="tableXmFormRules" @submit.native.prevent>
        <el-form-item label="项目名称" prop="xmmc">
          <el-input v-model="tableXmForm.xmmc"></el-input>
        </el-form-item>
        <el-form-item label="项目地区">
          <el-select v-model="tableXmForm.xmdq" placeholder="请选择" style="width:100%">
            <el-option v-for="item in cate.xmdq" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目类型A">
          <el-select v-model="tableXmForm.xmlxA" placeholder="请选择" style="width:100%">
            <el-option v-for="item in cate.xmlxA" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目类型B">
          <el-select v-model="value5" multiple placeholder="请选择" style="width:100%">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目阶段">
          <el-select v-model="tableXmForm.stage" placeholder="请选择" style="width:100%">
            <el-option v-for="item in cate.stage" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目业主单位">
          <el-input v-model="tableXmForm.xmyzdw"></el-input>
        </el-form-item>
        <el-form-item label="项目所属人">
          <el-select v-model="tableXmForm.ssr" placeholder="请选择" style="width:100%">
            <el-option v-for="item in ssr" :key="item.id" :label="item.username" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资质要求">
          <el-input v-model="tableXmForm.zzyq"></el-input>
        </el-form-item>
        <el-form-item label="人员要求">
          <el-input v-model="tableXmForm.ryyq"></el-input>
        </el-form-item>
        <el-form-item label="业绩要求">
          <el-input v-model="tableXmForm.yjyq"></el-input>
        </el-form-item>
        <el-form-item label="其他要求">
          <el-input v-model="tableXmForm.qtyq"></el-input>
        </el-form-item>
        <el-form-item label="招标公告链接">
          <el-input v-model="tableXmForm.zbgg"></el-input>
        </el-form-item>
        <el-form-item label="招标文件附件">
          <el-upload class="upload-demo" :action="updateUrl" :data="updateData" :on-success="handleChange_zbwj" :on-remove="uploadRemove_zbwj" :file-list="fileList.zbwj" :on-preview="openFile">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="造价清单附件">
          <el-upload multiple class="upload-demo" :action="updateUrl" :data="updateData" :on-success="handleChange_zjqd" :on-remove="uploadRemove_zjqd" :file-list="fileList.zjqd" :on-preview="openFile">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="其他附件">
          <el-upload multiple class="upload-demo" :action="updateUrl" :data="updateData" :on-success="handleChange_others" :on-remove="uploadRemove_others" :file-list="fileList.qtfj" :on-preview="openFile">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="控制价">
          <el-input v-model.number="tableXmForm.kzj">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="项目监管部门">
          <el-input v-model="tableXmForm.xmjgbm"></el-input>
        </el-form-item>
        <el-form-item label="建设内容及规模">
          <el-input v-model="tableXmForm.jsnrjgm"></el-input>
        </el-form-item>
        <el-form-item label="项目特征">
          <el-input v-model="tableXmForm.xmtz"></el-input>
        </el-form-item>
        <el-form-item label="其他">
          <el-input v-model="tableXmForm.qt"></el-input>
        </el-form-item>

        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmitXm('tableXmForm')">确认</el-button>
          <el-button @click="table_xm.dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 公司列表 -->
    <el-dialog title="公司列表" :visible.sync="table_gs.dialogVisible">
      <el-table :data="table_gs.data" style="width: 100%">
        <el-table-column type="index" width="60" label="序号" align="center">
          <template slot-scope="scope">{{scope.$index+(table_gs.page-1)*10+1}}</template>
        </el-table-column>
        <el-table-column prop="gsmc" label="公司名称" align="center"></el-table-column>
        <el-pagination align="right" @current-change="changePageGs" :current-page.sync="table_gs.page" background layout="total,prev, pager, next" :total="table_gs.total" class="pagination"></el-pagination>
      </el-table>
    </el-dialog>
    <!-- 预研方案 -->
    <el-dialog title="所有方案" :visible.sync="research_plan.dialogVisible" width="45%" top="50px">
      <div class="planList">
        <el-row class="row_plan" v-for="(item,index) in threads" :key="index">
          <el-col :span="16">
            <div class="plan_name">
              {{item.node_name}}
              <!-- <span v-show="item.status_id" class="result"></span> -->
            </div>
          </el-col>
          <el-col :span="4" :offset="4" v-if="tab=='yy'">
            <div class="plan_button">
              <el-button type="primary" size="mini" @click="check_plan('research',item)">查看</el-button>
              <el-button @click="del_plan(item.id,'yy')" size="mini" type="danger">删除</el-button>
            </div>
          </el-col>
          <el-col :span="4" v-if="tab=='tj'" :offset="4">
            <div class="plan_button">
              <el-button type="primary" size="mini" @click="check_plan('tj',item)">查看</el-button>
              <!-- <el-button :disabled="item.display==1" type="primary" size="mini" @click="defaultCase(item)">选中展示</el-button> -->
              <el-button @click="del_plan(item.id,'tj')" size="mini" type="danger">删除</el-button>
            </div>
          </el-col>
          <el-col :span="2" :offset="6" v-if="tab=='fp'">
            <div class="plan_button">
              <el-button type="primary" size="mini" @click="check_plan('fp',item)">分配</el-button>
            </div>
          </el-col>
          <el-col :span="2" :offset="6" v-if="tab=='bs'">
            <div class="plan_button">
              <el-button type="primary" size="mini" @click="check_plan('bs',item)">标书</el-button>
            </div>
          </el-col>
          <el-col :span="4" :offset="4" v-if="tab=='sh'">
            <div class="plan_button">
              <el-button type="primary" size="mini" @click="check_plan('sh',item)">审核</el-button>
              <el-button @click="del_plan(item.id,'sh')" size="mini" type="danger">删除</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer" v-if="tab=='yy' || tab=='tj'" style="text-align:center">
        <el-button type="primary" @click="new_plan('new')">新建方案</el-button>
        <el-button @click="research_plan.dialogVisible = false">取 消</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="tab=='fp' || tab=='bs'" style="text-align:center">
        <el-button type="primary" @click="fp_bs">直接分配</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="tab=='sh'" style="text-align:center">
        <el-button type="primary" @click="new_plan('sh')">新建人工审核</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新建方案" :visible.sync="research_plan.dialogVisibleName">
      <bid-new-plan v-on:onSubmitNewPlan="onSubmitNewPlan" :data="{jbxx_id:research_plan.id,name:research_plan.name,tab:tab}"></bid-new-plan>
      <!-- <el-row>
                <el-form ref="research_plan" :model="research_plan" label-width="80px" @submit.native.prevent>
                    <el-form-item label="方案名称">
                        <el-input v-model="research_plan.name"></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="new_plan('name')">确定</el-button>
                <el-button @click="research_plan.dialogVisibleName = false">取 消</el-button>
      </div>-->
    </el-dialog>
    <!-- 导出数据到猫糊 -->
    <div>

      <el-dialog title="导出数据" :visible.sync="exportData.dialog" width="60%" top="50px">
        <el-row style="margin-bottom:20px">
          <el-col :span="24" style="text-align:right">
            <el-button type="primary" @click="exportGs(exportData.jbxx_id,'自建')">直接导出</el-button>
          </el-col>
        </el-row>
        <template>
          <el-table :data="exportData.tableData" style="width: 100%" border>
            <el-table-column type="index" width="60" align="center" label="序号">
              <template slot-scope="scope">
                <div>{{(scope.$index+1)+(exportData.page-1)*10}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="xmmc" label="项目名称" align="center">
              <template slot-scope="scope">
                <span :style="scope.row.cate=='已覆盖' ? 'color:#67C23A' : '' ">{{scope.row.xmmc}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="exportGs(scope.row.id,'覆盖')">覆盖</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="margin-top:20px" :current-page="exportData.page" @current-change="ExportPageSizeChange" align="right" background layout="total,prev, pager, next" :total="exportData.total"></el-pagination>

        </template>
      </el-dialog>
    </div>

    <!-- 导出数据到猫糊 -->
  </div>
</template>
<script>
//待做： 正则验证？？？？？删除已传的文件
import l1u from '../assets/l1u.png'
import l11u from '../assets/l11u.png'
import l1d from '../assets/l1d.png'
import l2u from '../assets/l1u.png'
import l2d from '../assets/l2d.png'
import l22d from '../assets/l22d.png'
import l5u from '../assets/l5u.png'
import l55u from '../assets/l55u.png'
import l5d from '../assets/l5d.png'
import l55d from '../assets/l55d.png'
import h1 from '../assets/h1.png'
import h2 from '../assets/h1.png'
import h3 from '../assets/h1.png'
import h4 from '../assets/h4.png'
import smallact from '../assets/smallact.png'
import smalllas from '../assets/smalllas.png'
import smallnol from '../assets/smallnol.png'
import uploadFile from './template/UploadFile.vue'
import bidNewPlan from './template/bid_newPlan.vue'
import ItemImport from './ItemImport'
import headMenu from './template/head_menu.vue'

export default {
  data() {
    var validateCellphone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话号码'))
      } else {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error('手机号码格式有误，请重填'))
          return false
        }
        callback()
      }
    }
    var validateZbgg = (rule, value, callback) => {
      if (
        value &&
        !/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(\S+\.\S+)$/.test(
          value
        )
      ) {
        callback(new Error('链接地址格式有误，请重填'))
      } else {
        callback()
      }
    }
    var validateKzj = (rule, value, callback) => {
      if (value && !Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }
    return {
      updateUrl:
        'https://wechat.cdzjkl.com/index/Human_Review/uploadFile',
      updateData: {
        token: localStorage.getItem('token'),
        login_company_id: localStorage.getItem('company_id'),
        login_user_id: localStorage.getItem('user_id')
      },
      tab: '',
      threads: [],
      table_gs: {
        dialogVisible: false,
        data: [],
        total: 0,
        page: 1
      },
      numberValidateForm: {
        age: ''
      },
      tableRyFormRules: {
        username: [
          {
            required: true,
            message: '请输入人员名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ],
        cellphone: [
          {
            required: true,
            message: '请输入电话号码',
            trigger: 'blur'
          },
          { validator: validateCellphone, trigger: 'blur' }
        ]
      },
      tableRyForm: {
        username: '',
        cellphone: '',
        group_id: []
      },
      tableXmFormRules: {
        xmmc: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }
        ],
        zbgg: [{ validator: validateZbgg, trigger: 'blur' }]
        // kzj: [{ validator: validateKzj, trigger: 'blur' }]
      },
      formAboutRules: { zbgg: [{ validator: validateZbgg, trigger: 'blur' }] },
      options: [],
      value5: [],
      tableXmForm: {
        xmmc: '',
        kzj: '',
        zbgg: ''
      },

      activeBtn: '',
      table_ry: {
        edit_id: '',
        add_edit: '',
        groupList: [],
        input: '',
        data: [],
        page: 1,
        total: 0,
        dialogVisible: false
      },
      table_xm: {
        activeBtn: '预定',
        input: '',
        xmdq: '',
        ry: '',
        data: [],
        page: 1,
        total: 0,
        images: {
          h1: h1,
          h2: h2,
          h3: h3,
          h4: h4,
          l1u: l1u,
          l2u: l2u,
          l5u: l5u,
          l1d: l1d,
          l2d: l2d,
          l5d: l5d,
          l11u: l11u,
          l22d: l22d,
          l55d: l55d,
          l55u: l55u,
          smallact: smallact,
          smalllas: smalllas,
          smallnol: smallact
        },
        input: '',
        dialogVisible: false,
        form: {}
      },
      jbxx: {
        dialogVisible: false,
        form: {
          xmmc: '',
          url: '',
          xmyzdw: '',
          area: '',
          zzyq: '',
          ryyq: '',
          yjyq: '',
          qtyq: ''
        }
      },
      dialogDrVisible: false,
      team: {
        dialogVisible: false,
        form: {
          ssr: '',
          ssr_phone: '',
          xmfzr: '',
          xmfzr_phone: '',
          xmjdr: '',
          xmjdr_phone: '',
          xmms: '',
          xmms_phone: '',
          xmxtr: '',
          xmxtr_phone: ''
        }
      },
      execution: {
        dialogVisible: false,
        form: {
          bmxx: 0,
          bs_check: 0,
          bs_make: 0,
          bzj: 0
        }
      },
      attachment: {
        dialogVisible: false,
        form: {}
      },
      demand: {
        dialogVisible: false,
        form: {
          fa_time: '',
          bzj_time: '',
          bszz_time: '',
          bsjc_time: '',
          kb_time: '',
          star_time: '',
          end_time: ''
        }
      },
      cate: {},
      selectRy: {},
      ssr: {},
      uploadUrl: global.URL + 'home/uploadFile',

      fileList: {
        zbwj: [],
        zjqd: [],
        qtfj: [],
        xmyy: []
      },
      //上传前处理成组的fileList
      upfile: '',
      stageNum: {},
      research_plan: {
        name: '',
        data: [],
        dialogVisible: false,
        dialogVisibleName: false,
        id: ''
      },
      role: {},
      activeLiWidth: 'width: 160px;',
      tableLoading: true,
      exportData: {
        //导出数据
        dialog: false,
        tableData: [],
        total: 0,
        page: 1,
        jbxx_id: ''
      }
    }
  },
  components: {
    uploadFile,
    bidNewPlan,
    ItemImport,
    headMenu
  },
  created() {
    this.groupList()
    this.tableRy()
    this.fn_cate()
    this.fn_ssr()
    this.getDate()
    this.fn_role()
    this.getPersonnelSelectData()
    document.title = '招投标管理'
  },

  methods: {
    // 跳转
    opDeletil(name, obj) {
      // console.log(obj);
      if (name == '分配') {
        let fp = this.$router.resolve({
          path: `/iteminfo?jbxx_id=${obj.row.id}&status=yd`
        })
        window.open(fp.href, obj.row.xmmc + obj.row.id)
      } else {
        let route = this.$router.resolve({
          name: 'itemBsInfo',
          query: {
            jbxx_id: obj.row.id,
            model: name,
            xmmc: obj.row.xmmc
          }
        })
        window.open(route.href, 'once')
      }
      // } else if ("标书") {
      //   let bs = this.$router.resolve({
      //     name: "itemBsInfo",
      //     query: {
      //       jbxx_id: obj.row.id
      //     }
      //   });
      //   window.open(bs.href, "_blank");
      // } else if ("审核") {

      //   window.open(sh.href, "_blank");
      // }
    },
    getPersonnelSelectData() {
      let self = this
      self.axios.post(
        '/index/project/screenUsercate',
        {
          company_id: localStorage.getItem('company_id')
        },
        data => {
          this.selectRy = data
        }
      )
    },
    openGs(row) {
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?zbxx_id=${
          row.zbxx_id
        }&zbgs_id=&type=zbxx&xmmc=${row.xmmc}&source=${row.source}`
      })
      window.open(href, '招标信息' + row.zbxx_id + row.xmmc)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    fn_role() {
      let self = this
      self.axios.post(
        '/index/mine/role',
        {
          user_id: this.$store.state.userInfo.user_id,
          company_id: localStorage.getItem('company_id')
        },
        data => {
          this.role = data
          if (!data.person_user) {
            //没有人员管理权限
            this.activeBtn = 'xm'
          } else {
            this.activeBtn = 'ry'
          }
          this.tableXm()
          this.fn_stageNum()
        }
      )
    },
    onSubmitRy() {
      let params = {
        company_id: localStorage.getItem('company_id'),
        user_id: this.$store.state.userInfo.user_id,
        username: this.tableRyForm.username,
        cellphone: this.tableRyForm.cellphone,
        group_id: this.tableRyForm.group_id.join(','),
        id: this.table_ry.edit_id
      }
      let self = this
      self.$refs['tableRyForm'].validate(valid => {
        if (!valid) {
          return false
        } else {
          self.axios.post(
            '/index/company_staff/saveStaffRole',
            params,
            data => {
              if (data.status == 'success') {
                self.tableRy()
                self.table_ry.dialogVisible = false
              } else {
                self.$message.error(data.message)
              }
            }
          )
        }
      })
    },
    fp_bs() {
      //直接分配，标书
      if (this.tab == 'fp') {
        let fp = this.$router.resolve({
          path: `/configfp?jbxx_id=${this.research_plan.id}&thread_id=`
        })
        window.open(fp.href, `分配：${this.research_plan.id}&thread_id=`)
      } else {
        let bs = this.$router.resolve({
          path: `/configbs?jbxx_id=${this.research_plan.id}&thread_id=`
        })
        window.open(bs.href, `标书：${this.research_plan.id}&thread_id=`)
      }
    },
    onSubmitNewPlan() {
      this.research_plan.dialogVisible = false
      this.research_plan.dialogVisibleName = false
    },
    // 上传文件
    format_Change(fileList) {
      let item = {
        name: fileList.response.data.filename,
        filename_time: fileList.response.data.filename_time
      }

      return item
    },
    handleChange_zbwj(file, fileList) {
      this.fileList.zbwj.push(this.format_Change(fileList))
    },
    handleChange_zjqd(file, fileList) {
      this.fileList.zjqd.push(this.format_Change(fileList))
    },
    handleChange_others(file, fileList) {
      this.fileList.qtfj.push(this.format_Change(fileList))
    },
    handleChange_xmyy(file, fileList) {
      this.fileList.xmyy.push(this.format_Change(fileList))
    },
    uploadRemove_zbwj(file, fileList) {
      this.tableXmForm.del_zbwj =
        this.tableXmForm.del_zbwj + file.filename_time + ','
      this.fileList.zbwj = fileList
    },
    uploadRemove_zjqd(file, fileList) {
      this.fileList.zjqd = fileList
      this.tableXmForm.del_zjqd =
        this.tableXmForm.del_zjqd + file.filename_time + ','
    },
    uploadRemove_others(file, fileList) {
      this.fileList.qtfj = fileList
      this.tableXmForm.del_qtfj =
        this.tableXmForm.del_qtfj + file.filename_time + ','
    },
    uploadRemove_xmyy(file, fileList) {
      this.fileList.xmyy = fileList
      this.table_xm.xmyy.del_xmyy =
        this.tableXmForm.del_xmyy + file.filename_time + ','
    },
    openFile(file) {
      console.log(file)
      window.open(
        'https://wechat.cdzjkl.com/files/options/' +
          file.filename_time
      )
    },
    // 上传文件
    fn_checkGs(type) {
      let params = {
        jbxx_id: this.research_plan.id
      }
      switch (type) {
        case 'bmxx':
          params.type == 0
          break
        case 'bs_make':
          params.type == 1
          break
        case 'bs_check':
          params.type == 2
          break
        case 'bzj':
          params.type == 3
          break
      }
      this.table_gs.dialogVisible = true
      this.axios.post('/index/project/getDetailCompany', params, data => {
        if (data.status == 'success') {
          this.table_gs.data = data.rows
          this.table_gs.total = data.total
        }
      })
    },
    fn_stageNum() {
      let params = {
        user_id: this.$store.state.userInfo.user_id,
        company_id: localStorage.getItem('company_id'),
        type: '筑标成都',
        user_cate: this.role.company_user ? '' : '分配',
        is_manager: this.role.company_user ? 1 : 0
        // user_cate: '分配'
      }
      this.axios.post('/index/project/stageNum', params, data => {
        if (data.status == 'success') {
          this.stageNum = data.total
        }
      })
    },
    fn_ssr() {
      this.axios.post(
        '/index/project/getUsers',
        { company_id: localStorage.getItem('company_id') },
        data => {
          this.ssr = data.rows['所属人']
        }
      )
    },

    fn_cate() {
      this.axios.post('/index/project/cate', {}, data => {
        this.cate = data
        this.options = data['xmlxB']
      })
    },
    format_str(arr) {
      let str = ''
      for (let i = 0; i < arr.length; i++) {
        str += arr[i].filename_time + ','
      }
      str = str.substr(0, str.length - 1)
      return str
    },
    onSubmitXm(formName, type) {
      console.log(formName)

      //提交项目表单
      let self = this
      // if (formName == "tableXmForm") {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        } else {
          let params = {
            user_id: this.$store.state.userInfo.user_id,
            company_id: localStorage.getItem('company_id'),
            id: this.tableXmForm.id,
            xmmc: this.tableXmForm.xmmc,
            xmdq: this.tableXmForm.xmdq,
            xmlxA: this.tableXmForm.xmlxA,
            xmlxB: this.value5,
            stage: this.tableXmForm.stage,
            xmyzdw: this.tableXmForm.xmyzdw,
            ssr: this.tableXmForm.ssr,
            zzyq: this.tableXmForm.zzyq,
            yjyq: this.tableXmForm.yjyq,
            ryyq: this.tableXmForm.ryyq,
            qtyq: this.tableXmForm.qtyq,
            zbgg: this.tableXmForm.zbgg,
            kzj: this.tableXmForm.kzj,
            xmjgbm: this.tableXmForm.xmjgbm,
            jsnrjgm: this.tableXmForm.jsnrjgm,
            xmtz: this.tableXmForm.xmtz,
            qt: this.tableXmForm.qt,
            user_id: this.$store.state.userInfo.user_id,
            del_zbwj: this.tableXmForm.del_zbwj,
            del_zjqd: this.tableXmForm.del_zjqd,
            del_qtfj: this.tableXmForm.del_qtfj,
            zbwj:
              this.fileList.zbwj.length > 0
                ? encodeURI(
                    JSON.stringify(this.format_str(this.fileList.zbwj)),
                    'utf-8'
                  )
                : null,
            zjqd:
              this.fileList.zjqd.length > 0
                ? encodeURI(
                    JSON.stringify(this.format_str(this.fileList.zjqd)),
                    'utf-8'
                  )
                : null,
            qtfj:
              this.fileList.qtfj.length > 0
                ? encodeURI(
                    JSON.stringify(this.format_str(this.fileList.qtfj)),
                    'utf-8'
                  )
                : null
          }
          self.axios.post('/index/project/pro_save', params, data => {
            if (data.status == 'success') {
              self.fn_stageNum()
              self.tableXm()
              self.table_xm.dialogVisible = false
              self.attachment.dialogVisible = false
            } else {
              this.$message.success(data.message)
            }
          })
        }
      })
      // }
    },
    onSubmitTeam() {
      let params = {
        ssr: this.team.form.ssr,
        ssr_phone: this.team.form.ssr_phone,
        xmfzr: this.team.form.xmfzr,
        xmfzr_phone: this.team.form.xmfzr_phone,
        xmjdr: this.team.form.xmjdr,
        xmjdr_phone: this.team.form.xmjdr_phone,
        xmms: this.team.form.xmms,
        xmms_phone: this.team.form.xmms_phone,
        xmxtr: this.team.form.xmxtr,
        xmxtr_phone: this.team.form.xmxtr_phone,
        jbxx_id: this.team.form.jbxx_id,
        type: this.team.form.type
      }
      this.axios.post('/index/project/editServiceTeam', params, data => {
        if (data.status == 'success') {
          this.team.dialogVisible = false
        }
      })
    },
    onSubmitJbxx() {
      let params = {
        xmmc: this.jbxx.form.xmmc,
        url: this.jbxx.form.url,
        xmyzdw: this.jbxx.form.xmyzdw,
        xmdq: this.jbxx.form.xmdq,
        zzyq: this.jbxx.form.zzyq,
        ryyq: this.jbxx.form.ryyq,
        yjyq: this.jbxx.form.yjyq,
        qtyq: this.jbxx.form.qtyq,
        jbxx_id: this.jbxx.form.jbxx_id,
        type: 2
      }
      if (!params.xmmc) {
        this.$message.error('项目名称为必填')
        return
      }
      this.axios.post('/index/project/editProBaseInfo', params, data => {
        if (data.status == 'success') {
          this.jbxx.dialogVisible = false
        }
      })
    },
    onSubmitExecution() {
      let params = {
        xmba: this.execution.form.xmba,
        xmsw: this.execution.form.xmsw,
        kbjg: this.execution.form.kbjg,
        jbxx_id: this.execution.form.jbxx_id,
        type: this.execution.form.type
      }
      this.axios.post('/index/project/editProExecPhase', params, data => {
        if (data.status == 'success') {
          this.execution.dialogVisible = false
        }
      })
    },
    onSubmitAttachment() {},
    onSubmitDemand() {
      let params = {
        fa_time: this.demand.form.fa_time,
        star_time: this.demand.form.star_time,
        end_time: this.demand.form.end_time,
        bszz_time: this.demand.form.bszz_time,
        bsjc_time: this.demand.form.bsjc_time,
        bzj_time: this.demand.form.bzj_time,
        end_time: this.demand.form.end_time,
        kb_time: this.demand.form.kb_time,
        jbxx_id: this.demand.form.jbxx_id,
        type: this.demand.form.type
      }
      this.axios.post('/index/project/editProTimeRequire', params, data => {
        if (data.status == 'success') {
          this.demand.dialogVisible = false
        }
      })
    },
    getProBaseInfo(id) {
      this.axios.post(
        '/index/project/getProBaseInfo',
        { jbxx_id: id },
        data => {
          if (data.status == 'success') {
            this.jbxx.form = data.message
            this.jbxx.form.xmdq =
              data.message.xmdq == 0 ? '' : data.message.xmdq
          }
          this.jbxx.form.jbxx_id = id
        }
      )
    },
    getServiceTeam(id) {
      this.axios.post(
        '/index/project/getServiceTeam',
        { jbxx_id: id },
        data => {
          if (data.status == 'success') {
            this.team.form = data.message
            this.team.form.type = 2
          } else {
            this.team.form = {}
            this.team.form.type = 1
          }
          this.team.form.jbxx_id = id
        }
      )
    },
    getProExecPhase(id) {
      this.axios.post(
        '/index/project/getProExecPhase',
        { jbxx_id: id },
        data => {
          if (data.status == 'success') {
            this.execution.form = data.message
            this.execution.form.type = 2
          } else {
            this.execution.form.type = 1
          }
          this.execution.form.jbxx_id = id
        }
      )
    },
    edit(id) {
      this.fileList.zbwj = []
      this.fileList.zjqd = []
      this.fileList.qtfj = []
      this.fileList.xmyy = []
      this.axios.post('/index/project/edit', { jbxx_id: id }, data => {
        this.tableXmForm = data.res
        this.tableXmForm.id = id
        this.tableXmForm.xmdq = data.res.xmdq == 0 ? '' : data.res.xmdq
        this.tableXmForm.xmlxA = data.res.xmlxA == 0 ? '' : data.res.xmlxA
        this.tableXmForm.stage = data.res.stage == 0 ? '' : data.res.stage
        this.tableXmForm.ssr = data.res.ssr == 0 ? '' : data.res.ssr
        this.value5 = data.res.xmlxB
        let zbwj = decodeURI(data.res.zbwj).split(',')
        this.fileList.zbwj = data.res.zbwj
          ? this.format_fileList(data.res.zbwj, data.res.zbwj_time)
          : []
        this.fileList.zjqd = data.res.zjqd
          ? this.format_fileList(data.res.zjqd, data.res.zjqd_time)
          : []
        this.fileList.qtfj = data.res.qtfj
          ? this.format_fileList(data.res.qtfj, data.res.qtfj_time)
          : []
        this.tableXmForm.del_zbwj = ''
        this.tableXmForm.del_zjqd = ''
        this.tableXmForm.del_qtfj = ''
      })
    },
    format_fileList(str, str2) {
      let arr = decodeURI(str).split(',')
      let arr2 = decodeURI(str2).split(',')
      let file = []
      for (let i = 0; i < arr.length; i++) {
        let item = {
          name: arr[i],
          filename_time: arr2[i]
        }
        file.push(item)
      }
      return file
    },
    getProTimeRequire(id) {
      this.axios.post(
        '/index/project/getProTimeRequire',
        { jbxx_id: id },
        data => {
          if (data.status == 'success') {
            this.demand.form = data.message
            this.demand.form.type = 2
          } else {
            this.demand.form = {}
            this.demand.form.type = 1
          }
          this.demand.form.jbxx_id = id
        }
      )
    },
    //招标回调
    onChild_row(val) {
      this.dialogDrVisible = false
      this.table_xm.page = 1
      this.table_xm.activeBtn = val
      this.fn_stageNum()
      this.tableXm()
      // this.$emit('onChild_row')
    },
    close_open(id, flag) {
      let params = {
        // phase: '',
        id: id,
        flag: flag == 1 ? 'close' : 'open'
      }
      this.axios.post('/index/project/turn', params, data => {
        if (data.status == 'success') {
          this.tableXm()
          this.fn_stageNum()
        }
      })
    },
    del_plan(id, type) {
      let self = this
      self
        .$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          if (type == 'sh') {
            self.axios.post(
              '/index/Human_Allot/delPlan',
              { human_id: id, jbxx_id: self.jbxx_id },
              data => {
                if (data.status == 'success') {
                  self.get_shThreads(self.research_plan.id)
                } else {
                  self.$message.error('删除失败，请稍后重试')
                }
              }
            )
          } else {
            self.axios.post(
              '/index/thread/delThread',
              { thread_id: id, jbxx_id: self.jbxx_id },
              data => {
                if (data.status == 'success') {
                  self.fn_researchPlan(self.research_plan.id)
                } else {
                  self.$message.error('删除失败，请稍后重试')
                }
              }
            )
          }
        })
        .catch(() => {})
    },
    defaultCase(item) {
      let self = this
      self.axios.post(
        '/index/mine/defaultCase',
        { thread_id: item.id, jbxx_id: self.research_plan.id },
        data => {
          if (data.status == 'success') {
            self.$message.success('操作成功')
            self.research_plan.dialogVisible = false
          } else {
            self.$message.error('删除失败，请稍后重试')
          }
        }
      )
    },
    check_plan(type, item) {
      let self = this

      switch (type) {
        case 'research':
          // let research = self.$router.resolve({
          //   path: `/bidCanvas?jbxx_id=${self.research_plan.id}&thread_id=${
          //     item.id
          //   }`
          // })
          let research = self.$router.resolve({
            path: `/bidResearch?jbxx_id=${self.research_plan.id}&thread_id=${
              item.id
            }`
          })
          window.open(research.href, `${self.research_plan.id}${item.id}`)
          break
        case 'fp':
          let fp = self.$router.resolve({
            path: `/configfp?jbxx_id=${self.research_plan.id}&thread_id=${
              item.id
            }`
          })
          window.open(fp.href, `分配：${self.research_plan.id}${item.id}`)
          break
        case 'bs':
          let bs = self.$router.resolve({
            path: `/configbs?jbxx_id=${self.research_plan.id}&thread_id=${
              item.id
            }`
          })
          window.open(bs.href, `标书：${self.research_plan.id}${item.id}`)
          break
        case 'sh':
          let sh = self.$router.resolve({
            path: `/configsh?jbxx_id=${self.research_plan.id}&human_id=${
              item.id
            }`
          })
          window.open(sh.href, `审核：${self.research_plan.id}${item.id}`)
          break
        case 'tj':
          let tj = self.$router.resolve({
            path: `/iteminfo/ItemConfigNew?jbxx_id=${
              self.research_plan.id
            }&thread_id=${item.id}`
          })
          window.open(tj.href, `${self.research_plan.id}${item.id}`)
          break
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
      this.research_plan.name =
        year.toString() + month.toString() + day.toString() + '_'
      // console.log(this.research_plan.name);

      // return year.toString() + month.toString() + day.toString();
    },
    new_plan(type) {
      switch (type) {
        case 'new': //新建方案
          this.research_plan.dialogVisibleName = true
          // this.research_plan.name = this.getDate() + "_";
          break

        case 'name': //方案名称确定
          let params = {
            jbxx_id: this.research_plan.id,
            name: this.research_plan.name.trim()
          }
          if (params.name.length == 0 || params.name.length > 15) {
            this.$message.error('请修改方案名称在15个字之内')
            return
          }
          this.axios.post('/index/thread/newPlan', params, data => {
            if (data.status == 'success') {
              this.research_plan.dialogVisible = false
              this.research_plan.dialogVisibleName = false
              // let { href } = this.$router.resolve({
              //   path: `/bidCanvas?jbxx_id=${this.research_plan.id}&thread_id=${
              //     data.message
              //   }`
              // })
              // window.open(href, `${this.research_plan.id}`)
              let research = self.$router.resolve({
                path: `/bidResearch?jbxx_id=${
                  this.research_plan.id
                }&thread_id=${data.message}`
              })
              window.open(
                research.href,
                `${this.research_plan.id}${data.message}`
              )
            } else {
              this.$message.error(data.message)
            }
          })
          break
        case 'sh': //新建人工审核方案
          this.research_plan.dialogVisibleName = true
          break
      }
    },
    get_shThreads() {
      this.axios.post(
        '/index/Human_Allot/getPlan',
        {
          jbxx_id: this.research_plan.id
        },
        data => {
          this.research_plan.dialogVisible = true
          if (data.status == 'success') {
            this.threads = data.rows
          } else {
            this.threads = []
          }
        }
      )
    },
    fn_researchPlan(id) {
      //显示项目预研方案
      this.research_plan.id = id
      this.research_plan.dialogVisible = true
      let cate = ''
      if (this.tab == 'tj') {
        cate = 2
      } else if (this.tab == 'yy') {
        cate = 1
      } else {
        cate = 1
      }
      this.axios.post(
        '/index/thread/getThread',
        {
          jbxx_id: this.research_plan.id,
          cate: cate
        },
        data => {
          if (data.status == 'success') {
            this.threads = data.rows
          } else {
            this.threads = []
          }
        }
      )
    },
    clickFn(type, scope) {
      switch (type) {
        case '预研':
          this.tab = 'yy'
          this.research_plan.id = scope.row.id
          this.fn_researchPlan(scope.row.id)
          break
        case '编辑':
          this.table_xm.dialogVisible = true
          this.edit(scope.row.id)
          break
        case '关闭':
          this.close_open(scope.row.id, scope.row.valid)
          break
        case '分配':
          this.tab = 'fp'
          this.research_plan.id = scope.row.id
          this.fn_researchPlan(scope.row.id)

          break
        case '标书':
          this.tab = 'bs'
          this.research_plan.id = scope.row.id
          this.fn_researchPlan(scope.row.id)

          break
        case '审核':
          this.tab = 'sh'
          this.research_plan.id = scope.row.id
          this.get_shThreads()

          break
        case '已分配':
          let yfp = this.$router.resolve({
            path: `/alloted?jbxx_id=${scope.row.id}`
          })
          window.open(yfp.href, '')
          break
        case '条件':
          this.tab = 'tj'
          this.research_plan.dialogVisible = true
          this.research_plan.id = scope.row.id
          this.fn_researchPlan(scope.row.id)
          break
        case '基本信息':
          this.jbxx.dialogVisible = true
          this.getProBaseInfo(scope.row.id)
          break
        case '服务团队':
          this.team.dialogVisible = true
          this.getServiceTeam(scope.row.id)
          break
        case '执行内容':
          this.execution.dialogVisible = true
          this.getProExecPhase(scope.row.id)
          break
        case '相关附件':
          this.attachment.dialogVisible = true
          this.edit(scope.row.id)
          break
        case '项目要求':
          this.demand.dialogVisible = true
          this.getProTimeRequire(scope.row.id)
          break
        case '删除':
          this.xmTableDel(scope.row.id)
          break
        case '查看':
          let fp = this.$router.resolve({
            path: `/iteminfo?jbxx_id=${scope.row.id}&status=yd`
          })
          window.open(fp.href, scope.row.xmmc + scope.row.id)
          break
        case '导出':
          this.exportData.jbxx_id = scope.row.id
          this.exportData.dialog = true
          this.exportData.page = 1
          this.getmhPro()
          break
      }
    },

    getmhPro() {
      this.axios.post(
        '/relation/bid_Mh/mhPro',
        {
          jbxx_id: this.exportData.jbxx_id,
          page: this.exportData.page,
          rows: 10
        },
        data => {
          this.exportData.tableData = data.rows || []
          this.exportData.total = data.total || 0
        }
      )
    },
    ExportPageSizeChange(page) {
      this.exportData.page = page
      this.getmhPro()
    },
    exportGs(id, cate) {
      //导出数据到猫糊
      let params = {
        bid_id: this.exportData.jbxx_id,
        user_id: this.$store.state.userInfo.user_id,
        cate
      }
      if (cate=='覆盖'){
        params.mh_id=id
      }
      this.axios.post('/relation/bid_Mh/bidToMh', params, data => {
        if (data.status == 'success') {
          this.$message({
            message: '导出成功',
            type: 'success'
          })
          this.exportData.dialog = false
        } else {
          this.$message({
            message: '导出失败',
            type: 'error'
          })
        }
      })
    },
    switchXmTabs(val) {
      //项目导航切换
      this.table_xm.data = []
      this.table_xm.page = 1
      this.table_xm.activeBtn = val
      this.fn_stageNum()
      this.tableXm()
    },
    openFullScreen() {
      this.loading = true
    },
    closeFullScreen() {
      this.loading = false
    },
    changePageRy(val) {
      //人员表格分页
      this.table_ry.page = val
      this.tableRy()
    },
    changePageGs(val) {
      //公司表格分页
      this.table_gs.page = val
      this.tableGs()
    },
    tableGs() {},
    // 人员权限
    groupList() {
      this.axios.post('/index/company_staff/groupList', {}, data => {
        this.table_ry.groupList = data
      })
    },

    tableRy() {
      let self = this
      let params = {
        company_id: localStorage.getItem('company_id'),
        name: self.table_ry.input,
        page: self.table_ry.page
      }
      self.openFullScreen()
      this.axios.post('/index/company_staff/staffList', params, data => {
        if (data.status == 'success') {
          self.table_ry.data = data.rows
          self.table_ry.total = data.total
        } else {
          if (params.page > 1) {
            self.table_ry.page = self.table_ry.page - 1
            self.tableRy()
          } else {
            self.table_ry.data = []
            self.table_ry.total = 0
          }
        }
        self.closeFullScreen()
      })
    },
    tableXm(id) {
      this.tableLoading = true
      let self = this
      let params = {
        user_id: self.$store.state.userInfo.user_id,
        type: '筑标成都',
        page: self.table_xm.page,
        xmmc: self.table_xm.input,
        xmdq: self.table_xm.xmdq,
        user_cate_id: self.table_xm.ry,
        stage: self.table_xm.activeBtn,
        company_id: localStorage.getItem('company_id'),
        user_cate: self.role.company_user ? '' : '分配',
        is_manager: this.role.company_user ? 1 : 0
        // user_cate:  '分配'
      }
      self.openFullScreen()
      this.axios.post('/index/project/re_lists', params, data => {
        if (data.status == 'success') {
          self.table_xm.data = data.rows
          self.table_xm.total = data.total
          this.tableLoading = false
        } else {
          this.tableLoading = false
          if (params.page > 1) {
            self.table_xm.page -= 1
            self.tableXm(id)
          } else {
            self.table_xm.data = []
            self.table_xm.total = 0
          }
        }
        self.closeFullScreen()
      })
    },
    changePageXm(val) {
      //项目表格分页
      this.table_xm.page = val
      this.tableXm()
    },
    switchTabs(type) {
      //切换人员管理项目管理
      this.activeBtn = type
    },
    searchFn(type) {
      //人员搜索
      let self = this
      if (type == 'ry') {
        self.table_ry.page = 1
        self.tableRy()
      } else if (type == 'xm') {
        self.table_xm.page = 1
        self.tableXm()
      } else if (type == 'xmCancel') {
        self.table_xm.page = 1
        self.table_xm.input = ''
        self.table_xm.xmdq = ''
        self.table_xm.ry = ''
        self.tableXm()
      }
    },
    addRy() {
      //添加人员
      let self = this
      self.table_ry.dialogVisible = true
      self.table_ry.edit_id = ''
      self.tableRyForm.username = ''
      self.tableRyForm.cellphone = ''
      self.tableRyForm.group_id = []
      self.table_ry.add_edit = 'add'
    },
    handleClose() {},

    ryTableEdit(scope) {
      //人员表格编辑
      let self = this
      self.table_ry.dialogVisible = true
      self.table_ry.add_edit = 'edit'
      self.table_ry.edit_id = scope.id
      self.tableRyForm.username = scope.username
      self.tableRyForm.cellphone = scope.cellphone
      self.tableRyForm.group_id = scope.group_id
        ? scope.group_id.split(',').map(v => v - 0)
        : []
    },
    ryTableDel(row) {
      let self = this
      this.$confirm('是否删除该人员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios.post(
            '/index/company_staff/delStaff',
            { id: row.id },
            data => {
              if (data.status == 'success') {
                this.tableRy()
              } else {
                this.$message.success(data.message)
              }
            }
          )
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    xmTableDel(id) {
      let self = this
      this.$confirm('确认删除该项目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          self.axios.post(
            '/index/project/delProject',
            { jbxx_id: id },
            data => {
              if (data.status == 'success') {
                self.tableXm()
                self.fn_stageNum()
              } else {
                self.$message.success(data.message)
              }
            }
          )
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    addXm() {
      //添加项目
      this.tableXmForm = {}
      this.value5 = []
      this.fileList.zbwj = []
      this.fileList.zjqd = []
      this.fileList.qtfj = []
      this.tableXmForm.del_zbwj = ''
      this.tableXmForm.del_zjqd = ''
      this.tableXmForm.del_qtfj = ''
      this.table_xm.dialogVisible = true
    }
  }
}
</script>
<style>
.el-dialog__footer {
  text-align: center;
}
.pagination {
  margin-top: 10px;
}
.lineHeightReset .el-form-item__label {
  line-height: 18px;
}
.planList {
  max-height: 650px;
  overflow-y: scroll;
}
.planList::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.planList::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.05);
}
.planList::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: #ededed;
}
</style>

<style lang="less" scoped>
@activeColor: #409eff;
@stage_left: 198px;
@stage_left_: 238px;
@stage_left2: 100px;
@stage_zIndex: 11;
.link_color {
  color: rgb(58, 142, 230);
  cursor: pointer;
}
.result {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: @activeColor;
}
.activeA {
  color: @activeColor;
  cursor: pointer;
}
.cursor {
  cursor: pointer;
}
.activeBtn {
  color: white;
  background-color: @activeColor;
}
.primary_btn {
  color: @activeColor;
  margin-right: 10px;
  cursor: pointer;
}
.danger_btn {
  color: red;
  cursor: pointer;
}
.el-dialog {
  .row_plan:first-child {
    border-top: 1px solid #ddd;
  }
}
.row_plan {
  // border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 5px 0;
  .plan_name {
    line-height: 50px;
  }
  .icon_style {
    width: 50px;
    transform: rotate(180deg);
    text-align: center;
    font-size: 20px;
    color: #999;
  }
  .plan_button {
    line-height: 50px;
  }
  .normal_item {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    line-height: 50px;
    text-align: center;
    background-color: #666;
    color: white;
  }
  .done_item {
    color: #2ecc40;
  }
  .inService_item {
    color: #428bca;
  }
}

.tabs {
  width: 1200px;
  margin: 0 auto;
  // padding: 10px 0;
  margin-top: 1px;
  height: 36px;
  border-bottom: 1px solid gainsboro;
  padding-bottom: 1px;
  span {
    height: 100%;
    display: inline-block;
    line-height: 35px;
    padding: 0px 20px;
  }
}
.container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 0;
  .pos_top {
    // position: absolute;
    // top: 0;
    width: 100%;
    margin: 0 auto;
  }
  .titleXm {
    // padding: 10px 0;
    // border-bottom: 2px solid @activeColor;
  }
  .container_xm {
    width: 95%;
    left: 2.5%;
    padding: 20px 0;
    .titleXm {
      margin: 0 auto;
    }
    .activeLi {
      color: white;
    }
    .tab_ul {
      // width: 1200px;
      margin: 0 auto;
      margin-bottom: 20px;
      // display: block;
      position: relative;
      height: 58px;
      li:nth-child(1) {
        left: @stage_left * 0;
        z-index: @stage_zIndex;
      }
      li:nth-child(2) {
        left: @stage_left;
        z-index: 10;
      }
      li:nth-child(3) {
        left: @stage_left * 2;
        z-index: 9;
      }
      li:nth-child(4) {
        left: @stage_left * 3;
        z-index: 8;
      }
      li:nth-child(5) {
        left: @stage_left * 4;
        z-index: 7;
      }
      li:nth-child(6) {
        left: @stage_left * 5;
        z-index: 6;
      }
      li {
        display: inline-block;
        margin: 0;
        list-style: none;
        cursor: pointer;
        width: 218px;
        min-width: 200px;
        height: 58px;
        text-align: center;
        font-size: 20px;
        position: absolute;
        z-index: 999;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          display: inline-block;
          text-align: center;
          position: absolute;
          left: 0;
          top: 14px;
          width: 100%;
        }
      }
    }
    .tab_ul2 {
      // width: 1200px;
      margin: 0 auto;
      margin-bottom: 20px;
      position: relative;
      height: 58px;
      li:nth-child(1) {
        left: @stage_left_ * 0;
        z-index: @stage_zIndex;
      }
      li:nth-child(2) {
        left: @stage_left_;
        z-index: 10;
      }
      li:nth-child(3) {
        left: @stage_left_ * 2;
        z-index: 9;
      }
      li:nth-child(4) {
        left: @stage_left_ * 3;
        z-index: 8;
      }
      li:nth-child(5) {
        left: @stage_left_ * 4;
        z-index: 7;
      }
      li:nth-child(6) {
        left: @stage_left_ * 5;
        z-index: 6;
      }
      li {
        display: inline-block;
        margin: 0;
        list-style: none;
        cursor: pointer;
        width: 257px;
        min-width: 200px;
        height: 58px;
        text-align: center;
        font-size: 20px;
        position: absolute;
        z-index: 999;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          display: inline-block;
          text-align: center;
          position: absolute;
          left: 0;
          top: 14px;
          width: 100%;
        }
      }
    }
    // .tableXm_ul {
    //   position: relative;
    //   height: 25px;
    //   li:nth-child(1) {
    //     left: @stage_left2 * 0;
    //     z-index: @stage_zIndex;
    //   }
    //   li:nth-child(2) {
    //     left: @stage_left2;
    //     z-index: 10;
    //   }
    //   li:nth-child(3) {
    //     left: @stage_left2 * 2;
    //     z-index: 9;
    //   }
    //   li:nth-child(4) {
    //     left: @stage_left2 * 3;
    //     z-index: 8;
    //   }
    //   li:nth-child(5) {
    //     left: @stage_left2 * 4;
    //     z-index: 7;
    //   }
    //   li:nth-child(6) {
    //     left: @stage_left2 * 5;
    //     z-index: 6;
    //   }
    //   li {
    //     display: inline-block;
    //     margin: 0;
    //     list-style: none;
    //     width: 120px;
    //     height: 25px;
    //     text-align: right;
    //     font-size: 12px;
    //     position: absolute;
    //     z-index: 999;
    //     img {
    //       width: 100%;
    //       height: 100%;
    //     }
    //     span {
    //       display: inline-block;
    //       text-align: center;
    //       position: absolute;
    //       left: 0;
    //       top: 1px;
    //       width: 100%;
    //     }
    //   }
    // }
    .tableXm_ul {
      height: 25px;
      li:nth-child(1) {
        z-index: @stage_zIndex;
      }
      li:nth-child(2) {
        z-index: 10;
      }
      li:nth-child(3) {
        z-index: 9;
      }
      li:nth-child(4) {
        z-index: 8;
      }
      li:nth-child(5) {
        z-index: 7;
      }
      li:nth-child(6) {
        z-index: 6;
      }
      li {
        display: inline-block;
        margin: 0;
        list-style: none;
        width: 80px;
        height: 25px;
        text-align: right;
        font-size: 12px;
        position: relative;
        height: 25px;
        margin-left: -20px;
        z-index: 999;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          display: inline-block;
          text-align: center;
          position: absolute;
          left: 0;
          top: 1px;
          width: 100%;
        }
      }
    }
  }
}
</style>
