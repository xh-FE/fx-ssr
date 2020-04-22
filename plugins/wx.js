import { getWxParams } from '../api'
// import { getCookie, setCookie } from '../utils/client'
import Ua from '../utils/ua'
// 微信分享api list
const jsApiList = [
  'updateAppMessageShareData', // 分享朋友
  'updateTimelineShareData' // 分享朋友圈
]

/**
 * 微信分享
 * @param {Object} conf
 *  title: '', // 分享标题
 *  link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
 *  imgUrl: '', // 分享图标
 * @param {*} cb
 */
export const share = async (conf, cb) => {
  const bIsWx = Ua.isWeixin
  if (!bIsWx) return
  // 注册微信登录
  const [err, data] = await getWxParams({
    data: encodeURI(window.location.href)
  })
  if (err) {
    return
  }
  const { appId, timestamp, nonceStr, signature } = data.data

  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // 必填，签名
    jsApiList // 必填，需要使用的JS接口列表
  })
  wx.ready(function() {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.updateAppMessageShareData({
      ...conf,
      success() {
        // 设置成功
        cb()
      }
    })
    wx.updateTimelineShareData({
      ...conf,
      success() {
        // 设置成功
        cb()
      }
    })
  })
  wx.error(function(res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  })
}

// 微信登录授权
// export const login = async () => {
//   const bIsWx = Ua.isWeixin
//   if (!bIsWx) return
//   const [err, appid] = await getAppId()
//   if (err) {
//     return
//   }
//   // 已授权采用静默方式
//   const authed = getCookie('wx-auth')
//   const SCOPE = authed ? 'snsapi_base' : 'snsapi_userinfo'
//   const REDIRECT_URI = encodeURIComponent(location.href)
//   const params = [
//     `appid=${appid}`,
//     `redirect_uri=${REDIRECT_URI}`,
//     'response_type=code',
//     `scope=${SCOPE}`,
//     `state=state#wechat_redirect`
//   ]
//   // 跳转到微信获取code
//   setCookie('authed', true, 30 * 24 * 60 * 60)
//   // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?${params.join(
//   //   '&'
//   // )}`
// }
