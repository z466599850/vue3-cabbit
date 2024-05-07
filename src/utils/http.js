import axios from 'axios'
import {useUserStore} from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})
// 拦截器
httpInstance.interceptors.request.use(
  // 从pinia获取token数据
  (config) => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
},e => Promise.reject(e))

//  响应拦截器
httpInstance.interceptors.response.use(res => {
  return res.data
},e => {
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  return Promise.reject(e)
})
export default httpInstance