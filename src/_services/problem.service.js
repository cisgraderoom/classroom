import { authHeader } from '../_helpers'
import httpClient from '../_helpers/httpClient'
import router from '../router/index'

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
    if (!data?.status) {
        router.push(`/classroom/${req.classcode}/problem`)
    }
    res = data
    return res
}

const submitProblem = async (req) => {
    let res = null
    let formData = new FormData()
    formData.append('code', req.code)
    formData.append('classcode', req.classcode)
    const { data } = await httpClient
        .post(`/submission/submit/${req.problemid}`, formData, {
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
    return res
}

const submitList = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(
            `/submission/list/${req.classcode}/problem/${req.problemid}?page=${req.current}`,
            {
                headers: authHeader(),
            }
        )
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    res = data
    console.log(res)
    return res
}

const editProblem = async (req) => {
    let res = null
    const { data } = await httpClient
        .post(
            `/submission/list/${req.classcode}/problem/${req.problemid}?page=${req.current}`,
            req,
            {
                headers: authHeader(),
            }
        )
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    res = data
    console.log(res)
    return res
}

export const problemService = {
    getByIdProblem,
    submitProblem,
    submitTable,
    submitList,
    editProblem,
}
