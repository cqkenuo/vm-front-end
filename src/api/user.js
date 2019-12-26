import request from '@/utils/request'

export function login (data) {
  // const formdata = new FormData()

  // console.log(formdata, data)
  const params = new URLSearchParams()
  for (const key in data) {
    params.append(key, data[key])
  }
  return request({
    url: '/user/login',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: params
  })
}

export function getInfo (userId) {
  const params = new URLSearchParams()
  params.append('userId', 1)
  return request({
    url: '/user?getUserMsgById',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'post',
    data: params
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
