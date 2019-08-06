<template>
  <div id="home">
    <view class="page">
      <div class="swiper">
        <swiper 
          :indicator-dots="indicatorDots"
          indicator-active-color="#fff"
          :autoplay="autoplay" 
          :interval="interval" 
          :duration="duration">
          <block v-for="(item, index) in imgUrls" :key="index">
            <swiper-item>
              <image :src="item" class="slide-image" height="150"/>
            </swiper-item>
          </block>
      </swiper>
      <!-- <slider @change="intervalChange" show-value :min="500" :max="2000"/> -->
      <!-- <slider @change="durationChange" show-value :min="1000" :max="10000"/> -->
      </div>
      <view class="weui-cells__title">带跳转的列表项</view>
        <view class="weui-cells weui-cells_after-title">
          <navigator url="/pages/logs/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__bd">cell standard</view>
            <view class="weui-cell__ft weui-cell__ft_in-access"></view>
          </navigator>
      </view>
      <p>测试vue双向绑定：</p>
      <view class="section">
        <input placeholder="请输入内容" v-model="text"/>
      </view>
      <p>输入的值：{{ text }}</p>
    </view>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapState } from 'vuex'
import banner from '../../assets/images/banner.png'
export default {
  name: 'home',
  data() {
    return {
      imgUrls: [
        banner,
        banner,
        banner
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      text: ''
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap() {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle(ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    focusFunc(e) {
    },
    intervalChange(e) {
      this.interaval = e.detail.value
    },
    durationChange(e) {
      this.duration = e.detail.value
    }
  },

  created() {
    // let app = getApp()
  },
  mounted() {
    // console.log('Store: ', this.$store)
    // 测试接口
    this.Api.doLogin()
  },
  computed: {
    ...mapState({
      isLogin: state => state.common.isLogin
    })
  }
}
</script>

<style scoped lang="stylus">
swiper
  height 184rpx
.page
  padding 16px
  h1
    text-align left
  .swiper
    image
      width 686rpx
      height 184rpx
      background-size cover
</style>
