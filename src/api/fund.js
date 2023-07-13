import request from '../utils/http/request.js'

const baseUri = 'fund'

const getFundMonitors = (codes, type, page, pageSize) => {
  const endPoint = 'monitor'
  return request.get(`/${baseUri}/${endPoint}`, {codes: codes, type: type, page: page, page_size: pageSize})
}

const addFundMonitors = (code, type, option, remark) => {
  const endPoint = 'monitor'
  return request.post(`/${baseUri}/${endPoint}`, {code: code, type: type, option: option, remark: remark})
}

const updateFundMonitor = (id, update_at, query) => {
  const endPoint = 'monitor'
  return request.put(`/${baseUri}/${endPoint}`, {id: id, update_at: update_at, query: query})
}

const delFundMonitor = (id, update_at) => {
  const endPoint = 'monitor'
  return request.del(`/${baseUri}/${endPoint}`, {id: id, update_at: update_at})
}

export {
  getFundMonitors, addFundMonitors, updateFundMonitor, delFundMonitor
}