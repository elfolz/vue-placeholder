'use strict'

import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = `${process.env.VUE_APP_API_HOST}/api`
axios.defaults.headers.common = {
	'Accept': 'application/json'
}

const _axios = axios.create({})

_axios.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error)
	}
)

_axios.interceptors.response.use(
	function (response) {
		return response
	},
	function (error) {
		return Promise.reject(error)
	}
)

Plugin.install = function (Vue, options) {
	Vue.axios = _axios
	window.axios = _axios
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios
			}
		},
		$axios: {
			get() {
				return _axios
			}
		},
	})
}

Vue.use(Plugin)

export default Plugin