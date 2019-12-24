import request from '@/utils/request'

export function getHostList (query) {
  return request({
    url: '/host/list',
    method: 'get',
    params: query
  })
}

export function getHost (id) {
  return request({
    url: '/host/detail',
    method: 'get',
    params: { id }
  })
}

export function createHost (data) {
  return request({
    url: '/host/create',
    method: 'post',
    data
  })
}

export function updateHost (data) {
  return request({
    url: '/host/update',
    method: 'post',
    data
  })
}

export function deleteHost (data) {
  return request({
    url: '/host/delete',
    method: 'post',
    data
  })
}

export function operateHost (data, type) {
  switch (type) {
    case 1: {
      return request({
        url: '/host/runing',
        method: 'post',
        data
      })
    } break
    case 2: {
      return request({
        url: '/host/pause',
        method: 'post',
        data
      })
    } break
    default: break
  }
}
