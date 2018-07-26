<template>
	<v-app>
		<AjaxLoader :loading="isAjaxLoading" />
		<v-navigation-drawer :disable-resize-watcher="true" v-model="drawer" app>
			<v-toolbar flat>
				<v-list>
					<v-list-tile>
						<v-list-tile-title class="title">
							<nuxt-link to="/">
								{{ title }}
							</nuxt-link>
						</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-toolbar>
			<v-divider></v-divider>
			<v-list dense class="pt-0">
				<v-list-tile
					v-if=" ! isAuthenticated"
					v-for="item in items"
					:key="item.title"
					:to="item.link"
				>
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ item.title }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
			<v-list dense class="pt-0">
				<v-list-tile
					v-if="isAuthenticated"
					v-for="item in loggedItems"
					:key="item.title"
					:to="item.link"
				>
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ item.title }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile
					@click="logout"
				>
					<v-list-tile-action>
						<v-icon>exit_to_app</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Logout</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar fixed app :clipped-left="clipped">
			<v-toolbar-side-icon :class="'hide-on-desktop'" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<nuxt-link :class="'hide-on-mobile'" to="/">
				{{ title }}
			</nuxt-link>
			<v-spacer></v-spacer>
			<v-toolbar-items :class="'hide-on-mobile'" v-if=" ! isAuthenticated">
				<v-btn flat nuxt to="/login">
					Login
				</v-btn>
				<v-btn flat nuxt to="/register">
					Register
				</v-btn>
			</v-toolbar-items>
			<v-toolbar-items :class="'hide-on-mobile'" v-else>
				<v-btn flat nuxt to="/wallets/list">
					My Wallets
				</v-btn>
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
				drawer: false,
				fixed: false,
				title: 'Wallets',
				year: new Date().getFullYear(),
				items: [
					{ title: 'Login', icon: 'person', link: '/login' },
          			{ title: 'Register', icon: 'person_add', link: '/register' }
				],
				loggedItems: [
					{ title: 'New Wallet', icon: 'library_add', link: '/wallets/create'}
				]
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
