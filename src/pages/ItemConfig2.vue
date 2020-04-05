<!--项目配置-->
<template>
    <div>
        <p class="bt">{{title}}</p>
        <div style="padding:20px 40px">
            <div v-if="thread_idList">
                <el-button v-for="btn in thread_idList" :key="btn.thread_id" :type="btn.selected?'primary':''" @click="onChangeThread(btn.thread_id)">{{btn.name}}</el-button>
            </div>
            <template v-if="thread_idList">
                <config-condition v-for="one in thread_idList" :checkGsList="one.flag == 3?true:false" :defaultThread="one.display == 1?true:false" :key="one.thread_id" :hidden="one.thread_id != thread_id" :parentThreadId="one.thread_id" @changeThread="changeThread"></config-condition>
            </template>
            <template v-else>
                <config-condition :parent="dataset" v-on:onCancel="onCancel" v-on:onSubmitConfig="onSubmitConfig"></config-condition>
            </template>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import configCondition from './template/configCondition2'
export default {
  props: ['dataset'],
  components: {
    configCondition
  },
  data() {
    return {
      thread_idList: null, //方案列表
      son_id: '', //保存方案id
      showAroundTime: false, //显示选择时间
      ajax_number: 0,
      visit_type: false, //显示运行按钮
      fullscreenLoading: false,
      jbxx_id: '', //当前项目id
      thread_id: '', //组件id
      node_id: '', //组件id
      title: '招标文件要求(投标人须知)'
    }
  },
  watch: {
    dataset: function() {
      // console.log('watch1')
      // console.log(this.dataset)
      // this.node_id = this.dataset.node_id;
      // this.show_condition = this.dataset.show_condition;
    }
  },

  created() {
    // console.log('created1')
    // console.log(this.dataset)
    // console.log("配置1.4.1");
    // console.log(this.dataset);
    // this.jbxx_id = this.dataset.jbxx_id;
    this.visit_type = this.$route.query.type ? true : false
    // this.thread_id = this.dataset.thread_id || "";
    // this.node_id = this.dataset.node_id || "";
    // this.show_condition = this.dataset.show_condition || "";
    // this.pid = this.dataset.pid || "";

    //获取方案列表
    if (this.visit_type) {
      this.axios.post(
        '/index/project/thread_list',
        {
          jbxx_id: this.jbxx_id
        },
        data => {
          if ((data.status = 'success')) {
            let list = data.rows.map(v => {
              //默认选中对应方案
              if (v.thread_id == this.thread_id) {
                v.selected = true
              } else {
                v.selected = false
              }
              return v
            })
            this.thread_idList = list
          }
        }
      )
    }
  },
  methods: {
    onCancel() {
      this.$emit('closeDialog', 'zhubiao')
    },
    onSubmitConfig(data) {
      this.$emit('onSubmitConfig', data)
    }
    // 点击方案切换
    // onChangeThread(id) {
    //     this.thread_idList.map(v => {
    //         if (v.thread_id == id) {
    //             v.selected = true;
    //         } else {
    //             v.selected = false;
    //         }
    //         return v;
    //     });
    //     this.thread_id = id;
    // },
    //子级改变方案时间
    // changeThread(obj) {
    //     this.thread_idList.map(v => {
    //         if (obj.type == "默认方案") {
    //             if (v.thread_id == obj.thread_id) {
    //                 v.display = 1;
    //             } else {
    //                 v.display = 0;
    //             }
    //         } else if (obj.type == "公司列表") {
    //             if (v.thread_id == obj.thread_id) {
    //                 v.flag = 3;
    //             } else {
    //                 v.flag = 1;
    //             }

    //             // 关闭弹框
    //             this.$emit()
    //         }
    //         return v;
    //     });
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bt {
  margin: 0 20px;
  border-bottom: 2px solid #06b6ff;
}
</style>
