import request from '../utils/http/request.js'

const baseUri = 'poem'

const getPoem = (id) => {
  const endPoint = 'poem'
  return request.get(`/${baseUri}/${endPoint}`, {id: id})
}

const getWitticism = (id) => {
  const endPoint = 'witticism'
  return request.get(`/${baseUri}/${endPoint}`, {id: id})
}

export {
  getPoem, getWitticism, 
}