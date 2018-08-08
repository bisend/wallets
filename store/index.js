import Vuex from 'vuex'
import common from './common.js'
import auth from './auth.js'
import alert from './alert.js'
import currencies from './currencies.js'
import walletsList from './wallets-list.js'
import wallet from './wallet.js'

const createStore = () => {
    return new Vuex.Store({
        actions: {
            nuxtServerInit (context) {
                // console.log(context.getters.getUser)
                // return this.$axios.$get(`https://wallets-d4ab2.firebaseio.com/users/${1}.json`)
                // .then((response) => {
                    // console.log(response)
                // })
            }
        },
        modules: [
            common,
            auth,
            alert,
            currencies,
            walletsList,
            wallet
        ]
    })
}

export default createStore