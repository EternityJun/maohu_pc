<template>
    <div class="foot">
        <p>系统开发单位：成都中建科联网络科技有限公司</p>
        <p>系统使用指导电话：028-68731622</p>
    </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  mounted() {
    
  },
  methods: {
    // getUserH() {
    //   let userH = document.body.clientHeight;
    //   console.log(userH);
    // }
  }
};
</script>
<style lang="less" scoped>
.foot {
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 30px 0;
  text-align: center;
  color: gray;
  font-size: 12px;
  z-index: 97;
  background-color: white;
  border-top: 1px solid #d3d3d3;
}
.footBottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 30px 0;
  text-align: center;
  color: gray;
  font-size: 12px;
  z-index: 99;
  background-color: white;
  border-top: 1px solid #d3d3d3;
}
</style>


