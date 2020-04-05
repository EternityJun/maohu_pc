<!--  -->
<template>
  <div class="HeadTabs">
       <div id="mySection" style="margin-top:20px">
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="首页" name="first"></el-tab-pane>
                <el-tab-pane label=" 业务圈" name="second">
                  <enterpriseCircle></enterpriseCircle>
                  </el-tab-pane>
                <el-tab-pane label="我的项目" name="third"><qyztbTable></qyztbTable></el-tab-pane>
              </el-tabs>
        </div>
  </div>
</template>
<script>
  import qyztbTable from "./qyztbTable.vue";
  import enterpriseCircle from "../enterpriseCircle.vue";
  // import enterpriseCircleMore from "../enterpriseCircleMore.vue";
export default {

  name:"HeadTabs",
  data () {
    return {
        activeName: 'third'
    };
  },
  props:{
    showPageNum:{
      type:String
    }
  },
  created(){
    this.activeName = this.showPageNum
  },
  methods:{
       handleClick(tab, event) {
         if(  tab.name == "first"){
             this.$router.push({path:"/bid"})
         }
        console.log(tab, event);
      },
  },
     components: {
    qyztbTable,
    enterpriseCircle,
  },
  
}

</script>
<style lang='less' scoped>
#mySection{
  width: 70%;
  margin: 0 auto;
} 
</style>