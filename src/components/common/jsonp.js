import jsonp from 'jsonp'
export default function json(url, data, options) {
  url += ( url.indexOf('?') < 0 ? '?' : '&' ) + param(data)
  return new Promise((resolve, reject) => {
    jsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  var url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''  // 去掉第一个 & 符号
}

