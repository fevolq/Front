import request from '../utils/http/request.js'

const register = (data) => {
    return request.post('/user/register', data)
}
const login = (data) => {
    return request.post('/user/login', data)
}
const getUserList = (data) => {
    return request.get('/user/list', data)
}

const delUser = (data) => {
    return request.del('/user/del', data)
}

const getUserInfo = (data) => {
    return request.get('/user/info', data)
}

export default {
    register, login, getUserList, delUser, getUserInfo
}
