<template>
	<v-layout column justify-center align-center>
		<v-flex xs12 sm8 md6>
			
		</v-flex>
	</v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
	// middleware: ['check-auth'],
	components: {
		Logo,
		VuetifyLogo
	},
	mounted() {
		// console.log(localStorage)
	}
}
</script>
