import Vuex from 'vuex'
import common from './common.js'
import auth from './auth.js'
import alert from './alert.js'
import currencies from './currencies.js'

const createStore = () => {
    return new Vuex.Store({
        modules: [
            common,
            auth,
            alert,
            currencies
        ]
    })
}

export default createStore