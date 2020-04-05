<!--  -->
<template>
  <div class="areaSearch">
    <el-form-item label="资质要求">
      <div class="block">
        <el-cascader
          v-loading="loading"
          style="width:100%"
          ref="cascaderZzyq"
          @change="areaChooseData"
          :options="areaList1"
          :props="props"
          v-model="areaListData"
          clearable
        ></el-cascader>
      </div>
    </el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    name: "areaSearch";
    return {
      props: {
        multiple: true,
        value: "dname",
        // checkStrictly: true,
        label: "dname"
      },
     areaListData: [],
      areaList1: [],
      loading: true,
     areaData:{
           id: '',
          dname: "",
          parent_id: '',
          val: '',
          last: '',
          selected: '',
          children: []
      },
      areaDataChil:{
          name: [], values: [], id: ''
      },
      areaAll:[]
    };
  },
  created() {
    this.getProvinceCity();
    this.zzyqListData = this.zzyq;
  },
  props: ["zzyqList", "zzyq"],
  methods: {
     getProvinceCity () {
      this.axios.post("/index/common/getProvinceCity", {}, data => {
        this.xmdqList = data;
        this.loading = false
      });
    },
  }
};
</script>
<style lang='less' scoped>
</style>