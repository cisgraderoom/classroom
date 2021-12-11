import { classroomService } from '../../_services'
import router from '../../router/index'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    message: '',
}

export const joinClassroom = {
    namespaced: true,
    state: initialState,
    actions: {
        async joinClassroom({ commit }, { classcode }) {
            commit('joinClassLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.joinClassroom({
                classcode,
            })
            if (!res?.status) {
                commit('joinClassFailure', {
                    ...initialState,
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                    message: res?.message,
                })
                return res
            }
            commit('joinClassSuccess', {
                ...initialState,
                isSuccess: true,
                isFailed: false,
                isLoading: false,
                message: res?.message,
            })
            router.push(`/classroom/${classcode}`)
        },
    },
    mutations: {
        joinClassLoading(state, data) {
            Object.assign(state, data)
        },
        joinClassSuccess(state, data) {
            Object.assign(state, data)
        },
        joinClassFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
