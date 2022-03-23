import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
}

export const addRecheckPlagiarism = {
    namespaced: true,
    state: initialState,
    actions: {
        async addRecheckPlagiarism({ commit }, { problem_id, type }) {
            commit('addRecheckPlagiarismLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.addRecheckPlagiarism({
                problem_id,
                type,
            })
            if (!res?.status) {
                commit('addRecheckPlagiarismFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                })
                return res
            }
            commit('addRecheckPlagiarismSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        addRecheckPlagiarismLoading(state, data) {
            Object.assign(state, data)
        },
        addRecheckPlagiarismSuccess(state, data) {
            Object.assign(state, data)
        },
        addRecheckPlagiarismFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
