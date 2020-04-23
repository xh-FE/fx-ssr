import axios from 'axios'
import { awaitWrap } from '~/utils'

const myAxios = axios.create({
  baseURL: 'https://cnodejs.org',
  timeout: 4000,
  headers: {}
})

myAxios.interceptors.response.use(
  function(response) {
    return response.data
  },
  function(error) {
    return error
  }
)

export const request = (method, url, options) => {
  return awaitWrap(
    myAxios.request({
      url,
      method,
      ...options
    })
  )
}
