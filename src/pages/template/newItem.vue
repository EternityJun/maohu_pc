<!--新建项目-->
<template>
    <div style="margin-right: 30px">
        <el-form :model="newItem" ref="newform" label-width="120px" @submit.native.prevent>
            <el-form-item label="项目名称" prop="xmmc">
                <el-input v-model="newItem.xmmc" placeholder="尽可能的写详细和精确"></el-input>
            </el-form-item>
            <el-form-item label="项目地区" prop="xmdq">
                <el-select v-model="newItem.xmdq" placeholder="请选择区域">
                    <el-option v-for="dq in xmdqArray" :key="dq.id" :label="dq.name" :value="dq.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型A" prop="xmlxA">
                <el-select v-model="newItem.xmlxA" placeholder="请选择区域">
                    <el-option v-for="xm in xmlxAArray" :key="xm.id" :label="xm.name" :value="xm.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型B" prop="xmlxB">
                <el-select v-model="newItem.xmlxB" collapse-tags multiple placeholder="请选择区域">
                    <el-option v-for="xm in xmlxBArray" :key="xm.id" :label="xm.name" :value="xm.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目阶段" prop="stage">
                <el-select v-model="newItem.stage" placeholder="请选择区域">
                    <el-option v-for="xm in stageArray" :key="xm.id" :label="xm.name" :value="xm.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目业主单位" prop="xmyzdw">
                <el-input v-model="newItem.xmyzdw" placeholder="尽可能的写详细和精确"></el-input>
            </el-form-item>
            <el-form-item label="项目所属人">
                <el-input disabled v-model="newItem.name"></el-input>
            </el-form-item>
            <el-form-item label-width='0'>
                <span style="font-size:16px;color:#333">项目要求</span>
            </el-form-item>
            <el-form-item label="资质要求" prop="zzyq">
                <el-input v-model="newItem.zzyq"></el-input>
            </el-form-item>
            <el-form-item label="人员要求" prop="ryyq">
                <el-input v-model="newItem.ryyq"></el-input>
            </el-form-item>
            <el-form-item label="业绩要求" prop="yjyq">
                <el-input v-model="newItem.yjyq"></el-input>
            </el-form-item>
            <el-form-item label="其它要求" prop="qtyq">
                <el-input v-model="newItem.qtyq"></el-input>
            </el-form-item>
            <el-form-item label-width="0" align="center">
                <el-button type="success" @click="onAddItem">添加</el-button>
                <el-button @click="onResetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      newItem: {
        xmmc: "",
        xmdq: "",
        xmlxA: "",
        xmlxB: "",
        stage: "",
        xmyzdw: "",
        name: localStorage.getItem("username"),
        zzyq: "",
        ryyq: "",
        yjyq: "",
        qtyq: "",
        user_id: this.$store.state.userInfo.user_id
      },
      xmdqArray: null,
      xmlxAArray: null,
      xmlxBArray: null,
      stageArray: null
    };
  },
  created() {
    this.axios.post("/Index/project/cate",{}, data => {
      this.xmdqArray = data.xmdq;
      this.xmlxAArray = data.xmlxA;
      this.xmlxBArray = data.xmlxB;
      this.stageArray = data.stage;
    });
  },
  methods: {
    //添加项目
    onAddItem() {
      this.$confirm("添加后不可更改,请确认添加信息。", "提示", {
        confirmButtonText: "已确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let loading = this.$loading();
        let obj = {
          ...this.newItem,
          id: "",
          zbgg: "",
          kzj: "",
          xmjgbm: "",
          jsnrjgm: "",
          xmtz: "",
          qt: "",
          ssr: "",
          flag: 1,
          category: 1,
          cate: "筑标",
          user_id: this.$store.state.userInfo.user_id
        };
        if (obj.xmlxB.length == 0) {
          obj.xmlxB = "";
        }
        this.axios.post("/Index/project/pro_save", obj, data => {
          if (data.status == "success") {
            loading.close();
            this.$message.success("添加成功");
            this.$refs["newform"].resetFields();
            this.$emit("onAddNewItem");
          } else {
            this.$message.error("添加失败");
          }
        });
      }).catch(()=>{});
    },
    //resetForm重置
    onResetForm() {
      this.$refs["newform"].resetFields();
    }
  }
};
</script>

