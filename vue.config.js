const pkg = require('./package.json')

module.exports = {
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
		name: pkg.name,
		themeColor: '#000',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'blackTranslucent',
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: 'src/plugins/service-worker.js',
		},
		iconPaths: {
			favicon32: 'img/icons/favicon-32x32.png',
			favicon16: 'img/icons/favicon-16x16.png',
			appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
			maskIcon: null,
			msTileImage: null,
		}
	},
	devServer: {
		disableHostCheck: true
	}
}