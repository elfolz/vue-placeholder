'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

import home from './views/home.vue'

const login = () => import(/* webpackPrefetch: true */ "./views/login.vue")

Vue.use(VueRouter)

const routes = [
	{
		path: '/login/:provider?',
		name: 'Login',
		component: login,
		meta: {
			elseAuth: true
		}
	},
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

router.beforeEach((to, from, next) => {
	const ifAuth = to.matched.some(record => record.meta.ifAuth)
	const elseAuth = to.matched.some(record => record.meta.elseAuth)
	if (ifAuth && !Vue.$auth.authenticated) {
		next('/login')
	} else if (elseAuth && Vue.$auth.authenticated) {
		next('/')
	} else {
		next()
	}
})

if (process.env.NODE_ENV == 'production') {
	Vue.use(VueGtag, {
		appName: 'placeholder',
		pageTrackerScreenviewEnabled: true,
		pageTrackerExcludedRotues: ['/privacy-policy'],
		config: { id: process.env.VUE_APP_GANALYTICS_ID }
	}, router)
}

export default router