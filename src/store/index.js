import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert.module'
import { authentication } from './authentication.module'
import { changePassword } from './changePassword.module'
import { createClassroom } from './classroom/createClassroom.module'
import { joinClassroom } from './classroom/joinClassroom.module'
import { listClassroom } from './classroom/listClassroom.module'
import { users } from './users.module'

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
    },
})
