import httpInstance from "@/utils/http";

export const postLoginService = data => httpInstance.post('/login', data)