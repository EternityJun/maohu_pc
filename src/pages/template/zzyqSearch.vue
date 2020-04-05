<!--  -->
<template>
  <div class="zzyqSearch">
    <el-form-item label="资质要求">
      <div class="block">
        <el-cascader
          v-loading="loading"
          style="width:100%"
          ref="cascaderZzyq"
          @change="zzyqChooseData"
          :options="zzyqList1"
          :props="props"
          v-model="zzyqListData"
          clearable
        ></el-cascader>
      </div>
     
    </el-form-item>
   
  </div>
</template>

<script>
export default {
  data() {
    name: "zzyqSearch";
    return {
      props: {
        multiple: true,
        value: "dname",
        // checkStrictly: true,
        label: "dname"
      },
      zzyqListData: [],
      zzyqList1: [],
      loading: true,
      zzyqData:{
           id: '',
          dname: "",
          parent_id: '',
          val: '',
          last: '',
          selected: '',
          children: []
      },
      zzyqDataChil:{
          name: [], values: [], id: ''
      },
      zzyqAll:[],
      chooseList:[],
      zzText:""
    };
  },
  watch: {
    zzyq() {
      this.zzyqListData = this.zzyq;
    }
  },
  created() {
    this.getZzyqData();
    this.zzyqListData = this.zzyq;
  },
  props: ["zzyqList", "zzyq"],
  methods: {
    getZzyqData() {
      this.axios.post("/firm/Firm_search/getQualiDict", {}, data => {
        // console.log(data);
        this.loading = false;
        this.zzyqList1 = data.rows||[];
        // console.log( this.$refs.cascaderZzyq)
      });
    },
    zzyqChooseData(val) {
           
        console.log(val)
      let arr = [] // 结果集
      let array = this.zzyqList   // 需要遍历的数组
      let a = new Set() // 定义父级数组
      val.forEach(i => {
        a.add(i[0]) // 过滤出几个父级数组
      })
      a = Array.from(a) // 转化成数组
      // 生成父级数组集
      a.forEach(i => {
        array.forEach(j => {
          if (i === j.dname) {
            arr.push({
              id: j.id,
              dname: i,
              parent_id: j.parent_id,
              last: 1,
              selected: true,
              children: []
            })
          }
        })
      })
      // 处理父级下的 children数组
      val.forEach(i => {
        a.forEach(j => {
          if (i[0] === j) {
            // console.log(j)
            arr.forEach(k => {
              if (k.dname === j) {
                array.forEach((s, x) => {
                  if (s.dname === i[0]) {
                    // console.log(s, x)
                    s.children.forEach((ss, xx) => {
                      if (ss.dname === i[1]) {
                        // console.log(ss, xx)
                        ss.children.forEach((sss, xxx) => {
                          if (sss.dname === i[2]) {
                            // console.log(sss, xxx)
                            if(sss.children){
                              sss.children.forEach((ssss,xxxx)=>{
                                if (ssss.dname === i[3]){
                                      // console.log(ssss ,xxxx)
                                 if(ssss.children){
                                    ssss.children.forEach((sssss,xxxxx)=>{
                                      if (sssss.dname === i[4]){
                                            // console.log(sssss)
                                              let ii = JSON.parse(JSON.stringify(i))
                                              // ii.splice(0, 1) // 删除不要的元素
                                            k.children.push({
                                              name: ii,
                                              values: [j, s.val?s.val:'工程设计', ss.val, sss.val,ssss.val,sssss.val],
                                              id: sss.id
                                            })
                                          
                                      }
                                    })
                                 }else{
                                          let ii = JSON.parse(JSON.stringify(i))
                                              // ii.splice(0, 1) // 删除不要的元素
                                            k.children.push({
                                              name: ii,
                                              values: [j, s.val?s.val:'工程设计', ss.val, sss.val,ssss.val],
                                              id: sss.id
                                            })
                                      }
                               }
                              })
                            }else{
                                   let ii = JSON.parse(JSON.stringify(i))
                                              // ii.splice(0, 1) // 删除不要的元素
                                            k.children.push({
                                              name: ii,
                                              values: [j, s.val?s.val:'工程设计', ss.val, sss.val],
                                              id: sss.id
                                            })
                               }
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
      let obj = {zzList:arr}
      
      this.$emit("changeZZyq", val,obj);
    },
  }
};
</script>
<style lang='less' scoped>
</style>