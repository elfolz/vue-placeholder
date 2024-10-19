'use strict'

import { createStore } from 'vuex'

export default createStore({
	state: {
		authenticated: localStorage.getItem('accessToken') ? true : false,
		requestNotificationPermission: null,
		updateAvailable: false,
		resize: false,
		alert: false,
		alertData: {}
	},
	mutations: {
		setRequestNotificationPermission(state, data) {
			state.requestNotificationPermission = data
		},
		setUpdateAvailable(state, value) {
			state.updateAvailable = value
		},
		setAuthenticated(state, value) {
			state.authenticated = value
		},
		setAlert(state, data) {
			state.alert = data;
		},
		setAlertData(state, data) {
			state.alertData = data
		},
		resize(state, value) {
			state.resize = value
		}
	},
	actions: {
		resize(state) {
			state.commit('resize', true)
			setTimeout(() => {
				state.commit('resize', false)
			}, 100)
		},
		openAlert({commit}, data) {
			if (!data.text) return
			commit('setAlertData', data)
			commit('setAlert', true)
			try { navigator.vibrate(100) } catch (e) { }
		}
	}
})