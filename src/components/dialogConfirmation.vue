<template>
	<v-dialog v-model="show" content-class="dialog-confirm">
		<v-card>
			<v-card-title></v-card-title>
			<v-card-text v-html="message"></v-card-text>
			<v-card-actions>
				<v-btn variant="text" @click="cancel()">
					<v-icon icon="clear" />&nbsp;Não
				</v-btn>
				<v-btn variant="text" @click="confirm()">
					<v-icon icon="check" />&nbsp;Sim
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'dialog-confirmation',
	emits: ['confirm', 'cancel'],
	data() {
		return {
			message: null,
			show: false
		}
	},
	methods: {
		open(msg) {
			this.message = msg
			this.show = true
		},
		confirm() {
			this.$emit('confirm')
			this.show = false
		},
		cancel() {
			this.$emit('cancel')
			this.show = false
		},
	},
}
</script>

<style lang="scss" scoped>
.dialog-confirm {
	.v-card {
		.v-card-actions {
			justify-content: space-between !important;
		}
	}
}
</style>