import http from "@/utils/http"

export const getAddressService = () => http.get('/member/address')