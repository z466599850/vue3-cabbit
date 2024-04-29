import { defineStore } from "pinia";
import {layoutGetHeadService} from '@/apis/layout'
import {ref} from 'vue'

export const useCategoryStore = defineStore('category',()=>{
  const categoryList = ref([])

  const GetHeadService = async () => {
    const {result} = await layoutGetHeadService()
    categoryList.value = result
    console.log(categoryList.value)
  }
  GetHeadService()
  return {
    categoryList
  }
})