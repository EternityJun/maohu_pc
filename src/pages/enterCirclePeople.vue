<!--企业圈人员-->
<template>
    <div class="enterCirclePeople">
        <div class="main_content">
            <header>

            </header>
            <template class="table">
                <el-table :data="inPeople" border style="width: 100%">
                    <el-table-column prop="date" label="序号" width="80" align="center">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="人员名称" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="电话号码" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="权限配置" width="280" align="center">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>
<script>
/* eslint-disable */

export default {
  components: {},

  data() {
    return {
      inPeople: [
        {
          avatar: "",
          name: "111"
        },
        {
          avatar: "",
          name: "222"
        },
        {
          avatar: "",
          name: "333"
        },
        {
          avatar: "",
          name: "444"
        },
        {
          avatar: "",
          name: "555"
        },
        {
          avatar: "",
          name: "666"
        },
        {
          avatar: "",
          name: "777"
        }
      ]
    };
  },
  created() {},
  methods: {
    handleDel(e) {
      console.log(e);
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.main_content {
  width: 1200px;
  margin: 20px auto;
}
.table {
  width: 100%;
}
</style>