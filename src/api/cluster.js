import request from '@/utils/request'

function nodeDataFilter (node) {
  return { gid: node.clusterId, name: node.nodeName, desc: node.nodeDesc, status: node.status }
}
export function getClusterList () {
  return new Promise((resolve, reject) => {
    request({
      url: '/vm/allControl?listClusterNode',
      method: 'post'
    }).then(res => {
      const resList = res.clusterNodeList
      const dataList = []
      for (const data of resList) {
        dataList.push(nodeDataFilter(data))
      }
      resolve({ data: { items: dataList, total: dataList.length } })
    })
  })
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
    url: '/vm/allControl?addCluster',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: postData
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
    url: '/vm/allControl?deleteCluster',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: postData
  })
}
function treeNodeFilter (data) {
  data = data || []
  return data.map(item => {
    data = { id: item.id, label: item.nodeName, parentId: item.parentId, data: item }
    if (item.clusterId) {
      data.isLeaf = false
    }
    if (item.hostId) {
      data.isLeaf = false
    }
    if (item.vmId) {
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
  return new Promise((resolve, reject) => {
    request({
      url: '/vm/allControl?getTree',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: data
    }).then(res => {
      const treeData = treeNodeFilter(res.nodeList)
      resolve(treeData)
    })
  })
}

export function getVmInfo (data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/vm/allControl?getTree',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: data
    }).then(res => {
      resolve(res.vmMsg || {})
    })
  })
}
