import { userService } from '../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    message: '',
}
export const changePassword = {
    namespaced: true,
    state: initialState,
    actions: {
        async changepassword({ commit }, { newpassword }) {
            commit('changePasswordLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const response = await userService.changepassword(newpassword)
            response?.status
                ? commit('changePasswordSuccess', {
                      ...initialState,
                      isLoading: false,
                      isSuccess: true,
                      isFailed: false,
                  })
                : commit('changePasswordFailure', {
                      ...initialState,
                      isLoading: false,
                      isSuccess: false,
                      isFailed: true,
                      message: response.error,
                  })
        },
    },
    mutations: {
        changePasswordLoading(state, data) {
            Object.assign(state, data)
        },
        changePasswordSuccess(state, data) {
            Object.assign(state, data)
        },
        changePasswordFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
