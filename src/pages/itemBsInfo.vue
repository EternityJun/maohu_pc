<!--项目详情-->
<template>
  <div class="ItemInfo_content">
    <!-- 一级页面头部开始 -->
    <div class="content_header">
      <div class="tittle">{{itemInfo.xmmc}}</div>
    </div>
    <!-- 一级页面头部结束 -->
    <!-- 一级页面身体开始 -->
    <div class="content_body">
      <div class="body_header">
        <div class="evryone" style="border-bottom:1px solid #e1e1e1">
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
        <div class="information">
          <div class="informatin_header">
            项目信息&nbsp;&nbsp;&nbsp;
            <i
              class="el-icon-edit-outline"
              style="height:20px;width:20px;margin-top:25px;cursor:pointer"
              @click="editXq()"
            ></i>
          </div>
          <div class="xmxx_class">
            <div class="myrow">
              <div>资质要求</div>
              <div class="mycol_1">{{ProBaseInfo.zzyq}}</div>
            </div>
            <div class="myrow">
              <div>人员要求</div>
              <div class="mycol_1">{{ProBaseInfo.ryyq}}</div>
            </div>
            <div class="myrow">
              <div>业绩要求</div>
              <div class="mycol_1">{{ProBaseInfo.yjyq}}</div>
            </div>
            <div class="myrow">
              <div>其它要求</div>
              <div class="mycol_1">{{ProBaseInfo.qtyq}}</div>
            </div>
          </div>
        </div>
        <div class="table_header" style="font-size:20px;margin-bottom:30px;margin-left:30px;">相关企业</div>
        <div class="table" style="height:1000px;">
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
                <p
                  :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==1?'center':'left',fontSize:'20px',color:'#67C23a'}"
                >
                  已通过的数据&nbsp;
                  <i class="el-icon-success"></i>
                </p>
                <!--左边的表-->
                <el-table border :data="gsDataL.gslist" v-loading="gsDataL.loading">
                  <el-table-column width="60px" label="序号" header-align="center" align="center">
                    <template slot-scope="scope">{{scope.$index+(gsDataL.page-1)*10+1}}</template>
                  </el-table-column>
                  <el-table-column prop="gsmc" label="企业名称" width="200px" align="center">
                    <template slot-scope="scope">
                      <div class="color_link" @click="openGs(scope.row)">{{scope.row.gsmc}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="人员情况" prop="people_situation" align="center">
                    <template slot-scope="scope">
                      <el-button
                        :style="{color:scope.row.ry_status?'#3a8ee6':'red'}"
                        @click="onjumpRy(scope.row)"
                        type="text"
                      >{{scope.row.people_situation}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="业绩情况" prop="yj" align="center">
                    <template slot-scope="scope">
                      <el-button
                        :style="{color:scope.row.yj_status?'#3a8ee6':'red'}"
                        @click="onjumpYj(scope.row)"
                        type="text"
                      >{{scope.row.project_situation}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="标书" prop="other_situation" align="center">
                    <template slot-scope="scope">
                      <div>
                        <span
                          style="color:#409EFF;cursor:pointer"
                          @click="table_click(scope.row)"
                        >详情</span>
                        <div
                          v-if="scope.row.locked == 1"
                          :style="{position:'absolute',right:'70px',top:'20px',cursor:'pointer'}"
                          @click="setLock(scope.row)"
                        >
                          <img src="../assets/lock.png" alt="???" style="width:20px;height:20px;" />
                        </div>
                        <div
                          v-if="scope.row.locked == 0"
                          :style="{position:'absolute',right:'70px',top:'20px',cursor:'pointer'}"
                          @click="setLock(scope.row)"
                        >
                          <img src="../assets/unlock.png" alt="???" style="width:20px;height:20px;" />
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="标签" align="center">
                    <template slot-scope="scope">
                      <el-popover
                        placement="top"
                        title="标签"
                        width="460"
                        v-model="scope.row.visible"
                        @show="showTagRow(scope.row,1)"
                      >
                        <el-form label-width="152px" @submit.native.prevent>
                          <el-form-item label="是否是国企/央企">
                            <el-radio-group v-model="tagData.qyxz">
                              <el-radio :label="2">否</el-radio>
                              <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="从不投标/不对外投标">
                            <el-radio-group v-model="tagData.tbpl">
                              <el-radio :label="2">否</el-radio>
                              <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="不好合作">
                            <el-radio-group v-model="tagData.cooperation">
                              <el-radio :label="2">否</el-radio>
                              <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="公司有问题">
                            <el-radio-group v-model="tagData.issue">
                              <el-radio :label="2">否</el-radio>
                              <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="其他">
                            <el-input
                              @keyup.enter.native="onCloseTag(scope.row,'confirm',1)"
                              v-model="tagData.otherText"
                              style="width:260px"
                              placeholder="其他问题"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label-width="0" align="center">
                            <el-button size="small" @click="onCloseTag(scope.row,'cancel',1)">取消</el-button>
                            <el-button
                              type="primary"
                              size="small"
                              @click="onCloseTag(scope.row,'confirm',1)"
                            >确定</el-button>
                          </el-form-item>
                        </el-form>
                        <el-button slot="reference" type="text" :icon="!scope.row.flag?'el-icon-star-off':'el-icon-star-on'"></el-button>
                      </el-popover>
                    </template>
                  </el-table-column>-->
                  <el-table-column label="操作日志" prop="cz" align="center">
                    <template slot-scope="scope">
                      <el-button
                        @click="onOpenMs(scope.row)"
                        type="text"
                        icon="el-icon-edit-outline"
                      ></el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="审核" prop="sh" align="center">
                    <template slot-scope="scope">
                      <el-button
                        @click="shenhe(scope.$index,scope.row,2)"
                        type="text"
                        style="color:#606266"
                      >
                        不通过
                        <i class="el-icon-arrow-right el-icon--right"></i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  style="margin-top:20px"
                  ref="fenye"
                  @current-change="pageSizeChangeL"
                  align="right"
                  background
                  layout="total,prev, pager, next"
                  :total="gsDataL.total"
                ></el-pagination>
              </div>
              <div :style="tableStyleR" @click="checkTable(2)">
                <p
                  :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==2?'center':'right',fontSize:'20px',color:'#f56c6c'}"
                >
                  未通过的数据
                  <i class="el-icon-error"></i>
                </p>
                <!--右边的表-->
                <el-table border :data="gsDataR.gslist" v-loading="gsDataR.loading">
                  <el-table-column
                    type="index"
                    width="50px"
                    label="序号"
                    header-align="center"
                    align="center"
                  >
                    <template slot-scope="scope">{{scope.$index+(gsDataR.page-1)*10+1}}</template>
                  </el-table-column>
                  <el-table-column prop="gsmc" label="企业名称" width="200px" align="center">
                    <template slot-scope="scope">
                      <div class="color_link" @click="openGs(scope.row)">{{scope.row.gsmc}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="人员情况" prop="people_situation" align="center">
                    <template slot-scope="scope">
                      <el-button
                        :style="{color:scope.row.ry_status?'#3a8ee6':'red'}"
                        @click="onjumpRy(scope.row)"
                        size="small"
                        type="text"
                      >{{scope.row.people_situation}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="业绩情况" prop="yj" align="center">
                    <template slot-scope="scope">
                      <el-button
                        :style="{color:scope.row.yj_status?'#3a8ee6':'red'}"
                        size="small"
                        type="text"
                        @click="onjumpYj(scope.row)"
                      >{{scope.row.project_situation}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="标书" align="center">
                    <template slot-scope="scope">
                      <div>
                        <span
                          style="color:#409EFF;cursor:pointer"
                          @click="table_click(scope.row)"
                        >详情</span>
                        <div
                          v-if="scope.row.locked == 1"
                          :style="{position:'absolute',right:'70px',top:'20px',cursor:'pointer'}"
                          @click="setLock(scope.row)"
                        >
                          <img src="../assets/lock.png" alt="???" style="width:20px;height:20px;" />
                        </div>
                        <div
                          v-if="scope.row.locked == 0"
                          :style="{position:'absolute',right:'70px',top:'20px',cursor:'pointer'}"
                          @click="setLock(scope.row)"
                        >
                          <img src="../assets/unlock.png" alt="???" style="width:20px;height:20px;" />
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="标签" align="center">
                    <template slot-scope="scope">
                      <el-popover
                        placement="top"
                        title="标签"
                        width="460"
                        v-model="scope.row.visible"
                        @show="showTagRow(scope.row,1)"
                      >
                        <el-form label-width="152px" @submit.native.prevent>
                          <el-form-item label="是否是国企/央企">
                            <el-radio-group v-model="tagData.qyxz">
                              <el-radio :label="2">否</el-radio>
                              <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="从不投标/不对外投标">
                            <el-radio-group v-model="tagData.tbpl">
                              <el-radio :label="2">否</el-radio>
                              <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="不好合作">
                            <el-radio-group v-model="tagData.cooperation">
                              <el-radio :label="2">否</el-radio>
                              <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="公司有问题">
                            <el-radio-group v-model="tagData.issue">
                              <el-radio :label="2">否</el-radio>
                              <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                          </el-form-item>
                          <el-form-item label="其他">
                            <el-input
                              @keyup.enter.native="onCloseTag(scope.row,'confirm',1)"
                              v-model="tagData.otherText"
                              style="width:260px"
                              placeholder="其他问题"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label-width="0" align="center">
                            <el-button size="small" @click="onCloseTag(scope.row,'cancel',1)">取消</el-button>
                            <el-button
                              type="primary"
                              size="small"
                              @click="onCloseTag(scope.row,'confirm',1)"
                            >确定</el-button>
                          </el-form-item>
                        </el-form>
                        <el-button slot="reference" type="text" :icon="!scope.row.flag?'el-icon-star-off':'el-icon-star-on'"></el-button>
                      </el-popover>
                    </template>
                  </el-table-column>-->
                  <el-table-column label="操作日志" prop="cz" align="center">
                    <template slot-scope="scope">
                      <el-button
                        @click="onOpenMs(scope.row)"
                        type="text"
                        icon="el-icon-edit-outline"
                      ></el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="审核" prop="sh" align="center">
                    <template slot-scope="scope">
                      <el-button
                        @click="shenhe(scope.$index,scope.row,1)"
                        type="text"
                        style="color:#606266"
                      >
                        <i class="el-icon-arrow-left"></i>通过
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  style="margin-top:20px"
                  ref="fenye"
                  @current-change="pageSizeChangeR"
                  align="right"
                  background
                  layout="total,prev, pager, next"
                  :total="gsDataR.total"
                ></el-pagination>
              </div>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="对企业的描述" :visible.sync="qymsDialogVisible" width="60%">
      <div v-loading="msloading">
        <div>
          <el-row
            v-for="(one,i) in msdata"
            :key="i"
            type="flex"
            style="flex-direction:column;margin-bottom:20px"
          >
            <el-row type="flex" style="align-items:center;margin-bottom:4px">
              <img style="height:32px;" :src="one.headimgurl" alt />
              <div style="padding:0 6px 0 10px">{{one.user_name}}</div>
              <span>{{one.modified}}</span>
            </el-row>
            <div style="flex:1;padding-left:40px">{{one.content}}</div>
          </el-row>
        </div>
        <div>
          <el-input
            type="textarea"
            @keyup.ctrl.enter.native="onPj"
            :rows="4"
            placeholder="请输入内容"
            v-model="textareaValue"
          ></el-input>
        </div>
        <div style="color:#cccccc;font-size:14px;">Ctrl+Enter提交</div>
        <div style="text-align:right;margin-top:10px">
          <el-button type="primary" @click="onPj">评价</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 编辑项目信息弹框 -->
    <el-dialog title="编辑项目信息" :visible.sync="editXqVisible" width="30%" @close="getProBaseInfo()">
      <div>
        <span>资质要求：</span>
        <el-input
          type="input"
          @keyup.enter.native="editXqOk"
          :rows="4"
          placeholder="请输入内容"
          v-model="Edit.zzyq"
        ></el-input>
      </div>
      <div style="margin-top:30px;">
        <span>人员要求：</span>
        <el-input
          type="input"
          @keyup.enter.native="editXqOk"
          :rows="4"
          placeholder="请输入内容"
          v-model="Edit.ryyq"
        ></el-input>
      </div>
      <div style="margin-top:30px;">
        <span>业绩要求：</span>
        <el-input
          type="input"
          @keyup.enter.native="editXqOk"
          :rows="4"
          placeholder="请输入内容"
          v-model="Edit.yjyq"
        ></el-input>
      </div>
      <div style="margin-top:30px;">
        <span>其他要求：</span>
        <el-input
          type="input"
          @keyup.enter.native="editXqOk"
          :rows="4"
          placeholder="请输入内容"
          v-model="Edit.qtyq"
        ></el-input>
      </div>
      <div style="text-align: center;margin-top: 40px;">
        <el-button @click="editXqVisible = false">取 消</el-button>
        <el-button type="primary" @click="editXqOk()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 企业不通过原因 -->
    <el-dialog title="企业不通过原因" :visible.sync="qynoPassDialogVisible" width="35%">
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
                <img :src="o.headimgurl" alt style="height: 30px;" />
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
          <el-checkbox label="该企业不对外投标"></el-checkbox>
          <el-checkbox label="该企业异常"></el-checkbox>
          <el-checkbox label="该企业不好合作"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <el-input
          type="textarea"
          @keyup.ctrl.enter.native="noPassOk"
          :rows="4"
          placeholder="其他情况如:该企业已离开四川市场或该企业不在成都投标"
          v-model="noPass.other"
        ></el-input>
      </div>
      <div style="color:#cccccc;font-size:14px;">Ctrl+Enter提交</div>
      <div style="text-align:right;margin-top:10px">
        <el-button type="primary" @click="noPassOk">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import firstImgUrl from "../assets/h1.png";
import centerImgUrl from "../assets/h1.png";
import lastImgUrl from "../assets/h4.png";
//高亮组
import prifirstImgUrl from "../assets/l1u.png";
import pricenterImgUrl from "../assets/l1u.png";
import prilastImgUrl from "../assets/l5u.png";
//引入图片
import l1u from "../assets/l1u.png";
import l1d from "../assets/l2d.png";
import l2u from "../assets/l1u.png";
import l2d from "../assets/l2d.png";
import l5u from "../assets/l5u.png";
import l5d from "../assets/l5d.png";
import { truncate } from "fs";
export default {
  name: "ItemInfo",
  data () {
    return {
      //切换表格
      tableIndex: 1,
      tableStyleL:
        "box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(10%) scale(1);position:absolute;width:80%;z-index:10;height:810px;",
      tableStyleR:
        "box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);position:absolute;width:80%;z-index:8;height:810px;",
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
      user_id: this.$store.state.userInfo.user_id,
      jbxx_id: this.$route.query.jbxx_id,
      model: this.$route.query.model,
      xmmc: this.$route.query.xmmc,
      nowRow: null,
      msdata: null,
      qymsDialogVisible: false,
      msloading: false, //描述等待
      textareaValue: "", //多行文本框
      itemInfo: {
        xmmc: ""
      },
      Edit: {
        zzyq: "",
        ryyq: "",
        yjyq: "",
        qtyq: ""
      },
      tagData: {
        qyxz: "",
        tbpl: "", //不投标
        cooperation: "", //不好合作
        issue: "", //有问题
        other: "",
        otherText: ""
      },
      gsDataL: {
        total: 0,
        page: 1,
        loading: false,
        gslist: []
      },
      gsDataR: {
        page: 1,
        total: 0,
        loading: false,
        gslist: []
      },
      editXqVisible: false,
      ProBaseInfo: "",
      noPass: {
        checkboxdata: [],
        gslist: [],
        Visible: false,
        other: "",
        proj_id: "",
        jgbabh: "",
        allData: [],
        gs_id: ""
      },
      qynoPassDialogVisible: false,
      role: {}
    };
  },
  computed: {
    firstStyle () {
      let imgurl = this.itemInfo.stage1 ? prifirstImgUrl : firstImgUrl;
      return {
        color: "#ffffff",
        backgroundImage: "url(" + imgurl + ")"
      };
    },
    centerStyle () {
      let imgurl = this.itemInfo.stage2 ? pricenterImgUrl : centerImgUrl;
      return {
        color: "#ffffff",
        backgroundImage: "url(" + imgurl + ")"
      };
    },
    centerStyle2 () {
      let imgurl = this.itemInfo.stage3 ? pricenterImgUrl : centerImgUrl;
      return {
        color: "#ffffff",
        backgroundImage: "url(" + imgurl + ")"
      };
    },
    lastStyle () {
      let imgurl = this.itemInfo.stage4 ? prilastImgUrl : lastImgUrl;
      return {
        color: "#ffffff",
        backgroundImage: "url(" + imgurl + ")"
      };
    }
  },
  watch: {
    $route (to, from) {
      window.location.reload();
    }
  },
  created () {
    this.fn_role();
    this.setTitle();
    this.getItemInfo();
    //公司集合
    this.getGsList(1); //已审核
    this.getGsList(2); //未审核
    this.getProBaseInfo();
    //通信
    window.addEventListener(
      "message",
      data => {
        if (event.data == "刷新") {
          this.getGsList(1); //已审核
        }
      },
      false
    );
  },
  methods: {
    // 权限控制 点击公司名称时
    fn_role () {
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
    setTitle () {
      document.title = this.model + "：" + this.xmmc;
    },
    //修改项目信息
    editXqOk () {
      this.axios.post(
        "/index/project/editProBaseInfo",
        {
          jbxx_id: this.$route.query.jbxx_id,
          type: 2,
          zzyq: this.Edit.zzyq,
          ryyq: this.Edit.ryyq,
          qtyq: this.Edit.qtyq,
          yjyq: this.Edit.yjyq
        },
        data => {
          if (data.status == "success") {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.editXqVisible = false;
          }
        }
      );
    },
    //获取项目信息
    getProBaseInfo () {
      this.axios.post(
        "/index/project/getProBaseInfo",
        {
          jbxx_id: this.$route.query.jbxx_id
        },
        data => {
          if (data.status == "success") {
            this.ProBaseInfo = data.message;
          }
        }
      );
    },
    //按钮无限切换
    checkTableButton () {
      if (this.tableIndex == 2) {
        this.checkTable(1);
      } else {
        this.checkTable(2);
      }
    },
    //切换表格
    checkTable (type) {
      if (type == 2) {
        this.tableIndex = 2;
        this.tableStyleL =
          "box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(-10%) scale(0.8);position:absolute;width:80%;z-index:8;height:810px;transition: .3s;";
        this.tableStyleR =
          "box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(10%) scale(1);position:absolute;width:80%;z-index:10;height:810px;transition: .3s;";
      } else {
        this.tableIndex = 1;
        this.tableStyleL =
          "box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(10%) scale(1);position:absolute;width:80%;z-index:10;height:810px;transition: .3s;";
        this.tableStyleR =
          "box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);position:absolute;width:80%;z-index:8;height:810px;transition: .3s;";
      }
    },
    //渲染进度横条
    jindu () {
      // console.log(this.itemInfo.status);
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
          ? this.button_radio.l5
          : this.button_radio.l8;
    },
    //保存标签/关闭标签
    onCloseTag (row, type, valid) {
      //点击确定后关闭
      let tabledata = null;
      if (type == "confirm") {
        let tapobj = this.tagData;
        var obj = {
          thread_id: row.thread_id,
          gs_id: row.gs_id,
          id: this.tagData.id,
          type: "list",
          content: this.tagData.otherText,
          qyxz: this.tagData.qyxz,
          tbpl: this.tagData.tbpl,
          cooperation: this.tagData.cooperation,
          issue: this.tagData.issue
        };
        this.axios.post("/Index/Others/label", obj, data => {
          if (data.status == "success") {
            this.$message.success("成功");
            this.getGsList(valid);
          } else {
            this.$message.error("失败");
          }
        });
      }
      if (valid == 1) {
        this.gsDataL.gslist.map(v => {
          if (v.id == row.id) {
            v.visible = false;
          }
          return v;
        });
      } else {
        this.gsDataR.gslist.map(v => {
          if (v.id == row.id) {
            v.visible = false;
          }
          return v;
        });
      }
    },
    //显示标签
    showTagRow (row, type) {
      this.nowRow = row;
      this.axios.post(
        "/Index/Others/labelShow",
        { gs_id: row.gs_id },
        data => {
          if (data.status == "success") {
            data.rows.otherText = "";
            this.tagData = data.rows;
          } else {
            this.tagData = {
              id: "",
              qyxz: "",
              tbpl: "", //不投标
              cooperation: "", //不好合作
              issue: "", //有问题
              other: "",
              otherText: ""
            };
          }
        }
      );
    },
    //打开对企业的描述弹框
    onOpenMs (row) {
      this.msdata = null;
      this.nowRow = row;
      this.qymsDialogVisible = true;
      this.msloading = true;
      this.getGsMslist(row);
    },
    // 点击评价
    onPj () {
      if (this.textareaValue == "") {
        this.$message.error("请输入评价内容");
      } else {
        this.qymsDialogVisible = false;
        let obj = {
          jbxx_id: this.jbxx_id,
          user_id: this.user_id,
          gs_id: this.nowRow.gs_id,
          content: this.textareaValue,
          flag: 1
        };
        this.axios.post(
          "/index/Element_Set/addLeaveWords",
          obj,
          data => {
            this.textareaValue = "";
            if (data.status == "success") {
              this.$message.success("成功");
            } else {
              this.$message.success("成功");
            }
          }
        );
      }
    },
    // 跳转
    openGs (row) {
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
    },
    //审核按钮
    shenhe (index, row, type) {
      this.noPass.allData = [];
      this.noPass.other = "";
      this.noPass.checkboxdata = [];
      this.noPass.gs_id = row.gs_id;
      this.id = row.id;
      this.type = type;
      this.getCheckReason();
    },
    //请求企业不通过原因的列表
    getCheckReason () {
      if (this.type == 1) {
        this.geyShenhe(1);
      } else {
        this.axios.post(
          "/index/search_yj/checkReason",
          {
            gs_id: this.noPass.gs_id
          },
          data => {
            if (data.status == "success") {
              this.noPass.allData = data.rows;
              this.noPass.other = data.rows[0].other;
              this.noPass.checkboxdata = data.rows[0].reason.split(
                ","
              );
            } else {
              this.noPass.allData = [];
              this.noPass.other = "";
              this.noPass.checkboxdata = [];
            }
            this.qynoPassDialogVisible = true;
          }
        );
      }
    },
    //点击通过/不通过
    geyShenhe (type) {
      let obj = {
        gs_id: this.noPass.gs_id,
        user_id: this.user_id,
        jbxx_id: this.jbxx_id,
        cate: "标书制作",
        valid: type
      };
      this.axios.post(
        "/index/Human_Review/saveCompanyReview",
        obj,
        data => {
          if (data.status == "success") {
            this.getGsList(2);
            this.getGsList(1);
          }
        }
      );
    },
    //确认驳回
    noPassOk () {
      if (
        this.noPass.checkboxdata.length == 0 &&
        this.noPass.other == ""
      ) {
        this.$message.error("提交的内容不能为空");
        return;
      }
      this.axios.post(
        "/index/search_yj/addReason",
        {
          user_id: this.$store.state.userInfo.user_id,
          gs_id: this.noPass.gs_id,
          reason: this.noPass.checkboxdata.join(","),
          other: this.noPass.other
        },
        data => {
          this.geyShenhe(2);
          this.qynoPassDialogVisible = false;
          this.getListDataR();
          this.getNoPassYj();
          window.opener.postMessage("刷新", "*");
        }
      );
    },
    //删除不通过的原因
    reason_delete (id) {
      this.$confirm("确认删除？")
        .then(_ => {
          this.axios.post(
            "/index/project/delLeaveWords",
            {
              user_id: this.$store.state.userInfo.user_id,
              cate: "标书",
              id: id
            },
            data => {
              this.getCheckReason();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
          );
        })
        .catch(_ => { });
    },
    //获取评论信息
    getGsMslist (row) {
      let obj = {
        jbxx_id: this.jbxx_id,
        user_id: this.user_id,
        gs_id: row.gs_id
      };
      this.axios.post(
        "/index/Element_Set/companyReviewWords",
        obj,
        data => {
          this.msloading = false;
          if (data.status == "success") {
            this.msdata = data.message;
          }
        }
      );
    },
    //获取业绩信息
    getItemInfo () {
      let obj = {
        jbxx_id: this.$route.query.jbxx_id,
        user_id: this.user_id
      };
      this.axios.post("/index/project/re_detail", obj, data => {
        if (data.status == "success") {
          this.itemInfo = data.rows;
          this.jindu();
        }
      });
    },
    pageSizeChangeL (val) {
      this.gsDataL.page = val;
      this.getGsList(1);
    },
    pageSizeChangeR (val) {
      this.gsDataR.page = val;
      this.getGsList(2);
    },
    //请求公司描述
    getGsList (valid) {
      let obj = {
        jbxx_id: this.jbxx_id,
        user_id: this.user_id,
        is_bs: this.model == "标书" ? 1 : 0,
        row: 10,
        valid: valid
      };
      if (valid == 1) {
        obj.page = this.gsDataL.page;
        this.gsDataL.loading = true;
      } else {
        obj.page = this.gsDataR.page;
        this.gsDataR.loading = true;
      }
      this.axios.post(
        "/index/Human_Review/companyReviewList",
        obj,
        data => {
          this.gsDataR.loading = false;
          this.gsDataL.loading = false;
          if (valid == 1) {
            this.gsDataL.gslist = data.rows;
            this.gsDataL.total = data.total || 0;
          } else {
            this.gsDataR.gslist = data.rows;
            this.gsDataR.total = data.total || 0;
          }
        }
      );
    },
    //打开人员详情列表
    onjumpRy (row) {
      let { href } = this.$router.resolve({
        path: `/itemCheckInfoRy?jbxx_id=${this.jbxx_id}&gs_id=${
          row.gs_id
          }&ry_id=${row.ry_id}`
      });
      window.open(href, "d" + row.id);
    },
    //打开业绩详情列表
    //打开业绩详情列表
    onjumpYj (row) {
      let { href } = this.$router.resolve({
        path: `/ItemProj?jbxx_id=${this.jbxx_id}&gs_id=${
          row.gs_id
          }&yj_id=${row.yj_id}`
      });
      window.open(href, "c" + row.id);
    },
    //点击进入标书详情
    table_click (row) {
      let { href } = this.$router.resolve({
        path: `/bidResultRyYj?jbxx_id=${this.jbxx_id}&gs_id=${
          row.gs_id
          }&ry_id=${row.ry_id}&yj_id=${row.yj_id}`
      });
      window.open(href, "e" + row.id);
    },
    //编辑项目信息详情
    editXq () {
      this.Edit.zzyq = this.ProBaseInfo.zzyq;
      this.Edit.ryyq = this.ProBaseInfo.ryyq;
      this.Edit.yjyq = this.ProBaseInfo.yjyq;
      this.Edit.qtyq = this.ProBaseInfo.qtyq;
      this.editXqVisible = true;
    },
    //列表锁定标书
    setLock (row) {
      if (row.locked == 1) {
        this.setLockData(0, row.gs_id);
      } else {
        this.setLockData(1, row.gs_id);
      }
    },
    // 请求锁定、解锁接口
    setLockData (locked, gs_id) {
      this.axios.post(
        "/index/Human_Review/locked",
        {
          jbxx_id: this.$route.query.jbxx_id,
          locked: locked,
          gs_id: gs_id
        },
        data => {
          if (data.status == "success") {
            this.getGsList(1);
            this.getGsList(2);
          } else {
            this.$message.error("操作失败");
          }
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
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
a:link {
  color: #409eff;
  text-decoration: none;
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
    // height: calc(~'100% - 60px');
    background: #f9f9f9;
    .body_header {
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
          min-width: 150px;
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
        .evryone_two {
          height: 28px;
          display: flex;
          flex-direction: row;
          // width: 740px;
          // height: 20px;
          margin-top: 20px;
          font-size: 14px;
          color: #000000;
          .eachOne {
            background-size: 100% 100%;
            width: 250px;
            line-height: 28px;
            height: 28px;
            text-align: center;
            position: relative;
            z-index: 10;
          }
          .eachOne:nth-child(2) {
            z-index: 9;
            left: -30px;
          }
          .eachOne:nth-child(3) {
            z-index: 8;
            left: -55px;
          }
          .eachOne:nth-child(4) {
            z-index: 7;
            left: -82px;
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
      // height: calc(~'100% - 270px');
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
          margin-bottom: 20px;
        }
      }
    }
  }
}
.color_link {
  color: #409eff;
  cursor: pointer;
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
