import axios from 'axios'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

httpInstance.interceptors.request(config => {

  return config
}, error => Promise.reject(error))

httpInstance.interceptors.response(res => {

  return res.data
},error => Promise.reject(error))
export default httpInstance