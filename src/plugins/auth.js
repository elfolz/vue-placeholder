'use strict'

import Vue from 'vue'

class Auth {

	get authenticated() {
		return localStorage.getItem('accessToken') ? true : false
	}

	attempt() {
		if (!navigator.onLine) return false
		Vue.axios.get('/auth/check', {headers: this.headers})
		.catch(() => {
			this.deauthenticate()
		})
	}

	authenticate(data) {
		localStorage.setItem('accessToken', data.accessToken)
		localStorage.setItem('user', JSON.stringify(data.user))
		window.Vue.$store.commit('setAuthenticate', true)
		window.Vue.$router.push('/').catch(e=>{})
	}

	deauthenticate() {
		window.Vue.$store.commit('setAuthenticate', false)
		localStorage.removeItem('accessToken')
		localStorage.removeItem('user')
		window.Vue.$router.push('/').catch(e=>{})
	}

	get user() {
		return JSON.parse(localStorage.getItem('user') ?? '{}')
	}

	get headers() {
		let headers = {}
		if (localStorage.getItem('accessToken')) headers["Authorization"] = `Bearer ${localStorage.getItem('accessToken')}`
		return headers
	}

}

const _auth = new Auth()

Auth.install = function (Vue, options) {
	Vue.$auth = _auth
	Object.defineProperty(Vue.prototype, '$auth', {
		get() { return _auth }
	})
}

Vue.use(Auth)

export default Auth