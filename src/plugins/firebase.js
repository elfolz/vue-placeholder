'use strict'

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getMessaging } from 'firebase/messaging'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseApp = initializeApp({
	apiKey: "AIzaSyDhfj-0jIAhGoEZYXO-7yhjMY6IuFokdpY",
	authDomain: "bixinhos-c0a0e.firebaseapp.com",
	projectId: "bixinhos-c0a0e",
	storageBucket: "bixinhos-c0a0e.appspot.com",
	messagingSenderId: "1061607580006",
	appId: "1:1061607580006:web:503c689d8157d6e5a268a7",
	measurementId: "G-P58N8X9S8E"
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

export {auth, messaging, firestore}