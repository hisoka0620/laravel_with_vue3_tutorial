import axios from "axios"

const state = {
    user: null,
    error: null
}

const getters = {
    check: state => !!state.user,
    userid: state => state.user ? state.user.user_id : '',
}

const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setError(state, error) {
        state.error = error
    }
}

const actions = {
    async register(context, data) {
        const response = await axios.post('/api/register', data)
            .catch(error => error.response)
        const status = response.status
        if (status === 201) {
            location.href = '/tasks'
            context.commit('setUser', response.data)
        } else {
            context.commit('setError', response.data.errors)
        }
    },
    async login(context, data) {
        const response = await axios.post('/api/login', data)
            .catch(error => error.response)
        const status = response.status
        if (status === 200) {
            location.href = "/tasks"
            context.commit('setUser', response.data)
        } else {
            context.commit('setError', response.data.errors)
        }
    },
    async logout(context) {
        await axios.post('/api/logout')
        context.commit('setUser', null)
    },
    async currentUser(context) {
        const response = await axios.get('/api/user')
        const user = response.data || null
        context.commit('setUser', user)
    },
    clearError(context) {
        context.commit('setError', [])
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
