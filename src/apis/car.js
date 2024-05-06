import http from "@/utils/http"
export const addCartListService = ({skuId,count}) => http.post('/member/cart',{
    skuId,
    count
})

export const getCartListService = () => http.get('/member/cart')