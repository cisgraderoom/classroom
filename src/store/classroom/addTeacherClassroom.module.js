import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    message: '',
}

export const addTeacherClassroom = {
    namespaced: true,
    state: initialState,
    actions: {
        async addTeacherClassroom({ commit }, { classcode, username }) {
            commit('addTeacherClassroomLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.addTeacherClassroom({
                classcode,
                username,
            })
            if (!res?.status) {
                commit('addTeacherClassroomFailure', {
                    ...initialState,
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                    message: res?.message,
                })
                return res
            }
            commit('addTeacherClassroomSuccess', {
                ...initialState,
                isSuccess: true,
                isFailed: false,
                isLoading: false,
                message: res?.message,
            })
        },
    },
    mutations: {
        addTeacherClassroomLoading(state, data) {
            Object.assign(state, data)
        },
        addTeacherClassroomSuccess(state, data) {
            Object.assign(state, data)
        },
        addTeacherClassroomFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
