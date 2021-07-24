import {
    createRouter,
    createWebHistory
} from 'vue-router'
import store from './store'
import ExampleComponent from './components/ExampleComponent.vue'
import TaskListComponent from './components/TaskComponents/TaskListComponent.vue'
import TaskCompleteComponent from './components/TaskComponents/TaskCompleteComponent.vue'
import TaskShowComponent from './components/TaskComponents/TaskShowComponent.vue'
import TaskCreateComponent from './components/TaskComponents/TaskCreateComponent.vue'
import TaskEditComponent from './components/TaskComponents/TaskEditComponent.vue'
import TaskExpiredComponent from './components/TaskComponents/TaskExpiredComponent.vue'
import RegisterComponent from './components/UserAuthComponents/RegisterComponent.vue'
import LoginComponent from './components/UserAuthComponents/LoginComponent.vue'
import NotFoundComponent from './components/NotFoundComponent.vue'

function isAuthenticated(to, from, next) {
    if (store.getters['auth/check']) {
        next('/tasks')
    } else {
        next()
    }
}

function redirectLogin(to, from, next) {
    if (store.getters['auth/check']) {
        next()
    } else {
        next('/login')
    }
}

const routes = [{
    path: '/',
    name: 'home',
    component: ExampleComponent
}, {
    path: '/register',
    name: 'register',
    component: RegisterComponent,
    beforeEnter: isAuthenticated
}, {
    path: '/login',
    name: 'login',
    component: LoginComponent,
    beforeEnter: isAuthenticated
}, {
    path: '/tasks',
    name: 'task.list',
    component: TaskListComponent,
    beforeEnter: redirectLogin
}, {
    path: '/tasks',
    name: 'task.complete',
    component: TaskCompleteComponent,
    beforeEnter: redirectLogin
}, {
    path: '/tasks',
    name: 'task.expired',
    component: TaskExpiredComponent,
    beforeEnter: redirectLogin
}, {
    path: '/tasks/create',
    name: 'task.create',
    component: TaskCreateComponent,
    beforeEnter: redirectLogin
}, {
    path: '/tasks/:taskId',
    name: 'task.show',
    component: TaskShowComponent,
    props: true,
    beforeEnter: redirectLogin
}, {
    path: '/tasks/:taskId/edit',
    name: 'task.edit',
    component: TaskEditComponent,
    props: true,
    beforeEnter: redirectLogin
}, {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFoundComponent
}]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {
            top: 0
        }
    }
})

export default router
