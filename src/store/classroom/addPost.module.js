import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
}

export const addPost = {
    namespaced: true,
    state: initialState,
    actions: {
        async addPost({ commit }, { text, classcode }) {
            commit('addPostLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.addPost({ text, classcode })
            if (!res?.status) {
                commit('addPostFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                })
                return res
            }
            commit('addPostSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        addPostLoading(state, data) {
            Object.assign(state, data)
        },
        addPostSuccess(state, data) {
            Object.assign(state, data)
        },
        addPostFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
