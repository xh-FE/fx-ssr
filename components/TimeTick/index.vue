<template lang="pug">
  span
    span(v-if="+timeInfo.d > 0") {{ timeInfo.d }}天
    span {{ timeInfo.h || 0}}时
    span(v-if="+timeInfo.d === 0") {{ timeInfo.m || 0}}分
    span(v-if="+timeInfo.d === 0") {{ timeInfo.s || 0}}秒
</template>

<script>
import { TimerTick } from './timer-tick'

export default {
  name: 'TimeTick',
  props: {
    endTime: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      timeInfo: {
        d: '', // 天
        h: '', // 小时
        m: '', // 分
        s: '' // 秒
      }
    }
  },
  watch: {
    endTime(newVal) {
      if (newVal) {
        this.fnBsnTick(newVal)
      }
    }
  },
  mounted() {
    this.fnBsnTick(this.endTime)
  },
  methods: {
    fnBsnTick(endTime) {
      if (endTime) {
        if (this.timerVm) {
          this.timerVm.clear()
          this.timerVm = null
        }
        const timerTick = new TimerTick(endTime)
        this.timerVm = timerTick
        timerTick.tick(({ timeInfo }) => {
          this.$emit('tick', timeInfo)
          this.timeInfo = timeInfo
          if (
            timeInfo.d === undefined &&
            timeInfo.h === undefined &&
            timeInfo.m === undefined &&
            timeInfo.s === undefined
          ) {
            this.$emit('onEnd', timeInfo)
          }
        })
      }
    }
  }
}
</script>
