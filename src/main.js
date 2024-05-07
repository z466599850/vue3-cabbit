import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'
// 引入初始化样式文件
import '@/styles/common.scss'
// 引入懒加载指令插件并且注册
import { lazyPlugin } from './directives'
import { componentPlugin } from './components'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')
