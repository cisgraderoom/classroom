import { authHeader } from '../_helpers'
import httpClient from '../_helpers/httpClient'

const createClassroom = async (req) => {
    let res = null
    const { data } = await httpClient
        .post('/classroom/new', req, {
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

const listUserInClass = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/classroom/list/user/${req.classcode}?page=${req.currentPage}`, {
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

const listAllPost = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/post/${req.classcode}`, {
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

const listNextPost = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/post/${req.classcode}?page=${req.currentPage}`, {
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

const listAllPostProblem = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/task/list?classcode=${req.classcode}`, {
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

const listNextPostProblem = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/post/${req.classcode}?page=${req.currentPage}`, {
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

const listAllComment = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/comment/${req.classcode}/${req.postid}`, {
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

const editPost = async (req) => {
    let res = null
    const { data } = await httpClient
        .put(`/post/${req.classcode}/${req.postid}`, req, {
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

const deletePost = async (req) => {
    let res = null
    const { data } = await httpClient
        .delete(`/post/${req.classcode}/${req.post_id}`, {
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

const addComment = async (req) => {
    let res = null
    const { data } = await httpClient
        .post(`/comment/${req.classcode}/${req.postid}`, req, {
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

const addProblem = async (req) => {
    let res = null
    let formData = new FormData()
    let formData2 = new FormData()
    formData.append('asset', req.asset)
    formData2.append('testcase', req.testcase)
    // req.asset = formData
    // req.testcase = formData2
    console.log(req)
    const { data } = await httpClient
        .post('/task/new', req, {
            headers: authHeader(),
        })
        .catch((err) => {
            res = err?.response?.data
            console.log(res)
            return res
        })
    if (data?.status) {
        res = data
    }
    return res
}

const deleteComment = async (req) => {
    let res = null
    const { data } = await httpClient
        .delete(`/comment/${req.classcode}/${req.post_id}/${req.comment_id}`, {
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

const kickStudent = async (req) => {
    let res = null
    const { data } = await httpClient
        .delete(`/classroom/user`, {
            headers: authHeader(),
            data: req,
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
    listUserInClass,
    listAllPost,
    listNextPost,
    listAllPostProblem,
    listNextPostProblem,
    listAllComment,
    getInfoClassroom,
    addPost,
    editPost,
    deletePost,
    addProblem,
    addComment,
    deleteComment,
    kickStudent,
}
