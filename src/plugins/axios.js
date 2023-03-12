'use strict'

import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_HOST
axios.defaults.headers.common = {
	'Accept': 'application/json'
}

const _axios = axios.create({})

_axios.interceptors.request.use(
	function (config) {
		return config
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

export default {
	install: (app, options) => {
		app.config.globalProperties.axios = _axios
	}
}