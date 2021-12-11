import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    listClass: [],
    pageInfo: {},
}

export const listClassroom = {
    namespaced: true,
    state: initialState,
    actions: {
        async listClassroom({ commit }) {
            commit('listClassLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listClassroom()
            if (!res?.status) {
                commit('listClassFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                })
                return res
            }
            commit('listClassSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                listClass: res.data,
                pageInfo: res.pageInfo,
            })
        },
    },
    mutations: {
        listClassLoading(state, data) {
            Object.assign(state, data)
        },
        listClassSuccess(state, data) {
            Object.assign(state, data)
        },
        listClassFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
