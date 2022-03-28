import { manageService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    listUser: null,
    totalUser: null,
    hasNext: false,
    error: '',
}

export const listAllUser = {
    namespaced: true,
    state: initialState,
    actions: {
        async listAllUser({ commit }, { currentPage, search }) {
            commit('listAllUserLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await manageService.listAllUser({ currentPage, search })
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
                listUser: res.data,
                totalUser: res.pageInfo.totalItems,
                hasNext: res.pageInfo.hasNext,
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
