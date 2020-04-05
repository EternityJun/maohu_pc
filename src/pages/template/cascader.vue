<!--资质选择-->
<template>
  <div class="cascader">
    <ul v-for="(block,index) in show_data" :key="index">
      <li v-for="(item,index2) in block" :key="index2" class="menu__item" :class="[item.children?'menu__item_children':'',item.selected?'is-active':'',!item.children&&item.selected?'lastSelected_item':'']" @click="onClick_item(item,index,index2)">{{item.label}}</li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    options: null,
    defaultvalue: null
  },
  data() {
    return {
      alldata: [
        {
          label: "施工总承包",
          value: 1,
          children: [
            {
              label: "建筑工程",
              value: "1_2",
              children: [
                {
                  label: "一级",
                  value: "1_1_1"
                }
              ]
            },
            {
              label: "公路工程",
              value: "1_3",
              children: [
                {
                  label: "二级",
                  value: "1_1_2"
                },
                {
                  label: "一级",
                  value: "1_1_3"
                }
              ]
            }
          ]
        },
        {
          label: "专业承包",
          value: 2,
          children: [
            {
              label: "地基基础工程",
              value: "2_2",
              children: [
                {
                  label: "一级",
                  value: "2_1_1"
                }
              ]
            },
            {
              label: "起重设备安装工程",
              value: "2_3",
              children: [
                {
                  label: "二级",
                  value: "2_1_2"
                }
              ]
            }
          ]
        }
      ],
      show_data: [],
      selected_data: [],
      default_data: []
    };
  },
  watch: {
    options() {
      // this.alldata = this.options;
      this.show_data = [JSON.parse(JSON.stringify(this.options))];
    },
    defaultvalue() {     
      //默认值数据操作
      this.show_data = [JSON.parse(JSON.stringify(this.options))];
      this.default_data = JSON.parse(JSON.stringify(this.defaultvalue));
       if(this.defaultvalue.length == 0){
        return
      }
      this.show_data[0].map(v=>{
        if(v.value == this.default_data[0][0]){
          v.selected = true
        }
        return v;
      })
      let new_ = JSON.parse(JSON.stringify(this.options));
      if (this.default_data) {
        var aa = this.default_data.map((v, i) => {
          let selected_obj2 = {
                label: [],
                value: []
              };
          for (let itm of new_) {
            if (v.length == 1) {
              if (itm.value == v[0]) {
                itm.selected = true;
                let selected_obj = {
                  label: [itm.label],
                  value: [itm.value]
                };
                this.selected_data[i] = selected_obj;
                new_ = itm.children;
                return new_;
              }
            } else {
              
              for (var t of v) {
                if (itm.value == t) {
                  selected_obj2.label.push(itm.label);
                  selected_obj2.value.push(itm.value);
                  itm.selected = true;
                }
              }
              this.selected_data[i] = selected_obj2;
            }
          }
        });
        aa.splice(aa.length - 1, 1);
        this.show_data = this.show_data.concat(aa);
      }
    }
  },
  methods: {
    //点击列表
    onClick_item(obj, i, i2) {
      if (obj.children) {
        this.selected_data[i] = {
          value: [obj.value],
          label: [obj.label]
        };
        //点击到几层数据获取到几层
        this.selected_data = this.selected_data.slice(0, i + 1);
        this.show_data = this.show_data.slice(0, i + 2);
      } else {
        //如果最后一级存在
        if (this.selected_data[i]) {
          //多选操作
          if(this.selected_data[i].value.indexOf(obj.value) == -1){
            this.selected_data[i].value.push(obj.value)
          }else{
            this.selected_data[i].value.splice(this.selected_data[i].value.indexOf(obj.value),1)
          }
          if(this.selected_data[i].label.indexOf(obj.label) == -1){
            this.selected_data[i].label.push(obj.label)
          }else{
            this.selected_data[i].label.splice(this.selected_data[i].label.indexOf(obj.label),1)
          }
        } else {
          this.selected_data[i] = {
            value: [obj.value],
            label: [obj.label]
          };
        }
        this.$emit("selectedChange", this.selected_data);
      }
      //获取点击当前对象处理数据选中数据
      var new_data = this.show_data.map((v, mapindex) => {
        if (mapindex == i) {
          //循环当前点击列表,获取点击当前对象
          v.map(v2 => {
            if (v2.value == obj.value) {
              v2.selected = !v2.selected;
            } else {
              if (obj.children) {
                v2.selected = false;
              }
            }
            return v2;
          });
        } else {
          //如果点击的不是当前列表,那么当前以下的列表都重置为未选中状态
          if (i < mapindex) {
            v.map(v2 => {
              if (v2.value == obj.value) {
                v2.selected = false;
              } else {
                v2.selected = false;
              }
              return v2;
            });
          }
        }
        return v;
      });
      if (obj.children) {
        new_data[i + 1] = obj.children;
      }
      this.show_data = new_data;
    }
  }
};
</script>

<style scoped>
.menu__item {
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
.menu__item_children::after {
  font-family: element-icons;
  content: ">";
  /* content: '\00BB';   */
  font-size: 14px;
  color: #bfcbd9;
  position: absolute;
  right: 6px;
}
.menu__item:hover {
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

