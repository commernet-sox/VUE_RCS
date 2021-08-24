import request from '@/utils/request'

export function Move(data) {
  return request({
    url: '/api/Dijkstra/GetPath',
    method: 'post',
    baseURL: 'http://10.27.1.28:12580',
    data
  })
}

export function GetJson() {
  return request({
    url:'./assets/RCSDIV.json',
    baseURL: 'http://localhost:9527/',
    method:'get',
    responseType:'json'
  })
}


