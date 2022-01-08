import { manageService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    listUser: null,
    hasNext: false,
    error: '',
}

export const listAllUser = {
    namespaced: true,
    state: initialState,
    actions: {
        async listAllUser({ commit }) {
            commit('listAllUserLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await manageService.listAllUser()
            if (!res?.status) {
                commit('listAllUserFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('listAllUserSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        listAllUserLoading(state, data) {
            Object.assign(state, data)
        },
        listAllUserSuccess(state, data) {
            Object.assign(state, data)
        },
        listAllUserFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
