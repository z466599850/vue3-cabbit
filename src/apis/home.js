import http from '@/utils/http'

/* 获取全部分类 */
export const homeGetHeadService = () => http.get('/home/category/head')