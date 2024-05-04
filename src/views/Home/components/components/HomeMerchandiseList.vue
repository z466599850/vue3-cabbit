<script setup>

defineProps({
  list: {
    type: Array
  }
})
</script>

<template>
  <div>
    <ul class="goods-list">
      <li v-for="item in list" :key="item.id" :class="{'background-color': item.title}">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" alt="" />
          <p v-if="item.name" class="name">{{ item.name }}</p>
          <p v-else class="name">{{ item.title }}</p>
          <p v-if="item.price" class="price">&yen;{{ item.price }}</p>
          <p v-else class="alt">{{ item.alt }}</p>
        </RouterLink>
        </li>
    </ul>
  </div>
</template>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  .background-color {
    background: #fff;
  }
  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
    .alt {
      color: rgb(153, 153, 153);
      font-size: 18px;
    }
  }
}
</style>