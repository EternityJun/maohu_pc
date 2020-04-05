<!--  -->
<template>
  <div class="PersonnelInfoTable">
    <div v-if="tableName == '在建项目'">
      <el-table border :data="tableData.rows" stripe style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="xmjs" label="项目角色" align="center" width="180"></el-table-column>
        <el-table-column prop="proj_name" align="center" label="项目名称" style="font-family: '微软雅黑';font-weight: 400;font-style: normal;color: #348BDA;cursor: pointer;">
          <template slot-scope="scope">
            <p @click="toOpenDetails(scope.row)" style="font-family: '微软雅黑';font-weight: 400;font-style: normal;color: #348BDA;cursor: pointer;">{{scope.row.proj_name}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="build_company" align="center" label="参建单位"></el-table-column>
        <el-table-column prop="remark" label="项目来源" align="center" width="180"></el-table-column>
        <el-table-column align="center" prop="area" label="项目地址"></el-table-column>
      </el-table>
    </div>
    <div v-if="tableName == '中标项目'">
      <el-table border :data="tableData.rows" stripe style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="xmmc" align="center" label="项目名称">
          <template slot-scope="scope">
            <p @click="toDetails(scope.row)" style="font-family: '微软雅黑';font-weight: 400;font-style: normal;color: #348BDA;cursor: pointer;">{{scope.row.xmmc}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="company" align="center" label="投标公司"></el-table-column>
        <el-table-column align="center" prop="money" label="金额(万元)" width="120"></el-table-column>
        <el-table-column prop="kbsj" label="开标时间" align="center" width="120"></el-table-column>
        <el-table-column prop="city" label="项目所在地" align="center" width="180"></el-table-column>
      </el-table>
    </div>
    <div v-if="tableName == '投标使用业绩'">
      <el-table border :data="tableData.rows" stripe style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="xmmc" align="center" label="项目名称" width="200"></el-table-column>
        <el-table-column prop="xmyz" align="center" label="项目业主" width="200"></el-table-column>
        <el-table-column prop="name" label="项目负责人" align="center" width="100"></el-table-column>
        <el-table-column align="center" prop="htjgw" label="合同价格(万元)" width="120"></el-table-column>
        <el-table-column align="center" prop="kgrq" label="开标时间" width="100"></el-table-column>
        <el-table-column align="center" prop="jgrq" label="竣工时间" width="100"></el-table-column>
        <el-table-column align="center" prop="stxm" label="所投项目">
          <template slot-scope="scope">
            <p @click="toDetails(scope.row)" style="font-family: '微软雅黑';font-weight: 400;font-style: normal;color: #348BDA;cursor: pointer;">{{scope.row.stxm}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="tableData.total?tableData.total:0">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "PersonnelInfoTable",
  data() {
    return {
      zbxx_id: "",
      zbgs_id: "",
      type: "",
      proj_id: "",
      source: "",
      name: ""
    };
  },
  props: ["tableData", "tableName"],
  methods: {
    handleCurrentChange(val) {
      this.$emit("changeData", val, this.tableName);
    },
    toOpenDetails(val) {
      this.proj_id = val.proj_id ? val.proj_id : "";
      this.source = val.source ? val.source : "";

      let routeData = this.$router.resolve({
        name: "yjDet",
        query: {
          proj_id: this.proj_id,
          source: this.source
        }
      });
      window.open(routeData.href, "_blank");
    },
    toDetails(val) {
      let xmmc = val.xmmc ? val.xmmc : val.stxm;
      this.zbxx_id = val.zbxx_id ? val.zbxx_id : "";
      this.zbgs_id = val.zb_id ? val.zb_id : "";
      this.name = this.$route.query.name;
      console.log(this.tableName);
      if (this.tableName == "中标项目") {
        this.type = "zbgs";
      } else {
        this.type = "zbxx";
      }

      let routeData = this.$router.resolve({
        name: "enterpriseDetails",
        query: {
          zbxx_id: this.zbxx_id,
          zbgs_id: this.zbgs_id,
          xmmc: xmmc,
          type: this.type,
          name: this.$route.query.name,
          type: "zbgs"
        }
      });

      window.open(
        routeData.href,
        "招标信息" + this.zbgs_id + this.zbxx_id + xmmc
      );
    }
  }
};
</script>
<style lang='less' scoped>
</style>