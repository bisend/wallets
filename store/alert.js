const alert = {
    state: {
        show: false,
        type: 'error',
        message: ''
    },
    mutations: {
        setShow(state, isShow) {
            state.show = isShow
        },
        setType(state, type) {
            state.type = type
        },
        setMessage(state, message) {
            state.message = message
        }
    },
    actions: {
        showAlert(vuexContext, payload) {
            vuexContext.commit('setType', payload.type)
            vuexContext.commit('setMessage', payload.message)
            vuexContext.commit('setShow', true)
            setTimeout(() => {
                vuexContext.commit('setShow', false)
            }, payload.time * 1000)
        }
    },
    getters: {
        isAlert(state) {
            return state.show
        },
        getAlertMessage(state) {
            return state.message ? state.message : 'Error occured'
        },
        getAlertType(state) {
            return state.type
        }
    }
}

export default alert