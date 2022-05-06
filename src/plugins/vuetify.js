'use strict'

import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

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
				primary: '#43b3ae',
				secondary: '#779ecb',
				accent: '#9370db',
				error: '#ff4040',
				info: '#1e90ff',
				success: '#3cd070',
				warning: '#ffcc33'
			},
			dark: {
				primary: '#43b3ae',
				secondary: '#779ecb',
				accent: '#9370db',
				error: '#ff4040',
				info: '#1e90ff',
				success: '#3cd070',
				warning: '#ffcc33'
			}
		}
	}
})