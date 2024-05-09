import http from "@/utils/http"

export const getMemberLikeListService = ({limit = 4}) => http.get('/goods/relevant',{
  params: {
    limit
  }
})