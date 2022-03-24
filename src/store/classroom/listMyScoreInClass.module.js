import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    listScore: null,
    error: '',
}

export const listMyScoreInClass = {
    namespaced: true,
    state: initialState,
    actions: {
        async listMyScoreInClass({ commit }, { classcode }) {
            commit('listMyScoreInClassLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listMyScoreInClass({
                classcode,
            })
            if (!res?.status) {
                commit('listMyScoreInClassFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.msg,
                })
                return res
            }
            commit('listMyScoreInClassSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                listScore: res.data,
            })
        },
    },
    mutations: {
        listMyScoreInClassLoading(state, data) {
            Object.assign(state, data)
        },
        listMyScoreInClassSuccess(state, data) {
            Object.assign(state, data)
        },
        listMyScoreInClassFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
