import { problemService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    status: null,
    error: '',
}

export const editProblem = {
    namespaced: true,
    state: initialState,
    actions: {
        async editProblem(
            { commit },
            {
                problemName,
                problemDesc,
                problemId,
                openat,
                closeat,
                testcase,
                asset,
                classcode,
                time_limit,
                mem_limit,
            }
        ) {
            commit('editProblemLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await problemService.editProblem({
                problemName,
                problemDesc,
                problemId,
                openat,
                closeat,
                testcase,
                asset,
                classcode,
                time_limit,
                mem_limit,
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
