import { request } from './http'

// 以复星健康小程序Token登录
export const loginWithFosunToken = (options) => request('post', '/user/auth/login/fosunhealthtoken', options)
// 短信验证码登录
export const loginWithCode = (options) => request('post', '/user/auth/login/verificationcode', options)
// 获取验证码
export const getSmsCode = (options) => request('post', '/user/auth/sendPhoneRegistVerificationCode', options)
// 刷新token
export const refreshToken = (options) => request('post', '/user/auth/token/refresh', options)

// 获取联系人信息
export const getPersons = (options) => request('post', '/user/auth/getPersons', options)
// 用token 获取联系人信息
export const getUserInfoWithToken = (options) => request('post', '/user/auth/token/tokeninfo', options)
// 保存联系人信息
export const saveUserInfo = (options) => request('post', '/user/auth/savePerson', options)
// 获取用户信息
export const getUserInfo = (options) => request('post', '/user/auth/token/userinfo', options)

// 预约活动
export const subscribeActive = (options) => request('post', '/user/mutual/reserve', options)
// 获取预约信息
export const subscribeInfo = (options) => request('post', '/user/mutual/reserveRecordInfo', options)
// 获取预约列表
export const subscribeList = (options) => request('post', '/user/mutual/reserveRecordList', options)
