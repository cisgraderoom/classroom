import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    message: null,
}

export const deletePost = {
    namespaced: true,
    state: initialState,
    actions: {
        async deletePost({ commit }, { post_id, classcode }) {
            commit('deletePostLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.deletePost({
                post_id,
                classcode,
            })
            if (!res?.status) {
                commit('deletePostFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    message: res.message,
                })
                return res
            }
            commit('deletePostSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        deletePostLoading(state, data) {
            Object.assign(state, data)
        },
        deletePostSuccess(state, data) {
            Object.assign(state, data)
        },
        deletePostFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
