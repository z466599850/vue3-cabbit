import { defineStore } from "pinia";
import {addCartListService,getCartListService,putCartService ,delCartListService} from '@/apis/car.js'
import { useUserStore } from "./user";
import { ref,computed } from 'vue'
import { ElMessage } from "element-plus";

export const useCarStore = defineStore('car',() => {
  const carList = ref([])
  const userStore = useUserStore()
  const addCar = async (obj) => {
  
    const item = carList.value.find(item => item.skuId === obj.skuId)

    if(item) {
      putCart({id: item.skuId,count: (item.count + obj.count)})
    }else {
      await addCartListService(obj)
      getCarList()
    }

    ElMessage.success('添加成功')
  }

  const getCarList = async () => {
    if(!userStore.userInfo.token) return

    const {result} = await getCartListService()
      carList.value = result
      console.log(result,'我是购物车列表')
  }

  const delCar = async (id) => {
    console.log([id])
    try {
      if(userStore.userInfo.token) {
        await delCartListService([id])
        getCarList()
      }else {
        const ix = carList.value.findIndex(item => item.skuId === id)
        carList.value.splice(ix,1)
      }
      ElMessage.success('删除成功')
    }catch {
      ElMessage.success('删除失败')
    }
  }

  const putCart = async (data) => {
    await putCartService(data)
  }

  const removeCartList = () => {
    carList.value = []
  }

  const carListTotal = computed(()=>{
    return carList.value.reduce(( total, item ) => total + item.count,0)
  })

  const carListPrice = computed(()=>{
    return carList.value.reduce(( total, item ) => total + (item.price * item.count), 0)
  },0)
  

  return {
    carList,
    addCar,
    delCar,
    getCarList,
    putCart,
    carListTotal,
    carListPrice,
    removeCartList
   
  }
},{
  persist: {
    key: 'rabbit-car',
    paths: ['carList']
  }
})