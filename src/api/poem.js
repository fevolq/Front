import request from '../utils/http/request.js'

const baseUri = 'poem'

const getPoem = (id, size) => {
  const endPoint = 'poem'
  return request.get(`/${baseUri}/${endPoint}`, {id: id, size: size})
}

const getWitticism = (id, size) => {
  const endPoint = 'witticism'
  return request.get(`/${baseUri}/${endPoint}`, {id: id, size: size})
}

export {
  getPoem, getWitticism, 
}