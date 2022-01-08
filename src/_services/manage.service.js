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

const listAllUser = async () => {
    let res = null
    const { data } = await httpClient
        .get('/user/all', {
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

export const manageService = {
    addUser,
    listAllUser,
}
