import App from '@/App'

let routerList = {
  path: '/category',
  component: App,
  component: resolve => require(['@/pages/category/category'], resolve),  
  // children: [{
  //     path: 'index', //子组件路径
  //     name: 'category',
  //     component: resolve => require(['@/pages/category/category'], resolve),
  //     meta: {
  //         title: '类别组件',
  //         name: '类目管理',
  //         id: 'categoryIndex'
  //     }
  // }]
}

export default routerList