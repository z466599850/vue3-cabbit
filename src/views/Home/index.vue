<script setup>
import HomeBanner from './components/HomeBanner/index.vue'
import HomeHot from './components/HomeHot/index.vue'
import HomeNew from './components/HomeNew/index.vue'
import HomeProduct from './components/HomeProduct/index.vue'
import HomeCategory from './components/HomeCategory/index.vue'
</script>
<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
</template>