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
import { listUserInClass } from './classroom/listUserInClass.module'
import { addTeacherClassroom } from './classroom/addTeacherClassroom.module'
import { listAllScoreInClass } from './classroom/listAllScoreInClass.module'
import { kickStudent } from './classroom/kickStudent.module'
import { listPostProblem } from './classroom/listPostProblem.module'
import { nextPost } from './classroom/nextPost.module'
import { nextPostProblem } from './classroom/nextPostProblem.module'
import { listComment } from './classroom/listComment.module'
import { users } from './users.module'
import { listAllUser } from './Manage/listAllUser.module'
import { addUser } from './Manage/addUser.module'
import { addUserManual } from './Manage/addUserManual.module'
import { editUser } from './Manage/editUser.module'
import { resetPassword } from './Manage/resetPassword.module'
import { addProblem } from './classroom/addProblem.module'
import { addComment } from './classroom/addComment.module'
import { deleteComment } from './classroom/deleteComment.module'
import { getByIdProblem } from './problem/getByIdProblem.module'
import { submitProblem } from './problem/submitProblem.module'
import { submitTable } from './problem/submitTable.module'
import { submitList } from './problem/submitList.module'
import { editProblem } from './problem/editProblem.module'

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
        listUserInClass,
        addTeacherClassroom,
        listAllScoreInClass,
        kickStudent,
        nextPost,
        listPostProblem,
        nextPostProblem,
        listComment,
        listAllUser,
        addUser,
        addUserManual,
        editUser,
        resetPassword,
        addProblem,
        addComment,
        deleteComment,
        getByIdProblem,
        submitProblem,
        submitTable,
        submitList,
        editProblem,
    },
})
