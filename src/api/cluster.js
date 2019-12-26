import request from '@/utils/request'

export function getClusterList (query) {
  return request({
    url: '/cluster/list',
    method: 'get',
    params: query
  })
}

function nodeDataFilter (node) {
  return { gid: node.clusterId, name: node.nodeName, desc: node.nodeDesc }
}

// export function getClusterList (query) {
//   return new Promise((resolve, reject) => {
//     request({
//       url: '/vm/allControl/getTree',
//       method: 'post',
//       data: { parentId: null }
//     }).then(res => {
//       const obj = {
//         data: { items: res.data.map(item => { return nodeDataFilter(item) }), total: res.data.length }
//       }
//       resolve(obj)
//     })
//   })
// }

export function getCluster (id) {
  return request({
    url: '/cluster/detail',
    method: 'get',
    params: { id }
  })
}

export function createCluster (data) {
  const postData = {}
  postData.nodeName = data.name
  postData.nodeDesc = data.desc
  postData.status = 1
  return request({
    // url: '/cluster/create',
    url: '/vm/allControl/addCluster',
    method: 'post',
    postData
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
  postData.id = data.gid
  return request({
    // url: '/cluster/delete',
    url: '/vm/allControl/deleteCluster',
    method: 'post',
    postData
  })
}
function treeNodeFilter (data) {
  return data.map(item => {
    data = { id: item.id, label: item.nodeName, parentId: item.parentId, data: item }
    if (item.clusterId) {
      data.isLeaf = false
    } else if (item.hostId) {
      data.isLeaf = false
    } else if (item.vmId) {
      data.isLeaf = true
    }
    return data
  })
}
function treeDataFilter (data) {
  var vmData = []; var hostData = []; var clusterData = []
  // 对节点进行分类
  data.map(item => {
    data = { id: item.id, label: item.nodeName, parentId: item.parentId, data: item }
    if (item.clusterId) {
      data.isLeaf = false
      clusterData.push(data)
    } else if (item.hostId) {
      data.isLeaf = false
      hostData.push(data)
    } else if (item.vmId) {
      data.isLeaf = true
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

export function loadTreeNode (data) {
  const params = new URLSearchParams()
  for (const key in data) {
    params.append(key, data[key])
  }
  return new Promise((resolve, reject) => {
    request({
      url: '/vm/allControl?getTree',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: params
    }).then(res => {
      const treeData = treeNodeFilter(res.nodeList)
      resolve(treeData)
    })
  })
}
