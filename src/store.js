'use strict'

import { createStore } from 'vuex'

export default createStore({
	state: {
		authenticated: localStorage.getItem('accessToken') ? true : false,
		requestNotificationPermission: null,
		updateAvailable: false,
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
		setAuthenticate(state, value) {
			state.authenticated = value
		},
		setAlert(state, data) {
			state.alert = data;
		},
		setAlertData(state, data) {
			state.alertData = data
		},
		setWindowResized(state, value) {
			state.windowResized = value
		}
	},
	actions: {
		openAlert({commit}, data) {
			if (!data.text) return
			commit('setAlertData', data)
			commit('setAlert', true)
			try { navigator.vibrate(100) } catch (e) { }
		},
		setWindowResized({ commit }, value) {
			commit('setWindowResized', value)
			if (!value) return
			setTimeout(() => {commit('setWindowResized', false)}, 250)
		}
	}
})