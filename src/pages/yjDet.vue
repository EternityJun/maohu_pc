<template>
  <div class="ItemInfo_content">
    <div class="content_header">
      <div class="tittle">{{itemInfo.name}}</div>
    </div>
    <!-- 全国 -->
    <div class="content_body" v-if="$route.query.source=='jzsc'">
      <!-- 基本信息 -->
      <div class="body_header">
        <table-info :tableData="tableData" @onChangeData="onChangeData"></table-info>
      </div>
      <!-- 选项卡 和下面的内容 -->
      <div class="body_content" style="position:relative">
        <div>
          <div style="width:525px;float:left">
            <head-nav :data="navData" @switchNav="switchNav"></head-nav>
          </div>
          <span class="sjy" :style="{left:weizhi==1?'96px':'450px'}" @click="clickSjy()" v-if="$route.query.cate!='add'">
            <img src="../assets/gs_jst&gl.png" alt="" style="width:18px;vertical-align:middle">
            <span style="vertical-align:middle;text-decoration: underline;">数据源</span>
          </span>
        </div>
        <!-- 各方责任主体 -->
        <div v-if="gfzrzt && weizhi!=1">
          <el-table :data="gfzrztData" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column prop="sjdw" label="涉及单位" align="center">
            </el-table-column>
            <el-table-column prop="qymc" label="企业名称" align="center">
            </el-table-column>
            <el-table-column prop="zzjgdm" label="组织机构代码" align="center">
            </el-table-column>
            <el-table-column prop="szsf" label="所在省份" align="center">
            </el-table-column>
          </el-table>
        </div>
        <!-- 相关人员及角色 -->
        <div v-if="xgryjjs">
          <el-table :data="rolesTableData" style="width: 100%" border :span-method="objectSpanMethod">
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <!-- <el-table-column prop="qymc" label="公司名称" align="center">
            </el-table-column> -->
            <el-table-column prop="xm" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="drjs" label="担任角色" align="center">
            </el-table-column>
            <el-table-column prop="zjhm" label="证书号码" align="center">
            </el-table-column>
            <el-table-column prop="zclxjdj" label="注册类型及等级" align="center">
            </el-table-column>
            <el-table-column prop="zyyzh" label="执业印章号" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div v-if="je||weizhi==1">
          <!-- 导航栏 -->
          <div style="height:40px;margin-top:76px;">
            <div class="je_nav" style="float:left;margin-top:10px;" v-if="nav_numbber[0] != ''">
              <span v-if="nav_numbber.length != 0" v-for="(item,key) in nav_numbber" :key="key" @click="changeNav(item)" :style="{borderRadius:'4px',padding:'5px',backgroundColor:nav_name==item?'#409EFF':'#fff',cursor:'pointer',color:nav_name==item?'#fff':'#000'}">{{item}}</span>
            </div>
            <div style="float:right">
              <span style="cursor:pointer;" @click="editMd" v-if="weizhi < 3">
                <i class="el-icon-edit-outline" style="font-size:18px;"></i>编辑
              </span>
              <span style="color:#606266;font-size:14px;" v-if="weizhi>1">标段选择&nbsp;</span>
              <el-select v-model="biaoduan" placeholder="请选择" @change="biaoduanChange" v-if="weizhi>1">
                <el-option v-for="(item,key) in options_biaoduan" :key="key" :label="item" :value="item">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-loading="je_loading" style="height:250px;margin-top:10px;">
            <!-- 左边部分 -->
            <div :style="{float:'left',width:'600px'}">
              <div>
                <div class="left_box" style="border-top: 1px #d5d5d5 solid;">总投资(万元)</div>
                <div class="right_box" style="border-top: 1px #d5d5d5 solid;">{{jeData.ztz}}</div>
              </div>
              <div>
                <div class="left_box">中标金额(万元)</div>
                <div class="right_box">{{jeData.zbje}}</div>
              </div>
              <div>
                <div class="left_box">合同金额(万元)</div>
                <div class="right_box">{{jeData.htje}}</div>
              </div>
              <div>
                <div class="left_box">实际造价(万元)</div>
                <div class="right_box">{{jeData.sjzj}}</div>
              </div>
              <div>
                <div class="left_box"></div>
                <div class="right_box"></div>
              </div>
              <div>
                <div class="left_box"></div>
                <div class="right_box"></div>
              </div>
            </div>
            <!-- 右边部分 -->
            <div :style="{float:'left',width:'600px'}">
              <div>
                <div class="left_box" style="border-top: 1px #d5d5d5 solid;">中标日期</div>
                <div class="right_box" style="border-top: 1px #d5d5d5 solid;">{{jeData.zbrq}}</div>
              </div>
              <div>
                <div class="left_box">审查完成日期</div>
                <div class="right_box">{{jeData.scwcrq}}</div>
              </div>
              <div>
                <div class="left_box">合同签订日期</div>
                <div class="right_box">{{jeData.htqdrq}}</div>
              </div>
              <div>
                <div class="left_box">发证日期</div>
                <div class="right_box">{{jeData.fzrq}}</div>
              </div>
              <div>
                <div class="left_box">实际开工日期</div>
                <div class="right_box">{{jeData.kgrq}}</div>
              </div>
              <div>
                <div class="left_box">实际竣工验收日期</div>
                <div class="right_box">{{jeData.jun_rq}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 建设厅 -->
    <div class="content_body" v-if="$route.query.source=='jst'">
      <!-- 基本信息 -->
      <div class="body_header">
        <table-info :tableData="tableData" @onChangeData="onChangeData"></table-info>
      </div>
      <!-- 选项卡 和下面的内容 -->
      <div class="body_content">
        <div style="position:relative">
          <div style="width:525px;float:left">
            <head-nav :data="navData" @switchNav="switchNav"></head-nav>
          </div>
          <span class="sjy" :style="{left:weizhi==1?'96px':'450px'}" @click="clickSjy()" v-if="$route.query.cate!='add'">
            <img src="../assets/gs_jst&gl.png" alt="" style="width:18px;vertical-align:middle">
            <span style="vertical-align:middle;text-decoration: underline;">数据源</span>
          </span>
        </div>
        <!-- 各方责任主体 -->
        <div v-if="gfzrzt&&weizhi !=1">
          <el-table :data="gfzrztData" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column prop="dwjs" label="涉及单位" align="center">
            </el-table-column>
            <el-table-column prop="qymc" label="企业名称" align="center">
            </el-table-column>
            <el-table-column prop="zzjgdm" label="组织机构代码" align="center">
            </el-table-column>
          </el-table>
        </div>
        <!-- 相关人员及角色 -->
        <div v-if="xgryjjs">
          <el-table :data="rolesTableData" style="width: 100%" border :span-method="objectSpanMethod">
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column prop="qymc" label="公司名称" align="center">
            </el-table-column>
            <el-table-column prop="xm" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="drjs" label="担任角色" align="center">
            </el-table-column>
            <el-table-column prop="ryzsh" label="证书号" align="center">
            </el-table-column>
            <el-table-column prop="zw" label="职务" align="center">
            </el-table-column>
            <el-table-column prop="zc" label="职称" align="center">
            </el-table-column>
            <el-table-column prop="zy" label="专业" align="center">
            </el-table-column>
            <el-table-column prop="zczy" label="注册专业" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div v-if="je ||weizhi==1">
          <!-- 导航栏 -->
          <div style="height:40px;margin-top:76px;">
            <div class="je_nav" style="float:left" v-if="nav_numbber[0] != ''">
              <span v-for="(item,key) in nav_numbber" :key="key" @click="changeNav(item)" :style="{borderRadius:'4px',padding:'5px',backgroundColor:nav_name==item?'#409EFF':'#fff',cursor:'pointer',color:nav_name==item?'#fff':'#000'}">{{item}}</span>
            </div>
            <div style="float:right">
              <span style="cursor:pointer;" @click="editMd" v-if="weizhi < 3">
                <i class="el-icon-edit-outline" style="font-size:18px;"></i>编辑
              </span>
              <span style="color:#606266;font-size:14px;" v-if="weizhi>1">标段选择&nbsp;</span>
              <el-select v-model="biaoduan" placeholder="请选择" @change="biaoduanChange" v-if="weizhi>1">
                <el-option v-for="(item,key) in options_biaoduan" :key="key" :label="item" :value="item">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-loading="je_loading" style="height:250px;margin-top:10px;">
            <!-- 左边部分 -->
            <div :style="{float:'left',width:'600px'}">
              <div>
                <div class="left_box" style="border-top: 1px #d5d5d5 solid;">总投资(万元)</div>
                <div class="right_box" style="border-top: 1px #d5d5d5 solid;">{{jeData.ztz}}</div>
              </div>
              <div>
                <div class="left_box">中标金额(万元)</div>
                <div class="right_box">{{jeData.zbje}}</div>
              </div>
              <div>
                <div class="left_box">合同金额(万元)</div>
                <div class="right_box">{{jeData.htje}}</div>
              </div>
              <div>
                <div class="left_box">实际造价(万元)</div>
                <div class="right_box">{{jeData.sjzj}}</div>
              </div>
              <div>
                <div class="left_box"></div>
                <div class="right_box"></div>
              </div>
              <div>
                <div class="left_box"></div>
                <div class="right_box"></div>
              </div>
            </div>
            <!-- 右边部分 -->
            <div :style="{float:'left',width:'600px'}">
              <div>
                <div class="left_box" style="border-top: 1px #d5d5d5 solid;">中标日期</div>
                <div class="right_box" style="border-top: 1px #d5d5d5 solid;">{{jeData.zbrq}}</div>
              </div>
              <div>
                <div class="left_box">审查完成日期</div>
                <div class="right_box">{{jeData.scwcrq}}</div>
              </div>
              <div>
                <div class="left_box">合同签订日期</div>
                <div class="right_box">{{jeData.htqdrq}}</div>
              </div>
              <div>
                <div class="left_box">发证日期</div>
                <div class="right_box">{{jeData.fzrq}}</div>
              </div>
              <div>
                <div class="left_box">实际开工日期</div>
                <div class="right_box">{{jeData.kgrq}}</div>
              </div>
              <div>
                <div class="left_box">实际竣工验收日期</div>
                <div class="right_box">{{jeData.jun_rq}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 公路 -->
    <div class="content_body" v-if="$route.query.source=='gl'">
      <!-- 基本信息 -->
      <div class="body_header">
        <table-info :tableData="tableData" @onChangeData="onChangeData"></table-info>
      </div>
      <!-- 选项卡 和下面的内容 -->
      <div class="body_content">
        <div style="position:relative">
          <div style="width:525px;float:left">
            <head-nav :data="navData" @switchNav="switchNav"></head-nav>
          </div>
          <span class="sjy" :style="{left:weizhi==1?'96px':'450px'}" @click="clickSjy()" v-if="$route.query.cate!='add'">
            <img src="../assets/gs_jst&gl.png" alt="" style="width:18px;vertical-align:middle">
            <span style="vertical-align:middle;text-decoration: underline;">数据源</span>
          </span>
        </div>
        <!-- 各方责任主体 -->
        <div v-if="gfzrzt&&weizhi!=1">
          <el-table :data="gfzrztData" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column prop="qymc" label="企业名称" align="center">
            </el-table-column>
            <el-table-column prop="bdmc" label="标段名称" align="center">
            </el-table-column>
            <el-table-column prop="yyzzzch" label="营业执照注册号" align="center">
            </el-table-column>
            <el-table-column prop="zcsf" label="所在省份" align="center">
            </el-table-column>
          </el-table>
        </div>
        <!-- 相关人员及角色 -->
        <div v-if="xgryjjs">
          <el-table :data="rolesTableData" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column prop="drgw" label="担任岗位或专业负责人" align="center">
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="rzsj" label="任职日期" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div v-if="je||weizhi==1">
          <!-- 导航栏 -->
          <div style="height:40px;margin-top:76px;">
            <div class="je_nav" style="float:left">
              <span v-for="(item,key) in nav_numbber" :key="key" @click="changeNav(item)" :style="{borderRadius:'4px',padding:'5px',backgroundColor:nav_name==item?'#409EFF':'#fff',cursor:'pointer',color:nav_name==item?'#fff':'#000'}">{{item}}</span>
            </div>
          </div>
          <div style="text-align:right" @click="editMd" v-if="weizhi <3">
            <span style="cursor:pointer;">
              <i class="el-icon-edit-outline" style="font-size:18px;" v-if="weizhi <3"></i>编辑
            </span>
          </div>
          <div v-loading="je_loading" style="height:130px;margin-top:10px;">
            <!-- 左边部分 -->
            <div :style="{float:'left',width:'600px'}">
              <div>
                <div class="left_box" style="border-top: 1px #d5d5d5 solid;">合同价（万元）</div>
                <div class="right_box" style="border-top: 1px #d5d5d5 solid;">{{jeData.htje}}</div>
              </div>
              <div>
                <div class="left_box">结算价（万元）</div>
                <div class="right_box">{{jeData.jsje}}</div>
              </div>
              <div>
                <div class="left_box"></div>
                <div class="right_box"></div>
              </div>
            </div>
            <!-- 右边部分 -->
            <div :style="{float:'left',width:'600px'}">
              <div>
                <div class="left_box" style="border-top: 1px #d5d5d5 solid;">开工日期</div>
                <div class="right_box" style="border-top: 1px #d5d5d5 solid;">{{jeData.kgrq}}</div>
              </div>
              <div>
                <div class="left_box">交工日期</div>
                <div class="right_box">{{jeData.jiao_rq}}</div>
              </div>
              <div>
                <div class="left_box">竣工日期</div>
                <div class="right_box">{{jeData.jun_rq}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 水利 -->
    <div class="content_body" v-if="$route.query.source=='sl'">
      <!-- 基本信息 -->
      <div class="body_header">
        <table-info :tableData="tableData" @onChangeData="onChangeData"></table-info>
      </div>
      <!-- 选项卡 和下面的内容 -->
      <div class="body_content">
        <div style="position:relative">
          <div style="width:525px;float:left">
            <head-nav :data="navData" @switchNav="switchNav"></head-nav>
          </div>
          <span class="sjy" :style="{left:weizhi==1?'96px':'450px'}" @click="clickSjy()" v-if="$route.query.cate!='add'">
            <img src="../assets/gs_sl.png" alt="" style="width:18px;vertical-align:middle">
            <span style="vertical-align:middle;text-decoration: underline;">数据源</span>
          </span>
        </div>
        <!-- 各方责任主体 -->
        <div v-if="gfzrzt&&weizhi!=1">
          <el-table :data="gfzrztData" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column prop="dwlb" label="单位部门" align="center">
            </el-table-column>
            <el-table-column prop="qymc" label="企业名称" align="center">
            </el-table-column>
            <el-table-column prop="tyshxydm" label="组织机构代码" align="center">
            </el-table-column>
            <el-table-column prop="ssss" label="所在省份" align="center">
            </el-table-column>
          </el-table>
        </div>
        <!-- 相关人员及角色 -->
        <div v-if="xgryjjs">
          <el-table :data="rolesTableData" style="width: 100%" border :span-method="objectSpanMethod">
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column prop="qymc" label="公司名称" align="center">
            </el-table-column>
            <el-table-column prop="zw" label="担任岗位或专业负责人" align="center">
            </el-table-column>
            <el-table-column prop="xm" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="cyksnf" label="任职日期" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div v-if="je||weizhi==1">
          <!-- 导航栏 -->
          <div style="height:40px;margin-top:76px;">
            <div class="je_nav" style="float:left">
              <span v-for="(item,key) in nav_numbber" :key="key" @click="changeNav(item)" :style="{borderRadius:'4px',padding:'5px',backgroundColor:nav_name==item?'#409EFF':'#fff',cursor:'pointer',color:nav_name==item?'#fff':'#000'}">{{item}}</span>
            </div>
          </div>
          <div style="text-align:right" @click="editMd" v-if="weizhi < 3">
            <span style="cursor:pointer;">
              <i class="el-icon-edit-outline" style="font-size:18px;"></i>编辑
            </span>
          </div>
          <div v-loading="je_loading" style="height:250px;margin-top:10px;">
            <!-- 左边部分 -->
            <div :style="{float:'left',width:'600px'}">
              <div>
                <div class="left_box" style="border-top: 1px #d5d5d5 solid;">合同金额(万元)</div>
                <div class="right_box" style="border-top: 1px #d5d5d5 solid;">{{jeData.htje}}</div>
              </div>
              <div>
                <div class="left_box">结算金额(万元)</div>
                <div class="right_box">{{jeData.jsje}}</div>
              </div>
              <div>
                <div class="left_box"></div>
                <div class="right_box"></div>
              </div>
              <div>
                <div class="left_box"></div>
                <div class="right_box"></div>
              </div>
            </div>
            <!-- 右边部分 -->
            <div :style="{float:'left',width:'600px'}">
              <div>
                <div class="left_box" style="border-top: 1px #d5d5d5 solid;">合同签订日期</div>
                <div class="right_box" style="border-top: 1px #d5d5d5 solid;">{{jeData.htqdrq}}</div>
              </div>
              <div>
                <div class="left_box">合同期限</div>
                <div class="right_box">{{jeData.htqx}}</div>
              </div>
              <div>
                <div class="left_box">开工日期</div>
                <div class="right_box">{{jeData.kgrq}}</div>
              </div>
              <div>
                <div class="left_box">实际工期</div>
                <div class="right_box">{{jeData.sjgq}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 业绩编辑窗口 -->
    <el-dialog width="68%" title="编辑业绩" :visible.sync="addYj.visible">
      <div class="add-ban" style="margin-top:20px;">
        <p class="add-text">基本信息</p>
        <div>
          <div class="add-form">
            <el-form :inline="true" class="demo-form-inline" label-width="125px" @submit.native.prevent>
              <el-form-item :label="item.name" v-for="(item, key) in jbxxList" :key="key" class="add-form-item1" v-if="item.type != 'no'">
                <el-input v-model="item['value']" placeholder="请输入内容" class="add-input" v-if="item.type == 'input'"></el-input>
                <el-input v-model="item['value']" placeholder="请输入内容" class="add-input" disabled v-if="item.type == 'none'"></el-input>
                <el-input v-model="item['value']" placeholder="请输入内容" class="add-input" style="display:none" v-if="item.type == 'no'"></el-input>
                <el-input type="number" v-model="item['value']" placeholder="请输入内容" class="add-input" v-if="item.type == 'number'"></el-input>
                <el-date-picker type="date" placeholder="选择日期" v-model="item['value']" v-if="item.type == 'time'"></el-date-picker>
                <el-select v-model="item['value']" placeholder="请选择" v-if="item.type == 'select'" class="add-input">
                  <el-option v-for="item1 in item.list" :key="item1.value" :label="item1.label" :value="item1.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div>
        <el-form :inline="true" class="demo-form-inline" style="text-align:center;margin-top:20px;" @submit.native.prevent>
          <el-form-item>
            <el-button type="primary" @click="toData">确认</el-button>
            <el-button @click="addYj.visible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 金额时间编辑窗口 -->
    <el-dialog width="68%" title="编辑金额/时间" :visible.sync="addYj.md.visible">
      <div class="add-ban" style="margin-top:20px;">
        <p class="add-text">金额/日期</p>
        <div>
          <div class="add-form" v-loading="addYj.md.loading">
            <el-form :inline="true" class="demo-form-inline" label-width="125px" @submit.native.prevent>
              <el-form-item :label="item.name" v-for="(item, key) in mdList" :key="key" class="add-form-item2">
                <el-input v-model="item['value']" placeholder="请输入内容" style="width:400px;" v-if="item.type == 'input'"></el-input>
                <el-input type="number" v-model="item['value']" placeholder="请输入内容" style="width:400px;" v-if="item.type == 'number'"></el-input>
                <el-input v-model="item['value']" placeholder="请输入内容" class="add-input" style="display:none" v-if="item.type == 'no'"></el-input>
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="item['value']" v-if="item.type == 'time'" style="width:400px;" @change="checkHt(item.key)"></el-date-picker>
                <el-select v-model="item['value']" placeholder="请选择" v-if="item.type == 'select'" style="width:400px;">
                  <el-option v-for="item1 in item.list" :key="item1.value" :label="item1.label" :value="item1.value">
                  </el-option>
                </el-select>
                <el-input v-model="item['value']" placeholder="请输入内容" style="width:400px;" v-if="item.type == 'none'" disabled></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div>
        <el-form :inline="true" class="demo-form-inline" style="text-align:center;margin-top:20px;" @submit.native.prevent>
          <el-form-item>
            <el-button type="primary" @click="toDataMd">确认</el-button>
            <el-button @click="addYj.md.visible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import tableInfo from './template/tableInfo.vue'
import headNav from './template/head_nav.vue'
import tableMregeFn from "./../tableMrege";

import { valid } from 'semver'
import { isArray } from 'util'
export default {
  components: {
    tableInfo,
    headNav
  },
  created() {
    // //判断横条的东西
    this.panduan()
    // 获得基本信息
    this.getJbxx()
    // 获得各方责任主体 数据
    this.getTableDataGF()
    // 获得相关人员角色 数据
    this.getRoleData()
    // 获得 导航栏的 条数(红框那个)
    // this.getCountNav()
    //获得 施工 设计 勘察 监理 数据
    this.getDataSg()
    // 加载标段
    this.getBiaoduan()
  },
  data() {
    return {
      ajaxData2: {},
      addYj: {
        md: {
          loading: false,
          visible: false
        },
        page: {
          jbxx: [],
          md: []
        },
        visible: false,
        type: '全国建筑市场',
        jzsc: {
          jbxx: [
            {
              key: 'proj_id',
              name: '项目编号',
              value: '',
              type: 'none'
            },
            {
              key: 'xmmc',
              name: '项目名称',
              value: '',
              type: 'input'
            },
            {
              key: 'xmbh',
              name: '项目编号',
              value: '',
              type: 'input'
            },
            {
              key: 'sjxmbh',
              name: '省级项目编号',
              value: '',
              type: 'input'
            },
            {
              key: 'szqh',
              name: '所在区划',
              value: '',
              type: 'input'
            },
            {
              key: 'jsdw',
              name: '建设单位',
              value: '',
              type: 'input'
            },
            {
              key: 'jsdwzzjgdm',
              name: '统一社会信用代码',
              value: '',
              type: 'input'
            },
            {
              key: 'xmfl',
              name: '项目分类',
              value: '',
              type: 'select',
              list: [
                { value: '建筑工程', label: '建筑工程' },
                { value: '市政工程', label: '市政工程' },
                { value: '水利工程', label: '水利工程' },
                { value: '公路工程', label: '公路工程' },
                { value: '其他工程', label: '其他工程' }
              ]
            },
            {
              key: 'jsxz',
              name: '建设性质',
              value: '',
              type: 'input'
            },
            {
              key: 'gcyt',
              name: '工程用途',
              value: '',
              type: 'input'
            },
            {
              key: 'zmj',
              name: '总面积(平方米)',
              value: '',
              type: 'input'
            },
            {
              key: 'ztz',
              name: '总投资',
              value: '',
              type: 'no'
            },
            {
              key: 'lxjb',
              name: '立项级别',
              value: '',
              type: 'input'
            },
            {
              key: 'lxwh',
              name: '立项文号',
              value: '',
              type: 'input'
            }
          ],
          md: [
            {
              key: 'ztz',
              name: '总投资(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'zbje',
              name: '中标金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'htje',
              name: '合同金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'sjzj',
              name: '实际造价(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'zbrq',
              name: '中标日期',
              value: '',
              type: 'time'
            },
            {
              key: 'scwcrq',
              name: '审查完成日期',
              value: '',
              type: 'time'
            },
            {
              key: 'htqdrq',
              name: '合同签订日期',
              value: '',
              type: 'time'
            },
            {
              key: 'fzrq',
              name: '发证日期',
              value: '',
              type: 'time'
            },
            {
              key: 'kgrq',
              name: '实际开工日期',
              value: '',
              type: 'time'
            },
            {
              key: 'jun_rq',
              name: '实际竣工验收日期',
              value: '',
              type: 'time'
            }
          ]
        },
        scjst: {
          jbxx: [
            {
              key: 'xmmc',
              name: '项目名称',
              value: '',
              type: 'input'
            },
            {
              key: 'xmbh',
              name: '项目编号',
              value: '',
              type: 'input'
            },
            {
              key: 'lxwh',
              name: '立项文号',
              value: '',
              type: 'input'
            },
            {
              key: 'jsdw',
              name: '建设单位',
              value: '',
              type: 'input'
            },
            {
              key: 'jsdz',
              name: '建设地址',
              value: '',
              type: 'input'
            },
            {
              key: 'ssdq',
              name: '所属地区',
              value: '',
              type: 'select',
              list: [
                { value: '建筑工程', label: '建筑工程' },
                { value: '市政工程', label: '市政工程' },
                { value: '水利工程', label: '水利工程' },
                { value: '公路工程', label: '公路工程' },
                { value: '其他工程', label: '其他工程' }
              ]
            },
            {
              key: 'xmfl',
              name: '项目分类',
              value: '',
              type: 'input'
            },
            {
              key: 'jsxz',
              name: '建设性质',
              value: '',
              type: 'input'
            },
            {
              key: 'ztz',
              name: '总投资',
              value: '',
              type: 'no'
            },
            {
              key: 'gcyt',
              name: '工程用途',
              value: '',
              type: 'input'
            },
            {
              key: 'jsgm',
              name: '建设规模',
              value: '',
              type: 'input'
            }
          ],
          md: [
            {
              key: 'ztz',
              name: '总投资(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'zbje',
              name: '中标金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'htje',
              name: '合同金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'sjzj',
              name: '实际造价(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'zbrq',
              name: '中标日期',
              value: '',
              type: 'time'
            },
            {
              key: 'scwcrq',
              name: '审查完成日期',
              value: '',
              type: 'time'
            },
            {
              key: 'htqdrq',
              name: '合同签订日期',
              value: '',
              type: 'time'
            },
            {
              key: 'fzrq',
              name: '发证日期',
              value: '',
              type: 'time'
            },
            {
              key: 'kgrq',
              name: '实际开工日期',
              value: '',
              type: 'time'
            },
            {
              key: 'jun_rq',
              name: '实际竣工验收日期',
              value: '',
              type: 'time'
            }
            // zyz: '',
            // zbje: '',
            // hthe: '',
            // sjzj: '',
            // brq: '',
            // scwcrq: '',
            // htqdrq: '',
            // fzrq: '',
            // kgrq: '',
            // jun_rq: ''
          ]
        },
        gl: {
          jbxx: [
            {
              key: 'qymc',
              name: '企业名称',
              value: '',
              type: 'input'
            },
            {
              key: 'xmmc',
              name: '项目名称',
              value: '',
              type: 'input'
            },
            {
              key: 'xmlx',
              name: '项目类型',
              value: '',
              type: 'input'
            },
            {
              key: 'jsdj',
              name: '技术等级',
              value: '',
              type: 'input'
            },
            {
              key: 'htdmc',
              name: '合同段名称',
              value: '',
              type: 'input'
            },
            {
              key: 'kszh',
              name: '合同段开始桩号',
              value: '',
              type: 'input'
            },
            {
              key: 'jszh',
              name: '合同段结束桩号',
              value: '',
              type: 'input'
            },
            {
              key: 'zlpdqk',
              name: '质量评定情况',
              value: '',
              type: 'input'
            },
            {
              key: 'szsf',
              name: '所在省份',
              value: '',
              type: 'input'
            },
            {
              key: 'xmdm',
              name: '项目代码',
              value: '',
              type: 'input'
            },
            {
              key: 'zygcl',
              name: '主要工程量',
              value: '',
              type: 'input'
            },
            {
              key: 'yj_type',
              name: '信息来源',
              value: '',
              type: 'select',
              list: [
                { value: 1, label: '省厅录入' },
                { value: 2, label: '省厅审核' }
              ]
            },
            {
              key: 'yz',
              name: '建设状态',
              value: '',
              type: 'select',
              list: [
                { value: '主包,已建', label: '主包,已建' },
                { value: '分包,已建', label: '分包,已建' },
                { value: '主包,在建', label: '主包,在建' },
                { value: '分包,在建', label: '分包,在建' }
              ]
            },
            {
              key: 'bdlx',
              name: '标段类型',
              value: '',
              type: 'input'
            },
            {
              key: 'bdmc',
              name: '标段名称',
              value: '',
              type: 'input'
            },
            {
              key: 'zbqy',
              name: '中标企业',
              value: '',
              type: 'input'
            },
            {
              key: 'sfwg',
              name: '是否完工',
              value: '',
              type: 'input'
            },
            {
              key: 'jgysdf',
              name: '交工验收得分',
              value: '',
              type: 'input'
            },
            {
              key: 'jsgm',
              name: '合同段建设规模',
              value: '',
              type: 'input'
            },
            {
              key: 'other',
              name: '其他',
              value: '',
              type: 'input'
            }
          ],
          md: [
            {
              key: 'htje',
              name: '合同价(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'jsje',
              name: '结算价(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'kgrq',
              name: '开工日期',
              value: '',
              type: 'time'
            },
            {
              key: 'jiao_rq',
              name: '交工日期',
              value: '',
              type: 'time'
            },
            {
              key: 'jun_rq',
              name: '竣工日期',
              value: '',
              type: 'time'
            }
          ]
        },
        sl: {
          jbxx: [
            {
              key: 'xmmc',
              name: '项目名称',
              value: '',
              type: 'input'
            },
            {
              key: 'htmc',
              name: '合同名称',
              value: '',
              type: 'input'
            },
            {
              key: 'xmlx',
              name: '项目类型',
              value: '',
              type: 'input'
            },
            {
              key: 'gczt',
              name: '工程状态',
              value: '',
              type: 'input'
            },
            {
              key: 'xmgs',
              name: '项目归属',
              value: '',
              type: 'input'
            },
            {
              key: 'gclx',
              name: '工程类型',
              value: '',
              type: 'input'
            },
            {
              key: 'gcjsms',
              name: '工程建设模式',
              value: '',
              type: 'input'
            },
            {
              key: 'gcbh',
              name: '工程编号',
              value: '',
              type: 'input'
            },
            {
              key: 'gcdb',
              name: '工程等别',
              value: '',
              type: 'input'
            },
            {
              key: 'gcjb',
              name: '工程级别',
              value: '',
              type: 'input'
            },
            {
              key: 'gcgm',
              name: '工程规模',
              value: '',
              type: 'input'
            },
            {
              key: 'gcgjzb',
              name: '工程关键指标',
              value: '',
              type: 'input'
            },
            {
              key: 'htzynr',
              name: '合同主要内容',
              value: '',
              type: 'input'
            }
          ],
          md: [
            {
              key: 'htje',
              name: '合同金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'jsje',
              name: '结算金额(万元)',
              value: '',
              type: 'number'
            },
            {
              key: 'htqdrq',
              name: '合同签订日期',
              value: '',
              type: 'time'
            },
            {
              key: 'htqx_min',
              name: '合同期限(开始日期)',
              value: '',
              type: 'time'
            },
            {
              key: 'htqx_max',
              name: '合同期限(结束日期)',
              value: '',
              type: 'time'
            },
            {
              key: 'htqx_total',
              name: '合同期限(总天数)',
              value: '',
              type: 'none'
            },
            {
              key: 'kgrq',
              name: '开工日期',
              value: '',
              type: 'time'
            },
            {
              key: 'sjgq_min',
              name: '实际工期(开始日期)',
              value: '',
              type: 'time'
            },
            {
              key: 'sjgq_max',
              name: '实际工期(结束日期)',
              value: '',
              type: 'time'
            },
            {
              key: 'sjgq_total',
              name: '实际工期(总天数)',
              value: '',
              type: 'none'
            }
          ]
        }
      },
      itemInfo: {
        name: '暂时没有数据'
      },
      tableData: {
        col: 3,
        rows: []
      },
      navData:
        this.$route.query.cate == 'add'
          ? {
              nav: [{ text: '金额/日期', num: 0 }],
              source: {
                link: '',
                name: ''
              }
            }
          : {
              nav: [
                { text: '各方责任主体', num: 0 },
                { text: '相关人员及角色', num: 0 },
                { text: '金额/日期', num: 0 }
              ],
              source: {
                link: '',
                name: ''
              }
            },
      gfzrztData: [],
      rolesTableData: [],
      merge_array:[],
      //   页面中的导航页跳转
      gfzrzt: true,
      xgryjjs: false,
      countNav: [],
      je: false,
      //  子导航菜单
      sg: true,
      sj: false,
      kc: false,
      jl: false,
      //金额日期数据源
      jeData: {},
      je_loading: false,
      nav_numbber: [],
      nav_name: '',
      // 标段的数量
      options_biaoduan: [],
      biaoduan: '',
      sub_id: '',
      sub_type: '',
      jbxxList: [],
      aList: [{ type: '' }],
      mdList: [],
      jbxx_ajaxData: {},
      md_ajaxData: {},
      remark: '',
      b: 10,
      weizhi: 0
    }
  },
  watch: {},
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let prop = column.property
      if (prop == 'qymc') {
        const _row = this.merge_array[rowIndex][prop]
        const _col = 1
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    //判断横条的东西
    panduan() {
      if (this.$route.query.cate == 'add') {
        this.weizhi = 1
      } else if (this.$route.query.cate == 'import') {
        this.weizhi = 2
      } else {
        this.weizhi = 3
      }
    },
    //根据来源匹配编辑窗口
    pipeiEdit() {
      if (this.$route.query.source == 'jzsc') {
        this.remark = '全国建筑市场'
        this.addYj.page.jbxx = this.addYj.jzsc.jbxx
      } else if (this.$route.query.source == 'jst') {
        this.remark = '四川省建设厅'
        this.addYj.page.jbxx = this.addYj.scjst.jbxx
      } else if (this.$route.query.source == 'gl') {
        this.remark = '全国公路市场'
        this.addYj.page.jbxx = this.addYj.gl.jbxx
      } else if (this.$route.query.source == 'sl') {
        this.remark = '全国水利市场'
        this.addYj.page.jbxx = this.addYj.sl.jbxx
      }
      this.jbxxEdit()
    },
    pipeiMd() {
      if (this.$route.query.source == 'jzsc') {
        this.remark = '全国建筑市场'
        this.addYj.page.md = this.addYj.jzsc.md
      } else if (this.$route.query.source == 'jst') {
        this.remark = '四川省建设厅'
        this.addYj.page.md = this.addYj.scjst.md
      } else if (this.$route.query.source == 'gl') {
        this.remark = '全国公路市场'
        this.addYj.page.md = this.addYj.gl.md
      } else if (this.$route.query.source == 'sl') {
        this.remark = '全国水利市场'
        this.addYj.page.md = this.addYj.sl.md
      }
      this.mdEdit()
    },
    //匹配返回的基本信息，填入编辑框
    jbxxEdit() {
      var count1 = 1
      var arr = {}
      let aaa = this.jbxxList
      for (var i = 0; i < aaa.length; i++) {
        for (var j = 0; j < this.addYj.page.jbxx.length; j++) {
          if (this.addYj.page.jbxx[j].key == aaa[i].key) {
            this.jbxxList[i].type = this.addYj.page.jbxx[j].type
            if (this.jbxxList[i].value == '-') {
              this.jbxxList[i].value = ''
            }
            if (this.jbxxList[i].key == 'yj_type') {
              this.jbxxList[i].list = [
                { value: 1, label: '省厅录入' },
                { value: 2, label: '省厅审核' }
              ]
              if (this.jbxxList[i].value == '省厅录入') {
                this.jbxxList[i].value = 1
              } else {
                this.jbxxList[i].value = 2
              }
            }
            if (this.jbxxList[i].key == 'xmfl') {
              this.jbxxList[i].list = [
                { value: '建筑工程', label: '建筑工程' },
                { value: '市政工程', label: '市政工程' },
                { value: '水利工程', label: '水利工程' },
                { value: '公路工程', label: '公路工程' },
                { value: '其他工程', label: '其他工程' }
              ]
            }
            if (this.jbxxList[i].key == 'yz') {
              var arr = this.jbxxList[i].value.split('')
              this.jbxxList[i].value = arr[0] + arr[1] + ',' + arr[2] + arr[3]
              this.jbxxList[i].list = [
                { value: '主包,已建', label: '主包,已建' },
                { value: '分包,已建', label: '分包,已建' },
                { value: '主包,在建', label: '主包,在建' },
                { value: '分包,在建', label: '分包,在建' }
              ]
            }
            if (this.jbxxList[i].key == 'gcdb' && count1 == 1) {
              if (this.jbxxList[i].value == '') {
                count1 = count1 + 1
                this.jbxxList.push({
                  key: 'gcdb',
                  name: '工程等别',
                  value: '',
                  type: 'input'
                })
                this.jbxxList.splice(i, 1)
                this.jbxxList.push({
                  key: 'gcjb',
                  name: '工程级别',
                  value: '',
                  type: 'input'
                })
                this.jbxxList.push({
                  key: 'gcgm',
                  name: '工程规模',
                  value: '',
                  type: 'input'
                })
              } else {
                count1 = count1 + 1
                var arr1 = this.jbxxList[i].value.split('    ')
                this.jbxxList.push({
                  key: 'gcdb',
                  name: arr1[0].split('：')[0],
                  value: arr1[0].split('：')[1],
                  type: 'input'
                })
                this.jbxxList.splice(i, 1)
                this.jbxxList.push({
                  key: 'gcjb',
                  name: arr1[1].split('：')[0],
                  value: arr1[1].split('：')[1],
                  type: 'input'
                })
                this.jbxxList.push({
                  key: 'gcgm',
                  name: arr1[2].split('：')[0],
                  value: arr1[2].split('：')[1],
                  type: 'input'
                })
              }
            }
          }
        }
      }
      this.jbxxList.push(arr)
    },
    //匹配返回的金额日期，填入编辑框
    mdEdit() {
      this.mdList = this.addYj.page.md
      for (var i = 0; i < this.mdList.length; i++) {
        if (this.jeData[this.mdList[i].key]) {
          this.mdList[i].value = this.jeData[this.mdList[i].key]
        }
        if (this.mdList[i].value == '-') {
          this.mdList[i].value = ''
        }
      }
    },
    editMd() {
      this.pipeiMd()
      this.addYj.md.visible = true
    },
    //判断合同总天数
    checkHt(type) {
      this.checkGq(type)
      if (this.remark == '全国水利市场') {
        if (type == 'htqx_min' || type == 'htqx_max') {
          if (
            this.addYj.page.md[3].value != '' &&
            this.addYj.page.md[4].value != ''
          ) {
            if (this.addYj.page.md[3].value > this.addYj.page.md[4].value) {
              this.addYj.page.md[3].value = ''
              this.addYj.page.md[4].value = ''
              alert('结束日期不能大于开始日期')
            } else {
              this.addYj.page.md[5].value =
                Date.parse(this.addYj.page.md[4].value) -
                Date.parse(this.addYj.page.md[3].value)
              this.addYj.page.md[5].value =
                this.addYj.page.md[5].value / 3600 / 24 / 1000
            }
          }
        }
      }
    },
    //判断实际工期
    checkGq(type) {
      if (this.remark == '全国水利市场') {
        if (type == 'sjgq_min' || type == 'sjgq_max') {
          if (
            this.addYj.page.md[7].value != '' &&
            this.addYj.page.md[8].value != ''
          ) {
            if (this.addYj.page.md[7].value > this.addYj.page.md[8].value) {
              this.addYj.page.md[7].value = ''
              this.addYj.page.md[8].value = ''
              alert('结束日期不能大于开始日期')
            } else {
              this.addYj.page.md[9].value =
                Date.parse(this.addYj.page.md[8].value) -
                Date.parse(this.addYj.page.md[7].value)
              this.addYj.page.md[9].value =
                this.addYj.page.md[9].value / 3600 / 24 / 1000
            }
          }
        }
      }
    },
    //处理 添加数据
    toData() {
      var gs_id = localStorage.getItem('gs_id')
      var Yjarr = new Array()
      var mdArr = new Array()
      var proj_id = ''
      for (var i = 0; i < this.jbxxList.length; i++) {
        if (this.jbxxList[i].key == 'proj_id') {
          proj_id = this.jbxxList[i].value
        }
        if (this.jbxxList[i].key == 'ztz') {
          this.jbxxList[i].value = this.jbxxList[i].value.split('（')[0]
        }
        if (this.jbxxList[i].key == 'zmj') {
          this.jbxxList[i].value = this.jbxxList[i].value.split('（')[0]
        }
        if (this.jbxxList[i].key == 'yj_type') {
          if (this.jbxxList[i].value == '省厅录入') {
            this.jbxxList[i].value = 1
          } else {
            this.jbxxList[i].value = 2
          }
        }
        Yjarr[this.jbxxList[i].key] = this.jbxxList[i].value
      }
      if (proj_id == '') {
        proj_id = this.$route.query.proj_id
      }
      var jbxx_obj = {
        gs_id: gs_id,
        proj_id: proj_id,
        jbxx: Yjarr,
        remark: this.remark
      }
      this.jbxx_ajaxData = jbxx_obj
      this.jbxx_ajaxData.type = '2'
      this.addProBase()
    },
    //处理 添加数据
    toDataMd() {
      var gs_id = localStorage.getItem('gs_id')
      var Yjarr = new Array()
      var mdArr = new Array()
      var proj_id = ''
      for (var i = 0; i < this.mdList.length; i++) {
        if (this.mdList[i].key == 'proj_id') {
          proj_id = this.mdList[i].value
        }
        if (this.mdList[i].key == 'ztz') {
          this.mdList[i].value = this.mdList[i].value.split('（')[0]
        }
        if (this.mdList[i].key == 'zmj') {
          this.mdList[i].value = this.mdList[i].value.split('（')[0]
        }
        if (this.mdList[i].key == 'sjkgrq') {
          this.mdList[i].key = 'kgrq'
        }
        if (this.mdList[i].key == 'sjjgrq') {
          this.mdList[i].key = 'jun_rq'
        }
        Yjarr[this.mdList[i].key] = this.mdList[i].value
      }
      if (proj_id == '') {
        proj_id = this.$route.query.proj_id
      }
      var jbxx_obj = {
        gs_id: gs_id,
        proj_id: proj_id,
        md: Yjarr,
        sub_id: this.sub_id,
        sub_type: this.sub_type,
        remark: this.remark
      }
      this.md_ajaxData = jbxx_obj
      this.md_ajaxData.type = '2'
      this.saveProMd()
    },
    //请求编辑 金额 接口
    saveProMd() {
      this.addYj.md.loading = true
      this.axios.post(
        '/firm/Company_performance/saveProMd',
        this.md_ajaxData,
        data => {
          if (data.status == 'success') {
            this.addYj.md.loading = false
            this.addYj.md.visible = false
            this.getDataSg()
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.getJbxx()
          } else {
            this.$message({
              message: '编辑失败',
              type: 'warning'
            })
          }
        }
      )
    },
    //请求编辑 基本信息 接口
    addProBase() {
      this.axios.post(
        '/firm/Company_performance/saveProBase',
        this.jbxx_ajaxData,
        data => {
          if (data.status == 'success') {
            this.addYj.visible = false
            this.getJbxx()
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '编辑失败',
              type: 'warning'
            })
          }
        }
      )
    },
    //编辑基本信息
    onChangeData() {
      this.pipeiEdit()
      this.addYj.visible = true
    },
    // 获得基本信息
    getJbxx() {
      var ajaxData = {
        source: this.$route.query.source,
        proj_id: this.$route.query.proj_id
      }
      var cate = this.$route.query.cate
      if (cate == 'add') {
        ajaxData.cate = 'add'
      }
      this.axios.post('/firm/performance/projectBase', ajaxData, data => {
        if (data.status == 'success') {
          this.jbxxList = data.rows
          this.tableData = { col: 3, rows: data.rows }
          data.rows.forEach(element => {
            if (element.name == '项目名称') {
              this.itemInfo.name = element.value
              document.title = this.getWebTitle() + element.value
              return
            }
          })
        } else {
        }
      })
    },
    getWebTitle() {
      var title = this.$route.query.source
      if (title == 'jzsc') {
        return '全 | '
      } else if (title == 'jst') {
        return '川 | '
      } else if (title == 'gl') {
        return '路 | '
      } else if (title == 'sl') {
        return '水 | '
      } else {
        return '未知来源'
      }
    },
    // 获得各方责任主体 数据
    getTableDataGF() {
      if (this.$route.query.cate == 'add') {
        return
      }
      this.axios.post(
        '/firm/performance/allCompany',
        {
          source: this.$route.query.source,
          proj_id: this.$route.query.proj_id
        },
        data => {
          if (data.status == 'success') {
            this.gfzrztData = data.rows
          } else {
          }
        }
      )
    },
    // 获得相关人员角色 数据
    getRoleData() {
      if (this.$route.query.cate == 'add') {
        return
      }
      this.axios.post(
        '/firm/performance/Roles',
        {
          source: this.$route.query.source,
          proj_id: this.$route.query.proj_id
        },
        data => {
          if (data.status == 'success') {
            this.rolesTableData = data.rows
            this.merge_array = tableMregeFn.tableMrege(data.rows);
          } else {
          }
        }
      )
    },
    // 获得 导航栏的 条数(红框那个)
    getCountNav() {
      if (this.$route.query.cate == 'add') {
        return
      }
      let params = {
        source: this.$route.query.source,
        proj_id: this.$route.query.proj_id
      }
      if (
        this.$route.query.source === 'jzsc' ||
        this.$route.query.source === 'jst'
      ) {
        params.sub_id = this.sub_id
      }
      if (this.$route.query.source === 'jzsc') {
        params.sub_type = this.sub_type
      }
      this.axios.post('/firm/performance/countNav', params, data => {
        this.navData = {
          nav: data,
          source: {
            link: '',
            name: ''
          }
        }
      })
    },
    //切换 导航栏时触发
    switchNav(name) {
      this.gfzrzt = false
      this.xgryjjs = false
      this.je = false
      if (name == '各方责任主体') {
        this.gfzrzt = true
      }
      if (name == '相关人员及角色' || name == '岗位专业负责人') {
        this.xgryjjs = true
      }
      if (name == '金额/日期') {
        this.je = true
      }
    },
    //点击数据源
    clickSjy() {
      this.axios.post(
        '/firm/performance/link',
        {
          proj_id: this.$route.query.proj_id,
          source: this.$route.query.source
        },
        data => {
          window.open(data)
        }
      )
      // if (this.$route.query.source == 'jzsc') {
      //   window.open(
      //     'http://jzsc.mohurd.gov.cn/dataservice/query/project/projectDetail/' +
      //       this.$route.query.proj_id
      //   )
      // }
      // if (this.$route.query.source == 'jst') {
      //   window.open(
      //     'http://jst.sc.gov.cn/xxgx/project/projEnte.aspx?ptype=&id=' +
      //       this.$route.query.proj_id
      //   )
      // }
      // if (this.$route.query.source == 'gl') {
      //   this.axios.post(
      //     '/firm/performance/link',
      //     {
      //       proj_id: this.$route.query.proj_id,
      //       source: this.$route.query.source
      //     },
      //     data => {
      //       window.open(data)
      //     }
      //   )
      // }
      // if (this.$route.query.source == 'sl') {
      //   this.axios.post(
      //     '/firm/performance/link',
      //     {
      //       proj_id: this.$route.query.proj_id,
      //       source: this.$route.query.source
      //     },
      //     data => {
      //       window.open(data)
      //     }
      //   )
      // }
    },
    //导航栏数据 施工 设计 勘察 监理
    dataNav() {
      this.axios.post(
        '/firm/performance/countNav',
        {
          source: this.$route.query.source,
          proj_id: this.$route.query.proj_id
        },
        data => {
          this.navData = {
            nav: data,
            source: {
              link: '',
              name: ''
            }
          }
        }
      )
    },
    //导航栏切换 施工 设计 勘察 监理
    changeNav(name) {
      this.nav_name = name
      this.sub_type = name
      // 重新请求数据个数
      this.getCountNav()

      //获得 施工 设计 勘察 监理 数据
      this.getDataSg()
    },
    //获得 施工 设计 勘察 监理 数据
    getDataSg() {
      var ajaxData = {
        source: this.$route.query.source,
        proj_id: this.$route.query.proj_id,
        sub_type: this.sub_type,
        sub_id: this.sub_id
      }
      var cate = this.$route.query.cate
      if (cate == 'add') {
        ajaxData.cate = 'add'
      } else if (cate == 'import') {
        ajaxData.cate = 'import '
      }
      this.je_loading = true
      this.axios.post('/firm/performance/moneyDate', ajaxData, data => {
        if (data.status == 'success') {
          this.jeData = data.rows
        } else {
          this.jeData = {}
        }
        this.je_loading = false
      })
    },
    // 加载标段
    getBiaoduan() {
      if (
        this.$route.query.source == 'jzsc' ||
        this.$route.query.source == 'jst'
      ) {
        var ajaxData = {
          source: this.$route.query.source,
          proj_id: this.$route.query.proj_id
        }
        var cate = this.$route.query.cate
        if (cate == 'add') {
          ajaxData.cate = 'add'
        } else if (cate == 'import') {
          ajaxData.cate = 'import'
        }
        this.axios.post('/firm/performance/subNumber', ajaxData, data => {
          this.options_biaoduan = data
          this.biaoduan = this.options_biaoduan[0]
            ? this.options_biaoduan[0]
            : ''
          this.sub_id = this.options_biaoduan[0] ? this.options_biaoduan[0] : ''
          var ajaxData2 = {
            source: this.$route.query.source,
            sub_id: this.sub_id,
            proj_id: this.$route.query.proj_id
          }
          var cate2 = this.$route.query.cate
          if (cate == 'add') {
            ajaxData2.cate = 'add'
          } else if (cate == 'import') {
            ajaxData2.cate = 'import'
          }
          this.ajaxData2 = ajaxData2
          this.getSubType()
        })
      } else {
        this.getCountNav()
      }
    },
    getSubType() {
      var ajaxData2 = this.ajaxData2
      this.ajaxData2.sub_id = this.sub_id
      this.axios.post('/firm/performance/subType', ajaxData2, data => {
        this.nav_name = data[0] ? data[0] : ''
        this.sub_type = data[0] ? data[0] : ''
        this.getDataSg(data[0] ? data[0] : '没有更多结果')
        this.nav_numbber = data
        // 重新请求统计个数
        this.getCountNav()
      })
    },
    //标段发生了改变
    biaoduanChange() {
      this.sub_id = this.biaoduan
      this.getSubType()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.left_box {
  float: left;
  width: 162px;
  border-left: 1px #d5d5d5 solid;
  border-bottom: 1px #d5d5d5 solid;
  height: 40px;
  background-color: #f9f9f9;
  text-align: center;
  color: #333333;
  font-size: 13px;
  line-height: 40px;
}
.right_box {
  float: right;
  width: 433px;
  border-left: 1px #d5d5d5 solid;
  border-bottom: 1px #d5d5d5 solid;
  height: 40px;
  border-right: 1px #d5d5d5 solid;
  color: #333333;
  font-size: 13px;
  line-height: 40px;
  text-align: center;
}
.je_nav {
  width: 200px;
  span {
    padding: 0 5px;
    cursor: pointer;
    font-size: 14px;
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
      padding: 14px 100px;
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
    width: 1200px;
    margin: 0 auto;
    display: flex;
    padding: 25px;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    height: calc(~'100% - 60px');
    .body_header {
      background: #ffffff;
      .jbxx_left {
        background-color: #f9f9f9;
        border-left: #d5d5d5 1px solid;
        border-bottom: #d5d5d5 1px solid;
        text-align: center;
        font-size: 13px;
        padding: 20px;
      }
      .jbxx_right {
        border-left: #d5d5d5 1px solid;
        border-bottom: #d5d5d5 1px solid;
        text-align: center;
        font-size: 13px;
        padding: 20px;
      }
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
            position: relative;
            background-size: 100% 100%;
            width: 250px;
            line-height: 28px;
            height: 28px;
            text-align: center;
            z-index: 10;
          }
          .eachOne:nth-child(2) {
            left: -30px;
            z-index: 9;
          }
          .eachOne:nth-child(3) {
            left: -55px;
            z-index: 8;
          }

          .eachOne:nth-child(4) {
            left: -82px;
            z-index: 7;
          }
          .active {
            background-image: url('../assets/jd.png');
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
      box-shadow: none;
      background: #ffffff;
      height: calc(~'100% - 270px');
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
          font-size: 20px;
          margin: 25px;
        }
        .table_footer {
          margin: 25px;
          display: block;
        }
      }
    }
  }
}
</style>
<style scoped>
.sjy {
  float: left;
  z-index: 999px;
  position: absolute;
  font-size: 18px;
  top: 16px;
  cursor: pointer;
  color: #909399;
  transition: 0.5s;
}
.sjy:hover {
  color: #409eff;
}
.add-ban {
  border-top: 1px solid #cccccc;
}
.add-input {
  width: 400px;
}
.add-form {
  margin: 10px 0;
  overflow: hidden;
}
.add-form .add-form-item1:nth-child(even) {
  float: right;
}
.add-form .add-form-item1:nth-child(odd) {
  float: left;
}
.add-form .add-form-item2:nth-child(even) {
  float: right;
}
.add-form .add-form-item2:nth-child(odd) {
  float: left;
}
.add-text {
  font-size: 26px;
  text-align: center;
}
</style>
