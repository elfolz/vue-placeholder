export default () => {

	var name
	const userAgent = window.navigator.userAgent.toLowerCase()
	const standalone = navigator.standalone || window.matchMedia('(display-mode: standalone)').matches

	if (/windows/i.test(userAgent)) {
		name = 'windows'
	} else if (/macintosh/i.test(userAgent)) {
		name = 'mac'
	} else if (/android/i.test(userAgent)) {
		name = 'android'
	} else if (/iphone|ipad|ipod/i.test(userAgent)) {
		name = 'ios'
	}

	return {
		name: name,
		standalone: standalone,
		isMobile: name == 'android' || name == 'ios'
	}

}