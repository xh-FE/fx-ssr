// -------------cookie-----------------
// 设置cookie
export const setCookie = function(name, value, expires) {
  const oDate = new Date()
  if (oDate) {
    oDate.setTime(oDate.getTime() + expires * 1000)
  }
  document.cookie = [name + '=' + decodeURIComponent(value), expires ? `expires=${oDate.toGMTString()}` : '', 'path=/'].join('; ')
}

// 获取cookie
export const getCookie = function(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}
// 删除cookie
export const removeCookie = function(name) {
  setCookie(name, null, -1)
}
// 删除所有cookie
export const deleteAllCookies = () => {
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }
}

// --------------------------
// 手机号格式
export const validPhone = (phoneStr) => {
  const reg = /1\d{10}/
  return reg.test(phoneStr)
}
