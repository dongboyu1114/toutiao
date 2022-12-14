// 请求模块
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 接口的基本路径
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  //  请求发起会经过这里
  //  本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意这里必须要返回config对象，否则请求就出不去来了
  return config
}, function (error) {
  // 清除出错会进入这里
  return Promise.reject(error)
})
// 响应拦截器
export default request
