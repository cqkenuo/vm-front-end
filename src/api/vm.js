import request from '@/utils/request'

export function getConn () {
  return request({
    url: '/vm/allControl?getConn',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: { hostAddr: '' }
  })
}

function nodeDataFilter (node) {
  return { vid: node.vmId, name: node.nodeName, desc: node.nodeDesc, status: node.status }
}
function nodeRecordFilter (node) {
  return {
    vid: node.vmId,
    name: node.vmName,
    desc: node.vmDesc,
    cpu_num: node.cpuNum,
    cpu_used: node.cpuUsed,
    mem_size: node.memSize,
    mem_used: node.memUsed,
    disk_size: node.diskSize,
    storage: node.storagePath,
    iso: node.ios,
    os: node.os,
    status: node.states
  }
}
export function getVMList (query) {
  return new Promise((resolve, reject) => {
    request({
      url: '/vm/allControl?listVmNode',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(res => {
      const data = res.vmNodeList || []
      const vmList = []
      var cnt = 0
      data.map(item => {
        getVM(item.vmId).then(vmData => {
          vmData.gid = item.clusterId
          vmData.hid = item.hostId
          vmList.push(vmData)
          if (++cnt === data.length) {
            resolve({ data: { items: vmList, total: data.length } })
          }
        }).catch(error => {
          reject(error)
        })
      })
    }).catch(error => {
      reject(error)
    })
  })
}

export function getVM (vmId) {
  return new Promise((resolve, reject) => {
    request({
      url: '/vm/allControl?getVmRecordMsg',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { vmId: vmId }
    }).then(res => {
      const data = res.vmMsg || {}
      resolve(nodeRecordFilter(data))
    }).catch(error => {
      reject(error)
    })
  })
}

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
    url: '/vm/allControl?createVm',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: postData
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
    url: '/vm/allControl?deleteVm',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: postData
  })
}

export function operateVM (data, type) {
  const postData = { uuid: data.vid }
  switch (type) {
    case 1: {
      return request({
        url: '/vm/allControl?startVm',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: postData
      })
    } break
    case 2: {
      return request({
        url: '/vm/allControl?stopVm',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: postData
      })
    } break
    default: break
  }
}

export function getIsoList () {
  return new Promise((resolve, reject) => {
    request({
      url: '/vm/allControl?getIsoMsg',
      method: 'post'
    }).then(res => {
      const dictList = []
      const isoVolList = res.isoVolList
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
      url: '/vm/allControl?getStoragePoolsMsg',
      method: 'post'
    }).then(res => {
      const dictList = []
      res.spsNameList.map(item => {
        dictList.push({ key: item, display_name: item })
      })
      resolve(dictList)
    })
  })
}
