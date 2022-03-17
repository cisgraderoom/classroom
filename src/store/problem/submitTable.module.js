import { problemService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    score: [],
    arrayscore: [],
    status: null,
    state: null,
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
            commit('submitTableSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
                status: res.status,
                state: res.state,
                score: res.data,
                arrayscore: res.array_result,
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
