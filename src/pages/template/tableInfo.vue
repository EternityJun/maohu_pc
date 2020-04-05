<template>
  <div>
    <table class="my_table">
      <div class="jbxx">
        <span style="font-size:18px;color:#348BDA;margin-top:18px;margin-left:18px">
          基本信息
        </span>
        <i class="el-icon-edit-outline" v-if="weizhi==0" style="font-size:18px;cursor:pointer" @click="editJbxx"></i>
      </div>
      <tr v-for="(one,i) in tableData2" :key="i">
        <td class="td1" :style="{display:!one1.txt?'none':''}" v-for="(one1,i2) in one" :key="i2" :colspan="one1.colspan?one1.colspan:''" :rowspan="one1.row?one1.row:''">
          <span v-if="!one1.children">{{one1.txt}}</span>
          <table class="children_table" v-else>
            <tr class="th">
              <td width="60">序号</td>
              <td v-for="th in one1.children.th" :key="th">{{th}}</td>
            </tr>
            <tr v-for="(tr,tri) in one1.children.rows" :key="tri">
              <td>{{tri+1}}</td>
              <td v-for="(td,td1) in tr" :key="td1">{{td}}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    tableData: null,
  },
  data() {
    return {
      tableData2: [],
      weizhi:''
    }
  },
  watch: {
    tableData() {
      this.getData()
    }
  },
  created() {
    this.panduan()
    this.getData()
  },
  methods: {
    panduan() {
      if (this.$route.query.cate == 'add') {
        this.weizhi = 0
      }else if(this.$route.query.cate == 'import'){
        this.weizhi = 1
      }else{
        this.weizhi = 2
      }
    },
    //编辑基本信息
    editJbxx(){
      this.$emit('onChangeData');
    },
    getData() {
      if (!this.tableData.rows || this.tableData.rows.length == 0) {
        return
      }
      let col = this.tableData.col //需要显示的列数
      let new_table = []
      let new_tr = []
      let tr_index = 0 //新行标记是否换行显示
      let datas = this.tableData.rows
      datas.forEach((v, i) => {
        tr_index += 1
        if (!v.children) {
          //有子集内容
          new_tr.push({ txt: v.name })
          new_tr.push({ txt: v.value })
        }
        if (v.children) {
          let new_tr2 = []
          new_tr2.push({ txt: v.name })
          new_tr2.push({
            txt: '-',
            colspan: col * 2 - 1,
            children: v.children
          })
          new_table.push(new_tr2)
          tr_index = new_tr.length / 2
          if (i + 1 == datas.length) {
            new_table.push(new_tr)
          }
        } else {
          if (tr_index % col == 0) {
            new_table.push(new_tr)
            new_tr = []
          } else {
            if (v.children) {
              let new_tr2 = []
              new_tr2.push({ txt: v.name })
              new_tr2.push({ txt: '-', colspan: col * 2 - 1 })
              new_table.push(new_tr2)
            }
            if (i + 1 == datas.length) {
              new_table.push(new_tr)
            }
          }
        }
      })
      let last_array = new_table[new_table.length - 1] //最后一个
      if (last_array.length < col * 2) {
        last_array[last_array.length - 1].colspan =
          col * 2 - last_array.length + 1
      }
      this.tableData2 = new_table
    }
  }
}
</script>

<style lang="less" scoped>
.my_table {
  table-layout: fixed;
  width: 100%;
  text-align: center;
  font-size: 14px;
  border-collapse: collapse;
  td.td1 {
    border: 1px solid #d5d5d5;
    padding: 15px 8px;
    word-break: break-all;
  }
  td.td1:nth-child(odd) {
    background-color: #f9f9f9;
    width: 130px;
  }
  .children_table {
    width: 98%;
    margin: 0 auto;
    border-collapse: collapse;
    .th {
      background-color: #f9fdff;
    }
    td {
      border: 1px solid #d5d5d5;
      padding: 6px 4px;
    }
  }
  .jbxx {
    text-align: left;
    padding: 16px 0;
    width: 1199px;
    height: 37  px;
    border: 1px solid #d5d5d5;
    border-bottom: none;
  }
}
</style>

