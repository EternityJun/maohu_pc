<template>
    <div id="gs_water">
        <header>
            <div>
                <span class="gsmc">{{gsmc}}</span>
                <!-- <span class="info">更新时间：{{updateTime}}</span> -->
            </div>
        </header>
        <headNav v-bind:data="headNav" @switchNav="switchNav"></headNav>
        <div class="container">
            <transition name="slide-fade">
                <div class="jbxx pos_top" style="margin-bottom:20px" v-show="tab=='基本信息' || tab==''">
                    <tableinfo :tableData="jbxx"></tableinfo>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="zzxx pos_top" v-show="tab=='资质信息'">
                    <p class="noData" v-show="zzxx.noData">
                        暂无数据
                    </p>
                    <transition name="transitionFade">
                        <div v-show="zzxx.tableData_zz.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="zz">
                                    <template slot="title">
                                        <div class="collapse_title">企业资质</div>
                                    </template>
                                    <el-table :data="zzxx.tableData_zz" style="width: 100%" border>
                                        <el-table-column prop="zz_zzlb" label="资质类别" align="center">
                                        </el-table-column>
                                        <el-table-column prop="zz_zylb" label="专业类别/许可证" align="center">
                                        </el-table-column>
                                        <el-table-column prop="zz_dj" label="等级" align="center" width="80">
                                        </el-table-column>
                                        <el-table-column prop="zz_zsbh" label="证书编号" align="center">
                                        </el-table-column>
                                        <el-table-column prop="zz_scqzsj" label="首次取证时间" align="center">
                                        </el-table-column>
                                        <el-table-column prop="zz_yxqz" label="有效期至" align="center">
                                        </el-table-column>
                                        <el-table-column prop="zz_hfjg" label="核发机关" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>
                    <transition name="transitionFade">
                        <div v-show="zzxx.tableData_aq.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="aqxk">
                                    <template slot="title">
                                        <div class="collapse_title">安全生产许可</div>
                                    </template>
                                    <el-table :data="zzxx.tableData_aq" style="width: 100%" border>
                                        <el-table-column prop="axz_zsbh" label="证书编号" align="center">
                                        </el-table-column>
                                        <el-table-column prop="axz_fzjg" label="发证机关" align="center">
                                        </el-table-column>
                                        <el-table-column prop="axz_yxqz" label="有效期至" align="center">
                                        </el-table-column>
                                        <el-table-column prop="axz_xkfw" label="许可范围" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>
                    <transition name="transitionFade">
                        <div v-show="zzxx.tableData_gl.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="gl">
                                    <template slot="title">
                                        <div class="collapse_title">管理体系认证</div>
                                    </template>
                                    <el-table :data="zzxx.tableData_gl" style="width: 100%" border>
                                        <el-table-column prop="gl_mc" label="名称" align="center">
                                        </el-table-column>
                                        <el-table-column prop="gl_yxqz" label="有效期至" width="200" align="center">
                                        </el-table-column>
                                        <el-table-column prop="gl_jdshrq" label="监督核查日期" width="200" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="ryxx pos_top" v-show="tab=='人员信息'">
                    <el-form :inline="true" :model="ryxx.form" class="demo-form-inline ryxx-form" @submit.native.prevent>
                        <el-form-item label="人员名称">
                            <el-input v-model="ryxx.form.name" placeholder="人员名称" @keyup.enter.native="onSubmitRy"></el-input>
                        </el-form-item>
                        <el-form-item label="证书编号">
                            <el-input v-model="ryxx.form.zsbh" placeholder="证书编号" @keyup.enter.native="onSubmitRy"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmitRy">搜索</el-button>
                            <el-button @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="ryxx-table" style="margin-bottom:20px">
                        <p class="noData" v-show="ryxx.noData">
                            暂无数据
                        </p>
                        <table>
                            <tr v-show="ryxx.fr">
                                <td>法定代表人</td>
                                <td>{{ryxx.fr}}</td>
                            </tr>
                            <tr v-show="ryxx.gltd.length>0">
                                <td>管理团队</td>
                                <td>
                                    <template>
                                        <el-table :data="ryxx.gltd" style="width: 100%" border>
                                            <el-table-column type="index" width="60" label="序号" align="center">
                                            </el-table-column>
                                            <el-table-column prop="xm" label="姓名" width="100" align="center">
                                                <template slot-scope="scope">
                                                    <el-button type="text" @click="go_ry(scope.row)">{{scope.row.xm}}</el-button>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="xb" label="性别" width="60" align="center">
                                            </el-table-column>
                                            <el-table-column prop="zw" label="职务" align="center">
                                            </el-table-column>
                                            <el-table-column prop="zc" label="职称" align="center">
                                            </el-table-column>
                                            <el-table-column prop="cyksnf" label="从业起始年份" align="center">
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                </td>
                            </tr>

                            <tr v-show="!ryxx.cyry.noData">
                                <td>从业人员</td>
                                <td>
                                    <transition name="transitionFade">
                                        <div v-show="ryxx.cyry.qyzy.length>0" class="title_div">
                                            <el-collapse v-model="collapse_i">
                                                <el-collapse-item name="qy">
                                                    <template slot="title">
                                                        <div class="collapse_title">企业执业人员</div>
                                                    </template>
                                                    <el-table :data="ryxx.cyry.qyzy" style="width: 100%" border>
                                                        <el-table-column type="index" width="60" label="序号" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="zgmc" label="资格名称" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="zy" label="专业" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="xm" label="姓名" align="center" width="70">
                                                            <template slot-scope="scope">
                                                                <el-button type="text" @click="go_ry(scope.row)">{{scope.row.xm}}</el-button>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column prop="sfzh" label="身份证号" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="zgzsh" label="资格证书号" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="hfjg" label="核发机关" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="yxqz" label="有效期至" align="center">
                                                            <template slot-scope="scope">
                                                                <span :class="scope.row.expire==0 ? 'color_red' : ''">{{scope.row.yxqz}}</span>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </el-collapse-item>
                                            </el-collapse>
                                        </div>
                                    </transition>
                                    <transition name="transitionFade">
                                        <div v-show="ryxx.cyry.qyzc.length>0" class="title_div">
                                            <el-collapse v-model="collapse_i">
                                                <el-collapse-item name="zc">
                                                    <template slot="title">
                                                        <div class="collapse_title">企业职称人员</div>
                                                    </template>
                                                    <el-table :data="ryxx.cyry.qyzc" style="width: 100%" border>
                                                        <el-table-column type="index" width="60" label="序号" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="zc" label="职称" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="xm" label="姓名" width="70" align="center">
                                                            <template slot-scope="scope">
                                                                <el-button type="text" @click="go_ry(scope.row)">{{scope.row.xm}}</el-button>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column prop="sfzh" label="身份证号" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="zw" label="职务" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="zczy" label="职称专业" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="zczh" label="职称证号" align="center">
                                                        </el-table-column>
                                                    </el-table>
                                                </el-collapse-item>
                                            </el-collapse>
                                        </div>
                                    </transition>
                                    <transition name="transitionFade">
                                        <div v-show="ryxx.cyry.qyaq.length>0" class="title_div">
                                            <el-collapse v-model="collapse_i">
                                                <el-collapse-item name="aq">
                                                    <template slot="title">
                                                        <div class="collapse_title">企业安全生产三类人员</div>
                                                    </template>
                                                    <el-table :data="ryxx.cyry.qyaq" style="width: 100%" border>
                                                        <el-table-column type="index" width="60" label="序号" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="zgmc" label="资格名称" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="zy" label="专业" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="xm" label="姓名" width="70" align="center">
                                                            <template slot-scope="scope">
                                                                <el-button type="text" @click="go_ry(scope.row)">{{scope.row.xm}}</el-button>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column prop="sfzh" label="身份证号" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="zgzsh" label="资格证书号" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="hfjg" label="核发机关" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="yxqz" label="有效期至" align="center">
                                                            <template slot-scope="scope">
                                                                <span :class="scope.row.expire==0 ? 'color_red' : ''">{{scope.row.yxqz}}</span>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </el-collapse-item>
                                            </el-collapse>
                                        </div>
                                    </transition>
                                    <transition name="transitionFade">
                                        <div v-show="ryxx.cyry.others.length>0" class="title_div">
                                            <el-collapse v-model="collapse_i">
                                                <el-collapse-item name="others">
                                                    <template slot="title">
                                                        <div class="collapse_title">其他人员</div>
                                                    </template>
                                                    <el-table :data="ryxx.cyry.others" style="width: 100%" border>
                                                        <el-table-column type="index" width="60" label="序号" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="gwmc" label="岗位名称" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="xm" label="姓名" width="70" align="center">
                                                            <template slot-scope="scope">
                                                                <el-button type="text" @click="go_ry(scope.row)">{{scope.row.xm}}</el-button>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column prop="sfzh" label="身份证号" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="xb" label="性别" width="50" align="center">
                                                        </el-table-column>
                                                        <el-table-column prop="zw" label="职务" align="center">
                                                        </el-table-column>
                                                    </el-table>
                                                </el-collapse-item>
                                            </el-collapse>
                                        </div>
                                    </transition>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="gcyj pos_top" v-show="tab=='工程业绩'">
                    <el-form :inline="true" :model="gcyj.form" class="demo-form-inline" @submit.native.prevent>
                        <el-form-item label="项目名称" style="width:398px">
                            <el-input v-model="gcyj.form.xmmc" placeholder="项目名称" style="width:328px" @keyup.enter.native="onSubmitYj"></el-input>
                        </el-form-item>
                        <el-form-item label="资金范围" style="width:383px">
                            <el-row class="flex">
                                <div>
                                    <el-input v-model="gcyj.form.min_money" placeholder="金额" style="width:150px" @keyup.enter.native="onSubmitYj">
                                        <el-button style="width:65px" slot="append">万元</el-button>
                                    </el-input>
                                </div>
                                <div class="newline">-</div>
                                <div>
                                    <el-input v-model="gcyj.form.max_money" placeholder="金额" style="width:150px" @keyup.enter.native="onSubmitYj">
                                        <el-button style="width:65px" slot="append">万元</el-button>
                                    </el-input>
                                </div>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="开工日期" style="width:380px">
                            <el-row class="flex">
                                <div>
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="gcyj.form.min_date_kg" style="width: 149px;"></el-date-picker>
                                </div>
                                <div class="newline">-</div>
                                <div>
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="gcyj.form.max_date_kg" style="width: 148px  ;"></el-date-picker>
                                </div>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="竣工日期" style="width:398px">
                            <el-row class="flex">
                                <div>
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="gcyj.form.min_date_jg" style="width: 156px;"></el-date-picker>
                                </div>
                                <div class="newline">-</div>
                                <div>
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="gcyj.form.max_date_jg" style="width: 157px  ;"></el-date-picker>
                                </div>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="参加人员" style="width:383px">
                            <el-input v-model="gcyj.form.cjry" placeholder="参加人员" style="width:315px" @keyup.enter.native="onSubmitYj"></el-input>
                        </el-form-item>
                        <el-form-item label="项目状态" style="width:380px">
                            <el-select v-model="gcyj.form.state" placeholder="选择项目状态" style="width:312px" clearable>
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="开工在建" value="开工在建"></el-option>
                                <el-option label="完工待验收" value="完工待验收"></el-option>
                                <el-option label="完工已验收" value="完工已验收"></el-option>
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="btns">
                            <el-button type="primary" @click="onSubmitYj">搜索</el-button>
                            <el-button @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <template>
                        <el-table :data="gcyj.tableData" style="width: 100%" border v-loading="loading">
                            <el-table-column type="index" width="60" label="序号" align="center">
                                <template slot-scope="scope">
                                    {{scope.$index+(gcyj.page-1)*10+1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="xmmc" label="项目名称" align="center" width="300">
                                <template slot-scope="scope">
                                    <span @click="go_xm(scope.row)" class="xmmc">{{scope.row.xmmc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xmgs" label="项目归属" align="center" width="100">
                            </el-table-column>
                            <el-table-column prop="gczt" label="项目状态" align="center" width="100">
                            </el-table-column>
                            <el-table-column prop="htje" label="合同金额(万元)" align="center" width="150">
                            </el-table-column>
                            <el-table-column prop="kgrq" label="开工日期" align="center" width="150">
                            </el-table-column>
                            <el-table-column prop="jsdw" label="建设单位" align="center">
                            </el-table-column>
                        </el-table>
                        <el-pagination align="right" @current-change="changePage" :current-page.sync="gcyj.page" background layout="total,prev, pager, next" :total="gcyj.total" class="pagination"></el-pagination>
                    </template>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="good pos_top" v-show="tab=='良好记录'">
                    <p class="noData" v-show="good.noData">
                        暂无数据
                    </p>
                    <transition name="transitionFade">
                        <div v-show="good.tableData_hj.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="1">
                                    <template slot="title">
                                        <div class="collapse_title">单位获奖情况</div>
                                    </template>
                                    <el-table :data="good.tableData_hj" style="width: 100%" border>
                                        <el-table-column type="index" width="60" label="序号" align="center">
                                        </el-table-column>
                                        <el-table-column prop="jxmc" label="奖项名称" align="center">
                                        </el-table-column>
                                        <el-table-column prop="jxjb" label="奖项级别" align="center">
                                        </el-table-column>
                                        <el-table-column prop="bjdw" label="颁奖单位" align="center">
                                        </el-table-column>
                                        <el-table-column prop="bjwh" label="颁奖文号" align="center">
                                        </el-table-column>
                                        <el-table-column prop="bjsj" label="颁奖时间" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>
                    <transition name="transitionFade">
                        <div v-show="good.tableData_gchj.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="2">
                                    <template slot="title">
                                        <div class="collapse_title">工程获奖情况</div>
                                    </template>
                                    <el-table :data="good.tableData_gchj" style="width: 100%" border>
                                        <el-table-column type="index" width="60" label="序号" align="center">
                                        </el-table-column>
                                        <el-table-column prop="xmmc" label="项目名称" align="center" width="300">
                                        </el-table-column>
                                        <el-table-column prop="jxmc" label="奖项名称" align="center">
                                        </el-table-column>
                                        <el-table-column prop="jxlb" label="奖项类别" align="center">
                                        </el-table-column>
                                        <el-table-column prop="jxjb" label="奖项级别" align="center">
                                        </el-table-column>
                                        <el-table-column prop="bjdw" label="颁奖单位" align="center">
                                        </el-table-column>
                                        <el-table-column prop="bjwh" label="颁奖文号" align="center">
                                        </el-table-column>
                                        <el-table-column prop="bjsj" label="颁奖时间" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>
                    <transition name="transitionFade">
                        <div v-show="good.tableData_gy.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="3">
                                    <template slot="title">
                                        <div class="collapse_title">企业参与抢险救灾、慈善公益活动情况</div>
                                    </template>
                                    <el-table :data="good.tableData_gy" style="width: 100%;" border>
                                        <el-table-column prop="name" label="时间" align="center" width="150">
                                        </el-table-column>
                                        <el-table-column prop="name" label="参与和支持社会公益活动" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>
                    <transition name="transitionFade">
                        <div v-show="good.tableData_zl.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="4">
                                    <template slot="title">
                                        <div class="collapse_title">专利</div>
                                    </template>
                                    <el-table :data="good.tableData_zl" style="width: 100%;" border>
                                        <el-table-column prop="zlmc" label="专利名称" align="center">
                                        </el-table-column>
                                        <el-table-column prop="zlh" label="专利号" align="center">
                                        </el-table-column>
                                        <el-table-column prop="sqrq" label="授权日期" align="center">
                                        </el-table-column>
                                        <el-table-column prop="yxqz" label="有效期至" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>
                    <transition name="transitionFade">
                        <div v-show="good.tableData_gf.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="5">
                                    <template slot="title">
                                        <div class="collapse_title">工法</div>
                                    </template>
                                    <el-table :data="good.tableData_gf" style="width: 100%;" border>
                                        <el-table-column prop="gfmc" label="工法名称" align="center">
                                        </el-table-column>
                                        <el-table-column prop="gfbh" label="工法编号" align="center">
                                        </el-table-column>
                                        <el-table-column prop="pzrq" label="批准日期" align="center">
                                        </el-table-column>
                                        <el-table-column prop="yxqz" label="有效期至" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>
                    <transition name="transitionFade">
                        <div v-show="good.tableData_zb.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="6">
                                    <template slot="title">
                                        <div class="collapse_title">主编技术标准</div>
                                    </template>
                                    <el-table :data="good.tableData_zb" style="width: 100%;" border>
                                        <el-table-column prop="gfmc" label="标准名称" align="center">
                                        </el-table-column>
                                        <el-table-column prop="gfbh" label="标准编号" align="center">
                                        </el-table-column>
                                        <el-table-column prop="pzrq" label="发布日期" align="center">
                                        </el-table-column>
                                        <el-table-column prop="yxqz" label="实施日期" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>
                    <transition name="transitionFade">
                        <div v-show="good.tableData_bz.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="7">
                                    <template slot="title">
                                        <div class="collapse_title">编著、专著、培训教材情况</div>
                                    </template>
                                    <el-table :data="good.tableData_bz" style="width: 100%;" border>
                                        <el-table-column prop="gfmc" label="名称" align="center">
                                        </el-table-column>
                                        <el-table-column prop="gfbh" label="书号" align="center">
                                        </el-table-column>
                                        <el-table-column prop="pzrq" label="出版日期" align="center">
                                        </el-table-column>
                                        <el-table-column prop="yxqz" label="备注" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>
                    <transition name="transitionFade">
                        <div v-show="good.tableData_qk.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="8">
                                    <template slot="title">
                                        <div class="collapse_title">正式期刊发表论文情况</div>
                                    </template>
                                    <el-table :data="good.tableData_qk" style="width: 100%;" border>
                                        <el-table-column prop="gfmc" label="论文题目" align="center">
                                        </el-table-column>
                                        <el-table-column prop="gfbh" label="作者" align="center">
                                        </el-table-column>
                                        <el-table-column prop="pzrq" label="期刊名称" align="center">
                                        </el-table-column>
                                        <el-table-column prop="yxqz" label="刊号" align="center">
                                        </el-table-column>
                                        <el-table-column prop="yxqz" label="出版日期" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>

                    <transition name="transitionFade">
                        <div v-show="good.tableData_gy.length>0" class="title_div">
                            <el-collapse v-model="collapse_i">
                                <el-collapse-item name="9">
                                    <template slot="title">
                                        <div class="collapse_title">新工艺新方法</div>
                                    </template>
                                    <el-table :data="good.tableData_gy" style="width: 100%;" border>
                                        <el-table-column prop="gfmc" label="项目名称" align="center" width="300">
                                        </el-table-column>
                                        <el-table-column prop="gfbh" label="类别" align="center">
                                        </el-table-column>
                                        <el-table-column prop="pzrq" label="鉴定机构" align="center">
                                        </el-table-column>
                                        <el-table-column prop="yxqz" label="鉴定日期" align="center">
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </transition>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="xypj pos_top" v-show="tab=='信用评价'">
                    <template>
                        <el-table :data="xypj.tableData" style="width: 100%;" border>
                            <el-table-column prop="lb" label="类别" align="center">
                            </el-table-column>
                            <el-table-column prop="pjjg" label="评价结果" align="center">
                            </el-table-column>
                            <el-table-column prop="bfrq" label="颁发日期" align="center">
                            </el-table-column>
                            <el-table-column prop="jg" label="评价机构" align="center">
                            </el-table-column>
                            <el-table-column prop="yxqz" label="有效期至" align="center">
                            </el-table-column>
                        </el-table>
                        <el-pagination align="right" @current-change="changePage" :current-page.sync="xypj.page" background layout="total,prev, pager, next" :total="xypj.total" class="pagination"></el-pagination>
                    </template>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="bad pos_top" style="margin-bottom:20px" v-show="tab=='不良记录'">
                    <p class="noData">
                        暂无数据
                    </p>
                </div>
            </transition>
        </div>
        <back-to-top></back-to-top>
    </div>
</template>

<script>
import gs_sl from '../assets/gs_sl.png'
import headNav from './template/head_nav'
import tableinfo from './template/tableInfo'
import backToTop from './template/backToTop'

export default {
  data() {
    return {
      collapse_i: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'qy',
        'zc',
        'aq',
        'others',
        'zz',
        'aqxk',
        'gl'
      ], //展开项
      loading: true,
      gsmc: '',
      updateTime: '',
      gs_id: this.$route.query.gs_id,
      source: '全国水利市场',
      tab: '基本信息',
      headNav: {
        gsmc: '中国五治集团有限公司1',
        updateTime: '2018-12-29 12:23:09',
        nav: [
          { text: '基本信息', num: 0 },
          { text: '资质信息', num: 0 },
          { text: '人员信息', num: 0 },
          { text: '工程业绩', num: 0 },
          { text: '信用评价', num: 0 },
          { text: '良好记录', num: 0 },
          { text: '不良记录', num: 0 }
        ],
        source: {
          name: '全国水利建设市场监督',
          link: 'www.baidu.com',
          img: gs_sl
        }
      },
      jbxx: {
        col: '',
        rows: []
      },
      zzxx: {
        tableData_zz: [],
        tableData_aq: [],
        tableData_gl: [],
        noData: true
      },
      ryxx: {
        form: {
          name: '',
          zsbh: '',
          zjlx: ''
        },
        fr: '',
        gltd: [],
        cyry: {
          qyzy: [],
          qyzc: [],
          qyaq: [],
          others: [],
          noData: true
        },
        noData: true
      },
      good: {
        total: 0,
        tableData_hj: [],
        tableData_gchj: [],
        tableData_gy: [],
        tableData_zl: [],
        tableData_gf: [],
        tableData_zb: [],
        tableData_bz: [],
        tableData_qk: [],
        tableData_gy: [],
        noData: true
      },
      bad: {
        total: 0,
        tableData: []
      },
      xypj: {
        total: 0,
        tableData: []
      },
      gcyj: {
        form: {
          xmmc: '',
          min_money: '',
          max_money: '',
          min_date_kg: '',
          max_date_kg: '',
          min_date_jg: '',
          max_date_jg: '',
          cjry: '',
          state: ''
        },
        tableData: [],
        total: 25
      }
    }
  },
  components: {
    headNav,
    tableinfo,
    backToTop
  },
  created() {
    this.getComBase()
  },
  watch: {
    $route: function(newVal) {
      console.log(newVal, '====')
      window.location.reload()
    }
  },
  mounted() {},
  methods: {
    go_ry(row) {
      let { href } = this.$router.resolve({
        path: `/ryDet?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&gs_id=${this.gs_id}&name=${
          row.xm
        }&source=sl&staff_base_id=${row.staff_base_id ? row.staff_base_id : ''}`
      })
      window.open(href, '人员详情' + this.gs_id + row.xm)
    },
    go_xm(row) {
      let { href } = this.$router.resolve({
        path: `/yjDet?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&proj_id=${row.id}&source=sl`
      })
      window.open(href, '业绩详情' + row.xmmc + row.id + 'sl')
    },
    switchNav(tab) {
      let self = this
      self.tab = tab
      if (tab == '人员信息' || tab == '工程业绩') {
        self.reset()
      } else if (tab == '不良记录') {
        this.bad.page = 1
        this.firmCredit('不良记录')
      } else if (tab == '良好记录') {
        this.good.page = 1
        this.firmCredit('良好记录')
      } else if (tab == '信用评价') {
        this.xypj.page = 1
        this.firmCredit('信用评价')
      }
    },
    changePage: function(val) {
      let tab = this.tab
      switch (tab) {
        case '工程业绩':
          this.gcyj.page = val
          this.firmProj()
          break
        case '信用评价':
          this.xypj.page = val
          this.firmCredit('信用评价')
          break
      }
    },
    openFullScreen() {
      this.loading = true
    },
    closeFullScreen() {
      this.loading = false
    },
    onSubmitYj: function() {
      this.gcyj.page = 1
      this.firmProj()
    },
    onSubmitRy: function() {
      this.ryxx.page = 1
      this.firmStaff()
    },
    reset: function() {
      let tab = this.tab
      switch (tab) {
        case '人员信息':
          this.ryxx.form.name = ''
          this.ryxx.form.zsbh = ''
          this.ryxx.form.zjlx = ''
          this.ryxx.page = 1
          this.firmStaff()
          break
        case '工程业绩':
          this.gcyj.form.xmmc = ''
          this.gcyj.form.min_money = ''
          this.gcyj.form.max_money = ''
          this.gcyj.form.min_date_kg = ''
          this.gcyj.form.max_date_kg = ''
          this.gcyj.form.min_date_jg = ''
          this.gcyj.form.max_date_jg = ''
          this.gcyj.form.cjry = ''
          this.gcyj.form.state = ''
          this.gcyj.page = 1
          this.firmProj()
          break
      }
    },
    getComBase: function() {
      //基本信息
      let self = this
      let params = {
        gs_id: self.gs_id,
        source: self.source
      }
      this.axios.post('/firm/Firm_detail/getCompBase', params, data => {
        if (data.status == 'success') {
          let rows = data.rows
          self.gsmc = rows.qymc
          self.updateTime = rows.modified
          self.headNav.source.link = rows.source_link
          self.headNav.source.name = rows.source
          self.comp_id = rows.comp_id
          self.firmBasic({
            comp_id: self.comp_id,
            source: self.source
          })
          self.getCompCate()
          document.title = '水 | ' + rows.qymc
        }
      })
    },
    getCompCate() {
      let self = this
      let params = {
        comp_id: self.comp_id,
        source: self.source
      }
      this.axios.post('/firm/Firm_detail/getCompCate', params, data => {
        if (data.status == 'success') {
          self.headNav.nav = data.rows
        }
      })
    },
    firmBasic: function(params) {
      let self = this
      this.axios.post('/firm/Firm_detail/firmBasic', params, data => {
        if (data.status == 'success') {
          let rows = data.rows.comp_jbxx
          let comp_zz = data.rows.comp_zz
          let tableData = {
            col: 2,
            rows: rows
          }
          self.jbxx = tableData
          self.zzxx.tableData_zz = comp_zz['企业资质']
            ? comp_zz['企业资质']
            : []
          self.zzxx.tableData_aq = comp_zz['安全生产许可']
            ? comp_zz['安全生产许可']
            : []
          self.zzxx.tableData_gl = comp_zz['管理体系认证']
            ? comp_zz['管理体系认证']
            : []
          self.zzxx.noData = comp_zz ? false : true
        } else {
          self.zzxx.noData = true
        }
      })
    },
    firmStaff: function() {
      //人员
      let self = this
      let params = {
        gs_id: this.gs_id,
        comp_id: self.comp_id,
        source: self.source,
        rymc: self.ryxx.form.name,
        zsbh: self.ryxx.form.zsbh
      }
      this.openFullScreen()
      this.axios.post('/firm/Firm_detail/firmStaff', params, data => {
        if (data.status == 'success') {
          self.ryxx.noData = false
          self.ryxx.fr = data.rows['法定代表人']
            ? data.rows['法定代表人'][0].xm
            : ''
          self.ryxx.gltd = data.rows['管理团队'] ? data.rows['管理团队'] : []
          if (!data.rows['从业人员']) {
            self.ryxx.cyry.qyzy = []
            self.ryxx.cyry.qyzc = []
            self.ryxx.cyry.qyaq = []
            self.ryxx.cyry.others = []
            self.ryxx.cyry.noData = true
            return
          }
          self.ryxx.cyry.noData = false

          self.ryxx.cyry.qyzy = data.rows['从业人员']['企业执业人员']
            ? data.rows['从业人员']['企业执业人员']
            : []
          self.ryxx.cyry.qyzc = data.rows['从业人员']['企业职称人员']
            ? data.rows['从业人员']['企业职称人员']
            : []
          self.ryxx.cyry.qyaq = data.rows['从业人员']['企业安全生产三类人员']
            ? data.rows['从业人员']['企业安全生产三类人员']
            : []
          self.ryxx.cyry.others = data.rows['从业人员']['其他人员']
            ? data.rows['从业人员']['其他人员']
            : []
        } else {
          self.ryxx.fr = ''
          self.ryxx.gltd = []
          self.ryxx.cyry.qyzy = []
          self.ryxx.cyry.qyzc = []
          self.ryxx.cyry.qyaq = []
          self.ryxx.cyry.others = []
          self.ryxx.noData = true
          self.ryxx.cyry.noData = true
        }
        self.closeFullScreen()
      })
    },
    firmCredit(cate) {
      //良好 信用
      let self = this
      let page
      if (cate == '不良记录') {
        page = self.bad.page
      } else if (cate == '良好记录') {
        page = self.good.page
      } else if (cate == '信用评价') {
        page = self.xypj.page
      }
      let params = {
        comp_id: self.comp_id,
        source: self.source,
        cate: cate
      }
      self.openFullScreen()
      this.axios.post('/firm/Firm_detail/firmCredit', params, data => {
        if (data.status == 'success') {
          if (params.cate == '不良记录') {
            self.bad.tableData = data.rows
            self.bad.total = data.total
          } else if (params.cate == '良好记录') {
            self.good.tableData_hj = data.rows['单位获奖情况']
              ? data.rows['单位获奖情况']
              : []
            self.good.tableData_gchj = data.rows['工程获奖情况']
              ? data.rows['工程获奖情况']
              : []
            // self.good.tableData_gy = data.rows["单位获奖情况"] ?  data.rows["单位获奖情况"] : [];
            self.good.tableData_zl = data.rows['专利'] ? data.rows['专利'] : []
            self.good.tableData_gf = data.rows['工法'] ? data.rows['工法'] : []
            self.good.noData = false
          } else if (params.cate == '信用评价') {
            self.xypj.tableData = data.rows
            self.xypj.total = data.total
          }
        } else {
          if (params.cate == '良好记录') {
            self.good.noData = true
          }
        }
        self.closeFullScreen()
      })
    }, // 业绩
    firmProj() {
      let self = this
      let form = self.gcyj.form
      let params = {
        comp_id: self.comp_id,
        source: self.source,
        xmmc: form.xmmc,
        minMoney: form.min_money,
        maxMoney: form.max_money,
        minKgrq: form.min_date_kg,
        maxKgrq: form.max_date_kg,
        minJgrq: form.min_date_jg,
        maxJgrq: form.max_date_jg,
        rymc: form.cjry,
        xmzt: form.state == '全部' ? '' : form.state,
        page: self.gcyj.page,
        rows: 10
      }
      self.openFullScreen()
      this.axios.post('/firm/Firm_detail/firmProj', params, data => {
        if (data.status == 'success') {
          self.gcyj.tableData = data.rows
          self.gcyj.total = data.total
        } else {
          self.gcyj.tableData = []
          self.gcyj.total = 0
        }
        self.closeFullScreen()
      })
    }
  }
}
</script>
<style>
.ryxx .title_div {
  margin-bottom: 20px;
}
.title_div .el-collapse-item__header {
  background-color: #f2f2f2;
}
.title_div .el-collapse {
  border: none;
}
.title_div .el-collapse-item__wrap {
  border: none;
}
.title_div .el-collapse-item__content {
  padding-bottom: 0;
}
#gs_water .el-form-item {
  margin-bottom: 10px;
}
</style>
<style lang="less" scoped>
@charset "utf-8";
@active-color: #348bda;
@num-color: #ff6a6a;
.slide-fade-enter-active {
  transition: all 0.2s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.1s ease-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
.collapse_title {
  margin-left: 10px;
  text-align: left;
  font-size: 14px;
}
.color_red {
  color: red;
}
.xmmc {
  color: @active-color;
  cursor: pointer;
}
.cursor {
  cursor: pointer;
}
.noData {
  text-align: center;
  border: 1px solid #ebeef5;
  padding: 15px 0;
  color: #909399;
  font-size: 14px;
}
#gs_water {
  padding-bottom: 30px;
  .input {
    width: 200px;
  }
  .normalForm {
    float: right;
  }
  .pagination {
    margin: 20px 0;
  }
  color: #333;
  header {
    box-shadow: 2px 2px 2px rgb(241, 240, 240);
    height: 70px;
    margin-bottom: 2px;
    min-width: 1200px;
    line-height: 70px;
    div {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .gsmc {
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 32px;
      }
      .info {
        position: absolute;
        right: 0;
        bottom: -10px;
        font-size: 13px;
      }
    }
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .pos_top {
      // position: absolute;
      // top: 0;
      width: 100%;
    }
    .title {
      text-align: center;
      color: #348bda;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .flex {
      display: flex;
    }
    .newline {
      width: 15px;
      text-align: center;
    }
    .btns {
      margin-left: 43%;
      width: 165px;
    }
    .zzxx {
      .el-table thead {
        color: #ff6a6a;
      }
      .el-table {
        thead {
          background-color: red !important;
        }
      }
      > div {
        margin-bottom: 20px;
      }
    }
    .ryxx {
      position: relative;
      .ryxx-form {
        // position: absolute;
        // right: 0;
      }
      .ryxx-table {
        width: 100%;

        table {
          width: 100%;
          text-align: center;
          font-size: 13px;
          border-collapse: collapse;
        }
        // position: absolute;
        // top: 50px;

        td {
          border: 1px solid #d5d5d5;
          padding: 15px;
          .el-table {
            margin-bottom: 15px;
          }
          .title {
            margin-bottom: 15px;
            color: #348bda;
            font-size: 20px;
          }
        }
        tr {
          td:first-child {
            width: 200px;
          }
          td:last-child {
            width: 1000px;
          }
        }
      }
    }
    .good {
      > div {
        margin-bottom: 20px;
      }
    }
  }
}
</style>

