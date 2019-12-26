import Mock from 'mockjs'

const List = []
const IsoList = ['centos7.iso', 'ubuntu6.01.iso', 'windows.iso']
const StorageList = ['storage01', 'storage02', 'storage03']
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    vid: '@increment',
    name: '@cword(7)',
    desc: 'mock data',
    gid: '@integer(1, 100)',
    hid: '@integer(1, 100)',
    mem_size: '@integer(20, 100)',
    mem_used: '@integer(1, 20)',
    disk_size: '@integer(20, 100)',
    disk_used: '@integer(1, 20)',
    cpu_num: '@integer(1, 10)',
    cpu_used: '@integer(1, 100)',
    'os|1': IsoList,
    'iso|1': ['centos7.iso', 'ubuntu6.01.iso', 'windows.iso'],
    'storage|1': StorageList,
    state: '@integer(1, 5)'
  }))
}

export default [
  {
    url: '/vm/list',
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
    url: '/vm/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const vm of List) {
        if (vm.vid === +id) {
          return {
            code: 20000,
            data: vm
          }
        }
      }
    }
  },

  {
    url: '/vm/allControl/createVm',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vm/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vm/allControl/deleteVm',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vm/allControl/startVm',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vm/allControl/stopVm',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vm/allControl/getIsoMsg',
    type: 'post',
    response: _ => {
      const isoVolList = {}
      IsoList.map(item => { isoVolList[item] = '/var/iso/' + item })
      return {
        code: 20000,
        data: { 'isoVolList': isoVolList }
      }
    }
  },
  {
    url: '/vm/allControl/getStoragePoolsMsg',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: { 'spsNameList': StorageList }
      }
    }
  }
]

