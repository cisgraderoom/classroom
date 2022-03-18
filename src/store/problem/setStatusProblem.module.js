import { problemService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    error: '',
}

export const setStatusProblem = {
    namespaced: true,
    state: initialState,
    actions: {
        async setStatusProblem({ commit }, { hidden, problemid, classcode }) {
            commit('setStatusProblemLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await problemService.setStatusProblem({
                hidden,
                problemid,
                classcode,
            })
            if (!res?.status) {
                commit('setStatusProblemFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.msg,
                })
                return res
            }
            commit('setStatusProblemSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        setStatusProblemLoading(state, data) {
            Object.assign(state, data)
        },
        setStatusProblemSuccess(state, data) {
            Object.assign(state, data)
        },
        setStatusProblemFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
