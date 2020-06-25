import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/pages/layout'),
      children: [
        {
          path: 'home',
          component: () => import('../components/pages/index'),
          meta: { select: '/home' }
        },
        {
          path: 'menu',
          component: () => import('../components/pages/Menu/index'),
          meta: { select: '/menu' }
        },
        {
          path: 'menu/add',
          component: () => import('../components/pages/Menu/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/menu' }
        },
        {
          path: 'role',
          component: () => import('../components/pages/role/index'),
          meta: { select: '/role' }
        },
        {
          path: 'role/add',
          component: () => import('../components/pages/role/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/role' }
        },
        {
          path: 'role/:roleid',
          component: () => import('../components/pages/role/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/role' }
        },
        {
          path: 'banner',
          component: () => import('../components/pages/banner/index'),
          meta: { select: '/banner' }
        },
        {
          path: 'banner/add',
          component: () => import('../components/pages/banner/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/banner' }
        },
        {
          path: 'banner/:bannerid',
          component: () => import('../components/pages/banner/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/banner' }
        },
        {
          path: 'menu/:menuid',
          component: () => import('../components/pages/Menu/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/menu' }
        },
        {
          path: 'user',
          component: () => import('../components/pages/Users/index'),
          meta: { select: '/user' }
        },
        {
          path: 'user/add',
          component: () => import('../components/pages/Users/info'),
          meta: { select: '/user' }
        },
        {
          path: 'user/:userid',
          component: () => import('../components/pages/Users/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/user' }
        },
        {
          path: 'member',
          component: () => import('../components/pages/member/index'),
          meta: { select: '/member' }
        },
        {
          path: 'member/add',
          component: () => import('../components/pages/member/info'),
          meta: { select: '/member' }
        },
        {
          path: 'member/:memberid',
          component: () => import('../components/pages/member/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/member' }
        },
        {
          path: 'seck',
          component: () => import('../components/pages/seck/index'),
          meta: { select: '/seck' }
        },
        {
          path: 'seck/add',
          component: () => import('../components/pages/seck/info'),
          meta: { select: '/seck' }
        },
        {
          path: 'seck/:seckid',
          component: () => import('../components/pages/seck/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/seck' }
        },
        {
          path: 'category',
          component: () => import('../components/pages/Category/index'),
          meta: { select: '/category' }
        },
        {
          path: 'category/add',
          component: () => import('../components/pages/Category/info'),
          meta: { select: '/category' }
        },
        {
          path: 'category/:categoryid',
          component: () => import('../components/pages/Category/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/category' }
        },
        {
          path: 'specs',
          component: () => import('../components/pages/specs/index'),
          meta: { select: '/specs' }
        },
        {
          path: 'specs/add',
          component: () => import('../components/pages/specs/info'),
          meta: { select: '/specs' }
        },
        {
          path: 'specs/:specsid',
          component: () => import('../components/pages/specs/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/specs' }
        },
        {
          path: 'goods',
          component: () => import('../components/pages/goods/index'),
          meta: { select: '/goods' }
        },
        {
          path: 'goods/add',
          component: () => import('../components/pages/goods/info'),
          meta: { select: '/goods' }
        },
        {
          path: 'goods/:goodsid',
          component: () => import('../components/pages/goods/info'),
          // 设置自定义属性，用来告知页面加载时，左侧那个菜单选中
          meta: { select: '/goods' }
        },
      ]
    },
    {
      path: '/login',
      component: () => import('@/components/pages/login'),
    },
  ]
})
import store from '../store'

router.beforeEach((to, from, next) => {
  let userinfo = store.state.adminUser;
  // let userinfo = localStorage.getItem("htuser")?JSON.parse(localStorage.getItem("htuser")): null;
  if (userinfo.token) {
    userinfo.menus_url.push('/');
    userinfo.menus_url.push('/home');
    let menuarr = userinfo.menus_url;
    let nowpatharr = to.path.split('/');
    let nowpath = '/'+nowpatharr[1];
    let res = menuarr.find(d=>{
      return d==nowpath
    });
    if(res){
      next();
    }else{
      next('/')
    }
  } else {
    if (to.fullPath != '/login') {
      next('/login')
    } else {
      next();
    }
  }

})
export default router;
