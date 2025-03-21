import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig((mode) => {

	const env = loadEnv(mode, process.cwd(), '')

	for (let i in env) {
		if (!['VUE', 'BASE_URL', 'NODE_ENV'].some(el => i.startsWith(el))) delete env[i]
	}

	return {
		base: '/',
		define: {
			'process.env': env
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern'
				}
			}
		},
		plugins: [
			vue(),
			VitePWA({
				registerType: 'autoUpdate',
				workbox: {
					clientsClaim: true,
					skipWaiting: true
				},
				manifest: {
					name: "Placeholder",
					short_name: "Placeholder",
					theme_color: "#00ffbb",
					icons: [
						{
							src: "./img/icons/android-chrome-192x192.png",
							sizes: "192x192",
							type: "image/png"
						},
						{
							src: "./img/icons/android-chrome-512x512.png",
							sizes: "512x512",
							type: "image/png"
						},
						{
							src: "./img/icons/android-chrome-maskable-192x192.png",
							sizes: "192x192",
							type: "image/png",
							purpose: "maskable"
						},
						{
							src: "./img/icons/android-chrome-maskable-512x512.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "maskable"
						}
					],
					start_url: ".",
					display: "standalone",
					background_color: "#00ffbb",
					orientation: "portrait"
				}
			})
		]
	}

})