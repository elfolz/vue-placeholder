const { name } = require('./package.json')

module.exports = {
	publicPath: process.env.BASE_URL ?? '/',
	transpileDependencies: true,
	productionSourceMap: false,
	configureWebpack: {
		performance: {
			hints: false
		},
		optimization: {
			splitChunks: {
				maxSize: 500000
			}
		}
	},
	css: {
		loaderOptions: {
			css: {
				url: false
			}
		}
	},
	pwa: {
		name: name,
		themeColor: '#00ffbb',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black-translucent',
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: './src/plugins/service-worker.js',
			exclude: [
				/.*\.apk$/gi,
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
			orientation: 'portrait',
			background_color: '#00ffbb'
		}
	}
}