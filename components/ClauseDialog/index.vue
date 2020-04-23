/* * 条款弹框 * @Author: liujianhui * @Date: 2020-04-13 13:41:45 * @Last Modified by: jianhui */

<template lang="pug">
div
  .full-w.full-h.pst-fix.ovfl-hd.box-mask.l-0.t-0(
    style="z-index: 11;"
    v-show="visible"
  )
    transition(name="van-slide-up")
      .w-730.h-880.bg-white.pst-absl.b-0.ml-10.box.fs-28.bs-bd.pt-89(v-show="visible")
        .pst-absl.r-22.t-22.w-32.h-32(@click="fnClickMask")
          img.img-contain(src="/images/close.png")
        div.text-center.mb-63
          .w-83.h-19.dspl-inbl
            img.img-contain(src="/images/line-01.png")
          .dspl-inbl.fs-34.mx-24(style="color: #FF9C00;") {{ title }}
          .w-83.h-19.dspl-inbl
            img.img-contain(src="/images/line-02.png")
        .h-701.ovfl-y-scroll(ref="box")
          Agreement(v-show="type === 'agreement'")
          Privacy(v-show="type === 'privacy'")
</template>
<script>
import Agreement from './agreement'
import Privacy from './privacy'

export default {
  components: {
    Agreement,
    Privacy
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    title() {
      if (this.type === 'agreement') {
        return '星互网络会员注册协议'
      } else {
        return '星互网络隐私政策'
      }
    }
  },
  watch: {
    visible(val) {
      const body = document.body
      if (val) {
        body.classList.add('ovfl-hd')
        setTimeout(() => {
          this.$refs.box.scroll(0, 0)
        }, 20)
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
  z-index: 12;
  background: rgba(0, 0, 0, 0.8);
  .box {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #555555;
  }
}
</style>
