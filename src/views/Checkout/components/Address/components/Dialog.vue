<script setup>
import {ref} from 'vue'
defineProps({
  addressList: {
    type: Array
  }
})

const openDialog = ref(false)
const emit = defineEmits(['handleClose'])

</script>

<template>
<el-dialog v-model="openDialog" @close="emit('handleClose',false)" title="切换收货地址" width="30%" center>
  <div class="addressWrapper">
    <div class="text item" v-for="item in checkInfo.userAddresses"  :key="item.id">
      <ul>  
      <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
      <li><span>联系方式：</span>{{ item.contact }}</li>
      <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
      </ul>
    </div>
  </div>
  <template #footer>
    <span class="dialog-footer">
      <el-button>取消</el-button>
      <el-button type="primary">确定</el-button>
    </span>
  </template>
</el-dialog>

</template>

<style scoped>

</style>