import { authHeader } from '../_helpers'
import httpClient from '../_helpers/httpClient'

const addUser = async (req) => {
    let res = null
    let formData = new FormData()
    formData.append('file', req)
    const { data } = await httpClient
        .post('/user/upload', formData, {
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

const addUserManual = async (req) => {
    let res = null
    const { data } = await httpClient
        .post('/user/new', req, {
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

const listAllUser = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/user/all`, {
            headers: authHeader(),
            params: {
                page: req.currentPage,
                search: req.search,
            },
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

const editUser = async (req) => {
    let res = null
    const { data } = await httpClient
        .put(`/user/${req.username}`, req, {
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

const resetPassword = async (req) => {
    let res = null
    const { data } = await httpClient
        .post(
            `/user/${req.username}/reset`,
            {},
            {
                headers: authHeader(),
            }
        )
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    if (data?.status) {
        res = data
    }
    return res
}

export const manageService = {
    addUser,
    addUserManual,
    listAllUser,
    editUser,
    resetPassword,
}
