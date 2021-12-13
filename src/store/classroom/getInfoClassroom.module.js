import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    data: {},
}

export const getInfoClassroom = {
    namespaced: true,
    state: initialState,
    actions: {
        async getInfoClassroom({ commit }, { classcode }) {
            commit('getInfoClassroomLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.getInfoClassroom({ classcode })
            if (!res?.status) {
                commit('getInfoClassroomFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                })
                return res
            }
            commit('getInfoClassroomSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                data: res.data,
            })
        },
    },
    mutations: {
        getInfoClassroomLoading(state, data) {
            Object.assign(state, data)
        },
        getInfoClassroomSuccess(state, data) {
            Object.assign(state, data)
        },
        getInfoClassroomFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
