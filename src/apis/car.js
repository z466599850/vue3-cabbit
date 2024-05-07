import http from "@/utils/http"

export const addCartListService = ({skuId,count}) => http.post('/member/cart',{
    skuId,
    count
})

export const getCartListService = () => http.get('/member/cart')

export const delCartListService = ids => http.delete('/member/cart',{
  data: {
    ids
  }
})

export const putCartService = data => http.put(`/member/cart/${data.id}`,data)