<!--项目详情-->
<template>
    <div class="ItemInfo_content">
        <!-- 一级页面头部开始 -->
        <div class="content_header">
            <div class="tittle" style="text-align: center">{{itemInfo.gsmc}}</div>
        </div>
        <!-- 一级页面头部结束 -->
        <!-- 一级页面身体开始 -->
        <div class="content_body">
            <div class="body_header">
                <div style="font-size:24px;margin-left:25px;margin-top:20px;">{{itemInfo.xmmc}}</div>
                <div class="evryone" style="border-bottom:1px solid #e1e1e1">
                    <div class="each">
                        项目业主：
                        <span style="font-size:16px">{{itemInfo?itemInfo.xmyzdw:''}}</span>
                    </div>
                    <div class="each">
                        项目地区：
                        <span style="font-size:16px">{{itemInfo?itemInfo.xmdq:''}}</span>
                    </div>
                    <div class="each">
                        项目类型：
                        <span style="font-size:16px">{{itemInfo?itemInfo.xmlxB:''}}</span>
                    </div>
                </div>
                <div class="evryone">
                    <div class="evryone_one">项目进度：</div>
                    <div class="evryone_two">
                        <!--流程横排-->
                        <div style="width: 100%;height:100px;">
                            <ul style="height: 100px;position: relative;margin:0 auto;width:1370px;" class="liu">
                                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg1+')',width:'270px',left:'0',zIndex:'100'}">
                                    <span :style="{textAlign:'center',fontSize:'14px',color:itemInfo.status == '预定'?'#ffffff':'#606266'}">{{itemInfo.status=='预定'?itemInfo.stage1:'预定'}}</span>
                                </li>
                                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg2+')',width:'270px',left:'238px',zIndex:'99'}">
                                    <span :style="{fontSize:'14px',color:itemInfo.status == '报名'?'#ffffff':'#606266'}">{{itemInfo.status=='报名'?itemInfo.stage2:'报名'}}</span>
                                </li>
                                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg3+')',width:'270px',left:'475px',zIndex:'98'}">
                                    <span :style="{fontSize: '14px',color:itemInfo.status == '标书'?'#ffffff':'#606266'}">{{itemInfo.status=='标书'?itemInfo.stage3:'标书'}}</span>
                                </li>
                                <li :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg4+')',width:'270px',left:'711px',zIndex:'97'}">
                                    <span :style="{fontSize: '14px',color:itemInfo.status == '开标'?'#ffffff':'#606266'}">{{itemInfo.status=='开标'?itemInfo.stage4:'开标'}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="body_content">
                <div class="table" style="height:1000px;margin-top:50px;">
                    <div class="table_header" style="margin-top: 25px;">业绩情况</div>
                    <div class="table_footer">
                        <el-row :gutter="20">
                            <div style="position:absolute;left:3%;">
                                <el-button type="primary" icon="el-icon-d-arrow-left" @click="checkTableButton()"></el-button>
                            </div>
                            <div style="position:absolute;right:3%;">
                                <el-button type="primary" icon="el-icon-d-arrow-right" @click="checkTableButton()"></el-button>
                            </div>
                            <div :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'637px',zIndex:'9',display:tableIndex==1?'block':'none'}" @click="checkTable(2)"></div>
                            <div :style="{width:'1182px',height:'664px',position:'absolute',top:'81px',left:'0',zIndex:'9',display:tableIndex!=1?'block':'none'}" @click="checkTable(1)"></div>
                            <div :style="tableStyleL" @click="checkTable(1)">
                                <p :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==1?'center':'left',fontSize:'20px',color:'#67C23a'}">
                                    已通过的数据&nbsp;
                                    <i class="el-icon-success"></i>
                                </p>
                                <el-table border :data="gsDataL.gslist" v-loading="gsDataL.loading">
                                    <el-table-column width="50px" label="序号" header-align="center" align="center">
                                        <template slot-scope="scope">{{scope.$index+(gsDataL.page-1)*10+1}}</template>
                                    </el-table-column>
                                    <el-table-column prop="xmmc" label="项目名称" align="center">
                                        <template slot-scope="scope">
                                            <span style="cursor: pointer;color: #409eff" @click="openxq(scope.$index,scope.row)">{{scope.row.xmmc}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="金额(万元)" prop="money" align="center" width="100"></el-table-column>
                                    <el-table-column label="数据源" prop="source" align="center" width="300"></el-table-column>
                                    <el-table-column label="数据状态" prop="flag" align="center" width="100"></el-table-column>
                                    <el-table-column label="标签" prop="bq" align="center" width="50">
                                        <template slot-scope="scope">
                                            <el-button v-if="scope.row.label == 0" type="text" icon="el-icon-star-off" @click="openTag(scope.$index,scope.row)"></el-button>
                                            <el-button v-if="scope.row.label == 1" type="text" icon="el-icon-star-on" @click="openTag(scope.$index,scope.row)"></el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="招中标信息" align="center" width="200">
                                        <template slot-scope="scope">
                                            <el-button v-if="scope.row.tender == 1" type="success" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'tender')">招标</el-button>
                                            <el-button v-if="scope.row.tender == 0" type="danger" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'tender')">招标</el-button>
                                            <el-button v-if="scope.row.win == 1" type="success" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'win')">中标</el-button>
                                            <el-button v-if="scope.row.win == 0" type="danger" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'win')">中标</el-button>
                                            <el-button v-if="scope.row.other == 1" type="success" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'other')">其他</el-button>
                                            <el-button v-if="scope.row.other == 0" type="danger" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'other')">其他</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="审核" prop="sh" align="center" width="100">
                                        <template slot-scope="scope">
                                            <el-button type="danger" size="mini" @click="auditButton(scope.$index,scope.row,'1')">驳回</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination style="margin:20px 0" ref="fenye" @current-change="pageSizeChangeL" align="right" background layout="total,prev, pager, next" :total="gsDataL.total"></el-pagination>
                            </div>
                            <div :style="tableStyleR" @click="checkTable(2)">
                                <p :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==2?'center':'right',fontSize:'20px',color:'#f56c6c'}">
                                    未通过的数据
                                    <i class="el-icon-error"></i>
                                </p>
                                <el-table border :data="gsDataR.gslist" v-loading="gsDataR.loading">
                                    <el-table-column width="50px" label="序号" header-align="center" align="center">
                                        <template slot-scope="scope">{{scope.$index+(gsDataR.page-1)*10+1}}</template>
                                    </el-table-column>
                                    <el-table-column prop="xmmc" label="项目名称" align="center">
                                        <template slot-scope="scope">
                                            <span style="cursor: pointer;color: #409eff" @click="openxq(scope.$index,scope.row)">{{scope.row.xmmc}}</span>
                                            <!--<span v-if="scope.row.source != '全国建筑市场' && scope.row.source != '四川建设厅'">{{scope.row.xmmc}}</span>-->
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="金额(万元)" prop="money" align="center" width="100"></el-table-column>
                                    <el-table-column label="数据源" prop="source" align="center" width="300"></el-table-column>
                                    <el-table-column label="数据状态" prop="flag" align="center" width="100"></el-table-column>
                                    <el-table-column label="标签" prop="bq" align="center" width="50">
                                        <template slot-scope="scope">
                                            <el-button v-if="scope.row.label == 0" type="text" icon="el-icon-star-off" @click="openTag(scope.$index,scope.row)"></el-button>
                                            <el-button v-if="scope.row.label == 1" type="text" icon="el-icon-star-on" @click="openTag(scope.$index,scope.row)"></el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="招中标信息" align="center" width="200">
                                        <template slot-scope="scope">
                                            <el-button v-if="scope.row.tender == 1" type="success" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'tender')">招标</el-button>
                                            <el-button v-if="scope.row.tender == 0" type="danger" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'tender')">招标</el-button>
                                            <el-button v-if="scope.row.win == 1" type="success" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'win')">中标</el-button>
                                            <el-button v-if="scope.row.win == 0" type="danger" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'win')">中标</el-button>
                                            <el-button v-if="scope.row.other == 1" type="success" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'other')">其他</el-button>
                                            <el-button v-if="scope.row.other == 0" type="danger" size="mini" style="margin-left: 0;width:40px;padding: 5px 0" @click="openwin(scope.$index,scope.row,'other')">其他</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="审核" prop="sh" align="center" width="100">
                                        <template slot-scope="scope">
                                            <el-button type="success" size="mini" @click="auditButton(scope.$index,scope.row,'2')">通过</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination style="margin:20px 0" ref="fenye" @current-change="pageSizeChangeR" align="right" background layout="total,prev, pager, next" :total="gsDataR.total"></el-pagination>
                            </div>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
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
                                    <el-date-picker v-model="kbrq" align="right" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="kbrq"></el-date-picker>
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
                                    <el-date-picker v-model="kgrq" align="right" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="kgrq"></el-date-picker>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="6" align="middle" justify="center">
                                <div class="grid-content bg-purple" style="font-size: 16px;margin-top: 5px">竣工日期：</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="block">
                                    <el-date-picker v-model="wgrq" align="right" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="wgrq"></el-date-picker>
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
                                    <p v-for="(item) in tag.checkList" :key="item" style="text-align: left;margin-left: 50px;">*{{item}}</p>
                                    <p v-for="(item,index) in tag.otherArr" :key="item" style="text-align: left;margin-left: 50px;width:400px;">
                                        {{index+1}}:{{item}}
                                        <i class="el-icon-delete" style="color:red;cursor: pointer" @click="deleteOtherItem(index)"></i>
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
                                    <el-button type="success" size="mini" @click="addTagItem" style="float:left;margin-top: 5px;margin-left: 20px">添加</el-button>
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
        <!--招标弹窗-->
        <el-dialog title="招标" :visible.sync="zhaoVisible" width="60%">
            <div>
                <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入招标内容或招标网址" v-model="tender"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="EditOk('tender','')">确认编辑</el-button>
                <el-button @click="zhaoVisible = false">取消</el-button>
                <el-button @click="EditOk('tender','delete')" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
            </span>
        </el-dialog>
        <!--中标弹窗-->
        <el-dialog title="中标" :visible.sync="zhongVisible" width="60%">
            <div>
                <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入中标内容或中标网址" v-model="win"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="EditOk('win','')">确认编辑</el-button>
                <el-button @click="zhongVisible = false">取消</el-button>
                <el-button @click="EditOk('win','delete')" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
            </span>
        </el-dialog>
        <!--其他弹窗-->
        <el-dialog title="其他" :visible.sync="qitaVisible" width="60%">
            <div>
                <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" v-model="other"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="EditOk('other','')">确认编辑</el-button>
                <el-button @click="qitaVisible = false">取消</el-button>
                <el-button @click="EditOk('other','delete')" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
            </span>
        </el-dialog>
        <!--点击业绩名称弹窗-->
        <el-dialog title="详细信息" :visible.sync="xq.Visible" width="90%">
            <p style="text-align: center;width: 100%;">已通过</p>
            <div>
                <el-table border :data="xq.list1">
                    <el-table-column type="index" width="50px" label="序号" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" align="center">
                        <template slot-scope="scope">
                            <span style="color: #409eff;cursor:pointer" @click="openXqOne(scope.row.xmmc)">{{scope.row.xmmc}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="jgbabh" label="竣工备案编号" align="center" width="220"></el-table-column>
                    <el-table-column prop="jsgm" label="建设规模" align="center" width="150" show-overflow-tooltip></el-table-column>
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
                            <i v-if="scope.row.have_buildlise == 1" class="el-icon-success" style="color: #10CF46"></i>
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
                    <!-- <el-table-column label="标签" align="center" width="50">
            <template slot-scope="scope">
              <el-button v-if="xq.label == 0" type="text" icon="el-icon-star-off" @click="openTagIn(scope.$index,scope.row)"></el-button>
              <el-button v-if="xq.label == 1" type="text" icon="el-icon-star-on" @click="openTagIn(scope.$index,scope.row)"></el-button>
            </template>
          </el-table-column> -->
                    <el-table-column label="审核" prop="sh" align="center" width="100">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="auditButtonIn(scope.$index,scope.row,'1')">驳回</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <p style="text-align: center;width: 100%;margin-top: 20px;">未通过</p>
            <div>
                <el-table border :data="xq.list2">
                    <el-table-column type="index" width="50px" label="序号" header-align="center" align="center"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" align="center">
                        <template slot-scope="scope">
                            <span style="color: #409eff;cursor:pointer" @click="openXqOne(scope.row.xmmc)">{{scope.row.xmmc}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="jgbabh" label="竣工备案编号" align="center" width="220"></el-table-column>
                    <el-table-column prop="jsgm" label="建设规模" align="center" width="150" show-overflow-tooltip></el-table-column>
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
                            <i v-if="scope.row.have_buildlise == 1" class="el-icon-success" style="color: #10CF46"></i>
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
                    <!-- <el-table-column label="标签" align="center" width="50">
            <template slot-scope="scope">
              <el-button v-if="xq.label == 0" type="text" icon="el-icon-star-off" @click="openTagIn(scope.$index,scope.row)"></el-button>
              <el-button v-if="xq.label == 1" type="text" icon="el-icon-star-on" @click="openTagIn(scope.$index,scope.row)"></el-button>
            </template>
          </el-table-column> -->
                    <el-table-column label="审核" prop="sh" align="center" width="100">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" @click="auditButtonIn(scope.$index,scope.row,'2')">通过</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="xq.Visible = false">确认</el-button>
            </span>
        </el-dialog>
        <!-- 确认删除tag弹框 -->
        <el-dialog title="提示" :visible.sync="deleteTagDialogVisible" width="30%">
            <span>是否要删除该标签</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteTagDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteTag">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 业绩驳回原因 -->
        <el-dialog title="业绩驳回原因" :visible.sync="qynoPassDialogVisible" width="35%" :close-on-click-modal="false">
            <div style="width:629px;max-height: 500px;overflow: auto;background-color: #fff;border-top: 1px solid #f3f3f3;margin-top: -20px;">
                <div v-for="o in noPass.allData" :key="o.id" class="text item" style="width:600px;margin-top: 20px;background-color:#fff;margin: 40px auto;">
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
                            <span style="color: rgb(63,141,213);">{{ o.nickname?o.nickname:o.username }} ({{o.time}})</span>
                        </div>
                    </div>
                    <div style="margin-left: 50px;margin-top: 20px;margin-right: 50px;">
                        <p>{{ o.reason }}</p>
                        <p>{{ o.other }}</p>
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
                <el-input type="textarea" @keyup.ctrl.enter.native="onPj" :rows="4" placeholder="其他驳回原因(例：该业绩无中标公示，无竣工验收)" v-model="noPass.other"></el-input>
            </div>
            <div style="color:#cccccc;font-size:14px;">Ctrl+Enter提交</div>
            <div style="text-align:right;margin-top:10px">
                <el-button type="primary" @click="noPassOk()">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
import firstImgUrl from '../assets/h1.png'
import centerImgUrl from '../assets/h1.png'
import lastImgUrl from '../assets/h4.png'
//高亮组
import prifirstImgUrl from '../assets/l1u.png'
import pricenterImgUrl from '../assets/l1u.png'
import prilastImgUrl from '../assets/l5u.png'
//引入图片
import l1u from '../assets/l1u.png'
import l1d from '../assets/l2d.png'
import l2u from '../assets/l1u.png'
import l2d from '../assets/l2d.png'
import l5u from '../assets/l5u.png'
import l5d from '../assets/l5d.png'
export default {
  name: 'ItemInfo',
  data() {
    return {
      //切换表格
      tableIndex: 1,
      tableStyleL:
        'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(10%) scale(1);position:absolute;width:80%;z-index:10;height:810px;',
      tableStyleR:
        'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);position:absolute;width:80%;z-index:8;height:810px;',
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
        bg1: '',
        bg2: '',
        bg3: '',
        bg4: ''
      },
      gsmc: this.$route.query.gsmc,
      input: '',
      itemInfo: [
        {
          xmmc: ''
        }
      ],
      gsDataL: {
        loading: false,
        gslist: [
          {
            cb: ['招标', '中标']
          }
        ],
        total: 0,
        page: 1
      },
      gsDataR: {
        loading: false,
        gslist: [],
        total: 0,
        page: 1
      },
      //标签是否显示
      dialogVisible: false,
      //三个弹窗
      zhaoVisible: false,
      zhongVisible: false,
      qitaVisible: false,
      //弹窗内值
      tender: '',
      win: '',
      jgbabh: '',
      source: '',
      id: '',
      count: 10,
      //标签内值
      je: '',
      kbrq: '',
      kgrq: '',
      other: '',
      wgrq: '',
      //点击项目名称出现的详情弹框
      xq: {
        list1: [],
        list2: [],
        type: '',
        Visible: false,
        label: '',
        source: '',
        id: '',
        listCount1: '',
        listCount2: '',
        proj_id: ''
      },
      //点击标签页出现的标签详情
      tag: {
        source: '',
        proj_id: '',
        jgbabh: '',
        model: '',
        checkList: [],
        other: '',
        otherItem: '',
        otherArr: [],
        checkListOther: false,
        //最终传数据时使用的变量
        fake: '',
        company: '',
        id: ''
      },
      deleteTagDialogVisible: false,
      qynoPassDialogVisible: false,
      noPass: {
        checkboxdata: [],
        gslist: [],
        Visible: false,
        other: '',
        proj_id: '',
        jgbabh: '',
        allData: [],
        tableStyleLM: '',
        tableStyleLMB: 'display:none',
        total_yj: ''
      },
      datas: {}
    }
  },
  created() {
    this.getItemInfo()
    this.getListDataL()
    this.getListDataR()
  },
  computed: {
    firstStyle() {
      let imgurl = this.itemInfo.stage1 ? prifirstImgUrl : firstImgUrl
      return {
        color: '#ffffff',
        backgroundImage: 'url(' + imgurl + ')'
      }
    },
    centerStyle() {
      let imgurl = this.itemInfo.stage2 ? pricenterImgUrl : centerImgUrl
      return {
        color: '#ffffff',
        backgroundImage: 'url(' + imgurl + ')'
      }
    },
    centerStyle2() {
      let imgurl = this.itemInfo.stage3 ? pricenterImgUrl : centerImgUrl
      return {
        color: '#ffffff',
        backgroundImage: 'url(' + imgurl + ')'
      }
    },
    lastStyle() {
      let imgurl = this.itemInfo.stage4 ? prilastImgUrl : lastImgUrl
      return {
        color: '#ffffff',
        backgroundImage: 'url(' + imgurl + ')'
      }
    }
  },
  methods: {
    //按钮无限切换
    checkTableButton() {
      if (this.tableIndex == 2) {
        this.checkTable(1)
      } else {
        this.checkTable(2)
      }
    },
    //切换表格
    checkTable(type) {
      if (type == 2) {
        this.tableIndex = 2
        this.tableStyleL =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(-10%) scale(0.8);position:absolute;width:80%;z-index:8;height:810px;transition: .3s;'
        this.tableStyleR =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(10%) scale(1);position:absolute;width:80%;z-index:10;height:810px;transition: .3s;'
      } else {
        this.tableIndex = 1
        this.tableStyleL =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(10%) scale(1);position:absolute;width:80%;z-index:10;height:810px;transition: .3s;'
        this.tableStyleR =
          'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);position:absolute;width:80%;z-index:8;height:810px;transition: .3s;'
      }
    },
    //渲染进度横条
    jindu() {
      console.log(this.itemInfo.status)
      this.li.bg1 =
        this.itemInfo.status == '预定'
          ? this.button_radio.l1
          : this.button_radio.l6
      this.li.bg2 =
        this.itemInfo.status == '报名'
          ? this.button_radio.l2
          : this.button_radio.l7
      this.li.bg3 =
        this.itemInfo.status == '标书'
          ? this.button_radio.l3
          : this.button_radio.l7
      this.li.bg4 =
        this.itemInfo.status == '开标'
          ? this.button_radio.l4
          : this.button_radio.l8
    },
    // 获取业绩信息
    getItemInfo() {
      let obj = {
        gs_id: this.$route.query.gs_id,
        jbxx_id: this.$route.query.jbxx_id,
        user_id: this.$route.query.user_id
          ? this.$route.query.user_id
          : this.$store.state.userInfo.user_id
      }
      this.axios.post('/index/project/re_detail', obj, data => {
        if (data.status == 'success') {
          this.itemInfo = data.rows ? data.rows : []
          this.jindu()
          document.title = '业绩:' + this.itemInfo.gsmc
        }
      })
    },
    //点招中标多选框 弹出窗口
    openwin(index, row, type) {
      this.source = row.source
      this.jgbabh = row.jgbabh
      if (row.source == '全国建筑市场' || row.source == '四川建设厅') {
        this.id = row.proj_id
      } else {
        this.id = row.id
      }
      this.axios.post(
        '/index/search_yj/saveRemark',
        {
          proj_id: this.id,
          jgbabh: row.jgbabh,
          type: type,
          txt: '',
          source: row.source,
          cate: 1,
          flag: 1
        },
        data => {
          if (type == 'tender') {
            this.tender = data.txt
            this.zhaoVisible = true
          } else if (type == 'win') {
            this.win = data.txt
            this.zhongVisible = true
          } else {
            this.other = data.txt
            this.qitaVisible = true
          }
        }
      )
    },
    handleTagDelete() {
      this.deleteTagDialogVisible = true
    },
    //编辑找中标确认
    EditOk(index, deleteoK) {
      var is_s = ''
      if (index == 'tender') {
        is_s = this.tender
      } else if (index == 'win') {
        is_s = this.win
      } else if (index == 'other') {
        is_s = this.other
      }
      if (deleteoK == 'delete') {
        this.axios.post(
          '/index/search_yj/saveRemark',
          {
            proj_id: this.id,
            jgbabh: this.jgbabh,
            type: index,
            txt: '',
            source: this.source,
            cate: 2,
            flag: 1
          },
          data => {
            this.zhaoVisible = false
            this.zhongVisible = false
            this.qitaVisible = false
            this.getListDataL()
            this.getListDataR()
          }
        )
      } else {
        this.axios.post(
          '/index/search_yj/saveRemark',
          {
            proj_id: this.id,
            jgbabh: this.jgbabh,
            type: index,
            txt: is_s,
            source: this.source,
            cate: 2
          },
          data => {
            this.zhaoVisible = false
            this.zhongVisible = false
            this.qitaVisible = false
            this.getListDataL()
            this.getListDataR()
          }
        )
      }
    },
    //将字符串转化成数组
    toArr(tender, win, other) {
      var arr = []
      if (tender == 1) {
        arr.push('招标')
      } else if (win == 1) {
        arr.push('中标')
      } else if (other == 1) {
        arr.push('其他')
      }
      return arr
    },
    //在主表格打开标签
    openTag(index, row) {
      this.je = ''
      this.kgrq = ''
      this.wgrq = ''
      this.kbrq = ''
      this.dialogVisible = true
      this.tag.model = row.model
      var proj_id = ''
      if (row.source == '全国建筑市场' || row.source == '四川建设厅') {
        this.tag.proj_id = row.proj_id
        this.tag.jgbabh = row.jgbabh
      } else {
        this.tag.proj_id = row.id
      }
      this.tag.source = row.source
      this.toJsonData()
      this.getDataOpenTag()
    },
    //在内格打开标签
    openTagIn(index, row) {
      this.dialogVisible = true
      this.getDataOpenTag()
    },
    //请求标签接口
    getDataOpenTag() {
      this.tag.otherItem = ''
      this.tag.checkListOther = []
      this.tag.checkListOther = false
      this.tag.otherArr = []
      var data = {}
      if (this.tag.jgbabh != '') {
        data = {
          gs_id: this.$route.query.gs_id,
          proj_id: this.tag.proj_id,
          jgbabh: this.tag.jgbabh,
          model: this.tag.model
        }
      } else {
        data = {
          gs_id: this.$route.query.gs_id,
          proj_id: this.tag.proj_id,
          model: this.tag.model
        }
      }
      this.axios.post('/index/search_yj/checkLabel', data, data => {
        if (this.tag.source == '中标公示') {
          this.je = data.je
          this.kbrq = data.kbrq
        } else {
          this.je = data.je
          this.kgrq = data.kgrq
          this.wgrq = data.wgrq
        }
        this.tag.id = data.id
        this.tag.fake = data.fake
        this.tag.company = data.company
        this.tag.checkList = this.TagtoArr(data.fake, data.company)
        this.tag.other = data.other
        this.tag.otherArr = this.otherToArr(data.other)
        this.otherToArr(data.other)
      })
    },
    //保存标签的接口
    saveTag() {
      var data = {
        proj_id: this.tag.proj_id,
        fake: this.tag.fake,
        is: this.tag.company,
        je: this.je,
        other: this.tag.otherArr.join('|'),
        source: this.tag.source,
        id: this.tag.id,
        company: this.$route.query.gs_id
      }
      if (
        this.tag.source == '全国建筑市场' ||
        this.tag.source == '四川建设厅'
      ) {
        data.kgrq = this.kgrq
        data.wgrq = this.wgrq
        data.jgbabh = this.tag.jgbabh
      } else {
        data.kgrq = this.kgrq
        data.wgrq = this.wgrq
        data.kbrq = this.kbrq
      }
      this.axios.post('/index/search_yj/saveLabel', data, data => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.getListDataL()
        this.getListDataR()
      })
    },
    //取左表格数据
    getListDataL() {
      this.gsDataL.loading = true
      this.axios.post(
        '/index/search_yj/companyToYj',
        {
          gs_id: this.$route.query.gs_id,
          yj_id: this.$route.query.yj_id,
          type: 1,
          rows: 10,
          page: this.gsDataL.page,
          order: 'asc',
          flag: 1,
          jbxx_id: this.$route.query.jbxx_id
        },
        data => {
          if (data.status == 'success') {
            this.gsDataL.gslist = data.rows
            this.gsDataL.total = data.total
            this.noPass.total_yj = data.total_yj
          } else {
            this.gsDataL.gslist = []
            this.gsDataL.total = 0
          }
          this.gsDataL.loading = false
        }
      )
    },
    //左表分页
    pageSizeChangeL(val) {
      this.gsDataL.page = val
      this.getListDataL()
    },
    //取右表格数据
    getListDataR() {
      this.gsDataR.loading = true
      this.axios.post(
        '/index/search_yj/companyToYj',
        {
          gs_id: this.$route.query.gs_id,
          yj_id: this.$route.query.yj_id,
          type: 2,
          rows: 10,
          page: this.gsDataR.page,
          order: 'asc',
          flag: 1,
          jbxx_id: this.$route.query.jbxx_id
        },
        data => {
          if (data.status == 'success') {
            this.gsDataR.gslist = data.rows
            this.gsDataR.total = data.total
            this.noPass.total_yj = data.total_yj
          } else {
            this.gsDataR.gslist = []
            this.gsDataR.total = 0
          }
          this.gsDataR.loading = false
        }
      )
    },
    //右表分页
    pageSizeChangeR(val) {
      this.gsDataR.page = val
      this.getListDataR()
    },
    //请求企业不通过原因的列表
    getCheckReason() {
      //驳回请求列表
      this.axios.post(
        '/index/search_yj/checkReason',
        {
          jgbabh: this.noPass.jgbabh,
          proj_id: this.noPass.proj_id
        },
        data => {
          if (data.status == 'success') {
            this.noPass.allData = data.rows
            this.noPass.checkboxdata = data.rows[0].reason.split(',')
            this.noPass.other = data.rows[0].other
          } else {
          }
          //显示企业不通过原因的窗口
          this.qynoPassDialogVisible = true
        }
      )
    },
    //在企业不通过原因的窗口点击提交
    noPassOk() {
      if (this.noPass.checkboxdata.length == 0 && this.noPass.other == '') {
        this.$message.error('提交的内容不能为空')
        return
      }
      this.axios.post(
        '/index/search_yj/addReason',
        {
          user_id: this.$store.state.userInfo.user_id,
          proj_id: this.noPass.proj_id,
          jgbabh: this.noPass.jgbabh,
          reason: this.noPass.checkboxdata.join(','),
          other: this.noPass.other
        },
        data => {
          this.getAuditing()
          this.qynoPassDialogVisible = false
          this.getListDataR()
          this.getListDataL()
          window.opener.postMessage('刷新', '*')
        }
      )
    },
    //主表审核按钮
    auditButton(index, row, type) {
      this.noPass.allData = []
      this.noPass.other = ''
      this.noPass.checkboxdata = []
      this.noPass.jgbabh = row.jgbabh
      this.noPass.proj_id = row.id
      this.datas = {
        gs_id: this.$route.query.gs_id,
        yj_id: this.noPass.total_yj,
        xm_id: row.id,
        type: type
      }
      //0为驳回 打开企业不通过原因的窗口   1为通过
      if (type == '1') {
        this.getCheckReason()
      } else if (type == '2') {
        this.getAuditing()
      }
    },
    //业绩详情页的审核按钮
    auditButtonIn(index, row, type) {
      //通过按钮
      if (type == '2') {
        //如果只有一个标段，那么标段的通过就是整个业绩的通过
        if (this.xq.listCount2 == 1) {
          this.datas = {
            gs_id: this.$route.query.gs_id,
            yj_id: this.noPass.total_yj,
            xm_id: this.id,
            type: type
          }
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
          }
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
          }
        }
      } else if (type == '1') {
        if (this.xq.listCount1 == 1) {
          this.datas = {
            gs_id: this.$route.query.gs_id,
            yj_id: this.noPass.total_yj,
            xm_id: this.id,
            type: type
          }
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
          }
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
          }
        }
      }
      this.getAuditing()
    },
    //请求审核接口
    getAuditing() {
      this.axios.post('/index/search_yj/yjAuditing', this.datas, data => {
        this.getListDataL()
        this.getListDataR()
        this.qynoPassDialogVisible = false
        this.getXqData()
        window.opener.postMessage('刷新', '*')
        if (this.datas.type == '1' && this.xq.listCount1 == 1) {
          this.datas = this.datasDel
          this.getAuditing()
          this.xq.listCount1 = 0
          this.xq.Visible = false
        }
        if (this.datas.type == '2' && this.xq.listCount2 == 1) {
          this.datas = this.datasDel
          this.getAuditing()
          this.xq.listCount2 = 0
          this.xq.Visible = false
        }
      })
    },
    //更多按钮
    gengduo() {
      this.count = this.count + 10000
      this.getListDataL()
      this.getListDataR()
    },
    //点击项目名称
    openxq(index, row) {
      this.xq.yj_id = row.yj_id
      this.id = row.id
      if (row.source == '全国建筑市场' || row.source == '四川建设厅') {
        //审核内标签数据转接
        this.xq.Visible = true
        this.xq.jgbabh = row.jgbabh
        this.xq.proj_id = row.proj_id
        this.xq.model = row.model
        this.xq.source = row.source
        this.getXqData()
      } else if (row.source == '中标公示') {
        let { href } = this.$router.resolve({
          path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ||
            ''}&zbgs_id=${row.id || ''}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
        })
        window.open(href, '中标公示' + row.zb_id + row.zbxx_id + row.xmmc)
      } else if (row.source == '投标使用') {
        let { href } = this.$router.resolve({
          path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ||
            ''}&zbgs_id=${row.zb_id || ''}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
        })
        window.open(href, '中标公示' + row.zb_id + row.zbxx_id + row.xmmc)
      } else {
        let { href } = this.$router.resolve({
          path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ||
            ''}&zbgs_id=${row.zb_id || ''}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
        })
        window.open(href, '中标公示' + row.zb_id + row.zbxx_id + row.xmmc)
        // window.open(row.link);
      }
    },
    //请求点击项目名称显示列表的接口
    getXqData() {
      this.axios.post(
        '/index/search_yj/secondYj',
        {
          proj_id: this.xq.proj_id,
          jgbabh: this.xq.jgbabh,
          yj_id: this.$route.query.yj_id,
          tableName: this.xq.model,
          row: 10,
          page: 1,
          order: 'asc',
          gs_id: this.$route.query.gs_id,
          type: 1
          //tableName:'proj_jzsc',
          //source:'全国建筑市场',
        },
        data => {
          if (data.status == 'success') {
            this.xq.list1 = data.rows
            this.xq.listCount1 = data.total
          } else {
            this.xq.list1 = []
            this.xq.listCount1 = 0
          }
        }
      )

      this.axios.post(
        '/index/search_yj/secondYj',
        {
          proj_id: this.xq.proj_id,
          jgbabh: this.xq.jgbabh,
          yj_id: this.$route.query.yj_id,
          tableName: this.xq.model,
          row: 10,
          page: 1,
          order: 'asc',
          gs_id: this.$route.query.gs_id,
          type: 2
          //tableName:'proj_jzsc',
          //source:'全国建筑市场',
        },
        data => {
          if (data.status == 'success') {
            this.xq.list2 = data.rows
            this.xq.listCount2 = data.total
          } else {
            this.xq.list2 = []
            this.xq.listCount2 = 0
          }
          //                                window.open(row.link);
          //
        }
      )
    },
    //点击

    //标签页的复选框发生变化时调用函数
    YJtag() {
      this.toJsonData()
    },
    openXqOne(name) {
      var source = ''
      if (this.xq.source == '全国建筑市场') {
        source = 'jzsc'
      } else if (this.xq.source == '四川建设厅') {
        source = 'jst'
      } else if (this.xq.source == '公路') {
        source = 'gl'
      } else if (this.xq.source == '水利') {
        source = 'sl'
      }
      let { href } = this.$router.resolve({
        path: `/yjDet?proj_id=${this.xq.proj_id}&source=${source}`
      })
      window.open(href, '业绩详情' + name + this.xq.proj_id + source)
    },
    //请求标签页保存的接口
    getTagData() {
      this.axios.post(
        '/index/search_yj/checkLabel',
        {
          gs_id: this.$route.query.gs_id,
          yj_id: this.$route.query.yj_id,
          xm_id: this.id,
          type: this.type
        },
        data => {
          this.getListDataL()
          this.getListDataR()
          this.xq.Visible = false
          window.opener.postMessage('刷新', '*')
        }
      )
    },
    //标签页把请求数据转化成数组
    TagtoArr(fake, company) {
      var arr = []
      if (fake == 1) {
        arr.push('假业绩')
      }
      if (company == 1) {
        arr.push('该业绩该企业不能使用')
      }
      return arr
    },
    //添加其他原因函数
    addTagItem() {
      if (this.tag.otherItem == '') {
        this.$message.error('内容不能为空')
      } else {
        this.tag.otherArr.push(this.tag.otherItem)
        this.tag.otherItem = ''
      }
    },
    //删除标签页里面的添加的其他原因
    deleteOtherItem(index) {
      this.tag.otherArr.splice(index, 1)
    },
    //假业绩和企业不能使用，由中文转化成两个变量,数组转化为字符串
    toJsonData() {
      var str = this.tag.checkList.join('|')
      console.log(str)
      if (str == '假业绩') {
        str = str + '|该业绩该企业不能使用'
        this.tag.checkList.push('该业绩该企业不能使用')
      }
      if (str.indexOf('假业绩') >= 0) {
        this.tag.fake = 1
      } else {
        this.tag.fake = 0
      }
      if (str.indexOf('该业绩该企业不能使用') >= 0) {
        this.tag.company = 1
      } else {
        this.tag.company = 0
      }
    },
    //将请求的数据中的字符串转化成数组
    otherToArr(data) {
      if (data) {
        return data.split('|')
      } else {
        return []
      }
    },
    //确认删除标签
    deleteTag() {
      this.axios.post(
        '/index/search_yj/saveLabel',
        {
          flag: 'delete',
          id: this.tag.id
        },
        data => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.deleteTagDialogVisible = false
          this.dialogVisible = false
          this.getListDataL()
          this.getListDataR()
        }
      )
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.liu2 li {
  margin-top: -14px;
  height: 22px;
  float: left;
  position: absolute;
  list-style: none;
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

.content_header {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.tittle {
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

.content_body {
  display: flex;
  padding: 25px;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  // height: calc("100% - 60px");
  background: #f9f9f9;
}

.body_header {
  background: #ffffff;
  margin-bottom: 20px;
  -moz-box-shadow: 0px 0px 5px #e0e0e0;
  -webkit-box-shadow: 0px 0px 5px #e0e0e0;
  box-shadow: 0px 0px 5px #e0e0e0;
}

.evryone {
  display: flex;
  flex-direction: row;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
}

.each {
  min-width: 150px;
  margin-left: 25px;
  height: 60px;
  justify-content: center;
}

span {
  color: #606266;
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
  margin-top: 20px;
  font-size: 14px;
  color: #000000;
}

.eachOne {
  width: 250px;
  line-height: 28px;
  height: 28px;
  text-align: center;
  background-size: 100% 100%;
  z-index: 10;
  position: relative;
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

.evryone:nth-child(3),
.evryone:nth-child(2) {
  border: none;
}

.body_content {
  background: #ffffff;
  // height: calc("100% - 270px");
  -moz-box-shadow: 0px 0px 5px #e0e0e0;
  -webkit-box-shadow: 0px 0px 5px #e0e0e0;
  box-shadow: 0px 0px 5px #e0e0e0;
}

.information {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

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
}

.each_left {
  display: flex;
  width: 100px;
  flex-direction: column;
  margin-right: 25px;
}

.left_each {
  height: 45px;
  align-content: center;
  display: flex;
}

.each_right {
  display: flex;
  flex-direction: column;
}

.right_each {
  height: 45px;
  align-content: center;
  display: flex;
}

.right_botton {
  display: flex;
  flex-direction: row;
  color: #409eff;
}

.button_left {
  display: flex;
  flex-direction: column;
  margin-right: 115px;
}

.right_each_two {
  cursor: pointer;
  height: 45px;
  align-content: center;
  display: flex;
}

.button_right {
  border: 1px solid #9d9d9d;
  padding-left: 20px;
  padding-right: 80px;
  display: flex;
  flex-direction: column;
  align-content: center;
  display: flex;
}

.right_each_two {
  height: 45px;
  align-content: center;
  display: flex;
}

.right_each_two:last-child {
  margin-bottom: 0px;
}

.table {
  display: flex;
  flex-direction: column;
}

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

.el-table__row td {
  padding: 1px auto !important;
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
