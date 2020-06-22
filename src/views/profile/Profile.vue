<template>
  <div class="profile">
    <van-nav-bar title="个人中心" />
    <div class="protop">
      <div class="pro-left">
        <i class="van-icon van-icon-user-circle-o van-grid-item__icon"></i>
      </div>
      <div class="pro-cen">
        <div>登陆注册</div>
        <div>暂无手机号</div>
      </div>
      <div class="pro-rig">
        <i class="van-icon van-icon-arrow van-grid-item__icon"></i>
      </div>
    </div>
    <van-grid :column-num="3">
      <van-grid-item icon="balance-pay" text="余额" />
      <van-grid-item icon="goods-collect-o" text="收藏" />
      <van-grid-item icon="vip-card-o" text="VIP服务" />
      <van-grid-item icon="question-o" text="帮助与反馈" />
      <van-grid-item icon="phone-o" text="致电我们" />
      <van-grid-item icon="setting-o" text="设置" />
      <van-grid-item icon="ellipsis" text="更多" />
    </van-grid>
    <tab-bar />
  </div>
</template>

<script>
  import TabBar from '@/components/TabBar'

  export default {
    name: 'Profile',
    components: {
      TabBar
    }
  }
</script>
<style scoped>
  .profile {
    height: 100vh;
    background-color: #9697990a;
  }

  .protop {
    background-color: #fff;
    width: 100%;
    height: 100px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    position: relative;
    margin: 10px 0 10px 0;
  }

  .pro-left {
    margin: 10px 10px 10px;
    height: 80px;
    width: 80px;
  }

  .pro-left .van-grid-item__icon {
    display: block;
    width: 30px;
    height: 30px;
    line-height: 80px;
    font-size: 50px;
  }

  .pro-cen {
    font-size: 15px;
    color: #7e7474;
    position: absolute;
    top: 25px;
    left: 80px;
  }

  .pro-rig {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
  }

  .pro-rig .van-grid-item__icon {
    width: 30px;
    height: 30px;
    line-height: 80px;
    font-size: 25px;
  }
</style>