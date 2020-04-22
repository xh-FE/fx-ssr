import { request } from './http'

export const getPostList = (options = {}) =>
  request('get', '/v1/topics', options)
