'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

import home from './views/home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '*',
		name: 'Home',
		component: home
	}
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

/* router.beforeEach((to, from, next) => {
	const ifAuth = to.matched.some(record => record.meta.ifAuth)
	const elseAuth = to.matched.some(record => record.meta.elseAuth)
	if (ifAuth && !Vue.$auth.authenticated) {
		next('/login')
	} else if (elseAuth && Vue.$auth.authenticated) {
		next('/')
	} else {
		next()
	}
}) */

export default router
