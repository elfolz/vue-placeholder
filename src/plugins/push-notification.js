'use strict'

import Vue from 'vue'
import { getToken } from 'firebase/messaging'
import { messaging } from './firebase'

class PushNotification {

	checkPermission() {
		navigator.permissions.query({name: 'notifications'})
		.then(response => {
			if (response.state == 'granted') {
				this.getFcmToken()
			} else if (response.state != 'denied') {
				window.Vue.$store.commit('setRequestNotificationPermission', true)
			}
		})
	}

	requestPermission() {
		Notification.requestPermission()
		.then(response => {
			if (response == 'granted') this.getFcmToken()
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
				window.Vue.$store.commit('setRequestNotificationPermission', false)
				if (localStorage.getItem('fcmToken') != fcmToken) this.sendToServer({fcmToken: fcmToken})
				localStorage.setItem('fcmToken', fcmToken)
			})
		})
		.catch(error => {
			//console.log(error)
		})
	}

	sendToServer(data) {
		Vue.axios.put('/auth/notification', data, {headers: Vue.$auth.headers})
	}

}

const _pushNotification = new PushNotification()

PushNotification.install = function (Vue, options) {
	Vue.$pushNotification = _pushNotification
	Object.defineProperty(Vue.prototype, '$pushNotification', {
		get() { return _pushNotification }
	})
}

Vue.use(PushNotification)

export default PushNotification