<script setup>
import { ref } from 'vue';
import HomePanel from '../components/HomePanel.vue';
import HomeMerchandiseList from '../components/HomeMerchandiseList.vue'
import {homeGetNewListService} from '@/apis/home.js'

const newList = ref([])
const getNewList = async () => {
  const {result} = await homeGetNewListService()
  newList.value = result
  console.log(newList.value,'新鲜好物')
}
getNewList()
</script>
<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
    <HomeMerchandiseList :list="newList" />
  </HomePanel>
</template>

