import { computed, onUnmounted,ref } from "vue";

import dayjs from 'dayjs'

export const useCountDown = () => {
  let timer = null
  const time = ref(0)
  // 格式化时间
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 开启倒计时
  const start = (currentTime) => {
    console.log(currentTime,'我是时间')
    time.value = currentTime
    
    timer = setInterval(() => {
      console.log(time.value,dayjs.unix(time.value).format('mm分ss秒'))
      time.value--

      if(time.value < 0) {
        clearInterval(timer)
      }
    },1000)
  }

  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    start
  }
}