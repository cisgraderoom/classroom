import { problemService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    score: [],
    status: null,
    listUser: null,
    totalUser: null,
    hasNext: false,
    error: '',
}

export const submitList = {
    namespaced: true,
    state: initialState,
    actions: {
        async submitList({ commit }, { problemid, classcode, current }) {
            commit('submitListLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await problemService.submitList({
                problemid,
                classcode,
                current,
            })
            if (!res?.status) {
                commit('submitListFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('submitListSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                status: res.status,
                score: res.data,
                totalUser: res.pageInfo.totalItems,
                hasNext: res.pageInfo.hasNext,
            })
        },
    },
    mutations: {
        submitListLoading(state, data) {
            Object.assign(state, data)
        },
        submitListSuccess(state, data) {
            Object.assign(state, data)
        },
        submitListFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
