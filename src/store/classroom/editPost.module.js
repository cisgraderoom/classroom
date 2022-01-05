import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    error: null,
}

export const editPost = {
    namespaced: true,
    state: initialState,
    actions: {
        async editPost({ commit }, { text, postid, classcode }) {
            commit('editPostLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.editPost({
                text,
                postid,
                classcode,
            })
            if (!res?.status) {
                commit('editPostFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('editPostSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        editPostLoading(state, data) {
            Object.assign(state, data)
        },
        editPostSuccess(state, data) {
            Object.assign(state, data)
        },
        editPostFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
