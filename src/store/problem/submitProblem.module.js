import { problemService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    error: '',
}

export const submitProblem = {
    namespaced: true,
    state: initialState,
    actions: {
        async submitProblem({ commit }, { code, problemid, classcode }) {
            commit('submitProblemLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await problemService.submitProblem({
                code,
                problemid,
                classcode,
            })
            if (!res?.status) {
                commit('submitProblemFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res,
                })
                return res
            }
            commit('submitProblemSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        submitProblemLoading(state, data) {
            Object.assign(state, data)
        },
        submitProblemSuccess(state, data) {
            Object.assign(state, data)
        },
        submitProblemFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
