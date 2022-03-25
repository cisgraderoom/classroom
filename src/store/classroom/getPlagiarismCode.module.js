import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    data: null,
    error: '',
}

export const getPlagiarismCode = {
    namespaced: true,
    state: initialState,
    actions: {
        async getPlagiarismCode(
            { commit },
            { classcode, problem_id, owner, compare }
        ) {
            commit('getPlagiarismCodeLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            const res = await classroomService.getPlagiarismCode({
                classcode,
                problem_id,
                owner,
                compare,
            })
            if (!res?.status) {
                commit('getPlagiarismCodeFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                    error: res.msg,
                })
                return res
            } else {
                commit('getPlagiarismCodeSuccess', {
                    ...initialState,
                    isLoading: false,
                    isFailed: false,
                    isSuccess: true,
                    data: res.data,
                })
            }

            return res
        },
    },
    mutations: {
        getPlagiarismCodeLoading(state, data) {
            Object.assign(state, data)
        },
        getPlagiarismCodeSuccess(state, data) {
            Object.assign(state, data)
        },
        getPlagiarismCodeFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
