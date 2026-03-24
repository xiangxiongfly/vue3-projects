import {addCartApi, delCartApi, findNewCartListApi} from "@/api/cart.js";
import {useUserStore} from "@/stores/userStore.js";
import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useCartStore = defineStore("cartStore", () => {

  const userStore = useUserStore();
  const isLogin = computed(() => userStore.userInfo.token);
  const cartList = ref([]);

  // 更新购物车
  async function updateCartList() {
    const {result} = await findNewCartListApi();
    cartList.value = result;
  }

  // 添加购物车
  async function addCart(goods) {
    const {skuId, count} = goods;
    if (isLogin.value) {
      // 已登录
      await addCartApi(skuId, count);
      updateCartList();
    } else {
      // 未登录
      const item = cartList.value.find(item => item.skuId === skuId);
      if (item) {
        item.count++;
      } else {
        cartList.value.push(goods);
      }
    }
  }

  // 删除购物车
  async function delCart(skuId) {
    if (isLogin.value) {
      await delCartApi([skuId]);
      updateCartList();
    } else {
      const index = cartList.value.findIndex((item) => skuId === item.skuId);
      cartList.value.splice(index, 1);
    }
  }

  // 清除购物车
  function clearCart() {
    cartList.value = [];
  }

  // 单选
  function singleCheck(skuId, selected) {
    const item = cartList.value.find(item => item.skuId === skuId);
    item.selected = selected;
  }

  // 全选
  function allCheck(selected) {
    cartList.value.forEach(item => item.selected = selected);
  }

  // 计算属性，是否全选
  const isAll = computed(() => cartList.value.every(item => item.selected));

  // 计算属性：总数量
  const allCount = computed(() => cartList.value.reduce((a, b) => a + b.count, 0));

  // 计算属性：总价格
  const allPrice = computed(() => cartList.value.reduce((a, b) => a + b.count * b.price, 0));

  // 计算属性：已选中数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0));

  // 计算属性：已选择商品总价
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0));

  return {
    cartList,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    clearCart,
    updateCartList,
    isAll,
    allCount,
    allPrice,
    selectedCount,
    selectedPrice
  };
}, {
  persist: true
});
