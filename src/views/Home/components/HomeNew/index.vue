<script setup>
import { ref } from 'vue';
import HomePanel from '../components/HomePanel.vue';
import {homeGetNewListService} from '@/apis/home.js'

const newList = ref([])
const getNewList = async () => {
  const result = await homeGetNewListService()
  console.log(result,'新鲜好物')
  newList.value = result
}
getNewList()
</script>
<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">

      11111111

  </HomePanel>
</template>