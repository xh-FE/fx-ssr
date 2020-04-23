import { request } from './http'

// 获取微信相关签名信息，用于jsap
export const getWxParams = (options) => request('post', '/user/wechat/createjsapisignature/hz', options)
// 构造网页授权url,返回给前端进行跳转
export const getWxUserInfo = (options) => request('post', '/user/wechat/oauth2buildurl/hz', options)
export const getAppId = (options) => request('post', '/user/wechat/oauth2buildurl/hz', options)
