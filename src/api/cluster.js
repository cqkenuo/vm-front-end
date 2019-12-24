import request from '@/utils/request'

export function getClusterList (query) {
  return request({
    url: '/cluster/list',
    method: 'get',
    params: query
  })
}

export function getCluster (id) {
  return request({
    url: '/cluster/detail',
    method: 'get',
    params: { id }
  })
}

export function createCluster (data) {
  return request({
    url: '/cluster/create',
    method: 'post',
    data
  })
}

export function updateCluster (data) {
  return request({
    url: '/cluster/update',
    method: 'post',
    data
  })
}

export function deleteCluster (data) {
  return request({
    url: '/cluster/delete',
    method: 'post',
    data
  })
}

function treeDataFilter (data) {
  var vmData = []; var hostData = []; var clusterData = []
  // 对节点进行分类
  data.map(item => {
    data = { id: item.id, label: item.nodeName, parentId: item.parentId, data: item }
    if (item.clusterId) {
      clusterData.push(data)
    } else if (item.hostId) {
      hostData.push(data)
    } else if (item.vmId) {
      vmData.push(data)
    }
  })
  // 对节点进行整合
  hostData = hostData.map(host => {
    host.children = host.children || []
    vmData.map(vm => {
      if (vm.parentId === host.id) {
        host.children.push(vm)
      }
    })
    return host
  })
  clusterData = clusterData.map(cluster => {
    cluster.children = cluster.children || []
    hostData.map(host => {
      if (host.parentId === cluster.id) {
        cluster.children.push(host)
      }
    })
    vmData.map(vm => {
      if (vm.parentId === cluster.id) {
        cluster.children.push(vm)
      }
    })
    return cluster
  })
  return clusterData
}
export function getClusterTree (data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/cluster/tree',
      method: 'post',
      data
    }).then(res => {
      const treeData = treeDataFilter(res.data)
      resolve(treeData)
    })
  })
}
