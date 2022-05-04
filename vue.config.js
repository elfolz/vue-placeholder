module.exports = {
	transpileDependencies: true,
	productionSourceMap: false,
	configureWebpack: {
		performance: {
			hints: false
		},
		optimization: {
			splitChunks: {
				maxSize: 200000
			}
		}
	},
	pwa: {
		name: 'Placeholder',
		themeColor: '#000',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black-translucent',
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: './src/plugins/service-worker.js',
			exclude: [
				/.*\.json$/gi,
				/\.nojekyll/gi,
				/robots\.txt/gi,
				/CNAME/gi
			]
		},
		iconPaths: {
			faviconSVG: null,
			favicon32: 'img/icons/favicon-32x32.png',
			favicon16: 'img/icons/favicon-16x16.png',
			appleTouchIcon: 'img/icons/apple-touch-icon.png',
			maskIcon: null,
			msTileImage: null,
		},
		manifestOptions: {
			background_color: '#ff7e00'
		}
	}
}