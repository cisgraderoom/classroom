import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    listScore: null,
    error: '',
}

export const listAllScoreInClass = {
    namespaced: true,
    state: initialState,
    actions: {
        async listAllScoreInClass({ commit }, { classcode }) {
            commit('listAllScoreInClassLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listAllScoreInClass({
                classcode,
            })
            if (!res?.status) {
                commit('listAllScoreInClassFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.msg,
                })
                return res
            }
            commit('listAllScoreInClassSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                listScore: res.data,
            })
        },
    },
    mutations: {
        listAllScoreInClassLoading(state, data) {
            Object.assign(state, data)
        },
        listAllScoreInClassSuccess(state, data) {
            Object.assign(state, data)
        },
        listAllScoreInClassFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
