import { authHeader } from '../_helpers'
import httpClient from '../_helpers/httpClient'

const getByIdProblem = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/task/${req.problemid}?classcode=${req.classcode}`, {
            headers: authHeader(),
        })
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    if (data?.status) {
        res = data
    }
    return res
}

export const problemService = {
    getByIdProblem,
}
