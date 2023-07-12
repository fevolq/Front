import service from "./http.js"

const get = (url, data) => {
    return new Promise((resolve, reject) => {
        service.get(url, { params: data})
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
}

const postForm = (url, data) => {
    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        service.post(url, data, {headers: headers})
        .then(res => {
            resolve(res)
        })
        .catch(error => {
            reject(error)
        })
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
      // json传参：{data: data}
      // param传参：{param: data}
        service.delete(url, { data: data})
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
}

export default {
    get,
    postForm,
    post,
    put,
    del,
}