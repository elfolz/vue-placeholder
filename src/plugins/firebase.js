/* 'use strict'

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getMessaging } from 'firebase/messaging'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

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

const auth = getAuth(firebaseApp)
const messaging = getMessaging(firebaseApp)

let firestore
if (process.env.NODE_ENV == 'development') {
	firestore = getFirestore()
	connectFirestoreEmulator(firestore, 'localhost', 9090)
} else {
	firestore = getFirestore(firebaseApp)
}

export {auth, messaging, firestore} */