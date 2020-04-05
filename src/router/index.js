import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import category from '@/router/model/category'
export default new Router({
    routes: [
        category,
        {
            path: '/login',//筑标 招投标 列表
            name: 'login',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/login2'], resolve)
        },
        {
            path: '/tokenRes',
            name: 'tokenRes',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/tokenRes'], resolve)
        },
        // 首页
        {
            path: '/',
            name: 'home',
            redirect: '/homepage'
        },

        {
            path: '/homepage', // 猫糊服务号首页
            name: 'homepage',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/homepage'], resolve)
        },
        {
            path: '/maohufaq', // 猫糊使用常见问题
            name: 'maohufaq',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/maohuFAQ'], resolve)
        },
        {
            path: '/maohuinstruction', // 猫糊使用指南
            name: 'maohuinstruction',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/maohuInstruction'], resolve)
        },
        {
            path: '/bulletinlist', // 公告列表页
            name: 'bulletinList',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/bulletinList'], resolve)
        },
        {
            path: '/bulletin/item/:id', // 公告列表页
            name: 'bulletinLists',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/bulletinItem'], resolve)
        },

        // {    // 筑标路由
        //   path: '/',
        //   name: 'index',
        //   redirect: '/bid'
        // },
        // {//筑标首页
        //   path: '/bid',
        //   name: 'bid',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/indexZhubiao'], resolve)
        // },
        // {
        //   path: '/itemcheck',//人工审核列表
        //   name: 'itemcheck',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/itemcheck'], resolve)
        // },
        // {
        //   path: '/itemBsList',//标书检查列表
        //   name: 'itemBsList',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/itemBsList'], resolve)
        // },
        // {
        //   path: '/iteminfo/ItemConfig',//1.4.1的配置
        //   name: 'ItemConfig',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/ItemConfig'], resolve)
        // },
        // {
        //   path: '/iteminfo/ItemConfigNew',//1.4.1的配置
        //   name: 'ItemConfigNew',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/ItemConfigNew'], resolve)
        // },
        {
            path: '/indexBid',//筑标 招投标 列表
            name: 'indexBid',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/index_bid'], resolve)
        },
        // {
        //   path: '/bidResearch',//筑标 招投标 列表
        //   name: 'bidResearch',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/bid_research'], resolve)
        // },

        // {//分配
        //   path: '/configfp',
        //   name: 'configfp',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/config_fp2'], resolve)
        // },

        // { //审核
        //   path: '/configsh',
        //   name: 'configsh',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/config_sh2'], resolve)
        // },

        // {//标书 分配
        //   path: '/configbs',
        //   name: 'configbs',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/config_bs2'], resolve)
        // },
        // {
        //   path: '/bidCanvas',//画像
        //   name: 'bidCanvas',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/bid_canvas'], resolve)
        // },
        // {
        //   path: '/bidGsxw',//公司行为数据分析
        //   name: 'bidGsxw',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/bid_gsxw'], resolve)
        // },
        // {
        //   path: '/bidIndustryTool',//行业工具
        //   name: 'bidIndustryTool',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/bid_industryTool'], resolve)
        // },
        // {
        //   path: '/alloted',//已分配
        //   name: 'alloted',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/alloted'], resolve)
        // },
        // {
        //   path: '/integral',//积分
        //   name: 'integral',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/integral'], resolve)
        // },
        // {
        //   path: '/bigData',//大数据
        //   name: 'bigData',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/bigData'], resolve)
        // },
        // {
        //   path: '/model',//报价模型列表
        //   name: 'model',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/model'], resolve)
        // },
        // {
        //   path: '/modelBid1',//报价模型1
        //   name: 'modelBid1',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/model_bid1'], resolve)
        // },
        // {
        //   path: '/modelBid2',//报价模型2
        //   name: 'modelBid2',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/model_bid2'], resolve)
        // },
        // {
        //   path: '/dictionary',//字典管理
        //   name: 'dictionary',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/dictionary'], resolve)
        // },

        // {//浏览器路由
        //   path: '/',
        //   name: 'index',
        //   redirect: '/browser'
        // },
        {//浏览器首页
            path: '/browser',
            name: 'browser',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/indexBrowser'], resolve)
        },
        {//小程序管理
            path: '/indexconfiguer',
            name: 'indexconfiguer',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/index_configuer'], resolve)
        },

        {
            path: '/certificateManager',//证件管理
            name: 'certificateManager',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/certificateManager'], resolve)
        },
        {
            path: '/certificateDetail',//证件管理详情
            name: 'certificateDetail',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/certificateDetail'], resolve)
        },
        {
            path: '/certificateBrief',//证件管理详情
            name: 'certificateBrief',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/certificateManager/certificateBrief'], resolve)
        },
        {
            path: '/performance',//业绩管理
            name: 'performance',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/performance'], resolve)
        },
        {
            path: '/bigData',//大数据
            name: 'bigData',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/bigData'], resolve)
        },
        {
            path: '/performance_det',//业绩管理详情
            name: 'performanceDet',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/performanceDet'], resolve)
        },


        // 个人路由
        // {
        //     path: '/',
        //     name: 'index',
        //     redirect: '/personal'
        // },
        {//个人版首页

            path: '/personal',
            name: 'personal',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/indexPersonal'], resolve)
        },
        { //代办事务
            path: '/indexwaitThing',
            name: 'indexwaitThing',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/index_waitThing'], resolve)
        },
        {
            path: '/source',//行业交互
            name: 'source',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/source.vue'], resolve)
        },
        {
            path: '/projectCenter',//我的项目
            name: 'projectCenter',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/projectCenter'], resolve)
        },

        // 公共路由
        {
            path: '*',
            name: 'notfound',
            component: resolve => require(['@/pages/notfoundfile'], resolve)
        },
        {
            path: '/ItemProj',//业绩详情
            name: 'ItemProj',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/ItemProj'], resolve)
        },
        {
            path: '/itemBsInfo',//标书检查 项目详情和公司列表
            name: 'itemBsInfo',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/itemBsInfo'], resolve)
        },
        {
            path: '/itemCheckInfo',//人工审核 项目详情 和公司列表
            name: 'itemCheckInfo',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/itemCheckInfo'], resolve)
        },
        {
            path: '/itemCheckInfoRy',//人工审核 人员列表
            name: 'itemCheckInfoRy',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/itemCheckInfoRy'], resolve)
        },
        {
            path: '/iteminfo',//人员详情 相关企业列表
            name: 'ItemInfo',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/ItemInfo'], resolve)
        },
        {
            path: '/ItemBsDet',//标书详情页面
            name: 'itemBsDet',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/itemBsDet'], resolve)
        },
        {
            path: '/bidResultRyYj',//筑标人员业绩结果
            name: 'bidResultRyYj',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/bidResultRyYj'], resolve)
        },
        {
            path: '/gsDetail',//公司详情
            name: 'gsDetail',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/gsDetail'], resolve)
        },
        {
            path: '/gs_scjst',//四川建设厅 公司
            name: 'gs_scjst',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/gs_scjst'], resolve)
        },
        {
            path: '/itemimport',//导入项目的组件
            name: 'ItemImport',
            component: resolve => require(['@/pages/ItemImport'], resolve)
        },
        {
            path: '/gs_road',//公司公路
            name: 'gsRoad',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/gs_road'], resolve)
        },
        {
            path: '/gs_water',//公司水利
            name: 'gsWater',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/gs_water'], resolve)
        },
        {
            path: '/gs_building',//公司建筑
            name: 'gsBuilding',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/gs_building'], resolve)
        },
        {
            path: '/searchQy',//公司搜索
            name: 'searchQy',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/searchQy'], resolve)
        },
        {
            path: '/ryDet',//人员详情
            name: 'ryDet',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/ryDet'], resolve)
        },
        {
            path: '/yjDet',//业绩详情
            name: 'yjDet',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/yjDet'], resolve)
        },
        {
            path: '/itemBsDetShare',//标书详情页面分享
            name: 'itemBsDetShare',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/itemBsDetShare'], resolve)
        },
        {
            path: '/searchZz',//资质查询
            name: 'searchZz',
            meta: {
                requiresAuth: true
            },
            // component: resolve => require(['@/pages/searchZz'], resolve)
            component: resolve => require(['@/pages/search-zz-new'], resolve)
        },
        {
            path: '/searchYj',//业绩查询
            name: 'searchYj',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/searchYj'], resolve)
        },
        {
            path: '/searchRy',//人员查询
            name: 'searchRy',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/searchRy'], resolve)
        },
        {
            path: '/user_list',//人员权限
            name: 'user_list',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/user_list'], resolve)
        },

        {
            path: '/indexcustomize',//公司定制没用
            name: 'indexcustomize',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/index_customize'], resolve)
        },
        {//新首页 没用
            path: '/indexNew',
            name: 'indexNew',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/indexNew'], resolve)
        },

        // {
        //   path: '/indexcustomize',//公司定制没用
        //   name: 'indexcustomize',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/index_customize'], resolve)
        // },
        // {//新首页 没用
        //   path: '/indexNew',
        //   name: 'indexNew',
        //   meta: {
        //     requiresAuth: true
        //   },
        //   component: resolve => require(['@/pages/indexNew'], resolve)
        // },
        {

            path: '/itemList',  //不晓得 没用
            name: 'ItemList',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/ItemList'], resolve)
        },
        {
            path: '/nitemList',//项目流程 没用
            name: 'nItemList',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/nItemList'], resolve)
        },
        {
            path: '/itemGsInfo',//不晓得 没用
            name: 'itemGsInfo',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/itemGsInfo'], resolve)
        },
        {
            path: '/businessManagement', // 企业经营
            name: 'businessManagement',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/businessManagement'], resolve)
        },
        {
            path: '/regionDistribution', // 企业经营区域分布
            name: 'regionDistribution',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/businessManagement/regionDistribution'], resolve)
        },
        {
            path: '/sizeDistribution', // 企业经营业务规模分布
            name: 'sizeDistribution',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/businessManagement/sizeDistribution'], resolve)
        },
        {
            path: '/businessScopeDistribution', // 企业经营业务范畴分布
            name: 'businessScopeDistribution',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/businessManagement/businessScopeDistribution'], resolve)
        },
        {
            path: '/activenessDistribution', // 企业经营活跃度分析
            name: 'activenessDistribution',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/businessManagement/activenessDistribution'], resolve)
        },
        {
            path: '/affiliatedCompany', // 中标关联公司
            name: 'affiliatedCompany',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/affiliatedCompany'], resolve)
        },
        {
            path: '/companyProject', // 公司对应的项目
            name: 'companyBrief',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/affiliatedCompany/companyProject'], resolve)
        },
        {
            path: '/enterpriseWork',//企业工作区首页
            name: 'enterpriseWork',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/enterpriseWork'], resolve)
        },
        {
            path: '/enterpriseZb',//大详情
            name: 'enterpriseZb',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/enterpriseZb'], resolve)
        },
        {
            path: '/enterpriseDetails',//具体详情
            name: 'enterpriseDetails',
            meta: {
                requiresAuth: true,
                title: "详情"
            },
            component: resolve => require(['@/pages/enterpriseDetails'], resolve)
        },
        {
            path: '/zhaobiao_msg',//中标数据分析 列表详情
            name: 'zhaobiao_msg',
            component: resolve => require(['@/pages/zhaobiao_msg'], resolve)
        },
        {
            path: '/xmlist',//中标数据分析 列表详情
            name: 'xmlist',
            component: resolve => require(['@/pages/xmlist'], resolve)
        },
        {
            path: '/zhongbiao_data',
            name: 'zhongbiao_data',
            component: resolve => require(['@/pages/zhongbiao_data'], resolve)
        },
        {
            path: '/zhongbiao_data_det',
            name: 'zhongbiao_data_det',
            component: resolve => require(['@/pages/zhongbiao_data_det'], resolve)
        },
        {
            path: '/project_process',//企业招投标
            name: 'project_process',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/project_process'], resolve)
        },

        {
            path: '/competitorAnalysis',
            name: 'competitorAnalysis',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/competitorAnalysis'], resolve)
        },
        {
            path: '/myItem',
            name: 'myItem',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/myItem'], resolve)
        },
        {
            path: '/zbMonitoring',
            name: 'zbMonitoring',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/zbMonitoring'], resolve)
        },
        {
            path: '/qyZtbPage',
            name: 'qyZtbPage',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/qyZtbPage'], resolve)
        },
        {
            path: '/qyztbDetails',
            name: 'qyztbDetails',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/qyztbDetails'], resolve)
        },
        {
            path: '/qyfwqPage',
            name: 'qyfwqPage',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/qyfwqPage'], resolve)
        },
        {
            path: '/qyfwqDaletil',
            name: 'qyfwqDaletil',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/qyfwqDaletil'], resolve)
        },
        {
            path: '/enterpriseCircle', // 企业圈
            name: 'enterpriseCircle',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/enterpriseCircle'], resolve)
        },
        {
            path: '/qyfwqWbDaletil', // 企业圈
            name: 'qyfwqWbDaletil',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/qyfwqWbDaletil'], resolve)
        },
        {
            path: '/personalCircle', // 点击个人服务号 跳转页面
            name: 'personalCircle',
            component: resolve => require(['@/pages/personalCircle'], resolve)
        },
        {
            path: '/personService', // 点击服务圈内数据 跳转页面
            name: 'personService',
            component: resolve => require(['@/pages/personService'], resolve)
        },
        {
            path: '/zbMonitoringSystem', // 点击服务圈内数据 跳转页面
            name: 'zbMonitoringSystem',
            component: resolve => require(['@/pages/zbMonitoringSystem'], resolve)
        },
        {
            path: '/zbMonitoringSearch', // 点击服务圈内数据 跳转页面
            name: 'zbMonitoringSearch',
            component: resolve => require(['@/pages/zbMonitoringSearch'], resolve)
        },
        {
            path: '/zbMonitoringDetails', // 点击服务圈内数据 跳转页面
            name: 'zbMonitoringDetails',
            component: resolve => require(['@/pages/zbMonitoringDetails'], resolve)
        },
        {
            path: '/integralZb',//筑标服务号积分
            name: 'integralZb',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/integralZb'], resolve)
        },
        {
            path: '/Persona',//个人中心，修改个人信息
            name: 'Persona',
            meta: {
                requiresAuth: true
            },
            component: resolve => require(['@/pages/Persona'], resolve)
        },
        {
            path: '/zbDataMonitor', // 中标监控系统
            name: 'zbDataMonitor',
            component: resolve => require(['@/pages/zbDataMonitor'], resolve)
        },
        {
            path: '/myCustomization', //我的定制
            name: 'myCustomization',
            component: resolve => require(['@/pages/myCustomization'], resolve)
        }, {
            path: '/searchZbgg', //招标公告列表
            name: 'searchZbgg',
            component: resolve => require(['@/pages/searchMyCustomization'], resolve)
        },
        {
            path: '/appNavigatorPage', //app端点击短信链接 跳转的h5页面
            name: 'appNavigatorPage', 
            component: resolve => require(['@/pages/appNavigatorPage/appNavigatorPage'], resolve)
        },
        // {
        //     path: '/test', //高德生成json
        //     name: 'test', 
        //     component: resolve => require(['@/pages/test'], resolve)
        // },
        {
            path: '/personalCard', //名片详情页
            name: 'personalCard', 
            component: resolve => require(['@/pages/personalCard'], resolve)
        },
        // {
        //     path: '/test1', 
        //     name: 'test1', 
        //     component: resolve => require(['@/pages/test3'], resolve)
        // },
        {
            path: '/zzPro', 
            name: 'zzPro', 
            component: resolve => require(['@/pages/template/zz-project'], resolve)
        },
        {
            path: '/zzCompanyList', 
            name: 'zzCompanyList', 
            component: resolve => require(['@/pages/zz-company-list'], resolve)
        },
        // {
        //     path: '/mapTest', 
        //     name: 'mapTest', 
        //     component: resolve => require(['@/pages/mapTest'], resolve)
        // },
    ]
})
