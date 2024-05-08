<script setup>
import { ref, watch} from 'vue'
import {getAddressService} from '@/apis/address.js'
import AddAddressForm from './components/AddAddressForm.vue'
import { useOrderStore } from '@/stores';

const orderStore = useOrderStore()
const openChangeAddress = ref(false)
const openAddAddress = ref(false)
const addressList = ref([])
const addressActive = ref({})

const getAddress = async () => {
  const {result} = await getAddressService()
  addressList.value = result
  addressActive.value = result[0]
  console.log(result,'我是收获地址')
}
getAddress()

watch(addressActive,(value) => {
  orderStore.orderAddressId = value.id
})
const onChangeAddress = (item) => {
  console.log(item,'我是切换地址')
  addressActive.value = item
  openChangeAddress.value = false
}

</script>

<template>
  <div class="address">
    <div class="text">
      <div class="none" v-if="addressList.length === 0">您需要先添加收货地址才可提交订单。</div>
      <ul v-else>
        <li><span>收<i />货<i />人：</span>{{ addressActive?.receiver }}</li>
        <li><span>联系方式：</span>{{ addressActive?.contact }}</li>
        <li><span>收货地址：</span>{{ addressActive?.fullLocation }} {{ addressActive?.address || addressList[0].address }}</li>
      </ul>
    </div>
    <div class="action">
      <el-button size="large" @click="openChangeAddress = true">更换地址</el-button>
      <el-button size="large" @click="openAddAddress = true">添加地址</el-button>
    </div>
  </div>

  <el-dialog v-model="openChangeAddress" @close="openChangeAddress = false" title="更换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="text item" v-for="item in addressList" @click="onChangeAddress(item)" :key="item.id">
        <ul>  
          <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="openChangeAddress = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="openAddAddress" @close="openAddAddress = false" title="添加地址" width="35%" center>
    <AddAddressForm />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="openAddAddress = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

</style>