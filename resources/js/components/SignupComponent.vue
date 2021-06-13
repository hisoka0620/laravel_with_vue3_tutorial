<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <form @submit.prevent="submit">
                    <div class="form-group row">
                        <label for="user-id" class="col-sm-3 col-form-label">UserID</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="user-id"
                            v-model="user.user_id"
                        />
                        <div v-if="hasError('user_id')" class="error-message col-sm-12">
                            <p class="text-danger my-0 pt-1">{{ errorContents('user_id') }}</p>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="email" class="col-sm-3 col-form-label">Email</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="email"
                            v-model="user.email"
                        />
                        <div v-if="hasError('email')" class="error-message col-sm-12">
                            <p class="text-danger my-0 pt-1">{{ errorContents('email') }}</p>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="last-name" class="col-sm-3 col-form-label">LastName</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="last-name"
                            v-model="user.last_name"
                        />
                        <div v-if="hasError('last_name')" class="error-message col-sm-12">
                            <p class="text-danger my-0 pt-1">{{ errorContents('last_name') }}</p>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="first-name" class="col-sm-3 col-form-label">FirstName</label>
                        <input
                            type="text"
                            class="col-sm-9 form-control"
                            id="first-name"
                            v-model="user.first_name"
                        />
                        <div v-if="hasError('first_name')" class="error-message col-sm-12">
                            <p class="text-danger my-0 pt-1">{{ errorContents('first_name') }}</p>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="password" class="col-sm-3 col-form-label">Password</label>
                        <input
                            type="password"
                            class="col-sm-9 form-control"
                            id="password"
                            v-model="user.password"
                        />
                        <div v-if="hasError('password')" class="error-message col-sm-12">
                            <p class="text-danger my-0 pt-1">{{ errorContents('password') }}</p>
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
            user: {},
            errors: []
        }
    },
    methods: {
        submit() {
            axios.post('/api/signup', this.user)
                .then(() => { this.$router.push({ name: 'task.list' }) })
                .catch(error => this.errors = error.response.data.errors);
        },
        createCancel() {
            this.$router.push({ name: 'task.list' })
        },
        hasError(val) {
            if (val in this.errors) {
                return true
            }
        },
        errorContents(val) {
            const errorContents = this.errors[val]
            return `*${errorContents[0]}`
        }
    }
}
</script>
