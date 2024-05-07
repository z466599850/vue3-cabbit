<script setup>
import {useCarStore} from '@/stores'
import { useRouter } from 'vue-router';
const router = useRouter()
const carStore = useCarStore()
const emit = defineEmits(['car-data'])

const handleNumberChange = (value,row) => {
  console.log(row,value)
  carStore.putCart({id: row.skuId,count: value})
}

const handleSelectionChange = (value) => {
  console.log(value)
  emit('car-data',value)
}

</script>

<template>
  <el-table header-align="center" @selection-change="handleSelectionChange" :data="carStore.carList">
    <el-table-column width="120" type="selection"></el-table-column>
    <el-table-column align="center"  label="商品信息" width="400">
      <template #default="{row}">
        <div class="goods">
            <RouterLink to="/"><img :src="row.picture" alt="" /></RouterLink>
            <div>
              <p class="name ellipsis">
                {{ row.name }}
              </p>
            </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column align="center"  width="220" label="单价">
      <template #default="{row}">
        <p>&yen;{{ row.price }}</p>            
      </template>
    </el-table-column>
    <el-table-column align="center"  width="180" label="数量">
      <template #default={row}>
        <el-input-number v-model="row.count" :min="1" @change="handleNumberChange($event,row)" />
      </template>
    </el-table-column>
    <el-table-column width="180" align="center"  label="小计">
      <template #default="{row}">
        <div>
          <p class="f16 red">&yen;{{ (row.price * row.count).toFixed(2) }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column width="140" align="center"  label="操作">
      <template #default="{row}">
        <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="carStore.delCar(row.skuId)">
          <template #reference>
            <el-button link style="color: #27ba9b;">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
    <template #empty>
      <div class="cart-none">
        <el-empty description="购物车列表为空">
          <el-button type="primary" @click="router.push('/')">随便逛逛</el-button>
        </el-empty>
      </div>
    </template>
  </el-table>
</template>

<style lang="scss" scoped>
  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }
.goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    >div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .green {
    color: $xtxColor;
  }
  a {
      color: $xtxColor;
    }

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  .red {
    color: $priceColor;
  }

  .f16 {
    font-size: 16px;
  }

</style>