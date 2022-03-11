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

export const editProblem = {
    namespaced: true,
    state: initialState,
    actions: {
        async editProblem({ commit }, { problemid, classcode, current }) {
            commit('editProblemLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await problemService.editProblem({
                problemid,
                classcode,
                current,
            })
            if (!res?.status) {
                commit('editProblemFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('editProblemSuccess', {
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
        editProblemLoading(state, data) {
            Object.assign(state, data)
        },
        editProblemSuccess(state, data) {
            Object.assign(state, data)
        },
        editProblemFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
