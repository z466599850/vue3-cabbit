<script setup>
import ProductBaby from './components/ProductBaby.vue'
import ProductCostume from './components/ProductCostume.vue'
import ProductFamily from './components/ProductFamily.vue'
import ProductFood from './components/ProductFood.vue'
</script>
<template>
  <div class="product">
    <ProductFamily />
    <ProductFood />
    <ProductCostume />
    <ProductBaby />
  </div>

</template>

<style lang="scss" scoped>
.product {
  margin-top: 20px;
}
</style>