'use strict'

import { createApp } from 'vue'
import VueGtag from 'vue-gtag-next'
import VueTheMask from 'vue-the-mask'

import App from './App.vue'
import store from './store'
import router from './router'

import idb from './plugins/idb'
import auth from './plugins/auth'
import vuetify from './plugins/vuetify'
import pushNotification from './plugins/push-notification'
import registerSW from './plugins/register-service-worker'

const app = createApp(App)

app.use(idb)
app.use(auth)
app.use(store)
app.use(router)
app.use(vuetify)
app.use(VueTheMask)
app.use(pushNotification)
app.mount('#app')

registerSW(app)

if (process.env.VUE_APP_FIREBASE_ANALYTICS_ID && process.env.NODE_ENV == 'production') {
	app.use(VueGtag, {
		property: { id: process.env.VUE_APP_FIREBASE_ANALYTICS_ID }
	})
}

router.beforeEach((to, from, next) => {
	const ifAuth = to.matched.some(el => el.meta.ifAuth)
	const elseAuth = to.matched.some(el => el.meta.elseAuth)
	if (ifAuth && !app.config.globalProperties.$auth.authenticated) {
		next('/login')
	} else if (elseAuth && app.config.globalProperties.$auth.authenticated) {
		next('/')
	} else {
		next()
	}
})

app.config.devtools = process.env.NODE_ENV === 'development'