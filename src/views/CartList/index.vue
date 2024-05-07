<script setup>
import Table from './components/Table.vue'
import {ref,provide} from 'vue'
import {useCarStore, useUserStore} from '@/stores'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const carStore = useCarStore()
const router = useRouter()
const total = ref(0)
const price = ref(0)
const selectionTotal = ref(0)

const orderList = ref([])
const getCarData = (arr) => {
  orderList.value = arr
  total.value = arr.reduce((total,item) => {
    return total + item.count
  },0)
  price.value = arr.reduce((total,item) => {
    return total + (item.price * item.count)
  },0)
  selectionTotal.value = arr.reduce((total,item) => {
    return total + item.count
  },0)
}

const onPayment = () => {
  if(!userStore.userInfo.token) {
    router.push({
      path: '/login',
      query: {
        backUrl: '/cartlist'
      }
    })
    return
  }

  if(orderList.value.length <= 0) {
    ElMessage.warning('请选择要购买的商品')
    return
  }
  router.push('/checkout')
  provide('order-list',orderList.value)
}


</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <Table @car-data="getCarData"></Table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ carStore.carListTotal }} 件商品，已选择 {{ selectionTotal }} 件，商品合计：
          <span class="red">¥ {{ price }} </span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" @click="onPayment">下单结算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
  margin-top: 20px;

  .cart {
    background: #fff;
    color: #666;

  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .red {
    color: $priceColor;
  }
  .f16 {
    font-size: 16px;
  }

}
</style>