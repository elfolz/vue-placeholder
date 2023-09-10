'use strict'

import Dexie from 'dexie'
import packageInfo from '../../package.json'

class IDB extends Dexie {

	constructor(app) {
		super(packageInfo.name.toLocaleLowerCase())
		/* this.version(1).stores({
			packages: '&id, name'
		}) */
	}

}

export default {
	install: (app, options) => {
		const _idb = new IDB(app)
		app.config.globalProperties.$idb = _idb
	}
}