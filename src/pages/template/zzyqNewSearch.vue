<!--  -->
<template>
  <div class="zzyqNewSearch">
    <el-form-item label="资质要求">
      <el-popover placement="bottom-start" trigger="click" @hide="showPopover">
        <my-cascader v-loading='loading' :options="zzyqList1" :ifClear="ifClear" :editZzyqList="zzyqListData" :selAllData="selAllData" :showPop="showPop" :closeMyDialog="closeMyDialog" @selectedChange="onSelectedChange"></my-cascader>
        <el-input style="cursor: pointer;" v-model="zzText" clearable @clear="clearZZ" slot="reference" placeholder="选择资质"></el-input>
      </el-popover>
    </el-form-item>
  </div>
</template>

<script>
import myCascader from "./myCascader.vue";
export default {
  components: {
    myCascader
  },
  data() {
    name: "zzyqNewSearch";
    return {
      props: {
        multiple: true,
        value: "dname",
        // checkStrictly: true,
        label: "dname"
      },
      allObj: [],
      ifClear: false,
      zzyqListData: [],
      zzyqList1: [],
      loading: true,
      zzyqData: {
        id: "",
        dname: "",
        parent_id: "",
        val: "",
        last: "",
        selected: "",
        children: []
      },
      zzyqDataChil: {
        name: [],
        values: [],
        id: ""
      },
      zzyqAll: [],
      chooseList: [],
      zzText: "",
      dataArr: [],
      topList: [],
      next_zz: [],
      last_zz: [],
      crumbData: [],
      selected_all_data: [],
      selAllData: [],
      showPop: ""
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
    let claArr = [];
    if (this.zzyqListData) {
      this.selAllData = this.defaultZzyq;
      this.zzyqListData.forEach(v => {
        claArr.push(v.join("/"));
      });
      this.zzText = claArr.join(" , ");
    }
    // console.log("zzyqNew", this.closeMyDialog);
  },
  // props: { zzyq: null, defaultZzyq: null,closeMyDialog:Boolean },
  props: ["zzyq", "defaultZzyq", "closeMyDialog"],
  methods: {
    // 点开弹出框
    showPopover() {
      // console.log(3333);
      var d = new Date();
      this.showPop = d.getTime();
    },
    // 清除资质要求选项
    clearZZ() {
      this.allObj = [];
      var d = new Date();
      this.ifClear = d.getTime();
      this.zzyqChooseData([]);
    },
    //传来级联选择器选择的值，编辑成input框中显示的。上一个选中的，所有选中的
    onSelectedChange(
      obj,
      allObj,
      topList,
      next_zz,
      last_zz,
      crumbData,
      selected_all_data
    ) {
      this.ifClear = false;
      this.allObj = allObj;
      this.topList = topList;
      this.next_zz = next_zz;
      this.last_zz = last_zz;
      this.crumbData = crumbData;
      this.selected_all_data = selected_all_data;
      // console.log("allObj", allObj);
      this.zzText = "";
      let zzArr = [];
      let claArr = []; //所有选项，一个完整选项为一个下标
      // console.log(this.selected_all_data);
      if (this.allObj.length > 0) {
        this.allObj.forEach(item => {
          let claArrHead = []; //一个选项中除了最后等级前面的分类
          //将除了最后等级前面的分类放入数组中
          for (let i = 0; i < item.length - 1; i++) {
            let cla = item[i].dname;
            claArrHead.push(cla);
          }
          let claArr2 = claArrHead;
          // console.log("item[item.length - 1].dname", item[item.length - 1].dname);
          if (
            typeof item[item.length - 1].dname == "object" &&
            item[item.length - 1].dname.length > 0
          ) {
            // console.log("object");
            // 同一分类下有多个等级
            item[item.length - 1].dname.forEach(rank => {
              claArr2 = [].concat(claArrHead);
              // console.log(rank);
              claArr2.push(rank);
              claArr2 = claArr2.join("/");
              claArr.push(claArr2);
            });
          } else {
            // console.log("str");
            claArr2.push(item[item.length - 1].dname);
            claArr2 = claArr2.join("/");
            claArr.push(claArr2);
          }
        });
      }
      this.zzText = claArr.join(" , ");
      // console.log("claArr", claArr);
      let chooseNeedDataArr = [].concat(claArr);
      // console.log("chooseNeedDataArr", chooseNeedDataArr);
      let needArr = [];
      chooseNeedDataArr.forEach(v => {
        needArr.push(v.split("/"));
      });
      // console.log("needArr", needArr);
      // 不再需要changeAllObj方法改变数据格式
      this.zzyqChooseData(needArr);
      // 原来的，会合并前几级类别
      // allObj.forEach(item => {
      //   let myTxt = "";
      //   if (item[item.length - 1].value.length == 0) {
      //     myTxt = "";
      //     return;
      //   }
      //   let text_array = [];
      //   for (let i of item) {
      //     for (let i2 of i.label) {
      //       text_array.push(i2);
      //     }
      //   }
      //   myTxt = text_array.join(",");
      //   arr.push(myTxt);
      // });
      // this.zzText = arr.join(" , ");
      // console.log("this.zzText",this.zzText);

      // this.changeAllObj(allObj);
    },
    getZzyqData() {
      this.axios.post("/firm/Firm_search/getQualiDict", {}, data => {
        // console.log(data);
        this.loading = false;

        this.zzyqList1 = data.rows || [];
        // this.addSelected(this.zzyqList1)
        // console.log( this.$refs.cascaderZzyq)
      });
    },
    // addSelected(val) {
    //   if (val.length) {
    //     val.forEach(item => {
    //       this.$set(item, "selected", false);
    //       item.children||this.addSelected(item.children)
    //       return;
    //     });
    //   }
    // },
    // changeAllObj(obj) {
    //   this.dataArr = [];
    //   obj.forEach((item, index) => {
    //     //处理多余的  嵌套  简化
    //     // let arr = item.map((item1, index1) => {
    //     //   return item1.label;
    //     // });
    //     let newArr = arr[arr.length - 1].map((item, index) => {
    //       // 将 最后一项  循环
    //       let arr4 = [];
    //       for (let i = 0; i <= arr.length - 1; i++) {
    //         // 将最后一项 分解出来
    //         i == arr.length - 1 ? arr4.push(item) : arr4.push(arr[i][0]);
    //       }
    //       this.dataArr.push(arr4);
    //     });
    //   });
    //   this.zzyqChooseData(this.dataArr);
    // },
    zzyqChooseData(val) {
      // console.log(val)
      let arr = []; // 结果集
      let array = this.zzyqList1; // 需要遍历的数组
      let a = new Set(); // 定义父级数组
      val.forEach(i => {
        a.add(i[0]); // 过滤出几个父级数组
      });
      a = Array.from(a); // 转化成数组
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
            });
          }
        });
      });
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
                            // console.log(sss, xxx);
                            if (sss.children) {
                              sss.children.forEach((ssss, xxxx) => {
                                if (ssss.dname === i[3]) {
                                  // console.log(ssss, xxxx);
                                  if (ssss.children) {
                                    ssss.children.forEach((sssss, xxxxx) => {
                                      if (sssss.dname === i[4]) {
                                        // console.log(sssss)
                                        let ii = JSON.parse(JSON.stringify(i));
                                        // ii.splice(0, 1) // 删除不要的元素
                                        k.children.push({
                                          name: ii,
                                          values: [
                                            // j,
                                            s.val ? s.val : "工程设计",
                                            ss.val,
                                            sss.val,
                                            ssss.val,
                                            sssss.val
                                          ],
                                          id: sss.id
                                        });
                                      }
                                    });
                                  } else {
                                    let ii = JSON.parse(JSON.stringify(i));
                                    // ii.splice(0, 1) // 删除不要的元素
                                    k.children.push({
                                      name: ii,
                                      values: [
                                        // j,
                                        s.val ? s.val : "工程设计",
                                        ss.val,
                                        sss.val,
                                        ssss.val
                                      ],
                                      id: sss.id
                                    });
                                  }
                                }
                              });
                            } else {
                              let ii = JSON.parse(JSON.stringify(i));
                              // ii.splice(0, 1) // 删除不要的元素
                              k.children.push({
                                name: ii,
                                values: [
                                  // j,
                                  s.val ? s.val : "工程设计",
                                  ss.val,
                                  sss.val
                                ],
                                id: sss.id
                              });
                            }
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      });
      // console.log(arr);
      let obj = {
        condition_top: arr,
        topList: this.topList,
        next_zz: this.next_zz,
        last_zz: this.last_zz,
        crumbData: this.crumbData,
        selected_all_data: this.selected_all_data
      };
      if (this.ifClear) {
        val = [];
        obj = {};
      }
      this.$emit("changeZZyq", val, obj); //传的值是OK的
    }
  }
};
</script>
<style lang='less' scoped>
</style>