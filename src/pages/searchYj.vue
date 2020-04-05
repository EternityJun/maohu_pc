<template>
  <div class="ItemInfo_content">
    <div class="content_header">
      <div class="tittle">工程项目查询</div>
    </div>
    <div class="content_body">
      <div style="width:1200px;margin:0 auto;margin-top:20px;">
        <el-form :inline="true" class="demo-form-inline" style="width:1200px;margin:0 auto" @submit.native.prevent>
          <el-form-item>
            <!-- @keydown.enter.native="onSubmit" -->
            <el-input v-model="formInline.name" placeholder="输入工程项目名称关键字,如：桥梁，医院(回车添加)" :style="{width:'1090px'}" @keyup.enter.native="addTag('name')">
              <i v-if="highSearch" slot="suffix" class="el-input__icon el-icon-circle-plus-outline" @click.stop="addTag('name')"></i>
              <template slot="append">
                <span :class="['highSearch', highSearch ? 'active' : '']" @click="handleHighSearch">高级查询</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="medium">搜索</el-button>
          </el-form-item>
          <el-row v-if="highSearch">
            <el-col :span="24">
              <el-tag style="margin:0 5px 10px 0px" v-for="(tag,index) in formInline.names" :key="tag" closable @close="onDelete_yjTag(index,'names')">{{tag}}</el-tag>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="background-color:#f3f3f3;height:40px;width:100%;padding:5px 0">
        <el-form :inline="true" class="demo-form-inline" style="width:1200px;margin:0 auto" @submit.native.prevent>
          <el-form-item label="所属地区">
            <el-select v-model="area" placeholder="请选择" size="medium" style="width:150px;" @change="changeArea">
              <el-option v-for="item in area_list" :label="item" :value="item" :key="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="责任主体">
            <!-- <el-input v-model="company" clearable @clear="onSubmit" size="medium" placeholder="请输入" style="width:200px;" @keydown.enter.native="onSubmit"></el-input> -->
            <el-autocomplete style="width:230px" clearable @clear="clearCompany" @input="inputCom" v-model="company" :fetch-suggestions="querySearchAsyncCompany" placeholder="请输入责任主体" @select="handleSelectCom"></el-autocomplete>
          </el-form-item>
          <el-form-item label="金额区间(万元)">
            <el-input v-model="min_money" clearable @clear="onSubmit" size="medium" placeholder="请输入金额" style="width:130px" @keydown.enter.native="onSubmit">
              <!-- <template slot="append">万元</template> -->
            </el-input>
            <span>-</span>
            <el-input v-model="max_money" clearable @clear="onSubmit" size="medium" placeholder="请输入金额" style="width:130px" @keydown.enter.native="onSubmit">
              <!-- <template slot="append">万元</template> -->
            </el-input>
          </el-form-item>
          <el-form-item label="数据来源">
            <el-select v-model="source" placeholder="请选择" size="medium" style="width:170px;" @change="onSubmit">
              <el-option v-for="item in source_list" :label="item" :value="item" :key="item"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>
      <div style="width:1200px;margin:0 auto" v-loading="loading">
        <div v-for="(item,key1) in listData" :key="key1" style="margin-top:20px">
          <p id="title_info">
            <span class="item-title" @click="openXqOne(item)" v-html="setColorText(item.proj_name)"></span>
          </p>
          <div>
            <div class="xqjs">项目类型：{{item.proj_type}}</div>
            <div class="xqjs">金额(万元)：{{item.money}}</div>
            <div class="xqjs">日期：{{item.proj_date}}</div>
            <div class="xqjs">项目属地：{{item.area}}</div>
            <div class="xqjs">建设单位：{{item.build_company}}</div>
          </div>
          <div style="margin-top:10px;clear:both">
            <span class="url-source" @click="openUrl(item.source_link)">{{urlLength(item.source_link)}}</span>&nbsp;
            <span style="font-size:12px;float:left">
              <img src="../assets/gs_jst&gl.png" alt="?" v-if="item.remark == '全国建筑市场'" style="width:13px;vertical-align:middle">
              <img src="../assets/gs_jz.png" alt="?" v-if="item.remark == '四川省建设厅'" style="width:13px;vertical-align:middle">
              <img src="../assets/gs_sl.png" alt="?" v-if="item.remark == '全国水利市场'" style="width:13px;vertical-align:middle">
              <img src="../assets/gs_jst&gl.png" alt="?" v-if="item.remark == '全国公路市场'" style="width:13px;vertical-align:middle">
              <span style="vertical-align:middle">{{item.remark}}</span>
            </span>
          </div>
        </div>
      </div>
      <div style="width:1200px;margin:0 auto;margin-bottom:20px;  ">
        <div v-if="total == 0" style="margin-top:20px;font-size:14px;">请输入搜索条件进行查询</div>
        <div v-if="total >0 && total<=20" style="margin-top:20px;font-size:14px;">
          共计找到符合条件的记录数：
          <span style="color: rgb(52, 139, 218);">{{total}}</span>条
        </div>
        <div v-if="total >20" style="margin-top:20px;font-size:14px;">
          共计找到符合条件的记录数：
          <span style="color: rgb(52, 139, 218);">{{total}}</span>条,请输入更多信息进行查询
        </div>
        <!-- <div v-if="total < 0" style="margin-top:20px;font-size:14px;">未能查询到相关结果,请输入其他信息进行查询</div> -->
        <div v-if="total < 0" style="margin-top:20px;font-size:14px;text-align:center">{{returnMessage || '未能查询到相关结果,请输入其他信息进行查询'}}</div>

      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      highSearch: false,
      returnMessage: '',
      formInline: {
        name: '',
        names: []
      },
      listData: [],
      loading: false,
      total: 0,
      source_list: [
        '全部',
        '全国建筑市场',
        '四川省建设厅',
        '全国公路市场',
        '全国水利市场',
        '其他'
      ],
      source: '全部',
      area_list: [],
      area: '',
      min_money: '',
      max_money: '',
      zrzt: '',
      areaList: [],
      company: '',
      total_type: 0,
      companys: [],
      company_id: ''
    }
  },
  created() {
    document.title = '工程项目查询'

    this.getLoc()
    // this.getArea()
  },
  watch: {
    $route: function(newVal) {
      window.location.reload()
    }
  },
  methods: {
    handleHighSearch() {
      this.highSearch = !this.highSearch
      if (!this.highSearch) {
        // this.formInline.name = this.formInline.names.join(',')
      }
    },
    changeArea(){
      this.getSource();
    },
    onSubmit() {
      if (
        (this.formInline.names.length == 0 && this.highSearch) ||
        (!this.formInline.name && !this.highSearch)
      ) {
        this.$message.error('项目名称不能为空')
        return
      }
      if (!this.company_id && this.company) {
        this.$confirm('请选择一个责任主体或删除输入框的值', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
          .then(() => {})
          .catch(() => {})
        return
      }
      if (this.company != '' || this.min_money != '' || this.max_money != '') {
        this.total_type = 1
      } else {
        this.total_type = 0
      }
      this.getData()
    },
    clearCompany() {
      this.company_id = ''
    },
    inputCom() {
      this.company_id = ''
    },
    handleSelectCom(item) {
      let company = this.companys.filter(v => {
        if (v.company_name == item.value) {
          return v
        }
      })
      if (company.length > 0) {
        this.company_id = company[0].id
      }
      this.onSubmit()
    },
    querySearchAsyncCompany(word, cb) {
      if (word !== '') {
        let params = {
          company: this.company,
          page: 1,
          rows: 10
        }
        this.axios.post('/firm/firm_search_nation/searchComp', params, data => {
          let rows = data.rows || []
          let cbData = []
          this.companys = rows
          rows.forEach(e => {
            cbData.push({ value: e.company_name })
          })
          cb(cbData)
        })
      }
    },
    addTag(type) {
      let key = this.formInline[type]
      let keys = this.formInline[type + 's']
      if (key.length == 1 || key.length > 30) {
        this.$message.error('关键字控制在2~30个字之内')
        return
      }
      if (!key) return
      let num = 10
      if (type == 'xmyz') {
        num = 5
      }
      if (keys.length >= num) {
        this.$message.error(`关键词总数控制在${num}个以内`)
        return
      }
      var filterArray = keys.filter((v, i) => {
        if (v == key) {
          return v
        }
      })
      if (filterArray.length) {
        this.$message({
          showClose: true,
          message: '已经存在该关键词',
          type: 'error'
        })
      } else {
        keys.push(key)
        key = ''
      }
      this.formInline[type] = key
      this.formInline[type + 's'] = keys
    },
    // 删除对应的业绩标签
    onDelete_yjTag(index, type) {
      this.formInline[type] = this.formInline[type].filter((v, i) => {
        if (i != index) {
          return v
        }
      })
    },
    getLoc() {
      let name = localStorage.getItem('searchYj')
        ? JSON.parse(localStorage.getItem('searchYj')).yjmc
        : this.$route.query.proName
      if (this.highSearch) {
        this.formInline.names = [name]
      } else {
        this.formInline.name = name
      }

      this.getArea()
    },
    setColorText(text) {
      // var a = text.indexOf(this.formInline.name)
      // if (a > -1) {
      //   var newStr1 = this.insertStr(
      //     text,
      //     a + this.formInline.name.length,
      //     '</span>'
      //   )
      //   var newStr = this.insertStr(newStr1, a, '<span style="color:red">')
      //   return newStr
      // } else {
      //   return text
      // }
      let val = text,
        names = this.formInline.names,
        name = this.formInline.name
      if (val) {
        //有项目名称
        if (this.highSearch) {
          if (names.length > 0) {
            //有关键词
            names.forEach(element => {
              if (val.indexOf(element) > -1) {
                let reg = '/' + element + '/g'
                val = val.replace(
                  eval(reg),
                  '<span style="color:red;">' + element + '</span>'
                )
              }
            })
            return val
          } else {
            //无关键词
            return text
          }
        } else {
          if (val.indexOf(name) > -1) {
            let reg = '/' + name + '/g'
            val = val.replace(
              eval(reg),
              '<span style="color:red;">' + name + '</span>'
            )
            return val
          }else{
            return text
          }
        }
      }
    },
    insertStr(soure, start, newStr) {
      return soure.slice(0, start) + newStr + soure.slice(start)
    },
    getData() {
      this.loading = true
      this.axios.post(
        '/firm/search_Performance/projectLists',
        {
          xmmc: this.highSearch
            ? this.formInline.names.join(',')
            : this.formInline.name,
          search_type: this.highSearch ? 'hign' : 'common',
          source:  this.source.indexOf('其他')>-1 ? '其他' : this.source,
          area: this.area,
          minMoney: this.min_money,
          maxMoney: this.max_money,
          // company: this.company
          company_id: this.company_id
        },
        data => {
          this.listData = data.rows
          this.loading = false
          if (this.total_type == 1) {
            if (data.status == 'failed') {
              this.total = -1
              this.returnMessage = data.message
              return
            }
            this.total = data.total
            if (data.total == 0) {
              this.total = -1
            }
          } else {
            if (data.status == 'failed') {
              this.total = -1
              this.returnMessage = data.message
              return
            }
            if (data.total) {
              this.total = data.total
              if (data.total == 0) {
                this.total = -1
              }
            } else {
              this.getCount()
            }
          }
          localStorage.setItem('searchYj', '')
        }
      )
    },
    openUrl(url) {
      window.open(url)
    },
    getCount() {
      this.axios.post(
        '/firm/search_Performance/countProject',
        {
          xmmc: this.formInline.name,
          source: this.source,
          area: this.area,
          minMoney: this.min_money,
          maxMoney: this.max_money
        },
        data => {
          this.total = data
          if (data == 0) {
            this.total = -1
          }
        }
      )
    },
    getArea() {
      this.axios.post('/firm/search_performance/getProvince', {}, data => {
        this.area_list = data
        let province = localStorage.getItem('local_province')
        this.area = province
        this.getSource();
        // this.getData()
      })
    },
    getSource(){
      this.axios.post('/firm/search_performance/getSource', {province:this.area}, data => {
        this.source_list=data
        this.source='全部'
        this.onSubmit()
      })
    },
    urlLength(url) {
      if (url.length > 20) {
        return url.substring(0, 60) + '...'
      } else {
        return url
      }
    },
    openXqOne(item) {
      var link = ''
      if (item.remark == '四川省建设厅') {
        link = 'jst'
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${item.proj_id}&source=jst`
        })
        window.open(href, '业绩详情' + item.proj_name + item.proj_id + link)
      }
      if (item.remark == '全国建筑市场') {
        link = 'jzsc'
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${item.proj_id}&source=jzsc`
        })
        window.open(href, '业绩详情' + item.proj_name + item.proj_id + link)
      }
      if (item.remark == '全国公路市场') {
        link = 'gl'
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${item.proj_id}&source=gl`
        })
        window.open(href, '业绩详情' + item.proj_name + item.proj_id + link)
      }
      if (item.remark == '全国水利市场') {
        link = 'sl'
        let { href } = this.$router.resolve({
          path: `/yjDet?proj_id=${item.proj_id}&source=sl`
        })
        window.open(href, '业绩详情' + item.proj_name + item.proj_id + link)
      }
      if (
        item.remark == '中标公示' ||
        item.remark == '其他' ||
        item.remark == '投标使用'
      ) {
        let { href } = this.$router.resolve({
          path: `/enterpriseDetails?zbgs_id=${item.proj_id}&type=zbgs&zbxx_id=${
            item.zbxx_id
          }&xmmc=${item.proj_name}&source=四川${item.remark}`
        })
        window.open(
          href,
          '中标公示' + item.proj_id + item.zbxx_id + item.proj_name
        )
      }
    }
  }
}
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
    margin: 0 auto;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    // height: calc(~"100% - 60px");
    background: #fff;
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
      background: #ffffff;
      // height: calc(~"100% - 270px");
      .item_zs {
        border: 1px #d5d5d5 solid;
        margin-top: 20px;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
          color: #348bda;
        }
        .itemInfo {
          overflow: hidden;
          .itemInfoLi {
            position: relative;
            .itemInfoLi_title {
              width: 560px;
              height: 32px;
              border-bottom: 1px #d5d5d5 solid;
              margin: auto;
              line-height: 32px;
            }
            .itemInfoLi_content {
              padding: 20px;
              .el-row {
                margin-top: 10px;
              }
              .content_left {
                font-size: 14px;
                color: #999;
                text-align: right;
              }
              .content_right {
                font-size: 14px;
              }
            }
            .itemInfoLi_footer {
              position: absolute;
              bottom: 10px;
              right: 20px;
              font-size: 13px;
            }
            width: 597px;
            height: 210px;
            border: 1px #d5d5d5 solid;
            float: left;
          }
        }
      }
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
* {
  font-family: '微软雅黑';
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.url-source {
  font-size: 12px;
  cursor: pointer;
  width: 400px;
  display: block;
  float: left;
}
.url-source:hover {
  color: rgb(52, 139, 218);
  text-decoration: underline;
}
.item-title {
  font-size: 16px;
  color: #348bda;
  cursor: pointer;
}
.item-title:hover {
  color: rgb(52, 139, 218);
  text-decoration: underline;
}
</style>
<style>
.xqjs {
  width: 400px;
  float: left;
  font-size: 14px;
  padding: 5px 0;
}
#title_info {
  padding: 5px;
  border-bottom: 1px #dcdcdc dashed;
}
.ItemInfo_content .el-form-item {
  margin-bottom: 10px;
}
.highSearch {
  cursor: pointer;
}
.highSearch.active {
  color: #45acf4;
}
</style>

