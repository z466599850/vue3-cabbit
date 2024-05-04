import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {useIntersectionObserver} from '@vueuse/core'
import App from './App.vue'
import router from './router'
import '@/styles/common.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
// 图片懒加载
app.directive('img-lazy',{
  mounted(el,binding){
    useIntersectionObserver(el,([{ isIntersecting }]) => {
      if(isIntersecting) {
        el.src = binding.value
      }
      
    } )
  }
})