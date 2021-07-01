<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <form @submit.prevent="register">
                    <div class="form-group row" :class="hasError('user_id') ? ' mb-1' : '' ">
                        <label for="user-id" class="col-sm-3 col-form-label">UserID</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="user-id"
                            v-model="user.user_id"
                        />
                    </div>
                    <div v-if="hasError('user_id')" class="row">
                        <div class="col-sm-3"></div>
                        <div class="error-message col-sm-9 px-0">
                            <p class="text-danger text-left">{{ errorContents('user_id') }}</p>
                        </div>
                    </div>

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

                    <div class="form-group row" :class="hasError('last_name') ? ' mb-1' : '' ">
                        <label for="last-name" class="col-sm-3 col-form-label">LastName</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="last-name"
                            v-model="user.last_name"
                        />
                    </div>
                    <div v-if="hasError('last_name')" class="row">
                        <div class="col-sm-3"></div>
                        <div class="error-message col-sm-9 px-0">
                            <p class="text-danger text-left">{{ errorContents('last_name') }}</p>
                        </div>
                    </div>

                    <div class="form-group row" :class="hasError('first_name') ? ' mb-1' : '' ">
                        <label for="first-name" class="col-sm-3 col-form-label">FirstName</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="first-name"
                            v-model="user.first_name"
                        />
                    </div>
                    <div v-if="hasError('first_name')" class="row">
                        <div class="col-sm-3"></div>
                        <div class="error-message col-sm-9 px-0">
                            <p class="text-danger text-left">{{ errorContents('first_name') }}</p>
                        </div>
                    </div>

                    <div class="form-group row" :class="hasError('password') ? ' mb-1' : '' ">
                        <label for="password" class="col-sm-3 col-form-label">Password</label>
                        <input
                            type="password"
                            class="col-sm-9 form-control"
                            id="password"
                            v-model="user.password"
                        />
                    </div>
                    <div v-if="hasError('password')" class="row">
                        <div class="col-sm-3"></div>
                        <div class="error-message col-sm-9 px-0">
                            <p class="text-danger text-left">{{ errorContents('password') }}</p>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label
                            for="confirm-password"
                            class="col-sm-3 col-form-label"
                        >Confirm Password</label>
                        <input
                            type="password"
                            class="col-sm-9 form-control"
                            id="confirm-password"
                            v-model="user.password_confirmation"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Register</button>
                    <button class="btn btn-secondary" @click="createCancel">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        async register() {
            await this.$store.dispatch('auth/register', this.user)
        },
        createCancel() {
            this.$router.push({ name: 'example' })
        }
    },
    watch: {
        $route(to, from){
            this.$store.dispatch('auth/clearError')
        }
    }
}
</script>
