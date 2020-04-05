<template>
  <div class="ItemInfo_content">
    <div class="content_header">
      <div class="tittle">人员信息</div>
    </div>
    <div class="content_body">
      <div style="margin-bottom:10px;">
        <el-form
          :inline="false"
          :model="formInline"
          size="medium"
          class="demo-form-inline"
          @submit.native.prevent
        >
          <div style="width:50%;float:left">
            <el-form-item label="人员名称" :style="{marginRight:'0px',marginBottom:'10px'}">
              <el-input
                v-model="formInline.name"
                placeholder="输入完整人员名称"
                style="width:70%"
                @keydown.enter.native="onSerch"
              ></el-input>
            </el-form-item>
          </div>
          <div style="width:50%;float:right">
            <el-form-item label="证书编号或注册证书号" :style="{marginRight:'0px',marginBottom:'10px'}">
              <el-input
                v-model="formInline.number"
                placeholder="输入至少六位证书编号或注册证书号"
                style="width:69%"
                @keydown.enter.native="onSerch"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div style="clear:both"></div>
        <el-form
          :inline="false"
          size="medium"
          :model="formInline"
          class="demo-form-inline"
          style="margin-bottom:10px;"
          @submit.native.prevent
        >
          <el-form-item label="所在单位">
            <el-input
              v-model="formInline.company"
              placeholder="输入所在单位名称"
              style="width:35%"
              @keydown.enter.native="onSerch"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          align="center"
          @submit.native.prevent
        >
          <el-button size="medium" type="primary" @click="onSerch">搜索</el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="tableLoading" border>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
          <template slot-scope="scope">
            <span
              style="color: #409eff;cursor:pointer"
              @click="openXqOne(scope.row)"
            >{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="certificate_type" label="证件类型" align="center"></el-table-column>
        <el-table-column prop="certificate_number" label="证件号" align="center"></el-table-column>
        <el-table-column prop="major" label="注册专业/专业/职称" align="center"></el-table-column>
        <el-table-column prop="certificate_level" label="证书级别/等级/岗位" align="center"></el-table-column>
        <el-table-column prop="valid_date" label="有效期" align="center">
          <template slot-scope="scope">
            <span :style="{color: !scope.row.expire?'red':'#000'}">{{scope.row.valid_date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="company" label="所在单位" align="center">
          <template slot-scope="scope">
            <span
              style="color: #409eff;cursor:pointer"
              @click="openXqTwo(scope.row)"
            >{{scope.row.company}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="total == 0" style="margin-top:20px;font-size:14px;">请输入搜索条件进行查询</div>
      <div v-if="total >0 && total<=20" style="margin-top:20px;font-size:14px;">
        共计找到符合条件的记录数：
        <span style="color: rgb(52, 139, 218);">{{total}}</span>条
      </div>
      <div v-if="total >20" style="margin-top:20px;font-size:14px;">
        共计找到符合条件的记录数：
        <span style="color: rgb(52, 139, 218);">{{total}}</span>条,请输入更多信息进行查询
      </div>
      <div v-if="total < 0" style="margin-top:20px;font-size:14px;">未能查询到相关结果,请输入其他信息进行查询</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      ry_from: {},
      tableData: [],
      formInline: {
        name: "",
        number: "",
        company: ""
      },
      tableLoading: false,
      total: 0,
      role: {}
    };
  },
  created () {
    this.fn_role();
    this.getLoc();
    document.title = "人员搜索";
  },
  watch: {
    $route: function (newVal) {
      window.location.reload();
    }
  },
  methods: {
    // 权限控制 点击公司名称时
    fn_role () {
      let self = this;
      self.axios.post(
        "/index/mine/role",
        {
          user_id: this.$store.state.userInfo.user_id,
          company_id: localStorage.getItem("company_id")
        },
        data => {
          this.role = data;
        }
      );
    },
    getLoc () {
      this.formInline = JSON.parse(
        localStorage.getItem("setRySearchValue")
          ? localStorage.getItem("setRySearchValue")
          : {
            name: "",
            number: "",
            company: ""
          }
      );
      this.getData();
    },
    getRyFrom (res) {
      this.ry_from = res;
    },
    getData () {
      this.tableLoading = true;
      this.axios.post(
        "/firm/people/searchPeople",
        {
          name: this.formInline.name,
          number: this.formInline.number,
          company: this.formInline.company
        },
        data => {
          this.tableData = data.rows;
          this.tableLoading = false;
          this.total = data.total;
        }
      );
    },
    onSerch () {
      if (
        this.formInline.name.length < 2 &&
        this.formInline.name.length > 0
        //  &&
        // this.formInline.number.length == 0 &&
        // this.formInline.company.length == 0
      ) {
        this.$message({
          message: "人员名称：请输入至少两个汉字进行查询",
          type: "error"
        });
        return;
      }
      if (this.formInline.number && this.formInline.number.length < 6) {
        this.$message({
          message: "请输入至少六位证书编号进行查询",
          type: "error"
        });
        return;
      }
      if (this.formInline.name == "" && this.formInline.number == "") {
        this.$message({
          message: "请完善人员搜索内容",
          type: "error"
        });
        return;
      }
      this.getData();
    },
    reset () {
      this.formInline = {};
      this.getData();
    },
    openXqOne (row) {
      let { href } = this.$router.resolve({
        path: `/ryDet?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&gs_id=${row.comp_base_id}&name=${
          row.name
          }&staff_base_id=${row.staff_base_id ? row.staff_base_id : ""}`
      });
      window.open(href, "人员详情" + row.comp_base_id + row.name);
    },
    openXqTwo (row) {
      if (this.role.company_role !== "C") {
        let { href } = this.$router.resolve({
          path: `/gsDetail?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&gs_id=${row.comp_base_id}&gsmc=${
            row.company
            }`
        });
        window.open(href, "公司详情" + row.comp_base_id);
      } else {
        this.axios.post('/index/mine/roleCompSource', { gs_id: comp_base_id }, res => {
          // 获取跳转页面结果
          //   console.log(res)
          if (res === '四川省建设厅') {
            let { href } = this.$router.resolve({
              path: `/gs_scjst?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&gs_id=${comp_base_id}`
            })
            window.open(href, '/gs_scjst' + comp_base_id)
          } else {
            let { href } = this.$router.resolve({
              path: `/gs_building?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&gs_id=${comp_base_id}`
            })
            window.open(href, '/gs_building' + comp_base_id)
          }
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.xmxx_class {
  margin-left: 50px;
  font-size: 14px;
}
.myrow {
  margin: 20px 0;
  display: flex;
}
.myrow > div:first-child {
  width: 120px;
}
.mycol_1 {
  flex: 1;
}
a:link {
  color: #409eff;
  text-decoration: none;
}

.ItemInfo_content {
  // 一级页面头部开始
  .content_header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .tittle {
      // line-height: 60px;
      line-height: 70px;
      -moz-box-shadow: 0px 0px 0px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      width: 100%;
      font-size: 32px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
  // 一级页面头部结束

  // 一级页面身体开始
  .content_body {
    width: 1200px;
    display: flex;
    margin: 0 auto;
    padding: 20px;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    // height: calc(~"100% - 60px");
    background: #fff;
    .body_header {
      background: #ffffff;
      margin-bottom: 20px;
      -moz-box-shadow: 0px 0px 5px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      .evryone {
        display: flex;
        flex-direction: row;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        .each {
          min-width: 150px;
          margin-left: 25px;
          height: 60px;
          justify-content: center;
          span {
            color: #606266;
          }
        }
        .each_button {
          width: 49%;
          height: 60px;
          text-align: right;
          padding-right: 25px;
        }
        .evryone_one {
          width: 125px;
          height: 60px;
          margin-left: 25px;
        }
        .evryone_two {
          height: 28px;
          display: flex;
          flex-direction: row;
          // width: 740px;
          // height: 20px;
          margin-top: 20px;
          font-size: 14px;
          color: #000000;
          .eachOne {
            position: relative;
            background-size: 100% 100%;
            width: 250px;
            line-height: 28px;
            height: 28px;
            text-align: center;
            z-index: 10;
          }
          .eachOne:nth-child(2) {
            left: -30px;
            z-index: 9;
          }
          .eachOne:nth-child(3) {
            left: -55px;
            z-index: 8;
          }

          .eachOne:nth-child(4) {
            left: -82px;
            z-index: 7;
          }
          .active {
            background-image: url("../assets/jd.png");
            background-repeat: no-repeat;
            background-size: cover;
            width: 250px;
            height: 28px;
            text-align: center;
            color: #ffffff;
          }
        }
      }
      .evryone:nth-child(3),
      .evryone:nth-child(2) {
        border: none;
      }
    }
    .body_content {
      background: #ffffff;
      // height: calc(~"100% - 270px");
      .item_zs {
        border: 1px #d5d5d5 solid;
        margin-top: 20px;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
          color: #348bda;
        }
        .itemInfo {
          overflow: hidden;
          .itemInfoLi {
            position: relative;
            .itemInfoLi_title {
              width: 560px;
              height: 32px;
              border-bottom: 1px #d5d5d5 solid;
              margin: auto;
              line-height: 32px;
            }
            .itemInfoLi_content {
              padding: 20px;
              .el-row {
                margin-top: 10px;
              }
              .content_left {
                font-size: 14px;
                color: #999;
                text-align: right;
              }
              .content_right {
                font-size: 14px;
              }
            }
            .itemInfoLi_footer {
              position: absolute;
              bottom: 10px;
              right: 20px;
              font-size: 13px;
            }
            width: 597px;
            height: 210px;
            border: 1px #d5d5d5 solid;
            float: left;
          }
        }
      }
      .information {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        .informatin_header {
          display: flex;
          margin-left: 25px;
          font-size: 20px;
          height: 70px;
          line-height: 70px;
        }
        .infromation_body {
          font-size: 14px;
          display: flex;
          flex-direction: row;
          margin-left: 50px;
          .each_left {
            display: flex;
            width: 100px;
            flex-direction: column;
            margin-right: 25px;
            .left_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
          }
          .each_right {
            display: flex;
            flex-direction: column;
            .right_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
            // .right_each_two {
            //   margin-bottom: 20px;
            //   color: #06b6ff;
            // }
            .right_botton {
              display: flex;
              flex-direction: row;
              color: #409eff;
              .button_left {
                display: flex;
                flex-direction: column;
                margin-right: 115px;
                .right_each_two {
                  cursor: pointer;
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
              }
              .button_right {
                border: 1px solid #9d9d9d;
                padding-left: 20px;
                padding-right: 80px;
                display: flex;
                flex-direction: column;
                align-content: center;
                display: flex;
                .right_each_two {
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
                .right_each_two:last-child {
                  margin-bottom: 0px;
                }
              }
            }
          }
        }
      }
      .table {
        display: flex;
        flex-direction: column;
        .table_header {
          font-size: 20px;
          margin: 25px;
        }
        .table_footer {
          margin: 25px;
          display: block;
        }
      }
    }
  }
}
</style>
<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
</style>
