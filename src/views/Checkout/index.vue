<script setup>
import { useOrderStore } from '@/stores';
import Table from './components/Table/index.vue'
import Address from './components/Address/index.vue'
import ListConfig from './config/ListConfig';
import { ElMessage } from 'element-plus';
import {postOrderService} from '@/apis/order.js'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const orderStore = useOrderStore()
const router = useRouter()
const activePay = ref('1')
const activeDelivery = ref({id: '1',deliveryWay: '不限送货时间：周一至周日'})

const payOnDelivery = ref(5)

const submitOrderForm = async () => {
  console.log('我是提交订单')
  
  const {result} = await postOrderService({
    deliveryTimeType: +activeDelivery.value.id,
    payType: +activePay.value,
    goods: orderStore.orderList,
    addressId: orderStore.orderAddressId
  })
  console.log(result)
  if(!result.id) {
    ElMessage.error('提交订单失败')
    return
  }
  router.push(`/pay/${result.id}`)
}




</script>

<template>  
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
       <Address></Address>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <Table></Table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a @click.prevent="activeDelivery = item" v-for="item in ListConfig.deliveryTimeList" :key="item.id" class="my-btn" :class="{active: item.id === activeDelivery.id}">{{ item.deliveryWay }}</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a @click.prevent="activePay = item.id" v-for="item in ListConfig.payWayList" :key="item.id" class="my-btn" :class="{active: item.id === activePay}">{{ item.payWay }}</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ orderStore.orderListTotal }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ orderStore.orderListPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd v-if="activePay === '1'">¥ {{ orderStore.orderListPostFee}}</dd>
              <dd v-else>¥ {{ payOnDelivery.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ (activePay === '1' ? +orderStore.orderListPostFee : +payOnDelivery.toFixed(2)) + +orderStore.orderListPrice }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="submitOrderForm">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}




.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  cursor: pointer;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>