import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    list: null,
    error: '',
}

export const listPlagiarism = {
    namespaced: true,
    state: initialState,
    actions: {
        async listPlagiarism({ commit }, { classcode, problem_id }) {
            commit('listPlagiarismLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listPlagiarism({
                classcode,
                problem_id,
            })
            if (!res?.status) {
                commit('listPlagiarismFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.msg,
                })
                return res
            }
            commit('listPlagiarismSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                list: res.data,
            })
        },
    },
    mutations: {
        listPlagiarismLoading(state, data) {
            Object.assign(state, data)
        },
        listPlagiarismSuccess(state, data) {
            Object.assign(state, data)
        },
        listPlagiarismFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
