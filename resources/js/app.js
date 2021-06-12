/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

// import { vue } from 'laravel-mix';

// below this is Vue2 notaion
// window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// below this is Vue2 notaion
// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// below this is Vue2 notaion
// const app = new Vue({
//     el: '#app',
// });

import {
    createApp
} from 'vue'
import {
    createRouter,
    createWebHistory
} from 'vue-router'
import moment from 'moment'
import ExampleComponent from './components/ExampleComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import TaskListComponent from './components/TaskComponents/TaskListComponent.vue'
import TaskCompleteComponent from './components/TaskComponents/TaskCompleteComponent.vue'
import TaskShowComponent from './components/TaskComponents/TaskShowComponent.vue'
import TaskCreateComponent from './components/TaskComponents/TaskCreateComponent.vue'
import TaskEditComponent from './components/TaskComponents/TaskEditComponent.vue'
import TaskExpiredComponent from './components/TaskComponents/TaskExpiredComponent.vue'
import SignupComponent from './components/SignupComponent.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'example',
            component: ExampleComponent
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupComponent,
        },
        {
            path: '/tasks',
            name: 'task.list',
            component: TaskListComponent
        },
        {
            path: '/tasks',
            name: 'task.complete',
            component: TaskCompleteComponent,
        },
        {
            path: '/tasks',
            name: 'task.expired',
            component: TaskExpiredComponent,
        },
        {
            path: '/tasks/create',
            name: 'task.create',
            component: TaskCreateComponent
        },
        {
            path: '/tasks/:taskId',
            name: 'task.show',
            component: TaskShowComponent,
            props: true
        },
        {
            path: '/tasks/:taskId/edit',
            name: 'task.edit',
            component: TaskEditComponent,
            props: true
        },
    ]
})

const myMixin = {
    methods: {
        sortBy(key) {
            if (this.sortKey == key) {
                this.sortAsc = !this.sortAsc
            }
            this.sortKey = key
        },
        addClass(key) {
            return {
                asc: this.sortKey == key && this.sortAsc,
                desc: this.sortKey == key && !this.sortAsc
            }
        },
        createTime(val) {
            return moment(val).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss')
        }
    },
    computed: {
        dangerClass: function () {
            return function (value) {
                const now = new Date();
                const deadlinestr = moment(value).format('YYYY-MM-DD HH:mm:ss')
                const deadline = new Date(deadlinestr);
                if (now > deadline) {
                    return {
                        'text-danger': !this.hasClass
                    }
                }
            }
        },
        sortTasks() {
            if (this.sortKey !== "") {
                let set = 1
                if (this.sortAsc) {
                    set = -1
                }
                this.tasks.sort((a, b) => {
                    if (a[this.sortKey] < b[this.sortKey]) {
                        return -1 * set
                    }
                    if (a[this.sortKey] > b[this.sortKey]) {
                        return 1 * set
                    }
                    return 0
                })
                return this.tasks
            } else {
                return this.tasks
            }
        },
        pages() {
            return this.pageCount
        },
        show() {
            return this.tasks.length > 0 ? true : false
        }
    }
}

const app = createApp({})

app.mixin(myMixin)

app.component('header-component', HeaderComponent)

app.use(router).mount('#app')
