'use strict'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		updateAvailable: false,
		alert: false,
		alertData: {}
	},
	mutations: {
		setUpdateAvailable(state, value) {
			state.updateAvailable = value;
		},
		setAlert(state, data) {
			state.alert = data;
		},
		setAlertData(state, data) {
			state.alertData = data;
		}
	},
	actions: {
		openAlert({commit}, data) {
			if (!data.text) return
			commit('setAlertData', data)
			commit('setAlert', true)
			try { navigator.vibrate(100) } catch (e) { }
		}
	}
})