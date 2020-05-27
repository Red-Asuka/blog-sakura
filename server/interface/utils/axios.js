import axios from 'axios'
//创建一个axios实例
const instance = axios.create({
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT ||
    3001}`,
  timeout: 2000,
  withCredentials: true,
  headers: {}
})

export default instance
