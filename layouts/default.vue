<template>
	<v-app>
		<AjaxLoader :loading="isAjaxLoading" />
		<v-toolbar fixed app :clipped-left="clipped">
			<nuxt-link to="/">
				{{ title }}
			</nuxt-link>
			<v-spacer></v-spacer>
			<v-toolbar-items v-if=" ! isAuthenticated">
				<v-btn flat nuxt to="/login">
					Login
				</v-btn>
				<v-btn flat nuxt to="/register">
					Register
				</v-btn>
			</v-toolbar-items>
			<v-toolbar-items v-else>
				<v-btn flat nuxt to="/wallets/create">
					New Wallet
				</v-btn>
				<v-btn flat @click="logout">
					Log out
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-content>
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
		<transition name="alert">
			<div class="alert-container" v-show="isAlert">
				<v-alert
					:value="true"
					:type="alertType"
				>
					{{ alertMessage }}
				</v-alert>
			</div>
		</transition>
		<v-footer :fixed="fixed" app>
			<span>&copy; {{ year }}</span>
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				clipped: false,
				drawer: true,
				fixed: false,
				items: [
					{ icon: 'apps', title: 'Welcome', to: '/' },
					{ icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
				],
				miniVariant: false,
				right: true,
				rightDrawer: false,
				title: 'Wallets',
				year: new Date().getFullYear()
			}
		},
		methods: {
			logout() {
				this.$store.dispatch('logoutUser')
				.then(() => {
					this.$router.push('/login')
				})
			}
		},
		computed: {
			isAjaxLoading() {
				return this.$store.getters.isAjaxLoading
			},
			isAuthenticated() {
				return this.$store.getters.isAuthenticated
			},
			isAlert() {
				return this.$store.getters.isAlert
			},
			alertMessage() {
				return this.$store.getters.getAlertMessage
			},
			alertType() {
				return this.$store.getters.getAlertType
			}
		}
	}
</script>
