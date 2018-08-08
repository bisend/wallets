<template>
	<v-layout align-center justify-center row fill-height>
		<v-flex xs12 sm9 md9 lg6>
			<v-card>
				<v-card-title>
					LOGIN
				</v-card-title>
				<v-card-text>
					<v-form ref="loginForm" v-model="valid" lazy-validation>
						<v-text-field
							v-model="email"
							:rules="emailRules"
							type="email"
							label="E-mail"
							@keydown.enter.prevent="submit"
							required
						></v-text-field>
						<v-text-field
							v-model="password"
							:rules="passwordRules"
							type="password"
							label="Password"
							@keydown.enter.prevent="submit"
							required
						></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-btn flat @click="submit" color="info">Sign in</v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	data() {
		return {
			valid: true,
			email: '',
			password: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
			],
			passwordRules: [
				v => !!v || 'Password is required'
			]
		}
	},
	computed: {
		isAuthenticated() {
			return this.$store.getters.isAuthenticated
		}
	},
	methods: {
		submit() {
			if (this.$refs.loginForm.validate()) {
				this.$store.dispatch('setAjaxLoading', true)
				this.$store.dispatch('loginUser', {
					email: this.email,
					password: this.password
				})
				.then(() => {
					this.$store.dispatch('setAjaxLoading', false)
					if (this.isAuthenticated) {
						this.$router.push('/')
					} else {
						this.$store.dispatch('showAlert', { message: 'Wrong email or password', type: 'error', time: 3 })
					}
				})
				.catch((error) => {
					this.$store.dispatch('setAjaxLoading', false)
					this.$store.dispatch('showAlert', { message: '', type: 'error', time: 3 })
				})
			}
		}
	}
}
</script>

