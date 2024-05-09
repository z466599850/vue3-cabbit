<script setup>
defineProps({
  item: {
    type: null
  }
})
</script>

<template>
  <a class="image" href="javascript:;">
    <img :src="item.image" alt="" />
  </a>
  <div class="info">
    <p class="name ellipsis-2">
      {{ item.name }}
    </p>
    <p class="attr ellipsis">
      <span>{{ item.attrsText }}</span>
    </p>
  </div>
  <div class="price">¥{{ item.realPay?.toFixed(2) }}</div>
  <div class="count">x{{ item.quantity }}</div>
</template>

<style scoped>

</style>