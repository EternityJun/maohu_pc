<template>
    <div class="ItemInfo_content">
        <div class="content_header">
            <div class="tittle">人员信息</div>
        </div>
        <div class="content_body">
            <ry-select-from v-on:rySelect="getRyFrom"></ry-select-from>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="address" label="证件类型">
                </el-table-column>
                <el-table-column prop="address" label="证件号">
                </el-table-column>
                <el-table-column prop="address" label="注册专业/专业/职称">
                </el-table-column>
                <el-table-column prop="address" label="证书级别/等级/岗位">
                </el-table-column>
                <el-table-column prop="address" label="有效期">
                </el-table-column>
                <el-table-column prop="address" label="所在单位">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import rySelectFrom from './template/rySelectFrom.vue'
export default {
  data() {
    return {
      ry_from: {},
      tableData:[], 
    }
  },
  components: {
    rySelectFrom
  },
  methods: {
    getRyFrom(res) {
      this.ry_from = res
      console.log(this.ry_from)
    }
  }
}
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
      padding: 14px 0;
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
    padding: 25px;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    // height: calc(~'100% - 60px');
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
            background-image: url('../assets/jd.png');
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
      // height: calc(~'100% - 270px');
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
