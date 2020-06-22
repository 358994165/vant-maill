<template>
  <div class="detail">
    <van-nav-bar @click-left="onClickLeft" left-text="返回" title="商品详情" left-arrow />
    <!-- 轮播图 -->
    <div class="detail-swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in topImages" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 价格行 -->
    <div class="detail-text">
      <p>{{title}}</p>
      <span class="text-pr">{{price}}</span>
      <span class="text-old">{{oldprice}}</span>
      <van-tag round type="warning">{{discountDesc}}</van-tag>
    </div>
    <!-- 销量行 -->
    <div class="detail-info">
      <span>{{columns[0]}}</span>
      <span>{{columns[1]}}</span>
      <span>{{columns[2]}}</span>
    </div>
    <!-- 物流描述 -->
    <div class="detail-services">
      <span v-for='(item,index) in services' :key='index'>{{item.name}}</span>
    </div>
    <!-- 分类栏 -->
    <van-tabs>
      <van-tab title="参数">
        <div class="parameter">
          <table class='param-table' v-for="(table,index) in paramInfo.sizes " :key='index'>
            <tr v-for="(tr,indez) in table" :key='indez'>
              <td v-for="(td,indey) in tr" :key='indey'>{{td}}</td>
            </tr>
          </table>
          <table class="info-param">
            <tr v-for="(item,index) in paramInfo.infos" :key="index">
              <td class="info-key">{{item.key}}</td>
              <td class="info-value">{{item.value}}</td>
            </tr>
          </table>
        </div>
      </van-tab>
      <van-tab title="效果图">
        <div class="detailInfo-list">
          <img v-for="item in detailInfo" :src="item" alt="">
        </div>
      </van-tab>
      <van-tab title="推荐">
        <van-grid :border="false" :column-num="2">
          <van-grid-item class="van-grid2" v-for="(item2,index2) in recommends" :key='index2'>
            <van-image :src="item2.image" />
            <p class="cation-title">{{item2.title}}</p>
            <div class="van-grid2-span">
              <span class="price">{{item2.price}}</span>
              <span class="collect-icon"></span>
              <span class="collect">{{item2.cfav}}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
    <!-- 占位 -->
    <div class="occupy"></div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star-o" text="收藏" />
      <van-goods-action-button type="warning" @click='isclick' text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>

  </div>
</template>
<script>
  import { getDetail, GoodsParam, getRecommend } from '@/network/Detail'
  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        //轮播图
        topImages: [],
        //商品标题
        title: null,
        //旧价格
        oldprice: 0,
        //新价格
        price: 0,

        //打折
        discountDesc: 0,
        //销量行
        columns: [],
        //物流描述
        services: [],
        //参数
        paramInfo: {},
        //效果图图片
        detailInfo: [],
        //推荐栏
        recommends: [],

        //传到 vuex 的价格
        realPrice: 0,
        desc: null

      }
    },
    components: {
    },
    created() {
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        const data = res.result
        //轮播图
        this.topImages = data.itemInfo.topImages
        //标题
        this.title = data.skuInfo.title
        //旧价格
        this.oldprice = data.itemInfo.oldPrice
        //新价格
        this.price = data.itemInfo.price
        //用来传到 vuex 的价格
        this.realPrice = data.itemInfo.lowNowPrice
        //用来传到 vuex 的商品描述
        this.desc = data.itemInfo.desc
        //打折数
        this.discountDesc = data.itemInfo.discountDesc
        //销量行
        this.columns = data.columns
        //物流描述
        this.services = data.shopInfo.services
        //参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        this.detailInfo = data.detailInfo.detailImage[0].list
      })
      getRecommend().then(res => {
        this.recommends = res.data.list
        // console.log(this.recommends)
      })

    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
      isclick() {
        const product = {}
        product.iid = this.iid
        product.price = this.realPrice
        product.title = this.title
        product.img = this.topImages[0]
        product.desc = this.desc
        this.$store.dispatch('addCart', product).then(res => {
          this.$toast(res);
        })

      }
    }
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .van-nav-bar {
    z-index: 2;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }

  .van-swipe {
    height: 300px;
  }

  .detail-swipe img {
    width: 100%;
  }

  .detail-text {
    padding: 2PX 10PX;
    position: relative;
  }

  .detail-text p {
    font-size: 14px;
  }

  .text-pr {
    font-size: 20px;
    color: #ff6882;
    margin-left: 10px;
  }

  .text-old {
    text-decoration: line-through;
    color: #8b8b8d;
    margin-left: 15px;
  }

  .van-tag {
    padding: 2px 5px;
    position: absolute;
    bottom: 10px;
    right: 50px;
  }

  .detail-info {
    font-size: 13px;
    color: #b4b4b4;
    padding: 0 10px 10px 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #efefef;
  }

  .detail-services {
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    color: #625959;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
  }

  /* 参数样式 */
  .parameter {
    font-size: 14px;
    color: #6f6d6c;
    padding: 0 10px;
  }

  .parameter table {
    border-collapse: collapse;

  }

  .parameter tr {
    height: 50px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }

  .param-table {
    width: 100%;

  }

  .info-key {
    width: 90px;
  }

  .info-value {
    color: #fa8484;
  }

  /* 推荐栏样式 */
  .detailInfo-list img {
    width: 100%;
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
    background: url('../../img/common/collect.svg') 0 0/14px 14px;
  }

  .occupy {
    width: 100%;
    height: 50px;
  }
</style>