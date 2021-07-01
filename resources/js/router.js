import {
    createRouter,
    createWebHistory
} from 'vue-router'
import ExampleComponent from './components/ExampleComponent.vue'
import TaskListComponent from './components/TaskComponents/TaskListComponent.vue'
import TaskCompleteComponent from './components/TaskComponents/TaskCompleteComponent.vue'
import TaskShowComponent from './components/TaskComponents/TaskShowComponent.vue'
import TaskCreateComponent from './components/TaskComponents/TaskCreateComponent.vue'
import TaskEditComponent from './components/TaskComponents/TaskEditComponent.vue'
import TaskExpiredComponent from './components/TaskComponents/TaskExpiredComponent.vue'
import RegisterComponent from './components/UserAuthComponents/RegisterComponent.vue'
import LoginComponent from './components/UserAuthComponents/LoginComponent.vue'
import store from './store'

function isAuthenticated(to, from, next) {
    if (store.getters['auth/check']) {
        next('/')
    } else {
        next()
    }
}

const routes = [{
    path: '/',
    name: 'example',
    component: ExampleComponent
}, {
    path: '/register',
    name: 'register',
    component: RegisterComponent
}, {
    path: '/login',
    name: 'login',
    component: LoginComponent,
    beforeEnter: isAuthenticated
}, {
    path: '/tasks',
    name: 'task.list',
    component: TaskListComponent
}, {
    path: '/tasks',
    name: 'task.complete',
    component: TaskCompleteComponent,
}, {
    path: '/tasks',
    name: 'task.expired',
    component: TaskExpiredComponent,
}, {
    path: '/tasks/create',
    name: 'task.create',
    component: TaskCreateComponent
}, {
    path: '/tasks/:taskId',
    name: 'task.show',
    component: TaskShowComponent,
    props: true
}, {
    path: '/tasks/:taskId/edit',
    name: 'task.edit',
    component: TaskEditComponent,
    props: true
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
