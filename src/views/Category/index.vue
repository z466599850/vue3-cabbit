<script setup>

import GoodsItem from './components/GoodsItem.vue'
import Banner from './components/Banner.vue'
import {useCategory} from './composables/useCategory'
const { list } = useCategory()

</script>
<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ list.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <Banner></Banner>
    </div>
    <div class="sub-list">
      <h3>全部分类</h3>
      <ul>
        <li v-for="i in list.children" :key="i.id">
          <RouterLink :to="{
            name: 'CategorySub',
            params: {
              id: i.id
            }
          }">
            <img :src="i.picture" />
            <p>{{ i.name }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="ref-goods" v-for="item in list.children" :key="item.id">
      <div class="head">
        <h3>- {{ item.name }}-</h3>
      </div>
      <div class="body">
        <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
      </div>
      
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    background-color: #fff;
    margin: 20px 138px;
    border-radius: 5px;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    position: relative;
    margin: 20px 138px;
    border-radius: 5px;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 10px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>