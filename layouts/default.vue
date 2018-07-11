<template>
	<v-app>
		<v-toolbar fixed app :clipped-left="clipped">
			<nuxt-link to="/">
				{{ title }}
			</nuxt-link>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn flat nuxt to="/login">
					Login
				</v-btn>
				<v-btn flat nuxt to="/register">
					Register
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-content>
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
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
		}
	}
</script>
