<template>
	<v-layout justify-center align-center row fill-height>
		<v-flex xs12 sm9 md9 lg6>
			<v-card>
				<v-card-title>
					REGISTER
				</v-card-title>
				<v-card-text>
					<v-form ref="registerForm" v-model="valid" lazy-validation>
						<v-text-field
							v-model="email"
							type="email"
							label="E-mail"
							:rules="emailRules"
							@keydown.enter.prevent="submit"
							required
						></v-text-field>
						<v-text-field
							v-model="password"
							type="password"
							label="Password"
							:rules="passwordRules"
							:counter="20"
							@keydown.enter.prevent="submit"
							required
						></v-text-field>
						<v-text-field
							v-model="passwordConfirmation"
							type="password"
							label="Confirm password"
							:rules="passwordConfirmationRules"
							:counter="20"
							@keydown.enter.prevent="submit"
							required
						></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-btn flat @click="submit" color="info">
						SIGN UP
					</v-btn>
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
			passwordConfirmation: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
			],
			passwordRules: [
				v => !!v || 'Password is required',
				v => /^\S{6,20}$/.test(v) || 'Password length must be from 6 to 20 characters'
			],
			passwordConfirmationRules: [
				v => !!v || 'Password is required',
				v => v === this.password || 'Passwords do not match'
			],
		}
	},
	computed: {
		isAuthenticated() {
			return this.$store.getters.isAuthenticated
		}
	},
	methods: {
		submit() {
			if (this.$refs.registerForm.validate()) {
				this.$store.dispatch('setAjaxLoading', true)

				this.$store.dispatch('registerUser', {
					email: this.email,
					password: this.password
				})
				.then((response) => {
					console.log(response)
					this.$store.dispatch('setAjaxLoading', false)
					if (this.isAuthenticated) {
						this.$router.push('/')
					} else {
						this.$store.dispatch('showAlert', { message: 'Invalid data', type: 'error', time: 3 })
					}
				})
				.catch(() => {
					this.$store.dispatch('setAjaxLoading', false)
				})
			}
		}
	}
}
</script>
