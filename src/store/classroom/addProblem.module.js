import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
}

export const addProblem = {
    namespaced: true,
    state: initialState,
    actions: {
        async addProblem(
            { commit },
            {
                problemName,
                problemDesc,
                score,
                type,
                classcode,
                open,
                close,
                asset,
                testcase,
            }
        ) {
            commit('addProblemLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.addProblem({
                problemName,
                problemDesc,
                score,
                type,
                classcode,
                open,
                close,
                asset,
                testcase,
            })
            if (!res?.status) {
                commit('addProblemFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                })
                return res
            }
            commit('addProblemSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        addProblemLoading(state, data) {
            Object.assign(state, data)
        },
        addProblemSuccess(state, data) {
            Object.assign(state, data)
        },
        addProblemFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
