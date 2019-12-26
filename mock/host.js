import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    hid: '@increment',
    name: '@cword(7)',
    desc: 'mock data',
    gid: '@integer(1, 100)',
    mem_size: '@integer(20, 100)',
    mem_used: '@integer(1, 20)',
    disk_size: '@integer(20, 100)',
    disk_used: '@integer(1, 20)',
    cpu_num: '@integer(1, 10)',
    cpu_used: '@integer(1, 100)',
    state: '@integer(0, 1)',
    ipaddr: '@integer(0, 255).@integer(0, 255).@integer(0, 255).@integer(0, 255)',
    password: '@title(5)'
  }))
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

export default [
  {
    url: '/host/list',
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
    url: '/host/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const host of List) {
        if (host.hid === +id) {
          return {
            code: 20000,
            data: host
          }
        }
      }
    }
  },

  {
    url: '/host/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/host/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/host/delete',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/host/runing',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/host/pause',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vm/allControl/getHostMsgList',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        msg: List.map(item => { return hostParamsFilter(item) })
      }
    }
  },
  {
    url: '/vm/allControl/getHostMsg',
    type: 'post',
    response: config => {
      const { id } = config.body.hid
      for (const host of List) {
        if (host.hid === +id) {
          return {
            code: 20000,
            data: host
          }
        }
      }
    }
  },
  {
    url: '/vm/allControl/addHost',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vm/allControl/deleteHost',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

