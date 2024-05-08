import http from "@/utils/http";

export const postOrderService = data => http.post('/member/order',{
  payChannel: '1', // 支付宝
  buyerMessage: '', // 买家备注留言
  ...data
})