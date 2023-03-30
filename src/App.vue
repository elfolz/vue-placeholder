<template>
	<v-app>
		<!-- content -->
		<router-view />
		<!-- update available -->
		<v-snackbar v-model="updateAvailable" location="top" close-delay="60000" color="primary" @click="updateApp()">
			Atualização disponível
			<template v-slot:actions>
				<v-btn text icon>
					<v-icon icon="cached" />
				</v-btn>
			</template>
		</v-snackbar>
		<!-- general alerts -->
		<v-snackbar v-model="alert" location="top" close-delay="10000" :color="alertData.color || null" v-bind:class="{'theme--light': alertData.color == 'warning'}" >
			{{alertData.text}}
			<template v-slot:actions>
				<v-btn icon @click="alert=false">
					<v-icon icon="clear" />
				</v-btn>
			</template>
		</v-snackbar>
		<!-- install pwa -->
		<banner-install-pwa />
		<!-- cookies -->
		<banner-cookies-warning />
	</v-app>
</template>

<script>
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
		windowResized: {
			get() {
				return this.$store.state.windowResized
			},
			set(value) {
				return this.$store.dispatch("setWindowResized", value)
			},
		},
		alertData: function () {
			return this.$store.state.alertData
		}
	},
	created() {
		this.$auth.attempt()
		window.visualViewport.onresize = () => this.refreshPageSize()
		window.visualViewport.onscroll = () => setTimeout(() => this.refreshPageSize(), 250)
	},
	mounted() {
		this.refreshPageSize()
	},
	methods: {
		updateApp() {
			location.reload(true)
		},
		refreshPageSize() {
			document.documentElement.style.setProperty('--vh', `${window.visualViewport.height}px`)
			this.isMobile = window.innerWidth <= 800
			this.windowResized = true
		}
	}
}
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}
*:focus {
	outline: none;
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
html {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden !important;
}
textarea {
	resize: none;
}
img {
	-webkit-user-drag: none;
	user-drag: none;
}
.emoji {
	font-family: "Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Segoe UI Symbol", "Android Emoji", EmojiSymbols, "EmojiOne Mozilla" !important;
	font-weight: 400 !important;
}
.v-application__wrap {
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
	border-radius: 8px !important;
	&.flat {
		padding: 0 !important;
		.v-list-item {
			padding: 0 6px 0 0 !important;
		}
	}
	&.transparent {
		background: transparent !important;
	}
	.v-list-item {
		border-radius: 8px;
		&:before {
			border-radius: 8px !important;
		}
		.v-list-item__prepend {
			> img, .v-icon {
				margin-right: 12px !important;
			}
		}
	}
	.v-divider {
		margin: 0 8px;
	}
}
.v-card {
	border-radius: 8px !important;
	.v-card-title {
		padding: 12px !important;
	}
	.v-card-text {
		padding: 0 12px 12px !important;
	}
	.v-card-actions {
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
.v-avatar {
	overflow: unset !important;
}
.v-carousel {
	border-radius: 12px;
	.v-window__container {
		height: 100%;
		.v-image {
			height: 100% !important;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
}
.v-btn {
	img {
		width: 28px;
		height: 28px;
		object-fit: cover;
	}
}
.v-text-field .v-input__prepend-inner, .v-text-field .v-input__append-inner {
	align-self: center !important;
}

.v-snackbar {
	.v-overlay__content {
		top: env(safe-area-inset-top, 0) !important;
	}
	.v-snackbar__wrapper {
		cursor: pointer;
	}
}
.banner, .v-bottom-navigation, .v-dialog--active, .v-snack__wrapper, .v-overlay--active:not(.v-snackbar, .v-menu), .v-menu .v-overlay__content {
	--webkit-backdrop-filter: blur(15px);
	backdrop-filter: blur(15px);
}
.v-tabs {
	&.no-header {
		.v-tabs-bar {
			display: none;
		}
	}
	.v-tabs-bar, .v-tabs-items {
		background-color: unset !important;
		.v-tab {
			overflow: hidden;
		}
	}
	.v-tabs-items {
		background-color: transparent !important;
	}
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
	background-color: rgba(var(--v-theme-surface), 0.25);
	z-index: 1000;
}
.fade-enter-active, .fade-leave-active {
	transition: opacity 500ms ease-in-out;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
.firebase-emulator-warning {
	display: none;
}
@media (prefers-color-scheme: dark) {
	html {
		background-color: #121212;
	}
}
@media (prefers-color-scheme: light) {
	html {
		background-color: whitesmoke;
	}
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