<template>
    <div>
        <h1>My wallets</h1>
        <v-layout>
            <v-card></v-card>
        </v-layout>
        <div>
            <ul>
                <li v-for="wallet in getWallets" :key="wallet.walletId">
                    {{ wallet.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    fetch(context) {
        if ( ! context.store.getters.getWallets.length) {
            return context.store.dispatch('getAvailiableWallets', process.server ? context.req : null)
        }
    },
    data() {
        return {

        }
    },
    computed: {
        getWallets() {
            return this.$store.getters.getWallets
        }
    }
}
</script>
