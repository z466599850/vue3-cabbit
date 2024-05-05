import httpInstance from "@/utils/http"

export const homeGetBannerService = () => httpInstance.get('/home/banner')

export const homeGetNewListService = () => httpInstance.get('/home/new')

export const homeGetBrandListService = () => httpInstance.get('/home/brand')

export const homeGetHotListService = () => httpInstance.get('/home/hot')

export const homeGetInstanceService = () => httpInstance.get('/home/goods')