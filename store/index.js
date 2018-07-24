import Vuex from 'vuex'
import common from './common.js'
import auth from './auth.js'
import alert from './alert.js'

const createStore = () => {
    return new Vuex.Store({
        modules: [
            common,
            auth,
            alert
        ]
    })
}

export default createStore