import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    list: null,
    totalUser: null,
    hasNext: false,
    error: '',
}

export const listPlagiarism = {
    namespaced: true,
    state: initialState,
    actions: {
        async listPlagiarism(
            { commit },
            { classcode, problem_id, currentPage, search }
        ) {
            commit('listPlagiarismLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listPlagiarism({
                classcode,
                problem_id,
                currentPage,
                search,
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
            } else {
                commit('listPlagiarismSuccess', {
                    ...initialState,
                    isLoading: false,
                    isFailed: false,
                    isSuccess: true,
                    list: res.data,
                    totalUser: res.pageInfo.totalItems,
                    hasNext: res.pageInfo.hasNext,
                })
            }

            return res
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
