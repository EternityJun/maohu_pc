<template>
  <div class="wrapper">
    <body-top></body-top>
    <div class="card-wrapper" v-loading="isLoading1">
      <!-- 页面左边缩小版名片页 -->
      <div class="card-left">
        <div class="card-show">
          <div class="mini-card">
            <div class="navigator-bar">{{user_id == target_id ? '我' : card_name}}的电子名片</div>
            <div class="card-style-wra">
              <!-- 样式一 -->
              <div v-if="cardStyle === 1" class="card-style_1">
                <div class="card-style1">
                  <!-- 头部背景图片 -->
                  <div class="card-bg" :style="{backgroundImage: 'url(' + banner + ')'}"></div>
                  <div class="co-zan co-zan1" @click.stop="handleReliable('reliable')">
                    <i class="iconfont z-i" :class="[isReliable ? 'icon-zan' : 'icon-zan2']"></i>
                    <span style="cursor:default;">靠谱{{cardStatis.reliable}}</span>
                  </div>
                  <!-- 第一家公司 -->
                  <div
                    class="company-top c-top"
                    :style="{backgroundColor: showCard_comp.length > 0 ? 'rgba(0, 0, 0, 0.4)' : ''}"
                  >
                    <div class="top-left" v-if="showCard_comp.length > 0">
                      <i class="iconfont icon-gongsi1 i-s"></i>
                      <span
                        class="name text-hidden1"
                        style="margin-left: 2px;"
                      >{{showCard_comp[curComp].comp_name}}</span>
                    </div>
                    <span>&nbsp;</span>
                    <div class="top-right">
                      <el-popover style="margin-top:2px;" placement="bottom" trigger="hover">
                        <div class="codeurl-wra">
                          <img class="img" :src="codeUrl" alt />
                        </div>
                        <i slot="reference" class="iconfont icon-qrcode i-s"></i>
                      </el-popover>
                      <!-- <i
                        v-if="user_id == target_id"
                        class="iconfont icon-qrcode i-s"
                        style="margin-top:2px;"
                      ></i>-->
                      <span
                        v-if="user_id == target_id"
                        class="c-s"
                        @click.stop="handleChangeStyle(2)"
                      >切换样式</span>
                    </div>
                  </div>
                  <div class="card-avatar">
                    <img
                      :src="showCard_mian.card_avatar ? showCard_mian.card_avatar : '../assets/CAT-02.png'"
                      alt
                    />
                  </div>
                  <div class="op-wra">
                    <span
                      class="edit"
                      v-if="user_id == target_id && isCreated"
                      @click="handleGoEditCard"
                    >编辑</span>
                    <span class="created" v-if="!isCreated" @click="handleGoEditCard">立即创建</span>
                  </div>
                  <div class="c-info">
                    <div class="c-title">
                      <span class="name">{{showCard_mian.card_name}}</span>
                      <span
                        class="duty"
                        v-if="showCard_comp.length > 0"
                      >{{showCard_comp[curComp].comp_duty}}</span>
                    </div>
                    <div class="c-num">
                      <span @click="handleToFollowList('history')">浏览{{cardStatis.browse}}</span>
                      <span class="line">/</span>
                      <span @click="handleToFollowList('follow')">关注{{cardStatis.concern}}</span>
                      <span class="line">/</span>
                      <span @click="handleToFollowList('trust')">信任{{cardStatis.trust_me}}</span>
                    </div>
                    <div class="tag-list" v-if="showCard_mian.tag_name">
                      <span
                        v-for="(item, index) in showCard_mian.tag_name"
                        :key="index"
                        class="tag-item"
                      >{{item}}</span>
                    </div>
                  </div>
                  <div class="chat-info" v-if="showCard_mian.phone_one">
                    <i class="iconfont icon-phone07 c-i"></i>
                    <span>电话：{{showCard_mian.phone_one}}</span>
                  </div>
                  <div class="chat-info" v-if="showCard_mian.phone_two">
                    <i class="iconfont icon-phone07 c-i"></i>
                    <span>电话：{{showCard_mian.phone_two}}</span>
                  </div>
                  <div class="chat-info" v-if="showCard_mian.phone_three">
                    <i class="iconfont icon-phone07 c-i"></i>
                    <span>电话：{{showCard_mian.phone_three}}</span>
                  </div>
                  <div class="chat-info" v-if="showCard_mian.wechat_id">
                    <i class="iconfont icon-wechat4 c-i"></i>
                    <span>微信：{{showCard_mian.wechat_id}}</span>
                  </div>
                  <div class="ad-info" v-if="showCard_comp.length > 0">
                    <div
                      class="chat-info"
                      style="border: 0;"
                      @click="handleClickCompanyName(showCard_comp[curComp])"
                    >
                      <i class="iconfont icon-gongsi1 c-i"></i>
                      <span>{{showCard_comp[curComp].comp_name}}</span>
                    </div>
                    <div class="chat-info text-hidden1" style="border: 0;">
                      <i class="iconfont icon-location c-i"></i>
                      <span>{{showCard_comp[curComp].comp_address}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 样式二 -->
              <div v-if="cardStyle === 2" class="card-style_2">
                <div class="co-zan" @click.stop="handleReliable('reliable')">
                  <i class="iconfont z-i" :class="[isReliable ? 'icon-zan' : 'icon-zan2']"></i>
                  <span style="cursor:default;">靠谱{{cardStatis.reliable}}</span>
                </div>
                <!-- 黑色背景卡片里面的内容 -->
                <div
                  class="card-style2"
                  :style="{backgroundImage: 'url(' + banner2 + ')', color: bgColor}"
                  @click="handleGoEditCard"
                >
                  <div class="company-top" :style="{color: bgColor}">
                    <div class="top-left" v-if="showCard_comp.length > 0">
                      <span class="name text-hidden1">{{showCard_comp[curComp].comp_name}}</span>
                    </div>
                    <div class="top-right">
                      <el-popover style="margin-top:2px;" placement="bottom" trigger="hover">
                        <div class="codeurl-wra">
                          <img class="img" :src="codeUrl" alt />
                        </div>
                        <i slot="reference" class="iconfont icon-qrcode i-s"></i>
                      </el-popover>
                      <!-- <i
                        v-if="user_id == target_id"
                        class="iconfont icon-qrcode i-s"
                        style="margin-top:2px;"
                      ></i>-->
                      <span
                        v-if="user_id == target_id"
                        class="c-s"
                        @click.stop="handleChangeStyle(1)"
                      >切换样式</span>
                    </div>
                  </div>
                  <div class="company-m">
                    <div class="company-m-l">
                      <div class="card-avatar">
                        <div class="img">
                          <img
                            :src="showCard_mian.card_avatar ? showCard_mian.card_avatar : '../assets/CAT-02.png'"
                            alt
                          />
                        </div>
                        <div class="info">
                          <span class="t_1">{{showCard_mian.card_name}}</span>
                          <span
                            class="t_2"
                            v-if="showCard_comp.length > 0"
                          >{{showCard_comp[curComp].comp_duty}}</span>
                        </div>
                      </div>
                      <div class="re-s" v-if="showCard_mian.phone_one">
                        <i class="iconfont icon-phone07 b-i"></i>
                        <span
                          class="txt"
                        >{{showCard_mian.phone_one}}{{showCard_mian.phone_two ? '，' + showCard_mian.phone_two : ''}}</span>
                      </div>
                      <div class="re-s" v-if="showCard_mian.wechat_id">
                        <i class="iconfont icon-wechat4 b-i"></i>
                        <span class="txt">{{showCard_mian.wechat_id}}</span>
                      </div>
                      <div
                        class="re-s"
                        v-if="showCard_comp.lenght > 0 && showCard_comp[curComp].comp_address"
                      >
                        <i class="iconfont icon-location b-i"></i>
                        <span class="txt text-hidden1">{{showCard_comp[curComp].comp_address}}</span>
                      </div>
                    </div>
                    <div class="company-m-r">
                      <span
                        class="tag"
                        v-for="(item, index) in showCard_mian.tag_name"
                        :key="index"
                      >{{item}}</span>
                    </div>
                  </div>
                </div>
                <!-- 公司名称、地址、联系方式展示 -->
                <div class="info-scroll" v-if="showCard_comp.length > 0">
                  <div class="s-item" @click="handleClickCompanyName(showCard_comp[curComp])">
                    <div class="s-i-t">
                      <i class="iconfont icon-gongsi1 s-i"></i>
                      <span>我的公司/服务</span>
                    </div>
                    <div class="s-i-b text-hidden1">{{showCard_comp[curComp].comp_name}}</div>
                  </div>
                  <div class="s-item" v-if="showCard_mian.phone_one">
                    <div class="s-i-t">
                      <i class="iconfont icon-phone07 s-i"></i>
                      <span>我的电话</span>
                    </div>
                    <div class="s-i-b text-hidden1">{{showCard_mian.phone_one}}</div>
                  </div>
                  <div class="s-item" v-if="showCard_mian.wechat_id">
                    <div class="s-i-t">
                      <i class="iconfont icon-wechat4 s-i"></i>
                      <span>我的微信</span>
                    </div>
                    <div class="s-i-b text-hidden1">{{showCard_mian.wechat_id}}</div>
                  </div>
                  <div
                    class="s-item"
                    v-if="showCard_comp.length > 0 && showCard_comp[curComp].comp_address"
                  >
                    <div class="s-i-t">
                      <i class="iconfont icon-location s-i"></i>
                      <span>公司地址</span>
                    </div>
                    <div class="s-i-b text-hidden1">{{showCard_comp[curComp].comp_address}}</div>
                  </div>
                </div>
                <!-- 浏览、关注、信任栏 -->
                <div class="card-look">
                  <div class="c-l-l" @click="handleToFollowList('history')">
                    <div class="l-l-top" v-if="cardStatis.browse > 0 && cardStatis.avatar">
                      <img
                        v-for="(item, index) in cardStatis.avatar"
                        :key="index"
                        class="img"
                        :class="{img1: index === 0 , img2: index === 1, img3: index === 2}"
                        :src="item"
                        alt
                      />
                    </div>
                    <span>浏览{{cardStatis.browse}}</span>
                  </div>
                  <div class="c-l-r">
                    <div class="l-r-i" @click="handleToFollowList('follow')">
                      <i class="iconfont icon-collect1 r-i"></i>
                      <span>关注{{cardStatis.concern}}</span>
                    </div>
                    <div
                      class="l-r-i"
                      style="margin-left:10px;"
                      @click="handleToFollowList('trust')"
                    >
                      <i class="iconfont icon-safety r-i"></i>
                      <span>信任{{cardStatis.trust_me}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 私信、关注、好友、分享操作按钮 -->
              <div class="operate-list">
                <div class="op-item" @click="handleChat('msg')">
                  <i class="iconfont icon-message1 o-i"></i>
                  <span>私信</span>
                </div>
                <div class="op-item" @click="handleConcern('follow')">
                  <i
                    class="iconfont o-i"
                    :class="[isConcern || user_id == target_id ? 'icon-collect1' : 'icon-collect2']"
                  ></i>
                  <span>关注</span>
                </div>
                <div class="op-item" @click="handleFriend('friend')">
                  <i
                    class="iconfont o-i"
                    :class="[isFriend === '已添加' || user_id == target_id ? 'icon-friend-fill' : 'icon-friend']"
                  ></i>
                  <span>好友</span>
                </div>
                <div class="op-item">
                  <i class="iconfont icon-share2 o-i"></i>
                  <span>分享</span>
                </div>
              </div>
              <!-- tabbar切换 -->
              <div class="tab-list">
                <div
                  v-for="(item, index) in tabList"
                  :key="index"
                  class="tab-item"
                  :class="{'ac-item' : curTab === index}"
                  @click="handleChangeTab(index)"
                >{{item}}</div>
              </div>
              <!-- tabbar对应的数据列表 -->
              <!-- 全部 tab页 -->
              <div v-if="curTab === 0" class="tab-page">
                <div class="no-data" style="padding-top:10px;" v-if="allTotal === 0">暂无数据</div>
                <!-- 列表的每一项 -->
                <div class="t-p-i" v-if="allTotal > 0">
                  <!-- 相同样式的头部 -->
                  <div class="list-top">
                    <div class="l-t-left">
                      <div class="img">
                        <img :src="allOne.avatar ? allOne.avatar : '../assets/CAT-02.png'" alt />
                      </div>
                      <div class="info">
                        <span class="name">{{allOne.username}}</span>
                        <span class="time">{{allOne.created}}</span>
                      </div>
                    </div>
                    <i
                      class="iconfont icon-delete d-i"
                      v-if="allOne.user_id == user_id"
                      @click="handleDelIcon(allOne.id ? '建投条' : '业务', allOne.id || allOne.jbxx_id, allOne.filename || '')"
                    ></i>
                  </div>
                  <!-- 建头条内容样式 -->
                  <div class="list-bottom" v-if="allOne.id" @click="handleClickArtContent(allOne)">
                    <div class="art-content text-hidden2">{{allOne.content}}</div>
                    <div class="art-img">
                      <img
                        v-for="(one, s_index) in allOne.images"
                        :key="s_index"
                        :src="one"
                        alt
                        class="img"
                      />
                    </div>
                    <div class="art-footer">
                      <span class="read-num">{{allOne.read_volume}}</span>
                      <span class="zan-num" @click.stop="getUpvote(allOne, '全部')">
                        <i
                          class="iconfont icon-zan r-i"
                          :style="{color: allOne.is_upvote === 1 ? '#409eff' : ''}"
                        ></i>
                        {{allOne.upvote_cnt ? allOne.upvote_cnt : 0}}
                      </span>
                    </div>
                  </div>
                  <!-- 业务内容样式 -->
                  <div class="list-bottom1" v-if="allOne.jbxx_id">
                    <div class="pro-left" @click="handleGoProBrief(allOne)">
                      <div class="name">{{allOne.xmmc}}</div>
                      <div
                        class="other"
                        v-if="allOne.xmyz && allOne.xmyz != 'null'"
                      >项目业主：{{allOne.xmyz}}</div>
                      <div class="other" v-if="allOne.xmdq">项目地区：{{allOne.xmdq}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 建头条 tab页 -->
              <div v-if="curTab === 1" class="tab-page">
                <div class="no-data" style="padding-top:10px;" v-if="articleTotal === 0">暂无数据</div>
                <!-- 列表的每一项 -->
                <div class="t-p-i" v-if="articleTotal > 0">
                  <!-- 相同样式的头部 -->
                  <div class="list-top">
                    <div class="l-t-left">
                      <div class="img">
                        <img
                          :src="articleOne.avatar ? articleOne.avatar : '../assets/CAT-02.png'"
                          alt
                        />
                      </div>
                      <div class="info">
                        <span class="name">{{articleOne.username}}</span>
                        <span class="time">{{articleOne.created}}</span>
                      </div>
                    </div>
                    <i
                      class="iconfont icon-delete d-i"
                      v-if="articleOne.user_id == user_id"
                      @click="handleDelIcon('建投条', articleOne.id, articleOne.filename)"
                    ></i>
                  </div>
                  <!-- 建头条内容样式 -->
                  <div class="list-bottom" @click="handleClickArtContent(articleOne)">
                    <div class="art-content text-hidden2">{{articleOne.content}}</div>
                    <div class="art-img">
                      <img
                        v-for="(one, s_index) in articleOne.images"
                        :key="s_index"
                        :src="one"
                        alt
                        class="img"
                      />
                    </div>
                    <div class="art-footer">
                      <span class="read-num">{{articleOne.read_volume}}</span>
                      <span class="zan-num" @click.stop="getUpvote(articleOne, '建投条')">
                        <i
                          class="iconfont icon-zan r-i"
                          :style="{color: articleOne.is_upvote == 1 ? '#409eff' : ''}"
                        ></i>
                        {{articleOne.upvote_cnt ? articleOne.upvote_cnt : 0}}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 业务 tab页 -->
              <div v-if="curTab === 2" class="tab-page">
                <div class="no-data" style="padding-top:10px;" v-if="proTotal === 0">暂无数据</div>
                <div class="t-p-i" v-if="proTotal > 0">
                  <!-- 业务内容样式 -->
                  <div class="list-bottom1">
                    <div class="pro-left" @click="handleGoProBrief(proOne)">
                      <div class="name">{{proOne.xmmc}}</div>
                      <div
                        class="other"
                        v-if="proOne.xmyz && proOne.xmyz != 'null'"
                      >项目业主：{{proOne.xmyz}}</div>
                      <div class="other" v-if="proOne.xmdq">项目地区：{{proOne.xmdq}}</div>
                      <div class="other">创建时间：{{proOne.created}}</div>
                    </div>
                    <div
                      class="pro-right"
                      v-if="proOne.user_id == user_id"
                      @click="handleDelIcon('业务', proOne.jbxx_id)"
                    >
                      <i class="iconfont icon-delete d-i"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 页面右边显示放大版名片页 -->
      <div class="card-right">
        <!-- 电子名片信息展示 -->
        <div v-if="showTab === 1" class="card-show">
          <div class="card-info">
            <div class="c-s-head">
              <div class="head-left">
                <div class="img">
                  <img
                    :src="showCard_mian.card_avatar ? showCard_mian.card_avatar: '../assets/CAT-02.png'"
                    alt
                  />
                </div>
                <div class="info">
                  <div class="info-t">
                    <span class="name">{{showCard_mian.card_name}}</span>
                    <span
                      class="duty"
                      v-if="showCard_comp.length > 0"
                    >{{showCard_comp[curComp].comp_duty}}</span>
                  </div>
                  <div class="info-b">
                    <span @click="handleToFollowList('history')">浏览{{cardStatis.browse}}</span>
                    <span class="line">/</span>
                    <span @click="handleToFollowList('follow')">关注{{cardStatis.concern}}</span>
                    <span class="line">/</span>
                    <span @click="handleToFollowList('trust')">信任{{cardStatis.trust_me}}</span>
                  </div>
                </div>
              </div>
              <div class="head-right">
                <el-button
                  round
                  style="width:120px;"
                  v-if="user_id == target_id && isCreated"
                  @click="handleGoEditCard"
                >编辑</el-button>

                <!-- <el-button type="primary" round style="width:120px;" class="share-btn">分享</el-button> -->
                <!-- <div  class="share" v-if="getCutUrlKey">
                  <el-button type="primary" round style="width:120px;" class="share-btn">分享</el-button>
                  <share :config="config"></share>
                </div>-->
                <el-popover placement="bottom" trigger="hover">
                  <share :config="config"></share>
                  <el-button
                    slot="reference"
                    type="primary"
                    round
                    style="width:120px;"
                    class="share-btn"
                  >分享</el-button>
                </el-popover>
              </div>
            </div>
            <div class="tag-list">
              <span
                v-for="(item, index) in showCard_mian.tag_name"
                :key="index"
                class="tag-item"
              >{{item}}</span>
            </div>
            <div class="info-list" v-for="(item, index) in showCard_comp" :key="index">
              <div class="info-item">
                <div class="title">我的公司/服务</div>
                <div class="brief text-hidden1" @click="handleClickCompanyName(item)">
                  <i class="iconfont icon-gongsi1 b-i"></i>
                  <span class="con">{{item.comp_name}}</span>
                </div>
              </div>
              <div class="info-item">
                <div class="title">公司地址</div>
                <div class="brief text-hidden1" @click="handleClickAddress(item.comp_address)">
                  <i class="iconfont icon-location b-i"></i>
                  <span class="con">{{item.comp_address}}</span>
                </div>
              </div>
            </div>
            <div class="info-list" v-if="showCard_mian.phone_one">
              <div class="info-item">
                <div class="title">我的电话</div>
                <div class="brief text-hidden1">
                  <i class="iconfont icon-phone07 b-i"></i>
                  <span class="con">{{showCard_mian.phone_one}}</span>
                  <span class="con" v-if="showCard_mian.phone_two">，{{showCard_mian.phone_two}}</span>
                  <span class="con" v-if="showCard_mian.phone_three">，{{showCard_mian.phone_three}}</span>
                </div>
              </div>
            </div>
            <div class="info-list" v-if="showCard_mian.wechat_id">
              <div class="info-item">
                <div class="title">我的微信</div>
                <div class="brief text-hidden1">
                  <i class="iconfont icon-wechat4 b-i"></i>
                  <span class="con">{{showCard_mian.wechat_id}}</span>
                </div>
              </div>
            </div>
            <div class="operate-list">
              <div class="op-item" @click="handleChat('msg')">
                <i class="iconfont icon-message1 o-i"></i>
                <span>私信</span>
              </div>
              <div class="op-item" @click="handleConcern('follow')">
                <i
                  class="iconfont o-i"
                  :class="[isConcern || user_id == target_id ? 'icon-collect1' : 'icon-collect2']"
                ></i>
                <span>关注</span>
              </div>
              <div class="op-item" @click="handleFriend('friend')">
                <i
                  class="iconfont o-i"
                  :class="[isFriend === '已添加' || user_id == target_id ? 'icon-friend-fill' : 'icon-friend']"
                ></i>
                <span>好友</span>
              </div>
              <div class="op-item" @click="handleReliable('reliable')">
                <i class="iconfont o-i" :class="[isReliable ? 'icon-zan' : 'icon-zan2']"></i>
                <span>靠谱</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 电子名片编辑组件 -->
        <div v-if="showTab === 2" class="card-show">
          <edit-my-card @handleChildData="handleChildData" />
        </div>
        <!-- 全部、建头条、业务列表组件 -->
        <div v-if="showTab === 3" class="card-show">
          <!-- <tab-list /> -->
          <div class="tab-list">
            <el-button type="text" icon="el-icon-arrow-left" @click="handleClickBack">返回</el-button>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部" name="tab1">
                <div class="tab-page" v-loading="isLoading2">
                  <div class="no-data" v-if="allList.length === 0">暂无数据</div>
                  <!-- 列表的每一项 -->
                  <div class="t-p-i" v-for="(allOne, index) in allList" :key="index">
                    <!-- 相同样式的头部 -->
                    <div class="list-top">
                      <div class="l-t-left">
                        <div class="img big-img">
                          <img :src="allOne.avatar ? allOne.avatar : '../assets/CAT-02.png'" alt />
                        </div>
                        <div class="info">
                          <span class="name">{{allOne.username}}</span>
                          <span class="time">{{allOne.created}}</span>
                        </div>
                      </div>
                      <i
                        class="iconfont icon-delete d-i"
                        v-if="allOne.user_id == user_id"
                        @click="handleDelIcon(allOne.id ? '建投条' : '业务', allOne.id || allOne.jbxx_id, allOne.filename || '')"
                      ></i>
                    </div>
                    <!-- 建头条内容样式 -->
                    <div
                      class="list-bottom"
                      v-if="allOne.id"
                      @click="handleClickArtContent(allOne)"
                    >
                      <div class="art-content text-hidden2">{{allOne.content}}</div>
                      <div class="art-img">
                        <img
                          v-for="(one, s_index) in allOne.images.slice(0, 3)"
                          :key="s_index"
                          :src="one"
                          alt
                          class="img"
                        />
                        <div
                          class="img-bg"
                          v-if="allOne.images.length > 3"
                        >+{{allOne.images.length - 3}}</div>
                      </div>
                      <div class="art-footer">
                        <span class="read-num">{{allOne.read_volume}}</span>
                        <span class="zan-num" @click.stop="getUpvote(allOne, '全部')">
                          <i
                            class="iconfont icon-zan r-i"
                            :style="{color: allOne.is_upvote === 1 ? '#409eff' : ''}"
                          ></i>
                          {{allOne.upvote_cnt ? allOne.upvote_cnt : 0}}
                        </span>
                      </div>
                    </div>
                    <!-- 业务内容样式 -->
                    <div class="list-bottom1" style="margin-top:5px;" v-if="allOne.jbxx_id">
                      <div class="pro-left" @click="handleGoProBrief(allOne)">
                        <div class="name">{{allOne.xmmc}}</div>
                        <div
                          class="other"
                          v-if="allOne.xmyz && allOne.xmyz != 'null'"
                        >项目业主：{{allOne.xmyz}}</div>
                        <div class="other" v-if="allOne.xmdq">项目地区：{{allOne.xmdq}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <el-pagination
                  background
                  layout="total, prev, pager, next"
                  :total="allTotal"
                  :page-size="allRows"
                  :current-page="allPage"
                  @current-change="handleAllPageChange"
                ></el-pagination>
              </el-tab-pane>
              <el-tab-pane label="建投条" name="tab2">
                <div class="tab-page" v-loading="isLoading2">
                  <div class="no-data" v-if="articleList.length === 0">暂无数据</div>
                  <!-- 列表的每一项 -->
                  <div class="t-p-i" v-for="(articleOne, index) in articleList" :key="index">
                    <!-- 相同样式的头部 -->
                    <div class="list-top">
                      <div class="l-t-left">
                        <div class="img big-img">
                          <img
                            :src="articleOne.avatar ? articleOne.avatar : '../assets/CAT-02.png'"
                            alt
                          />
                        </div>
                        <div class="info">
                          <span class="name">{{articleOne.username}}</span>
                          <span class="time">{{articleOne.created}}</span>
                        </div>
                      </div>
                      <i
                        class="iconfont icon-delete d-i"
                        v-if="articleOne.user_id == user_id"
                        @click="handleDelIcon('建投条', articleOne.id, articleOne.filename)"
                      ></i>
                    </div>
                    <!-- 建头条内容样式 -->
                    <div class="list-bottom" @click="handleClickArtContent(articleOne)">
                      <div class="art-content text-hidden2">{{articleOne.content}}</div>
                      <div class="art-img">
                        <img
                          v-for="(one, s_index) in articleOne.images.slice(0, 3)"
                          :key="s_index"
                          :src="one"
                          alt
                          class="img"
                        />
                        <div
                          class="img-bg"
                          v-if="articleOne.images.length > 3"
                        >+{{articleOne.images.length - 3}}</div>
                      </div>
                      <div class="art-footer">
                        <span class="read-num">{{articleOne.read_volume}}</span>
                        <span class="zan-num" @click.stop="getUpvote(articleOne, '建投条')">
                          <i
                            class="iconfont icon-zan r-i"
                            :style="{color: articleOne.is_upvote == 1 ? '#409eff' : ''}"
                          ></i>
                          {{articleOne.upvote_cnt ? articleOne.upvote_cnt : 0}}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <el-pagination
                  background
                  layout="total, prev, pager, next"
                  :total="articleTotal"
                  :page-size="articleRows"
                  :current-page="articlePage"
                  @current-change="handleArtPageChange"
                ></el-pagination>
              </el-tab-pane>
              <el-tab-pane label="业务" name="tab3">
                <div class="tab-page" v-loading="isLoading2">
                  <div class="no-data" v-if="proList.length === 0">暂无数据</div>
                  <div class="t-p-i" v-for="(proOne, index) in proList" :key="index">
                    <!-- 业务内容样式 -->
                    <div class="list-bottom1">
                      <div class="pro-left" @click="handleGoProBrief(proOne)">
                        <div class="name">{{proOne.xmmc}}</div>
                        <div
                          class="other"
                          v-if="proOne.xmyz && proOne.xmyz != 'null'"
                        >项目业主：{{proOne.xmyz}}</div>
                        <div class="other" v-if="proOne.xmdq">项目地区：{{proOne.xmdq}}</div>
                        <div class="other">创建时间：{{proOne.created}}</div>
                      </div>
                      <div
                        class="pro-right"
                        v-if="proOne.user_id == user_id"
                        @click="handleDelIcon('业务', proOne.jbxx_id)"
                      >
                        <i class="iconfont icon-delete d-i"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <el-pagination
                  background
                  layout="total, prev, pager, next"
                  :total="proTotal"
                  :page-size="proRows"
                  :current-page="proPage"
                  @current-change="handleProPageChange"
                ></el-pagination>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 建头条详情页面 -->
        <div v-if="showTab === 7" class="card-show">
          <article-brief :curBrief="curBrief" :curTab="curTab" @handleChildData="handleChildData" />
        </div>
        <!-- 私信、关注、好友列表组件 -->
        <div v-if="showTab === 4" class="card-show">
          <msg-list :tabName="tabName" @handleChildData="handleChildData" />
        </div>
        <!-- 浏览、关注、信任、靠谱组件 -->
        <div v-if="showTab === 6" class="card-show">
          <follow-list :userId="target_id" :tabName="tabName" @handleChildData="handleChildData" />
        </div>
        <!-- 私信聊天组件 -->
        <div v-if="showTab === 8" class="card-show">
          <chat-view @handleChildData="handleChildData" />
        </div>
      </div>
    </div>
    <el-dialog title="地图" :visible.sync="isShowMapDialog" width="80%">
      <baiduMap :initArea="currentInitArea" :readOnly="isReadOnly"></baiduMap>
    </el-dialog>
  </div>
</template>

<script>
import editMyCard from "./personalCard/editMyCard.vue";
import articleBrief from "./personalCard/articleBrief.vue";
import msgList from "./personalCard/msgList.vue";
import followList from "./personalCard/followList.vue";
import chatView from "./personalCard/ChatView.vue";
import { mapState } from "vuex";
import baiduMap from "@/pages/personalCard/baiduMap.vue";
import "social-share.js/dist/css/share.min.css";
import "social-share.js/dist/js/social-share.min.js";
export default {
  components: {
    editMyCard,
    articleBrief,
    baiduMap,
    msgList,
    followList,
    chatView
  },
  data() {
    return {
      isLoading1: false, // 名片信息加载提示
      isLoading2: false, // tab页列表加载信息
      isLoading3: false, // 关注图标按钮状态-防止多次点击
      isShowMapDialog: false,
      currentInitArea: "",
      isReadOnly: true,
      user_id: "",
      showTab: 1, // 1-默认展示名片信息 2-展示编辑组件 3-展示建头条等列表组件 4-展示私信、关注、好友列表组件 5-展示发布页面组件 6-浏览、关注、信任、靠谱组件 7-展示建投条详情页面 8-私信聊天组件
      tabName: "",
      // 路由参数
      target_id: "",
      card_name: "",
      //
      bgStyle: {
        backgroundImage: "url(" + require("../assets/cardBg.png") + ")",
        backgroundSize: 100 % "180px",
        backgroundRepeat: "no-repeat"
      },
      bgStyle1: {
        backgroundImage: "url(" + require("../assets/card_bg1.jpg") + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      },
      bgStyle2: {
        backgroundImage: "url(" + require("../assets/card_bg.png") + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      },
      tabList: ["全部", "建头条", "业务"],
      curTab: 0,
      banner: "", // 竖版背景
      banner2: "", // 横版背景
      bgColor: "#fff", // 横版背景色
      cardStyle: 1, // 1-样式一 2-样式二
      isCreated: false, // 是否创建了电子名片
      showCard_comp: [],
      curComp: 0, // 当前展示的公司的下标
      showCard_mian: {
        card_name: "",
        phone_one: "",
        phone_two: "",
        phone_three: "",
        wechat_id: "",
        card_avatar: "",
        tag_name: []
      },
      // 别人关注我的数据
      cardStatis: {
        avatar: [],
        browse: 0,
        concern: 0,
        reliable: 0,
        trust_me: 0
      },
      isReliable: false, // 是否点击了靠谱
      // 全部tab页
      allPage: 1,
      allRows: 10,
      allList: [],
      allOne: {},
      allTotal: 0,
      // 建头条
      articleList: [],
      articlePage: 1,
      articleRows: 10,
      articleOne: {},
      articleTotal: 0,
      curBrief: {},

      // 业务
      proList: [],
      proOne: {},
      proPage: 1,
      proRows: 10,
      proTotal: 0,
      //
      isFriend: "未添加", // 是否是好友 未添加、已添加、审核中、已拒绝
      isConcern: false, // 是否关注
      activeName: "tab1",
      getCutUrlKey: true,
      config: {
        url: window.location.href, // 网址，默认使用 window.location.href
        source: "标题", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: this.$route.query.card_name + "的电子名片", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image:
          "https://wechat.cdzjkl.com/files/options/" +
          this.$store.state.userInfo.gs_logo, // 图片, 默认取网页中第一个img标签
        sites: ["qq", "wechat", "qzone", "weibo", "douban"], // 启用的站点
        // disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
      },
      role: {}, // 权限
      // 名片二维码
      codeUrl: ""
    };
  },
  computed: {
    // 名片二维码接口地址
    httpUrl() {
      return process.env.NODE_ENV === "development"
        ? "https://test.cdzjkl.com/MaoHu/public/index.php/index/Mine/getUserQr"
        : "https://mobile.cdzjkl.com/MaoHuTest/public/index.php/index/Mine/getUserQr";
    }
  },
  created() {
    this.user_id = this.$store.state.userInfo.user_id;
    this.target_id = this.$route.query.target_id || "";
    this.codeUrl =
      this.httpUrl +
      "?user_id=" +
      this.target_id +
      "&login_user_id=" +
      this.user_id +
      "&login_type=app";
    this.card_name = this.$route.query.card_name || "";
    this.showTab = Number(this.$route.query.showTab || 1);
    document.title = this.card_name + "-电子名片";
    // 请求权限接口
    this.fn_role();
    // 当前登录的人是否创建了名片
    this.getIfCreateCard();
    if (this.target_id != this.user_id) {
      // 是否点击了靠谱
      this.getIfReliable();
      // 是否是好友
      this.getIfFriend();
    }
    // 请求已有名片的信息
    this.getShowCard();
    // 当前浏览的这个名片所属人的浏览、关注、信任等数量
    this.getCardStatis();
    // 请求tab页 全部数据列表
    this.getAllInfomation();
  },
  destroyed() {
    if (this.target_id != this.user_id) {
      this.getSaveBrowse();
    }
  },
  methods: {
    // 权限控制 点击公司名称时
    fn_role() {
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
    // 点击公司名称 有gs_id则跳转到公司详情页面
    handleClickCompanyName(row) {
      if (!row.comp_base_id) {
        // 没有gs_id
        this.$message('暂无公司详情信息');
        return;
      }
      if (this.role.company_role !== "C") {
        let { href } = this.$router.resolve({
          path: `/gsDetail?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&gs_id=${row.comp_base_id}&gsmc=${row.comp_name}`
        });
        window.open(href, "公司详情" + row.comp_base_id);
      } else {
        this.axios.post(
          "/index/mine/roleCompSource",
          { gs_id: row.comp_base_id },
          res => {
            // 获取跳转页面结果
            //   console.log(res)
            if (res === "四川省建设厅") {
              let { href } = this.$router.resolve({
                path: `/gs_scjst?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&gs_id=${row.comp_base_id}`
              });
              window.open(href, "/gs_scjst" + row.comp_base_id);
            } else {
              let { href } = this.$router.resolve({
                path: `/gs_building?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&gs_id=${row.comp_base_id}`
              });
              window.open(href, "/gs_building" + row.comp_base_id);
            }
          }
        );
      }
    },
    // 点击公司地址 弹出地图弹窗 进行定位
    handleClickAddress(address) {
      this.currentInitArea = address;
      this.isShowMapDialog = true;
    },
    // 展示tab放大列表页 点击切换tab页
    handleClick(tab, event) {
      let index =
        this.activeName === "tab1" ? 0 : this.activeName === "tab2" ? 1 : 2;
      this.handleChangeTab(index);
    },
    // 监听子组件传来的数据
    handleChildData(childData) {
      if (childData.showTab === 2) {
        // 编辑页面
        this.showTab = 1;
        if (childData.operate === "save") {
          // 点击保存按钮
          this.getShowCard();
        }
      } else if (childData.showTab === 7) {
        this.showTab = 3;
        this.curTab = childData.curTab;
        switch (this.curTab) {
          case 0:
            this.activeName = "tab1";
            this.getAllInfomation();
            break;
          case 1:
            this.activeName = "tab2";
            this.getArticleList();
            break;
          case 2:
            this.activeName = "tab3";
            this.getProjectList();
            break;
          default:
            break;
        }
      } else if (
        childData.showTab === 4 ||
        childData.showTab === 6 ||
        childData.showTab === 8
      ) {
        this.showTab = 1;
      }
    },
    // 点击切换样式
    handleChangeStyle(type) {
      this.cardStyle = type;
      // 调用保存当前名片样式接口
      // this.getSaveCardStyle();
    },
    // 调用保存当前名片样式接口
    getSaveCardStyle() {
      this.axios.post(
        "/relation/User_Card/saveCardStyle",
        {
          user_id: this.target_id,
          card_style: this.showStyle
        },
        data => {}
      );
    },
    // 当前登录的人是否创建了名片
    getIfCreateCard() {
      this.axios.post(
        "/relation/User_Card/ifCreateCard",
        {
          user_id: this.user_id
        },
        data => {
          if (data.status === "success") {
            this.isCreated = data.res;
            // this.isShow = !data.res;
          }
        }
      );
    },
    // 请求已有名片的信息
    getShowCard() {
      this.isLoading1 = true;
      this.axios.post(
        "/relation/User_Card/showCard",
        {
          user_id: this.target_id,
          cate: "display"
        },
        data => {
          if (data.status === "success") {
            // this.showStyle = 2;
            // 竖版
            this.banner = data.rows.def_ver_bg;
            // 横版
            this.banner2 = data.rows.hor_bg;
            this.bgColor = data.rows.hor_color;
            this.showStyle =
              data.rows.mian && data.rows.mian.card_style
                ? data.rows.mian.card_style
                : 1;
            let len = data.rows.comp ? data.rows.comp.length : 0;
            this.showCard_comp = data.rows.comp || [];
            this.showLen = this.showCard_comp.length;
            let showCard_mian = {};
            if (data.rows.mian) {
              showCard_mian = data.rows.mian;
              showCard_mian.tag_name = showCard_mian.tag_name
                ? showCard_mian.tag_name.split(",")
                : [];
            } else {
              showCard_mian = {
                card_name: "",
                phone_one: "",
                phone_two: "",
                phone_three: "",
                wechat_id: "",
                card_avatar: "",
                tag_name: []
              };
            }
            this.showCard_mian = showCard_mian;

            // this.banner = data.rows.banner;
            // this.banner2 = data.rows.banner2;
          }
          this.$nextTick(function() {
            this.isLoading1 = false;
          });
        }
      );
    },
    // 当前浏览的这个名片所属人的浏览、关注、信任等数量
    getCardStatis(type) {
      this.axios.post(
        "/relation/User_Card/cardStatis",
        {
          user_id: this.target_id,
          cate: 1
          // target_id: this.target_id
        },
        data => {
          if (data.status === "success") {
            let cardStatis = data.res;
            if (cardStatis) {
              cardStatis.avatar = cardStatis.avatar
                ? cardStatis.avatar.split(",")
                : [];
            }
            this.cardStatis = cardStatis;
            if (type === "click") {
              this.isReliable = !this.isReliable;
              if (this.isReliable) {
                this.$message({
                  message: "点赞成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "取消点赞",
                  type: "success"
                });
              }
            }
          }
        }
      );
    },
    // 点击切换tab页
    handleChangeTab(index) {
      this.showTab = 3;
      if (this.curTab === index) {
        // 防止重复请求
        return;
      }
      this.curTab = index;

      switch (index) {
        case 0:
          this.activeName = "tab1";
          this.getAllInfomation();
          break;
        case 1:
          this.activeName = "tab2";
          this.getArticleList();
          break;
        case 2:
          this.activeName = "tab3";
          this.getProjectList();
          break;
        default:
          break;
      }
    },
    // tab页 点击返回按钮
    handleClickBack() {
      this.showTab = 1;
    },
    // 请求tab页 全部数据列表
    getAllInfomation() {
      this.isLoading2 = true;
      this.axios.post(
        "/relation/service/allInfomation",
        {
          user_id: this.user_id,
          friend_id: this.target_id,
          page: this.allPage,
          rows: this.allRows
        },
        data => {
          if (data.status === "success") {
            // let list = data.rows;
            let list = data.rows;
            list.forEach(item => {
              if (item.images) {
                item.images = item.images.split(",");
                // item.images.forEach((one, index) => {
                //   item.images[index] = this.imgUrl + one;
                // });
              } else {
                if (item.id) {
                  item.images = [];
                }
              }
            });
            this.allList = list;
            this.allOne = list[0];
            this.allTotal = data.total;
          } else {
            this.allList = [];
            if (this.allPage === 1) {
              this.allOne = {};
            }
          }
          this.$nextTick(function() {
            this.isLoading2 = false;
          });
        }
      );
    },
    // 请求tab页 建投条数据列表
    getArticleList() {
      this.isLoading2 = true;
      this.artStatus = "loading";
      this.isArtLoading = true;
      this.axios.post(
        "/relation/service/articleList",
        {
          user_id: this.user_id,
          type: "content",
          service_id: "",
          friend_id: this.target_id || "",
          page: this.articlePage,
          rows: this.articleRows
        },
        data => {
          if (data.status === "success") {
            let list = data.rows;
            list.forEach(item => {
              if (item.images) {
                item.images = item.images.split(",");
                // item.images.forEach((one, index) => {
                //   item.images[index] = this.imgUrl + one;
                // });
              } else {
                item.images = [];
              }
            });
            this.articleList = list;
            this.articleOne = list[0];
            this.articleTotal = data.total;
          } else {
            this.articleList = [];
            if (this.articlePage === 1) {
              this.articleOne = {};
            }
          }
          this.$nextTick(function() {
            this.isLoading2 = false;
          });
        }
      );
    },
    // 建投条 调用点赞接口
    getUpvote(item, tab) {
      let type = "";
      if (item.is_upvote === 0 || item.is_upvote === "") {
        // 没有点赞 调用点赞接口
        type = 1;
      } else {
        // 已经点赞 调用取消点赞接口
        type = 0;
      }
      this.axios.post(
        "/relation/service/upvote",
        {
          id: item.id,
          user_id: this.user_id,
          type: type
        },
        data => {
          if (data.status == "success") {
            // 点赞成功
            let row = { ...item };
            // this.allPage = 1;
            // this.getAllInfomation();
            // this.articlePage = 1;
            // this.getArticleList();
            if (tab === "全部") {
              let curIndex = 0;
              this.allList.some((v, i) => {
                if (v.id === row.id) {
                  curIndex = i;
                  row.is_upvote = type;
                  row.upvote_cnt =
                    type === 0 ? row.upvote_cnt - 1 : row.upvote_cnt + 1;

                  return true;
                }
              });
              this.$set(this.allList, curIndex, row);
              if (this.allOne.id === row.id) {
                this.allOne.is_upvote = type;
                this.allOne.upvote_cnt =
                  type === 0
                    ? this.allOne.upvote_cnt - 1
                    : this.allOne.upvote_cnt + 1;
              }
            } else {
              let curIndex = 0;
              this.articleList.some((v, i) => {
                if (v.id === row.id) {
                  curIndex = i;
                  row.is_upvote = type;
                  row.upvote_cnt =
                    type === 0 ? row.upvote_cnt - 1 : row.upvote_cnt + 1;
                  return true;
                }
              });
              this.$set(this.articleList, curIndex, row);
              if (this.articleOne.id === row.id) {
                this.articleOne.is_upvote = type;
                this.articleOne.upvote_cnt =
                  type === 0
                    ? this.articleOne.upvote_cnt - 1
                    : this.articleOne.upvote_cnt + 1;
              }
            }
          }
        }
      );
    },
    // 点击建投条内容部分 跳转到详情页面
    handleClickArtContent(item) {
      this.showTab = 7;
      this.curBrief = item;
    },

    // 请求tab页 业务数据列表
    getProjectList() {
      this.isLoading2 = true;
      this.axios.post(
        "/index/project/projectList",
        {
          user_id: this.target_id,
          xmmc: "",
          service_id: "",
          xmdq: "",
          type: "自建项目",
          page: this.proPage,
          rows: this.proRows
        },
        data => {
          if (data.status === "success") {
            this.proList = data.rows;
            this.proOne = data.rows[0];
            this.proTotal = data.total;
          } else {
            this.proList = [];
            if (this.proPage === 1) {
              this.proOne = {};
            }
          }
          this.$nextTick(function() {
            this.isLoading2 = false;
          });
        }
      );
    },
    // 点击项目名称 进行跳转
    handleGoProBrief(val) {
      let name = "zj",
        pageType = "自建项目";
      if (this.target_id != this.user_id) {
        name = "wb";
        pageType = "外部项目";
      }
      let obj = {
        name: name,
        xmmc: val.xmmc ? val.xmmc : "",
        company_id: val.company_id ? val.company_id : "",
        jbxx_id: val.jbxx_id ? val.jbxx_id : "",
        xmyz: val.xmyz ? val.xmyz : "",
        xmdq: val.xmdq ? val.xmdq : "",
        user_id: val.user_id ? val.user_id : "",
        login_user_id: this.user_id,
        service_id: val.service_id ? val.service_id : "",
        analyst_id: val.analyst_id ? val.analyst_id : ""
      };

      let routeData = this.$router.resolve({
        name: "qyztbDetails",
        query: obj
      });
      window.open(routeData.href, val.xmmc + pageType + "qyZtbPage");
    },
    // 点击tab页删除图标
    handleDelIcon(type, id, filename) {
      this.$confirm("确定删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (type === "建投条") {
            this.getDelArticle(id, filename);
          } else {
            this.getProjectDelete(id);
          }
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    // 调用删除建投条接口
    getDelArticle(id, filename) {
      this.axios.post(
        "/relation/service/delArticle",
        {
          id: id
        },
        data => {
          if (data.status == "success") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            if (filename) {
              this.getDelUpload(filename);
            }
            this.allPage = 1;
            this.getAllInfomation();
            this.articlePage = 1;
            this.getArticleList();
          }
        }
      );
    },
    // 调用删除图片接口
    getDelUpload(filename) {
      this.axios.post(
        "/index/common/delUpload",
        {
          filename: filename
        },
        data => {
          if (data.status === "success") {
          }
        }
      );
    },
    // 调用删除业务列表接口
    getProjectDelete(id) {
      this.axios.post(
        "/index/project/projectDelete",
        {
          user_id: this.user_id,
          jbxx_id: id,
          type: "自建项目"
        },
        data => {
          if (data.status === "success") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });

            this.allPage = 1;
            this.getAllInfomation();
            this.proPage = 1;
            this.getProjectList();
          }
        }
      );
    },
    // tab页 改变全部的页数
    handleAllPageChange(val) {
      // console.log(val, 'page')
      this.allPage = val;
      this.getAllInfomation();
    },
    // tab页 改变建投条的页数
    handleArtPageChange(val) {
      console.log(val, "page");
      this.articlePage = val;
      this.getArticleList();
    },
    // tab页 改变业务的页数
    handleProPageChange(val) {
      console.log(val, "page");
      this.proPage = val;
      this.getProjectList();
    },
    // 点击编辑或者立即创建按钮
    handleGoEditCard() {
      if (this.user_id != this.target_id || this.showTab === 2) {
        // 别人的名片
        return;
      }
      this.showTab = 2;
    },
    // 进入别人的名片时 调用一次浏览接口
    getSaveBrowse() {
      this.axios.post(
        "/relation/User_Card/saveBrowse",
        {
          user_id: this.user_id,
          target_id: this.target_id
        },
        data => {
          if (data.status === "success") {
          }
        }
      );
    },

    // 判断当前登录用户是否给当前好友名片点击过靠谱
    getIfReliable() {
      this.axios.post(
        "/relation/User_Card/ifReliable",
        {
          user_id: this.user_id,
          target_id: this.target_id
        },
        data => {
          if (data.status === "success") {
            this.isReliable = data.res;
          }
        }
      );
    },
    // 点击靠谱
    handleReliable(type) {
      if (this.user_id == this.target_id) {
        // this.handleGoToLookList("4");
        this.tabName = type;
        this.showTab = 6;
      } else {
        let url = "";
        if (this.isReliable) {
          // 已经靠谱，然后点击靠谱
          url = "/relation/User_Card/delReliable";
        } else {
          url = "/relation/User_Card/saveReliable";
        }
        this.axios.post(
          url,
          {
            user_id: this.user_id,
            target_id: this.target_id
          },
          data => {
            if (data.status === "success") {
              // 用参数判断接口调用的时间 做出不同的操作
              this.getCardStatis("click");
            }
          }
        );
      }
    },
    // 点击浏览、关注、信任 查看列表
    handleToFollowList(type) {
      this.tabName = type;
      this.showTab = 6;
    },
    // 点击私信
    handleChat(type) {
      if (this.user_id != this.target_id) {
        this.showTab = 8;
      } else {
        this.tabName = type;
        this.showTab = 4;
      }
    },
    // 点击关注
    handleConcern(type) {
      if (this.user_id != this.target_id) {
        if (this.isLoading3) return; // 防止多次点击
        this.isLoading3 = true;
        // 进入别人的名片
        let url = "";
        if (this.isConcern) {
          // 已经关注，然后点击取消
          url = "/relation/User_Card/delConcern";
        } else {
          url = "/relation/User_Card/saveConcern";
        }
        this.axios.post(
          url,
          {
            user_id: this.user_id,
            target_id: this.target_id
          },
          data => {
            if (data.status === "success") {
              this.isConcern = !this.isConcern;
              this.isLoading3 = false;
              this.getCardStatis();
              if (this.isConcern) {
                this.$message({
                  message: "关注成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "取消关注",
                  type: "success"
                });
              }
            }
          }
        );
      } else {
        // 自己的名片
        // 跳转至我的关注列表
        this.tabName = type;
        this.showTab = 4;
      }
    },
    // 进入别人名片时 判断是否是自己的好友
    getIfFriend() {
      this.axios.post(
        "/relation/User_Card/ifFriend",
        {
          user_id: this.user_id,
          target_id: this.target_id
        },
        data => {
          if (data.status === "success") {
            this.isFriend = data.res;
          }
        }
      );
    },
    // 调用添加好友接口
    getSaveUserTemp() {
      this.axios.post(
        "/relation/Person_Service/saveUserUserTemp",
        {
          user_id: this.user_id,
          target_id: this.target_id,
          add_type: "card",
          name: this.showCard_mian.card_name
        },
        data => {
          if (data.status === "success") {
            this.$message({
              message: "发送请求成功，待对方同意。",
              type: "success"
            });
            this.isFriend = "审核中";
          }
        }
      );
    },
    // 调用删除好友接口
    getDelResUser() {
      this.axios.post(
        "/relation/Person_Service/delResUser",
        {
          source_id: this.user_id,
          target_id: this.target_id,
          type: "delete"
        },
        data => {
          if (data.status === "success") {
            this.$message({
              message: "删除好友成功",
              type: "success"
            });
            this.isFriend = "未添加";
          }
        }
      );
    },
    // 点击好友
    handleFriend(type) {
      if (this.user_id != this.target_id) {
        // 进入别人的电子名片
        switch (this.isFriend) {
          case "未添加":
            // 调用添加好友接口
            this.getSaveUserTemp();
            break;
          case "已添加":
            // 弹出提示窗口 确定删除好友
            this.$confirm("确定删除好友吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.getDelResUser();
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消删除"
                });
              });
            break;
          case "审核中":
            this.$message({
              message: "你已发送添加申请，请勿重复操作",
              type: "warning"
            });
            break;
          case "已拒绝":
            // 弹出提示窗口 重新添加好友
            this.$confirm("对方已拒绝你的申请，确定重新添加吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.getSaveUserTemp();
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消删除"
                });
              });

            break;
          default:
            break;
        }
      } else {
        this.tabName = type;
        this.showTab = 4;
      }
    }
  }
};
</script>>

<style lang="less" scoped>
::-webkit-scrollbar {
  width: 0;

  // height: 10px;
  // color: #f3f3f3;
}
.text-hidden1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.text-hidden2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.no-data {
  // margin: 0 auto;
  text-align: center;
  color: #999;
}

.wrapper {
  width: 100%;
  // padding-top: 100px;
  cursor: default;
}
.codeurl-wra {
  // width: 50px;
  // height:50px;
  // border:1px solid #d5d5d5;
  height: 150px;
  .img {
    // width: 100%;
    height: 100%;
  }
}
.card-wrapper {
  width: 1200px;
  //   height: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  .card-left {
    width: 368px;
    height: 100%;
    // border: 1px solid pink;
    box-sizing: border-box;
    //   margin-top: 100px;
    .card-show {
      width: 100%;
      .co-zan {
        height: 24px;
        line-height: 24px;
        width: 80px;
        position: absolute;
        top: 180px;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #409eff;
        font-size: 12px;
        background-color: #fff;
        box-shadow: 0 0 1px #409eff;
        border-radius: 12px 0 0 12px;
        z-index: 1;
        .z-i {
          font-size: 14px;
        }
      }
      .mini-card {
        width: 100%;
        height: 630px;
        border: 10px solid #f3f3f3;
        border-radius: 20px;
        box-sizing: border-box;
        background-color: #f3f3f3;
        font-size: 14px;

        .navigator-bar {
          background-color: #409eff;
          color: #fff;
          text-align: center;
          height: 40px;
          line-height: 40px;
          border-radius: 20px 20px 0 0;
        }
        .card-style-wra {
          width: 100%;
          height: 570px;
          background-color: #fff;
          border-radius: 0 0 20px 20px;
          padding-bottom: 10px;
          box-sizing: border-box;
          overflow-y: auto;
        }
        .card-style_1,
        .card-style_2 {
          // width: 100%;
          width: 348px;

          position: relative;
        }
        .card-style_2 {
          padding-top: 10px;
        }
        .company-top {
          color: #fff;
          .i-s {
            font-size: 16px;
          }
          width: 100%;
          padding: 0 10px;
          box-sizing: border-box;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .top-left {
            width: calc(100% - 100px);

            display: flex;
            align-items: center;
            .name {
            }
          }
          .top-right {
            width: 90px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-left: 10px;

            .c-s {
              // display: inline-block;
              margin-left: 5px;
              cursor: default;
            }
          }
        }
        .card-style1 {
          width: 100%;
          // height: 200px;
          .card-bg {
            width: 100%;
            height: 100px;
            background-size: cover;
            background-repeat: no-repeat;
          }
          .co-zan1 {
            top: 70px;
          }
          .c-top {
            width: 100%;
            height: 30px;
            background-color: rgba(0, 0, 0, 0.4);
            position: absolute;
            top: 0;
            left: 0;
          }
          .card-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            top: 60px;
            left: 50%;
            margin-left: -40px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .op-wra {
            padding: 0 10px;
            height: 40px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 12px;
            .edit {
              color: #999;
              cursor: default;
            }
            .created {
              height: 20px;
              line-height: 20px;
              color: #fff;
              background-color: #409eff;
              border-radius: 10px;
              padding: 0 10px;
              cursor: default;
            }
          }
          .c-info {
            padding: 10px 0;
            border-bottom: 1px solid #f3f3f3;

            .c-title {
              text-align: center;
              .name {
                color: #409eff;
                font-weight: bold;
              }
              .duty {
                font-size: 12px;
              }
            }
            .c-num {
              text-align: center;
              color: #999;
              cursor: default;
              .line {
                padding: 0 5px;
              }
            }
            .tag-list {
              color: #999;
              text-align: center;
              .tag-item {
                display: inline-block;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                padding: 0 8px;
                border: 1px solid #d5d5d5;
                box-sizing: border-box;
                border-radius: 10px;
                margin-left: 5px;
                margin-top: 5px;
              }
            }
          }
          .ad-info {
            border-bottom: 10px solid #f3f3f3;
          }
          .chat-info {
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            border-bottom: 1px solid #f3f3f3;
            box-sizing: border-box;
            font-size: 12px;
            .c-i {
              color: #409eff;
              font-size: 14px;
              margin-right: 2px;
            }
          }
        }
        .card-style2 {
          width: calc(100% - 20px);
          height: 200px;
          border-radius: 10px;
          padding: 10px 0;
          box-sizing: border-box;
          margin: 0 auto;
          // color: #fff;
          background-size: cover;
          background-repeat: no-repeat;
          .company-m {
            padding-left: 10px;
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
          }
          .company-m-l {
            width: calc(100% - 80px);
          }
          .company-m-r {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .tag {
              display: inline-block;
              font-size: 10px;
              width: 92px;
              height: 18px;
              line-height: 18px;
              text-align: center;
              background-color: rgba(255, 255, 255, 0.2);
              border-radius: 9px 0 0 9px;
              margin-top: 5px;
            }
          }
          .card-avatar {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .info {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              margin-left: 10px;
              .t_1 {
                font-weight: 600;
              }
              .t_2 {
                font-size: 12px;
              }
            }
          }
          .re-s {
            display: flex;
            align-items: center;
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            .b-i {
              font-size: 12px;
            }
            .txt {
              margin-left: 5px;
            }
          }
        }
        .info-scroll {
          font-size: 12px;
          color: #333;
          width: calc(100% - 20px);
          overflow-x: auto;
          box-sizing: border-box;
          margin: 10px auto 0;
          white-space: nowrap;
          .s-item {
            max-width: 200px;
            display: inline-block;
            padding: 5px 10px;
            margin-right: 10px;
            border: 1px solid #f3f3f3;
            border-radius: 4px;
            box-shadow: 0 4px 4px #f3f3f3;
            box-sizing: border-box;
            .s-i-t {
              font-weight: bold;
              .s-i {
                color: #409eff;
                font-size: 14px;
              }
            }
            .s-i-b {
              color: #999;
              // margin-top: 5px;
            }
          }
        }
        .card-look {
          // width: 100%;
          cursor: default;
          padding: 0 10px 10px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f3f3f3;
          .c-l-l {
            .l-l-top {
              position: relative;
              height: 20px;
              .img {
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                top: 0;
              }
              .img1 {
                left: 0;
              }
              .img2 {
                left: 10px;
                z-index: 1;
              }
              .img3 {
                left: 20px;
                z-index: 2;
              }
            }
            span {
              color: #999;
              font-size: 12px;
            }
          }
          .c-l-r {
            display: flex;
            .l-r-i {
              display: flex;
              flex-direction: column;
              align-items: center;
              font-size: 12px;
              color: #999;
              .r-i {
                font-size: 14px;
              }
            }
          }
        }
        .operate-list {
          display: flex;
          justify-content: space-around;
          color: #999;
          border-bottom: 10px solid #f3f3f3;
          .op-item {
            width: 40px;
            height: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: default;
            .o-i {
              color: #409eff;
              font-size: 14px;
            }
            span {
            }
          }
        }
        .tab-list {
          display: flex;
          justify-content: space-around;
          border-bottom: 1px solid #f3f3f3;
          .tab-item {
            border-bottom: 1px solid transparent;
            height: 40px;
            line-height: 40px;
            box-sizing: border-box;
            cursor: default;
          }
          .ac-item {
            color: #409eff;
            border-bottom: 1px solid #409eff;
          }
        }
      }
    }
  }
  // 全部、建投条、业务列表样式
  .tab-page {
    .d-i {
      height: 25px;
      line-height: 25px;
      font-size: 16px;
      text-align: right;
      color: #999;
    }
    .t-p-i {
      padding: 10px 0;
      border-bottom: 1px solid #f3f3f3;
      .list-top {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        // align-items: center;
        .l-t-left {
          display: flex;
          align-items: center;
        }
        .img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          .name {
            font-weight: bold;
          }
          .time {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .art-content {
        padding: 0 10px;
        margin-top: 5px;
      }
      .art-img {
        display: flex;
        flex-wrap: wrap;
        padding-left: 10px;
        margin: 5px 0;
        .img {
          margin-right: 5px;
          margin-bottom: 5px;
          // width: 32.3%;
          width: 106px;
          height: 100px;
          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
      .art-footer {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;
        .read-num {
        }
        .zan-num {
          color: #333;
          .r-i {
            color: #999;
            font-size: 14px;
            margin-right: 5px;
          }
        }
      }
      .list-bottom1 {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;
        .pro-left {
          flex: 1;
          .name {
            color: #409eff;
          }
          .other {
            font-size: 12px;
          }
        }
        .pro-right {
          width: 16px;
        }
      }
    }
  }
  .card-right {
    width: calc(100% - 368px);
    height: 100%;
    // border: 1px solid #409eff;
    padding: 40px 0 0 66px;
    box-sizing: border-box;
    .card-show {
      width: 100%;
      .card-info {
        width: 100%;
        .c-s-head {
          height: 110px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .head-left {
            display: flex;
            align-items: flex-end;
            .img {
              width: 110px;
              height: 110px;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .info {
              margin-left: 20px;
              .info-t {
                .name {
                  font-size: 20px;
                  font-weight: bold;
                }
                .duty {
                }
              }
              .info-b {
                margin: 10px 0 5px;
                color: #999;
                cursor: default;
                .line {
                  padding: 0 10px;
                }
              }
            }
          }
          .head-right {
            margin-top: 30px;
            // display: flex;
            // flex-direction: column;
            // justify-content: space-between;
            // align-items: center;
            // position: relative;
            // .share-btn {
            //   &:hover {
            //     .share {
            //       transition: all 0.3s;
            //       right: 0;
            //     }
            //   }
            // }

            .share {
              display: flex;
              // position: fixed;

              // position: absolute;
              // right: -210px;
              // bottom: 0;
              // &:hover {
              //   transition: all 0.3s;
              //   right: 0;
              // }
            }
          }
        }
        .tag-list {
          margin-top: 30px;
          font-size: 12px;
          padding-bottom: 18px;
          border-bottom: 1px solid #f3f3f3;
          .tag-item {
            display: inline-block;
            width: 100px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            border-radius: 12px;
            background-color: #f3f3f3;
            color: #999;
            margin-right: 10px;
          }
        }
        .info-list {
          border-bottom: 1px solid #f3f3f3;
          display: flex;
          .info-item {
            width: 50%;
            height: 96px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .title {
              // font-size: 16px;
            }
            .brief {
              color: #999;
              .b-i {
                font-size: 16px;
                color: #409eff;
              }
              .con {
                // margin-left:5px;
              }
            }
          }
        }
        .operate-list {
          display: flex;
          justify-content: space-around;

          .op-item {
            height: 90px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .o-i {
              color: #409eff;
              font-size: 30px;
            }
            span {
              color: #999;
              font-size: 14px;
            }
          }
        }
      }
      .tab-list {
        width: 100%;
        // padding-top: 60px;
        padding-top: 50px;
        .tab-page {
          .big-img {
            width: 60px;
            height: 60px;
          }
          .info {
            .name {
              font-size: 20px;
            }
            .time {
              font-size: 16px;
              margin-top: 5px;
            }
          }
          .r-i {
            font-size: 18px;
          }
          .art-img {
            position: relative;
            .img {
              width: 200px;
              height: 150px;
            }
            .img-bg {
              width: 200px;
              height: 150px;
              background-color: rgba(0, 0, 0, 0.4);
              position: absolute;
              top: 0;
              left: 420px;
              color: #fff;
              text-align: center;
              line-height: 150px;
              font-size: 24px;
              cursor: default;
            }
          }
          .pro-left {
            .other {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>