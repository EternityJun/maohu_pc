<!--  -->
<template>
  <div class="Enterprise_table">
    <div v-if="pageName =='中标公示' ">
      <el-table :data="tableData.rows" border style="width: 100% ;" >
        <el-table-column type="index"  align="center" label="序号" width="50"></el-table-column>
        <el-table-column class="myTbaleName"  align="center" prop="xmmc" label="项目名称">
          <template slot-scope="scope">
            <p
              @click="openDetails(scope.row)"
              style="cursor: pointer;color: #66b1ff"
            >{{scope.row.xmmc}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="tbbjw"  align="center" label="投标报价【万元】" width="180"></el-table-column>
        <el-table-column prop="psbjw"  align="center" label="经评审的投标价【万元】" width="180" ></el-table-column>
        <el-table-column prop="zhpf"  align="center" label="	综合评分 " width="180" ></el-table-column>
        <el-table-column prop="kbsj"  align="center"  label="	开标日期 " width="150">
          <template slot-scope="scope">
            <p v-html="scope.row.kbsj" style="cursor: pointer;color: blue">{{scope.row.kbsj}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else-if="pageName =='入围' ">
      <el-table :data="tableData.rows" border style="width: 100% ;">
         <el-table-column type="index"  align="center" label="序号" width="50"></el-table-column>
        <el-table-column class="myTbaleName" prop="xmmc"  align="center" label="项目名称" >
          <template slot-scope="scope">
            <p
              @click="openDetails(scope.row)"
              style="cursor: pointer;color: #66b1ff"
            >{{scope.row.xmmc}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="zbmc" label="入围名次" width="100"  align="center"></el-table-column>
        <el-table-column prop="tbbjw" label="投标报价【万元】" width="180" align="center"></el-table-column>
        <el-table-column prop="psbjw" label="经评审的投标价【万元】 "  width="180" align="center"></el-table-column>
        <el-table-column prop="zhpf" class="myTbaleName" label="	综合评分 " width="180"  align="center"></el-table-column>
        <el-table-column prop="kbsj"  label="	开标日期 " width="150"  align="center">
          <template slot-scope="scope">
            <p v-html="scope.row.kbsj" style="cursor: pointer;color: blue">{{scope.row.kbsj}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else-if="pageName =='投标(废标)' ">
      <el-table :data="tableData.rows" border style="width: 100% ;">
         <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column class="myTbaleName" prop="xmmc"  align="center" label="项目名称" width="300">
          <template slot-scope="scope">
            <p
              @click="openDetails(scope.row)"
              style="cursor: pointer;color: #66b1ff"
            >{{scope.row.xmmc}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="tbbj" label="否决投标依据条款"  align="center"></el-table-column>
        <el-table-column prop="psbj" label="否决投标理由  " width="300" align="center"></el-table-column>
        <el-table-column prop="kbsj"  label=" 	开标日期 " width="150"  align="center">
          <template slot-scope="scope">
            <p v-html="scope.row.kbsj" style="cursor: pointer;">{{scope.row.kbsj}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else-if="pageName =='招标公告' ">
      <el-table :data="tableData.rows" border style="width: 100% ;">
         <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column prop="bt" label="项目名称"  align="center"  class="myTbaleName">
          <template slot-scope="scope">
            <p @click="openDetails(scope.row)" style="cursor: pointer;color: #66b1ff">{{scope.row.bt}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="ssd"  align="center" label="建设地点 " width="250"></el-table-column>
        <el-table-column prop="zblb" label="招标类别  " align="center" width="150"></el-table-column>
        <el-table-column prop="fbsj"  label="	发布时间  "  align="center" width="150">
          <template slot-scope="scope">
            <p v-html="scope.row.fbsj">{{scope.row.fbsj}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="jzrq"  label="	报名截止日期 "  align="center" width="180">
          <template slot-scope="scope">
            <p v-html="scope.row.jzrq">{{scope.row.jzrq}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="tb_jzrq"  label="	开标日期 "  align="center" width="150">>
          <template slot-scope="scope">
            <p v-html="scope.row.tb_jzrq">{{scope.row.tb_jzrq}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else-if="pageName =='企业首页' ">
      <el-table :data="tableData.rows" border style="width: 100% ;">
         <el-table-column type="index"  align="center" label="序号" width="50"></el-table-column>
        <el-table-column  prop="xmmc" label="项目名称"  min-width="300">
          <template slot-scope="scope">
            <p @click="openDetails(scope.row)" style="cursor: pointer;color: #66b1ff">{{scope.row.xmmc}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="type"  label="	项目类型"  align="center" width="180"></el-table-column>
        <el-table-column prop="jsdd"  label="	建设地点"  align="center"></el-table-column>
        <el-table-column prop="time"   label="	发布日期 "  align="center" width="100">
          <template slot-scope="scope">
            <p>{{scope.row.time}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else-if="pageName =='招标首页' ">
      <el-table :data="tableData.rows" border style="width: 100% ;">
         <el-table-column type="index"  align="center" label="序号" width="50"></el-table-column>
        <el-table-column  prop="bt"  align="center" label="项目名称" >
          <template slot-scope="scope">
            <p @click="openZbDetails(scope.row)" style="cursor: pointer;color: #66b1ff">{{scope.row.bt}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="dict_name"  align="center"  label="	项目类型  " width="180"></el-table-column>
        <el-table-column prop="cs"  label="	建设地点  "  align="center" width="100"></el-table-column>
        <el-table-column prop="fbsj"   label="发布日期"  align="center" width="140">
          <template slot-scope="scope">
            <p>{{scope.row.fbsj}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-table :data="tableData.rows" border  style="width: 100% ;">
         <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column  prop="bt" label="项目名称"  align="center" width="300">
          <template slot-scope="scope">
            <p @click="openZbDetails(scope.row)" style="cursor: pointer;color: #66b1ff">{{scope.row.bt}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="ssd"  label="建设地点"  align="center" width="180"></el-table-column>
        <el-table-column prop="zblb"  label="	招标类型"  align="center"></el-table-column>
        <el-table-column prop="fbsj"   label="发布日期"  align="center" width="120">
          <template slot-scope="scope">
            <p v-html="scope.row.fbsj">{{scope.row.fbsj}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="jzrq"   label="	报名截止日期 "  align="center" width="150">
          <template slot-scope="scope">
            <p v-html="scope.row.jzrq">{{scope.row.jzrq}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="tb_jzrq"   label="	投标截止日期 "  align="center" width="150">
          <template slot-scope="scope">
            <p v-html="scope.row.tb_jzrq">{{scope.row.tb_jzrq}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="rows"
        background
        layout="total, prev, pager, next"
        :total="tableData.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Enterprise_table",
  data() {
    return {
      goFristPages: "goFristPage",
      proPages: "proPage",
      nextPages: "nextPage",
      goLastPages: "goLastPage",
      refreshPages: "refreshPage",
      zbxx_id: "",
      zbgs_id: "",
      type: "",
      currentPage1: 1,
      serialNumber:1
    };
  },
  props: ["tableData", "pageName", "pageNum", "rows", "time"],
  methods: {
    openDetails(i) {
      let xmmc = ""
      if(this.pageName != "招标公告"){
          this.zbxx_id = i.zbxx_id ? i.zbxx_id : "";
          this.zbgs_id = i.zb_id ? i.zb_id : "";
          xmmc = i.xmmc
      }else{
          this.zbxx_id = i.id ? i.id : "";
          this.zbgs_id = i.zb_id ? i.zb_id : "";
          xmmc = i.bt
      } 
         let gsmc = ""
      // console.log(this.pageName)
      if (this.pageName == "招标公示"||this.pageName == "企业首页") {
        this.type = "zbxx";
      } else {
         gsmc = localStorage.getItem("qymc")
        this.type = "zbgs";
      }
      let routeData = this.$router.resolve({
        name: "enterpriseDetails",
        query: {
          zbxx_id: this.zbxx_id,
          zbgs_id: this.zbgs_id,
          type: this.type,
          gsmc:gsmc,
          xmmc:xmmc
        }
      });
      window.open(routeData.href, "_blank");
    },
    openZbDetails(i){
       this.zbxx_id = i.id ? i.id : "";
      this.zbgs_id = i.zb_id ? i.zb_id : "";
      this.type = "zbxx";
      // console.log(this.zbxx_id)
      // console.log(this.zbgs_id )
      // console.log(this.type)
      let routeData = this.$router.resolve({
        name: "enterpriseDetails",
        query: {
          zbxx_id: this.zbxx_id,
          zbgs_id: this.zbgs_id,
          type: this.type
        }
      });
      window.open(routeData.href, "_blank");
    },
    handleCurrentChange(val) {
      this.$emit("changeListData", val, this.time);
      // console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang='less' scoped>
#tableHerader {
  display: flex;
  align-items: center;
  height: 30px;
  line-height: 30px;
  input {
    width: 30px;
  }
  .button {
    font-size: 16px;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    opacity: 0.5;
    cursor: default;
  }
}
#rightText {
  text-align: right;
}
</style>