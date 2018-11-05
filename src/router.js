import Vue from 'vue'
import routerCenter from 'vue-router'
import { Toast } from 'mint-ui';

import Index from './views/index/index.vue'
import Test from './views/test/test.vue'
import Category from './views/category/index.vue'
import Login from './views/login/index.vue'
import Car from './views/car/index.vue'
import I from './views/i/index.vue'

Vue.use(routerCenter)

const Router = new routerCenter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/car',
      name: 'car',
      component: Car,
      meta: { 
        requireAuth: true
      }
    },
    {
      path: '/i',
      name: 'i',
      component: I
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
  ]
});
// 判断是否需要登录权限 以及是否登录
Router.beforeEach((to, from, next) => {
	if (to.matched.some(res => res.meta.requireAuth)) {
		if (localStorage.getItem('username')) {
			next()
		} else {
      Toast('请先登陆...');
			next({
				path: '/login',
				query: {backUrl: to.fullPath}
			})
		}
	} else {
		next()
	}
});

export default Router