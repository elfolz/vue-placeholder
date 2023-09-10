<template>
	<main>
		<section>
			<template v-if="loading">
				<figure>
					<img :src="`${baseUrl}img/social/${loading}-color.svg`" alt="Rede social">
					<v-progress-circular indeterminate :size="56" color="primary" />
				</figure>
			</template>
			<template v-else>
				<figure>
					<img :src="`${baseUrl}img/icons/android-chrome-192x192.png`" :alt="appName">
					<figcaption><h1>{{appName}}</h1></figcaption>
				</figure>
				<footer>Entre com uma de suas redes sociais</footer>
				<v-btn icon v-for="(p, i) in providers" :key="i" :class="p" @click="requestLogin(p)"><img :src="`${baseUrl}img/social/${p}.svg`" :alt="p"></v-btn>
			</template>
		</section>
	</main>
</template>

<script>
import packageInfo from '../../package.json'
import { auth } from "../plugins/firebase"
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, TwitterAuthProvider } from "firebase/auth"

export default {
	computed: {
		baseUrl() {
			return process.env.BASE_URL
		}
	},
	data() {
		return {
			appName: packageInfo.name.replace(/-/, ' '),
			providers: ['google', 'facebook', 'microsoft', 'twitter'],
			loading: null
		}
	},
	methods: {
		requestLogin(provider) {
			this.loading = provider
			this.$router.push({params: {provider}}).catch(e=>{})
			if (provider == 'google') provider = new GoogleAuthProvider()
			if (provider == 'facebook') provider = new FacebookAuthProvider()
			if (provider == 'microsoft') provider = new OAuthProvider("microsoft.com")
			if (provider == 'twitter') provider = new TwitterAuthProvider()
			signInWithPopup(auth, provider)
			.then(result => {
				if (!result) return
				let user = result.user.providerData[0]
				user.socialId = user.uid
				user.firebaseId = result.user.uid
				delete user.uid
				this.$auth.authenticate({user: user, accessToken: result.user.accessToken}, localStorage.getItem('pendingPath'))
				localStorage.removeItem('pendingPath')
			})
			.catch(error => {
				this.$store.dispatch('openAlert', {text: 'Falha ao fazer o login. Tente novamente', color: 'error'})
			})
			.finally(() => {
				this.loading = null
			})
		}
	}
}
</script>

<style lang="scss" scoped>
section {
	position: fixed;
	top: 50%;
	left: 50%;
	min-width: 320px;
	transform: translate(-50%, -50%);
	text-align: center;
	figure {
		width: 280px;
		margin: 0 auto;
		img {
			width: 96px;
			display: block;
    	margin: 0 auto 24px;
		}
		figcaption {
			h1 {
				font-size: 1.5rem;
			}
		}
	}
	footer {
		margin: 24px 0 12px 0;
	}
	.v-btn {
		&.v-btn--icon {
			width: 56px;
			height: 56px;
			margin: 0 12px;
			img {
				width: 28px;
				height: auto;
			}
			&.google {
				background-color: #ea4335 !important;
			}
			&.facebook {
				background-color: #5558f2 !important;
			}
			&.microsoft {
				background: linear-gradient(#7BDBFF, #0C9DFF) !important;
			}
			&.twitter {
				background-color: #1da1f2 !important;
			}
		}
	}
}
</style>