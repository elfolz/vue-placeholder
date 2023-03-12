'use strict'

import { createRouter, createWebHashHistory } from 'vue-router'
import { trackRouter } from 'vue-gtag-next'

import home from './views/home.vue'

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
		path: '/',
		name: 'Home',
		component: home
	}
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

if (process.env.VUE_APP_FIREBASE_ANALYTICS_ID && process.env.NODE_ENV == 'production') trackRouter(router)

export default router