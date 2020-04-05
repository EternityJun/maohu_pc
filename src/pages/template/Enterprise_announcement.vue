<!--  -->
<template>
  <div class="Enterprise_announcement">
    <div v-if="data.list">
        <p id="title"><span>{{data.type}}</span><span id="myTime">{{data.时间}}</span></p>
        <div id="context">
            <p class="myP" v-if="data.list.项目名称">项目名称 <span class="mySpan">{{data.list.项目名称}}</span></p>
            <p class="myP" v-if="data.list.发布时间">发布时间 <span class="mySpan">{{data.list.发布时间}}</span></p>
            <p class="myP" v-if="data.list.建设地点">建设地点 <span class="mySpan">{{data.list.建设地点}}</span></p>
            <p class="myP" v-if="data.list.报名截止">报名截止 <span class="mySpan">{{data.list.报名截止}}</span></p>
            <p class="myP" v-if="data.list.招标类别">招标类别 <span class="mySpan">{{data.list.招标类别}}</span></p>
             <p class="myP" v-if="data.list.否决投标依据">否决投标依据 <span class="mySpan">{{data.list.否决投标依据}}</span></p>
            <p class="myP" v-if="data.list.否决投标理由">否决投标理由 <span class="mySpan">{{data.list.否决投标理由}}</span></p>
           
        </div>
        <div id="myBtn">
            <el-button type="text" @click="allTableData(data.list.项目名称)">查看详情>></el-button>
        </div>
    </div>  
    <div v-else>
        <p id="title"><span>招标公告</span><span id="myTime">{{data.time}}</span></p>
        <div id="context">
            <p class="myP" v-if="data.bt">项目名称 <span class="mySpan">{{data.bt}}</span></p>
            <p class="myP" v-if="data.fbsj">发布时间 <span class="mySpan">{{data.fbsj}}</span></p>
            <p class="myP" v-if="data.ssd">建设地点 <span class="mySpan">{{data.ssd}}</span></p>
            <p class="myP" v-if="data.jzrq">报名截止 <span class="mySpan">{{data.jzrq}}</span></p>
            <p class="myP" v-if="data.zblb">招标类别 <span class="mySpan">{{data.zblb}}</span></p>
            <p class="myP" v-if="data.dict_name">项目类别 <span class="mySpan">{{data.dict_name}}</span></p>
             <!-- <p class="myP" v-if="data.list.否决投标依据">否决投标依据 <span class="mySpan">{{data.list.否决投标依据}}</span></p> -->
            <!-- <p class="myP" v-if="data.list.否决投标理由">否决投标理由 <span class="mySpan">{{data.list.否决投标理由}}</span></p> -->
           
        </div>
        <div id="myBtn">
            <a @click="zbDetails()">查看详情>></a>
        </div>
    </div>  
  </div>
</template>

<script>
export default {
    name:"Enterprise_announcement",
  data () {
    return {
        zbxx_id:"",
        zbgs_id:"",
        tyep:"",
        detailData :""
    };
  },
  props:["data"],
  methods:{
      allTableData(i){
          this.zbxx_id = this.data.zbxx_id?this.data.zbxx_id:""
          this.zbgs_id = this.data.zbgs_id?this.data.zbgs_id:""
  
          this.type =  "zbxx"
          console.log(this.zbxx_id)
          console.log(this.zbgs_id )
          console.log(this.type)
            let routeData = this.$router.resolve({
                name: "enterpriseDetails",
                query: {
                    zbxx_id: this.zbxx_id,
                    zbgs_id: this.zbgs_id,
                    xmmc:i,
                    // gsmc:gsmc,
                    type:this.type
                }
            });
            window.open(routeData.href, '_blank');
    },
    //这个是企业的跳转
    zbDetails(){
         this.zbxx_id = this.data.id?this.data.id:""
          this.zbgs_id = this.data.zbgs_id?this.data.zbgs_id:""
          this.type =  "zbxx"
            let routeData = this.$router.resolve({
                name: "enterpriseDetails",
                query: {
                    zbxx_id: this.zbxx_id,
                    zbgs_id: this.zbgs_id,
                    type:  this.type
                }
            });
            window.open(routeData.href, '_blank');
    }
    //这个是招标监控系统
  }
}

</script>
<style lang='less' scoped>
.Enterprise_announcement{
     color: #333;
}
#title{
    font-size: 40px;
    margin-bottom: 30px;
}
#context{
    font-size: 16px;
}
.mySpan{
    margin-left: 30px
}
.myP{
    margin: 20px 0;
}
#myBtn{
    margin-left: 100px;
    color: #2F80D1
}
#myTime{
    margin-left: 50px
}
</style>