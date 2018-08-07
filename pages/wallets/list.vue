<template> 
    <v-layout row wrap>
        <v-flex v-for="wallet in getWallets" :key="wallet.walletId" xs4>
            <v-card>
                <v-card-text>
                    {{ wallet.name }}
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    asyncData(context) {
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
