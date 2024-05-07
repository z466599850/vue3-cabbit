<script setup>
import { useOrderStore } from '@/stores';

const orderStore = useOrderStore()
</script>

<template>
<table class="goods">
  <thead>
    <tr>
      <th width="520">商品信息</th>
      <th width="170">单价</th>
      <th width="170">数量</th>
      <th width="170">小计</th>
      <th width="170">实付</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in orderStore.orderList" :key="item.id">
      <td>
        <a href="javascript:;" class="info">
          <img :src="item.picture" alt="">
          <div class="right">
            <p>{{ item.name }}</p>
            <p>{{ item.attrsText }}</p>
          </div>
        </a>
      </td>
      <td>&yen;{{ item.price }}</td>
      <td>{{ item.count }}</td>
      <td>&yen;{{ (item.price * item.count).toFixed(2) }}</td>
      <td>&yen;{{(item.price * item.count).toFixed(2) }}</td>
    </tr>
  </tbody>
</table>
</template>

<style lang="scss" scoped>
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
</style>