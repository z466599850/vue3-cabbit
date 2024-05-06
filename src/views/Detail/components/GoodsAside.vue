<script setup>
import {getDetailHotListService} from '@/apis/commodity.js'
import {ref,computed,onMounted} from 'vue'
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  type: {
    type: Number,
    default: 1
  }
})

const TITLEMAP = {
  1: '24小时热榜',
  2: '周热榜'
}
const title = computed(()=> TITLEMAP[props.type])
const list = ref([])
const getHotList = async () => {
  const {result} = await getDetailHotListService({id: props.id,type: props.type})
  list.value = result
  console.log(result,'我是热榜')
}

onMounted(()=> {
  getHotList()
})
</script>

<template>
  <div class="detail-hot-list">
  <div class="title">
    <p>{{ title }}</p>
  </div>
  <div class="detail-hotByDay">
    <ul>
      <li v-for="item in list" :key="item.id">
        <img v-img-lazy="item.picture">
        <div class="detail-hotByDay-text">
          <h3 class="detail-hotByDay-text-title">{{ item.name }}</h3>
          <span class="detail-hotByDay-text-subhead">{{ item.desc }}</span>
          <div class="price">￥<span>{{ item.price }}</span></div>
        </div>           
      </li>
    </ul>
  </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-hotByDay {
  ul {
    li {
      margin: 10px 0;
      padding: 20px 10px;
      list-style: none;
      background-color: #fff;
      min-height: 300px;
      text-align: center;
      img {
        width: 150px;
        height: 150px;
      }
      .detail-hotByDay-text {
        .detail-hotByDay-text-title {
          font-weight: 400;
          margin: 10px 0;
        }
        .detail-hotByDay-text-subhead {
          color: rgb(153, 153, 153);
          font-size: 14px;
        }
        .price {
          margin-top: 10px;
          font-size: 20px;
          color: $priceColor;
        }
      }
      
    }
  }
}

.detail-hot-list {
  .title {
    background-color: rgb(226, 98, 55);
    height: 75px;
    line-height: 75px;
    padding: 0 20px;
    p {
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>