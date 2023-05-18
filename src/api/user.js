import request from '../utils/http/request.js'

const register = (data) => {
    return request.postForm('/user/register', data)
}
const login = (data) => {
    return request.postForm('/user/login', data)
}
const info = () => {
    return request.get('/user/info')
}
const getUserList = (data) => {
    return request.get('/user/list', data)
}

const delUser = (data) => {
    return request.del('/user/del', data)
}

const getUserInfo = (data) => {
    return request.get('/user/list', data)
}

export  {
    register, login, info, getUserList, delUser, getUserInfo
}
