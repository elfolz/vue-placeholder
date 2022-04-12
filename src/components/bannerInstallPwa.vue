<template>
	<transition name="fade">
		<main v-if="show" @click="show=false" class="banner elevation-12">
			<header>Instale esse App no seu ceular</header>
			<template v-if="device.name == 'ios'">
				<div> Toque em <v-icon>ios_share</v-icon> e depois em </div>
				<div class="ios"> Adicionar à Tela de Início <span></span> </div>
			</template>
			<template v-if="device.name == 'android'">
				<div> Toque em <v-icon>more_vert</v-icon>e depois em </div>
				<div>Adicionar à tela inicial</div>
			</template>
		</main>
	</transition>
</template>

<script>
import device from '../helpers/deviceChecker'

export default {
	name: 'banner-install-pwa',
	computed: {
		device() {
			return device()
		}
	},
	data() {
		return {
			show: false
		}
	},
	mounted() {
		if (!this.device.isMobile) return
		this.show = true
		setTimeout(() => {
			this.show = false
		}, 10000)
	}
}
</script>

<style lang="scss" scoped>
main {
	header {
		color: var(--v-primary-base);
	}
	div {
		&:not(:first-of-type) {
			margin-top: 6px;
		}
		&.ios {
			display: flex;
			padding: 4px 8px;
			border-radius: 4px;
			span {
				display: inline-flex;
				justify-content: center;
				align-items: center;
				width: 20px;
				height: 20px;
				margin-left: auto;
				border-radius: 4px;
				&:before {
					content: "+";
					font-size: 20px;
					font-weight: 300;
				}
			}
		}
	}
	img {
		width: auto;
		height: 20px;
		margin: 0 6px;
		&.ios {
			margin-bottom: -4px;
		}
	}
}
.theme--dark {
	.ios {
		border: 1px solid #fff;
		span {
			border: 1px solid #fff;
			&:before {
				color: #fff;
			}
		}
	}
}
.theme--light {
	.ios {
		border: 1px solid #333;
		span {
			border: 1px solid #333;
			&:before {
				color: #333;
			}
		}
	}
}
</style>