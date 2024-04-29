<script setup>
import LayoutNav from './components/LayoutNav/index.vue'
import LayoutHeader from './components/LayoutHeader/index.vue'
import LayoutFooter from './components/LayoutFooter/index.vue'
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>