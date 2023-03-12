'use strict'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

function isLightTheme() {
	if (localStorage.getItem('lightTheme') == 'true') return true
	if (localStorage.getItem('lightTheme') == 'false') return false
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
}

export default createVuetify({
	components,
	directives,
	icons: {
		defaultSet: 'md',
		aliases,
		sets: { md }
	},
	theme: {
		defaultTheme: isLightTheme() ? 'light' : 'dark',
		themes: {
			dark: {
				dark: true,
				colors: {
					background: '#121212',
					primary: '#00ffbb',
					secondary: '#ffb347',
					accent: '#9370db',
					error: '#ff4040',
					info: '#1e90ff',
					success: '#3cd070',
					warning: '#ffdb58'
				}
			},
			light: {
				dark: false,
				colors: {
					background: '#e6e6e6',
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
	}
})