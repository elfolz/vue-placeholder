<template>
	<v-app>
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
		<router-view />
	</v-app>
</template>

<script>
export default {
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
	created() {
		this.refreshWindowSize()
	},
	mounted() {
		window.addEventListener('resize', () => {
			this.refreshWindowSize()
		})
	},
	methods: {
		updateApp() {
			location.reload(true)
		},
		refreshWindowSize() {
			document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
		}
	}
}
</script>

<style lang="scss">
* {
	touch-action: none;
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
.v-application--wrap {
	height: calc(var(--vh) - env(safe-area-inset-top, 0) - env(safe-area-inset-bottom, 0));
	min-height: calc(var(--vh) - env(safe-area-inset-top, 0) - env(safe-area-inset-bottom, 0)) !important;
}
.emoji {
	font-family: "Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Segoe UI Symbol", "Android Emoji", EmojiSymbols, "EmojiOne Mozilla" !important;
	font-weight: 400 !important;
}
.v-toolbar {
	height: 56px !important;
	.v-toolbar__content {
		height: 56px !important;
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
	.v-card__text {
		padding: 12px !important;
	}
	.v-card__actions {
		display: flex;
		justify-content: space-between;
		padding: 0 12px 12px !important;
		.v-btn {
			&:only-of-type {
				margin-left: auto;
			}
		}
	}
}
.v-card, .v-sheet.v-snack__wrapper {
	border-radius: 8px !important;
}
.v-card, .v-navigation-drawer {
	backdrop-filter: blur(10px);
}
.v-skeleton-loader {
	width: 100%;
	> :first-child {
		background: none !important;
	}
}
.theme--dark {
	.v-sheet:not(.transparent):not(.error):not(.success):not(.warning),
	.v-text-field--solo > .v-input__control > .v-input__slot,
	.v-navigation-drawer {
		background-color: rgba(40,40,40,0.75) !important;
	}
}
.theme--light {
	.v-sheet:not(.transparent):not(.error):not(.success):not(.warning),
	.v-text-field--solo > .v-input__control > .v-input__slot,
	.v-navigation-drawer {
		background-color: rgba(230,240,255,0.65) !important;
	}
}
.fade-enter-active, .fade-leave-active {
	transition: opacity 500ms ease-in-out;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>