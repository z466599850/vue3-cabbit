<script setup>
import LayoutNav from './components/LayoutNav/index.vue'
import LayoutHeader from './components/LayoutHeader/index.vue'
import LayoutFooter from './components/LayoutFooter/index.vue'
import LayoutFixed from './components/LayoutFixed/index.vue'
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>