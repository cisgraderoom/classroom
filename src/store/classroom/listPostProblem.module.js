import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    list: [],
    currentPage: null,
    hasNext: false,
    error: '',
}

export const listPostProblem = {
    namespaced: true,
    state: initialState,
    actions: {
        async listPostProblem({ commit }, { classcode }) {
            commit('listPostProblemLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listAllPostProblem({ classcode })
            if (!res?.status) {
                commit('listPostProblemFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('listPostProblemSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                list: res.data,
                hasNext: res.pageInfo.hasNext,
                currentPage: res.pageInfo.currentPage,
            })
        },
    },
    mutations: {
        listPostProblemLoading(state, data) {
            Object.assign(state, data)
        },
        listPostProblemSuccess(state, data) {
            Object.assign(state, data)
        },
        listPostProblemFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
