<template>
  <div class="edit-my-card" @click="cancelSomething">
    <el-form label-width="0" :model="formData">
      <div class="card-section-header">
        <el-upload
          class="card-avatar-box"
          :action="imgUrl"
          :data="myImgData"
          :show-file-list="false"
          :on-success="uploadAvatarSuccess"
          :on-error="uploadAvatarError"
          :before-upload="beforeAvatarUpload"
          :limit="1"
        >
          <img :src="userAvatar" alt="头像" class="card-avatar" title="点击修改头像" />
          <div class="card-avatar-change-tip">更换头像</div>
        </el-upload>
        <el-form-item
          :rules="[
          {
            required: true,
            message: '昵称不能为空',
            trigger: ['blur', 'change'],
          },
        ]"
          prop="cardInfo.name"
          class="card-name-box"
        >
          <el-input v-model="cardInfo.name" clearable placeholder="请输入昵称"></el-input>
        </el-form-item>
      </div>

      <div class="card-section-tags">
        <div class="tag-header">
          <div class="mr-10 mr-10">个人标签</div>
          <!-- 系统标签列表 -->
          <el-popover
            :value="isShowSystemTagsList"
            placement="top-start"
            width="400"
            trigger="manual"
          >
            <div class="tags-list">
              <div v-for="(tagkind, index) in tagList" :key="index" class="tags-kind">
                <div class="tags-kind-title">{{tagkind.cate_name}}</div>
                <div>
                  <div
                    v-for="(item, s_index) in tagkind.children"
                    :key="s_index"
                    class="tag-item mr-10"
                    :class="{'chosed-tag': myTagsId.includes(item.tag_id)}"
                    @click.stop="handleTag(item, 'temp')"
                  >{{item.tag_name}}</div>
                </div>
              </div>
              <div class="tag-list-footer">
                <el-button plain size="mini" @click="cancelTagChoose">取消</el-button>
                <el-button size="mini" type="primary" @click="chooseTheseTags">确定</el-button>
              </div>
            </div>
            <div class="tags-option-btn" slot="reference" @click="toAddSystemTags">+添加</div>
          </el-popover>

          <div class="tags-option-btn" @click="toAddCustomizeTag">+自定义</div>

          <!-- 自定义 tag  -->
          <el-dialog
            :close-on-click-modal="false"
            :visible.sync="isShowCustomizeTagDialog"
            title="自定义标签"
            width="30%"
            @close="cancelCustomizeTagChoose"
          >
            <el-select v-model="currentTagKind" placeholder="请选择" class="customize-tag-kind">
              <el-option
                v-for="item in tagKindList"
                :key="item.cate_id"
                :label="item.cate_name"
                :value="item.cate_id"
              ></el-option>
            </el-select>

            <el-popover
              :value="Boolean(waitChooseTags.length)"
              placement="bottom-start"
              width="300"
              trigger="manual"
            >
              <div>
                <div
                  v-for="tag in waitChooseTags"
                  :key="tag.tag_id"
                  class="wait-choose-item"
                  @click.stop="chooseOnlineTag(tag)"
                >{{tag.tag_name}}</div>
              </div>
              <el-input
                v-model="tagCustomizeText"
                clearable
                maxlength="6"
                placeholder="请输入自定义标签内容(最多六个字)"
                slot="reference"
                @click.stop
                @input="searchCardTag"
                @keyup.enter.native="setTag"
              ></el-input>
            </el-popover>

            <span slot="footer" class="dialog-footer">
              <el-button @click="isShowCustomizeTagDialog = false">取 消</el-button>
              <el-button type="primary" :loading="isInCacheCoustomizeTag" @click="setTag">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="tag-list">
          <div
            v-for="item in showMyTags"
            :key="item.tag_id"
            class="tag-item mr-10"
            @click="handleTag(item)"
          >
            {{item.tag_name}}
            <div class="iconfont icon-error delete-tag"></div>
          </div>
        </div>
      </div>

      <div class="divider mt-10 mb-20"></div>

      <div
        v-for="(comp, index) in company"
        :key="comp.id"
        class="card-section-company"
        @click.stop="cancelCompany(index)"
      >
        <div class="company-item-wrap">
          <label class="company-item mr-20" @click="currentCompany = index">
            <span
              class="company-item-label label-option"
              :class="{'space-between': index !== company.length - 1}"
            >
              <span class="mr-10">我的公司/服务</span>

              <el-tooltip
                v-if="index + 1 === company.length"
                class="item"
                effect="dark"
                content="添加的新公司若没有填入任何内容，点击新增公司范围外则会自动删除"
                placement="top"
              >
                <span class="tags-option-btn" @click.prevent.stop="addCompany">+添加</span>
              </el-tooltip>

              <span
                v-else
                class="iconfont icon-delete delete-icon pointer ml-10"
                @click.prevent.stop="deleteCompany(comp, index)"
              ></span>
            </span>

            <el-popover
              :value="currentCompany === index && Boolean(chooseCompany.length)"
              placement="bottom-start"
              width="300"
              trigger="manual"
            >
              <div>
                <div
                  v-for="item in chooseCompany"
                  :key="item.id"
                  class="wait-choose-item"
                  @click.stop="chooseOnlineCompany(item)"
                >{{item.company_name}}</div>
              </div>
              <el-form-item
                slot="reference"
                :prop="`company.${index}.name`"
                :rules="[
                {
                  required: true,
                  message: '公司名称不能为空',
                  trigger: 'change',
                },
              ]"
              >
                <el-input
                  v-model="comp.name"
                  clearable
                  placeholder="请输入公司名称/服务"
                  prefix-icon="el-icon-s-home"
                  ref="companyNameInput"
                  @input="searchCompany"
                  @keyup.enter.native="searchCompany($event, true)"
                ></el-input>
              </el-form-item>
            </el-popover>
          </label>
        </div>

        <div class="company-item-wrap">
          <label class="company-item">
            <span class="company-item-label">公司地址</span>

            <el-input v-model="comp.location" clearable placeholder="请输入公司地址" slot="reference">
              <i slot="prefix" class="el-input__icon el-icon-location pointer" @click="openMap(index)"></i>
            </el-input>
          </label>
        </div>

        <div class="company-item-wrap">
          <label class="company-item">
            <span class="company-item-label">职务/职能</span>

            <el-select
              v-model="comp.duty"
              allow-create
              clearable
              default-first-option
              filterable
              placeholder="请选择或输入职务/职能"
            >
              <el-option v-for="item in occ" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </label>
        </div>

        <div class="divider mb-20"></div>
      </div>

      <div
        v-for="(phone, index) in cardInfo.phone"
        :key="index"
        class="card-section-phone"
        @click.stop="cancelPhone(index)"
      >
        <div class="company-item-wrap">
          <label class="company-item">
            <span
              class="company-item-label label-option"
              :class="{'space-between': index !== cardInfo.phone.length - 1 || cardInfo.phone.length === 3}"
            >
              <span class="mr-10">我的电话</span>

              <el-tooltip
                v-if="index + 1 === cardInfo.phone.length && cardInfo.phone.length !== 3"
                content="添加的新号码若没有填入任何内容，点击新增号码范围外则会自动删除"
                effect="dark"
                placement="top"
              >
                <span class="tags-option-btn" @click.prevent.stop="addPhone">+添加</span>
              </el-tooltip>

              <span
                v-else
                class="iconfont icon-delete delete-icon pointer ml-10"
                @click.prevent.stop="deletePhone(index)"
              ></span>
            </span>

            <el-form-item
              :prop="`cardInfo.phone.${index}`"
              :rules="[
              {
                validator: validatePhone,
                trigger: ['change', 'blur']
              }
            ]"
            >
              <div>
                <el-input
                  v-model="cardInfo.phone[index]"
                  clearable
                  placeholder="请输入电话号码"
                  prefix-icon="iconfont icon-phone07"
                  ref="phone"
                  slot="reference"
                ></el-input>
              </div>
            </el-form-item>
          </label>
        </div>

        <div class="divider mb-20"></div>
      </div>

      <div class="card-section-wx">
        <div class="company-item-wrap">
          <label class="company-item">
            <span class="company-item-label">我的微信</span>

            <el-input
              v-model="cardInfo.weixin"
              clearable
              placeholder="请输入微信号"
              prefix-icon="iconfont icon-wechat2"
              ref="phone"
              slot="reference"
            ></el-input>
          </label>
        </div>

        <div class="divider"></div>
      </div>

      <el-button round type="primary" class="save-btn" @click="saveCardInfo">保存</el-button>

      <el-button round class="save-btn" @click="cancelSave">取消</el-button>
    </el-form>

    <el-dialog
      title="地图"
      :visible.sync="isShowMapDialog"
      width="80%"
      :before-close="mapDialogClose"
    >
      <baiduMap
        :initArea="currentInitArea"
        @current="getCurrentAddress"
      ></baiduMap>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowMapDialog = false">取 消</el-button>
        <el-button type="primary" @click="setAddress">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import baiduMap from '@/pages/personalCard/baiduMap.vue';

const companyInfoTemplate = {
  id: "",
  compId: 0,
  org_id: 0,
  name: "",
  duty: "",
  location: "",
  status: 1
};
export default {
  name: "editMyCard",
  components: {
    baiduMap
  },
  data() {
    return {
      // 是否正在保存中
      isSaving: false,
      // 用户卡片详情
      cardInfo: {
        id: "",
        name: "",
        weixin: "",
        phone: [""],
        avatar: "",
        tags: [],
        status: 1
      },
      // 用户公司详情
      company: [
        {
          ...companyInfoTemplate
        }
      ],
      isInCacheCoustomizeTag: false,
      isShowCustomizeTagDialog: false,
      isShowMapDialog: false,
      isShowSystemTagsList: false,
      // 存储的未修改值之前的内容
      oldCardInfo: "",
      oldCompany: "",
      // 自定义标签内容
      tagCustomizeText: "",
      // 当前自定义标签的父类
      currentTagKind: "",
      // 系统后台的标签
      tagList: [],
      tagsSnapshot: "",
      // 头像变化
      oldAvatar: "",
      initAvatar: "",
      // 自定义 tag 时，从后台拿到的相似 tag
      waitChooseTags: [],
      tagTimer: null,
      // 进行公司选择的时候
      currentCompany: null,
      currentLocationIndex: null,
      currentInitArea: "",
      waitSetAddress: {},
      searchWord: "",
      searchTimer: null,
      chooseCompany: [],
      // 待删除和变化的内容
      willDeleteCompany: [],
      willDeleteTag: [],
      // 头像上传参数
      myImgData: {
        cate: "avatar"
      },
      // 头像展示的前部分地址
      // imgShowUrlPre: "https://wechat.cdzjkl.com/files/options/",
      // 临时定义的可选
      occ: [
        "总经理",
        "行政经理",
        "运营总监",
        "市场总监",
        "行业顾问",
        "法律顾问"
      ]
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    flatTagList() {
      return this.tagList.reduce((tags, el) => tags.concat(el.children), []);
    },
    formData() {
      return {
        cardInfo: this.cardInfo,
        company: this.company
      };
    },
    myTagsId() {
      return this.cardInfo.tags.filter(el => el.status).map(el => el.tag_id);
    },
    sysTagId() {
      return this.flatTagList.map(el => el.tag_id);
    },
    showMyTags() {
      return this.cardInfo.tags.filter(el => el.status !== 2);
    },
    tagKindList() {
      return this.tagList.map(el => ({
        cate_id: el.cate_id,
        cate_name: el.cate_name
      }));
    },
    imgShowUrlPre() {
      return (process.env.NODE_ENV === 'development'
        ? 'http://mobile.cdzjkl.com/MaoHu/public/files/options/'
        : 'https://wechat.cdzjkl.com/files/options/');
    },
    imgUrl() {
      return `${process.env.NODE_ENV === 'development' ? 'https://test.cdzjkl.com' : 'https://wechat.cdzjkl.com'}/index/common/uploadImage`;
      // return "https://wechat.cdzjkl.com/index/common/uploadImage";
    },
    userAvatar() {
      return this.cardInfo.avatar || require("@/assets/default_avator.png");
    }
  },
  created() {
    this.showCard();
    this.getTagList();
  },
  methods: {
    // 添加新公司
    addCompany() {
      // 公司个数
      const compNum = this.company.length;
      const lastCompany = this.company[compNum - 1];
      if (!lastCompany.name) {
        this.$message.warning(`第 ${compNum} 个公司名称还未填写`);
        return;
      }
      this.company.push({
        ...companyInfoTemplate
      });
      this.$nextTick(() => {
        this.$refs.companyNameInput[compNum].focus();
        this.currentCompany = compNum;
      });
    },
    addPhone() {
      const phoneNum = this.cardInfo.phone.length;
      const lastPhone = this.cardInfo.phone[phoneNum - 1];
      if (!lastPhone) {
        this.$message.warning(`第 ${phoneNum} 个电话号码还未填写`);
        return;
      }
      if (lastPhone.indexOf(1) === 0 && !/1[3-9]\d{9}/.test(lastPhone)) {
        this.$message.warning(`第 ${phoneNum} 个联系方式,手机号码错误`);
        return;
      }
      if (lastPhone.indexOf(0) === 0 && !/0\d{2,3}-?\d{7,8}/.test(lastPhone)) {
        this.$message.warning(`第 ${phoneNum} 个联系方式,座机号码错误`);
        return;
      }
      if (this.cardInfo.phone.length === 3) {
        this.$message.warning("电话号码最多可写三个");
        return;
      }
      this.cardInfo.phone.push("");
      this.$nextTick(() => {
        this.$refs.phone[phoneNum - 1].focus();
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 取消新增的公司
    cancelAddCompany() {
      const lastCompany = this.company[this.company.length - 1];
      if (lastCompany.name || lastCompany.duty || lastCompany.location) return;
      this.company.pop();
    },
    cancelAddPhone() {
      if (this.cardInfo.phone.length === 1) return;
      const lastPhone = this.cardInfo.phone[this.cardInfo.phone.length - 1];
      if (lastPhone) return;
      this.cardInfo.phone.pop();
    },
    cancelCompany(index) {
      if (index === this.company.length - 1) return;
      this.cancelAddCompany();
    },
    // 取消当前自定义 tag
    cancelCustomizeTagChoose() {
      this.tagCustomizeText = "";
      this.currentTagKind = "";
      this.clearOnlineTag();
      document.removeEventListener("click", this.clearOnlineTag);
    },
    cancelPhone(index) {
      if (index === this.cardInfo.phone.length - 1) return;
      this.cancelAddPhone();
    },
    cancelSave() {
      this.$emit('handleChildData', {showTab: 2, operate: 'cancel'})
    },
    cancelSomething() {
      this.chooseCompany = [];
      this.cancelAddCompany();
      this.cancelAddPhone();
    },
    // 取消当前 Tag 选择的情况
    cancelTagChoose() {
      this.isShowSystemTagsList = false;
      this.cardInfo.tags = JSON.parse(this.tagsSnapshot);
      this.tagsSnapshot = "";
    },
    // 选择搜索出的公司
    chooseOnlineCompany(item) {
      this.$set(this.company[this.currentCompany], "name", item.company_name);
      this.$set(this.company[this.currentCompany], "compId", item.id);
      this.$set(this.company[this.currentCompany], "org_id", item.org_id);
      if (item.address && !this.company[this.currentCompany].location) {
        this.$set(this.company[this.currentCompany], "location", item.address);
      }
      this.chooseCompany = [];
      this.currentCompany = null;
    },
    // 选择搜索出的tag
    chooseOnlineTag(tag) {
      this.tagCustomizeText = tag.tag_name;
      const tagKinds = tag.tag_cate_id.split(",").map(Number);
      let index = "";
      tagKinds.some((el, i) => {
        if (this.currentTagKind !== null && i === this.currentTagKind) {
          index = this.currentTagKind;
          return true;
        }
        index = i;
        return false;
      });
      this.currentTagKind = index;
      this.clearOnlineTag();
    },
    chooseTheseTags() {
      this.isShowSystemTagsList = false;
      this.cardInfo.tags = this.cardInfo.tags
        .filter(el => el.status)
        .map(el => ({
          ...el,
          status: 1
        }));
    },
    // 清理掉 自定义标签 提示
    clearOnlineTag() {
      this.waitChooseTags = [];
    },
    delCardTag() {
      this.axios.post(
        "/relation/User_Card/delCardTag",
        {
          tag_id: this.willDeleteTag.map(el => el.tag_id).join(",")
        },
        res => {}
      );
    },
    // 删除旧头像
    deleteAvatar(avatar) {
      if (!avatar) return;
      if (avatar.indexOf("https://wx.qlogo.cn/") > -1) {
        return;
      }
      return new Promise((resolve, reject) => {
        const len = this.imgShowUrlPre.length;
        const path = avatar.substring(avatar.indexOf(imgUrl) + len);
        this.axios.post(
          "index/common/delUpload",
          {
            filename: path
          },
          res => {
            resolve(200);
          }
        ),
          err => {
            resolve(0);
          };
      });
    },
    // 删除公司
    deleteCompany(item, index) {
      if (item.id) {
        this.willDeleteCompany.push(item);
      }
      if (index === 0) {
        if (this.company.length === 1) {
          this.company = [
            {
              ...companyInfoTemplate
            }
          ];
        } else {
          this.$delete(this.company, index);
        }
      } else {
        this.$delete(this.company, index);
      }
    },
    deletePhone(index) {
      this.cardInfo.phone.splice(index, 1);
    },
    dropCompany(id) {
      this.axios.post(
        "relation/User_Card/delCard",
        {
          comp_id: id
        },
        res => {}
      );
    },
    getCurrentAddress(current) {
      console.log('current: ', current);
      this.waitSetAddress = current;
    },
    // 获取后台设定的 tag 列表
    getTagList() {
      this.axios.post(
        "/relation/User_Card/getCardTag",
        {
          // 获取系统设置的card
          cate: 1
        },
        res => {
          if (res.status === "success") {
            this.tagList = res.rows;
          }
        }
      );
    },
    /**
     * @param {Object} item tag 对象
     * @param {String} position 操作位置
     */
    handleTag(item, position) {
      // item 是自定义的 且 还未加入数据库
      if (item.temp) {
        this.cardInfo.tags = this.cardInfo.tags.filter(
          el => el.tag_id !== item.tag_id
        );
        return;
      }
      // item 是自定义的 且 已加入数据库
      if (
        !item.temp &&
        !this.flatTagList.some(el => el.tag_id === item.tag_id)
      ) {
        // 将该 tag 提出并缓存到待删除 tag 的列表
        this.willDeleteTag.push(item);
        this.cardInfo.tags = this.cardInfo.tags.filter(
          el => el.tag_id !== item.tag_id
        );
        return;
      }
      // item 是系统设定的 且 存在用户面板上
      const isInUserCard = this.cardInfo.tags.some(
        el => el.tag_id === item.tag_id && el.status === 1
      );
      if (isInUserCard) {
        // 如果是在添加面板时
        if (position === "temp") {
          this.cardInfo.tags = this.cardInfo.tags.map(el => {
            if (el.tag_id === item.tag_id) {
              return {
                ...el,
                status: 0,
                // 标记还在个人标签栏上
                inCard: true
              };
            }
            return el;
          });
          return;
        }
        // 直接剔除
        this.cardInfo.tags = this.cardInfo.tags.filter(
          el => el.tag_id !== item.tag_id
        );
        return;
      }
      // item 是系统设定的 且 处于选中状态 且 不在用户面板上
      const isInTagChoosing = this.cardInfo.tags.some(
        el => el.tag_id === item.tag_id && el.status === 2 && !el.inCard
      );
      if (isInTagChoosing) {
        // 直接删除
        this.cardInfo.tags = this.cardInfo.tags.filter(
          el => el.tag_id !== item.tag_id
        );
        return;
      }
      // item 是系统设定的 且 处于待删除状态 且 在用户面板上
      let isChangedTagStatus = false;
      this.cardInfo.tags = this.cardInfo.tags.map(el => {
        // 是否已经在列表内容
        if (el.tag_id === item.tag_id) {
          // 进入修改状态
          isChangedTagStatus = true;
          const { inCard, ...others } = el;
          // 只要不为 0 的有 5 个，则不改变 tag 的状态
          if (this.cardInfo.tags.filter(el => el.status).length >= 5) {
            this.$message.warning("已经存在五个标签，不能再添加新标签了");
            return el;
          }
          return {
            ...others,
            status: 1
          };
        }
        return el;
      });
      // 已经修改过则退出
      if (isChangedTagStatus) return;
      // 添加前判断是否已达最大上限
      if (this.cardInfo.tags.filter(el => el.status).length >= 5) {
        this.$message.warning("已经存在五个标签，不能再添加新标签了");
        return;
      }
      this.cardInfo.tags.push({
        ...item,
        status: 2
      });
    },
    mapDialogClose() {
      this.waitSetAddress = {};
      this.currentLocationIndex = null;
      this.isShowMapDialog = false;
      this.currentInitArea = '';
    },
    openMap(index) {
      this.currentLocationIndex = index;
      this.currentInitArea = this.company[index].location || this.company[index].name;
      this.isShowMapDialog = true;
    },
    // 保存用户自定义的标签
    saveCardTag(parentId, name, index) {
      return new Promise((resolve, reject) => {
        const params = {
          cate_id: parentId,
          user_id: this.userInfo.user_id,
          tag_name: name
        };
        this.axios.post("/relation/User_Card/saveCardTag", params, res => {
          if (res.status === "success") {
            resolve({
              ...res,
              tagIndex: index
            });
          } else {
            resolve({
              ...res,
              err: true
            });
          }
        });
      });
    },
    saveCardInfo() {
      if (this.isSaving) return;
      this.isSaving = true;
      if (!this.cardInfo.name) {
        this.$message.warning("请填入昵称");
        this.isSaving = false;
        return;
      }
      const allRightPhone = this.cardInfo.phone.every((el, index) => {
        if (el === "") {
          this.$message.warning(`第 ${index + 1} 个联系方式为空,请删除或填写`);
          this.isSaving = false;
          return false;
        }
        if (el.indexOf(1) === 0) {
          if (/1[3-9]\d{9}/.test(el)) {
            return true;
          }
          this.$message.warning(`第 ${index + 1} 个联系方式,手机号码错误`);
          this.isSaving = false;
          return false;
        }
        if (el.indexOf(0) === 0) {
          if (/0\d{2,3}-?\d{7,8}/.test(el)) {
            return true;
          }
          this.$message.warning(`第 ${index + 1} 个联系方式,座机号码错误`);
          this.isSaving = false;
          return false;
        }
        this.$message.warning(`第 ${index + 1} 个联系方式,存在错误请修改`);

        this.isSaving = false;
        return false;
      });

      if (!allRightPhone) {
        this.isSaving = false;
        return;
      }

      const allRightCompany = this.company.every((el, index) => {
        if (el.name) {
          return true;
        }
        this.$message.warning(`第 ${index + 1} 个公司信息还未填写公司名称`);

        this.isSaving = false;
        return false;
      });

      if (!allRightCompany) {
        this.isSaving = false;
        return;
      }

      if (
        JSON.stringify(this.cardInfo) === this.oldCardInfo &&
        JSON.stringify(this.company) === this.oldCompany
      ) {
        this.$message.warning(`还未进行修改`);
        this.isSaving = false;
        return;
      }

      const card_comp = this.company.map(el => {
        if (el.name) {
          return {
            id: el.id,
            user_id: this.userInfo.user_id,
            comp_base_id: el.compId,
            org_id: el.org_id,
            comp_name: el.name,
            comp_duty: el.duty,
            comp_address: el.location,
            status: 1
          };
        }
      });

      const waitAddTags = this.cardInfo.tags
        .filter(el => el.status === 1)
        .map((el, index) => {
          if (!el.temp) return "";
          return this.saveCardTag(el.tag_cate_id, el.tag_name, index);
        })
        .filter(el => el);
      Promise.all(waitAddTags).then(res => {
        res.forEach(el => {
          this.cardInfo.tags[el.tagIndex].tag_id = Number(el.message);
        });

        if (this.willDeleteCompany.length) {
          this.willDeleteCompany.forEach(el => this.dropCompany(el.id));
        }

        const abandonedAvatar = [this.initAvatar, this.oldAvatar]
          .map(el => this.deleteAvatar(el))
          .filter(el => el);
        Promise.all(abandonedAvatar).then(() => {});

        this.saveUserCardInfo(card_comp);
      });
    },
    saveUserCardInfo(card_comp) {
      const params = {
        card_comp,
        card_main: {
          id: this.cardInfo.id,
          user_id: this.userInfo.user_id,
          card_name: this.cardInfo.name,
          phone_one: this.cardInfo.phone[0] || "",
          phone_two: this.cardInfo.phone[1] || "",
          phone_three: this.cardInfo.phone[2] || "",
          wechat_id: this.cardInfo.weixin,
          card_avatar: this.cardInfo.avatar,
          tag_id: this.cardInfo.tags.map(el => el.tag_id).join(","),
          status: this.cardInfo.status
        }
      };
      this.axios.post("/relation/User_Card/saveCard", params, res => {
        this.isSaving = false;
        if (res.status === "success") {
          if (this.willDeleteTag.length) {
            this.delCardTag();
          }
          this.$message.success("保存成功");
          this.$emit('handleChildData', {showTab: 2, operate: 'save'})
        } else {
          this.$message.warning("保存失败，请稍后再试");
        }
      });
    },
    // 搜索数据库内的自定义 tag
    searchCardTag(force = false) {
      if (!force && this.tagTimer) return;
      if (this.tagCustomizeText === "") {
        this.waitChooseTags = [];
        clearTimeout(this.tagTimer);
        this.tagTimer = null;
        return;
      }
      this.tagTimer = setTimeout(() => {
        clearTimeout(this.tagTimer);
        this.tagTimer = null;
        if (this.tagCustomizeText === "") {
          this.waitChooseTags = [];
          return;
        }
        const params = {
          cate: 2,
          tag_name: this.tagCustomizeText
        };
        this.axios.post("/relation/User_Card/getCardTag", params, res => {
          if (res.status === "success") {
            this.waitChooseTags = res.rows;
          } else {
            this.clearOnlineTag();
          }
        });
      }, 500);
    },
    searchCompany(e, force = false) {
      if (force) {
        this.searchWord = e.target.value;
      } else {
        this.searchWord = e;
      }
      if (!force && this.searchTimer) return;
      if (this.searchWord === "") {
        this.chooseCompany = [];
        clearTimeout(this.searchTimer);
        this.searchTimer = null;
        return;
      }
      this.searchTimer = setTimeout(() => {
        clearTimeout(this.searchTimer);
        this.searchTimer = null;
        if (this.searchWord === "") {
          this.chooseCompany = [];
          return;
        }
        const params = {
          user_id: this.userInfo.user_id,
          page: 1,
          rows: 5,
          company: this.searchWord,
          order: "weight"
        };
        this.axios.post("/firm/firm_search_nation/searchComp", params, res => {
          if (res.status === "success") {
            this.chooseCompany = res.rows;
          } else {
            this.chooseCompany = [];
          }
        });
      }, 500);
    },
    setAddress() {
      this.$set(this.company[this.currentLocationIndex], 'location', this.waitSetAddress.address)
      this.isShowMapDialog = false;
    },
    // 临时缓存自定义 tag
    setTag() {
      if (this.currentTagKind === null) {
        this.$message.warning("还未选择标签类别");
        return;
      }
      if (this.tagCustomizeText === "") {
        this.$message.warning("不可以定义空标签");
        return;
      }
      if (
        this.cardInfo.tags.some(el => el.tag_name === this.tagCustomizeText)
      ) {
        this.$message.warning("已存在我选中的标签");
        return;
      }
      if (
        this.flatTagList.some(
          el =>
            el.tag_name === this.tagCustomizeText &&
            el.tag_cate_id === `${this.currentTagKind}`
        )
      ) {
        this.$message.warning("已存在在系统标签");
        return;
      }
      // 缓存临时标签
      this.cardInfo.tags.push({
        tag_id: `temp${Date.now()}`,
        tag_name: this.tagCustomizeText,
        tag_cate_id: this.currentTagKind,
        temp: true,
        status: 1
      });
      this.tagCustomizeText = "";
      this.isShowCustomizeTagDialog = false;
    },
    showCard() {
      const params = {
        id: this.userInfo.user_id,
        user_id: this.userInfo.user_id,
        cate: "edit"
      };
      this.axios.post("/relation/User_Card/showCard", params, res => {
        if (res.status === "success") {
          const mian = res.rows.mian;
          this.cardInfo = {
            id: mian.id,
            name: mian.card_name,
            weixin: mian.wechat_id || "",
            phone: [mian.phone_one, mian.phone_two, mian.phone_three].filter(
              el => el
            ),
            avatar: mian.card_avatar,
            status: 1,
            tags: mian.tag_data.map(el => ({
              ...el,
              tag_id: el.id,
              status: 1
            }))
          };
          const company = res.rows.comp.map(el => {
            return {
              id: el.id,
              compId: el.comp_base_id,
              org_id: el.org_id,
              name: el.comp_name,
              duty: el.comp_duty,
              location: el.comp_address,
              status: 1
            };
          });
          this.company = company.length ? company : this.company;
          // 生成对照内容
          this.oldCardInfo = JSON.stringify(this.cardInfo);
          this.oldCompany = JSON.stringify(this.company);
        }
      });
    },
    // 添加系统标签
    toAddSystemTags() {
      // 生成准备还原的快照
      this.tagsSnapshot = JSON.stringify(this.cardInfo.tags);
      this.isShowSystemTagsList = true;
    },
    // 添加自定义的标签
    toAddCustomizeTag() {
      if (this.cardInfo.tags.length === 5) {
        this.$message.warning("已经存在五个标签，不能再添加新标签了");
        return;
      }
      this.isShowCustomizeTagDialog = true;
      this.waitChooseTags = [];
      document.addEventListener("click", this.clearOnlineTag);
    },
    uploadAvatarError(res) {
      this.$message.error(res.message);
    },
    uploadAvatarSuccess(res, file) {
      this.$message.success(res.message);
      if (!this.initAvatar) {
        this.initAvatar = this.cardInfo.avatar;
      } else {
        if (this.oldAvatar) {
          this.deleteAvatar(this.oldAvatar).then(res => {
            this.oldAvatar = this.cardInfo.avatar;
          });
        } else {
          this.oldAvatar = this.cardInfo.avatar;
        }
      }
      this.cardInfo.avatar = `${this.imgShowUrlPre}${res.data.filename_time}`;
    },
    validatePhone(rule, value, callback) {
      if (!value) {
        callback(new Error("手机号码不能为空"));
        return;
      }
      if (value.indexOf(1) === 0 && !/1[3-9]\d{9}/.test(value)) {
        callback(new Error("手机号码位数不正确"));
        return;
      }
      if (value.indexOf(0) === 0 && !/0\d{2,3}-?\d{7,8}/.test(value)) {
        callback(new Error("座机号码位数不正确"));
        return;
      }
      callback();
    }
  }
};
</script>

<style lang="less" scoped>
.iconfont {
  color: #999;
}
.edit-my-card {
  width: 100%;
  & /deep/ .mt-10 {
    margin-top: 10px;
  }
  & /deep/ .mb-20 {
    margin-bottom: 20px;
  }
}
.card-section-header {
  display: flex;
}
.card-avatar-box {
  position: relative;
  border-radius: 50%;
  width: 110px;
  height: 110px;
  overflow: hidden;
  cursor: pointer;
}
.card-avatar {
  width: 100%;
  height: 100%;
}
.card-avatar-change-tip {
  position: absolute;
  bottom: 0;
  width: 110px;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 14px;
  color: #fff;
}
.card-name-box {
  position: relative;
  margin-left: 16px;
  padding-top: 55px;
}
.card-section-tags {
  padding-top: 25px;
}
.tag-header {
  display: flex;
  padding-bottom: 20px;
}
.ml-10 {
  margin-left: 10px;
}
.mr-10 {
  margin-right: 10px;
}
.mr-20 {
  margin-right: 20px;
}
.tags-option-btn {
  box-sizing: border-box;
  border: 1px solid #999;
  border-radius: 2px;
  margin-left: 10px;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  &:hover {
    border-color: #45a4fc;
    color: #45a4fc;
  }
}
.tag-list {
  padding-bottom: 10px;
}
.tag-item {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #f3f3f3;
  border-radius: 12px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 0 10px;
  height: 24px;
  line-height: 22px;
  background: #f3f3f3;
  font-size: 14px;
  cursor: pointer;

  .delete-tag {
    position: absolute;
    top: -10px;
    right: 0;
    color: #ff0000;
    font-size: 12px;
  }
}
.tags-kind-title {
  margin-bottom: 10px;
}
.chosed-tag {
  border-color: #45a4fc;
  background: transparent;
  color: #45a4fc;
}
.customize-tag-kind {
  margin-bottom: 20px;
  width: 100%;
}
.wait-choose-item {
  box-sizing: border-box;
  border-bottom: 1px solid transparent;
  padding: 0 10px;
  height: 30px;
  line-height: 29px;
  font-size: 14px;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom-color: #f3f3f3;
  }
  &:hover {
    background: #ecf5ff;
  }
}
.divider {
  position: relative;
  display: block;
  height: 1px;
  width: 100%;
  background-color: #dcdfe6;
}
.company-item-wrap {
  display: inline-block;
  width: 33.4%;
  min-width: 340px;
  margin-bottom: 20px;
}
.company-item {
  width: 340px;
  display: flex;
  flex-direction: column;
}
.company-item-label {
  height: 24px;
  line-height: 24px;
  margin-bottom: 20px;
}
.label-option {
  display: flex;
  align-items: center;
}
.space-between {
  justify-content: space-between;
}
.pointer {
  cursor: pointer;
}
.save-btn {
  margin-top: 30px;
  margin-bottom: 30px;
  width: 120px;
  height: 40px;
}
</style>
