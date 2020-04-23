<template lang="pug">
  div(style="background: #fafafa;")
    .h-200.pst-absl.t-10.l-0.r-0(style="z-index: 10;")
      //- SwipeTip(ref="swipeTip")
    .w-750.h-935.pst-rlt
      .w-162.h-43.pst-absl.l-34.t-24(style="z-index:1;")
        img.img-contain(src="/images/logo2.png")
      van-image(src="/images/head.png")
    //- 预约信息， 微信
    ShareInfo(
      v-if="!bShowSubscribeLogin && isLogin"
      @share="fnClickShare"
    )
    //- .m-400
    //- 预约成功信息,浏览器
    //- ShareSuccess(v-if="bShowSubscribeSuccess && isLogin")
    //- 手工填写预约订单
    SubscribeLogin(
      v-if="bShowSubscribeLogin"
      @showClause="fnClickShowClauseDialog")
    //- 公共图片区域
    div
      img.img-contain(src="/images/static-bg.png")
    div
      Question
    .text-center.pb-31.mt-31
      div.fs-24(style="color: #FF9C00;") “一人为众，众为一人”
      div.mt-10.fs-24(style="color: #999999;") 本活动技术支持由星互网络提供
    ShareMask(:visible.sync="bShowMask")
    SubscribeDialog(:visible.sync="bShowSubscribeDialog")

</template>
<script>
import { mapState } from 'vuex'
import { Toast } from 'vant'
import Question from '../../components/Question'
import ShareMask from '../../components/ShareMask'
import SubscribeDialog from '../../components/SubscribeDialog'
// import SwipeTip from '../../components/SwipeTip'
// import ClauseDialog from '../../components/ClauseDialog'
// 预约-手工填单
import {
  getUserInfoWithToken,
  subscribeInfo,
  refreshToken,
  getWxUserInfo,
  subscribeList,
  loginWithFosunToken,
  subscribeActive
} from '../../api'

import { share } from '../../plugins/wx'
import SubscribeLogin from '../../components/Subscribe/Login'
import ShareSuccess from '../../components/Subscribe/success'
import ShareInfo from '../../components/Subscribe/info'
import { awaitWrap, getCookie } from '../../utils'
import ua from '../../utils/ua'

export default {
  components: {
    Question,
    ShareMask,
    SubscribeDialog,
    ShareInfo,
    ShareSuccess,
    SubscribeLogin
  },
  data() {
    return {
      bAutoSubscribe: false, // 是否直接预约
      bShowMask: false,
      isWeixin: ua.isWeixin,
      bShowSubscribeDialog: false, // 是否显示预约弹框
      bShowClauseDialog: false // 是否显示条款
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.user.isLogin,
      // 是否预约成功
      bShowSubscribeSuccess: (state) => state.subscribe.bSubscribe,
      loginWxType: (state) => state.user.bindWxType
    }),
    // 是否显示手工填写预约订单
    bShowSubscribeLogin() {
      return this.isLogin === false
    }
  },
  created() {
    this.fnBsnWeixinJsShare()
    // this.fnBsnInit()
  },
  mounted() {
    this.$nextTick(() => {
      this.fnNetGetSubscribeList()
    })
  },
  methods: {
    // 初始化入口
    async fnBsnInit() {
      const [, isMini] = await awaitWrap(ua.isMini)
      // 如果有healthToken，直接预约成功
      if (this.$route.query.healthToken) {
        this.bAutoSubscribe = true
        this.loginWithFusonToken()
        return
      }
      // 如果是微信，并且不是小程序
      if (this.ua.isWeixin && !isMini) {
        this.fnBsnGetWxUserInfo()
      } else {
        // 小程序，不是微信
        this.bAutoSubscribe = true
        this.fnBsnGetUserInfo()
      }
    },
    // 根据复星token获取用户信息
    async loginWithFusonToken() {
      const [err, data] = await loginWithFosunToken({
        data: this.$route.query.healthToken
      })
      if (err) {
        return
      }
      // this.oForm.phone = data.data.mobile || '';
      this.tokenInfo = data.data
      this.$store.commit('user/updateLoginStatus', true)
      localStorage.setItem('loginInfo', JSON.stringify(data.data))
      this.fnBsnGetUserInfo()
    },
    // 微信分享
    async fnBsnWeixinJsShare(nickName = '【您的朋友】') {
      const [, isMini] = await awaitWrap(this.ua.isMini())
      if (!isMini && this.ua.isWeixin) {
        // 分享
        const titleStr = `${nickName}邀您一起免费预约50万大病互助金`
        const desc = '现在预约，即可享受1分钱加入最高50万元大病互助计划！'
        share({
          title: titleStr,
          link: location.href,
          desc,
          imgUrl: 'https://www.fostars.top/images/share-icon.jpg'
        })
      }
    },
    // 获取预约列表
    async fnNetGetSubscribeList() {
      const [err, data] = await subscribeList()
      if (err) return
      if (!data.data) data.data = []
      for (let index = 0; index < data.data.length; index++) {
        await this.fnBsnAddTip(data.data[index], index)
      }
    },
    fnBsnAddTip(item, index) {
      return new Promise((resolve) => {
        const time = index === 0 ? 0 : 3000 * Math.random()
        setTimeout(() => {
          if (!this.$refs.swipeTip) {
            return
          }
          this.$refs.swipeTip.addToList(item)
          resolve()
        }, time)
      })
    },
    // 如果是微信环境，获取用户的微信信息
    async fnBsnGetWxUserInfo() {
      // 判断是否有cookie
      const storeCookie = getCookie('LoginSuccessInfo')
      if (storeCookie) {
        let parseCookie = null
        try {
          parseCookie = JSON.parse(storeCookie)
        } catch (error) {}
        // localStorage.setItem('loginInfo', storeCookie);
        // 判断本地是否有登录信息
        const localStoreInfo = localStorage.getItem('loginInfo')
        // 如果没有登录过
        if (!localStoreInfo) {
          this.$store.commit('user/updateLoginStatus', false)
          return
        } else {
          // 如果登录过
          this.fnBsnGetUserInfo()
        }
        if (
          parseCookie.tokenInfo &&
          parseCookie.tokenInfo.loginType === 'WX_ACCCOUNT_LOGIN'
        ) {
          this.fnBsnGetUserInfo()
          this.$store.commit('user/updateLoginStatus', true)
          this.$store.commit('user/updateBindWxType', true)
        } else {
          this.$store.commit('user/updateBindWxType', false)
        }
        return
      }
      // console.log('ismini', isMini);
      const [err, data] = await getWxUserInfo({
        data: {
          redirectUri: location.href,
          scope: 'snsapi_userinfo',
          state: ''
        }
      })
      if (err) {
        return
      }
      location.href = data.data
    },
    // 获取用户信息
    async fnBsnGetUserInfo() {
      const token = localStorage.getItem('loginInfo')
      if (token) {
        // token是否有效
        const [err, data] = await getUserInfoWithToken()
        if (err) {
          if (err.result === 401) {
            // token过期
            this.refreshToken()
          } else {
            localStorage.removeItem('loginInfo')
            this.$store.commit('user/updateLoginStatus', false)
          }
          return
        }
        if (!data.data) data.data = {}
        this.$store.commit('user/updateLoginStatus', true)
        this.$store.commit('user/updateUserInfo', data.data)
        this.fnBsnWeixinJsShare(data.data.nickName)
        this.fnNetGetSubscribeInfo()
      }
    },
    // 刷新token
    async refreshToken() {
      const tokenStr = localStorage.getItem('loginInfo')
      if (tokenStr) {
        const data = JSON.parse(tokenStr)
        const refreshTokenStr = data.refreshToken
        const [err, tokenInfo] = await refreshToken({
          data: refreshTokenStr
        })
        if (err) {
          return
        }
        localStorage.setItem('loginInfo', JSON.stringify(tokenInfo.data))
        // 刷新之后，
        this.fnBsnGetUserInfo()
      }
    },
    // 获取预约信息
    async fnNetGetSubscribeInfo() {
      const [err, data] = await subscribeInfo()
      if (err) {
        this.$store.commit('subscribe/updateSubscribeStatus', false)
        if (err.result === 500) {
          this.$store.commit('user/updateLoginStatus', false)
          return
        }
        // 如果直接预约信息
        if (this.bAutoSubscribe) {
          const [err, data] = await subscribeActive()
          if (err) {
            Toast.fail('预约失败')
            return
          }
          this.$store.commit('subscribe/updateSubscribeInfo', data.data)
          this.$store.commit('subscribe/updateSubscribeStatus', true)
        }
        return
      }
      this.$store.commit('subscribe/updateSubscribeInfo', data.data)
      this.$store.commit('subscribe/updateSubscribeStatus', true)
    },
    fnClickShare() {
      this.bShowMask = true
    },
    fnClickShowClauseDialog() {
      this.bShowClauseDialog = true
    }
  }
}
</script>
