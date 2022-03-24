import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import IndexPage from '../views/IndexPage.vue'
import EditaccountPage from '../views/EditaccountPage.vue'
import ClassroomPage from '../views/Classroom/ClassroomPage.vue'
import ClassroomProblem from '../views/Classroom/ClassroomProblem.vue'
import ClassroomAddProblem from '../views/Classroom/ClassroomAddProblem.vue'
import ClassroomAllScore from '../views/Classroom/ClassroomAllScore.vue'
import ClassroomMyScore from '../views/Classroom/ClassroomMyScore.vue'
import ClassroomRecheckPlagiarism from '../views/Classroom/ClassroomRecheckPlagiarism.vue'
import ClassroomEdit from '../views/Classroom/ClassroomEdit.vue'
import ProblemPage from '../views/Classroom/ProblemPage.vue'
import ManagePage from '../views/ManagePage.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginPage,
        meta: { title: 'Login' },
    },
    {
        path: '/list',
        name: 'Index',
        component: IndexPage,
        meta: { title: 'Index' },
    },
    {
        path: '/manage',
        name: 'Manage',
        component: ManagePage,
        meta: { title: 'Manage' },
    },
    {
        path: '/editaccount',
        name: 'Editaccount',
        component: EditaccountPage,
        meta: { title: 'Edit Account' },
    },
    {
        path: '/classroom/:code/post',
        name: 'Classroompost',
        component: ClassroomPage,
        meta: { title: 'Post' },
    },
    {
        path: '/classroom/:code/problem',
        name: 'Classroomproblem',
        component: ClassroomProblem,
        meta: { title: 'Problem' },
    },
    {
        path: '/classroom/:code/addproblem',
        name: 'Classroomaddproblem',
        component: ClassroomAddProblem,
        meta: { title: 'Add Problem' },
    },
    {
        path: '/classroom/:code/allscore',
        name: 'Classroomallscore',
        component: ClassroomAllScore,
        meta: { title: 'All Score' },
    },
    {
        path: '/classroom/:code/MyScore',
        name: 'ClassroomMyScore',
        component: ClassroomMyScore,
        meta: { title: 'My Score' },
    },
    {
        path: '/classroom/:code/recheck',
        name: 'Classroomrecheckplagiarism',
        component: ClassroomRecheckPlagiarism,
        meta: { title: 'ReCheck' },
    },
    {
        path: '/classroom/:code/edit',
        name: 'Classroomedit',
        component: ClassroomEdit,
        meta: { title: 'Edit' },
    },
    {
        path: '/classroom/:code/problem/:problemid',
        name: 'Problem',
        component: ProblemPage,
        meta: { title: '' },
    },
    { path: '/:catchAll(.*)', name: 'NotFound', redirect: '/list' },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('token')

    if (authRequired && !loggedIn) {
        return next('/')
    }
    let documentTitle = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`
    if (to.params.code) {
        documentTitle += `- ${to.params.code}`
    }
    if (to.params.problemid) {
        documentTitle = `${to.params.code} - ${to.params.problemid}`
    }
    document.title = documentTitle

    next()
})

export default router
