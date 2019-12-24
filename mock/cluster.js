import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    gid: '@increment',
    name: '@cword(7)',
    desc: 'mock data'
  }))
}

export default [
  {
    url: '/cluster/list',
    type: 'get',
    response: config => {
      const { name, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/cluster/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const cluster of List) {
        if (cluster.gid === +id) {
          return {
            code: 20000,
            data: cluster
          }
        }
      }
    }
  },

  {
    url: '/cluster/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/cluster/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/cluster/delete',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/cluster/runing',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/cluster/pause',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/cluster/tree',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: [{
          id: '1',
          vmId: null,
          hostId: null,
          clusterId: 'cluster1',
          parentId: null,
          nodeName: 'cluster1',
          nodeDesc: 'mock data',
          status: 1
        }, {
          id: '2',
          vmId: null,
          hostId: null,
          clusterId: 'cluster2',
          parentId: null,
          nodeName: 'cluster2',
          nodeDesc: 'mock data',
          status: 1
        }, {
          id: '3',
          vmId: null,
          hostId: 'host1',
          clusterId: null,
          parentId: '1',
          nodeName: 'host1',
          nodeDesc: 'mock data',
          status: 1
        }, {
          id: '4',
          vmId: 'vm1',
          hostId: null,
          clusterId: null,
          parentId: '3',
          nodeName: 'vm1',
          nodeDesc: 'mock data',
          status: 1
        }, {
          id: '5',
          vmId: 'vm2',
          hostId: null,
          clusterId: null,
          parentId: '2',
          nodeName: 'vm2',
          nodeDesc: 'mock data',
          status: 1
        }]
      }
    }
  }
]

