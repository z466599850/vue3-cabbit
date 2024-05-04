<script setup>
import HomePanel from '../components/HomePanel.vue'
import HomeMerchandiseList from '../components/HomeMerchandiseList.vue'
import {homeGetHotListService} from '@/apis/home.js'
import {ref} from 'vue'

const list = ref([])
const GetHotListService = async () => {
  const {result} = await homeGetHotListService()
  list.value = result
  console.log(result,'我是人气推荐')

}
GetHotListService()

</script>
<template>
  <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
    <HomeMerchandiseList :list="list"/>
  </HomePanel>
</template>