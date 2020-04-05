<!--项目配置-->
<template>
  <div>
    <el-form :model="form" style="padding:20px 40px" @submit.native.prevent>
      <el-row v-loading.fullscreen.lock="fullscreenLoading">
        <el-col :span="12">
          <div>
            <el-switch v-model="form.zz.zzyes"></el-switch>
            <label class="type-title">资质</label>
          </div>
          <div class="tiaojian-content">
            <div class="absolute-mak" @click="onMak('zz')" :hidden="form.zz.zzyes"></div>
            <el-form-item label="资质条件1" label-width="100px">
              <!-- <el-cascader :options="options_zz" multiple v-model="form.zz.display.selected_zzL" filterable clearable>
              </el-cascader>-->
              <el-popover @show="onShow_zz('selected_zzL',form.zz.display.selected_zzValueL)" placement="bottom" trigger="click">
                <my-cascader :options="options_zz" :defaultvalue="form.zz.display.selected_zzL" @selectedChange="onSelectedChangeL"></my-cascader>
                <el-input style="width:70%" readonly v-model="form.zz.display.selected_zzTextL" slot="reference" placeholder="选择资质"></el-input>
              </el-popover>
              <el-button size="mini" icon="el-icon-plus" circle @click="onPlusZz('selected_zzTransferL','selected_zzContentL','selected_zzTextL','selected_zzL')"></el-button>
            </el-form-item>
            <transition name="fade">
              <el-form-item label-width="100px" v-show="form.zz.display.selected_zzContentL.length > 0">
                <el-card class="box-card" style="width:70%;position:relative">
                  <div class="zz_tijiao">
                    <div v-for="(one,i) in form.zz.display.selected_zzContentL" :key="i">{{one.label}}</div>
                  </div>
                  <el-button @click="onclearZz('selected_zzContentL','selected_zzTransferL','selected_zzTextL','selected_zzL')" size="mini" class="close_zz" icon="el-icon-close"></el-button>
                </el-card>
              </el-form-item>
            </transition>
            <el-form-item label="资质条件关系" label-width="100px">
              <el-select style="width:100px" v-model="form.zz.ajax_data.orand" placeholder="请选择" clearable>
                <el-option label="且" value="and"></el-option>
                <el-option label="或" value="or"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资质条件2" label-width="100px">
              <el-popover @show="onShow_zz('selected_zzR',form.zz.display.selected_zzValueR)" placement="bottom" trigger="click">
                <my-cascader :options="options_zz" :defaultvalue="form.zz.display.selected_zzR" @selectedChange="onSelectedChangeR"></my-cascader>
                <el-input style="width:70%" v-model="form.zz.display.selected_zzTextR" readonly slot="reference" placeholder="选择资质"></el-input>
              </el-popover>
              <el-button size="mini" icon="el-icon-plus" circle @click="onPlusZz('selected_zzTransferR','selected_zzContentR','selected_zzTextR','selected_zzR')"></el-button>
            </el-form-item>
            <transition name="fade">
              <el-form-item label-width="100px" v-show="form.zz.display.selected_zzContentR.length > 0">
                <el-card class="box-card" style="width:70%;position:relative">
                  <div class="zz_tijiao">
                    <div v-for="(one,i) in form.zz.display.selected_zzContentR" :key="i">{{one.label}}</div>
                  </div>
                  <el-button @click="onclearZz('selected_zzContentR','selected_zzTransferR','selected_zzTextR','selected_zzR')" size="mini" class="close_zz" icon="el-icon-close"></el-button>
                </el-card>
              </el-form-item>
            </transition>
          </div>
          <!-- 信用 -->
          <div>
            <el-switch></el-switch>
            <label class="type-title">信用</label>
          </div>
          <div class="tiaojian-content">
            <div class="absolute-mak" :hidden="form.xy.xyyes"></div>
            <el-form-item label="信用名称">
              <el-select style="width:130px" v-model="form.xy.ajax_data.xymc" placeholder="请选择" clearable>
                <el-option label="建设厅信用" value="1"></el-option>
                <el-option label="成都信用" value="2"></el-option>
              </el-select>
              <el-select style="width:120px" v-model="form.xy.ajax_data.xytype" placeholder="请选择" clearable>
                <el-option label="施工-房间" value="1"></el-option>
                <el-option label="施工-市政" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排名" label-width="69px">
              <el-input style="width:100px" v-model="form.xy.ajax_data.df" placeholder="得分" clearable></el-input>
              <el-radio-group v-model="form.xy.ajax_data.pmrq" style="margin-left:20px">
                <el-radio label="1">今日排名</el-radio>
                <el-radio label="2">60日排名</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <!-- 类似业绩 -->
          <div>
            <el-switch v-model="form.lsyj.lsyjyes"></el-switch>
            <label class="type-title">类似业绩</label>
          </div>
          <div class="tiaojian-content">
            <div class="absolute-mak" @click="onMak('lsyj')" :hidden="form.lsyj.lsyjyes"></div>
            <el-form>
              <el-form-item label="业绩来源" label-width="68px">
                <el-checkbox :indeterminate="false" v-model="form.lsyj.checkAll" @change="onCheckAllChange">全选</el-checkbox>
                <el-checkbox :indeterminate="false" v-model="waterForm.checkWater" @change="onCheckWaterChange">水利</el-checkbox>
                <el-checkbox-group v-if="!waterForm.checkWater" v-model="form.lsyj.ajax_data.checkedList" @change="onCheckOneChange">
                  <el-checkbox v-for="yjly in form.lsyj.yjlyOptions" :key="yjly.value" :label="yjly.value">{{yjly.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <!-- 勾选类似业绩时展示的内容 -->
            <div v-show="form.lsyj.ajax_data.checkedList.length>0">
              <el-form :inline="true" :model="form.lsyj.ajax_data" :rules="rules" @submit.native.prevent>
                <!-- <el-form-item label="业绩来源" label-width="68px">
                <el-checkbox :indeterminate="false" v-model="form.lsyj.checkAll" @change="onCheckAllChange">全选</el-checkbox>
                <el-checkbox :indeterminate="false" v-model="waterForm.checkWater">水利</el-checkbox>
                <el-checkbox-group v-model="form.lsyj.ajax_data.checkedList" @change="onCheckOneChange">
                  <el-checkbox v-for="yjly in form.lsyj.yjlyOptions" :key="yjly.value" :label="yjly.value">{{yjly.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item> -->
                <div class="bt3">业绩要求:</div>
                <el-form-item label="近" prop="year">
                  <el-input v-model.number="form.lsyj.ajax_data.year" style="width:130px"></el-input>
                </el-form-item>
                <label style="line-height:40px;padding-right:10px;display:inline-block" class="text_ipt">年</label>
                <div :style="{display:this.showAroundTime ?'inline-block':'none',verticalAlign:'bottom'}">
                  <el-form-item>
                    <!-- <el-date-picker @focus="onSetyear" v-model="form.lsyj.ajax_data.date" :default-value="form.lsyj.default_date" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>-->
                    <el-date-picker value-format="yyyy-MM-dd" v-model="form.lsyj.ajax_data.date.minTime" type="date" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker>
                    <label style="line-height:40px;padding:0 10px;display:inline-block" class="text_ipt">至</label>
                    <el-date-picker value-format="yyyy-MM-dd" v-model="form.lsyj.ajax_data.date.maxTime" type="date" placeholder="选择日期" :picker-options="pickerOptions2"></el-date-picker>
                  </el-form-item>
                </div>
              </el-form>
              <el-form inline style="padding-left:26px" :model="form.lsyj.ajax_data" :rules="rules" @submit.native.prevent>
                <el-form-item>
                  <el-popover placement="bottom" trigger="click">
                    <el-tree ref="treekgwg" @check="onSelect_kgwg" :default-checked-keys="this.form.lsyj.ajax_data.kgwg.split(',')" :data="kgwg_select" show-checkbox node-key="value" :check-on-click-node="true"></el-tree>
                    <el-input style="width:130px" readonly slot="reference" v-model="form.lsyj.ajax_data.kgwg" placeholder="请选择" clearable></el-input>
                  </el-popover>
                </el-form-item>
                <el-form-item prop="number">
                  <el-input style="width:80px" v-model.number="form.lsyj.ajax_data.number" placeholder></el-input>
                  <label class="text_ipt">(0~5)个类似项目业绩</label>
                </el-form-item>
              </el-form>
              <div class="bt3">类似业绩是指:</div>
              <el-form>
                <el-form-item label="关键词" label-width="100px">
                  <el-input v-model.trim="form.lsyj.yjInputKey" style="width:250px" @keyup.enter.native="onConfirmKey('all')" clearable placeholder="请输入关键字"></el-input>&nbsp;
                  <label class="text_ipt">例：道、路、桥(回车键确定添加)</label>
                  <div>
                    <el-tag v-for="(tag,index) in form.lsyj.ajax_data.YjTags" :key="tag.name" closable @close="onDelete_yjTag(index,'all')">{{tag.name}}</el-tag>
                  </div>
                </el-form-item>
                <el-form-item label="项目类型" label-width="100px">
                  <el-select v-model="form.lsyj.ajax_data.xmlx" placeholder="请选择" clearable>
                    <el-option label="市政" value="市政工程"></el-option>
                    <el-option label="房建" value="房建工程"></el-option>
                    <el-option label="公路" value="公路工程"></el-option>
                    <el-option label="水利" value="水利工程"></el-option>
                    <el-option label="其他" value="其他工程"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :hidden="form.lsyj.ajax_data.xmlx != '房建工程'" label="面积 不低于" label-width="100px">
                  <el-input style="width:150px" type="number" v-model="form.lsyj.ajax_data.zmj"></el-input>
                  <span>平米</span>
                </el-form-item>
                <el-form-item label="金额 不低于" label-width="100px">
                  <el-input style="width:150px" type="number" v-model="form.lsyj.ajax_data.money"></el-input>
                  <span>万元</span>
                </el-form-item>
                <el-form-item label="工程用途" label-width="100px" :hidden="!showGcyt">
                  <el-select v-model="form.lsyj.ajax_data.gcyt" placeholder="请选择" clearable>
                    <el-option v-for="one in options_gcyt" :key="one.id" :label="one.label" :value="one.label"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="其他要求" v-if="showOther" label-width="100px">
                  <el-checkbox-group v-model="form.lsyj.ajax_data.selectOtheryq">
                    <el-checkbox v-for="yjly in form.lsyj.otheryq" :disabled="yjly.value == 'finish'" :key="yjly.value" :label="yjly.value">{{yjly.label}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
            </div>
            <!-- 勾选水利时展示的页面内容 -->
            <div v-show="waterForm.checkWater">
              <div class="bt3">水利业绩要求:</div>
              <el-form ref="waterForm" :model="waterForm" label-width="90px">
                <el-row>
                  <el-col :span="3" class="waterTitle">时间区间：</el-col>
                  <el-col :span="21">
                    <el-form-item label="开工时间">
                      <el-date-picker :picker-options="pickerOptionsStartminKgsj" style="width:140px;" class="datePicker" value-format="yyyy-MM-dd" v-model="waterForm.minKgsj" type="date" placeholder="选择日期">
                      </el-date-picker>
                      <span>-</span>
                      <el-date-picker :picker-options="pickerOptionsEndmaxKgsj" style="width:140px;" class="datePicker" value-format="yyyy-MM-dd" v-model="waterForm.maxKgsj" type="date" placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="合同期限">
                      <el-date-picker :picker-options="pickerOptionsStartsminHtqx" style="width:140px;" class="datePicker" value-format="yyyy-MM-dd" v-model="waterForm.sminHtqx" type="date" placeholder="选择日期">
                      </el-date-picker>
                      <span>-</span>
                      <el-date-picker :picker-options="pickerOptionsEndsmaxHtqx" style="width:140px;" class="datePicker" value-format="yyyy-MM-dd" v-model="waterForm.smaxHtqx" type="date" placeholder="选择日期">
                      </el-date-picker>
                      <span style="padding: 0 10px;">至</span>
                      <el-date-picker :picker-options="pickerOptionsStarteminHtqx" style="width:140px;" class="datePicker" value-format="yyyy-MM-dd" v-model="waterForm.eminHtqx" type="date" placeholder="选择日期">
                      </el-date-picker>
                      <span>-</span>
                      <el-date-picker :picker-options="pickerOptionsEndemaxHtqx" style="width:140px;" class="datePicker" value-format="yyyy-MM-dd" v-model="waterForm.emaxHtqx" type="date" placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="实际工期">
                      <el-date-picker :picker-options="pickerOptionsStartsminSjgq" style="width:140px;" class="datePicker" value-format="yyyy-MM-dd" v-model="waterForm.sminSjgq" type="date" placeholder="选择日期">
                      </el-date-picker>
                      <span>-</span>
                      <el-date-picker :picker-options="pickerOptionsEndsmaxSjgq" style="width:140px;" class="datePicker" value-format="yyyy-MM-dd" v-model="waterForm.smaxSjgq" type="date" placeholder="选择日期">
                      </el-date-picker>
                      <span style="padding: 0 10px;">至</span>
                      <el-date-picker :picker-options="pickerOptionsStarteminSjgq" style="width:140px;" class="datePicker" value-format="yyyy-MM-dd" v-model="waterForm.eminSjgq" type="date" placeholder="选择日期">
                      </el-date-picker>
                      <span>-</span>
                      <el-date-picker :picker-options="pickerOptionsEndemaxSjgq" style="width:140px;" class="datePicker" value-format="yyyy-MM-dd" v-model="waterForm.emaxSjgq" type="date" placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom:20px;">
                  <el-col :span="3" class="waterTitle1">项目状态：</el-col>
                  <el-col :span="21" class="waterRight">
                    <!-- <el-form-item> -->
                    <template>
                      <el-checkbox v-model="waterForm.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                      <div style="margin: 15px 0;"></div>
                      <el-checkbox-group v-model="waterForm.gczt" @change="handleCheckedStateChange">
                        <el-checkbox v-for="item in waterForm.states" :label="item" :key="item">{{item}}</el-checkbox>
                      </el-checkbox-group>
                    </template>
                    <!-- </el-form-item> -->
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="3" class="waterTitle">金额：</el-col>
                  <el-col :span="21" class="">
                    <el-form-item label="合同金额" prop="name">
                      <el-input style="width:240px;" v-model="waterForm.htminMoney" type="number"></el-input>
                      <span>-</span>
                      <el-input style="width:240px;" v-model="waterForm.htmaxMoney" type="number"></el-input>
                      <span style="margin-left:10px;">万元</span>
                    </el-form-item>
                    <el-form-item label="结算金额" prop="name">
                      <el-input style="width:240px;" v-model="waterForm.jsminMoney" type="number"></el-input>
                      <span>-</span>
                      <el-input style="width:240px;" v-model="waterForm.jsmaxMoney" type="number"></el-input>
                      <span style="margin-left:10px;">万元</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom:20px;">
                  <el-col :span="3" class="waterTitle">关键词：</el-col>
                  <el-col :span="21" class="waterRight">
                    <!-- <el-form-item> -->
                    <template>
                      <el-input style="width:240px;" v-model.trim="waterForm.key" @keyup.enter.native="onConfirmKey('water')" clearable placeholder="请输入关键字"></el-input>
                      <label style="margin-left:10px;" class="text_ipt">例：道、路、桥(回车键确定添加)</label>
                      <div>
                        <el-tag v-for="(tag,index) in waterForm.keys" :key="tag.name" closable @close="onDelete_yjTag(index,'water')">{{tag.name}}</el-tag>
                      </div>
                    </template>
                    <!-- </el-form-item> -->
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="3" class="waterTitle">工程等级：</el-col>
                  <el-col :span="21" class="">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="工程等别">
                          <el-select v-model="waterForm.gcdb" placeholder="工程等别" clearable>
                            <el-option v-for="(item,i) in waterForm.gcdbs" :label="item" :value="item" :key="i"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="工程级别">
                          <el-select v-model="waterForm.gcjb" placeholder="工程级别" clearable>
                            <el-option v-for="(item,i) in waterForm.gcjbs" :label="item" :value="item" :key="i"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="工程规模">
                          <el-select v-model="waterForm.gcgm" placeholder="工程规模" clearable>
                            <el-option v-for="(item,i) in waterForm.gcgms" :label="item" :value="item" :key="i"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3" class="waterTitle">类似业绩：</el-col>
                  <el-col :span="21" class="waterRight">
                    <!-- <el-form-item label="类似业绩"> -->
                    <el-row>
                      <el-col :span="18">
                        <el-input v-model="waterForm.lsyj" type="number"></el-input>
                      </el-col>
                      <el-col :span="6" style="margin-top:10px;font-size:13px;">
                        <span>(0-5)个类似项目业绩</span>
                      </el-col>
                    </el-row>
                    <!-- </el-form-item> -->
                  </el-col>
                </el-row>

              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24" style="margin-bottom:10px;">
              <el-radio-group v-model="waterPerson.radio" @change="handleChangeRyType">
                <el-radio-button label="建设厅人员"></el-radio-button>
                <el-radio-button label="水利人员"></el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row v-show="waterPerson.radio=='建设厅人员'">
            <el-col :span="24">

              <div>
                <el-switch v-model="form.xmjl.xmjlyes"></el-switch>
                <label class="type-title">项目经理</label>
                <div class="xmjl_yj">
                  <el-switch v-model="form.xmjl_yj.xmjlyjyes"></el-switch>
                  <label class="type-title">项目经理类似业绩</label>
                </div>
              </div>
              <div class="tiaojian-content">
                <div class="absolute-mak" @click="onMak('xmjl')" :hidden="form.xmjl.xmjlyes"></div>
                <div style="display:flex;align-items:center" v-for="(xmjlForm,index) in form.xmjl.selectedAll" :key="index">
                  <div style="flex:1">
                    <el-form :inline="true" label-width="68px" @submit.native.prevent>
                      <el-form-item class="margin_b10" label="建造师证">
                        <el-popover placement="bottom" trigger="click">
                          <el-tree ref="xmjl" @check="onSelect_dj(index,'xmjl')" :data="rydjlists" show-checkbox node-key="label" :check-on-click-node="true" :default-checked-keys="xmjlForm.jzsz.split(',')"></el-tree>
                          <el-input style="width:200px" readonly slot="reference" v-model="xmjlForm.jzsz" placeholder="选择等级" clearable></el-input>
                        </el-popover>
                      </el-form-item>
                      <el-form-item label="专业" class="margin_b10">
                        <el-select style="width:120px" v-model="xmjlForm.zy" placeholder="请选择" clearable>
                          <el-option v-for="one in ryzczylists" :key="one.label" :label="one.label" :value="one.label"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="安考证" class="margin_b10">
                        <el-select style="width:120px" v-model="xmjlForm.akz" placeholder="请选择" clearable>
                          <el-option v-for="one in ryzkzlists" :key="one.label" :label="one.label" :value="one.label"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <el-form :inline="true" label-width="68px" @submit.native.prevent>
                      <el-form-item label="职称证" class="margin_b10">
                        <el-popover placement="bottom" trigger="click">
                          <el-tree ref="xmjl_zcz_zczy" @check="onSelect_dj(index,'xmjl','zcz_zczy','xmjl_zcz_zczy')" :data="ryzczlists" show-checkbox node-key="zczy" :check-on-click-node="true" :default-checked-keys="xmjlForm.zcz_zczy?xmjlForm.zcz_zczy.split('|'):[]"></el-tree>
                          <el-input style="width:200px" readonly slot="reference" v-model="xmjlForm.zcz_name" placeholder="选择专业" clearable></el-input>
                        </el-popover>
                      </el-form-item>
                      <el-form-item label="等级">
                        <el-select style="width:120px" v-model="xmjlForm.zcz_dj" placeholder="请选择" clearable>
                          <el-option v-for="one in ryzczdjlists" :key="one" :label="one" :value="one"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div style="margin-left:10px">
                    <el-button size="mini" v-if="form.xmjl.selectedAll.length > 1" icon="el-icon-minus" circle @click="onMinus_row(index,'xmjl')"></el-button>
                    <el-button size="mini" icon="el-icon-plus" circle @click="onPlus_xmjl('xmjl')"></el-button>
                  </div>
                </div>
              </div>

              <!-- 技术负责人 -->
              <div>
                <el-switch v-model="form.jsfzr.jsfzryes"></el-switch>
                <label class="type-title">技术负责人</label>
              </div>
              <div class="tiaojian-content">
                <div class="absolute-mak" @click="onMak('jsfzr')" :hidden="form.jsfzr.jsfzryes"></div>
                <div style="display:flex;align-items:center" v-for="(xmjlForm,index) in form.jsfzr.selectedAll" :key="index">
                  <div style="flex:1">
                    <el-form :inline="true" label-width="68px" @submit.native.prevent>
                      <el-form-item label="建造师证" class="margin_b10">
                        <el-popover placement="bottom" trigger="click">
                          <el-tree ref="jsfzr" @check="onSelect_dj(index,'jsfzr')" :data="rydjlists" show-checkbox node-key="label" :check-on-click-node="true" :default-checked-keys="xmjlForm.jzsz.split(',')"></el-tree>
                          <el-input style="width:200px" readonly slot="reference" v-model="xmjlForm.jzsz" placeholder="选择等级" clearable></el-input>
                        </el-popover>
                      </el-form-item>
                      <el-form-item label="专业" class="margin_b10">
                        <el-select style="width:120px" v-model="xmjlForm.zy" placeholder="请选择" clearable>
                          <el-option v-for="one in ryzczylists" :key="one.label" :label="one.label" :value="one.label"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="安考证" class="margin_b10">
                        <el-select style="width:120px" v-model="xmjlForm.akz" placeholder="请选择" clearable>
                          <el-option v-for="one in ryzkzlists" :key="one.label" :label="one.label" :value="one.label"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <el-form :inline="true" label-width="68px" @submit.native.prevent>
                      <el-form-item label="职称证" class="margin_b10">
                        <el-popover placement="bottom" trigger="click">
                          <el-tree ref="jsfzr_zcz_zczy" @check="onSelect_dj(index,'jsfzr','zcz_zczy','jsfzr_zcz_zczy')" :data="ryzczlists" show-checkbox node-key="zczy" :check-on-click-node="true" :default-checked-keys="xmjlForm.zcz_zczy?xmjlForm.zcz_zczy.split('|'):[]"></el-tree>
                          <el-input style="width:200px" readonly slot="reference" v-model="xmjlForm.zcz_name" placeholder="选择专业" clearable></el-input>
                        </el-popover>
                      </el-form-item>
                      <el-form-item label="等级">
                        <el-select style="width:120px" v-model="xmjlForm.zcz_dj" placeholder="请选择" clearable>
                          <el-option v-for="one in ryzczdjlists" :key="one" :label="one" :value="one"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div style="margin-left:10px">
                    <el-button size="mini" v-if="form.jsfzr.selectedAll.length > 1" icon="el-icon-minus" circle @click="onMinus_row(index,'jsfzr')"></el-button>
                    <el-button size="mini" icon="el-icon-plus" circle @click="onPlus_xmjl('jsfzr')"></el-button>
                  </div>
                </div>
              </div>
              <!-- 现场施工人员 -->
              <div>
                <el-switch v-model="form.xcsgry.xcsgryyes"></el-switch>
                <label class="type-title">现场施工人员</label>
              </div>
              <div class="tiaojian-content">
                <div class="absolute-mak" @click="onMak('xcsgry')" :hidden="form.xcsgry.xcsgryyes"></div>
                <div>
                  <el-button class="xcsgry_btn" type="primary" @click="onClick_xcsgry(tag.dj)" v-for="tag in form.xcsgry.userList" :key="tag.dj">{{tag.dj+tag.count+'个'}}</el-button>
                </div>
                <div style="margin-top:20px" v-for="(one,index) in this.form.xcsgry.selectedAll" :key="index">
                  <el-popover trigger="click" placement="bottom">
                    <div>
                      <el-button type="text" @click="onClearSelect(index,this)">{{one.selectedAll.length == one.treeData.length?'清空':'全选'}}</el-button>
                      <el-tree ref="xcsgryTree" :default-checked-keys="one.selectedAll" :props="xcsgry_props" show-checkbox :data="one.treeData" node-key="name" :render-content="render_xcsgry" check-on-click-node @check="onSelect_xcsgryTree(index)"></el-tree>
                    </div>
                    <el-button slot="reference">{{one.typeName}}</el-button>
                  </el-popover>
                  <el-select v-if="one.typeName == '安全员'" placeholder="请选择" clearable v-model="one.zsh" style="width:120px">
                    <el-option v-for="option in one.anquanyuan" :key="option" :label="option" :value="option"></el-option>
                  </el-select>
                  <span class="text_ipt">选择人数</span>
                  <div style="display:inline-block;width:100px">
                    <el-select v-model="one.userNumber" placeholder="请选择">
                      <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </div>
                  <span class="text_ipt">个</span>
                  <el-button size="mini" icon="el-icon-minus" circle @click="onMinus_row(index,'xcsgry')"></el-button>
                  <div v-if="one.selectedAll.length != one.treeData.length">
                    <el-tag style="margin:6px 6px 0px 0" v-for="tag in one.selectedAll" :key="tag">{{tag}}</el-tag>
                  </div>
                </div>
              </div>
              <div style="margin-bottom:30px">
                <el-switch v-model="form.otherry.otherryyes"></el-switch>
                <label class="type-title">其他主要人员</label>
              </div>
              <div class="tiaojian-content">
                <div class="absolute-mak" @click="onMak('jsfzr')" :hidden="form.otherry.otherryyes"></div>
                <div style="margin-bottom:20px">
                  <div style="display:flex;align-items:center" v-for="(xmjlForm,index) in form.otherry.selectedAll.zjgcs" :key="'a'+index">
                    <el-form :inline="true" @submit.native.prevent>
                      <el-form-item label="造价工程师" class="margin_b10" label-width="110px">
                        <el-select v-model="xmjlForm.zczy" multiple clearable placeholder="请选择">
                          <el-option label="安装" value="安装"></el-option>
                          <el-option label="土建" value="土建"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item class="margin_b10">
                        <el-button v-if="form.otherry.selectedAll.zjgcs.length > 1" size="mini" icon="el-icon-minus" circle @click="onMinus_otherRow(index,'zjgcs')"></el-button>
                        <el-button size="mini" icon="el-icon-plus" circle @click="onPlus_otherRow('zjgcs')"></el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                <div style="display:flex;align-items:center" v-for="(xmjlForm,index) in form.otherry.selectedAll.zcaqgcs" :key="index">
                  <el-form :inline="true" @submit.native.prevent>
                    <el-form-item label="注册安全工程师" class="margin_b10">
                      <el-select v-model="xmjlForm.zczy" multiple collapse-tags clearable placeholder="请选择">
                        <el-option v-for="item in zcaqgcs_zy" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="证书号" class="margin_b10">
                      <el-select v-model="xmjlForm.zsh" collapse-tags clearable placeholder="请选择">
                        <el-option v-for="item in zcaqgcs_zsh" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item class="margin_b10">
                      <el-button v-if="form.otherry.selectedAll.zcaqgcs.length > 1" size="mini" icon="el-icon-minus" circle @click="onMinus_otherRow(index,'zcaqgcs')"></el-button>
                      <el-button size="mini" icon="el-icon-plus" circle @click="onPlus_otherRow('zcaqgcs')"></el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 水利人员 -->
          <el-row v-show="waterPerson.radio =='水利人员'">
            <el-col :span="24">
              <div class="tiaojian-content">
                <div style="display:flex;align-items:center;margin-bottom:20px;" v-for="(slItem,index) in form.slry.display" :key="index">
                  <div style="flex:1">
                    <el-checkbox style="margin-bottom:10px;" v-model="slItem.jst">建设厅该企业可查(入川)</el-checkbox>
                    <el-form :inline="true" label-width="68px" @submit.native.prevent>
                      <el-form-item class="margin_b10" label="资格名称">
                        <el-select style="width:200px" v-model="slItem.zgmc" placeholder="请选择" clearable @change="(val) => handleZgmcChange(val, index)">
                          <el-option v-for="one in waterPerson.zgmc" :key="one.name" :label="one.name" :value="one.name"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item class="margin_b10" label="专业" v-if="waterPerson.zczy.length > 0">
                        <el-select style="width:120px" v-model="slItem.zczy" placeholder="请选择" clearable>
                          <el-option v-for="one in waterPerson.zczy" :key="one" :label="one" :value="one"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="安考证" class="margin_b10" v-if="waterPerson.zsh.length > 0">
                        <el-select style="width:120px" v-model="slItem.zsh" placeholder="请选择" clearable>
                          <el-option v-for="one in waterPerson.zsh" :key="one" :label="one" :value="one"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <el-form :inline="true" label-width="68px" @submit.native.prevent>
                      <el-form-item label="职称" class="margin_b10">
                        <el-select style="width:200px" v-model="slItem.zc" placeholder="请选择" clearable>
                          <el-option v-for="one in waterPerson.zc" :key="one" :label="one" :value="one"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <el-form :inline="true" label-width="68px" @submit.native.prevent>
                      <el-form-item label="岗位名称" class="margin_b10">
                        <el-select style="width:200px" v-model="slItem.gwmc" placeholder="请选择" clearable>
                          <el-option v-for="one in waterPerson.gwmc" :key="one" :label="one" :value="one"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div style="margin-left:10px">
                    <!-- <el-button size="mini" v-if="form.slry.selectedAll.length > 1" icon="el-icon-minus" circle @click="handleSlMul(index,'slry')"></el-button> -->
                    <el-button size="mini" icon="el-icon-plus" circle @click="handleSlPlus('slry', index)"></el-button>
                  </div>

                </div>
                <transition name="fade">
                  <el-form-item>
                    <el-card class="box-card" style="width:80%;margin-bottom:10px;position:relative" v-for="(slItem,index) in form.slry.selectedAll" :key="index">
                      <div class="zz_tijiao">
                        <div class="isLook" v-show="slItem.jst">
                          建设厅该企业可查(入川)
                          <!-- <el-checkbox v-model="slItem.jst" disabled>建设厅该企业可查(入川)</el-checkbox> -->
                        </div>
                        <div class="">
                          <span v-show="slItem.zgmc">资格名称：{{slItem.zgmc}}</span>
                          <span v-show="slItem.zczy">；&nbsp;&nbsp;专业：{{slItem.zczy}}</span>
                          <span v-show="slItem.zsh">；&nbsp;&nbsp;安考证：{{slItem.zsh}}</span>
                        </div>
                        <div v-show="slItem.zc">职称：{{slItem.zc}}</div>
                        <div v-show="slItem.gwmc">岗位名称：{{slItem.gwmc}}</div>
                        <!-- <div v-for="(one,i) in form.zz.display.selected_zzContentL" :key="i">{{one.label}}</div> -->
                      </div>
                      <el-button @click="handleSlMul('slry', index)" size="mini" class="close_zz" icon="el-icon-close"></el-button>
                    </el-card>
                  </el-form-item>
                </transition>
              </div>
            </el-col>
          </el-row>
          <!-- 水利人员 -->
        </el-col>
      </el-row>
      <div style="text-align:center;">
        <!-- <el-button
          type="primary"
          @click="onConfirm('save')"
        >保存</el-button> -->
        <!-- v-if="visit_type" -->
        <template>
          <el-button v-show="parent_data.flag==0" type="primary" @click="onConfirm('run')">运行</el-button>
          <el-button v-show="parent_data.type=='newZb'" type="primary" @click="onConfirm('newZb')">保存</el-button>
          <el-button type="" @click="onCancel()">取消</el-button>

          <!-- <el-button type="primary" v-if="checkGsList" @click="onCheck">查看公司列表</el-button> -->
          <!-- <el-button type="primary" @click="onDefaultThread" v-if="false">
            默认方案
            <i v-if="defaultThread" class="el-icon-check el-icon--right"></i>
          </el-button> -->
        </template>
      </div>
    </el-form>
    <div class="mask" v-show="!update" @click="clickMask">

    </div>
  </div>
</template>
<script>
/* eslint-disable */
import myCascader from "./cascader";
import { getDate } from "./../../store/formatter";

export default {
    name: "configcondition",
    components: {
        myCascader
    },
    props: {
        parent: null, //方案id pid
        checkGsList: null,
        defaultThread: null //默认方案
    },
    data() {
        var yearsValid = (rule, value, callback) => {
            value = isNaN(value) ? value : parseInt(value);
            if (!value) {
                callback();
                this.showAroundTime = false;
            } else if (!Number.isInteger(value)) {
                callback(new Error("请输入整数"));
                this.showAroundTime = false;
            } else {
                if (value <= 0) {
                    callback(new Error("必须大于0"));
                    this.showAroundTime = false;
                } else {
                    this.showAroundTime = true;
                    callback();
                    let date = new Date();
                    let year = date.getFullYear() - value;
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    month = month < 10 ? `0${month}` : month;
                    day = day < 10 ? `0${day}` : day;
                    this.form.lsyj.ajax_data.date.minTime = `${year}-${month}-${day}`;
                }
            }
        };
        var yjNumber = (rule, value, callback) => {
            value = isNaN(value) ? value : parseInt(value);
            if (!value) {
                callback();
            } else if (!Number.isInteger(value)) {
                callback(new Error("请输入数字值"));
            } else {
                if (value <= 0 || value > 6) {
                    callback(new Error("0~5个项目之间"));
                } else {
                    callback();
                }
            }
        };
        return {
            oldOptions: [],
            update: true,
            created: false,
            // 开工时间
            pickerOptionsStartminKgsj: {
                disabledDate: time => {
                    let endDateVal = this.waterForm.maxKgsj;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            },
            pickerOptionsEndmaxKgsj: {
                disabledDate: time => {
                    let beginDateVal = this.waterForm.minKgsj;
                    if (beginDateVal) {
                        return (
                            time.getTime() <
                            new Date(beginDateVal).getTime() -
                                1 * 24 * 60 * 60 * 1000
                        );
                    }
                }
            },
            //   合同期限
            pickerOptionsStartsminHtqx: {
                disabledDate: time => {
                    let endDateVal = this.waterForm.smaxHtqx;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            },
            pickerOptionsEndsmaxHtqx: {
                disabledDate: time => {
                    let beginDateVal = this.waterForm.sminHtqx;
                    //   let endDateVal1 = this.waterForm.eminHtqx
                    //   let endDateVal2 = this.waterForm.emaxHtqx
                    if (beginDateVal) {
                        return (
                            time.getTime() <
                            new Date(beginDateVal).getTime() -
                                1 * 24 * 60 * 60 * 1000
                        );
                    }
                    //   if (endDateVal1) {
                    //     return time.getTime() > new Date(endDateVal1).getTime()
                    //   }
                    //   if (endDateVal2) {
                    //     return time.getTime() > new Date(endDateVal2).getTime()
                    //   }
                }
            },
            //   至
            pickerOptionsStarteminHtqx: {
                //有问题
                disabledDate: time => {
                    //   let beginDateVal = this.waterForm.sminHtqx
                    //   let beginDateVal1 = this.waterForm.smaxHtqx
                    let endDateVal = this.waterForm.emaxHtqx;
                    //   if (beginDateVal) {
                    //     return (
                    //       time.getTime() <
                    //       new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
                    //     )
                    //   }
                    //   if (beginDateVal1) {
                    //     return (
                    //       time.getTime() <
                    //       new Date(beginDateVal1).getTime() - 1 * 24 * 60 * 60 * 1000
                    //     )
                    //   }
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            },
            pickerOptionsEndemaxHtqx: {
                disabledDate: time => {
                    let beginDateVal = this.waterForm.eminHtqx;
                    //   let beginDateVal1 = this.waterForm.sminHtqx
                    //   let beginDateVal2 = this.waterForm.smaxHtqx
                    if (beginDateVal) {
                        return (
                            time.getTime() <
                            new Date(beginDateVal).getTime() -
                                1 * 24 * 60 * 60 * 1000
                        );
                    }
                    //   if (beginDateVal1) {
                    //     return (
                    //       time.getTime() <
                    //       new Date(beginDateVal1).getTime() - 1 * 24 * 60 * 60 * 1000
                    //     )
                    //   }
                    //   if (beginDateVal2) {
                    //     return (
                    //       time.getTime() <
                    //       new Date(beginDateVal2).getTime() - 1 * 24 * 60 * 60 * 1000
                    //     )
                    //   }
                }
            },
            //   实际工期

            pickerOptionsStartsminSjgq: {
                disabledDate: time => {
                    let endDateVal = this.waterForm.smaxSjgq;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            },
            pickerOptionsEndsmaxSjgq: {
                disabledDate: time => {
                    let beginDateVal = this.waterForm.sminSjgq;
                    if (beginDateVal) {
                        return (
                            time.getTime() <
                            new Date(beginDateVal).getTime() -
                                1 * 24 * 60 * 60 * 1000
                        );
                    }
                }
            },
            pickerOptionsStarteminSjgq: {
                disabledDate: time => {
                    let endDateVal = this.waterForm.emaxSjgq;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            },
            pickerOptionsEndemaxSjgq: {
                disabledDate: time => {
                    let beginDateVal = this.waterForm.eminSjgq;
                    if (beginDateVal) {
                        return (
                            time.getTime() <
                            new Date(beginDateVal).getTime() -
                                1 * 24 * 60 * 60 * 1000
                        );
                    }
                }
            },
            // 时间
            pickerOptions1: {
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        }
                    }
                ],
                disabledDate: time => {
                    let endDateVal = this.form.lsyj.ajax_data.date.maxTime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            },
            pickerOptions2: {
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        }
                    }
                ],
                disabledDate: time => {
                    let beginDateVal = this.form.lsyj.ajax_data.date.minTime;
                    if (beginDateVal) {
                        return (
                            time.getTime() <
                            new Date(beginDateVal).getTime() -
                                1 * 24 * 60 * 60 * 1000
                        );
                    }
                }
            },
            treexcsgryText: "清空",
            son_id: "", //保存方案id
            showAroundTime: false, //显示选择时间
            ajax_number: 0,
            // visit_type: true, //显示运行按钮
            fullscreenLoading: false,
            jbxx_id: "", //当前项目id
            thread_id: "", //组件id
            show_condition: true,
            show_mask: true,
            out_data: {
                //技术负责人(忽略数据))
                value1: "",
                value2: ""
            },
            //开工完工
            kgwg_select: [
                {
                    label: "开工",
                    value: "开工"
                },
                {
                    label: "完工",
                    value: "完工"
                }
            ],
            value_kgwg: [],
            checkList_other: ["finish"],
            title: "招标文件要求(投标人须知)",
            // 选择资质数据
            options_zz: [],
            // 工程用途
            options_gcyt: [],
            //等级选择列表
            rydjlists: [],
            //职称证
            ryzczlists: [],
            //职称等级
            ryzczdjlists: [],
            //注册安全工程师
            zcaqgcs_zy: [],
            zcaqgcs_zsh: [],
            //专业
            ryzczylists: [],
            //安考证
            ryzkzlists: [],
            //安考证2
            ryakzClists: [],
            // 现场施工人员定义显示字段
            xcsgry_props: {
                label: "name"
            },
            //表单验证
            rules: {
                year: [{ validator: yearsValid, trigger: "blur" }],
                number: [{ validator: yjNumber, trigger: "blur" }]
            },
            //表单数据
            form: {
                aa: "2",
                bb: {
                    cc: "1"
                },
                zz: {
                    zzyes: false,
                    selected_zzTransferL: [], //储存选择的条件
                    selected_zzTransferR: [], //储存选择的条件
                    ajax_data: {
                        orand: ""
                    },
                    display: {
                        selected_zzL: [], //资质默认选中项
                        selected_zzTextL: "",
                        selected_zzValueL: [], //资质选中项
                        selected_zzR: [],
                        selected_zzTextR: "",
                        selected_zzValueR: [],
                        selected_zzContentL: [],
                        selected_zzContentR: []
                    }
                },
                xmjl: {
                    xmjlyes: false,
                    selectedAll: [
                        {
                            jzsz: "",
                            zy: "",
                            akz: "",
                            zcz_zczy: "",
                            zcz_name: "",
                            zcz_dj: ""
                        }
                    ]
                },
                xy: {
                    xymc: "",
                    ajax_data: {
                        xymc: "",
                        xytype: "",
                        df: "",
                        pmrq: "1"
                    }
                },
                jsfzr: {
                    jsfzryes: false,
                    selectedAll: [
                        {
                            jzsz: "",
                            zy: "",
                            akz: "",
                            zcz_zczy: "",
                            zcz_name: "",
                            zcz_dj: ""
                        }
                    ]
                },
                xmjl_yj: {
                    xmjlyjyes: false
                },
                lsyj: {
                    lsyjyes: false,
                    checkAll: false, //是否全选
                    default_date: new Date(),
                    yjInputKey: "",
                    yjlyOptions: [], //复选框列表
                    otheryq: [],
                    ajax_data: {
                        year: "", //年
                        date: {
                            minTime: "",
                            maxTime: getDate("new")
                        }, //时间范围
                        xmlx: "",
                        YjTags: [], //关键词
                        zmj: "", //总面积
                        money: "",
                        kgwg: "",
                        gcyt: "",
                        checkedList: [], //选中类表
                        selectOtheryq: ["finish"]
                    }
                },
                xcsgry: {
                    xcsgryyes: false,
                    // 施工人员的按钮数据
                    userList: [],
                    //施工人员选择数据
                    selectedAll: []
                },
                otherry: {
                    otherryyes: false,
                    selectedAll: {
                        zjgcs: [
                            {
                                zczy: "",
                                zsh: ""
                            }
                        ],
                        zcaqgcs: [
                            {
                                zczy: "",
                                zsh: ""
                            }
                        ]
                    }
                },
                // 水利人员
                slry: {
                    selectedAll: [],
                    display: [
                        {
                            jst: false,
                            zgmc: "", //资格名称
                            zczy: "", //专业
                            zsh: "", //安考证
                            zc: "", //职称
                            gwmc: "" //岗位名称
                        }
                    ]
                }
            },
            // 页面左侧 类似业绩 勾选了水利
            waterForm: {
                minKgsj: "", //开工时间
                maxKgsj: "", //开工时间
                sminHtqx: "", //开始最小合同期限
                smaxHtqx: "", //开始最大合同期限
                eminHtqx: "", //结束最小合同期限
                emaxHtqx: "", //结束最大合同期限
                sminSjgq: "", //开始最小实际工期
                smaxSjgq: "", //开始最大实际工期
                eminSjgq: "", //结束最小实际工期
                emaxSjgq: "", //结束最大实际工期
                htminMoney: "", //最小合同金额
                htmaxMoney: "", //最大合同金额
                jsminMoney: "", //最小结算金额
                jsmaxMoney: "", //最大结算金额
                gczt: [], //项目状态
                states: ["开工在建", "完工待验收", "完工已验收"], //项目状态
                gcdbs: [], // 工程等别下拉列表
                gcjbs: [], // 工程级别
                gcgms: [], // 工程规模
                gcdb: "", //工程等别
                gcjb: "", //工程级别
                gcgm: "", //工程规模
                key: "", // 当前输入的关键词
                lsyj: "", // 类似业绩
                isIndeterminate: true,
                checkAll: false,
                keys: [], // 添加的关键词

                checkWater: false // 勾选了水利
            },
            // 水利人员 下拉列表数据
            waterPerson: {
                radio: "建设厅人员",
                zgmc: [], // 资格名称
                zczy: [], // 专业
                zsh: [], // 安考证
                zc: [], // 职称
                gwmc: [] // 岗位名称
            }
        };
    },
    watch: {
        parent: function() {
            this.parent_data = JSON.parse(this.parent);
            this.show_condition = this.parent_data.show_condition;
            // console.log(this.parent_data)
            this.getInfo();
            // this.isUpdate()
        }
    },
    created() {
        this.created = true;
        // console.log('created')
        this.parent_data = JSON.parse(this.parent);
        console.log(this.parent_data);
        this.jbxx_id = this.$route.query.jbxx_id;
        // this.visit_type = this.$route.query.type ? true : false;
        this.thread_id = this.parent_data.thread_id || "";
        this.plan_id = this.parent_data.thread_id || "";
        this.pid = this.parent_data.pid;
        this.show_condition = this.parent_data.show_condition;
        // this.isUpdate()
        //获取资质类型
        this.axios.post(
            "/index/Aptitude/getDictionary",
            { types: "zz" },
            data => {
                this.options_zz = data.rows;
            }
        );
        this.axios.post(
            "/index/Dictionaries/get_dict",
            { dict_id: 9 },
            data => {
                let obj = data.rows.map(v => {
                    let newo = {
                        value: v.id + "",
                        label: v.name
                    };
                    return newo;
                });
                this.options_gcyt = obj;
            }
        );
        //全国类型类型
        this.axios.post("/index/search_yj/haveSource", {}, data => {
            this.form.lsyj.otheryq = data;
        });
        //获取其他人员的注册安全工程师
        this.axios.post("/index/Search_Ry/getOther", {}, data => {
            this.zcaqgcs_zy = data.rows.zczy;
            this.zcaqgcs_zsh = data.rows.zsh;
        });
        // 请求人员等级
        this.axios.post("/index/Search_Ry/get_ry_major", {}, data => {
            this.rydjlists = data.jzs.dj.map(v => {
                let obj = {
                    label: v
                };
                return obj;
            });
            this.ryzczylists = data.jzs.zczy.map(v => {
                let obj = {
                    label: v
                };
                return obj;
            });
            this.ryzkzlists = data.jzs.zsh.map(v => {
                let obj = {
                    label: v
                };
                return obj;
            });
            //现场施工人员
            this.form.xcsgry.userList = data.sgxc;
        });
        // 请求职称证
        this.axios.post("/index/Search_Ry/getTitle", {}, data => {
            let obj = data.rows.zcz_zy.map(v => {
                let obj = {
                    label: v.name,
                    zczy: v.zczy.join(",")
                };
                return obj;
            });
            this.ryzczlists = obj;
            this.ryzczdjlists = data.rows.zcz_dj;
        });
        //获取业绩来源
        this.axios.post("/index/search_yj/source", {}, data => {
            this.form.lsyj.yjlyOptions = data;
        });
        // if (!this.thread_id) {
        //   return;
        // }
        // if (this.show_condition == false) {
        this.getInfo();
        this.getGcdj();
        this.getSl();
        // }
    },
    computed: {
        showOther() {
            let obj = this.form.lsyj.ajax_data.checkedList.filter(v => {
                if (v == "proj_jzsc") {
                    // this.form.lsyj.ajax_data.selectOtheryq = ["finish"];
                    return v;
                }
            });
            return obj.length;
        },
        showGcyt() {
            let obj = this.form.lsyj.ajax_data.checkedList.filter(v => {
                if (v == "proj_jst" || v == "proj_jzsc") {
                    return v;
                }
            });
            return obj.length;
        }
    },
    methods: {
        // 水利人员
        getSl() {
            let self = this;
            this.axios.post("/index/Search_ry/getSl", {}, data => {
                if (data.status === "success") {
                    let list = data.rows;
                    if (list.zgmc) {
                        this.waterPerson.zgmc = list.zgmc;
                        if (list.zgmc[0].zczy) {
                            this.waterPerson.zczy = list.zgmc[0].zczy;
                        }
                        if (list.zgmc[0].zsh) {
                            this.waterPerson.zsh = list.zgmc[0].zsh;
                        }
                    }
                    if (list.zc) {
                        this.waterPerson.zc = list.zc;
                    }
                    if (list.gwmc) {
                        this.waterPerson.gwmc = list.gwmc;
                    }
                }
            });
        },
        // 水利人员
        // 水利业绩
        // 类似业绩 勾选水利后 项目状态勾选全选
        handleCheckAllChange(val) {
            this.waterForm.gczt = val ? this.waterForm.states : [];
            this.waterForm.isIndeterminate = false;
        },
        // 勾选项目状态下的子选项
        handleCheckedStateChange(value) {
            let checkedCount = value.length;
            this.waterForm.checkAll =
                checkedCount === this.waterForm.states.length;
            this.waterForm.isIndeterminate =
                checkedCount > 0 && checkedCount < this.waterForm.states.length;
        },
        // 页面左侧 勾选水利 水利业绩
        getGcdj() {
            let self = this;
            this.axios.post("/index/common/getGcdj", {}, data => {
                this.waterForm.gcdbs = data.rows.gcdb;
                this.waterForm.gcgms = data.rows.gcgm;
                this.waterForm.gcjbs = data.rows.gcjb;
            });
        },
        changeAll(val) {
            console.log(val);
            let allValues = [];
            let options = this.form.otherry.selectedAll.zcaqgcs;
            console.log(options);
            //保留所有值
            options.forEach(element => {});
        },
        clickMask() {
            this.$message.error("该节点已经运行完成，不能再修改条件");
        },
        isUpdate() {
            let params = {
                thread_id: this.thread_id
            };
            this.axios.post("/index/thread/isUpdate", params, data => {
                this.update = data.update;
            });
        },
        getInfo() {
            //获取资质配置
            this.axios.post(
                "/index/Aptitude/displayZz",
                { jbxx_id: this.jbxx_id, thread_id: this.thread_id },
                data => {
                    if (data.status == "success") {
                        this.zz_id = data.rows.id;
                        this.form.zz_id = data.rows.id;
                        this.form.zz.zzyes = true;
                        this.form.zz.ajax_data.orand =
                            data.rows.display.orand.replace(/\s+/g, "") || "";
                        this.form.zz.display.selected_zzContentL =
                            data.rows.display.selected_zzContentL || [];
                        this.form.zz.display.selected_zzContentR =
                            data.rows.display.selected_zzContentR || [];
                    } else {
                        this.zz_id = "";
                        this.form.zz.zzyes = false;
                        this.form.zz.ajax_data.orand = "";
                        this.form.zz.display.selected_zzContentL = [];
                        this.form.zz.display.selected_zzContentR = [];
                    }
                }
            );
            //获取业绩信息
            this.axios.post(
                "/index/search_yj/displayYj",
                { jbxx_id: this.jbxx_id, thread_id: this.thread_id },
                data => {
                    if (data.status == "success" && data.rows.display) {
                        this.yj_id = data.rows.id;
                        this.form.yj_id = data.rows.id;
                        this.form.lsyj.lsyjyes = true;
                        if (!data.rows.display.YjTags) {
                            data.rows.display.YjTags = [];
                        }
                        if (data.rows.display.year) {
                            this.showAroundTime = true;
                        }
                        this.form.lsyj.ajax_data = data.rows.display;
                        if (!data.rows.display.selectOtheryq) {
                            data.rows.display.selectOtheryq = ["finish"];
                        }
                        this.form.lsyj.ajax_data = data.rows.display;
                        this.value_kgwg = data.rows.display.kgwg.split(",");
                        if (data.rows.display.checkedList.length == 6) {
                            this.form.lsyj.checkAll = true;
                        }
                    } else if (
                        data.status == "success" &&
                        data.rows.displaySl
                    ) {
                        //水利数据显示
                        this.yj_id = data.rows.id;
                        let displaySl = data.rows.displaySl;
                        displaySl.isIndeterminate =
                            displaySl.isIndeterminate == "false" ? false : true;
                        displaySl.checkAll =
                            displaySl.checkAll == "false" ? false : true;
                        displaySl.checkWater = true;
                        if (!displaySl.keys) {
                            displaySl.keys = [];
                        }
                        if (!displaySl.gczt) {
                            displaySl.gczt = [];
                        }
                        this.waterForm = displaySl;
                        this.form.lsyj.lsyjyes = true;
                    } else {
                        this.yj_id = "";
                        this.form.lsyj.lsyjyes = false;
                        this.showAroundTime = false;
                        this.value_kgwg = [];
                        this.form.lsyj.ajax_data = {
                            year: "", //年
                            date: {
                                minTime: "",
                                maxTime: getDate("new")
                            }, //时间范围
                            xmlx: "",
                            YjTags: [], //关键词
                            zmj: "", //总面积
                            money: "",
                            kgwg: "",
                            gcyt: "",
                            checkedList: [], //选中类表
                            selectOtheryq: ["finish"]
                        };
                    }
                }
            );
            //获取人员信息
            this.axios.post(
                "/index/Search_Ry/getProTxt",
                { jbxx_id: this.jbxx_id, thread_id: this.thread_id },
                data => {
                    if (data.status == "success") {
                        this.ry_id = data.rows.id;
                        this.form.ry_id = data.rows.id;
                        let dataall = JSON.parse(data.rows.txt);
                        // 判断选中的是建设厅人员还是水利人员
                        if (dataall.tab) {
                            this.waterPerson.radio = dataall.tab;
                        }
                        if (dataall.xmjl) {
                            this.form.xmjl.xmjlyes = true;
                            dataall.xmjl.map(v => {
                                if (!v.zcz_zczy) {
                                    v.zcz_zczy = "";
                                    v.zcz_name = "";
                                }
                                if (!v.zcz_dj) {
                                    v.zcz_dj = "";
                                }
                                return v;
                            });
                            this.form.xmjl.selectedAll = dataall.xmjl;
                        }
                        if (dataall.jsfzr) {
                            this.form.jsfzr.jsfzryes = true;
                            dataall.jsfzr.map(v => {
                                if (!v.zcz_zczy) {
                                    v.zcz_zczy = "";
                                    v.zcz_name = "";
                                }
                                if (!v.zcz_dj) {
                                    v.zcz_dj = "";
                                }
                                return v;
                            });
                            this.form.jsfzr.selectedAll = dataall.jsfzr;
                        }
                        if (dataall.xcsgry) {
                            this.form.xcsgry.xcsgryyes = true;
                            this.form.xcsgry.selectedAll = dataall.xcsgry;
                        }
                        if (dataall.xmjl_yj) {
                            this.form.xmjl_yj.xmjlyjyes = true;
                        }
                        if (dataall.otherry) {
                            //如果有人员
                            this.form.otherry.otherryyes = true;
                            this.form.otherry.selectedAll = dataall.otherry;
                        }
                        // 水利人员
                        if (dataall.slry) {
                            this.form.slry.selectedAll = dataall.slry;
                        }
                    } else {
                        this.ry_id = "";
                        this.form.xmjl.xmjlyes = false;
                        this.form.xmjl_yj.xmjlyjyes = false;
                        this.form.jsfzr.jsfzryes = false;
                        this.xmjlForm.zczy = [];
                        this.form.xmjl.selectedAll = [
                            {
                                jzsz: "",
                                zy: "",
                                akz: "",
                                zcz_zczy: "",
                                zcz_name: "",
                                zcz_dj: ""
                            }
                        ];
                        this.form.xcsgry.xcsgryyes = false;
                        this.form.otherry.otherryyes = false;
                        this.form.xcsgry.selectedAll = [];
                        this.form.otherry.selectedAll.zjgcs = [
                            {
                                zczy: [],
                                zsh: ""
                            }
                        ];
                        this.form.otherry.selectedAll.zcaqgcs = [
                            {
                                zczy: [],
                                zsh: ""
                            }
                        ];
                    }
                }
            );
        },
        //获取级联cascader的options
        getCascaderObj(val, opt) {
            return val.map(function(value, index, array) {
                for (var itm of opt) {
                    if (itm.value == value) {
                        opt = itm.children;
                        return itm;
                    }
                }
                return null;
            });
        },
        getLabel(val) {
            let opt = this.options_zz;
            let options = this.getCascaderObj(val, opt);
            return options.map(v => {
                return v.label;
            });
        },
        //取消全选清空
        onClearSelect(i) {
            let selecteds = this.$refs.xcsgryTree[i].getCheckedKeys();
            if (event.path[0].innerText == "清空") {
                event.path[0].innerText = "全选";
                this.form.xcsgry.selectedAll.map((v, index) => {
                    if (i == index) {
                        v.selectedAll = [];
                        this.$refs.xcsgryTree[i].setCheckedKeys([]);
                    }
                    return v;
                });
            } else {
                event.path[0].innerText = "清空";
                this.form.xcsgry.selectedAll.map((v, index) => {
                    if (i == index) {
                        v.selectedAll = v.treeData.map(v2 => v2.name);
                        this.$refs.xcsgryTree[i].setCheckedKeys(v.selectedAll);
                    }
                    return v;
                });
            }
            // if (this.treexcsgryText == "清空") {
            //   this.treexcsgryText = "全选";
            // } else {
            //   this.treexcsgryText = "清空";
            // }
            // setCheckedKeys([])
        },
        //显示资质
        onShow_zz(types, val) {
            let val2 = JSON.parse(JSON.stringify(val));
            // this.form.zz.display[types] = val2;
        },
        // 添加资质deffer所选的资质内容，differSelect组件默认选中值,differSelectT选中的text
        onPlusZz(differ, differContent, differSelectT, differSelectV) {
            if (this.form.zz[differ].length < 1) {
                this.$message.error("请选择条件");
                return;
            }
            let lconent = JSON.parse(JSON.stringify(this.form.zz[differ]));
            let last_one = lconent[lconent.length - 1].label;
            if (last_one.length > 0) {
                //资质内容
                let frontArray = lconent.slice(0, lconent.length - 1);
                var newContent = last_one.map((v, i) => {
                    let obj = {
                        label: "",
                        value: lconent[lconent.length - 1].value[i]
                    };
                    let text = "";
                    frontArray.forEach(v => {
                        text += v.label[0] + " - ";
                    });
                    text += v;
                    obj.label = text;
                    return obj;
                });
                this.form.zz[differ] = []; //中转内容为空
                this.form.zz.display[differContent] = newContent; //选中的资质内容
                this.form.zz.display[differSelectT] = ""; //输入框的值
                this.form.zz.display[differSelectV] = []; //资质组件默认选择内容
            } else {
                this.$message.error("请选择条件");
            }
        },
        //清空资质
        onclearZz(differContent, differV, differT, differSelectV) {
            this.form.zz.display[differContent] = [];
            this.form.zz[differV] = []; //选中资质
            this.form.zz.display[differT] = "";
            this.form.zz.display[differSelectV] = []; //资质组件默认选择内容
        },
        //选择资质左
        onSelectedChangeL(obj) {
            this.form.zz.selected_zzTransferL = obj;
            if (obj[obj.length - 1].value.length == 0) {
                this.form.zz.display.selected_zzTextL = "";
                return;
            }
            let text_array = [];
            for (let i of obj) {
                for (let i2 of i.label) {
                    text_array.push(i2);
                }
            }
            this.form.zz.display.selected_zzTextL = text_array.join(",");
        },
        //选择资质右
        onSelectedChangeR(obj) {
            this.form.zz.selected_zzTransferR = obj;
            if (obj[obj.length - 1].value.length == 0) {
                this.form.zz.display.selected_zzTextR = "";
                return;
            }
            let text_array = [];
            for (let i of obj) {
                for (let i2 of i.label) {
                    text_array.push(i2);
                }
            }
            this.form.zz.display.selected_zzTextR = text_array.join(",");
        },
        //选择开工完工
        onSelect_kgwg() {
            this.form.lsyj.ajax_data.kgwg = this.$refs.treekgwg
                .getCheckedKeys()
                .join(",");
        },
        //选择等级
        onSelect_dj(index, typeTxt, typeTxt2, el) {
            let currentData = this.$refs[typeTxt][index].getCheckedKeys(); //获取已选择数据
            let currentData2 = this.$refs[typeTxt][index].getCheckedNodes(); //获取已选择数据
            if (typeTxt2) {
                currentData = this.$refs[el][index].getCheckedKeys(); //获取已选择数据
                currentData2 = this.$refs[el][index].getCheckedNodes(); //获取已选择数据
            }
            this.form[typeTxt].selectedAll.map((v, i) => {
                if (i == index) {
                    if (typeTxt2) {
                        //如果有职称证
                        v[typeTxt2] = currentData.join("|");
                        let array_a = [];
                        currentData2.forEach(v => {
                            array_a.push(v.label);
                        });
                        v["zcz_name"] = array_a.join(",");
                    } else {
                        v.jzsz = currentData.join(",");
                    }
                }
                return v;
            });
        },
        //减少其他人员
        onMinus_otherRow(index, typeTxt) {
            this.form.otherry.selectedAll[
                typeTxt
            ] = this.form.otherry.selectedAll[typeTxt].filter((v, i) => {
                if (i != index) {
                    return v;
                }
            });
        },
        //添加其他人员
        // 添加项目经理
        onPlus_otherRow(typeTxt) {
            this.form.otherry.selectedAll[typeTxt].push({
                dj: "",
                zsh: ""
            });
        },
        // 减少项目经理/技术负责人/现场施工人员
        onMinus_row(index, typeTxt) {
            this.form[typeTxt].selectedAll = this.form[
                typeTxt
            ].selectedAll.filter((v, i) => {
                if (i != index) {
                    return v;
                }
            });
        },
        // 添加项目经理
        onPlus_xmjl(typeTxt) {
            this.form[typeTxt].selectedAll.push({
                jzsz: "",
                zy: "",
                akz: "",
                zcz_zczy: "",
                zcz_name: "",
                zcz_dj: ""
            });
        },
        //设置年份区间类似业绩
        onSetyear() {
            let now = new Date();
            this.form.lsyj.ajax_data.year = Math.round(
                this.form.lsyj.ajax_data.year
            );
            this.form.lsyj.default_date =
                now.getFullYear() -
                parseInt(this.form.lsyj.ajax_data.year) +
                "-01";
        },
        // 删除对应的业绩标签
        onDelete_yjTag(index, type) {
            if (type == "all") {
                this.form.lsyj.ajax_data.YjTags = this.form.lsyj.ajax_data.YjTags.filter(
                    (v, i) => {
                        if (i != index) {
                            return v;
                        }
                    }
                );
            } else {
                this.waterForm.keys = this.waterForm.keys.filter((v, i) => {
                    if (i != index) {
                        return v;
                    }
                });
            }
        },
        //点击回车添加关键词
        onConfirmKey(type) {
            if (type == "all") {
                if (this.form.lsyj.yjInputKey) {
                    if (!this.form.lsyj.ajax_data.YjTags) {
                        this.form.lsyj.ajax_data.YjTags = [];
                    }
                    var filterArray = this.form.lsyj.ajax_data.YjTags.filter(
                        (v, i) => {
                            if (v.name == this.form.lsyj.yjInputKey) {
                                return v;
                            }
                        }
                    );
                    if (filterArray.length) {
                        this.$message({
                            showClose: true,
                            message: "已经存在该关键字",
                            type: "error"
                        });
                    } else {
                        this.form.lsyj.ajax_data.YjTags.push({
                            name: this.form.lsyj.yjInputKey
                        });
                        this.form.lsyj.yjInputKey = "";
                    }
                }
            } else {
                if (this.waterForm.key) {
                    if (!this.waterForm.keys) {
                        this.waterForm.keys = [];
                    }
                    var filterArray = this.waterForm.keys.filter((v, i) => {
                        if (v.name == this.waterForm.key) {
                            return v;
                        }
                    });
                    if (filterArray.length) {
                        this.$message({
                            showClose: true,
                            message: "已经存在该关键字",
                            type: "error"
                        });
                    } else {
                        this.waterForm.keys.push({
                            name: this.waterForm.key
                        });
                        this.waterForm.key = "";
                    }
                }
            }
        },
        // 选择业绩来源
        onCheckOneChange(v) {
            this.form.lsyj.checkAll =
                v.length == this.form.lsyj.yjlyOptions.length;
            if (v.indexOf("proj_jzsc") != "-1") {
            }
            this.waterForm.checkWater = false;
        },
        //全选
        onCheckAllChange() {
            this.form.lsyj.ajax_data.checkedList = this.form.lsyj.checkAll
                ? this.form.lsyj.yjlyOptions.map(v => {
                      return v.value;
                  })
                : [];
            this.waterForm.checkWater = false;
        },
        // 勾选水利
        onCheckWaterChange() {
            this.form.lsyj.checkAll = false;
            this.form.lsyj.ajax_data.checkedList = [];
        },
        // 点击现场施工人员
        onClick_xcsgry(name) {
            // let pass_ = this.form.xcsgry.selectedAll.filter(v => {
            //   if (v.typeName == name) {
            //     return v;
            //   }
            // });
            // if (pass_.length == 1) {
            //   this.$message({
            //     showClose: true,
            //     message: "已经选择了该人员",
            //     type: "error"
            //   });
            //   return;
            // }

            let treedata = this.form.xcsgry.userList.filter(v => {
                if (v.dj == name) {
                    return v;
                }
            });
            if (treedata[0].zsh) {
                this.ryakzClists = treedata[0].zsh;
            }
            let obj = {
                typeName: name,
                treeData: treedata[0].zczy,
                selectedAll: treedata[0].zczy.map(v => {
                    return v.name;
                }),
                userNumber: 1,
                zsh: ""
            };
            if (name == "安全员") {
                obj.anquanyuan = this.ryakzClists;
            }
            this.form.xcsgry.selectedAll.push(obj);
        },
        //自定义现场施工人员选择内容
        render_xcsgry(h, { node, data }) {
            return <span>{data.name + "(" + data.count + "个)"}</span>;
        },
        // 点击选择现场施工人员子类
        onSelect_xcsgryTree(i) {
            let selecteds = this.$refs.xcsgryTree[i].getCheckedKeys();
            this.form.xcsgry.selectedAll.map((v, index) => {
                if (i == index) {
                    v.selectedAll = selecteds;
                }
                return v;
            });
        },

        //点击确定
        onConfirm(differBtn) {
            if (differBtn == "cancel") {
                this.$emit("onSubmitConfig", "cancel");
                return;
            }
            //资质保存请求
            if (
                !this.form.zz.zzyes &&
                !this.form.lsyj.lsyjyes &&
                !this.form.xmjl.xmjlyes &&
                !this.form.xcsgry.xcsgryyes &&
                !this.form.otherry.otherryyes &&
                this.waterPerson.radio === "建设厅人员"
            ) {
                this.$message({
                    type: "error",
                    message: "您还没有选择任何条件"
                });
                return;
            }
            if (this.form.zz.zzyes) {
                if (
                    !this.form.zz.display.selected_zzContentL.length > 0 &&
                    !this.form.zz.display.selected_zzContentR.length > 0
                ) {
                    this.$message.error("请选择资质");
                    return;
                } else if (
                    this.form.zz.display.selected_zzContentL.length > 0 &&
                    this.form.zz.display.selected_zzContentR.length > 0
                ) {
                    if (!this.form.zz.ajax_data.orand) {
                        this.$message.error("请选择资质之间的关系");
                        return;
                    }
                }
            }
            if (
                this.form.lsyj.lsyjyes &&
                !this.waterForm.checkWater &&
                this.form.lsyj.ajax_data.checkedList.length == 0
            ) {
                this.$message({
                    type: "error",
                    message: "业绩来源为必填项"
                });
                return;
            }

            if (differBtn == "newZb") {
                //新1.4.1配置保存条件
                let data = {
                    form: this.form,
                    waterForm: this.waterForm,
                    waterPerson: this.waterPerson
                };
                data.value_kgwg = this.value_kgwg;
                data.options_gcyt = this.options_gcyt;
                data.showOther = this.showOther;
                data.showGcyt = this.showGcyt;
                this.$emit("onSubmitConfig", data);
            } else {
                this.fullscreenLoading = true;
                this.saveData(differBtn);
            }
            // if (!this.thread_id) {
            //   this.axios.post(
            //     "/index/project/newPlan",
            //     {
            //       pid:this.pid,
            //       name: "1.4.1",
            //       thread_id: this.plan_id,
            //       jbxx_id: this.jbxx_id,
            //     },
            //     data => {
            //       this.thread_id = data.message;
            //       this.saveData(differBtn);
            //     }
            //   );
            // } else {
            //   this.saveData(differBtn);
            // }
        },
        saveYj(differBtn) {
            let self = this;
            //类似业绩传值
            if (this.form.lsyj.lsyjyes) {
                let lsyj_data = {};
                if (this.form.lsyj.ajax_data.checkedList.length > 0) {
                    //其他业绩
                    lsyj_data = {
                        condition: {
                            keys: {
                                contain: this.form.lsyj.ajax_data.YjTags
                                    ? this.form.lsyj.ajax_data.YjTags.map(
                                          v => v.name
                                      )
                                    : ""
                            },
                            xmlx: {
                                contain: [this.form.lsyj.ajax_data.xmlx]
                            },
                            gcyt: {
                                name: this.form.lsyj.ajax_data.gcyt
                            },
                            zmj: [
                                this.form.lsyj.ajax_data.xmlx == "房建工程"
                                    ? this.form.lsyj.ajax_data.zmj
                                    : ""
                            ]
                        },
                        table: this.form.lsyj.ajax_data.checkedList,
                        minMoney: this.form.lsyj.ajax_data.money,
                        number: this.form.lsyj.ajax_data.number || 0,
                        around: {
                            minTime:
                                this.form.lsyj.ajax_data.date.minTime || "",
                            maxTime:
                                this.form.lsyj.ajax_data.date.maxTime || "",
                            kg:
                                this.form.lsyj.ajax_data.kgwg.indexOf("开工") !=
                                -1
                                    ? true
                                    : false,
                            wg:
                                this.form.lsyj.ajax_data.kgwg.indexOf("完工") !=
                                -1
                                    ? true
                                    : false,
                            number: this.form.lsyj.ajax_data.number || 0
                        },
                        jbxx_id: this.jbxx_id,
                        thread_id: this.thread_id,
                        yj_id: this.yj_id,
                        display: this.form.lsyj.ajax_data
                    };
                    if (this.form.lsyj.ajax_data.gcyt && this.showGcyt) {
                        //如果有工程项目
                        let newobj = this.options_gcyt.filter(v => {
                            if (v.label == this.form.lsyj.ajax_data.gcyt) {
                                return v;
                            }
                        });
                        lsyj_data.condition.gcyt = {
                            name: newobj[0].label,
                            id: newobj[0].value
                        };
                    }
                    if (this.showOther) {
                        this.form.lsyj.ajax_data.selectOtheryq.forEach(v => {
                            lsyj_data.around[v] = 1;
                        });
                    }
                } else if (this.waterForm.checkWater) {
                    //水利业绩
                    lsyj_data = {
                        condition: {
                            keys: {
                                contain: this.waterForm.keys
                                    ? this.waterForm.keys.map(v => v.name)
                                    : ""
                            },
                            gczt: this.waterForm.gczt,
                            gcdb: this.waterForm.gcdb,
                            gcjb: this.waterForm.gcjb,
                            gcgm: this.waterForm.gcgm
                        },
                        number: this.waterForm.lsyj || 0,
                        around: {
                            number: this.waterForm.lsyj || 0,
                            // 水利
                            minKgsj: this.waterForm.minKgsj,
                            maxKgsj: this.waterForm.maxKgsj,
                            sminHtqx: this.waterForm.sminHtqx,
                            smaxHtqx: this.waterForm.smaxHtqx,
                            eminHtqx: this.waterForm.eminHtqx,
                            emaxHtqx: this.waterForm.emaxHtqx,
                            sminSjgq: this.waterForm.sminSjgq,
                            smaxSjgq: this.waterForm.smaxSjgq,
                            eminSjgq: this.waterForm.eminSjgq,
                            emaxSjgq: this.waterForm.emaxSjgq,
                            htminMoney: this.waterForm.htminMoney,
                            htmaxMoney: this.waterForm.htmaxMoney,
                            jsminMoney: this.waterForm.jsminMoney,
                            jsmaxMoney: this.waterForm.jsmaxMoney
                            // 水利
                        },
                        type: 1,
                        jbxx_id: this.jbxx_id,
                        thread_id: this.thread_id,
                        yj_id: this.yj_id,
                        displaySl: this.waterForm,
                        table: ["proj_sljg"]
                    };
                }
                this.axios.post("/index/search_yj/saveYj", lsyj_data, data => {
                    this.yj_id = data.message;
                    this.ajax_number += 1;
                    // this.onConfirmrun(differBtn);
                    this.saveZj(differBtn);
                });
            } else {
                this.axios.post(
                    "/index/search_yj/saveYj",
                    {
                        use: "no",
                        yj_id: this.yj_id,
                        jbxx_id: this.$route.query.jbxx_id,
                        thread_id: this.thread_id,
                        pid: this.parent_data.pid
                    },
                    data => {
                        this.yj_id = data.message;
                        this.ajax_number += 1;
                        // this.onConfirmrun(differBtn);
                        this.saveZj(differBtn);
                    }
                );
            }
        },
        // 保存建设厅人员
        handleSaveJstRy(differBtn) {
            //项目经理传送的值
            let user_all = [];
            let order = 0;
            //项目经理
            if (this.form.xmjl.xmjlyes) {
                this.form.xmjl.selectedAll.forEach((v, i) => {
                    order += 1;
                    if (v.jzsz) {
                        let obj2 = {
                            rylb: "项目经理",
                            num: 1,
                            dj: v.jzsz,
                            zczy: v.zy,
                            zsh: v.akz || "",
                            zcz_dj: v.zcz_dj,
                            zcz_zczy: v.zcz_zczy,
                            zcz_name: v.zcz_name,
                            order
                        };
                        user_all.push(obj2);
                    }
                });
            }
            //技术负责人
            if (this.form.jsfzr.jsfzryes) {
                this.form.jsfzr.selectedAll.forEach((v, i) => {
                    order += 1;
                    if (v.jzsz) {
                        let obj2 = {
                            rylb: "技术负责人",
                            num: 1,
                            dj: v.jzsz,
                            zczy: v.zy,
                            zsh: v.akz || "",
                            zcz_dj: v.zcz_dj,
                            zcz_zczy: v.zcz_zczy,
                            zcz_name: v.zcz_name,
                            order
                        };
                        user_all.push(obj2);
                    }
                });
            }
            //现场施工人员
            if (this.form.xcsgry.xcsgryyes) {
                this.form.xcsgry.selectedAll.forEach((v, i) => {
                    order += 1;
                    let obj2 = {
                        rylb: "现场施工人员",
                        num: v.userNumber,
                        zczy: v.selectedAll.join(","),
                        dj: v.typeName,
                        zsh: v.zsh,
                        order
                    };
                    user_all.push(obj2);
                });
            }
            // 其他主要人员
            if (this.form.otherry.otherryyes) {
                this.form.otherry.selectedAll.zjgcs.forEach((v, i) => {
                    order += 1;
                    let obj2 = {
                        rylb: "其他主要人员",
                        num: 1,
                        zczy: v.zczy ? v.zczy.join(",") : "",
                        dj: "造价工程师",
                        zsh: "",
                        order
                    };
                    v.zczy.length ? user_all.push(obj2) : "";
                });
                this.form.otherry.selectedAll.zcaqgcs.forEach((v, i) => {
                    order += 1;
                    let obj2 = {
                        rylb: "其他主要人员",
                        num: 1,
                        zczy: v.zczy ? v.zczy.join(",") : "",
                        dj: "注册安全工程师",
                        zsh: v.zsh || "",
                        order
                    };
                    v.zczy.length ? user_all.push(obj2) : "";
                });
            }

            //人员保存
            if (
                this.form.xcsgry.xcsgryyes ||
                this.form.xmjl.xmjlyes ||
                this.form.jsfzr.jsfzryes ||
                this.form.otherry.otherryyes
            ) {
                let post_data = {
                    tab: "建设厅人员",
                    xcsgry: "",
                    xmjl: ""
                };
                if (this.form.xcsgry.xcsgryyes) {
                    post_data.xcsgry = this.form.xcsgry.selectedAll;
                }
                if (this.form.xmjl.xmjlyes) {
                    post_data.xmjl = this.form.xmjl.selectedAll;
                }
                if (this.form.jsfzr.jsfzryes) {
                    post_data.jsfzr = this.form.jsfzr.selectedAll;
                }
                if (this.form.xmjl_yj.xmjlyjyes) {
                    post_data.xmjl_yj = "true";
                }
                if (this.form.otherry.otherryyes) {
                    post_data.otherry = this.form.otherry.selectedAll;
                }
                console.log(user_all, "user-all");
                this.axios.post(
                    "/index/Search_Ry/saveZj",
                    {
                        jbxx_id: this.jbxx_id,
                        thread_id: this.thread_id,
                        type: "筑标",
                        condition: user_all,
                        post_data: JSON.stringify(post_data),
                        ry_id: this.ry_id || "",
                        similar: this.form.xmjl_yj.xmjlyjyes ? 1 : 0
                    },
                    data => {
                        this.ry_id = data.message;
                        this.ajax_number += 1;
                        this.onConfirmrun(differBtn);
                    }
                );
            } else {
                this.axios.post(
                    "/index/Search_Ry/saveZj",
                    {
                        use: "no",
                        ry_id: this.ry_id || "",
                        jbxx_id: this.$route.query.jbxx_id,
                        type: "筑标",
                        thread_id: this.thread_id
                    },
                    data => {
                        this.ry_id = data.message;
                        this.ajax_number += 1;
                        this.onConfirmrun(differBtn);
                    }
                );
            }
        },
        // 保存水利人员
        handleSaveSlRy(differBtn) {
            //项目经理传送的值
            let user_all = [];
            let order = 0;
            // 水利人员
            if (this.form.slry.selectedAll.length > 0) {
                this.form.slry.selectedAll.forEach((v, i) => {
                    order += 1;
                    let obj2 = {
                        rylb: "水利人员",
                        num: 1,
                        order,
                        in_jst: v.jst ? 1 : 0,
                        zgmc: v.zgmc,
                        zczy: v.zczy,
                        zsh: v.zsh,
                        zcz_name: v.zc,
                        gwmc: v.gwmc
                    };
                    user_all.push(obj2);
                });
                let post_data = {
                    tab: "水利人员",
                    slry: this.form.slry.selectedAll
                };

                this.axios.post(
                    "/index/Search_Ry/saveZj",
                    {
                        jbxx_id: this.jbxx_id,
                        thread_id: this.thread_id,
                        type: "筑标",
                        condition: user_all,
                        post_data: JSON.stringify(post_data),
                        ry_id: this.ry_id || "",
                        similar: this.form.xmjl_yj.xmjlyjyes ? 1 : 0
                    },
                    data => {
                        this.ry_id = data.message;
                        this.ajax_number += 1;
                        this.onConfirmrun(differBtn);
                    }
                );
            } else {
                this.axios.post(
                    "/index/Search_Ry/saveZj",
                    {
                        use: "no",
                        ry_id: this.ry_id || "",
                        jbxx_id: this.$route.query.jbxx_id,
                        type: "筑标",
                        thread_id: this.thread_id
                    },
                    data => {
                        this.ry_id = data.message;
                        this.ajax_number += 1;
                        this.onConfirmrun(differBtn);
                    }
                );
            }
        },
        saveZj(differBtn) {
            if (this.waterPerson.radio === "建设厅人员") {
                this.handleSaveJstRy(differBtn);
            } else {
                this.handleSaveSlRy(differBtn);
            }
        },
        saveZz(differBtn) {
            if (this.form.zz.zzyes) {
                let zz_txt = {
                    left: [],
                    right: [],
                    orand: this.form.zz.ajax_data.orand
                };
                let zz = {
                    orand: this.form.zz.ajax_data.orand,
                    left: {},
                    right: {}
                };
                //左边资质
                let zzL = this.form.zz.display.selected_zzContentL;
                if (zzL.length > 0) {
                    zzL.forEach((v, i) => {
                        zz.left[v.label] = v.value;
                        zz_txt.left.push(v.label);
                    });
                }

                //右边资质
                let zzR = this.form.zz.display.selected_zzContentR;
                if (zzR.length > 0) {
                    zzR.forEach((v, i) => {
                        zz.right[v.label] = v.value;
                        zz_txt.right.push(v.label);
                    });
                }
                this.axios.post(
                    "/index/Aptitude/saveZz",
                    {
                        zz,
                        zz_txt,
                        zz_id: this.zz_id,
                        pid: this.parent_data.pid,
                        display: {
                            orand: this.form.zz.ajax_data.orand,
                            selected_zzContentL: this.form.zz.display
                                .selected_zzContentL,
                            selected_zzContentR: this.form.zz.display
                                .selected_zzContentR
                        },
                        jbxx_id: this.jbxx_id,
                        thread_id: this.thread_id
                    },
                    data => {
                        this.zz_id = data.message;
                        this.ajax_number += 1;
                        // this.onConfirmrun(differBtn);
                        this.saveYj(differBtn);
                    }
                );
            } else {
                this.axios.post(
                    "/index/Aptitude/saveZz",
                    {
                        use: "no",
                        zz_id: this.zz_id,
                        jbxx_id: this.$route.query.jbxx_id,
                        thread_id: this.thread_id,
                        pid: this.parent_data.pid
                    },
                    data => {
                        this.zz_id = data.message;
                        this.ajax_number += 1;
                        // this.onConfirmrun(differBtn);
                        this.saveYj(differBtn);
                    }
                );
            }
        },
        //保存
        saveData(differBtn) {
            let self = this;
            this.axios.post(
                "/index/Aptitude/clean",
                { thread_id: this.thread_id },
                data => {
                    if (data.status == "success") {
                        this.saveZz(differBtn);
                    } else {
                        this.$message.error("失败");
                    }
                }
            );
        },
        // 运行
        onConfirmrun(differBtn) {
            this.fullscreenLoading = true;
            let ajaxNum = 3;
            // alert(this.ajax_number)
            if (this.ajax_number == ajaxNum) {
                if (differBtn == "save") {
                    this.$message({
                        type: "success",
                        message: "成功"
                    });
                    this.$emit("onSubmitConfig", { thread_id: this.thread_id });
                    setTimeout(() => {
                        // window.opener.location.reload();
                        this.ajax_number = 0;
                        this.fullscreenLoading = false;
                        if (!this.visit_type) {
                            window.opener.postMessage("刷新", "*");
                            window.close();
                        }
                        // this.$router.push("/iteminfo?jbxx_id=" + this.jbxx_id);
                    }, 1000);
                    return;
                }
                this.axios.post(
                    "/index/Aptitude/searchZz",
                    { zzid: this.zz_id, thread_id: this.thread_id },
                    data => {
                        this.axios.post(
                            "/index/Search_yj/searchYj",
                            { yj_id: this.yj_id, thread_id: this.thread_id },
                            data => {
                                if (data.message == "类似项目业绩个数不足") {
                                    this.ajax_number = 0;
                                    this.$message({
                                        type: "error",
                                        message:
                                            data.message + ",请重新选择条件"
                                    });
                                    this.fullscreenLoading = false;
                                    return;
                                }
                                // this.axios.post(
                                //   "/index/Search_yj/companyAnalyze",
                                //   {
                                //     yj_id: this.yj_id,
                                //     thread_id: this.thread_id
                                //   },
                                //   data => {
                                this.axios.post(
                                    "/index/search_ry/searchRy",
                                    {
                                        id: this.ry_id,
                                        thread_id: this.thread_id,
                                        gsmc: ""
                                    },
                                    data => {
                                        this.fullscreenLoading = false;
                                        // this.$emit("changeThread", {
                                        //   type: "公司列表",
                                        //   thread_id: this.thread_id
                                        // });
                                        this.ajax_number = 0;
                                        // let href = `http://dist.520coc.cn/new_gsList.html?jbxx_id=${
                                        //   this.$route.query.jbxx_id
                                        // }&thread_id=${this.thread_id}&type_zb=筑标`;

                                        // window.open(href);

                                        this.$emit("onSubmitConfig", "close");
                                    }
                                );
                                // }
                                // );
                            }
                        );
                    }
                );
            }
        },
        //查看公司列表
        onCheck() {
            let href = `http://dist.520coc.cn/new_gsList.html?jbxx_id=${
                this.$route.query.jbxx_id
            }&thread_id=${this.thread_id}&type_zb=筑标`;
            window.open(href);
        },
        //点击方案
        onDefaultThread() {
            if (!this.defaultThread) {
                this.axios.post(
                    "/index/mine/defaultCase",
                    {
                        thread_id: this.thread_id,
                        jbxx_id: this.jbxx_id
                    },
                    data => {
                        if (data.status == "success") {
                            this.$emit("changeThread", {
                                type: "默认方案",
                                thread_id: this.thread_id
                            });
                            this.$message.success("成功");
                        }
                    }
                );
            }
        },
        onCancel() {
            this.$emit("onCancel", "zhubiao");
        },
        //点击蒙层
        onMak() {
            this.$message("请开启后更改");
        },
        // 页面右侧 点击切换建设厅人员或者水利人员
        handleChangeRyType(val) {
            this.waterPerson.radio = val;
        },
        // 页面右侧 水利人员 资格名称切换
        handleZgmcChange(val, index) {
            console.log(val, index);
            // 资格名称值改变 对应的专业和安考证下拉列表也会改变
            this.form.slry.selectedAll[index].zsh = "";
            this.form.slry.selectedAll[index].zczy = "";
            this.waterPerson.zgmc.map(item => {
                if (val === item.name) {
                    this.waterPerson.zczy = item.zczy ? item.zczy : [];
                }
            });

            this.waterPerson.zgmc.map(item => {
                if (val === item.name) {
                    this.waterPerson.zsh = item.zsh ? item.zsh : [];
                }
            });
        },
        // 添加水利人员
        handleSlPlus(txt, index) {
            let item = this.form[txt].display[index];
            if (
                // 判断是否填值
                item.jst === false &&
                !item.zgmc &&
                !item.zczy &&
                !item.zsh &&
                !item.zc &&
                !item.gwmc
            ) {
                this.$message.error("请选择条件!");
                return;
            }

            this.form[txt].selectedAll.push(this.form[txt].display[index]);

            this.form[txt].display = [
                {
                    jst: false,
                    zgmc: "", //资格名称
                    zczy: "", //专业
                    zsh: "", //安考证
                    zc: "", //职称
                    gwmc: "" //岗位名称
                }
            ];
        },
        // 删除水利人员
        handleSlMul(txt, index) {
            this.form[txt].selectedAll = this.form[txt].selectedAll.filter(
                (item, i) => {
                    if (index !== i) {
                        return item;
                    }
                }
            );
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mask {
    width: 100%;
    height: 81%;
    position: absolute;
    top: 130px;
    left: 0;
    background: black;
    opacity: 0.025;
    z-index: 999;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0;
}
.absolute-mak {
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 0;
    background-color: #ffffff;
    z-index: 9;
    opacity: 0;
}
.tiaojian-content {
    margin: 20px;
    position: relative;
}
.bt3 {
    margin-bottom: 10px;
}
.xcsgry_btn {
    min-width: 150px;
    margin: 6px;
}
.type-title {
    font-size: 18px;
    font-weight: 600;
    display: inline;
    padding-left: 20px;
}
.zz-content {
    font-size: 0;
}
.zz_tijiao {
    line-height: 1;
}
.zz_tijiao > div {
    padding: 6px 0;
}
.close_zz {
    position: absolute;
    top: 0;
    right: 0;
    border-bottom-left-radius: 100%;
    border-right: none;
    border-top: none;
}
.inline-ul {
    display: inline-block;
    cursor: pointer;
    border-right: 1px solid #e1e1e1;
    padding: 0 10px;
}
.inline-ul:first-child {
    padding-left: 0;
}
.inline-ul:last-child {
    border-right: none;
    padding-right: 0;
}
.inline-ul > li {
    line-height: 36px;
    padding: 0 20px;
    margin: 0;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    list-style: none;
}
.inline-ul > li:hover {
    background-color: #ecf5ff;
    color: #66b1ff;
}
/* 选中资质 */
.selectedClass {
    background-color: #ecf5ff;
    color: #66b1ff;
}
.popover-zz {
    padding: 0;
}
/* 标签 */
.el-tag {
    margin-right: 10px;
}
.text_ipt {
    color: #606266;
    font-size: 14px;
}
.xmjl_yj {
    margin-left: 50px;
    display: inline-block;
}
.margin_b10 {
    margin-bottom: 6px;
}

.datePicker {
    width: 134px !important;
}
.textAlign {
    text-align: center;
}
.waterTitle {
    text-align: right;
    font-size: 15px;
    padding-top: 10px;
    color: #000;
}
.waterTitle1 {
    text-align: right;
    font-size: 15px;
    color: #000;
}
.waterRight {
    padding-left: 30px;
}
</style>
