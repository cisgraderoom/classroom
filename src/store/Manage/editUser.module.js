import { manageService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    error: '',
}

export const editUser = {
    namespaced: true,
    state: initialState,
    actions: {
        async editUser({ commit }, { username, name, role, status }) {
            commit('editUserLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await manageService.editUser({
                username,
                name,
                role,
                status,
            })
            if (!res?.status) {
                commit('editUserFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.message,
                })
                return res
            }
            commit('editUserSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        editUserLoading(state, data) {
            Object.assign(state, data)
        },
        editUserSuccess(state, data) {
            Object.assign(state, data)
        },
        editUserFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
