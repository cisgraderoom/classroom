import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    message: null,
    error: null,
}

export const addRecheckPlagiarism = {
    namespaced: true,
    state: initialState,
    actions: {
        async addRecheckPlagiarism(
            { commit },
            { classcode, problem_id, type }
        ) {
            commit('addRecheckPlagiarismLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.addRecheckPlagiarism({
                classcode,
                problem_id,
                type,
            })
            if (!res?.status) {
                commit('addRecheckPlagiarismFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('addRecheckPlagiarismSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                message: res.message,
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
