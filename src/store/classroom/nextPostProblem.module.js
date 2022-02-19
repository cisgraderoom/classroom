import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    list: [],
    hasNext: false,
    error: '',
}

export const nextPostProblem = {
    namespaced: true,
    state: initialState,
    actions: {
        async nextPostProblem({ commit }, { classcode, currentPage }) {
            commit('nextPostProblemLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listnextPostProblem({
                classcode,
                currentPage,
            })
            if (!res?.status) {
                commit('nextPostProblemFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('nextPostProblemSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                list: res.data,
                hasNext: res.pageInfo.hasNext,
            })
        },
    },
    mutations: {
        nextPostProblemLoading(state, data) {
            Object.assign(state, data)
        },
        nextPostProblemSuccess(state, data) {
            Object.assign(state, data)
        },
        nextPostProblemFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
