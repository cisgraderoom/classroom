import { problemService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    problem: [],
    error: '',
}

export const getByIdProblem = {
    namespaced: true,
    state: initialState,
    actions: {
        async getByIdProblem({ commit }, { classcode, problemid }) {
            commit('getByIdProblemLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await problemService.getByIdProblem({
                classcode,
                problemid,
            })
            if (!res?.status) {
                commit('getByIdProblemFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.msg,
                })
                return res
            }
            commit('getByIdProblemSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                problem: res.data,
            })
        },
    },
    mutations: {
        getByIdProblemLoading(state, data) {
            Object.assign(state, data)
        },
        getByIdProblemSuccess(state, data) {
            Object.assign(state, data)
        },
        getByIdProblemFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
