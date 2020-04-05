<!--改变人员-->
<template>
  <div>
    <el-popover placement="top-start" title="选择人员" trigger="click" v-model="visible">
      <div style="display:flex;align-item:center">
        <el-select
          size="small"
          style="width:100px;margin-right:10px"
          v-model="ryVal"
          placeholder="请选择"
        >
          <el-option label value></el-option>
          <el-option v-for="(item,index) in ry_list[extraObj.type]" :key="index" :label="item.username" :value="item.id"></el-option>
        </el-select>
        <el-button
          type="success"
          icon="el-icon-check"
          circle
          size="small"
          @click="hiddePopover('yes')"
        ></el-button>
        <el-button size="small" type="danger" @click="hiddePopover()" icon="el-icon-close" circle></el-button>
      </div>
      <el-button v-if="ry" type="text" slot="reference">{{ry}}</el-button>
      <el-button v-else style="color:red" type="text" slot="reference">Empty</el-button>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: {
    ry_list:null,
    extraObj:null,
    row: null,
    ry: null
  },
  data() {
    return {
      visible: false,
      ryVal: ""
    };
  },
  methods: {
    hiddePopover(type) {
      if (type == "yes") {
        let username = this.ry_list[this.extraObj.type].filter(v=>v.id == this.ryVal);
        username = this.ryVal?username[0].username:'';
        this.$emit("onSelect", {username,ry_id:this.ryVal,gs_id:this.row.gs_id,...this.extraObj});
      }
      this.visible = false;
    }
  }
};
</script>

