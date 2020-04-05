<template>
  <div id="lookMe">
    <span v-if="!array">请提高您的
      <span class="link_color" @click="toYwq">业务圈</span>
    </span>
    <span v-else>
      <!-- <span v-if="key" class="lookFor" @click="LookMe()">找到我</span> -->
      <span v-if="showTxt">
        <el-tooltip v-for="(item, index) in array" :key="index" :content="String(item.name)" placement="top-end" effect="light">
          <span>
            <el-button class="lookForImg" size="mini" circle style="margin:0 10px;" @click="tkShow?getshort(0):''">
              <img :src="item.avatar" @click="openCard(item)" alt />
            </el-button>
            <i v-if="index<array.length-1" class="el-icon-arrow-right"></i>
          </span>
        </el-tooltip>
      </span>
      <span v-else class="myFlexBox1">
        <el-tooltip v-for="(item, index) in array" :key="index" :content="String(item.name)" placement="top-end" effect="light">
          <span class="myFlexBox1">
            <span v-if="index!=0&&item.cate=='互换资源的人'" class="el-icon-back" style="margin:23px -2px 0 0 ;"> </span>
            <span v-if="index!=0" class="myRight">{{item.cate}}</span>
            <span v-if="index!=0" class="el-icon-right" style="margin:24px 0 0 -2px;"> </span>
            <span style="display:inline-block;width:30px;height:30px;border:1px solid #999;border-radius:50%;margin:0 10px;">
              <img :src="item.avatar" @click="openCard(item)" v-if="item.avatar" style="height:100%;width:100%;border-radius:50%" alt />
            </span>
          </span>
        </el-tooltip>
      </span>
    </span>
    <el-dialog title="路径信息" :visible.sync="dialogVisible" width="40" min-width='400px' append-to-body>
      <el-container v-loading='loading' style="margin:0">
        <el-main>
          <div style="width:80%;margin:-15px auto 0">
            <p>推荐路径</p>
            <div class="myFlexBox1" style="margin:10px 0 0 20px;">
              <el-tooltip v-for="(item, index) in recommendedArray[0]" :key="index" :content="String(item.name)" placement="top-end" effect="light">
                <!-- <span class="myFlexBox1">
            <span v-if="index!=0" :class="item.cate=='互换资源的人'?'el-icon-back':''">{{item.cate}}</span>
              <span><i v-if="index!=0"  class="el-icon-right"></i></span>
            <img :src="item.avatar" v-if="item.avatar" style="height:30px;width:30px;border-radius:50%;margin:0 10px;"  alt   />
            </span> -->
                <span class="myFlexBox1">
                  <span v-if="index!=0&&item.cate=='互换资源的人'" class="el-icon-back" style="margin:23px -2px 0 0 ;"> </span>
                  <span v-if="index!=0" class="myRight ">{{item.cate}}</span>
                  <span v-if="index!=0" class="el-icon-right" style="margin:24px 0 0 -2px;"> </span>
                  <span style="display:inline-block;width:30px;height:30px;border:1px solid #999;border-radius:50%;margin:0 10px;">
                    <img :src="item.avatar" v-if="item.avatar" @click="openCard(item)" style="height:30px;width:30px;border-radius:50%;" alt />
                  </span>
                </span>
              </el-tooltip>
            </div>
          </div>
          <div style="width:80%;margin:20px auto 0">
            <span>其他路径</span>
            <el-row>
              <div style="margin:10px 0 0 20px;" v-for="(item1, index1) in allArray1" :key="index1">
                <div style="margin:5px 0 5px 0 " class="myFlexBox" @click="changeTJ(item1,index1)">
                  <div class="myFlexBox1">
                    <el-tooltip v-for="(item, index) in item1" :key="index" :content="String(item.name)" placement="top-end" effect="light">
                      <span class="myFlexBox1">
                        <span style="display:inline-block;width:30px;height:30px;border:1px solid #999;border-radius:50%;margin:0 10px;" :class="item.cate!='我'&item.click==1&item.id_type=='user' ? 'link_ava':''" @click="openCard(item)">
                          <img :src="item.avatar" style="height:30px;width:30px;border-radius:50%;" alt />
                        </span>
                        <span v-if="index<item1.length-1">
                          <i class="el-icon-right"></i>
                        </span>
                      </span>
                    </el-tooltip>
                  </div>
                  <span v-if="myIndex == index1" style="font-size:25px;color:#08BB06;font-weight:900;" class="el-icon-check"></span>
                </div>
              </div>
            </el-row>
          </div>
        </el-main>
      </el-container>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="个人信息" :visible.sync="cardDia" width="450px" append-to-body>
      <div style="display:flex;justify-content: space-between;align-items: center;margin:0 auto;width:350px;">
        <div><img :src="cardAva" style="height:100px;width:100px;border-radius:50%;margin:0 10px;" alt=""></div>
        <div style="width:200px;font-size:16px;">
          <p style="margin-bottom:30px;">姓名：{{cardName}}</p>
          <p>联系方式：{{cardPhone}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cardDia = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'lookMe',
  props: [
    'arr', //data
    'refresh', //不晓得
    'off', //默认显示 找到我    true 点击找到我后的效果
    'tkShow', //头像的点击事件  默认没有点击事件     true   有
    'showTxt' //显示找到我中间的文字  默认是显示   true  不显示
  ],
  data() {
    return {
      key: true,
      array: [],
      path: [],
      allArray: [],
      loading: true,
      allArray1: [],
      recommendedArray: [],
      dialogVisible: false,
      myIndex: 0,
      cardDia: false,
      cardAva: '',
      cardName: '',
      cardPhone: ''
    }
  },
  // watch:{
  //   dialogVisible(val){
  //     console.log(val)
  //     if(dialogVisible != val){
  //       this.myIndex = 0
  //     }
  //   }
  // },
  created() {
    if (typeof this.arr === 'object') {
      this.array = this.arr.path
    } else {
      this.array = []
    }

    if (this.refresh) {
      if (this.refresh !== false) {
        this.refresh = true
      }
    }
    if (this.off) {
      this.key = false
    }
  },
  methods: {
    changeTJ(it, index) {
      this.myIndex = index
      this.allArray1.slice(index, index + 1)
      this.recommendedArray = []
      this.recommendedArray.push(it)
    },
    getshort(index) {
      this.dialogVisible = true
      this.loading = true
      let path = JSON.stringify(this.arr.paths)
      let obj = {
        path: path,
        gs_id: this.arr.id
      }
      this.axios.post('/firm/firm_search/getshort', obj, data => {
        this.allArray = data.rows
        this.allArray1 = JSON.parse(JSON.stringify(this.allArray))
        this.myIndex = 0
        this.recommendedArray = this.allArray1.slice(index, index + 1)
        this.loading = false
      })
    },
    // 找到我 按钮
    LookMe() {
      this.key = false
    },
    toYwq() {
      // if(this.$route.query.login_service_id){
      //     let { href } = this.$router.resolve({
      //    path: `/enterpriseCircle?login_service_id=${this.$route.query.login_service_id}&gsmc=${this.$route.query.gsmc}`
      //   });
      //   window.open(href,this.$route.query.gsmc);
      // }else{
      let { href } = this.$router.resolve({
        path: `/personalCircle`
      })
      window.open(href, 'personalCircle')
      // }
    },
    openCard(item) {
      // console.log(item)
      if ((item.cate != '我') & (item.click == 1) & (item.id_type == 'user')) {
        this.cardDia = true
        this.cardAva = item.avatar
        this.cardName = item.name
        this.cardPhone = item.cellphone
      }
    }
  },
  watch: {
    refresh: function(a, b) {
      this.key = true
    },
    arr: function() {
      if (typeof this.arr === 'object') {
        this.array = this.arr.path
      } else {
        this.array = []
      }
    }
  }
}
</script>
<style lang="less" >
#lookMe {
  .el-button {
    padding: 0;
  }
  .lookFor {
    cursor: pointer;
    color: #409eff;
  }
  .link_color {
    color: #409eff;
    cursor: pointer;
  }
  .lookForImg {
    vertical-align: middle;
    height: 30px;
    width: 30px;
    padding: 0;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.myFlexBox {
  display: flex;
  align-items: center;
  // justify-content:center;
  justify-content: space-between;
}
.myFlexBox1 {
  display: flex;
  // justify-content:center;
  align-items: center;
}
.myFlexBox:hover {
  background: rgb(233, 230, 230);
  // background: rgb(162, 212, 174)
}
.myRight {
  border-bottom: 1px solid #818386;
  height: 23px;
  line-height: 23px;
}
.link_ava {
  cursor: pointer;
}
</style>
