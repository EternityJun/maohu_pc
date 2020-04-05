<!--  -->
<template>
  <div class="gsSearchRy">
    <el-select v-model="value" @change="changeDropDown" style="width:150px" placeholder="请选择">
      <el-option
        v-for="item in dropDownList"
        :key="item.major"
        :label="item.major"
        :value="item.major"
      ></el-option>
    </el-select>
    <el-select
      v-if="childrenState"
      v-model="value1"
      @change="changeDropDown1"
      style="width:150px"
      placeholder="请选择"
    >
      <el-option
        v-for="item1 in dropDownList1"
        :key="item1.major"
        :label="item1.major"
        :value="item1.major"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "gsSearchRy",
  data() {
    return {

    };
  },
  methods: {
    getSourceInfo(zjlx){
        this.dropDownList = []
        this.dropDownList1 = []
        this.value = ''
        this.value1 = ''
        this.childrenState = false
        let info_data = {
           gs_id: this.gs_id,
          zjlx :zjlx,
        }
        this.axios.post("/firm/people/getSourceInfo",info_data,data=>{
          let arr = data.rows
          if(zjlx == '三类人员'){
            
            arr.forEach(item => {
                let obj = {}
              obj.major = item
               this.dropDownList.push(obj)
            })

          }else{
            arr.forEach(item => {
              if(item.children){
                let arr1 = []
                item.children.forEach(item1=>{
                  // console.log(item1)
                    let obj = {}
                    obj.major = item1
                    arr1.push(obj)
                })
                item.children = arr1
                //  console.log(arr)
              }
            })
              this.dropDownList = arr
          }
        })
      },
    changeDropDown(val){
      this.value1 = ''
      this.dropDownList1 = []
        this.dropDownList.forEach(item=>{
          if(item.major == val ){
            if(item.children){
              this.dropDownList1 = item.children
            }
          }
        })
        this.source = this.mySource
        this.zjlx = this.myZjlx
      if(this.myZjlx == '三类人员'){
        this.number = val
      }else if(this.myZjlx == '施工现场专业人员'){
        this.childrenState = true
        this.certificate_level = val
      }else{
         this.childrenState = true
        this.major = val
      }
      this.zsxxFn().getList()
    },
    changeDropDown1(val){
       this.source = this.mySource
        this.zjlx = this.myZjlx
      if(this.myZjlx == '施工现场专业人员'){
        this.major = val
      }else{
        this.certificate_level = val
      }
      this.zsxxFn().getList()
    },
  }
};
</script>
<style lang='scss' scoped>
</style>