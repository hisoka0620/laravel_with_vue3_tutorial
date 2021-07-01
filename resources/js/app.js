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
import router from './router'
import store from './store'
import myMixin from './mixins'
import HeaderComponent from './components/HeaderComponent.vue'

//  Vueインスタンス生成時、認証されたユーザーを取得する
const currentUser = async () => {
    await store.dispatch('auth/currentUser')
    //ここだと正常に取得できる
    console.log(store.getters['auth/check'])
}

const app = createApp({})

app.mixin(myMixin)

app.component('header-component', HeaderComponent)

app.use(currentUser)

app.use(store)

app.use(router)

app.mount('#app')
