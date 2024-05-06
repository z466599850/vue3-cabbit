<script setup>
import {getCategorySubListService,postCategorySubListService} from '@/apis/category'
import GoodsItem from '../Category/components/GoodsItem.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const list = ref([])
const route = useRoute()
const getCategorySubList = async () => {
  const {result} = await getCategorySubListService(route.params.id)
  console.log(result,'我是二级分类')
  list.value = result
}

const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})


const getGoodsList = async () => {
  const {result} = await postCategorySubListService(reqData.value)
  goodList.value = result
}
const tabChange = () => {
  reqData.value.page = 1
  getGoodsList()
}
const disabled = ref(false)
const load = async () => {
  reqData.value.page++
  const {result} = await postCategorySubListService(reqData.value)
  console.log(result)
  goodList.value.items = [...goodList.value.items, ...result.items]
  if (result.items.length === 0) {
    disabled.value = true
  }
}
getGoodsList()


onMounted(() => {
  getCategorySubList()
  getGoodsList()
})


</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="`/category/${list.parentId}`">{{ list.parentName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ list.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField"  @tab-change="tabChange" >
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <ul class="goods-list">
          <GoodsItem v-for="goods in goodList.items" :goods="goods" :key="goods.id"></GoodsItem>
        </ul>
        
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap
}
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }


  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>