import {defineStore} from 'pinia'
import { ref } from 'vue'
import {postLoginService} from '@/apis/login'
export const useUserStore = defineStore('user',() => {
  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const {result} = await postLoginService({ account, password })
    userInfo.value = result
  }
  const removeUserInfo = () => {
    userInfo.value = {}
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