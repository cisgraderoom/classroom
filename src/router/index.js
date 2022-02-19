import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import IndexPage from '../views/IndexPage.vue'
import EditaccountPage from '../views/EditaccountPage.vue'
import ClassroomPage from '../views/Classroom/ClassroomPage.vue'
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
        path: '/classroom/:code',
        name: 'Classroomcode',
        component: ClassroomPage,
        meta: { title: '' },
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
        documentTitle += `${to.params.code}`
    }
    if (to.params.problemid) {
        documentTitle = `${to.params.code} - ${to.params.problemid}`
    }
    document.title = documentTitle

    next()
})

export default router
