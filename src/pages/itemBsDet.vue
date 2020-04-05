<!--标书详情-->
<template>
  <div class="ItemInfo_content">
    <!-- 一级页面头部开始 -->
    <div class="content_header">
      <div class="tittle">
        {{itemInfo.gsmc}}
        <div
          style="font-size:35px;position:absolute;right:67px;color:#409eff;top:19px;cursor:pointer"
          @click="sharePage()"
        >
          <i class="el-icon-share"></i>
        </div>
        <div
          v-if="unlock"
          :style="{width:'35px',height:'35px',position:'absolute',right:'20px',top:'22px',cursor:'pointer'}"
          @click="setLock()"
        >
          <img src="../assets/lock.png" alt="???">
        </div>
        <div
          v-if="!unlock"
          :style="{width:'35px',height:'35px',position:'absolute',right:'20px',top:'22px',cursor:'pointer'}"
          @click="setLock()"
        >
          <img src="../assets/unlock.png" alt="???">
        </div>
      </div>
    </div>
    <div class="content_body">
      <div class="body_header">
        <div style="font-size:24px;margin-left:25px;margin-top:20px;">{{itemInfo.xmmc}}</div>
        <div class="evryone">
          <div class="each">
            项目业主：
            <span style="font-size:16px">{{itemInfo.xmyzdw}}</span>
          </div>
          <div class="each">
            项目地区：
            <span style="font-size:16px">{{itemInfo.xmdq}}</span>
          </div>
          <div class="each">
            项目类型：
            <span style="font-size:16px">{{itemInfo.xmlxB}}</span>
          </div>
        </div>
        <div class="evryone">
          <div class="evryone_one">项目进度：</div>
          <div class="evryone_two">
            <!--流程横排-->
            <div style="width: 100%;height:100px;">
              <ul style="height: 100px;position: relative;margin:0 auto;width:1370px;" class="liu">
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg1+')',width:'270px',left:'0',zIndex:'100'}"
                >
                  <span
                    :style="{textAlign:'center',fontSize:'14px',color:itemInfo.status == '预定'?'#ffffff':'#606266'}"
                  >{{itemInfo.status=='预定'?itemInfo.stage1:'预定'}}</span>
                </li>
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg2+')',width:'270px',left:'238px',zIndex:'99'}"
                >
                  <span
                    :style="{fontSize:'14px',color:itemInfo.status == '报名'?'#ffffff':'#606266'}"
                  >{{itemInfo.status=='报名'?itemInfo.stage2:'报名'}}</span>
                </li>
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg3+')',width:'270px',left:'475px',zIndex:'98'}"
                >
                  <span
                    :style="{fontSize: '14px',color:itemInfo.status == '标书'?'#ffffff':'#606266'}"
                  >{{itemInfo.status=='标书'?itemInfo.stage3:'标书'}}</span>
                </li>
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg4+')',width:'270px',left:'711px',zIndex:'97'}"
                >
                  <span
                    :style="{fontSize: '14px',color:itemInfo.status == '开标'?'#ffffff':'#606266'}"
                  >{{itemInfo.status=='开标'?itemInfo.stage4:'开标'}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="body_content">
        <div>
          <el-button
            type="primary"
            style="width:125px;float:right;margin-top:10px;margin-right:50px;"
            @click="liuyan.visible = true"
          >留言</el-button>
        </div>
        <!-- <div class="information">
          <div class="informatin_header">项目信息</div>
          <div>
            <div class="xmxx_class" style="width:80%;float:left">
              <div class="myrow">
                <div>资质要求</div>
                <div class="mycol_1">{{itemInfo.zzyq}}</div>
              </div>
              <div class="myrow">
                <div>人员要求</div>
                <div class="mycol_1">{{itemInfo.ryyq}}</div>
              </div>
              <div class="myrow">
                <div>业绩要求</div>
                <div class="mycol_1">{{itemInfo.yjyq}}</div>
              </div>
              <div class="myrow">
                <div>其它要求</div>
                <div class="mycol_1">{{itemInfo.qtyq}}</div>
              </div>
              <div class="myrow">
                <div>投标文件</div>
                <div class="mycol_1">
                  <el-button type="mini" style="width:80px;" @click="zbwjVisible = true">点击查看</el-button>
                </div>
              </div>
            </div>
            <div style="width:10%;float:right">
              <div style="margin-top:20px;">
                <el-button :disabled="tableIndex == 1" type="primary" @click="openWinYj()">业绩驳回记录</el-button>
              </div>
            </div>
          </div>
        </div>-->
        <div class="table" style="height:1200px;margin-top:80px;">
          <div class="table_footer">
            <el-row :gutter="20">
              <div style="position:absolute;left:3%;">
                <el-button type="primary" icon="el-icon-d-arrow-left" @click="checkTableButton()"></el-button>
              </div>
              <div style="position:absolute;right:3%;">
                <el-button type="primary" icon="el-icon-d-arrow-right" @click="checkTableButton()"></el-button>
              </div>
              <div
                :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'637px',zIndex:'9',display:tableIndex==1?'block':'none'}"
                @click="checkTable(2)"
              ></div>
              <div
                :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'0',zIndex:'9',display:tableIndex!=1?'block':'none'}"
                @click="checkTable(1)"
              ></div>
              <div :style="tableStyleL" @click="checkTable(1)">
                <el-button
                  type="primary"
                  style="width:80px;float:right;margin-top:10px;margin-right:20px;margin-left:10px;margin-bottom:20px;"
                  @click="handleAddRy"
                >添加</el-button>
                <p
                  :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==1?'center':'left',fontSize:'20px',color:'#67C23a'}"
                >项目管理机构组织</p>
                <!--左边的表-->
                <ry-list
                  :needData="needData"
                  :addSuccess="addSuccess"
                  @changePerson="changePerson"
                  @openAdd="handleAddRy"
                  :unLock="true"
                ></ry-list>
              </div>
              <div :style="tableStyleR" @click="checkTable(2)">
                <el-button
                  type="primary"
                  style="width:80px;float:right;margin-top:10px;margin-right:20px;margin-left:10px;margin-bottom:20px;"
                  @click="addYj.visible = true"
                >添加</el-button>
                <p
                  :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==2?'center':'right',fontSize:'20px',color:'#67C23a'}"
                >类似项目业绩</p>
                <!--右边的表-->
                <el-table border :data="addYjTable" v-loading="gsDataR.loading">
                  <el-table-column width="50px" label="序号" header-align="center" align="center">
                    <template slot-scope="scope">{{scope.$index+(gsDataR.page-1)*10+1}}</template>
                  </el-table-column>
                  <el-table-column prop="xmmc" label="项目名称" align="center">
                    <template slot-scope="scope">
                      <span
                        type="text"
                        style="cursor:pointer;color:#409EFF"
                        @click="openYjDet2(scope.row,2)"
                      >{{scope.row.xmmc}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额(万元)" prop="money" align="center" width="100"></el-table-column>
                  <el-table-column label="数据源" prop="source" align="center" width="300"></el-table-column>
                  <el-table-column label="操作" prop="sh" align="center" width="100">
                    <template slot-scope="scope">
                      <el-button type="danger" size="mini" @click="deleteYj(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  style="margin:20px 0"
                  ref="fenye"
                  @current-change="pageSizeChangeR"
                  align="right"
                  background
                  layout="total,prev, pager, next"
                  :total="gsDataR.total"
                ></el-pagination>
                <div style="text-align:center;margin-top: -50px;" v-if="gsDataR.page >= gsDataR.total/10">
                  <el-button
                    type="text"
                    style="font-size:45px;color:rgb(103, 194, 58)"
                    @click="addYj.visible = true"
                    class="el-icon-circle-plus"
                  ></el-button>
                </div>
              </div>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 留言窗口 -->
    <div style="background-color: #f5f7fa">
      <el-dialog
        :title="liuyan.title"
        :visible.sync="liuyan.visible"
        width="35%"
        :close-on-click-modal="false"
      >
        <leave-word :needData="leaveNeedData"></leave-word>
      </el-dialog>
    </div>
    <!-- 企业不通过原因 -->
    <el-dialog
      title="业绩驳回"
      :visible.sync="qynoPassDialogVisible"
      width="35%"
      :close-on-click-modal="false"
    >
      <div
        style="width:629px;max-height: 500px;overflow: auto;background-color: #fff;border-top: 1px solid #f3f3f3;margin-top: -20px;"
      >
        <div
          v-for="o in noPass.allData"
          :key="o.id"
          class="text item"
          style="width:600px;margin-top: 20px;background-color:#fff;margin: 40px auto;"
        >
          <div style="height: 10px;">
            <div style="width:40px;text-align: center;float: left">
              <div v-if="!o.headimgurl" style="width:30px;height:30px;">
                <i class="el-icon-service" style="font-size: 30px;"></i>
              </div>
              <div v-if="o.headimgurl" style="width:30px;height:30px;">
                <img :src="o.headimgurl" alt style="height: 30px;">
              </div>
            </div>
            <div style="width: 550px;float: right">
              <span
                style="color: rgb(63,141,213);"
              >{{ o.nickname?o.nickname:o.username }} ({{o.time}})</span>
            </div>
          </div>
          <div style="margin-left: 50px;margin-top: 20px;margin-right: 50px;">
            <p>{{ o.reason }}</p>
            <p>{{o.other}}</p>
          </div>
        </div>
      </div>
      <div style="margin:20px">
        <el-checkbox-group v-model="noPass.checkboxdata">
          <el-checkbox label="该业绩该企业无法使用或资料不全"></el-checkbox>
          <el-checkbox label="该业绩信息有误"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <el-input
          type="textarea"
          @keyup.ctrl.enter.native="noPassOk()"
          :rows="4"
          placeholder="其他驳回原因(例：该业绩无中标公示，无竣工验收)"
          v-model="noPass.other"
        ></el-input>
      </div>
      <div style="color:#cccccc;font-size:14px;">Ctrl+Enter提交</div>
      <div style="text-align:right;margin-top:10px">
        <el-button type="primary" @click="noPassOk()">提交</el-button>
      </div>
    </el-dialog>
    <!-- 驳回记录列表 -->
    <el-dialog title="业绩驳回记录" :visible.sync="noPass.Visible" width="60%">
      <el-table border :data="noPass.gslist" v-loading="noPass.loading">
        <el-table-column width="50px" label="序号" header-align="center" align="center">
          <template slot-scope="scope">{{scope.$index+(gsDataNoPass.page-1)*10+1}}</template>
        </el-table-column>
        <el-table-column prop="xmmc" label="项目名称" align="center">
          <template slot-scope="scope">
            <span
              style="cursor: pointer;color: #409eff"
              @click="openxq(scope.$index,scope.row)"
            >{{scope.row.xmmc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额(万元)" prop="money" align="center" width="100"></el-table-column>
        <el-table-column label="数据源" prop="source" align="center" width="300"></el-table-column>
        <el-table-column label="数据状态" prop="flag" align="center" width="100"></el-table-column>
        <el-table-column label="审核" prop="sh" align="center" width="100">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="auditButton(scope.$index,scope.row,'2')"
            >通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin:20px 0"
        ref="fenye"
        @current-change="pageSizeChangeNoPass"
        align="right"
        background
        layout="total,prev, pager, next"
        :total="gsDataNoPass.total"
      ></el-pagination>
    </el-dialog>
    <!--点击业绩名称弹窗-->
    <el-dialog title="详细信息" :visible.sync="xq.Visible" width="90%">
      <p style="text-align: center;width: 100%;">已通过</p>
      <div>
        <el-table border :data="xq.list1">
          <el-table-column
            type="index"
            width="50px"
            label="序号"
            header-align="center"
            align="center"
          ></el-table-column>
          <el-table-column prop="xmmc" label="项目名称" align="center">
            <template slot-scope="scope">
              <span
                style="color: #409eff;cursor:pointer"
                @click="openXqOne(scope.row.xmmc)"
              >{{scope.row.xmmc}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="jgbabh" label="竣工备案编号" align="center" width="220"></el-table-column>
          <el-table-column
            prop="jsgm"
            label="建设规模"
            align="center"
            width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="金额(万元)" prop="je" align="center" width="100"></el-table-column>
          <el-table-column label="实际开工日期" prop="sjkgrq" align="center" width="100"></el-table-column>
          <el-table-column label="实际竣工日期" prop="sjjgrq" align="center" width="100"></el-table-column>
          <el-table-column label="单位工程" prop="real_qymc" align="center"></el-table-column>
          <el-table-column label="竣工验收" align="center" width="50">
            <template slot-scope="scope">
              <i v-if="scope.row.have_bafinish == 1" class="el-icon-success" style="color: #10CF46"></i>
              <i v-if="scope.row.have_bafinish == 0" class="el-icon-error" style="color: red"></i>
            </template>
          </el-table-column>
          <el-table-column label="施工许可" align="center" width="50">
            <template slot-scope="scope">
              <i
                v-if="scope.row.have_buildlise == 1"
                class="el-icon-success"
                style="color: #10CF46"
              ></i>
              <i v-if="scope.row.have_buildlise == 0" class="el-icon-error" style="color: red"></i>
            </template>
          </el-table-column>
          <el-table-column label="合同备案" align="center" width="50">
            <template slot-scope="scope">
              <i v-if="scope.row.have_contract == 1" class="el-icon-success" style="color: #10CF46"></i>
              <i v-if="scope.row.have_contract == 0" class="el-icon-error" style="color: red"></i>
            </template>
          </el-table-column>
          <el-table-column label="施工图审查" align="center" width="50">
            <template slot-scope="scope">
              <i v-if="scope.row.have_censor == 1" class="el-icon-success" style="color: #10CF46"></i>
              <i v-if="scope.row.have_censor == 0" class="el-icon-error" style="color: red"></i>
            </template>
          </el-table-column>
          <el-table-column label="招投标" align="center" width="50">
            <template slot-scope="scope">
              <i v-if="scope.row.have_tender == 1" class="el-icon-success" style="color: #10CF46"></i>
              <i v-if="scope.row.have_tender == 0" class="el-icon-error" style="color: red"></i>
            </template>
          </el-table-column>
          <el-table-column label="标签" align="center" width="50">
            <template slot-scope="scope">
              <el-button
                v-if="xq.label == 0"
                type="text"
                icon="el-icon-star-off"
                @click="openTagIn(scope.$index,scope.row)"
              ></el-button>
              <el-button
                v-if="xq.label == 1"
                type="text"
                icon="el-icon-star-on"
                @click="openTagIn(scope.$index,scope.row)"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="审核" prop="sh" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="auditButtonIn(scope.$index,scope.row,'1')"
              >驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p style="text-align: center;width: 100%;margin-top: 20px;">未通过</p>
      <div>
        <el-table border :data="xq.list2">
          <el-table-column
            type="index"
            width="50px"
            label="序号"
            header-align="center"
            align="center"
          ></el-table-column>
          <el-table-column prop="xmmc" label="项目名称" align="center">
            <template slot-scope="scope">
              <span
                style="color: #409eff;cursor:pointer"
                @click="openXqOne(scope.row.xmmc)"
              >{{scope.row.xmmc}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="jgbabh" label="竣工备案编号" align="center" width="220"></el-table-column>
          <el-table-column
            prop="jsgm"
            label="建设规模"
            align="center"
            width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="金额(万元)" prop="je" align="center" width="100"></el-table-column>
          <el-table-column label="实际开工日期" prop="sjkgrq" align="center" width="100"></el-table-column>
          <el-table-column label="实际竣工日期" prop="sjjgrq" align="center" width="100"></el-table-column>
          <el-table-column label="单位工程" prop="real_qymc" align="center"></el-table-column>
          <el-table-column label="竣工验收" align="center" width="50">
            <template slot-scope="scope">
              <i v-if="scope.row.have_bafinish == 1" class="el-icon-success" style="color: #10CF46"></i>
              <i v-if="scope.row.have_bafinish == 0" class="el-icon-error" style="color: red"></i>
            </template>
          </el-table-column>
          <el-table-column label="施工许可" align="center" width="50">
            <template slot-scope="scope">
              <i
                v-if="scope.row.have_buildlise == 1"
                class="el-icon-success"
                style="color: #10CF46"
              ></i>
              <i v-if="scope.row.have_buildlise == 0" class="el-icon-error" style="color: red"></i>
            </template>
          </el-table-column>
          <el-table-column label="合同备案" align="center" width="50">
            <template slot-scope="scope">
              <i v-if="scope.row.have_contract == 1" class="el-icon-success" style="color: #10CF46"></i>
              <i v-if="scope.row.have_contract == 0" class="el-icon-error" style="color: red"></i>
            </template>
          </el-table-column>
          <el-table-column label="施工图审查" align="center" width="50">
            <template slot-scope="scope">
              <i v-if="scope.row.have_censor == 1" class="el-icon-success" style="color: #10CF46"></i>
              <i v-if="scope.row.have_censor == 0" class="el-icon-error" style="color: red"></i>
            </template>
          </el-table-column>
          <el-table-column label="招投标" align="center" width="50">
            <template slot-scope="scope">
              <i v-if="scope.row.have_tender == 1" class="el-icon-success" style="color: #10CF46"></i>
              <i v-if="scope.row.have_tender == 0" class="el-icon-error" style="color: red"></i>
            </template>
          </el-table-column>
          <el-table-column label="标签" align="center" width="50">
            <template slot-scope="scope">
              <el-button
                v-if="xq.label == 0"
                type="text"
                icon="el-icon-star-off"
                @click="openTagIn(scope.$index,scope.row)"
              ></el-button>
              <el-button
                v-if="xq.label == 1"
                type="text"
                icon="el-icon-star-on"
                @click="openTagIn(scope.$index,scope.row)"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="审核" prop="sh" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                @click="auditButtonIn(scope.$index,scope.row,'2')"
              >通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="xq.Visible = false">确认</el-button>
      </span>
    </el-dialog>
    <!--标签 弹窗-->
    <el-dialog title="标签" :visible.sync="dialogVisible" width="1000px">
      <div>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="6" align="middle" justify="center">
                <div class="grid-content bg-purple" style="font-size: 16px;margin-top: 5px">金额(万元)：</div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple-light">
                  <el-input v-model="je" placeholder="请输入内容" style="width:61%;"></el-input>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" v-if="tag.source == '中标公示'">
            <el-row>
              <el-col :span="6" align="middle" justify="center">
                <div class="grid-content bg-purple" style="font-size: 16px;margin-top: 5px">中标日期：</div>
              </el-col>
              <el-col :span="18">
                <div class="block">
                  <el-date-picker
                    v-model="kbrq"
                    align="right"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="kbrq"
                  ></el-date-picker>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;" v-if="tag.source != '中标公示'">
          <el-col :span="12">
            <el-row>
              <el-col :span="6" align="middle" justify="center">
                <div class="grid-content bg-purple" style="font-size: 16px;margin-top: 5px">开工日期：</div>
              </el-col>
              <el-col :span="18">
                <div class="block">
                  <el-date-picker
                    v-model="kgrq"
                    align="right"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="kgrq"
                  ></el-date-picker>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="6" align="middle" justify="center">
                <div
                  class="grid-content bg-purple"
                  value-format="yyyy-MM-dd"
                  style="font-size: 16px;margin-top: 5px"
                >竣工日期：</div>
              </el-col>
              <el-col :span="18">
                <div class="block">
                  <el-date-picker
                    v-model="wgrq"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="wgrq"
                  ></el-date-picker>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;padding: 20px 0;">
          <el-col :span="24">
            <el-row>
              <el-col :span="3" align="middle" justify="center">
                <div class="grid-content bg-purple" style="font-size: 16px;margin-top: 16px">其他：</div>
                <div style="width:300px;margin-top: 10px;">
                  <p
                    v-for="(item) in tag.checkList"
                    :key="item"
                    style="text-align: left;margin-left: 50px;"
                  >*{{item}}</p>
                  <p
                    v-for="(item,index) in tag.otherArr"
                    :key="item"
                    style="text-align: left;margin-left: 50px;width:400px;"
                  >
                    {{index+1}}:{{item}}
                    <i
                      class="el-icon-delete"
                      style="color:red;cursor: pointer"
                      @click="deleteOtherItem(index)"
                    ></i>
                  </p>
                </div>
              </el-col>
              <div style="width:100%;margin-top: 10px;">
                <el-col :span="8" style="margin-top: 10px;">
                  <el-checkbox-group v-model="tag.checkList" @change="YJtag">
                    <el-checkbox label="假业绩"></el-checkbox>
                    <el-checkbox label="该业绩该企业不能使用"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-col :span="2" align="middle" justify="right" style="margin-top: 10px;">其他：</el-col>
                <el-col :span="7">
                  <el-input v-model="tag.otherItem" placeholder="请输入内容" style="width:100%;"></el-input>
                </el-col>
                <el-col :span="3">
                  <el-button
                    type="success"
                    size="mini"
                    @click="addTagItem"
                    style="float:left;margin-top: 5px;margin-left: 20px"
                  >添加</el-button>
                </el-col>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveTag">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="handleTagDelete" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
      </span>
    </el-dialog>
    <!-- 分享弹窗 -->
    <el-dialog title="分享" :visible.sync="shareVisible" width="500px">
      <div>
        网址
        <el-input v-model="pageShare" placeholder="请输入内容"></el-input>
      </div>
      <div>
        网址密码
        <el-input v-model="pasShare" placeholder="请设置密码"></el-input>
      </div>
      <input class="textDispaly" type="text" value :style="{opacity:0}">

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="copyPagePas()">保存并复制到粘贴板</el-button>
        <el-button @click="shareVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="投标文件" :visible.sync="zbwjVisible" width="500px">
      <div>
        <upload-file :getFileList="fileData" v-on:success="success"></upload-file>
      </div>
    </el-dialog>
    <el-dialog title="添加业绩" :visible.sync="addYj.visible" width="80%">
      <div>
        <div style="margin-top:20px;">
          <el-form :inline="true" @submit.native.prevent>
            <el-form-item label="数据来源">
              <el-select
                style="width:350px"
                v-model="leftAjaxData.source"
                placeholder="选择数据来源"
                @change="searchYj('left')"
              >
                <el-option v-for="item in sourceList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目类型">
              <el-select
                style="width:350px"
                v-model="leftAjaxData.projectType"
                placeholder="选择项目类型"
                @change="searchYj('left')"
              >
                <el-option v-for="item in gsyjXmlx" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input
                style="width:350px"
                v-model="leftAjaxData.xmmc"
                placeholder="请输入项目名称"
                @keydown.enter.native="searchYj('left')"
              ></el-input>
            </el-form-item>
            <el-form-item label="资金范围">
              <el-input
                style="width:170px"
                v-model="leftAjaxData.minMoney"
                placeholder="金额"
                @keydown.enter.native="searchYj('left')"
              >
                <template slot="append">万元</template>
              </el-input>
              <span>-</span>
              <el-input
                style="width:167px"
                v-model="leftAjaxData.maxMoney"
                placeholder="金额"
                @keydown.enter.native="searchYj('left')"
              >
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="开工日期">
              <el-date-picker
                style="width:170px"
                v-model="leftAjaxData.minKgsjTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="年/月/日"
              ></el-date-picker>
              <span>-</span>
              <el-date-picker
                style="width:167px"
                v-model="leftAjaxData.maxKgsjTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="年/月/日"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="竣工日期">
              <el-date-picker
                style="width:170px"
                v-model="leftAjaxData.minJgsjTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="年/月/日"
              ></el-date-picker>
              <span>-</span>
              <el-date-picker
                style="width:167px"
                v-model="leftAjaxData.maxJgsjTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="年/月/日"
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <el-form :inline="true" @submit.native.prevent>
            <el-form-item label="中标日期">
              <el-date-picker
                style="width:170px"
                v-model="leftAjaxData.minZbgsTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="年/月/日"
              ></el-date-picker>
              <span>-</span>
              <el-date-picker
                style="width:167px"
                v-model="leftAjaxData.maxZbgsTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="年/月/日"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="从业人员">
              <el-input
                style="width:350px"
                v-model="leftAjaxData.name"
                placeholder="人员名称"
                @keydown.enter.native="searchYj('left')"
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align:center;padding:0 20px 10px 0">
            <el-button type="primary" @click="searchYj('left')">搜索</el-button>
            <el-button @click="resetYj('left')">重置</el-button>
          </div>
        </div>
        <el-table :data="leftTable" style="width: 100%" v-loading="left.visible" border>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{(leftAjaxData.page-1)*10+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column label="项目名称" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                class="primary_btn"
                @click="openYjDet2(scope.row,2)"
              >{{scope.row.proj_name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="proj_type" label="项目类型" width="120" align="center"></el-table-column>
          <el-table-column prop="remark" label="数据来源" align="center" width="120"></el-table-column>
          <el-table-column label="操作" align="center" width="150px;">
            <template slot-scope="scope">
              <el-button
                type="text"
                class="primary_btn"
                v-if="scope.row.import !=1"
                @click="comeInYj(scope.row)"
              >添加</el-button>
              <el-button type="text" class="primary_btn" v-if="scope.row.import ==1" disabled>已添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top:10px"
          align="right"
          @current-change="leftTableChangePage"
          :current-page.sync="left.fPage"
          :page-size="10"
          background
          layout="total,prev, pager, next"
          :total="left.total"
        ></el-pagination>
      </div>
    </el-dialog>
    <el-dialog title="添加人员" :visible.sync="addRy.visible" width="80%">
      <div class="search-wrapper">
        <div style="margin-bottom:20px;">
          <span
            v-for="(item,key) in ZjList"
            :key="key"
            :style="{marginLft:'5px',borderRadius: '3px',padding:'3px',cursor:'pointer',color:certificateTypeVal==item.rylb?'#fff':'#000',backgroundColor:certificateTypeVal==item.rylb?'#409EFF':'#fff'}"
            v-if="item.rylb == '全部'"
          >
            <span
              v-if="item.rylb == '全部'"
              @click="handleRequestList('',item.rylb)"
            >全部({{item.counts}}本)：</span>
          </span>
          <span
            v-for="(item,key) in ZjList"
            v-if="item.rylb != '全部'"
            :key="key"
            @click="handleRequestList('',item.rylb)"
            :style="{marginLft:'5px',borderRadius: '3px',padding:'3px',cursor:'pointer',color:certificateTypeVal==item.rylb?'#fff':'#000',backgroundColor:certificateTypeVal==item.rylb?'#409EFF':'#fff'}"
          >
            <span v-if="item.rylb != '全部'">
              {{item.rylb}}
              <span
                :style="{color:certificateTypeVal==item.rylb?'#fff':'#409EFF'}"
              >({{item.counts}}本)</span>
            </span>
          </span>
        </div>
        <el-form :inline="true" @submit.native.prevent>
          <el-form-item label="数据来源">
            <el-select @change="handleRequestList('source')" v-model="dataSourceVal" disabled>
              <el-option label="全部" value="全部"></el-option>
              <el-option
                v-for="item in dataSource"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select @change="handleRequestList('type')" v-model="certificateTypeVal">
              <el-option label="全部" value="全部"></el-option>
              <el-option
                v-for="item in certificateType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证书级别" v-if="isChange">
            <el-select @change="handleRequestList('level')" v-model="certificateLevelVal">
              <el-option label="全部" value="全部"></el-option>
              <el-option
                v-for="item in certificateLevel"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册专业">
            <el-select @change="handleRequestList('major')" v-model="registerMajorVal">
              <el-option label="全部" value="全部"></el-option>
              <el-option
                v-for="item in registerMajor"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证书级别" v-if="!isChange">
            <el-select @change="handleRequestList('level')" v-model="certificateLevelVal">
              <el-option label="全部" value="全部"></el-option>
              <el-option
                v-for="item in certificateLevel"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员名称">
            <el-input
              @keyup.enter.native="handleRequestList"
              style="width: 217px;"
              v-model="nameVal"
              placeholder="人员名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="证书编号">
            <el-input
              @keyup.enter.native="handleRequestList"
              style="width: 217px;"
              v-model="numberVal"
              placeholder="证书编号"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item>
                        <el-button @click="handleRequestList" type="primary">搜索</el-button>
                        <el-button @click="handleResetBtn">重置</el-button>
          </el-form-item>-->
        </el-form>
        <div style="text-align:center;padding:0 20px 10px 0">
          <el-button @click="handleRequestList" type="primary">搜索</el-button>
          <el-button @click="handleResetBtn">重置</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        v-loading="addRy.loading"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column align="center" prop="sort" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="120px">
          <template slot-scope="scope">
            <div
              @click="handleClickName(scope.row)"
              style="color: #409eff;cursor:pointer;"
            >{{scope.row.name}}{{scope.row.total}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="certificate_type" label="证件类型"></el-table-column>
        <el-table-column align="center" prop="certificate_number" label="证书编号"></el-table-column>
        <el-table-column align="center" prop="major" label="注册专业/专业/职称"></el-table-column>
        <el-table-column align="center" prop="certificate_level" label="证书级别/等级/岗位"></el-table-column>
        <el-table-column align="center" prop="valid_date" label="有效期" width="120px">
          <template slot-scope="scope">
            <span :style="{color:scope.row.expire!=1?'red':'#000'}">{{scope.row.valid_date}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="is_build" label="提醒" width="120px">
          <template slot-scope="scope">
            <span
              @click="handleZjYj(scope.row)"
              style="color: #409eff;cursor:pointer;"
            >{{scope.row.is_build}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="职务" width="160px" v-if="addRy.status == 1">
          <template slot-scope="scope">
            <el-select
              v-model="addRy.zw[scope.$index]"
              placeholder="请选择"
              @change="selectZw(scope.row,scope.$index)"
            >
              <el-option label="项目经理" value="项目经理"></el-option>
              <el-option label="技术负责人" value="技术负责人"></el-option>
              <el-option label="其他主要人员" value="其他主要人员"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="is_build" label="操作" width="120px">
          <template slot-scope="scope">
            <div
              v-if="addRy.status == 1 && scope.row.is_select == 0 "
              style="color: #409eff;cursor:pointer;"
              @click="handleClickTip(scope.row,scope.$index,'add')"
            >添加</div>
            <div v-if="scope.row.is_select == 1" style="color: #999;">已添加</div>
            <div
              v-if="addRy.status == 2 && scope.row.is_select == 0"
              style="color: #409eff;cursor:pointer;"
              @click="handleClickTip(scope.row,scope.$index,'change')"
            >换人</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleChangePage"
        :total="addRy.total"
        :current-page.sync="addRy.nowPage"
        align="right"
        style="margin-top:10px"
        background
        layout="total,prev, pager, next"
      ></el-pagination>
    </el-dialog>
    <!-- 在建业绩列表弹窗 -->
    <el-dialog :title="zjYjList.dialogTitle" :visible.sync="zjYjList.visible" width="60%">
      <el-table
        :data="zjYjList.tableData"
        v-loading="zjYjList.loading"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="xmmc" label="项目名称">
          <template slot-scope="scope">
            <span
              style="cursor: pointer;color: #409eff"
              @click="openYjDet(scope.row)"
            >{{scope.row.xmmc}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="qymc" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="xm" label="姓名">
          <template slot-scope="scope">
            <span
              style="color: #409eff;cursor:pointer"
              @click="openXqRy(scope.row)"
            >{{scope.row.xm}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="drjs" label="担任角色"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import ItemImport from "./ItemImport.vue";
import leaveWord from "./template/leaveWord.vue";
import EnterpriseNamePopover from "./sonPage/EnterpriseNamePopover.vue";
import Updata from "./../updata";
// 组件
import iteminfoPeole from "./sonPage/ItemInfoPeole";
import ryList from "./sonPage/ryListBs";
import uploadFile from "./template/UploadFile";

//引入图片
import l1u from "../assets/l1u.png";
import l1d from "../assets/l2d.png";
import l2u from "../assets/l1u.png";
import l2d from "../assets/l2d.png";
import l5u from "../assets/l5u.png";
import l5d from "../assets/l5d.png";

export default {
  components: {
    iteminfoPeole,
    ItemImport,
    leaveWord,
    EnterpriseNamePopover,
    ryList,
    uploadFile
  },
  name: "ItemInfo",
  data() {
    return {
      ZjList: [],
      addSuccess: 0,
      zwList: [],
      dataSource: [], // 数据来源
      dataSourceVal: "四川省建设厅",
      certificateType: [], // 证件类型
      certificateTypeVal: "全部",
      registerMajor: [], // 注册专业
      registerMajorVal: "全部",
      certificateLevel: [], // 证书级别
      certificateLevelVal: "全部",
      nameVal: "", // 人员名称
      numberVal: "", // 证书编号
      isChange: false, // 专业和证书级别是否调换位置
      addDate: "",
      startTime: "", // 有效期 开始
      endTime: "", // 有效期 结束
      loading: false,
      source: "", // 来源
      certList: [],
      typeName: "", // 点击提醒字段 弹出弹窗标题
      staff_id: "",
      staff_base_id: "",
      staff_base_id2: "",
      gsyjXmlx: [
        "全部",
        "建筑工程",
        "市政工程",
        "水利工程",
        "公路工程",
        "其他工程"
      ],
      sourceList: [
        "全部",
        "全国建筑市场",
        "四川省建设厅",
        "全国公路市场",
        "全国水利市场",
        "中标公示",
        "投标使用"
      ],
      leftAjaxData: {
        gs_id: this.$route.query.gs_id,
        xmmc: "",
        name: "",
        minMoney: "",
        maxMoney: "",
        minZbgsTime: "",
        maxZbgsTime: "",
        minKgsjTime: "",
        maxKgsjTime: "",
        minJgsjTime: "",
        maxJgsjTime: "",
        projectType: "",
        source: "",
        page: 1,
        cate: 1,
        rows: 10
      },
      left: {
        visible: false,
        page: 1,
        row: 10,
        total: 0,
        fPage: 1
      },
      //添加业绩 业绩列表
      addYjTable: [],
      //留言需要的数据
      leaveNeedData: {
        gs_id: this.$route.query.gs_id,
        cate: "标书"
      },
      //切换表格
      tableIndex: 1,
      tableStyleL:
        "box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(10%) scale(1);position:absolute;width:80%;z-index:10;height:1000px;overflow:auto;",
      tableStyleR:
        "box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);position:absolute;width:80%;z-index:8;height:1000px;",
      //流程用图
      button_radio: {
        l1: l1u,
        l2: l2u,
        l3: l2u,
        l4: l2u,
        l5: l5u,
        l6: l1d,
        l7: l2d,
        l8: l5d
      },
      li: {
        bg1: "",
        bg2: "",
        bg3: "",
        bg4: ""
      },
      itemInfo: [],
      gsDataL: {
        gslist: [],
        loading: "",
        page: 1
      },
      gsDataR: {
        gslist: [],
        loading: "",
        page: 1
      },
      liuyan: {
        visible: false,
        title: "留言",
        tableData: "",
        record: ""
      },
      tableData: [],
      rylist_visible: false,
      childrenType: "", //增删改查的状态
      childrenNowRow: "", //当前选中行
      ry_id: this.$route.query.ry_id,
      gs_id: this.$route.query.gs_id,
      needData: {
        ry_id: this.$route.query.ry_id,
        yj_id: this.$route.query.yj_id,
        jbxx_id: this.$route.query.jbxx_id,
        gs_id: this.$route.query.jbxx_id
      },
      gsmc: this.$route.query.gsmc,
      msdata: [],
      msloading: false,
      qynoPassDialogVisible: false,
      noPass: {
        checkboxdata: [],
        gslist: [],
        Visible: false,
        other: "",
        proj_id: "",
        jgbabh: "",
        allData: [],
        loading: false
      },
      noPassCompVisible: false,
      gsDataNoPass: {
        total: 0,
        page: 1
      },
      //点击项目名称出现的详情弹框
      xq: {
        list1: [],
        list2: [],
        type: "",
        Visible: false,
        label: "",
        source: "",
        id: "",
        listCount1: "",
        listCount2: "",
        proj_id: ""
      },
      dialogVisible: false,
      //标签内值
      je: "",
      kbrq: "",
      kgrq: "",
      other: "",
      wgrq: "",
      //点击标签页出现的标签详情
      tag: {
        source: "",
        proj_id: "",
        jgbabh: "",
        model: "",
        checkList: [],
        other: "",
        otherItem: "",
        otherArr: [],
        checkListOther: false,
        //最终传数据时使用的变量
        fake: "",
        company: "",
        id: ""
      },
      a: "",
      lock: false,
      pageShare: "",
      pasShare: "",
      shareVisible: false,
      unlock: true,
      fileData: "",
      zbwjVisible: false,
      //添加业绩相关参数
      addYj: {
        page: 1,
        rows: 10,
        nowPage: 1,
        total: 0,
        visible: false
      },
      //添加人员相关参数
      addRy: {
        page: 1,
        rows: 10,
        nowPage: 1,
        total: 0,
        visible: false,
        loading: false,
        zw: [],
        status: 0,
        id: ""
      },
      zjYjList: {
        page: 1,
        rows: 10,
        nowPage: 1,
        total: 0,
        visible: false,
        loading: false,
        tableData: [],
        dialogTitle: ""
      },
      leftTable: []
    };
  },
  created() {
    const self_ = this;
    window.addEventListener(
      "message",
      function(event) {
        //父接受
        if (event.data == "刷新") {
          self_.getItemInfo();
        }
      },
      false
    );
    if (this.dataSourceVal === "全部") {
      // 为全部时 后面的选项都置空
      this.certificateTypeVal = "全部";
      this.registerMajorVal = "全部";
      this.certificateLevelVal = "全部";
      // 查询 人员列表
      this.loading = true;
      this.handlePeopleListNew();
    } else {
      if (this.certificateTypeVal === "全部") {
        this.registerMajorVal = "全部";
        this.certificateLevelVal = "全部";
        // 查询 类型、等级、专业list
        this.handleCertList();
      } else {
        // 查询 类型、等级、专业list
        if (
          this.dataSourceVal === "四川省建设厅" &&
          this.certificateTypeVal === "造价人员"
        ) {
          this.isChange = true;
        }
        this.handleCertList();
      }
    }
    this.handleSourceList();
    this.getLockOk();
    this.getItemInfo();
    this.getListDataR();
    this.getNoPassYj();
    this.getTbwj();
    this.getAddYjTableData();
    this.getLeftProjectList();
    this.handleCertList();
    this.handlePeopleListNew();
    this.getZjList();
  },
  computed: {
    iconclass() {
      var a = this.itemInfo;
      if (a.zz_id || a.ry_id || a.yj_id) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    handleZjYj(row) {
      this.zjYjList.visible = true;
      this.zjYjList.ajaxData = {
        gs_id: this.$route.query.gs_id,
        staff_id: row.staff_id,
        page: this.zjYjList.page,
        row: 10
      };
      this.staff_base_id2 = row.staff_base_id;
      this.zjYjList.dialogTitle = row.is_build + "业绩列表";
      this.getZjYjListData();
    },
    getZjYjListData() {
      this.axios.post(
        "/firm/people/peopleBuild",
        this.zjYjList.ajaxData,
        data => {
          this.zjYjList.tableData = data.rows;
          this.zjYjList.total = data.total;
        }
      );
    },
    getZjList() {
      this.axios.post(
        "/index/laipi_Ry_Yj/peopleCate",
        {
          gs_id: this.$route.query.gs_id
        },
        data => {
          this.ZjList = data.rows;
        }
      );
    },
    getAddYjTableData() {
      this.axios.post(
        "/index/Laipi_ry_yj/projectList",
        {
          page: this.gsDataR.page,
          gs_id: this.$route.query.gs_id,
          jbxx_id: this.$route.query.jbxx_id,
          rows: 10
        },
        data => {
          this.addYjTable = data.rows || [];
          this.gsDataR.total = data.total;
        }
      );
    },
    //标签页的复选框发生变化时调用函数
    YJtag() {
      this.toJsonData();
    },
    // 查询数据来源list
    handleSourceList() {
      this.axios.post(
        "/firm/people/searchSource",
        { gs_id: this.gs_id },
        data => {
          if (data.status === "success") {
            this.dataSource = data.rows.map((item, index) => {
              return {
                value: item,
                label: item
              };
            });
          } else {
            // this.$message.error(data.message);
          }
        }
      );
    },
    getXqData() {
      this.axios.post(
        "/index/search_yj/secondYj",
        {
          proj_id: this.xq.proj_id,
          jgbabh: this.xq.jgbabh,
          yj_id: this.$route.query.yj_id,
          tableName: this.xq.model,
          row: 10,
          page: 1,
          order: "asc",
          gs_id: this.$route.query.gs_id,
          type: 1
          //tableName:'proj_jzsc',
          //source:'全国建筑市场',
        },
        data => {
          if (data.status == "success") {
            this.xq.list1 = data.rows;
            this.xq.listCount1 = data.total;
          } else {
            this.xq.list1 = [];
            this.xq.listCount1 = 0;
          }
        }
      );
    },
    //添加其他原因函数
    addTagItem() {
      if (this.tag.otherItem == "") {
        this.$message.error("内容不能为空");
      } else {
        this.tag.otherArr.push(this.tag.otherItem);
        this.tag.otherItem = "";
      }
    },
    handleTagDelete() {
      this.deleteTagDialogVisible = true;
    },
    //左表翻页
    leftTableChangePage(val) {
      this.leftAjaxData.page = val;
      this.getLeftProjectList();
    },
    //添加业绩接口
    comeInYj(row) {
      this.axios.post(
        "/index/Laipi_ry_yj/addPro",
        {
          id: row.id,
          gs_id: this.$route.query.gs_id,
          jbxx_id: this.$route.query.jbxx_id
        },
        data => {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.getLeftProjectList();
          this.getAddYjTableData();
          this.addYj.visible = false;
        }
      );
    },

    resetYj(type) {
      this.left.fPage = 1;
      if (type == "left") {
        this.leftAjaxData = {
          gs_id: this.$route.query.gs_id,
          xmmc: "",
          name: "",
          minMoney: "",
          maxMoney: "",
          minZbgsTime: "",
          maxZbgsTime: "",
          minKgsjTime: "",
          maxKgsjTime: "",
          minJgsjTime: "",
          maxJgsjTime: "",
          projectType: "",
          cate: 1,
          page: 1,
          rows: 10
        };
        this.getLeftProjectList();
      }
    },
    // 请求证件管理 人员列表
    handlePeopleListNew() {
      this.addRy.loading = true;
      this.axios.post(
        "/firm/people/peopleListNew",
        {
          jbxx_id: this.$route.query.jbxx_id,
          gs_id: this.gs_id,
          name: this.nameVal,
          number: this.numberVal,
          source: this.dataSourceVal === "全部" ? "" : this.dataSourceVal,
          type:
            this.certificateTypeVal === "全部" ? "" : this.certificateTypeVal,
          major: this.registerMajorVal === "全部" ? "" : this.registerMajorVal,
          level:
            this.certificateLevelVal === "全部" ? "" : this.certificateLevelVal,
          page: this.addRy.page,
          rows: this.pageSize
        },
        data => {
          if (data.status === "success") {
            this.tableData = data.rows.map((item, index) => {
              return {
                sort: (this.addRy.page - 1) * 10 + index + 1,
                ...item
              };
            });
            this.addRy.total = data.total;
          } else {
            // this.$message.error(data.message);
            this.tableData = [];
            this.addRy.total = 0;
          }
          this.addRy.loading = false;
          this.loading = false;
        }
      );
    },
    //保存标签的接口
    saveTag() {
      var data = {
        proj_id: this.tag.proj_id,
        fake: this.tag.fake,
        is: this.tag.company,
        je: this.je,
        other: this.tag.otherArr.join("|"),
        source: this.tag.source,
        id: this.tag.id,
        company: this.$route.query.gs_id
      };
      if (
        this.tag.source == "全国建筑市场" ||
        this.tag.source == "四川建设厅"
      ) {
        data.kgrq = this.kgrq;
        data.wgrq = this.wgrq;
        data.jgbabh = this.tag.jgbabh;
      } else {
        data.kbrq = this.kbrq;
      }
      this.axios.post("/index/search_yj/saveLabel", data, data => {
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.dialogVisible = false;
        this.getListDataL();
        this.getListDataR();
      });
    },

    //在内格打开标签
    openTagIn(index, row) {
      this.dialogVisible = true;
      this.tag.jgbabh = row.jgbabh;
      this.tag.proj_id = row.proj_id;
      this.tag.model = row.model;
      this.getDataOpenTag();
    },
    //请求标签接口
    getDataOpenTag() {
      alert("标签功能正在开发中");
      this.dialogVisible = false;
      return;
      this.tag.otherItem = "";
      this.tag.checkListOther = [];
      this.tag.checkListOther = false;
      this.tag.otherArr = [];
      var data = {};
      if (this.tag.jgbabh != "") {
        data = {
          gs_id: this.$route.query.gs_id,
          proj_id: this.tag.proj_id,
          jgbabh: this.tag.jgbabh,
          model: this.tag.model
        };
      } else {
        data = {
          gs_id: this.$route.query.gs_id,
          proj_id: this.tag.proj_id,
          model: this.tag.model
        };
      }
      this.axios.post("/index/search_yj/checkLabel", data, data => {
        if (this.tag.source == "中标公示") {
          this.je = data.je;
          this.kbrq = data.kbrq;
        } else {
          this.je = data.je;
          this.kgrq = data.kgrq;
          this.wgrq = data.wgrq;
        }
        this.tag.id = data.id;
        this.tag.fake = data.fake;
        this.tag.company = data.company;
        this.tag.checkList = this.TagtoArr(data.fake, data.company);
        this.tag.other = data.other;
        this.tag.otherArr = this.otherToArr(data.other);
        this.otherToArr(data.other);
      });
    },
    //打开添加人员窗口
    handleAddRy() {
      this.addRy.page = 1;
      this.addRy.status = 1;
      this.addRy.visible = true;
      this.addRy.nowPage = 1;
      this.handlePeopleListNew();
    },
    //请求企业不通过原因的列表
    getCheckReason() {
      //驳回请求列表
      this.axios.post(
        "/index/search_yj/checkReason",
        {
          jgbabh: this.noPass.jgbabh,
          proj_id: this.noPass.proj_id
        },
        data => {
          if (data.status == "success") {
            this.noPass.allData = data.rows;
            this.noPass.checkboxdata = data.rows[0].reason.split(",");
            this.noPass.other = data.rows[0].other;
          } else {
          }
          //显示企业不通过原因的窗口
          this.qynoPassDialogVisible = true;
        }
      );
    },
    success(res) {
      this.zbwjVisible = false;
    },
    //左表改变分页
    pageSizeChange(val) {
      this.gsDataL.page = val;
      this.getRylist();
    },
    //右表分页
    pageSizeChangeR(val) {
      this.gsDataR.page = val;
      this.getAddYjTableData();

    },
    //发送留言
    seedMessage() {},
    //按钮无限切换
    checkTableButton() {
      if (this.tableIndex == 2) {
        this.checkTable(1);
      } else {
        this.checkTable(2);
      }
    },
    searchYj(type) {
      this.left.fPage = 1;
      this.leftAjaxData.page = 1;
      if (type == "left") {
        this.getLeftProjectList();
      } else if ("right") {
        this.getRightProjectList();
      }
    },
    //请求左边列表接口
    getLeftProjectList() {
      this.left.visible = true;
      this.axios.post(
        "/firm/performance/projectLists",
        this.leftAjaxData,
        data => {
          if (data.status == "success") {
            this.leftTable = data.rows || [];
          } else {
            this.leftTable = [];
          }
          this.left.total = data.total || 0;
          this.left.visible = false;
        }
      );
    },
    //切换表格
    checkTable(type) {
      if (type == 2) {
        this.tableIndex = 2;
        this.tableStyleL =
          "box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(-10%) scale(0.8);position:absolute;width:80%;z-index:8;transition: .3s;height:1100px;overflow:auto;";
        this.tableStyleR =
          "box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(10%) scale(1);position:absolute;width:80%;z-index:10;height:810px;transition: .3s;";
      } else {
        this.tableIndex = 1;
        this.tableStyleL =
          "box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(10%) scale(1);position:absolute;width:80%;z-index:10;transition: .3s;height:1100px;overflow:auto;";
        this.tableStyleR =
          "box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);position:absolute;width:80%;z-index:8;height:810px;transition: .3s;";
      }
    },
    //渲染进度横条
    jindu() {
      this.li.bg1 =
        this.itemInfo.status == "预定"
          ? this.button_radio.l1
          : this.button_radio.l6;
      this.li.bg2 =
        this.itemInfo.status == "报名"
          ? this.button_radio.l2
          : this.button_radio.l7;
      this.li.bg3 =
        this.itemInfo.status == "标书"
          ? this.button_radio.l3
          : this.button_radio.l7;
      this.li.bg4 =
        this.itemInfo.status == "开标"
          ? this.button_radio.l4
          : this.button_radio.l8;
    },
    //子组件点了换人按钮
    changePerson(id) {
      this.addRy.nowPage = 1;
      this.addRy.status = 2;
      this.addRy.id = id;
      this.addRy.page = 1;
      this.handlePeopleListNew();
      this.addRy.visible = true;
    },
    // 获取项目基本信息
    getItemInfo() {
      this.axios.post(
        //项目基本信息
        "/index/project/re_detail",
        {
          jbxx_id: this.$route.query.jbxx_id,
          user_id: this.$store.state.userInfo.user_id,
          gs_id: this.$route.query.gs_id
        },
        data => {
          this.itemInfo = data.rows;
          this.jindu();
          document.title = "标书:" + this.itemInfo.gsmc;
          if (data.rows.locked == 1) {
            this.lock = true;
          } else {
            this.lock = false;
          }
        }
      );
    },
    //请求投标文件
    getTbwj() {
      this.axios.post(
        //项目基本信息
        "/index/Human_Review/tbwj",
        {
          jbxx_id: this.$route.query.jbxx_id,
          gs_id: this.$route.query.gs_id
        },
        data => {
          this.fileData = data.tbwj;
        }
      );
    },
    //打开招标文件
    openZbwj() {
      this.fileData = this.itemInfo.tbwj;
      this.zbwjVisible = true;
    },
    // //取业绩数据
    getListDataR() {
      //   this.gsDataR.loading = true;
      //   this.axios.post(
      //     "/index/search_yj/companyToYj",
      //     {
      //       gs_id: this.$route.query.gs_id,
      //       yj_id: this.$route.query.yj_id,
      //       type: 1,
      //       rows: this.count,
      //       page: this.gsDataR.page,
      //       order: "asc",
      //       flag: this.$route.query.flag,
      //       jbxx_id: this.$route.query.jbxx_id
      //     },
      //     data => {
      //       this.gsDataR.loading = false;
      //       if (data.status == "success") {
      //         this.gsDataR.gslist = data.rows;
      //         this.gsDataR.total = data.total;
      //         this.noPass.total_yj = data.total_yj;
      //       } else {
      //         this.gsDataR.gslist = [];
      //         this.gsDataR.total = 0;
      //       }
      //     }
      //   );
    },
    //点击查看未通过的业绩
    openWinYj() {
      this.noPass.Visible = true;
      this.getNoPassYj();
    },
    //取未通过业绩数据
    getNoPassYj() {
      // this.noPass.loading = true;
      // this.axios.post(
      //   "/index/search_yj/companyToYj",
      //   {
      //     gs_id: this.$route.query.gs_id,
      //     yj_id: this.$route.query.yj_id,
      //     type: 2,
      //     rows: 10,
      //     page: this.gsDataNoPass.page,
      //     order: "asc",
      //     flag: this.$route.query.flag,
      //     jbxx_id: this.$route.query.jbxx_id
      //   },
      //   data => {
      //     this.noPass.loading = false;
      //     if (data.status == "success") {
      //       this.noPass.gslist = data.rows;
      //       this.gsDataNoPass.total = data.total;
      //       this.noPass.total_yj = data.total_yj;
      //     } else {
      //       this.noPass.gslist = [];
      //       this.gsDataNoPass.total = 0;
      //     }
      //   }
      // );
    },
    pageSizeChangeNoPass(val) {
      this.gsDataNoPass.page = val;
      this.getNoPassYj();
    },
    selectZw(row, index) {},
    // 点击表格行 提醒字段
    handleClickTip(row, index, type) {
      var ajaxData = {
        jbxx_id: this.$route.query.jbxx_id,
        gs_id: this.$route.query.gs_id,
        name: row.name,
        staff_id: row.staff_id,
        staff_base_id: row.staff_base_id,
        zczy: row.major,
        zjlx: row.certificate_type,
        zczsh: row.certificate_number,
        dj: row.certificate_level,
        zsyxq: row.valid_date
      };
      if (type == "change") {
        ajaxData.id = this.addRy.id;
      } else {
        if (!this.addRy.zw[index]) {
          this.$message({
            type: "error",
            message: "职位不能为空"
          });
          return;
        }
        ajaxData.zw = this.addRy.zw[index];
      }
      //驳回请求列表
      this.axios.post(
        "/index/Laipi_Ry_Yj/companySavePerson",
        ajaxData,
        data => {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.addRy.zw = [];
          this.addRy.visible = false;
          this.addSuccess = this.addSuccess + 1;
        }
      );
    },
    //请求企业不通过原因的列表
    getCheckReason() {
      //驳回请求列表
      this.axios.post(
        "/index/search_yj/checkReason",
        {
          jgbabh: this.noPass.jgbabh,
          proj_id: this.noPass.proj_id
        },
        data => {
          if (data.status == "success") {
            this.noPass.allData = data.rows;
            this.noPass.checkboxdata = data.rows[0].reason.split(",");
            this.noPass.other = data.rows[0].other;
          } else {
          }
          //显示企业不通过原因的窗口
          this.qynoPassDialogVisible = true;
        }
      );
    },
    // 点击表格行 人员名称字段
    handleClickName(row) {
      // 跳转页面
      let { href } = this.$router.resolve({
        path: `/ryDet?gs_id=${this.gs_id}&name=${row.name}&staff_base_id=${
          row.staff_base_id
        }`
      });
      window.open(href, "人员详情" + this.gs_id + row.name);
    },
    //在企业不通过原因的窗口点击提交
    noPassOk() {
      if (this.noPass.checkboxdata.length == 0 && this.noPass.other == "") {
        this.$message.error("提交的内容不能为空");
        return;
      }
      this.axios.post(
        "/index/search_yj/addReason",
        {
          user_id: this.$store.state.userInfo.user_id,
          proj_id: this.noPass.proj_id,
          jgbabh: this.noPass.jgbabh,
          reason: this.noPass.checkboxdata.join(","),
          other: this.noPass.other
        },
        data => {
          this.getAuditing();
          this.qynoPassDialogVisible = false;
          this.getListDataR();
          this.getListDataL();
          window.opener.postMessage("刷新", "*");
        }
      );
    },
    //主表审核按钮
    auditButton(index, row, type) {
      this.noPass.allData = [];
      this.noPass.other = "";
      this.noPass.checkboxdata = [];
      this.noPass.jgbabh = row.jgbabh;
      this.noPass.proj_id = row.id;
      this.datas = {
        gs_id: this.$route.query.gs_id,
        yj_id: this.noPass.total_yj,
        xm_id: row.id,
        type: type
      };
      //0为驳回 打开企业不通过原因的窗口   1为通过
      if (type == "1") {
        this.getCheckReason();
      } else if (type == "2") {
        this.getAuditing();
      }
    },
    //业绩详情页的审核按钮
    auditButtonIn(index, row, type) {
      //通过按钮
      if (type == "2") {
        //如果只有一个标段，那么标段的通过就是整个业绩的通过
        if (this.xq.listCount2 == 1) {
          this.datas = {
            gs_id: this.$route.query.gs_id,
            yj_id: this.noPass.total_yj,
            xm_id: this.id,
            type: type
          };
          this.datasDel = {
            gs_id: this.$route.query.gs_id,
            yj_id: this.xq.yj_id,
            xm_id: row.id,
            type: type,
            bidSection: row.id,
            jbxx_id: this.$route.query.jbxx_id,
            proj_id: row.proj_id,
            jgbabh: row.jgbabh,
            source: this.xq.model
          };
        } else {
          //如果有多个标段，那么就是对该标段的修改
          this.datas = {
            gs_id: this.$route.query.gs_id,
            yj_id: this.xq.yj_id,
            xm_id: row.id,
            type: type,
            bidSection: row.id,
            jbxx_id: this.$route.query.jbxx_id,
            proj_id: row.proj_id,
            jgbabh: row.jgbabh,
            source: this.xq.model
          };
        }
      } else if (type == "1") {
        if (this.xq.listCount1 == 1) {
          this.datas = {
            gs_id: this.$route.query.gs_id,
            yj_id: this.noPass.total_yj,
            xm_id: this.id,
            type: type
          };
          this.datasDel = {
            gs_id: this.$route.query.gs_id,
            yj_id: this.xq.yj_id,
            xm_id: this.id,
            type: type,
            bidSection: row.id,
            jbxx_id: this.$route.query.jbxx_id,
            proj_id: row.proj_id,
            jgbabh: row.jgbabh,
            source: this.xq.model
          };
        } else {
          this.datas = {
            gs_id: this.$route.query.gs_id,
            yj_id: this.xq.yj_id,
            xm_id: this.id,
            type: type,
            bidSection: row.id,
            jbxx_id: this.$route.query.jbxx_id,
            proj_id: row.proj_id,
            jgbabh: row.jgbabh,
            source: this.xq.model
          };
        }
      }
      this.getAuditing();
    },
    //请求审核接口
    getAuditing() {
      this.axios.post("/index/search_yj/yjAuditing", this.datas, data => {
        this.getNoPassYj();
        this.getListDataR();
        this.qynoPassDialogVisible = false;
        this.getXqData();
        window.opener.postMessage("刷新", "*");
        if (this.datas.type == "1" && this.xq.listCount1 == 1) {
          this.datas = this.datasDel;
          this.getAuditing();
          this.xq.listCount1 = 0;
          this.xq.Visible = false;
        }
        if (this.datas.type == "2" && this.xq.listCount2 == 1) {
          this.datas = this.datasDel;
          this.getAuditing();
          this.xq.listCount2 = 0;
          this.xq.Visible = false;
        }
      });
    },
    deleteYj(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.post(
            "/index/Laipi_ry_yj/delPro",
            {
              id: row.id
            },
            data => {}
          );
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getAddYjTableData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 请求页面头部搜索条件列表 类型、专业、级别
    handleCertList() {
      this.axios.post(
        "/firm/people/certList",
        {
          source: this.dataSourceVal === "全部" ? "" : this.dataSourceVal,
          gs_id: this.gs_id
        },
        data => {
          if (data.status === "success") {
            this.certList = data.rows;
            // 证件类型
            let certificateType = [];
            data.rows.map((item, index) => {
              if (item !== "") {
                certificateType.push({
                  value: item.name,
                  label: item.name
                });
              }
            });
            this.certificateType = certificateType;

            // 根据证件类型 动态改变注册专业、证书级别选择类表
            this.handleChangeSelectList();
          } else {
            this.$message.error(data.message);
            // this.handleChangeSelectList();
            this.loading = false;
            this.tableData = [];
            this.total = 0;
          }
        }
      );
    },
    //打开业绩详情窗口
    openYjDet(row, type) {
      var source = "";
      if (row.source == "jzsc") {
        source = "jzsc";
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
        });
        window.open(href, "业绩详情" + row.id);
      } else if (row.source == "jst") {
        source = "jst";
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
        });
        window.open(href, "业绩详情" + row.id);
      } else if (row.source == "gl") {
        source = "gl";
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
        });
        window.open(href, "业绩详情" + row.proj_name + row.proj_id + source);
      } else if (row.source == "sl") {
        source = "sl";
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
        });
        window.open(href, "业绩详情" + row.proj_name + row.proj_id + source);
      } else {
        // 跳转路由
        let { href } = this.$router.resolve({
          path: `/enterpriseDetails?zbxx_id=${row.zbxx_id}&zbgs_id=${
            row.proj_id
          }&xmmc=${row.proj_name}&type=zbgs&source=${row.source}`
        });
        window.open(
          href,
          "中标公示" + row.proj_id + row.zbxx_id + row.proj_name
        );
      }
    },
    //打开业绩详情窗口
    openYjDet2(row, type) {
      var source = "";
      if (row.source == "全国建筑市场") {
        source = "jzsc";
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
        });
        window.open(href, "业绩详情" + row.id);
      } else if (row.source == "四川省建设厅") {
        source = "jst";
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
        });
        window.open(href, "业绩详情" + row.id);
      } else if (row.source == "全国公路市场") {
        source = "gl";
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
        });
        window.open(href, "业绩详情" + row.proj_name + row.proj_id + source);
      } else if (row.source == "全国水利市场") {
        source = "sl";
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
        });
        window.open(href, "业绩详情" + row.proj_name + row.proj_id + source);
      } else {
        // 跳转路由
        let { href } = this.$router.resolve({
          path: `/enterpriseDetails?zbxx_id=${row.zbxx_id}&zbgs_id=${
            row.proj_id
          }&xmmc=${row.proj_name}&type=zbgs&source=${row.source}`
        });
        window.open(
          href,
          "中标公示" + row.proj_id + row.zbxx_id + row.proj_name
        );
      }
    },
    //点击项目名称
    openxq(row) {
      this.xq.yj_id = row.yj_id;
      this.id = row.id;
      if (
        row.source == "全国建筑市场" ||
        row.source == "四川建设厅" ||
        row.source == "jzsc" ||
        row.source == "jst"
      ) {
        //审核内标签数据转接
        this.xq.Visible = true;
        this.xq.jgbabh = row.jgbabh;
        this.xq.proj_id = row.proj_id;
        this.xq.model = row.model;
        this.xq.source = row.source;
        this.getXqData();
      } else if (row.source == "全国水利厅" || row.source == "sl") {
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=sl`
        });
        window.open(href, "业绩详情" + row.proj_id + row.source);
      } else if (row.source == "全国交通厅" || row.source == "gl") {
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${row.proj_id}&source=gl`
        });
        window.open(href, "业绩详情" + row.proj_id + row.source);
      } else if (
        row.source == "中标公示" ||
        row.source == "投标使用" ||
        row.source == "其他"
      ) {
        let { href } = this.$router.resolve({
          path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ||
            ""}&zbgs_id=${row.proj_id || ""}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
        });
        window.open(href, "投标使用" + row.id + row.zbxx_id + row.xmmc);
      } else {
        if (row.link) {
          window.open(row.link);
        } else {
          this.$message.error("源网址不存在");
        }
      }
    },
    //请求点击项目名称显示列表的接口
    getXqData() {
      this.axios.post(
        "/index/search_yj/secondYj",
        {
          proj_id: this.xq.proj_id,
          jgbabh: this.xq.jgbabh,
          yj_id: this.$route.query.yj_id,
          tableName: this.xq.model,
          row: 10,
          page: 1,
          order: "asc",
          gs_id: this.$route.query.gs_id,
          type: 1
          //tableName:'proj_jzsc',
          //source:'全国建筑市场',
        },
        data => {
          if (data.status == "success") {
            this.xq.list1 = data.rows;
            this.xq.listCount1 = data.total;
          } else {
            this.xq.list1 = [];
            this.xq.listCount1 = 0;
          }
        }
      );

      this.axios.post(
        "/index/search_yj/secondYj",
        {
          proj_id: this.xq.proj_id,
          jgbabh: this.xq.jgbabh,
          yj_id: this.$route.query.yj_id,
          tableName: this.xq.model,
          row: 10,
          page: 1,
          order: "asc",
          gs_id: this.$route.query.gs_id,
          type: 2
          //tableName:'proj_jzsc',
          //source:'全国建筑市场',
        },
        data => {
          if (data.status == "success") {
            this.xq.list2 = data.rows;
            this.xq.listCount2 = data.total;
          } else {
            this.xq.list2 = [];
            this.xq.listCount2 = 0;
          }
          //                                window.open(row.link);
          //
        }
      );
    },
    openXqRy(row) {
      let { href } = this.$router.resolve({
        path: `/ryDet?gs_id=${row.gs_id}&name=${row.xm}&staff_base_id=${
          this.staff_base_id2
        }`
      });
      window.open(href, "人员详情" + row.id + row.xm);
    },
    // 点击搜索按钮/查询条件回车/查询条件选择改变 查询数据列表
    handleRequestList(btnType, sss) {
      switch (btnType) {
        case "source": // 改变数据来源下拉框
          this.addRy.page = 1;
          this.certificateTypeVal = "全部";
          this.registerMajorVal = "全部";
          this.certificateLevelVal = "全部";
          this.certificateType = [];
          this.registerMajor = [];
          this.certificateLevel = [];
          // 请求证件类型列表
          this.loading = true;
          this.handleCertList();
          break;
        case "type": // 改变证件类型下拉框
          // 改变注册专业、证书级别列表
          if (
            this.dataSourceVal === "四川省建设厅" &&
            this.certificateTypeVal === "造价人员"
          ) {
            this.isChange = true;
          } else {
            this.isChange = false;
          }
          this.addRy.page = 1;
          this.registerMajorVal = "全部";
          this.certificateLevelVal = "全部";
          this.registerMajor = [];
          this.certificateLevel = [];

          // 切换证件类型时，动态改变注册专业和等级
          this.loading = true;
          this.handleChangeSelectList();
          break;
        default:
          this.loading = true;
          this.addRy.page = 1;
          this.certificateTypeVal = sss;
          this.handlePeopleListNew();
          break;
      }
    },
    // 点击重置按钮
    handleResetBtn() {
      this.nameVal = "";
      this.numberVal = "";
      this.dataSourceVal = "四川省建设厅";
      this.certificateTypeVal = "全部";
      this.registerMajorVal = "全部";
      this.certificateLevelVal = "全部";
      this.addRy.page = 1;
      this.loading = true;
      this.handlePeopleListNew();
    },
    // 点击分页
    handleChangePage(val) {
      this.addRy.page = val;
      this.loading = true;
      this.handlePeopleListNew();
    },
    // 锁定解锁操作
    setLock() {
      if (this.unlock) {
        this.setLockData(0);
      } else {
        this.setLockData(1);
      }
    },
    // 请求锁定、解锁接口
    setLockData(locked) {
      this.axios.post(
        "/index/Human_Review/locked",
        {
          jbxx_id: this.$route.query.jbxx_id,
          locked: locked,
          gs_id: this.$route.query.gs_id
        },
        data => {
          if (data.status == "success") {
            this.getLockOk();
          } else {
            this.$message.error("操作失败");
          }
        }
      );
    },
    // 分享按钮
    sharePage() {
      this.pageShare =
        window.location.host +
        "/#/ItemBsDetShare?jbxx_id=" +
        this.$route.query.jbxx_id +
        "&gs_id=" +
        this.$route.query.gs_id +
        "&ry_id=" +
        this.$route.query.ry_id +
        "&yj_id=" +
        this.$route.query.yj_id;
      this.getPassWord();
      this.shareVisible = true;
    },
    //复制网址和密码
    copyPagePas() {
      document.getElementsByClassName("textDispaly")[0].value =
        "网址:" + this.pageShare;
      document.getElementsByClassName("textDispaly")[0].select();
      var successful = document.execCommand("copy");
      if (successful) {
        this.setPassWord();
      } else {
        this.$message.error("该浏览器不支持复制粘贴板，请手动复制粘贴分享");
      }
    },
    // 请求设置密码接口
    setPassWord() {
      this.axios.post(
        "/index/Human_Review/setPsw",
        {
          jbxx_id: this.$route.query.jbxx_id,
          password: this.pasShare,
          gs_id: this.$route.query.gs_id
        },
        data => {
          if (data.status == "success") {
            this.$message({
              message: "网址和密码已经复制到粘贴板",
              type: "success"
            });
          } else {
            this.$message.error("出现未知错误，请联系管理员");
          }
        }
      );
    },
    //请求获得旧密码接口
    getPassWord() {
      this.axios.post(
        "/index/Human_Review/getPsd",
        {
          jbxx_id: this.$route.query.jbxx_id,
          gs_id: this.$route.query.gs_id
        },
        data => {
          this.pasShare = data.password;
        }
      );
    },
    //请求分享接口
    setShareData() {},
    //获得页面锁定情况
    getLockOk() {
      this.axios.post(
        //项目基本信息
        "/index/Human_Review/status",
        {
          jbxx_id: this.$route.query.jbxx_id,
          gs_id: this.$route.query.gs_id
        },
        data => {
          if (data.locked == 1) {
            //this.banButton()
            this.unlock = true;
          } else {
            this.unlock = false;
          }
        }
      );
    },
    // 切换证件类型时 动态改变注册专业、证书级别选择类表
    handleChangeSelectList() {
      if (this.certificateTypeVal !== "全部") {
        // 注册专业列表
        this.registerMajor = this.certList
          .filter((item, index) => {
            return item.name === this.certificateTypeVal;
          })[0]
          .major.map((item, index) => {
            return {
              value: item,
              label: item
            };
          });

        // 证书级别列表
        this.certificateLevel = this.certList
          .filter((item, index) => {
            return item.name === this.certificateTypeVal;
          })[0]
          .level.map((item, index) => {
            return {
              value: item,
              label: item
            };
          });
      }

      // 请求人员列表
      // this.loading = true;
      this.handlePeopleListNew();
    },
    openXqOne(name) {
      var source = "";
      if (this.xq.source == "全国建筑市场") {
        source = "jzsc";
      } else if (this.xq.source == "四川建设厅") {
        source = "jst";
      } else if (this.xq.source == "公路") {
        source = "gl";
      } else if (this.xq.source == "水利") {
        source = "sl";
      }
      let { href } = this.$router.resolve({
        path: `/yjDet?proj_id=${this.xq.proj_id}&source=${source}`
      });
      window.open(href, "业绩详情" + name + this.xq.proj_id + source);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.tj_row {
  margin-bottom: 20px;
  .tjtitle {
    font-size: 16px;
    color: #222222;
  }
  .tj_text {
    word-wrap: break-word;
    text-indent: 30px;
  }
}
.xmxx_class {
  margin-left: 50px;
  font-size: 14px;
}
.myrow {
  margin: 20px 0;
  display: flex;
}
.myrow > div:first-child {
  width: 120px;
}
.mycol_1 {
  flex: 1;
}
a {
  color: #409eff;
}

.ItemInfo_content {
  // 一级页面头部开始
  .content_header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .tittle {
      // line-height: 60px;
      padding: 14px 0;
      -moz-box-shadow: 0px 0px 0px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      width: 100%;
      font-size: 32px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
  // 一级页面头部结束

  // 一级页面身体开始
  .content_body {
    display: flex;
    padding: 25px;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    height: calc(~"100% - 60px");
    background: #f9f9f9;
    .body_header {
      height: 180px;
      background: #ffffff;
      margin-bottom: 20px;
      -moz-box-shadow: 0px 0px 5px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      .evryone {
        display: flex;
        flex-direction: row;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        .each {
          margin-left: 25px;
          height: 60px;
          justify-content: center;
          span {
            color: #606266;
          }
        }
        .each_button {
          width: 49%;
          height: 60px;
          text-align: right;
          padding-right: 25px;
        }
        .evryone_one {
          width: 125px;
          height: 60px;
          margin-left: 25px;
        }
        .first {
          margin-left: 25px;
          margin-right: 10px;
        }
        .second {
          color: #409eff;
          font-size: 18px;
        }
        .evryone_two {
          height: 28px;
          display: flex;
          flex-direction: row;
          // width: 740px;
          // height: 20px;
          margin-top: 10px;
          font-size: 14px;
          color: #000000;
          .eachOne {
            width: 250px;
            line-height: 28px;
            height: 28px;
            text-align: center;
          }
          .active {
            background-image: url("../assets/jd.png");
            background-repeat: no-repeat;
            background-size: cover;
            width: 250px;
            height: 28px;
            text-align: center;
            color: #ffffff;
          }
        }
      }
      .evryone:nth-child(3),
      .evryone:nth-child(2) {
        border: none;
      }
    }
    .body_content {
      background: #ffffff;
      // height: calc(~"100% - 270px");
      -moz-box-shadow: 0px 0px 5px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      .information {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        .informatin_header {
          display: flex;
          margin-left: 25px;
          font-size: 20px;
          height: 70px;
          line-height: 70px;
        }
        .infromation_body {
          font-size: 14px;
          display: flex;
          flex-direction: row;
          margin-left: 50px;
          .each_left {
            display: flex;
            width: 100px;
            flex-direction: column;
            margin-right: 25px;
            .left_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
          }
          .each_right {
            display: flex;
            flex-direction: column;
            .right_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
            // .right_each_two {
            //   margin-bottom: 20px;
            //   color: #06b6ff;
            // }
            .right_botton {
              display: flex;
              flex-direction: row;
              color: #409eff;
              .button_left {
                display: flex;
                flex-direction: column;
                margin-right: 115px;
                .right_each_two {
                  cursor: pointer;
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
              }
              .button_right {
                border: 1px solid #9d9d9d;
                padding-left: 20px;
                padding-right: 80px;
                display: flex;
                flex-direction: column;
                align-content: center;
                display: flex;
                .right_each_two {
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
                .right_each_two:last-child {
                  margin-bottom: 0px;
                }
              }
            }
          }
        }
      }
      .table {
        display: flex;
        flex-direction: column;
        .table_header {
          margin-left: 25px;
          font-size: 20px;
          margin-bottom: 25px;
          margin-right: 25px;
        }
        .table_footer {
          margin-left: 25px;
          display: block;
          margin-right: 25px;
        }
      }
      .body_footer {
        margin: 0 25px;
        background: #f2f2f2;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        margin-top: 30px;
        margin-bottom: 60px;
      }
    }
  }
}
</style>
<style scoped>
.liu li {
  width: 250px;
  height: 28px;
  float: left;
  list-style: none;
  position: absolute;
  text-align: center;
  line-height: 28px;
}
</style>