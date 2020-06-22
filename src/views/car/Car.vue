<template>
  <div class="car">
    <van-nav-bar title="购物车" />
    <van-card v-for="(item,index) in list" :num=item.count :price=item.price :desc=item.desc :title=item.title
      :thumb=item.img :key='index'>
      <template #footer>
        <van-button @click='red(item)' size="mini">-</van-button>
        <van-button @click='add(item)' size="mini">+</van-button>
      </template>
    </van-card>
    <van-submit-bar :price=totalPrice*100 button-text="提交订单" @submit="onSubmit" />
    <tab-bar />
  </div>

</template>
<script>
  import TabBar from '@/components/TabBar'
  import { mapGetters } from 'vuex'
  export default {
    name: "Car",
    components: {
      TabBar
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        list: 'getcartlist'
      }),
      totalPrice() {
        //筛选cartlist中check选中的商品
        return this.$store.state.cartList.reduce((prevalue, item) => {
          return prevalue + item.price * item.count
        }, 0)
      }
    },
    methods: {
      red(item) {
        this.$store.commit('redd', item)
        // console.log(item.count--)
      },
      add(item) {
        // console.log(item.count++)
        this.$store.commit('addd', item)
      },
      onSubmit() {
        this.$toast('正在跳转支付页面')
      }
    }
  }
</script>
<style scoped>
  .van-submit-bar {
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
  }

  .van-submit-bar__button {
    margin-left: 15px;
  }
</style>