import request from '../utils/http/request.js'

const baseUri = 'dashboard'

const getConfig = (name) => {
  const endPoint = 'config'
  const data = {
    name: name,
  }
  return request.get(`/${baseUri}/${endPoint}`, data)
}

const getChart = (name, chartName, query) => {
  const endPoint = 'chart'
  const data = {
    name: name,
    chart: chartName,
    filters: query['filters']
  }
  return request.post(`/${baseUri}/${endPoint}`, data)
}

export {
  getConfig, getChart, 
}