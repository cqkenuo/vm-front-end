import request from '@/utils/request'

// export function getHostList (query) {
//   return request({
//     url: '/host/list',
//     method: 'get',
//     params: query
//   })
// }

// export function getHost (id) {
//   return request({
//     url: '/host/detail',
//     method: 'get',
//     params: { id }
//   })
// }
export function getHostList (id) {
  return new Promise((resolve, reject) => {
    request({
      url: '/vm/allControl/getHostMsgList',
      method: 'post'
    }).then(res => {
      const resList = res.msg
      const dataList = []
      for (const data of resList) {
        dataList.push(hostDataFilter(data))
      }
      resolve({ data: { items: dataList, total: dataList.length } })
    })
  })
}

export function getHost (id) {
  return new Promise((resolve, reject) => {
    request({
      url: '/vm/allControl/getHostMsg',
      method: 'post'
    }).then(res => {
      resolve(hostMsgFilter(res.msg))
    })
  })
}

// export function createHost (data) {
//   return request({
//     url: '/host/create',
//     method: 'post',
//     data
//   })
// }
function nodeDataFilter (node) {
  return { hid: node.hostId, name: node.nodeName, desc: node.nodeDesc }
}
function hostParamsFilter (params) {
  return {
    hid: params.hid || undefined,
    hostName: params.name,
    hostDesc: params.desc,
    ipAddr: params.ipaddr,
    cpuNum: params.cpu_num,
    memSize: params.mem_size,
    pwd: params.password,
    memUsed: params.mem_used || undefined
  }
}
function hostDataFilter (params) {
  return {
    hid: params.hid,
    name: params.hostName,
    desc: params.hostDesc,
    ipaddr: params.ipAddr,
    cpu_num: params.cpuNum,
    mem_size: params.memSize,
    password: params.pwd,
    mem_used: params.memUsed
  }
}
function hostMsgFilter (params) {
  return {
    name: params.hostName,
    cpu_num: params.numOfCpu,
    mem_size: params.memory,
    arth: params.arth,
    type: params.type,
    vmList: params.domainList
  }
}
export function createHost (data) {
  const postData = hostParamsFilter(data)
  return request({
    url: '/vm/allControl/addHost',
    method: 'post',
    postData
  })
}
export function updateHost (data) {
  return request({
    url: '/host/update',
    method: 'post',
    data
  })
}

// export function deleteHost (data) {
//   return request({
//     url: '/host/delete',
//     method: 'post',
//     data
//   })
// }
export function deleteHost (data) {
  const postData = hostParamsFilter(data)
  return request({
    url: '/vm/allControl/deleteHost',
    method: 'post',
    postData
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
