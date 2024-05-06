import httpInstance from "@/utils/http";

export const getCommodityDetailListService = id => httpInstance.get('/goods',{
  params: {
    id
  }
})

export const getDetailHotListService = ({id,type,limit = 3}) => httpInstance.get('/goods/hot',{
  params: {
    id,
    type,
    limit
  }
})