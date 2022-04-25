<template>
	<v-app>
		<!-- content -->
		<router-view />
		<!-- alerts -->
		<v-snackbar bottom v-model="alert" :light="!$vuetify.theme.dark" :timeout="5000" :color="alertData.color || null" @click.native="alert=false">
			{{alertData.text}}
			<template v-slot:action="{ attrs }">
				<v-btn text icon v-bind="attrs"><v-icon>clear</v-icon></v-btn>
			</template>
		</v-snackbar>
		<!-- update available -->
		<v-snackbar top v-model="updateAvailable" :light="!$vuetify.theme.dark" :timeout="10000" color="primary" @click.native="updateApp">
			Atualização disponível&nbsp;
			<template v-slot:action="{ attrs }">
				<v-btn text icon v-bind="attrs"><v-icon>cached</v-icon></v-btn>
			</template>
		</v-snackbar>
		<!-- install pwa -->
		<banner-install-pwa />
		<!-- cookies -->
		<banner-cookies-warning />
	</v-app>
</template>

<script>
import device from './helpers/deviceChecker'
import bannerInstallPwa from './components/bannerInstallPwa'
import bannerCookiesWarning from './components/bannerCookiesWarning.vue'

export default {
	components: {
		bannerInstallPwa,
		bannerCookiesWarning
	},
	computed: {
		alert: {
			get() {
				return this.$store.state.alert
			},
			set(value) {
				return this.$store.commit("setAlert", value)
			},
		},
		updateAvailable: {
			get() {
				return this.$store.state.updateAvailable
			},
			set(value) {
				this.$store.commit('setUpdateAvailable', false)
			}
		},
		alertData: function () {
			return this.$store.state.alertData
		}
	},
	mounted() {
		window.onresize = () => {
			this.refreshPageSize()
		}
	},
	methods: {
		updateApp() {
			location.reload(true)
		},
		refreshPageSize() {
			document.body.style.setProperty('--vh', `${device().standalone ? window.outerHeight : window.innerHeight}px`)
			this.$root.$emit('resize')
		}
	}
}
</script>

<style lang="scss">
*:focus {
	outline: none;
}
:root {
	--vh: 100vh;
}
::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}
::-webkit-scrollbar-thumb {
	background: rgb(96, 96, 96);
	border: none;
	border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
	background: rgb(112, 112, 112);
}
::-webkit-scrollbar-track, ::-webkit-scrollbar-corner {
	background: transparent;
}
html, body {
	overflow: hidden !important;
}
img {
	-webkit-user-drag: none;
	user-drag: none;
}
.emoji {
	font-family: "Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Segoe UI Symbol", "Android Emoji", EmojiSymbols, "EmojiOne Mozilla" !important;
	font-weight: 400 !important;
}
.v-application--wrap {
	padding-top: env(safe-area-inset-top, 0);
	padding-bottom: env(safe-area-inset-bottom, 0);
	height: var(--vh) !important;
	min-height: var(--vh) !important;
	overflow: auto;
}
.v-toolbar {
	height: calc(56px + env(safe-area-inset-top, 0)) !important;
	.v-toolbar__content {
		height: calc(56px + env(safe-area-inset-top, 0)) !important;
		padding-top: env(safe-area-inset-top, 0) !important;
	}
}
.v-list {
	border-radius: 6px !important;
	.v-list-item {
		.v-list-item__icon {
			margin-right: 12px !important;
		}
	}
}
.v-card {
	.v-card__title {
		padding: 12px !important;
	}
	.v-card__text {
		padding: 0 12px 12px !important;
	}
	.v-card__actions {
		display: flex;
		justify-content: space-between;
		padding: 0 12px 12px !important;
		> .v-btn {
			&:only-of-type {
				margin-left: auto;
			}
		}
	}
}
.v-card, .v-sheet.v-snack__wrapper {
	border-radius: 8px !important;
}
.v-btn--fixed {
	&.v-btn--top {
		top: calc(env(safe-area-inset-top, 0) + 12px) !important;
	}
	&.v-btn--bottom {
		bottom: calc(env(safe-area-inset-bottom, 0) + 12px) !important;
	}
}
.v-snack {
	&.v-snack--top {
		top: env(safe-area-inset-top, 0) !important;
	}
	&.v-snack--bottom {
		bottom: env(safe-area-inset-bottom, 0) !important;
	}
	.v-snack__wrapper {
		&.warning {
			color: rgba(0,0,0,0.87) !important;
			.v-btn {
				color: rgba(0,0,0,0.87) !important;
			}
		}
	}
}
.v-card, .v-navigation-drawer, .v-sheet, .v-overlay--active, .banner {
	backdrop-filter: blur(10px);
	> .v-overlay__scrim {
		backdrop-filter: blur(10px);
	}
}
.v-skeleton-loader {
	width: 100%;
	> :first-child {
		background: none !important;
	}
}
.v-bottom-sheet {
	border-top-left-radius: 12px !important;
	border-top-right-radius: 12px !important;
}
.v-navigation-drawer__content {
	padding-top: env(safe-area-inset-top, 0);
	padding-bottom: env(safe-area-inset-bottom, 0);
}
.banner {
	position: fixed;
	display: block;
	text-align: center;
	padding: 12px;
	bottom: 0;
	border-top-left-radius: 12px;
	border-top-right-radius: 12px;
	padding-bottom: calc(12px + env(safe-area-inset-bottom, 0));
	z-index: 1000;
}
.theme--dark {
	--v-overlay: rgba(255,255,255,0.05);
	--v-underlay: rgba(0,0,0,0.2);
	.v-sheet:not(.transparent):not(.error):not(.success):not(.warning),
	.v-text-field--solo > .v-input__control > .v-input__slot,
	.v-navigation-drawer, .v-bottom-sheet, .banner {
		background-color: rgba(40,40,40,0.75) !important;
	}
}
.theme--light {
	--v-overlay: rgba(255,255,255,0.25);
	--v-underlay: rgba(0,0,0,0.05);
	.v-sheet:not(.transparent):not(.error):not(.success):not(.warning),
	.v-text-field--solo > .v-input__control > .v-input__slot,
	.v-navigation-drawer, .v-bottom-sheet, .banner {
		background-color: rgba(230,240,255,0.65) !important;
	}
}
.fade-enter-active, .fade-leave-active {
	transition: opacity 500ms ease-in-out;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
@media screen and (min-width: 481px) {
	.banner {
		left: 50%;
		width: 480px;
		transform: translateX(-50%);
	}
}
@media screen and (max-width: 480px) {
	.banner {
		left: 0;
		right: 0;
	}
}
</style>