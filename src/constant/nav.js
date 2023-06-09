export const navRoutes = [
  {
    index: '1',
    title: '媒体',
    children: [],
  },
  {
    index: '2',
    title: '数据',
    children: [
      {
        index: '/finance',
        title: '金融'
      },
    ],
  },
  {
    index: '3',
    title: '系统',
    children: [
      {
        index: '/userManage',
        title: '用户管理',
      },
      {
        index: '/message',
        title: '信息通知',
      }
    ],
  }
]

export const userNavRoutes = [
  {
    index: '/userManage/userList',
    title: '用户列表',
  },
  {
    index: '/userManage/roleList',
    title: '角色列表',
  },
]

export const financeNavRoutes = [
  {
    index: '/finance/fund',
    title: '基金',
  },
  {
    index: '/finance/fund_monitior',
    title: '基金监控',
  }
]
