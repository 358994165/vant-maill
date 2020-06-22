<template>
  <div id="home">
    <div class="home-top"></div>
    <van-nav-bar title="首页" />
    <!-- 搜索栏 -->
    <van-search shape='round' placeholder="请输入搜索关键词" input-align="center" />
    <!-- 轮播图 -->
    <div class="swper-size">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for='(item,index) in banner' :key='index'>
          <img :src="item.image" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>




    <!-- 十点抢卷 -->
    <van-grid class="van-grid1" :border="false" :column-num="4">
      <van-grid-item v-for="(item1,index1) in recommend" :key='index1'>
        <a :href="item1.link">
          <van-image :src="item1.image" /></a>
        <p class="title">{{item1.title}}</p>
      </van-grid-item>
    </van-grid>
    <!-- 本周流行 -->
    <div class="feature">
      <a href="https://act.mogujie.com/zzlx67">
        <img src="../img/home/recommend_bg.jpg" alt="">
      </a>
    </div>

    <!-- <van-button type="warning">指定容器</van-button> -->
    <!-- 分类栏 -->
    <van-tabs v-model="active" animated>
      <van-tab title="精选">
        <van-grid :border="false" :column-num="2">
          <van-grid-item class="van-grid2" v-for="(item2,index2) in pop" :key='index2'>
            <van-image @click='isclickp(item2)' :src="item2.show.img" />
            <p class="cation-title">{{item2.title}}</p>
            <div class="van-grid2-span">
              <span class="price">{{item2.price}}</span>
              <span class="collect-icon"></span>
              <span class="collect">{{item2.cfav}}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="新款">
        <van-grid :border="false" :column-num="2">
          <van-grid-item @click='isclicks(item3)' class="van-grid2" v-for="(item3,index3) in sell" :key='index3'>
            <van-image :src="item3.show.img" />
            <p class="cation-title">{{item3.title}}</p>
            <div class="van-grid2-span">
              <span class="price">{{item3.price}}</span>
              <span class="collect-icon"></span>
              <span class="collect">{{item3.cfav}}</span>
            </div>

          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="流行">
        <van-grid class="van-grid2" :border="false" :column-num="2">
          <van-grid-item class="van-grid2" v-for="(item4,index4) in pattern " :key='index4'>
            <van-image @click='isclickpa(item4)' :src="item4.show.img" />
            <p class="cation-title">{{item4.title}}</p>
            <div class="van-grid2-span">
              <span class="price">{{item4.price}}</span>
              <span class="collect-icon"></span>
              <span class="collect">{{item4.cfav}}</span>
            </div>

          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>

    <div class="occupy"></div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from '@/components/TabBar'
  import { getHomeMultidata, getHomeGoods } from '@/network/home'
  export default {
    name: 'Home',
    data() {
      return {
        active: 0,
        //获取轮播图
        banner: [],
        //获取十点抢卷
        recommend: [],
        pop: [],
        pattern: [],
        sell: [],
        isactive: 0,
      }
    },
    computed: {

    },

    components: {
      TabBar
    },
    //组件创建时调用
    created() {
      //创建时调用这个方法
      this._getHomeMultidata()
      this._getHomeGoods()
    },
    methods: {
      _getHomeMultidata() {
        //调用时发送网络请求
        getHomeMultidata().then(res => {
          //获取轮播图
          this.banner = res.data.banner.list
          //获取十点抢卷
          this.recommend = res.data.recommend.list
        })
      },
      _getHomeGoods() {
        const page = 1
        getHomeGoods('pop', page).then(res => {
          this.pop = res.data.list
        })
        getHomeGoods('new', page).then(res => {
          this.pattern = res.data.list
        })
        getHomeGoods('sell', page).then(res => {
          this.sell = res.data.list
        })
      },
      isclickp(item2) {
        this.$router.push('/detail/' + item2.iid)
      },
      isclicks(item3) {
        this.$router.push('/detail/' + item3.iid)
      },
      isclickpa(item4) {
        this.$router.push('/detail/' + item4.iid)
      }

    }
  }
</script>
<style scoped>
  #home {
    background-color: #efefef;
  }

  .home-top {
    height: 46px;
    width: 100%;
  }

  .van-nav-bar {
    z-index: 9;
    width: 100%;
    position: fixed;
    top: 0;
  }

  .swper-size img {
    height: 100%;
    width: 100%;
  }

  .my-swipe {
    z-index: 1;
  }

  .van-grid1 {
    margin-top: -15px;
  }

  .van-grid-item__content .title {
    margin: 0;
    color: #969799;
  }

  .feature {
    margin-top: 5px;
    width: 100%;
    height: 100%;
  }

  .feature img {
    width: 100%;
    height: 100%;
  }

  .van-grid2 {
    overflow: hidden;
  }

  .cation-title {
    margin: 2px;
    font-size: 12px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .van-grid2-span {
    line-height: 14px;
    font-size: 13px;
  }

  .price {
    color: red;
  }

  .collect {
    margin-left: 18px;
  }

  .collect-icon {
    margin-left: 5px;
    position: absolute;
    width: 14px;
    height: 14px;
    background: url('../img/common/collect.svg') 0 0/14px 14px;
  }

  .occupy {
    width: 100%;
    height: 50px;
  }
</style>