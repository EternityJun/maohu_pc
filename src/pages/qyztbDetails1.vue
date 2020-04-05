<!--  -->
<template>
  <div class="Details">
    <div v-if="role&&role1" v-loading="roleLoading">
        <header>
          <p id="myID">
            <span class="myherder">  {{basicInfo.xmmc}}</span>
          </p>
          
        </header>
        <section id="section" style="padding-top:20px">
          <el-row>
            <el-col :span="20">
              <div>
                <span>项目名称：</span>
                <span style=" word-break:break-all;">{{basicInfo.xmmc}}</span>
              </div>
              <div style="padding-top:10px" v-if="basicInfo.xmdq">
                <span>项目地区：</span>
                <span>{{basicInfo.xmdq}}</span>
              </div>
              <div style="padding-top:10px" v-if="basicInfo.xmyzdw">
                <span>项目业主：</span>
                <span>{{basicInfo.xmyzdw}}</span>
              </div>
              <div style="padding-top:10px" v-if="basicInfo.zzyq||basicInfo.zzyq_str">
                <span>资质要求：</span>
                <span>{{basicInfo.zzyq_display?basicInfo.zzyq_display:basicInfo.zzyq_str}}</span>
              </div>
            </el-col>
            <el-col :span="4" >
              <div v-if="form.name == 'zj'&&form.share != 1" style="text-align:right">
                <el-radio-group v-model="quanNeiWaiSta" @change="changeQuan">
                  <el-radio-button label="圈内"></el-radio-button>
                  <el-radio-button label="全域"></el-radio-button>
                </el-radio-group>
              </div>
              <div v-else-if="form.name == 'wb'||form.share == 1" style="text-align:right">
                <img style="width:80px;height:80px;margin-top:20px" :src="basicInfo.ssr_avatar" alt />
              </div>
            </el-col>
          </el-row>
          <div style="margin-top:20px">
            <el-tabs v-model="activeName">
              <el-tab-pane label="项目信息" name="first">
                <div v-if="form.name == 'zj'&&form.share != 1">
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="项目名称">
                      <el-input v-model="upaData.xmmc" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="项目地区">
                      <!-- <el-input v-model="upaData.xmdq" clearable></el-input> -->
                      <el-cascader
                        :options="xmdqList"
                        @change="changeListData"
                        style="width:100%"
                        v-model="upaData.xmdqList"
                        clearable
                      ></el-cascader>
                    </el-form-item>
                    <el-form-item label="项目业主">
                      <el-input v-model="upaData.xmyzdw" clearable></el-input>
                    </el-form-item>
                    <div style="width:400px;margin:0 auto; padding-bottom:20px">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox label="资质要求"></el-checkbox>
                        <el-checkbox label="人员要求"></el-checkbox>
                        <el-checkbox label="业绩要求"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                      </el-checkbox-group>
                    </div>
                      <el-form-item v-if="zzyqState&&zzyqStrState" label="资质要求">
                      <el-input  clearable v-model="upaData.zzyq_str"></el-input>
                    </el-form-item>
                    <zzyqSearch
                      v-if="zzyqState"
                      :zzyqList="zzyqList"
                      :zzyq="upaData.zzyq"
                      @changeZZyq="changeZZyq"
                    ></zzyqSearch>
                    <el-form-item v-if="ryyqState" label="人员要求">
                      <el-input type="textarea" clearable v-model="upaData.ryyq"></el-input>
                    </el-form-item>
                    <el-form-item v-if="yjyqState" label="业绩要求">
                      <el-input type="textarea" clearable v-model="upaData.yjyq"></el-input>
                    </el-form-item>
                    <el-form-item type="textarea" v-if="qtyqState" label="其他">
                      <el-input v-model="upaData.qtyq" clearable></el-input>
                    </el-form-item>
                    <div style="width:200px; margin:0 auto 20px;">
                      <el-button @click="ModifyData" type="primary">修改</el-button>
                      <el-button @click="resetData">重置</el-button>
                    </div>
                  </el-form>
                </div>
                <div v-else-if="form.name == 'wb'||form.share == 1">
                  <p v-if="basicInfo.xmmc" style="padding-top:20px">
                    项目名称：
                    {{basicInfo.xmmc}}
                  </p>
                  <p v-if="basicInfo.xmdq" style="padding-top:20px">
                    项目地区：
                    {{basicInfo.xmdq}}
                  </p>
                  <p v-if="basicInfo.xmyzdw" style="padding-top:20px">
                    项目业主：
                    {{basicInfo.xmyzdw}}
                  </p>
                  <p v-if="basicInfo.zzyqText" style="padding-top:20px">
                    项目业主：
                    {{basicInfo.zzyqText}}
                  </p>
                  <p v-if="basicInfo.ryyq" style="padding-top:20px">
                    人员要求：
                    {{basicInfo.ryyq}}
                  </p>
                  <p v-if="basicInfo.yjyq" style="padding-top:20px">
                    业绩要求：
                    {{basicInfo.yjyq}}
                  </p>
                  <p v-if="basicInfo.qtyq" style="padding-top:20px">
                    其他要求：
                    {{basicInfo.qtyq}}
                  </p>
                </div>
              </el-tab-pane>
              <el-tab-pane label="相关企业" name="second">
                <qyZtbXgqyTable ref="table" @addMyXm='addMyXm' :myForm= 'form' :my_pro_type = 'CompanyList.pro_type'></qyZtbXgqyTable>
                 
                <!-- <div style="margin-bottom:20px">
                  <el-row>
                    <el-col :span="16">
                      <el-input
                        clearable
                        placeholder="请输入"
                        @keyup.enter.native="searchXgqyTable"
                        @clear='searchXgqyTable'
                        style="width:300px"
                        v-model="CompanyList.searchXgqy"
                      ></el-input>
                      <el-button @click="searchXgqyTable" type="primary">搜索</el-button>
                      <el-button @click="rserveInput">重置</el-button>
                       <el-select v-model="fxrName" @change="batchChooseFxr" placeholder="请选择">
                        <el-option
                          v-for="item in personList"
                          :key="item.user_id"
                          :label="item.user_name"
                          :value="item.user_id">
                        </el-option>
                      </el-select>
                         <el-button @click="allChooseFxr">批量选择</el-button>
                    </el-col>
                    <el-col :span="8">
                      <div v-if="form.name== 'zj'&&form.share != 1" style=" text-align: right;">
                        <div>
                          <el-radio-group v-model="ownOrOtherAddSta" @change="changeTableT">
                            <el-radio-button label="自己添加企业"></el-radio-button>
                            <el-radio-button label="外部添加企业"></el-radio-button>
                          </el-radio-group>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                
                <div v-if="CompanyList.xgqyBtn">
                  <el-table
                    :data="CompanyList.data"
                    v-loading="CompanyList.loading"
                     @selection-change="selectionFxr"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      align="center"
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column label="序号" type="index" align="center" width="60">
                      <template slot-scope="scope">{{scope.$index+(CompanyList.page-1)*10+1}}</template>
                    </el-table-column>
                    <el-table-column prop="qymc" label="企业名称" align="center" min-width="250">
                      <template slot-scope="scope">
                        <p
                          style="color:#409efe;cursor: pointer;"
                          @click="openGs(scope.row)"
                        >{{scope.row.qymc}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column label="找到我" align="center" min-width="220">
                      <template slot-scope="scope">
                        <lookMe :key="scope.$index+(CompanyList.page-1)*10+1" :arr="scope.row" ></lookMe>
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-if="form.name =='zj'&&form.share != 1"
                      align="center"
                      label="分析人"
                      min-width="80"
                    >
                      <template slot-scope="scope">
                        <span v-if="scope.row.status != 0">
                          {{scope.row.analyst_name?scope.row.analyst_name:'/'}}
                        </span>
                        <span
                          v-else-if="!scope.row.analyst_name || scope.row.analyst_name =='分析人'"
                          class="txtColor"
                          @click="dialogVisibleFxrChoose= true;chooseAnalyst(scope.row)"
                        >选人</span>
                        <span
                          v-else-if="scope.row.analyst_name"
                          class="txtColor1"
                          @click="dialogVisibleFxrChoose= true;chooseAnalyst(scope.row)"
                        >{{scope.row.analyst_name}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center" min-width="90">
                      <template slot-scope="scope" v-if="form.name =='zj'&&form.share != 1">
                        <span
                          v-if="scope.row.status == 1"
                          :class="throughYes1"
                          @click="xgqyThrough(scope.row)"
                        ></span>
                        <span
                          v-if="scope.row.status == 2"
                          :class="throughNo2"
                          @click="xgqyThroughNo(scope.row)"
                        ></span>
                        <span v-if="scope.row.status == 0">/</span>
                      </template>
                      <el-table-column
                        v-if="form.name =='wb'||form.share == 1"
                        label="通过"
                        align="center"
                        min-width="90"
                      >
                        <template slot-scope="scope">
                          <span
                            :class="scope.row.status == 1?throughYes:throughNo"
                            @click="xgqyThrough(scope.row)"
                          ></span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="form.name =='wb' ||form.share == 1"
                        label="不通过"
                        align="center"
                        min-width="90"
                      >
                        <template slot-scope="scope">
                          <span
                            :class="scope.row.status == 2?throughNo2:throughNo1"
                            @click="xgqyThroughNo(scope.row)"
                          ></span>
                        </template>
                      </el-table-column>
                    </el-table-column>
                      <el-table-column label="请求状态" align="center" min-width="80">
                      <template slot-scope="scope" >
                        <span
                       
                        >{{scope.row.coop_status}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="150">
                      <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="openJzdsfxwb(scope.row)">查看</el-button>
                        <el-button
                          type="danger"
                          @click="delateXgqy(scope.row)"
                          size="mini"
                          v-if="scope.row.edit == 1"
                        >删除</el-button>
                        <el-button
                          type="danger"
                          @click="delateXgqy(scope.row)"
                          size="mini"
                          disabled
                          v-if="scope.row.edit != 1"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    background
                    @current-change="handleCurrentChangeXgqy"
                    :current-page.sync="CompanyList.page"
                    layout="total, prev, pager, next"
                    :total="CompanyList.count||0"
                  ></el-pagination>
                  <div id="add">
                    <span
                      style="color:#33cc33;font-size:60px;margin-bottom:20px"
                      @click="openAdd"
                      class="el-icon-circle-plus"
                    ></span>
                  </div>
                </div>
                <div v-else-if="!CompanyList.xgqyBtn&&form.name =='zj'">
                  <el-table
                    :data="CompanyList.data1"
                    v-loading="CompanyList.loading1"
                    border
                    style="width: 100%"
                  >
                    <el-table-column label="序号" type="index" align="center" width="60">
                      <template slot-scope="scope">{{(scope.$index+1)+(CompanyList.page1-1)*10}}</template>
                    </el-table-column>
                    <el-table-column prop="qymc" label="企业名称" align="center" min-width="250">
                      <template slot-scope="scope">
                        <p
                          style="color:#409efe;cursor: pointer;"
                          @click="openGs(scope.row)"
                        >{{scope.row.qymc}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column label="找到我" align="center" min-width="220">
                      <template slot-scope="scope">
                        <lookMe :key="new Date().getTime()" :arr="scope.row"></lookMe>
                      </template>
                    </el-table-column>
                    <el-table-column label="添加人" align="center" min-width="80">
                      <template slot-scope="scope">
                        <span class="txtColor">{{scope.row.add_user_name}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center" min-width="180">
                      <template slot-scope="scope" v-if="form.name =='zj'">
                        <span
                          v-if="scope.row.status == 1"
                          :class="throughYes1"
                          @click="xgqyThrough(scope.row)"
                        ></span>
                        <span
                          v-if="scope.row.status == 2"
                          :class="throughNo2"
                          @click="xgqyThroughNo(scope.row)"
                        ></span>
                        <span v-if="scope.row.status == 0">/</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="请求状态" align="center" min-width="80">
                        <template slot-scope="scope" >
                          <span
                        
                          >{{scope.row.coop_status}}</span>
                        </template>
                      </el-table-column>
                    <el-table-column label="操作" align="center" width="150">
                      <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="openJzdsfxwb(scope.row)">查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    background
                    @current-change="handleCurrentChangeXgqy1"
                    :current-page="CompanyList.page1"
                    :page-size="CompanyList.rows1"
                    layout="total, prev, pager, next"
                    :total="CompanyList.count1||0"
                  ></el-pagination>
                </div> -->
              </el-tab-pane>
              <el-tab-pane label="公开信息" name="third">
                <el-table :data="pubList.data" v-loading="pubList.loading" style="width: 100%">
                  <el-table-column label="序号" align="center" type="index" width="60">
                    <template slot-scope="scope">{{(scope.$index+1)+(pubList.page-1)*10}}</template>
                  </el-table-column>
                  <el-table-column label="项目名称" align="center" prop="xmmc" min-width="280">
                    <template slot-scope="scope">
                      <p v-if="!scope.row.state">{{ scope.row.xmmc }}</p>
                      <el-input
                        placeholder="请输入"
                        type="textarea"
                        clearable
                        v-if="scope.row.state"
                        v-model="scope.row.xmmc"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="xmdq" clearable align="center" label="项目地区" min-width="180">
                    <template slot-scope="scope">
                      <p v-if="!scope.row.state">{{ scope.row.xmdq }}</p>
                      <!-- <el-input  v-if="scope.row.state" v-model="upaData.xmdq" clearable></el-input> -->
                      <el-cascader
                        v-if="scope.row.state"
                        :options="xmdqList"
                        @change="changeListData"
                        placeholder="请选择"
                        style="width:100%"
                        v-model="scope.row.xmdq"
                        clearable
                      ></el-cascader>
                      <!-- <el-input clearable v-model="scope.row.xmdq"></el-input> -->
                    </template>
                  </el-table-column>
                  <el-table-column prop="xmyz" align="center" label="项目业主" min-width="180">
                    <template slot-scope="scope">
                      <p v-if="!scope.row.state">{{ scope.row.xmyz }}</p>
                      <el-input
                        v-if="scope.row.state"
                        placeholder="请输入"
                        clearable
                        v-model="scope.row.xmyz"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="created" align="center" label="上传时间" min-width="100">
                    <template slot-scope="scope">
                      <p>{{scope.row.created}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="详细内容" align="center" min-width="180">
                    <el-table-column prop="txt" align="center" label="文本" min-width="50">
                      <template slot-scope="scope">
                        <p v-if="!scope.row.state">
                          <span
                            v-if="scope.row.txt"
                            :class="scope.row.txt?' pointer_finish1':'pointer1'"
                            @click="scope.row.txt?dialogVisibleTxtInput=true:'';getTxtData1(scope.row)"
                          >文本</span>
                        </p>
                        <p v-if="scope.row.state">
                          <span
                            :class="dialogVisibleInputColor===true?' pointer_finish1':'pointer1'"
                            @click=" dialogVisibleInput = true;getTxtData(scope.row)"
                          >{{ scope.row.txt1 }}</span>
                        </p>
                        <!-- <p v-else>
                          <span
                            :class="dialogVisibleInputColor===true?' pointer_finish1':'pointer1'"
                            @click=" dialogVisibleInput = true;getTxtData(scope.row)"
                          >编辑</span>
                        </p>-->
                      </template>
                    </el-table-column>
                    <el-table-column prop="txt" align="center" label="关联" min-width="100">
                      <template slot-scope="scope">
                        <p v-if="!scope.row.state">
                          <span
                            v-if="scope.row.zbxx_id"
                            :class="scope.row.zbxx_id?' pointer_finish1':'pointer1'"
                            @click="openToNbUrl(scope.row)"
                          >本地</span>
                          <span
                            v-if="scope.row.url"
                            :class="scope.row.url?' pointer_finish1':'pointer1'"
                            @click="openToWbUrl(scope.row)"
                          >外部</span>
                        </p>
                        <p v-if="scope.row.state">
                          <span
                            :class="dialogVisibleInput2Color===true?' pointer_finish1':'pointer1'"
                            @click="dialogVisibleInput2=true;getUrlData(scope.row)"
                          >{{ scope.row.txt2 }}</span>
                        </p>
                        <!-- <p v-else>
                          <span
                            :class="dialogVisibleInput2Color===true?' pointer_finish1':'pointer1'"
                            @click="dialogVisibleInput2=true;getUrlData(scope.row)"
                          >编辑</span>
                        </p>-->
                      </template>
                    </el-table-column>
                    <el-table-column prop="txt" align="center" label="文件" min-width="50">
                      <template slot-scope="scope">
                        <p v-if="!scope.row.state">
                          <span
                            :class="scope.row.file?' pointer_finish1':'pointer1'"
                            @click="scope.row.edit == 1?dialogVisibleUpdata=true:'';getFileData(scope.row,1)"
                          >附件</span>
                        </p>
                        <p v-if="scope.row.state">
                          <span
                            :class="dialogVisibleUpdataColor===true?' pointer_finish1':'pointer1'"
                            @click="dialogVisibleUpdata=true;getFileData(scope.row)"
                          >{{ scope.row.txt3 }}</span>
                        </p>

                        <!-- <p v-else>
                          <span

                            class="pointer1"
                            @click="scope.row.file?dialogVisibleUpdata=true:'';getFileData(scope.row,1)"
                          >编辑</span>
                        </p>-->
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column prop="scr" align="center" label="上传人" min-width="100">
                    <template slot-scope="scope">
                      <img :src="scope.row.avatar"  style="height:30px;width:30px;border-radius:15px;" alt />
                    </template>
                  </el-table-column>
                  <el-table-column label="操作 " align="center" min-width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        v-if="scope.row.state"
                        @click="saveGkxxData(scope.row)"
                      >保存</el-button>
                      <el-button
                        size="mini"
                        v-if="scope.row.state"
                        @click="cancelSaveData(scope.row)"
                      >取消</el-button>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="dialogVisibleUpDataGkxx = true ;upDataGkxx(scope.row);"
                        v-if="scope.row.edit == 1"
                      >修改</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="delateGkxx(scope.row)"
                        v-if="scope.row.edit == 1"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  background
                  @current-change="handleCurrentChangeGkxx"
                  :current-page="pubList.page"
                  :page-size="pubList.rows"
                  layout="total, prev, pager, next"
                  :total="pubList.count||0"
                ></el-pagination>
                <div id="add">
                  <span
                    style="color:#33cc33;font-size:60px;margin-bottom:20px"
                    @click="addTableRow"
                    class="el-icon-circle-plus"
                  ></span>
                </div>
              </el-tab-pane>
              <el-tab-pane v-if="form.name == 'zj'&&form.share != 1&&basicInfo.role == '圈内'" label="权限" name="fourth">
                   <el-table
                    border
                    :data="roleData"
                    style="width: 100%;margin-bottom:20px">
                    <el-table-column
                      align="center"
                      type="index"
                      label="序号"
                      width="60"
                     >
                       <template slot-scope="scope">{{scope.$index+1}}</template>
                    </el-table-column>
                    <el-table-column
                    align="center"
                      prop="user_name"
                      label="人员名称"
                      >
                    </el-table-column>
                    <el-table-column
                    align="center"
                      prop="cellphone"
                      label="电话号码"
                      >
                    </el-table-column>
                    <el-table-column
                    align="center"
                      prop="role"
                      width="200"
                      label="状态">
                      <!-- <template slot-scope="scope">
                            <el-button :type="scope.row.role == 1?'primary':''" size='mini'  @click.native="changeBtnState(scope.row,'通过')">通过</el-button>
                            <el-button :type="scope.row.role == 0?'primary':''" size='mini' @click.native="changeBtnState(scope.row,'不通过')">不通过</el-button>
                      </template> -->
                       <!-- <el-table-column align="center" label="通过"     width="100">
                        <template slot-scope="scope">
                          <span
                            @click="changeBtnState(scope.row,'通过')"
                            :class="scope.row.role == 1?roleThroughYes:roleYes"
                          ></span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="不通过" width="100">
                        <template slot-scope="scope">
                          <span
                            :class="scope.row.role == 0?roleThroughNo:roleNo"
                            @click="changeBtnState(scope.row,'不通过')"
                          ></span>
                        </template>
                      </el-table-column> -->
                      <template slot-scope="scope">
                          <span
                            @click="changeBtnState(scope.row)"
                            :class="scope.row.role == 1?roleThroughYes:roleYes"
                          ></span>
                        </template>
                    </el-table-column>
                  </el-table>
              </el-tab-pane>
              <el-tab-pane label="留言" name="five">
                <div>
                  <div v-if="LeaveMessage.data !='暂无留言内容'">
                    <div>
                      共
                      <span style="color:#499efe">{{LeaveMessage.total}}</span>条评论
                    </div>
                    <div
                      style="height:100px;margin:20px 0 0 20px"
                      v-for="item in LeaveMessage.data"
                      :key="item.id"
                    >
                      <div style="display:flex;margin-bottom:10px">
                        <div>
                          <img style="height:50px;width:50px;border-radius:25px;" :src="item.headimgurl" alt />
                        </div>
                        <div>
                          <div style="display:flex">
                            <p
                              style="height:20px;line-height:20px;color:#969696;margin-left:10px"
                            >{{item.sender_name}}</p>
                            <p
                              v-if="item.gsmc"
                              style="height:20px;line-height:20px;color:#969696;margin-left:10px;font-size:12px;"
                            >{{item.gsmc}}</p>
                          </div>

                          <p
                            style="height:20px;line-height:20px;color:#969696;margin-left:10px"
                          >{{item.modified}}</p>
                        </div>
                        <div>
                          <span
                          v-if="item.sender == user_id"
                            @click="deleteLeaveWords(item)"
                            class="el-icon-delete"
                            style="font-size:16px;cursor: pointer;color:#beb2b5;margin-left:10px;"
                          ></span>
                        </div>
                      </div>
                      <div>
                        <p style="margin:10px 10px 10px 60px">{{item.content}}</p>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div>暂无留言内容</div>
                  </div>
                  <div style="margin-top:50px;  text-align: right;">
                    <el-input
                      type="textarea"
                      clearable
                      v-model="LeaveMessage.concent"
                      maxlength="100"
                      placeholder="输入内容"
                    ></el-input>
                    <div style="width:100%;text-align:center;">
                      <el-button style="margin:20px 0" @click="submitMsg" type="primary">提交</el-button>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </section>
    </div>
    <div v-else>
      <p style="text-align:center;font-size:18px;height:500px;line-height:500px">
        请联系项目请求人！设置你的权限
      </p>
      <div style="text-align:center">
        <el-button type="primary"  @click="backIndex">返回首页</el-button>
      </div>
      
    </div>

    <!-- 添加弹框 -->
    <el-dialog width="80%" :visible.sync="dialogTableVisible">
      <el-tabs v-model="activeName1" @change="clearSelect" style="margin-top:-30px">
        <el-tab-pane label="企业列表" name="first">
          <div style="   margin-bottom: 20px;">
            <el-row>
              <el-col :span="5">
                <el-input
                  v-model="CompanyList.qylbInput"
                  placeholder="请输入"
                  clearable
                  @keyup.enter.native="qylbSearch"
                  @clear='qylbSearch'
                  style="width:300px"
                ></el-input>
              </el-col>
              <el-col :span="14">
                <div>
                  <el-button @click="qylbSearch(1)" type="primary">搜索</el-button>
                  <el-button @click="qylbClear">重置</el-button>
                  <el-button @click="plChoose()" type="primary">批量操作</el-button>
                </div>
                 <!-- <el-radio-group v-model="radio1">
                    <el-radio-button label="上海"></el-radio-button>
                    <el-radio-button label="北京"></el-radio-button>
                  </el-radio-group> -->
              </el-col>
            </el-row>
          </div>
          <!-- v-loading ="CompanyList.qylbLoading" -->
          <el-table
            border
            ref="multipleTable"
            v-loading="CompanyList.qylbLoading"
            :data="CompanyList.tableData"
            tooltip-effect="dark"
            @row-dblclick="chooseXgqyTable"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" :selectable="disabledCheck"></el-table-column>
            <el-table-column type="index" label="序号" align="center" width="60">
              <template slot-scope="scope">{{scope.$index+(CompanyList.qylPage-1)*10+1}}</template>
            </el-table-column>
            <el-table-column label="企业名称" align="center" prop="company_name" min-width="200">
              <template slot-scope="scope">
                <p
                  style="color:#409efe;cursor: pointer;"
                  @click="openGs(scope.row,2)"
                >{{scope.row.company_name}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="legal_person" align="center" label="法人代表" min-width="120"></el-table-column>

            <el-table-column
              prop="area"
              align="center"
              label="所属地区"
              min-width="80"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="social_code" align="center" label="统一社会信用代码" min-width="120"></el-table-column>
            <el-table-column label="找到我" align="center" min-width="180">
              <template slot-scope="scope">
                <lookMe :key="new Date().getTime()" :arr="scope.row" :off="true" :tkShow='true'   :showTxt = 'showTxt'></lookMe>
              </template>
            </el-table-column>
            <el-table-column prop="name" align="center" label="操作" min-width="80">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  v-if="scope.row.status == '0'"
                  @click="chooseXgqyTable(scope.row)"
                >选择</el-button>
                <el-button v-else disabled size="mini" type="primary">已选择</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <span>共计找到符合条件的记录数：<span class="link_color">{{CompanyList.qylbTotal}}</span>条，请输入更多信息进行查询</span> -->
          <!-- <el-pagination ref="fenye" style="margin-top:20px" @current-change="handleCurrentChangeQylb" align="right" background layout="total,prev, pager, next" :total="swtotle"></el-pagination> -->
          <div class="block">
            <el-pagination
              background
              @current-change="handleCurrentChangeQylb"
              :current-page="CompanyList.qylPage"
              :page-size="CompanyList.qylbRows"
              layout="total, prev, pager, next"
              :total="CompanyList.qylbCount||0"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="资质选择" name="second">
          <el-form>
            <el-row>
              <el-col :span="6">
                <el-form-item label="资质选择">
                  <el-input @click.native="show_components()" placeholder="请选择" style="width:300px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <div>
                  <el-button @click="zzplChoose()" type="primary">批量操作</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <el-row  class="zzyqTj" v-if='"1"'>
            <span class="zzyqTjHeader">条件</span>
            <div
              v-for="(item,index) in zzyqArr1"
              :key="index"
              style="color: #606266;font-size: 14px;margin-top:10px;"
            >
              <el-col :span="8" >
                <p>{{index}}</p>
                <div style="margin:2px 0 0 10px;color: #888;" v-for="(tt,i) in item" :key="i">
                  <div v-if="tt">
                      <p v-for="(it,ix) in tt" :key="ix">{{ix}}<span class="el-icon-close" @click="onClear(it,ix)"></span></p>
                  </div>
                </div>
              </el-col>
            </div>
          </el-row>
          <div v-else>
            <p>还没有选择资质点击上方输入框选择</p>
          </div>
          <el-table
            :data="zzyqChooseListArray"
            v-loading="zzyqChooseLoading"
            @row-dblclick="chooseXgqyTable1"
            @selection-change="handleSelectionChange1"
            border
            style="width: 100%;margin-top:20px;"
          >
            <el-table-column type="selection" width="55" :selectable="disabledCheck"></el-table-column>
            <el-table-column type="index" align="center" label="序号" width="60">
              <template
                slot-scope="scope"
              >{{(scope.$index+1)+(zzyqChooseListPage-1)*zzyqChooseListRows}}</template>
            </el-table-column>
            <el-table-column prop="company_name" align="center" label="公司名称" min-width="220">
              <template slot-scope="scope">
                <p
                  style="color:#409efe;cursor: pointer;"
                  @click="openGs(scope.row,2)"
                >{{scope.row.company_name}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="legal_person" align="center" label="法人代表" min-width="100"></el-table-column>
            <el-table-column prop="area" align="center" label="所属地区" min-width="80"></el-table-column>
            <el-table-column prop="social_code" align="center" label="统一社会信用代码" min-width="180"></el-table-column>
            <el-table-column align="center" label="找到我" min-width="180">
              <template slot-scope="scope">
                <lookMe :key="new Date().getTime()" :arr="scope.row" :off="true" :tkShow='true'   :showTxt = 'showTxt'></lookMe>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="80">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="zzyqSave(scope.row)"
                  v-if="scope.row.status == '0'"
                >选择</el-button>
                <el-button v-else disabled size="mini" type="primary">已选择</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @current-change="handleCurrentChangezzyqList"
            :current-page="zzyqChooseListPage"
            layout="total,prev, pager, next"
            :page-size="zzyqChooseListRows"
            :total="zzyqChooseListCount||0"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- //是否通过 -->

    <el-dialog :title="CompanyList.selectData.qymc" :visible.sync="dialogTableVisible1" >
      <div v-if="CompanyList.selectData.status == 1" class="myTkHeader" style="margin-top:-30px">
        <!-- <div v-for="item in CompanyList.selectMsgData" :key="item.gs_id"> -->
        <div v-if="CompanyList.selectMsgData">
          <div style="height:100px">
            <div style="height:30px;line-height:30px;display:flex;margin-bottom:20px">
              <img style="height:30px;width:30px;border-radius:15px;" :src="CompanyList.selectMsgData.avatar" alt />
              <p
                style="height:30px;line-height:30px;color:#b79bd5;margin-left:10px"
              >{{CompanyList.selectMsgData.user_name}}</p>
              <p
                style="height:30px;line-height:30px;color:#b79bd5"
              >({{CompanyList.selectMsgData.modified}})</p>
            </div>
            <div>
              <p style="margin:0 0 20px 50px">{{CompanyList.selectMsgData.words}}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="height:100px">
            <div style="height:30px;line-height:30px;display:flex;margin-bottom:20px"></div>
            <div>
              <p style="margin:0 0 20px 50px">没有留言</p>
            </div>
          </div>
        </div>
        <!-- <div v-else style="height:100px;line-height:100px;text-aglin:center;">主人很懒！ 什么都没有留下</div> -->
      </div>
      <!-- </div> -->
      <div class="Tkfooter" v-if="form.name != 'zj'||form.share == 1" >
        <el-input type="textarea" clearable v-model="CompanyList.words" placeholder="请输入"></el-input>
        <div style="text-align:center;margin-top:20px">
          <el-button type="danger" @click="cancelTg1">取消</el-button>
          <el-button @click="throughXm" type="success">通过</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog :title="CompanyList.selectData.qymc" :visible.sync="dialogTableVisible2">
      <div v-if="CompanyList.selectData.status == 2" class="myTkHeader" style="margin-top:-30px">
        <div v-if="CompanyList.selectMsgData">
          <div style="height:100px">
            <div style="height:30px;line-height:30px;display:flex;margin-bottom:20px">
              <img style="height:30px;width:30px;border-radius:15px;" :src="CompanyList.selectMsgData.avatar" alt />
              <p
                style="height:30px;line-height:30px;color:#b79bd5;margin-left:10px"
              >{{CompanyList.selectMsgData.user_name}}</p>
              <p
                style="height:30px;line-height:30px;color:#b79bd5"
              >({{CompanyList.selectMsgData.modified}})</p>
            </div>
            <div>
              <p style="margin:0 0 20px 50px">{{CompanyList.selectMsgData.words}}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="height:100px">
            <div style="height:30px;line-height:30px;display:flex;margin-bottom:20px"></div>
            <div>
              <p style="margin:0 0 20px 50px">没有留言</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-else style="height:100px;line-height:100px;text-aglin:center;">主人很懒！ 什么都没有留下</div> -->
      <div class="Tkfooter" v-if="form.name != 'zj'||form.share == 1">
        <el-input type="textarea" clearable v-model="CompanyList.words" placeholder="请输入"></el-input>
        <div style="text-align:center;margin-top:20px">
          <el-button @click="cancelTg2" type="danger">取消</el-button>
          <el-button @click="throughXmNo" type="primary">不通过</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 文本编辑对话框 -->
    <el-dialog title="详细内容" :close-on-click-modal="BooleanData" :visible.sync="dialogVisibleInput">
      <div style="margin-top:-30px">
        <el-input
          type="textarea"
          clearable
          v-model="fujianTxt"
          :autosize="{ minRows:25,maxRows:25}"
          placeholder="请输入"
          show-word-limit
        ></el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleInput = false">取 消</el-button>
        <el-button type="primary" @click="dialogClickOver(1) ">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="详细内容" :visible.sync="dialogVisibleTxtInput">
      <p
      
        style="margin:-30px auto 0;overflow:auto;height:500px;padding:5px 15px;border:1px solid #dcdfe6;border-radius:5px;"
        v-html="shoufujianTxt"
      >{{shoufujianTxt}}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleTxtInput = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 链接编辑对话框 -->
    <el-dialog :close-on-click-modal="BooleanData" :visible.sync="dialogVisibleInput2" width="90%">
      <div   style="margin-top:-30px">
        <h3 style="margin:10px;">
          网络连接关联
          <span style="font-size:12px">(输入url)</span>
        </h3>
        <div style="width:100%;panding:0 20px">
          <el-input placeholder="请输入内容" clearable v-model="GkxxUrl"></el-input>
        </div>

        <div style="width:100%;text-align:center;margin-top:10px">
          <el-button type="primary" @click="openWbUrl()">访问</el-button>
        </div>
      </div>
      <div >
        <h3 style="margin:10px;">本地连接关联</h3>
      </div>
      <div style="padding:0 20px">
        <!-- <div v-if="types == '匹配列表'" style="padding-bottom:20px">
                  <span>匹配名称:</span>
                  <span style="font-weight:bold">{{row.xmmc}}</span>
        </div>-->
        <el-form inline ref="form1" :model="searchData" @submit.native.prevent>
          <el-form-item label="项目名称" prop="xmmc">
            <el-input
              style="width:400px"
              @keyup.enter.native="onSearch1"
                 @clear='onSearch1'
              v-model="searchData.xmmc"
              placeholder="输入项目名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="招标类别" prop="zblb">
            <el-select v-model="searchData.zblb" clearable style="width:400px">
              <el-option v-for="one in zblblist" :key="one" :value="one" :label="one"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目类别" prop="xmlb">
            <el-select v-model="searchData.xmlb" clearable @change="onSearch1" style="width:400px">
              <el-option
                v-for="one in xmlblist"
                :key="one.label"
                :value="one.value"
                :label="one.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form inline ref="form2" :model="searchData" @submit.native.prevent>
          <el-form-item label="所属地区" prop="area">
            <el-select v-model="searchData.area" clearable style="width:400px">
              <el-option
                v-for="one in this.ssdqList"
                :key="one.value"
                :value="one.value"
                :label="one.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布日期" prop="date">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="searchData.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:400px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch1">搜索</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tablaData" v-loading="loading" border>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(searchData.page-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="bt" label="项目名称" align="center">
            <template slot-scope="scope">
              <div
                v-html="scope.row.bt"
                class="link_color"
                @click="openGs(scope.row)"
              >{{scope.row.bt}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="ssd" label="建设地点" align="center">
            <template slot-scope="scope">
              <div v-html="scope.row.ssd"></div>
            </template>
          </el-table-column>
          <el-table-column prop="zblb" label="招标类别" align="center" width="90">
            <template slot-scope="scope">
              <div v-html="scope.row.zblb"></div>
            </template>
          </el-table-column>
          <el-table-column prop="fbsj" align="center" label="发布日期" width="120">
            <template slot-scope="scope">
              <div v-html="scope.row.fbsj"></div>
            </template>
          </el-table-column>
          <el-table-column prop="jzrq" label="报名截止日期" align="center" width="120">
            <template slot-scope="scope">
              <div v-html="scope.row.jzrq"></div>
            </template>
          </el-table-column>
          <el-table-column prop="tb_jzrq" label="投标截止日期" align="center" width="120">
            <template slot-scope="scope">
              <div v-html="scope.row.tb_jzrq"></div>
            </template>
          </el-table-column>
          <el-table-column label="导入" width="100" align="center">
            <template slot-scope="scope">
              <el-button
                disabled
                v-if="scope.row.selectName == '已关联'"
                style="color:#d1d1d1"
                size="mini"
              >已关联</el-button>
              <el-button
                v-if="scope.row.selectName == '关联'"
                size="mini"
                @click="onClick_import(scope)"
              >关联</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          ref="fenye"
          style="margin-top:20px"
          @current-change="handleSizeChange"
          align="right"
          background
          layout="total,prev, pager, next"
          :total="total||0"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleInput2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogClickOver(2) ">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 文件上传对话框 -->
    <el-dialog title="上传附件" :visible.sync="dialogVisibleUpdata">
      <el-form ref="tableXmForm" label-width="120px" @submit.native.prevent   style="margin-top:-30px"> 
        <el-form-item label="招标文件附件">
          <el-upload
            class="upload-demo"
            :action="updateUrl"
            :data="updateData"
            :limit="3"
            :on-success="handleChange_zbwj"
            :on-remove="uploadRemove_zbwj"
            :file-list="fileList.zbwj"
            :on-preview="openFile"
          >
            <el-button size="small" @click="dialogVisibleUpdataColor=true" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <div style="width:100%;text-align:center">
          <el-button v-if="this.upDataFile.num" size="small" @click="upFlie" type="primary">修改</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 下拉 弹框  选择分析人 -->

    <el-dialog title="分析人选择" :visible.sync="dialogVisibleFxrChoose" width="60%">
      <div v-if="CompanyList.selectRList != ''"   style="margin-top:-30px">
        <h3>推荐人</h3>
        <div class="choosePerson" style="display:flex">
          <p>
            <span>姓名:</span>
          </p>
          <div style="width:20%;text-align: center;">{{CompanyList.selectRList[0].user_name}}</div>
          <div style="width:50%;margin:  0 30px">
            <span v-if="!CompanyList.selectRList[0].path">
              <img
                v-if="CompanyList.selectRList[0].avatar"
                :src="CompanyList.selectRList[0].avatar"
               style="height:30px;width:30px;border-radius:15px;margin-left: 10px;"
                alt
              />
              <span v-else>请提高你的圈成文化</span>
            </span>
            <span v-else>
              <lookMe
                :key="new Date().getTime()"
                v-if="CompanyList.selectRList[0].path"
                :arr="CompanyList.selectRList[0]"
                :off="true"
              ></lookMe>
            </span>
          </div>
          <!-- <div style="width:10%;text-align: center;" @click="chooseFxr(CompanyList.selectRList[0])">
            <el-radio v-model="radio" label="0">选择</el-radio>
          </div>-->
          <el-button
            v-if="!CompanyList.selectRList[0].choice"
            type="primary"
            size="mini"
            @click="chooseFxr(CompanyList.selectRList[0])"
          >选择</el-button>
          <el-button v-else type="primary" size="mini" disabled>已选</el-button>
        </div>
        <h3>可选人员</h3>
        <div v-for=" (item,index) in CompanyList.selectRList" :key="index">
          <div v-if="CompanyList.selectRList.length >1">
            <div v-if="index != 0" style="display:flex" class="choosePerson">
              <p>
                <span>姓名:</span>
              </p>
              <div style="width:20%;text-align: center;">{{item.user_name}}</div>
              <div style="width:50%;margin:  0 30px;">
                <span v-if="!item.path">
                  <img
                    v-if="item.avatar"
                    :src="item.avatar"
                     style="height:30px;width:30px;border-radius:15px;margin-left:10px"
                    alt
                  />
                  <span v-else>请提高你的圈成文化</span>
                </span>
                <span v-else>
                  <lookMe :key="new Date().getTime()" v-if="item.path" :arr="item" :off="true"></lookMe>
                </span>
              </div>
              <el-button v-if="!item.choice" type="primary" size="mini" @click="chooseFxr(item)">选择</el-button>
              <el-button v-else type="primary" size="mini" disabled>已选</el-button>
            </div>

            <!-- <div style="width:10%;text-align: center;" @click="chooseFxr(item)">
              <el-radio v-model="radio" :label= "index">选择</el-radio>

            </div>-->
          </div>
          <div v-else>
            <p style="width:100%;text-align:center;height:200px;line-height:200px">没有人员可供选择</p>
          </div>
        </div>
      </div>
      <div v-else   style="margin-top:-30px">
        <p class="fxrChoose link_color" @click="backFxr ">没有人员可供选择</p>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleFxrChoose = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleFxrChoose = false;chooseFxr()">确 定</el-button>
      </span>-->
    </el-dialog>

    <el-dialog
      class="search_tk"
      title="资质选择"
      width="900px"
      @close="hide_components()"
      :visible.sync="centerDialogVisible"
    >
      <zz-search    v-if="centerDialogVisible" @onSearch="onSearch" :key="new Date().getTime()" ></zz-search>
    </el-dialog>

    <!-- 修改公开信息 -->
    <el-dialog :close-on-click-modal="BooleanData" :visible.sync="dialogVisibleUpDataGkxx" width="80%">
      <el-tabs v-model="activeName2"   style="margin-top:-30px">
        <el-tab-pane label="基本信息" name="first">
          <el-form ref="form" :model="upDataForm" label-width="100px">
            <el-form-item label="项目名称">
              <el-input v-model="upDataForm.xmmc" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="项目地区">
              <el-cascader
                :options="xmdqList"
                @change="changeListData"
                style="width:100%"
                v-model="upDataForm.xmdqList"
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item label="项目业主">
              <el-input v-model="upDataForm.xmyz" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="外部链接(url)">
              <el-input v-model="upDataForm.wbUrl" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="文本">
              <el-input
                type="textarea"
                clearable
                v-model="upDataForm.txt"
                :autosize="{ minRows: 15,maxRows:15}"
                placeholder="请输入"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="关联" name="second">
          <el-form inline ref="form1" :model="searchData" @submit.native.prevent>
            <el-form-item label="项目名称" prop="xmmc">
              <el-input
                style="width:400px"
                @keyup.enter.native="onSearch1"
                @clear='onSearch1'
                v-model="searchData.xmmc"
                placeholder="输入项目名称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="招标类别" prop="zblb">
              <el-select v-model="searchData.zblb" clearable style="width:400px">
                <el-option v-for="one in zblblist" :key="one" :value="one" :label="one"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目类别" prop="xmlb">
              <el-select
                v-model="searchData.xmlb"
                clearable
                @change="onSearch1"
                style="width:400px"
              >
                <el-option
                  v-for="one in xmlblist"
                  :key="one.label"
                  :value="one.value"
                  :label="one.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form inline ref="form2" :model="searchData" @submit.native.prevent>
            <el-form-item label="所属地区" prop="area">
              <el-select v-model="searchData.area" clearable style="width:400px">
                <el-option
                  v-for="one in this.ssdqList"
                  :key="one.value"
                  :value="one.value"
                  :label="one.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布日期" prop="date">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="searchData.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width:400px"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch1">搜索</el-button>
              <el-button @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tablaData" v-loading="loading" border>
            <el-table-column label="序号" width="60" align="center">
              <template slot-scope="scope">{{scope.$index+(searchData.page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="bt" label="项目名称" align="center">
              <template slot-scope="scope">
                <div
                  v-html="scope.row.bt"
                  class="link_color"
                  @click="openGs(scope.row)"
                >{{scope.row.bt}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="ssd" label="建设地点" align="center">
              <template slot-scope="scope">
                <div v-html="scope.row.ssd"></div>
              </template>
            </el-table-column>
            <el-table-column prop="zblb" label="招标类别" align="center" width="90">
              <template slot-scope="scope">
                <div v-html="scope.row.zblb"></div>
              </template>
            </el-table-column>
            <el-table-column prop="fbsj" align="center" label="发布日期" width="120">
              <template slot-scope="scope">
                <div v-html="scope.row.fbsj"></div>
              </template>
            </el-table-column>
            <el-table-column prop="jzrq" label="报名截止日期" align="center" width="120">
              <template slot-scope="scope">
                <div v-html="scope.row.jzrq"></div>
              </template>
            </el-table-column>
            <el-table-column prop="tb_jzrq" label="投标截止日期" align="center" width="120">
              <template slot-scope="scope">
                <div v-html="scope.row.tb_jzrq"></div>
              </template>
            </el-table-column>
            <el-table-column label="导入" width="100" align="center">
              <template slot-scope="scope">
                <el-button
                  disabled
                  v-if="scope.row.selectName == '已关联'"
                  style="color:#d1d1d1"
                  size="mini"
                >已关联</el-button>
                <el-button
                  v-if="scope.row.selectName == '关联'"
                  size="mini"
                  @click="onClick_import1(scope)"
                >关联</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            ref="fenye"
            style="margin-top:20px"
            @current-change="handleSizeChange"
            align="right"
            background
            layout="total,prev, pager, next"
            :total="total||0"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <div style="width:100%;text-align:center">
          <el-button type="primary" @click="dialogVisibleFxrChoose = false;sureUpDataGkxx()">修 改</el-button>
          <!-- <el-button @click="dialogVisibleFxrChoose = false">取 消</el-button> -->
        </div>
      </span>
    </el-dialog>

    <div id="share">
      <el-button type="primary" icon="el-icon-share" size="mini">分享</el-button>
      <share v-if="getCutUrlKey" :config="config" ></share>
    </div>
    <div id="share1">
      <el-button type="primary"   style="font-size:12px;width:73px;" @click="backIndex"> 首页</el-button>
    </div>
  </div>
</template>

<script>
import Cookie from "../cookie/index.js";
import "social-share.js/dist/css/share.min.css";
import "social-share.js/dist/js/social-share.min.js";
import lookMe from "./template/lookMe";
import zzyqSearch from "./template/zzyqSearch";
import zzSearch from "./template/zzSearch";
import qyZtbXgqyTable from "./template/qyZtbXgqyTable";
// import zzSearch from "./template/zzSearch";

export default {
  name: "qyztbDetails",
  components: {
    lookMe,
    zzyqSearch,
    zzSearch,
    qyZtbXgqyTable
  },
  data () {
    return {
      showTxt:true,
      // fxName:this.$route.query.xmmc,
      roleLoading:true,
         roleNo: "el-icon-error myPointer",
      roleYes: "el-icon-success myPointer ",
      roleThroughNo:"el-icon-error myPointer roleNol",
      roleThroughYes:"el-icon-success myPointer roleAct",
      // 通过不通过
      BooleanData:false,
      activeName2: "first",
      quanNeiWaiSta: "",
      ownOrOtherAddSta: "自己添加企业",
      throughNo: "el-icon-success pointer",
      throughNo1: "el-icon-error pointer",
      throughNo2: "el-icon-error pointer_finish2",
      throughYes: "el-icon-success pointer_finish",
      throughYes1: "el-icon-success pointer_finish",
      count: 0,
      getCutUrlKey: false,
      config: {
        url: window.location.href, // 网址，默认使用 window.location.href
        source: "标题", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: this.$route.query.xmmc, // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image:
          "https://wechat.cdzjkl.com/files/options/" +
          this.$store.state.userInfo.gs_logo, // 图片, 默认取网页中第一个img标签
        sites: ["qq", "wechat", "qzone", "weibo", "douban"], // 启用的站点
        // disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
      },

      radio: "",
      ssdqList: [],
      total: 0,
      searchData: {
        xmmc: "",
        zblb: "",
        xmlb: "",
        area: "",
        date: "",
        page: 1,
        rows: 10
      },
      xmdqList: [],
      zzyqList: [],
      loading: false,
      zblblist: ["全部", "公招", "比选", "采购"],
      // xmlblist: ["全部","建筑工程", "公路", "市政", "水利", "其他"],
      xmlblist: [
        { value: "", label: "全部" },
        { value: "建筑工程", label: "建筑工程" },
        { value: "公路", label: "公路" },
        { value: "市政", label: "市政" },
        { value: "其他", label: "其他" }
      ],
      tablaData: [],
      haveSthing: " pointer_finish el-icon-check  ",
      notHave: "pointer el-icon-close",
      props: {
        multiple: true,
        value: "dname",
        // checkStrictly: true,
        label: "dname"
      },
      chooseProps: {
        multiple: true,
        value: "val",
        // checkStrictly: true,
        label: "dname"
      },
      updateUrl:
        "https://wechat.cdzjkl.com/index/Human_Review/uploadFile",
      // "https://test.cdzjkl.com/index/Human_Review/uploadFile",
      updateData: {
        token: localStorage.getItem("token"),
        login_company_id: localStorage.getItem("company_id"),
        login_user_id: localStorage.getItem("user_id")
      },
      fujianTxt: "",
      GkxxUrl: "",
      gkxxFile: "",
      gkxxFileTime: "",
      zbxx_id: "",
      zbxx_bt: "",
      shoufujianTxt: "",
      path: [],
      path2: [],
      activeBtn: "headerBtn headerColor",
      normalBtn: "headerBtn",
      activeName: "first",
      activeName1: "first",
      form: {},
      data: [],
      centerDialogVisible: false,
      dialogVisibleUpDataGkxx: false,
      dialogVisibleTxtInput: false,
      dialogVisibleFxrChoose: false,
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dialogVisibleInput: false,
      dialogVisibleInput2: false,
      dialogVisibleUpdata: false,
      dialogVisibleInputColor: false,
      dialogVisibleInput2Color: false,
      dialogVisibleUpdataColor: false,
      // fileList: [],
      service_id: "",
      user_id: "",
      basicInfo: {},
      zzyqList: [],
      xmdqList: [],
      fileList: {
        zbwj: []
      },
      checkList: [],
      zzyqState: false,
      ryyqState: false,
      yjyqState: false,
      qtyqState: false,
      upaData: {
        qtyq: "",
        ryyq: "",
        xmdq: "",
        xmmc: "",
        xmyzdw: "",
        yjyq: "",
        xmdqList: [],
        zzyq: [],
        zzyq_str:''
      },
      CompanyList: {
        qylbLoading: true,
        loading: true,
        loading1: true,
        analyst_id: "",
        analyst_name: "",
        status: "",
        selectUserId: "",
        searchXgqy: "",
        searchXgqy1: "",
        status1: "",
        selectedWorkName: {},
        words: "",
        words1: "",
        cate: "个人",
        qymc: "",
        qymc1: "",
        loading: true,
        loading1: true,
        type1: "other",
        type: "own",
        page: 1,
        rows: 10,
        count: 0,
        page1: 1,
        pro_type: "",
        rows1: 10,
        count1: 0,
        data1: [],
        data: [],
        selectRList: [],
        xgqyBtn: true,
        activeColor: "activeColor",
        normalColor: "normalColor",
        qylbInput: "",
        qylPage: 1,
        qylbloading: true,
        qylbRows: 10,
        qylbTotal: 0,
        qylbCount: 0,
        multipleSelection: [],
        idList: "",
        // multipleSelection1: [],
        // idList1: '',
        tableData: [],
        selectData: {},
        selectMsgData: []
      },
      pubList: {
        data: [],
        page: 1,
        loading: true,
        rows: 10,
        count: 0
      },
      LeaveMessage: {
        data: [],
        mas: "",
        total: 0,
        concent: ""
      },
      addTableRowState: true,
      chooseFxrId: "",
      upDataForm: {
        // zbwj:[],
        xmmc: "",
        xmdq: "",
        xmdqList: [],
        xmyz: "",
        txt: "",
        // filename:"",
        // filename_time:"",
        wbUrl: "",
        bdText: "",
        zbxx_bt: "",
        zbxx_id: "",
        id: ""
      },
      zzyqStrState:false,
      time: "",
      tableXmForm: {},
      upDataFile: {},
      myFile: {},

      zzyqChooseList1: [],
      zzyqChooseList2: [],
      zzyqChooseList3: [],
      zzyqChooseList4: [],
      zzyqChooseText: "",
      zzyqChooseText1: "",
      zzyqChooseText2: "",
      zzyqChooseText3: "",
      zzyqChooseText4: "",
      daleiName: "",
      daleiName1: "",
      daleiName2: "",
      daleiName3: "",
      daleiName4: "",
      zzyqChooseLoading: true,
      zzyqChooseListArray: [],
      zzyqChooseListPage: 1,
      zzyqChooseListRows: 20,
      zzyqChooseListCount: 0,
      thisRowDataFile: {},
      zzyqArr: [],
      zzyqArr1: [],
      zzyqArr2: [],
      radio1:'',
      checked: false,
      role:true,
      role1:true,
      roleData:[],
      //批量选择分析人
      personList:[],
      fxrName:"",
      fxrGsList:[],
      batchFxr:{},
      //刷新子组件list
    };
  },

  watch: {
    checkList () {
      this.zzyqState = false;
      this.ryyqState = false;
      this.yjyqState = false;
      this.qtyqState = false;
      for (let i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i] == "资质要求") {
          this.zzyqState = true;
        }
        if (this.checkList[i] == "人员要求") {
          this.ryyqState = true;
        }
        if (this.checkList[i] == "业绩要求") {
          this.yjyqState = true;
        }
        if (this.checkList[i] == "其他") {
          this.qtyqState = true;
        }
      }
      let a = this.checkList.indexOf("资质要求");
    },
    CompanyList (val) {
      this.CompanyList = val;
    },
    zzyqArr1 (val) {
      this.zzyqArr1 = val
    },
    zzyqArr2 (val) {
      this.zzyqArr2 = val
    }
  },
  created () { 
     this.getZzyqData();
    this.getProvinceCity()
      localStorage.setItem('setzzSearchValue','')
      localStorage.setItem('setzzSearchValue_checked','')
      this.user_id = localStorage.getItem("user_id");
    document.title = "项目详情";
    let obj = this.$route.query;
    this.form = obj;
     this.getRe_detail();
    if (this.$route.query.share === "1") {
      // 判断是非是分享页面
      let url = window.location.href;
      url = url.replace(/&share=1/, "");
      localStorage.setItem("formUrl", url);
    }
    // 之所以 +1 是因为上个页面url最后传了一个空的share过来，可以作为是否是分享页面的判断
    let url = window.location.href + "1";
    // let urls = `${url}&fromUrl=${url}`
    // 在原本url里面重新拼接了一个url，不要问为什么，问就是终极解决方案
    this.axios.post(
      "/index/Common/buildurl",
      {
        url: url
      },
      res => {
        this.config.url = res.url;
        this.getCutUrlKey = true;
      }
    );
    this.chooseAllAnalyst()
    this.getLeaveWords();
    this.getAreaType();
    this.ajax_list();
    this.fn_role();
    this.searchQuali();
    this.getRoleData()
  },
  methods: {
    addMyXm(){
      this.openAdd()
    },
    getXgqyList(){
      this.$refs.table.getCompanyList()
    },
    batchChooseFxr(){
      this.personList.forEach(item=>{
       if(item.user_id == this.fxrName){
         this.batchFxr = item
       } 
      })
    },
    allChooseFxr(){
      if(this.fxrGsList){
        this.chooseFxr(1)
      }else{
        this.$message.error("请选择公司");
      }
    },
    selectionFxr(val){
       this.fxrGsList = val;
       if(this.fxrGsList.length >=1){
         let arr = []
         this.fxrGsList.forEach(item =>{
           arr.push(item.id)
         })
          this.fxrGsList =arr.join(',')
       }else{
          this.fxrGsList = ''
       }
    },
    changeBtnState(row){
      let num
      if(row.role == 1){
        num = '不通过'
      }else{
        num = '通过'
      }
      let obj ={
        // service_id:this.form.service_id,
        jbxx_id:this.form.jbxx_id,
        service:"",
        friend_id:row.user_id,
        type:num
      }
      this.axios.post('/relation/pro_details/saveRole',obj,data=>{
        if(data.status == 'success'){
          this.$message({
            type:'success',
            message:"修改成功"
          })
        }else{
           this.$message({
            type:'danger',
            message:data.message
          })
        }
        this.getRoleData()
      })
    },
    getRoleData () {
      let obj = {
        // service_id: "",
        // friend_id:this.user_id,
        jbxx_id:this.form.jbxx_id,
        user_id: this.user_id,
        cate: "个人",
        type:"权限"
      };
      this.axios.post("/relation/pro_details/analyst", obj, data => {
        this.roleData = data.rows
      });
    },
    backFxr(){
       this.$router.push({
        path:"/personalCircle"
      })
    },
    backIndex(){
      this.$router.push({
        path:"/personal"
      })
    },
    getUserServiceRole(){
      let obj = {
        jbxx_id:this.form.jbxx_id,
        service_id:this.form.service_id,
        user_id:localStorage.getItem("user_id"),
        friend_id:this.form.analyst_id?this.form.analyst_id:this.form.user_id,
      }
      
      this.axios.post('/relation/role/userServiceRole',obj,data=>{
          this.roleLoading = false
        this.role= data.message.check_proj_detail
        this.role1= data.message.pro_detail
      })
    },
     onClear(value,value1) {
       this.zzyqChooseLoading = true
           let nameArr= []
      for(let item in this.zzyqArr1){
  
         this.zzyqArr1[item].forEach((tt,ii)=>{

           for(let item2 in tt){
             if(tt[item2] == value ){
                 this.zzyqArr2.forEach((ttt,iii)=>{
                   if(ttt == value){
                      this.zzyqArr2.splice(iii,1)
                   }  
                    delete tt[item2]
                    for(let tttt in tt ){
                      nameArr.push(tttt)
                    
                    }
                    if(!nameArr.length){
                         this.zzyqArr1[item].splice(ii,1)
                    }
                 })  
                if(this.zzyqArr1[item].length == 0){
                  delete this.zzyqArr1[item];
                }
                  let obj  = JSON.stringify(this.zzyqArr1)
                    let obj1  = JSON.stringify(this.zzyqArr2)
                    localStorage.setItem("setzzSearchValue", obj);
                    localStorage.setItem("setzzSearchValue_checked", obj1);
                this.searchQuali()
             }
           }
        })
       
      }
    },
    getData (arr,num) {
      let obj = {}
      let allId = []
      if(arr){
         arr.forEach(item => {
        obj[item.dname] = []
        let myArr = []
        item.children.forEach(t => {
          let a = `${t.name[1]}_${t.name[2]}`
          let obj1 = {}
          obj1[a] = `${t.values[1]}_${t.values[2]}_${t.values[3]}`
          if(t.values[4]){
              obj1[a] = `${t.values[1]}_${t.values[2]}_${t.values[3]}_${t.values[4]}`
          }if(t.values[5]){
             obj1[a] = `${t.values[1]}_${t.values[2]}_${t.values[3]}_${t.values[4]}_${t.values[5]}`
          }
          allId.push(obj1[a])
          myArr.push(obj1)
        })
        obj[item.dname] = myArr
      })
      this.zzyqArr1 = obj;
      this.zzyqArr2 = allId;
      }else{
        this.zzyqArr1 = []
        this.zzyqArr2 = []
      }
      if(num == 1){
        let setzzSearchValue = JSON.stringify( this.zzyqArr1)
      let setzzSearchValue_checked = JSON.stringify( this.zzyqArr2)
      localStorage.setItem('setzzSearchValue',setzzSearchValue)
      localStorage.setItem('setzzSearchValue_checked',setzzSearchValue_checked)
      }
    },
    onSearch (val) {
      this.zzyqArr1 = []
      this.zzyqArr2 = []
          this.zzyqArr1 =localStorage.getItem('setzzSearchValue') != ''? JSON.parse(localStorage.getItem('setzzSearchValue')):[]
        this.zzyqArr2 = localStorage.getItem('setzzSearchValue_checked')?JSON.parse(localStorage.getItem('setzzSearchValue_checked')):[]
        this.centerDialogVisible = false
      this.searchQuali()
     
    },
    show_components () {
      this.checked = true;
      this.centerDialogVisible = true;
    },
    hide_components () {
      this.checked = false;
    },
    changeZZyq (val, arr) {
      this.upaData.zzyq = val;
      this.zzyqArr = arr;
      this.getData(arr.zzList)
    },
    clearSelect () {
      this.CompanyList.idList = [];
      this.CompanyList.id = "";
      this.CompanyList.multipleSelection = [];
    },
    zzyqSave (row) {
      this.zzyqChooseLoading = true;
      this.CompanyList.idList = row.id;
      this.CompanyList.id = row.id;
      this.$message({
        message: "选择成功",
        type: "success"
      });
      this.editComp();
    },
    zzSearch () {
      if (this.daleiName2 != "") {
        this.zzyqChooseLoading = true;
        this.zzyqChooseListPage = 1;
        this.searchQuali();
      } else {
        this.$message({
          message: "请选择资质要求",
          type: "danger"
        });
      }
    },
    searchQuali () {
      let aptitude =localStorage.getItem('setzzSearchValue') != ''? JSON.parse(localStorage.getItem('setzzSearchValue')):[]
      let obj = {
        aptitude,
        service_id: this.form.service_id,
        pro_type: this.CompanyList.pro_type,
        jbxx_id: this.form.jbxx_id,
        cate: this.CompanyList.cate,
        user_id: localStorage.getItem("user_id"),
        page: this.zzyqChooseListPage,
        row: this.zzyqChooseListRows,
        dict: "",
        is_rc: "全部",
        area: ""
      };
      this.axios.post("/firm/Firm_search/searchQuali", obj, data => {
        this.zzyqChooseLoading = false;
        this.zzyqChooseListArray = data.rows;
        this.zzyqChooseListCount = data.total || 0;
      });
    },
    deleteLeaveWords (item) {
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let obj = {
            id: item.id,
            cate: "对手分析",
            user_id: localStorage.getItem("user_id")
          };
          this.axios.post("/index/element_set/delLeaveWords", obj, data => {
            if (data.status == "success") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getLeaveWords();
            } else {
              this.$message({
                message: data.message,
                type: "danger"
              });
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    disabledCheck (row, index) {
      if (row.status == 0) {
        return true;
      } else {
        return false;
      }
    },
    format_Change (fileList) {
      let item = {
        name: fileList.response.data.filename,
        filename_time: fileList.response.data.filename_time
      };

      if (!this.upDataFile.num) {
        this.pubList.data[0].file = fileList.response.data.filename_time;
      }
      // this.dialogVisibleUpdata = false
      this.myFile = item;
      // this.pubList.data[0].file = fileList.response.data.filename_time
      this.gkxxFileTime = fileList.response.data.filename_time;
      this.time = fileList.response.data.filename_time;
      return item;
    },
    handleChange_zbwj (file, fileList) {
      this.fileList.zbwj = [];
      this.fileList.zbwj.push(this.format_Change(fileList));
    },
    uploadRemove_zbwj (file, fileList) {
      let obj = {
        id: this.upDataFile.id,
        jbxx_id: this.$route.query.jbxx_id,
        user_id: localStorage.getItem("user_id"),
        // xmmc:this.upDataFile.xmmc,
        type: 2,
        file_del: this.upDataFile.file_time
      };
      this.axios.post("/relation/pro_details/editPub", obj, data => {
        this.$message({
          message: "删除成功",
          type: "danger"
        });
        this.gkxxFileTime = "";
        this.dialogVisibleUpdataColor = false;
        this.tableXmForm.del_zbwj =
          this.tableXmForm.del_zbwj + file.filename_time + ",";
        this.fileList.zbwj = fileList;
        this.getPubList();
      });
    },
    upFlie () {
      let obj = {
        id: this.upDataFile.id,
        jbxx_id: this.$route.query.jbxx_id,
        user_id: localStorage.getItem("user_id"),
        file: this.gkxxFileTime,
        type: 2,
        xmmc: this.thisRowDataFile.xmmc,
        xmyz: this.thisRowDataFile.xmyz,
        xmdq: this.thisRowDataFile.xmdq,
        txt: this.thisRowDataFile.txt,
        url: this.thisRowDataFile.url,
        zbxx_id: this.thisRowDataFile.zbxx_id,
        zbxx_bt: this.thisRowDataFile.zbxx_bt
      };
      this.axios.post("/relation/pro_details/editPub", obj, data => {
        this.addTableRowState = true;
        this.dialogVisibleUpdata = false;
        this.getPubList();
      });
    },
    openFile (file) {
      window.open(
        "https://wechat.cdzjkl.com/files/options/" +
        this.gkxxFileTime
        // "https://test.cdzjkl.com/files/options/" +
        //   this.gkxxFileTime
      );
    },
    searchXgqyTable () {
      this.path = []; // 重置 找到我 静态渲染效果
      let type;
      if (this.CompanyList.xgqyBtn) {
        this.CompanyList.loading = true;
        type = this.CompanyList.type;
      } else {
        this.CompanyList.loading1 = true;
        type = this.CompanyList.type1;
      }
      let obj = {
        service_id: this.form.service_id,
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id,
        pro_type: this.CompanyList.pro_type,
        cate: this.CompanyList.cate,
        qymc: this.CompanyList.searchXgqy,
        type: type,
        page: 1,
        rows: 10
      };
      this.axios.post("/relation/pro_details/companyList", obj, data => {
        this.CompanyList.loading = false;
        this.CompanyList.loading1 = false;
        this.CompanyList.data = data.rows;
        this.CompanyList.count = data.total || 0;
        for (let i = 0; i < this.CompanyList.data.length; i++) {
          this.$set(this.CompanyList.data[i], "selectName", "");
        }
      });
    },
    rserveInput () {
      this.$confirm("此操作将重置搜索, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.CompanyList.searchXgqy = "";
          if (this.CompanyList.xgqyBtn) {
            this.CompanyList.page = 1;
            this.CompanyList.loading = true;
            this.getCompanyList();
          } else {
            this.CompanyList.page1 = 1;
            this.CompanyList.loading1 = true;
            this.getCompanyList1();
          }
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    test (scope) {
    },
    // 找到我 按钮
    LookMe (scope, model) {
      if (!model) {
        this.path[scope.$index] = scope.$index;
        this.path.splice(); // 改变原始数组 用于渲染数据
      } else {
        this.path2[scope.$index] = scope.$index;
        this.path2.splice(); // 改变原始数组 用于渲染数据
      }
    },
    openJzdsfxwb (val) {
      let obj = {
        name: this.form.name,
        own_id: val.user_id,
        xmmc: val.qymc ? val.qymc : "",
        service_id: val.service_id ? val.service_id : "",
        jbxx_id: val.jbxx_id ? val.jbxx_id : "",
        xmyz: val.xmyz ? val.xmyz : "",
        xmdq: val.xmdq ? val.xmdq : "",
        gs_id: val.gs_id,
        cate: "公司",
        share: ""
      };
      let routeData = this.$router.resolve({
        name: "qyfwqWbDaletil",
        query: obj
      });
      //   window.open(routeData.href, val.qymc);
      window.open(routeData.href);
    },
    getTxtData (row) {
      this.fujianTxt = row.txt;
    },
    getTxtData1 (row) {
      this.shoufujianTxt = row.txt;
    },
    getUrlData (row) {
      for (let i = 0; i < this.tablaData.length; i++) {
        this.$set(this.tablaData[i], "selectName", "关联");
      }
      this.zbxx_id = "";
      this.zbxx_bt = "";
      this.searchData.xmmc = "";
      this.searchData.zblb = "";
      this.searchData.xmlb = "";
      this.searchData.area = "";
      this.searchData.date = "";
      this.GkxxUrl = row.url;
    },
    getFileData (row, num) {
      this.thisRowDataFile = row;
      this.upDataFile = row;
      this.upDataFile.num = num;
      this.gkxxFile = "";
      this.gkxxFileTime = "";
      this.gkxxFile = row.file;
      this.gkxxFileTime = row.file_time ? row.file_time : this.time;
      this.fileList.zbwj = [];
      let obj = {
        name: row.file,
        filename_time: row.file_time
      };
      if (row.file != "") {
        this.fileList.zbwj.push(obj);
      }
    },
    getSelectRow (i, type) {
      this.selectUserId = i;
    },
    addTableRow () {
      let list = [];
      if (this.basicInfo.xmdq) {
        let arr = this.basicInfo.xmdq.split("/");
        for (let i = 0; i < arr.length; i++) {
          list.push(arr[i]);
        }
      }
      if (this.addTableRowState) {
        let obj = {
          xmmc: this.basicInfo.xmmc,
          xmdq: list,
          xmyz: this.basicInfo.xmyzdw,
          created: "",
          txt1: "文本",
          txt2: "关联",
          txt3: "附件",
          state: true,
          avatar:'',
          txt: "",
          url: "",
          file: "",
          zbxx_id: "",
          zbxx_bt: ""
        };
        (this.fujianTxt = ""),
          (this.GkxxUrl = ""),
          (this.gkxxFile = ""),
          (this.gkxxFileTime = ""),
          (this.zbxx_id = ""),
          (this.zbxx_bt = ""),
          (this.dialogVisibleInputColor = false),
          (this.dialogVisibleInput2Color = false),
          (this.dialogVisibleUpdataColor = false),
          this.pubList.data.unshift(obj);
        this.addTableRowState = false;
      }
    },
    chooseXgqyTable1 (row) {
      if (row.status == "0") {
        this.CompanyList.idList = row.id;
        this.CompanyList.id1 = row.id;
        this.$message({
          message: "选择成功",
          type: "success"
        });
        this.editComp();
      } else {
        this.$message({
          message: "选择失败!请重试",
          type: "danger"
        });
      }
    },
    chooseXgqyTable (row) {
      if (row.status == "0") {
        this.CompanyList.idList = row.id;
        this.CompanyList.id = row.id;
        this.$message({
          message: "选择成功",
          type: "success"
        });
        this.editComp();
      } else {
        this.$message({
          message: "选择失败!请重试",
          type: "danger"
        });
      }
    },
    editComp (num) {
      let mycate;
       let myId 
      if (this.form.name == "zj") {
        mycate = "自己";
      }
      if (this.form.name == "zj" && this.form.share == 1) {
        if (this.basicInfo.user_id == localStorage.getItem("user_id")) {
          mycate = "自己";
          this.CompanyList.pro_type = "own";
        } else {
          mycate = "外部";
          this.CompanyList.pro_type = "other";
        }
      } else if (this.form.name == "wb" || this.form.share == 1) {
        mycate = "外部";
        this.CompanyList.pro_type = "other";
      }
      let obj = {
        id: this.CompanyList.id,
        service_id: this.form.service_id,
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id,
        pro_type: this.CompanyList.pro_type,
        gs_id: this.CompanyList.idList,
        analyst_id: this.CompanyList.analyst_id,
        analyst_name: this.CompanyList.analyst_name,
        status: this.CompanyList.status,
        words: this.CompanyList.words,
        cate: mycate,
        type: "1"
      };
      this.axios.post("/relation/pro_details/editComp", obj, data => {
        this.qylbSearch();
        this.searchQuali();
        this.getXgqyList()
        // this.getCompanyList();
      });
    },
    handleSelectionChange (val) {
      this.CompanyList.multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        this.CompanyList.multipleSelection.push(val[i].id);
      }
      this.CompanyList.idList = this.CompanyList.multipleSelection.join(",");
      val.id = this.CompanyList.idList;
    },
    handleSelectionChange1 (val) {
      this.CompanyList.multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        this.CompanyList.multipleSelection.push(val[i].id);
      }
      this.CompanyList.idList = this.CompanyList.multipleSelection.join(",");
      val.id = this.CompanyList.idList;
    },
    plChoose () {
      if (this.CompanyList.multipleSelection != "") {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.dialogTableVisible = false;
        this.qylbSearch();
        this.editComp();
      } else {
        this.$message({
          message: "请选择",
          type: "danger"
        });
      }
    },
    zzplChoose () {
      if (this.CompanyList.multipleSelection != "") {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.dialogTableVisible = false;
        this.qylbSearch();
        this.editComp();
      } else {
        this.$message({
          message: "请选择",
          type: "danger"
        });
      }
    },
    getPubList () {
      let obj = {
        jbxx_id: this.form.jbxx_id,
        user_id: localStorage.getItem("user_id"),
        page: this.pubList.page,
        rows: this.pubList.rows
      };
      this.axios.post("/relation/pro_details/pubList", obj, data => {
        this.pubList.loading = false;
        this.pubList.data = data.rows ? data.rows : [];
        this.pubList.count = data.total ? data.total : 0;
        let NewArr = [];
        for (let i = 0; i < this.pubList.data.length; i++) {
          this.pubList.data[i].state = 0;
        }
        // .log(this.pubList);
      });
    },
    changeTableT (val) {
      if (val == "自己添加企业") {
        this.CompanyList.xgqyBtn = true;
      } else {
        this.CompanyList.xgqyBtn = false;
      }
    },
    getCompanyList () {
      let obj = {
        service_id: this.form.service_id,
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id,
        pro_type: this.CompanyList.pro_type,
        cate: this.CompanyList.cate,
        qymc: this.CompanyList.qymc,
        type: this.CompanyList.type,
        page: this.CompanyList.page,
        rows: this.CompanyList.rows
      };
      this.axios.post("/relation/pro_details/companyList", obj, data => {
        this.CompanyList.loading = false;
        this.CompanyList.data = data.rows;
        this.CompanyList.count = data.total || 0;

        for (let i = 0; i < this.CompanyList.data.length; i++) {
          this.$set(this.CompanyList.data[i], "selectName", "");
        }
      });
    },
    getCompanyList1 () {
      let obj = {
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id,
        cate: this.CompanyList.cate,
        qymc: this.CompanyList.qymc1,

        type: this.CompanyList.type1,
        page: this.CompanyList.page1,
        rows: this.CompanyList.rows1
      };
      this.axios.post("/relation/pro_details/companyList", obj, data => {
        this.CompanyList.loading1 = false;
        this.CompanyList.data1 = data.rows;
        this.CompanyList.count1 = data.total || 0;
      });
    },
    qylbSearch (num) {
      if (num == 1) {
        this.CompanyList.qylbRows = 10;
        this.CompanyList.qylPage = 1;
      }
      let type;

      this.CompanyList.qylbLoading = true;
      this.path2 = []; // 重置找到我静态渲染数据
      let obj = {
        pro_type: this.CompanyList.pro_type,
        company: this.CompanyList.qylbInput,
        page: this.CompanyList.qylPage,
        rows: this.CompanyList.qylbRows,
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id,
        cate: this.CompanyList.cate
      };
      if (this.form.name == "wb") {
        obj.service_id = this.form.service_id;
      }
      this.axios.post("/firm/firm_search/searchComp", obj, data => {
        this.CompanyList.qylbLoading = false;
        this.CompanyList.tableData = data.rows;
        this.CompanyList.qylbCount = data.count;
        this.CompanyList.qylbTotal = data.total || 0;
      });
    },
    assignmentData () {
      this.upaData.qtyq = this.basicInfo.qtyq;
      this.upaData.ryyq = this.basicInfo.ryyq;
      this.upaData.xmmc = this.basicInfo.xmmc;
      this.upaData.xmyzdw = this.basicInfo.xmyzdw;
      this.upaData.yjyq = this.basicInfo.yjyq;
      this.upaData.zzyq = this.basicInfo.zzyq;
      this.upaData.zzyq_str = this.basicInfo.zzyq_str;
      this.zzyqArr = JSON.parse(this.basicInfo.zzyq_txt);
    },
    getZzyqData () {
      this.axios.post("/firm/Firm_search/getQualiDict", {}, data => {
        this.zzyqList = data.rows;
      });
    },
    getProvinceCity () {
      this.axios.post("/index/common/getProvinceCity", {}, data => {
        this.xmdqList = data;
      });
    },
    openAdd () {
      this.activeName1 = "first";
      this.CompanyList.qylbInput = "";
      this.CompanyList.idList = "";
      this.CompanyList.id = "";
      this.dialogTableVisible = true;
      this.zzyqChooseList1 = [];
      this.zzyqChooseList = [];
      this.zzyqChooseList2 = [];
      this.zzyqChooseList3 = [];
      this.zzyqChooseList4 = [];
      this.zzyqChooseText1 = "";
      this.zzyqChooseText = "";
      this.zzyqChooseText2 = "";
      this.zzyqChooseText3 = "";
      this.zzyqChooseText4 = "";
      this.daleiName = "";
      this.daleiName1 = "";
      this.daleiName2 = "";
      this.daleiName3 = "";
      this.daleiName4 = "";
      this.zzyqChooseListPage = 1;
      this.CompanyList.qylPage = 1;
       this.CompanyList.qylbCount = 0;
        if(this.basicInfo.zzyq_txt){
         let obj = JSON.parse(this.basicInfo.zzyq_txt)
        this.getData(obj.zzList,1)
      }
      this.qylbSearch();
      this.searchQuali();
    },
    getRe_detail (num) {
      let obj = {
        jbxx_id: this.form.jbxx_id,
        gs_id: this.form.gs_id,
        analyst_id: this.form.analyst_id,
        cate: "个人"
      };
      this.axios.post("/relation/pro_details/re_detail", obj, data => {
        if(data.message == '该项目不存在'){
          this.$message(data.message)
          this.$router.push({
            path:"/qyZtbPage"
          })
        }
        this.basicInfo = data.rows;
        this.config.title = data.rows.xmmc
        // console.log(this.config.title)
        // this.fxName = data.rows.xmmc
        if (this.form.name == "zj") {
          this.CompanyList.pro_type = "own";
        }
        if (this.form.name == "zj" && this.form.share == 1) {
          if (this.basicInfo.user_id == localStorage.getItem("user_id")) {
            this.CompanyList.pro_type = "own";
          } else {
            this.CompanyList.pro_type = "other";
          }
        } else if (this.form.name == "wb") {
          this.CompanyList.pro_type = "other";
        }

        this.quanNeiWaiSta = this.basicInfo.role;
       
         if (this.$route.query.share == "1"||this.form.name == "wb") {
        if(this.basicInfo.role == "圈内"){
           this.getUserServiceRole()
        }
        }
         this.roleLoading = false
        this.$set(this.basicInfo, "zzyqText", this.basicInfo.zzyq);
        this.getCompanyList();
        this.getPubList();
        this.getCompanyList1();
        this.checkList = [];
        // console.log(this.basicInfo.zzyq)
        if (this.basicInfo.zzyq) {
          let NewArr = [];
          let arr = this.basicInfo.zzyq.split(",");

          for (let i = 0; i < arr.length; i++) {
            let b = arr[i].split("_");
            NewArr.push(b);
          }
          this.basicInfo.zzyq = NewArr;
        }
        // console.log(this.basicInfo.xmdq)
         if (this.basicInfo.xmdq) {
          let arr = this.basicInfo.xmdq.split("/");
          for (let i = 0; i < arr.length; i++) {
            this.upaData.xmdqList.push(arr[i]);
          }
        }
        this.upaData = JSON.stringify(this.upaData)
        this.upaData = JSON.parse(this.upaData)
        //包了一层upaData 他监听不到xmdq  用json  改变他一下
        if (this.basicInfo.zzyq) {
          this.checkList.push("资质要求");
          this.zzyqState = true;
        }
        if (this.basicInfo.zzyq_str) {
          this.checkList.push("资质要求");
          this.zzyqState = true;
          this.zzyqStrState = true
        }
        if (this.basicInfo.ryyq) {
          this.checkList.push("人员要求");
          this.ryyqState = true;
        }
        if (this.basicInfo.yjyq) {
          this.checkList.push("业绩要求");
          this.yjyqState = true;
        }
        if (this.basicInfo.qtyq) {
          this.checkList.push("其他");
          this.qtyqState = true;
        }
        this.assignmentData();
        this.getData(this.basicInfo.zzyq_txt)
       
        if (num == 1) {
          this.$message({
            message: "重置成功",
            type: "success"
          });
        }
      });
    },
    zzyqChooseData (val) {
    },
    changeListData (val) {
      for (let i = 0; i < val.length; i++) {
        if (val[1]) {
          this.upaData.xmdq = `${val[0]}/${val[1]}`;
        } else {
          this.upaData.xmdq = `${val[0]}`;
        }
      }
    },
    ModifyData () {
      this.$confirm("此操作将修改项目基本信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.upaData.xmmc == "") {
            this.$message("请填写项目名称");
          }
          if (this.upaData.xmmc.length < 2) {
            this.$message("项目名称最少两个字");
          } else {
            
            let obj = {
              jbxx_id: this.form.jbxx_id,
              xmmc: this.upaData.xmmc,
              xmyzdw: this.upaData.xmyzdw,
              xmdq: this.upaData.xmdq,
              zzyq: this.zzyqState?this.upaData.zzyq:'',
              zzyq_str: this.upaData.zzyq_str,
              ryyq: this.ryyqState?this.upaData.ryyq:'',
              yjyq:  this.yjyqState?this.upaData.yjyq:'',
              qtyq: this.qtyqState?this.upaData.qtyq:'',
              // zzyq: this.upaData.zzyq,
              // ryyq: this.upaData.ryyq,
              // yjyq: this.upaData.yjyq,
              // qtyq: this.upaData.qtyq,
              role: this.basicInfo.role,
              zzyq_txt: JSON.stringify(this.zzyqArr)
            };
            this.axios.post("/relation/pro_details/editPro", obj, data => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              localStorage.setItem("zzyqArr", '');
              localStorage.setItem("setzzSearchValue", '');
              localStorage.setItem("setzzSearchValue_checked", '');
              let arr = JSON.stringify(this.zzyqArr);
              let arr1 = JSON.stringify(this.zzyqArr1);
              let arr2 = JSON.stringify(this.zzyqArr2);
              localStorage.setItem("zzyqArr", arr);
              localStorage.setItem("setzzSearchValue", arr1);
              localStorage.setItem("setzzSearchValue_checked", arr2);
              this.getRe_detail();
            });
          }
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    resetData () {
      this.$confirm("此操作将重置已填写的项目基本信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getRe_detail(1);
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    handleCurrentChangezzyqList (val) {
      this.zzyqChooseLoading = true;
      this.zzyqChooseListPage = val;
      this.searchQuali();
    },
    handleCurrentChange (val) {
    },
    qylbClear () {
      this.CompanyList.qylbLoading = true;
      this.CompanyList.qylPage = 1;
      this.CompanyList.qylbInput = "";
      this.qylbSearch();
    },

    handleSizeChangeQylb (val) {
      this.CompanyList.qylbLoading = true;
      this.CompanyList.qylbRows = val;
      this.CompanyList.qylPage = 1;
      this.CompanyList.qylbCount = 0;
      this.qylbSearch();
    },
    handleCurrentChangeQylb (val) {
      this.CompanyList.qylbLoading = true;
      this.CompanyList.qylPage = val;
      this.qylbSearch();
    },
    handleCurrentChangeXgqy (val) {
      this.CompanyList.loading = true;
      this.CompanyList.page = val;
      this.getCompanyList();
    },
    handleCurrentChangeXgqy1 (val) {
      this.CompanyList.loading1 = true;
      this.CompanyList.page1 = val;
      this.getCompanyList1();
    },

    handleCurrentChangeGkxx (val) {
      this.pubList.loading = true;
      this.pubList.page = val;
      this.getPubList();
    },
    delateXgqy (row) {
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.CompanyList.loading = true;
          let obj = {
            jbxx_id: this.form.jbxx_id,
            user_id: this.user_id,
            gs_id: row.gs_id,
            id: row.id,
            cate: this.CompanyList.cate,
            qymc: this.CompanyList.qymc,
            type: 3,
            page: this.CompanyList.page,
            rows: this.CompanyList.rows
          };

          this.axios.post("/relation/pro_details/editComp", obj, data => {
            if (this.CompanyList.data.length == 1) {
              if (this.CompanyList.page > 1) {
                this.CompanyList.page = this.CompanyList.page - 1;
              } else {
                this.CompanyList.page = 1;
              }
            }
            this.getCompanyList();
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    delateGkxx (row) {
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.pubList.loading = true;
          let obj = {
            jbxx_id: this.form.jbxx_id,
            user_id: this.user_id,
            id: row.id,
            type: 3
          };
          this.axios.post("/relation/pro_details/editPub", obj, data => {
            if (this.pubList.data.length == 1) {
              if (this.pubList.page > 1) {
                this.pubList.page = this.pubList.page - 1;
              } else {
                this.pubList.page = 1;
              }
            }
            this.addTableRowState = true;
            this.getPubList();
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },

    upDataGkxx (row) {
      if (row.xmdq) {
        let arr = row.xmdq.split("/");
        for (let i = 0; i < arr.length; i++) {
          this.upDataForm.xmdqList.push(arr[i]);
        }
      }
      this.thisRowDataFile = row;
      this.upDataForm.txt = row.txt;
      // this.upDataForm.text = ''
      this.activeName2 = "first";
      this.upDataForm.xmmc = row.xmmc;
      this.upDataForm.xmyz = row.xmyz;
      // this.upDataForm.xmdq = row.xmdq
      this.upDataForm.wbUrl = row.url;
      this.upDataForm.zbxx_bt = row.zbxx_bt;
      this.upDataForm.zbxx_id = row.zbxx_id;

      this.upDataForm.id = row.id;
      this.searchData.xmmc = "";
      this.searchData.zblb = "";
      this.searchData.xmlb = "";
      this.searchData.area = "";
      this.searchData.date = "";
      this.ajax_list("upData");
      this.addTableRowState = true;
    },
    sureUpDataGkxx () {
      // this.$confirm('此操作将更新信息, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })
      //   .then(() => {
      if (this.upDataForm.xmmc == "") {
        this.$message("请填写项目名称");
      }
      if (this.upDataForm.xmmc.length < 2) {
        this.$message("项目名称最少两个字");
      } else {
        for (let i = 0; i < this.upDataForm.xmdqList.length; i++) {
          if (this.upDataForm.xmdqList[1]) {
            this.upDataForm.xmdq = `${this.upDataForm.xmdqList[0]}/${
              this.upDataForm.xmdqList[1]
              }`;
          } else {
            this.upDataForm.xmdq = `${this.upDataForm.xmdqList[0]}`;
          }
        }
        let obj = {
          id: this.upDataForm.id,
          jbxx_id: this.$route.query.jbxx_id,
          user_id: localStorage.getItem("user_id"),
          xmmc: this.upDataForm.xmmc,
          xmyz: this.upDataForm.xmyz,
          xmdq: this.upDataForm.xmdq,
          txt: this.upDataForm.txt,
          url: this.upDataForm.wbUrl,
          zbxx_id: this.upDataForm.zbxx_id,
          zbxx_bt: this.upDataForm.zbxx_bt,
          file: this.thisRowDataFile.file_time,

          type: 2
        };

        this.axios.post("/relation/pro_details/editPub", obj, data => {
          this.dialogVisibleUpDataGkxx = false;
          (this.upDataForm.xmmc = ""),
            (this.upDataForm.xmyz = ""),
            (this.upDataForm.xmdqList = []),
            // this.upDataForm.xmdq = row.xmdq
            (this.upDataForm.wbUrl = ""),
            (this.upDataForm.zbxx_bt = ""),
            (this.upDataForm.zbxx_id = ""),
            (this.upDataForm.txt = ""),
            (this.upDataForm.id = ""),
            this.getPubList();
        });
      }
      // })
      // .catch(() => {
      //   this.$message.info('已取消')
      // })
    },
    xgqyThrough (row, num) {
      this.CompanyList.loading = true;
      this.CompanyList.loading1 = true;
      let obj = {
        id: row.id,
        jbxx_id: this.form.jbxx_id,
        gs_id: row.gs_id,
        status: 1
      };
      this.axios.post("/relation/pro_details/compWords", obj, data => {
        this.CompanyList.selectMsgData = data.rows;
      });
      this.dialogTableVisible1 = true;
      this.CompanyList.selectData = row;
      this.CompanyList.selectData.num = num;
      this.getCompanyList();
      this.getCompanyList1();
    },
    xgqyThroughNo (row, num) {
      this.CompanyList.loading = true;
      let obj = {
        id: row.id,
        jbxx_id: this.form.jbxx_id,
        gs_id: row.gs_id,
        status: 2
      };
      this.axios.post("/relation/pro_details/compWords", obj, data => {
        this.CompanyList.selectMsgData = data.rows;
      });
      this.dialogTableVisible2 = true;

      this.CompanyList.selectData = row;
      this.CompanyList.selectData.num = num;
      this.getCompanyList();
    },
    cancelTg2 () {
      this.CompanyList.words = "";
      this.dialogTableVisible2 = false;
    },
    cancelTg1 () {
      this.CompanyList.words = "";
      this.dialogTableVisible1 = false;
    },
    throughXm (row) {
      this.CompanyList.loading = true;
      let obj = {
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id,
        id: this.CompanyList.selectData.id,
        cate: this.CompanyList.cate,
        qymc: this.CompanyList.qymc,
        type: 2,
        status: 1,
        words: this.CompanyList.words
      };
      this.axios.post("/relation/pro_details/editComp", obj, data => {
        this.CompanyList.data = data.rows;
        this.CompanyList.count = data.total || 0;
        this.dialogTableVisible1 = false;
        this.CompanyList.words = "";
        this.getCompanyList();
      });
    },
    throughXmNo () {
      this.CompanyList.loading = true;
      let obj = {
        jbxx_id: this.form.jbxx_id,
        user_id: this.user_id,
        id: this.CompanyList.selectData.id,
        cate: this.CompanyList.cate,
        qymc: this.CompanyList.qymc,
        type: 2,
        status: 2,
        words: this.CompanyList.words
      };
      this.axios.post("/relation/pro_details/editComp", obj, data => {
        this.CompanyList.data = data.rows;
        this.CompanyList.count = data.total || 0;
        this.dialogTableVisible2 = false;
        this.CompanyList.words = "";
        this.getCompanyList();
      });
    },
     chooseAllAnalyst () {
      let obj = {
        all: '全部',
        user_id: this.user_id,
        // analyst_id: row.analyst_id,
        cate: "个人"
      };
      this.axios.post("/relation/pro_details/analyst", obj, data => {
        this.personList = data.rows || "";
      });
    },
    chooseAnalyst (row) {
      this.chooseFxrId = row.id;
      this.radio = "";
      let obj = {
        service_id: "",
        gs_id: row.gs_id,
        user_id: this.user_id,
        analyst_id: row.analyst_id,
        cate: "个人"
      };
      this.axios.post("/relation/pro_details/analyst", obj, data => {
        this.CompanyList.selectRList = data.rows || "";
      });
    },
    saveGkxxData (row) {
      let myXmdq = "";
      for (let i = 0; i < row.xmdq.length; i++) {
        if (row.xmdq[1]) {
          myXmdq = `${row.xmdq[0]}/${row.xmdq[1]}`;
        } else {
          myXmdq = `${row.xmdq[0]}`;
        }
      }
      if (row.xmmc == "") {
        this.$message("请填写项目名称");
      }
      if (row.xmmc.length < 2) {
        this.$message("项目名称最少两个字");
      } else {
        this.pubList.loading = true;
        let obj = {
          id: row.id,
          jbxx_id: this.form.jbxx_id,
          user_id: this.user_id,
          xmmc: row.xmmc,
          xmyz: row.xmyz,
          xmdq: myXmdq,
          txt: row.txt,
          url: row.url,
          file: this.gkxxFileTime,
          zbxx_bt: row.zbxx_bt,
          zbxx_id: row.zbxx_id,
          type: 1
        };
        this.axios.post("/relation/pro_details/editPub", obj, data => {
          this.addTableRowState = true;
          this.getPubList();
        });
      }
    },
    cancelSaveData (row) {
      this.pubList.loading = true;
      this.pubList.data.shift();
      this.addTableRowState = true;
      this.getPubList();
    },
    selectWorkName (id) {
      for (let i = 0; i < this.CompanyList.selectRList.length; i++) {
        if (this.CompanyList.selectRList[i].user_id === id) {
          this.selectedWorkName = this.CompanyList.selectRList[i];
        }
      }
    },
    getLeaveWords () {
      let obj = {
        jbxx_id: this.form.jbxx_id,
        type: 0,
        type_id: this.user_id,
        cate: "对手分析"
      };
      this.axios.post("/Index/element_set/getLeaveWords", obj, data => {
        this.LeaveMessage.data = data.message;
        this.LeaveMessage.total = data.total || 0;
      });
    },
    submitMsg () {
      if (this.LeaveMessage.concent != "") {
        let obj = {
          jbxx_id: this.form.jbxx_id,
          user_id: this.user_id,
          // gs_id: 6027,
          pid: "",
          type: 0,
          content: this.LeaveMessage.concent,
          reply_id: "",
          sender: this.user_id,
          receiver: "",
          cate: "对手分析"
        };
        this.axios.post("/Index/element_set/addLeaveWords", obj, daya => {
          this.getLeaveWords();
          this.LeaveMessage.concent = "";
          this.$message({
            message: "留言成功",
            type: "success"
          });
        });
      } else {
        this.$message({
          message: "请填写内容",
          type: "danger"
        });
      }
    },
    dialogClickOver (val) {
      switch (val) {
        case 1:
          this.pubList.data[0].txt = this.fujianTxt;

          if (this.fujianTxt != "") {
            this.dialogVisibleInput = false;
            this.dialogVisibleInputColor = true;
          }
          break;
        case 2:
          this.pubList.data[0].url = this.GkxxUrl;
          this.pubList.data[0].zbxx_id = this.zbxx_id;
          this.pubList.data[0].zbxx_bt = this.zbxx_bt;
          this.dialogVisibleInput2Color = true;
          this.dialogVisibleInput2 = false;
          break;
        case 3:
          this.dialogVisibleUpdataColor = true;
          this.dialogVisibleUpdata = false;
          break;

        default:
          break;
      }
    },
    // 点击搜索
    onSearch1 () {
      this.searchData.page = 1;
      this.total = 0;
      this.ajax_list();
    },

    onReset () {
      this.searchData.page = 1;
      this.total = 0;
      this.$refs.form1.resetFields();
      this.$refs.form2.resetFields();
      this.ajax_list();
    },
    // 关联
    onClick_import (data) {
      // this.ajax_list(data.row.is_import)
      for (let i = 0; i < this.tablaData.length; i++) {
        this.$set(this.tablaData[i], "selectName", "关联");
      }
      data.row.selectName = "已关联";
      this.zbxx_id = data.row.id;
      this.zbxx_bt = data.row.bt;
    },
    onClick_import1 (data) {
      for (let i = 0; i < this.tablaData.length; i++) {
        this.$set(this.tablaData[i], "selectName", "关联");
      }
      data.row.selectName = "已关联";
      this.upDataForm.zbxx_id = data.row.id;
      this.upDataForm.zbxx_bt = data.row.bt;
    },
    changeRowState (row, name) {
      this.$set(this.zjTableDta, "role", name);
      this.zjTableDta.jbxx_id = row.jbxx_id;

      this.getiProjectSave();
    },
    // 招标分页
    handleSizeChange (val) {
      this.searchData.page = val;

      this.ajax_list();
    },

    // 请求获取招标列表
    ajax_list (tag) {
      if (tag != "导入") {
        // 为了页面保持高度
        this.tablaData = [];
      }
      let ajax_data = JSON.parse(JSON.stringify(this.searchData));
      ajax_data.service_id = localStorage.getItem("service_id");
      if (ajax_data.zblb == "全部") {
        ajax_data.zblb = "";
      }
      if (ajax_data.date) {
        ajax_data.min_date = ajax_data.date[0] || "";
        ajax_data.max_date = ajax_data.date[1] || "";
      } else {
        ajax_data.min_date = "";
        ajax_data.max_date = "";
      }
      delete ajax_data.date;
      if (ajax_data.area == "不限制") {
        ajax_data.area = "";
      }
      this.axios.post("/index/Project/tenderNotice", ajax_data, data => {
        this.CompanyList.qylbLoading = false;
        this.tablaData = data.rows;
        // this.count = data.count || 0;
        // this.CompanyList.qylbCount = data.total || 0;
        this.total = data.total||0
        for (let i = 0; i < this.tablaData.length; i++) {
          this.$set(this.tablaData[i], "selectName", "关联");
        }

        this.total = data.total || 0;
      });
    },
    getAreaType () {
      let obj = {
        type: "招中标"
      };
      this.axios.post("/firm/Firm_Search/getAreaType", obj, data => {
        this.ssdqList = data;
      });
    },
    openWbUrl () {
      let a = this.GkxxUrl.indexOf("https://");
      if (a) {
        window.open("https://" + this.GkxxUrl);
      } else {
        window.open(this.GkxxUrl);
      }
    },
    openToWbUrl (row) {
      let a = row.url.indexOf("https://");
      if (a) {
        window.open("https://" + row.url);
      } else {
        window.open(row.url);
      }
    },
    openToNbUrl (row) {
      let routeData = this.$router.resolve({
        name: "enterpriseDetails",
        query: {
          zbxx_id: row.zbxx_id,
          type: "zbxx",
          xmmc: row.zbxx_bt
        }
      });
      window.open(routeData.href, "_blank");
    },
    chooseFxr (row) {
      this.CompanyList.loading = true;
      let myID
      let analyst_id
      let analyst_name
      if(row == 1){
        myID =  this.fxrGsList
        analyst_id =  this.batchFxr.user_id
        analyst_name =  this.batchFxr.user_name
      }else{
        myID =  this.chooseFxrId
        analyst_id = row.user_id
        analyst_name = row.user_name
      }
      let obj = {
        id: myID,
        jbxx_id: this.form.jbxx_id,
        user_id: localStorage.getItem("user_id"),
        analyst_id: analyst_id,
        analyst_name: analyst_name,
        cate: this.CompanyList.cate,
        type: "2"
      };
      this.axios.post("/relation/pro_details/editComp", obj, data => {
        this.dialogVisibleFxrChoose = false;
        this.radio = "";
        this.getCompanyList();
      });
    },
    //  权限控制 点击公司名称时
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
    openGs (row, model) {
      if (model === 2) {
        row.gs_id = row.id;
        row.qymc = row.company_name;
      }
      if (this.role.company_role !== "C") {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.qymc}`
        });
        window.open(href, "公司详情" + row.gs_id);
      } else {
        this.axios.post(
          "/index/mine/roleCompSource",
          { gs_id: row.gs_id },
          res => {
            // 获取跳转页面结果
            if (res === "四川省建设厅") {
              let { href } = this.$router.resolve({
                path: `/gs_scjst?gs_id=${row.gs_id}`
              });
              window.open(href, "/gs_scjst" + row.gs_id);
            } else {
              let { href } = this.$router.resolve({
                path: `/gs_building?gs_id=${row.gs_id}`
              });
              window.open(href, "/gs_building" + row.gs_id);
            }
          }
        );
      }
    },
    changeQuan (role) {
      let self = this;
      self.axios.post(
        "/index/project/projectSave",
        {
          jbxx_id: this.form.jbxx_id,
          role
        },
        data => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.role = data;
          this.getRe_detail();
        }
      );
    },
    changeQuan1 () {
      this.basicInfo.role = "全域";
      this.ModifyData();
    }
  }
};
</script>
<style lang='less' scoped>
#myTkHeader {
  height: 400px;
  // line-height: 40px;
  // margin-left: 50px;
}
.txtColor1 {
  color: #1860a0;
  cursor: pointer;
}
.qyztbDetails {
  header {
    height: 60px;
    font-size: 25px;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid black;
  }
}
.myherder{
  display: block;
  width: 80%; 
  margin:0 auto ; 
}
#myID {
  display: flex;
  justify-content:center;
  align-items:center;
  height: 100px;
  // overflow: visible;
   word-break:break-all;
  font-size: 25px;
  text-align: center;
  // line-height: 100px;
  border-bottom: 1px solid black;
}
#section {
  width: 70%;
  margin: 0 auto;
}
#add {
  width: 100%;
  text-align: center;
  span {
    display: inline-block;
    margin: 0 auto;
  }
}
.headerBtn {
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin-top: 20px;
  border-radius: 10;
  text-align: center;
  color: black;
  border: solid 1px #d5d5d5;
  font-size: 14px;
  cursor: pointer;
}
.headerColor {
  background-color: #37b6ed;
  color: white;
}
.txtColor {
  color: #4999e0;
  cursor: pointer;
}
.NoColor {
  font-size: 14px;
  color: #f44c30;
  cursor: pointer;
}
.yesColor {
  cursor: pointer;
  font-size: 14px;
  color: #4999e0;
}
.activeColor {
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  background-color: #37b6eb;
  color: white;
  cursor: pointer;
}
.normalColor {
  background-color: white;
  color: black;
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  width: 120px;
  height: 40px;
  line-height: 40px;

  cursor: pointer;
}
.Tkfooter {
  text-align: right;
}
.trueBtn {
  color: #67c23a;
  cursor: pointer;
  font-size: 20px;
}
.falseBtn {
  color: #f56c6c;
  cursor: pointer;
  font-size: 20px;
}
.pointer {
  cursor: pointer;
  font-size: 18px;
}
.pointer_finish {
  font-size: 18px;
  cursor: pointer;
  color: #67c23a;
}
.pointer_finish2 {
  font-size: 18px;
  cursor: pointer;
  color: #f78989;
}
.pointer1 {
  cursor: pointer;
  font-size: 12px;
}
.pointer_finish1 {
  cursor: pointer;
  color: #67c23a;
  font-size: 12px;
}
.lookFor {
  cursor: pointer;
  color: #409eff;
  &:hover {
    color: #90c0f0;
  }
}
#share {
  display: flex;
  position: fixed;
  right: -210px;
  bottom: 50%;
  &:hover {
    transition: all 0.3s;
    right: 0;
  }
}
#share1 {
  position: fixed;
  right: 0px;
  bottom: calc(45%);
}
.choosePerson {
  margin: 20px 50px;
  height: 30px;
  line-height: 30px;
  background-color: #dfecec31;
  border-radius: 10px;
  div {
    p {
      margin-left: 10px;
    }
  }
}
.dialog-footer {
  text-align: center;
}
.lookForImg {
  vertical-align: middle;
  height: 30px;
  width: 30px;
  padding: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.link_color {
  color: #409eff;
  cursor: pointer;
}
.fxrChoose{
  width:100%;
  text-align:center;
  height:400px;
  line-height:400px;
  cursor: pointer;
}
.zzyqTj{
  color: #606266;
  font-size:14px;
  margin-top:10px;
   border: 1px solid #d5d5d5;
    padding: 5px;
    // position: relative;
}
.zzyqTjHeader{
  // position: absolute;
  // left:20px;
  // top:-10px;
  font-size: 12px;
  background-color: #ffffff
}
.myPointer {
  cursor: pointer;
  font-size: 20px;
}
.roleNol {
  color: #f57272;
}
.roleAct {
  color: #409eff;

}
</style>
