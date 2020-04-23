<template lang="pug">
  .h-290.pst-rlt.login
    .w-690.h-500.br-20.box.pst-absl.l-30.text-center.bs-bd
      .px-46.mt-70
        .van-hairline--bottom.flex.pb-14
          .w-44.h-44.ml-10.dspl-inbl.vtal-md.lh-44
            img.img-contain(src="/images/phone.png")
          .w-539.h-44.vtal-md.dspl-inbl.ml-10.fs-0
            input.fs-32.lh-44.h-44.wp-100(
              type="number"
              pattern="\d*"
              maxlength="11"
              placeholder="请输入手机号"
              v-model="oForm.phone"
            )
        .flex.mt-55
          .van-hairline--bottom.w-400.flex.pb-14
            .w-44.h-44.ml-10.dspl-inbl.vtal-md.lh-44.vtal-md
              img.img-contain(src="/images/code.png")
            .h-44.vtal-md.dspl-inbl.ml-10.fs-0.w-251
              input.fs-30.lh-44.h-44.wp-100(
                placeholder="请输入验证码"
                type="number"
                pattern="\d*"
                maxlength="4"
                v-model="oForm.code"
              )
          .w-180.ml-20.van-hairline--bottom.text-center
            .fs-30(:style="codeStyle")
              span.lh-44.fs-30(
                @click="fnClickGetCode"
                v-if="!showCountDown"
              ) 获取验证码
              van-count-down(
                v-else="showCountDown"
                style="color: #FF9C00;font-size: 4vw;line-height: 5.86667vw;"
                :time="time" format="sss"
                @finish="fnBsnFinishCountDownTime"
              )
        .w-600.h-90.text-center.lh-98.mt-70.btn.color-white(
          @click="fnClickLogin"
          ) 立即免费预约
      .mt-37.fs-22(style="color: #999999;"
      @click="fnClickShowClause"
      ) 提交预约即表示您已阅读并同意
        span(@click="fnClickChangeType('agreement')") 《会员协议》
        span(@click="fnClickChangeType('privacy')") 《隐私条款》
      ClauseDialog(:visible.sync="bShowClause" :type="clauseType")
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'
import {
  getSmsCode,
  subscribeActive,
  getUserInfoWithToken,
  subscribeInfo,
  loginWithCode
} from '../../api'
import ClauseDialog from '../ClauseDialog'
import { awaitWrap, validPhone, getCookie } from '../../utils'
export default {
  components: {
    ClauseDialog
  },
  data() {
    return {
      time: 30 * 1000,
      showCountDown: false,
      bWillToSuccessPage: false, // 预约成功，是否需要跳转成功页面
      clauseType: 'agreement',
      bShowClause: false,
      oForm: {
        phone: '',
        code: ''
      },
      tokenInfo: null // 从复星健康小程序跳转的token信息
    }
  },
  computed: {
    codeStyle() {
      if (validPhone(this.oForm.phone)) {
        return {
          color: '#FF9C00'
        }
      } else {
        return {
          color: '#999999'
        }
      }
    },
    ...mapState({
      bindWxType: (state) => state.user.bindWxType
    })
  },
  created() {
    // const query = this.$route.query;
    // if(query.healthToken){
    //   this.bWillToSuccessPage = false;
    //   this.loginWithFusonToken();
    // }else{
    //   this.bWillToSuccessPage = true;
    // }
  },
  methods: {
    fnClickChangeType(type) {
      this.clauseType = type
      this.bShowClause = true
    },
    clickShare() {
      this.$emit('share')
    },
    fnClickShowClause() {
      this.$emit('showClause')
    },
    // 获取用户信息
    async fnBsnGetUserInfo() {
      const token = localStorage.getItem('loginInfo')
      if (token) {
        // token是否有效
        const [err] = await getUserInfoWithToken()
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
        this.$store.commit('user/updateLoginStatus', true)
        this.fnNetGetSubscribeInfo()
      }
    },
    // 获取预约信息
    async fnNetGetSubscribeInfo() {
      const [err, data] = await subscribeInfo()
      if (err) {
        if (err.result === 201) {
          this.$store.commit('subscribe/updateSubscribeStatus', false)
        }
        return
      }
      this.$store.commit('subscribe/updateSubscribeStatus', true)
      this.$store.commit('subscribe/updateSubscribeInfo', data.data)
    },
    // 获取验证码
    fnClickGetCode() {
      if (!validPhone(this.oForm.phone)) {
        // Toast('我是提示文案，建议不超过十五字~');
        // Toast.success('成功文案');
        Toast('请输入合法手机号')
        return
      }
      this.fnNetGetCode()
    },
    // 结束倒计时
    fnBsnFinishCountDownTime() {
      this.showCountDown = false
    },
    fnBsnScrollToTop() {
      window.scrollTo(0, 0)
    },
    // 登录
    fnClickLogin() {
      if (!validPhone(this.oForm.phone)) {
        Toast('请输入合法手机号')
        return
      }
      if (!this.oForm.code) {
        Toast('请输入验证码')
        return
      }
      // 如果本地没有登录信息
      const tokenStr = localStorage.getItem('loginInfo')
      if (!tokenStr) {
        this.fnNetLogin()
        return
      }
      this.fnNetSubscribe()
    },
    async fnNetSubscribe() {
      const [err] = await subscribeActive({
        data: {
          phoneNum: this.oForm.phone,
          code: this.oForm.code
        }
      })
      if (err) {
        if (err.result === 500) {
          localStorage.removeItem('loginInfo')
          this.$store.commit('user/updateLoginStatus', false)
        }
        err.msg && Toast(err.msg)
        return
      }
      Toast.success('预约成功')
      await this.fnBsnGetUserInfo()
      const [, isMini] = await awaitWrap(this.ua.isMini())
      if (!this.ua.isWeixin || isMini) {
        this.$router.push('/success')
      }
    },
    // 登录
    async fnNetLogin() {
      const [, isMini] = await awaitWrap(this.ua.isMini())
      let tokenStr = null
      try {
        const storeCookie = getCookie('LoginSuccessInfo')
        const parseObj = JSON.parse(storeCookie)
        tokenStr = parseObj.accessToken
      } catch (error) {}
      const [err, data] = await loginWithCode({
        data: {
          phoneNum: this.oForm.phone,
          verificationCode: this.oForm.code,
          // 如果是微信，不是小程序，=> 只在微信浏览器中使用 微信的token
          onlyWxLoginToken: this.ua.isWeixin && !isMini ? tokenStr : ''
        }
      })
      if (err) {
        Toast(err.msg)
        return
      }
      localStorage.setItem('loginInfo', JSON.stringify(data.data))
      this.$store.commit('user/updateLoginStatus', true)
      this.fnNetSubscribe()
    },
    async fnNetSubscribeWithFusonToken() {
      // 先登录
      localStorage.setItem('loginInfo', JSON.stringify(this.tokenInfo))
      // 后预约
      const [err] = await subscribeActive()
      if (err) {
        return
      }
      Toast.success('预约成功')
      // 更新预约信息
      this.$store.commit('subscribe/updateSubscribeStatus', true)
      this.$router.push('/success')
    },
    // 获取验证码
    async fnNetGetCode() {
      if (this.showCountDown) return
      const [err] = await getSmsCode({
        data: {
          phoneNum: this.oForm.phone
        }
      })
      if (err) {
        err.msg && Toast(err.msg)
        return
      }
      Toast('验证码发送成功')
      this.showCountDown = true
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  top: -210px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(230, 230, 230, 1);
  box-shadow: 0px 5px 10px 0px rgba(204, 205, 241, 0.35);
  border-radius: 20px;
}
.login {
  [class*='van-hairline']::after {
    border-color: #ff9c00;
  }
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    font-size: 32px;
    line-height: 44px;
    color: #999999;
    opacity: 1; /* Firefox */
  }
  .btn {
    background: linear-gradient(
      8deg,
      rgba(255, 156, 0, 1) 0%,
      rgba(255, 210, 0, 1) 100%
    );
    box-shadow: 0px 7px 10px 0px rgba(191, 109, 26, 0.35);
    border-radius: 45px;
  }
}
</style>
