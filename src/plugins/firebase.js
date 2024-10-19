'use strict'

import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'

const firebaseApp = initializeApp({
	databaseURL: process.env.VUE_APP_FIREBASE_DATABASE,
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
	measurementId: process.env.VUE_APP_FIREBASE_ANALYTICS_ID
})

const messaging = getMessaging(firebaseApp)

let auth, db
if (process.env.NODE_ENV == 'development') {
	auth = getAuth()
	connectAuthEmulator(auth, process.env.VUE_APP_FIREABSE_AUTH_EMULATOR_HOST)
	db = getDatabase()
	connectDatabaseEmulator(db, process.env.VUE_APP_FIREBASE_DATABASE_EMULATOR_HOST, process.env.VUE_APP_FIREBASE_DATABASE_EMULATOR_PORT)
} else {
	auth = getAuth(firebaseApp)
	db = getDatabase(firebaseApp)
}

if (navigator.language) auth.languageCode = navigator.language.split('-')[0]

export {auth, db, messaging}