<script setup>
import {homeGetBannerService} from '@/apis/home'
import {ref,onMounted} from 'vue'

const bannerList = ref([])
const getBannerList = async () => {
  const res = await homeGetBannerService()
  bannerList.value = res.result
  console.log(res)
}

onMounted(()=>{
  getBannerList()
})
</script>
<template>
    <div class="home-banner" m="t-4">
    <el-carousel trigger="click" height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 98;
  img {
    height: 500px;
    width: 100%;
  }
}
</style>