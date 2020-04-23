<template lang="pug">
transition(name="van-fade")
  .full-w.full-h.pst-fix.ovfl-hd.box-mask.l-0.t-0(
    v-show="visible"
    @click.self="fnClickMask"
  )
    .w-660.h-500.bg-white.br-30.vh
      .pst-absl.r-33.t-33.h-33.w-33(@click="fnClickMask")
        img.img-contain(src="/images/close.png")
      .w-214.h-209.m-auto.mt-89
        img.img-contain(src="/images/er-code.jpg")
      .text-center.mt-54.fs-32.lh-50
        div 请截图后用微信扫码或微信搜索 “星互助”
        div 关注公众号即可查看预约详情
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      const body = document.body
      if (val) {
        body.classList.add('ovfl-hd')
      } else {
        body.classList.remove('ovfl-hd')
      }
    }
  },
  methods: {
    fnClickMask() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.box-mask {
  background: rgba(0, 0, 0, 0.8);
  z-index: 12;
}
</style>
