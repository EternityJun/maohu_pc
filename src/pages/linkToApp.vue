<template>
  <div>
    <!-- <button id="openApp" @click="submitFn">打开app</button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    // document.title = "企业搜索";
      // window.location.href = "https://www.baidu.com/?tn=98952166_hao_pg";
    let u = navigator.userAgent;
    console.log(u);
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
      window.location.href = "maohu://index";
      window.setTimeout(function() {
        console.log("未安装app");
        // window.location.href = "https://itunes.apple.com/cn/app/id477927812";//打开app下载地址
      }, 2000);
    }
  },
  methods: {
    submitFn() {
      let u = navigator.userAgent;
      console.log(u);
      // if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
      window.location.href = "maohu://index";
      window.setTimeout(function() {
        console.log("未安装app");
        // window.location.href = "https://itunes.apple.com/cn/app/id477927812";//打开app下载地址，有app同事提供
      }, 2000);
      // }
    }
  }
};
</script>
 <style lang="less" scoped>
</style>
