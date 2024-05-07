<script setup>
import PreviewPicture from './components/PreviewPicture.vue'
import GoodsAside from './components/GoodsAside.vue'
import {getCommodityDetailListService,} from '@/apis/commodity'
import {ref,onMounted,} from 'vue'
import {useRoute,useRouter,onBeforeRouteUpdate} from 'vue-router'
import {useUserStore} from '@/stores/modules/user.js'
import { useCarStore } from '@/stores/modules/car'

const router = useRouter()
const route = useRoute()
const list = ref([])
const num = ref(1)

const getDetailList = async (id = route.params.id) => {
  const {result} = await getCommodityDetailListService(id)
  console.log(result,'你好是我详情')
  list.value = result
}

const handleChange = (value) => {
  console.log(value)
  num.value = value
}

onMounted(() => {
  getDetailList()
})

const skuData = {}
const skuChange = (sku) => {
  skuData.value = sku
}
const userStore = useUserStore()
const carStore = useCarStore()
const onAddShopping = async () => {
  if(!userStore.userInfo.token) {
    router.push({
      path: '/login',
      query: {
        backUrl: `/detail/${route.params.id}`
      }
    })
    return
  }

  if(!skuData.value) {
    ElMessage.warning('请选择规格')
    return
  }


  skuData.value.count = num.value
  carStore.addCar(skuData.value)
}

onBeforeRouteUpdate((to) => {
  getDetailList(to.params.id)
})




</script>

<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="list.details">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${list.categories[1]?.id}` }">{{ list.categories[1]?.name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${list.categories[0]?.id}` }">{{list.categories[0]?.name}}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ list.desc }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <PreviewPicture :list="list?.mainPictures"></PreviewPicture>
              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p> {{ list.salesCount}} </p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ list.commentCount}}+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{list.collectCount}}+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{list.brand?.name}}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name"> {{list.name}} </p>
              <p class="g-desc">{{ list.desc }} </p>
              <p class="g-price">
                <span>{{ list.oldPrice }}</span>
                <span> {{list.price}}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <XtxSku :goods="list" @change="skuChange"></XtxSku>
              <!-- 数据组件 -->

              <!-- 按钮组件 -->
              <el-input-number v-model="num" :min="1" @change="handleChange"></el-input-number>
              <div>
                <el-button @click="onAddShopping" size="large" class="btn">
                  加入购物车
                </el-button>
              </div>

            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="prop in list.details?.properties" :key="prop?.name">
                      <span class="dt">{{ prop?.name}}</span>
                      <span class="dd">{{ prop?.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <div class="details-img">
                    <img v-for="pic in list.details?.pictures" :key="pic" v-img-lazy="pic">
                  </div>
                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">
              <GoodsAside :type="1"></GoodsAside>
              <GoodsAside :type="2"></GoodsAside>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>

.details-img {
  text-align: center;
}
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}

.bread-container {
  padding: 25px 0;
}
</style>