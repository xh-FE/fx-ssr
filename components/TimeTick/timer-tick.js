/*
 * 时间倒计时 HH:MM:SS
 * @Author: liujianhui@lexue.com
 * @Date: 2019-11-14 14:05:21
 * @Last Modified by: jianhui
 * @Last Modified time: 2020-04-22 18:33:24
 */

/**
 * useage
 * const timerTick = new TimerTick();
 * const timeInfo = timerTick.tick(); // timeInfo
 */

class TimerTick {
  constructor(endTime) {
    this.endTime = endTime
    this.timer = null
    this.timeInfo = {
      d: '',
      h: '',
      m: '',
      s: ''
    }
  }

  initFn(cb) {
    const date = new Date()
    const now = date.getTime()
    const endDate = new Date(this.endTime) // 设置截止时间
    const end = endDate.getTime()
    const leftTime = end - now // 时间差
    let d
    let h
    let m
    let s
    let ms
    if (leftTime >= 0) {
      d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
      h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
      m = Math.floor((leftTime / 1000 / 60) % 60)
      s = Math.floor((leftTime / 1000) % 60)
      ms = Math.floor(leftTime % 1000)
      if (ms < 100) {
        ms = '0' + ms
      }
      if (s < 10) {
        s = '0' + s
      }
      if (m < 10) {
        m = '0' + m
      }
      if (h < 10) {
        h = '0' + h
      }
    } else {
      this.clear()
    }
    this.timeInfo.d = d
    this.timeInfo.h = h
    this.timeInfo.m = m
    this.timeInfo.s = s
    // eslint-disable-next-line
    cb(this);
    // eslint-disable-next-line
    return this;
  }

  tick(cb) {
    this.initFn(cb)
    this.timer = setInterval(() => {
      this.initFn(cb)
      // eslint-disable-next-line
      cb(this);
    }, 1000)
    return this
  }

  clear() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}

export default TimerTick

export { TimerTick }
