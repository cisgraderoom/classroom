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

export const manageService = {
    addUser,
}
