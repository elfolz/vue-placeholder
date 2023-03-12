import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('install', () => { self.skipWaiting() })

self.addEventListener('push', event => {
	var content = event.data.json()
	var data = content.data || {}
	var notification = content.notification || {}
	event.waitUntil(
		self.registration.showNotification((notification.title || data.title || ''), {
			body: notification.body || data.body || '',
			icon: notification.icon || data.icon || (self.location.origin + '/img/icons/android-chrome-192x192.png'),
			badge: (self.location.origin + '/img/icons/logo-white.png'),
			data: { clickAction: notification.clickAction || data.clickAction || null }
		})
	)
})

self.addEventListener('notificationclick', event => {
	event.notification.close()
	event.waitUntil(
		self.clients.matchAll({
			type: 'window',
			includeUncontrolled: true
		}).then(clientList => {
			let focusable = clientList.some(client => 'focus' in client ? (client.focus(), true) : false)
			if (!focusable) self.clients.openWindow(event.notification.data.clickAction || '/')
		})
	)
})