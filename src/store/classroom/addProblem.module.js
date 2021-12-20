import { classroomService } from '../../_services'

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
}

export const addProblem = {
    namespaced: true,
    state: initialState,
    actions: {
        async addProblem(
            { commit },
            { problemsname, problemstext, maxscore, type, classcode },
            asset,
            testcase
        ) {
            commit('addProblemLoading', {
                ...initialState,
                isLoading: true,
                isFailed: false,
                isSuccess: false,
            })
            let formData1 = new FormData()
            formData1.append('asset', asset)
            let formData2 = new FormData()
            formData2.append('testcase', testcase)
            const res = await classroomService.addProblem(
                { problemsname, problemstext, maxscore, type, classcode },
                formData1,
                formData2
            )
            if (!res?.status) {
                commit('addProblemFailure', {
                    ...initialState,
                    isLoading: false,
                    isFailed: true,
                    isSuccess: false,
                })
                return res
            }
            commit('addProblemSuccess', {
                ...initialState,
                isLoading: false,
                isFailed: false,
                isSuccess: true,
            })
        },
    },
    mutations: {
        addProblemLoading(state, data) {
            Object.assign(state, data)
        },
        addProblemSuccess(state, data) {
            Object.assign(state, data)
        },
        addProblemFailure(state, data) {
            Object.assign(state, data)
        },
    },
}
