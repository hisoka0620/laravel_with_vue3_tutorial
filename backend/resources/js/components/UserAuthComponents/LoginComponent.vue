<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <form class="form" @submit.prevent="login">
                    <div class="form-group row" :class="hasError('email') ? ' mb-1' : '' ">
                        <label for="email" class="col-sm-3 col-form-label">Email</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="email"
                            v-model="user.email"
                        />
                    </div>
                    <div v-if="hasError('email')" class="row">
                        <div class="col-sm-3"></div>
                        <div class="error-message col-sm-9 px-0">
                            <p class="text-danger text-left">{{ errorContents('email') }}</p>
                        </div>
                    </div>

                    <div class="form-group row" :class="hasError('password') ? ' mb-1' : ''">
                        <label for="password" class="col-sm-3 col-form-label">Password</label>
                        <input
                            type="password"
                            class="col-sm-9 form-control"
                            id="password"
                            v-model="user.password"
                        />
                    </div>
                    <div v-if="hasError('password')" class="row" :class="hasError('password') ? ' mb-2' : '' ">
                        <div class="col-sm-3"></div>
                        <div class="error-message col-sm-9 px-0">
                            <p class="text-danger text-left">{{ errorContents('password') }}</p>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {},
        }
    },
    methods: {
        async login() {
            await this.$store.dispatch('auth/login', this.user)
        }
    },
    watch: {
        $route(to, from){
            this.$store.dispatch('auth/clearError')
        }
    }
}
</script>
