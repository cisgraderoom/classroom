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

const listAllScoreInClass = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/submission/score/classroom/${req.classcode}/all`, {
            headers: authHeader(),
        })
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    res = data
    return res
}

const listMyScoreInClass = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/submission/score/${req.classcode}`, {
            headers: authHeader(),
        })
        .catch((err) => {
            res = err?.response?.data
            return res
        })
    res = data
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
    formData.append('problemName', req.problemName)
    formData.append('problemDesc', req.problemDesc)
    formData.append('score', req.score)
    formData.append('classcode', req.classcode)
    formData.append('open', req.open)
    formData.append('close', req.close)
    formData.append('asset', req.asset)
    formData.append('testcase', req.testcase)
    const { data } = await httpClient
        .post('/task/new', formData, {
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

const addTeacherClassroom = async (req) => {
    let res = null
    const { data } = await httpClient
        .post('/classroom/add/teacher', req, {
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

const editClass = async (req) => {
    let res = null
    const { data } = await httpClient
        .put(`/classroom/${req.classcode}`, req, {
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

const addRecheckPlagiarism = async (req) => {
    let res = null
    const { data } = await httpClient
        .post(`/post/${req.problem_id}`, req, {
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

const getListItemPlagiarism = async (req) => {
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
const listPlagiarism = async (req) => {
    let res = null
    const { data } = await httpClient
        .get(`/post/${req.classcode}/${req.problem_id}`, {
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
    listUserInClass,
    listAllPost,
    listNextPost,
    listAllPostProblem,
    listNextPostProblem,
    listAllComment,
    listAllScoreInClass,
    listMyScoreInClass,
    getInfoClassroom,
    addPost,
    editPost,
    deletePost,
    addProblem,
    addComment,
    deleteComment,
    kickStudent,
    addTeacherClassroom,
    editClass,
    addRecheckPlagiarism,
    getListItemPlagiarism,
    listPlagiarism,
}
