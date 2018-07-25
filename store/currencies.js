const currencies = {
    state: {
        currencies: []
    },
    mutations: {
        setAvailiableCurrencies(state, currencies) {
            for (let key in currencies) {
                state.currencies.push(currencies[key])
            }
        }
    },
    actions: {
        getAvailiableCurrencies(vuexContext) {
            vuexContext.state.currencies = []
            return this.$axios.$get('https://wallets-d4ab2.firebaseio.com/currencies.json')
            .then((response) => {
                vuexContext.commit('setAvailiableCurrencies', response)
            })
        }
    },
    getters: {
        getCurrencies(state) {
            return state.currencies
        }
    }
}

export default currencies