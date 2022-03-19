import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    message: null,
}

export const editClass = {
    namespaced: true,
    state: initialState,
    actions: {
        async editClass(
            { commit },
            { classname, section, year, term, classcode }
        ) {
            commit('editClassLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.editClass({
                classname,
                section,
                year,
                term,
                classcode,
            })
            if (!res?.status) {
                commit('editClassFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    message: res.message,
                })
                return res
            }
            commit('editClassSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        editClassLoading(state, data) {
            Object.assign(state, data)
        },
        editClassSuccess(state, data) {
            Object.assign(state, data)
        },
        editClassFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
