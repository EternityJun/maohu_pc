<!--  -->
<template>
  <div class="qyGkxx">
    <el-table :data="pubList.data" v-loading="pubList.loading" style="width: 100%">
      <el-table-column label="序号" align="center" type="index" width="60">
        <template slot-scope="scope">{{(scope.$index+1)+(pubList.page-1)*10}}</template>
      </el-table-column>
      <el-table-column label="项目名称" align="center" prop="xmmc" min-width="280">
        <template slot-scope="scope">
          <p v-if="!scope.row.state">{{ scope.row.xmmc }}</p>
          <el-input
            placeholder="请输入"
            type="textarea"
            clearable
            v-if="scope.row.state"
            v-model="scope.row.xmmc"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="xmdq" clearable align="center" label="项目地区" min-width="180">
        <template slot-scope="scope">
          <p v-if="!scope.row.state">{{ scope.row.xmdq }}</p>
          <el-cascader
            v-if="scope.row.state"
            :options="xmdqList"
            @change="changeListData"
            placeholder="请选择"
            style="width:100%"
            v-model="scope.row.xmdq"
            clearable
          ></el-cascader>
        </template>
      </el-table-column>
      <el-table-column prop="xmyz" align="center" label="项目业主" min-width="180">
        <template slot-scope="scope">
          <p v-if="!scope.row.state">{{ scope.row.xmyz }}</p>
          <el-input v-if="scope.row.state" placeholder="请输入" clearable v-model="scope.row.xmyz"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="created" align="center" label="上传时间" min-width="100">
        <template slot-scope="scope">
          <p>{{scope.row.created}}</p>
        </template>
      </el-table-column>
      <el-table-column label="详细内容" align="center" min-width="180">
        <el-table-column prop="txt" align="center" label="文本" min-width="50">
          <template slot-scope="scope">
            <p v-if="!scope.row.state">
              <span
                v-if="scope.row.txt"
                :class="scope.row.txt?' pointer_finish1':'pointer1'"
                @click="scope.row.txt?dialogVisibleTxtInput=true:'';getTxtData1(scope.row)"
              >文本</span>
            </p>
            <p v-if="scope.row.state">
              <span
                :class="dialogVisibleInputColor===true?' pointer_finish1':'pointer1'"
                @click=" dialogVisibleInput = true;getTxtData(scope.row)"
              >{{ scope.row.txt1 }}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="txt" align="center" label="关联" min-width="100">
          <template slot-scope="scope">
            <p v-if="!scope.row.state">
              <span
                v-if="scope.row.zbxx_id"
                :class="scope.row.zbxx_id?' pointer_finish1':'pointer1'"
                @click="openToNbUrl(scope.row)"
              >本地</span>
              <span
                v-if="scope.row.url"
                :class="scope.row.url?' pointer_finish1':'pointer1'"
                @click="openToWbUrl(scope.row)"
              >外部</span>
            </p>
            <p v-if="scope.row.state">
              <span
                :class="dialogVisibleInput2Color===true?' pointer_finish1':'pointer1'"
                @click="dialogVisibleInput2=true;getUrlData(scope.row)"
              >{{ scope.row.txt2 }}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="txt" align="center" label="文件" min-width="50">
          <template slot-scope="scope">
            <p v-if="!scope.row.state">
              <span
                :class="scope.row.file?' pointer_finish1':'pointer1'"
                @click="scope.row.edit == 1?dialogVisibleUpdata=true:'';getFileData(scope.row,1)"
              >附件</span>
            </p>
            <p v-if="scope.row.state">
              <span
                :class="dialogVisibleUpdataColor===true?' pointer_finish1':'pointer1'"
                @click="dialogVisibleUpdata=true;getFileData(scope.row)"
              >{{ scope.row.txt3 }}</span>
            </p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="scr" align="center" label="上传人" min-width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:30px;width:30px;border-radius:15px;" alt />
        </template>
      </el-table-column>
      <el-table-column label="操作 " align="center" min-width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-if="scope.row.state"
            @click="saveGkxxData(scope.row)"
          >保存</el-button>
          <el-button size="mini" v-if="scope.row.state" @click="cancelSaveData(scope.row)">取消</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="dialogVisibleUpDataGkxx = true ;upDataGkxx(scope.row);"
            v-if="scope.row.edit == 1"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delateGkxx(scope.row)"
            v-if="scope.row.edit == 1"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChangeGkxx"
      :current-page="pubList.page"
      :page-size="pubList.rows"
      layout="total, prev, pager, next"
      :total="pubList.count||0"
    ></el-pagination>
    <div id="add">
      <span
        style="color:#33cc33;font-size:60px;margin-bottom:20px"
        @click="addTableRow"
        class="el-icon-circle-plus"
      ></span>
    </div>



    <!-- 文本编辑对话框 -->
    <el-dialog title="详细内容" :close-on-click-modal="BooleanData" :visible.sync="dialogVisibleInput">
      <div style="margin-top:-30px">
        <el-input
          type="textarea"
          clearable
          v-model="fujianTxt"
          :autosize="{ minRows:25,maxRows:25}"
          placeholder="请输入"
          show-word-limit
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleInput = false">取 消</el-button>
        <el-button type="primary" @click="dialogClickOver(1) ">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="详细内容" :visible.sync="dialogVisibleTxtInput">
      <p
        style="margin:-30px auto 0;overflow:auto;height:500px;padding:5px 15px;border:1px solid #dcdfe6;border-radius:5px;"
        v-html="shoufujianTxt"
      >{{shoufujianTxt}}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleTxtInput = false">关闭</el-button>
      </div>
    </el-dialog>



    <!-- 链接编辑对话框 -->
    <el-dialog :close-on-click-modal="BooleanData" :visible.sync="dialogVisibleInput2" width="90%">
      <div   style="margin-top:-30px">
        <h3 style="margin:10px;">
          网络连接关联
          <span style="font-size:12px">(输入url)</span>
        </h3>
        <div style="width:100%;panding:0 20px">
          <el-input placeholder="请输入内容" clearable v-model="GkxxUrl"></el-input>
        </div>

        <div style="width:100%;text-align:center;margin-top:10px">
          <el-button type="primary" @click="openWbUrl()">访问</el-button>
        </div>
      </div>
      <div >
        <h3 style="margin:10px;">本地连接关联</h3>
      </div>
       <qyProjectTable v-if="dialogVisibleInput2" ref="qyProjectTable" @getGuanLianData='getGuanLianData' :qyProjectRowData='qyProjectRowData'></qyProjectTable>
      <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="dialogClickOver(2) ">确 定</el-button>
        <el-button @click="dialogVisibleInput2 = false">取 消</el-button>
      </div>
    </el-dialog>


    
    <!-- 文件上传对话框 -->
    <el-dialog title="上传附件" :visible.sync="dialogVisibleUpdata">
      <el-form ref="tableXmForm" label-width="120px" @submit.native.prevent   style="margin-top:-30px"> 
        <el-form-item label="招标文件附件">
          <el-upload
            class="upload-demo"
            :action="updateUrl"
            :data="updateData"
            :limit="3"
            :on-success="handleChange_zbwj"
            :on-remove="uploadRemove_zbwj"
            :file-list="fileList.zbwj"
            :on-preview="openFile"
          >
            <el-button size="small" @click="dialogVisibleUpdataColor=true" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <div style="width:100%;text-align:center">
          <el-button v-if="this.upDataFile.num" size="small" @click="upFlie" type="primary">修改</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 下拉 弹框  选择分析人 -->

    <!-- 修改公开信息 -->
    <el-dialog :close-on-click-modal="BooleanData" :visible.sync="dialogVisibleUpDataGkxx" width="80%">
      <el-tabs v-model="activeName2"   style="margin-top:-30px">
        <el-tab-pane label="基本信息" name="first">
          <el-form ref="form" :model="upDataForm" label-width="100px">
            <el-form-item label="项目名称">
              <el-input v-model="upDataForm.xmmc" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="项目地区">
              <el-cascader
                :options="xmdqList"
                @change="changeListData"
                style="width:100%"
                v-model="upDataForm.xmdqList"
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item label="项目业主">
              <el-input v-model="upDataForm.xmyz" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="外部链接(url)">
              <el-input v-model="upDataForm.wbUrl" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="文本">
              <el-input
                type="textarea"
                clearable
                v-model="upDataForm.txt"
                :autosize="{ minRows: 15,maxRows:15}"
                placeholder="请输入"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="关联" name="second">
          <qyProjectTable v-if="activeName2 == 'second'" ref="qyProjectTable"  @getGuanLianData='getGuanLianData' :qyProjectRowData='qyProjectRowData'></qyProjectTable>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <div style="width:100%;text-align:center">
          <el-button type="primary" @click="sureUpDataGkxx()">修 改</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qyProjectTable from './qyProjectTable.vue';
export default {
  components:{
    qyProjectTable
  },
  name: "qyGkxx",
  data() {
    return {
      addTableRowState:true,//点击加号  的状态
         BooleanData:false,
         activeName2: "first",//修改公开信息弹框
      dialogVisibleUpDataGkxx: false,
      dialogVisibleTxtInput: false,
      dialogVisibleInput: false,
      dialogVisibleInput2: false,
      dialogVisibleUpdata: false,
      dialogVisibleInputColor: false,
      dialogVisibleInput2Color: false,
      dialogVisibleUpdataColor: false,
        xmdqList: [],
      zzyqList: [],
      loading: false,
     
      tablaData: [],
      updateUrl:
        "https://wechat.cdzjkl.com/index/Human_Review/uploadFile",
      // "https://test.cdzjkl.com/index/Human_Review/uploadFile",
      updateData: {
        token: localStorage.getItem("token"),
        login_company_id: localStorage.getItem("company_id"),
        login_user_id: localStorage.getItem("user_id")
      },
      fujianTxt: "",
      GkxxUrl: "",
      gkxxFile: "",
      gkxxFileTime: "",
      zbxx_id: "",
      zbxx_bt: "",
      shoufujianTxt: "",
      path: [],
      path2: [],
      activeBtn: "headerBtn headerColor",
      normalBtn: "headerBtn",
      activeName: "first",
      activeName1: "first",
        fileList: {
        zbwj: []
      },
      total:0,
      ssdqList:[],
        searchData: {
        xmmc: "",
        zblb: "",
        xmlb: "",
        area: "",
        date: "",
        page: 1,
        rows: 10
      },
       pubList: {
        data: [],
        page: 1,
        loading: true,
        rows: 10,
        count: 0
      },
       upaData: {//搜索
        qtyq: "",
        ryyq: "",
        xmdq: "",
        xmmc: "",
        xmyzdw: "",
        yjyq: "",
        xmdqList: [],
        zzyq: [],
        zzyq_str:''
      },
       upDataForm: {//修改
        // zbwj:[],
        xmmc: "",
        xmdq: "",
        xmdqList: [],
        xmyz: "",
        txt: "",
        // filename:"",
        // filename_time:"",
        wbUrl: "",
        bdText: "",
        // zbxx_bt: "",
        // zbxx_id: "",
        id: ""
      },
      time: "",
      tableXmForm: {},
      upDataFile: {},
      myFile: {},
      role:{},
      // qyProjectTableState:false, // 首次点击 不执行  子组件 重置 的事件
       qyProjectRowData:{},//当前点击的
    };
  },
  props:['myForm','my_pro_type','basicInfo'],
  created(){
    this.fn_role()
    this.getProvinceCity()
    this.getPubList()
  },
  methods:{
    getGuanLianData(val){//拿到关联的id
      // this.upDataForm.zbxx_id = val.zbxx_id;
      // this.upDataForm.zbxx_bt = val.zbxx_bt;
      this.zbxx_id = val.zbxx_id;
      this.zbxx_bt = val.zbxx_bt;
    },
    getProvinceCity () {
      this.axios.post("/index/common/getProvinceCity", {}, data => {
        this.xmdqList = data;
      });
    },
    format_Change (fileList) {
      let item = {
        name: fileList.response.data.filename,
        filename_time: fileList.response.data.filename_time
      };

      if (!this.upDataFile.num) {
        this.pubList.data[0].file = fileList.response.data.filename_time;
      }
      // this.dialogVisibleUpdata = false
      this.myFile = item;
      // this.pubList.data[0].file = fileList.response.data.filename_time
      this.gkxxFileTime = fileList.response.data.filename_time;
      this.time = fileList.response.data.filename_time;
      return item;
    },
    handleChange_zbwj (file, fileList) {
      this.fileList.zbwj = [];
      this.fileList.zbwj.push(this.format_Change(fileList));
    },
    uploadRemove_zbwj (file, fileList) {
      let obj = {
        id: this.upDataFile.id,
        jbxx_id: this.$route.query.jbxx_id,
        user_id: localStorage.getItem("user_id"),
        // xmmc:this.upDataFile.xmmc,
        type: 2,
        file_del: this.upDataFile.file_time?this.upDataFile.file_time:file.filename_time
      };
      this.axios.post("/relation/pro_details/editPub", obj, data => {
        this.$message({
          message: "删除成功",
          type: "danger"
        });
        this.gkxxFileTime = "";
        this.dialogVisibleUpdataColor = false;
        this.tableXmForm.del_zbwj =
          this.tableXmForm.del_zbwj + file.filename_time + ",";
        this.fileList.zbwj = fileList;
        // this.getPubList();
      });
    },
    upFlie () {
      let obj = {
        id: this.upDataFile.id,
        jbxx_id: this.$route.query.jbxx_id,
        user_id: localStorage.getItem("user_id"),
        file: this.gkxxFileTime,
        type: 2,
        xmmc: this.thisRowDataFile.xmmc,
        xmyz: this.thisRowDataFile.xmyz,
        xmdq: this.thisRowDataFile.xmdq,
        txt: this.thisRowDataFile.txt,
        url: this.thisRowDataFile.url,
        zbxx_id: this.thisRowDataFile.zbxx_id,
        zbxx_bt: this.thisRowDataFile.zbxx_bt
      };
      this.axios.post("/relation/pro_details/editPub", obj, data => {
        this.addTableRowState = true;
        this.dialogVisibleUpdata = false;
        this.getPubList();
      });
    },
    openFile (file) {
      window.open(
        this.gkxxFileTime
      );
    },
    onReset () {
        this.searchData.page = 1;
        this.total = 0;
        this.$refs.form1.resetFields();
        this.$refs.form2.resetFields();
        // this.ajax_list();
      },
      handleCurrentChangeGkxx (val) {
      this.pubList.loading = true;
      this.pubList.page = val;
      this.getPubList();
    },
    delateGkxx (row) {
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.pubList.loading = true;
          let obj = {
            jbxx_id: this.myForm.jbxx_id,
            user_id: localStorage.getItem('user_id'),
            id: row.id,
            type: 3
          };
          this.axios.post("/relation/pro_details/editPub", obj, data => {
            if (this.pubList.data.length == 1) {
              if (this.pubList.page > 1) {
                this.pubList.page = this.pubList.page - 1;
              } else {
                this.pubList.page = 1;
              }
            }
            this.addTableRowState = true;
            this.getPubList();
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },
    upDataGkxx (row) {
      this.qyProjectRowData=row
      this.upDataForm.xmdqList = []
      if (row.xmdq) {
        let arr = row.xmdq.split("/");
        for (let i = 0; i < arr.length; i++) {
          this.upDataForm.xmdqList.push(arr[i]);
        }
      }
      this.thisRowDataFile = row;
      this.upDataForm.txt = row.txt;
      // this.upDataForm.text = ''
      this.activeName2 = "first";
      this.upDataForm.xmmc = row.xmmc;
      this.upDataForm.xmyz = row.xmyz;
      // this.upDataForm.xmdq = row.xmdq
      this.upDataForm.wbUrl = row.url;
      this.zbxx_bt = row.zbxx_bt;
      this.zbxx_id = row.zbxx_id;
      // this.upDataForm.zbxx_bt = row.zbxx_bt;
      // this.upDataForm.zbxx_id = row.zbxx_id;

      this.upDataForm.id = row.id;
      this.searchData.xmmc = "";
      this.searchData.zblb = "";
      this.searchData.xmlb = "";
      this.searchData.area = "";
      this.searchData.date = "";
      // this.ajax_list("upData");
      this.addTableRowState = true;
      // if(this.qyProjectTableState){
      //   console.log(1111111111111)
      //    this.$refs.qyProjectTable.onReset()
      // }
      // this.qyProjectTableState = true
    },
    sureUpDataGkxx () {
      if (this.upDataForm.xmmc == "") {
        this.$message("请填写项目名称");
      }
      if (this.upDataForm.xmmc.length < 2) {
        this.$message("项目名称最少两个字");
      } else {
        for (let i = 0; i < this.upDataForm.xmdqList.length; i++) {
          if (this.upDataForm.xmdqList[1]) {
            this.upDataForm.xmdq = `${this.upDataForm.xmdqList[0]}/${
              this.upDataForm.xmdqList[1]
              }`;
          } else {
            this.upDataForm.xmdq = `${this.upDataForm.xmdqList[0]}`;
          }
        }
        let obj = {
          id: this.upDataForm.id,
          jbxx_id: this.$route.query.jbxx_id,
          user_id: localStorage.getItem("user_id"),
          xmmc: this.upDataForm.xmmc,
          xmyz: this.upDataForm.xmyz,
          xmdq: this.upDataForm.xmdq,
          txt: this.upDataForm.txt,
          url: this.upDataForm.wbUrl,
          // zbxx_id: this.upDataForm.zbxx_id,
          zbxx_id: this.zbxx_id,
          // zbxx_bt: this.upDataForm.zbxx_bt,
          zbxx_bt: this.zbxx_bt,
          file: this.thisRowDataFile.file_time,
          type: 2
        };
        this.axios.post("/relation/pro_details/editPub", obj, data => {
          this.dialogVisibleUpDataGkxx = false;
          this.upDataForm.xmmc = "";
          this.upDataForm.xmyz = "";
          this.upDataForm.xmdqList = [];
          this.upDataForm.wbUrl = "";
          // this.upDataForm.zbxx_bt = "";
          // this.upDataForm.zbxx_id = "";
          this.zbxx_bt = "";
          this.zbxx_id = "";
          this.upDataForm.txt = "";
          this.upDataForm.id = "";
          this.getPubList();
           this.addTableRowState = true;
        });
      }
    },
    saveGkxxData (row) {
      let myXmdq = "";
      for (let i = 0; i < row.xmdq.length; i++) {
        if (row.xmdq[1]) {
          myXmdq = `${row.xmdq[0]}/${row.xmdq[1]}`;
        } else {
          myXmdq = `${row.xmdq[0]}`;
        }
      }
      if (row.xmmc == "") {
        this.$message("请填写项目名称");
      }
      if (row.xmmc.length < 2) {
        this.$message("项目名称最少两个字");
      } else {
        this.pubList.loading = true;
        let obj = {
          id: row.id,
          jbxx_id: this.myForm.jbxx_id,
          user_id: localStorage.getItem("user_id"),
          xmmc: row.xmmc,
          xmyz: row.xmyz,
          xmdq: myXmdq,
          txt: row.txt,
          url: row.url,
          file: this.gkxxFileTime,
          zbxx_bt: row.zbxx_bt,
          zbxx_id: row.zbxx_id,
          type: 1
        };
        this.axios.post("/relation/pro_details/editPub", obj, data => {
          this.addTableRowState = true;
          this.getPubList();
        });
      }
    },
    cancelSaveData (row) {
      this.pubList.loading = true;
      this.pubList.data.shift();
      this.addTableRowState = true;
      this.getPubList();
    },
    getPubList () {
      let obj = {
        jbxx_id: this.myForm.jbxx_id,
        user_id: localStorage.getItem("user_id"),
        page: this.pubList.page,
        rows: this.pubList.rows
      };
      this.axios.post("/relation/pro_details/pubList", obj, data => {
        this.pubList.loading = false;
        this.pubList.data = data.rows ? data.rows : [];
        this.pubList.count = data.total ? data.total : 0;
        let NewArr = [];
        for (let i = 0; i < this.pubList.data.length; i++) {
          this.pubList.data[i].state = 0;
        }
        // .log(this.pubList);
      });
    },
    changeListData (val) {
      for (let i = 0; i < val.length; i++) {
        if (val[1]) {
          this.upaData.xmdq = `${val[0]}/${val[1]}`;
        } else {
          this.upaData.xmdq = `${val[0]}`;
        }
      }
    },
    getTxtData (row) {
      this.fujianTxt = row.txt;
    },
    getTxtData1 (row) {
      this.shoufujianTxt = row.txt;
    },
    getUrlData (row) {
      this.qyProjectRowData = row
      for (let i = 0; i < this.tablaData.length; i++) {
        this.$set(this.tablaData[i], "selectName", "关联");
        // console.log(this.tablaData[i].id)
        // console.log(row.zbxx_id)
        // if(this.tablaData[i].id == row.zbxx_id){
        //   this.tablaData[i].is_relation = 1
        // } 
      }
      // if(this.qyProjectTableState){
      //     this.$refs.qyProjectTable.onReset()
      // }
      // this.qyProjectTableState = true
      this.zbxx_id = "";
      this.zbxx_bt = "";
      this.searchData.xmmc = "";
      this.searchData.zblb = "";
      this.searchData.xmlb = "";
      this.searchData.area = "";
      this.searchData.date = "";
      this.GkxxUrl = row.url;
    },
    getFileData (row, num) {
      this.thisRowDataFile = row;
      this.upDataFile = row;
      this.upDataFile.num = num;
      this.gkxxFile = "";
      this.gkxxFileTime = "";
      this.gkxxFile = row.file;
      this.gkxxFileTime = row.file_time ? row.file_time : this.time;
      this.fileList.zbwj = [];
      let obj = {
        name: row.file,
        filename_time: row.file_time
      };
      if (row.file != "") {
        this.fileList.zbwj.push(obj);
      }
    },
    addTableRow () {
      let list = [];
      if (this.basicInfo.xmdq) {
        let arr = this.basicInfo.xmdq.split("/");
        for (let i = 0; i < arr.length; i++) {
          list.push(arr[i]);
        }
      }
      if (this.addTableRowState) {
        let obj = {
          xmmc: this.basicInfo.xmmc,
          xmdq: list,
          xmyz: this.basicInfo.xmyzdw,
          created: "",
          txt1: "文本",
          txt2: "关联",
          txt3: "附件",
          state: true,
          avatar:'',
          txt: "",
          url: "",
          file: "",
          zbxx_id: "",
          zbxx_bt: ""
        };
        this.fujianTxt = "";
          this.GkxxUrl = "";
          this.gkxxFile = "";
          this.gkxxFileTime = "";
        this.zbxx_id = "";
          this.zbxx_bt = "";
          this.dialogVisibleInputColor = false;
          this.dialogVisibleInput2Color = false;
          this.dialogVisibleUpdataColor = false;
          this.pubList.data.unshift(obj);
        this.addTableRowState = false;
        
      }
    },
    dialogClickOver (val) {
      switch (val) {
        case 1:
          this.pubList.data[0].txt = this.fujianTxt;
          if (this.fujianTxt != "") {
            this.dialogVisibleInput = false;
            this.dialogVisibleInputColor = true;
          }
          break;
        case 2:
          this.pubList.data[0].url = this.GkxxUrl;
          this.pubList.data[0].zbxx_id = this.zbxx_id;
          this.pubList.data[0].zbxx_bt = this.zbxx_bt;
          this.dialogVisibleInput2Color = true;
          this.dialogVisibleInput2 = false;
          break;
        case 3:
          this.dialogVisibleUpdataColor = true;
          this.dialogVisibleUpdata = false;
          break;

        default:
          break;
      }
    },
    openWbUrl () {
      let a = this.GkxxUrl.indexOf("https://");
      if (a) {
        window.open("https://" + this.GkxxUrl);
      } else {
        window.open(this.GkxxUrl);
      }
    },
    openToWbUrl (row) {
      let a = row.url.indexOf("https://");
      if (a) {
        window.open("https://" + row.url);
      } else {
        window.open(row.url);
      }
    },
    openToNbUrl (row) {
      let routeData = this.$router.resolve({
        name: "enterpriseDetails",
        query: {
          zbxx_id: row.zbxx_id,
          type: "zbxx",
          xmmc: row.zbxx_bt
        }
      });
      window.open(routeData.href, "_blank");
    },
    //  权限控制 点击公司名称时
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
    openGs (row, model) {
      if (model === 2) {
        row.gs_id = row.id;
        row.qymc = row.company_name;
      }
      if (this.role.company_role !== "C") {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.qymc}`
        });
        window.open(href, "公司详情" + row.gs_id);
      } else {
        this.axios.post(
          "/index/mine/roleCompSource",
          { gs_id: row.gs_id },
          res => {
            // 获取跳转页面结果
            if (res === "四川省建设厅") {
              let { href } = this.$router.resolve({
                path: `/gs_scjst?gs_id=${row.gs_id}`
              });
              window.open(href, "/gs_scjst" + row.gs_id);
            } else {
              let { href } = this.$router.resolve({
                path: `/gs_building?gs_id=${row.gs_id}`
              });
              window.open(href, "/gs_building" + row.gs_id);
            }
          }
        );
      }
    },
  }
};
</script>
<style lang='less' scoped>
#myTkHeader {
  height: 400px;
  // line-height: 40px;
  // margin-left: 50px;
}
#add {
  width: 100%;
  text-align: center;
  span {
    display: inline-block;
    margin: 0 auto;
  }
}
.headerBtn {
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin-top: 20px;
  border-radius: 10;
  text-align: center;
  color: black;
  border: solid 1px #d5d5d5;
  font-size: 14px;
  cursor: pointer;
}
.headerColor {
  background-color: #37b6ed;
  color: white;
}
.pointer {
  cursor: pointer;
  font-size: 18px;
}

.pointer1 {
  cursor: pointer;
  font-size: 12px;
}
.pointer_finish1 {
  cursor: pointer;
  color: #67c23a;
  font-size: 12px;
}
#share {
  display: flex;
  position: fixed;
  right: -210px;
  bottom: 50%;
  &:hover {
    transition: all 0.3s;
    right: 0;
  }
}
#share1 {
  position: fixed;
  right: 0px;
  bottom: calc(45%);
}
.dialog-footer {
  text-align: center;
}
.link_color {
  color: #409eff;
  cursor: pointer;
}

</style>