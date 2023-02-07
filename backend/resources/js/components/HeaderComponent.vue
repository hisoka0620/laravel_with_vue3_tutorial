<template>
    <div class="container-fluid bg-dark mb-3">
        <div class="container">
            <nav class="navbar navbar-dark">
                <router-link :to="{ name: 'home' }">
                    <span class="navbar-brand mb-0 h1">Vue Laravel SPA</span>
                </router-link>
                <div class="navbar__menu">
                    <div v-if="isLogin" class="navbar__item">
                        <router-link
                            :to="{ name: 'task.expired', query: { expired: true, page: 1 } }"
                        >
                            <button class="btn btn-success mr-2">Expired</button>
                        </router-link>
                        <router-link
                            :to="{ name: 'task.complete', query: { completed: true, page: 1 } }"
                        >
                            <button class="btn btn-success mr-2">Completed</button>
                        </router-link>
                        <router-link :to="{ name: 'task.list', query: { page: 1 } }">
                            <button class="btn btn-success mr-2">List</button>
                        </router-link>
                        <router-link :to="{ name: 'task.create' }">
                            <button class="btn btn-success mr-2">ADD</button>
                        </router-link>
                        <button @click.prevent="logout" class="btn btn-success">Logout</button>
                    </div>
                    <div v-else class="navbar__item">
                        <router-link :to="{ name: 'register' }">
                            <button class="btn btn-success mr-2">Register</button>
                        </router-link>
                        <router-link :to="{ name: 'login' }">
                            <button class="btn btn-success mr-2">Login</button>
                        </router-link>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        async logout() {
            await this.$store.dispatch('auth/logout')
            this.$router.push('/login')
        }
    },
    computed: {
        isLogin() {
            return this.$store.getters['auth/check']
        },
        userId() {
            return this.$store.getters['auth/userid']
        }
    }
}
</script>
