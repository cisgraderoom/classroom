import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    list: [],
    hasNext: false,
    error: '',
}

export const nextPost = {
    namespaced: true,
    state: initialState,
    actions: {
        async nextPost({ commit }, { classcode, currentPage }) {
            commit('nextPostLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listNextPost({
                classcode,
                currentPage,
            })
            if (!res?.status) {
                commit('nextPostFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('nextPostSuccess', {
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
        nextPostLoading(state, data) {
            Object.assign(state, data)
        },
        nextPostSuccess(state, data) {
            Object.assign(state, data)
        },
        nextPostFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
