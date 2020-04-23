<template lang="pug">
transition(name="van-fade")
  .full-w.full-h.pst-fix.ovfl-hd.box-mask.l-0.t-0(
    v-show="visible"
    @click.self="fnClickMask"
  )
    .ovfl-hd.h-629
      .w-457.h-595.fl-right.mr-49.mt-34
        img.img-contain(src="/images/share-bg.png")
    .text-center.color-white.fs-36.mt-51 好东西可不要独享，转给朋友们吧

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
  z-index: 20;
}
</style>
