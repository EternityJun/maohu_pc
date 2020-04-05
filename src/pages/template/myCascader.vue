<!--资质选择-->
<template>
  <div class="myCascader">
    <div class="cascader">
      <ul v-for="(block,index) in show_data" :key="index">
        <li v-for="(item,index2) in block" :key="index2" class="menu__item" :class="[item.children?'menu__item_children':'',item.selected?'is-active':'',!item.children&&item.selected?'lastSelected_item':'',item.children&&item.route?'routeSel':'']" @click="onClick_item(item,index,index2)">
          <p v-if="item.children">{{ item.dname }}</p>
          <span v-if="item.children" style="margin-left:10px">></span>
          <p v-else>{{ item.dname }}</p>
        </li>

      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  // props: {
  //   options,
  //   defaultvalue,
  //   ifClear,
  //   editZzyqList,
  //   selAllData
  // },
  props: [
    "options",
    "defaultvalue",
    "ifClear",
    "editZzyqList",
    "selAllData",
    "showPop",
    "closeMyDialog"
  ],
  name: "myCascader",
  data() {
    return {
      all_data: [],
      show_data: [],
      selected_data: [], //最后一级多选的data
      selected_all_data: [], //多选的data
      selected_all_data1: [], //后台要的格式
      default_data: [],
      statie: "",
      topList: [],
      next_zz: [],
      last_zz: [],
      next_zz2: [],
      last_zz2: [],
      crumbData: [],
      ifDef: false,
      lastSelData: [],
      lasti: 0,
      hide: false
    };
  },
  watch: {
    options(val) {
      if (val) {
        this.all_data = JSON.parse(JSON.stringify(val));
        this.show_data = [JSON.parse(JSON.stringify(val))];
        // console.log("39show_data", this.show_data);
        this.addSelected(this.show_data[0]);
        if (this.ifDef) {
          this.defaultsSel();
        }
      }
    },
    ifClear(val) {
      if (val) {
        this.selected_all_data = [];
        this.clear(this.show_data[0]);
        // console.log(123);
      }
    },
    showPop(val) {
      // console.log(val);
      this.changeSel(this.show_data[0]);
      this.hide = true;
      // console.log(this.show_data)
      this.show_data = this.show_data.slice(0, 1); //show_data是所有选项 截取出当前级别
    },
    closeMyDialog(val) {
      // console.log(this.closeMyDialog);
      if (val) {
        this.selected_all_data = [];
        this.selected_data = [];
        this.selected_all_data = [];
        this.topList = [];
        this.next_zz2 = [];
        this.last_zz = [];
        this.crumbData = [];
        this.$emit(
          "selectedChange",
          this.selected_data,
          this.selected_all_data,
          this.topList,
          this.next_zz2,
          this.last_zz,
          this.crumbData,
          this.selected_all_data
        );
      }
    }
    // editZzyqList(val) {
    //   if (val) {
    //     console.log(val);
    //     console.log("39show_data", this.show_data);
    //     this.editZzyqList.forEach(v => {
    //       v.forEach(v2 => {
    //         this.default(this.show_data[0], v2);
    //       });
    //     });
    //   }
    // }
  },
  created() {
    // console.log(this.options)
    this.show_data = [JSON.parse(JSON.stringify(this.options))];

    if (this.editZzyqList) {
      this.ifDef = true;
      // console.log(this.editZzyqList);
      // console.log("this.options",this.options)
      // this.show_data = [JSON.parse(JSON.stringify(this.options))];
      this.selected_all_data = this.selAllData;
      // console.log("104,selected_all_data",this.selAllData);
      // this.editZzyqList.forEach(v => {
      //   v.forEach(v2 => {
      //     this.default(this.show_data[0], v2);
      //   });
      // });
    }
    // if(this.closeMyDialog){

    //   this.selected_all_data =[]
    // }
  },
  methods: {
    // 如果是编辑
    defaultsSel() {
      // this.show_data = [JSON.parse(JSON.stringify(this.options))];
      // console.log("this.show_data", this.show_data);
      this.editZzyqList.forEach((v, k) => {
        this.default(this.show_data[0], v, 0);
      });
      // console.log("97selected_all_data", this.selected_all_data);
    },
    //递归函数  遍历数据 找到默认数据
    default(obj, item, index2) {
      if (obj.length) {
        obj.forEach((v, k) => {
          if (v.dname == item[index2]) {
            v.selected = true;
            if (v.children) {
              v.childrenSel = true;
              this.default(obj[k].children, item, index2 + 1);
            }
          }
        });
      }
    },
    //递归函数  遍历数据 清除选中状态
    clear(val) {
      if (val.length) {
        val.forEach(item => {
          // this.$set(item, "selected", false);
          item.selected = false;
          if (item.children) {
            this.clear(item.children);
          }
        });
      }
    },
    //递归函数  遍历数据 增加selected  属性  默认 false
    addSelected(val) {
      if (val.length) {
        val.forEach(item => {
          this.$set(item, "selected", false);
          if (item.children) {
            this.addSelected(item.children);
          } else {
            return;
          }
        });
      }
    },
    // 递归 点击最后一级后，向前判断类别是否选中
    selectRec(obj, i) {
      // console.log("selected_all_data", this.selected_all_data);
      if (obj.parent_id) {
        this.show_data[i - 1].forEach((parent, index3) => {
          if (parent.id == obj.parent_id) {
            let isSel = 0;
            let isCan = 0;
            this.show_data[i - 1][index3].children.forEach(children => {
              if (children.childrenSel == false || children.selected == false) {
                isCan++;
              } else {
                isSel++;
              }
            });
            if (isSel != 0) {
              this.show_data[i - 1][index3].selected = true;
              this.show_data[i - 1][index3].childrenSel = true;
              this.selectRec(this.show_data[i - 1][index3], i - 1);
            }
            if (isCan > 0 && isSel == 0) {
              // this.show_data[i - 1][index3].selected = false;
              this.show_data[i - 1][index3].childrenSel = false;
              this.selectRec(this.show_data[i - 1][index3], i - 1);
            }
          }
        });
      } else if (
        obj.id == 2618 ||
        obj.id == 2620 ||
        obj.id == 2701 ||
        obj.id == 3183 ||
        obj.id == 3190
      ) {
        let chiSel = 0;
        this.show_data[0][this.show_data[0].length - 1].children.forEach(
          children => {
            if (children.childrenSel == true) {
              chiSel++;
            }
          }
        );
        if (chiSel != 0) {
          this.show_data[0][this.show_data[0].length - 1].selected = true;
          this.show_data[0][this.show_data[0].length - 1].childrenSel = true;
        } else {
          this.show_data[0][this.show_data[0].length - 1].selected = false;
          this.show_data[0][this.show_data[0].length - 1].childrenSel = false;
        }
      }
    },
    // 递归 点击非最后一级后，向前判断类别是否选中
    upselectRec(obj, i) {
      // console.log("selected_all_data", this.selected_all_data);
      if (obj.parent_id) {
        this.show_data[i - 1].forEach((parent, index3) => {
          if (parent.id == obj.parent_id) {
            let isSel = 0;
            let isCan = 0;
            this.show_data[i - 1][index3].children.forEach(children => {
              if (children.selected == false) {
                isCan++;
              } else {
                isSel++;
              }
            });
            if (isSel != 0) {
              this.show_data[i - 1][index3].selected = true;
              // this.show_data[i - 1][index3].childrenSel = true;
              this.upselectRec(this.show_data[i - 1][index3], i - 1);
            }
            if (isCan > 0 && isSel == 0) {
              this.show_data[i - 1][index3].selected = false;
              // this.show_data[i - 1][index3].childrenSel = false;
              this.upselectRec(this.show_data[i - 1][index3], i - 1);
            }
          }
        });
      } else if (
        obj.id == 2618 ||
        obj.id == 2620 ||
        obj.id == 2701 ||
        obj.id == 3183 ||
        obj.id == 3190
      ) {
        let chiSel = 0;
        this.show_data[0][this.show_data[0].length - 1].children.forEach(
          children => {
            if (children.selected == true) {
              chiSel++;
            }
          }
        );
        if (chiSel != 0) {
          this.show_data[0][this.show_data[0].length - 1].selected = true;
          // this.show_data[0][this.show_data[0].length - 1].childrenSel = true;
        } else {
          this.show_data[0][this.show_data[0].length - 1].selected = false;
          // this.show_data[0][this.show_data[0].length - 1].childrenSel = false;
        }
      }
    },
    //递归函数  遍历数据 childrenSel为false的都清除选中
    changeSel(obj) {
      // console.log(this.show_data[0]);
      obj.forEach(item => {
        if (item.children) {
          if (item.childrenSel == undefined || item.childrenSel == false) {
            item.selected = false;
          }
          this.changeSel(item.children);
        }
      });
    },
    // 递归函数 点击前几级时消除后级的选择状态
    clearBack(obj) {
      // console.log(this.show_data[0]);
      obj.forEach(item => {
        if (item.children) {
          if (item.childrenSel == undefined || item.childrenSel == false) {
            item.selected = false;
            item.route = false;
          }
          this.clearBack(item.children);
        }
      });
    },
    //点击列表  obj是当前选中类别信息（名字,children等）  i是类别的级数，第一列类别为0   i2是当前列里选中类别的下标，0为第一类
    onClick_item(obj, i, i2) {
      // if (i == 0) {
      //   this.show_data = [this.all_data];
      //   console.log(this.show_data);
      // }
      // console.log("lasti", this.lasti);
      // console.log("hide", this.hide);
      if (i < this.lasti && !this.hide) {
        this.clearBack(this.show_data[i + 1]);
      }
      if (obj.children) {
        // 不是最后一级
        // this.selected_data[i] = {
        //   value: obj.val,
        //   dname: obj.dname,
        //   id: obj.id,
        //   parent_id: obj.parent_id
        // };

        this.selected_data[i] = obj;
        // 在未选定最后一级时，查看前几级，对应类别变蓝
        // console.log(JSON.parse(JSON.stringify(this.show_data[i])))
        this.show_data[i].forEach(v2 => {
          if (!v2.childrenSel) {
            v2.selected = false;
          }
          v2.route = false;
        });
        this.show_data[i][i2].selected = true;
        this.show_data[i][i2].route = true;
        this.show_data = this.show_data.slice(0, i + 1); //show_data是所有选项 截取出当前级别
        this.upselectRec(obj, i);
        // 点击类别出现下一级列表
        let childrenArr = [];
        childrenArr.push(this.show_data[i][i2].children);
        this.show_data = this.show_data.concat(childrenArr); //加上下一级
        // 给crumbData赋值
        this.crumbData[i] = JSON.parse(JSON.stringify(obj));
        this.next_zz[i] = JSON.parse(JSON.stringify(obj));
      } else {
        // 点击最后一级
        this.selected_data[i] = {
          value: obj.val,
          dname: obj.dname,
          id: obj.id,
          parent_id: obj.parent_id
        };
        obj.selected = !obj.selected;
        this.selectRec(obj, i); //注释放开
        // 如果不是从第一级开始点的
        for (let j = 0; j < this.selected_data.length; j++) {
          if (this.selected_data[j] == undefined) {
            this.selected_data[j] = JSON.parse(
              JSON.stringify(this.lastSelData)
            )[j];
          }
        }
        // 选中
        if (obj.selected) {
          if (this.selected_all_data.length != 0) {
            // 已选
            // 截取倒数第二级（判断）
            let label_T = this.selected_data.slice(
              this.selected_data.length - 2,
              this.selected_data.length - 1
            );
            label_T = label_T[0].dname;
            // 截取最后一级（要用的值）
            let label_l = obj.dname;
            let label_v = obj.value;
            let label_id = obj.id;
            let sameClaIndex = [];
            let sameCla = [];
            let a = -1;
            let b = -1;
            this.selected_all_data.forEach((v3, k3) => {
              let haveCla = v3.slice(v3.length - 2, v3.length - 1)[0].dname;
              // console.log("label_T",label_T)
              // console.log("haveCla",v3.slice(v3.length - 2, v3.length - 1))
              if (label_T == haveCla) {
                a++;
                sameClaIndex = k3;
                sameCla = v3;
              } else {
                b++;
              }
            });
            // 倒数第二级有相同的
            if (a != -1) {
              if (
                typeof this.selected_all_data[sameClaIndex][
                  this.selected_all_data[sameClaIndex].length - 1
                ].id == "number"
              ) {
                sameCla[sameCla.length - 1].id = [
                  sameCla[sameCla.length - 1].id
                ];
                sameCla[sameCla.length - 1].id.push(label_id);
                sameCla[sameCla.length - 1].dname = [
                  sameCla[sameCla.length - 1].dname
                ];
                sameCla[sameCla.length - 1].dname.push(label_l);
                sameCla[sameCla.length - 1].value = [
                  sameCla[sameCla.length - 1].value
                ];
                sameCla[sameCla.length - 1].value.push(label_v);
              } else {
                sameCla[sameCla.length - 1].id.push(label_id);
                sameCla[sameCla.length - 1].dname.push(label_l);
                sameCla[sameCla.length - 1].value.push(label_v);
              }
            }
            if (b != -1 && a == -1) {
              this.selected_all_data.push(
                JSON.parse(JSON.stringify(this.selected_data))
              );
            }
          } else {
            // 未选中值
            this.selected_data[this.selected_data.length - 1].id = [
              this.selected_data[this.selected_data.length - 1].id
            ];
            this.selected_data[this.selected_data.length - 1].dname = [
              this.selected_data[this.selected_data.length - 1].dname
            ];
            this.selected_data[this.selected_data.length - 1].value = [
              this.selected_data[this.selected_data.length - 1].value
            ];
            this.selected_all_data = [
              JSON.parse(JSON.stringify(this.selected_data))
            ];
          }
          // this.crumbData[i]=JSON.parse(JSON.stringify(obj))
        } else {
          // 取消
          // console.log("313this.selected_data", this.selected_data);
          // 截取最后一级（要用的值）
          let label = this.selected_data.slice(
            this.selected_data.length - 1,
            this.selected_data.length
          );
          let lastName = obj.dname;
          let lastID = obj.id;
          let index = -1;
          let index2 = -1;
          this.selected_all_data.forEach((sel2, k1) => {
            let haveLast = sel2[sel2.length - 1].id;
            if (typeof haveLast == "object") {
              haveLast.forEach((last, k2) => {
                if (last == lastID) {
                  index = k1;
                  index2 = k2;
                }
              });
            } else {
              if (lastID == haveLast) {
                index = k1;
              }
            }
          });
          let cancelLast = this.selected_all_data[index][
            this.selected_all_data[index].length - 1
          ];
          let idArr = cancelLast.id;
          let labelArr = cancelLast.dname;
          let valArr = cancelLast.value;
          if (typeof idArr == "object") {
            idArr.splice(index2, 1);
            labelArr.splice(index2, 1);
            valArr.splice(index2, 1);
            if (!idArr.length) {
              this.selected_all_data.splice(index, 1);
            }
          } else {
            this.selected_all_data.splice(index, 1);
          }
        }
        // console.log("356,selected_all_data", this.selected_all_data);

        this.getDataArrs(obj);
        // console.log("topList", this.topList);
        // console.log("253crumbData", this.crumbData);
        // console.log("last_zz", this.last_zz);
        // console.log("next_zz2", this.next_zz2);
        // console.log(
        //   "selected_all_data",
        //   JSON.parse(JSON.stringify(this.selected_all_data))
        // );

        this.lastSelData = JSON.parse(JSON.stringify(this.selected_data));
        this.selected_data = [];
        this.$emit(
          "selectedChange",
          this.selected_data,
          this.selected_all_data,
          this.topList,
          this.next_zz2,
          this.last_zz,
          this.crumbData,
          this.selected_all_data
        );
      }
      this.lasti = i;
      this.hide = false;
      // console.log("228,selected_all_data", this.selected_all_data);
    },

    getDataArrs(obj) {
      let firID = "";
      let lastID = obj.id;
      let nextID = obj.parent_id;
      this.parIDRec("", this.all_data, firID, nextID, lastID);
      this.gettopList();
      this.handleCrumb();
      this.getnext_zz();
    },
    handleCrumb() {
      // console.log("crumbData", this.crumbData[this.crumbData.length-1]);
      delete this.crumbData[this.crumbData.length - 1].children;
      for (let i = this.crumbData.length - 2; i > -1; i--) {
        this.crumbData[i].children = [].concat(this.crumbData[i + 1]);
      }
      // console.log("crumbData", this.crumbData)
    },
    // 从外往里找，找到倒数第二级为止
    parIDRec(type, obj, firid, parentid, id) {
      // console.log(obj);
      // try {
      let that = this;
      obj.some(v => {
        if (v.id == parentid) {
          // console.log("success");
          // if (type == "last") {
          // 【last_zz】
          that.last_zz = [].concat(v.children);
          that.last_zz.forEach(v2 => {
            if (v2.id == id) {
              v2.checked = true;
            }
          });
          // return true;
          // } else if (type == "next") {
          // console.log("next");
          // 【next_zz】
          // let ppID = v.parent_id;
          // that.getnext_zz(that.all_data, ppID);
          // }else if (type == "crumb") {
          // that.crumbData.push(JSON.parse(JSON.stringify(v)));
          // }
          // throw new Error("ok");
        } else if (v.parentid != parentid) {
          if (v.children) {
            that.parIDRec(type, v.children, firid, parentid, id);
          }
        }
      });
      // } catch (e) {
      //   console.log("sdfafasdfsdfasd");

      // }
      // console.log(123);
    },
    gettopList() {
      this.topList = [];
      this.selected_all_data.forEach((v, k) => {
        // let lastID=v[v.length-1]
        let oneList = { id: 0, next: [], last: [] };
        oneList.id = v[v.length - 2].id;
        for (let i = 0; i < v.length - 1; i++) {
          oneList.next.push(v[i].dname);
        }
        let lastID = v[v.length - 1].id;
        if (typeof lastID == "object") {
          for (let j = 0; j < lastID.length; j++) {
            v[v.length - 2].children.forEach((v2, k2) => {
              if (v2.id == lastID[j]) {
                oneList.last.push(v2);
                return;
              }
            });
          }
        } else {
          v[v.length - 2].children.forEach((v2, k2) => {
            if (v2.id == lastID) {
              oneList.last.push(v2);
              return;
            }
          });
        }
        this.topList.push(oneList);
      });
    },
    // 从外往里找到倒数第三级
    getnext_zz() {
      this.next_zz2 = this.next_zz[this.next_zz.length - 2].children;
      this.next_zz2.forEach(v => {
        delete v.children;
      });
      // let that = this;
      // obj.some(v => {
      //   if (v.id == parentid) {
      //     that.next_zz = [].concat(v.children);
      //     // that.crumbData.push(JSON.parse(JSON.stringify(v)));
      //     // console.log(1684496543218564,that.crumbData)
      //     // that.getcrumbData(that.all_data, parentid);
      //     // throw new Error("ok");
      //   } else if (v.parentid != parentid) {
      //     // console.log(v.children);
      //     if (v.children) {
      //       that.getnext_zz(v.children, parentid);
      //     } else {
      //       // console.log("no children");
      //     }
      //   }
      // });
    }
  }
};
</script>

<style scoped>
.menu__item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 8px 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 1.5;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
}
/* .menu__item_children::after {
  font-family: element-icons; */
/* content: ">"; */
/* content: "\00BB";
  font-size: 14px;
  color: #bfcbd9;
  position: absolute;
  right: 6px;
} */
.menu__item:hover {
  background-color: #f5f7fa;
}
.routeSel {
  background-color: #f5f7fa;
}
.lastSelected_item::after {
  position: absolute;
  right: 8px;
  font-family: element-icons;
  content: "";
  font-size: 12px;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.is-active {
  color: #409eff;
}
.cascader ul {
  display: inline-block;
  vertical-align: top;
  height: 290px;
  overflow: auto;
  border-right: 1px solid #e4e7ed;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0;
  padding: 6px 0;
  min-width: 160px;
}
.cascader ul:last-child {
  border-right: 0;
}
</style>

