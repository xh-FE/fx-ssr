// 判断浏览器类型
class Ua {
  get ua() {
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    if (process.client) {
      const ua = window.navigator.userAgent.toLowerCase()
      return ua
    } else {
      return ''
    }
  }

  /**
   * @description 判断是否是微信环境
   * @returns Boolean
   */
  get isWeixin() {
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (/MicroMessenger/i.test(this.ua)) {
      return true
    } else {
      return false
    }
  }

  // 是否是微信小程序
  isMini() {
    return new Promise((resolve, reject) => {
      // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if (this.isWeixin) {
        wx.miniProgram.getEnv((res) => {
          if (res.miniprogram) {
            resolve(true)
          } else {
            reject(false)
          }
        })
      } else {
        reject(false)
      }
    })
  }

  /**
   * @description 判断是否是QQ浏览器
   * @returns Boolean
   */
  get isQQ() {
    return this.ua.match(/QQ/i) === 'qq'
  }

  /**
   * @description 判断是否是手机端
   * @returns Boolean
   */
  get isMobile() {
    return !!this.ua.match(/AppleWebKit.*Mobile.*/i)
  }

  /**
   * @description 判断是否是Android
   * @returns Boolean
   */
  get isAndroid() {
    return this.getAgent().match(/Android/i) === 'android'
  }

  /**
   * @description 判断是否是IOS
   * @returns Boolean
   */
  get isIOS() {
    return !!this.getAgent().match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i)
  }
}

export default new Ua()
