import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data
  })
}

export function getInfo (userId) {
  return request({
    url: '/user?getUserMsgById',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'post',
    data: { 'userId': 1 }
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
