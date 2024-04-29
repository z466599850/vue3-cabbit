import httpInstance from '@/utils/http'

/* 获取全部分类 */
export const layoutGetHeadService = () => httpInstance.get('/home/category/head')