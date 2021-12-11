import { authHeader } from '../_helpers'
import httpClient from '../_helpers/httpClient'

const createClassroom = async (req) => {
    let res = null
    const { data } = await httpClient
        .post('/classroom/new', req, {
            headers: authHeader(),
        })
        .catch((err) => {
            console.log(data)
            res = err?.response?.data
            return res
        })
    if (data?.status) {
        res = data
    }
    return res
}

const joinClassroom = async (req) => {
    let res = null
    const { data } = await httpClient
        .post('/classroom/join', req, {
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

const listClassroom = async () => {
    let res = null
    const { data } = await httpClient
        .get('/classroom/list', {
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

const getInfoClassroom = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/classroom/${req.classcode}`, {
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

const addPost = async (req) => {
    let res = null
    const { data } = await httpClient
        .post('/post', req, {
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

const listAllPost = async () => {
    let res = null
    const { data } = await httpClient
        .get('/classroom/post', {
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

export const classroomService = {
    createClassroom,
    joinClassroom,
    listClassroom,
    listAllPost,
    getInfoClassroom,
    addPost,
}
