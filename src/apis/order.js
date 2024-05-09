import http from "@/utils/http";

export const postOrderService = data => http.post('/member/order',{
  payChannel: '1', // 支付宝
  buyerMessage: '', // 买家备注留言
  ...data
})

export const getOrderDetailService = id => http.get(`/member/order/${id}`)

export const getOrderListService = params => http.get('/member/order',{
  params
})