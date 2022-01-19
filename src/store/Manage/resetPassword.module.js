import { manageService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    error: '',
}

export const resetPassword = {
    namespaced: true,
    state: initialState,
    actions: {
        async resetPassword({ commit }, { username }) {
            commit('resetPasswordLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await manageService.resetPassword({ username })
            if (!res?.status) {
                commit('resetPasswordFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('resetPasswordSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        resetPasswordLoading(state, data) {
            Object.assign(state, data)
        },
        resetPasswordSuccess(state, data) {
            Object.assign(state, data)
        },
        resetPasswordFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
