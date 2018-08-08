const wallet = {
    state: {
        wallet: {}
    },
    mutations: {
        setWallet(state, wallet) {
            state.wallet = wallet
        }
    },
    actions: {
        getWallet(vuexContext, walletId) {
            return this.$axios.$get('https://wallets-d4ab2.firebaseio.com/wallets/'+walletId+'.json')
                .then(response => {
                    console.log(response)
                    let wallet = {
                        ...response, 
                        walletId: walletId
                    }
                    vuexContext.commit('setWallet', wallet)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    getters: {
        getWallet(state) {
            return state.wallet
        }
    }
}

export default wallet