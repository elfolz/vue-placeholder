'use strict'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/register-service-worker'
import './plugins/push-notification'
import './plugins/axios'
import './plugins/auth'

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

const _vue = new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')

window.Vue = _vue