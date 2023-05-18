import axios from "axios";
import { ElMessage } from 'element-plus'

const service = axios.create({
    timeout: 60000,
    baseURL: '/api',
})

// 请求拦截
service.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')
        if (token) {
            config.headers['token'] = token
        }
        return config
    },
    err => {
        ElMessage.error(`${JSON.stringify(err)}`)
        return Promise.reject(err)
    }
)

// 响应拦截
service.interceptors.response.use(
    res => {
        if (res.status === 200) {
            return res.data
        } else {
            Promise.reject()
        }
    },
    err => {
        if (err && err.response) {
            const status = err.response.status
            switch (status) {
                case 500:
                    ElMessage.error(`响应异常`)
                    break
                default:
                    ElMessage.error(`响应状态码：${status}`)
            }
        } else {
            if (JSON.stringify(err).includes('timeout')) {
                ElMessage.error('服务器响应超时，请刷新页面')
            }
            ElMessage.error('服务器连接失败', err)
        }
    }
)

export default service