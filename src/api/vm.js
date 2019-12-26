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

// export function createVM (data) {
//   return request({
//     url: '/vm/create',
//     method: 'post',
//     data
//   })
// }

function vmParamsFilter (params) {
  return {
    name: params.name,
    cpu: params.cpu_num,
    mem: params.mem_size,
    diskSize: params.disk_size,
    isopath: params.iso,
    sp: params.storage,
    clusterToBelog: params.gid,
    hostToBelog: params.hid
  }
}

export function createVM (data) {
  const postData = vmParamsFilter(data)
  return request({
    url: '/vm/allControl/createVm',
    method: 'post',
    postData
  })
}

export function updateVM (data) {
  return request({
    url: '/vm/update',
    method: 'post',
    data
  })
}

// export function deleteVM (data) {
//   return request({
//     url: '/vm/delete',
//     method: 'post',
//     data
//   })
// }
export function deleteVM (data) {
  const postData = { vmUuid: data.vid, deleteDisk: true }
  return request({
    url: '/vm/allControl/deleteVm',
    method: 'post',
    postData
  })
}

export function operateVM (data, type) {
  const postData = { uuid: data.vid }
  switch (type) {
    case 1: {
      return request({
        url: '/vm/allControl/startVm',
        method: 'post',
        postData
      })
    } break
    case 2: {
      return request({
        url: '/vm/allControl/stopVm',
        method: 'post',
        postData
      })
    } break
    default: break
  }
}

export function getIsoList () {
  return new Promise((resolve, reject) => {
    request({
      url: '/vm/allControl/getIsoMsg',
      method: 'post'
    }).then(res => {
      const dictList = []
      const isoVolList = res.data.isoVolList
      for (const iso in isoVolList) {
        dictList.push({ key: isoVolList[iso], display_name: iso })
      }
      resolve(dictList)
    })
  })
}

export function getStorageList () {
  return new Promise((resolve, reject) => {
    request({
      url: '/vm/allControl/getStoragePoolsMsg',
      method: 'post'
    }).then(res => {
      const dictList = []
      res.data.spsNameList.map(item => {
        dictList.push({ key: item, display_name: item })
      })
      resolve(dictList)
    })
  })
}
