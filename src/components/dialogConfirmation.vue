<template>
	<v-bottom-sheet v-model="show" content-class="dialog-confirm">
		<p v-html="message"></p>
		<footer>
			<v-btn text @click="cancel">
				<v-icon>clear</v-icon>&nbsp;Não
			</v-btn>
			<v-btn text @click="confirm">
				<v-icon>check</v-icon>&nbsp;Sim
			</v-btn>
		</footer>
	</v-bottom-sheet>
</template>

<script>
export default {
	name: 'dialog-confirmation',
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
			this.$emit('confirm', true)
			this.show = false
		},
		cancel() {
			this.$emit('cancel', true)
			this.show = false
		},
	},
}
</script>

<style lang="scss" scoped>
p {
	width: unset !important;
	margin: 12px;
}
footer {
	display: flex;
	padding: 0 12px 12px;
	.v-btn {
		&:last-of-type {
			margin-left: auto;
		}
	}
}
</style>

<style lang="scss">
@media screen and (min-width: 481px) {
	.dialog-confirm {
		max-width: fit-content;
		min-width: 480px !important;
	}
}
</style>