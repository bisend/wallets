import Vuex from 'vuex'
import commonModule from './common.js'

const createStore = () => {
    return new Vuex.Store({
        modules: [
            commonModule
        ]
    })
}

export default createStore