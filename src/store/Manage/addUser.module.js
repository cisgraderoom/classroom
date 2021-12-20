import { manageService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    error: '',
}

export const addUser = {
    namespaced: true,
    state: initialState,
    actions: {
        async addUser({ commit }, file) {
            commit('addUserLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await manageService.addUser(file)
            if (!res?.status) {
                commit('addUserFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('addUserSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        addUserLoading(state, data) {
            Object.assign(state, data)
        },
        addUserSuccess(state, data) {
            Object.assign(state, data)
        },
        addUserFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
