import service from "./http.js"

const get = (url, data) => {
    return new Promise((resolve, reject) => {
        service.get(url, { params: data})
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
}

const post = (url, data) => {
    return new Promise((resolve, reject) => {
        service.post(url, data)
        .then(res => {
            resolve(res)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const put = (url, data) => {
    return new Promise((resolve, reject) => {
        service.put(url, data)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
}

const del = (url, data) => {
    return new Promise((resolve, reject) => {
        service.put(url, data)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
}

export default {
    get,
    post,
    put,
    del,
}