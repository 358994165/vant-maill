<template>
  <van-tabbar route>
    <van-tabbar-item to='/' icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to='/category' icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to='/car' icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to='/profile' icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
  export default {
    name: "TabBar",
    data() {
      return {
      }
    },
    methods: {

    }
  }
</script>
<style>

</style>