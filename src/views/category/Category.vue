<template>
  <div class="category">
    <van-nav-bar title="分类" />
    <!-- 左边 -->
    <div class="catleft">
      <ul>
        <li v-for='(item,index) in catleft'>{{item.title}}</li>
      </ul>
    </div>
    <!-- 右边 -->
    <div class="catright">
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="(item,index) in cattop" :key="index">
          <a :href="item.link">
            <van-image :src="item.image" />
          </a>
          <p>{{item.title}}</p>
        </van-grid-item>
      </van-grid>
      <van-tabs animated>
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
      <!-- 占位 -->
      <div class="occupy"></div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import { getHomeGoods } from '../../network/home.js'
  import { getCategoru, getTop, getBut } from '../../network/Category.js'
  import TabBar from '@/components/TabBar'
  export default {
    name: "Category",
    components: {
      TabBar
    },
    data() {
      return {
        catleft: [],
        cattop: [],
        pop: [],
        pattern: [],
        sell: [],
      }
    },
    created() {
      getCategoru().then(res => {
        // console.log(res)
        this.catleft = res.data.category.list
      })
      getTop().then(res => {
        // console.log(res)
        this.cattop = res.data.list
        // console.log(this.cattop)
      })
      this._getHomeGoods()

    },
    methods: {
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
  .category {
    height: 100vh;
  }

  .van-nav-bar {
    width: 100%;
    position: fixed;
    top: 0;
  }

  .catleft {
    position: fixed;
    top: 46px;
    left: 0;
    border-right: 1px solid #f8f8f8;
    background-color: #fff;
    width: 100px;
    height: calc(100% - 96px);
  }

  .catleft ul li {
    text-align: center;
    height: 30px;
  }

  .catright {
    position: absolute;
    top: 46px;
    left: 100px;
    right: 0;
    bottom: 50px;
  }

  .catright p {
    padding: 0;
    margin: 0;
    font-size: 13px;
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