import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    list: [],
    error: '',
}

export const listComment = {
    namespaced: true,
    state: initialState,
    actions: {
        async listComment({ commit }, { classcode, postid }) {
            commit('listCommentLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listAllComment({
                classcode,
                postid,
            })
            if (!res?.status) {
                commit('listCommentFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('listCommentSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                list: res.data,
            })
        },
    },
    mutations: {
        listCommentLoading(state, data) {
            Object.assign(state, data)
        },
        listCommentSuccess(state, data) {
            Object.assign(state, data)
        },
        listCommentFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
