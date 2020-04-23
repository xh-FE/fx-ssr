// /api/v1/topics
import { request } from './http'

export const getCnodeList = (options) => request('get', '/api/v1/topics', options)
