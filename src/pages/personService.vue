<template>
  <div class="personService_container" style="height:auto">
    <div>
      <body-top></body-top>
      <!-- 导航栏 -->
      <div>
        <head-menu :index="'/personalCircle'"></head-menu>
      </div>
      <div style="width:1200px;height: 55px;margin: 20px auto;">
        <div style="width:564px;">
          <div class="title" :class="changePage===3||changePage===4?'title-hover':''">
            <el-dropdown trigger="click" :placement="'bottom'">
              <span class="el-dropdown-link title" :class="changePage===3||changePage===4?'title-hover':''">
                <!-- {{serviceTitle}} -->
                关系网
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdown">
                <el-dropdown-item>
                  <p @click="changeTableType(3,1)">我信任的人</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p @click="changeTableType(3,3)">我的好友</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p @click="changeTableType(3,4)">我的关注</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p @click="changeTableType(3,2)">信任我的人</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p @click="changeTableType(3,5)">浏览记录</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="title" :class="changePage===1?'title-hover':''">
            <el-dropdown trigger="click" :placement="'bottom'">
              <span class="el-dropdown-link title" :class="changePage===1||changePage===2?'title-hover':''">
                <!-- {{myTitle}} -->
                资源库
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdown">
                <el-dropdown-item>
                  <p @click="changeTableType(1,1)">我的企业</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p @click="changeTableType(1,2)">认识的企业</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p @click="changeTableType(2)">评价</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- <div class="title" :class="changePage===1?'title-hover':''" @click="changePage=1">认识的企业</div> -->
          <!-- <div class="title" :class="changePage===2?'title-hover':''" @click="changeTableType(2)">评价</div> -->

        </div>
      </div>
    </div>

    <div style="position:relative;width:1200px;margin:0 auto;">
      <!-- 我的服务号 -->
      <div v-show="changePage===3||changePage===4" class="my_service">
        <!-- <div style="height:60px;">
          <el-select v-model="service.changeTable" placeholder="请选择表格">
            <el-option v-for="item in service.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <!-- 我信任的 -->
        <div v-if="service.changeTable=='我信任的人'">
          <businessMeTrust></businessMeTrust>
        </div>
        <!-- 信任我的 -->
        <div v-if="service.changeTable=='信任我的人'">
          <businessTrustMe></businessTrustMe>
        </div>
        <!-- 互换资源 -->
        <div v-if="service.changeTable=='我的好友'">
          <businessFriend></businessFriend>
        </div>
        <!-- 我的关注 -->
        <div v-if="service.changeTable=='我的关注'">
          <businessFollow></businessFollow>
        </div>
        <!-- 浏览记录 -->
        <div v-if="service.changeTable=='浏览记录'">
          <businessHistory></businessHistory>
        </div>
      </div>
      <!--我的资源库-->
      <div v-show="changePage===1" class="iknow_div">
        <!-- 我的企业 -->
        <div v-show="mine.changeTable=='我的企业'">
          <el-row>
            <el-row style="line-height:30px;">
              <div>
                <span style="font-size: 20px">我的企业</span>
              </div>
            </el-row>
            <el-row style="width:1200px;margin-top:-15px;">
              <!-- <el-col style="width:100%"> -->
              <el-form :inline="true" :model="mine" class="demo-form-inline" @submit.native.prevent>
                <el-form-item label="企业名称">
                  <el-input v-model="mine.search" clearable placeholder="请输入企业名称" @keyup.enter.native="searchMine" @clear="searchMine"></el-input>
                </el-form-item>
                <!-- <el-form-item label="法人">
                    <el-input v-model="mine.searchLegal" clearable placeholder="请输入法人名称" @keyup.enter.native="searchMine"></el-input>
                  </el-form-item>
                  <el-form-item label="属地">
                    <el-cascader :options="areaTypeList" v-model="mine.searchArea" placeholder="请选择属地" @change="areahandleChange"></el-cascader>
                  </el-form-item> -->
                <el-form-item>
                  <el-button type="primary" @click="searchMine">搜索</el-button>
                  <el-button type @click="onreset(11)">重置</el-button>
                </el-form-item>
                <el-form-item style="float:right">
                  <el-button type="success" @click="minehandleAdd">添加</el-button>
                  <el-button type="info" @click="Recovery(11,1)">回收站</el-button>
                </el-form-item>
              </el-form>
              <!-- </el-col> -->
            </el-row>
          </el-row>
          <!--第二排的表格-->
          <div style="overflow: hidden;margin-top:-15px;">
            <el-table :data="mine.tableData" v-loading="mine.isloading" border>
              <el-table-column label="序号" width="60" align="center">
                <template slot-scope="scope">{{scope.$index+(mine.page-1)*10+1}}</template>
              </el-table-column>
              <el-table-column prop="name" label="企业名称" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="openGs(scope.row,11)">{{scope.row.name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="legal" label="法人代表" width="120" align="center"></el-table-column>
              <el-table-column prop="area" label="企业属地" width="180" align="center"></el-table-column>
              <el-table-column prop="comp_type" label="企业类型" width="320" align="center"></el-table-column>
              <el-table-column width="200" label="操作" align="center">
                <template slot-scope="scope">
                  <!-- <el-button size="mini" type="primary" @click="iknowHandleEdit(scope.$index, scope.row)">编辑</el-button> -->
                  <el-button size="mini" @click="handleDelete(scope.$index, scope.row,'mine')" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination style="margin-top:20px" align="right" @current-change="minehandleCurrentChange" :current-page.sync="mine.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="mine.total"></el-pagination>
        </div>
        <!-- 我认识的 -->
        <div v-show="mine.changeTable=='认识的企业'">
          <el-row>
            <el-row style="line-height:30px;">
              <div>
                <span style="font-size: 20px">认识的企业</span>
              </div>
            </el-row>
            <el-row style="width:1200px;margin-top:-15px;">
              <!-- <el-col style="width:100%"> -->
              <el-form :inline="true" :model="iknow" class="demo-form-inline" @submit.native.prevent>
                <el-form-item label="企业名称">
                  <el-input style="width:170px" v-model="iknow.search" clearable placeholder="请输入企业名称" @keyup.enter.native="searchIknow" @clear="searchIknow"></el-input>
                </el-form-item>
                <el-form-item label="我认识">
                  <el-select style="width:135px" :class="iknow.selectH?'knowSelect':''" v-model="iknow.searchRy" collapse-tags clearable multiple placeholder="请选择" @change="knowRyChange">
                    <el-option v-for="item in iknow.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="企业类型">
                  <el-select v-model="iknow.qyType" placeholder="请选择" clearable style="width:130px;" @change="searchType">
                    <el-option v-for="(item,index) in iknow.qyTypeList" :key="index" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="属地">
                  <el-cascader :options="areaTypeList" v-model="areaType" clearable placeholder="请选择属地" @change="areahandleChange" style="width:130px;"></el-cascader>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="searchIknow">搜索</el-button>
                  <el-button type @click="onreset(1)">重置</el-button>
                </el-form-item>
                <el-form-item style="float:right">
                  <el-button type="success" @click="iknowhandleAdd">添加</el-button>
                  <el-button type="info" @click="Recovery(1,1)">回收站</el-button>
                </el-form-item>
              </el-form>
              <!-- </el-col> -->
            </el-row>
          </el-row>
          <!--第二排的表格-->
          <div style="overflow: hidden;margin-top:-15px;">
            <el-table :data="iknow.tableData" v-loading="iknow.isloading" border>
              <el-table-column label="序号" width="60" align="center">
                <template slot-scope="scope">{{scope.$index+(iknow.page-1)*10+1}}</template>
              </el-table-column>
              <el-table-column prop="name" label="企业名称" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="openGs(scope.row,1)">{{scope.row.name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="duty" label="我认识(公司负责人/业务负责人/业务人员)" width="300" align="center"></el-table-column>
              <el-table-column prop="area" label="注册属地" width="200" align="center"></el-table-column>
              <el-table-column prop="remark" label="备注" width="140" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column width="200" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="iknowHandleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" @click="handleDelete(scope.$index, scope.row,'know')" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination style="margin-top:20px" align="right" @current-change="iknowhandleCurrentChange" :current-page.sync="iknow.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="iknow.total"></el-pagination>
        </div>
      </div>
      <!--评价-->
      <div v-show="changePage===2" class="buliang">
        <!--第一排 搜索框和添加按钮-->
        <el-row>
          <el-row style="line-height:30px;">
            <div>
              <span style="font-size: 20px">评价</span>
            </div>
          </el-row>
          <el-row style="margin-top:-15px;">
            <el-form :inline="true" :model="iknow" class="demo-form-inline" @submit.native.prevent>
              <el-form-item label="企业名称">
                <el-input v-model="bl.search" clearable placeholder="请输入企业名称" @keyup.enter.native="searchBl" @clear="searchBl"></el-input>
              </el-form-item>
              <el-form-item label="评价">
                <el-select v-model="bl.record" clearable placeholder="请选择我的好评/我的差评" @change="searchBl">
                  <el-option label="全部" value></el-option>
                  <el-option label="我的好评" value="good"></el-option>
                  <el-option label="我的差评" value="bad"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="属地">
                <el-cascader :options="areaTypeList" clearable v-model="areaType2" placeholder="请选择属地" @change="areahandleChange2"></el-cascader>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchBl">搜索</el-button>
                <el-button type @click="onreset(2)">重置</el-button>
              </el-form-item>
              <el-form-item style="float:right">
                <el-button type="success" @click="blhandleAdd">添加</el-button>
                <el-button type="info" @click="Recovery(2)">回收站</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-row>
        <!--表格-->
        <div style="margin-top:-15px;">
          <el-table :data="bl.tableData" style="width: 100%" v-loading="bl.isloading" border>
            <el-table-column label="序号" width="60" align="center">
              <template slot-scope="scope">{{scope.$index+(bl.page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="qymc" label="企业名称" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="openGs(scope.row,2)">{{scope.row.qymc}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="social_code" label="信用代码" width="220" align="center"></el-table-column>
            <el-table-column prop="legal_person" label="法人代表" width="120" align="center"></el-table-column>
            <el-table-column prop="area" label="企业属地" width="180" align="center"></el-table-column>
            <el-table-column label="好评/差评" align="center" width="120">
              <template slot-scope="scope">
                <el-button type="text" size="small" ref="btn" @click="blhandleEdit(scope.$index, scope.row)">
                  {{scope.row.goodRecord}}/{{scope.row.badRecord}}
                  <i class="el-icon-edit"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column width="200" label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="badDelete(scope.$index, scope.row,2)" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination style="margin-top:20px" align="right" @current-change="blhandleCurrentChange" :current-page.sync="bl.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="bl.total"></el-pagination>
      </div>
    </div>

    <!--———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————— -->
    <!--我的企业 添加窗口-->
    <el-dialog title="添加我的企业" :visible.sync="mine.addVisible" width="90%" top="2vh">
      <div style="padding:0 20px">
        <!--第一排 搜索框和添加按钮-->
        <div>
          <el-input v-model="mine.add.search" clearable placeholder="请输入内容" style="width:400px;" @keyup.enter.native="searchAllComp('mine')" @clear="searchAllComp('mine')"></el-input>
          <el-button type="primary" @click="searchAllComp('mine')">搜索</el-button>
        </div>
        <!--第二排的表格-->
        <el-table :data="mine.add.tableData" v-loading="mine.add.loading" border style="margin-top:10px;">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(mine.add.page-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="企业名称" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openGs(scope.row,1)">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="legal" label="法人代表" width="280" align="center"></el-table-column>
          <el-table-column prop="area" label="企业属地" width="280" align="center"></el-table-column>
          <el-table-column width="300" label="操作" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.checked == '0'" size="mini" type="primary" style="width:67px" @click="selectComp11(scope.$index, scope.row)">添加</el-button>
              <el-button v-if="scope.row.checked == '1'" disabled size="mini" style="width:67px">已添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="knowAllPage">
          <p class="knowAllText">共计找到符合条件的记录数：
            <span class="knowAllCount">{{iknow.add.total}}</span>条，请输入更多信息进行查询
          </p> -->
        <el-pagination class="knowAllBtn" align="right" style="margin-top:10px" @current-change="mine_add_handleCurrentChange" :current-page.sync="mine.add.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="mine.add.total>100?100:mine.add.total" :page-count="10"></el-pagination>
        <!-- </div> -->

      </div>
    </el-dialog>
    <!--我认识的 添加窗口-->
    <el-dialog title="添加我认识的企业" :visible.sync="iknow.addVisible" width="90%" top="2vh">
      <div style="padding:0 20px">
        <!--第一排 搜索框和添加按钮-->
        <div>
          <el-input v-model="iknow.add.search" clearable placeholder="请输入内容" style="width:400px;" @keyup.enter.native="searchAllComp('know')" @clear="searchAllComp('know')"></el-input>
          <el-button type="primary" @click="searchAllComp('know')">搜索</el-button>
        </div>
        <!--第二排的表格-->
        <el-table :data="iknow.add.tableData" v-loading="iknow.add.loading" border style="margin-top:10px;">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(iknow.add.page-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="企业名称" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openGs(scope.row,1)">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="legal" label="法人代表" width="280" align="center"></el-table-column>
          <el-table-column prop="area" label="企业属地" width="280" align="center"></el-table-column>
          <el-table-column width="300" label="操作" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.checked == '0'" size="mini" type="primary" style="width:67px" @click="selectComp(scope.$index, scope.row)">添加</el-button>
              <el-button v-if="scope.row.checked == '1'" disabled size="mini" style="width:67px">已添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="knowAllPage">
          <p class="knowAllText">共计找到符合条件的记录数：
            <span class="knowAllCount">{{iknow.add.total}}</span>条，请输入更多信息进行查询
          </p> -->
        <el-pagination class="knowAllBtn" align="right" style="margin-top:10px" @current-change="iknow_add_handleCurrentChange" :current-page.sync="iknow.add.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="iknow.add.total>100?100:iknow.add.total" :page-count="10"></el-pagination>
        <!-- </div> -->

      </div>
    </el-dialog>
    <!--评价 添加窗口-->
    <el-dialog title="添加评价" :visible.sync="bl.add.addVisible" width="90%" top="2vh">
      <div style="padding:0 20px">
        <!--第一排 搜索框和添加按钮-->
        <div style="padding-bottom:10px;">
          <el-input v-model="bl.add.search" clearable placeholder="请输入内容" style="width:400px;" @keyup.enter.native="searchAllComp" @clear="searchAllComp"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="searchAllComp">搜索</el-button>
        </div>
        <!--第二排的表格-->
        <div>
          <el-table :data="bl.add.tableData" v-loading="bl.add.loading" border>
            <el-table-column label="序号" width="60" align="center">
              <template slot-scope="scope">{{scope.$index+(bl.add.page-1)*10+1}}</template>
            </el-table-column>
            <!-- name -->
            <el-table-column prop="gsmc" label="企业名称" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="openGs(scope.row,2)">{{scope.row.gsmc}}</el-button>
              </template>
            </el-table-column>
            <!-- legal -->
            <el-table-column prop="business_type" label="企业类型" width="380" align="center"></el-table-column>
            <el-table-column prop="legal_person" label="法人代表" width="200" align="center"></el-table-column>
            <el-table-column prop="area" label="所属地区" width="200" align="center"></el-table-column>
            <el-table-column width="200" label="操作" align="center">
              <template slot-scope="scope">
                <!-- checked -->
                <el-button v-if="scope.row.record == 2" size="mini" type="primary" style="width:67px" @click="selectComp2(scope.$index, scope.row)">添加</el-button>
                <el-button v-if="scope.row.record == 1" disabled size="mini" style="width:67px">已添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="knowAllPage">
          <p class="knowAllText">共计找到符合条件的记录数：
            <span class="knowAllCount">{{bl.add.total}}</span>条，请输入更多信息进行查询
          </p> -->
        <el-pagination style="margin-top:10px" align="right" @current-change="bl_add_handleCurrentChange" :current-page.sync="bl.add.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="bl.add.total>100?100:bl.add.total"></el-pagination>
        <!-- </div> -->
      </div>

    </el-dialog>
    <!-- 我认识的 编辑窗口-->
    <el-dialog :title="iknow.editData.qymc" :visible.sync="iknow.editVisible" width="30%">
      <div style="width:75%;margin: 0 auto;">
        <span style="line-height:30px">选择你认识该公司的人员 （备注：可多选）</span>
        <el-select v-model="iknow.ry" collapse-tags multiple placeholder="请选择" style="width:100%;">
          <el-option v-for="item in iknow.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div style="margin-top: 20px;">
          <span style="line-height:30px">备注：</span>
          <el-input v-model="iknow.remark" placeholder="请输入内容" type="textarea" :autosize="{ minRows: 2, maxRows: 5}"></el-input>
        </div>
      </div>
      <div style="width:100%;text-align: center;margin-top: 40px;">
        <el-button type="primary" @click="iknowEditOk">确 定</el-button>
        <el-button @click="iknow.editVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 我的服务号 编辑窗口-->
    <!-- <el-dialog :title="'编辑人员'" :visible.sync="service.editData.editVisible" width="30%">
      <div style="padding:0 20px">
        <el-form :label-position="'right'" label-width="80px" :model="service.editData">
          <el-form-item label="人员名称">
            <el-input v-model="service.editData.rymc" placeholder="请输入人员名称"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="service.editData.tel" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item style="margin:0 auto">
            <el-button type="primary" @click="editOK">保存</el-button>
            <el-button @click="service.editData.editVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div> -->
    <!-- <div style="width:75%;margin: 0 auto;">
        <span style="line-height:30px">选择你认识该公司的人员 （备注：可多选）</span>
        <el-select v-model="iknow.ry" multiple placeholder="请选择" style="width:100%;">
          <el-option v-for="item in iknow.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div style="margin-top: 20px;">
          <span style="line-height:30px">备注：</span>
          <el-input v-model="iknow.remark" placeholder="请输入内容" type="textarea" :autosize="{ minRows: 2, maxRows: 5}"></el-input>
        </div>
      </div>
      <div style="width:100%;text-align: center;margin-top: 40px;">
        <el-button type="primary" @click="iknowEditOk">确 定</el-button>
        <el-button @click="iknow.editVisible = false">取 消</el-button>
      </div> -->
    <!-- </el-dialog> -->
    <!--我被坑过 评论列表窗口-->
    <el-dialog :title="bl.editData.qymc" :visible.sync="bl.editVisible" width="35%" top="5vh">
      <el-row style="padding-bottom:10px;">
        <el-radio-group v-model="ComChangDef" size="mini" class="com-chang">
          <el-radio-button :label="1">好评({{Good_num}})</el-radio-button>
          <el-radio-button :label="0">差评({{Bad_num}})</el-radio-button>
        </el-radio-group>
      </el-row>
      <div style="height: 500px; overflow: auto;">
        <el-row>
          <el-row style="width:100px;margin:20px auto" v-if="Good_num===0 && ComChangDef===1">暂无好评</el-row>
          <el-row style="width:100px;margin:20px auto" v-if="Bad_num===0 && ComChangDef===0">暂无差评</el-row>
          <el-row v-for="o in bl.editData.tableData" :key="o.id">
            <el-row v-if="o.type ===ComChangDef" style="margin-top:20px;">
              <el-row>
                <div style="width:40px;text-align: center;float: left">
                  <div v-if="!o.avatar" style="width:30px;height:30px;">
                    <i class="el-icon-service" style="font-size: 30px;"></i>
                  </div>
                  <div v-if="o.avatar" style="width:30px;height:30px;">
                    <img :src="o.avatar" alt style="height: 30px;border-radius:50%">
                  </div>
                </div>
                <div style="float: left;line-height:30px">
                  <span style="color: rgb(63,141,213);">{{ o.nickname }} ({{o.fbsj}})</span>
                </div>
                <div style="float:right;margin-left:10px;line-height:30px" v-if="o.user_id == $store.state.userInfo.user_id">
                  <span @click="comEdit(o)" style="color: #999;cursor: pointer;">
                    <i class="el-icon-edit-outline"></i>
                  </span>
                  <span @click="badDelete(o.id,'',0)" style="color: #999;cursor: pointer;">
                    <i class="el-icon-delete"></i>
                  </span>
                  <span>
                    <el-button type="success" size="mini" class="on-off" @click="changeCheckBtn(o.id,0)" v-if="o.open==1" round>已公开</el-button>
                    <el-button type="danger" size="mini" class="on-off" @click="changeCheckBtn(o.id,1)" v-if="o.open==0" round>已隐藏</el-button>
                  </span>
                </div>
              </el-row>
              <el-row>
                <div style="margin-left: 40px;">{{ o.record }}</div>
              </el-row>
            </el-row>
          </el-row>
        </el-row>
      </div>
      <el-row type="flxe" justify="end" style="padding-top:10px;">
        <el-col :span="8">
          <el-radio v-model="comState" :label="1">
            好评
            <span class="com-state" :class="comState===1?'good_hover':'good_def'"></span>
          </el-radio>
          <el-radio v-model="comState" :label="0">
            <span>差评</span>
            <span class="com-state" :class="comState===0?'bad_hover':'bad_def'" x></span>
          </el-radio>
        </el-col>
        <el-col :span="8" :offset="8" style="text-align:right">
          <el-checkbox v-model="bl.checked">是否公开所有人可见</el-checkbox>
        </el-col>
      </el-row>
      <div style="margin-top: 10px;">
        <el-input ref="record" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="bl.editData.record"></el-input>
      </div>
      <el-row type="flex" justify="end" style="margin-top:20px;">
        <el-col :span="8" style="text-align:right">
          <el-button size="small" @click="Off">关闭</el-button>
          <el-button type="primary" size="small" @click="seedMessage">发布</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 我的企业-回收站窗口 -->
    <el-dialog title="回收站" :visible.sync="recoveryKey11" width="90%" top="5vh">
      <div style="padding:0 20px">
        <el-table :data="recovery11.rows" v-loading="mine.recovery.loading" border style="height:700px" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(mine.recoveryPage-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="企业名称" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openGs(scope.row)">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="legal" label="法人代表" width="120" align="center"></el-table-column>
          <el-table-column prop="area" label="企业属地" width="180" align="center"></el-table-column>
          <el-table-column prop="comp_type" label="企业类型" width="400" align="center"></el-table-column>
          <el-table-column width="220" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="Edit('mine','restore',scope)">恢复</el-button>
              <el-button type="danger" size="small" @click="Edit('mine','delete',scope)">彻底删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-col :span="13">
            <transition name="el-zoom-in-top">
              <div style="margin-top:20px;" align="right" v-if="selections.length!==0">
                <el-button type="success" size="small" @click="Edit('mine','restore')">批量恢复</el-button>
                <el-button type="danger" size="small" @click="Edit('mine','delete')">批量删除</el-button>
              </div>
            </transition>
          </el-col>
          <el-col :span="8" :offset="3">
            <!-- <el-pagination style="margin-top:20px" align="right" @current-change="servicehandleCurrentChange2" :current-page.sync="service2.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="service2.total"></el-pagination> -->

            <el-pagination background :current-page.sync='inf_recovery.page' @current-change="recoveryCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="recovery11.total"></el-pagination>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 我认识的-回收站窗口 -->
    <el-dialog title="回收站" :visible.sync="recoveryKey1" width="90%" top="5vh">
      <div style="padding:0 20px">
        <el-table :data="recovery1.rows" v-loading="inf_recovery.loading1" border style="height:700px" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(iknow.recoveryPage-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="企业名称" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openGs(scope.row)">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="duty" label="我认识(公司负责人/业务负责人/业务人员)" width="300" align="center"></el-table-column>
          <el-table-column prop="comp_type" label="企业类型" width="350" align="center"></el-table-column>
          <el-table-column prop="area" label="所属地区" width="120" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" width="140" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column width="200" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="Edit('know','restore',scope)">恢复</el-button>
              <el-button type="danger" size="small" @click="Edit('know','delete',scope)">彻底删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-col :span="13">
            <transition name="el-zoom-in-top">
              <div style="margin-top:20px;" align="right" v-if="selections.length!==0">
                <el-button type="success" size="small" @click="Edit('know','restore')">批量恢复</el-button>
                <el-button type="danger" size="small" @click="Edit('know','delete')">批量删除</el-button>
              </div>
            </transition>
          </el-col>
          <el-col :span="8" :offset="3">
            <!-- <el-pagination style="margin-top:20px" align="right" @current-change="servicehandleCurrentChange2" :current-page.sync="service2.currentPage3" :page-size="10" background layout="total,prev, pager, next" :total="service2.total"></el-pagination> -->

            <el-pagination background :current-page.sync='inf_recovery.page' @current-change="recoveryCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="recovery1.total"></el-pagination>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 我被坑过-回收站窗口 -->
    <el-dialog title="回收站" :visible.sync="recoveryKey2" width="90%" top="5vh">
      <div style="padding:0 20px">
        <el-table :data="recovery2.rows" v-loading="bl.loading2" border style="height:700px" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{scope.$index+(bl.recoveryPage-1)*10+1}}</template>
          </el-table-column>
          <el-table-column prop="qymc" label="企业名称" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="openGs(scope.row)">{{scope.row.qymc}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="social_code" label="信用代码" width="320" align="center"></el-table-column>
          <el-table-column prop="legal_person" label="法人代表" width="230" align="center"></el-table-column>
          <el-table-column prop="area" label="企业属地" width="230" align="center"></el-table-column>
          <el-table-column width="320" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="Edit('bad','restore',scope)">恢复</el-button>
              <el-button type="danger" size="small" @click="Edit('bad','delete',scope)">彻底删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-col :span="13">
            <transition name="el-zoom-in-top">
              <div style="margin-top:20px;" align="right" v-if="selections.length!==0">
                <el-button type="success" size="small" @click="Edit('bad','restore')">批量恢复</el-button>
                <el-button type="danger" size="small" @click="Edit('bad','delete')">批量删除</el-button>
              </div>
            </transition>
          </el-col>
          <el-col :span="8" :offset="3">
            <el-pagination background :current-page.sync='inf_recovery.page' @current-change="recoveryCurrentChange" :page-size="10" layout="total, prev, pager, next" :total="recovery2.total"></el-pagination>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!--查看不良信息 窗口 不知道有没有用-->
    <!-- <el-dialog :title="bl.editData.qymc" :visible.sync="bl.kan.Visible" width="35%">
            <div>
                <div v-for="o in bl.kan.tableData" :key="o.id" class="text item" style="margin:0 0 20px 10px;">
                    <div style="overflow:hidden">
                        <div style="width:40px;text-align: center;float: left">
                            <div v-if="!o.avatar" style="width:30px;height:30px;">
                                <i class="el-icon-service" style="font-size: 30px;"></i>
                            </div>
                            <div v-if="o.avatar" style="width:30px;height:30px;">
                                <img :src="o.avatar" alt style="height: 30px;border-radius:50%">
                            </div>
                        </div>
                        <div style="float: left;line-height:30px">
                            <span style="color: rgb(63,141,213);">({{o.type?'好评':'差评'}})&nbsp;&nbsp;{{ o.nickname }} ({{o.fbsj}})</span>
                        </div>
                    </div>
                    <div style="margin-left: 40px;">{{ o.record }}</div>
                </div>
            </div>
        </el-dialog> -->
  </div>
</template>

<script type="text/javascript">
import head_menu from "./template/head_menu.vue";
import businessMeTrust from "./template/businessMeTrust.vue";
import businessTrustMe from "./template/businessTrustMe.vue";
import businessFriend from "./template/businessFriend.vue";
import businessFollow from "./template/businessFollow.vue";
import businessHistory from "./template/businessHistory.vue";
import { fail } from "assert";
export default {
  components: {
    headMenu: head_menu,
    businessMeTrust,
    businessTrustMe,
    businessFriend,
    businessFollow,
    businessHistory
  },
  data() {
    return {
      role: {},
      changePage: 1, // 1为资源库 2为评价 3为我信任的 4为信任我的
      model: 1,
      selections: [], //保存回收站中批量选择的项
      pageModel: 1,
      btnModel: true,
      //删除接口数据
      inf_del: {
        rep_id: "",
        record_id: "",
        qy_type: "",
        type: "recover"
      },
      // 三个回收站接口数据
      inf_recovery: {
        user_id: this.$store.state.userInfo.user_id,
        valid: 2,
        qy_type: 1,
        page: 1,
        rows: 10,
        loading1: false // 我认识的企业 回收站
      },
      recoveryKey11: false, // 我的企业 回收站
      recoveryKey1: false, // 我认识的企业 回收站
      recoveryKey2: false, // 评价 回收站
      // 我的企业 回收站
      recovery11: {
        rows: [],
        status: "",
        total: 0
      },
      // 我认识的企业 回收站
      recovery1: {
        rows: [],
        status: "",
        total: 0
      },
      // 评价 回收站
      recovery2: {
        rows: [],
        status: "",
        total: 0
      },
      loading1: false, // 我认识的企业 回收站
      loading2: false, // 评价 回收站
      loading3: false,
      serviceTitle: "我信任的人",
      myTitle: "我的企业",
      good_num: 0,
      bad_num: 0,
      ComChangDef: 1, //展示好评列表/差评列表
      comState: 1, //默认好评
      oneShow: true,
      pageChange: 1,
      input: "",
      //我的企业
      mine: {
        changeTable: "我的企业",
        //搜索关键词
        search: "",
        // searchLegal: "",
        // searchArea: "",
        total: 0,
        currentPage3: 1,
        //是否显示 编辑窗口
        editVisible: false,
        editVisible2: false,
        //是否显示添加窗口
        addVisible: false,
        //上 表格加载中
        isloading: false,
        value5: [],
        ry: "",
        //主表数据
        tableData: [],
        page: 1,
        //添加窗口数据
        add: {
          tableData: [],
          page: 1,
          currentPage3: 1,
          loading: false,
          search: "",
          gs_id: ""
        },
        recovery: {
          loading: true
        },
        recoveryPage: 1,
        remark: "",
        area: "",
        is_rc: ""
      },
      //我认识的
      iknow: {
        //搜索关键词
        qyTypeList: [],
        qyType: "",
        search: "",
        searchRy: [],
        searchRyStr: "",
        total: 0,
        currentPage3: 1,
        //是否显示 编辑窗口
        editVisible: false,
        editVisible2: false,
        //是否显示添加窗口
        addVisible: false,
        //上 表格加载中
        isloading: false,
        //编辑窗口数据
        editData: {
          qymc: "",
          textarea: "",
          req_id: "",
          remark: ""
        },
        //编辑选项卡
        options: [
          {
            value: "企业负责人",
            label: "企业负责人"
          },
          {
            value: "招投标负责人",
            label: "招投标负责人"
          },
          {
            value: "资料员",
            label: "资料员"
          },
          {
            value: "其他",
            label: "其他"
          }
        ],
        value5: [],
        ry: "",
        //主表数据
        tableData: [],
        page: 1,
        //添加窗口数据
        add: {
          tableData: [],
          page: 1,
          currentPage3: 1,
          loading: false,
          search: "",
          gs_id: ""
        },
        recoveryPage: 1,
        remark: "",
        area: "",
        is_rc: "",
        selectH: false //控制我认识筛选框高度
      },
      // 我被坑过
      bl: {
        //编辑窗口数据
        editData: {
          qymc: "",
          rep_id: "",
          gs_id: "",
          record: "",
          tableData: []
        },
        add: {
          addVisible: false,
          page: 1,
          search: "",
          loading: false,
          tableData: [],
          currentPage3: 1,
          total: 0,
          gs_id: ""
        },
        //是否公开所有人可见
        checked: false,
        //数据
        tableData: [],
        //是否显示编辑窗口
        editVisible: false,
        //分页按钮
        currentPage3: 1,
        //是否显示添加按钮
        addVisible: false,
        //加载中效果
        isloading: false,
        //搜索词
        search: "",
        //页码
        page: 1,
        //总页数
        total: 0,
        area: "",
        is_rc: "",
        kan: {
          Visible: false,
          tableData: []
        },
        recoveryPage: 1,
        loading2: false // 评价 回收站
      },
      // 我信任的
      service: {
        //编辑窗口数据
        editData: {
          editVisible: false,
          rymc: "",
          id: "",
          tel: "",
          tableData: []
        },
        changeTable: "我信任的人",
        add: {
          addVisible: false,
          page: 1,
          search: "",
          loading: false,
          tableData: [],
          currentPage3: 1,
          total: 0,
          rymc: "",
          cellphone: ""
        },
        //是否公开所有人可见
        checked: false,
        //数据
        tableData: [],
        //是否显示编辑窗口
        editVisible: false,
        //分页按钮
        currentPage3: 1,
        //是否显示添加按钮
        addVisible: false,
        //加载中效果
        isloading: false,
        //搜索词
        search: "",
        //页码
        page: 1,
        //总页数
        total: 0,
        recoveryPage: 1
      },
      delete: {
        rep_id: "",
        bad_id: "",
        qy_type: ""
      },
      deleteType: "",
      areaType: [],
      areaType2: [],
      areaTypeList: [],
      is_rc: "",
      value: 1
    };
  },
  created() {
    // console.log(this.bl.editData.tableData);

    this.setTitle();
    //加载页面时获取页面数据
    this.getAreaType();
    this.fn_role();
  },
  methods: {
    fn_role() {
      let self = this;
      self.axios.post(
        "/index/mine/role",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          user_id: this.$store.state.userInfo.user_id,
          company_id: localStorage.getItem("company_id")
        },
        data => {
          this.role = data;
        }
      );
    },
    Off() {
      this.getAllcomp2();
      this.bl.editVisible = false;
      // this.bl.add.addVisible = false;
    },

    //设置title，判断是从哪个圈跳过来，打开对应的表格
    setTitle() {
      document.title = "业务圈";
      let tableType = this.$route.query.type;
      if (tableType == "mine") {
        this.changePage = 1;
        this.mine.changeTable = "我的企业";
        this.myTitle = "我的企业";
        this.getData11();
      } else if (tableType == "know") {
        this.changePage = 1;
        this.mine.changeTable = "认识的企业";
        this.myTitle = "认识的企业";
        this.getData12();
      } else if (tableType == "bad") {
        this.changePage = 2;
        this.getData2();
      } else if (tableType == "meTrust") {
        this.changePage = 3;
        this.serviceTitle = "我信任的人";
      } else if (tableType == "trustMe") {
        this.changePage = 3;
        this.service.changeTable = "信任我的人";
        this.serviceTitle = "信任我的人";
      } else if (tableType == "change") {
        this.changePage = 3;
        this.service.changeTable = "我的好友";
        this.serviceTitle = "我的好友";
      } else if (tableType == "follow") {
        this.changePage = 3;
        this.service.changeTable = "我的关注";
        this.serviceTitle = "我的关注";
      } else if (tableType == "history") {
        this.changePage = 3;
        this.service.changeTable = "浏览记录";
        this.serviceTitle = "浏览记录";
      }
    },
    // 切换主表
    changeTableType(typeOut, typeIn) {
      if (typeOut == 1) {
        this.changePage = 1;
        if (typeIn == 1) {
          this.mine.changeTable = "我的企业";
          this.myTitle = "我的企业";
          this.getData11();
        } else if (typeIn == 2) {
          this.mine.changeTable = "认识的企业";
          this.myTitle = "认识的企业";
          this.getData12();
        }
      } else if (typeOut == 2) {
        this.changePage = 2;
        this.getData2();
      } else if (typeOut == 3) {
        this.changePage = 3;
        if (typeIn == 1) {
          this.service.changeTable = "我信任的人";
          this.serviceTitle = "我信任的人";
        } else if (typeIn == 2) {
          this.service.changeTable = "信任我的人";
          this.serviceTitle = "信任我的人";
        } else if (typeIn == 3) {
          this.service.changeTable = "我的好友";
          this.serviceTitle = "我的好友";
        } else if (typeIn == 4) {
          this.service.changeTable = "我的关注";
          this.serviceTitle = "我的关注";
        } else if (typeIn == 5) {
          this.service.changeTable = "浏览记录";
          this.serviceTitle = "浏览记录";
        }
      }
    },
    //招标回调
    onChild_row() {
      this.dialogDrVisible = false;
      this.$emit("onChild_row");
    },
    //匹配
    // onMarry(row) {
    //   this.nowRow = row;
    //   this.dialogDrVisible = true;
    // },
    //请求注册属地选择选项接口
    getAreaType() {
      this.axios.post(
        "/firm/firm_search/getAreaType",
        {
          login_user_id: this.$store.state.userInfo.user_id
        },
        data => {
          this.areaTypeList = data;
        }
      );
      this.axios.post(
        "/firm/firm_search/getAreaType",
        {
          type: "企业类型",
          login_user_id: this.$store.state.userInfo.user_id
        },
        data => {
          this.iknow.qyTypeList = data;
        }
      );
    },
    //重置
    onreset(type) {
      this.areaType = [];
      this.areaType2 = [];
      if (type == 11) {
        this.mine.page = 1;
        this.mine.search = "";
        // this.mine.searchLegal = "";
        // this.mine.searchArea = "";
        // this.mine.is_rc = "";
        // this.mine.area = "";
        this.mine.currentPage3 = 1;
        this.getData11();
      } else if (type == 1) {
        this.iknow.page = 1;
        this.iknow.search = "";
        this.iknow.is_rc = "";
        this.iknow.area = "";
        this.iknow.searchRyStr = "";
        this.iknow.searchRy = "";
        this.iknow.currentPage3 = 1;
        this.iknow.qyType = "";
        this.getData12();
      } else if (type == 2) {
        this.bl.page = 1;
        this.bl.search = "";
        this.bl.is_rc = "";
        this.bl.area = "";
        this.bl.record = "";
        this.bl.currentPage3 = 1;
        this.getData2();
      }
    },

    // 资源库-评价-点击编辑评价
    comEdit(item) {
      this.bl.editData.rep_id = item.rep_id;
      this.bl.editData.gs_id = item.gs_id;
      this.bl.editData.record_id = item.id;
      this.bl.editData.record = item.record;
      this.bl.checked = item.open == 1 ? true : false;
      this.comState = item.type;
      this.$refs.record.focus();
      this.btnModel = false; //开启修改编辑
    },
    //获取我的公司表格数据
    getData11() {
      //获取 我信任 表格数据
      this.mine.isloading = true;
      // var that = this;
      //获取表格数据
      this.axios.post(
        "/relation/Person_Service/userOrgList",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          user_id: this.$store.state.userInfo.user_id,
          qymc: this.mine.search,
          // legal: this.mine.searchLegal,
          // area: this.mine.searchArea,
          // is_rc: this.mine.is_rc,
          page: this.mine.page,
          source: 1,
          status: 1
        },
        data => {
          this.mine.tableData = data.rows;
          if (data.status == "success") {
            this.mine.total = data.total;
          } else if (data.status == "failed" && this.mine.page != 1) {
            this.mine.page -= 1;
            this.getData11();
          } else if (this.mine.page == 1) {
            this.mine.total = 0;
          }
          this.mine.isloading = false;
        }
      );
    },
    //我的企业-企业名称筛选
    searchMine() {
      this.mine.currentPage3 = 1;
      this.mine.page = 1;
      this.getData11();
    },
    //我的企业-注册属地筛选
    // areahandleChange11(val) {
    //   this.mine.currentPage3 = 1;
    //   if (val[0] == "入川企业") {
    //     this.mine.is_rc = "是";
    //     if (val[1] != "不限制") {
    //       this.mine.area = val[1];
    //     } else {
    //       this.mine.area = "";
    //     }
    //   } else if (val[0] == "四川省") {
    //     this.mine.is_rc = "否";
    //     if (val[1] != "不限制") {
    //       this.mine.area = val[1];
    //     } else {
    //       this.mine.area = "";
    //     }
    //   } else {
    //     this.mine.is_rc = "";
    //     this.mine.area = "";
    //   }
    //   this.getData12();
    // },
    //我的企业 翻页
    minehandleCurrentChange(val) {
      this.mine.page = val;
      this.getData11();
    },
    //打开我的企业-添加窗口
    minehandleAdd() {
      // this.searchBl();
      this.mine.add.currentPage3 = 1;
      this.mine.add.search = "";
      this.mine.addVisible = true;
      this.mine.add.page = 1;
      this.getAllcomp11();
    },
    //我的企业-添加 获得全部公司列表
    getAllcomp11() {
      this.mine.add.loading = true;
      var that = this;
      this.axios.post(
        "/relation/Person_Service/getAllOrg",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          user_id: this.$store.state.userInfo.user_id,
          page: that.mine.add.page,
          qymc: that.mine.add.search,
          rows: 10,
          source: 1
        },
        data => {
          if (data.status == "success") {
            that.mine.add.tableData = data.rows;
            that.mine.add.total = data.total;
          } else {
            that.mine.add.tableData = [];
            that.mine.add.total = 0;
          }
          that.mine.add.loading = false;
        }
      );
    },
    //我的企业-添加窗口 分页按钮
    mine_add_handleCurrentChange(val) {
      this.mine.add.currentPage3 = val;
      this.mine.add.page = val;
      this.getAllcomp11();
    },
    //我的企业-添加 点击选择一个公司
    selectComp11(index, row) {
      this.axios.post(
        "/relation/Person_Service/saveUserOrg",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          user_id: this.$store.state.userInfo.user_id,
          // qy_type: 1,
          status: 1,
          qymc: row.name,
          org_id: row.id,
          source: 1
        },
        data => {
          this.$message.success("已成功添加");
          this.getData11();
          this.getAllcomp11();
        }
      );
    },

    //我认识的-企业名称筛选
    searchIknow() {
      this.iknow.currentPage3 = 1;
      this.iknow.page = 1;
      this.getData12();
    },
    //我认识的-我认识的类别筛选
    knowRyChange(val) {
      // console.log(val)
      if (val.length > 1) {
        this.iknow.selectH = true;
      } else {
        this.iknow.selectH = false;
      }
      this.iknow.searchRyStr = val.join(",");
      this.getData12();
    },
    //我认识的-企业类型筛选
    searchType(val) {
      if (val == "不限制") {
        this.iknow.qyType = "";
      }
      this.getData12();
    },

    //我认识的-注册属地筛选
    areahandleChange(val) {
      this.iknow.currentPage3 = 1;
      if (val[0] == "入川企业") {
        this.iknow.is_rc = "是";
        if (val[1] != "不限制") {
          this.iknow.area = val[1];
        } else {
          this.iknow.area = "";
        }
      } else if (val[0] == "四川省") {
        this.iknow.is_rc = "否";
        if (val[1] != "不限制") {
          this.iknow.area = val[1];
        } else {
          this.iknow.area = "";
        }
      } else {
        this.iknow.is_rc = "";
        this.iknow.area = "";
      }
      this.getData12();
      // this.iknow.is_rc = "";
      // this.iknow.area = "";
    },
    //获取我认识的表格数据
    getData12() {
      //获取 我信任 表格数据
      this.iknow.isloading = true;
      // var that = this;
      //获取表格数据
      this.axios.post(
        "/relation/Person_Service/userOrgList",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          user_id: this.$store.state.userInfo.user_id,
          qymc: this.iknow.search,
          duty: this.iknow.searchRyStr,
          comp_type: this.iknow.qyType,
          area: this.iknow.area,
          is_rc: this.iknow.is_rc,
          page: this.iknow.page,
          source: 2,
          status: 1
        },
        data => {
          this.iknow.tableData = data.rows;
          if (data.status == "success") {
            this.iknow.total = data.total;
          } else if (data.status == "failed" && this.iknow.page != 1) {
            this.iknow.page -= 1;
            this.getData12();
          } else if (this.iknow.page == 1) {
            this.iknow.total = 0;
          }
          this.iknow.isloading = false;
        }
      );
    },
    //我认识的 翻页
    iknowhandleCurrentChange(val) {
      this.iknow.page = val;
      this.getData12();
    },
    //打开我认识的-编辑窗口
    iknowHandleEdit(index, row) {
      // console.log(row);
      this.iknow.editVisible = true;
      this.iknow.editData.name = this.iknow.tableData[index].name;
      this.iknow.editData.remark = this.iknow.tableData[index].remark;
      this.iknow.ry = this.iknow.tableData[index].duty
        ? this.iknow.tableData[index].duty.split(",")
        : [];
      this.iknow.editData.user_org_id = this.iknow.tableData[index].user_org_id;
      this.iknow.editData.org_id = this.iknow.tableData[index].org_id;
      this.iknow.editData.comp_base_id = this.iknow.tableData[
        index
      ].comp_base_id;
      this.iknow.remark = row.remark;
    },
    //我认识的-编辑窗口
    iknowEditOk(e) {
      //判断当前是否是添加公司
      if (this.iknow.addVisible) {
        //添加 公司
        this.axios.post(
          "/relation/Person_Service/saveUserOrg",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            user_id: this.$store.state.userInfo.user_id,
            // qy_type: 1,
            status: 1,
            qymc: this.iknow.editData.qymc,
            duty: this.iknow.ry.join(","),
            remark: this.iknow.remark,
            org_id: this.iknow.add.gs_id,
            source: 2
          },
          data => {
            this.getData12();
            this.getAllcomp();
            this.iknow.editVisible = false;
            this.iknow.editVisible2 = false;
          }
        );
      } else {
        //修改 公司
        var str = this.iknow.ry.join(",");
        this.axios.post(
          "/relation/Person_Service/saveUserOrg",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            user_id: this.$store.state.userInfo.user_id,
            user_org_id: this.iknow.editData.user_org_id,
            duty: str,
            remark: this.iknow.remark,
            org_id: this.iknow.editData.org_id,
            source: 2
          },
          data => {
            this.$message({
              message: "已保存",
              type: "success"
            });
            str = "";
            this.getData12();
          }
        );
        this.iknow.editVisible = false;
      }
    },
    //打开我认识的-添加窗口
    iknowhandleAdd() {
      // this.searchBl();
      this.iknow.add.currentPage3 = 1;
      this.iknow.add.search = "";
      this.iknow.addVisible = true;
      this.iknow.add.page = 1;
      this.getAllcomp();
    },
    //我认识的-添加 获得全部公司列表
    getAllcomp() {
      this.iknow.add.loading = true;
      var that = this;
      this.axios.post(
        "/relation/Person_Service/getAllOrg",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          user_id: this.$store.state.userInfo.user_id,
          page: that.iknow.add.page,
          qymc: that.iknow.add.search,
          rows: 10,
          source: 2
        },
        data => {
          if (data.status == "success") {
            that.iknow.add.tableData = data.rows;
            that.iknow.add.total = data.total;
          } else {
            that.iknow.add.tableData = [];
            that.iknow.add.total = 0;
          }
          that.iknow.add.loading = false;
        }
      );
    },
    //我认识的-添加窗口 分页按钮
    iknow_add_handleCurrentChange(val) {
      this.iknow.add.currentPage3 = val;
      this.iknow.add.page = val;
      this.getAllcomp();
    },
    //我认识的-添加 点击选择一个公司
    selectComp(index, row) {
      // console.log(row)
      this.iknow.remark = ""; //清除输入框
      this.iknow.editVisible = true;
      this.iknow.ry = [];
      this.iknow.editData.qymc = "";
      this.iknow.editData.qymc = this.iknow.add.tableData[index].gsmc;
      this.iknow.add.gs_id = row.id;
    },

    //我的企业 我认识的 我被坑过-添加 筛选查询企业
    searchAllComp(type) {
      if (type == "mine") {
        this.mine.add.page = 1;
        this.mine.add.currentPage3 = 1;
        this.getAllcomp11();
      } else if (type == "know") {
        this.iknow.add.page = 1;
        this.iknow.add.currentPage3 = 1;
        this.getAllcomp();
      } else {
        this.bl.add.page = 1;
        this.bl.add.currentPage3 = 1;
        this.getAllcomp2();
      }
    },

    //我被坑过-注册属地筛选
    areahandleChange2(val) {
      // console.log(val);
      this.bl.currentPage3 = 1;
      if (val[0] == "入川企业") {
        this.bl.is_rc = "是";
        if (val[1] != "不限制") {
          this.bl.area = val[1];
        } else {
          this.bl.area = "";
        }
      } else if (val[0] == "四川省") {
        this.bl.is_rc = "否";
        if (val[1] != "不限制") {
          this.bl.area = val[1];
        } else {
          this.bl.area = "";
        }
      } else {
        this.bl.is_rc = "";
        this.bl.area = "";
      }
      this.getData2();
      // this.bl.is_rc = "";
      // this.bl.area = "";
    },
    //我被坑过-评价/企业名称筛选
    searchBl() {
      this.bl.currentPage3 = 1;
      this.bl.page = 1;
      this.getData2();
    },
    //获取我被坑过表格数据
    getData2() {
      this.bl.isloading = true;
      var that = this;
      //获取表格数据
      this.axios.post(
        "/index/Repository/searchRepFirm",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          user_id: that.$store.state.userInfo.user_id,
          qymc: that.bl.search,
          qy_type: 2,
          page: that.bl.page,
          area: this.bl.area,
          is_rc: this.bl.is_rc,
          com_record: this.bl.record
        },
        data => {
          that.bl.tableData = data.rows;
          if (data.status == "success") {
            that.bl.total = data.total;
          } else if (data.status == "failed" && this.bl.page != 1) {
            this.bl.page -= 1;
            this.getData2();
          } else {
            if (that.bl.page == 1) {
              that.bl.total = 0;
            }
          }
          this.bl.isloading = false;
        }
      );
    },
    //我被坑过 主表分页
    blhandleCurrentChange(val) {
      this.bl.page = val;
      this.getData2();
    },
    //我被坑过-添加 获得公司列表
    getAllcomp2() {
      this.bl.add.loading = true;
      //后台在改，这个是正确的
      // this.axios.post(
      //   "/relation/Person_Service/getAllOrg",
      //   {
      //     login_user_id: this.$store.state.userInfo.user_id,
      //     user_id: this.$store.state.userInfo.user_id,
      //     page: this.bl.add.page,
      //     qymc: this.bl.add.search,
      //     rows: 10,
      //     source: 3
      //   },
      //   data => {
      //     if (data.status == "success") {
      //       this.bl.add.tableData = data.rows;
      //       this.bl.add.total = data.total;
      //     } else {
      //       this.bl.add.tableData = [];
      //       this.bl.add.total = 0;
      //     }
      //     this.bl.add.loading = false;
      //   }
      // );

      // 暂用
      var that = this;
      this.axios.post(
        "/index/element_set/getAllCompany",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          user_id: this.$store.state.userInfo.user_id,
          page: that.bl.add.page,
          gsmc: that.bl.add.search,
          cate: 1
        },
        data => {
          that.bl.add.tableData = data.rows;
          that.bl.add.total = data.total;
          that.bl.add.loading = false;
        }
      );
    },
    //我被坑过 打开添加窗口
    blhandleAdd() {
      this.bl.add.currentPage3 = 1;
      this.bl.add.page = 1;
      this.bl.add.search = "";
      this.bl.add.addVisible = true;
      this.getAllcomp2();
    },
    //我被坑过-添加窗口分页
    bl_add_handleCurrentChange(val) {
      this.bl.add.page = val;
      this.getAllcomp2();
    },
    //我被坑过-添加 点击选择一个公司
    selectComp2(index, row) {
      this.axios.post(
        "/index/Repository/saveRepFirm",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          user_id: this.$store.state.userInfo.user_id,
          gs_id: this.bl.add.tableData[index].gs_id,
          qymc: this.bl.add.tableData[index].gsmc,
          qy_type: 2
        },
        res => {
          this.bl.editData.rep_id = res.message;
          this.$message.success("已添加");
          // this.bl.add.addVisible = false;
          this.getData2();
          this.getAllcomp2();
        }
      );
      // console.log(this.bl.add.tableData[index])
      this.bl.editData.qymc = this.bl.add.tableData[index].gsmc;
      this.bl.editData.gs_id = this.bl.add.tableData[index].gs_id;
      this.bl.editVisible = true;
      this.bl.checked = false;
      let self = this;
      let a = setTimeout(() => {
        this.getBlMessage();
      }, 500);
    },
    //我被坑过-是否公开该评论
    changeCheckBtn(id, open) {
      this.axios.post(
        "/index/Repository/turnRecord",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          id: id,
          open: open
        },
        data => {
          this.getBlMessage();
          this.$message({
            message: "修改成功",
            type: "success"
          });
        }
      );
    },
    //我被坑过 点击好评/差评
    blhandleEdit(index, row) {
      // this.bl.editData.record = ""; //重置输入框
      // this.btnModel = true; //默认为发布按钮
      // this.ComChangDef = 1; //默认打开好评窗口
      // this.good_num = row.goodRecord;
      // this.bad_num = row.badRecord;
      this.bl.editData.qymc = this.bl.tableData[index].qymc;
      this.bl.editData.gs_id = this.bl.tableData[index].gs_id;
      this.bl.editVisible = true;
      this.bl.editData.rep_id = this.bl.tableData[index].id;
      this.bl.checked = false;
      this.getBlMessage();
    },
    //获得我被坑过-评论列表
    getBlMessage() {
      this.axios.post(
        "/index/Repository/searchRepFirm",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          rep_id: this.bl.editData.rep_id,
          qy_type: 3,
          gs_id: this.bl.editData.gs_id,
          user_id: this.$store.state.userInfo.user_id
        },
        data => {
          if (data.status == "success") {
            this.bl.editData.tableData = JSON.parse(JSON.stringify(data.rows));
            this.bl.kan.tableData = JSON.parse(JSON.stringify(data.rows));
            this.bl.editData.tableData.forEach(e => {
              e.open = e.open.toString();
            });
            this.bl.editData.record = ""; //重置输入框
            this.btnModel = true; //默认为发布按钮
            this.ComChangDef = 1; //默认打开好评窗口
            // console.log(data);
            // this.good_num = data.goodCount;
            // this.bad_num = data.badCount;
          } else {
            this.bl.editData.tableData = [];
            this.bl.kan.tableData = [];
          }
        }
      );
    },
    //我被坑过-评论发布
    seedMessage() {
      if (!this.btnModel) {
        this.badDelete(this.bl.editData.record_id, "", 0);
      }
      if (this.bl.editData.record == "") {
        this.$message.error("请输入发送的内容");
        return;
      } else if (this.comState !== 1 && this.comState !== 0) {
        this.$message.info("请做出评价");
      } else {
        this.axios.post(
          "/index/Repository/saveRepFirm",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            rep_id: this.bl.editData.rep_id,
            user_id: this.$store.state.userInfo.user_id,
            gs_id: this.bl.editData.gs_id,
            qy_type: 3,
            record: this.bl.editData.record,
            open: this.bl.checked ? 1 : 0,
            type: this.comState
          },
          data => {
            this.bl.editData.record = "";
            this.getBlMessage();
            this.getData2();
            this.$message.success("发布成功");
            if (this.comState == 0) {
              this.ComChangDef = 0;
            } else if (this.comState == 1) {
              this.ComChangDef = 1;
            }
            // this.bl.add.addVisible = false;
          }
        );
      }
    },
    //我被坑过删除
    badDelete(index, row, type) {
      //直接删除(评论)
      if (type === 0) {
        this.deleteType = 3;
        this.delete.bad_id = index;
      } else {
        //回收站(主表数据)
        this.deleteType = type;
        this.delete.rep_id = row.id;
      }
      this.deleteOk(type);
    },
    //我被坑过确认删除
    deleteOk(type) {
      this.axios.post(
        "/index/Repository/delRepFirm",
        {
          login_user_id: this.$store.state.userInfo.user_id,
          rep_id: this.delete.rep_id,
          record_id: this.delete.bad_id,
          qy_type: this.deleteType,
          type: type === 0 ? "delete" : "recover"
        },
        data => {
          //修改的时候不提示用户删除 自己悄悄删
          if (this.btnModel) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
          this.getData2();
          // this.bl.page = 1;
          if (this.deleteType == 1) {
            this.getData12();
          } else if (this.deleteType == 2) {
            this.getData2();
          } else if (this.deleteType == 3) {
            this.getBlMessage();
            this.getData2();
          }
        }
      );
    },

    //我认识的/我的服务号-点击删除(回收)
    handleDelete(index, row, type) {
      if (type == "mine") {
        this.axios.post(
          "/relation/Person_Service/delUserOrg",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            id: row.user_org_id,
            type: "recover"
          },
          data => {
            if (this.btnModel) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
            // console.log(123);
            this.getData11();
          }
        );
      } else if (type == "know") {
        this.axios.post(
          "/relation/Person_Service/delUserOrg",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            id: row.user_org_id,
            type: "recover"
          },
          data => {
            if (this.btnModel) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
            this.getData12();
          }
        );
      } else if (type == "service1") {
        this.axios.post(
          "/relation/Person_Service/delUserUser",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            id: row.id,
            type: "recover"
          },
          data => {
            if (this.btnModel) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
            this.getData3();
          }
        );
      }
    },

    //跳转
    openGs(row, model) {
      let gsmc = "";
      let gsid = "";
      if (model == "11") {
        // console.log(row)
        gsmc = row.name;
        gsid = row.comp_base_id;
      } else if (model == "1") {
        gsmc = row.name;
        gsid = row.comp_base_id;
      } else if (model == "2") {
        gsmc = row.qymc || row.gsmc;
        gsid = row.gs_id;
      }
      if (this.role.company_role !== "C") {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${gsid}&gsmc=${gsmc}`
        });
        window.open(href, "公司详情" + gsid);
      } else {
        this.axios.post(
          "/index/mine/roleCompSource",
          {
            gs_id: gsid,
            login_user_id: this.$store.state.userInfo.user_id
          },
          res => {
            // 获取跳转页面结果
            //   console.log(res)
            if (res === "四川省建设厅") {
              let { href } = this.$router.resolve({
                path: `/gs_scjst?gs_id=${gsid}`
              });
              window.open(href, "/gs_scjst" + gsid);
            } else {
              let { href } = this.$router.resolve({
                path: `/gs_building?gs_id=${gsid}`
              });
              window.open(href, "/gs_building" + gsid);
            }
          }
        );
      }
    },
    // 资源库-回收站-批量选择
    handleSelectionChange(val) {
      this.selections = val; //保存所选内容
    },
    //回收站 点击恢复或彻底删除
    Edit(tableType, model, scope) {
      if (model == "delete") {
        this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (tableType == "bad") {
              this.inf_del.type = model;
              // 单个操作
              if (scope) {
                this.inf_del.rep_id = scope.row.id;
                this.inf_del.qy_type = scope.row.qy_type;
              } else {
                // 批量操作
                let ids = "";
                this.selections.forEach((item, index) => {
                  if (index === 0) {
                    ids += item.id;
                  } else {
                    ids += "," + item.id;
                  }
                });
                this.inf_del.rep_id = ids;
                this.inf_del.qy_type = this.selections[0].qy_type;
                this.inf_del.login_user_id = this.$store.state.userInfo.user_id;
              }
              this.axios.post(
                "/index/Repository/delRepFirm",
                this.inf_del,
                res => {
                  this.getList(this.pageModel);
                  if (model === "restore") {
                    this.$message({
                      message: "已恢复",
                      type: "success"
                    });
                  } else {
                    this.$message({
                      message: "已永久删除",
                      type: "info"
                    });
                  }
                  this.searchBl();
                }
              );
            } else if (tableType == "mine") {
              // 单个操作
              if (scope) {
                this.inf_del = {
                  id: scope.row.user_org_id,
                  type: model
                };
              } else {
                // 批量操作
                let ids = "";
                this.selections.forEach((item, index) => {
                  if (index === 0) {
                    ids += item.user_org_id;
                  } else {
                    ids += "," + item.user_org_id;
                  }
                });
                // ids = ids.split(",");
                this.inf_del = {
                  id: ids,
                  type: model,
                  login_user_id: this.$store.state.userInfo.user_id
                };
              }
              this.axios.post(
                "/relation/Person_Service/delUserOrg",
                this.inf_del,
                res => {
                  this.getList(11);
                  this.$message({
                    message: "已永久删除",
                    type: "info"
                  });
                  this.getData11();
                }
              );
            } else if (tableType == "know") {
              this.inf_del.type = model;
              // 单个操作
              if (scope) {
                this.inf_del = {
                  id: scope.row.user_org_id,
                  type: model
                };
              } else {
                // 批量操作
                let ids = "";
                this.selections.forEach((item, index) => {
                  if (index === 0) {
                    ids += item.user_org_id;
                  } else {
                    ids += "," + item.user_org_id;
                  }
                });
                // ids = ids.split(",");
                this.inf_del = {
                  id: ids,
                  type: model,
                  login_user_id: this.$store.state.userInfo.user_id
                };
              }
              this.axios.post(
                "/relation/Person_Service/delUserOrg",
                this.inf_del,
                res => {
                  this.getList(1);
                  this.$message({
                    message: "已永久删除",
                    type: "info"
                  });
                  this.getData12();
                }
              );
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        if (tableType == "bad") {
          this.inf_del.type = model;
          // 单个操作
          if (scope) {
            this.inf_del.rep_id = scope.row.id;
            this.inf_del.qy_type = scope.row.qy_type;
          } else {
            // 批量操作
            let ids = "";
            this.selections.forEach((item, index) => {
              if (index === 0) {
                ids += item.id;
              } else {
                ids += "," + item.id;
              }
            });
            this.inf_del.rep_id = ids;
            this.inf_del.login_user_id = this.$store.state.userInfo.user_id;
            this.inf_del.qy_type = this.selections[0].qy_type;
          }
          this.axios.post("/index/Repository/delRepFirm", this.inf_del, res => {
            this.getList(this.pageModel);
            this.$message({
              message: "已恢复",
              type: "success"
            });
            this.searchBl();
          });
        } else if (tableType == "mine") {
          this.inf_del.type = model;
          // 单个操作
          if (scope) {
            this.inf_del = {
              id: scope.row.user_org_id,
              type: model
            };
          } else {
            // 批量操作
            let ids = "";
            this.selections.forEach((item, index) => {
              if (index === 0) {
                ids += item.user_org_id;
              } else {
                ids += "," + item.user_org_id;
              }
            });
            // ids = ids.split(",");
            this.inf_del = {
              id: ids,
              type: model,
              login_user_id: this.$store.state.userInfo.user_id
            };
          }
          this.axios.post(
            "/relation/Person_Service/delUserOrg",
            this.inf_del,
            res => {
              this.getList(11);
              this.$message({
                message: "已恢复",
                type: "success"
              });
              this.getData11();
            }
          );
        } else if (tableType == "know") {
          this.inf_del.type = model;
          // 单个操作
          if (scope) {
            this.inf_del = {
              id: scope.row.user_org_id,
              type: model
            };
          } else {
            // 批量操作
            let ids = "";
            this.selections.forEach((item, index) => {
              if (index === 0) {
                ids += item.user_org_id;
              } else {
                ids += "," + item.user_org_id;
              }
            });
            // ids = ids.split(",");
            this.inf_del = {
              id: ids,
              type: model,
              login_user_id: this.$store.state.userInfo.user_id
            };
          }
          this.axios.post(
            "/relation/Person_Service/delUserOrg",
            this.inf_del,
            res => {
              this.getList(1);
              this.$message({
                message: "已恢复",
                type: "success"
              });
              this.getData12();
            }
          );
        }
      }
    },
    //回收站分页按钮
    recoveryCurrentChange(val) {
      if (this.model == 11) {
        this.mine.recoveryPage = val;
      } else if (this.model == 1) {
        this.iknow.recoveryPage = val;
      } else if (this.model == 2) {
        this.bl.recoveryPage = val;
      }
      this.getList(this.model);
    },
    //获取回收站内容列表
    getList(model, recoveryPage) {
      if (recoveryPage == 1) {
        this.mine.recoveryPage = 1;
        this.iknow.recoveryPage = 1;
      }
      if (model == 11) {
        this.mine.recovery.loading = true;
        this.model = model;
        this.axios.post(
          "/relation/Person_Service/userOrgList",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            user_id: this.$store.state.userInfo.user_id,
            qymc: this.mine.search,
            status: 2,
            source: 1,
            page: this.mine.recoveryPage,
            area: this.mine.area,
            is_rc: this.is_rc
          },
          res => {
            if (res.status == "success") {
              this.recovery11 = res;
            } else if (res.status == "failed" && this.mine.recoveryPage != 1) {
              this.mine.recoveryPage -= 1;
              this.getList(11);
            } else {
              this.recovery11.rows = [];
              this.recovery11.total = 0;
            }
            this.mine.recovery.loading = false;
          }
        );
      } else if (model == 1) {
        this.inf_recovery.loading1 = true;
        this.model = model;
        this.axios.post(
          "/relation/Person_Service/userOrgList",
          {
            login_user_id: this.$store.state.userInfo.user_id,
            user_id: this.$store.state.userInfo.user_id,
            qymc: this.iknow.search,
            status: 2,
            source: 2,
            page: this.iknow.recoveryPage,
            area: this.iknow.area,
            is_rc: this.is_rc
          },
          res => {
            if (res.status == "success") {
              this.recovery1 = res;
              // this.iknow.recoveryPage=1
            } else if (res.status == "failed" && this.iknow.recoveryPage != 1) {
              this.iknow.recoveryPage -= 1;
              this.getList(1);
            } else {
              this.recovery1.rows = [];
              this.recovery1.total = 0;
            }
            this.inf_recovery.loading1 = false;
          }
        );
      } else if (model == 2) {
        this.bl.loading2 = true;
        this.model = model;
        this.inf_recovery.qy_type = model;
        this.axios.post(
          "/index/Repository/searchRepFirm",
          this.inf_recovery,
          res => {
            if (res.status == "success") {
              this.recovery2 = res;
            } else if (res.status == "failed" && this.inf_recovery.page != 1) {
              this.inf_recovery.page -= 1;
              this.getList(2);
            } else {
              this.recovery2.rows = [];
              this.recovery2.total = 0;
            }
            this.bl.loading2 = false;
          }
        );
      }
    },
    //回收站按钮
    Recovery(model, recoveryPage) {
      this.inf_recovery.page = 1;
      this.pageModel = model;
      this.getList(model, recoveryPage);
      if (model == 11) {
        this.recoveryKey11 = true;
      } else if (model == 1) {
        this.recoveryKey1 = true;
      } else if (model == 2) {
        this.bl.recoveryPage = 1;
        this.recoveryKey2 = true;
      }
    },
    // 个人服务号表格行高
    rowH() {
      return "height:65px;";
    }
    //输入框失去焦点时触发 编辑事件（没找到在哪里调用）
    //editText(index, row) {
    //   this.axios.post(
    //     "/relation/Person_Service/saveUserOrg",
    //     {
    //       rep_id: this.iknow.tableData[index].id,
    //     //   qy_type: 1,
    //       duty: this.iknow.tableData[index].duty,
    //       remark: this.iknow.tableData[index].remark
    //     },
    //     data => {
    //       this.$message({
    //         message: "编辑成功",
    //         type: "success"
    //       });
    //     }
    //   );
    // },

    //查看不良信息（没找到在哪里调用）
    // kan(index, row) {
    //   this.bl.editData.qymc = this.bl.tableData[index].qymc;
    //   this.bl.editData.gs_id = this.bl.tableData[index].gs_id;
    //   this.bl.editData.rep_id = this.bl.tableData[index].id;
    //   this.bl.kan.Visible = true;
    //   this.getBlMessage();
    // },
  },
  computed: {
    Good_num() {
      let num = 0;
      let obj = this.bl.editData.tableData;
      Object.keys(obj).forEach(function(key) {
        if (obj[key].type === 1) {
          num++;
        }
      });
      return num;
    },
    Bad_num() {
      let num = 0;
      let obj = this.bl.editData.tableData;
      Object.keys(obj).forEach(function(key) {
        if (obj[key].type === 0) {
          num++;
        }
      });
      return num;
    }
  },
  watch: {
    "bl.editData.record": {
      deep: true,
      handler: function(newV, oldV) {
        if (!newV) {
          this.btnModel = true;
        }
      }
    },
    //我的服务号-添加 限制用户输入长度
    "service.add.cellphone": {
      handler: function(newV, oldV) {
        if (newV.length > 11) {
          this.$message.warning("已输入号码已达到最大长度");
          this.service.add.cellphone = newV.substr(0, 11);
        }
      }
    }
  }
};
</script>

<style  lang="less">
.personService_container {
  .on-off {
    padding-left: 10px;
    padding-right: 10px;
    height: 18px;
    line-height: 4px;
  }
  .el-row {
    overflow: hidden;
  }
  .el-col {
    overflow: hidden;
  }
  .com-state-chang {
    display: inline-block;
    height: 12px;
    width: 12px;
    background-size: 12px;
  }
  .com-state {
    display: inline-block;
    height: 14px;
    width: 14px;
    background-size: 14px;
  }
  .good_def {
    background-image: url(../assets/good_def.png);
  }
  .good_hover {
    background-image: url(../assets/good_hover.png);
  }
  .good_hover2 {
    background-image: url(../assets/good_hover2.png);
  }
  .bad_def {
    background-image: url(../assets/bad_def.png);
  }
  .bad_hover {
    background-image: url(../assets/bad_hover.png);
  }
  .bad_hover2 {
    background-image: url(../assets/bad_hover2.png);
  }
  .iknow_div {
    /* padding: 20px 0; */
  }
  .buliang {
    /* padding: 20px 0; */
  }
  .el-header {
    padding: 0;
  }
  .title_div {
    padding: 0 50px;
    display: flex;
    color: #ffffff;
    background-color: #324157;
  }
  .title_text {
    flex: 1;
    font-size: 32px;
    padding: 14px 0;
    text-align: center;
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
  }

  .el-main {
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .title {
    cursor: pointer;
    width: 180px;
    height: 55px;
    float: left;
    background-color: #f2f2f2;
    text-align: center;
    line-height: 55px;
    font-size: 16px;
    color: #000;
  }
  .title-hover {
    font-size: 16px;
    color: white;
    background-color: #66b1ff;
  }
  .el-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
    opacity: 1;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .my_service .demo-form-inline {
    padding-top: 20px;
  }
  .iknow_div .demo-form-inline {
    padding-top: 20px;
  }
  .buliang .demo-form-inline {
    padding-top: 20px;
  }
  .dropdown {
    width: 180px;
    text-align: center;
  }
  .inCir {
    color: #b1db79;
  }
  .outCir {
    color: #50e2ce;
  }
  /* .knowAllPage{
  display: flex;
  } */
  .knowAllPage {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .knowAllText {
    margin: -10px 30px 0 0;
    color: #808080;
  }
  .knowAllText .knowAllCount {
    color: #66b1ff;
  }
  .link_color {
    color: #66b1ff;
    cursor: pointer;
  }
  .knowSelect .el-input__inner {
    height: 60px !important;
  }
  /* .knowSelect .el-select__tags>span>span:first-child {
  display: none !important;
  } */
}
</style>
