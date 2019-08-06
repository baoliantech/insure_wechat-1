/* eslint-disable */
import apiConfig from './api.config.mjs'
// 引入针对微信小程序的包
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
const apiMap = {}
// 环境变量
const env = process.env.NODE_ENV
// 环境地址
const devApiUrl = 'ts-www.luckyins.com'
const realApiUrl = 'www.luckyins.com'
/**
 * 自动生成Api
 * @param {api配置文件} config
 */
function _apiGenerator(config) {
  let apiNames = Object.keys(config)
  for (let name of apiNames) {
    let apiRoute = config[name]
    // console.log(`==> generate api ${name}`)
    apiMap[name] = (formData, extra) => {
      // console.log(`==> api url : ${apiRoute.url} \n`)
      // 添加时间戳
      formData = {...formData, ...{t: new Date().getTime()}}

      let url = apiRoute.url
      let params
      let contentType = 'application/json;charset=UTF-8'
      // form表单提交
      if (apiRoute.type === 'form') {
        // contentType = 'application/x-www-form-urlencoded'
        contentType = 'multipart/form-data'
        params = Object.assign(apiRoute.params, formData)
        params = _serialize(params)
      } else if (apiRoute.type === 'json') { // JSON格式提交
        params = Object.assign(apiRoute.params, formData)
        // 如果传递上来的参数带有pageNum字段，即为分页数据查询逻辑
        if (params.hasOwnProperty('pageNum')) {
          url += params.pageNum
          delete params.pageNum
        }
        params = JSON.stringify(params, null, 2)
      } else if (apiRoute.type === 'mix') { // 混合模式
        params = Object.assign(apiRoute.params, formData)
        params = _serialize(params)
        url += '?' + params
        params = JSON.stringify({ ...apiRoute.extra, ...extra }, null, 2)
      } else {
        // 如果接口没有任何请求参数，则默认params为空对象
        params = Object.assign(apiRoute.params || {}, formData)
        if (params.hasOwnProperty('pageNum')) {
          url += params.pageNum
          delete params.pageNum
        }
        params = _serialize(params)
        url += '?' + params
        params = null
      }
      // flyio request
      return new Promise((resolve, reject) => {
        fly.request(url, params, {
          method: apiRoute.method,
          headers: {
            'Content-Type': contentType
          },
          baseURL: env !== 'production' ? 'https://' + devApiUrl : 'https://' + realApiUrl,
          timeout: 8000
        }).then(res => {
          checkStatus(res, resolve, reject)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

/**
 * 检查请求状态
 * @param {Ajax Response} response
 */
function checkStatus(response, resolve, reject) {
  if (response.status === 401) {
    // 返回未登录
    reject({
      code: 401,
      message: '身份验证失败，请重新登录'
    })
  }

  if (response.status >= 200 && response.status < 300) {
    resolve(response)
  } else {
    let error = new Error(response.statusText)
    error.response = response
    reject(error)
    throw error
  }
}

function _serialize(data) {
  let ret = []
  for (let key in data) {
    ret.push(`${key}=${data[key]}`)
  }

  return ret.join('&')
}

_apiGenerator(apiConfig)

export default apiMap
