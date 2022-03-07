import { classroomService } from '../../_services'
import router from '../../router/index'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
}

export const createClassroom = {
    namespaced: true,
    state: initialState,
    actions: {
        async createClassroom({ commit }, { classname, section, year, term }) {
            commit('createClassLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })

            const res = await classroomService.createClassroom({
                classname,
                section,
                year,
                term,
            })
            if (!res?.status) {
                commit('createClassFailure', {
                    ...initialState,
                    isFailed: true,
                    isLoading: false,
                    isSuccess: false,
                })
                return res
            }
            commit('createClassSuccess', {
                ...initialState,
                isSuccess: true,
                isFailed: false,
                isLoading: false,
            })
            router.push(`/classroom/${res?.data?.classcode}/post`)
        },
    },
    mutations: {
        createClassLoading(state, data) {
            Object.assign(state, data)
        },
        createClassSuccess(state, data) {
            Object.assign(state, data)
        },
        createClassFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
