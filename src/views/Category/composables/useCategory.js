import {onMounted, ref} from 'vue'
import { getCategoryListService } from '@/apis/category'
import { useRoute,onBeforeRouteUpdate } from 'vue-router'

export const useCategory = () => {
  const list = ref({})
  const route = useRoute()
  const getCategoryList = async (id = route.params.id) => {
    const {result} = await getCategoryListService(id)
    list.value = result
    console.log(result,111)
  }
  onMounted(() => getCategoryList())

  // 目标：路由参数变化时 可以把分类数据接口重新发送
  onBeforeRouteUpdate((to)=> {
    // 存在问题：使用最新的路由参数请求最新的分类数据
    getCategoryList(to.params.id)
  })

  return {
    list
  }
}