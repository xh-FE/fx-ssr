<template lang="pug">
  .login.full-w.full-h.bg-white.pst-rlt
    .pt-245
    .w-382.h-102.m-auto.mb-256
      img.img-contain(src="/images/logo.png")
    //- 登录选项
    .px-76
      .van-hairline--bottom.pb-10
        .w-44.h-44.ml-10.dspl-inbl.vtal-md.lh-44.vtal-md
          img.img-contain(src="/images/phone.png")
        .w-530.h-44.vtal-md.dspl-inbl.ml-10.fs-0.mt-4
          input.fs-32.lh-44.h-44.wp-100(
            @blur="fnBsnScrollToTop"
            type="number"
            pattern="\d*"
            maxlength="11"
            placeholder="请输入手机号"
            v-model="oForm.phone"
          )
      .mt-55
        .van-hairline--bottom.w-400.pb-10.dspl-inbl.vtal-md
          .w-44.h-44.ml-10.dspl-inbl.vtal-md.lh-44.vtal-md
            img.img-contain(src="/images/code.png")
          .h-44.vtal-md.dspl-inbl.ml-10.fs-0.w-251.mt-4
            input.fs-32.lh-44.h-44.wp-100(
              placeholder="请输入验证码"
              @blur="fnBsnScrollToTop"
              type="number"
              pattern="\d*"
              maxlength="4"
              v-model="oForm.code"
              )
        .ml-20.van-hairline--bottom.text-center.dspl-inbl.w-178.pb-11.vtal-md
          .fs-30.h-45(:style="codeStyle")
            span.lh-44.fs-30(
              v-if="!showCountDown"
              @click="fnClickGetCode"
            ) 获取验证码
            van-count-down(
              v-else="showCountDown"
              style="color: #FF9C00;font-size: 4vw;line-height: 5.86667vw;"
              :time="time" format="sss"
              @finish="fnBsnFinishCountDownTime"
            )
    //- 确认按钮
    .w-600.h-90.fs-32.btn.text-center.lh-90.mt-70.m-auto(style="color: #fff;" @click="fnClickLogin") 确 认
    div.fs-22.lh-45.text-center.mt-37(
      @click="fnClickShowClause"
      style="color: #999999;") 提交预约即表示您已阅读并同意
        span(@click="fnClickChangeType('agreement')") 《会员协议》
        span(@click="fnClickChangeType('privacy')") 《隐私条款》
    .fs-24.pst-absl.b-32.wp-100.text-center(style="color:#999999;") Copyright © 2020 星互网络版权所有
    ClauseDialog(:visible.sync="bShowClause" :type="clauseType")
</template>

<script>
import { Toast } from 'vant'
import { validPhone, awaitWrap, getCookie } from '../../utils'
import { loginWithCode, getSmsCode } from '../../api'
import ClauseDialog from '../../components/ClauseDialog'

export default {
  components: {
    ClauseDialog
  },
  data() {
    return {
      time: 30 * 1000,
      showCountDown: false,
      bShowClause: false,
      clauseType: 'agreement',
      oForm: {
        phone: '15901111111',
        code: ''
      }
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
    }
  },
  methods: {
    fnClickChangeType(type) {
      this.clauseType = type
    },
    fnClickShowClause() {
      this.bShowClause = true
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
    async fnClickLogin() {
      if (!validPhone(this.oForm.phone)) {
        Toast('请输入合法手机号')
        return
      }
      if (!this.oForm.code) {
        Toast('请输入验证码')
        return
      }
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
        err.msg && Toast(err.msg)
        return
      }
      Toast.success('登录成功')
      localStorage.setItem('loginInfo', JSON.stringify(data.data))
      this.$store.commit('user/updateLoginStatus', true)
      this.$router.replace('/subscribe')
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
.login {
  [class*='van-hairline']::after {
    border-color: #ff9c00;
  }
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    font-size: 30px;
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
    box-shadow: 0px 7px 10px 0px rgba(193, 0, 109, 0.35);
    border-radius: 45px;
  }
}
</style>
