<script setup>
import Action from './components/Action/index.vue'

</script>

<template>
 <h3 class="box-title">收货地址</h3>
  <div class="box-body">
    <Action></Action>
  </div>
</template>

<style lang="scss" scoped>
.box-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 10px;
  line-height: 70px;
  border-bottom: 1px solid #f5f5f5;
}

.box-body {
  padding: 20px 0;
}


</style>