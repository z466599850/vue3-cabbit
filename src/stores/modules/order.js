import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { postOrderService } from '@/apis/order.js'
import { getOrderDetailService } from '@/apis/order.js'
export const useOrderStore = defineStore('order',() => {
  const orderList = ref([])
  const orderAddressId = ref('')
  const activePay = ref('1')
  const activeDelivery = ref({})
  const orderSubmitFormResult = ref({})
  const orderDetail = ref({})

  const setOrderList = (value) => {
    orderList.value = value
  }

  const setActiveDelivery = (value) => {
    activeDelivery.value = value
  }

  const removeOrderList = () => {
    orderList.value = {}
  }

  const setActivePay = (value) => {
    activePay.value = value
  }

  const getSubmitOrderForm = async () => {
    const {result} = await postOrderService({
      deliveryTimeType: +activeDelivery.value.id,
      payType: +activePay.value,
      goods: orderList.value,
      addressId: orderAddressId.value
    })

    if(!result.id) {
      ElMessage.error('提交订单失败')
      return
    }
    orderSubmitFormResult.value = result
  }

  const getOrderDetail = async (id) => {
    const {result} = await getOrderDetailService(id)
    orderDetail.value = result
  }

  const orderListPrice = computed(() => {
    return orderList.value.reduce((total,item) => total + (item.price * item.count), 0).toFixed(2)
  })
  const orderListTotal = computed(() => {
    return orderList.value.reduce((total,item) =>  total + item.count, 0)
  })
  const orderListPostFee = computed(() => {
    return orderList.value.reduce((total,item) => total + item.postFee,0).toFixed(2)
  })
  const orderListPriceTotal = computed(() => {
    return ((activePay.value === '1' ? +orderListPostFee.value : 5)  + +orderListPrice.value).toFixed(2)
  })
  return {
    orderList,
    activePay,
    activeDelivery,
    orderSubmitFormResult,
    orderDetail,
    setOrderList,
    removeOrderList,
    setActiveDelivery,
    setActivePay,
    getOrderDetail,
    orderListPrice,
    orderListTotal,
    orderListPostFee,
    orderAddressId,
    orderListPriceTotal,
    getSubmitOrderForm

  }
})