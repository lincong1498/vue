import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/pages/layout'),
      children:[
        {
          path:'home',
          component:()=>import('../components/pages/index'),
          meta:{select:'/home'}
        },
        {
          path:'menu',
          component:()=>import('../components/pages/Menu/index'),
          meta:{select:'/menu'}
        },
        {
          path:'menu/add',
          component:()=>import('../components/pages/Menu/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta:{select:'/menu'}
        },
        {
          path:'menu/:menuid',
          component:()=>import('../components/pages/Menu/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta:{select:'/menu'}
        },
        {
          path:'user',
          component:()=>import('../components/pages/Users/index'),
          meta:{select:'/user'}
        },
        {
          path:'user/add',
          component:()=>import('../components/pages/Users/info'),
          meta:{select:'/user'}
        },
        {
          path:'',
          redirect:'home'
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/components/pages/login'),
    },
  ]
})
router.beforeEach((to, from, next) => {
  let userinfo = localStorage.getItem('user');
  if (userinfo) {
    next();
  } else {
    if (to.fullPath != '/login') {
      next('/login')
    } else {
      next();
    }
  }

})
export default router;
