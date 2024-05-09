import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from '@/stores/modules/user'
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'

const Layout = () => import('@/views/Layout/index.vue')
const Home = () => import('@/views/Home/index.vue')
const Category = () => import('@/views/Category/index.vue')
const CategorySub = () => import('@/views/CategorySub/index.vue')
const Detail = () => import('@/views/Detail/index.vue')
const Login = () => import('@/views/Login/index.vue')
const CartList = () => import('@/views/CartList/index.vue')
const Checkout = () => import('@/views/Checkout/index.vue')
const Pay = () => import('@/views/Pay/index.vue')
const PayBack = () => import('@/views/PayBack/index.vue')
const Member = () => import('@/views/Member/index.vue')
const MemberUserInfo = () => import('@/views/Member/components/UserInfo/index.vue')
const MemberUserOrder = () => import('@/views/Member/components/UserOrder/index.vue')


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: Home,
        },
        {
          path: 'category/:id',
          name: 'category',
          component: Category,
        },
        {
          path: 'category/sub/:id',
          name: 'CategorySub',
          component: CategorySub,
        },
        {
          path: 'detail/:id',
          component: Detail,
        },
        {
          path: 'cartlist',
          component: CartList
        },
        {
          path: 'checkout',
          component: Checkout
        },
        {
          path: 'pay',
          component: Pay
        },
        {
          path: 'paycallback',
          component: PayBack
        },
        {
          path: 'member',
          component: Member,
          children: [
            {
              path: '',
              name: 'myUserInfo',
              component: MemberUserInfo
            },
            {
              path: 'order',
              name: 'myOrder',
              component: MemberUserOrder
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }

  ],
  scrollBehavior(){
    return {
      top:0
    }
  }
})


const authUrl = ['/checkout']
router.beforeEach((to)=>{
  ElLoading.service({
    fullscreen: true
  })
  const userStore = useUserStore()
  if(!authUrl.includes(to.path)) {
    return true
  }
  if(!userStore.userInfo.token && to.path !== '/login') {
    return '/login'
  }
  return true
})

router.afterEach((to)=>{
  setTimeout(()=>{
    const loadingInstance = ElLoading.service()
    loadingInstance.close()
  },1000)
  document.title = to.meta.title || 'my project'
})

export default router