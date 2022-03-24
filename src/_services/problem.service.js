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

const DownloadFile = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/task/asset/${req.classcode}/${req.problemid}`, {
            headers: authHeader(),
            responseType: 'blob',
        })
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    if (data?.status) {
        res = data
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
        .get(
            `/submission/score/${req.classcode}/${req.problemid}?submission_id=${req.submission_id}`,
            {
                headers: authHeader(),
            }
        )
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    res = data
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
    return res
}

const editProblem = async (req) => {
    let res = null
    let formData = new FormData()
    formData.append('problemName', req.problemName)
    formData.append('problemDesc', req.problemDesc)
    formData.append('problemId', req.problemId)
    formData.append('openat', req.openat)
    formData.append('closeat', req.closeat)
    formData.append('asset', req.asset)
    formData.append('testcase', req.testcase)
    formData.append('classcode', req.classcode)
    const { data } = await httpClient
        .put(`/task/${req.problemId}`, formData, {
            headers: authHeader(),
        })
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    res = data
    return res
}

const setStatusProblem = async (req) => {
    let res = null
    const { data } = await httpClient
        .put(`/task/status/${req.problemid}`, req, {
            headers: authHeader(),
        })
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    res = data
    return res
}

export const problemService = {
    getByIdProblem,
    DownloadFile,
    submitProblem,
    submitTable,
    submitList,
    editProblem,
    setStatusProblem,
}
