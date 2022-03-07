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

const submitProblem = async (req) => {
    let res = null
    let formData = new FormData()
    formData.append('code', req.code)
    req.code = formData
    req.code = ''
    const { data } = await httpClient
        .post(`/submission/submit/${req.problemid}`, req, {
            headers: authHeader(),
        })
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    if (data?.status) {
        res = data
        console.log(res)
    }
    return res
}

const submitTable = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/submission/score/${req.classcode}/${req.problemid}`, {
            headers: authHeader(),
        })
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    res = data
    console.log(res)
    // if (data?.status) {
    //     res = data
    // }
    return res
}

export const problemService = {
    getByIdProblem,
    submitProblem,
    submitTable,
}
