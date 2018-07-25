import firebase from '@/plugins/firebase.js'
import Cookie from 'js-cookie'

const auth = {
    state: {
        token: null,
        user: null,
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        clearToken(state) {
            state.token = null
        },
        setUser(state, user) {
            state.user = user
        },
        clearUser(state) {
            state.user = null
        }
    },
    actions: {
        loginUser(vuexContext, payload) {
            return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then((response) => {
                console.log(response)
                if (response.user && response.user.uid) {
                    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                    .then((idToken) => {
                        let inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000)
                        Cookie.set('token', idToken, { expires : inOneHour })
                        vuexContext.commit('setToken', idToken)
                        let user = {
                            email: firebase.auth().currentUser.email,
                            uid: firebase.auth().currentUser.uid
                        }
                        Cookie.set('uid', user.uid, { expires : inOneHour })
                        Cookie.set('email', user.email, { expires : inOneHour })
                        vuexContext.commit('setUser', user)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
        registerUser(vuexContext, payload) {
            return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then((response) => {
                console.log(response)
                if (response.user && response.user.uid) {
                    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                    .then((idToken) => {
                        let inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000)
                        Cookie.set('token', idToken, { expires : inOneHour })
                        vuexContext.commit('setToken', idToken)
                        let user = {
                            email: firebase.auth().currentUser.email,
                            uid: firebase.auth().currentUser.uid
                        }
                        Cookie.set('uid', user.uid, { expires : inOneHour })
                        Cookie.set('email', user.email, { expires : inOneHour })
                        vuexContext.commit('setUser', user)
                        // console.log(this.$axios.$get('http://icanhazip.com'))
                        this.$axios.$put('https://wallets-d4ab2.firebaseio.com/users/'+user.uid+'.json', {
                            wallets: ''
                        })
                        .then((response) => {
                            console.log(response)
                        })

                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
        logoutUser(vuexContext) {
            return firebase.auth().signOut()
            .then((response) => {
                Cookie.remove('token')
                Cookie.remove('email')
                Cookie.remove('uid')
                vuexContext.commit('clearToken')                
                vuexContext.commit('clearUser')                
            })
            .catch((error) => {
                console.log(error)
            })
        },
        initAuth(vuexContext, req) {
            let cookie = null
            let token = null
            let user = null
            let emailCookie = null
            let uidCookie = null

            if (req) {
                if (req.headers.cookie) {
                    cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='))
                    emailCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('email='))
                    uidCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('uid='))
                    if (cookie) {
                        token = cookie.split('=')[1]
                    }
                    if (emailCookie && uidCookie) {
                        user = {}
                        user.email = emailCookie.split('=')[1]
                        user.uid = uidCookie.split('=')[1]
                    }
                }
            } else {
                if (Cookie.get('token')) {
                    token = Cookie.get('token')
                }
                if (Cookie.get('email') && Cookie.get('uid')) {
                    user = {}
                    user.email = Cookie.get('email')
                    user.uid = Cookie.get('uid')
                }
            }

            vuexContext.commit('setToken', token)
            vuexContext.commit('setUser', user)
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token != null
        },
        getUser(state) {
            return state.user
        }
    }
}

export default auth