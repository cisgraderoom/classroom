import { manageService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    error: '',
}

export const addUserManual = {
    namespaced: true,
    state: initialState,
    actions: {
        async addUserManual(
            { commit },
            { name, role, username, password, status }
        ) {
            commit('addUserManualLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await manageService.addUserManual({
                name,
                role,
                username,
                password,
                status,
            })
            if (!res?.status) {
                commit('addUserManualFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('addUserManualSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        addUserManualLoading(state, data) {
            Object.assign(state, data)
        },
        addUserManualSuccess(state, data) {
            Object.assign(state, data)
        },
        addUserManualFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
