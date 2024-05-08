import { defineStore } from "pinia";
import { ref,computed } from "vue";

export const useOrderStore = defineStore('order',() => {
  const orderList = ref([])
  const orderAddressId = ref('')
  const setOrderList = (value) => {
    orderList.value = value
  }

  const removeOrderList = () => {
    orderList.value = {}
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
  return {
    orderList,
    setOrderList,
    removeOrderList,
    orderListPrice,
    orderListTotal,
    orderListPostFee,
    orderAddressId
  }
})