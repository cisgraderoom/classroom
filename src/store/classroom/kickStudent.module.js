import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    message: null,
}

export const kickStudent = {
    namespaced: true,
    state: initialState,
    actions: {
        async kickStudent({ commit }, { classcode, username }) {
            commit('kickStudentLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.kickStudent({
                classcode,
                username,
            })
            if (!res?.status) {
                commit('kickStudentFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    message: res.message,
                })
                console.log(res.message)
                return res
            }
            commit('kickStudentSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        kickStudentLoading(state, data) {
            Object.assign(state, data)
        },
        kickStudentSuccess(state, data) {
            Object.assign(state, data)
        },
        kickStudentFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
