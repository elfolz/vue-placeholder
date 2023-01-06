'use strict'

import Vue from 'vue'
import VueTheMask from 'vue-the-mask'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)
Vue.use(VueTheMask)

let lt = localStorage.getItem('lightTheme')

export default new Vuetify({
	icons: {
		iconfont: 'md'
	},
	theme: {
		dark: lt ? lt == 'false' : window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false,
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				primary: '#00ffbb',
				secondary: '#ffb347',
				accent: '#9370db',
				error: '#ff4040',
				info: '#1e90ff',
				success: '#3cd070',
				warning: '#ffdb58'
			},
			dark: {
				primary: '#00ffbb',
				secondary: '#ffb347',
				accent: '#9370db',
				error: '#ff4040',
				info: '#1e90ff',
				success: '#3cd070',
				warning: '#ffdb58'
			}
		}
	}
})