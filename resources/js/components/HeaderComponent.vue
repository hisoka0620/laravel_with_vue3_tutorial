<template>
    <div class="container-fluid bg-dark mb-3">
        <div class="container">
            <nav class="navbar navbar-dark">
                <router-link :to="{ name: 'example' }">
                    <span class="navbar-brand mb-0 h1">Vue Laravel SPA</span>
                </router-link>
                <div>
                    <router-link :to="{ name: 'task.expired', query: { expired: true, page: 1 } }">
                        <button class="btn btn-success mr-2">Expired</button>
                    </router-link>
                    <router-link
                        :to="{ name: 'task.complete', query: { completed: true, page: 1 } }"
                    >
                        <button class="btn btn-success mr-2">Complete</button>
                    </router-link>
                    <router-link :to="{ name: 'task.list', query: { page: 1 } }">
                        <button class="btn btn-success mr-2">List</button>
                    </router-link>
                    <router-link :to="{ name: 'task.create' }">
                        <button class="btn btn-success mr-2">ADD</button>
                    </router-link>
                    <router-link :to="{ name: 'signup'}">
                        <button class="btn btn-success">Signup</button>
                    </router-link>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {}
</script>
