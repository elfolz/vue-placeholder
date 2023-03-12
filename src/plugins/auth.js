'use strict'

import { auth } from './firebase'
import { signOut } from 'firebase/auth'

class Auth {

	constructor(app) {
		this.app = app
	}

	attempt() {
		if (!navigator.onLine || !this.authenticated) return
		this.vue.axios.get('/auth', {headers: this.headers})
		.catch(() => {
			this.deauthenticate(true)
		})
		this.vue.$pushNotification.checkPermission()
	}

	authenticate(data, goto='/') {
		localStorage.setItem('accessToken', data.accessToken)
		localStorage.setItem('user', JSON.stringify(data.user))
		this.vue.$store.commit('setAuthenticate', true)
		this.vue.$router.push(goto ?? '/').catch(e=>{})
		this.vue.$pushNotification.checkPermission()
	}

	deauthenticate(localOnly=false) {
		if (!localOnly) this.vue.axios.delete('/auth', {headers: this.headers})
		this.vue.$store.commit('setAuthenticate', false)
		localStorage.removeItem('accessToken')
		localStorage.removeItem('user')
		this.vue.$router.push('/login').catch(e=>{})
		signOut(auth)
	}

	get authenticated() {
		return localStorage.getItem('accessToken') ? true : false
	}

	get user() {
		return JSON.parse(localStorage.getItem('user') ?? '{}')
	}

	get headers() {
		let headers = {}
		if (localStorage.getItem('accessToken')) headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
		return headers
	}

	get vue() {
		return this.app.config.globalProperties
	}

}

export default {
	install: (app, options) => {
		const _auth = new Auth(app)
		app.config.globalProperties.$auth = _auth
	}
}