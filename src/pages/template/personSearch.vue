<!--  -->
<template>
  <div class="personSearch">
    <div class="peopleNavSearch">
      <div
        class="peopleNavItem"
        v-for="(item,index) in peopleNav"
        :key="index"
      >
        <span  style="padding: 5px;border-radius: 5px;" :class='index-1 ==navIndex?"allBackground":""'  @click="choosePeopleNav(item,index,1)">
          {{item.remark}}
          <span class="link_color">({{item.count+'本'}})：</span>
          <!-- {{index == 0?'：':''}} -->
        </span>
         <span v-for='(item1,index1) in  item.children' style="margin-left:5px" :key="index1"  @click="choosePeopleNav(item1,index1,item.remark)">
            <span :class='index1==navIndex?"allBackground":""' style="padding: 5px;border-radius: 5px;">{{item1.certificate_type}}<span class="link_color">({{item1.count}})</span></span>
          </span>
      </div>
    </div>
      <el-form align="right" :inline="true" style="margin-top:10px;" @submit.native.prevent>
        <el-form-item  v-if="zsxx.zjlx == '三类人员'||zsxx.zjlx == '注册建造师'||zsxx.zjlx == '职称'||zsxx.zjlx == '施工现场专业人员'" :label="zsxx.zjlx+'选择'">
                <el-select v-model="value" @change="changeDropDown" style="width:150px" placeholder="请选择">
                  <el-option
                    v-for="item in dropDownList"
                    :key="item.major"
                    :label="item.major"
                    :value="item.major">
                  </el-option>
                </el-select>
                 <el-select v-if="childrenState&&dropDownList1.length >0" v-model="value1" @change="changeDropDown1" style="width:150px" placeholder="请选择">
                  <el-option
                    v-for="item1 in dropDownList1"
                    :key="item1.major"
                    :label="item1.major"
                    :value="item1.major">
                  </el-option>
                </el-select>
        </el-form-item>
        <el-form-item label="人员名称">
          <el-input
            v-model="zsxx.rymc"
            style="width:150px"
            @keyup.enter.native="onSearch()"
            @clear="onSearch"
            clearable
            placeholder="人员名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="证书编号">
          <el-input
            v-model="zsxx.zsbh"
             @clear="onSearch"
            @keyup.enter.native="onSearch()"
            clearable
            placeholder="证书编号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch()">搜索</el-button>
          <el-button @click="onReset()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="zsxx.tableData" border v-loading="zsxx.loading">
        <el-table-column type="index" width="60" align="center" label="序号">
          <template slot-scope="scope">
            <div>{{(scope.$index+1)+(zsxx.page-1)*10}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名">
          <template slot-scope="scope">
            <el-button type="text" @click="openRenYuan(scope.row)">{{scope.row.name+scope.row.total}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="certificate_type" label="证件类型"></el-table-column>
        <el-table-column align="center" prop="certificate_number" label="证件号"></el-table-column>
        <el-table-column align="center" prop="major" label="注册专业/专业/职称"></el-table-column>
        <el-table-column align="center" prop="certificate_level" label="证书级别/等级/岗位"></el-table-column>
        <el-table-column align="center" prop="valid_date" label="有效期">
          <template slot-scope="scope">
            <div :style="{color:scope.row.expire?'':'red'}">{{scope.row.valid_date}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.is_import == 1" disabled  type="primary" @click="chooseProson(scope.row)">已选择</el-button>
            <el-button size="mini" v-else  type="primary" @click="chooseProson(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        @current-change="zsxxPageSizeChange"
        align="right"
        background
        layout="total,prev, pager, next"
        :total="zsxx.total"
      ></el-pagination>
      <div style='text-align:center'>
          <el-button @click="colseDialog" type="danger">关闭</el-button>
      </div>
      
  </div>
</template>

<script>
export default {
  name: "personSearch",
  data() {
    return {
      gs_id: "",
      peopleNav: [],
      navIndex: -1, //点击第几个nav
      zsxx: {
        rymc: "",
        zsbh: "",
        tableData: [],
        loading: true,
        page: 1,
        total: 0,
        source:'四川省建设厅',
        type:'1',
        zjlx:'',
        number: "",
        major: "",
        certificate_level: "",
      },
      dropDownList: [], //人员下拉筛选
      dropDownList1: [], //人员下拉筛选
      childrenState: false,
      sanleiPerson:'',//记录三类人员    进行 字符串拼接
    };
  },
  props:['form','personSearchData'],
  created() {
    this.zsxx.rymc = this.personSearchData.ryName
    this.zsxx.zsbh = this.personSearchData.ryZsh
    this.gs_id = this.$route.query.gs_id;
    this.peopleSource();
    this.getList()
  },
  watch:{
    personSearchData(val){
      console.log(val)
      //  this.zsxx.rymc = this.val.ryName
      // this.zsxx.zsbh = this.val.ryZsh
    }
  },
  methods: {
      openRenYuan(row) {
      let { href } = this.$router.resolve({
        path: `/ryDet?gs_id=${row.comp_base_id}&name=${
          row.name
        }&staff_base_id=${row.staff_base_id ? row.staff_base_id : ''}`
      })
      window.open(href, '人员详情' + row.comp_base_id + row.name)
    },
    colseDialog(){
          this.$emit('colsePensonDialog')
      },
    changeDropDown(val) {
      this.value1 = "";
      this.sanleiPerson = ''
      this.dropDownList1 = [];
      this.dropDownList.forEach(item => {
        if (item.major == val) {
          if (item.children) {
            this.dropDownList1 = item.children;
          }
        }
      });
        this.childrenState = true;
      if (this.zsxx.zjlx == "三类人员") {
        this.zsxx.number = val;
        this.sanleiPerson = val;
        this.zsxx.certificate_level = "";
      } else if (this.zsxx.zjlx == "施工现场专业人员") {
        this.zsxx.major = "";
        this.certificate_level = val;
      } else {
        this.zsxx.certificate_level = "";
        this.zsxx.major = val;
      }
      this.zsxx.page = 1
        this.zsxx.total = 0
      this.getList(1);
    },
    changeDropDown1(val) {
      if(this.zsxx.zjlx == "三类人员"){
        this.zsxx.number = this.sanleiPerson
        this.zsxx.number = this.zsxx.number + val
      }
      else if (this.zsxx.zjlx == "施工现场专业人员") {
            this.zsxx.number = ''
        this.zsxx.major = val;
      } else {
            this.zsxx.number = ''
        this.zsxx.certificate_level = val;
      }
      this.zsxx.page = 1
        this.zsxx.total = 0
      this.getList(1);
    },
    //获取下拉
    getSourceInfo(zjlx) {
      this.dropDownList = [];
      this.dropDownList1 = [];
      this.value = "";
      this.value1 = "";
      this.childrenState = false;
      let info_data = {
        gs_id: this.gs_id,
        zjlx: zjlx
      };
      this.axios.post("/firm/people/getSourceInfo", info_data, data => {
        let arr = data.rows;
          arr.forEach(item => {
            if (item.children) {
              let arr1 = [];
              if( item.children.length>0){
                   item.children.forEach(item1 => {
                    if(item1 !=''&&item1){
                        let obj = {};
                        obj.major = item1;
                        arr1.push(obj);
                    }
              });
              item.children = arr1;
              }
            }
          });
          this.dropDownList = arr;
      });
    },
    // 证书信息
    zsxxPageSizeChange(page) {
      this.zsxx.page = page;
      this.getList();
    },
    getList(num) {
      this.zsxx.loading = true;
      let query_data = {
        jbxx_id:this.form.jbxx_id,
        own_id:this.form.own_id,
        gs_id: this.gs_id,
        source: this.zsxx.source,
        zjlx: this.zsxx.zjlx,
        name: this.zsxx.rymc,
        number: this.zsxx.zsbh,
        page: this.zsxx.page,
        type: this.zsxx.type,
        major: this.zsxx.major,
        certificate_level: this.zsxx.certificate_level,
        rows: 10
      };
      if(num == 1){
        query_data.number = this.zsxx.number
      }
      this.axios.post("/firm/people/peopleList", query_data, data => {
        this.zsxx.loading = false;
        this.zsxx.tableData = data.rows || [];
        this.zsxx.total = data.total || 0;
      });
    },
       // 搜索
     onSearch(){
        this.zsxx.number = ''
        this.sanleiPerson = ''
          this.navIndex=-1
        this.childrenState = false
        this.zsxx.major="",
        this.zsxx.certificate_level=""
        this.zsxx.source = ''
        this.zsxx.zjlx = ''
        this.zsxx.page = 1
        this.zsxx.total = 0
        this.getList()
    },
    onReset(){
        this.sanleiPerson = ''
         this.navIndex = -1
        this.childrenState = false
        this.zsxx.number="",
        this.zsxx.major="",
        this.zsxx.certificate_level=""
        this.zsxx.source = ''
        this.zsxx.zjlx = ''
        this.zsxx.rymc = ''
        this.zsxx.zsbh = ''
        this.zsxx.page = 1
        this.zsxx.total = 0
        this.getList()
    },
    peopleSource() {
      let obj = {
        gs_id: this.gs_id,
        jbxx_id:this.form.jbxx_id,
        own_id:this.form.own_id
      };
      this.axios.post("/index/Laipi_Ry_Yj/peopleCate", obj, data => {
        this.peopleNav = data.rows;
      });
    },
    choosePeopleNav(item, index,name) {
       this.zsxx.source = ''
        this.zsxx.zjlx = ''
        this.zsxx.rymc = ''
        this.zsxx.zsbh = ''
        this.zsxx.page = 1
        this.zsxx.total = 0
      if (item.certificate_type == '三类人员'||item.certificate_type== '注册建造师'||item.certificate_type== '职称'||item.certificate_type == '施工现场专业人员') {
           this.getSourceInfo(item.certificate_type)
           if(item.certificate_type != '三类人员'){
                 this.zsxx.number="";
           }else{
             this.zsxx.major="",
              this.zsxx.certificate_level=""
           }
      }
      this.zsxx.source = name==1?'四川省建设厅':name
        this.zsxx.zjlx = item.certificate_type
      this.getList()
      if(name == 1){
        this.navIndex = -1
      }else{
        this.navIndex = index;
      }
    },
    chooseProson(row){
      let obj = {
        jbxx_id:this.form.jbxx_id,
        gs_id:this.form.gs_id,
        user_id:localStorage.getItem("user_id"),
        own_id:this.form.own_id,
        name:row.name,
        zczsh:row.certificate_number,
        staff_base_id:row.staff_base_id,
        staff_id:row.staff_id,
        zjlx:row.certificate_type,
        zczy:row.major,
        dj:row.certificate_level,
        zzsyxq:row.valid_date,
      }
      this.axios.post("/index/Laipi_Ry_Yj/addPerson",obj,data=>{
          if(data.status == 'success'){
            this.$message.success(data.message)
          }else{
            this.$message.error(data.message)
          }
          this.getList()
          this.$emit('getPersonList')
      })
    }
  }
};
</script>
<style lang='less' scoped>

.peopleNavSearch {
  padding: 20px 10px;
  border: 1px solid #d5d5d5;
  display: flex;
//   justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.peopleNavItem{
    margin-left: 10px;
}
.peopleNavItem :hover {
  background-color: #348bda;
  color: #fff;
  .link_color {
    color: #fff;
  }
}
.link_color {
  color: #409eff;
  cursor: pointer;
}
.allBackground {
  background-color: #348bda;
  color: #fff;
  .link_color {
    color: #fff;
  }
}
</style>