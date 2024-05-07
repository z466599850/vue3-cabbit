import {defineStore} from 'pinia'
import { ref } from 'vue'
import {postLoginService} from '@/apis/login'
import { useCarStore } from './car'
import { useOrderStore } from './order'
export const useUserStore = defineStore('user',() => {
  const orderStore = useOrderStore()
  const carStrore = useCarStore()
  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const {result} = await postLoginService({ account, password })
    userInfo.value = result
  }
  const removeUserInfo = () => {
    userInfo.value = {}
    carStrore.removeCartList()
    orderStore.removeOrderList()
  }
  return {
    userInfo,
    removeUserInfo,
    getUserInfo
  }
},{
  persist: {
    key: 'rabbit-token',
    paths: ['userInfo']
  }
})