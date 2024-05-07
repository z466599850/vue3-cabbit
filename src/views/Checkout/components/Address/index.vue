<script setup>
import {getAddressService} from '@/apis/address.js'
import Dialog from './components/Dialog.vue'
import {ref} from 'vue'

const addressList = ref([])
const open = ref(false)

const getAddress = async () => {
  const {result} = await getAddressService()
  addressList.value = result
  console.log(result,'我是收获地址')
}
getAddress()
</script>

<template>
 <h3 class="box-title">收货地址</h3>
  <div class="box-body">
    <div class="address">
      <div class="text">
        <div class="none" v-if="addressList.length === 0">您需要先添加收货地址才可提交订单。</div>
        <ul v-else>
          <li><span>收<i />货<i />人：</span>{{ addressList[0].receiver }}</li>
          <li><span>联系方式：</span>{{ addressList[0].contact }}</li>
          <li><span>收货地址：</span>{{ addressList[0].fullLocation }} {{ addressList[0].address }}</li>
        </ul>
      </div>
      <div class="action">
        <el-button size="large" @click="open = true">切换地址</el-button>
        <el-button size="large" @click="addFlag = true">添加地址</el-button>
      </div>
    </div>
  </div>

  <Dialog :openDialog="open"></Dialog>
</template>

<style lang="scss" scoped>
.box-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 10px;
  line-height: 70px;
  border-bottom: 1px solid #f5f5f5;
}

.box-body {
  padding: 20px 0;
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

</style>