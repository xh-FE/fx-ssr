<template lang="pug">
  .pst-rlt(:class="[isWeixin && !isMini || !bSubscribe ? 'h-227' : 'h-320']")
    .h-480.dspl-none.h-380.h-510.pt-71.h-227.h-320
    .w-690.br-20.box.pst-absl.l-30.text-center.bs-bd(:class="[isWeixin && !isMini || !bSubscribe ? 'h-380' : 'h-510']")
      div(v-if="bSubscribe")
        //- span bSubscribe {{ bSubscribe }}
        //- span isWeixin {{ isWeixin }}
        //- span isMini {{ isMini }}
        div.mt-55(v-if="isWeixin && !isMini")
          .fs-36(style="color: #333333;") 恭喜您预约成功
          .fs-36.mt-14(style="color: #FF4E00;") {{subscirbeUserInfo.nickName}} ({{subscirbeUserInfo.maskMobile}} )
          .fs-30.mt-14(style="color: #333333;") 请等待上线通知
          .w-600.h-90.btn.lh-90.text-center.color-white.fs-32.m-auto.mt-48(@click="clickShare") 转给亲友，一起预约
        div(
          v-else
          @click="fnClickShowDetail"
        )
          .fs-36.mt-38(style="color: #333333;") 恭喜您预约成功
          .fs-36.mt-14(style="color: #FF4E00;") {{subscirbeUserInfo.nickName}}
            span(v-if="subscirbeUserInfo.maskMobile")
              span (
              span {{subscirbeUserInfo.maskMobile}}
              span )
          .fs-30.mt-14(style="color: #333333;") 请等待上线通知
          //- 不是微信
          .w-170.h-170.m-auto.p-10.bs-bd.e-box.mt-28
            //- 微信二维码 img
            img.img-contain(src="/images/er-code.jpg")
          .text-center.mt-18.fs-32.lh-50
            div 请截图后用微信扫码或微信搜索“星互助”
            div 关注公众号即可查看预约详情
      div.pt-50(v-else)
        .fs-38(style="color: #333333;") 未查到您的预约记录
        .fs-38.mt-22(style="color: #FF4E00;")
          span {{subscirbeUserInfo.nickName}}
          span(v-if="subscirbeUserInfo.maskMobile") （
          span {{subscirbeUserInfo.maskMobile}}
          span(v-if="subscirbeUserInfo.maskMobile")  ）
        .fs-38.my-22(style="color: #333333;") 建议您：
        .w-600.h-90.btn.lh-90.text-center.mt-43.color-white.fs-32.m-auto.mt-48(@click="clickSubscribe") 现在去预约
    SubscribeDialog(:visible.sync="bShowSubscribeDialog")
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from 'vant'
import SubscribeDialog from '../SubscribeDialog'
import { subscribeActive } from '../../api'
import { awaitWrap } from '../../utils'
export default {
  components: {
    SubscribeDialog
  },
  data() {
    return {
      isWeixin: this.ua.isWeixin,
      isMini: false,
      bShowSubscribeDialog: false
    }
  },
  computed: {
    ...mapState({
      bSubscribe: (state) => state.subscribe.bSubscribe,
      subscirbeUserInfo: (state) => state.subscribe.info
    })
  },
  mounted() {
    this.getIsMini()
  },
  methods: {
    clickShare() {
      this.$emit('share')
    },
    async getIsMini() {
      const [, data] = await awaitWrap(this.ua.isMini())
      if (data) {
        this.isMini = true
      } else {
        this.isMini = false
      }
    },
    // 获取预约信息
    // async fnNetGetSubscribeInfo () {
    //   const [err, data] = await subscribeInfo();
    //   if(err){
    //     if(err.result === 201){
    //       this.$store.commit('subscribe/updateSubscribeStatus', false);
    //     }
    //     return;
    //   }
    //   this.$store.commit('subscribe/updateSubscribeStatus', true);
    //   this.$store.commit('subscribe/updateSubscribeInfo', data);
    // },
    async clickSubscribe() {
      const [err, data] = await subscribeActive()
      if (err) {
        return
      }
      Toast.success('预约成功')
      // 更新预约信息
      this.$store.commit('subscribe/updateSubscribeStatus', true)
      this.$store.commit('subscribe/updateSubscribeInfo', data.data)
    },
    fnClickShowDetail() {
      this.bShowSubscribeDialog = true
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
.btn {
  background: linear-gradient(8deg, rgba(255, 156, 0, 1) 0%, rgba(255, 210, 0, 1) 100%);
  box-shadow: 0px 7px 10px 0px rgba(193, 0, 109, 0.35);
  border-radius: 45px;
}
.e-box {
  background: url(/images/box.png) no-repeat left/contain;
}
</style>
