import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
}

export const addComment = {
    namespaced: true,
    state: initialState,
    actions: {
        async addComment({ commit }, { text, postid, classcode }) {
            commit('addCommentLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.addComment({
                text,
                postid,
                classcode,
            })
            if (!res?.status) {
                commit('addCommentFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                })
                return res
            }
            commit('addCommentSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        addCommentLoading(state, data) {
            Object.assign(state, data)
        },
        addCommentSuccess(state, data) {
            Object.assign(state, data)
        },
        addCommentFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
