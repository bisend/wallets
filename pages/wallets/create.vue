<template>
    <v-layout align-center justify-center row fill-height>
        <v-flex xs12 sm9 md9 lg6>
            <h1>Create new wallet</h1>
            <v-form ref="newWalletForm" v-model="valid" lazy-validation>
                <v-radio-group v-model="currencyType">
                    <v-radio
                        label="Choose from availiable currencies"
                        value="availiable"
                    ></v-radio>
                    <v-radio
                        label="Add custom currency"
                        value="custom"
                    ></v-radio>
                </v-radio-group>
                <v-select
                    v-if="currencyType == 'availiable'"
                    :items="getCurrencies"
                    v-model="currency"
                    label="Currency"
                    :rules="currencyRules"
                    required
                ></v-select>
                <v-text-field
                    v-if="currencyType == 'custom'"
                    label="Currency"
                    v-model="currency"
                    mask="AAA"
                    @input="currency.toUpperCase()"
                    :counter="3"
                    :rules="customCurrencyRules"
                    required
                ></v-text-field>
                <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="nameRules"
                    required
                ></v-text-field>
                <v-btn @click="submit">Create</v-btn>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
import dateHelper from '@/plugins/date-helper.js'
import uid from 'uid2'
export default {
    fetch(context) {
        context.store.dispatch('getAvailiableCurrencies')
    },
    data() {
        return {
            valid: true,
            name: '',
            currency: '',
            currencyType: 'availiable',
            currencyRules: [
                v => !!v || 'Currency is required'
            ],
            customCurrencyRules: [
                v => !!v || 'Currency is required',
                v => this.checkIfCurrencyExists(v) || 'Currency already exists',
                v => /^\S{3}$/.test(v) || 'Currency name length must be equal 3 characters'
            ],
            nameRules: [
                v => !!v || 'Name is required'
            ]
        }
    },
    watch: {
        currencyType: function () {
            this.clearForm()
        }
    },
    computed: {
        getUser() {
            return this.$store.getters.getUser
        },
        getCurrencies() {
            return this.$store.getters.getCurrencies
        },
        isNewCurrency() {
            return this.getCurrencies.indexOf(this.currency) == -1
        }
    },
    methods: {
        submit() {
            if (this.$refs.newWalletForm.validate()) {
                this.$axios.$post('https://wallets-d4ab2.firebaseio.com/wallets.json', {
                    userId: this.getUser.uid,
                    number: uid(16),
                    name: this.name.trim(),
                    currency: this.currency,
                    balance: 0,
                    created_at: dateHelper(),
                    updated_at: dateHelper()
                })
                .then((response) => {
                    this.$axios.$patch(`https://wallets-d4ab2.firebaseio.com/users/${this.getUser.uid}/wallets.json`,{
                        [response.name]: response.name
                    })
                    .then((response) => {
                        this.$store.dispatch('getUserData', this.getUser)
                    })
                    if (this.isNewCurrency) {
                        this.$axios.$patch('https://wallets-d4ab2.firebaseio.com/currencies.json', {
                            [this.currency]: this.currency
                        })
                        .then((response) => {
                            this.$store.dispatch('getAvailiableCurrencies')
                        })
                    }
                    this.clearForm()
                })
            }
        },
        checkIfCurrencyExists(value) {
            return this.getCurrencies.indexOf(value) == -1
        },
        clearForm() {
            this.currency = ''
            this.name = ''
            this.$refs.newWalletForm.inputs[1].reset()
            this.$refs.newWalletForm.inputs[2].reset()
        }
    },
    mounted() {
       
    }
}
</script>

