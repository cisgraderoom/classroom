import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    list: [],
    error: '',
}

export const getListItemPlagiarism = {
    namespaced: true,
    state: initialState,
    actions: {
        async getListItemPlagiarism({ commit }, { classcode }) {
            commit('getListItemPlagiarismLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listAllPostProblem({
                classcode,
            })
            if (!res?.status) {
                commit('getListItemPlagiarismFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.msg,
                })
                return res
            }
            commit('getListItemPlagiarismSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                list: res.data,
            })
        },
    },
    mutations: {
        getListItemPlagiarismLoading(state, data) {
            Object.assign(state, data)
        },
        getListItemPlagiarismSuccess(state, data) {
            Object.assign(state, data)
        },
        getListItemPlagiarismFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
