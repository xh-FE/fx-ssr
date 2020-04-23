<template lang="pug">
  .h-297.pst-rlt
    .w-690.h-500.br-20.box.pst-absl.l-30.text-center.bs-bd.pt-30
      .fs-38(style="color: #333333;") 恭喜您预约成功
      .fs-38.mt-14(style="color: #FF4E00;") {{userInfo.nickName}}（{{userInfo.maskMobile}}）
      .fs-30.mt-14(style="color: #333333;") 请等待上线通知
      .w-174.h-170.m-auto.mt-28.e-box.bs-bd.pt-5
        //- 二维码
        .w-160.h-160.ml-7.bg-blue
          img.img-contain(src="/images/er-code.jpg")
      .text-center.fs-28.lh-40.mt-18(style="color: #555555;")
        div 请截图后用微信扫码或微信搜索 “星互助”
        div 关注公众号即可查看预约详情
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  },
  methods: {
    clickShare() {
      this.$emit('share')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  top: -210px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(230, 230, 230, 1);
  box-shadow: 0px 5px 10px 0px rgba(204, 241, 205, 0.35);
  border-radius: 20px;
}
.e-box {
  background: url(/images/box.png) no-repeat left/contain;
}
</style>
