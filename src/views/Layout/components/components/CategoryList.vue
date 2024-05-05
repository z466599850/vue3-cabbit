<script setup>
import {useCategoryStore} from '@/stores/category.js'

const CategoryStore = useCategoryStore()

const onActiveUl = (e) => {
  document.querySelectorAll('.router-link-active').forEach(item => {
    item.classList.remove('active')
  })
  e.target.classList.add('active')
}
</script>

<template>
  <ul class="app-header-nav" @click="onActiveUl">
    <li>
      <RouterLink class="active" to="/">首页</RouterLink>
    </li>
    <li class="home" v-for="c in CategoryStore.categoryList" :key="c.id">
      <RouterLink to="/" @click="onActive">{{ c.name }}</RouterLink>
    </li>
  </ul>
  
</template>

<style lang="scss" scoped>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>