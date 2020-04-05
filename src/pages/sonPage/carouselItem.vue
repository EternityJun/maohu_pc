<template>
  <div class="carousel-item">
    <div class="mask" @click="onMask($event)"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
    methods:{
      onMask(el){
        this.$parent.onMask(el)
      }
    }
}
</script>

