const commonModule = {
    state: {
        isAjaxLoading: false
    },
    mutations: {
        setAjaxLoading(state, isLoading) {
            state.isAjaxLoading = isLoading
        }
    },
    actions: {
        setAjaxLoading(vuexContext, isLoading) {
            vuexContext.commit('setAjaxLoading', isLoading)
        }
    },
    getters: {
        isAjaxLoading(state) {
            return state.isAjaxLoading
        }
    }
}

export default commonModule