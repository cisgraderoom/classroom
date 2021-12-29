import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
}

export const deleteComment = {
    namespaced: true,
    state: initialState,
    actions: {
        async deleteComment({ commit }, { post_id, comment_id, classcode }) {
            commit('deleteCommentLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.deleteComment({
                post_id,
                comment_id,
                classcode,
            })
            if (!res?.status) {
                commit('deleteCommentFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                })
                return res
            }
            commit('deleteCommentSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        deleteCommentLoading(state, data) {
            Object.assign(state, data)
        },
        deleteCommentSuccess(state, data) {
            Object.assign(state, data)
        },
        deleteCommentFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
