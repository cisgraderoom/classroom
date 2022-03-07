import { problemService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    score: [],
    status: null,
    error: '',
}

export const submitTable = {
    namespaced: true,
    state: initialState,
    actions: {
        async submitTable({ commit }, { problemid, classcode }) {
            commit('submitTableLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await problemService.submitTable({
                problemid,
                classcode,
            })
            // if (!res?.status) {
            //     commit('submitTableFailure', {
            //         ...initialState,
            //         isLoading: false,
            //         isFailed: true,
            //         isSuccess: false,
            //         error: res,
            //     })
            //     return res
            // }
            commit('submitTableSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                status: res.status,
                score: res.data,
            })
        },
    },
    mutations: {
        submitTableLoading(state, data) {
            Object.assign(state, data)
        },
        submitTableSuccess(state, data) {
            Object.assign(state, data)
        },
        submitTableFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
