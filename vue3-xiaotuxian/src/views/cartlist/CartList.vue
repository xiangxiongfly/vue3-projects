<script setup>
import {useCartStore} from "@/stores/cartStore.js";

const cartStore = useCartStore();

function singleCheck(item, selected) {
  cartStore.singleCheck(item.skuId, selected);
}

function allCheck(selected) {
  cartStore.allCheck(selected);
}
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cartlist">
        <table>
          <thead>
          <tr>
            <th width="120">
              <el-checkbox v-model="cartStore.isAll" @change="allCheck"/>
            </th>
            <th width="400">商品信息</th>
            <th width="220">单价</th>
            <th width="180">数量</th>
            <th width="180">小计</th>
            <th width="140">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="i in cartStore.cartList" :key="i.id">
            <td>
              <el-checkbox v-model="i.selected" @change="(selected)=>singleCheck(i,selected)"/>
            </td>
            <td>
              <div class="goods">
                <router-link to="/"><img :src="i.picture" alt=""></router-link>
                <p class="name ellipsis">{{ i.name }}</p>
              </div>
            </td>
            <td class="tc">
              <p>&yen;{{ i.price }}</p>
            </td>
            <td class="tc">
              <el-input-number v-model="i.count" :min="1" :max="100"/>
            </td>
            <td class="tc">
              <p class="f16 red">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
            </td>
            <td class="tc">
              <p>
                <el-popconfirm title="确认删除吗？" confirm-button-text="确认"
                               cancel-button-text="取消" @confirm="cartStore.delCart(i.skuId)">
                  <template #reference>
                    <a href="javascript:;">删除</a>
                  </template>
                </el-popconfirm>
              </p>
            </td>
          </tr>
          <tr v-if="cartStore.cartList.length === 0">
            <td colspan="6">
              <div class="cart-none">
                <el-empty description="购物车列表为空">
                  <el-button type="primary" @click="$router.push('/home')">随便逛逛</el-button>
                </el-empty>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="action">
        <div>
          共 {{ cartStore.allCount }} 件商品，已选择 {{ cartStore.selectedCount }} 件，商品合计：
          <span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }}</span>
        </div>
        <div>
          <el-button size="large" type="primary" @click="$router.push(`/checkout`)">下单结算
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
  margin-top: 20px;

  .cartlist {
    background: #fff;
    color: #666;

    table {
      th {
        font-size: 16px;
        font-weight: normal;
        padding: 25px 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
        }
      }

      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
        }
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;
  }
}

.goods {
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }

  p {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
  }
}

.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;

  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
</style>
