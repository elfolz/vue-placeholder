<template>
	<transition name="fade">
		<main v-if="show" class="banner elevation-12">
			<header>{{message || 'Me notificque quando receber mensagens'}}</header>
			<v-btn color="primary" @click="requestNotificationPermission()">Habilitar notificações</v-btn>
		</main>
	</transition>
</template>

<script>
export default {
	name: 'banner-notification-request',
	props: ['message'],
	computed: {
		show: {
			get() {
				return this.$store.state.requestNotificationPermission
			},
			set(value) {
				this.$store.commit('setRequestNotificationPermission', value)
			}
		}
	},
	methods: {
		requestNotificationPermission() {
			this.$pushNotification.requestPermission()
		}
	}
}
</script>

<style lang="scss" scoped>
header {
	margin-bottom: 12px;
}
</style>