import request from '../utils/http/request.js'

const baseUri = 'user'

const register = (data) => {
  const endPoint = 'register'
  return request.postForm(`/${baseUri}/${endPoint}`, data)
}

const login = (data) => {
    const endPoint = 'login'
  return request.postForm(`/${baseUri}/${endPoint}`, data)
}

const temp = (data) => {
  const endPoint = 'temp'
return request.postForm(`/${baseUri}/${endPoint}`, data)
}

const info = () => {
  const endPoint = 'info'
  return request.get(`/${baseUri}/${endPoint}`)
}

const getUserList = (data) => {
  const endPoint = 'list'
  return request.get(`/${baseUri}/${endPoint}`, data)
}

const delUser = (data) => {
  const endPoint = 'del'
  return request.del(`/${baseUri}/${endPoint}`, data)
}

export  {
  register, login, temp, info, getUserList, delUser
}
