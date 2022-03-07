import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    listUser: null,
    totalUser: null,
    hasNext: false,
    error: '',
}

export const listUserInClass = {
    namespaced: true,
    state: initialState,
    actions: {
        async listUserInClass({ commit }, { classcode, currentPage }) {
            commit('listUserInClassLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.listUserInClass({
                classcode,
                currentPage,
            })
            if (!res?.status) {
                commit('listUserInClassFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('listUserInClassSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                listUser: res.data,
                totalUser: res.pageInfo.totalItems,
                hasNext: res.pageInfo.hasNext,
            })
        },
    },
    mutations: {
        listUserInClassLoading(state, data) {
            Object.assign(state, data)
        },
        listUserInClassSuccess(state, data) {
            Object.assign(state, data)
        },
        listUserInClassFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
