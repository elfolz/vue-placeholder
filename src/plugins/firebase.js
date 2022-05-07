'use strict'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/messaging'

export default firebase.initializeApp({
	apiKey: null,
	authDomain: null,
	projectId: null,
	storageBucket: null,
	messagingSenderId: null,
	appId: null,
	measurementId: null
})