<template>
    <v-container>
        <v-layout align-center justify-center row fill-height>
            <v-flex xs12 sm6 md4 lg4 xl4>
                <h1>Edit wallet</h1>
                <v-form ref="editWalletForm" v-model="valid" lazy-validation>
                    <v-text-field
                        label="Name"
                        v-model="wallet.name"
                        :rules="nameRules"
                        required
                    ></v-text-field>
                    <v-select
                        v-if="currencyType == 'availiable'"
                        :items="getCurrencies"
                        v-model="wallet.currency"
                        label="Currency"
                        :rules="currencyRules"
                        required
                    ></v-select>
                    <v-text-field
                        v-model="wallet.number"
                        label="Number"
                        disabled
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="wallet.balance"
                        label="Balance"
                        disabled
                    >    
                    </v-text-field>
                    <v-btn>Cancel</v-btn>
                    <v-btn color="info">Save</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    fetch(context) {
        return context.store.dispatch('getWallet', context.params.id)
            .then(() => {
                return context.store.dispatch('getAvailiableCurrencies')
            })
        console.log(context.params)
    },
    data() {
        return {
            valid: true,
            wallet: {},
            currencyType: 'availiable',
            nameRules: [
                v => !!v || 'Name is required'
            ],
            currencyRules: [
                v => !!v || 'Currency is required'
            ],
        }
    },
    computed: {
        getWallet() {
            return this.$store.getters.getWallet
        },
        getCurrencies() {
            return this.$store.getters.getCurrencies
        },
    },
    mounted() {
        this.wallet = this.getWallet
    }
}
</script>

