import {getCategoryBannerListService} from '@/apis/category'
import {ref,onMounted} from 'vue'

export const useBanner = ()=>{
  const bannerList = ref([])
  const getBannerList = async () => {
    const res = await getCategoryBannerListService()
    bannerList.value = res.result
    console.log(res,'轮播图')
  }

  onMounted(()=>{
    getBannerList()
  })

  return {
    bannerList
  }
}