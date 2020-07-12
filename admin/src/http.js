import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api'

  // baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(function (config) {
  if (sessionStorage.token) {
    config.headers.Authorization = 'Bearer ' + sessionStorage.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

//给http加一个拦截
http.interceptors.response.use(res => {
  return res
}, err => {
  //element-ui的一个方法返回错误代码，显示提示message，通用处理方法,不用在前端重复编写
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  return Promise.reject(err)
})

export default http