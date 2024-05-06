import httpInstance from "@/utils/http"

export const getCategoryListService = id => httpInstance.get('/category',{
  params: {
    id
  }
})

export const getCategoryBannerListService = () => httpInstance.get('/home/banner',{
  params: {
    distributionSite: '2'
  }
})

export const getCategorySubListService = (id) => httpInstance.get('/category/sub/filter',{
  params: {
    id
  }
})

export const postCategorySubListService = data => httpInstance.post('/category/goods/temporary',data)

