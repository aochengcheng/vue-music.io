import json from './jsonp'

export function getRecommend() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  // let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  
  let data = Object.assign({}, {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  })

  return json(url, data, option)
}

export let option = {
  param: 'jsonpCallback'
}