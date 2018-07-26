import Cookie from 'js-cookie'
const walletsList = {
    state: {
        wallets: []
    },
    mutations: {
        setWallets(state, wallets) {
            state.wallets = wallets
        }
    },
    actions: {
        getAvailiableWallets(vuexContext, req) {
            let uid = ''
            let wallets = []
            if (req) {
                let uidCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('uid='))
                uid = uidCookie.split('=')[1]
            } else {
                uid = Cookie.get('uid')
            }
            return this.$axios.$get('https://wallets-d4ab2.firebaseio.com/wallets.json?orderBy="userId"&startAt="'+uid+'"&print=pretty')
                .then((response) => {
                    for (let key in response) {
                        wallets.push({ walletId: key, ...response[key] })
                    }
                    vuexContext.commit('setWallets', wallets)
                }).catch(error => {
                    console.log(error)
                })
        }
    },
    getters: {
        getWallets(state) {
            return state.wallets
        }
    }
}

export default walletsList