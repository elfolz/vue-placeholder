'use strict'

import Vue from 'vue'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'

class Auth {

	attempt() {
		if (!navigator.onLine) return
		Vue.axios.get('/auth', {headers: this.headers})
		.catch(() => {
			this.deauthenticate(true)
		})
	}

	authenticate(data) {
		localStorage.setItem('accessToken', data.accessToken)
		localStorage.setItem('user', JSON.stringify(data.user))
		window.Vue.$store.commit('setAuthenticate', true)
		window.Vue.$router.push('/').catch(e=>{})
	}

	deauthenticate(localOnly=false) {
		if (!localOnly) Vue.axios.delete('/auth', {headers: this.headers})
		window.Vue.$store.commit('setAuthenticate', false)
		localStorage.removeItem('accessToken')
		localStorage.removeItem('user')
		window.Vue.$router.push('/').catch(e=>{})
		window.Vue.$db.chats.clear()
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