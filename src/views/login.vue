<template>
	<main>
		<template v-if="loading">
			<figure>
				<img :src="`/img/social/${loading}-color.svg`" alt="Rede social">
				<v-skeleton-loader type="list-item-avatar-three-line"/>
			</figure>
		</template>
		<template v-else>
			<figure>
				<img src="/img/icons/android-chrome-192x192.png" :alt="appName">
				<figcaption><h1>{{appName}}</h1></figcaption>
			</figure>
			<footer>Entre com uma de suas redes sociais</footer>
			<v-btn fab v-for="(p, i) in providers" :key="i" :class="p" @click="requestLogin(p)"><img :src="`/img/social/${p}.svg`" :alt="p"></v-btn>
		</template>
	</main>
</template>

<script>
import packageInfo from '../../package.json'
import firebase from "../plugins/firebase"
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, OAuthProvider } from "firebase/auth"

export default {
	data() {
		return {
			appName: packageInfo.name,
			loading: null,
			providers: [
				'google', 'facebook', 'microsoft', 'twitter'
			]
		}
	},
	mounted() {
		if (this.$route.params.provider) this.executeLogin()
	},
	methods: {
		requestLogin(provider) {
			this.$router.push({params: {provider}}).catch(e=>{})
			if (provider == 'google') provider = new GoogleAuthProvider()
			if (provider == 'facebook') provider = new FacebookAuthProvider()
			if (provider == 'twitter') provider = new TwitterAuthProvider()
			if (provider == 'microsoft') provider = new GoogleAuthProvider()
			if (provider == 'google') provider = new OAuthProvider("microsoft.com")()
			firebase.auth().signInWithRedirect(provider)
		},
		executeLogin() {
			this.loading = this.$route.params.provider
			firebase.auth().setPersistence('none')
			.finally(() => {
				return firebase.auth().getRedirectResult()
				.then(result => {
					if (!result.credential) {
						this.$router.push('/login').catch(e=>{})
						return this.$store.dispatch('openAlert', {text: 'Falha ao fazer o login. Tente novamente', color: 'error'})
					}
					let data = {
						name: result.user.providerData[0].displayName,
						socialId: result.user.providerData[0].uid,
						provider: result.credential.providerId.replace('.com', ''),
						email: result.user.providerData[0].email
					}
					return this.axios.post(`/auth`, data)
					.then(response => {
						this.$auth.authenticate(response.data)
					})
				})
				.catch(error => {
					console.log(error)
					this.$store.dispatch('openAlert', {text: 'Falha ao fazer o login. Tente novamente', color: 'error'})
				})
			})
			.finally(() => {
				this.loading = null
			})
		}
	}
}
</script>

<style lang="scss" scoped>
main {
	position: fixed;
	top: 50%;
	left: 50%;
	min-width: 320px;
	transform: translate(-50%, -50%);
	text-align: center;
	figure {
		width: 280px;
		margin: 0 auto;
		margin-bottom: 12px;
		img {
			width: 96px;
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
		&.v-btn--fab {
			width: 56px;
			margin: 0 12px;
			img {
				width: 28px;
				height: auto;
			}
			&.google {
				background-color: #ea4335 !important;
			}
			&.facebook {
				background-color: #3b5998 !important;
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