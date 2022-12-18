'use strict'

import Vue from 'vue'
import VueGtag from 'vue-gtag'
import VueRouter from 'vue-router'
import packageInfo from '../package.json'

import home from './views/home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login/:provider?',
		name: 'Login',
		component: () => import(/* webpackPrefetch: true */ "./views/login.vue"),
		meta: {
			elseAuth: true
		}
	},
	{
		path: '/privacy-policy',
		name: 'Privacy Policy',
		component: () => import(/* webpackPrefetch: true */ "./views/privacy-policy.vue")
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
	if (ifAuth && !Vue.$auth.authenticated) next('/login')
	else if (elseAuth && Vue.$auth.authenticated) next('/')
	else next()
})

if (process.env.VUE_APP_FIREBASE_ANALYTICS_ID && process.env.NODE_ENV == 'production') {
	Vue.use(VueGtag, {
		appName: packageInfo.name.replace(/-/, ' '),
		pageTrackerScreenviewEnabled: true,
		pageTrackerExcludedRotues: ['/privacy-policy'],
		config: { id: process.env.VUE_APP_FIREBASE_ANALYTICS_ID }
	}, router)
}

export default router