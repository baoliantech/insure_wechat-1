export const formatNumber = (n) => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 获取数据状态处理
 * @param {object} data
 * */
export const checkData = (data) => {
  return new Promise((resolve, reject) => {
    if (typeof data !== 'undefined') {
      if (data.code === 1) {
        resolve(data)
      } else {
        reject(data)
      }
    }
  })
}

// export default {
//   formatNumber,
//   formatTime,
//   checkData
// }
