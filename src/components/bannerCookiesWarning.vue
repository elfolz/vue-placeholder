<template>
	<transition name="fade">
		<footer v-if="show" class="banner elevation-12">
			<p>Usamos cookies para melhorar sua experiência.</p>
			<p>Saiba mais em&nbsp;<span @click="$router.push('/privacy-policy').catch(e=>{})">{{link()}}</span></p>
			<v-btn color="accent" @click="accept"><v-icon icon="check" />Aceitar</v-btn>
		</footer>
	</transition>
</template>

<script>
export default {
	name: 'banner-cookies-warning',
	data() {
		return {
			show: localStorage.getItem('cookiesPolicyAccepted') ? false : true
		}
	},
	methods: {
		accept() {
			localStorage.setItem('cookiesPolicyAccepted', 'true')
			this.show = false
		},
		link() {
			return `${location.host}${location.pathname}#/privacy-policy`
		}
	}
}
</script>

<style lang="scss" scoped>
footer {
	font-size: .95rem;
	z-index: 1010;
	p {
		margin: 0 0 .5rem 0;
	}
	span {
		cursor: pointer;
		color: rgb(var(--v-theme-primary));
	}
}
</style>