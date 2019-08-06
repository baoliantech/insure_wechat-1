/**
 * API业务参数对象，属性名对应mutations
 * url: 接口地址
 * method: 请求类型
 * type: json（参数为json格式对象）, form（参数为form表单对象）, url（参数为字符串拼接）, mix（参数为混合型数据结构）
 * params: 默认请求参数对象
 * extra: 混合模式下的参数类型
 */
const apiConfig = {
  doLogin: {
    url: '/api/api/login',
    method: 'POST',
    type: 'mix',
    params: {
      channel_id: 2,
      type: 'account'
    },
    extra: {
      data: {
        keyword: '15768397348',
        password: 'Zjj871026'
      }
    }
  }
}

export default apiConfig