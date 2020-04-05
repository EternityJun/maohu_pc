<template>
  <div id="searchQyTemplate">
    <div>
      <el-form
        class="demo-form-inline"
        :model="form"
        :size="options.size"
        label-width="126px"
        @submit.native.prevent
      >
        <el-row>
          <el-col :span="12" style="flex-direction:column;">
            <!-- <div style="width:100%">
              <el-form-item label="企业名称">
                <el-input
                  placeholder="输入企业名称或关键词"
                  @keyup.enter.native="onSubmit(7)"
                  v-model="form.gsmc"
                  style="min-width:195px;max-width:70%"
                  :class="[options.size=='medium' ?  'input_w': '']"
                >
                  <i slot="suffix" class="el-input__icon el-icon-circle-plus-outline" @click.stop="handleClickPlus"></i>
                </el-input>
              </el-form-item>
            </div>-->
            <div style="width:100%;display: flex;">
              <div class="label_p">
                <label class="left_label">企业名称</label>
              </div>
              <el-input
                placeholder="输入企业名称或关键词"
                @keyup.enter.native="onSubmit(7)"
                :size="options.size"
                v-model="form.gsmc"
                style="min-width:195px;max-width:70%"
                :class="[options.size=='medium' ?  'input_w': '']"
              >
                <i
                  v-if="form.checked"
                  slot="suffix"
                  class="el-input__icon el-icon-circle-plus-outline"
                  @click.stop="handleClickPlus"
                ></i>
                <template slot="append">
                  <span
                    :class="['highSearch', form.checked ? 'active' : '']"
                    @click.stop="handleHighSearch"
                  >高级查询</span>
                </template>
              </el-input>
            </div>
            <div v-if="form.checked" class="tag-class">
              <el-tag
                style="margin-right:5px;margin-bottom:5px;"
                v-for="(item, index) in form.gsKey"
                :key="index"
                closable
                size="small"
                @close="handleCloseTag(index)"
              >{{item}}</el-tag>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="width:100%">
              <el-form-item label="统一社会信用代码">
                <el-input
                  placeholder="输入统一社会信用代码"
                  @keyup.enter.native="onSubmit(6)"
                  v-model="form.xydm"
                  style="width:90%"
                  :class="[options.size=='medium' ?  'input_w': '']"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="label_p">
              <label class="left_label">证书编号</label>
            </div>
            <el-input
              placeholder="输入企业证书号"
              :size="options.size"
              @keyup.enter.native="onSubmit(5)"
              v-model="form.zsbh"
              style="min-width:195px;max-width:70%"
              :class="[options.size=='medium' ?  'input_w': '']"
            ></el-input>
          </el-col>
          <el-col :span="12">
            <div style="width:100%">
              <el-form-item label="法定代表人">
                <el-input
                  placeholder="输入法定代表人(全名)"
                  @keyup.enter.native="onSubmit(4)"
                  v-model="form.fr"
                  style="width:90%"
                  :class="[options.size=='medium' ?  'input_w': '']"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="label_p">
              <label class="left_label">企业类型</label>
            </div>
            <el-select
              @change="onSubmit(3)"
              style="max-width:70%"
              :size="options.size"
              clearable
              v-model="form.qylx"
              placeholder="选择企业类型"
              :class="[options.size=='medium' ?  'input_w': '']"
            >
              <el-option v-for="(item,index) in qylx" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <div style="width:100%">
              <el-form-item label="选择企业注册属地">
                <el-cascader
                clearable
                  @change="onSubmit(2)"
                  v-model="form.zcsd"
                  :options="zcsd"
                  style="width: 90%;"
                  :class="[options.size=='medium' ?  'input_w': '']"
                ></el-cascader>
                <!-- <el-select clearable v-model="form.zcsd" placeholder="企业注册属地" :class="[options.size=='medium' ?  'input_w': '']">
                                    <el-option v-for="(item,index) in zcsd" :key="index" :label="item" :value="item">
                                    </el-option>
                </el-select>-->
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div class="btns">
            <el-form-item label-width="0">
              <el-button type="primary" @click="onSubmit(1)">搜索</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </div>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
 <script>
export default {
  props: ["options"],
  data() {
    return {
      form: {
        gsmc: "",
        gsKey: [],
        xydm: "",
        zsbh: "",
        fr: "",
        qylx: "",
        zcsd: [],
        checked: false
      },
      qylx: [],
      zcsd: []
    };
  },
  created() {
    this.getAreaType("企业类型");
    // this.getAreaType("企业地区");
    this.getProvCate();
  },
  mounted() {
    if (this.options.searchQy) {
      // this.form = this.options.searchQy;
      let {
        gsmc,
        gsKey,
        xydm,
        zsbh,
        fr,
        qylx,
        zcsd,
        checked
      } = this.options.searchQy;
      gsmc = gsmc || "";
      gsKey = gsKey || [];
      xydm = xydm || "";
      zsbh = zsbh || "";
      fr = fr || "";
      qylx = qylx || "";
      zcsd = zcsd || [];
      checked = checked || false;
      this.form = {
        gsmc,
        gsKey,
        xydm,
        zsbh,
        fr,
        qylx,
        zcsd,
        checked
      };
    }
  },
  methods: {
    getProvCate(type) {
      this.axios.post("/firm/firm_search_nation/getApanage", {}, data => {
        if (data.status === "success") {
          data.rows.unshift({
            label: "全不限制",
            value: "全不限制",
            children: [
              {
                label: "全不限制",
                value: "全不限制-全不限制",
                children: [
                  {
                    label: "全不限制",
                    value: "全不限制-全不限制-全不限制"
                  }
                ]
              }
            ]
          });
          this.zcsd = data.rows;
          let province=localStorage.getItem('local_province')
          this.form.zcsd=[province, `${province}-全部`,`${province}-全部-不限制`]
          localStorage.setItem("searchQy", JSON.stringify(this.form));
        }
      });
    },
    getAreaType(type) {
      this.axios.post("/firm/firm_search/getAreaType", { type: type }, data => {
        if (type == "企业类型") {
          this.qylx = data;
        } else if (type == "企业地区") {
          // this.zcsd = data
          // this.zcsd[1].children[0].value = '四川省不限制'
          // this.zcsd[2].children[0].value = '入川不限制'
        }
      });
    },
    // 点击高级搜索
    handleHighSearch() {
      this.form.checked = !this.form.checked;
    },
    // 企业名称输入框 点击+号 添加关键词
    handleClickPlus() {
      if (this.form.gsKey.length === 5) {
        this.$message({
          message: "已达最多五个关键词",
          type: "warning"
        });
        return;
      }
      if (!this.form.gsmc.trim()) {
        this.$message({
          message: "不能添加空关键词",
          type: "warning"
        });
        return;
      }
      if (this.form.gsKey.some(v => v === this.form.gsmc)) {
        this.$message({
          message: "不能输入相同的关键词",
          type: "warning"
        });
        return;
      }
      this.form.gsKey.push(this.form.gsmc.trim());
      this.form.gsmc = "";
      this.onSubmit();
    },
    // 点击某个标签 删除
    handleCloseTag(index) {
      this.form.gsKey.splice(index, 1);
      let hash = window.location.hash.split("?")[0];
      console.log(hash, "hash");
      if (hash == "#/searchQy") {
        this.onSubmit("tagClose");
      }
    },
    onSubmit(type) {
      // console.log(this.form.zcsd)
      let form = JSON.parse(JSON.stringify(this.form));
      let hash = window.location.hash;
      // console.log(window.location,type)
      // let count=false;
      // for (const key in form) {
      //     if(form[key].length>0){
      //         count=true
      //     }
      // }
      // 企业名称 点击回车 添加关键词
      if (type == 7 && this.form.checked) {
        this.handleClickPlus();
        return;
      }

      if (
        (hash == "#/bid" || hash == "#/browser" || hash == "#/personal") &&
        (type == 2 || type == 3)
      )
        return;

      // 删除关键词重新请求 关键词为空时也可以请求
      // if (type !== 'tagClose' && form.checked && !(form.gsKey.length > 0 || form.xydm || form.zsbh || form.fr)) {
      //   this.$message.error("请完善企业搜索内容");
      //   return;
      // }
      if (
        form.checked &&
        !(form.gsKey.length > 0 || form.xydm || form.zsbh || form.fr)
      ) {
        this.$message.error("请完善企业搜索内容");
        return;
      }
      if (!form.checked && !(form.gsmc || form.xydm || form.zsbh || form.fr)) {
        this.$message.error("请完善企业搜索内容");
        return;
      }
      // console.log(this.form, 'for')
      // if (form.zcsd != undefined) {

      //   if (form.zcsd.length > 0) {
      //     if (form.zcsd[0] == "入川企业") {
      //       form.is_rc = "是";
      //     } else if (form.zcsd[0] == "四川省") {
      //       form.is_rc = "否";
      //     } else {
      //       form.is_rc = "";
      //     }
      //     //   ;(form.is_rc = form.zcsd[0] == '入川企业' ? '是' : '否'),
      //     form.area =
      //       form.zcsd[1] != "不限制" &&
      //       form.zcsd[1] != "四川省不限制" &&
      //       form.zcsd[1] != "入川不限制"
      //         ? form.zcsd[1]
      //         : " ";
      //   } else {
      //     form.is_rc = "";
      //   }
      // } else {
      //   form.is_rc = "";
      // }
      if (form.fr && form.fr.length == 1) {
        this.$message.error("法定代表人请输入全名");
        return;
      }
      if (form.qylx) {
        form.qylx = form.qylx == "不限制" ? "" : form.qylx;
      }
      localStorage.setItem("searchQy", JSON.stringify(form));
      // this.$store.commit("setGsSearchValue", { gs: form });
      this.$emit("onSearch", { url: "/searchQy", form: form });
    },
    reset() {
      //   console.log('reset-----')
      this.form = {
        gsmc: "",
        gsKey: [],
        checked: false,
        xydm: "",
        zsbh: "",
        fr: "",
        qylx: "",
        zcsd: []
      };

      localStorage.setItem("searchQy", JSON.stringify(this.form));
      // this.$store.commit("setGsSearchValue", { gs:this.form});
      this.$emit("onReset");
    }
  }
};
</script>
 <style lang="less" scoped>
.el-form-item {
  margin-bottom: 10px;
  // margin-bottom: 30px;
}
#searchQyTemplate {
  border-radius: 3px;
  padding-top: 20px;
  // .input_w {
  //     width: 514px;
  // }
  form {
    .el-col {
      display: flex;
      .tag-class {
        // width: 57px;
        // margin-right: 12px;
        margin-left: 69px;
        padding-top: 5px;
        display: flex;
        flex-wrap: wrap;
        min-width: 195px;
        max-width: 70%;
      }
      .label_p {
        display: flex;
        align-items: center;
      }
      .left_label {
        text-align: right;
        width: 57px;
        margin-right: 12px;
        vertical-align: middle;
      }
      .right_label {
        width: 125px;
      }
      label {
        font-size: 14px;
        color: #606266;
      }
      .el-input,
      .el-select {
        flex: 1;
      }
    }
  }

  .btns {
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
  }
}
.highSearch {
  cursor: pointer;
}
.highSearch.active {
  color: #45acf4;
}
</style>
 