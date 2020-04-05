<template>
  <div class="zz_search" v-loading="loading">
    <div class="select_tj">
      <div class="zz_name">
        <span>企业属地</span>
        <el-select  style="margin-right:6px;width:180px;" size="small" filterable v-model="checked_area" placeholder="请选择企业属地">
          <el-option v-for="item in area" :key="item.id" :label="item.full_prov" :value="item.full_prov"></el-option>
        </el-select>
      </div>
      <div class="zz_name">
        <span>资质名称</span>
        <el-select style="margin-right:6px;width:180px;" v-for="(item,i) in zz_select_options" :key="i" size="small" filterable v-model="item.selectVal" placeholder="请选择" @change="onChange_yj(i,item.options)">
          <span v-for="item2 in item.options" :key="item2.value">
            <el-option v-if="(item2.label != '设计与施工一体化' && checked_area !='四川省') || (checked_area =='四川省') "  :label="item2.label" :value="item2.value"></el-option>
          </span>
        </el-select>
        <!-- <el-select
          style="margin-left:10px"
          size="small"
          v-model="iptzz_ej"
          placeholder="请选择"
          @change="onChange_ej"
        >
          <el-option
            v-for="item in zz_options_ej"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>-->
      </div>
      <div class="zz_tj">
        <span>资质条件</span>
        <div class="zz_tjlists">
          <ul>
            <li v-for="(item,i) in new_frame" :key="i">
              <p>{{i+1}}.{{item.name}}</p>
              <div class="ej_zz">
                <div v-for="(item2,i2) in item.children" :key="i2">
                  <span>{{item2.name}}</span>
                  <i @click="onClear(item2.value)" class="el-icon-close" style="color:red"></i>
                </div>
              </div>
            </li>
          </ul>
          <!-- <div v-for="(item,i) in zz_TjArray" :key="item.value">
            <span>{{(i+1)+'. '+item.label}}</span>
            <i @click="onClear(item)" class="el-icon-close" style="color:red"></i>
          </div>-->
        </div>
      </div>
    </div>
    <div class="select_center">
      <div class="filter_box" v-if="re_zz_checkboxs.length > 0">
        <span>列表筛选</span>
        <el-input size="small" style="width: 180px;" placeholder="找不到？搜一下吧" v-model="filter_name" @keyup.delete.native="handleFilterZzList" @keyup.enter.native="handleFilterZzList" @clear="handleClearFilterName" clearable></el-input>
      </div>
      <div style="height:360px;overflow:auto" class="div_scoll">
        <el-checkbox-group v-model="zz_checked" @change="onChange_checkbox">
          <div class="check_row" v-for="item in zz_checkboxs" :key="item.value">
            <el-checkbox :label="item.value">{{item.label}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <!-- <div align="right" style="margin-top:10px">
        <el-button size="small" type="primary" plain>添加</el-button>
      </div>-->
    </div>
    <div align="center">
      <el-button type="primary" @click="onSearch">搜索</el-button>
      <el-button @click="onClearTj">清空</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      iptzz_yj: '', //一级选中值
      zz_checked: [], //选中资质数组
      zz_options_yj: [], //一级下拉
      zz_options_ej: [], //二级下拉
      zz_TjArray: [],
      //所有的资质项
      zz_allCheckboxs: [],
      //选中的资质项
      zz_checkboxs: [],
      re_zz_checkboxs: [], // 同上 输入框筛选时用到
      zz_select_options: [], //全部的下拉选择数据
      new_frame: [], //资质条件选择文本
      obj: {},
      filter_name: '',
      area: [], //企业属地
      checked_area: ''
    }
  },
  created() {
    this.getZz()
    this.getProvCate()
  },
  //事件
  methods: {
   
    // 获取全国地区
    getProvCate(type) {
      this.axios.post('/firm/Firm_Search_Nation/getProvCate', {}, data => {
        this.area = data
        let zz_search_area = JSON.parse(localStorage.getItem('setzzSearchArea'))
        this.checked_area = zz_search_area
          ? zz_search_area.full_prov
          : localStorage.getItem('local_province')
      })
    },
    handleC() {},
    // 筛选资质列表
    handleFilterZzList() {
      // let zz_checkboxs = this.zz_checkboxs;
      if (this.filter_name.length > 0) {
        // 有值
        let zz_checkboxs = this.zz_checkboxs.filter(v => {
          return v.label.indexOf(this.filter_name) > -1
        })
        this.zz_checkboxs = zz_checkboxs
      } else {
        this.zz_checkboxs = this.re_zz_checkboxs
      }
    },
    // 清空筛选资质列表输入框
    handleClearFilterName() {
      this.zz_checkboxs = this.re_zz_checkboxs
    },
    //获取资质字典
    getZz() {
      this.axios.post('/firm/Firm_search/getQualiDict', {}, backData => {
        let zzYj = []
        let zzArray = [] //所有的资质条件
        backData.rows.forEach(v => {
          let obj_yj = {
            value: v.val || '工程设计',
            label: v.dname,
            children: v.children
          }
          zzYj.push(obj_yj)
          v.children.forEach(v2 => {
            v2.children.forEach(v3 => {
              let yj_d = null
              if (v.val) {
                yj_d = v.val
              } else {
                yj_d = '工程设计'
              }
              if (v3.children) {
                v3.children.forEach(v4 => {
                  if (v4.children) {
                    v4.children.forEach(v5 => {
                      let obj = {
                        value:
                          yj_d +
                          '_' +
                          v2.val +
                          '_' +
                          v3.val +
                          '_' +
                          v4.val +
                          '_' +
                          v5.val,
                        label:
                          v.dname +
                          ' / ' +
                          v2.dname +
                          ' / ' +
                          v3.dname +
                          ' / ' +
                          v4.dname +
                          ' / ' +
                          v5.dname
                      }
                      zzArray.push(obj)
                    })
                  } else {
                    let obj = {
                      value: yj_d + '_' + v2.val + '_' + v3.val + '_' + v4.val,
                      label:
                        v.dname +
                        ' / ' +
                        v2.dname +
                        ' / ' +
                        v3.dname +
                        ' / ' +
                        v4.dname
                    }
                    zzArray.push(obj)
                  }
                })
              } else {
                let obj = {
                  value: yj_d + '_' + v2.val + '_' + v3.val,
                  label: v.dname + ' / ' + v2.dname + ' / ' + v3.dname
                }
                zzArray.push(obj)
              }
            })
          })
        })
        this.loading = false
        this.zz_select_options.push({ options: zzYj, selectVal: '' })
        // this.zz_checkboxs = zzArray;
        this.zz_allCheckboxs = zzArray
        this.defaultFn()
      })
    },
    //默认选中值
    defaultFn() {
      let check = JSON.parse(localStorage.getItem('setzzSearchValue_checked'))
      let checked_area = JSON.parse(localStorage.getItem('setzzSearchArea'))
      if (check) {
        if (check.length != 0) {
          this.zz_checked = check
          this.checked_area = checked_area.full_prov
          this.onChange_checkbox()
        }
      }
    },
    //选中第一级次
    onChange_yj(i, obj) {
      this.filter_name = ''
      if (i == 0) {
        this.obj = obj
      }
      let yj = obj.filter(v => v.value === this.zz_select_options[i].selectVal)
      let ej_array = [
        {
          value: '',
          label: '全部'
        }
      ]
      if (i == 1 && yj[0].label == '全部') {
        this.onChange_yj(0, this.obj)
        return
      }

      yj[0].children.forEach(v => {
        let obj = {
          value: v.val,
          label: v.dname,
          children: v.children
        }
        ej_array.push(obj)
      })
      this.zz_select_options.splice(i + 1, 8)
      if (ej_array[1].children) {
        this.zz_select_options.push({ options: ej_array, selectVal: '' })
      }
      this.filterZz()
    },
    //改变多选框赋值条件数据
    onChange_checkbox() {
      this.zz_TjArray = this.zz_checked.map(v => {
        return this.zz_allCheckboxs.filter(v2 => v2.value == v)[0]
      })
      var new_frame = []
      this.zz_TjArray.forEach(v => {
        var name_array = v.label.split(' / ')
        var value_ = v.value
        if (new_frame.length == 0) {
          new_frame = [
            {
              name: name_array[0],
              children: [
                {
                  name: name_array.slice(1, 8).join(' / '),
                  value: value_
                }
              ]
            }
          ]
        } else {
          var ex_i = null
          var existence = new_frame.filter((v2, i2) => {
            if (v2.name == name_array[0]) {
              ex_i = i2
              return v2
            }
          })
          if (existence[0]) {
            new_frame[ex_i].children.push({
              name: name_array.slice(1, 8).join(' / '),
              value: value_
            })
          } else {
            let obj = {
              name: name_array[0],
              children: [
                {
                  name: name_array.slice(1, 8).join(' / '),
                  value: value_
                }
              ]
            }
            new_frame.push(obj)
          }
        }
      })
      this.new_frame = new_frame
    },
    //筛选资质选项
    filterZz() {
      var a = []
      this.zz_select_options.forEach(v => {
        v.selectVal && a.push(v.selectVal)
      })
      let nowArray = this.zz_allCheckboxs.filter(
        v => v.value.indexOf(a.join('_') + '_') == 0
      )
      this.zz_checkboxs = nowArray
      this.re_zz_checkboxs = nowArray
    },
    //清除选项
    onClear(value) {
      this.zz_checked = this.zz_checked.filter(v => v != value)
      if (this.zz_checked.length == 0) {
        localStorage.setItem('setzzSearchValue', '')
        localStorage.setItem('setzzSearchValue_checked', '')
      }
      this.onChange_checkbox()
    },
    //点击搜索
    onSearch() {
      // localStorage.setItem("setzzSearchValue", "");
      // localStorage.setItem("setzzSearchValue_checked", "");
      let search_array = {}
      let classArr = [] //已有类型数组;
      this.zz_TjArray.forEach(v => {
        let labels = v.label.split(' / ')
        if (labels[0] == '工程设计(建筑市场)') {
          let index_ = 0
          let pass = search_array['工程设计']
          let gc_value = v.value.split('_')
          gc_value.splice(0, 1)
          // 截取倒数第二级（判断）
          let label_T = labels.slice(labels.length - 2, labels.length - 1)
          label_T = label_T.toString()
          // 截取最后一级（要用的值）
          let label_l = labels.slice(labels.length - 1, labels.length)
          label_l = label_l.toString()
          if (!pass) {
            //第一个工程设计
            let obj = {}
            obj[label_l] = '工程设计' + gc_value.join('_')
            search_array['工程设计'] = [obj]
          } else {
            // 判断是否倒数二级相同
            let pass2_index = -1
            classArr.forEach((k1, v1) => {
              if (label_T == k1) {
                pass2_index = v1
              }
            })
            if (pass2_index != -1) {
              //已有该类
              search_array['工程设计'][pass2_index][label_l] =
                '工程设计' + gc_value.join('_')
            } else {
              // 是新的类
              let obj = {}
              obj[label_l] = '工程设计' + gc_value.join('_')
              search_array['工程设计'].push(obj)
            }
          }
          if (classArr.indexOf(label_T) == -1) {
            classArr.push(label_T)
          }
        } else {
          //如果不是工程设计
          let index_ = null
          let pass = search_array[labels[0]]
          if (!pass) {
            //不存在一级
            let obj2 = {}
            obj2[labels[1] + '_' + labels[2]] = v.value
            search_array[labels[0]] = [obj2]
          } else {
            // 判断是否二级相同
            let pass2_index = null
            search_array[labels[0]].forEach((v1, i1) => {
              for (let key_ in v1) {
                if (key_.indexOf(labels[1]) == 0) {
                  pass2_index = i1
                }
              }
            })
            if (pass2_index == null) {
              //不存在相同的二级
              //如果没有
              let obj = {}
              obj[labels[1] + '_' + labels[2]] = v.value
              search_array[labels[0]].push(obj)
            } else {
              search_array[labels[0]][pass2_index][
                labels[1] + '_' + labels[2]
              ] =
                v.value
            }
          }
        }
      })
      if (JSON.stringify(search_array) !== '{}' && search_array) {
        let pass = this.area.filter(v => {
          return v.full_prov == this.checked_area
        })
        localStorage.setItem('setzzSearchArea', JSON.stringify(pass[0]))
        localStorage.setItem('setzzSearchValue', JSON.stringify(search_array))
        localStorage.setItem(
          'setzzSearchValue_checked',
          JSON.stringify(this.zz_checked)
        )
        // this.$emit('zzchecked',this.checked_area);
        this.$emit('onSearch', { url: '/searchZz' })
      } else {
        this.$message.error('请选择资质')
      }

      // this.$emit('checked_zz',this.checked_area,this.zz_checked);
      

    },
    //清空
    onClearTj() {
      this.zz_select_options.map(v => {
        v.selectVal = ''
      })
      this.zz_checked = []
      // this.checked_area = ''
      this.zz_select_options.splice(1, 8)
      localStorage.setItem('setzzSearchValue', '')
      localStorage.setItem('setzzSearchValue_checked', '')
      this.filterZz()
      this.onChange_checkbox()
    }
  }
}
</script>


<style lang="less" scoped>
.div_scoll::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8;
}
.div_scoll::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
.div_scoll::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  background-clip: padding-box;
  min-height: 28px;
}
.div_scoll::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}

.zz_search {
  .select_tj,
  .select_center {
    border: 1px solid #d5d5d5;
    margin-bottom: 10px;
    padding: 10px 20px;
  }
  .select_tj {
    span {
      font-size: 14px;
      margin-right: 10px;
    }
    .zz_name {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }
    .zz_tj {
      display: flex;
      .zz_tjlists {
        border: 1px solid #d5d5d5;
        padding: 4px;
        font-size: 14px;
        flex: 1;
        ul {
          overflow: auto;
          display: flex;
          flex-flow: wrap;
          li {
            list-style: none;
            float: left;
            width: 50%;
            margin-bottom: 4px;
            .ej_zz {
              color: #888;
              padding: 0 10px;
              > div {
                padding: 2px 0;
                span {
                  flex: unset;
                }
                display: flex;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
  //选中check内容
  .select_center {
    .check_row {
      margin-bottom: 10px;
    }
    .filter_box {
      margin-bottom: 10px;
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>


