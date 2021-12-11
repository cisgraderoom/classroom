import { userService } from '../_services'
import router from '../router/index'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
    ? {
          status: { loggedIn: true },
          user,
          isLoading: false,
          isFailed: false,
      }
    : { status: {}, user: null, isLoading: false, isFailed: false }

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ dispatch, commit }, { username, password }) {
            commit('loginRequest', { username })

            userService.login(username, password).then(
                (user) => {
                    commit('loginSuccess', user)
                    router.push('/list')
                },
                (error) => {
                    commit('loginFailure', error)
                    dispatch('alert/error', error, { root: true })
                }
            )
        },

        logout({ commit }) {
            userService.logout()
            commit('logout')
        },
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true }
            state.isFailed = false
            state.isLoading = true
            state.user = user
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true }
            state.isLoading = false
            state.user = user
        },
        loginFailure(state) {
            state.status = {}
            state.isLoading = false
            state.isFailed = true
            state.user = null
        },
        logout(state) {
            state.status = {}
            state.isLoading = false
            state.isFailed = false
            state.user = null
        },
    },
}
