<template>
    <v-container grid-list-md>
        <h1>My wallets</h1>
        <v-layout row wrap>
            <v-flex v-for="wallet in getWallets" :key="wallet.walletId" xs12 sm6 md4 lg4 xl4>
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h3>{{ wallet.name }}</h3>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        Number: {{ wallet.number }}
                    </v-card-text>
                    <v-card-text>
                        Currency: {{ wallet.currency }}
                    </v-card-text>
                    <v-card-text>
                        Balance: {{ wallet.balance }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="info" :to="wallet.walletId+'/edit'">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    fetch(context) {
        return context.store.dispatch('getAvailiableWallets', process.server ? context.req : null)
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
