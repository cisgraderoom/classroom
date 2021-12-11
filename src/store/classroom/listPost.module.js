import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    listPost: [],
}

export const listPost = {
    namespaced: true,
    state: initialState,
    actions: {
        async listPost({ commit }) {
            commit('listPostLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listAllPost()
            if (!res?.status) {
                commit('listPostFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                })
                return res
            }
            commit('listPostSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                listPost: res.data,
            })
        },
    },
    mutations: {
        listPostLoading(state, data) {
            Object.assign(state, data)
        },
        listPostSuccess(state, data) {
            Object.assign(state, data)
        },
        listPostFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
