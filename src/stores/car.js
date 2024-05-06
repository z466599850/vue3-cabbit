import { defineStore } from "pinia";
import {addCartListService,getCartListService } from '@/apis/car.js'
import { ElMessage } from "element-plus";
import { ref } from 'vue'

export const useCarStore = defineStore('car',() => {
  const carList = ref([])
  const addCar = async ({skuId,count}) => {
    await addCartListService({skuId,count})
    ElMessage.success('添加成功')
  }

  const getCarList = async () => {
    const result = await getCartListService()
    console.log(result,'你们好，我获取了购物车列表')
  }

  return {
    carList,
    addCar,
    getCarList
  }
})