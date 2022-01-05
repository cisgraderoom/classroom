import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert.module'
import { authentication } from './authentication.module'
import { changePassword } from './changePassword.module'
import { createClassroom } from './classroom/createClassroom.module'
import { joinClassroom } from './classroom/joinClassroom.module'
import { addPost } from './classroom/addPost.module'
import { editPost } from './classroom/editPost.module'
import { deletePost } from './classroom/deletePost.module'
import { listClassroom } from './classroom/listClassroom.module'
import { getInfoClassroom } from './classroom/getInfoClassroom.module'
import { listPost } from './classroom/listPost.module'
import { listComment } from './classroom/listComment.module'
import { users } from './users.module'
import { addUser } from './Manage/addUser.module'
import { addProblem } from './classroom/addProblem.module'
import { addComment } from './classroom/addComment.module'
import { deleteComment } from './classroom/deleteComment.module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        alert,
        authentication,
        changePassword,
        users,
        createClassroom,
        joinClassroom,
        listClassroom,
        getInfoClassroom,
        addPost,
        editPost,
        deletePost,
        listPost,
        listComment,
        addUser,
        addProblem,
        addComment,
        deleteComment,
    },
})
