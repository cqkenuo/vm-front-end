import request from '@/utils/request'

export function getVMList (query) {
  return request({
    url: '/vm/list',
    method: 'get',
    params: query
  })
}

export function getVM (id) {
  return request({
    url: '/vm/detail',
    method: 'get',
    params: { id }
  })
}

export function createVM (data) {
  return request({
    url: '/vm/create',
    method: 'post',
    data
  })
}

export function updateVM (data) {
  return request({
    url: '/vm/update',
    method: 'post',
    data
  })
}

export function deleteVM (data) {
  return request({
    url: '/vm/delete',
    method: 'post',
    data
  })
}

export function operateVM (data, type) {
  switch (type) {
    case 1: {
      return request({
        url: '/vm/runing',
        method: 'post',
        data
      })
    } break
    case 2: {
      return request({
        url: '/vm/pause',
        method: 'post',
        data
      })
    } break
    default: break
  }
}
