'use strict'

import { getToken } from 'firebase/messaging'
import { messaging } from './firebase'

class PushNotification {

	constructor(app) {
		this.app = app
	}

	checkPermission() {
		navigator.permissions.query({name: 'notifications'})
		.then(response => {
			if (response.state == 'granted') {
				this.getFcmToken()
			} else if (response.state == 'prompt') {
				this.vue.$store.commit('setRequestNotificationPermission', true)
				this.vue.$store.dispatch('refreshShowPromo')
			}
		})
	}

	requestPermission() {
		Notification.requestPermission()
		.then(response => {
			if (response == 'granted') this.getFcmToken()
		})
		.catch(e => {
			this.vue.$store.commit('setRequestNotificationPermission', false)
		})
	}

	getFcmToken() {
		navigator.serviceWorker.ready
		.then(registration => {
			return getToken(messaging, {
				vapidKey: process.env.VUE_APP_FIREBASE_VAPID,
				serviceWorkerRegistration: registration
			})
			.then(fcmToken => {
				if (localStorage.getItem('fcmToken') != fcmToken) this.sendToServer({fcmToken: fcmToken})
				localStorage.setItem('fcmToken', fcmToken)
				this.vue.$store.dispatch('refreshShowPromo')
				this.vue.$store.commit('setRequestNotificationPermission', false)
			})
		})
		.catch(error => {
			//console.log(error)
		})
	}

	sendToServer(data) {
		this.vue.axios.put('/auth/notification', data, {headers: this.vue.$auth.headers})
	}

	get vue() {
		return this.app.config.globalProperties
	}

}

export default {
	install: (app, options) => {
		const _pushNotification = new PushNotification(app)
		app.config.globalProperties.$pushNotification = _pushNotification
	}
}